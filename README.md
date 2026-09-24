<p>
  <a href="https://www.karvwebstudio.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="assets/karv-wordmark-light.svg">
      <img src="assets/karv-wordmark.svg" alt="Karv Web Studio" width="220">
    </picture>
  </a>
</p>

# Ship It Safely

**A Claude skill that takes your AI-built website from localhost to a live domain, with contact forms that actually arrive.**

Get the free printable checklist that goes with this → [karvwebstudio.com/ship-it](https://www.karvwebstudio.com/ship-it)

You built a site with Lovable, Bolt, v0, Claude or Cursor. It works on your laptop. This skill walks you (or does the work, in Claude Code) through putting it online properly: your own domain, in your name, with working forms and nothing that'll bite you later.

## What it does

- **Audits first.** Finds your framework, your forms and any secret keys sitting in public code, and tells you before changing anything.
- **Works in phases**, confirming with you at each step: ownership, hosting, domain, forms, privacy, findability, then a final test.
- **Knows where it's running.** In Claude Code it can do the work: deploy with the Vercel CLI, add a contact route, check DNS. In the Claude app it becomes a guided coach: it reviews your project, writes the DNS records to paste, and walks you through each screen.
- **Never asks for your passwords or keys**, and never buys anything for you. You log in, you paste secrets into your hosting dashboard, you click the buttons.
- **Finishes with a launch report**: what's done, what's still open, and test results.

**Scope:** Next.js or static sites, hosted on Vercel, with email sent through Resend. For WordPress, Shopify or other hosts, it says so plainly and walks you through the general checklist instead of guessing.

## What's inside

```
ship-it-safely/
├── SKILL.md                    how Claude runs the launch
├── references/
│   ├── vercel-deploy.md
│   ├── domain-and-dns.md
│   ├── resend-setup.md
│   ├── privacy-basics.md
│   └── launch-checklist.md     the full checklist
└── templates/
    ├── contact-route.ts        Next.js route: Resend, honeypot, validation, rate limit
    └── .env.example            variable names only, never values
```

<!-- install:start (generated from src/lib/launch-kit/install.ts in karvwebstudio; edit there) -->

## Install

### In the Claude app or on claude.ai

This works on every Claude plan, including Free. It takes about two minutes and you don't need to be technical.

1. Download ship-it-safely.zip. Don't unzip it. Claude needs the ZIP file exactly as it downloaded.
2. In Claude, open Settings, then Capabilities. Make sure "Code execution and file creation" is switched on.
3. Go to Customize, then Skills. Click the + button, choose Create skill, then choose Upload a skill and pick the ZIP file.
4. Check the skill is switched on. Then start a new chat and type:

   ```
   Use the ship-it-safely skill to check my site is ready to launch.
   ```

> On a Team or Enterprise plan, an admin may need to switch skills on for your workspace first. If you can't see the Skills section, ask whoever manages your Claude account.

### In Claude Code

If you use Claude Code, the skill lives in a folder on your computer.

1. Copy the skill into your personal skills folder by running:

   ```bash
   git clone https://github.com/dannymccabe/ship-it-safely.git ~/.claude/skills/ship-it-safely
   ```

2. No git? Unzip ship-it-safely.zip into ~/.claude/skills/ instead, so you end up with ~/.claude/skills/ship-it-safely/SKILL.md.
3. Start a new Claude Code session, or restart it if it's already open, so it picks up the skill.
4. Type / and look for ship-it-safely in the list. Then ask:

   ```
   Use the ship-it-safely skill to check my site is ready to launch.
   ```

> Shortcut: a skill you upload on claude.ai also appears in Claude Code when you're signed in with the same Claude account (Claude Code v2.1.273 or later). You may only need to upload it once.

## Troubleshooting

**I can't see the Skills section.** Open Settings, then Capabilities, and switch on "Code execution and file creation". On a Team or Enterprise plan, ask your admin to switch skills on.

**The upload failed.** Upload the ZIP exactly as it downloaded. Unzipping it, renaming it or zipping it again breaks it. Inside, it must hold a folder called ship-it-safely with a file called SKILL.md.

**Claude isn't using the skill.** Check the skill is switched on in Customize, then Skills. Then name it in your message: "Use the ship-it-safely skill to..."

**How do I update it?** In the Claude app, delete the old skill and upload the new ZIP. In Claude Code, run git pull inside ~/.claude/skills/ship-it-safely, then start a new session.

<!-- install:end -->

## Rather not do it yourself?

Karv Web Studio will launch your AI-built site for you, for a fixed price: everything on the checklist, your domain in your name, forms tested, and a handover call. [karvwebstudio.com/launch](https://www.karvwebstudio.com/launch)

## Licence

MIT. Use it, fork it, adapt it. © Karv Web Studio.
