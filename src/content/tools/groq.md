---
type: tool
slug: groq
title: Groq
tagline: Fast LLM inference on Groq's LPU cloud. Free tier for prototyping, paid usage-based API pricing, Llama/Qwen/GPT OSS routes, built-in tools, Batch API discounts, and prompt-caching savings.
category: ai-chatbots
company: groq
url: https://groq.com
pricing_model: freemium
price_range: "Free 30 req/min / paid usage-based"
status: active
launched: 2020-01
last_updated: 2026-06-23
last_verified: 2026-06-23
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
  moat: 9
  longevity: 8
facts:
  best_for:
    value: Best for developers who need very low-latency hosted inference for supported open models through an API, with current catalog checks across Llama, Qwen, Whisper, DeepSeek, and OpenAI-compatible GPT OSS routes.
    source: https://groq.com/
    source_label: Groq official site
    source_id: groq-official
    verified_at: '2026-06-23'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-23'
  pricing_anchor:
    value: As of June 23, 2026, Llama 4 Scout runs $0.11/$0.34, Llama 3.1 8B Instant $0.05/$0.08, Llama 3.3 70B Versatile $0.59/$0.79,
      Qwen3 32B $0.29/$0.59, Qwen 3.6 27B $0.60/$3.00, and GPT OSS 20B $0.075/$0.30 per million tokens. Prompt caching now explicitly lists Kimi K2 0905 at $1.00 uncached input, $0.50 cached input, and $3.00 output.
    source: https://groq.com/pricing/
    source_label: Groq pricing
    source_id: groq-pricing
    verified_at: '2026-06-23'
    volatility: high
    confidence: high
    next_review_at: '2026-07-23'
  api_available:
    value: Groq is API-first; the docs define authentication, chat/completions behavior, streaming, tool use, and production
      integration assumptions.
    source: https://console.groq.com/docs/overview
    source_label: Groq docs
    source_id: groq-docs
    verified_at: '2026-06-23'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-23'
  model_control:
    value: The June 2026 supported-models page should be treated as the source of truth because model IDs, production/preview status, context windows, and deprecations move quickly.
    source: https://console.groq.com/docs/models
    source_label: Groq supported models
    source_id: groq-models
    verified_at: '2026-06-23'
    volatility: high
    confidence: high
    next_review_at: '2026-07-23'
  watch_out_for:
    value: Benchmark Groq on your own prompts for latency, context length, model quality, rate limits, and fallback strategy
      rather than buying only on speed positioning.
    source: https://console.groq.com/docs/models
    source_label: Groq supported models
    source_id: groq-models
    verified_at: '2026-06-23'
    volatility: high
    confidence: high
    next_review_at: '2026-07-23'
tags: [inference, lpu, fast, llama, qwen, deepseek, gpt-oss, hardware, api]
seo_title: "Groq (LPU Inference): Features, Pricing & Review (June 2026)"
meta_description: "Groq is the LPU inference provider, not xAI's Grok chatbot. Compare current June 2026 API pricing, free-tier limits, supported open models, prompt caching, Batch API discounts, and buyer fit."
author: "aipedia.wiki Editorial"
best_for:
  - latency-sensitive LLM workloads
  - real-time voice or streaming applications
  - production apps needing consistent low-latency
  - open-weight model inference at scale
not_best_for:
  - users who need frontier-proprietary models from OpenAI, Anthropic, or Google
  - long-context or reasoning workloads (open-weight on Groq is capped)
  - users without API integration (consumer-facing UI is minimal)
quick_answer: >-
  Groq is the LPU inference provider, not xAI's Grok chatbot. The June 23, 2026 buyer case is still speed and predictable API economics for supported open models: free-tier prototyping, paid usage-based pricing, prompt caching, built-in tools, and Batch API discounts. Pick it for latency-critical open-model workloads; skip it when you need a closed frontier model from OpenAI, Anthropic, or Google.
price_history:
  - date: 2026-06-23
    plan: "Model pricing and prompt caching"
    price: "Usage-based by model"
    source: "https://groq.com/pricing/"
    source_label: "Groq pricing"
    source_id: groq-pricing
    verified_at: 2026-06-23
    note: "Reverified pricing table: GPT OSS 20B/120B, Llama 4 Scout, Qwen3 32B, Llama 3.3 70B, Llama 3.1 8B, and Qwen 3.6 27B are public pricing rows; Kimi K2 0905 appears in prompt-caching pricing."
  - date: 2026-06-02
    plan: "Model pricing"
    price: "Usage-based by model"
    source: "https://groq.com/pricing/"
    source_label: "Groq pricing"
    source_id: groq-pricing
    verified_at: 2026-06-23
    note: "Reverified current public pricing table and discount surfaces; use the live pricing page because model IDs and throughput labels can move."
  - date: 2026-05-13
    plan: "Llama 4 Scout"
    price: "$0.11 input / $0.34 output per M tokens"
    source: "https://groq.com/pricing"
    source_label: "Groq pricing"
    source_id: groq-pricing
    verified_at: 2026-06-23
    note: "Verified unchanged; 594 TPS measured"
  - date: 2026-05-13
    plan: "GPT OSS 20B"
    price: "$0.075 input / $0.30 output per M tokens"
    source: "https://groq.com/pricing"
    source_label: "Groq pricing"
    source_id: groq-pricing
    verified_at: 2026-06-23
    note: "Added to catalog; 1,000 TPS, top throughput on Groq"
  - date: 2026-05-13
    plan: "Llama 3.3 70B Versatile"
    price: "$0.59 input / $0.79 output per M tokens"
    source: "https://groq.com/pricing"
    source_label: "Groq pricing"
    source_id: groq-pricing
    verified_at: 2026-06-23
    note: "Replaced prior Llama 3 70B listing on the pricing page; 394 TPS"
  - date: 2026-05-13
    plan: "Qwen3 32B"
    price: "$0.29 input / $0.59 output per M tokens"
    source: "https://groq.com/pricing"
    source_label: "Groq pricing"
    source_id: groq-pricing
    verified_at: 2026-06-23
    note: "Specific pricing now published (previously listed as mid-range)"
---

# Groq

> **Not to be confused with [Grok](/tools/grok/)** (xAI's chatbot, different company, different product). This page is Groq, the LPU inference provider.

One of the fastest LLM inference providers on the market in 2026. Custom silicon called the Language Processing Unit (LPU) is optimized for low-latency model serving, and Groq's API exposes supported open models through an OpenAI-compatible developer surface.

As of June 23, 2026, Groq's public pricing page still frames the buyer case around predictable per-token pricing, prompt caching, Batch API discounts, and built-in tools. Kimi K2 0905 appears in prompt-caching pricing, while Qwen 3.6 27B is now a visible public model-price row beside GPT OSS, Llama, and Qwen3.

## System Verdict

> **Pick Groq if your workload is latency-sensitive.** Real-time voice agents, streaming chat interfaces, interactive AI applications all feel qualitatively different at 500+ tokens/second. You notice the speed the first time you try it.
>
> **Skip Groq if you need frontier proprietary models.** Groq serves supported open and open-compatible model routes. For the newest closed frontier ChatGPT, Claude, or Gemini models, go to the source provider.
>
> **The 2026 context:** Open-weight flagships have closed the gap on many tasks, but quality still varies by job. Groq's edge is not "best model"; it is fast serving, simple API migration, and lower-latency economics for the open models it supports.

## Key Facts

| | |
|---|---|
| **Free tier** | 30 requests/min, 6,000 tokens/min, 14,400 requests/day |
| **Developer tier** | 10x free rate limits, 25 percent discount on tokens |
| **Llama 4 Scout 17B** | $0.11 input / $0.34 output per M tokens (594 TPS) |
| **Llama 3.3 70B Versatile** | $0.59 input / $0.79 output per M tokens (394 TPS) |
| **Llama 3.1 8B Instant** | $0.05 input / $0.08 output per M tokens (840 TPS) |
| **Qwen3 32B** | $0.29 input / $0.59 output per M tokens (662 TPS) |
| **Qwen 3.6 27B** | $0.60 input / $3.00 output per M tokens (500 TPS) |
| **GPT OSS 20B** | $0.075 input / $0.30 output per M tokens (1,000 TPS) |
| **GPT OSS 120B** | $0.15 input / $0.60 output per M tokens (500 TPS) |
| **Speed** | Up to 1,000 tokens/second on GPT OSS 20B; 394 to 840 TPS on Llama-family models |
| **Hardware** | Custom LPU (Language Processing Unit) silicon |
| **Batch API** | 50 percent discount for non-real-time workloads (24h to 7d windows) |
| **Prompt caching** | 50 percent off cached input tokens, no extra caching fee |

## When to pick Groq

- **Real-time voice applications.** Users feel sub-200ms response times. Groq's streaming LLM inference makes this achievable with open-weight models.
- **Streaming chat interfaces.** Token streaming that displays in real time. On Groq, the full response often lands before the user finishes reading the first line.
- **Production apps scaling open-weight.** Low per-token pricing plus low latency can create strong unit economics for Llama, Qwen, Whisper, DeepSeek, and compatible open-model deployments.
- **Agent loops with tight latency budgets.** Multi-step agent workflows where each LLM call must return fast to meet overall SLA.

## When to pick something else

- **Frontier proprietary quality:** Go direct to [OpenAI](/tools/chatgpt/), [Anthropic](/tools/claude/), or [Google](/tools/gemini/).
- **Max model variety:** [Fal.ai](/tools/fal-ai/) (600+ models) or [Fireworks AI](/tools/fireworks-ai/) (400+ models) for broader catalog.
- **Long-context workflows:** Groq supports long context on supported models but caps below frontier API offerings.
- **Consumer chat UI:** Groq is API-first. Use [Ollama](/tools/ollama/) + a chat UI or [ChatGPT](/tools/chatgpt/) for consumer workflows.

## Pricing

Pricing is per-token and predictable.

| Model | Input $/M tokens | Output $/M tokens | Speed (TPS) |
|---|---|---|---|
| Llama 3.1 8B Instant | $0.05 | $0.08 | 840 |
| GPT OSS 20B | $0.075 | $0.30 | 1,000 |
| Llama 4 Scout 17B | $0.11 | $0.34 | 594 |
| GPT OSS 120B | $0.15 | $0.60 | 500 |
| Qwen3 32B | $0.29 | $0.59 | 662 |
| Qwen 3.6 27B | $0.60 | $3.00 | 500 |
| Llama 3.3 70B Versatile | $0.59 | $0.79 | 394 |

Rate tiers: Free (30 req/min, 14,400/day). Developer (10x free + 25 percent off). Enterprise (custom). Batch API: 50 percent off for 24-hour to 7-day windows. Prompt caching has no extra feature fee; the current table also lists Kimi K2 0905 at $1.00/M uncached input, $0.50/M cached input, and $3.00/M output.

Verified 2026-06-23 via [groq.com/pricing](https://groq.com/pricing), [Groq supported models](https://console.groq.com/docs/models), and [Groq model deprecations](https://console.groq.com/docs/deprecations).

## Failure modes

- **Open-weight only.** Groq hosts open-weight models including OpenAI's GPT OSS 20B and 120B, but no frontier ChatGPT, no Claude, no Gemini. If your product needs a closed frontier model, Groq is complementary, not a replacement.
- **Free tier rate limits bite.** 30 req/min is enough for prototyping, not production. Plan upgrade.
- **Model catalog is narrower than FLUX marketplaces.** Curated selection of flagship open-weight models, not every model on Hugging Face.
- **Model catalog changes.** Groq's supported-model table includes production and preview routes; check model IDs, deprecations, context limits, and rate limits before pinning a production workload.
- **LPU geography is limited.** Not globally distributed in 2026 at the level of AWS or GCP. Latency is great near a Groq region, less great far from one.

## Against the alternatives

| | Groq | Fireworks AI | Together AI | OpenAI |
|---|---|---|---|---|
| **Speed (tok/sec)** | 394 to 1,000 | 50-200 | 50-200 | 50-100 |
| **Hardware** | Custom LPU | Blackwell GPUs | H100/H200 | OpenAI infra |
| **Llama 4 Scout input** | $0.11/M | ~$0.15/M | ~$0.20/M | N/A |
| **Proprietary models** | No (open-weight + GPT OSS) | No | No | Yes |
| **Best for** | Latency-critical open-weight | General open-weight inference | Fine-tuning + hosting | Frontier quality |

## Methodology

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-06-23 against [Groq pricing](https://groq.com/pricing/), [Groq docs](https://console.groq.com/docs/overview), [Groq supported models](https://console.groq.com/docs/models), and [Groq model deprecations](https://console.groq.com/docs/deprecations).

## FAQ

**Is Groq the same as Grok?**
No. Groq (this page) is a hardware-accelerated LLM inference provider founded in 2016. [Grok](/tools/grok/) is xAI's chatbot and API platform launched in 2023. Different companies, different products, easy to confuse because of the single-letter spelling.

**Is Groq really 10× faster than other providers?**
On open-weight models, the LPU hardware delivers 3-10× higher tokens/second than GPU-based providers. Real-world advantage depends on model, context length, and region.

**What's an LPU and how is it different from a GPU?**
Language Processing Unit is Groq's custom silicon designed specifically for LLM inference. Unlike GPUs (which are general-purpose matrix-math chips), LPUs are optimized for the specific compute patterns LLMs use. The result: higher throughput, lower latency, and lower cost per token on supported models.

**Was Groq acquired by Nvidia?**
AiPedia is not treating acquisition rumors as current buyer facts. Use Groq's official site, pricing page, and docs for purchase decisions unless Groq or Nvidia publish a primary-source announcement.

**Can I run Llama 4 Scout's 10M context on Groq?**
Groq supports long context on some models but not always the full 10M. Check current model specs on Groq's docs; the effective context window varies.

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/)
- **See also:** [Fireworks AI](/tools/fireworks-ai/) · [Together AI](https://www.together.ai) · [Fal.ai](/tools/fal-ai/) · [Llama](/tools/llama/)
