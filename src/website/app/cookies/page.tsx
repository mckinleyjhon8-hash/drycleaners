import type { Metadata } from "next";
import LegalPage, { type Block } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How The Garment Concierge uses cookies and privacy-friendly analytics.",
};

const blocks: Block[] = [
  {
    p: "This Cookie Policy explains how The Garment Concierge uses cookies and similar technologies on our website. We keep this deliberately simple.",
  },
  { h: "1. What are cookies?" },
  {
    p: "Cookies are small text files placed on your device when you visit a website. They help websites function and can tell site owners how a site is being used.",
  },
  { h: "2. How we use them" },
  { p: "Our website uses only:" },
  {
    ul: [
      "Essential cookies — needed for the site to work and for your booking to be submitted securely.",
      "Privacy-friendly analytics — a cookieless tool that measures overall website usage without tracking you across the web or storing personal identifiers.",
    ],
  },
  { p: "We do not use advertising or third-party tracking cookies." },
  { h: "3. Managing cookies" },
  {
    p: "You can control or delete cookies through your browser settings. Because we rely only on essential and cookieless tools, blocking cookies will not affect your ability to browse the site or book a collection.",
  },
  { h: "4. More information" },
  {
    node: (
      <p>
        {"For how we handle your personal data more broadly, please see our "}
        <a href="/privacy">Privacy Policy</a>
        {"."}
      </p>
    ),
  },
];

export default function CookiesPage() {
  return <LegalPage title="Cookie Policy" updated="17 June 2026" blocks={blocks} />;
}
