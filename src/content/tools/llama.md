---
type: tool
slug: llama
title: Llama
tagline: Meta's open-weight LLM family. Llama 4 Maverick is the flagship; Scout handles the 10M-token long-context job; Behemoth remains an internal teacher model.
category: ai-chatbots
secondary_categories: [ai-coding]
company: meta
url: https://llama.com
github_url: https://github.com/meta-llama/llama-models
pricing_model: open-source
price_range: "$0-$0.85/1M tokens"
status: active
launched: 2023-02
last_updated: 2026-04-22
last_verified: 2026-04-22
update_frequency: monthly
seo_title: "Llama: Features, Pricing & Review (April 2026)"
meta_description: "Meta's Llama 4 Maverick (400B total, 17B active, 1M context) is the flagship open-weight LLM. Scout offers 10M tokens. Free weights under the Llama 4 Community License. Hosted pricing from $0.15 per 1M input tokens on Groq."
author: "aipedia.wiki Editorial"
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 10
  moat: 7
  longevity: 9
tags: [open-weight, llm, llama, meta, open-source, self-hosted, mixture-of-experts, multimodal, long-context]
best_for:
  - self-hosted or VPC deployment
  - cost-sensitive API workloads
  - long-context retrieval (Scout 10M tokens)
  - fine-tuning and LoRA adapters
  - multilingual applications
not_best_for:
  - best-in-class reasoning vs Claude Opus 4.7
  - consumer chat with image generation
  - EU-based entities restricted by license
  - organizations over 700M MAU
quick_answer: >-
  Llama 4 Maverick is the strongest open-weight LLM available for commercial use. Pick it for self-hosted, VPC, or budget API workloads where hosted pricing from $0.15 per million input tokens beats every closed frontier model. Skip it for peak reasoning (Claude Opus 4.7) or bundled image and video generation.
price_history:
  - date: 2025-04-05
    plan: "Llama 4 Maverick / Scout"
    price: "$0"
    note: "Open weights released under Llama 4 Community License"
  - date: 2026-04-15
    plan: "Hosted (Groq)"
    price: "$0.20 / $0.60 per 1M tok"
    note: "Cheapest first-party hosted Maverick inference"
---

# Llama

Meta's open-weight LLM family. **Llama 4 Maverick** (400B total, 17B active parameters, mixture-of-experts, 1M context) is the current flagship. **Scout** (109B total, 17B active, 10M context) fits on a single H100 and owns the long-context tier. **Behemoth** (2T total, 288B active) remains an internal teacher model; Meta has not publicly released it.

> **April 2, 2026 competitive note:** [Google released Gemma 4 under Apache 2.0](/news/2026-04-02-google-gemma-4-apache-license/). Apache licensing is strictly more permissive than Meta's Llama 4 Community License (which caps at 700M monthly active users). For self-hosters with concerns about the Llama license, Gemma 4 is the closest drop-in alternative at comparable small-to-mid scale.

Weights ship free under the Llama 4 Community License. Hosted inference starts at $0.15 per million input tokens across Groq, Together, Fireworks, DeepInfra, and major clouds.

## System Verdict

> **Pick Llama if you need an open-weight frontier LLM you can self-host, fine-tune, or run inside a VPC.** Maverick beats GPT-4o and Gemini 2.0 Flash on vendor-reported benchmarks, and Scout's 10M-token context outruns every closed model for long-document retrieval. Cheapest hosted pricing in the frontier tier.
>
> **Skip it if you need best-in-class reasoning or bundled multimodal output.** [Claude Opus 4.7](/tools/claude/) leads on agentic coding and long-form reasoning. [GPT-5.4](/tools/chatgpt/) ships with image generation and the largest plugin marketplace. [Gemini 3.1 Pro](/tools/gemini/) bundles Veo 3 video. Llama provides none of these natively.
>
> **Who pays which tier:** Free self-hosted for developers with GPUs, Groq at $0.20 / $0.60 per 1M tokens for speed-sensitive APIs, Together or Fireworks for production fine-tuning, AWS Bedrock or Azure for compliance-heavy enterprise deployments. EU-based entities should read the license carefully before committing.

## Key Facts

| | |
|---|---|
| **Flagship model** | Llama 4 Maverick (400B total, 17B active, 128 experts, 1M context) |
| **Long-context model** | Llama 4 Scout (109B total, 17B active, 16 experts, 10M context) |
| **Internal teacher** | Llama 4 Behemoth (~2T total, 288B active) · not publicly released |
| **Released** | April 5, 2025 (Scout + Maverick) |
| **License** | Llama 4 Community License · free commercial use under 700M MAU |
| **Multimodal** | Native text + image input (vision) on Scout and Maverick |
| **Hosted providers** | Groq · Together · Fireworks · DeepInfra · Replicate · Hugging Face · AWS Bedrock · Azure · Google Vertex · Databricks · SambaNova · Snowflake |
| **Cheapest hosted** | DeepInfra FP8 at $0.15 / 1M input · Groq at $0.20 / $0.60 |
| **Consumer UI** | Meta AI at meta.ai (free, ad-adjacent) |
| **Fine-tuning** | Full weights, LoRA, and QLoRA supported across providers |

Every data point above was verified against vendor sources on 2026-04-17. See Sources.

## What it actually is

One open-weight model family published by Meta and distributed free under a custom community license. Developers download weights from [llama.com](https://llama.com) or [Hugging Face](https://huggingface.co/meta-llama) and run inference anywhere: on-prem GPUs, cloud VMs, VPC-isolated endpoints, or managed APIs.

The 2025 Llama 4 generation switched the family to mixture-of-experts. Maverick activates 17B parameters per token out of a 400B total pool, giving frontier-class quality at a fraction of dense-model compute cost. Scout activates the same 17B but spreads across 109B total and a 10M token context, the longest shipping context window in any released model.

The moats: weights are actually free, the Community License permits commercial use for almost every company, and the hosted ecosystem (Groq's LPU hardware, Together's fine-tune infra, AWS Bedrock's enterprise SLAs) prices Maverick below every closed frontier model. Behemoth's role as a 2T-parameter teacher improves the smaller models through codistillation without ever shipping to the public.

The weaknesses: no native image generation, no video, no consumer app with the reach of ChatGPT or Gemini. The license carves out EU-based entities and companies over 700M monthly active users. Reasoning and agentic coding still trail Claude Opus 4.7 and GPT-5.4 Pro on third-party leaderboards.

## When to pick Llama

- **You need full data sovereignty or VPC deployment.** Run weights inside your own network. No vendor sees your tokens. Closed frontier models cannot match this.
- **You fine-tune on proprietary data.** Full weights plus LoRA and QLoRA adapters across Together, Fireworks, and AWS Bedrock. Closed models offer narrower fine-tune access at higher prices.
- **Your workload is API cost-sensitive.** Groq at $0.20 / $0.60 per million tokens runs 3-5x cheaper than GPT-5.4 Pro or Claude Opus 4.7. Quality trade-off is small on most tasks.
- **You need 10M+ token context.** Scout is the only shipping model with a 10M window. Gemini 3.1 Pro and Claude Opus 4.7 stop at 1M.
- **You build multilingual or global products.** Llama 4 trains on 200+ languages and ships with stronger non-English performance than most closed models at equivalent size.

## When to pick something else

- **Best-in-class reasoning or long-form writing:** [Claude Opus 4.7](/tools/claude/). Leads on agentic coding, scaled tool use, and document coherence.
- **Image generation bundled with chat:** [ChatGPT](/tools/chatgpt/) with GPT Image 2 or [Gemini](/tools/gemini/) with Imagen 4. Llama has no image output.
- **Video generation:** [Gemini](/tools/gemini/) with Veo 3. Llama has none.
- **Fully permissive Apache-style license:** [Mistral AI](/tools/mistral-ai/) (Mistral-Small and Pixtral) or [DeepSeek](/tools/deepseek/) V3.2. Llama's Community License restricts EU entities and 700M+ MAU orgs.
- **Chinese-market or local-deployment open weights:** [Qwen](/tools/qwen/) or [GLM](/tools/glm/). Better Mandarin performance and fewer geopolitical frictions.

## Pricing

Llama weights are free. Costs come from hosted inference or your own compute. Representative hosted pricing via [Together AI](https://www.together.ai/pricing), [Groq](https://groq.com/pricing), and public rate cards, verified 2026-04-17.

| Access path | Input ($/1M tok) | Output ($/1M tok) | Context | Who's it for |
|---|---|---|---|---|
| Self-hosted (own GPUs) | $0 | $0 | Full | Teams with H100/MI300 clusters |
| Meta AI (meta.ai) | Free | Free | Capped | Consumer chat, casual use |
| Groq (Maverick) | $0.20 | $0.60 | 1M | **Speed-first API workloads** |
| DeepInfra FP8 (Maverick) | $0.15 | $0.50 | 1M | Cheapest hosted input |
| Together AI (Maverick) | $0.27 | $0.85 | 1M | Fine-tune + inference combo |
| Fireworks (Maverick) | $0.40 | $1.20 | 1M | Production SLAs, fine-tune |
| Together AI (Scout) | $0.08 | $0.30 | 10M | Long-context retrieval |
| AWS Bedrock / Azure | Custom | Custom | 1M | Enterprise compliance, BAAs |

Prices verified 2026-04-17 via [Together AI pricing](https://www.together.ai/pricing), [Artificial Analysis Maverick providers](https://artificialanalysis.ai/models/llama-4-maverick/providers), and [Llama 4 API Pricing guide](https://llmwise.ai/llama-api-pricing/).

## Against the alternatives

| | Llama 4 Maverick | DeepSeek V3.2 | Mistral Large 2 |
|---|---|---|---|
| **License** | Llama Community (700M MAU cap) | MIT (fully permissive) | Mistral Research (non-commercial) |
| **Context window** | 1M tokens | 128K | 128K |
| **Cheapest hosted in / out** | $0.15 / $0.50 | $0.14 / $0.28 | $2.00 / $6.00 |
| **Multimodal input** | Text + image | Text only | Text + image (Pixtral sibling) |
| **Self-host weights** | Yes | Yes | Yes (research only) |
| **Vendor-reported coding** | Strong (beats GPT-4o) | Strongest open-weight | Mid |
| **Best viewed as** | Open-weight default | Cheapest frontier API | Enterprise EU alternative |

## Failure modes

- **License is not Apache.** The Llama 4 Community License excludes EU-based entities from the license grant and requires a separate license for companies over 700M monthly active users. Read the terms before shipping to those markets.
- **No native image or video output.** Llama is text-plus-vision-input only. Workflows needing image or video generation need a second tool.
- **Behemoth is not public.** Meta's 2T-parameter model remains an internal teacher. Benchmarks citing Behemoth performance do not reflect anything you can actually use.
- **Quality lag vs closed frontier.** Maverick beats GPT-4o and Gemini 2.0 Flash on vendor benchmarks but loses to Claude Opus 4.7, GPT-5.4 Pro, and Gemini 3.1 Pro on third-party leaderboards.
- **Hosted provider variance.** Same model, different providers, different quality: FP8 quantized endpoints (DeepInfra, Azure) run cheaper but sacrifice some output quality vs full-precision. Benchmark your specific workload before committing.
- **No first-party consumer UI competitive with ChatGPT.** Meta AI at meta.ai is ad-adjacent, feature-thin, and not positioned as a daily-driver assistant.
- **Self-hosting is expensive.** A single H100 runs Scout; Maverick needs multi-GPU setups. If you lack cluster access, hosted APIs are cheaper than building infrastructure.
- **Fine-tune licensing inherits upstream.** Derivatives of Llama must carry the Community License terms. You cannot relicense a fine-tuned Llama under Apache or MIT.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against the [Llama 4 announcement](https://ai.meta.com/blog/llama-4-multimodal-intelligence/), [Llama 4 Community License](https://www.llama.com/llama4/license/), [Together AI pricing](https://www.together.ai/pricing), and [Artificial Analysis provider benchmarks](https://artificialanalysis.ai/models/llama-4-maverick/providers).

## FAQ

**Is Llama free?**
Yes. Weights are free under the Llama 4 Community License. Self-hosting costs only your compute. Hosted APIs (Groq, Together, Fireworks, DeepInfra) bill per token starting at $0.15 per 1M input. Meta AI at meta.ai is free for consumer chat.

**Can I use Llama commercially?**
Yes for almost all companies. The Community License grants commercial use to any organization under 700M monthly active users. Companies above that threshold (Google, Microsoft, Apple scale) need a separate Meta license. EU-based entities are explicitly carved out of some license provisions. Read the [Llama 4 Community License](https://www.llama.com/llama4/license/).

**What is the current Llama flagship?**
Llama 4 Maverick: 400B total parameters, 17B active, 128 experts, 1M token context. It is the strongest production-ready Llama model as of April 2026. Scout (109B / 10M context) wins for long-document jobs. Behemoth (2T) is still an internal teacher model and has not shipped.

**How does Llama compare to Claude Opus 4.7?**
Claude Opus 4.7 leads on agentic coding, long-form reasoning, and tool use on published benchmarks. Llama 4 Maverick wins on price ($0.15-$0.85 vs $5-$25 per 1M tokens), data sovereignty (self-host capable), and context window options (10M on Scout vs 1M on Opus). Use Claude for peak reasoning, Llama for scale and cost.

**Which hosted provider should I pick?**
Groq for lowest latency (0.20s time-to-first-token) and cheap output. DeepInfra FP8 for absolute-cheapest input pricing. Together for fine-tune workflows. Fireworks for production SLAs. AWS Bedrock or Azure for enterprise compliance with BAAs and SOC 2.

## Sources

- [Llama 4 announcement (ai.meta.com)](https://ai.meta.com/blog/llama-4-multimodal-intelligence/): Official Scout, Maverick, and Behemoth specifications
- [Llama 4 Community License](https://www.llama.com/llama4/license/): License terms, 700M MAU threshold, EU carve-out
- [Llama 4 Maverick on Hugging Face](https://huggingface.co/meta-llama/Llama-4-Maverick-17B-128E): Canonical weight distribution
- [Together AI pricing](https://www.together.ai/pricing): Hosted Maverick and Scout rates
- [Artificial Analysis Maverick providers](https://artificialanalysis.ai/models/llama-4-maverick/providers): Cross-provider performance and price benchmarks
- [Llama 4 API Pricing guide](https://llmwise.ai/llama-api-pricing/): Aggregated API provider pricing table

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/) · [AI Coding](/categories/ai-coding/)
- **Alternatives:** [Claude](/tools/claude/) · [ChatGPT](/tools/chatgpt/) · [Gemini](/tools/gemini/) · [DeepSeek](/tools/deepseek/) · [Mistral AI](/tools/mistral-ai/) · [Qwen](/tools/qwen/) · [GLM](/tools/glm/)
