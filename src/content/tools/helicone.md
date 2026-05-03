---
type: tool
slug: helicone
title: Helicone
tagline: Open-source LLM observability in one line of code. Free 10k requests/month. YC W23. AI Gateway adds smart load balancing, caching, and failover across providers.
category: ai-automation
company: helicone
url: https://www.helicone.ai
github_url: https://github.com/Helicone/helicone
pricing_model: freemium
price_range: "Free 10k req/mo / paid tiers scale with volume"
status: active
launched: 2023-03
last_updated: 2026-05-03
last_verified: 2026-05-03
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
tags: [llm-observability, monitoring, ai-gateway, open-source, yc, dev-tools, langgraph]
seo_title: "Helicone: Features, Pricing & Review (April 2026)"
meta_description: "Helicone is an open-source LLM observability platform. Free 10k requests/mo. One-line integration. AI Gateway adds load balancing, caching, failover. Integrates with LangGraph, LiteLLM, Vercel AI SDK."
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
  Helicone is an open-source LLM observability platform that integrates in one line of code. Free tier covers 10,000 requests/month, no credit card. YC W23. The AI Gateway adds smart load balancing across providers, intelligent caching, automatic failover, and rate limiting. Integrates natively with LangGraph, LiteLLM, and the Vercel AI SDK. Pick it for production LLM apps needing cost and quality tracking.
---

# Helicone

Open-source observability for LLM applications. Drop one line into your OpenAI, Anthropic, Google, or LiteLLM client config and every request gets logged, traced, costed, and available for replay in the Helicone dashboard.

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
| **Cloud free tier** | 10,000 requests/month, no credit card |
| **Integration effort** | One line of code (changes base URL or adds proxy) |
| **Providers** | OpenAI, Anthropic, Google, Mistral, Groq, Together, any OpenAI-compatible |
| **Core observability** | Traces, sessions, metrics (cost, latency, quality), user analytics |
| **AI Gateway features** | Load balancing, caching, failover, rate limiting |
| **Integrations (2026)** | LangGraph, LiteLLM, Vercel AI SDK, OpenAI Realtime API |
| **Backed by** | Y Combinator (W23) |

## When to pick Helicone

- **Production LLM apps.** Log every request, debug why a prompt degraded, catch cost runaways before the end-of-month bill.
- **Multi-provider workloads.** Route between OpenAI frontier models and Claude Opus 4.7 based on latency or cost; Helicone tracks both.
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
| Free | $0 | 10,000 requests/month, all core features |
| Pro / Team | Usage-based | Larger request volume, priority support |
| Enterprise | Custom | SSO, compliance, dedicated support |
| Self-hosted | $0 | Run Helicone on your own infrastructure |

See [helicone.ai/pricing](https://www.helicone.ai/pricing) for current paid-tier details. Verified 2026-04-18.

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

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-04-18 against [helicone.ai](https://www.helicone.ai/), [Helicone GitHub](https://github.com/Helicone/helicone), and the [2026 LLM observability guide](https://www.helicone.ai/blog/the-complete-guide-to-LLM-observability-platforms).

## FAQ

**Is Helicone really free?**
Cloud free tier covers 10,000 requests/month with no credit card. Self-hosting is free forever under the open-source license.

**How does Helicone compare to Langfuse?**
Helicone emphasizes the AI Gateway (caching, failover, load balancing). Langfuse emphasizes prompt management and evals. Many teams use both. Both are free-tier generous.

**Does Helicone work with Claude Code or Cursor?**
Both tools call LLM APIs; if you configure those APIs to route through Helicone, yes. For Claude Code, you'd set a custom Anthropic base URL. For Cursor, it's harder because Cursor manages its own API config.

**What's the AI Gateway?**
A high-performance proxy that sits in front of your LLM provider. Adds smart load balancing across multiple providers, intelligent caching to reduce costs, automatic failover when a provider goes down, rate limiting per user, and unified observability. Functionally like an API gateway but LLM-aware.

## Related

- **Category:** [AI Automation](/categories/ai-automation/) · [AI Coding](/categories/ai-coding/)
- **Compare:** Helicone vs [Langfuse](/tools/langfuse/)
- **See also:** [LangGraph](/tools/langgraph/) · [Mastra](/tools/mastra/)
