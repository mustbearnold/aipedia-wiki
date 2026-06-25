---
type: tool
slug: helicone
title: Helicone
tagline: Open-source LLM observability in one line of code. Free 10k requests/month. YC W23. AI Gateway adds model routing, cost optimization, caching, rate limits, and failover across providers.
category: ai-automation
company: helicone
url: https://www.helicone.ai
github_url: https://github.com/Helicone/helicone
pricing_model: freemium
price_range: "Free 10k req/mo / Pro $79/mo / Team $799/mo / Enterprise custom"
status: active
launched: 2023-03
last_updated: 2026-06-25
last_verified: 2026-06-25
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 9
  value: 9
  moat: 7
  longevity: 8
facts:
  best_for:
    value: Best for teams that need LLM observability, gateway controls, logging, cost tracking, and debugging across AI app
      traffic.
    source: https://www.helicone.ai/
    source_label: Helicone official site
    source_id: helicone-official
    verified_at: '2026-06-25'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-23'
  pricing_anchor:
    value: Helicone pricing is Hobby free (10k req/mo), Pro $79/mo with unlimited seats and usage-based scaling, Team $799/mo with SOC-2/HIPAA and 5 orgs, and Enterprise custom with SSO and on-prem options.
    source: https://www.helicone.ai/pricing
    source_label: Helicone pricing
    source_id: helicone-pricing
    verified_at: '2026-06-25'
    volatility: high
    confidence: high
    next_review_at: '2026-07-23'
  open_source_or_local:
    value: Helicone is open source and offers cloud plus self-host/deployment paths for observability and AI Gateway use cases,
      so buyers can evaluate repository activity, deployment model, data handling, and self-hosting fit as part of procurement.
    source: https://github.com/Helicone/helicone
    source_label: Helicone GitHub repository
    source_id: helicone-repository
    verified_at: '2026-06-25'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-23'
  integration_surface:
    value: Docs are the source of truth for SDK/proxy setup, provider support, logging, prompt tracing, experiments, AI Gateway
      routing, cost optimization, caching, custom rate limits, pass-through billing, and provider-key configuration.
    source: https://docs.helicone.ai/
    source_label: Helicone docs
    source_id: helicone-docs
    verified_at: '2026-06-25'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-23'
  watch_out_for:
    value: Observability tools sit in sensitive prompt/data paths; review PII handling, retention, self-host options, sampling,
      and incident response before routing production traffic.
    source: https://docs.helicone.ai/
    source_label: Helicone docs
    source_id: helicone-docs
    verified_at: '2026-06-25'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-23'
tags: [llm-observability, monitoring, ai-gateway, open-source, yc, dev-tools, langgraph]
seo_title: "Helicone: Features, Pricing & Review (June 2026)"
meta_description: "Helicone is an open-source LLM observability and AI Gateway platform. Free 10k requests/mo, Pro $79/mo, Team $799/mo, Enterprise custom. Gateway credits add 0% markup provider access, caching, and failover."
author: "aipedia.wiki Editorial"
best_for:
  - developers shipping LLM-powered products
  - teams running multi-provider LLM workloads
  - observability into cost, latency, and quality across users
  - LangGraph / agent workflow debugging
not_best_for:
  - teams already committed to LangSmith (LangChain's in-house)
  - simple single-prompt prototypes (overkill)
  - non-LLM application observability (use Datadog / Sentry)
quick_answer: >-
  Helicone is an open-source LLM observability and AI Gateway platform that integrates in one line of code. Free Hobby tier covers 10,000 requests/month, no credit card. Pro is $79/mo with unlimited seats, Team is $799/mo with SOC-2 and HIPAA, and Enterprise adds SAML SSO plus on-prem options. The AI Gateway adds 0% markup provider credits, unified access to 100+ models, caching, fallback, rate limits, and cost tracking. Pick it for production LLM apps needing cost, quality, and reliability visibility.
price_history:
  - date: 2026-06-25
    plan: "Hobby / Pro / Team / Enterprise"
    price: "$0 / $79/mo / $799/mo / Custom"
    source: "https://www.helicone.ai/pricing"
    source_label: "Helicone pricing"
    source_id: helicone-pricing
    verified_at: 2026-06-25
    note: "Reverified public pricing and docs. Gateway docs still emphasize provider routing, cost optimization, caching, custom rate limits, and observability."
  - date: 2026-06-02
    plan: "Hobby / Pro / Team / Enterprise"
    price: "$0 / $79/mo / $799/mo / Custom"
    source: "https://www.helicone.ai/pricing"
    source_label: "Helicone pricing"
    source_id: helicone-pricing
    verified_at: 2026-06-25
    note: "Reverified public pricing. Current docs also position the AI Gateway around 100+ models, 0% markup credits, bring-your-own provider keys, caching, fallbacks, and observability."
  - date: 2026-04-18
    plan: "Free / paid"
    price: "Free 10k req/mo + usage-based paid"
    source: "https://www.helicone.ai/pricing"
    source_label: "Source"
    source_id: helicone-pricing
    verified_at: 2026-06-25
    note: "Free tier 10k requests/mo, all core features. Paid usage-based for higher volume."
  - date: 2026-05-13
    plan: "Hobby / Pro / Team / Enterprise"
    price: "$0 / $79/mo / $799/mo / Custom"
    source: "https://www.helicone.ai/pricing"
    source_label: "Source"
    source_id: helicone-pricing
    verified_at: 2026-06-25
    note: "Pricing now formalized: Hobby free (10k req, 1GB storage, 1 seat), Pro $79/mo (unlimited seats, alerts, HQL), Team $799/mo (SOC-2/HIPAA, 5 orgs, Slack support), Enterprise custom (SAML SSO, on-prem)."
---

# Helicone

Open-source observability for LLM applications. Drop one line into your OpenAI, Anthropic, Google, or LiteLLM client config and every request gets logged, traced, costed, and available for replay in the Helicone dashboard.

As of June 25, 2026, Helicone also leans hard into the AI Gateway: unified access to 100+ models, model-cost routing, bring-your-own provider keys, caching, custom rate limits, automatic fallbacks, and complete observability from the same integration path.

## System Verdict

> **Pick Helicone if you're shipping an LLM-powered product and need to see what's happening under the hood.** The one-line integration is genuinely one line. Prompt-level cost tracking, latency distributions, per-user analytics, and a prompt playground for iteration all ship in the free tier.
>
> **Skip it if you're already committed to LangSmith.** LangChain's first-party observability integrates more deeply with LangChain/LangGraph than any third-party tool. If you're deep in that ecosystem and don't mind LangSmith's pricing, stick with it.
>
> **Helicone's edge over LangSmith:** multi-provider support is first-class (LangSmith is LangChain-centric), the AI Gateway adds real production features (caching saves 30-80% on repeated prompts, failover prevents OpenAI outages from killing your app), and the free tier is meaningfully usable (10k requests/mo vs LangSmith's smaller limits).

## Key Facts

| | |
|---|---|
| **License** | Open source (self-hostable) |
| **Hobby (free)** | 10,000 requests/month, 1 GB storage, 1 seat, no credit card |
| **Pro** | $79/mo, unlimited seats, alerts, reports, HQL, usage-based above 10K |
| **Team** | $799/mo, SOC-2 and HIPAA, 5 organizations, dedicated Slack support |
| **Enterprise** | Custom with SAML SSO, MSA, on-prem deployment |
| **Integration effort** | One line of code (changes base URL or adds proxy) |
| **Providers** | OpenAI, Anthropic, Google, Mistral, Groq, Together, any OpenAI-compatible |
| **Core observability** | Traces, sessions, metrics (cost, latency, quality), user analytics |
| **AI Gateway features** | Load balancing, caching, automatic failover, rate limiting |
| **Gateway billing** | Helicone credits with 0% markup, or bring your own provider keys |
| **Current public scale signals** | 10B requests processed, 2.5T tokens/month, 64.9M users tracked (vendor-reported) |
| **Integrations (2026)** | LangGraph, LiteLLM, Vercel AI SDK, OpenAI Realtime API, OpenAI-compatible clients |
| **Backed by** | Y Combinator (W23) |

## When to pick Helicone

- **Production LLM apps.** Log every request, debug why a prompt degraded, catch cost runaways before the end-of-month bill.
- **Multi-provider workloads.** Route between OpenAI, Anthropic, Google, Mistral, Groq, Together, Bedrock, Azure, or OpenAI-compatible endpoints based on latency, cost, and fallback needs; Helicone tracks the traffic either way.
- **Cost optimization.** Prompt caching alone typically saves 30-80% on repeated-prompt workloads. The gateway handles it.
- **Agent workflow debugging.** LangGraph integration shows you exactly what each node in a graph did, including tool calls and state changes.
- **Self-hosted preference.** Open-source core lets you run Helicone on your own infrastructure.

## When to pick something else

- **LangChain-centric shops:** [LangSmith](https://smith.langchain.com) integrates deeper. If you're all-in on LangChain, stay there.
- **Prompt management + evals focus:** [Langfuse](/tools/langfuse/) overlaps and has a stronger prompt management story.
- **App-wide observability:** Datadog, New Relic, Sentry for full-stack; Helicone is LLM-specific.
- **Simple prototypes:** Direct provider dashboards (OpenAI Usage, Anthropic Console) suffice until you have real scale.

## Pricing

Helicone ships a cloud-hosted service with generous free tier plus optional self-hosting.

| Plan | Price | What's included |
|---|---|---|
| Hobby | $0 | 10,000 requests/month, 1 GB storage, 1 seat, 1 org |
| Pro | $79/mo | Everything in Hobby plus unlimited seats, alerts, reports, HQL query language, usage-based scaling |
| Team | $799/mo | Everything in Pro plus 5 organizations, SOC-2 and HIPAA compliance, dedicated Slack support |
| Enterprise | Custom | SAML SSO, MSA agreements, on-prem deployment options |
| Self-hosted | $0 | Run Helicone on your own infrastructure |

Usage-based pricing applies above the 10K free tier (calculator estimates vary by request volume, storage, and integration path). AI Gateway credits use provider-cost pass-through positioning; observability-only deployments can bring their own provider keys. See [helicone.ai/pricing](https://www.helicone.ai/pricing) and Helicone docs for current paid-tier details. Verified 2026-06-25.

## Failure modes

- **Free tier caps at 10k requests/month.** Small production apps can blow through this in days. Plan the upgrade path or self-host.
- **Proxy vs async logging tradeoff.** Helicone-as-proxy adds latency (~5-20ms). Async logging avoids latency but can miss logs during failures. Know which mode you're in.
- **Prompt caching needs cache-aware prompt design.** If your prompts include timestamps or random nonces, cache hit rate is zero.
- **Not a replacement for prompt eval harnesses.** For systematic evaluation of prompt changes, use Helicone's evals + a dedicated eval tool (Braintrust, Promptfoo).
- **Gateway adds a hop.** For ultra-low-latency applications (real-time voice, sub-100ms SLA), the extra proxy hop matters.

## Against the alternatives

| | Helicone | Langfuse | LangSmith | Braintrust |
|---|---|---|---|---|
| **Open source** | Yes | Yes (MIT) | No | No |
| **Free tier** | 10k req/mo | 50k units/mo | Limited | Limited |
| **AI Gateway (proxy features)** | Yes | No | No | No |
| **LangChain integration** | Good | Good | Best (native) | Good |
| **Self-hosted** | Yes | Yes | No | No |
| **Best for** | Multi-provider production | Evals + prompt mgmt | LangChain-centric teams | Eval-heavy teams |

## Methodology

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-06-25 against [helicone.ai](https://www.helicone.ai/), [Helicone pricing](https://www.helicone.ai/pricing), [Helicone docs](https://docs.helicone.ai/getting-started/platform-overview), [Helicone gateway cost-tracking docs](https://docs.helicone.ai/guides/cookbooks/cost-tracking), and the [Helicone GitHub repository](https://github.com/Helicone/helicone).

## FAQ

**Is Helicone really free?**
The Hobby cloud free tier covers 10,000 requests/month with no credit card. Self-hosting is free forever under the open-source license. Pro at $79/mo unlocks unlimited seats, alerts, reports, and the HQL query language; Team at $799/mo adds SOC-2 and HIPAA compliance with 5 organizations.

**How does Helicone compare to Langfuse?**
Helicone emphasizes the AI Gateway (caching, failover, load balancing). Langfuse emphasizes prompt management and evals. Many teams use both. Both are free-tier generous.

**Does Helicone work with Claude Code or Cursor?**
Both tools call LLM APIs; if you configure those APIs to route through Helicone, yes. For Claude Code, you'd set a custom Anthropic base URL. For Cursor, it's harder because Cursor manages its own API config.

**What's the AI Gateway?**
A high-performance proxy that sits in front of LLM providers. It can use Helicone credits with 0% markup or bring-your-own provider keys, then add unified access to 100+ models, caching, automatic failover, load balancing, rate limiting, and observability. Functionally like an API gateway, but LLM-aware.

## Related

- **Category:** [AI Automation](/categories/ai-automation/) · [AI Coding](/categories/ai-coding/)
- **Compare:** Helicone vs [Langfuse](/tools/langfuse/)
- **See also:** [LangGraph](/tools/langgraph/) · [Mastra](/tools/mastra/)
