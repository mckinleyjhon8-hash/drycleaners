# Automation Plan — The Garment Concierge
## Running the business on n8n, with human-in-the-loop (HITL)

**Last updated:** 2026-06-20
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

### Phase 1.1 — hardening
- ✅ **Spam filter LIVE** — a Filter node ("Drop Spam") bins any submission with the
  `botcheck` honeypot filled, or missing email/postcode, **before** it reaches Postgres
  or Telegram. Verified: spam stops at the filter (33 ms); legit passes through.
- ✅ **CORS LOCKED** — the webhook `allowedOrigins` is set to `https://thegarmentconcierge.co.uk`
  + `www` (was `*`) and published live; other origins are refused by the browser.
- ⏳ **Optional:** add **Cloudflare Turnstile** (invisible CAPTCHA) for stronger bot
  protection. (CORS alone is weak — n8n still runs the workflow for a disallowed origin;
  it only blocks the browser from reading the response.)

---

## 4. Phased build roadmap

Each phase plugs into the same Postgres spine.

**Phase 1 — Booking pipeline** — ✅ DONE (see §3).

**Phase 2 — Customer comms + scheduling**
- ✅ Customer **booking confirmation email** — **LIVE.** Sent via the **Gmail node** (HTTPS)
  from the dedicated "The Garment Concierge" Gmail; branded HTML, reply-to `hello@`, with a
  fail-safe so a mail issue never blocks a booking saving.
- ✅ **Confirm Booking** (HITL) — founder form (`/form/garment-confirm`) sets confirmed
  collection/return dates, window, final price + note → booking becomes `confirmed`, the
  customer is emailed the confirmed details, the founder is pinged. The booking alert now
  carries the GC-ref + a Confirm link. Workflow `NrTUQ08I9UWxk1Jr`.
- ✅ **Daily Founder Digest** — 7am Telegram brief: new bookings (24h), open count, today's
  preferred collections. Workflow `MsYpdYGTtqMLzuvu`.
- ✅ **Day-Before Reminder** — 5pm; emails each customer whose booking is `confirmed` for
  collection tomorrow. Workflow `6Xf4vYUNwkUy78ee`.
- ✅ **Daily Route List** — 7:30am; today's confirmed collections grouped by area → founder
  Telegram (silent when there are none). Workflow `zsnDrsAoDyVKzfuy`. *(Tap-to-approve HITL can be layered on.)*

**Phase 3 — Cleaner handoff + status**
- Split items by **best partner** (Fluff & Tumble everyday / One Stop specialist)
- Notify the partner of an incoming batch
- **Status tracking** (received → cleaning → ready) — driver/founder updates
- QC checklist on return

**Phase 4 — Payments + membership**
- ✅ **Membership onboarding LIVE (sandbox)** — Stripe Payment Link (Concierge Membership,
  £19.99/mo, product `prod_UjzGHVi3UV9Cva`) → Stripe webhook → n8n records the member in
  `garment_concierge.members` → welcome email → founder ping. Workflow `mSKD0zXGuMQfVYSZ`.
  Architecture: a plain n8n **Webhook** node (no Stripe key in n8n); the webhook endpoint is
  registered in the Stripe dashboard. Site "Become a Member" button → the Payment Link.
  **Go-live:** swap to the LIVE Payment Link + add webhook **signature verification**.
- ⏳ Invoice draft from actual items → HITL approve · receipts
- ⏳ Failed-payment dunning, renewal reminders, churn flags → HITL save
- ⏳ Cancellation handling (`customer.subscription.deleted` → mark member inactive)

**Phase 5 — CRM / retention + AI support**
- Customer **profiles, history, LTV** in Postgres
- ✅ Post-service **review request** — daily 11am; emails customers returned 2+ days ago, asks once (`review_requested` flag). Workflow `7QWcpkRWmYGH7umq`. *(NPS scoring + Google-review link to add.)*
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
| **Stripe** (sandbox "Dry cleaning sandbox") | ✅ membership LIVE (test) | Membership checkout (Payment Link) + recurring billing; webhook → n8n |
| **Customer email** — **Gmail node** (HTTPS API) | ✅ LIVE | Booking confirmation emails (from the dedicated Garment Concierge Gmail) |
| WhatsApp | Click-to-chat live on site (manual). **WhatsApp Business API via Twilio** = future automated channel | Fast customer response |

> ⚠️ **Gotcha — Railway blocks outbound SMTP** (ports 25/465/587), so PrivateEmail SMTP
> times out from n8n (confirmed: clean "Connection timeout"). Customer email therefore goes
> via the **Gmail node** (Google's HTTPS API), which Railway allows. The send shows display
> name "The Garment Concierge" + reply-to `hello@`. To make the *visible* sender read
> `hello@` (not the Gmail address), add an HTTP email API like **Resend** later (needs DNS
> verification). Don't waste time debugging SMTP credentials — the port is the blocker.

---

## 6. Data spine (Postgres)

- **Schema:** `garment_concierge`
- **Live table:** `bookings` — original fields (id, created_at, status, name, email, phone, address_line1/2, town, postcode, access_notes, service, turnaround, items, collection_date, time_window, membership, notes) **+ confirmation fields** (confirmed_collection_date, confirmed_window, confirmed_return_date, quoted_price, confirm_note, confirmed_at, review_requested). Status flow: `new → confirmed → collected → ready → returned`.
- **Live table:** `members` (id, created_at, status, name, email, stripe_customer_id, stripe_subscription_id, amount_total, currency) — populated by the Stripe membership webhook (`mSKD0zXGuMQfVYSZ`).
- **Future tables:** `customers`, `orders`, `payments`, `routes`, `partners`

---

## 7. HITL gates — where a human taps

Pricing on unusual items · daily route sign-off · final invoice approval ·
complaint / damage handling · membership churn-save · sending AI-drafted support replies.

Everything else runs automatically.
