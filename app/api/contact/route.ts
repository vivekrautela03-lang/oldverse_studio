import { NextResponse } from "next/server";

import { siteConfig } from "@/lib/constants";

type ContactPayload = {
  name?: string;
  email?: string;
  mobileNumber?: string;
  message?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;

    const name = payload.name?.trim();
    const email = payload.email?.trim();
    const mobileNumber = payload.mobileNumber?.trim();
    const message = payload.message?.trim();

    if (!name || !email || !mobileNumber || !message) {
      return NextResponse.json(
        { message: "Please complete every field before sending your inquiry." },
        { status: 400 }
      );
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    if (message.length < 20) {
      return NextResponse.json(
        { message: "Please share a little more detail so we can understand your project." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "The OldVerse <onboarding@resend.dev>";

    if (resendApiKey) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: email,
          subject: `New inquiry from ${name}`,
          html: `
            <div style="font-family: Inter, Arial, sans-serif; padding: 24px; color: #1a1a1a;">
              <h2 style="margin-bottom: 12px;">New inquiry from The OldVerse website</h2>
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p><strong>Mobile Number:</strong> ${escapeHtml(mobileNumber)}</p>
              <p><strong>Message:</strong></p>
              <p style="line-height: 1.7;">${escapeHtml(message).replaceAll("\n", "<br />")}</p>
            </div>
          `
        })
      });

      if (!response.ok) {
        return NextResponse.json(
          { message: "We couldn't deliver the inquiry email right now. Please try again shortly." },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({
      message: resendApiKey
        ? "Your inquiry is on its way. The OldVerse will get back to you soon."
        : "Inquiry captured. Add Resend environment variables in production to send emails automatically."
    });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong while processing your inquiry." },
      { status: 500 }
    );
  }
}
