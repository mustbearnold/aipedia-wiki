---
type: tool
slug: reka
title: Reka
tagline: Multimodal LLM family with native long-context video understanding. Core is flagship; Flash and Edge serve cheaper and on-device use cases. $110M unicorn round in 2025 backed by NVIDIA and Snowflake.
category: ai-chatbots
secondary_categories: [ai-research]
company: Reka AI
url: https://reka.ai
pricing_model: paid
price_range: "$0.05-$6/MTok"
status: active
launched: 2022
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: quarterly
seo_title: "Reka: Features, Pricing & Review (2026)"
meta_description: "Reka ships Core, Flash, Edge, and Spark multimodal LLMs with native video, image, and audio. Core is $2/$6 per MTok. Edge (7B) launched March 2026 for on-device physical AI. API-only with on-prem deployment options. Unicorn valuation after $110M round."
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
tags: [multimodal-llm, video-understanding, enterprise-ai, reka, foundation-model]
best_for:
  - long-context video analysis and question answering
  - on-device and edge multimodal inference
  - enterprise AI with on-prem or dedicated deployment
  - multimodal apps needing text + image + audio + video in one model
  - cost-sensitive API workloads where Claude or GPT pricing is prohibitive
not_best_for:
  - consumer chat (no polished ChatGPT-style interface)
  - the absolute top of reasoning benchmarks (Claude Opus and GPT-5.4 lead)
  - image or video generation (Reka understands media, does not create it)
quick_answer: >-
  Reka is a multimodal LLM lab shipping a four-tier lineup: Core (flagship), Flash, Edge, and Spark. Pick it for long-context video understanding and on-prem enterprise deployments where Claude and GPT cannot go. Skip it for consumer chat or when you need best-in-benchmark reasoning.
price_history:
  - date: 2026-04-18
    plan: "Reka Core API"
    price: "$2 / $6 per MTok"
    note: "Verified via docs.reka.ai/pricing. Image $0.02, video $0.08/min, audio $0.02/min."
  - date: 2026-03-01
    plan: "Reka Edge (7B)"
    price: "On-device pricing via partners"
    note: "New Edge model announced March 2026 for physical AI and on-device vision-language."
---

# Reka

Reka is a multimodal LLM research lab founded in 2022 by veterans from DeepMind, Google Brain, Meta, and Baidu. The flagship Core model accepts text, image, audio, and video in one unified stack. Reka ships Flash, Edge, and Spark as smaller variants covering cost-sensitive API, on-device, and ultra-low-latency use cases.

Reka's real moat is native long-context video understanding. Where most LLMs rely on chunked frame extraction, Reka models process hours of video directly. On published benchmarks, Core beats Gemini Ultra 59.3% to 54.7% on video perception (Perception-Test), and the March 2026 Edge release outperforms other 7B vision-language models on MLVU and MMVU.

The company hit unicorn status in 2025 with a $110M round led by NVIDIA and Snowflake. That backing signals hyperscaler interest in Reka's on-prem and dedicated deployment story, which sets it apart from API-only rivals.

## System Verdict

> **Pick Reka if your workload centers on video understanding, on-device multimodal inference, or enterprise deployments that must stay on-prem.** Core's four-modality context window handles hours of video natively at prices well below Claude Opus. Edge (7B, March 2026) runs on-device for physical AI, robotics, and privacy-sensitive embedded use. The on-prem and dedicated-deployment option is genuinely rare among frontier labs.
>
> **Skip it if you need consumer-grade chat, top-of-benchmark reasoning, or image/video generation.** Reka has no ChatGPT-style consumer product. On pure text reasoning, [Claude](/tools/claude/) Opus 4.7 and GPT-5.4 Pro lead. Reka also understands media but does not generate it, so image and video creation workflows need a separate tool.
>
> **Who pays which tier:** Spark at $0.05 per MTok for high-volume embedded use, Flash at $0.80 input / $2 output per MTok for balanced production workloads, Core at $2 input / $6 output per MTok for the heaviest multimodal reasoning, Edge via on-device licensing through partners, Research via flat $25-$60 per 1,000 request pricing for grounded search workflows.

## Key Facts

| | |
|---|---|
| **Flagship model** | Reka Core (67B, multimodal: text + image + audio + video) |
| **Model lineup** | Core · Flash (21B) · Edge (7B, March 2026) · Spark (1B) |
| **Research product** | Reka Research (flat-rate per 1,000 requests) |
| **Video understanding** | Native long-context, hours of video without chunking |
| **Benchmark leads** | Core beats Gemini Ultra on Perception-Test video QA |
| **API pricing** | Core: $2 in / $6 out per MTok · Flash: $0.80 / $2 · Spark: $0.05 / $0.05 |
| **Multimodal surcharges** | Image $0.005-$0.02 · Video $0.01-$0.08/min · Audio $0.005-$0.02/min |
| **Research pricing** | $25 per 1,000 standard requests · $35-$60 with Parallel Thinking |
| **Deployment options** | API, Python SDK, HTTP · dedicated and on-prem available |
| **Free tier** | None documented. Pay-as-you-go with no upfront costs. |
| **Founded / HQ** | 2022, Sunnyvale CA |
| **Funding** | $110M round 2025, $1B+ valuation, backed by NVIDIA and Snowflake |

## What it actually is

A four-tier foundation-model family sold primarily through API. Core handles heavy multimodal reasoning, Flash targets balanced cost and quality, Edge fits in 7B for on-device inference, and Spark runs at 1B for ultra-low-latency embedded work.

Reka Research is a separate product. It charges a flat rate per 1,000 requests and ships a Parallel Thinking mode for higher-quality answers at premium pricing. Think of it as a grounded search layer sitting on top of the chat models.

The deployment story is the real differentiator. Reka offers on-prem and dedicated-instance contracts that let regulated enterprises keep weights and inference inside their own infrastructure. Claude and GPT do not match this cleanly.

## When to pick Reka

- **Long-context video analysis.** Hours of video in one forward pass, no manual frame extraction or chunked summarization scaffolding. Core leads Gemini Ultra on Perception-Test.
- **On-device and physical AI.** Edge (7B) is optimized for robotics, cameras, and embedded systems where cloud round-trips are unacceptable. Announced March 2026.
- **Enterprise on-prem deployment.** Regulated industries that cannot ship data to a third-party API get dedicated or on-prem options here. Rare among frontier-class labs.
- **Cost-sensitive multimodal API workloads.** Core at $2 in / $6 out per MTok sits well below [Claude](/tools/claude/) Opus 4.7's $5/$25 for comparable multimodal tasks.
- **Grounded research workflows.** Reka Research's flat per-1,000-request pricing can be more predictable than token-based chat billing for research agents.

## When to pick something else

- **Consumer chat:** [ChatGPT](/tools/chatgpt/), [Claude](/tools/claude/), or [Gemini](/tools/gemini/). Reka ships developer APIs, not a polished consumer UI.
- **Top-of-benchmark reasoning:** [Claude](/tools/claude/) Opus 4.7 leads agentic coding and long-form reasoning; [Gemini](/tools/gemini/) 3.1 Pro leads Google-stack integration.
- **Image or video generation:** Reka understands media, does not create it. Use Midjourney, Veo 3, or Kling.
- **Open weights for fine-tuning:** [Llama](/tools/llama/), [Qwen](/tools/qwen/), [DeepSeek](/tools/deepseek/), [Mistral AI](/tools/mistral-ai/), [Kimi](/tools/kimi/), [GLM](/tools/glm/), or [Yi](/tools/yi/). Reka weights are not openly distributed.
- **Enterprise chatbot with heavy Google Workspace integration:** [Gemini](/tools/gemini/) 3.1 Pro. Reka has no Workspace hooks.

## Pricing

Chat API pricing via [docs.reka.ai/pricing](https://docs.reka.ai/pricing):

| Model | Input ($/MTok) | Output ($/MTok) | Image | Video | Audio |
|---|---|---|---|---|---|
| Reka Spark (1B) | $0.05 | $0.05 | $0.005 | $0.01/min | $0.005/min |
| Reka Flash (21B) | $0.80 | $2.00 | $0.01 | $0.06/min | $0.015/min |
| Reka Core (67B) | $2.00 | $6.00 | $0.02 | $0.08/min | $0.02/min |

Research pricing:

| Mode | Price |
|---|---|
| Reka Research (standard) | $25 per 1,000 requests |
| Reka Research (Parallel Thinking) | $35 to $60 per 1,000 requests |

Edge (7B) and dedicated on-prem deployments price through direct contact with Reka sales.

Prices verified 2026-04-18 via [docs.reka.ai/pricing](https://docs.reka.ai/pricing) and the [Reka Edge launch announcement](https://reka.ai/news/reka-edge-frontier-level-edge-intelligence-for-physical-ai).

**No free tier is documented.** Reka runs pay-as-you-go with no upfront commitment. Usage is billed after consumption.

## Against the alternatives

| | Reka Core | Claude Opus 4.7 | Gemini 3.1 Pro | GPT-5.4 Pro |
|---|---|---|---|---|
| **Video understanding** | Native long-context (hours) | None | Native, chunked extraction | None native |
| **Image understanding** | Yes | Yes | Yes | Yes |
| **Audio understanding** | Yes | No | Yes | Yes |
| **API input $/MTok** | $2 | $5 | $1.25 (standard context) | Undisclosed tier |
| **API output $/MTok** | $6 | $25 | $10 | Undisclosed tier |
| **On-prem option** | Yes (dedicated) | No | Limited (Vertex AI) | No |
| **Consumer product** | None | claude.ai | gemini.google.com | chatgpt.com |
| **Best viewed as** | Multimodal video specialist | Reasoning + coding specialist | Google-stack integrator | Generalist default |

## Failure modes

- **No consumer chat interface.** Reka is API-first. Teams wanting a ChatGPT-style UI need to build it or pick a different provider.
- **Smaller ecosystem.** Fewer third-party tools, SDKs, and community templates than OpenAI, Anthropic, or Google. Integration work is more DIY.
- **Behind on pure text reasoning benchmarks.** Core's multimodal strength does not translate to chart-topping text-only scores. Claude Opus 4.7 and GPT-5.4 Pro lead those categories.
- **No open weights.** If you need to fine-tune or self-host from model weights, Reka is not the answer. Use [Llama](/tools/llama/), [Qwen](/tools/qwen/), or [Mistral AI](/tools/mistral-ai/).
- **Edge licensing is partner-gated.** The March 2026 Edge 7B model routes through partner integrations for on-device deployment. Direct self-serve access is less mature than the main API.
- **No documented free tier.** Unlike OpenAI, Anthropic, or Google, there is no free monthly quota to evaluate Core before billing begins. Expect to set up billing from day one.
- **Research product pricing can surprise.** Parallel Thinking scales from $35 to $60 per 1,000 requests based on depth. Budget for the high end when enabling the feature.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-18 against [docs.reka.ai/pricing](https://docs.reka.ai/pricing), the [Reka Edge launch announcement](https://reka.ai/news/reka-edge-frontier-level-edge-intelligence-for-physical-ai), the [Reka Core tech report](https://publications.reka.ai/reka-core-tech-report.pdf), and the [$110M funding coverage](https://techfundingnews.com/reka-110-million-funding-multimodal-ai-enterprise/).

## FAQ

**Is Reka free to use?**
No free tier is currently documented. Reka runs pay-as-you-go API pricing with no upfront commitment. Expect to configure billing before issuing the first request.

**What is Reka's flagship model?**
Reka Core (67B parameters), a multimodal model that accepts text, image, audio, and video. It beats Gemini Ultra on Perception-Test video question answering and ships at $2 input / $6 output per MTok.

**What is Reka Edge?**
A 7B vision-language model announced March 2026, optimized for on-device physical AI, robotics, and embedded systems. It outperforms other 7B vision-language models on MLVU and MMVU video benchmarks. Pricing routes through partners for on-device licensing.

**How does Reka compare to Claude or Gemini?**
Reka's strength is native long-context video understanding and on-prem deployment. [Claude](/tools/claude/) Opus 4.7 leads agentic coding and text reasoning. [Gemini](/tools/gemini/) 3.1 Pro integrates deeply with Google Workspace. Pick Reka when video is central and you need on-prem or dedicated infrastructure.

**Can I fine-tune Reka models?**
Reka weights are not openly distributed. Fine-tuning happens through Reka's enterprise channel, not via Hugging Face or self-serve. For open-weight fine-tuning, use [Llama](/tools/llama/), [Qwen](/tools/qwen/), [DeepSeek](/tools/deepseek/), or [Mistral AI](/tools/mistral-ai/).

**Does Reka offer on-prem deployment?**
Yes. Dedicated and on-prem options are available through enterprise contracts. This is a genuine differentiator versus API-only frontier labs like OpenAI and Anthropic. Contact Reka sales for terms.

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/)
- **Alternatives:** [Claude](/tools/claude/) · [ChatGPT](/tools/chatgpt/) · [Gemini](/tools/gemini/) · [Mistral AI](/tools/mistral-ai/) · [DeepSeek](/tools/deepseek/) · [Cohere](/tools/cohere/) · [Kimi](/tools/kimi/) · [Qwen](/tools/qwen/) · [GLM](/tools/glm/) · [Yi](/tools/yi/) · [Llama](/tools/llama/)
