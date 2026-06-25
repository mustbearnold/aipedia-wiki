---
type: tool
slug: llama
title: Llama
tagline: Meta's open-weight LLM family. Llama 4 Maverick remains the flagship open-weight choice; Scout is the long-context and Groq-hosted fast lane; Behemoth remains an internal teacher model.
category: ai-chatbots
secondary_categories: [ai-coding]
company: meta
url: https://llama.com
github_url: https://github.com/meta-llama/llama-models
pricing_model: open-source
price_range: "$0 weights; hosted Scout from $0.11/M input on Groq, Maverick $0.27/$0.85 on Together"
status: active
launched: 2023-02
last_updated: 2026-06-25
last_verified: 2026-06-25
update_frequency: monthly
seo_title: "Llama: Features, Pricing & Review (June 2026)"
meta_description: "Meta's Llama 4 Maverick remains the flagship open-weight LLM, while Scout is the long-context and current Groq fast lane. Free weights under the Llama 4 Community License; hosted pricing varies by provider."
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
facts:
  best_for:
    value: "Best for teams that want Meta open-weight language models for self-hosting, fine-tuning, privacy-sensitive deployments, and model-provider diversification."
    source: https://ai.meta.com/llama/
    source_label: Meta Llama official site
    source_id: llama-meta-official
    verified_at: '2026-06-25'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-08'
  pricing_anchor:
    value: "Llama model weights are downloadable under Meta's license, but real cost comes from inference hosting, GPUs, fine-tuning, vendor APIs, and compliance work."
    source: https://www.llama.com/llama-downloads/
    source_label: Llama downloads
    source_id: llama-downloads
    verified_at: '2026-06-25'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-08'
  model_control:
    value: "Model cards and prompt-format docs are the source of truth for variants, context behavior, tool-use formats, and deployment assumptions."
    source: https://www.llama.com/docs/model-cards-and-prompt-formats/
    source_label: Llama model documentation
    source_id: llama-docs
    verified_at: '2026-06-25'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-08'
  open_source:
    value: "Meta's GitHub utilities are useful for model-adjacent tooling, examples, and release artifacts, but license terms still need separate review."
    source: https://github.com/meta-llama/llama-models
    source_label: Meta Llama GitHub repository
    source_id: llama-repository
    verified_at: '2026-06-25'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-08'
  watch_out_for:
    value: "Open weights do not eliminate operational burden; benchmark quality, safety filters, data rights, hosting cost, and license restrictions before standardizing."
    source: https://www.llama.com/docs/model-cards-and-prompt-formats/
    source_label: Llama model documentation
    source_id: llama-docs
    verified_at: '2026-06-25'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-08'
tags: [open-weight, llm, llama, meta, open-source, self-hosted, mixture-of-experts, multimodal, long-context]
best_for:
  - self-hosted or VPC deployment
  - cost-sensitive API workloads
  - long-context retrieval (Scout 10M tokens)
  - fine-tuning and LoRA adapters
  - multilingual applications
not_best_for:
  - peak reasoning versus current closed frontier models
  - consumer chat with image generation
  - EU-based entities restricted by license
  - organizations over 700M MAU
quick_answer: >-
  Llama 4 Maverick remains the strongest open-weight LLM to evaluate for commercial self-hosting, VPC, and model-diversification work. Scout is the long-context lane and the current Groq fast-inference option at $0.11/M input and $0.34/M output, while Together still lists Maverick at $0.27/M input and $0.85/M output. Groq's broader announcement also lists Maverick pricing, but provider model cards and pricing pages should be treated as the source of truth before buying. Skip Llama for peak closed-model reasoning or bundled image/video generation.
price_history:
  - date: 2025-04-05
    plan: "Llama 4 Maverick / Scout"
    price: "$0"
    source: "https://www.together.ai/pricing"
    source_label: "Source"
    source_id: llama-pricing
    verified_at: 2025-04-05
    note: "Open weights released under Llama 4 Community License"
  - date: 2026-04-15
    plan: "Hosted (Groq)"
    price: "$0.20 / $0.60 per 1M tok"
    source: "https://www.together.ai/pricing"
    source_label: "Source"
    source_id: llama-pricing
    verified_at: 2026-04-15
    note: "Cheapest first-party hosted Maverick inference"
  - date: 2026-06-08
    plan: "Hosted Scout (Groq) / Maverick (Together)"
    price: "Scout $0.11 / $0.34 per 1M tokens on Groq; Maverick $0.27 / $0.85 on Together"
    source: "https://console.groq.com/docs/model/llama-4-scout-17b-16e-instruct"
    source_label: "Source"
    source_id: llama-groq-scout
    verified_at: 2026-06-08
    note: "June refresh: Groq's live public model card is Scout, while Together continues to list Maverick. Treat provider-specific Maverick availability and pricing as volatile."
  - date: 2026-06-23
    plan: "Hosted Scout and Maverick"
    price: "Scout $0.11 / $0.34 per 1M tokens on Groq; Maverick $0.27 / $0.85 on Together, with Groq Maverick availability to verify live"
    source: "https://console.groq.com/docs/model/llama-4-scout-17b-16e-instruct"
    source_label: "Source"
    source_id: llama-groq-scout
    verified_at: 2026-06-23
    note: "Rechecked Meta's Llama 4 announcement, Groq Scout and Maverick model docs, and Together pricing. Keep hosted provider pricing and context limits marked volatile because vendors expose different endpoints and limits."
  - date: 2026-06-25
    plan: "Hosted Scout and Maverick"
    price: "Scout $0.11 / $0.34 per 1M tokens on Groq; Maverick $0.27 / $0.85 on Together, with provider-specific Maverick pricing to verify live"
    source: "https://console.groq.com/docs/model/llama-4-scout-17b-16e-instruct"
    source_label: "Source"
    source_id: llama-groq-scout
    verified_at: 2026-06-25
    note: "Rechecked Meta's Llama 4 announcement, Groq Scout announcement/model-card posture, and Together pricing. Keep hosted provider pricing and context limits marked volatile because vendors expose different endpoints, limits, and promotional pricing."
---

# Llama

Meta's open-weight LLM family. **Llama 4 Maverick** (400B total, 17B active parameters, mixture-of-experts, 1M context) is the current flagship. **Scout** (109B total, 17B active, 10M context) fits on a single H100 and owns the long-context tier. **Behemoth** (2T total, 288B active) remains an internal teacher model; Meta has not publicly released it.

> **May 5, 2026 competitive note:** [Google released MTP drafters to make Gemma 4 inference up to 3x faster](/news/2026-05-05-gemma-4-mtp-drafters-inference/). For Llama buyers, the watch item is not only model quality but latency: official speculative-decoding assets can make Gemma more practical on local and workstation hardware.

> **April 2, 2026 competitive note:** [Google released Gemma 4 under Apache 2.0](/news/2026-04-02-google-gemma-4-apache-license/). Apache licensing is strictly more permissive than Meta's Llama 4 Community License (which caps at 700M monthly active users). For self-hosters with concerns about the Llama license, Gemma 4 is the closest drop-in alternative at comparable small-to-mid scale.

Weights ship free under the Llama 4 Community License. Hosted inference varies by provider. Groq's live Llama 4 Scout model card lists $0.11 per million input tokens and $0.34 per million output tokens, while Together continues to list Maverick at $0.27 input and $0.85 output per million tokens. Groq also maintains Maverick docs, but provider-specific availability, context, and pricing should be checked live before a purchase order.

## System Verdict

> **Pick Llama if you need an open-weight frontier LLM you can self-host, fine-tune, or run inside a VPC.** Meta's vendor-reported benchmarks put Maverick ahead of older closed-model baselines, and Scout's 10M-token context outruns most closed assistants for long-document retrieval. Cheapest hosted pricing in the frontier tier.
>
> **Skip it if you need peak closed-model reasoning or bundled multimodal output.** [Claude](/tools/claude/) leads for careful long-form analysis and code reasoning, [ChatGPT](/tools/chatgpt/) remains the broadest finished assistant with image features, and [Gemini](/tools/gemini/) is the Google-native media/workspace lane. Llama provides model control, not a complete consumer workspace.
>
> **Who pays which tier:** Free self-hosted for developers with GPUs, Groq Scout at $0.11 / $0.34 per 1M tokens for speed-sensitive APIs, Together or Fireworks for Maverick and fine-tuning workflows, and AWS Bedrock or Azure for compliance-heavy enterprise deployments. EU-based entities should read the license carefully before committing.

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
| **Cheapest hosted path verified this pass** | Groq Scout at $0.11 / $0.34 per 1M tokens; Together Maverick at $0.27 / $0.85 |
| **Consumer UI** | Meta AI at meta.ai (free, ad-adjacent) |
| **Fine-tuning** | Full weights, LoRA, and QLoRA supported across providers |

Every data point above was verified against vendor sources on 2026-06-25. See Sources.

## What it actually is

One open-weight model family published by Meta and distributed free under a custom community license. Developers download weights from [llama.com](https://llama.com) or [Hugging Face](https://huggingface.co/meta-llama) and run inference anywhere: on-prem GPUs, cloud VMs, VPC-isolated endpoints, or managed APIs.

The 2025 Llama 4 generation switched the family to mixture-of-experts. Maverick activates 17B parameters per token out of a 400B total pool, giving frontier-class quality at a fraction of dense-model compute cost. Scout activates the same 17B but spreads across 109B total and a 10M token context, the longest shipping context window in any released model.

The moats: weights are actually free, the Community License permits commercial use for almost every company, and the hosted ecosystem (Groq's LPU hardware for Scout, Together's Maverick/fine-tune infra, AWS Bedrock's enterprise SLAs) keeps the family cheaper and more controllable than most closed frontier deployments. Behemoth's role as a 2T-parameter teacher improves the smaller models through codistillation without ever shipping to the public.

The weaknesses: no native image generation, no video, no consumer app with the reach of ChatGPT or Gemini. The license carves out EU-based entities and companies over 700M monthly active users. Reasoning and agentic coding can still trail the best closed frontier models in buyer tests.

## When to pick Llama

- **You need full data sovereignty or VPC deployment.** Run weights inside your own network. No vendor sees your tokens. Closed frontier models cannot match this.
- **You fine-tune on proprietary data.** Full weights plus LoRA and QLoRA adapters across Together, Fireworks, and AWS Bedrock. Closed models offer narrower fine-tune access at higher prices.
- **Your workload is API cost-sensitive.** Groq Scout at $0.11 / $0.34 per million tokens and Together Maverick at $0.27 / $0.85 can undercut closed frontier APIs for many high-volume tasks, but provider availability and quantization need live checks.
- **You need 10M+ token context.** Scout is the Llama-family long-context lane, but hosted providers may expose shorter public context windows than the raw model specification. Check provider limits before promising a 10M-token workflow.
- **You build multilingual or global products.** Llama 4 trains on 200+ languages and ships with stronger non-English performance than most closed models at equivalent size.

## When to pick something else

- **Careful reasoning or long-form writing:** [Claude](/tools/claude/). Leads when careful drafting, long analysis, critique, and coding judgment matter more than open-weight control.
- **Image generation bundled with chat:** [ChatGPT](/tools/chatgpt/) with GPT Image 2 or [Gemini](/tools/gemini/) with Imagen 4. Llama has no image output.
- **Video generation:** [Gemini](/tools/gemini/) with Veo 3. Llama has none.
- **Fully permissive Apache-style license:** [Mistral AI](/tools/mistral-ai/) (Mistral-Small and Pixtral) or [DeepSeek](/tools/deepseek/) V3.2. Llama's Community License restricts EU entities and 700M+ MAU orgs.
- **Chinese-market or local-deployment open weights:** [Qwen](/tools/qwen/) or [GLM](/tools/glm/). Better Mandarin performance and fewer geopolitical frictions.

## Pricing

Llama weights are free. Costs come from hosted inference or your own compute. Representative hosted pricing via [Together AI](https://www.together.ai/pricing) and Groq's live Scout model card, verified 2026-06-25.

| Access path | Input ($/1M tok) | Output ($/1M tok) | Context | Who's it for |
|---|---|---|---|---|
| Self-hosted (own GPUs) | $0 | $0 | Full | Teams with H100/MI300 clusters |
| Meta AI (meta.ai) | Free | Free | Capped | Consumer chat, casual use |
| Groq (Scout) | $0.11 | $0.34 | 128K on Groq's public model card | **Speed-first multimodal API workloads** |
| DeepInfra FP8 (Maverick) | $0.15 | $0.50 | 1M | Cheapest hosted input |
| Together AI (Maverick) | $0.27 | $0.85 | 1M | Fine-tune + inference combo |
| Fireworks (Maverick) | $0.40 | $1.20 | 1M | Production SLAs, fine-tune |
| Together AI (Scout) | $0.08 | $0.30 | 10M | Long-context retrieval |
| AWS Bedrock / Azure | Custom | Custom | 1M | Enterprise compliance, BAAs |

Prices verified 2026-06-25 via [Together AI pricing](https://www.together.ai/pricing), [Groq Llama 4 Scout model card](https://console.groq.com/docs/model/llama-4-scout-17b-16e-instruct), [Groq Llama 4 Maverick model card](https://console.groq.com/docs/model/meta-llama/llama-4-maverick-17b-128e-instruct), and [Groq model deprecation docs](https://console.groq.com/docs/deprecations). Provider-specific Maverick rates can move quickly, so check the live provider page before quoting a purchase order.

## Against the alternatives

| | Llama 4 Maverick | DeepSeek V3.2 | Mistral Large 2 |
|---|---|---|---|
| **License** | Llama Community (700M MAU cap) | MIT (fully permissive) | Mistral Research (non-commercial) |
| **Context window** | 1M tokens | 128K | 128K |
| **Cheapest hosted in / out** | $0.15 / $0.50 | $0.14 / $0.28 | $2.00 / $6.00 |
| **Multimodal input** | Text + image | Text only | Text + image (Pixtral sibling) |
| **Self-host weights** | Yes | Yes | Yes (research only) |
| **Vendor-reported coding** | Strong | Strongest open-weight | Mid |
| **Best viewed as** | Open-weight default | Cheapest frontier API | Enterprise EU alternative |

## Failure modes

- **License is not Apache.** The Llama 4 Community License excludes EU-based entities from the license grant and requires a separate license for companies over 700M monthly active users. Read the terms before shipping to those markets.
- **No native image or video output.** Llama is text-plus-vision-input only. Workflows needing image or video generation need a second tool.
- **Behemoth is not public.** Meta's 2T-parameter model remains an internal teacher. Benchmarks citing Behemoth performance do not reflect anything you can actually use.
- **Quality lag vs closed frontier.** Vendor benchmarks make Maverick look competitive with older closed baselines, but third-party leaderboards and buyer tests can still favor current Claude, OpenAI, and Gemini models on the hardest reasoning and agent tasks.
- **Hosted provider variance.** Same model, different providers, different quality: FP8 quantized endpoints (DeepInfra, Azure) run cheaper but sacrifice some output quality vs full-precision. Benchmark your specific workload before committing.
- **No first-party consumer UI competitive with ChatGPT.** Meta AI at meta.ai is ad-adjacent, feature-thin, and not positioned as a daily-driver assistant.
- **Self-hosting is expensive.** A single H100 runs Scout; Maverick needs multi-GPU setups. If you lack cluster access, hosted APIs are cheaper than building infrastructure.
- **Fine-tune licensing inherits upstream.** Derivatives of Llama must carry the Community License terms. You cannot relicense a fine-tuned Llama under Apache or MIT.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-25 against the [Llama 4 announcement](https://ai.meta.com/blog/llama-4-multimodal-intelligence/), [Llama 4 Community License](https://www.llama.com/llama4/license/), [Together AI pricing](https://www.together.ai/pricing), [Groq Llama 4 Scout model card](https://console.groq.com/docs/model/llama-4-scout-17b-16e-instruct), [Groq Llama 4 Maverick model card](https://console.groq.com/docs/model/meta-llama/llama-4-maverick-17b-128e-instruct), and [Groq model deprecation docs](https://console.groq.com/docs/deprecations).

## FAQ

**Is Llama free?**
Yes. Weights are free under the Llama 4 Community License. Self-hosting costs your compute, deployment work, and compliance review. Hosted APIs bill per token; the June 8 check found Groq Scout at $0.11/M input and Together Maverick at $0.27/M input. Meta AI at meta.ai is free for consumer chat.

**Can I use Llama commercially?**
Yes for almost all companies. The Community License grants commercial use to any organization under 700M monthly active users. Companies above that threshold (Google, Microsoft, Apple scale) need a separate Meta license. EU-based entities are explicitly carved out of some license provisions. Read the [Llama 4 Community License](https://www.llama.com/llama4/license/).

**What is the current Llama flagship?**
Llama 4 Maverick: 400B total parameters, 17B active, 128 experts, 1M token context. It remains the strongest production-ready Llama model as of the June 12, 2026 check. Scout (109B / 10M raw-model context, with shorter hosted context on some providers) wins for long-document jobs. Behemoth (2T) is still an internal teacher model and has not shipped.

**How does Llama compare to Claude?**
Current Claude models remain the safer pick for careful long-form reasoning, writing, and agentic coding judgment. Llama wins on model control, self-hosting, and provider competition. Use Claude for peak assistant quality; use Llama when data control, open weights, cost, or model diversification is the purchase reason.

**Which hosted provider should I pick?**
Groq for Scout speed and low token rates. Together for Maverick and fine-tune workflows. Fireworks for production SLAs. AWS Bedrock or Azure for enterprise compliance with BAAs and SOC 2. Recheck the live provider model page because model availability can change faster than Meta's base model release cycle.

## Sources

- [Llama 4 announcement (ai.meta.com)](https://ai.meta.com/blog/llama-4-multimodal-intelligence/): Official Scout, Maverick, and Behemoth specifications
- [Llama 4 Community License](https://www.llama.com/llama4/license/): License terms, 700M MAU threshold, EU carve-out
- [Llama 4 Maverick on Hugging Face](https://huggingface.co/meta-llama/Llama-4-Maverick-17B-128E): Canonical weight distribution
- [Together AI pricing](https://www.together.ai/pricing): Hosted Maverick rates and fine-tuning rows
- [Groq Llama 4 Scout model card](https://console.groq.com/docs/model/llama-4-scout-17b-16e-instruct): Scout pricing, context, speed, and capabilities
- [Groq Llama 4 Maverick model card](https://console.groq.com/docs/model/meta-llama/llama-4-maverick-17b-128e-instruct): Maverick architecture, public model-card status, and provider-specific context
- [Groq model deprecation docs](https://console.groq.com/docs/deprecations): provider-specific model churn context

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/) · [AI Coding](/categories/ai-coding/)
- **Alternatives:** [Claude](/tools/claude/) · [ChatGPT](/tools/chatgpt/) · [Gemini](/tools/gemini/) · [DeepSeek](/tools/deepseek/) · [Mistral AI](/tools/mistral-ai/) · [Qwen](/tools/qwen/) · [GLM](/tools/glm/)
