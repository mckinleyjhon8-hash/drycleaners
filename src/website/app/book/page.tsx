import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import { WHATSAPP_HREF } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Book a Collection",
  description:
    "Book a luxury garment collection across Milton Keynes. Tell us what needs caring for and we'll confirm your collection window and pricing — usually the same day.",
};

export default function BookPage() {
  return (
    <>
      <section className="bg-navy pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="container-luxe">
          <p className="eyebrow mb-4 text-gold">Book a Collection</p>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-cream sm:text-5xl">
            Request your collection.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/70">
            Tell us where you are and what needs caring for. Our concierge team will
            confirm your collection window and pricing — usually the same day. No payment
            is taken at the time of booking.
          </p>
          <p className="mt-5 text-sm text-cream/60">
            Prefer to chat?{" "}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gold underline-offset-4 hover:underline"
            >
              Message us on WhatsApp
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl rounded-sm border border-navy/10 bg-white p-6 shadow-sm sm:p-10">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}
