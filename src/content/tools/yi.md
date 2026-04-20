---
type: tool
slug: yi
title: Yi (01.AI)
tagline: Kai-Fu Lee's open-weight LLM family from 01.AI, now frozen after the March 2025 pivot away from pre-training.
category: ai-research
secondary_categories: [ai-chatbots, ai-coding]
company: 01.AI
url: https://www.01.ai/
github_url: https://github.com/01-ai/Yi
pricing_model: open-source
price_range: "Free (open-weight); Yi-Lightning ~$0.14/M tokens"
status: active
launched: 2023-11
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: irregular
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 5
  value: 7
  moat: 3
  longevity: 3
tags: [open-source, llm, kai-fu-lee, chinese-ai, yi-34b, yi-lightning, open-weight, 01ai, frozen]
seo_title: "Yi (01.AI): Frozen Model Family, Pricing & Review (April 2026)"
meta_description: "Yi is 01.AI's open-weight LLM family, frozen after the March 2025 pre-training pivot. Yi-Lightning ~$0.14/M tokens via third parties. 01.AI now resells DeepSeek-based enterprise AI."
author: "aipedia.wiki Editorial"
best_for:
  - researchers using Yi-34B-200K for long-context experiments on fixed weights
  - self-hosting bilingual Chinese-English workloads on Apache 2.0 Yi-Coder
  - budget API use where freezing model state is acceptable
not_best_for:
  - production workloads needing ongoing model updates
  - teams expecting vendor roadmap or benchmark parity with current frontier
  - new deployments where frozen-model risk outweighs cost savings
quick_answer: >-
  Yi is 01.AI's open-weight LLM family, now frozen. In March 2025, 01.AI stopped pre-training and pivoted to reselling DeepSeek-based enterprise AI. Yi-34B and Yi-Lightning remain downloadable but receive no updates. Pick Yi only for frozen-model research or legacy bilingual work. Skip for new production.
---

# Yi (01.AI)

01.AI's open-weight LLM family, developed in Beijing by Kai-Fu Lee's lab starting March 2023. 01.AI achieved unicorn status within eight months and released Yi-34B, Yi-Lightning, and Yi-Coder across 2023 and 2024. Yi-Lightning briefly ranked joint third on Chatbot Arena at its October 2024 launch.

**Status as of April 2026: frozen.** In March 2025, 01.AI stopped pre-training large language models and pivoted the company to selling enterprise AI solutions built on DeepSeek's models. Kai-Fu Lee publicly stated that only Alibaba, Google, DeepSeek, and ByteDance have the user base to justify pre-training frontier models. Existing Yi weights remain on Hugging Face. No Yi-2 successor is planned.

## System Verdict

> **Pick Yi only for narrow legacy use cases.** Yi-34B-200K still works as a fixed open-weight baseline for research. Yi-Coder (Apache 2.0) runs as a small coding model for teams that have already integrated it. Yi-Lightning remains accessible through third-party gateways at ~$0.14/M tokens. For any of these, the model delivers what it promised at launch.
>
> **Skip it for new production.** The family receives no pre-training updates. [DeepSeek](/tools/deepseek/) now delivers what Yi-Lightning promised with an active roadmap. [Qwen](/tools/qwen/) offers a broader open-weight family under Apache 2.0 with monthly releases. 01.AI itself points enterprise buyers to DeepSeek, not Yi.
>
> **Who still uses Yi:** Academic researchers freezing a fixed baseline, hobbyists running Yi-34B-200K on existing infrastructure, teams with pre-existing Yi-Coder deployments. New projects should default elsewhere.

## Key Facts

| | |
|---|---|
| **Status** | Frozen since March 2025 pre-training pivot |
| **Current focus of 01.AI** | WanZhi platform reselling DeepSeek-based enterprise AI |
| **Highest-performing Yi model** | Yi-Lightning (October 2024) |
| **Flagship open-weight** | Yi-34B-200K (4K base, 200K extended context) |
| **Coding models** | Yi-Coder-9B and Yi-Coder-1.5B (Apache 2.0) |
| **Productivity app** | Wanzhi (Copilot-style, now DeepSeek-backed) |
| **Yi-Lightning pricing** | ~$0.14/M input, ~$0.14/M output (October 2024 direct pricing) |
| **Third-party access** | OpenRouter, AIMLAPI, other aggregators |
| **License (Yi-34B)** | Custom Yi License, commercial use with thresholds |
| **License (Yi-Coder)** | Apache 2.0 |
| **No successor planned** | Kai-Fu Lee confirmed strategy shift publicly |

Every data point above was verified on 2026-04-17. See Sources.

## What it actually is

A fixed LLM family in maintenance mode. The Yi weights remain downloadable on Hugging Face. Third-party API providers still host Yi-Lightning. 01.AI itself no longer develops new Yi generations.

The original product delivered strong results. Yi-34B beat Llama 2 at launch. Yi-Lightning ranked competitively on Chatbot Arena at $0.14/M tokens, one of the best price-per-quality ratios of its era. Yi-Coder is a capable open coding model under Apache 2.0.

The moats collapsed with the pivot. 01.AI's WanZhi platform now sells DeepSeek-based agents to enterprise customers in finance, video gaming, and legal verticals. Kai-Fu Lee's public stance is that pre-training below hundred-million-user scale is uneconomic. Yi is the artifact of that strategic reversal.

## When to pick Yi

- **Fixed-weight research baselines.** Academic papers benefit from models that will not change. Yi-34B-200K gives a citable frozen target.
- **Long-context experiments on older hardware.** Yi-34B-200K runs on a single A100 and handles 200K tokens for research prototypes.
- **Legacy Yi-Coder deployments.** Teams already using Yi-Coder-9B or Yi-Coder-1.5B under Apache 2.0 can continue running those models at no cost.
- **Bilingual Chinese-English tasks with fixed scope.** Yi's training still handles both languages competently for narrow-scope workloads.
- **Budget API through third-party gateways.** Yi-Lightning's ~$0.14/M pricing remains competitive on aggregator platforms.

## When to pick something else

- **Active open-weight development:** [Qwen](/tools/qwen/) releases monthly under Apache 2.0 across 119 languages.
- **Cheapest capable API with a roadmap:** [DeepSeek](/tools/deepseek/) delivers Yi-Lightning's value proposition with ongoing model updates.
- **Polished English product:** [ChatGPT](/tools/chatgpt/) or [Claude](/tools/claude/).
- **Open-weight coding leader:** [GLM](/tools/glm/) GLM-5.1 under MIT at SWE-Bench Pro leader tier.
- **Long-context frontier model:** [Kimi](/tools/kimi/) K2.5 at 256K free, or [Claude](/tools/claude/) Opus 4.7 at 1M tokens.

## Pricing

Yi-Lightning pricing via third-party aggregators. Open weights free on [Hugging Face 01-ai](https://huggingface.co/01-ai).

| Surface | Price | Notes |
|---|---|---|
| Yi-34B open weights | Free | Custom Yi License, commercial use with revenue thresholds |
| Yi-Coder-9B / 1.5B | Free | Apache 2.0, no commercial restrictions |
| Yi-Lightning (direct, historical) | ~$0.14/M input and output | October 2024 pricing via Kai-Fu Lee announcement |
| Yi-Lightning (third-party gateways) | Varies | OpenRouter, AIMLAPI, other aggregators |
| WanZhi enterprise platform | Custom | Now DeepSeek-backed, not Yi-based |

*Prices verified 2026-04-17 via [Hugging Face 01-ai](https://huggingface.co/01-ai), [01.AI Wikipedia](https://en.wikipedia.org/wiki/01.AI), and [SCMP coverage of 01.AI's DeepSeek pivot](https://www.scmp.com/tech/tech-trends/article/3303403/ai-entrepreneur-lee-kai-fu-bets-his-start-ups-future-deepseek-and-open-source). Direct 01.AI API access post-pivot is uncertain; third-party gateways remain the reliable path.*

## Against the alternatives

| | Yi (frozen) | DeepSeek V3 | Qwen3 open-weight | GLM-5.1 |
|---|---|---|---|---|
| **Active development** | No | Yes | Yes (monthly) | Yes |
| **Open weights** | Custom Yi License + Apache 2.0 (Coder) | V3 open | Apache 2.0 | MIT |
| **Current benchmarks** | Frozen at 2024 level | Frontier reasoning | Frontier multilingual | SWE-Bench Pro leader |
| **API price** | ~$0.14/M (third-party) | ~$0.28/M | ~$0.15-$0.325/M | $1.00/M |
| **Context window** | 200K (Yi-34B-200K) | 64K | 1M (Qwen3.6 Plus) | 200K |
| **Vendor roadmap** | None | Active | Active | Active |
| **Best viewed as** | Legacy research baseline | Cheap capable API | Open-weight multilingual | Open-weight coding leader |

## Failure modes

- **No further pre-training.** 01.AI confirmed in March 2025 that new Yi generations are not planned. The model family will never match current frontier benchmarks.
- **Yi-Lightning API availability is uncertain.** Direct 01.AI hosted access post-pivot is ambiguous. Third-party gateways remain the reliable path, but per-provider SLAs vary.
- **Yi License restrictions on Yi-34B.** Commercial deployment above certain revenue thresholds requires separate agreement. Apache 2.0 only covers the Yi-Coder variants.
- **Community support declining.** GitHub activity on the Yi repo has dropped following the pivot. Fewer third-party tutorials, fewer active contributors.
- **Enterprise path flows through DeepSeek.** 01.AI's WanZhi platform sells DeepSeek-backed agents. Customers buying from 01.AI are effectively buying DeepSeek with 01.AI's consulting layer.
- **Benchmark drift.** Yi-Lightning's late-2024 Chatbot Arena ranking does not reflect 2026 frontier scores. DeepSeek V3, Qwen3, and GLM-5.1 have all surpassed it.
- **Same Chinese-provider data residency posture as active vendors.** Without the benefit of an active roadmap to justify the tradeoff.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity; unweighted average). Longevity is scored low to reflect the frozen-model status. Last verified 2026-04-17 against [01.AI Wikipedia](https://en.wikipedia.org/wiki/01.AI), [SCMP interview with Kai-Fu Lee](https://www.scmp.com/tech/tech-trends/article/3303403/ai-entrepreneur-lee-kai-fu-bets-his-start-ups-future-deepseek-and-open-source), [TMTPost WanZhi coverage](https://en.tmtpost.com/post/7497277), and [Hugging Face 01-ai](https://huggingface.co/01-ai).

## FAQ

**Is 01.AI still developing Yi?**
No. In March 2025, 01.AI stopped pre-training large language models and pivoted to selling enterprise AI solutions built on DeepSeek's models. Existing Yi weights remain on Hugging Face. No Yi-2 is planned.

**Is Yi open source?**
Mixed. Yi-34B uses a custom Yi License that permits commercial use up to certain revenue thresholds. Yi-Coder-9B and Yi-Coder-1.5B ship under Apache 2.0 with no commercial restrictions.

**How does Yi-Lightning compare in 2026?**
At its October 2024 launch, Yi-Lightning ranked joint third on Chatbot Arena at ~$0.14/M tokens. Since then, DeepSeek V3 and similar models have passed it on both quality and price. Yi-Lightning remains accessible through third-party providers but is no longer a frontier model.

**Should I start a new project on Yi?**
Only if you specifically need a frozen-weight research baseline or already have Yi-Coder integrated. For new production work, [DeepSeek](/tools/deepseek/), [Qwen](/tools/qwen/), and [GLM](/tools/glm/) offer active roadmaps at similar or better price points.

**What is WanZhi?**
01.AI's enterprise AI platform, now built on DeepSeek rather than Yi. It serves finance, video gaming, and legal customers with custom agent deployments. Buyers get DeepSeek capability with 01.AI's consulting and integration layer.

## Sources

- [01.AI Wikipedia](https://en.wikipedia.org/wiki/01.AI): pivot timeline and current strategy
- [SCMP: Kai-Fu Lee bets on DeepSeek](https://www.scmp.com/tech/tech-trends/article/3303403/ai-entrepreneur-lee-kai-fu-bets-his-start-ups-future-deepseek-and-open-source): strategic reversal interview
- [TMTPost: 01.AI WanZhi platform](https://en.tmtpost.com/post/7497277): DeepSeek-based enterprise pivot
- [TechNode: Kai-Fu Lee predicts China AI endgame](https://technode.com/2025/03/21/01-ai-founder-kai-fu-lee-predicts-the-endgame-of-chinas-ai-models-names-deepseek-as-frontrunner/): public stance on pre-training economics
- [Hugging Face 01-ai](https://huggingface.co/01-ai): current weight availability
- [Yi open-source GitHub](https://github.com/01-ai/Yi): repo activity and community status
- [Yi: Open Foundation Models paper](https://arxiv.org/abs/2403.04652): original model architecture and training

## Related

- **Category:** [AI Research](/categories/ai-research/)
- **Comparisons:** [DeepSeek vs Yi](/comparisons/deepseek-vs-yi/) · [Qwen vs Yi](/comparisons/qwen-vs-yi/)
