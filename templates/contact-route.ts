// app/api/contact/route.ts
//
// Contact form handler for a Next.js App Router site, sending through Resend.
// From the ship-it-safely skill by Karv Web Studio (MIT licence).
//
// What it does:
//   - accepts JSON { name, email, message, company }
//   - "company" is a honeypot: a hidden field real people never fill in.
//     Bots that fill it get a normal-looking success and nothing is sent.
//   - validates on the server (never trust the browser)
//   - escapes the visitor's text before it goes into the email
//   - sends from your verified domain, with Reply-To set to the visitor
//   - applies a small per-visitor rate limit
//
// Needs: npm install resend
// Environment variables (set in the Vercel dashboard, never in code):
//   RESEND_API_KEY      sending-only key from resend.com
//   CONTACT_TO_EMAIL    where submissions arrive
//   CONTACT_FROM_EMAIL  an address on your verified domain, e.g. "Website <hello@yourdomain.com>"

import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

const HONEYPOT_FIELD = "company"
const MAX = { name: 100, email: 200, message: 5000 }

// In-memory rate limit: 5 submissions per visitor per 10 minutes.
// On serverless hosting each running instance keeps its own count, so this
// stops casual abuse, not a determined attacker. For more, add Cloudflare
// Turnstile or a hosted limiter.
const WINDOW_MS = 10 * 60 * 1000
const LIMIT = 5
const hits = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const entry = hits.get(key)
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > LIMIT
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again in a few minutes." },
      { status: 429 },
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 })
  }

  // Honeypot: pretend it worked, send nothing.
  if (asTrimmedString(body[HONEYPOT_FIELD]) !== "") {
    return NextResponse.json({ ok: true })
  }

  const name = asTrimmedString(body.name)
  const email = asTrimmedString(body.email)
  const message = asTrimmedString(body.message)

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, email and message." },
      { status: 400 },
    )
  }
  if (name.length > MAX.name || email.length > MAX.email || message.length > MAX.message) {
    return NextResponse.json({ ok: false, error: "That message is too long." }, { status: 400 })
  }
  if (!EMAIL_SHAPE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please check your email address." },
      { status: 400 },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) {
    console.error("Contact form is missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL")
    return NextResponse.json(
      { ok: false, error: "The form isn't set up yet. Please email us directly." },
      { status: 500 },
    )
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New enquiry from ${name.replace(/[\r\n]+/g, " ")}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `,
  })

  if (error) {
    console.error("Resend send failed", error)
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message. Please email us directly." },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
