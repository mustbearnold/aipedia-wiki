# Activation checklist: Reviews + Tool Finder

Reviews are shipped behind Cloudflare D1, Turnstile, and admin secrets. The Tool Finder API exists, but the public Tool Finder UI is not present until `src/pages/tool-finder.astro` is added.

## Current status

- Reviews API functions exist under `functions/api/reviews/`.
- Reviews UI exists at `/admin/reviews/`.
- Tool Finder API exists at `functions/api/tool-finder.ts`.
- Public Tool Finder UI is not present until `src/pages/tool-finder.astro` is added.
- Newsletter signup is implemented at `src/pages/api/subscribe.ts`.

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

## 2. AI Tool Finder API

### 2a. Set the Perplexity secret

Same place as above — Pages > Settings > Environment variables > Production:

| Secret | Purpose |
|---|---|
| `PERPLEXITY_API_KEY` | Grounded LLM search over the aipedia.wiki catalog |

### 2b. Verify

- API smoke test with a local Pages Functions preview or deployed endpoint: POST a JSON body with `query` and `turnstile_token` to `/api/tool-finder`.
- Expected response is 3 to 5 matches with fit scores and links to tool pages.
- Rate limit is 20 queries per IP per day when the D1 `DB` binding is present.

Once secrets are set and the D1 migration runs, reviews can go live. Tool Finder still needs a public page and production security review before being promoted to users.
