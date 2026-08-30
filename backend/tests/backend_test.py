"""Backend regression tests for HERMES SOFTWARE INC. marketing site.

Covers:
- Health / root
- Inquiries: POST /api/inquiries (public create + owner email side-effect)
- Admin auth: POST /api/admin/verify, GET /api/inquiries (X-Admin-Password gate)
- Status checks (legacy scaffold endpoints)
"""
import os
import re
import time
from pathlib import Path

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL is missing")
BASE_URL = base_url.rstrip("/")


def _admin_password():
    p = Path("/app/memory/test_credentials.md")
    if p.exists():
        m = re.search(r"(?im)^\s*(?:[-*]\s*)?(?:\*\*)?password(?:\*\*)?\s*:\s*`?([^`\s]+)", p.read_text())
        if m:
            return m.group(1)
    pytest.skip("Admin password not found in /app/memory/test_credentials.md")


ADMIN_PW = _admin_password()

# Track rows created by this worker so teardown never deletes another worker's data.
CREATED_INQUIRY_IDS = []
CREATED_STATUS_IDS = []


@pytest.fixture(scope="session")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def _solved_captcha(api_client):
    r = api_client.get(f"{BASE_URL}/api/captcha")
    assert r.status_code == 200, r.text
    data = r.json()
    m = re.match(r"\s*(\d+)\s*([+-])\s*(\d+)\s*", data["question"])
    a, op, b = int(m.group(1)), m.group(2), int(m.group(3))
    answer = a + b if op == "+" else a - b
    return {"captcha_id": data["id"], "captcha_answer": str(answer)}


@pytest.fixture(scope="session")
def admin_headers():
    return {"X-Admin-Password": ADMIN_PW, "Content-Type": "application/json"}


# --- CAPTCHA ------------------------------------------------------------
class TestCaptcha:
    def test_get_captcha_returns_question(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/captcha")
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and "question" in data

    def test_wrong_captcha_answer_rejected(self, api_client):
        solved = _solved_captcha(api_client)
        r = api_client.post(f"{BASE_URL}/api/inquiries", json={
            "name": "TEST_BadCaptcha", "email": "TEST_badcaptcha@example.com",
            "message": "TEST_", "captcha_id": solved["captcha_id"], "captcha_answer": "999999",
        })
        assert r.status_code == 400, r.text

    def test_honeypot_filled_rejected(self, api_client):
        solved = _solved_captcha(api_client)
        r = api_client.post(f"{BASE_URL}/api/inquiries", json={
            "name": "TEST_Bot", "email": "TEST_bot@example.com", "message": "TEST_",
            "website": "http://spam.example", **solved,
        })
        assert r.status_code == 400, r.text


# --- Health -----------------------------------------------------------------
class TestHealth:
    def test_root(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/")
        assert r.status_code == 200, r.text
        assert r.json().get("message") == "Hello World"


# --- Admin auth gate --------------------------------------------------------
class TestAdminAuth:
    def test_verify_without_header_401(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/admin/verify", json={})
        assert r.status_code == 401, r.text
        assert "detail" in r.json()

    def test_verify_wrong_password_401(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/admin/verify", json={},
                            headers={"X-Admin-Password": "totally-wrong"})
        assert r.status_code == 401, r.text

    def test_verify_correct_password_ok(self, api_client, admin_headers):
        r = api_client.post(f"{BASE_URL}/api/admin/verify", json={}, headers=admin_headers)
        assert r.status_code == 200, r.text
        assert r.json() == {"ok": True}

    def test_list_inquiries_requires_header(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/inquiries")
        assert r.status_code == 401, r.text

    def test_list_inquiries_wrong_password(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/inquiries", headers={"X-Admin-Password": "nope"})
        assert r.status_code == 401, r.text


# --- Inquiries --------------------------------------------------------------
class TestInquiries:
    def test_create_inquiry_and_verify_persistence(self, api_client, admin_headers):
        solved = _solved_captcha(api_client)
        payload = {
            "name": "TEST_QA Lead",
            "email": "TEST_qa+lead@example.com",
            "project_type": "webapp",
            "message": "TEST_ We need a marketplace with payments.",
            "estimate": "$6,750",
            "lang": "en",
            **solved,
        }
        t0 = time.time()
        r = api_client.post(f"{BASE_URL}/api/inquiries", json=payload)
        elapsed = time.time() - t0
        assert r.status_code == 200, r.text
        created = r.json()
        CREATED_INQUIRY_IDS.append(created.get("id"))
        assert isinstance(created.get("id"), str) and len(created["id"]) > 0
        assert "_id" not in created
        for k, v in payload.items():
            if k in ("captcha_id", "captcha_answer"):
                continue
            assert created[k] == v, f"{k} mismatch: {created.get(k)!r} != {v!r}"
        assert "created_at" in created
        # email side-effect should not block lead capture excessively
        assert elapsed < 25, f"create_inquiry took {elapsed:.1f}s (email blocking?)"

        # GET as admin -> should contain the new inquiry, newest first
        g = api_client.get(f"{BASE_URL}/api/inquiries", headers=admin_headers)
        assert g.status_code == 200, g.text
        items = g.json()
        assert isinstance(items, list) and len(items) >= 1
        assert any(i["id"] == created["id"] for i in items), "created inquiry not persisted"
        stamps = [i["created_at"] for i in items]
        assert stamps == sorted(stamps, reverse=True), "list is not sorted newest-first"
        assert all("_id" not in i for i in items)

    def test_list_sorted_newest_first(self, api_client, admin_headers):
        ids = []
        for n in range(2):
            solved = _solved_captcha(api_client)
            r = api_client.post(f"{BASE_URL}/api/inquiries", json={
                "name": f"TEST_Sort {n}",
                "email": f"TEST_sort{n}@example.com",
                "message": f"TEST_ ordering check {n}",
                **solved,
            })
            assert r.status_code == 200, r.text
            ids.append(r.json()["id"])
            CREATED_INQUIRY_IDS.append(ids[-1])
            time.sleep(1.1)
        items = api_client.get(f"{BASE_URL}/api/inquiries", headers=admin_headers).json()
        order = [i["id"] for i in items if i["id"] in ids]
        assert order == list(reversed(ids)), f"expected newest-first, got {order}"

    def test_create_inquiry_optional_fields_defaults(self, api_client):
        solved = _solved_captcha(api_client)
        r = api_client.post(f"{BASE_URL}/api/inquiries", json={
            "name": "TEST_Minimal",
            "email": "TEST_min@example.com",
            "message": "TEST_ minimal payload",
            **solved,
        })
        assert r.status_code == 200, r.text
        d = r.json()
        CREATED_INQUIRY_IDS.append(d.get("id"))
        assert d["project_type"] is None
        assert d["estimate"] is None
        assert d["lang"] == "en"

    @pytest.mark.parametrize("bad", [
        {"email": "a@b.com", "message": "no name"},
        {"name": "x", "message": "no email"},
        {"name": "x", "email": "a@b.com"},
        {},
    ])
    def test_create_inquiry_validation(self, api_client, bad):
        r = api_client.post(f"{BASE_URL}/api/inquiries", json=bad)
        assert r.status_code == 422, f"expected 422 for {bad}, got {r.status_code}"

    def test_email_field_not_validated_as_email(self, api_client):
        """`email` uses pydantic EmailStr — arbitrary strings are rejected."""
        solved = _solved_captcha(api_client)
        r = api_client.post(f"{BASE_URL}/api/inquiries", json={
            "name": "TEST_BadEmail", "email": "not-an-email", "message": "TEST_", **solved})
        assert r.status_code == 422, r.text

    def test_owner_email_not_leaked(self, api_client, admin_headers):
        """OWNER_EMAIL must never appear in any API response."""
        owner = dotenv_values("/app/backend/.env").get("OWNER_EMAIL", "").strip('"')
        assert owner, "OWNER_EMAIL missing from backend env"
        for url, hdrs in [(f"{BASE_URL}/api/", None), (f"{BASE_URL}/api/inquiries", admin_headers)]:
            r = api_client.get(url, headers=hdrs)
            assert owner not in r.text, f"OWNER_EMAIL leaked in {url}"


# --- Legacy status endpoints ------------------------------------------------
class TestStatus:
    def test_create_and_list_status(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/status", json={"client_name": "TEST_qa"})
        assert r.status_code == 200, r.text
        d = r.json()
        CREATED_STATUS_IDS.append(d.get("id"))
        assert d["client_name"] == "TEST_qa"
        assert "_id" not in d
        g = api_client.get(f"{BASE_URL}/api/status")
        assert g.status_code == 200
        assert any(i["id"] == d["id"] for i in g.json())


# --- Cleanup ----------------------------------------------------------------
@pytest.fixture(scope="session", autouse=True)
def cleanup_test_data():
    """Remove only rows created by THIS worker (xdist-safe: no cross-worker deletes)."""
    yield
    # No DELETE endpoint exists; clean directly via mongo to avoid polluting the inbox.
    try:
        from pymongo import MongoClient
        env = dotenv_values("/app/backend/.env")
        c = MongoClient(env["MONGO_URL"].strip('"'))
        db = c[env["DB_NAME"].strip('"')]
        if CREATED_INQUIRY_IDS:
            db.inquiries.delete_many({"id": {"$in": CREATED_INQUIRY_IDS}})
        if CREATED_STATUS_IDS:
            db.status_checks.delete_many({"id": {"$in": CREATED_STATUS_IDS}})
        c.close()
    except Exception as e:  # pragma: no cover
        print(f"cleanup skipped: {e}")
