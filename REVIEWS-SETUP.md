# Reviews / UGC Setup

One-time setup for the Cloudflare D1-backed reviews system.

## Current status

- Review API functions live under `functions/api/reviews/`.
- Moderation UI lives at `/admin/reviews/`.
- Review submission requires the D1 `DB` binding, `TURNSTILE_SECRET_KEY`, `IP_HASH_SECRET`, and `ADMIN_PASSWORD`.
- Tool Finder setup is tracked separately in `SETUP-D1-AND-FINDER.md`.

## 1. Create the D1 database

```bash
cd aipedia-wiki
npx wrangler d1 create aipedia-reviews
```

Wrangler returns a `database_id`. Paste it into `wrangler.jsonc` in place of `REPLACE_AFTER_CREATE`.

## 2. Apply the schema

Remote (production):
```bash
npx wrangler d1 execute aipedia-reviews --remote --file=./migrations/0001_reviews.sql
```

Local dev:
```bash
npx wrangler d1 execute aipedia-reviews --local --file=./migrations/0001_reviews.sql
```

## 3. Add Turnstile (free CAPTCHA)

1. Sign in to https://dash.cloudflare.com → Turnstile → Add site.
2. Domain: `aipedia.wiki` (+ `localhost` for dev).
3. Copy the **site key** into the public environment variable `PUBLIC_TURNSTILE_SITE_KEY`.
4. Copy the **secret key** as a Cloudflare Pages secret:

```bash
npx wrangler pages secret put TURNSTILE_SECRET_KEY --project-name aipedia-wiki
```

## 4. Set the IP hash secret

Random 64-char string; used only to make IP hashes non-reversible.

```bash
openssl rand -hex 32 | npx wrangler pages secret put IP_HASH_SECRET --project-name aipedia-wiki
```

## 5. Set the admin password

```bash
npx wrangler pages secret put ADMIN_PASSWORD --project-name aipedia-wiki
```

Then visit `https://aipedia.wiki/admin/reviews/`. Browser will prompt for basic auth:
- **Username:** anything (ignored)
- **Password:** what you set above

## 6. (Optional) Local preview

```bash
npx wrangler pages dev ./dist --d1 DB=aipedia-reviews --compatibility-date=2026-04-14
```

## Endpoints summary

| Route | Method | Purpose |
|---|---|---|
| `/api/reviews/submit` | POST | Submit a review (Turnstile + rate-limited) |
| `/api/reviews/for/<slug>` | GET | Approved reviews + average for one tool |
| `/api/reviews/admin/list?status=pending\|approved\|rejected` | GET | Admin list (basic auth) |
| `/api/reviews/admin/moderate` | POST | `{id, action: approve\|reject\|delete}` (basic auth) |

## Rate limits + abuse defense

- 3 reviews per IP per 24 hours.
- One review per IP per tool (dedupe).
- Turnstile required on submit.
- Spam score auto-computed (links, all-caps, keywords). High-score reviews still queue for moderation; they are visible in the admin dashboard.

## Cost at scale

- D1 free tier: 5M reads/day + 100K writes/day.
- Pages Functions free tier: 100K requests/day.
- Turnstile: free, unlimited.
- **Effective cost: $0 until you hit tens of thousands of daily reviews.**

## Moderation workflow

1. User submits → stored with `approved=0`.
2. Visit `/admin/reviews/` → pending queue.
3. Click Approve / Reject / Delete.
4. Approved reviews auto-appear on the tool page + update the average rating.
5. Reader sees "{N} reader reviews, {avg}/5" under the editorial score.
