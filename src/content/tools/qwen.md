---
type: tool
slug: qwen
title: Qwen
tagline: Alibaba Cloud's Qwen model family spans Qwen Chat, Qwen Cloud APIs, hosted Qwen3.7-Max, and Apache 2.0 open-weight Qwen3 releases from 0.6B through 235B MoE.
category: ai-chatbots
secondary_categories: [ai-coding, ai-research]
company: Alibaba Cloud
url: https://qwen.ai/
pricing_model: freemium
price_range: "Free open-weight downloads / hosted API priced per model"
status: active
launched: 2023-09
last_updated: 2026-06-15
last_verified: 2026-06-15
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
    value: "Developers who want strong open-weight Qwen3 models and Alibaba Cloud hosted inference options, especially for multilingual, coding, agentic, and multimodal/GUI-agent evaluation."
    source: "https://qwen.ai/"
    source_label: "Qwen official site"
    source_id: qwen-official
    verified_at: 2026-06-15
    next_review_at: 2026-06-22
    volatility: high
    confidence: high
  model_surface:
    value: "Qwen should be evaluated as a model family with Qwen Chat, Apache 2.0 Qwen3 open weights, Qwen Cloud hosted APIs, the June 8 qwen3.7-max snapshot, qwen3.7-plus multimodal/GUI agent work, and specialty Qwen image/audio/video branches rather than a single chatbot product."
    source: "https://docs.qwencloud.com/changelog/models"
    source_label: "Qwen Cloud model releases"
    source_id: qwencloud-model-releases
    verified_at: 2026-06-15
    next_review_at: 2026-06-22
    volatility: high
    confidence: high
  latest_hosted_model:
    value: "Qwen Cloud's latest Max changelog entry is qwen3.7-max-2026-06-08, described as adding visual-modal understanding compared with the May 20 snapshot; the live qwen3.7-max marketplace page still presents the public model as text input/output with 1M context, 991.80K max input, 65.53K max output, and built-in tools."
    source: "https://docs.qwencloud.com/changelog/models"
    source_label: "Qwen Cloud model releases"
    source_id: qwencloud-model-releases
    verified_at: 2026-06-15
    next_review_at: 2026-06-22
    volatility: high
    confidence: high
  latest_changelog_release:
    value: "Qwen Cloud's latest official model-release changelog entry found on June 15 is qwen3.7-max-2026-06-08, with visual-modal understanding added versus the May 20 Max snapshot; qwen3.7-plus / qwen3.7-plus-2026-05-26 remains the current Plus multimodal interactive hybrid-agent release."
    source: "https://docs.qwencloud.com/changelog/models"
    source_label: "Qwen Cloud model releases"
    source_id: qwencloud-model-releases
    verified_at: 2026-06-15
    next_review_at: 2026-06-22
    volatility: high
    confidence: high
  pricing_anchor:
    value: "Hosted API pricing is published through Qwen Cloud / Alibaba Cloud docs and depends on the selected model, context tier, token usage, tool calls, batch/cache choices, region, and temporary discounts."
    source: "https://docs.qwencloud.com/developer-guides/getting-started/pricing"
    source_label: "Qwen Cloud pricing docs"
    source_id: qwencloud-pricing
    verified_at: 2026-06-15
    next_review_at: 2026-06-22
    volatility: high
    confidence: high
  deployment_surface:
    value: "Choose Qwen when open-weight deployment, regional availability, or Alibaba Cloud integration matters; compare license, context, and tool-use behavior per model."
    source: "https://qwen.ai/"
    source_label: "Qwen official site"
    source_id: qwen-official
    verified_at: 2026-06-15
    next_review_at: 2026-06-22
    volatility: high
    confidence: medium
  watch_out_for:
    value: "Do not generalize from one Qwen checkpoint to the whole family. Benchmark the exact model ID, snapshot, modality route, quantization, serving stack, tool fees, and language mix you plan to use."
    source: "https://qwenlm.github.io/blog/qwen3/"
    source_label: "Qwen3 blog"
    source_id: qwen-blog
    verified_at: 2026-06-15
    next_review_at: 2026-06-22
    volatility: high
    confidence: high
price_history:
  - date: 2026-06-15
    price: "qwen3.7-max list price: $2.50/M input and $7.50/M output; promo page displays $1.25/M input and $3.75/M output through June 22, 2026. qwen3.7-plus lists $0.40/M input and $1.60/M output up to 256K input, then $1.20/M input and $4.80/M output from 256K-1M."
    source: "https://docs.qwencloud.com/developer-guides/getting-started/pricing"
    source_label: "Qwen Cloud pricing docs"
    source_id: qwencloud-pricing
    verified_at: 2026-06-15
    note: "No material pricing change found versus the June 14 refresh. Qwen Cloud pricing docs cover representative models only and direct buyers to model-specific marketplace pages for complete current pricing. Built-in tools can add fees: Web Search is $10/1K calls, Image Search is $8/1K calls, while Web Extractor and Code Interpreter are marked free for a limited time."
  - date: 2026-05-24
    price: "qwen3.7-max list price: $2.50/M input and $7.50/M output; Qwen Cloud model page showed a 50% promotional rate at $1.25/$3.75"
    source: "https://www.qwencloud.com/models/qwen3.7-max"
    source_label: "Qwen Cloud Qwen3.7-Max model page"
    source_id: qwencloud-qwen37-max
    verified_at: 2026-06-06
    note: "Qwen Cloud docs list qwen3.7-max for 0-991K input at $2.50/M input and $7.50/M output; the model marketplace page currently displays the 50% off price."
  - date: 2026-06-06
    price: "qwen3.7-max list price still $2.50/M input and $7.50/M output; model and promo pages display 50% promotional rates at $1.25/$3.75 through June 22, 2026"
    source: "https://docs.qwencloud.com/developer-guides/getting-started/pricing"
    source_label: "Qwen Cloud pricing docs"
    source_id: qwencloud-pricing
    verified_at: 2026-06-06
    note: "Rechecked for the Mistral AI vs Qwen refresh. Qwen Cloud still lists qwen3.7-max as the hosted Max-series text model with 0-991K input pricing, while the Qwen3.7-Max marketplace and promo pages show function calling, cache, structured outputs, batches, web search, and 50% promotional display pricing through June 22, 2026."
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
tags: [open-weights, alibaba, multilingual, coding, vision, reasoning, qwen3, qwen3-7-max, api, chinese-llm]
seo_title: "Qwen: Features, Pricing & Review (June 2026)"
meta_description: "Qwen is Alibaba Cloud's model family for Qwen Chat, hosted Qwen Cloud APIs, Qwen3.7-Max, and Apache 2.0 Qwen3 open weights. Verified June 2026."
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
  Qwen is Alibaba Cloud's fast-moving model family. Pick it for hosted Qwen3.7-Max, open-weight Qwen3 deployments, Qwen Cloud / Model Studio inference, multilingual products, and developer control. Skip it if you need a polished consumer assistant like ChatGPT.
---

# Qwen

Alibaba Cloud's Qwen family spans a consumer-facing Qwen Chat surface, hosted API access through Qwen Cloud / Alibaba Cloud Model Studio, the hosted Qwen3.7-Max flagship lane, and open-weight model releases on Hugging Face and ModelScope. The practical buyer question is not "Should I buy Qwen instead of ChatGPT?" but "Do I need a controllable model family for building, hosting, tuning, or routing AI systems?"

The official Qwen3 release includes two open-weight MoE models, **Qwen3-235B-A22B** and **Qwen3-30B-A3B**, plus dense models from **0.6B** through **32B**, all under Apache 2.0. Qwen says Qwen3 supports 119 languages and dialects, hybrid thinking/non-thinking modes, and agentic/coding improvements. The newer Qwen3.7-Max route is a hosted Qwen Cloud model, not part of the Apache 2.0 open-weight Qwen3 release. As of the June 15 source check, Qwen Cloud's changelog says the June 8 Max snapshot adds visual-modal understanding, while the public qwen3.7-max marketplace page still describes a pure text interface. Hosted inference pricing is published through Qwen Cloud / Alibaba Cloud docs and varies by exact model, context, mode, discount, tool use, and token volume.

## Recent developments

- **June 15, 2026:** Qwen Cloud model releases, Qwen3.7-Max, Qwen3.7-Plus, Qwen Cloud pricing, the Qwen3.7-Max promo page, Qwen3 sources, and Hugging Face Qwen were rechecked again. No material change was found versus the June 14 refresh: the newest official changelog entry remains `qwen3.7-max-2026-06-08`, listed on June 10 with visual-modal understanding added versus the May 20 Max snapshot, while the live qwen3.7-max marketplace page still describes public experimentation as text-only. Verify modality on the exact endpoint before building around visual input.
- **June 6, 2026:** Qwen Cloud model releases, Qwen3.7-Max, Qwen3.7-Plus, Qwen Cloud pricing, and Qwen3 sources were rechecked while refreshing [Mistral AI vs Qwen](/compare/mistral-ai-vs-qwen/). The buyer split is now explicit: Mistral is the EU/open-model/vendor-platform lane; Qwen is the Alibaba/Qwen Cloud, multilingual, qwen3.7-max, qwen3.7-plus, and Qwen3 open-weight lane.
- **May 27, 2026:** [Alibaba Cloud used its first international Qwen Conference to push Qwen as an agent-cloud platform](/news/2026-05-27-qwen-conference-agent-cloud-suite/). The buyer signal is that Qwen is moving beyond model-family benchmarking into Qwen Cloud, Skills, infrastructure upgrades, and enterprise agent tooling.
- **May 27, 2026:** Qwen Cloud's [model-release changelog](https://docs.qwencloud.com/changelog/models) lists `qwen3.7-plus` / `qwen3.7-plus-2026-05-26` as a multimodal interactive hybrid-agent model for screen/GUI perception, code generation from visual references, tool use, productivity workflows, and end-to-end mobile-app navigation.
- **May 22, 2026:** Qwen Cloud's [model-release changelog](https://docs.qwencloud.com/changelog/models) added `qwen3.5-livetranslate-flash-realtime` and its `2026-05-19` snapshot. It is the newest specialty Qwen release AiPedia found in official sources, aimed at real-time multilingual audio/video translation.
- **May 21, 2026:** Qwen Cloud listed [qwen3.7-max](https://www.qwencloud.com/models/qwen3.7-max) / `qwen3.7-max-2026-05-20` as the next-generation flagship in the Qwen Max series. The official model page shows text input/output, thinking enabled by default, a 1M context window, 991K max input, 65K max output, and list pricing of $2.50/M input and $7.50/M output.
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
| **Latest Qwen Cloud Max changelog entry** | `qwen3.7-max-2026-06-08`: Max snapshot with visual-modal understanding added versus the May 20 snapshot |
| **Live qwen3.7-max marketplace page** | Public qwen3.7-max page still describes text input/output, thinking enabled by default, 1M context, 991.80K max input, 65.53K max output, and built-in tools |
| **Current Plus multimodal/GUI lane** | `qwen3.7-plus-2026-05-26`, a multimodal interactive hybrid-agent model for screen/GUI, coding, tool use, productivity, and app-navigation workflows |
| **Latest specialty audio/video release** | `qwen3.5-livetranslate-flash-realtime-2026-05-19` for real-time multilingual audio/video translation |
| **Largest Qwen3 open MoE** | Qwen3-235B-A22B: 235B total parameters, 22B activated |
| **Smaller Qwen3 open MoE** | Qwen3-30B-A3B: 30B total parameters, 3B activated |
| **Dense Qwen3 sizes** | 0.6B, 1.7B, 4B, 8B, 14B, and 32B |
| **Language coverage** | 119 languages, pre-trained on ~36T tokens |
| **Architecture** | Hybrid thinking / non-thinking mode switchable |
| **Qwen3 context examples** | 32K on smaller dense models; 128K on Qwen3-8B and larger official Qwen3 models |
| **Hosted API pricing** | Published by Alibaba Cloud Model Studio and varies by model/mode/context |
| **Example hosted rate** | Qwen3.7-Max list: $2.50/M input and $7.50/M output; Qwen Cloud page shows a 50% promo rate at $1.25/$3.75 through June 22, 2026 |
| **Batch invocation** | 50% off real-time pricing on supported models |
| **Production agent surface** | Qwen and Taobao co-built agentic shopping launched May 11, 2026 |
| **Agent-cloud push** | First international Qwen Conference promoted Qwen Cloud, Skills, infrastructure upgrades, and JVS Agent Suite |

Qwen3.7-Max, Qwen3.7-Plus, Qwen Cloud pricing, and model-release rows above were verified on 2026-06-15. Older qwen-max examples retain their own source dates in price history. See Sources.

## What it actually is

A multi-pronged model family covering several surfaces: Qwen Chat for direct testing, hosted API access through Qwen Cloud / Alibaba Cloud Model Studio, open-weight downloads on Hugging Face and ModelScope, and third-party gateway access where providers choose to carry specific Qwen models.

The family splits into specialists. Core Qwen models handle general chat and reasoning. Qwen3.7-Max is the latest hosted Max lane in Qwen Cloud's official changelog, while qwen3.7-plus, Qwen-Coder, Qwen-VL, Qwen-Audio, Qwen-Image, LiveTranslate, and QwQ-style reasoning branches appear across the broader ecosystem. Production buyers should verify the exact checkpoint, modality support, license, context window, tool fees, and hosting path before choosing a model.

The real moats are Apache 2.0 licensing on most open sizes, 119-language coverage no other major family matches, and Alibaba's willingness to run aggressive API pricing. Thin-margin cloud pricing combined with open weights gives teams a self-host escape valve most closed-model providers cannot offer.

## When to pick Qwen

- **Multilingual products.** 119-language training covers Chinese, Japanese, Korean, Arabic, and European languages at higher quality than English-centric families.
- **Self-hosted deployment.** Apache 2.0 weights run from single-CPU (0.6B) to 4x A100 (72B dense) to MoE clusters (235B, 480B Coder). No licensing fees.
- **Cost-sensitive API tests.** Model Studio publishes per-model token pricing and batch discounts for supported models.
- **Hosted flagship Qwen tests.** Qwen3.7-Max gives teams a 1M-context hosted Qwen option for agentic coding, office workflows, and long-horizon execution before deciding whether open-weight Qwen is enough.
- **Agentic and coding experiments.** Qwen3 includes hybrid thinking/non-thinking controls, MCP-oriented examples, and deployment guidance through SGLang and vLLM.
- **Model-family breadth.** The Qwen ecosystem spans text, code, vision-language, image, audio, and reasoning branches.
- **IDE and agent backends.** Use an OpenAI-compatible local or hosted endpoint after benchmarking the exact model.

## When to pick something else

- **Polished consumer chat product:** [ChatGPT](/tools/chatgpt/) or [Claude](/tools/claude/). qwen.ai is developer-first.
- **Strongest open-weight reasoning:** [DeepSeek](/tools/deepseek/) R1 still leads on specific reasoning benchmarks.
- **Best-in-class English writing:** [Claude](/tools/claude/) Opus 4.8. Qwen handles English well but trails Claude on nuance.
- **Google Workspace integration:** [Gemini](/tools/gemini/). Qwen has no Workspace hooks.
- **Open-weight with Huawei Ascend training stack:** [GLM](/tools/glm/) GLM-5.1 is the closest alternative with domestic-silicon provenance.
- **Broadest plugin marketplace:** [ChatGPT](/tools/chatgpt/). No Qwen equivalent to the GPT Store.

## Pricing

Hosted pricing via [Qwen Cloud pricing docs](https://docs.qwencloud.com/developer-guides/getting-started/pricing), [Qwen Cloud model pages](https://www.qwencloud.com/models/qwen3.7-max), and Alibaba Cloud Model Studio. Self-host for free under Apache 2.0 via [Hugging Face](https://huggingface.co/Qwen).

| Plan / Model | Price | Notes |
|---|---|---|
| Open weights (Hugging Face/ModelScope) | Free to download | Apache 2.0 across the official Qwen3 open-weight line; hosting costs are separate |
| Qwen3 open-weight self-hosting | Infrastructure cost | Cost depends on model size, quantization, hardware, throughput, and context length |
| Alibaba Cloud Model Studio | Model-specific token pricing | Official page lists model, mode, input/output token rates, and free quota where applicable |
| Qwen3.7-Max | List: $2.50/M input, $7.50/M output; promo page displays $1.25/$3.75 through June 22, 2026 | Latest Max changelog entry is the June 8 snapshot; live marketplace page still shows text input/output, 1M context, 991.80K max input, 65.53K max output |
| Qwen3.7-Plus | $0.40/M input and $1.60/M output up to 256K; $1.20/M input and $4.80/M output from 256K-1M | Qwen Cloud's May 27 multimodal/GUI hybrid-agent release |
| qwen-max example | $1.20/M input (0-32K), $6.00/M output | Listed on Model Studio's Qwen-Max International pricing as of May 13, 2026; tiered to $2.40/$12 (32K-128K) and $3/$15 (128K-252K) |
| qwen-plus | $0.40/M input (0-256K), $1.20/M output | Long-context tier: $1.20/M input and $3.60/M output for 256K-1M |
| Qwen-Flash | $0.10/M input, $0.40/M output | New entry tier; Qwen-Turbo no longer receiving updates |
| Batch invocation | 50% off real-time | Supported models only |

*Qwen3.7-Max and Qwen3.7-Plus pricing verified 2026-06-15 via [Qwen Cloud pricing docs](https://docs.qwencloud.com/developer-guides/getting-started/pricing), the [Qwen3.7-Max model page](https://www.qwencloud.com/models/qwen3.7-max), and the [Qwen3.7-Max promotion page](https://www.qwencloud.com/promo/discount-qwen). Qwen Cloud pricing docs list representative models only and point buyers to marketplace model pages for complete current pricing. Built-in tools can add fees: Web Search is listed at $10 per 1,000 calls and Image Search at $8 per 1,000 calls, while Web Extractor and Code Interpreter are marked free for a limited time. Older qwen-max examples were verified 2026-05-13 via Alibaba Cloud Model Studio pricing. Chinese Mainland deployment rates can differ from International tiers. Third-party gateways can be useful, but their rates and model availability are separate from Alibaba's official pricing.*

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
- **Changelog and marketplace wording can diverge.** The June 10 changelog says the June 8 Max snapshot adds visual-modal understanding, while the live qwen3.7-max marketplace page still describes a text-only public interface. Verify the exact route before promising visual input.
- **Latest does not mean open weight.** Qwen3.7-Max is a hosted Qwen Cloud flagship route. The Apache 2.0 open-weight buyer case still rests on the official Qwen3 checkpoints.
- **Promos can distort cost comparisons.** Qwen Cloud showed a 50% Qwen3.7-Max promotional rate during this refresh; compare on list price unless you are buying during the promo window.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity; unweighted average). Last verified 2026-06-15 against [Qwen Cloud model releases](https://docs.qwencloud.com/changelog/models), the [Qwen3.7-Max model page](https://www.qwencloud.com/models/qwen3.7-max), [Qwen Cloud pricing docs](https://docs.qwencloud.com/developer-guides/getting-started/pricing), the [Qwen3.7-Max promotion page](https://www.qwencloud.com/promo/discount-qwen), [Qwen official site](https://qwen.ai/), [Qwen3 blog](https://qwenlm.github.io/blog/qwen3/), [Hugging Face Qwen](https://huggingface.co/Qwen), current Qwen Conference coverage, the [May 11 Qwen-Taobao agentic shopping coverage](/news/2026-05-11-alibaba-qwen-taobao-agentic-shopping/), and the tracked [Qwen3.6-35B-A3B news signal](/news/2026-04-16-qwen-3-6-35b-a3b-release/).

## FAQ

**Is Qwen open source?**
Partly. The official Qwen3 open-weight line ships under Apache 2.0 on Hugging Face and ModelScope, covering sizes from 0.6B to 235B MoE. Download, self-host, fine-tune, and deploy commercially under that license, but verify the exact model because not every Qwen-branded surface is open.

**What is the main Qwen3 open-weight release?**
The official Qwen3 release includes two MoE models, Qwen3-235B-A22B and Qwen3-30B-A3B, plus six dense models from 0.6B through 32B. Qwen says the line supports hybrid thinking modes, 119 languages and dialects, and agentic/coding improvements.

**What is the latest Qwen model?**
As of this refresh on June 15, 2026, the latest official Qwen Cloud changelog entry AiPedia found is `qwen3.7-max-2026-06-08`, listed on June 10 as a Max snapshot with visual-modal understanding added versus the May 20 snapshot. The live qwen3.7-max marketplace page still describes the public model page as text input/output, so buyers should verify the exact route before assuming visual input. The current Plus multimodal/GUI agent lane remains `qwen3.7-plus-2026-05-26`. None of this changes the buyer-facing fact that the main open-weight line is still Qwen3.

**How does Qwen3 compare to Claude?**
Qwen is more compelling when you need open weights and self-hosting. Claude is usually stronger when you want a polished paid assistant or API for English writing, long-document work, and managed enterprise workflows.

**Can I run Qwen locally?**
Yes. Official Qwen3 sizes start at 0.6B and scale up to 235B MoE. Practical hardware depends on model size, quantization, context length, throughput targets, and serving stack.

## Sources

- [Qwen official site](https://qwen.ai/): Qwen Chat and model-family surface
- [Qwen3 official blog](https://qwenlm.github.io/blog/qwen3/): architecture, open-weight models, training, 119-language coverage
- [Qwen Cloud model releases](https://docs.qwencloud.com/changelog/models): qwen3.7-max June 8 snapshot, qwen3.7-plus, and Qwen3.5 LiveTranslate release dates
- [Qwen3.7-Max model page](https://www.qwencloud.com/models/qwen3.7-max): model alias, context, built-in tools, and current marketplace pricing display
- [Qwen Cloud pricing docs](https://docs.qwencloud.com/developer-guides/getting-started/pricing): pay-as-you-go text model pricing, including Qwen3.7-Max and Qwen3.7-Plus representative rates
- [Qwen3.7-Max promotion](https://www.qwencloud.com/promo/discount-qwen): temporary 50% discount through June 22, 2026
- [Alibaba Cloud Qwen Conference coverage](https://www.eqs-news.com/news/corporate/alibaba-cloud-unveils-advanced-agentic-ai-ecosystem-for-global-customers/a191d39b-db45-48ed-b194-9cce5071b556_en): Qwen Cloud, Skills, infrastructure upgrades, and JVS Agent Suite
- [Alibaba Cloud Model Studio pricing](https://www.alibabacloud.com/help/en/model-studio/model-pricing): current hosted rates
- [Hugging Face Qwen](https://huggingface.co/Qwen): open-weight model downloads

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/) · [AI Coding](/categories/ai-coding/)
- **Comparisons:** [ChatGPT vs Qwen](/compare/chatgpt-vs-qwen/) · [Claude vs Qwen](/compare/claude-vs-qwen/) · [DeepSeek vs Qwen](/compare/deepseek-vs-qwen/) · [Gemini vs Qwen](/compare/gemini-vs-qwen/) · [Mistral AI vs Qwen](/compare/mistral-ai-vs-qwen/)
