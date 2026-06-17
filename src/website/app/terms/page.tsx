import type { Metadata } from "next";
import LegalPage, { type Block } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing bookings and use of The Garment Concierge garment care service.",
};

const blocks: Block[] = [
  {
    p: "These Terms of Service (“Terms”) govern your use of the website and services provided by The Garment Concierge (“we”, “us”, “our”). By booking a collection or using our service, you agree to these Terms. Nothing in these Terms affects your statutory rights as a consumer under the Consumer Rights Act 2015.",
  },
  { h: "1. About our service" },
  {
    p: "The Garment Concierge is a concierge and logistics service for garment care. We collect your garments, arrange for them to be cleaned and finished by our trusted professional cleaning partners, and return them to you. We carry out quality control, but the cleaning itself is performed by carefully selected third-party specialists.",
  },
  { h: "2. Booking and confirmation" },
  {
    p: "When you submit a booking through our website, you are making a request for our service. Your booking is confirmed once we contact you to agree a collection window and indicative pricing. No payment is taken at the time of booking.",
  },
  { h: "3. Pricing and payment" },
  {
    ul: [
      "Prices are charged per item, plus any collection and delivery fees and optional express surcharges, as set out at the time of booking.",
      "Final pricing is confirmed once your garments have been received and assessed; unusual, delicate or heavily soiled items may be quoted separately.",
      "Payment is due on completion of the service, unless otherwise agreed.",
      "Membership fees are billed in advance and entitle you to the benefits described at sign-up.",
    ],
  },
  { h: "4. Collection and delivery" },
  {
    ul: [
      "We will agree a collection and delivery window with you. Please ensure your garments are available and accessible at the agreed time.",
      "If we are unable to collect or deliver because no one is available or access is not possible, a repeat visit may incur an additional fee.",
      "Risk in your garments passes to us from the point of collection until they are returned to you, subject to the liability terms below.",
    ],
  },
  { h: "5. Garment care and our liability" },
  {
    ul: [
      "We and our partners take great care with every item, and clean according to the manufacturer's care label where one is present.",
      "Items without a care label, or labelled 'do not clean', are accepted at the owner's risk.",
      "We are not liable for pre-existing damage, wear or defects; for colour loss, shrinkage or damage inherent to the fabric or its manufacture; or for items, or their contents, left in pockets.",
      "Please check your garments on return and tell us of any issue within 48 hours.",
      "Our liability for proven loss of or damage to an item is limited to its fair value, taking into account its age and condition, and will not exceed ten times our cleaning charge for that item, except where the law requires otherwise. This does not affect your statutory rights.",
    ],
  },
  { h: "6. Items we cannot accept" },
  {
    p: "Some items may be unsuitable for our service — including items of exceptional or sentimental value beyond normal cover, hazardous materials, or anything we reasonably consider unsafe to handle. We may decline or return such items uncleaned.",
  },
  { h: "7. Membership" },
  {
    ul: [
      "The Concierge Membership is billed monthly at the advertised rate and includes the benefits described at sign-up, such as complimentary collection and delivery and members' pricing.",
      "You may cancel at any time; cancellation takes effect at the end of your current billing period.",
      "We may change membership benefits or pricing on reasonable notice.",
    ],
  },
  { h: "8. Cancellations and changes" },
  {
    p: "You may amend or cancel a booking free of charge before collection. Once your garments have been collected and cleaning has begun, a charge for work already carried out may apply.",
  },
  { h: "9. Governing law" },
  {
    p: "These Terms are governed by the law of England and Wales, and any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.",
  },
  { h: "10. Contact us" },
  {
    node: (
      <p>
        {"Questions about these Terms? Email us at "}
        <a href="mailto:hello@thegarmentconcierge.co.uk">hello@thegarmentconcierge.co.uk</a>
        {" or call "}
        <a href="tel:+441908103315">01908 103315</a>
        {"."}
      </p>
    ),
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms of Service" updated="17 June 2026" blocks={blocks} />;
}
