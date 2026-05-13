---
type: tool
slug: groq
title: Groq
tagline: Fastest LLM inference in 2026. Custom LPU hardware pushes 300-1,000 tokens/second. Free tier 30 req/min. Llama 4 Scout at $0.11/$0.34 per M tokens. Acquired by Nvidia ($20B rumored).
category: ai-chatbots
company: groq
url: https://groq.com
pricing_model: freemium
price_range: "Free 30 req/min / paid usage-based"
status: active
launched: 2020-01
last_updated: 2026-05-13
last_verified: 2026-05-13
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
    value: Best for developers who need very low-latency hosted inference for supported open models through an API; GPT OSS
      20B and 120B added to the supported catalog alongside Llama 4 Scout, Llama 3.3 70B, and Qwen3 32B.
    source: https://groq.com/
    source_label: Groq official site
    source_id: groq-official
    verified_at: '2026-05-13'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  pricing_anchor:
    value: As of May 2026, Llama 4 Scout runs $0.11/$0.34, Llama 3.1 8B Instant $0.05/$0.08, Llama 3.3 70B Versatile $0.59/$0.79,
      Qwen3 32B $0.29/$0.59, and GPT OSS 20B $0.075/$0.30 per million tokens; prompt caching gives 50 percent off cached inputs
      and Batch API gives 50 percent off async workloads.
    source: https://groq.com/pricing/
    source_label: Groq pricing
    source_id: groq-pricing
    verified_at: '2026-05-13'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
  api_available:
    value: Groq is API-first; the docs define authentication, chat/completions behavior, streaming, tool use, and production
      integration assumptions.
    source: https://console.groq.com/docs/overview
    source_label: Groq docs
    source_id: groq-docs
    verified_at: '2026-05-13'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  model_control:
    value: As of May 2026 the catalog adds GPT OSS 20B (1,000 TPS) and GPT OSS 120B (500 TPS) and replaces Llama 3 70B with
      Llama 3.3 70B Versatile; Mixtral is no longer listed on the pricing page.
    source: https://console.groq.com/docs/models
    source_label: Groq supported models
    source_id: groq-models
    verified_at: '2026-05-13'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
  watch_out_for:
    value: Benchmark Groq on your own prompts for latency, context length, model quality, rate limits, and fallback strategy
      rather than buying only on speed positioning.
    source: https://console.groq.com/docs/models
    source_label: Groq supported models
    source_id: groq-models
    verified_at: '2026-05-13'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
tags: [inference, lpu, fast, llama, qwen, deepseek, gpt-oss, hardware, nvidia-acquisition]
seo_title: "Groq (LPU Inference): Features, Pricing & Review (May 2026)"
meta_description: "Groq is the fastest LLM inference provider in 2026 (not Grok, xAI's chatbot). Custom LPU silicon pushes up to 1,000 tokens/sec on open-weight models including Llama 4 Scout, Llama 3.3 70B, Qwen3 32B, and OpenAI's GPT OSS 20B/120B. Llama 4 Scout $0.11/$0.34 per M tokens. Acquired by Nvidia for $20B."
author: "aipedia.wiki Editorial"
best_for:
  - latency-sensitive LLM workloads
  - real-time voice or streaming applications
  - production apps needing consistent low-latency
  - open-weight model inference at scale
not_best_for:
  - users who need frontier-proprietary models (OpenAI frontier models, Claude Opus 4.7)
  - long-context or reasoning workloads (open-weight on Groq is capped)
  - users without API integration (consumer-facing UI is minimal)
quick_answer: >-
  Groq is the fastest LLM inference provider in 2026. Custom LPU (Language Processing Unit) hardware pushes up to 1,000 tokens/second on GPT OSS 20B, 3-10x faster than GPU-based competitors. Free tier allows 30 requests/minute and 6,000 tokens/minute. Llama 4 Scout runs $0.11/$0.34 per million tokens; GPT OSS 20B at $0.075/$0.30. Nvidia acquired Groq in early 2026 at roughly $20B. Pick it for latency-critical open-weight model workloads, including OpenAI's GPT OSS releases.
price_history:
  - date: 2026-05-13
    plan: "Llama 4 Scout"
    price: "$0.11 input / $0.34 output per M tokens"
    source: "https://groq.com/pricing"
    source_label: "Groq pricing"
    source_id: groq-pricing
    note: "Verified unchanged; 594 TPS measured"
  - date: 2026-05-13
    plan: "GPT OSS 20B"
    price: "$0.075 input / $0.30 output per M tokens"
    source: "https://groq.com/pricing"
    source_label: "Groq pricing"
    source_id: groq-pricing
    note: "Added to catalog; 1,000 TPS, top throughput on Groq"
  - date: 2026-05-13
    plan: "Llama 3.3 70B Versatile"
    price: "$0.59 input / $0.79 output per M tokens"
    source: "https://groq.com/pricing"
    source_label: "Groq pricing"
    source_id: groq-pricing
    note: "Replaced prior Llama 3 70B listing on the pricing page; 394 TPS"
  - date: 2026-05-13
    plan: "Qwen3 32B"
    price: "$0.29 input / $0.59 output per M tokens"
    source: "https://groq.com/pricing"
    source_label: "Groq pricing"
    source_id: groq-pricing
    note: "Specific pricing now published (previously listed as mid-range)"
---

# Groq

> **Not to be confused with [Grok](/tools/grok/)** (xAI's chatbot, different company, different product). This page is Groq, the LPU inference provider.

The fastest LLM inference provider on the market in 2026. Custom silicon called the Language Processing Unit (LPU) delivers token-per-second rates that GPU-based providers (even H100 and B200) cannot match. Nvidia acquired Groq in early 2026 at a rumored $20B valuation, a 2.9× markup on the last private round.

## System Verdict

> **Pick Groq if your workload is latency-sensitive.** Real-time voice agents, streaming chat interfaces, interactive AI applications all feel qualitatively different at 500+ tokens/second. You notice the speed the first time you try it.
>
> **Skip Groq if you need frontier proprietary models.** Groq serves open-weight models (Llama 4 Scout, Llama 3.3 70B, Qwen3 32B, DeepSeek V3.2, Gemma 4) plus OpenAI's GPT OSS 20B and 120B open-weight releases. For [ChatGPT](/tools/chatgpt/) frontier GPT-5.5, [Claude Opus 4.7](/tools/claude/), or [Gemini 3.1 Pro](/tools/gemini/), you go to the source.
>
> **The 2026 context:** Open-weight flagships have closed the gap on many tasks. April 23's GPT-5.5 release reset the frontier-API bar, but for inference cost OpenAI's own GPT OSS 20B at $0.075/$0.30 per million tokens at 1,000 TPS on Groq is a genuine alternative for high-volume workloads. The Nvidia acquisition signals this economics is only getting more competitive.

## Key Facts

| | |
|---|---|
| **Free tier** | 30 requests/min, 6,000 tokens/min, 14,400 requests/day |
| **Developer tier** | 10x free rate limits, 25 percent discount on tokens |
| **Llama 4 Scout 17B** | $0.11 input / $0.34 output per M tokens (594 TPS) |
| **Llama 3.3 70B Versatile** | $0.59 input / $0.79 output per M tokens (394 TPS) |
| **Llama 3.1 8B Instant** | $0.05 input / $0.08 output per M tokens (840 TPS) |
| **Qwen3 32B** | $0.29 input / $0.59 output per M tokens (662 TPS) |
| **GPT OSS 20B** | $0.075 input / $0.30 output per M tokens (1,000 TPS) |
| **GPT OSS 120B** | $0.15 input / $0.60 output per M tokens (500 TPS) |
| **Speed** | Up to 1,000 tokens/second on GPT OSS 20B; 394 to 840 TPS on Llama-family models |
| **Hardware** | Custom LPU (Language Processing Unit) silicon |
| **Acquired by** | Nvidia (~$20B, early 2026) |
| **Batch API** | 50 percent discount for non-real-time workloads (24h to 7d windows) |
| **Prompt caching** | 50 percent off cached input tokens, no extra caching fee |

## When to pick Groq

- **Real-time voice applications.** Users feel sub-200ms response times. Groq's streaming LLM inference makes this achievable with open-weight models.
- **Streaming chat interfaces.** Token streaming that displays in real time. On Groq, the full response often lands before the user finishes reading the first line.
- **Production apps scaling open-weight.** Cheap per-token pricing + fastest inference = best unit economics for Llama or Qwen production deployments.
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
| Llama 3.3 70B Versatile | $0.59 | $0.79 | 394 |

Rate tiers: Free (30 req/min, 14,400/day). Developer (10x free + 25 percent off). Enterprise (custom). Batch API: 50 percent off for 24-hour to 7-day windows. Prompt caching: 50 percent off cached input tokens with no extra caching fee.

Verified 2026-05-13 via [groq.com/pricing](https://groq.com/pricing).

## Failure modes

- **Open-weight only.** Groq hosts open-weight models including OpenAI's GPT OSS 20B and 120B, but no frontier ChatGPT, no Claude, no Gemini. If your product needs a closed frontier model, Groq is complementary, not a replacement.
- **Free tier rate limits bite.** 30 req/min is enough for prototyping, not production. Plan upgrade.
- **Model catalog is narrower than FLUX marketplaces.** Curated selection of flagship open-weight models, not every model on Hugging Face.
- **Nvidia acquisition = integration risk.** Post-acquisition, Nvidia may shift pricing, access, or model support. Watch for changes over 2026-2027.
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

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-05-13 against [groq.com/pricing](https://groq.com/pricing) and [IntuitionLabs' Nvidia-Groq acquisition analysis](https://intuitionlabs.ai/articles/nvidia-groq-ai-inference-deal).

## FAQ

**Is Groq the same as Grok?**
No. Groq (this page) is a hardware-accelerated LLM inference provider founded in 2016, now Nvidia-acquired. [Grok](/tools/grok/) is xAI's chatbot product launched 2023, owned by SpaceX post-merger. Different companies, different products, easy to confuse because of the single-letter spelling. Groq publicly complained about the naming collision in 2023 when Grok launched.

**Is Groq really 10× faster than other providers?**
On open-weight models, the LPU hardware delivers 3-10× higher tokens/second than GPU-based providers. Real-world advantage depends on model, context length, and region.

**What's an LPU and how is it different from a GPU?**
Language Processing Unit is Groq's custom silicon designed specifically for LLM inference. Unlike GPUs (which are general-purpose matrix-math chips), LPUs are optimized for the specific compute patterns LLMs use. The result: higher throughput, lower latency, and lower cost per token on supported models.

**Does the Nvidia acquisition affect customers?**
As of May 2026, pricing and access are unchanged. Nvidia has historically kept acquired infra brands running separately (see NVLink or Mellanox). Keep watching for 2027-2028 changes.

**Can I run Llama 4 Scout's 10M context on Groq?**
Groq supports long context on some models but not always the full 10M. Check current model specs on Groq's docs; the effective context window varies.

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/)
- **See also:** [Fireworks AI](/tools/fireworks-ai/) · [Together AI](https://www.together.ai) · [Fal.ai](/tools/fal-ai/) · [Llama](/tools/llama/)
