import type { Metadata } from "next";
import LegalPage, { type Block } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The Garment Concierge collects, uses and protects your personal data under UK GDPR.",
};

const blocks: Block[] = [
  {
    p: "This Privacy Policy explains how The Garment Concierge (“we”, “us”, “our”) collects, uses and protects your personal information when you use our website and our garment collection, care and delivery service. We are committed to handling your data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.",
  },
  { h: "1. Who we are" },
  {
    node: (
      <p>
        {"The Garment Concierge is a luxury garment care and concierge service operating across Milton Keynes and the surrounding MK postcode areas. For the purposes of data protection law, we are the data controller of the personal information you provide. You can reach us by email at "}
        <a href="mailto:hello@thegarmentconcierge.co.uk">hello@thegarmentconcierge.co.uk</a>
        {" or by phone on "}
        <a href="tel:+441908103315">01908 103315</a>
        {"."}
      </p>
    ),
  },
  { h: "2. The information we collect" },
  { p: "Depending on how you interact with us, we may collect:" },
  {
    ul: [
      "Identity and contact details — your name, email address, telephone number and collection/delivery address, including postcode.",
      "Booking details — the garments and services you request, turnaround preferences, collection windows, access notes and any special instructions.",
      "Membership and payment information — your chosen plan and, where applicable, payment details. Card payments are handled securely by our payment provider; we do not store full card numbers.",
      "Communications — messages you send us by form, email, phone or WhatsApp.",
      "Technical data — limited, privacy-friendly analytics about how our website is used.",
    ],
  },
  { h: "3. How we use your information" },
  { p: "We use your personal data for the following purposes, on the following legal bases:" },
  {
    ul: [
      "To provide our service — arranging the collection, cleaning and return of your garments (performance of our contract with you).",
      "To communicate with you — confirming bookings, collection windows, pricing and updates (contract).",
      "To take payment and administer memberships (contract).",
      "To improve and promote our service, and to send you offers where you have asked us to (your consent and/or our legitimate interest in running and growing our business).",
      "To meet our legal and regulatory obligations (legal obligation).",
    ],
  },
  { h: "4. Who we share it with" },
  {
    p: "We never sell your personal data. We share it only where necessary to provide our service:",
  },
  {
    ul: [
      "Our trusted dry-cleaning and laundry partners, who clean and finish your garments on our behalf.",
      "Our collection and delivery drivers.",
      "Service providers who help us run the business — including our booking and automation platform, website host and secure messaging tools — who act as our processors under contract.",
      "Payment providers, to process transactions securely.",
      "Authorities or professional advisers, where we are legally required to do so.",
    ],
  },
  {
    p: "Where any provider processes data outside the UK, we ensure appropriate safeguards are in place.",
  },
  { h: "5. How long we keep it" },
  {
    p: "We keep your personal data only for as long as necessary to provide our service and to meet our legal obligations. Booking and account records are generally retained for the duration of our relationship with you and for a reasonable period afterwards — typically up to six years, in line with UK tax and accounting requirements. You may ask us to delete your data sooner.",
  },
  { h: "6. Your rights" },
  { p: "Under UK data protection law you have the right to:" },
  {
    ul: [
      "access the personal data we hold about you;",
      "ask us to correct inaccurate or incomplete data;",
      "ask us to delete your data, or restrict how we use it;",
      "object to processing based on our legitimate interests;",
      "request a copy of your data in a portable format;",
      "withdraw your consent at any time, where we rely on it.",
    ],
  },
  {
    node: (
      <p>
        {"To exercise any of these rights, email us at "}
        <a href="mailto:hello@thegarmentconcierge.co.uk">hello@thegarmentconcierge.co.uk</a>
        {". We will respond within one month."}
      </p>
    ),
  },
  { h: "7. Cookies" },
  {
    node: (
      <p>
        {"Our website uses only essential cookies and privacy-friendly, cookieless analytics. For full details, please see our "}
        <a href="/cookies">Cookie Policy</a>
        {"."}
      </p>
    ),
  },
  { h: "8. Complaints" },
  {
    node: (
      <p>
        {"If you have a concern about how we handle your data, please contact us first and we will do our best to put it right. You also have the right to complain to the Information Commissioner’s Office (ICO), the UK’s supervisory authority, at "}
        <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
          ico.org.uk
        </a>
        {"."}
      </p>
    ),
  },
  { h: "9. Changes to this policy" },
  {
    p: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised “last updated” date above.",
  },
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated="17 June 2026" blocks={blocks} />;
}
