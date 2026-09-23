# Deploying to Vercel

Read this in Phase 2. The goal: every push to the main branch deploys the live site automatically, and nothing secret lives in the code.

## Before you start

- The project builds locally. In Claude Code, run the build command from `package.json` (usually `npm run build`) and fix errors before deploying. A site that doesn't build locally won't build on Vercel.
- The code is in a Git repository and pushed to GitHub. If it isn't:
  - `git init`, add a `.gitignore` (see below), commit.
  - The person creates an empty repository on github.com (private is fine) and follows GitHub's "push an existing repository" commands. If `gh` is installed and they're signed in, `gh repo create --private --source . --push` does it in one go.

### .gitignore must include

```
node_modules
.next
.vercel
.env
.env*.local
```

If a `.env` file was ever committed, the secrets in it are in the Git history for good. Tell the person to rotate every key in it (create new ones, delete the old ones). Removing the file now isn't enough.

## Connect the repository (recommended route)

This is the route to recommend to non-developers, because deploys then happen on every push with no terminal needed.

1. The person signs in at vercel.com with their GitHub account.
2. **Add New → Project**, pick the repository, **Import**.
3. Vercel detects Next.js or a static site automatically. Leave the defaults unless the audit found a custom build command or output folder.
4. Before clicking **Deploy**, open **Environment Variables** and add every name from `templates/.env.example`. The person pastes the values from their own accounts. You never see them.
5. **Deploy.**

## CLI route (Claude Code only)

Use this when the person prefers the terminal, or to check things.

- The person runs `npx vercel login` themselves. Never run it for them, and never ask for the token.
- `npx vercel link` connects the folder to a project.
- `npx vercel` creates a preview deployment. `npx vercel --prod` deploys to production.
- `npx vercel env ls` lists variable names (not values), handy for checking nothing is missing.
- `npx vercel env add NAME production` prompts for a value; the person types it in their terminal, not in the chat.

## Preview vs production

- **Production** is the address the domain points to. It updates when the main branch changes.
- **Preview** addresses are created for every other branch and pull request. They're for checking work before it goes live. Never share them with customers; they change and can be protected.

In the dashboard: **Project → Deployments**. The one marked **Production** is live.

## Rolling back

**Project → Deployments**, pick the last deployment that worked, open the menu, **Promote to Production** (or **Instant Rollback**). This takes seconds and doesn't touch the code, so fix the code afterwards.

## Common build failures

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `Module not found` | A package used in code isn't in `package.json` | Install it and commit the lockfile |
| Works locally, fails on Vercel with type errors | Local dev skips type checks, build doesn't | Run `npm run build` locally and fix |
| `process.env.X` is undefined in production | Variable not added in Vercel, or added to Preview only | Add it for Production, then redeploy |
| Blank page, console says a key is missing | Client code expects a `NEXT_PUBLIC_` variable | Add it in Vercel; remember it's public |
| Case-sensitive import fails | macOS ignores filename case, Vercel's Linux doesn't | Match the import to the exact filename |
