from fastapi import FastAPI, APIRouter, Header, HTTPException, Depends, BackgroundTasks, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import time
import hmac
import random
import ipaddress
import logging
import httpx
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email + admin config (server-side only, never exposed to the frontend)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
OWNER_EMAIL = os.environ["OWNER_EMAIL"]
ADMIN_PASSWORD = os.environ["ADMIN_PASSWORD"]

# Simple in-memory sliding-window rate limit for the public inquiry endpoint.
_INQUIRY_HITS: dict = {}
_RATE_MAX = 10         # max submissions
_RATE_WINDOW = 300     # per 5 minutes, per client IP

# Lightweight, self-hosted CAPTCHA (no third-party keys): a short-lived
# arithmetic challenge, single-use, kept in memory alongside a form honeypot.
_CAPTCHA_STORE: dict = {}
_CAPTCHA_TTL = 300    # 5 minutes


def _new_captcha() -> dict:
    now = time.time()
    for k in [k for k, v in _CAPTCHA_STORE.items() if v[1] < now]:
        _CAPTCHA_STORE.pop(k, None)
    a, b = random.randint(1, 9), random.randint(1, 9)
    if random.choice([True, False]):
        question, answer = f"{a} + {b}", a + b
    else:
        hi, lo = max(a, b), min(a, b)
        question, answer = f"{hi} - {lo}", hi - lo
    cid = str(uuid.uuid4())
    _CAPTCHA_STORE[cid] = (answer, now + _CAPTCHA_TTL)
    return {"id": cid, "question": question}


def _verify_captcha(captcha_id: str, captcha_answer: str) -> bool:
    entry = _CAPTCHA_STORE.pop(captcha_id, None)
    if not entry:
        return False
    correct, expiry = entry
    if time.time() > expiry:
        return False
    try:
        return int(str(captcha_answer).strip()) == correct
    except ValueError:
        return False


def _client_ip(request: Request) -> str:
    # Behind the ingress, the real client IP is the first entry of X-Forwarded-For.
    xff = request.headers.get("x-forwarded-for")
    if xff:
        return xff.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _rate_limited(ip: str) -> bool:
    now = time.time()
    hits = [t for t in _INQUIRY_HITS.get(ip, []) if now - t < _RATE_WINDOW]
    hits.append(now)
    _INQUIRY_HITS[ip] = hits
    return len(hits) > _RATE_MAX

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------------------------------------------------------------------------
# Email (Emergent-managed Resend). Guardrail gate copied per playbook.
# ---------------------------------------------------------------------------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    async with httpx.AsyncClient(timeout=30) as http_client:
        resp = await http_client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


def require_admin(x_admin_password: Optional[str] = Header(default=None)) -> bool:
    if not x_admin_password or not hmac.compare_digest(x_admin_password, ADMIN_PASSWORD):
        raise HTTPException(status_code=401, detail="Invalid admin password")
    return True


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    project_type: Optional[str] = None
    message: str
    estimate: Optional[str] = None
    lang: Optional[str] = "en"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class InquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    project_type: Optional[str] = Field(default=None, max_length=80)
    message: str = Field(min_length=1, max_length=4000)
    estimate: Optional[str] = Field(default=None, max_length=40)
    lang: Optional[str] = Field(default="en", max_length=5)
    captcha_id: str
    captcha_answer: str = Field(max_length=10)
    website: Optional[str] = Field(default="", max_length=200)  # honeypot — must stay empty


def _inquiry_alert_html(inq: Inquiry) -> str:
    row = ('<tr><td style="padding:6px 0;font-size:12px;color:#888;'
           'font-family:Arial,sans-serif;width:130px;vertical-align:top">{k}</td>'
           '<td style="padding:6px 0;font-size:15px;color:#111;'
           'font-family:Arial,sans-serif;font-weight:600">{v}</td></tr>')
    rows = "".join([
        row.format(k="NAME", v=escape(inq.name)),
        row.format(k="EMAIL", v=escape(inq.email)),
        row.format(k="PROJECT TYPE", v=escape(inq.project_type or "-")),
        row.format(k="ESTIMATE", v=escape(inq.estimate or "-")),
        row.format(k="LANGUAGE", v=escape((inq.lang or "en").upper())),
    ])
    return (
        '<table role="presentation" width="100%" style="max-width:560px;margin:0 auto;'
        'background:#F5F0E8;border:3px solid #111"><tr><td style="padding:28px">'
        '<p style="font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;'
        'color:#FF5C5C;font-weight:700;margin:0 0 4px">NEW PROJECT INQUIRY</p>'
        '<h1 style="font-family:Arial,sans-serif;font-size:26px;color:#111;margin:0 0 20px">'
        'Someone wants to build something.</h1>'
        f'<table role="presentation" width="100%">{rows}</table>'
        '<p style="font-family:Arial,sans-serif;font-size:12px;color:#888;margin:20px 0 6px">MESSAGE</p>'
        f'<p style="font-family:Arial,sans-serif;font-size:15px;color:#111;line-height:1.6;margin:0;'
        f'border-left:4px solid #111;padding-left:12px">{escape(inq.message)}</p>'
        '<p style="font-family:Arial,sans-serif;font-size:11px;color:#888;margin:24px 0 0">'
        'Sent by HERMES SOFTWARE INC. lead notifications. We never ask for your password or card details by email.</p>'
        '</td></tr></table>'
    )


@api_router.get("/captcha")
async def get_captcha():
    return _new_captcha()


@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(payload: InquiryCreate, request: Request, background_tasks: BackgroundTasks):
    client_ip = _client_ip(request)
    if _rate_limited(client_ip):
        raise HTTPException(status_code=429, detail="Too many submissions. Please try again shortly.")
    if payload.website:
        raise HTTPException(status_code=400, detail="Invalid submission.")
    if not _verify_captcha(payload.captcha_id, payload.captcha_answer):
        raise HTTPException(status_code=400, detail="Incorrect answer. Please try the new question.")
    inquiry = Inquiry(**payload.model_dump(exclude={"captcha_id", "captcha_answer", "website"}))
    doc = inquiry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.inquiries.insert_one(doc)
    # Send the owner alert in the background so email latency never blocks the submit.
    background_tasks.add_task(_send_inquiry_alert, inquiry)
    return inquiry


async def _send_inquiry_alert(inquiry: Inquiry):
    try:
        subject = f"New project inquiry — {inquiry.name}"
        await send_email(to=OWNER_EMAIL, subject=subject, html=_inquiry_alert_html(inquiry))
    except Exception as e:
        logger.error(f"Inquiry alert email failed: {e}")

@api_router.post("/admin/verify")
async def admin_verify(_: bool = Depends(require_admin)):
    return {"ok": True}

@api_router.get("/inquiries", response_model=List[Inquiry])
async def list_inquiries(_: bool = Depends(require_admin)):
    docs = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()