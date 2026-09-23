# Domain and DNS

Read this in Phase 3. The goal: the domain belongs to the person, both `yourdomain.com` and `www.yourdomain.com` reach the site, one redirects to the other, and SSL is active.

## Ownership first

The registrant on the domain must be the person (or their business), with an email they control. If a developer, agency or AI tool registered it, ask them to transfer it or change the registrant before doing anything else. Point out that the registrar account needs two-factor login.

Never buy or transfer a domain on their behalf. Name the registrar screen and let them click.

## Add the domain in Vercel

**Project → Settings → Domains → Add.** Add both:

- `yourdomain.com`
- `www.yourdomain.com`

Vercel will suggest which one redirects to the other. Either is fine; pick one and stick with it. `www` as the main address is slightly more flexible for DNS; the bare domain looks cleaner. Keep whatever the person prefers.

## The records

Vercel shows the exact records it wants on the Domains screen. **Always use the values Vercel shows for this project**, because they can change. The typical shape is:

| Type | Name / Host | Value |
| --- | --- | --- |
| A | `@` | the IP address Vercel shows |
| CNAME | `www` | the `vercel-dns` hostname Vercel shows |

When you give the person records to paste, format them as a table like that one, with the real values filled in, and tell them which registrar screen to open (usually called DNS, DNS Records, Advanced DNS or Zone Editor).

### Registrar quirks

- **Name field:** some registrars want `@` for the bare domain, some want it blank, some want the full domain. If `@` isn't accepted, try blank.
- **Existing records:** if there's already an A record on `@` or a CNAME on `www` (often a parking page), it must be edited or removed, not duplicated. Show the person exactly which record to change and wait for their yes.
- **Don't touch MX, TXT or other records** unless you know what they're for. MX records carry their email; deleting them stops their inbox working.
- **Cloudflare:** if the domain uses Cloudflare DNS, set the Vercel records to **DNS only** (grey cloud), not proxied, unless they know why they want the proxy.
- **Nameservers vs records:** changing nameservers to Vercel moves all DNS to Vercel, including email records. For non-developers, adding records at the existing registrar is safer.

## Checking propagation

Changes usually show within minutes, occasionally a few hours.

In Claude Code:

```bash
dig +short yourdomain.com A
dig +short www.yourdomain.com CNAME
dig +short yourdomain.com MX
```

The first two should match what Vercel asked for. The third should still show their email provider if they have one.

In the Claude app: send them to dnschecker.org and have them look up the A record for the bare domain and the CNAME for `www`.

Vercel's Domains screen shows **Valid Configuration** when it's happy.

## SSL and redirects

Vercel issues the certificate automatically once DNS is correct. Then check:

- `https://yourdomain.com` shows a padlock.
- `http://yourdomain.com` lands on `https://`.
- The non-main version (bare or `www`) redirects to the main one.

In Claude Code: `curl -sI http://yourdomain.com | head -5` shows the redirect status and `location`.
