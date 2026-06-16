# The Garment Concierge

> *Your Garments Deserve Better*

A luxury dry-cleaning **concierge & logistics** business for Milton Keynes, UK.
We don't clean garments — we collect them, manage the whole customer experience,
sub-contract cleaning to established local cleaners, and return them. Ultra-premium
positioning ("The Harrods of Garment Care").

- **Business brief:** [`CLAUDE.md`](CLAUDE.md)
- **Full status & how to resume on any machine:** [`HANDOFF.md`](HANDOFF.md)

## Status — pre-launch

| Area | State |
|---|---|
| Marketing website | ✅ Built — Next.js 14, **fully static** (`/` + `/book`) |
| Pricing | ✅ Per-order + £19.99/mo membership; live price carousel |
| Booking pipeline | ✅ **Live** — form → n8n webhook → Postgres + Telegram alert |
| Brand assets | ✅ Logo + icon (SVG/PNG/JPEG) in `assets/brand/` |
| Domain | ✅ thegarmentconcierge.co.uk |
| Contact | ✅ hello@ + WhatsApp · ⏳ phone (Twilio `01908`) |
| Deployment | ⏳ Not deployed — recommended host: **Cloudflare Pages** |
| Cleaner contracts | ⏳ To negotiate (shortlist in `CLAUDE.md`) |

## Run the website

```
npm --prefix src/website install
npm --prefix src/website run dev      # → http://localhost:3000
```

No secrets are required to run it — the booking webhook URL is built in (override via
`src/website/.env.example`).

## Repository structure

```
dry_cleaners_business/
├── CLAUDE.md              Master business brief (positioning, market, brand, metrics)
├── HANDOFF.md            Full status + resume guide — read this to continue
├── README.md             This file
├── docs/                 Business documentation
│   ├── 01-market-research/market-analysis.md
│   ├── 02-customer-avatars/customer-personas.md
│   ├── 06-pricing/pricing-model.md       Pricing & per-item margins
│   └── 07-financials/financial-model.md
├── assets/brand/         Logo + icon — logo.*, logo-navy.*, whatsapp-icon.*
└── src/website/          The website — Next.js 14, fully static
    ├── app/              page.tsx (landing) · book/page.tsx · layout · globals · icon.svg
    └── components/       BookingForm · Header · Logo · PriceCarousel · WhatsAppButton
```

## Booking & automation

The `/book` form POSTs to an **n8n** webhook (hosted on Railway) that saves each
booking to Postgres and sends an instant Telegram alert to the founder. Nothing
dynamic runs on the website host — it's 100% static, so it can deploy anywhere.
The pipeline and the Phase 2–5 automation roadmap are documented in
[`HANDOFF.md`](HANDOFF.md) §9.

## Brand quick reference

- **Tagline:** Your Garments Deserve Better
- **Palette:** Navy `#1B2B4B` · Cream `#F5F0E8` · Gold `#C9A84C` · Charcoal `#2D2D2D`
- **Type:** Cormorant Garamond (headings + wordmark) · DM Sans (body) · Playfair Display (accent)
- **Logo files:** `assets/brand/` — `logo.*` (light bg), `logo-navy.*` (dark bg), `whatsapp-icon.*` (profile)

## Security

Secrets live in git-ignored `.env*` files — never committed. The old Web3Forms key
is retired; the live site needs no secret to run.
