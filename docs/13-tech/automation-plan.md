# Automation Plan — The Garment Concierge
## Running the business on n8n, with human-in-the-loop (HITL)

**Last updated:** 2026-06-16
**Goal:** automate ~70–80% of day-to-day operations, leaving a human in the loop only
at the **money, quality, and trust** decisions.

---

## 1. Principles

- **Automate the repetitive glue** — notifications, records, reminders, status updates, digests.
- **HITL only where judgement matters** — pricing on odd items, final invoices, route sign-off, complaints, damage, churn saves, AI-drafted replies.
- **n8n does HITL natively** — a *"Send and wait for response"* Telegram message with **Approve / Reject** buttons pauses the workflow until you tap. Your phone becomes the control panel.
- **The website is 100% static.** All dynamic and background work runs in **n8n on Railway**; **Postgres on Railway** is the data spine. Nothing heavy runs on the website host.

---

## 2. The full automation map

n8n does the automated column; you only tap at the HITL column.

| # | Area | n8n automates | Human tap (HITL) |
|---|------|---------------|------------------|
| 1 | **Bookings** | Capture → database, instant alert, customer acknowledgement | Approve price on unusual items |
| 2 | **Scheduling** | Slot assignment, day-before reminders, daily route list by area | Sign off the day's route |
| 3 | **Cleaner handoff** | Split items by best partner (F&T vs One Stop), notify cleaner, status log | — |
| 4 | **Returns / delivery** | "Out for delivery" alerts, proof-of-delivery capture | QC / damage calls |
| 5 | **Payments** \* | Invoice draft from actual items, payment link, receipts, dunning | Approve final invoice |
| 6 | **Membership** \* | Recurring billing, renewal reminders, churn-risk flags | Churn-save decisions |
| 7 | **CRM / retention** | Customer profiles, LTV, review/NPS requests, win-backs | — |
| 8 | **Support** | Triage inbound, AI-drafted replies, FAQ auto-answers | Approve / send reply |
| 9 | **Founder cockpit** | Daily digest (jobs, revenue, issues), exception alerts | Act on alerts |

\* Requires **Stripe** (not yet connected).

**Headline:** roughly 70–80% of the day-to-day runs itself; humans stay only on money / quality / trust.

---

## 3. Current state — Phase 1 (LIVE)

**Booking pipeline** — the spine everything else plugs into:

```
Website /book form → n8n webhook → Normalize fields → Ensure table
  → INSERT into Postgres → Telegram alert to founder → respond { ok: true }
```

- **Workflow:** "Garment Concierge — Booking Pipeline" (ID `aakDnEb6686k49tO`)
- **Webhook (production):** `https://primary-production-68f72.up.railway.app/webhook/garment-booking` (POST)
- **Database:** Railway Postgres → schema `garment_concierge`, table `bookings` (id, created_at, status + 15 booking fields)
- **Telegram alert:** chat `5827717998` (Musti / @Jay18732) via bot **@Thegarmentconciergebot**
- **Status:** built, tested end-to-end, published & live.

### Phase 1.1 — hardening (do before public launch)
- Lock webhook **CORS** to `thegarmentconcierge.co.uk` (currently open to all).
- Add a node to **drop submissions where the `botcheck` honeypot is filled** (spam).

---

## 4. Phased build roadmap

Each phase plugs into the same Postgres spine.

**Phase 1 — Booking pipeline** — ✅ DONE (see §3).

**Phase 2 — Customer comms + scheduling**
- Customer **booking confirmation** (email/SMS) — *needs a customer comms channel (see §5)*
- **Day-before collection reminder**
- **Daily founder digest** — morning Telegram: today's collections, returns, revenue, issues *(uses Postgres + Telegram — no new integration)*
- **Daily route list** grouped by area → **HITL: approve route**

**Phase 3 — Cleaner handoff + status**
- Split items by **best partner** (Fluff & Tumble everyday / One Stop specialist)
- Notify the partner of an incoming batch
- **Status tracking** (received → cleaning → ready) — driver/founder updates
- QC checklist on return

**Phase 4 — Payments + membership** — *needs Stripe*
- **Invoice draft** from actual items → **HITL: approve**
- Payment link + receipts
- Failed-payment **dunning** → **HITL: escalation**
- Membership **recurring billing** + renewal reminders + churn flags → **HITL: save**

**Phase 5 — CRM / retention + AI support**
- Customer **profiles, history, LTV** in Postgres
- Post-service **review / NPS** requests
- **Lapsed-customer win-back**
- Inbound support **triage + AI-drafted replies** → **HITL: send**

---

## 5. Integrations & credentials

| Service | Status | Used for |
|---|---|---|
| n8n (Railway) | ✅ | Orchestration |
| Postgres (Railway) | ✅ | Data spine (`garment_concierge` schema) |
| Telegram (@Thegarmentconciergebot) | ✅ | Founder alerts + HITL approvals |
| Slack | ✅ (available) | Optional alternative notifier |
| **Stripe** | ⏳ needed for Phase 4 | Payments, membership billing |
| **Customer comms** (Resend/SendGrid email **or** Twilio SMS) | ⏳ needed for Phase 2 | Customer confirmations & reminders |
| WhatsApp | Click-to-chat live on site (manual). **WhatsApp Business API via Twilio** = future automated channel | Fast customer response |

---

## 6. Data spine (Postgres)

- **Schema:** `garment_concierge`
- **Live table:** `bookings` (id, created_at, status, name, email, phone, address_line1/2, town, postcode, access_notes, service, turnaround, items, collection_date, time_window, membership, notes)
- **Future tables:** `customers`, `orders`, `payments`, `memberships`, `routes`, `partners`

---

## 7. HITL gates — where a human taps

Pricing on unusual items · daily route sign-off · final invoice approval ·
complaint / damage handling · membership churn-save · sending AI-drafted support replies.

Everything else runs automatically.
