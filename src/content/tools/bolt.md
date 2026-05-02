---
type: tool
slug: bolt
title: Bolt.new
tagline: StackBlitz's in-browser full-stack AI app builder. WebContainers run Node.js in WebAssembly, zero local setup, token-metered billing.
category: ai-design
company: stackblitz
url: https://bolt.new
pricing_model: freemium
price_range: "$0-$2000/month"
status: active
launched: 2024-10
last_updated: 2026-05-02
last_verified: 2026-05-02
update_frequency: monthly
seo_title: "Bolt.new: Features, Pricing & Review (April 2026)"
meta_description: "Bolt.new by StackBlitz builds full-stack web apps in the browser via WebContainers. Token-metered pricing: Free 1M tokens/month, Pro $25 for 10M with rollover, Teams $30/member, Enterprise custom. Enhance prompt button, multi-model support."
author: "aipedia.wiki Editorial"
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 8
  moat: 7
  longevity: 7
tags: [app-builder, no-code, full-stack, webcontainers, browser-ide, prototyping, vibe-coding, ai-design]
quick_answer: >-
  Bolt.new runs a full Node.js stack in the browser via StackBlitz WebContainers, generating apps from prompts with zero local setup. Pick it for in-browser prototyping on locked-down machines or instant demos. Skip it if you need a built-in database (use Lovable) or production-grade code quality.
---

# Bolt.new

StackBlitz's in-browser AI app builder at [bolt.new](https://bolt.new). WebContainers run the full Node.js stack in WebAssembly inside any modern browser. No installs, no local environment, just a prompt and a running app.

Token-metered billing. The Enhance prompt button rewrites your rough request into a structured spec before generation starts.

## System Verdict

> **Pick Bolt.new if you want to prototype a full-stack app in the browser without touching a local environment.** WebContainers run npm, Node servers, and Vite builds client-side, which makes it the only credible option for Chromebooks, locked-down work machines, or classroom settings. Multi-model routing across GPT-5.4, Claude Opus 4.7, and Gemini 3.1 Pro.
>
> **Skip it if your app needs a real backend or database out of the box.** [Lovable](/tools/lovable/) provisions Supabase with auth, Postgres, and real-time subscriptions from one prompt. Skip Bolt also if you want architectural control. [Cursor](/tools/cursor/) and [Claude](/tools/claude/) Code give you a full local environment with better code quality.
>
> **Who pays which tier:** Free for 1M tokens a month and casual exploration, Pro $25/mo for 10M tokens and token rollover, Teams $30/member/mo for shared workspaces and admin controls, Pro scales up to $2,000/mo for 1200M tokens if you are running real volume. Tokens on paid plans roll over one extra month; on-demand token packs ($20 for 10M) never expire while your subscription stays active.

## Key Facts

| | |
|---|---|
| **Product** | In-browser full-stack AI app builder |
| **Runtime** | StackBlitz WebContainers. Node.js in WebAssembly, client-side |
| **Models** | GPT-5.4, Claude Opus 4.7, Gemini 3.1 Pro. Multi-model routing |
| **Billing** | Token-metered. Entire project file tree syncs to the model each message |
| **Free tier** | 1M tokens per month |
| **Pro** | $25/mo for 10M+ tokens, rollover, all models |
| **Pro max** | Scales to $2,000/mo for 1200M tokens |
| **Enhance prompt** | Rewrites rough prompts into structured specs before generation |
| **Deploy** | One-click to Netlify, Vercel, Cloudflare Pages |
| **Version snapshots** | Revert to prior states if generation breaks the project |

Every data point above was verified against vendor sources on 2026-04-17. See Sources.

## What it actually is

A browser tab that runs a full Node development environment. Bolt generates code, installs npm packages, starts servers, and renders the live app inside the same page. No container on a remote VM, no local toolchain.

WebContainers is the moat. StackBlitz built the WebAssembly runtime that executes Node.js entirely client-side. Competitors who want the same experience either pay to license it or rebuild it, which is non-trivial.

The trade-off is persistence. Bolt excels at frontend-heavy prototypes and demo apps. Apps needing authenticated users, a Postgres database, or production-grade data models hit friction. Lovable wins that lane because Supabase is provisioned inside the default flow.

## When to pick Bolt.new

- **You need instant frontend prototyping with zero setup.** Open the tab, describe the app, see it run. No install step.
- **You work on a Chromebook, tablet, or locked-down work machine.** WebContainers run without admin privileges or OS-level dev tools.
- **You teach or demo web development.** Students see a working app in minutes with full file system access.
- **You want the Enhance prompt button to do the structuring.** Rough ideas become detailed specs before generation consumes tokens.
- **You deploy to Netlify, Vercel, or Cloudflare Pages.** One-click deploy with your existing account.

## When to pick something else

- **Full-stack app with built-in backend, auth, and Postgres:** [Lovable](/tools/lovable/) provisions Supabase end to end.
- **Autonomous agent that owns the whole app:** [Replit Agent](/tools/replit-agent/) with Agent 3 runs sessions up to 200 minutes.
- **Component-level generation for React plus shadcn/ui:** [v0](/tools/v0/) has tighter Figma import and shadcn patterns.
- **AI-native IDE on a local machine:** [Cursor](/tools/cursor/) for full architectural control across a real codebase.
- **Terminal agent on an existing repo:** [Claude](/tools/claude/) Code CLI, strongest at multi-file refactors.

## Pricing

Pricing via [bolt.new/pricing](https://bolt.new/pricing). Annual billing saves 10%.

| Plan | Price | Tokens | Who's it for |
|------|-------|--------|--------------|
| Free | $0 | 1M/month | Casual use, first prototypes |
| Pro | $25/mo | 10M/month, rollover | **Solo builders running sustained work** |
| Pro scaled | $50 to $2,000/mo | 26M to 1200M/month | Heavy daily users |
| Teams | $30/member/mo | Shared pool, admin tools | Small teams, classrooms, agencies |
| Enterprise | Custom | Custom | Compliance-heavy orgs |

*Prices verified 2026-04-17 via [bolt.new/pricing](https://bolt.new/pricing). Tokens from paid subscriptions roll over one additional month. On-demand token purchases ($20 for 10M) never expire while you stay subscribed.*

## Against the alternatives

| | Bolt.new | Lovable | v0 |
|---|---|---|---|
| **Scope** | Full-stack in-browser app | Full-stack deployed app with backend | Components and pages |
| **Runtime** | Browser WebContainers | Hosted runtime + Supabase | Hosted preview |
| **Backend** | None built-in | Supabase native | None |
| **Code access** | Full file tree, editable | Full code, GitHub sync | Full export |
| **Deploy targets** | Netlify, Vercel, Cloudflare | lovable.app, custom domain | Vercel one-click |
| **Best viewed as** | In-browser IDE with AI | App factory with backend | Component factory |

## Failure modes

- **WebAssembly is slower than native.** Large apps or memory-heavy build steps lag visibly versus a local Node install. WebContainers runs in the browser main thread with real limits.
- **No built-in database.** Bolt can call external services, but the prompt-to-backend loop is nothing like Lovable's Supabase integration. Expect manual wiring.
- **Token burn on large projects.** Each message syncs the full file tree to the model. A 50-file app burns far more tokens per prompt than a 5-file landing page.
- **Framework optimization skews React.** React, Next.js, and Vite get the best generation quality. Other frameworks work but lag on idiomatic output.
- **Not production infrastructure.** Apps deployed from Bolt are fine for demos and MVPs. Real traffic needs a move to proper hosting.
- **Generation can break the project.** Version snapshots exist for a reason. Revert early, revert often.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against [bolt.new/pricing](https://bolt.new/pricing), [support.bolt.new](https://support.bolt.new), and the [StackBlitz blog](https://blog.stackblitz.com/).

## FAQ

**Does Bolt.new run locally?**
No. Everything runs in the browser via StackBlitz WebContainers, which execute Node.js in WebAssembly. A modern browser and internet connection are the only requirements ([bolt.new](https://bolt.new)).

**How does token billing work?**
Each message syncs the full project file tree to the model, so token cost scales with project size. Free gives 1M tokens a month, Pro gives 10M with rollover, and on-demand packs ($20 for 10M) never expire while you stay subscribed ([bolt.new/pricing](https://bolt.new/pricing)).

**What is the Enhance prompt button?**
A one-click rewrite that expands rough prompts into structured specs before Bolt generates code. Sits behind the plus icon in the chatbox. Improves output quality on vague requests.

**Bolt.new vs Lovable?**
Bolt runs in-browser with zero setup and full file system access. Lovable includes Supabase backend with auth and Postgres provisioned automatically. Pick Bolt for frontend-heavy prototypes. Pick Lovable when the app needs a real backend.

**Which frameworks does Bolt support best?**
React, Next.js, and Vite-based projects get the strongest generation quality. Other frameworks work through npm but see thinner prompt-to-code accuracy.

## Sources

- [bolt.new/pricing](https://bolt.new/pricing): tiers, token allocations, rollover rules
- [support.bolt.new](https://support.bolt.new): Enhance prompt, prompting guide
- [StackBlitz blog](https://blog.stackblitz.com/): WebContainers technology, Bolt release notes

## Related

- **Category:** [AI Design](/categories/ai-design/)
- **Comparisons:** [Bolt.new vs ChatGPT](/compare/bolt-vs-chatgpt/) · [Bolt.new vs Cursor](/compare/bolt-vs-cursor/) · [Bolt.new vs Figma AI](/compare/bolt-vs-figma/) · [Bolt.new vs Google Stitch](/compare/bolt-vs-google-stitch/) · [Lovable vs Bolt.new vs v0](/compare/lovable-vs-bolt-vs-v0/)
