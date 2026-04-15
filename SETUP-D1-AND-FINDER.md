# Activation checklist: Reviews + Tool Finder

Two features are coded and deployed but need one-time setup from your side
(Cloudflare dashboard + wrangler) before they go live.

## 1. Reviews system

### 1a. Apply the D1 schema

You already created a D1 database and bound it to Pages as `DB`. Now apply the schema:

```bash
cd aipedia-wiki
# Remote (production) — run this once
npx wrangler d1 execute <your-db-name> --remote --file=./migrations/0001_reviews.sql

# Local dev (optional, if you want to test reviews in `npm run dev`)
npx wrangler d1 execute <your-db-name> --local --file=./migrations/0001_reviews.sql
```

Replace `<your-db-name>` with whatever you named it (e.g. `database`).

### 1b. Set Pages secrets

In the Cloudflare dashboard: Pages > aipedia-wiki > Settings > Environment variables > Production. Add these as encrypted secrets:

| Secret | Purpose | How to get a value |
|---|---|---|
| `TURNSTILE_SECRET_KEY` | Server-side CAPTCHA verify for reviews and finder | Create a Turnstile widget in Cloudflare dashboard > Turnstile |
| `PUBLIC_TURNSTILE_SITE_KEY` | (Plain var, not secret) Paired with the Turnstile widget | Same widget, "Site Key" field |
| `IP_HASH_SECRET` | Salt for hashing IPs in rate-limit and review tables | Any 32+ char random string |
| `ADMIN_PASSWORD` | Gates /admin/reviews/ approval UI | Pick a strong password |

### 1c. Verify

- Visit any tool page (e.g. `/tools/claude/`). The Reviews block should show "Be the first to review" with a form.
- Submit a test review. It should accept, then hide pending moderation.
- Visit `/admin/reviews/` (you'll be prompted for the password). Approve the test review. It should appear on the tool page.

## 2. AI Tool Finder

### 2a. Set the Perplexity secret

Same place as above — Pages > Settings > Environment variables > Production:

| Secret | Purpose |
|---|---|
| `PERPLEXITY_API_KEY` | Grounded LLM search over the aipedia.wiki catalog |

### 2b. Verify

- Visit `/tool-finder/`. You should see a textarea and "Find my tools" button.
- Type: "I need to transcribe 2 hours of interviews per week, under $30/month."
- You should get 3 to 5 matches with fit scores and links to tool pages.
- Rate limit is 20 queries per IP per day (tracked in the same D1 DB via a `finder_usage` table that auto-creates on first call).

## Status

- `functions/api/reviews.ts` — POST (submit), GET (list approved), PATCH (approve, requires admin) — wired
- `functions/api/tool-finder.ts` — POST (match tools via Perplexity sonar-pro) — wired
- `src/pages/tool-finder.astro` — public UI — wired
- `src/pages/admin/reviews.astro` — moderation UI — wired
- `migrations/0001_reviews.sql` — D1 schema — ready to apply
- Nav entry for Tool Finder — wired

Once secrets are set and the D1 migration runs, both features are live with zero code deploys needed.
