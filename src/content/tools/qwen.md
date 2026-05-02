---
type: tool
slug: qwen
title: Qwen
tagline: Alibaba Cloud's open-weight LLM family. Qwen3.6 Plus (Apr 2, 2026) is the 1M-context proprietary flagship; Qwen3.6-35B-A3B (Apr 16, 2026) is the open-source sparse MoE with 3B active params under Apache 2.0.
category: ai-chatbots
secondary_categories: [ai-coding, ai-research]
company: Alibaba Cloud
url: https://qwen.ai/
pricing_model: freemium
price_range: "Free (open weights) / API from ~$0.15/M tokens"
status: active
launched: 2023-09
last_updated: 2026-05-02
last_verified: 2026-05-02
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
tags: [open-weights, alibaba, multilingual, coding, vision, reasoning, qwen3, api, chinese-llm]
seo_title: "Qwen: Features, Pricing & Review (April 2026)"
meta_description: "Qwen is Alibaba's open-weight LLM family. Qwen3.6 Plus flagship (April 2026) runs 1M context with agentic coding; Apache 2.0 weights across 119 languages. API from ~$0.15/M tokens."
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
  Qwen is Alibaba's open-weight LLM family. Qwen3.6 Plus (April 2026) runs 1M context with agentic coding. Apache 2.0 weights cover 119 languages. API from ~$0.15/M on smaller models. Pick it for multilingual or self-hosted deployment. Skip for polished consumer chat.
---

# Qwen

Alibaba Cloud's open-weight LLM family, developed by the Qwen team and spanning text, code, vision-language, math, and reasoning. Model sizes run from 0.6B up through the 235B-parameter MoE flagship and the trillion-parameter Qwen3-Max.

The current surface includes **Qwen3.6 Plus** (released April 2, 2026) as the flagship proprietary model with 1M native context and always-on chain-of-thought. **Qwen3-Max** is Alibaba's trillion-parameter closed model. Open-weight releases from the Qwen3 line ship under Apache 2.0 on [Hugging Face](https://huggingface.co/Qwen). Qwen3-Coder (480B MoE with 35B active) leads coding tasks among Alibaba releases.

**Qwen3.6-35B-A3B** (released April 16, 2026) is the newest open-source addition: a sparse MoE with 35B total params but only ~3B active per token via 256 experts (8 routed + 1 shared per forward pass). Native context is 262,144 tokens, extensible to ~1M via YaRN. Apache 2.0 licensed. Benchmarks aggregate ~82% of Claude Opus 4.7 performance, meaningful gap on agentic tool-use (62% on MCP Atlas) but close to parity on knowledge tasks. See the [full coverage](/news/2026-04-16-qwen-3-6-35b-a3b-release/).

## Recent developments

- **April 30, 2026:** [Alibaba-linked Metis showed an 8B Qwen3-VL-based agent can improve by calling tools less](/news/2026-04-30-alibaba-metis-agent-tool-use-hdpo/). The HDPO-trained model reduces blind tool calls from 98% to 2% in the project reports, making tool abstention a useful Qwen ecosystem signal.
- **April 19, 2026:** [Alibaba Amap debuts first embodied robot at Beijing Humanoid Robot Half Marathon](/news/2026-04-19-beijing-humanoid-robot-half-marathon-alibaba-abot/). Quadruped from Amap's new embodied-intelligence division, powered by Alibaba's ABot-World model (leads AGIbot World Challenge and World Arena benchmarks). Moves Alibaba from Qwen-as-foundation into first-party robotics alongside the model family.
- **April 16, 2026:** [Qwen3.6-35B-A3B released open-source](/news/2026-04-16-qwen-3-6-35b-a3b-release/) on Apache 2.0. Sparse MoE (35B total / 3B active) at ~82% of Claude Opus 4.7 aggregate performance; 62% on MCP Atlas tool-use.
- **April 2, 2026:** Qwen3.6 Plus released as the new proprietary flagship with 1M context, always-on CoT, and agentic coding emphasis.

## System Verdict

> **Pick Qwen if you need open-weight frontier models with multilingual reach.** Apache 2.0 across most sizes gives real commercial flexibility. 119-language coverage, strongest among major open-weight families. Qwen3-Coder handles agentic coding at frontier-adjacent quality. Cost-per-token on Alibaba Cloud undercuts OpenAI and Anthropic by 5-10x for equivalent capability.
>
> **Skip it if you want a polished consumer chat product or strict Western data residency.** qwen.ai is functional but developer-first, not ChatGPT-grade. Alibaba Cloud is a Chinese provider, which matters for regulated enterprise buyers. Competing open-weight families like [DeepSeek](/tools/deepseek/) publish stronger reasoning benchmarks on specific tasks.
>
> **Who uses which surface:** Hugging Face downloads for self-hosters, Alibaba Cloud Model Studio API for hosted use, OpenRouter or DeepInfra for neutral gateways, Qwen3-Coder for IDE coding backends, Qwen3.6 Plus for agentic 1M-context workloads.

## Key Facts

| | |
|---|---|
| **Flagship (proprietary)** | Qwen3.6 Plus (released April 2, 2026, 1M context) |
| **Trillion-parameter model** | Qwen3-Max (pricing cut up to 50% in 2026 price war) |
| **Open-weight line** | Qwen3 series on Apache 2.0 (0.6B through 235B MoE) |
| **Newest open-source MoE** | Qwen3.6-35B-A3B (April 16, 2026): 35B total, ~3B active, 262k native / 1M YaRN context, Apache 2.0 |
| **Coding flagship** | Qwen3-Coder (480B MoE, 35B active) |
| **Vision flagship** | Qwen3.5-Omni (multimodal) |
| **Language coverage** | 119 languages, pre-trained on ~36T tokens |
| **Architecture** | Hybrid thinking / non-thinking mode switchable |
| **Context window** | Up to 1M tokens on Qwen3.6 Plus |
| **Hosted API pricing** | From ~$0.15/M input (Qwen3-32B) to ~$0.70/M (Qwen3-235B Thinking) |
| **Qwen3-Max pricing** | ~$0.861/M input, ~$3.441/M output at launch, now reduced |
| **Batch invocation** | 50% off real-time pricing on supported models |

Every data point above was verified on 2026-04-17. See Sources.

## What it actually is

A multi-pronged model family covering four surfaces. Chat at [qwen.ai](https://qwen.ai/) and tongyi.aliyun.com. Hosted API through Alibaba Cloud Model Studio. Open-weight downloads on Hugging Face. Third-party gateway access through OpenRouter, Together AI, and DeepInfra.

The family splits into specialists. Core text models (Qwen3, Qwen3.5, Qwen3.6) handle general chat and reasoning. Qwen3-Coder is the coding-optimized variant. Qwen-VL and Qwen3.5-Omni handle vision and multimodal. QwQ-32B is a reasoning-first model in the chain-of-thought style.

The real moats are Apache 2.0 licensing on most open sizes, 119-language coverage no other major family matches, and Alibaba's willingness to run aggressive API pricing. Thin-margin cloud pricing combined with open weights gives teams a self-host escape valve most closed-model providers cannot offer.

## When to pick Qwen

- **Multilingual products.** 119-language training covers Chinese, Japanese, Korean, Arabic, and European languages at higher quality than English-centric families.
- **Self-hosted deployment.** Apache 2.0 weights run from single-CPU (0.6B) to 4x A100 (72B dense) to MoE clusters (235B, 480B Coder). No licensing fees.
- **Cost-sensitive API at frontier-adjacent quality.** Qwen3-32B at ~$0.15/M input undercuts closed-model alternatives 5-10x.
- **Agentic coding with 1M context.** Qwen3.6 Plus supports entire-codebase workflows without chunking, with always-on chain-of-thought.
- **Vision and video input.** Qwen3.5 Plus and Qwen3.6 Plus accept image and video in addition to text.
- **IDE backends via OpenAI-compatible API.** Drop Qwen3-Coder into Cursor, Continue.dev, or Cline.

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
| Open weights (Hugging Face) | Free | Apache 2.0 across most Qwen3 sizes |
| Qwen3-32B (dense) | $0.15/M input, $0.75/M output | Lightweight hosted tier |
| Qwen3-235B-A22B | $0.20-$1.20/M input, $1.00-$6.00/M output | Tiered by context length |
| Qwen3.5 Plus | $0.26/M input, $1.56/M output | Feb 2026, text + image + video input |
| Qwen3.6 Plus | $0.325/M input, $1.95/M output | 1M context, agentic coding |
| Qwen3-Max | From ~$0.861/M input after 50% cut | Trillion-parameter closed flagship |
| Qwen-Turbo | $0.0004/K input, $0.0012/K output | Fast, lightweight |
| Batch invocation | 50% off real-time | Supported models only |

*Prices verified 2026-04-17 via [Alibaba Cloud Model Studio pricing](https://www.alibabacloud.com/help/en/model-studio/model-pricing), [DeepInfra Qwen API pricing 2026](https://deepinfra.com/blog/qwen-api-pricing-2026-guide), and [OpenRouter Qwen3.6 Plus preview](https://openrouter.ai/qwen/qwen3.6-plus-preview). Qwen3-Max rates dropped as much as 50% during the 2026 China AI price war.*

## Against the alternatives

| | Qwen3.6 Plus | DeepSeek V3 | Claude Opus 4.7 | GLM-5.1 |
|---|---|---|---|---|
| **Open weights** | Apache 2.0 on open line | V3 open | Closed | MIT on GLM-5.1 |
| **Context window** | 1M | 64K | 1M | 200K |
| **Language coverage** | 119 | Chinese + English focus | Broad, English-strongest | Chinese + English |
| **API input price** | ~$0.325/M | ~$0.28/M | $5.00/M | $1.00/M |
| **Coding** | Qwen3-Coder 480B MoE | Strong | Claude Code CLI | SWE-Bench Pro leader |
| **Multimodal** | Text, vision, video input | Limited vision | Text + vision | Text-first |
| **Best viewed as** | Open-weight multilingual | Cheap capable API | Reasoning specialist | Open-weight coding leader |

## Failure modes

- **Consumer chat product is minimal.** qwen.ai is functional for testing but lacks ChatGPT-grade onboarding, memory, or ecosystem.
- **Data residency on Alibaba Cloud.** Enterprise buyers in regulated industries need to evaluate the Chinese-cloud posture. Self-hosting the Apache 2.0 weights is the workaround.
- **Thin moat on open-weight leaderboard.** DeepSeek, Kimi, GLM, and Qwen all iterate monthly. Leadership positions shift fast.
- **English documentation lag.** Official docs translate from Chinese first. Some resources trail the Chinese original by weeks.
- **Vision models lag best-in-class.** Qwen-VL and Qwen3.5-Omni are capable but trail GPT-4o Vision and Gemini 3.1 Pro on independent evaluations.
- **Hosted API rate limits vary by region.** Alibaba Cloud tier and regional load affect throughput. Production deployments should load-test.
- **Qwen3-Max tier pricing is complex.** Tiered-by-context pricing is harder to budget than flat rates. Batch discounts help.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity; unweighted average). Last verified 2026-04-17 against [Alibaba Cloud Model Studio pricing](https://www.alibabacloud.com/help/en/model-studio/model-pricing), [Qwen3 blog](https://qwenlm.github.io/blog/qwen3/), [Constellation Research Qwen 3.6 Plus coverage](https://www.constellationr.com/insights/news/alibabas-qwen-launches-new-flagship-llm-qwen-36-plus), and [DeepInfra Qwen API pricing 2026 guide](https://deepinfra.com/blog/qwen-api-pricing-2026-guide).

## FAQ

**Is Qwen open source?**
Largely yes. The Qwen3 open-weight line ships under Apache 2.0 on Hugging Face, covering sizes from 0.6B to 235B MoE. Download, self-host, fine-tune, and deploy commercially without licensing fees. Qwen3-Max and Qwen3.5/3.6 Plus are proprietary hosted models.

**What is Qwen3.6 Plus?**
Alibaba's current proprietary flagship, released April 2, 2026. Supports 1M native context, always-on chain-of-thought, and agentic coding. Priced at $0.325/M input and $1.95/M output through Alibaba Cloud Model Studio.

**What is Qwen3.6-35B-A3B (the April 16 open-source release)?**
The newest open-source addition. Sparse Mixture-of-Experts architecture: 35B total parameters, ~3B active per token via 256 experts (8 routed + 1 shared activated per forward pass). Native 262,144 token context, extensible to ~1M via YaRN. Apache 2.0 license permits full commercial use. Benchmarks aggregate around 82% of Claude Opus 4.7 performance at zero license cost. Gap widens on agentic tool-use (62% on MCP Atlas) but closes on knowledge tasks (97%). Runs locally via Ollama, LM Studio, Jan.ai, llama.cpp, vLLM. Day-0 support from AMD Instinct GPUs.

**How does Qwen3 compare to Claude Opus 4.7?**
Qwen3-235B-A22B and Qwen3.6 Plus are competitive on coding and math benchmarks but trail Claude Opus 4.7 on long-form English reasoning. At roughly 10-15x lower API cost, Qwen wins on value for multilingual and coding workloads.

**What is Qwen3-Coder?**
The coding-optimized branch, a 480B-parameter MoE with 35B active. Released as open-weight under Apache 2.0. Handles long-context agentic coding, competitive on HumanEval and SWE-bench against closed frontier models.

**Can I run Qwen locally?**
Yes. Sizes start at 0.6B for single CPU, with 7B and 14B practical on consumer GPUs. The 72B dense model runs on 4x A100. MoE variants require larger clusters. Quantized versions extend accessibility further.

## Sources

- [Qwen3 official blog](https://qwenlm.github.io/blog/qwen3/): architecture, training, 119-language coverage
- [Alibaba Cloud Model Studio pricing](https://www.alibabacloud.com/help/en/model-studio/model-pricing): current hosted rates
- [Constellation Research: Qwen 3.6 Plus launch](https://www.constellationr.com/insights/news/alibabas-qwen-launches-new-flagship-llm-qwen-36-plus): flagship release and features
- [DeepInfra Qwen API pricing guide 2026](https://deepinfra.com/blog/qwen-api-pricing-2026-guide): tiered pricing reference
- [OpenRouter Qwen3.6 Plus preview](https://openrouter.ai/qwen/qwen3.6-plus-preview): alternative gateway pricing
- [Hugging Face Qwen](https://huggingface.co/Qwen): open-weight model downloads
- [Qwen Wikipedia](https://en.wikipedia.org/wiki/Qwen): model family overview and release history

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/) · [AI Coding](/categories/ai-coding/)
- **Comparisons:** [ChatGPT vs Qwen](/compare/chatgpt-vs-qwen/) · [Claude vs Qwen](/compare/claude-vs-qwen/) · [DeepSeek vs Qwen](/compare/deepseek-vs-qwen/) · [Gemini vs Qwen](/compare/gemini-vs-qwen/) · [Mistral AI vs Qwen](/compare/mistral-ai-vs-qwen/)
