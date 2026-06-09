---
type: tool
slug: reka
title: Reka
tagline: Physical-AI and multimodal model company behind Reka Edge 2, Reka Chat, Research, Vision, Infer, and source-available Edge weights for local deployment.
category: ai-chatbots
secondary_categories: [ai-research]
company: Reka AI
url: https://reka.ai
pricing_model: paid
price_range: "$0.10-$6/MTok for Chat API; Research $25-$60/1k requests"
status: active
launched: 2022
last_updated: 2026-06-09
last_verified: 2026-06-09
update_frequency: quarterly
seo_title: "Reka AI Review: Edge 2, Pricing & Physical AI (June 2026)"
meta_description: "Reka now centers Edge 2, physical AI, Vision, Infer, and Chat API pricing. Edge is $0.10/$0.10 per MTok, BSL 1.1 weights are available, and Core remains $2/$6 per MTok."
author: "aipedia.wiki Editorial"
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 8
  moat: 8
  longevity: 7
facts:
  best_for:
    value: "Reka is now best framed as a physical-AI and multimodal infrastructure company: Reka Edge 2 for on-device/local visual intelligence, Reka Chat and Research APIs, Reka Vision for video/image search and Q&A, Infer for multimodal inference infrastructure, and Claru for training-data infrastructure."
    source: "https://reka.ai/"
    source_label: "Reka homepage"
    source_id: reka-homepage
    verified_at: 2026-06-09
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Current Chat API pricing lists Reka Edge at $0.10 input / $0.10 output per 1M tokens, Flash at $0.80 / $2.00, and Core at $2.00 / $6.00. Edge image is $0.005 and video is $0.03/min; Edge audio is not listed."
    source: "https://docs.reka.ai/pricing"
    source_label: "Reka API pricing"
    source_id: reka-pricing
    verified_at: 2026-06-09
    next_review_at: 2026-09-09
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Do not call Reka Edge an unrestricted open-source model: the Reka Edge page says weights are available on Hugging Face under BSL 1.1, with free commercial use only for individuals and organizations below $1M annual revenue; larger commercial users need Reka terms."
    source: "https://reka.ai/reka-edge"
    source_label: "Reka Edge product page"
    source_id: reka-edge-product
    verified_at: 2026-06-09
    next_review_at: 2026-09-09
    volatility: medium
    confidence: high
tags: [multimodal-llm, video-understanding, enterprise-ai, reka, foundation-model]
best_for:
  - long-context video analysis and question answering
  - on-device and edge multimodal inference
  - source-available BSL-licensed local Edge deployment below the commercial-use threshold
  - enterprise AI with on-prem or dedicated deployment
  - multimodal apps needing text + image + audio + video in one model
  - cost-sensitive API workloads where Claude or GPT pricing is prohibitive
not_best_for:
  - consumer chat (no polished ChatGPT-style interface)
  - the absolute top of reasoning benchmarks (Claude Opus and OpenAI frontier models lead)
  - buyers who require permissive Apache/MIT model weights
quick_answer: >-
  Reka is now best understood as a physical-AI and multimodal infrastructure company, not a consumer chatbot. Pick it for Reka Edge 2, local/edge vision-language deployment, video/image intelligence, Reka Chat APIs, and enterprise infrastructure. Skip it if you need a polished consumer assistant or permissive open-weight licensing.
price_history:
  - date: 2026-04-18
    plan: "Reka Core API"
    price: "$2 / $6 per MTok"
    source: "https://docs.reka.ai/pricing"
    source_label: "Source"
    source_id: reka-pricing
    note: "Verified via docs.reka.ai/pricing. Image $0.02, video $0.08/min, audio $0.02/min."
  - date: 2026-03-05
    plan: "Reka Edge (7B)"
    price: "On-device pricing via partners"
    source: "https://reka.ai/news/reka-edge-frontier-level-edge-intelligence-for-physical-ai"
    source_label: "Source"
    source_id: reka-edge-launch
    note: "Reka Edge launched March 5, 2026 for physical AI and on-device vision-language."
  - date: 2026-06-09
    plan: "Reka Edge API"
    price: "$0.10 / $0.10 per MTok"
    source: "https://docs.reka.ai/pricing"
    source_label: "Reka API pricing"
    source_id: reka-pricing
    verified_at: 2026-06-09
    note: "Current price card lists Edge at $0.10 input and $0.10 output per 1M tokens, with image $0.005, video $0.03/min, and no listed Edge audio price."
---

# Reka

Reka is a multimodal AI research and infrastructure company founded in 2022 by veterans from DeepMind, Google Brain, Meta, and Baidu. The old way to describe it was a Core/Flash/Edge model family. The current June 2026 site is more specific: Reka is building models and infrastructure for the physical-AI era, with Reka Edge 2, Reka Chat, Reka Research, Reka Vision, Infer, and Claru.

Reka's real moat is visual intelligence for video-heavy and edge-heavy systems. Reka Edge is a 7B-class vision-language model built for on-device, on-prem, and cloud deployment, with a ConvNeXt V2 visual encoder, compact 64-token image tiles, and quantized local deployment options. The current price card also makes Edge the cheapest public Chat API lane at $0.10 per million input tokens and $0.10 per million output tokens.

The company hit unicorn status in 2025 with a $110M round led by NVIDIA and Snowflake. That backing signals hyperscaler interest in Reka's on-prem and dedicated deployment story, which sets it apart from API-only rivals.

## System Verdict

> **Pick Reka if your workload centers on visual/physical AI, video understanding, local or edge deployment, or multimodal infrastructure.** Reka Edge 2 is the buyer signal now: source-available weights, Hugging Face/vLLM deployment, local offline operation, API access, and commercial-license caveats. Core and Flash still matter for API workloads, but the homepage no longer reads like a generic LLM lab.
>
> **Skip it if you need consumer-grade chat, top-of-benchmark reasoning, or image/video generation.** Reka has no ChatGPT-style consumer product. On pure text reasoning, [Claude](/tools/claude/) Opus 4.7 and OpenAI frontier models lead. Reka also understands media but does not generate it, so image and video creation workflows need a separate tool.
>
> **Who pays which tier:** Edge at $0.10 / $0.10 per MTok for cheap visual/chat API work and local deployment evaluation, Flash at $0.80 input / $2 output per MTok for balanced production workloads, Core at $2 input / $6 output per MTok for heavier multimodal reasoning, Research via flat $25-$60 per 1,000 requests for grounded web-research workflows, Vision via its own product/pricing path for video and image search/Q&A.

## Key Facts

| | |
|---|---|
| **Current public emphasis** | Reka Edge 2 for physical AI, plus Reka Chat, Research, Vision, Infer, and Claru |
| **Public Chat models** | reka-flash · reka-edge / reka-edge-2603 · Core pricing still listed |
| **Research product** | Reka Research (flat-rate per 1,000 requests) |
| **Video / image intelligence** | Edge and Vision for video/image understanding, search, Q&A, detection, tagging, and physical grounding |
| **Local deployment** | Edge weights available on Hugging Face, vLLM path, offline local operation, BSL 1.1 license with commercial-use threshold |
| **API pricing** | Core: $2 in / $6 out per MTok · Flash: $0.80 / $2 · Edge: $0.10 / $0.10 |
| **Multimodal surcharges** | Image $0.005-$0.02 · Video $0.03-$0.08/min · Audio listed for Flash/Core only |
| **Research pricing** | $25 per 1,000 standard requests · $35-$60 with Parallel Thinking |
| **Deployment options** | API, Python/JavaScript/Go/Java/REST, Hugging Face/vLLM for Edge, dedicated and on-prem available by arrangement |
| **Free tier** | None documented. Pay-as-you-go with no upfront costs. |
| **Founded / HQ** | 2022, Sunnyvale CA |
| **Funding** | $110M round 2025, $1B+ valuation, backed by NVIDIA and Snowflake |

## What it actually is

A multimodal model and infrastructure company sold through API, product surfaces, and deployment arrangements. Core still handles heavy multimodal reasoning, Flash targets balanced cost and quality, and Edge fits the 7B-class on-device/cloud lane. Spark is no longer part of the public price card and should not be used as a current self-serve recommendation.

Reka Research is a separate product. It charges a flat rate per 1,000 requests and ships a Parallel Thinking mode for higher-quality answers at premium pricing. Think of it as a grounded search layer sitting on top of the chat models.

The deployment story is the real differentiator. Reka Edge can be run locally, including offline, subject to license terms; larger commercial users need Reka terms. Reka also offers on-prem and dedicated-instance contracts that let regulated enterprises keep inference inside their own infrastructure.

## When to pick Reka

- **Video, image, and physical-world analysis.** Reka Edge and Vision are now the strongest public buyer lane: real-time video analysis, object detection, visual search, metadata tagging, and image/video Q&A.
- **On-device and local physical AI.** Edge (7B-class) is optimized for robotics, cameras, vehicles, wearables, and embedded systems where cloud round-trips are unacceptable. It is available via API and Hugging Face/vLLM for local deployment.
- **Enterprise on-prem deployment.** Regulated industries that cannot ship data to a third-party API get dedicated or on-prem options here. Rare among frontier-class labs.
- **Cost-sensitive multimodal API workloads.** Core at $2 in / $6 out per MTok sits well below [Claude](/tools/claude/) Opus 4.7's $5/$25 for comparable multimodal tasks.
- **Grounded research workflows.** Reka Research's flat per-1,000-request pricing can be more predictable than token-based chat billing for research agents.

## When to pick something else

- **Consumer chat:** [ChatGPT](/tools/chatgpt/), [Claude](/tools/claude/), or [Gemini](/tools/gemini/). Reka ships developer APIs, not a polished consumer UI.
- **Top-of-benchmark reasoning:** [Claude](/tools/claude/) Opus 4.7 leads agentic coding and long-form reasoning; [Gemini](/tools/gemini/) 3.1 Pro leads Google-stack integration.
- **Permissive open weights for fine-tuning:** [Llama](/tools/llama/), [Qwen](/tools/qwen/), [DeepSeek](/tools/deepseek/), [Mistral AI](/tools/mistral-ai/), [Kimi](/tools/kimi/), [GLM](/tools/glm/), or [Yi](/tools/yi/). Reka Edge weights are available, but the BSL 1.1 license and commercial-use threshold are not the same as Apache/MIT.
- **Enterprise chatbot with heavy Google Workspace integration:** [Gemini](/tools/gemini/) 3.1 Pro. Reka has no Workspace hooks.

## Pricing

Chat API pricing via [docs.reka.ai/pricing](https://docs.reka.ai/pricing):

| Model | Input ($/MTok) | Output ($/MTok) | Image | Video | Audio |
|---|---|---|---|---|---|
| Reka Edge (7B-class) | $0.10 | $0.10 | $0.005 | $0.03/min | N/A |
| Reka Flash (21B) | $0.80 | $2.00 | $0.01 | $0.06/min | $0.015/min |
| Reka Core (67B) | $2.00 | $6.00 | $0.02 | $0.08/min | $0.02/min |

Reka Spark (1B) is no longer listed on the public price card. Edge local deployment is now documented through Hugging Face/vLLM with BSL 1.1 licensing; custom commercial terms, support, on-prem, and dedicated deployments still route through Reka.

Research pricing:

| Mode | Price |
|---|---|
| Reka Research (standard) | $25 per 1,000 requests |
| Reka Research (Parallel Thinking) | $35 to $60 per 1,000 requests |

Dedicated on-prem deployments and Spark licensing price through direct contact with Reka sales.

Prices verified 2026-06-09 via [docs.reka.ai/pricing](https://docs.reka.ai/pricing), the [Reka Edge product page](https://reka.ai/reka-edge), and the [Reka Edge launch announcement](https://reka.ai/news/reka-edge-frontier-level-edge-intelligence-for-physical-ai).

**No free tier is documented.** Reka runs pay-as-you-go with no upfront commitment. Usage is billed after consumption.

## Against the alternatives

| | Reka Core | Claude Opus 4.7 | Gemini 3.1 Pro | OpenAI frontier models |
|---|---|---|---|---|
| **Video understanding** | Native long-context (hours) | None | Native, chunked extraction | None native |
| **Image understanding** | Yes | Yes | Yes | Yes |
| **Audio understanding** | Flash/Core listed | No | Yes | Yes |
| **API input $/MTok** | $2 | $5 | $1.25 (standard context) | Undisclosed tier |
| **API output $/MTok** | $6 | $25 | $10 | Undisclosed tier |
| **On-prem option** | Yes (dedicated) | No | Limited (Vertex AI) | No |
| **Consumer product** | None | claude.ai | gemini.google.com | chatgpt.com |
| **Best viewed as** | Multimodal video specialist | Reasoning + coding specialist | Google-stack integrator | Generalist default |

## Failure modes

- **No consumer chat interface.** Reka is API-first. Teams wanting a ChatGPT-style UI need to build it or pick a different provider.
- **Smaller ecosystem.** Fewer third-party tools, SDKs, and community templates than OpenAI, Anthropic, or Google. Integration work is more DIY.
- **Behind on pure text reasoning benchmarks.** Core's multimodal strength does not translate to chart-topping text-only scores. Claude Opus 4.7 and OpenAI frontier models lead those categories.
- **Edge licensing is not Apache/MIT.** Reka Edge weights are available, but BSL 1.1 and the $1M annual-revenue commercial threshold make licensing a procurement issue.
- **Core/Flash/Edge naming can confuse buyers.** The homepage emphasizes Reka Edge 2 and physical-AI infrastructure, while the API docs list public chat models as `reka-flash` and `reka-edge` / `reka-edge-2603`; verify model IDs from the Get Models API before production.
- **No documented free tier.** Unlike OpenAI, Anthropic, or Google, there is no free monthly quota to evaluate Core before billing begins. Expect to set up billing from day one.
- **Research product pricing can surprise.** Parallel Thinking scales from $35 to $60 per 1,000 requests based on depth. Budget for the high end when enabling the feature.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-06-09 against [docs.reka.ai/pricing](https://docs.reka.ai/pricing), the [Reka models docs](https://docs.reka.ai/chat/models), the [Reka Edge product page](https://reka.ai/reka-edge), the [Reka Edge launch announcement](https://reka.ai/news/reka-edge-frontier-level-edge-intelligence-for-physical-ai), and the [Reka homepage](https://reka.ai/).

## FAQ

**Is Reka free to use?**
No free tier is currently documented. Reka runs pay-as-you-go API pricing with no upfront commitment. Expect to configure billing before issuing the first request.

**What is Reka's flagship model?**
The older flagship framing was Reka Core, still priced at $2 input / $6 output per 1M tokens. The current public site emphasizes Reka Edge 2 and physical-AI infrastructure, so buyers should choose based on workload: Edge for local/visual/physical AI, Flash for balanced API work, Core for heavier multimodal reasoning.

**What is Reka Edge?**
A 7B-class vision-language model optimized for on-device physical AI, robotics, vehicles, cameras, and embedded systems. It is available through the API and through Hugging Face/vLLM local deployment, with BSL 1.1 licensing and a free commercial grant below $1M annual revenue.

**How does Reka compare to Claude or Gemini?**
Reka's strength is native long-context video understanding and on-prem deployment. [Claude](/tools/claude/) Opus 4.7 leads agentic coding and text reasoning. [Gemini](/tools/gemini/) 3.1 Pro integrates deeply with Google Workspace. Pick Reka when video is central and you need on-prem or dedicated infrastructure.

**Can I fine-tune Reka models?**
Reka Edge weights are available, but the license is BSL 1.1 rather than permissive Apache/MIT. For broad open-weight fine-tuning under more permissive terms, compare [Llama](/tools/llama/), [Qwen](/tools/qwen/), [DeepSeek](/tools/deepseek/), [GLM](/tools/glm/), or [Mistral AI](/tools/mistral-ai/).

**Does Reka offer on-prem deployment?**
Yes. Dedicated and on-prem options are available through enterprise contracts. This is a genuine differentiator versus API-only frontier labs like OpenAI and Anthropic. Contact Reka sales for terms.

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/)
- **Alternatives:** [Claude](/tools/claude/) · [ChatGPT](/tools/chatgpt/) · [Gemini](/tools/gemini/) · [Mistral AI](/tools/mistral-ai/) · [DeepSeek](/tools/deepseek/) · [Cohere](/tools/cohere/) · [Kimi](/tools/kimi/) · [Qwen](/tools/qwen/) · [GLM](/tools/glm/) · [Yi](/tools/yi/) · [Llama](/tools/llama/)
