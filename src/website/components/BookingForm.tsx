"use client";

import { useState } from "react";

const services = [
  "Dry Cleaning",
  "Laundry & Press",
  "Shirt Service",
  "Alterations & Repairs",
  "Household & Linens",
  "Occasion & Bridal",
  "Not sure yet",
];

const inputBase =
  "w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition focus:border-gold focus:ring-1 focus:ring-gold";

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  // NOTE: front-end only for now. Wire this to an API route / Stripe / CRM
  // (e.g. POST to /api/bookings) before launch — see docs/13-tech.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-gold/40 bg-cream p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/20">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1B2B4B" strokeWidth="1.8">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 text-2xl font-semibold text-navy">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-charcoal/70">
          Thank you. Our concierge team will be in touch shortly to confirm your
          first collection window. Welcome to a better standard of garment care.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-7 text-sm font-medium text-gold-dark underline-offset-4 hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label htmlFor="name" className="mb-2 block text-xs font-medium text-charcoal/70">
          Full name
        </label>
        <input id="name" name="name" required placeholder="Jane Harrington" className={inputBase} />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="postcode" className="mb-2 block text-xs font-medium text-charcoal/70">
          Postcode
        </label>
        <input id="postcode" name="postcode" required placeholder="MK10 9AB" className={inputBase} />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="email" className="mb-2 block text-xs font-medium text-charcoal/70">
          Email
        </label>
        <input id="email" name="email" type="email" required placeholder="you@email.com" className={inputBase} />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="phone" className="mb-2 block text-xs font-medium text-charcoal/70">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" placeholder="07700 900000" className={inputBase} />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="service" className="mb-2 block text-xs font-medium text-charcoal/70">
          Service
        </label>
        <select id="service" name="service" defaultValue="" required className={inputBase}>
          <option value="" disabled>Select a service…</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="date" className="mb-2 block text-xs font-medium text-charcoal/70">
          Preferred collection date
        </label>
        <input id="date" name="date" type="date" className={inputBase} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="notes" className="mb-2 block text-xs font-medium text-charcoal/70">
          Notes <span className="text-charcoal/40">(optional)</span>
        </label>
        <textarea id="notes" name="notes" rows={3} placeholder="Anything we should know about your garments?" className={inputBase} />
      </div>

      <div className="sm:col-span-2">
        <button type="submit" className="btn-primary w-full sm:w-auto">
          Request My Collection
        </button>
        <p className="mt-3 text-xs text-charcoal/50">
          No payment required to book. We&apos;ll confirm pricing and your collection window before anything is cleaned.
        </p>
      </div>
    </form>
  );
}
