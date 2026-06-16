import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import WhatsAppButton, { WHATSAPP_HREF } from "@/components/WhatsAppButton";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = "https://thegarmentconcierge.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Garment Concierge | Luxury Dry Cleaning in Milton Keynes",
    template: "%s | The Garment Concierge",
  },
  description:
    "White-glove dry cleaning, collected from your door and returned impeccably across Milton Keynes. Concierge garment care, membership, and next-day express service.",
  keywords: [
    "dry cleaning Milton Keynes",
    "luxury laundry service",
    "garment collection and delivery",
    "concierge dry cleaning",
    "shirt service Milton Keynes",
  ],
  openGraph: {
    title: "The Garment Concierge | Luxury Dry Cleaning in Milton Keynes",
    description:
      "White-glove garment care, collected and delivered across Milton Keynes' finest addresses.",
    url: siteUrl,
    siteName: "The Garment Concierge",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Garment Concierge | Luxury Dry Cleaning in Milton Keynes",
    description:
      "White-glove garment care, collected and delivered across Milton Keynes.",
  },
};

function Footer() {
  return (
    <footer className="bg-navy text-cream/80">
      <div className="container-luxe py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="text-2xl text-cream">
              <Logo />
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              Luxury garment care for Milton Keynes — collected from your door,
              returned impeccably. Your garments deserve better.
            </p>
          </div>

          <div>
            <p className="eyebrow text-gold">Services</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a className="hover:text-gold" href="/#services">Dry Cleaning</a></li>
              <li><a className="hover:text-gold" href="/#services">Laundry &amp; Press</a></li>
              <li><a className="hover:text-gold" href="/#services">Alterations</a></li>
              <li><a className="hover:text-gold" href="/#services">Household &amp; Linens</a></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-gold">Company</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a className="hover:text-gold" href="/#how-it-works">How It Works</a></li>
              <li><a className="hover:text-gold" href="/#membership">Pricing</a></li>
              <li><a className="hover:text-gold" href="/#coverage">Coverage</a></li>
              <li><a className="hover:text-gold" href="/book">Book a Collection</a></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-gold">Contact</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a className="hover:text-gold" href="mailto:hello@thegarmentconcierge.co.uk">hello@thegarmentconcierge.co.uk</a></li>
              <li><a className="hover:text-gold" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">WhatsApp us</a></li>
              <li className="text-cream/60">Milton Keynes, MK1–MK19</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-8 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} The Garment Concierge. A trading name of a company registered in England &amp; Wales.</p>
          <div className="flex gap-6">
            <a className="hover:text-gold" href="#">Terms</a>
            <a className="hover:text-gold" href="#">Privacy</a>
            <a className="hover:text-gold" href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${cormorant.variable} ${dmSans.variable} ${playfair.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
