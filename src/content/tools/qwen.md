---
type: tool
slug: qwen
title: Qwen
tagline: Alibaba Cloud's Qwen model family spans Qwen Chat, Alibaba Cloud Model Studio APIs, and Apache 2.0 open-weight Qwen3 releases from 0.6B through 235B MoE.
category: ai-chatbots
secondary_categories: [ai-coding, ai-research]
company: Alibaba Cloud
url: https://qwen.ai/
pricing_model: freemium
price_range: "Free open-weight downloads / hosted API priced per model"
status: active
launched: 2023-09
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
  value: 10
  moat: 5
  longevity: 8
facts:
  best_for:
    value: "Developers who want strong open-weight models and Alibaba Cloud hosted inference options, especially for multilingual and agentic workloads."
    source: "https://qwen.ai/"
    source_label: "Qwen official site"
    source_id: qwen-official
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
  model_surface:
    value: "Qwen should be evaluated as a model family with Qwen Chat, open-weight releases, hosted APIs, and fast-moving version changes rather than a single chatbot product."
    source: "https://qwenlm.github.io/blog/qwen3/"
    source_label: "Qwen3 blog"
    source_id: qwen-blog
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
  pricing_anchor:
    value: "Hosted API pricing is published through Alibaba Cloud Model Studio and depends on the selected model and token usage."
    source: "https://www.alibabacloud.com/help/en/model-studio/model-pricing"
    source_label: "Alibaba Cloud Model Studio pricing"
    source_id: qwen-pricing
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
  deployment_surface:
    value: "Choose Qwen when open-weight deployment, regional availability, or Alibaba Cloud integration matters; compare license, context, and tool-use behavior per model."
    source: "https://qwen.ai/"
    source_label: "Qwen official site"
    source_id: qwen-official
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: medium
  watch_out_for:
    value: "Do not generalize from one Qwen checkpoint to the whole family. Benchmark the exact model, quantization, serving stack, and language mix you plan to use."
    source: "https://qwenlm.github.io/blog/qwen3/"
    source_label: "Qwen3 blog"
    source_id: qwen-blog
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
price_history:
  - date: 2026-05-13
    price: "see note"
    source: "https://www.alibabacloud.com/help/en/model-studio/model-pricing"
    source_label: "Alibaba Cloud Model Studio pricing"
    source_id: qwen-pricing
    verified_at: 2026-05-13
    note: "qwen-max International tier: $1.20/M input (0-32K) and $6.00/M output; new Qwen-Flash tier at $0.10/M input and $0.40/M output; qwen-plus at $0.40/M input and $1.20/M output (0-256K)."
  - date: 2026-05-11
    price: "see note"
    source: "https://www.alibabacloud.com/help/en/model-studio/model-pricing"
    source_label: "Alibaba Cloud Model Studio pricing"
    source_id: qwen-pricing
    verified_at: 2026-05-11
    note: "qwen-max International listed at $1.60/M input and $6.40/M output on Model Studio."
tags: [open-weights, alibaba, multilingual, coding, vision, reasoning, qwen3, api, chinese-llm]
seo_title: "Qwen: Features, Pricing & Review (May 2026)"
meta_description: "Qwen is Alibaba Cloud's model family for Qwen Chat, hosted Model Studio APIs, and Apache 2.0 Qwen3 open weights. Verified May 2026."
author: "aipedia.wiki Editorial"
best_for:
  - multilingual products across 119 languages
  - developers wanting open weights for self-hosting
  - coding, math, and agentic workloads
  - cost-sensitive high-volume API use
not_best_for:
  - users wanting a polished consumer chat app
  - teams needing strict Western data residency on hosted API
  - workloads sensitive to Alibaba cloud exposure
quick_answer: >-
  Qwen is Alibaba Cloud's fast-moving model family. Pick it for open-weight Qwen3 deployments, Alibaba Cloud Model Studio inference, multilingual products, and developer control. Skip it if you need a polished consumer assistant like ChatGPT.
---

# Qwen

Alibaba Cloud's Qwen family spans a consumer-facing Qwen Chat surface, hosted API access through Alibaba Cloud Model Studio, and open-weight model releases on Hugging Face and ModelScope. The practical buyer question is not "Should I buy Qwen instead of ChatGPT?" but "Do I need a controllable model family for building, hosting, tuning, or routing AI systems?"

The official Qwen3 release includes two open-weight MoE models, **Qwen3-235B-A22B** and **Qwen3-30B-A3B**, plus dense models from **0.6B** through **32B**, all under Apache 2.0. Qwen says Qwen3 supports 119 languages and dialects, hybrid thinking/non-thinking modes, and agentic/coding improvements. Hosted inference pricing is published through Alibaba Cloud Model Studio and varies by exact model, context, mode, and token volume.

## Recent developments

- **May 13, 2026:** AiPedia refreshed this page against official Qwen, Alibaba Cloud Model Studio, Hugging Face, and the latest Qwen ecosystem coverage. Model Studio International pricing now lists qwen-max at $1.20/M input (0-32K) and $6.00/M output (down from the May 10 list of $1.60/$6.40), with a new Qwen-Flash tier at $0.10/M input and $0.40/M output. Qwen-Turbo is no longer receiving updates; Qwen-Flash is the recommended replacement.
- **May 11, 2026:** [Alibaba Qwen and Taobao launched a co-built agentic shopping experience](/news/2026-05-11-alibaba-qwen-taobao-agentic-shopping/). The integration is the highest-profile production deployment of Qwen agentic capabilities to date, pushing the family from developer-facing model lineup into a consumer-scale commerce surface that touches hundreds of millions of users.
- **April 10, 2026:** [Vidu Shengshu, the Alibaba-affiliated video-model studio, raised fresh funding](/news/2026-04-10-alibaba-vidu-shengshu-funding/). Reinforces that Alibaba's AI bet now spans Qwen text/code, Qwen-VL, image, video, and embodied stacks, not just the chat model family.
- **April 16, 2026:** [Third-party coverage reported a Qwen3.6-35B-A3B sparse MoE release](/news/2026-04-16-qwen-3-6-35b-a3b-release/). AiPedia is tracking it as a market signal, but this evergreen page keeps the official Qwen3 open-weight line as the buyer-facing baseline until primary source support is clear.
- **April 30, 2026:** [Alibaba-linked Metis showed an 8B Qwen3-VL-based agent can improve by calling tools less](/news/2026-04-30-alibaba-metis-agent-tool-use-hdpo/). The HDPO-trained model reduces blind tool calls from 98% to 2% in the project reports, making tool abstention a useful Qwen ecosystem signal.
- **April 19, 2026:** [Alibaba Amap debuts first embodied robot at Beijing Humanoid Robot Half Marathon](/news/2026-04-19-beijing-humanoid-robot-half-marathon-alibaba-abot/). Quadruped from Amap's new embodied-intelligence division, powered by Alibaba's ABot-World model (leads AGIbot World Challenge and World Arena benchmarks). Moves Alibaba from Qwen-as-foundation into first-party robotics alongside the model family.

## System Verdict

> **Pick Qwen if you need open-weight models with multilingual reach.** Apache 2.0 Qwen3 releases give real commercial flexibility. The official Qwen3 release lists 119-language coverage and model sizes from 0.6B to 235B MoE, making Qwen a strong candidate for multilingual products, local experiments, and custom hosted deployments.
>
> **Skip it if you want a polished consumer chat product or strict Western data residency.** Qwen Chat is useful for testing, but it is not ChatGPT-grade as a general consumer workspace. Alibaba Cloud is a Chinese provider, which matters for regulated enterprise buyers. Competing open-weight families like [DeepSeek](/tools/deepseek/) may be stronger on specific reasoning or cost benchmarks.
>
> **Who uses which surface:** Qwen Chat for quick tests, Hugging Face or ModelScope downloads for self-hosters, Alibaba Cloud Model Studio for hosted API use, and third-party gateways only after checking their separate pricing and model availability.

## Key Facts

| | |
|---|---|
| **Official open-weight line** | Qwen3 series under Apache 2.0, from 0.6B dense to 235B MoE |
| **Largest Qwen3 open MoE** | Qwen3-235B-A22B: 235B total parameters, 22B activated |
| **Smaller Qwen3 open MoE** | Qwen3-30B-A3B: 30B total parameters, 3B activated |
| **Dense Qwen3 sizes** | 0.6B, 1.7B, 4B, 8B, 14B, and 32B |
| **Language coverage** | 119 languages, pre-trained on ~36T tokens |
| **Architecture** | Hybrid thinking / non-thinking mode switchable |
| **Qwen3 context examples** | 32K on smaller dense models; 128K on Qwen3-8B and larger official Qwen3 models |
| **Hosted API pricing** | Published by Alibaba Cloud Model Studio and varies by model/mode/context |
| **Example hosted rate** | qwen-max International: $1.20/M input (0-32K) and $6.00/M output as of 2026-05-13; Qwen-Flash: $0.10/M input and $0.40/M output |
| **Batch invocation** | 50% off real-time pricing on supported models |
| **Production agent surface** | Qwen and Taobao co-built agentic shopping launched May 11, 2026 |

Every data point above was verified on 2026-05-13. See Sources.

## What it actually is

A multi-pronged model family covering several surfaces: Qwen Chat for direct testing, hosted API access through Alibaba Cloud Model Studio, open-weight downloads on Hugging Face and ModelScope, and third-party gateway access where providers choose to carry specific Qwen models.

The family splits into specialists. Core Qwen models handle general chat and reasoning. Qwen-Coder, Qwen-VL, Qwen-Audio, Qwen-Image, and QwQ-style reasoning branches appear across the broader ecosystem, but production buyers should verify the exact checkpoint, license, context window, and hosting path before choosing a model.

The real moats are Apache 2.0 licensing on most open sizes, 119-language coverage no other major family matches, and Alibaba's willingness to run aggressive API pricing. Thin-margin cloud pricing combined with open weights gives teams a self-host escape valve most closed-model providers cannot offer.

## When to pick Qwen

- **Multilingual products.** 119-language training covers Chinese, Japanese, Korean, Arabic, and European languages at higher quality than English-centric families.
- **Self-hosted deployment.** Apache 2.0 weights run from single-CPU (0.6B) to 4x A100 (72B dense) to MoE clusters (235B, 480B Coder). No licensing fees.
- **Cost-sensitive API tests.** Model Studio publishes per-model token pricing and batch discounts for supported models.
- **Agentic and coding experiments.** Qwen3 includes hybrid thinking/non-thinking controls, MCP-oriented examples, and deployment guidance through SGLang and vLLM.
- **Model-family breadth.** The Qwen ecosystem spans text, code, vision-language, image, audio, and reasoning branches.
- **IDE and agent backends.** Use an OpenAI-compatible local or hosted endpoint after benchmarking the exact model.

## When to pick something else

- **Polished consumer chat product:** [ChatGPT](/tools/chatgpt/) or [Claude](/tools/claude/). qwen.ai is developer-first.
- **Strongest open-weight reasoning:** [DeepSeek](/tools/deepseek/) R1 still leads on specific reasoning benchmarks.
- **Best-in-class English writing:** [Claude](/tools/claude/) Opus 4.7. Qwen handles English well but trails Claude on nuance.
- **Google Workspace integration:** [Gemini](/tools/gemini/). Qwen has no Workspace hooks.
- **Open-weight with Huawei Ascend training stack:** [GLM](/tools/glm/) GLM-5.1 is the closest alternative with domestic-silicon provenance.
- **Broadest plugin marketplace:** [ChatGPT](/tools/chatgpt/). No Qwen equivalent to the GPT Store.

## Pricing

Hosted pricing via [Alibaba Cloud Model Studio](https://www.alibabacloud.com/help/en/model-studio/model-pricing). Self-host for free under Apache 2.0 via [Hugging Face](https://huggingface.co/Qwen).

| Plan / Model | Price | Notes |
|---|---|---|
| Open weights (Hugging Face/ModelScope) | Free to download | Apache 2.0 across the official Qwen3 open-weight line; hosting costs are separate |
| Qwen3 open-weight self-hosting | Infrastructure cost | Cost depends on model size, quantization, hardware, throughput, and context length |
| Alibaba Cloud Model Studio | Model-specific token pricing | Official page lists model, mode, input/output token rates, and free quota where applicable |
| qwen-max example | $1.20/M input (0-32K), $6.00/M output | Listed on Model Studio's Qwen-Max International pricing as of May 13, 2026; tiered to $2.40/$12 (32K-128K) and $3/$15 (128K-252K) |
| qwen-plus | $0.40/M input (0-256K), $1.20/M output | Long-context tier: $1.20/M input and $3.60/M output for 256K-1M |
| Qwen-Flash | $0.10/M input, $0.40/M output | New entry tier; Qwen-Turbo no longer receiving updates |
| Batch invocation | 50% off real-time | Supported models only |

*Prices verified 2026-05-13 via [Alibaba Cloud Model Studio pricing](https://www.alibabacloud.com/help/en/model-studio/model-pricing). Chinese Mainland deployment rates are lower than the International tiers shown here. Third-party gateways can be useful, but their rates and model availability are separate from Alibaba's official pricing.*

## Against the alternatives

| | Qwen3 open line | DeepSeek | Claude | GLM |
|---|---|---|---|---|
| **Open weights** | Apache 2.0 Qwen3 checkpoints | Strong open-model ecosystem | Closed frontier assistant/API | Open-model Chinese/English ecosystem |
| **Language coverage** | Qwen3 lists 119 languages and dialects | Chinese + English focus | Broad, English-strong writing | Chinese + English focus |
| **Hosted API** | Alibaba Cloud Model Studio plus gateways | Vendor/gateway dependent | Anthropic API and app surfaces | Vendor/gateway dependent |
| **Consumer polish** | Developer-first | Developer-first | Strong Claude app | Developer-first |
| **Best viewed as** | Open-weight multilingual model family | Low-cost reasoning/API rival | Writing/reasoning assistant | Chinese open-model rival |

## Failure modes

- **Consumer chat product is minimal.** qwen.ai is functional for testing but lacks ChatGPT-grade onboarding, memory, or ecosystem.
- **Data residency on Alibaba Cloud.** Enterprise buyers in regulated industries need to evaluate the Chinese-cloud posture. Self-hosting the Apache 2.0 weights is the workaround.
- **Thin moat on open-weight leaderboard.** DeepSeek, Kimi, GLM, and Qwen all iterate monthly. Leadership positions shift fast.
- **English documentation lag.** Official docs translate from Chinese first. Some resources trail the Chinese original by weeks.
- **Vision models lag best-in-class.** Qwen-VL and Qwen3.5-Omni are capable but trail the strongest closed vision models on independent evaluations.
- **Hosted API rate limits vary by region.** Alibaba Cloud tier and regional load affect throughput. Production deployments should load-test.
- **Pricing is model-specific.** Alibaba Cloud Model Studio tables change by model, mode, free quota, context, and batch eligibility.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity; unweighted average). Last verified 2026-05-13 against [Alibaba Cloud Model Studio pricing](https://www.alibabacloud.com/help/en/model-studio/model-pricing), [Qwen official site](https://qwen.ai/), [Qwen3 blog](https://qwenlm.github.io/blog/qwen3/), [Hugging Face Qwen](https://huggingface.co/Qwen), the [May 11 Qwen-Taobao agentic shopping coverage](/news/2026-05-11-alibaba-qwen-taobao-agentic-shopping/), and the tracked [Qwen3.6-35B-A3B news signal](/news/2026-04-16-qwen-3-6-35b-a3b-release/).

## FAQ

**Is Qwen open source?**
Partly. The official Qwen3 open-weight line ships under Apache 2.0 on Hugging Face and ModelScope, covering sizes from 0.6B to 235B MoE. Download, self-host, fine-tune, and deploy commercially under that license, but verify the exact model because not every Qwen-branded surface is open.

**What is the main Qwen3 open-weight release?**
The official Qwen3 release includes two MoE models, Qwen3-235B-A22B and Qwen3-30B-A3B, plus six dense models from 0.6B through 32B. Qwen says the line supports hybrid thinking modes, 119 languages and dialects, and agentic/coding improvements.

**How does Qwen3 compare to Claude?**
Qwen is more compelling when you need open weights and self-hosting. Claude is usually stronger when you want a polished paid assistant or API for English writing, long-document work, and managed enterprise workflows.

**Can I run Qwen locally?**
Yes. Official Qwen3 sizes start at 0.6B and scale up to 235B MoE. Practical hardware depends on model size, quantization, context length, throughput targets, and serving stack.

## Sources

- [Qwen official site](https://qwen.ai/): Qwen Chat and model-family surface
- [Qwen3 official blog](https://qwenlm.github.io/blog/qwen3/): architecture, open-weight models, training, 119-language coverage
- [Alibaba Cloud Model Studio pricing](https://www.alibabacloud.com/help/en/model-studio/model-pricing): current hosted rates
- [Hugging Face Qwen](https://huggingface.co/Qwen): open-weight model downloads

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/) · [AI Coding](/categories/ai-coding/)
- **Comparisons:** [ChatGPT vs Qwen](/compare/chatgpt-vs-qwen/) · [Claude vs Qwen](/compare/claude-vs-qwen/) · [DeepSeek vs Qwen](/compare/deepseek-vs-qwen/) · [Gemini vs Qwen](/compare/gemini-vs-qwen/) · [Mistral AI vs Qwen](/compare/mistral-ai-vs-qwen/)
