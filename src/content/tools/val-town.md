---
type: tool
slug: val-town
title: Val Town
tagline: Browser-based serverless TypeScript runtime. Write a val, click run, ship a live HTTP endpoint or cron job in minutes.
category: ai-coding
company: val-town
url: https://val.town
pricing_model: freemium
price_range: "$0-$200+/month"
status: active
launched: 2023-01
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 9
  moat: 6
  longevity: 7
tags: [serverless, typescript, browser-ide, ai-coding, automation, deployment, deno, townie]
seo_title: "Val Town: Features, Pricing & Review (April 2026)"
meta_description: "Val Town runs TypeScript vals as serverless HTTP endpoints and cron jobs from the browser. Free tier, Pro with $5 Townie AI credits, Teams with $100/month in credits. Zero setup, Deno-based."
author: "aipedia.wiki Editorial"
best_for:
  - quick serverless TypeScript scripts
  - HTTP endpoints and webhooks
  - cron-scheduled automations
  - makers and indie hackers skipping build config
not_best_for:
  - Python, Go, or non-JS languages
  - complex full-stack apps
  - frontend-first projects
  - long-running compute
quick_answer: >-
  Val Town runs TypeScript in the browser and deploys each val as a live HTTP endpoint or cron job. Free tier for public vals, Pro with $5 Townie AI credits, Teams with $100/month in credits. Pick it for fast serverless automations; skip it for complex apps or non-JS work.
price_history:
  - date: 2026-04-15
    plan: "Teams"
    price: "$200/mo"
    note: "Includes $100/month in Townie credits and unlimited custom domains."
  - date: 2026-04-15
    plan: "Pro"
    price: "$20/mo"
    note: "Verified unchanged. Includes $5/month in Townie credits."
---

# Val Town

Val Town is a browser-based TypeScript runtime from Val Town, Inc. Write code in the web editor, click run, and the script deploys as a live serverless function. Each script is a "val." Vals run manually, on cron, or as HTTP endpoints with a public URL.

Townie, the AI agent that writes vals from natural-language prompts, bills on credits. Runtime is Deno.

## System Verdict

> **Pick Val Town when a TypeScript script needs to go live in five minutes.** Zero configuration, no CLI, no deployment pipeline. HTTP endpoints get a public URL the moment a `fetch` handler exports. Cron jobs need one import. The community val registry is the fastest fork-and-remix library in serverless.
>
> **Skip it for anything that is not a short TypeScript script.** Complex full-stack apps belong on Vercel or Cloudflare. Python automations need a different runtime. Frontend work needs a bundler. Long-running compute hits the execution cap.
>
> **Who pays which tier:** Free for public vals and experiments, Pro $20/mo for private vals plus $5 in Townie credits, Teams $200/mo for shared workspaces with $100 in Townie credits.

## Key Facts

| | |
|---|---|
| **Runtime** | Deno, browser-first editor |
| **Languages** | TypeScript and JavaScript only |
| **Deploy surface** | HTTP endpoints, cron jobs, manual run |
| **AI agent** | Townie, credit-metered, writes deployable vals from prompts |
| **Free tier** | Unlimited public vals, limited private vals, caps on execution |
| **Pro** | $20/mo, private vals, $5/month in Townie credits |
| **Teams** | $200/mo, shared workspace, $100/month in Townie credits, unlimited custom domains |
| **Standard library** | Email, blob storage, SQLite, HTTP utilities |
| **Community registry** | Public vals, fork and remix, 100k+ scripts |

Every data point above was verified against vendor sources on 2026-04-17. See Sources.

## What it actually is

One browser product with three jobs. A code editor, a Deno runtime, and a deployment platform. Every val is a TypeScript function. Export a `fetch` handler and the val becomes an HTTP endpoint. Add `@std/cron` and it runs on schedule. Click run and it fires once.

Townie is the AI layer. Describe a val in natural language and Townie writes deployable TypeScript directly into the editor. Credits meter Townie usage. Pro ships $5/month, Teams ships $100/month, and heavy users can top up.

The moats are narrow but real. The community val registry, the browser-first workflow, and the zero-config deploy path all cut setup time from hours to minutes. Competing platforms match one of the three; none match all three at once.

## When to pick Val Town

- **A webhook or API endpoint needs to go live today.** Export a `fetch` handler, get a public URL, done.
- **Cron jobs are the use case.** Add `@std/cron` and the job runs on schedule without any infrastructure work.
- **Lightweight automations and bots fit the scope.** Glue code between SaaS APIs, scheduled summaries, Slack bots, RSS digests.
- **Forking community code saves time.** The registry hosts 100k+ public vals. Fork, edit, deploy.
- **Zero setup outweighs full control.** No Docker, no CI, no Terraform, no server logs to tail.

## When to pick something else

- **Complex full-stack apps:** [Bolt.new](/tools/bolt-new/), [v0](/tools/v0/), or traditional Vercel deployments.
- **Python, Go, or non-JS runtimes:** Vercel Functions, Cloudflare Workers (Python beta), or AWS Lambda.
- **Long-running compute:** Traditional cloud providers. Val Town caps execution per tier.
- **Frontend-heavy projects:** [Cursor](/tools/cursor/) plus Vercel handle this cleanly.
- **AI agents that edit local repos:** [Aider](/tools/aider/), [Cline](/tools/cline/), or [Claude Code](/tools/claude-code/) work at the filesystem level.

## Pricing

| Plan | Price | Townie credits | Private vals | Compute | Who's it for |
|---|---|---|---|---|---|
| Free | $0 | pay-per-use | 3 | 10s execution, 100 req/day | Public vals, experiments |
| Pro | $20/mo | $5/mo included | unlimited | 30s execution, 10k req/day | **Most individuals land here** |
| Teams | $200/mo | $100/mo included | unlimited | higher limits, custom compute | Small teams, shared workspaces |

*Prices verified 2026-04-17 via [val.town/pricing](https://www.val.town/pricing) and the [February 2026 investor update](https://blog.val.town/2026-feb). Townie runs on a pay-per-use credit model; top-ups are available on every tier.*

## Against the alternatives

| | Val Town Pro | Replit Core | Cloudflare Workers |
|---|---|---|---|
| **Price** | $20/mo | $25/mo | $5/mo base |
| **Runtime** | Deno (TS, JS) | multi-language | JS, WASM, Python beta |
| **Deploy time** | **Seconds (in-browser)** | Seconds | Minutes (wrangler CLI) |
| **AI agent** | Townie | Agent | None native |
| **HTTP + cron bundled** | Yes | Yes | Yes |
| **Community registry** | **100k+ forkable vals** | Template gallery | Examples only |
| **Best viewed as** | Serverless TS scratchpad | Full IDE in browser | Edge runtime at scale |

## Failure modes

- **TypeScript only.** Python, Go, Rust, Ruby are out of scope. Mixed-language workflows need a second platform.
- **Public-by-default leaks secrets.** New users paste API keys into public vals and publish them. The UI warns; the warning gets ignored.
- **Execution caps on every tier.** Pro tops at 30 seconds. Long-running tasks need external compute or splitting into jobs.
- **Debugger is thin.** Console logs and request logs cover most cases. No breakpoints, no step-through.
- **Credit-metered AI usage.** Townie burns credits on every generation. Heavy users move to Teams or top-ups fast.
- **Not an IDE replacement.** Complex apps with many files, tests, and dependencies feel cramped in the browser editor.
- **Vendor risk.** Val Town is a well-funded startup, not a public cloud. Buy-out, pivot, or shutdown are real scenarios to plan for.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity; unweighted average). Last verified 2026-04-17 against [val.town/pricing](https://www.val.town/pricing), [the April 2026 release notes](https://releasebot.io/updates/val-town), and the [February 2026 investor update](https://blog.val.town/2026-feb).

## FAQ

**What is a val?**
A val is a TypeScript or JavaScript function hosted and executed on Val Town. Every val has a URL. Vals run manually, via HTTP, or on cron schedules. They can be public or private depending on tier.

**Do I need to install anything?**
No. The editor runs in the browser. Code, run, and deploy happen in the same tab. No CLI, no Docker, no local runtime.

**What is Townie?**
Townie is Val Town's AI coding agent. Describe a val in natural language and Townie writes deployable TypeScript. It is credit-metered: $5/month on Pro, $100/month on Teams, and pay-per-use top-ups beyond the included quota.

**How is Val Town different from Replit?**
Val Town specializes in short-lived serverless TypeScript. Replit covers full projects across many languages with a traditional IDE feel. Val Town wins on deploy time for a single script; Replit wins for longer-lived applications.

**What is the runtime?**
Deno. Val Town uses Deno's official TypeScript language server and supports npm packages through Deno compatibility. Recent updates improved type-inference performance materially.

## Sources

- [Val Town pricing](https://www.val.town/pricing): Free, Pro, and Teams tier breakdown
- [Val Town docs](https://docs.val.town): runtime details, cron, HTTP endpoints, standard library
- [Val Town April 2026 release notes](https://releasebot.io/updates/val-town): recent updates and feature changes
- [Val Town February 2026 investor update](https://blog.val.town/2026-feb): plan changes and Townie credit model

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
- **Comparisons:** [Val Town vs Cursor](/comparisons/cursor-vs-val-town/), [Val Town vs Claude Code](/comparisons/claude-code-vs-val-town/), [Val Town vs GitHub Copilot](/comparisons/github-copilot-vs-val-town/)
