"use client";

import { useState } from "react";

const services = [
  "Dry Cleaning",
  "Laundry & Press",
  "Shirt Service",
  "Alterations & Repairs",
  "Household & Linens",
  "Occasion & Bridal",
  "A mix / not sure yet",
];

const timeWindows = [
  "Any time",
  "Morning (8am–12pm)",
  "Afternoon (12pm–5pm)",
  "Evening (5pm–8pm)",
];

const inputBase =
  "w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition focus:border-gold focus:ring-1 focus:ring-gold";
const labelBase = "mb-2 block text-xs font-medium text-charcoal/70";

// Web3Forms access keys are public by design (used in client-side forms).
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

function Legend({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-b border-navy/10 pb-2 text-xs font-semibold uppercase tracking-luxe text-gold-dark">
      {children}
    </p>
  );
}

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", ACCESS_KEY ?? "");
    formData.append("from_name", "The Garment Concierge");
    formData.append(
      "subject",
      `New booking — ${formData.get("name")} (${formData.get("postcode")})`,
    );

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as { success?: boolean; message?: string };

      if (data.success) {
        setSubmitted(true);
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error(data.message || "We couldn't submit your booking. Please try again.");
      }
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please try again, or email us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-gold/40 bg-cream p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/20">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1B2B4B" strokeWidth="1.8">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 text-2xl font-semibold text-navy">Booking received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-charcoal/70">
          Thank you. Our concierge team will be in touch shortly — usually the same day —
          to confirm your collection window and pricing. Welcome to a better standard of
          garment care.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-7 text-sm font-medium text-gold-dark underline-offset-4 hover:underline"
        >
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-5">
        <Legend>Your details</Legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelBase}>Full name</label>
            <input id="name" name="name" required placeholder="Jane Harrington" className={inputBase} />
          </div>
          <div>
            <label htmlFor="phone" className={labelBase}>Phone</label>
            <input id="phone" name="phone" type="tel" required placeholder="07700 900000" className={inputBase} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className={labelBase}>Email</label>
            <input id="email" name="email" type="email" required placeholder="you@email.com" className={inputBase} />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <Legend>Collection address</Legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="address_line1" className={labelBase}>Address line 1</label>
            <input id="address_line1" name="address_line1" required placeholder="12 Sandy Court" className={inputBase} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="address_line2" className={labelBase}>
              Address line 2 <span className="text-charcoal/40">(optional)</span>
            </label>
            <input id="address_line2" name="address_line2" className={inputBase} />
          </div>
          <div>
            <label htmlFor="town" className={labelBase}>Town / City</label>
            <input id="town" name="town" required placeholder="Milton Keynes" className={inputBase} />
          </div>
          <div>
            <label htmlFor="postcode" className={labelBase}>Postcode</label>
            <input id="postcode" name="postcode" required placeholder="MK17 8FB" className={inputBase} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="access_notes" className={labelBase}>
              Access notes <span className="text-charcoal/40">(optional)</span>
            </label>
            <input id="access_notes" name="access_notes" placeholder="Parking, gate code, where to collect…" className={inputBase} />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <Legend>What needs cleaning</Legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="service" className={labelBase}>Primary service</label>
            <select id="service" name="service" defaultValue="" required className={inputBase}>
              <option value="" disabled>Select a service…</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="turnaround" className={labelBase}>Turnaround</label>
            <select id="turnaround" name="turnaround" defaultValue="Standard (48 hours)" className={inputBase}>
              <option>Standard (48 hours)</option>
              <option>Express (next-day)</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="items" className={labelBase}>Items &amp; approximate quantities</label>
            <textarea id="items" name="items" rows={3} required placeholder="e.g. 2 suits, 5 shirts, 1 double duvet, 1 winter coat" className={inputBase} />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <Legend>Collection window</Legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="collection_date" className={labelBase}>Preferred date</label>
            <input id="collection_date" name="collection_date" type="date" className={inputBase} />
          </div>
          <div>
            <label htmlFor="time_window" className={labelBase}>Preferred time</label>
            <select id="time_window" name="time_window" defaultValue="Any time" className={inputBase}>
              {timeWindows.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <Legend>Membership</Legend>
        <div>
          <label htmlFor="membership" className={labelBase}>How would you like to go ahead?</label>
          <select id="membership" name="membership" defaultValue="Pay as you go" className={inputBase}>
            <option>Pay as you go</option>
            <option>Join the Concierge Membership (£19.99/mo)</option>
          </select>
        </div>
        <div>
          <label htmlFor="notes" className={labelBase}>
            Anything else? <span className="text-charcoal/40">(optional)</span>
          </label>
          <textarea id="notes" name="notes" rows={2} placeholder="Special instructions, stains to flag, delicate items…" className={inputBase} />
        </div>
      </div>

      {/* Honeypot: bots fill this; humans never see it. Web3Forms drops matches. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" className="hidden" />

      <label className="flex items-start gap-3 text-sm text-charcoal/75">
        <input type="checkbox" name="consent" required value="Agreed" className="mt-0.5 h-4 w-4 shrink-0 accent-gold" />
        <span>I agree to be contacted about my booking and accept the Terms &amp; Privacy Policy.</span>
      </label>

      {error && (
        <p className="rounded-sm border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <div>
        <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
          {submitting ? "Sending…" : "Request My Collection"}
        </button>
        <p className="mt-3 text-xs text-charcoal/50">
          No payment required to book. We&apos;ll confirm pricing and your collection window before anything is cleaned.
        </p>
      </div>
    </form>
  );
}
