import PriceCarousel from "@/components/PriceCarousel";

// Stripe Payment Link for Concierge Membership.
// Defaults to the TEST link — set NEXT_PUBLIC_STRIPE_MEMBER_LINK to the LIVE link before taking real payments.
const MEMBER_CHECKOUT_URL =
  process.env.NEXT_PUBLIC_STRIPE_MEMBER_LINK ??
  "https://buy.stripe.com/test_14AdRagGCbgcbGcanudZ600";

/* ----------------------------------------------------------------- data --- */

const steps = [
  {
    n: "01",
    title: "We Collect",
    body: "Book a collection in under a minute. Our concierge driver arrives at your door, in a two-hour window that suits you.",
  },
  {
    n: "02",
    title: "We Care",
    body: "Your garments are cleaned and finished by Milton Keynes' most trusted artisan cleaners, then inspected against our standard.",
  },
  {
    n: "03",
    title: "We Return",
    body: "Pressed, protected and returned to your door — typically within 48 hours, or next-day with Express.",
  },
];

const services = [
  {
    title: "Dry Cleaning",
    body: "Suits, dresses, coats and delicates, treated with precision and pressed by hand.",
    icon: (
      <path d="M12 3l4 4-4 2-4-2 4-4zM8 7l-4 12h16L16 7" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Laundry & Press",
    body: "Crisp shirts and everyday laundry, laundered and finished to a flawless standard.",
    icon: (
      <path d="M4 5h16v14H4zM4 9h16M9 5v4" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Alterations & Repairs",
    body: "Tailoring, hems, zips and repairs handled by skilled, careful hands.",
    icon: (
      <path d="M6 3v8a3 3 0 006 0M18 21V9M6 13a3 3 0 100 6 3 3 0 000-6zM18 5a2 2 0 100 4 2 2 0 000-4z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Household & Linens",
    body: "Bedding, duvets, curtains and table linens, refreshed and returned hotel-crisp.",
    icon: (
      <path d="M3 7l9-4 9 4M5 7v12h14V7M9 19v-5h6v5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Occasion & Bridal",
    body: "Wedding gowns and eveningwear, expertly cleaned and preserved for keeping.",
    icon: (
      <path d="M12 3l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1 2-4z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Express Service",
    body: "Need it tomorrow? Priority next-day turnaround whenever the moment calls.",
    icon: (
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

const plans = [
  {
    name: "Pay As You Go",
    price: "£0",
    cadence: "no membership fee",
    tagline: "Simple pricing, per item.",
    featured: false,
    cta: "Book a Collection",
    features: [
      "A transparent price for every garment",
      "Collection & delivery from £4.99 (free over £30)",
      "48-hour standard turnaround",
      "No commitment, ever",
    ],
  },
  {
    name: "Concierge Member",
    price: "£19.99",
    cadence: "/ month",
    tagline: "For wardrobes worth looking after.",
    featured: true,
    cta: "Become a Member",
    features: [
      "Free collection & delivery, always",
      "15% off all cleaning",
      "Priority scheduling & express slots",
      "Your own garment-care concierge",
    ],
  },
];

const areas = [
  "Broughton, Middleton & Kents Hill",
  "Woburn Sands & Bow Brickhill",
  "Westcroft & Shenley Brook End",
  "Tattenhoe & Emerson Valley",
  "Two Mile Ash",
  "Walnut Tree & Tilbrook",
  "Loughton & Shenley Church End",
  "Woughton & Woolstone",
];

/* ------------------------------------------------------------- sections --- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy">
      <img
        src="/images/hero-garments.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/80 to-navy/55" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.16),_transparent_55%)]" />
      <div className="container-luxe relative z-10 flex min-h-[92vh] flex-col justify-center py-32">
        <div className="max-w-3xl animate-fade-up">
          <p className="eyebrow mb-6 text-gold">Milton Keynes · White-Glove Garment Care</p>
          <h1 className="font-serif text-5xl font-semibold leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
            Your Garments
            <br />
            Deserve <span className="italic text-gold">Better</span>.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/75">
            Luxury dry cleaning, collected from your door and returned
            impeccably. We handle the care, the logistics and every quiet
            detail — so you never think about it again.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="/book" className="btn-primary">Book a Collection</a>
            <a href="#membership" className="btn-outline-light">View Pricing</a>
          </div>
          <p className="mt-10 text-sm text-cream/50">
            Collection &amp; delivery across MK&apos;s finest addresses · Fully insured · Eco-conscious cleaning
          </p>
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  const items = ["48-hour standard turnaround", "Fully insured, door to door", "Eco-conscious cleaning", "Trusted local artisans"];
  return (
    <section className="border-b border-navy/10 bg-cream">
      <div className="container-luxe grid grid-cols-2 gap-px py-0 md:grid-cols-4">
        {items.map((item) => (
          <div key={item} className="px-2 py-6 text-center">
            <p className="text-sm font-medium text-navy/80">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-cream py-24 sm:py-32">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How It Works</p>
          <h2 className="mt-4 text-4xl font-semibold text-navy sm:text-5xl">
            Three steps. Zero effort.
          </h2>
          <div className="mx-auto mt-6 hairline" />
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="relative">
              <span className="font-display text-5xl text-gold/40">{step.n}</span>
              <h3 className="mt-4 text-2xl font-semibold text-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-white py-24 sm:py-32">
      <div className="container-luxe">
        <div className="max-w-2xl">
          <p className="eyebrow">Our Services</p>
          <h2 className="mt-4 text-4xl font-semibold text-navy sm:text-5xl">
            Care for every thread you own.
          </h2>
          <div className="mt-6 hairline" />
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-sm border border-navy/10 bg-cream/40 p-8 transition-colors hover:border-gold/50 hover:bg-cream"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="1.4"
                className="mb-5"
              >
                {service.icon}
              </svg>
              <h3 className="text-xl font-semibold text-navy">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{service.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 sm:py-28">
      <img
        src="/images/cuff-detail.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-navy/80" />
      <div className="container-luxe relative z-10 text-center">
        <p className="mx-auto max-w-3xl font-display text-3xl font-medium italic leading-snug text-cream sm:text-4xl">
          “The luxury isn&apos;t the cleaning. It&apos;s never having to think about it.”
        </p>
        <p className="mt-8 text-sm uppercase tracking-luxe text-gold">The Garment Concierge Standard</p>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="membership" className="bg-cream py-24 sm:py-32">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Pricing</p>
          <h2 className="mt-4 text-4xl font-semibold text-navy sm:text-5xl">
            Simple pricing. No subscription required.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-charcoal/70">
            Pay per item, with collection and delivery taken care of. Become a member
            for free delivery and members&apos; pricing — but you never have to.
          </p>
        </div>

        <div className="mt-14">
          <PriceCarousel />
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-8 lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-sm border p-8 ${
                plan.featured
                  ? "border-gold bg-navy text-cream shadow-xl"
                  : "border-navy/12 bg-white text-charcoal"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-4 py-1 text-[10px] font-semibold uppercase tracking-widest text-navy shadow-md">
                  Most popular
                </span>
              )}
              <h3 className={`text-2xl font-semibold ${plan.featured ? "text-cream" : "text-navy"}`}>
                {plan.name}
              </h3>
              <p className={`mt-1 text-sm ${plan.featured ? "text-cream/70" : "text-charcoal/60"}`}>
                {plan.tagline}
              </p>
              <p className="mt-6">
                <span className={`font-serif text-5xl font-semibold ${plan.featured ? "text-gold" : "text-navy"}`}>
                  {plan.price}
                </span>
                <span className={`ml-1 text-sm ${plan.featured ? "text-cream/60" : "text-charcoal/50"}`}>{plan.cadence}</span>
              </p>

              <ul className={`mt-8 flex-1 space-y-3 text-sm ${plan.featured ? "text-cream/85" : "text-charcoal/75"}`}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" className="mt-0.5 shrink-0">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.featured ? MEMBER_CHECKOUT_URL : "/book"}
                target={plan.featured ? "_blank" : undefined}
                rel={plan.featured ? "noopener noreferrer" : undefined}
                className={`mt-8 ${plan.featured ? "btn-primary" : "btn-outline-dark"} w-full`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-charcoal/45">
          Indicative launch pricing. Membership can be cancelled anytime.
        </p>
      </div>
    </section>
  );
}

function Coverage() {
  return (
    <section id="coverage" className="bg-white py-24 sm:py-32">
      <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">Where We Serve</p>
          <h2 className="mt-4 text-4xl font-semibold text-navy sm:text-5xl">
            Proudly serving Milton Keynes&apos; most discerning neighbourhoods.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal/70">
            We collect and deliver across MK1–MK19. Not sure if we reach you?
            Enter your postcode when you book and we&apos;ll confirm in moments.
          </p>
          <a href="/book" className="btn-outline-dark mt-8">Check My Postcode</a>
        </div>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-navy/10 bg-navy/10 sm:grid-cols-2">
          {areas.map((area) => (
            <li key={area} className="flex items-center gap-3 bg-cream px-5 py-4 text-sm font-medium text-navy">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section id="book" className="bg-cream py-24 sm:py-32">
      <div className="container-luxe text-center">
        <p className="eyebrow">Book a Collection</p>
        <h2 className="mt-4 text-4xl font-semibold text-navy sm:text-5xl">
          Reclaim your weekends.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-charcoal/70">
          Tell us where you are and what needs caring for. Our concierge team will
          confirm your collection window and pricing — usually the same day.
        </p>
        <a href="/book" className="btn-primary mt-9">Book a Collection</a>
        <div className="mx-auto mt-10 flex max-w-lg flex-col items-center gap-3 text-sm text-charcoal/60 sm:flex-row sm:justify-center sm:gap-10">
          <span>No payment required to book</span>
          <span>Fully insured, door to door</span>
          <span>Eco-conscious cleaning</span>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- page --- */

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <HowItWorks />
      <Services />
      <Quote />
      <Pricing />
      <Coverage />
      <Booking />
    </>
  );
}
