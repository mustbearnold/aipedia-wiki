---
type: tool
slug: morphic
title: Morphic
tagline: Open-source AI answer engine with generative UI. Self-hostable, Apache 2.0, multi-provider search/chat stack. Latest stable release v1.5.0 (June 10, 2026).
category: ai-search
secondary_categories: [ai-chatbots]
company: morphic
url: https://morphic.sh
github_url: https://github.com/miurla/morphic
pricing_model: free
price_range: "$0 (self-host) + provider API costs"
status: active
launched: 2024-01
last_updated: 2026-06-25
last_verified: 2026-06-25
update_frequency: quarterly
seo_title: "Morphic Review: Self-Hosted AI Search, Pricing & Release Status (June 2026)"
meta_description: "Morphic is an Apache 2.0 AI answer engine and self-hosted Perplexity alternative. June 2026 check: v1.5.0, roughly 8.9k GitHub stars, no first-party paid SaaS tier."
author: "aipedia.wiki Editorial"
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 7
  value: 9
  moat: 6
  longevity: 7
facts:
  best_for:
    value: "Open-source AI answer engine with generative UI. v1.5.0 shipped June 10, 2026 under Apache 2.0. Self-hostable, BYOK, and best for AI search, retrieval workflows, forkable answer engines, and teams that need private deployments."
    source: "https://github.com/miurla/morphic"
    source_label: "miurla/morphic on GitHub"
    source_id: morphic-github
    verified_at: 2026-06-25
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Self-host; $0 framework cost; Apache 2.0; BYOK for model and search-backend providers; no first-party public paid SaaS tier verified on June 23, 2026."
    source: "https://github.com/miurla/morphic"
    source_label: "miurla/morphic on GitHub"
    source_id: morphic-github
    verified_at: 2026-06-25
    next_review_at: 2026-09-08
    volatility: low
    confidence: high
  watch_out_for:
    value: "Community-scale maintenance. v1.5.0 is the latest stable release as of June 25, 2026; verify last-commit and release cadence before depending on a fork. No first-party hosted SLA."
    source: "https://github.com/miurla/morphic"
    source_label: "miurla/morphic on GitHub"
    source_id: morphic-github
    verified_at: 2026-06-25
    next_review_at: 2026-09-08
    volatility: medium
    confidence: high
tags: [ai-search, answer-engine, open-source, self-hosted, generative-ui, perplexity-alternative, apache-2, byok, ollama, anthropic, openai, google, vercel-ai-gateway]
best_for:
  - developers wanting a self-hosted answer engine
  - privacy-sensitive teams avoiding hosted AI search
  - researchers iterating on generative-UI patterns
  - indie hackers forking a production-ready base
not_best_for:
  - non-technical users wanting zero-setup search
  - teams needing polished mobile apps
  - workflows dependent on hosted SLAs
quick_answer: >-
  Morphic is the self-hostable, Apache 2.0 alternative to Perplexity. The June 25, 2026 check found v1.5.0 as the latest stable release, roughly 8.9k GitHub stars, 2.3k forks, and no first-party public paid SaaS tier. Pick it for private deployments, provider choice, and a generative-UI stack to fork. Skip it for polished hosted search, mobile apps, or non-technical users who want zero setup.
price_history:
  - date: 2026-04-10
    plan: "Self-host · v1.3.0"
    price: "$0"
    source: "https://github.com/miurla/morphic/releases"
    source_label: "miurla/morphic releases"
    source_id: morphic-github
    verified_at: 2026-04-10
    note: "v1.3.0 released; Apache 2.0; new providers (Google, Vercel AI Gateway); Docker Compose with Postgres, Redis, SearXNG"
  - date: 2026-05-13
    plan: "Self-host"
    price: "$0"
    source: "https://github.com/miurla/morphic"
    source_label: "miurla/morphic on GitHub"
    source_id: morphic-github
    verified_at: 2026-05-13
    note: "Verified unchanged; no first-party hosted SaaS tier"
  - date: 2026-06-08
    plan: "Self-host · v1.4.0"
    price: "$0"
    source: "https://github.com/miurla/morphic/releases/tag/v1.4.0"
    source_label: "miurla/morphic v1.4.0 release"
    source_id: morphic-github
    verified_at: 2026-06-08
    note: "Verified Apache 2.0 repo, 8.9k stars, 2.3k forks, v1.4.0 latest stable, and no first-party public paid SaaS tier."
  - date: 2026-06-23
    plan: "Self-host · v1.4.0"
    price: "$0"
    source: "https://github.com/miurla/morphic/releases/tag/v1.4.0"
    source_label: "miurla/morphic v1.4.0 release"
    source_id: morphic-releases
    verified_at: 2026-06-23
    note: "Verified Apache 2.0 repo, v1.4.0 still latest stable release, roughly 8.9k stars, 2.3k forks, BYOK provider setup, and no first-party public paid SaaS tier."
  - date: 2026-06-25
    plan: "Self-host · v1.5.0"
    price: "$0"
    source: "https://github.com/miurla/morphic/releases/tag/v1.5.0"
    source_label: "miurla/morphic v1.5.0 release"
    source_id: morphic-releases
    verified_at: 2026-06-25
    note: "Verified Apache 2.0 repo, v1.5.0 as latest stable release, Docker Compose with SearXNG default search, roughly 8.9k stars, 2.3k forks, BYOK provider setup, and no first-party public paid SaaS tier."
---

# Morphic

An open-source AI answer engine positioned as a self-hostable Perplexity alternative. Generative UI, BYOK model/search routing, and an Apache 2.0 license make it a practical forkable stack for private answer-engine experiments.

Core code lives at [github.com/miurla/morphic](https://github.com/miurla/morphic) (roughly 8.9k stars and 2.3k forks as of June 23, 2026). A hosted reference instance runs at [morphic.sh](https://morphic.sh) for evaluation.

## Recent developments

- **June 10, 2026:** [v1.5.0 release](https://github.com/miurla/morphic/releases/tag/v1.5.0) becomes the latest stable build, with Docker Compose using SearXNG by default, Next.js 16, AI SDK 6, PostgreSQL with Drizzle/RLS, Supabase auth with guest mode, and provider profiles for OpenAI, Anthropic Claude, Google Gemini, Vercel AI Gateway, and Ollama.
- **May 24, 2026:** [v1.4.0 release](https://github.com/miurla/morphic/releases/tag/v1.4.0) added an enhanced research-process UI, image-viewer source details, message navigation dots, copy controls, collapsible user messages, and keyboard shortcuts.
- **April 10, 2026:** [v1.3.0 release](https://github.com/miurla/morphic/releases) hardened the deployment story with Quick and Adaptive search modes, dynamic provider detection, a Docker Compose stack with PostgreSQL + Redis + SearXNG + the app, and Supabase authentication with guest mode.

## System Verdict

> **Pick Morphic if the workload demands a self-hosted answer engine.** Apache 2.0 license, BYOK across OpenAI, Anthropic, Google, Ollama, and the Vercel AI Gateway, and a generative-UI stack shipped as a forkable Next.js codebase. Closest thing to "Perplexity, but your infrastructure" without writing the retrieval loop yourself.
>
> **Skip it if the goal is zero-setup search.** [Perplexity](/tools/perplexity/) is still the polished hosted product. [Exa](/tools/exa/) beats Morphic on pure retrieval API quality. [Kagi](/tools/kagi/) wins on curated non-AI search. [You.com](/tools/you-com/) beats it on ecosystem depth.
>
> **Who should run it:** developers deploying a private answer engine, indie hackers wanting a production base to fork, researchers iterating on generative-UI patterns, teams under data-residency rules that block hosted AI search.

## Key Facts

| | |
|---|---|
| **Repository** | [github.com/miurla/morphic](https://github.com/miurla/morphic) · roughly 8.9k stars · 2.3k forks · mostly TypeScript |
| **Latest release** | v1.5.0 (June 10, 2026) |
| **License** | Apache 2.0 |
| **Hosting model** | Self-host (primary) · reference instance at [morphic.sh](https://morphic.sh) |
| **Model providers** | OpenAI, Anthropic, Google, Ollama (local), Vercel AI Gateway, and more via config |
| **Search providers** | Tavily, SearXNG, Brave, Exa |
| **API key model** | BYOK · user supplies provider keys |
| **Stack** | Next.js, Vercel AI SDK, Bun package manager |
| **Deployment** | Docker Compose with PostgreSQL + Redis + SearXNG + app · Vercel deploy supported |
| **Auth** | Supabase auth plus guest mode |
| **Generative UI** | Yes, React components streamed as part of answers |
| **Search modes** | Quick and Adaptive |
| **Hosted paid plan** | None typical · product is code-first |
| **Launched** | 2024, by miurla as an open-source release |

Every data point above was verified against vendor sources on 2026-06-25. See Sources.

## What it actually is

A Next.js application that stitches a search backend, an LLM provider, and streamed React UI into a single answer-engine experience. Users deploy their own copy, bring their own API keys, and optionally point at a local Ollama model for fully private inference.

The generative UI layer is the standout feature. Answers arrive as composed React components (charts, tables, cards, follow-up questions) rather than flat markdown. The approach mirrors Perplexity's UI but ships as source.

The 2026 release line hardened the production story. Docker Compose stands up the full stack with SearXNG as the default search engine, so a light evaluation only needs one AI provider key. Supabase handles authentication with a guest mode for quick demos, and the model selector auto-detects which providers are configured. v1.4.0 focused on reader and reviewer UX around the research process, image sources, message navigation, copy actions, collapsible prompts, and keyboard shortcuts; v1.5.0 moved the stack to Next.js 16, AI SDK 6, PostgreSQL, and a more complete provider/search setup.

The real moat is licensing and posture. Apache 2.0 license plus BYOK plus optional local inference makes Morphic one of the few answer engines deployable behind a firewall without relationship negotiation.

## When to pick Morphic

- **Data residency or privacy rules block hosted AI search.** Self-host on your cloud, point Ollama at a local model, keep queries out of third-party logs.
- **You want Perplexity-style UX with provider choice.** Swap between OpenAI, Anthropic, Google, Ollama, and the Vercel AI Gateway with a config change.
- **You are building on top of an answer engine.** The Next.js codebase is forkable. Generative-UI patterns port into your own product.
- **Budget beats polish.** Infrastructure cost plus provider tokens undercuts Perplexity Pro for teams running internal search.
- **Indie-hacker projects.** Apache 2.0 plus production-ready base equals faster launch than building retrieval from scratch. The new Docker Compose stack means "deploy and try" is a single command.

## When to pick something else

- **Polished hosted search, zero setup:** [Perplexity](/tools/perplexity/). Mobile apps, Pro tier, Spaces, and continued product investment.
- **Strong retrieval as an API primitive:** [Exa](/tools/exa/). Better embeddings-native search for developers piping results into their own stack.
- **Curated non-AI search with privacy focus:** [Kagi](/tools/kagi/). Paid human-tuned search, optional AI summaries.
- **Broader consumer ecosystem:** [You.com](/tools/you-com/). Custom agents, modes, and a hosted product path Morphic does not offer.
- **Non-technical user base:** any hosted product. Morphic still requires a deploy step and provider-key configuration.

## Pricing

Morphic itself is free. The core application is Apache 2.0 licensed and installable from the [GitHub repo](https://github.com/miurla/morphic). Cost lives downstream.

| Component | Cost | Notes |
|-----------|------|-------|
| Morphic core | $0 | Apache 2.0 license. Self-host on any Next.js-capable runtime. |
| Hosting | Variable | Vercel free tier to low-cost VPS. ~$0-$20/mo for light use. Docker Compose stack runs on a single VPS. |
| LLM provider keys | Variable | OpenAI, Anthropic, Google priced per token. Vercel AI Gateway can consolidate billing. Ollama local is $0. |
| Search backend | Variable | Tavily, SearXNG (self-host, $0), Brave, and Exa offer free tiers or per-query pricing. |
| Hosted plan | None typical | No first-party paid SaaS tier. Community forks exist. |

*Prices verified 2026-06-25 via [github.com/miurla/morphic](https://github.com/miurla/morphic), the [v1.5.0 release](https://github.com/miurla/morphic/releases/tag/v1.5.0), and [morphic.sh](https://morphic.sh). The hosted reference instance is for evaluation only and can be rate-limited or removed without notice.*

A realistic monthly cost for a small-team private deployment runs $15-$60 depending on query volume and provider mix. Heavy Anthropic or OpenAI use can push higher; Ollama-local setups can run at near-zero provider cost.

## Against the alternatives

| | Morphic | Perplexity | Exa |
|---|---|---|---|
| **Deployment model** | Self-host, Apache 2.0 | Hosted only | Hosted API + libs |
| **Provider choice** | OpenAI, Anthropic, Google, Ollama, Vercel AI Gateway | Perplexity-managed | Model-agnostic API |
| **Generative UI** | Yes, React streamed | Yes, product-level | No, retrieval-only |
| **Mobile apps** | No | Yes, iOS and Android | No |
| **Cost floor** | $0 core, BYOK tokens | $20/mo Pro | API credits |
| **Privacy posture** | Full control, local inference option | Vendor-controlled | Vendor-controlled |
| **Best viewed as** | Forkable answer-engine stack | Polished hosted product | Retrieval primitive |

## Failure modes

- **Setup friction is real.** Even with the new Docker Compose stack, you still configure API keys, pick a search backend, and own DNS plus auth. Non-developers will not get past the first step.
- **Community-scale maintenance.** One primary maintainer (miurla) plus contributors. Expect slower response times than a funded product. Check the last-commit date and release cadence before committing to a fork.
- **No first-party SLA.** Self-hosted means you own uptime. The hosted morphic.sh instance is not a product commitment.
- **Quality follows provider choice.** Answers reflect whichever model you plug in. Cheap-and-fast local or hosted models can lose accuracy versus frontier hosted systems, especially on hard research or agentic workflows.
- **Search-backend cost surprises.** Tavily, Brave, and Exa meter queries. SearXNG is self-host and free but requires its own ops. Forgetting a rate-limit on a public instance can burn a month's budget in a day.
- **Generative UI requires front-end skill to extend.** Adding new answer components is a React task, not a prompt task.
- **Mobile gap.** No iOS or Android apps. Responsive web only. For users who need a Perplexity-style phone app, Morphic is not the answer.
- **Hosted alternatives keep shipping.** Perplexity, Kagi, and You.com invest in polish Morphic cannot match at volunteer maintenance scale.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and feature details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity, unweighted average). Last verified 2026-06-25 against the [miurla/morphic GitHub repo](https://github.com/miurla/morphic), the [v1.5.0 release](https://github.com/miurla/morphic/releases/tag/v1.5.0), and [morphic.sh](https://morphic.sh).

## FAQ

**Is Morphic free?**
Yes, the core application is Apache 2.0 and free to self-host. Costs come from LLM provider keys (OpenAI, Anthropic, Google, or routed through the Vercel AI Gateway) and optional search-backend fees. Running fully local with Ollama and SearXNG brings provider cost to zero.

**How is Morphic different from Perplexity?**
Perplexity is a hosted, polished product with mobile apps and a paid Pro tier. Morphic is source code released under Apache 2.0. Morphic wins on privacy, cost floor, and provider choice. Perplexity wins on polish, uptime, and mobile experience.

**Which model providers does it support?**
OpenAI, Anthropic, Google, Ollama, and the Vercel AI Gateway out of the box, with a dynamic model selector that auto-detects which providers are configured. Additional providers can be added via configuration. Bring your own API key for hosted providers.

**Which search backends does it support?**
Tavily, SearXNG (self-host), Brave, and Exa are wired up out of the box.

**Can it run fully offline?**
Yes. Pair Morphic with a local Ollama model for inference and self-hosted SearXNG for retrieval, and the stack can run without calling hosted APIs. The new Docker Compose setup includes SearXNG by default.

**What does the "generative UI" feature mean?**
Answers render as streamed React components rather than flat markdown. Charts, tables, follow-up cards, and other interactive elements appear inline as the answer is generated.

**Is there a hosted paid plan?**
Not typically. The [morphic.sh](https://morphic.sh) reference instance is for evaluation. Production use assumes self-hosting or running a community fork.

**Who maintains it?**
Primary maintainer is miurla on GitHub. Community contributors submit PRs. Verify the last-commit date on the [miurla/morphic repo](https://github.com/miurla/morphic) before depending on it in production.

## Sources

- [morphic.sh](https://morphic.sh): hosted reference instance and product overview
- [github.com/miurla/morphic](https://github.com/miurla/morphic): source code, Apache 2.0 license, setup docs, v1.5.0 release (June 10, 2026)
- [morphic.sh/docs](https://morphic.sh/docs): deployment, provider configuration, and generative-UI reference

## Related

- **Category:** [AI Search](/categories/ai-search/)
- **Related:** [Perplexity](/tools/perplexity/) . [Exa](/tools/exa/) . [Kagi](/tools/kagi/) . [You.com](/tools/you-com/)
