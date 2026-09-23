<!-- Generated from src/lib/launch-kit/checklist.ts in karvwebstudio. Edit there, then run scripts/build-launch-kit.ts. -->

# The Localhost to Live launch checklist

28 checks in nine sections, in the order to do them. Each item says what to check, why it matters, and how to check it. Use this as the definition of done for each phase, and for sites outside this skill's scope.

The printable version: https://www.karvwebstudio.com/ship-it

## 1. Ownership

_Do this first. Everything else sits on top of it._

- [ ] **The domain is registered in your name.**
  - Why: Whoever holds the domain registration owns your address on the internet, not whoever paid for it.
  - How: Log in to your registrar (Namecheap, GoDaddy, Cloudflare, Blacknight) and check the registrant contact shows your name and email, not your developer's or an AI tool's.
- [ ] **Your registrar and hosting accounts have two-factor login switched on.**
  - Why: A stolen password on either account is enough to take the whole site offline or redirect it.
  - How: Open the security settings in each account and turn on an authenticator app. Save the backup codes in your password manager.
- [ ] **You know every account that touches the site, and who can log in to each.**
  - Why: You can't secure or hand over accounts you don't know exist.
  - How: List them: registrar, hosting, Git, email sending, forms, analytics. Next to each one, write whose login it is.

## 2. Domain and DNS

_Point your name at your site, once, correctly._

- [ ] **The domain points to your host.**
  - Why: Until the DNS records match what your host expects, visitors land on a parking page or an error.
  - How: Your host's domain settings show the exact records it wants. Check they match at your registrar, or look them up at dnschecker.org.
- [ ] **Both www and the bare domain work, and one redirects to the other.**
  - Why: People type both. Two live copies of the same site also split your Google ranking.
  - How: Visit yourdomain.com and www.yourdomain.com. Both should end up on the same address in the bar.
- [ ] **SSL is active and the padlock shows.**
  - Why: Browsers warn visitors away from sites without it, and forms won't feel safe to fill in.
  - How: Open the site and look for the padlock next to the address. Also try http:// and make sure it jumps to https://.

## 3. Hosting

_Make deploys repeatable, so a fix never breaks something else._

- [ ] **The site deploys from a Git repository, not a manual upload.**
  - Why: Git gives you a history of every change and a one-click way back when something breaks.
  - How: In your hosting dashboard, the project should show a connected GitHub (or GitLab) repository and a list of deployments.
- [ ] **Secret settings live in the hosting dashboard, not in the code.**
  - Why: Keys written into code get copied, shared and published by accident.
  - How: Check your host's Environment Variables page lists them, and search your code for anything that looks like a key.
- [ ] **You know the difference between preview and production addresses.**
  - Why: Preview links are for testing. Sharing one with customers means they see unfinished work, or a link that stops working.
  - How: In your hosting dashboard, find which address is marked Production. That's the only one you share.

## 4. Contact forms and email

_The most common silent failure on a new site._

- [ ] **Form emails send from your own domain, not a free address.**
  - Why: Mail from a Gmail or Outlook address sent by a website looks forged, and inboxes treat it that way.
  - How: Submit your form and look at the From line on the email that arrives. It should end in @yourdomain.
- [ ] **Your domain is verified with your email service, with SPF, DKIM and DMARC in place.**
  - Why: These three records prove the email really came from you. Without them, it lands in spam.
  - How: Your email service (Resend, Postmark, Google Workspace) shows each record as verified. Or paste your domain into mxtoolbox.com.
- [ ] **The form has spam protection.**
  - Why: An unprotected form gets found by bots within days and fills your inbox with junk.
  - How: Look for a hidden honeypot field or a Cloudflare Turnstile check in the form. Ask whoever built it if you're not sure.
- [ ] **A test submission reached both a Gmail and an Outlook inbox.**
  - Why: Each provider filters differently. Passing one tells you nothing about the other.
  - How: Send one test from the live site to each. Check the inbox, then the spam folder.

## 5. Privacy basics

_Questions to check. If you're unsure of an answer, get advice._

- [ ] **A privacy notice exists and says what the form collects.**
  - Why: People are entitled to know what happens to the details they give you.
  - How: Find the privacy link in your footer. Does it mention the fields your form actually asks for?
- [ ] **You know whether the site uses non-essential cookies.**
  - Why: Analytics and advertising cookies usually need a visitor's consent first.
  - How: Open the site in a private window, then check your browser's developer tools under Application, then Cookies. List what's there and what set it.
- [ ] **You know where form submissions are stored, and for how long.**
  - Why: You're responsible for personal details once you collect them, including ones sitting in a tool you forgot about.
  - How: Follow one submission: your inbox, the form tool, any spreadsheet or CRM. Delete what you don't need.

> This section is a prompt, not legal advice. If you handle sensitive information or aren't sure, speak to a qualified adviser.

## 6. Findability

_Help Google, and people sharing your link, understand each page._

- [ ] **Every page has its own title and description, plus a social share image.**
  - Why: This is what shows in Google results and in the link preview when someone shares your site.
  - How: Paste each page into opengraph.xyz, or view the page source and look for the title and og:image tags.
- [ ] **The sitemap and robots.txt are live.**
  - Why: They tell search engines which pages exist and which ones to read.
  - How: Visit yourdomain.com/sitemap.xml and yourdomain.com/robots.txt. Both should load.
- [ ] **There's a favicon, and the 404 page works.**
  - Why: The small icon makes your tab recognisable, and a friendly 404 keeps lost visitors on the site.
  - How: Look at the browser tab for your icon, then visit yourdomain.com/this-does-not-exist.

## 7. Security

_The mistakes AI tools make most often, and the easiest to fix before launch._

- [ ] **No secret keys appear in the code that runs in the browser.**
  - Why: Anything the browser downloads, anyone can read, including a key that bills your account.
  - How: Open the live site, view the page source, and search for words like key, secret and token. Only keys labelled public or publishable belong there.
- [ ] **The .env file is listed in .gitignore.**
  - Why: One accidental commit publishes every secret in it to your repository history for good.
  - How: Open .gitignore in the project and check it contains a line starting with .env.
- [ ] **Form endpoints have a rate limit.**
  - Why: Without one, a single script can send thousands of submissions and run up your email bill.
  - How: Ask whoever built it, or submit the form many times quickly and see if it starts refusing.

## 8. Quality

_Check it the way your visitors will actually see it._

- [ ] **A Lighthouse check has been run.**
  - Why: It catches slow pages, missing tags and accessibility gaps in one pass.
  - How: Open pagespeed.web.dev, paste your address and look at the four scores. Fix anything in red.
- [ ] **Images have alt text.**
  - Why: Screen readers read it aloud, and Google uses it to understand your images.
  - How: Run the Lighthouse accessibility check, which lists any image missing it.
- [ ] **The mobile layout has been checked on a real phone.**
  - Why: Most visitors arrive on a phone, and desktop previews miss real-world problems.
  - How: Open the live site on your own phone. Tap every button, fill in the form and read every page.

## 9. Handover

_Future you will thank present you._

- [ ] **Every login is stored in a password manager.**
  - Why: A site you can't log in to is a site you can't fix.
  - How: Open your password manager and check there's an entry for each account on your list from section 1.
- [ ] **You know how to roll back a bad deploy.**
  - Why: The fastest fix for a broken site is putting the last working version back.
  - How: In your hosting dashboard, find your deployments list and the option to promote or roll back to an earlier one.
- [ ] **You know who to call when it breaks.**
  - Why: Sites break at the worst moment. A name and number turns a crisis into a phone call.
  - How: Write down who fixes the site, how to reach them and what it costs. Keep it with your logins.
