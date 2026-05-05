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
last_updated: 2026-05-03
last_verified: 2026-05-03
update_frequency: monthly
seo_title: "Bolt.new Review: Pricing, WebContainers, App Builder Features and Alternatives"
meta_description: "Bolt.new by StackBlitz builds full-stack web apps in the browser with WebContainers. Compare token pricing, Enhance Prompt, deployment, Lovable, v0, and Cursor."
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
facts:
  best_for:
    value: "Bolt.new is best for browser-based prototyping of full-stack web apps where the AI can edit files, run the app, and iterate in a hosted WebContainer environment."
    source: "https://support.bolt.new/docs"
    source_label: "Bolt docs"
    source_id: bolt-docs
    verified_at: 2026-05-03
    volatility: low
    confidence: high
  pricing_anchor:
    value: "Bolt uses token/usage-aware paid plans, so serious users should estimate iteration volume, model usage, and deployment/export needs rather than comparing only list price."
    source: "https://bolt.new/pricing"
    source_label: "bolt.new/pricing"
    source_id: bolt-official
    verified_at: 2026-05-03
    next_review_at: 2026-08-03
    volatility: high
    confidence: high
  runtime_architecture:
    value: "Bolt's browser-native developer experience is built on StackBlitz WebContainers, enabling Node.js-style project execution without a local dev setup."
    source: "https://webcontainers.io/"
    source_label: "StackBlitz WebContainers"
    source_id: stackblitz-webcontainers
    verified_at: 2026-05-03
    volatility: low
    confidence: high
  workflow_surface:
    value: "The product is strongest when a user wants prompt-to-code iteration with a running preview, file edits, package installs, and app debugging in one browser workspace."
    source: "https://support.bolt.new/docs"
    source_label: "Bolt docs"
    source_id: bolt-docs
    verified_at: 2026-05-03
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Long debugging loops, large dependencies, or production-grade architecture work can consume tokens quickly; teams should move mature apps into a normal repo workflow once requirements stabilize."
    source: "https://bolt.new/pricing"
    source_label: "bolt.new/pricing"
    source_id: bolt-official
    verified_at: 2026-05-03
    next_review_at: 2026-08-03
    volatility: medium
    confidence: high
tags: [app-builder, no-code, full-stack, webcontainers, browser-ide, prototyping, vibe-coding, ai-design]
best_for:
  - browser-only full-stack prototypes without local setup
  - Chromebook, classroom, or locked-down environments that cannot install Node
  - frontend-heavy apps where a fast Vite preview matters
  - teams testing product ideas before choosing a backend architecture
not_best_for:
  - production apps that need managed databases and auth from the first prompt
  - teams that require deterministic local dev environments and repo-first control
  - cost-sensitive long sessions where token-metered billing can spike
  - non-technical users who want a no-code builder instead of generated code
quick_answer: >-
  Bolt.new is the browser-first AI app builder for fast prototypes, demos, and zero-setup web development. Pick it when WebContainers, instant preview, and one-click deploy matter. Choose Lovable for built-in Supabase/backend workflows, v0 for React components, or Cursor for serious codebase control.
decision_brief:
  items:
    - label: Best use
      value: "Browser prototypes"
      detail: "Great for demos, classrooms, Chromebooks, and locked-down machines."
    - label: Watch for
      value: "Token burn"
      detail: "Large projects get expensive because the file tree is resent to the model."
    - label: Compare against
      value: "Lovable and v0"
      detail: "Lovable handles backend flow better; v0 is stronger for UI components."
---

# Bolt.new

StackBlitz's in-browser AI app builder at [bolt.new](https://bolt.new). WebContainers run the full Node.js stack in WebAssembly inside any modern browser. No installs, no local environment, just a prompt and a running app.

Token-metered billing. The Enhance prompt button rewrites your rough request into a structured spec before generation starts.

## System Verdict

> **Pick Bolt.new if you want to prototype a full-stack app in the browser without touching a local environment.** WebContainers run npm, Node servers, and Vite builds client-side, which makes it the only credible option for Chromebooks, locked-down work machines, or classroom settings. Multi-model routing across OpenAI frontier models, Claude Opus 4.7, and Gemini 3.1 Pro.
>
> **Skip it if your app needs a real backend or database out of the box.** [Lovable](/tools/lovable/) provisions Supabase with auth, Postgres, and real-time subscriptions from one prompt. Skip Bolt also if you want architectural control. [Cursor](/tools/cursor/) and [Claude](/tools/claude/) Code give you a full local environment with better code quality.
>
> **Who pays which tier:** Free for 1M tokens a month and casual exploration, Pro $25/mo for 10M tokens and token rollover, Teams $30/member/mo for shared workspaces and admin controls, Pro scales up to $2,000/mo for 1200M tokens if you are running real volume. Tokens on paid plans roll over one extra month; on-demand token packs ($20 for 10M) never expire while your subscription stays active.

## Key Facts

| | |
|---|---|
| **Product** | In-browser full-stack AI app builder |
| **Runtime** | StackBlitz WebContainers. Node.js in WebAssembly, client-side |
| **Models** | OpenAI frontier models, Claude Opus 4.7, Gemini 3.1 Pro. Multi-model routing |
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
