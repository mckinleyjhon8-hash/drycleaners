# The Garment Concierge

> *Your Garments Deserve Better*

A luxury dry-cleaning **concierge & logistics** layer for Milton Keynes, UK.
We don't clean garments — we collect them, manage the entire customer experience,
partner with established cleaners as our back-end, and return them. White-glove
service, ultra-premium positioning ("The Harrods of Garment Care").

The full business brief, market data, brand system, and build plan live in
[`CLAUDE.md`](CLAUDE.md).

## Status

| | |
|---|---|
| Stage | Pre-launch / foundation |
| Location | Milton Keynes, Buckinghamshire, UK |
| Contents | Business documentation + (planned) website & systems |

## Repository structure

```
dry_cleaners_business/
├── CLAUDE.md                 Master brief (positioning, market, brand, metrics)
├── README.md                 This file
├── docs/                     Business documentation
│   ├── 01-market-research/   ✅ market-analysis.md
│   ├── 02-customer-avatars/  ✅ customer-personas.md
│   ├── 03-business-model/
│   ├── 04-brand/
│   ├── 05-services/
│   ├── 06-pricing/
│   ├── 07-financials/        ✅ financial-model.md
│   ├── 08-legal/
│   ├── 09-operations/
│   ├── 10-sales/
│   ├── 11-website/
│   ├── 12-copy/
│   ├── 13-tech/
│   ├── 14-hiring/
│   ├── 15-scaling/
│   ├── 16-investor/
│   └── 17-roadmap/
├── src/
│   ├── website/              Next.js site (planned)
│   ├── crm/                  CRM configuration
│   ├── booking/              Booking system
│   └── automation/           Email / SMS sequences
├── prompts/                  Section build prompts
└── assets/brand/             Brand guidelines & assets
```

`✅` = content present.

## Completed documents

- **Market analysis** — [`docs/01-market-research/market-analysis.md`](docs/01-market-research/market-analysis.md)
- **Customer avatars** — [`docs/02-customer-avatars/customer-personas.md`](docs/02-customer-avatars/customer-personas.md)
- **Financial model** — [`docs/07-financials/financial-model.md`](docs/07-financials/financial-model.md)

## Security

- Secrets belong in a `.env` file — **git-ignored**, never committed.
- Do not store tokens or keys in tracked files (including `.txt` notes).

## Brand quick reference

- **Tagline:** Your Garments Deserve Better
- **Palette:** Deep Navy `#1B2B4B` · Warm Cream `#F5F0E8` · Burnished Gold `#C9A84C` · Charcoal `#2D2D2D`
- **Type:** Cormorant Garamond (headings) · DM Sans (body) · Playfair Display (accent)
