---
type: tool
slug: browserbase
title: Browserbase
tagline: Cloud browser infrastructure for web agents, scraping, QA automation, and AI-controlled browsing, now framed around real Chromium browsers, web data APIs, Model Gateway, Functions, identity, and observability.
category: ai-automation
secondary_categories: [ai-infrastructure, ai-coding]
company: browserbase
url: https://www.browserbase.com
pricing_model: paid
price_range: "$0, $20/mo, $99/mo, or custom scale plans plus usage"
status: active
launched: 2023
last_updated: 2026-06-18
last_verified: 2026-06-18
update_frequency: monthly
seo_title: "Browserbase: Features, Pricing & Review (June 2026)"
meta_description: "Browserbase provides cloud browser infrastructure for AI agents, scraping, QA, and browser automation. June 2026 check: pricing is stable, but Fetch, replay, Stagehand, Model Gateway, and browser-agent positioning changed."
author: "aipedia.wiki Editorial"
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 9
  value: 7
  moat: 8
  longevity: 8
facts:
  web_browsing:
    value: "Cloud browser sessions for automation and agents"
    source: "https://www.browserbase.com"
    source_label: "Browserbase website"
    source_id: browserbase-best-for
    verified_at: 2026-06-18
    confidence: high
  coding_agent:
    value: "Infrastructure for browser-using agents; integrates with developer automation stacks"
    source: "https://www.browserbase.com"
    source_id: browserbase-best-for
    verified_at: 2026-06-18
    confidence: high
  best_for:
    value: "Hosted Chromium browsers, Search API, Fetch API, Runtime, Identity, Model Gateway, Observability, Stagehand, and MCP for web agents"
    source: "https://www.browserbase.com"
    source_id: browserbase-best-for
    verified_at: 2026-06-18
    confidence: high
  pricing_anchor:
    value: "Free remains $0; Developer remains $20/month with 25 concurrent browsers and 100 browser hours; Startup remains $99/month with 100 concurrent browsers and 500 browser hours; Scale remains custom. Usage meters include browser hours, Search, Fetch, proxy bandwidth, and Model Gateway market-price tokens."
    source: "https://www.browserbase.com/pricing"
    source_label: "Browserbase pricing"
    source_id: browserbase-pricing
    verified_at: 2026-06-18
    volatility: high
    confidence: high
  platform_shift:
    value: "Browserbase's June positioning centers the Browserbase Browser as real cloud Chromium wrapped with identity, observability, persistence, and live debugging, with Search, Fetch, Functions, Model Gateway, and Stagehand built around that primitive."
    source: "https://www.browserbase.com/blog/what-is-a-browserbase-browser"
    source_label: "Browserbase Browser explainer"
    source_id: browserbase-browser-blog
    verified_at: 2026-06-18
    volatility: medium
    confidence: high
  stagehand_update:
    value: "Stagehand 3.4 added ignoreSelectors for extract and observe, agent variables without the experimental requirement, hybrid default agent mode for compatible models, and new computer-use model support including GPT-5.5."
    source: "https://www.browserbase.com/changelog"
    source_label: "Browserbase changelog"
    source_id: browserbase-changelog
    verified_at: 2026-06-18
    volatility: medium
    confidence: high
tags: [browser-automation, web-agents, ai-infrastructure, playwright, scraping, qa, cloud-browser]
price_history:
  - date: 2026-03-16
    plan: "Free"
    price: "3 concurrent browsers (up from 1)"
    source: "https://www.browserbase.com/changelog"
    source_label: "Browserbase changelog"
    source_id: browserbase-changelog
    note: "Free-tier concurrency tripled to make agent prototypes practical without paying."
  - date: 2026-03-11
    plan: "Fetch API"
    price: "~$1 / 1k pages"
    source: "https://www.browserbase.com/changelog"
    source_label: "Browserbase changelog"
    source_id: browserbase-changelog
    note: "Launched as a lightweight alternative to browser sessions for read-only extraction."
  - date: 2026-05-13
    plan: "Platform additions"
    price: "Same plans, new capabilities"
    source: "https://www.browserbase.com/pricing"
    source_label: "Browserbase pricing"
    source_id: browserbase-pricing
    note: "Browserbase Functions (Feb), Fetch API (Mar), Search API (Mar), Model Gateway (Apr), Stagehand 3.3.0 (May), improved Downloads API (May) all ship inside existing pricing. Headline plan prices unchanged: Free, Developer $20, Startup $99, Scale custom."
  - date: 2026-06-01
    plan: "Free / Developer / Startup / Scale"
    price: "$0 / $20 / $99 / Custom"
    source: "https://www.browserbase.com/pricing"
    source_label: "Browserbase pricing"
    source_id: browserbase-pricing
    note: "Headline plans remain Free, Developer $20/mo, Startup $99/mo, and Scale custom. The pricing page now frames the platform around Browsers, Web Data APIs, Runtime, Identity, Models, Observability, Stagehand, and MCP."
best_for:
  - developers building browser-using agents
  - scraping and data extraction workflows
  - QA automation that needs hosted browsers
  - teams that do not want to maintain browser infrastructure
not_best_for:
  - casual users who want an AI browser
  - simple no-code automations
  - teams with cheap reliable in-house browser infrastructure
quick_answer: >-
  Browserbase is cloud browser infrastructure for AI agents and automation. Pick it if you are building browser-using agents, scraping pipelines, web data extraction, QA workflows, or deployed Stagehand agents that need managed sessions, identity, runtime, Model Gateway, and observability. Skip it if you want a consumer AI browser like Dia or Comet.
---

# Browserbase

Browserbase provides hosted browser infrastructure for web automation. Instead of running your own Playwright or Puppeteer fleet, you create cloud Chromium sessions that agents, scrapers, and QA jobs can control. The platform now spans browser sessions, Search and Fetch APIs, Functions runtime, Identity, Model Gateway, observability, MCP, and open-source layers such as Stagehand.

## System Verdict

> **Pick Browserbase if your AI product needs to use the web reliably.** It is infrastructure for browser-using agents, not a consumer browser.
>
> **Skip it if you only need a personal AI browser.** Dia and Comet are for humans browsing with AI. Browserbase is for developers building systems that operate browsers.
>
> **Benchmark it against the operational cost of self-hosting.** The right comparison is not just browser-hour pricing. It is the time your team spends maintaining sessions, proxies, identity, logs, screenshots, traces, and broken-flow debugging.

## What Changed Since The Last Refresh

- Pricing did not materially change: Free, Developer at $20/month, Startup at $99/month, and Scale custom remain the headline plans.
- The product framing moved further toward a full browser-agent platform. Browserbase's June Browser explainer describes a real cloud Chromium browser wrapped with identity, observability, persistence, and live debugging.
- Fetch API is more important than the old page implied: the May changelog says Fetch can return markdown or structured JSON, raised its data cap from 1MB to 5MB, and prices Extract around $4 per 1,000 pages or $7 per 1,000 pages with proxies.
- Session replay streaming became a product surface for embedding HLS-compatible replays in customer products, free on every plan up to 120 sessions per minute.
- Stagehand 3.4 changed agent behavior: `ignoreSelectors`, agent variables without the experimental requirement, hybrid default agent mode for compatible models, stronger frame handling, and new computer-use model support including GPT-5.5.
- Model Gateway is no longer just a pricing footnote. Browserbase docs say it routes OpenAI, Anthropic, and Google model calls through the Browserbase API key at market-price token billing with no markup.

## Key facts

| | |
|---|---|
| Category | Cloud browser infrastructure |
| Best for | Web agents, scraping, QA automation |
| Platform pieces | Browsers, Search API, Fetch API, Functions Runtime, Identity, Model Gateway, Observability, Stagehand, MCP |
| Open-source layer | Browser CLI, Stagehand SDK, Director |
| Pricing | Free, Developer $20/mo, Startup $99/mo, Scale custom |
| Newest product signal | June Browserbase Browser positioning plus May Fetch, replay, downloads, and Stagehand 3.4 updates |
| Main competitors | Browserless, Steel, self-hosted Playwright, Selenium Grid |

## Where it fits

AI agents often fail not because the model cannot reason, but because browser execution is brittle: sessions expire, CAPTCHAs appear, pages load slowly, and screenshots need to be streamed back to the model. Browserbase abstracts much of that operational burden. The current public site and docs now separate the stack into hosted browsers, Search API, Fetch API, Functions runtime, Identity, Model Gateway, and observability. That matters because interactive browsing, read-only extraction, deployed agents, authenticated sessions, model routing, and replay debugging have different costs and failure modes.


## Buyer fit

Browserbase is strongest when browser use is part of your product's backend, not just a one-off script. Typical fits include AI agents that need to operate websites, QA systems that replay user journeys, enrichment pipelines that need page rendering, and internal tools that need a controlled browser runtime with observability.

The buy-versus-build question is practical. If your automation is small, predictable, and internal, self-hosted Playwright or Puppeteer may be enough. If sessions need isolation, identity handling, runtime controls, stealth behavior, debugging, and production monitoring, managed infrastructure becomes easier to justify. The cost is not just session pricing. It is the engineering time spent keeping browser fleets reliable.

Compare Browserbase with bare browser-hosting providers, Stagehand-style agent abstractions, and in-house Playwright clusters. Do not compare it with [Comet](/tools/comet/) or [Dia](/tools/dia/) as if all AI browsers solve the same job. Browserbase is for software systems that use the web. Comet and Dia are for humans using the web.

## Recent changes (2026)

The platform has expanded materially in 2026 without changing headline plan prices:

- **June 16:** Browserbase's current Browser explainer re-centers the platform around a real Chromium browser for agents, with identity, observability, persistence, live debugging, Search, Fetch, Functions, Model Gateway, and Stagehand built around it.
- **June 3:** Stagehand evals added a June benchmark surface for comparing model accuracy, cost, and speed on Browserbase Benchmark v1 and Online Mind2Web.
- **May 14:** Fetch API now returns markdown and structured JSON, raises the data cap from 1MB to 5MB, and adds Extract pricing around $4 per 1,000 pages or $7 per 1,000 pages with proxies.
- **May 13:** Session replay streaming adds an API for embedding replays in customer products, HLS-compatible playback, and CDN-backed streaming within seconds after sessions end.
- **May 13:** Stagehand 3.4.0 adds `ignoreSelectors`, agent variables without the experimental requirement, hybrid default agent mode, new computer-use model support, better OOPIF frame handling, and stronger observe element ID prompting.
- **May 6:** Improved Downloads API treats files as individual objects with unique IDs; sessions support filtering by filename, MIME type, size, or timestamp.
- **May 5:** Stagehand 3.3.0 adds verified-agent identity mode (to reduce bot blocks), adaptive thinking that scales reasoning token use on Anthropic models by task complexity, and explicit file-input handling for upload flows.
- **April 5:** Model Gateway opens multi-provider model access (OpenAI, Anthropic, Gemini) through a single Browserbase API key.
- **March 17:** Search API (Exa-powered) launched with 1,000 free monthly calls on every plan.
- **March 16:** Free plan concurrency raised from 1 to 3 browsers.
- **March 11:** Fetch API launched at roughly $1 per 1,000 pages as a lightweight, no-session alternative for read-only extraction.
- **February 10:** Browserbase Functions allow direct agent deployment on Browserbase infrastructure with up to 70% lower latency.
- **January 15:** Session Recordings rebuilt on CDP for pixel-accurate, event-driven playback across multiple tabs.

## Pricing Notes Verified 2026-06-18

Browserbase lists four plans. Free includes 3 concurrent browsers, 1 browser hour, 1,000 Search calls, 1,000 Fetch calls, 15-minute sessions, 7-day retention, and $5 in model tokens. Developer is $20/mo with 25 concurrent browsers and 100 browser hours, then $0.12/browser-hour, plus 1,000 included Search calls and 1,000 included Fetch calls. Startup is $99/mo with 100 concurrent browsers and 500 browser hours, then $0.10/browser-hour, plus 1,000 Search calls and 10,000 Fetch calls. Scale is custom with 250+ concurrent browsers and enterprise features such as SSO, DPA/BAA options, verified agents, and advanced CAPTCHA solving.

The unit economics depend on workload shape. A short fetch-heavy enrichment task can be cheap, especially if Fetch avoids launching a full browser session. A long-running browser session with login, proxy traffic, screenshots, model calls, replays, and retries can cost more than the headline plan price suggests. Track browser hours, Search calls, Fetch calls, Extract calls, proxy usage, Model Gateway spend, session replay needs, retention requirements, and runtime deployment separately.

## Best plan recommendation

Use the free tier only to validate API fit, not production economics. The Developer plan is the practical starting point for solo builders or small teams proving an agent workflow because it gives enough concurrency and browser hours to test real flows without jumping straight to custom sales. Startup becomes the more realistic fit once the workload is part of a product or internal platform and needs higher concurrency, longer debugging windows, and a cleaner cost baseline.

Move to Scale only when the browser layer is a production dependency. At that point, the evaluation should include SSO, security review, data processing terms, verified agents, retention, and escalation support. The platform is easiest to justify when it replaces a fragile internal browser fleet, not when it is used for one script that already runs reliably on a cheap VM.

## Practical evaluation

Before standardizing on Browserbase, run a pilot with real failure cases:

- A logged-in workflow with identity and session persistence.
- A JavaScript-heavy site that requires real browser rendering.
- A fetch-only extraction job where Fetch API is cheaper than full browser sessions.
- A QA path that needs screenshots, replay, logs, and alerting.
- A workload that triggers CAPTCHAs, bot checks, or rate limits.
- A batch job large enough to expose concurrency and cost limits.

The goal is to learn whether Browserbase removes operational risk or just moves the complexity into platform configuration.

## Failure modes

- You still need guardrails for login, payment, and destructive actions.
- Browser automation can break when target sites change.
- Costs can rise quickly for high-volume scraping or long-running sessions.
- Model Gateway simplifies provider setup, but token spend still passes through at market price.
- Fetch and Extract are cheaper than browser sessions for many read-only jobs, but they do not replace real browser execution when login, interaction, downloads, or visual state matter.
- Compliance and privacy requirements need review before agents operate inside sensitive accounts.
- Some sites prohibit scraping or automated access; Browserbase does not remove legal or terms-of-service risk.

## Sources

- [Browserbase website](https://www.browserbase.com)
- [Browserbase pricing](https://www.browserbase.com/pricing)
- [Browserbase changelog](https://www.browserbase.com/changelog)
- [Browserbase Browser explainer](https://www.browserbase.com/blog/what-is-a-browserbase-browser)
- [Browserbase Model Gateway docs](https://docs.browserbase.com/platform/model-gateway/overview)
- [Stagehand evals](https://www.stagehand.dev/evals)
