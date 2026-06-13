import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Booking = {
  name?: string;
  postcode?: string;
  email?: string;
  phone?: string;
  service?: string;
  date?: string;
  notes?: string;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  let data: Booking;
  try {
    data = (await req.json()) as Booking;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, postcode, email, service } = data;

  if (!name || !postcode || !email || !service) {
    return NextResponse.json(
      { error: "Please complete name, postcode, email and service." },
      { status: 422 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 422 });
  }

  // Always record the lead in server logs so a request is never silently lost,
  // even before an email provider or CRM is connected.
  console.log("[booking] new request:", JSON.stringify(data));

  // If a Resend API key is configured (see .env.example), notify the concierge
  // inbox. Done via REST so we don't add an SDK dependency. Failure to email
  // must not fail the customer's request — we've already logged it above.
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.BOOKINGS_INBOX ?? "hello@thegarmentconcierge.co.uk";
  const from = process.env.BOOKINGS_FROM ?? "The Garment Concierge <onboarding@resend.dev>";

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: inbox,
          reply_to: email,
          subject: `New collection request — ${name} (${postcode})`,
          text: [
            `Name:     ${name}`,
            `Postcode: ${postcode}`,
            `Email:    ${email}`,
            `Phone:    ${data.phone ?? "—"}`,
            `Service:  ${service}`,
            `Date:     ${data.date ?? "—"}`,
            ``,
            `Notes:`,
            data.notes ?? "—",
          ].join("\n"),
        }),
      });
      if (!res.ok) {
        console.error("[booking] email send failed:", res.status, await res.text());
      }
    } catch (err) {
      console.error("[booking] email send error:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
