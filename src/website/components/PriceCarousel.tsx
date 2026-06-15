"use client";

import { useState } from "react";

const groups = [
  {
    label: "Business & Formalwear",
    items: [
      { item: "Two-piece suit", price: "£23.99" },
      { item: "Three-piece suit", price: "£28.99" },
      { item: "Jacket / blazer", price: "£13.99" },
      { item: "Trousers", price: "£11.99" },
      { item: "Waistcoat", price: "£8.99" },
      { item: "Shirt, washed & pressed", price: "£4.99" },
      { item: "Tie or scarf", price: "£6.99" },
      { item: "Standard dress", price: "£19.99" },
      { item: "Silk dress", price: "£23.99" },
      { item: "Dress & jacket", price: "£29.99" },
      { item: "Skirt", price: "£11.99" },
      { item: "Pleated skirt", price: "£14.99" },
    ],
  },
  {
    label: "Outerwear, Knitwear & Occasion",
    items: [
      { item: "Short coat", price: "£18.99" },
      { item: "Long coat", price: "£23.99" },
      { item: "Puffer jacket", price: "£26.99" },
      { item: "Canada Goose / Moncler", price: "£54.99" },
      { item: "Wax jacket", price: "£68.99" },
      { item: "Jumper / cardigan", price: "£10.99" },
      { item: "Hoodie / sweatshirt", price: "£11.99" },
      { item: "Evening gown", price: "£27.99" },
      { item: "Wedding dress", price: "£119.99" },
      { item: "Bridesmaid dress", price: "£41.99" },
      { item: "Saree", price: "£41.99" },
      { item: "Asian two-piece", price: "£17.99" },
    ],
  },
  {
    label: "Specialist, Home & Laundry",
    items: [
      { item: "Leather jacket", price: "£47.99" },
      { item: "Leather coat", price: "£64.99" },
      { item: "Leather trousers", price: "£28.99" },
      { item: "Motorbike leathers", price: "£84.99" },
      { item: "UGG boots", price: "£23.99" },
      { item: "Designer handbag", price: "£27.99" },
      { item: "Duvet (single)", price: "£25.99" },
      { item: "Duvet (double / king)", price: "£31.99" },
      { item: "Pillows (each)", price: "£16.99" },
      { item: "Curtains (per pair)", price: "£12.99" },
      { item: "Service wash (per kg)", price: "£7.99" },
      { item: "Trouser hem", price: "£14.99" },
      { item: "Zip replacement", price: "£17.99" },
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
