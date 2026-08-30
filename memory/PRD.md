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

## Backlog
- P0: Real testimonials (user will send) — swap into i18n.js testimonials.cards
- P1: Real social links / email in Footer.jsx (currently generic hrefs)
- P1: Admin view for inquiries
- P2: Case studies / work section, email notification on inquiry (Resend)
