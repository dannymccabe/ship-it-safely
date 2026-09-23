# Contact forms with Resend

Read this in Phase 4. The goal: the form sends a real email, from the person's own domain, that lands in the inbox and not in spam.

## Why forms silently fail

AI-built forms often:
- look finished but send nowhere (the submit handler just shows "Thanks!")
- use `mailto:`, which opens the visitor's email app and often does nothing
- send from a Gmail or Outlook address, which inboxes treat as forged
- have a key for the email service written into client-side code

## 1. Resend account and domain

The person does these steps; you guide them.

1. Sign up at resend.com.
2. **Domains → Add Domain.** Use a subdomain such as `send.yourdomain.com` or the root domain; Resend suggests one.
3. Resend shows DNS records (SPF as a TXT or MX on a subdomain, DKIM as a TXT). Give them to the person as a table to paste at their registrar, exactly as Resend shows them.
4. Add a DMARC record if the domain doesn't have one. A safe starting point:

| Type | Name / Host | Value |
| --- | --- | --- |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:postmaster@yourdomain.com` |

   `p=none` means "report, don't block". It's the right start. If a DMARC record already exists, leave it alone.

5. Wait for Resend to show the domain as **Verified**.
6. **API Keys → Create API Key**, with **Sending access** only. The person pastes it into Vercel as `RESEND_API_KEY` for Production (and Preview if they want previews to send). Never into the chat, never into the code.

## 2. The route

Copy `templates/contact-route.ts` to `app/api/contact/route.ts` (App Router). It:

- accepts `name`, `email`, `message` and a hidden honeypot field `company`
- silently accepts and drops honeypot submissions, so bots don't learn anything
- validates length and email shape on the server
- escapes the visitor's text before putting it in the email
- sends from `CONTACT_FROM_EMAIL` to `CONTACT_TO_EMAIL`, with `replyTo` set to the visitor, so hitting Reply answers them

If the project uses the Pages Router (`pages/` folder), adapt it to `pages/api/contact.ts` with the same logic.

Install the package: `npm install resend`.

Environment variables (names in `templates/.env.example`):

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`: where submissions arrive (the person's inbox)
- `CONTACT_FROM_EMAIL`: an address on the verified domain, e.g. `Website <hello@yourdomain.com>`

## 3. Wire the form

The form posts JSON to `/api/contact`:

```tsx
const res = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, message, company }),
})
```

Add the honeypot input to the form, visually hidden but not `display: none` (some bots skip hidden inputs):

```tsx
<input
  type="text"
  name="company"
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
  style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
/>
```

Show a clear success message on `res.ok`, and a friendly error with an alternative (an email address) otherwise.

## 4. Rate limiting

The template has a small in-memory limit per visitor. On serverless hosting that only protects each running instance, which stops casual abuse but not a determined attacker. If the form gets hammered, add Cloudflare Turnstile or a hosted rate limiter (Upstash, Vercel Firewall rules). Mention this; don't add paid services without asking.

## 5. Test

- Submit from the **live** site to a Gmail address and an Outlook address (change `CONTACT_TO_EMAIL` temporarily, or ask the person to forward).
- Check inbox and spam in both.
- In Gmail, **Show original** should read `SPF: PASS`, `DKIM: PASS`, `DMARC: PASS`.
- If it lands in spam: check the From address is on the verified domain, the records are all verified, and the email isn't mostly links.

## Static sites

A plain HTML site on Vercel can still use this: add an `api/contact.ts` serverless function at the project root (Vercel runs it automatically) with the same logic, adapted to the `(req, res)` handler shape. If that's too much, a form service (Formspree, Basin) is a reasonable alternative. Explain the trade-off and let the person choose.
