# The Garment Concierge — Project Handoff & Progress Log

**Last updated:** 2026-06-16
**Purpose:** Pick this project up on any device or account. Read this top to bottom
and you'll know exactly where things stand and how to continue — whether "you" is
the founder on a new laptop or a fresh Claude Code session.

---

## 0. TL;DR — Resume in 4 steps

1. **Clone the repo:**
   ```
   git clone https://github.com/mckinleyjhon8-hash/drycleaners.git
   cd drycleaners
   ```
2. **Install Node.js LTS** if missing (https://nodejs.org). Need v18.18+ (built on v24).
3. **Install dependencies:**
   ```
   npm --prefix src/website install
   ```
4. **Run it:**
   ```
   npm --prefix src/website run dev
   ```
   Open http://localhost:3000.

> **No secret file is required to run it.** The booking form posts to the n8n
> webhook, whose URL is baked into the code as a default. (Optional: create
> `src/website/.env.local` with `NEXT_PUBLIC_N8N_BOOKING_WEBHOOK=...` only to
> override that URL — e.g. if the n8n instance moves.)

---

## 1. What this project is

**The Garment Concierge** — a luxury dry-cleaning **concierge & logistics** business
for Milton Keynes, UK. It does *not* clean clothes; it collects garments, manages the
customer experience, sub-contracts cleaning to established local cleaners, and delivers
back. Premium positioning ("The Harrods of Garment Care").

Full business brief, market data, brand system, metrics → **`CLAUDE.md`**.

---

## 2. Current status (as of 2026-06-16)

| Area | Status |
|------|--------|
| Git repo | ✅ GitHub: https://github.com/mckinleyjhon8-hash/drycleaners (`main`) |
| Marketing website | ✅ Next.js 14, **fully static**, production build passes |
| Pages | ✅ `/` (landing) + `/book` (full booking form) |
| Pricing | ✅ Per-order + **£19.99/mo** membership; **.99 charm pricing**; swipeable price carousel |
| Imagery | ✅ Hero (garments on hangers) + cuff-detail quote band; hanger favicon |
| Booking backend | ✅ **n8n pipeline** (webhook → Postgres + Telegram alert) — replaces Web3Forms. **Live & tested** |
| Domain | ✅ **thegarmentconcierge.co.uk** purchased |
| Pro email / phone | ⏳ In progress (founder) |
| Deployment | ⏳ NOT deployed. **Recommended host: Cloudflare Pages** (see §6) |
| Dry-cleaner contracts | ⏳ To negotiate (shortlist in `CLAUDE.md`) |

**The site is built and works locally. It is not yet live on the internet.**

---

## 3. Where everything is

```
dry_cleaners_business/
├── CLAUDE.md              ← master business brief (positioning, market, brand, partners)
├── README.md             ← project overview
├── HANDOFF.md            ← this file
├── docs/
│   ├── 01-market-research/market-analysis.md
│   ├── 02-customer-avatars/customer-personas.md
│   ├── 06-pricing/pricing-model.md   ← pricing & margins (full item table)
│   └── 07-financials/financial-model.md
│   └── (other sections: scaffolded, awaiting content)
└── src/website/          ← THE WEBSITE (Next.js, fully static)
    ├── app/
    │   ├── page.tsx              ← landing page (all sections)
    │   ├── book/page.tsx         ← /book — full booking form page
    │   ├── layout.tsx            ← fonts, SEO metadata, header + footer
    │   ├── globals.css           ← styling / brand colours
    │   └── icon.svg              ← hanger favicon
    ├── components/
    │   ├── BookingForm.tsx       ← full booking form → POSTs JSON to the n8n webhook
    │   ├── Header.tsx            ← sticky nav + mobile menu
    │   ├── Logo.tsx              ← hanger + wordmark lockup
    │   └── PriceCarousel.tsx     ← swipeable 3-category price list
    ├── public/images/           ← hero-garments.jpg, cuff-detail.jpg
    ├── .env.example             ← documents the optional n8n webhook override var
    └── (package.json, tailwind.config.ts, etc.)
```

`node_modules/` and `.next/` are auto-generated — never edit, never commit (git-ignored).

---

## 4. Tech stack & brand

- **Framework:** Next.js 14.2.35 (App Router) + TypeScript + Tailwind. **100% static** — every route prerenders to HTML; no SSR/ISR/API routes.
- **Booking backend:** the `/book` form POSTs JSON straight to the **n8n webhook** (on Railway), which saves to Postgres + sends a Telegram alert. Nothing dynamic runs on the website host. URL via `NEXT_PUBLIC_N8N_BOOKING_WEBHOOK` (has a built-in default).
- **Brand colours:** Navy `#1B2B4B`, Cream `#F5F0E8`, Gold `#C9A84C`, Charcoal `#2D2D2D`.
- **Fonts:** Cormorant Garamond (headings), DM Sans (body), Playfair Display (accents).
- **Commands:** `npm --prefix src/website run dev` · `... run build`.

---

## 5. Key decisions & gotchas

- **Booking backend is n8n, not Web3Forms.** The form was originally on Web3Forms
  (email only); it now POSTs JSON to an n8n webhook that (a) saves the booking to
  Postgres and (b) sends an instant Telegram alert. This gives a real, queryable
  bookings database + extensible automation. See §9.
- **Site is 100% static → not locked to any host.** All dynamic/background work is
  offloaded to n8n. **Recommended host: Cloudflare Pages** (unlimited bandwidth/requests
  on free, *commercial use allowed*, free domain + HTTPS). Vercel works too but its
  **Hobby plan is officially non-commercial** — the real reason to prefer Cloudflare.
- **Don't reach for `next/image`** — we use plain `<img>` on purpose to stay out of
  Vercel's metered Image Optimisation. Images are tiny and pre-sized.
- **Pricing model:** per-order markup + optional **£19.99/mo** membership — NOT
  all-you-can-eat bundles (wrong fit for lumpy demand). ~55% gross margin per item
  over an assumed **30% cleaner trade rate**. Prices use **.99** charm endings.
  Full model: `docs/06-pricing/pricing-model.md`.
- **Next.js pinned to a patched version** (14.2.35; 14.2.15 had a security advisory).
- **App is in a subfolder** (`src/website`), NOT repo root — matters for deployment.
- **Secrets policy:** never commit `.env*` (gitignored; a `!` exception keeps
  `.env.example` tracked). Web3Forms is retired — its old key is no longer used.

---

## 6. Next step when ready: Deploy to Cloudflare Pages

The site is fully static, so hosting is simple. **Recommended: Cloudflare Pages.**

1. https://dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git**
2. Pick `mckinleyjhon8-hash/drycleaners`.
3. Build settings:
   - **Root directory** → `src/website`
   - **Framework preset** → Next.js (static) — or build `npm run build`
   - (No env vars required — the webhook URL has a default.)
4. Deploy → you get a `*.pages.dev` URL; add the custom domain `thegarmentconcierge.co.uk`.

> Because the app has **no server features**, it can also be `output: 'export'`-ed to
> pure static files and hosted on *any* static host (Netlify, GitHub Pages, etc.).
> Vercel remains an option (a Vercel MCP is connected) but mind the non-commercial
> Hobby terms.

**Before going public**, harden the n8n webhook (see §9): lock CORS to the domain and
add a spam filter — the webhook currently accepts requests from anywhere.

---

## 7. Pending TO-DO

- [x] Buy domain — **thegarmentconcierge.co.uk** ✅
- [x] Booking pipeline (website → n8n → Postgres + Telegram) ✅
- [ ] Finish **pro email + phone** setup
- [ ] **Swap placeholders** once email/phone exist: footer + booking contact
      (`hello@thegarmentconcierge.co.uk`, `01908 000 000`), company registration line
- [ ] **Negotiate cleaner trade rate** (Fluff & Tumble + One Stop) — confirms every margin
- [ ] **Deploy to Cloudflare Pages** (§6) + point the domain at it
- [ ] **Harden n8n webhook** before launch: CORS → domain, drop filled `botcheck`
- [ ] Delete the 2 test rows (id 1, 2) from `garment_concierge.bookings`
- [ ] **n8n Phase 2+** automations (see §9)

---

## 8. Important references

- **Repo:** https://github.com/mckinleyjhon8-hash/drycleaners
- **Domain:** thegarmentconcierge.co.uk
- **n8n workflow:** "Garment Concierge — Booking Pipeline" — ID `aakDnEb6686k49tO`
  → https://primary-production-68f72.up.railway.app/workflow/aakDnEb6686k49tO
- **Production webhook:** `https://primary-production-68f72.up.railway.app/webhook/garment-booking` (POST)
- **Database:** Railway Postgres → schema `garment_concierge`, table `bookings`
  (id, created_at, status + 15 booking fields)
- **Telegram alert:** chat `5827717998` (Musti / @Jay18732) via bot **@Thegarmentconciergebot**
- **Pricing model:** `docs/06-pricing/pricing-model.md`
- **Business brief / market / personas / financials:** `CLAUDE.md`, `docs/`

---

## 9. n8n automation

The booking pipeline is **Phase 1** of running most of the business on n8n with
human-in-the-loop (HITL) approvals via Telegram buttons.

**Phase 1 — Booking pipeline (DONE & live):**
`Website /book → webhook → Normalize → ensure table → INSERT (Postgres) → Telegram alert → respond {ok:true}`.
Credentials: Postgres = "Postgres account"; Telegram = the @Thegarmentconciergebot bot.

**Hardening still to do:** lock webhook CORS to `thegarmentconcierge.co.uk`; add a
node to drop submissions where the `botcheck` honeypot is filled.

**Roadmap (Phases 2–5), each plugs into the same Postgres spine:**
2. Scheduling — day-before reminders, daily route list by area (HITL: approve route)
3. Cleaner handoff — split items by best partner (F&T everyday / One Stop specialist), notify, status tracking
4. Payments/membership — *needs Stripe* — invoice draft (HITL: approve), payment link, dunning, renewals
5. CRM/retention + AI support — profiles/LTV, review requests, AI-drafted replies (HITL: send)

---

*To continue with a fresh Claude Code session on any machine: clone the repo, open it,
and say "read HANDOFF.md and help me continue." Everything you need is in this repo.*
