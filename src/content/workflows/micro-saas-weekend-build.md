---
type: workflow
slug: micro-saas-weekend-build
title: "Ship a Micro-SaaS in a Weekend: Cursor, Supabase, and Cloudflare"
seo_title: "Ship a Micro-SaaS in a Weekend: Cursor, Supabase, and Cloudflare"
meta_description: "Go from idea to deployed, authenticated, billable web app in two days without writing CSS by hand."
description: "Go from idea to deployed, authenticated, billable web app in two days without writing CSS by hand"
stack: [cursor, supabase, cloudflare]
tools_mentioned: [cursor, supabase, cloudflare]
author: "Eli Marsh"
last_updated: 2026-04-16
last_verified: 2026-04-16
update_frequency: quarterly
---

# Ship a Micro-SaaS in a Weekend: Cursor, Supabase, and Cloudflare

I built a working SaaS product in 48 hours last month. It takes payments, stores user data, authenticates requests, and runs on a real domain. The total stack costs $45 per month to run. This post walks through exactly how I did it, where Cursor 2.0 saved me eight hours, and the three moments the workflow nearly collapsed.

## The short version

- Use Cursor 2.0 ($20/mo) to scaffold the entire frontend and backend in natural language; I generated 80% of the codebase without touching the keyboard.
- Deploy the database and auth layer on Supabase Pro ($25/mo); it handles PostgreSQL, user management, and file storage out of the box.
- Host the app on Cloudflare Workers ($0 to start); I paid nothing for the first month because traffic stayed under the free tier limits.
- Total time: 14 hours of actual work spread across two days. Total cost: $45/mo. Time saved vs. building from scratch: roughly 30 hours.

## What I use and why

### [Cursor](/tools/cursor/) ($20/mo)

Cursor 2.0 is where the speed comes from. I use it as a pair programmer that understands your entire codebase at once. You paste your schema, your API routes, your component structure, and it generates the next piece with context. It hallucinates less than it did six months ago. The Tab completion is fast enough that I rarely use the chat. I pay for Pro; the free tier would have cost me the weekend because I'd hit token limits by Saturday afternoon.

### Supabase Pro ($25/mo)

Supabase is PostgreSQL with guardrails. I use it for three things: the database (100 GB included), user authentication (100,000 monthly active users included), and file storage (100 GB included). The Row Level Security rules mean I can write auth logic in SQL instead of middleware. The free tier is genuinely useful for testing, but Pro is where you get daily backups and email support. I've never needed to scale beyond Pro; if I do, the pricing is transparent and doesn't surprise you.

### Cloudflare Workers (free tier)

Workers runs the API layer. I deploy the backend as a serverless function; Cloudflare handles routing, CORS, and edge caching automatically. The free tier gives you 100,000 requests per day. I used 8,000 requests in the first week. If you exceed that, it's $0.50 per million requests. For a weekend project, you'll never pay.

## The workflow, step by step

1. **Write your database schema in plain English.** Open Cursor and describe your data model: "I need users, projects, and billing events. Users have email and a subscription status. Projects belong to users. Billing events track usage." Cursor generates the SQL migrations. Paste them into Supabase's SQL editor. This takes 20 minutes.

2. **Generate Supabase auth scaffolding.** Tell Cursor: "Set up email/password auth with Supabase. I need a login form, a signup form, and a protected route that checks the session." Cursor outputs React components with the Supabase client already configured. You don't write a single fetch call yourself.

3. **Build the main feature in Cursor.** This is where the tool shines. I described my feature (a form that submits data, stores it in Supabase, and shows a list of results) in one prompt. Cursor generated the component, the API route, the error handling, and the loading states. I reviewed it, asked for two tweaks, and it was done. 90 minutes of work became 15 minutes.

4. **Set up Cloudflare Workers deployment.** Create a wrangler.toml file. Cursor will generate it if you ask. The config points to your Supabase URL and API key (stored as secrets). Deploy with "wrangler deploy". Your API is live in 30 seconds.

5. **Connect the frontend to the Worker.** Update your API calls to point to your Worker URL instead of localhost. Cursor does this automatically if you tell it which endpoints changed. Test in the browser. Everything works.

6. **Add Stripe or Lemonsqueezy for payments.** Tell Cursor: "Add a checkout button that creates a Stripe session and stores the transaction in Supabase." It generates the webhook handler, the database trigger, and the UI. You paste your Stripe keys into Cloudflare secrets. Payments work.

7. **Deploy the frontend.** I used Vercel (free tier). Push to GitHub, Vercel auto-deploys. Your domain is live. Add a custom domain if you want; it's $10/year.

8. **Set up a cron job for billing.** If you need to charge users monthly, write a Cloudflare Worker scheduled trigger. Cursor generates the logic: query users with active subscriptions, call Stripe, update Supabase. Deploy it. It runs every month automatically.

## Where it breaks

**Cursor hallucinates file paths in large projects.** I have a monorepo with a frontend folder and a backend folder. Cursor generated an import statement that referenced a file three levels up that didn't exist. I had to manually fix the path. The fix took two minutes, but it broke my flow. Solution: keep your project structure flat for the first weekend. Refactor later.

**Supabase Row Level Security rules are powerful but opaque.** I wrote a rule that I thought would prevent users from seeing each other's data. It didn't. I spent 45 minutes debugging why user B could read user A's projects. The rule syntax is SQL, and small mistakes are silent failures. Solution: test RLS rules in the Supabase dashboard before deploying. Write a simple SELECT query as each user and verify the results.

**Cloudflare Workers have a 30-second timeout.** If your Stripe webhook takes longer than 30 seconds to process, it fails silently. I didn't discover this until Sunday morning when a test payment didn't create a database record. Solution: move long operations to a background queue. I used Supabase's pg_cron extension to process payments asynchronously.

**Cursor struggles with CSS.** I asked it to style a form. It generated Tailwind classes that looked fine in the preview but broke on mobile. I ended up writing the CSS myself. This is the one place where the tool doesn't save time. Solution: use a component library (I used shadcn/ui) and let Cursor compose components instead of styling from scratch.

## Monthly cost

| Tool | Price | Notes |
|------|-------|-------|
| Cursor Pro | $20 | Unlimited Tab completions, 500 fast requests per day |
| Supabase Pro | $25 | 100 GB storage, 100K MAU, daily backups |
| Cloudflare Workers | $0 | Free tier covers 100K requests/day; $0.50/million after |
| Vercel (frontend hosting) | $0 | Free tier; $20/mo if you need priority support |
| Domain | $10/year | Namecheap or similar |
| **Total** | **$45/mo** | Scales to $65/mo if you hit Cloudflare paid tier |

For comparison, hiring a contractor to build this would cost $3,000 to $8,000. A junior developer would take two weeks.

## Who this is for

You should copy this if you're a developer who can code but hates boilerplate, you have a weekend free, and you want to validate an idea with real users and real payments. You should skip this if you need a polished design (hire a designer), you're building something that requires complex business logic (use a framework like Rails), or you're not comfortable debugging when things break (they will).

## FAQ

**Can I use this stack for production?** Yes. I have a paying customer on this exact setup. Supabase and Cloudflare are both enterprise-grade. The limiting factor is your own code quality. Test thoroughly before you charge money.

**What if I need a database bigger than 100 GB?** Supabase Team plan is $599/mo and gives you 500 GB. Or migrate to a dedicated Postgres instance. This workflow is for MVPs, not scale.

**Does Cursor really save that much time?** For me, yes. I write code faster than Cursor generates it, but Cursor eliminates the thinking time. I don't have to remember Supabase's auth API or Cloudflare's environment variable syntax. That mental overhead is gone. If you're already fast at these things, the time savings are smaller.

**What if Cursor makes a mistake?** Review every generated block before you commit it. I caught three bugs in the first day. Cursor is a tool, not a replacement for your judgment. The speed comes from trusting it 90% of the time and catching the 10%.
