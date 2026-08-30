# PRD — HERMES SOFTWARE INC.® Website

## Original Problem Statement
Design the digital identity + website for HERMES SOFTWARE INC.®, a software studio. Art direction: Pop Art + Neo-Brutalism + Editorial Design + Experimental Typography + Swiss grids + contemporary motion. "An independent art publication that happens to be a serious software company." Explicitly NOT generic SaaS/template/AI-startup. Brand statement: "Software should have a point of view."

## User Choices
- Bilingual EN/TR toggle
- Pricing estimator currency switch: USD / EUR / TRY
- START A PROJECT opens contact form saved to backend
- Testimonials: clearly marked placeholders (real ones to be provided later)

## Architecture
- Frontend: React (CRA/craco) + Tailwind + framer-motion + Lenis smooth scroll
- Publication target: standalone static frontend on Vercel (`frontend/vercel.json`, `yarn build`, `build/` output)
- Contact flow: a client-side arithmetic challenge plus honeypot, followed by a pre-addressed email draft to `info@hermessoftware.space`; no API, database, or runtime environment variable is required.
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
- Final CTA (red, largest type moment), minimal footer, brutalist contact modal
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

## Implemented — Update (August 30, 2026)
- **Real work showcase:** Onyx (API client), Prompt Shrink (LLM gateway), and Moment (personal desktop context) replace mock projects. Each is paired with a designed editorial illustration and localized EN/TR copy.
- **Pricing:** estimator bases are now $900 (website), $2,200 (web app), $3,000 (mobile), $3,600 (custom), and $1,600 (other), with lower add-ons and complexity multipliers.
- **Footer:** restricted to only `mailto:info@hermessoftware.space` and `https://instagram.com/hermes.software`.
- **Frontend-only Vercel publication:** removed the admin route, API client, preview tracking scripts, and all live API usage from the shipped app. The contact modal validates a lightweight local arithmetic challenge/honeypot then opens a populated email draft. Added Vercel SPA rewrite and production metadata.
- **Verified:** `yarn eslint src --max-warnings=0` and `yarn build` succeed; live browser smoke check confirms the branded title, no horizontal overflow at desktop width, and the working client-only CAPTCHA/contact modal; Vercel readiness scan passed with no blockers.

## Backlog (remaining)
- P1: Replace mock testimonials with verified client-approved quotes when provided.
- P1: Review the wording and exact price positioning with the studio owner before launch.
- P2: Add a dedicated form/email delivery service only if browser email-draft handoff is no longer sufficient; a true server-verified CAPTCHA also requires such a service.

