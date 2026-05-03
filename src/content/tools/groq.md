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
  moat: 9
  longevity: 8
tags: [inference, lpu, fast, llama, qwen, deepseek, hardware, nvidia-acquisition]
seo_title: "Groq (LPU Inference): Features, Pricing & Review (April 2026)"
meta_description: "Groq is the fastest LLM inference provider in 2026 (not Grok, xAI's chatbot). Custom LPU silicon pushes 300-1,000 tokens/sec on open-weight models. Free 30 req/min. Llama 4 Scout $0.11/$0.34 per M tokens. Acquired by Nvidia for $20B."
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
  Groq is the fastest LLM inference provider in 2026. Custom LPU (Language Processing Unit) hardware pushes 300-1,000 tokens/second, 3-10× faster than GPU-based competitors. Free tier allows 30 requests/minute and 6,000 tokens/minute. Llama 4 Scout runs $0.11/$0.34 per million tokens. Nvidia acquired Groq in early 2026 at roughly $20B. Pick it for latency-critical open-weight model workloads.
---

# Groq

> **Not to be confused with [Grok](/tools/grok/)** (xAI's chatbot, different company, different product). This page is Groq, the LPU inference provider.

The fastest LLM inference provider on the market in 2026. Custom silicon called the Language Processing Unit (LPU) delivers token-per-second rates that GPU-based providers (even H100 and B200) cannot match. Nvidia acquired Groq in early 2026 at a rumored $20B valuation, a 2.9× markup on the last private round.

## System Verdict

> **Pick Groq if your workload is latency-sensitive.** Real-time voice agents, streaming chat interfaces, interactive AI applications all feel qualitatively different at 500+ tokens/second. You notice the speed the first time you try it.
>
> **Skip Groq if you need frontier proprietary models.** Groq serves open-weight models (Llama 4, Qwen 3, DeepSeek V3.2, Gemma 4, Mixtral). For [ChatGPT](/tools/chatgpt/), [Claude Opus 4.7](/tools/claude/), or [Gemini 3.1 Pro](/tools/gemini/), you go to the source.
>
> **The 2026 context:** Open-weight flagships (Llama 4, GLM-5.1, Qwen 3) have closed the gap on many tasks. Running them on Groq at 500+ tok/s at $0.11-$0.34 per million tokens is a genuine alternative to paying OpenAI frontier-model API rates. The Nvidia acquisition signals this economics is only getting more competitive.

## Key Facts

| | |
|---|---|
| **Free tier** | 30 requests/min, 6,000 tokens/min, 14,400 requests/day |
| **Developer tier** | 10× free rate limits, 25% discount on tokens |
| **Llama 4 Scout** | $0.11 input / $0.34 output per M tokens |
| **Llama 3 70B** | $0.59 input / $0.79 output per M tokens |
| **Llama 3.1 8B Instant** | $0.05 input / $0.08 output per M tokens |
| **Speed** | 300-1,000 tokens/second depending on model |
| **Hardware** | Custom LPU (Language Processing Unit) silicon |
| **Acquired by** | Nvidia (~$20B, early 2026) |
| **Batch API** | 50% discount for non-real-time workloads |
| **Prompt caching** | 50% token cost on cached inputs |

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

| Model | Input $/M tokens | Output $/M tokens |
|---|---|---|
| Llama 3.1 8B Instant | $0.05 | $0.08 |
| Llama 4 Scout | $0.11 | $0.34 |
| Llama 3 70B | $0.59 | $0.79 |
| Mixtral 8x7B | ~$0.24 | ~$0.24 |
| Qwen 3 32B | Mid-range | Mid-range |

Rate tiers: Free (30 req/min, 14,400/day). Developer (10× free + 25% off). Enterprise (custom). Batch API: 50% off. Prompt caching: 50% off on cached tokens.

Verified 2026-04-18 via [groq.com/pricing](https://groq.com/pricing).

## Failure modes

- **Open-weight only.** No OpenAI frontier models, no Claude, no Gemini on Groq. If your product needs a frontier model, Groq is complementary, not a replacement.
- **Free tier rate limits bite.** 30 req/min is enough for prototyping, not production. Plan upgrade.
- **Model catalog is narrower than FLUX marketplaces.** Curated selection of flagship open-weight models, not every model on Hugging Face.
- **Nvidia acquisition = integration risk.** Post-acquisition, Nvidia may shift pricing, access, or model support. Watch for changes over 2026-2027.
- **LPU geography is limited.** Not globally distributed in 2026 at the level of AWS or GCP. Latency is great near a Groq region, less great far from one.

## Against the alternatives

| | Groq | Fireworks AI | Together AI | OpenAI |
|---|---|---|---|---|
| **Speed (tok/sec)** | 300-1,000 | 50-200 | 50-200 | 50-100 |
| **Hardware** | Custom LPU | Blackwell GPUs | H100/H200 | OpenAI infra |
| **Llama 4 Scout input** | $0.11/M | ~$0.15/M | ~$0.20/M | N/A |
| **Proprietary models** | No | No | No | Yes |
| **Best for** | Latency-critical open-weight | General open-weight inference | Fine-tuning + hosting | Frontier quality |

## Methodology

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-04-18 against [groq.com/pricing](https://groq.com/pricing) and [IntuitionLabs' Nvidia-Groq acquisition analysis](https://intuitionlabs.ai/articles/nvidia-groq-ai-inference-deal).

## FAQ

**Is Groq the same as Grok?**
No. Groq (this page) is a hardware-accelerated LLM inference provider founded in 2016, now Nvidia-acquired. [Grok](/tools/grok/) is xAI's chatbot product launched 2023, owned by SpaceX post-merger. Different companies, different products, easy to confuse because of the single-letter spelling. Groq publicly complained about the naming collision in 2023 when Grok launched.

**Is Groq really 10× faster than other providers?**
On open-weight models, the LPU hardware delivers 3-10× higher tokens/second than GPU-based providers. Real-world advantage depends on model, context length, and region.

**What's an LPU and how is it different from a GPU?**
Language Processing Unit is Groq's custom silicon designed specifically for LLM inference. Unlike GPUs (which are general-purpose matrix-math chips), LPUs are optimized for the specific compute patterns LLMs use. The result: higher throughput, lower latency, and lower cost per token on supported models.

**Does the Nvidia acquisition affect customers?**
As of April 2026, pricing and access are unchanged. Nvidia has historically kept acquired infra brands running separately (see NVLink or Mellanox). Keep watching for 2027-2028 changes.

**Can I run Llama 4 Scout's 10M context on Groq?**
Groq supports long context on some models but not always the full 10M. Check current model specs on Groq's docs; the effective context window varies.

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/)
- **See also:** [Fireworks AI](/tools/fireworks-ai/) · [Together AI](https://www.together.ai) · [Fal.ai](/tools/fal-ai/) · [Llama](/tools/llama/)
