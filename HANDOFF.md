# The Garment Concierge — Project Handoff & Progress Log

**Last updated:** 2026-06-13
**Purpose:** Pick this project up on any device or account. Read this top to bottom
and you'll know exactly where things stand and how to continue — whether "you" is
the founder on a new laptop or a fresh Claude Code session.

---

## 0. TL;DR — Resume in 5 steps

1. **Clone the repo** (everything except secrets is here):
   ```
   git clone https://github.com/mckinleyjhon8-hash/drycleaners.git
   cd drycleaners
   ```
2. **Install Node.js LTS** if the machine doesn't have it (https://nodejs.org).
   Check with `node -v` (need v18.18+; this project was built on v24).
3. **Install dependencies:**
   ```
   npm --prefix src/website install
   ```
4. **Recreate the secret file** `src/website/.env.local` (it is git-ignored, so it
   is NOT in the clone). Put this one line in it:
   ```
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=0977fe50-67cf-49da-8c45-d4794883bcc9
   ```
   (This is a Web3Forms *public* access key — safe to expose, but you can rotate it
   at https://web3forms.com if you ever want to.)
5. **Run it:**
   ```
   npm --prefix src/website run dev
   ```
   Open http://localhost:3000.

---

## 1. What this project is

**The Garment Concierge** — a luxury dry-cleaning **concierge & logistics** business
for Milton Keynes, UK. The company does *not* clean clothes; it collects garments,
manages the customer experience, sub-contracts cleaning to established local cleaners,
and delivers back. Premium positioning ("The Harrods of Garment Care").

Full business brief, market data, brand system, and metrics live in **`CLAUDE.md`**.

---

## 2. Current status (as of 2026-06-14)

| Area | Status |
|------|--------|
| Git repo | ✅ On GitHub: https://github.com/mckinleyjhon8-hash/drycleaners (branch `main`) |
| Marketing website | ✅ Built — Next.js 14, fully static, production build passes |
| Booking form | ✅ Working & tested — submits via Web3Forms, emails land in inbox |
| Favicon / SEO | ✅ Done (navy/gold hanger icon, metadata, mobile nav) |
| Pricing | ✅ Per-order + £19.99/mo membership; full price list live (carousel) |
| Deployment (Vercel) | ⏳ NOT deployed yet — see §6 |
| Real domain / email / phone | ⏳ To be purchased by founder |
| Dry cleaner contracts | ⏳ To be negotiated (candidate list in `CLAUDE.md`) |

**The site is built and works locally. It is not yet live on the internet.**

---

## 3. Where everything is

```
dry_cleaners_business/
├── CLAUDE.md              ← master business brief (positioning, market, brand, partners)
├── README.md             ← project overview
├── HANDOFF.md            ← this file
├── docs/                 ← business documentation
│   ├── 01-market-research/market-analysis.md
│   ├── 02-customer-avatars/customer-personas.md
│   ├── 06-pricing/pricing-model.md   ← pricing & margins (per-order + membership)
│   └── 07-financials/financial-model.md
│   └── (other sections: scaffolded, awaiting content)
└── src/website/          ← THE WEBSITE
    ├── app/
    │   ├── page.tsx       ← entire landing page (all sections)
    │   ├── layout.tsx     ← fonts, SEO metadata, header + footer
    │   ├── globals.css    ← styling / brand colours
    │   └── icon.svg       ← hanger favicon
    ├── components/
    │   ├── BookingForm.tsx← booking form (Web3Forms client-side submit)
    │   ├── Header.tsx     ← sticky nav + mobile menu
    │   ├── Logo.tsx       ← hanger + wordmark lockup
    │   └── PriceCarousel.tsx ← swipeable price list (Pricing section)
    ├── .env.local         ← SECRET, git-ignored (recreate per §0 step 4)
    ├── .env.example       ← template showing which env vars are needed
    └── (package.json, tailwind.config.ts, etc.)
```

`node_modules/` and `.next/` are auto-generated — never edit, never commit (already git-ignored).

---

## 4. Tech stack & brand

- **Framework:** Next.js 14.2.35 (App Router) + TypeScript + Tailwind CSS. Fully static.
- **Booking:** Web3Forms (form posts from the browser; key in `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`).
- **Brand colours:** Navy `#1B2B4B`, Cream `#F5F0E8`, Gold `#C9A84C`, Charcoal `#2D2D2D`.
- **Fonts:** Cormorant Garamond (headings), DM Sans (body), Playfair Display (accents).
- **Commands:** `npm --prefix src/website run dev` (preview) · `... run build` (verify build).

---

## 5. Key decisions & gotchas (so they're not re-discovered the hard way)

- **Booking is client-side on purpose.** A server-side proxy to Web3Forms was tried
  first but Cloudflare (which fronts Web3Forms) blocks server-to-server calls with a
  "Just a moment…" challenge. A real browser passes it, so the form submits directly
  from the browser. Don't re-introduce a server proxy for Web3Forms.
- **Web3Forms key is public by design.** It's a `NEXT_PUBLIC_` var (visible in the
  page). To prevent abuse, lock it to your domain in the Web3Forms dashboard. A
  honeypot field is already in the form to cut spam.
- **Next.js was pinned to a patched version** (14.2.35) because 14.2.15 had a known
  security advisory. Keep it patched.
- **The app is in a subfolder** (`src/website`), NOT the repo root. This matters for
  deployment (see §6).
- **Secrets policy:** never commit `.env*` files. The repo `.gitignore` enforces this
  (a `.gitignore` exception keeps `.env.example` tracked, since it has no real values).
- **Pricing model:** per-order markup + an optional £19.99/mo membership — NOT
  all-you-can-eat bundles (wrong fit for lumpy dry-clean demand). ~55% gross margin
  per item over an assumed 30% cleaner trade rate. Prices use .99 charm endings.
  Full model: `docs/06-pricing/pricing-model.md`.

---

## 6. Next step when ready: Deploy to Vercel

The site is ready to deploy. Recommended path (one-time setup via dashboard):

1. https://vercel.com/new → **Import Git Repository** → `mckinleyjhon8-hash/drycleaners`
2. In **Configure Project**:
   - **Root Directory** → Edit → select **`src/website`** ← critical (app isn't at repo root)
   - Framework Preset → should auto-detect **Next.js**
   - **Environment Variables** → add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` = `0977fe50-67cf-49da-8c45-d4794883bcc9`
3. **Deploy** → you get a `*.vercel.app` URL; every push to `main` then auto-deploys.

A Vercel MCP was connected and can trigger deploys / read build logs, but it cannot
set the Root Directory or env var — so the first-time setup must be done in the
dashboard as above. After that, redeploys can be automated.

---

## 7. Pending TO-DO (founder's real-world tasks)

- [ ] Buy a **domain** (e.g. thegarmentconcierge.co.uk / .com)
- [ ] Set up a **professional email** (e.g. hello@yourdomain via Google Workspace)
- [ ] Get a **business phone number**
- [ ] Identify & **negotiate with actual dry cleaners** — candidate list is in `CLAUDE.md`
      (priority anchor: **Stony Dry Cleaners**, Stony Stratford MK11 1SY, B2B-ready)
- [ ] Once domain/email/phone exist → **swap the placeholders** in the site:
  - Footer & booking section: `hello@thegarmentconcierge.co.uk`, `01908 000 000`
  - Company registration line in the footer
  - Confirm item prices once the cleaner **trade rate** is negotiated — model in `docs/06-pricing/pricing-model.md`
- [ ] **Deploy to Vercel** (§6)

---

## 8. Important references

- **Live repo:** https://github.com/mckinleyjhon8-hash/drycleaners
- **Web3Forms dashboard:** https://web3forms.com (manage key, see submissions, lock to domain)
- **Web3Forms access key:** `0977fe50-67cf-49da-8c45-d4794883bcc9` (public-by-design)
- **Business brief:** `CLAUDE.md` (includes the dry-cleaner partner shortlist)
- **Pricing model & margins:** `docs/06-pricing/pricing-model.md`
- **Market research / personas / financials:** `docs/`

---

*To continue with a fresh Claude Code session on any machine: clone the repo, open it,
and say "read HANDOFF.md and help me continue." Everything you need is in this repo.*
