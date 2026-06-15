"use client";

import { useState } from "react";

const groups = [
  {
    label: "Business & Formalwear",
    items: [
      { item: "Two-piece suit", price: "£24" },
      { item: "Three-piece suit", price: "£29" },
      { item: "Jacket / blazer", price: "£14" },
      { item: "Trousers", price: "£12" },
      { item: "Waistcoat", price: "£9" },
      { item: "Shirt, washed & pressed", price: "£4.50" },
      { item: "Tie or scarf", price: "£7" },
      { item: "Standard dress", price: "£20" },
      { item: "Silk dress", price: "£24" },
      { item: "Dress & jacket", price: "£30" },
      { item: "Skirt", price: "£12" },
      { item: "Pleated skirt", price: "£15" },
    ],
  },
  {
    label: "Outerwear, Knitwear & Occasion",
    items: [
      { item: "Short coat", price: "£19" },
      { item: "Long coat", price: "£24" },
      { item: "Puffer jacket", price: "£27" },
      { item: "Canada Goose / Moncler", price: "£55" },
      { item: "Wax jacket", price: "£69" },
      { item: "Jumper / cardigan", price: "£11" },
      { item: "Hoodie / sweatshirt", price: "£12" },
      { item: "Evening gown", price: "£28" },
      { item: "Wedding dress", price: "£120" },
      { item: "Bridesmaid dress", price: "£42" },
      { item: "Saree", price: "£42" },
      { item: "Asian two-piece", price: "£18" },
    ],
  },
  {
    label: "Specialist, Home & Laundry",
    items: [
      { item: "Leather jacket", price: "£48" },
      { item: "Leather coat", price: "£65" },
      { item: "Leather trousers", price: "£29" },
      { item: "Motorbike leathers", price: "£85" },
      { item: "UGG boots", price: "£24" },
      { item: "Designer handbag", price: "£28" },
      { item: "Duvet (single)", price: "£26" },
      { item: "Duvet (double / king)", price: "£32" },
      { item: "Pillows (each)", price: "£17" },
      { item: "Curtains (per pair)", price: "£13" },
      { item: "Service wash (per kg)", price: "£8" },
      { item: "Trouser hem", price: "£15" },
      { item: "Zip replacement", price: "£18" },
    ],
  },
];

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PriceCarousel() {
  const [active, setActive] = useState(0);
  const move = (dir: number) => setActive((a) => (a + dir + groups.length) % groups.length);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-sm border border-navy/10 bg-white p-6 sm:p-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous category"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:border-gold hover:text-gold-dark"
          >
            <Chevron dir="left" />
          </button>
          <p className="eyebrow text-center">{groups[active].label}</p>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next category"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:border-gold hover:text-gold-dark"
          >
            <Chevron dir="right" />
          </button>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {groups.map((group) => (
              <dl key={group.label} className="grid w-full shrink-0 gap-x-12 sm:grid-cols-2">
                {group.items.map((row) => (
                  <div
                    key={row.item}
                    className="flex items-baseline justify-between gap-4 border-b border-navy/10 py-3"
                  >
                    <dt className="text-sm text-charcoal/80">{row.item}</dt>
                    <dd className="whitespace-nowrap font-serif text-lg font-semibold text-navy">
                      from {row.price}
                    </dd>
                  </div>
                ))}
              </dl>
            ))}
          </div>
        </div>
      </div>

      <div
        className="mt-7 flex items-center justify-center gap-3"
        role="tablist"
        aria-label="Price categories"
      >
        {groups.map((group, i) => (
          <button
            key={group.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={group.label}
            onClick={() => setActive(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === active ? "w-7 bg-gold" : "w-2.5 bg-navy/20 hover:bg-navy/40"
            }`}
          />
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-charcoal/45">
        Indicative prices, confirmed before any cleaning. Members save 15% on every item.
      </p>
    </div>
  );
}
