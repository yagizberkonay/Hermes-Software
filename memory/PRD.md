# PRD — HERMES SOFTWARE INC.® Website

## Original Problem Statement
Design the digital identity + website for HERMES SOFTWARE INC.®, a software studio. Art direction: Pop Art + Neo-Brutalism + Editorial Design + Experimental Typography + Swiss grids + contemporary motion. "An independent art publication that happens to be a serious software company." Explicitly NOT generic SaaS/template/AI-startup. Brand statement: "Software should have a point of view."

## User Choices
- Bilingual EN/TR toggle
- Pricing estimator currency switch: USD / EUR / TRY
- START A PROJECT opens contact form saved to backend
- Testimonials: clearly marked placeholders (real ones to be provided later)

## Architecture
- Frontend: React (CRA/craco) + Tailwind + framer-motion + lenis smooth scroll
- Backend: FastAPI + MongoDB (`inquiries` collection)
- API: POST /api/inquiries, GET /api/inquiries
- Files: `frontend/src/components/hermes/*` (Nav, Hero, Ticker, About, Services, Testimonials, Pricing, Faq, Cta, Footer, ContactModal, primitives), `frontend/src/lib/i18n.js` (full EN/TR dict), `frontend/src/lib/pricing.js` (isolated pricing config — edit values without touching UI)

## Visual Identity
- Palette: ink #111111, paper #F5F0E8, yellow #FFE45C, red #FF5C5C, blue #45B7D1
- Type: Anton (display, poster-scale, outlined/filled variants) + Archivo (body) + IBM Plex Mono (labels)
- System: 3px black borders, hard offset shadows (8px 8px 0 #111), press-into-shadow interactions, hard easing cubic-bezier(0.87,0,0.13,1), reg marks / 4-point stars / big arrows graphic language

## Implemented (June 2026)
- Kinetic hero with masked line-by-line reveal + scroll parallax + bottom stamp strip
- Two infinite tickers (yellow forward, blue reverse), pause on hover
- About: giant statement w/ outlined + boxed words, clip-path copy reveal, facts strip
- Services: 6 varied editorial grid cards (spans, colors, dark card w/ outline-to-fill hover)
- Testimonial wall: 3 async auto-scroll columns (down/up/down, different speeds), PLACEHOLDER-tagged cards
- Pricing estimator: type/complexity/add-on physical controls, animated rolling number, USD/EUR/TRY, estimate attaches to contact modal
- FAQ: 5-question editorial accordion, numbers grow oversized on open, clip-path reveal
- Final CTA (red, largest type moment), minimal footer, brutalist contact modal → MongoDB
- Full EN/TR i18n, prefers-reduced-motion respected, data-testids everywhere
- Verified: curl (inquiries POST/GET), screenshots (desktop all sections, mobile hero + menu, estimator flow, modal submit, TR toggle)

## Implemented — Update (July 2026)
This iteration (per user request: mock realistic reviews, lower prices, add all features, more whitespace):
- **Testimonials → realistic MOCK quotes** (EN+TR) with fictional client names/companies; removed all PLACEHOLDER labels/notes. (`Testimonials.jsx`, `i18n.js`)
- **Pricing lowered to market-average** in `pricing.js` (website $1800, webapp $4500, mobile $6000, custom $7500, other $3500; multipliers 1/1.5/2.1/3; addons $800–$2200). Values remain isolated from UI.
- **Increased whitespace** across all sections (py-32 sm:py-48, larger heading gaps, wider grid gaps).
- **Work / Case-study showcase** (`Work.jsx`, section #work, nav "WORK"/"İŞLER"): 4 mock case studies (KOVAN, TARLA, MERIDIAN, LUMEN) in clipped editorial frames (clip-path), grayscale→color on hover, result-stat badges, alternating asymmetric layout. Content in `i18n.js` (`work`).
- **Admin Inquiry Inbox** at route `/admin` (`Admin.jsx`): single-password gate (`ADMIN_PASSWORD` env, default `hermes-studio-2026`) sent via `X-Admin-Password` header; lists all inquiries newest-first with name/email/type/estimate/lang/message. Router added to `App.js` (`/` + `/admin`).
- **Email alerts** on each new inquiry via Emergent-managed Resend (owner: yagizberkonay0@gmail.com, server-side only). Sent in a FastAPI BackgroundTask; guardrail gate `_assert_safe_email` per playbook.
- **Bug fixes:** hero/RevealLine mask reveals converted to reliable CSS keyframe (`.reveal-inner.is-in`) — headless browsers throttle framer JS animations, so critical text now uses CSS + `useInView` trigger; fixed mobile horizontal overflow (global `overflow-x: clip` + About parallax gated to ≥lg); ContactModal now closes on Escape + moves focus in; Turkish uppercase İ fixed by setting `document.documentElement.lang`.
- **Backend hardening:** `InquiryCreate.email` is `EmailStr` + length limits; in-memory per-IP rate limit (10/5min, real IP via X-Forwarded-For); admin compare via `hmac.compare_digest`.

## API (current)
- POST /api/inquiries — public (rate-limited); creates inquiry + fires owner email (background)
- GET /api/inquiries — requires `X-Admin-Password` header (401 otherwise); newest-first
- POST /api/admin/verify — validates admin password header

## Verified (July 2026)
- Backend pytest suite `/app/backend/tests/backend_test.py`: 16/16 pass. Email 202 in logs. EmailStr 422 on bad email. Admin 401 without header.
- Frontend: testing agent all core flows PASS; self-verified hero reveal, Work section, Admin login+list, Turkish İ casing, no horizontal overflow (scrollWidth==clientWidth), modal Escape closes.

## Backlog (remaining)
- P1: Real social links / email in Footer.jsx (currently generic hrefs)
- P1: Replace mock testimonials & mock case studies with real content when the user provides them
- P2: Server-issued admin token instead of replaying the shared password; optional CAPTCHA on the public form

