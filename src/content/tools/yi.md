---
type: tool
slug: yi
title: Yi (01.AI)
tagline: Kai-Fu Lee's open-weight LLM family from 01.AI, kept on display while the company pivots into the WorldWise multi-agent enterprise platform.
category: ai-research
secondary_categories: [ai-chatbots, ai-coding]
company: 01.AI
url: https://www.01.ai/
github_url: https://github.com/01-ai/Yi
pricing_model: open-source
price_range: "Free (open-weight); Yi-Lightning ~$0.14/M tokens"
status: active
launched: 2023-11
last_updated: 2026-05-13
last_verified: 2026-05-13
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
  longevity: 4
facts:
  best_for:
    value: "Researchers using Yi-34B-200K as a frozen long-context baseline, teams running Yi-Coder under Apache 2.0, and enterprises that want WorldWise multi-agent deployments built on 01.AI's stack. 01.AI's May 2026 site still markets Yi-Lightning as a global SOTA MoE LLM while pushing WorldWise 2.5 as the enterprise headline."
    source: "https://www.01.ai/"
    source_label: "01.AI company site"
    source_id: yi-official
    verified_at: 2026-05-13
    volatility: medium
    confidence: medium
  pricing_anchor:
    value: "Yi open weights remain free on Hugging Face. Yi-Lightning historical direct pricing of ~$0.14/M tokens; current API access runs through third-party gateways. WorldWise 2.5 enterprise pricing is custom and quoted by 01.AI sales."
    source: "https://www.01.ai/"
    source_label: "01.AI company site"
    source_id: yi-official
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: medium
  watch_out_for:
    value: "01.AI's public framing now puts WorldWise 2.5 and multi-agent enterprise deployments ahead of new Yi training. Buyers should verify whether a workload genuinely needs the frozen Yi weights or whether the WorldWise platform path (and its third-party model backbones) is the better target."
    source: "https://www.01.ai/"
    source_label: "01.AI company site"
    source_id: yi-official
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: medium
tags: [open-source, llm, kai-fu-lee, chinese-ai, yi-34b, yi-lightning, open-weight, 01ai, worldwise]
seo_title: "Yi (01.AI): Frozen Models, WorldWise 2.5 Pivot & Review (May 2026)"
meta_description: "Yi is 01.AI's open-weight LLM family. The company has pivoted its consumer story to WorldWise 2.5 multi-agent enterprise deployments. Yi-Lightning ~$0.14/M tokens via third parties. Verified May 13, 2026."
author: "aipedia.wiki Editorial"
best_for:
  - researchers using Yi-34B-200K for long-context experiments on fixed weights
  - self-hosting bilingual Chinese-English workloads on Apache 2.0 Yi-Coder
  - enterprises evaluating the WorldWise 2.5 multi-agent platform from 01.AI
  - budget API use where freezing model state is acceptable
not_best_for:
  - production workloads needing ongoing Yi model updates
  - teams expecting Yi roadmap or benchmark parity with current frontier
  - new deployments where frozen-model risk outweighs cost savings
quick_answer: >-
  Yi is 01.AI's open-weight LLM family. In March 2025 the company stopped pushing Yi as the headline product and built the WorldWise enterprise platform (now version 2.5) around multi-agent deployments. Yi-34B and Yi-Lightning still appear on 01.AI's site and remain downloadable, but receive no major updates. Pick Yi for frozen-model research, legacy bilingual workloads, or as an entry point to WorldWise.
---

# Yi (01.AI)

01.AI's open-weight LLM family, developed in Beijing by Kai-Fu Lee's lab starting March 2023. 01.AI achieved unicorn status within eight months and released Yi-34B, Yi-Lightning, and Yi-Coder across 2023 and 2024. Yi-Lightning briefly ranked joint third on Chatbot Arena at its October 2024 launch.

**Status as of May 2026: maintenance Yi, headline WorldWise.** 01.AI's public site still markets Yi-Lightning as a "Global SOTA Mixture-of-Experts LLM" and keeps Yi open-source variants listed, but the strategic headline is the WorldWise enterprise LLM platform, now at version 2.5. Kai-Fu Lee has framed 2026 as the "critical year of multi-agent system enterprise deployment." Pre-training of new frontier Yi generations remains paused. Yi-2 is not announced.

## System Verdict

> **Pick Yi for narrow legacy use cases or as the on-ramp to WorldWise.** Yi-34B-200K still works as a fixed open-weight baseline for research. Yi-Coder (Apache 2.0) runs as a small coding model for teams that have already integrated it. Yi-Lightning remains accessible through third-party gateways at ~$0.14/M tokens. Enterprises that want 01.AI's WorldWise 2.5 multi-agent platform can buy that directly, with Yi positioned alongside the platform rather than as its primary model.
>
> **Skip it for new frontier production.** The family receives no major pre-training updates. [DeepSeek](/tools/deepseek/) delivers what Yi-Lightning promised with an active roadmap. [Qwen](/tools/qwen/) offers a broader open-weight family under Apache 2.0 with monthly releases. [Kimi](/tools/kimi/) K2.6 lands the open-weight agentic baseline that 01.AI has stepped back from.
>
> **Who still uses Yi:** Academic researchers freezing a fixed baseline, hobbyists running Yi-34B-200K on existing infrastructure, teams with pre-existing Yi-Coder deployments, and enterprises buying WorldWise 2.5 from 01.AI's go-to-market team.

## Key Facts

| | |
|---|---|
| **Status** | Yi family in maintenance since the March 2025 pre-training pause |
| **Current focus of 01.AI** | WorldWise enterprise LLM platform, version 2.5 in 2026 |
| **Highest-performing Yi model** | Yi-Lightning (October 2024) |
| **Flagship open-weight** | Yi-34B-200K (4K base, 200K extended context) |
| **Coding models** | Yi-Coder-9B and Yi-Coder-1.5B (Apache 2.0) |
| **Enterprise platform** | WorldWise 2.5 multi-agent system, "Super Employee" agent products, CEO-led go-to-market |
| **Yi-Lightning pricing** | ~$0.14/M input, ~$0.14/M output (October 2024 direct pricing) |
| **Third-party access** | OpenRouter, AIMLAPI, other aggregators |
| **License (Yi-34B)** | Custom Yi License, commercial use with thresholds |
| **License (Yi-Coder)** | Apache 2.0 |
| **No Yi-2 announced** | Kai-Fu Lee publicly favors a small set of pre-training frontier labs |

Every data point above was verified on 2026-05-13. See Sources.

## What it actually is

A fixed LLM family paired with an enterprise platform. The Yi weights remain downloadable on Hugging Face. Third-party API providers still host Yi-Lightning. 01.AI itself spends its 2026 product energy on the WorldWise multi-agent enterprise platform.

The original Yi product delivered strong results. Yi-34B beat Llama 2 at launch. Yi-Lightning ranked competitively on Chatbot Arena at $0.14/M tokens, one of the best price-per-quality ratios of its era. Yi-Coder is a capable open coding model under Apache 2.0.

The strategic story has shifted twice. In March 2025 Kai-Fu Lee publicly argued that pre-training below hundred-million-user scale is uneconomic, and 01.AI moved consulting workloads onto DeepSeek-backed agent stacks. In 2026 the company packaged that pivot into WorldWise 2.5, a multi-agent enterprise platform sold directly by 01.AI's go-to-market organization. Yi sits beside that platform as a legacy artifact and an open-weight calling card.

## When to pick Yi

- **Fixed-weight research baselines.** Academic papers benefit from models that will not change. Yi-34B-200K gives a citable frozen target.
- **Long-context experiments on older hardware.** Yi-34B-200K runs on a single A100 and handles 200K tokens for research prototypes.
- **Legacy Yi-Coder deployments.** Teams already using Yi-Coder-9B or Yi-Coder-1.5B under Apache 2.0 can continue running those models at no cost.
- **Bilingual Chinese-English tasks with fixed scope.** Yi's training still handles both languages competently for narrow-scope workloads.
- **WorldWise 2.5 enterprise evaluation.** Buyers exploring 01.AI's multi-agent enterprise platform get Yi positioning as part of the package.
- **Budget API through third-party gateways.** Yi-Lightning's ~$0.14/M pricing remains competitive on aggregator platforms.

## When to pick something else

- **Active open-weight development:** [Qwen](/tools/qwen/) releases monthly under Apache 2.0 across 119 languages.
- **Cheapest capable API with a roadmap:** [DeepSeek](/tools/deepseek/) delivers Yi-Lightning's value proposition with ongoing model updates.
- **Polished English product:** [ChatGPT](/tools/chatgpt/) or [Claude](/tools/claude/).
- **Open-weight coding leader:** [GLM](/tools/glm/) GLM-5.1 under MIT at SWE-Bench Pro leader tier.
- **Open-weight agentic baseline:** [Kimi](/tools/kimi/) K2.6 Agent Swarm leads the open-weight agentic category that 01.AI has stepped away from.
- **Long-context frontier model:** [Claude](/tools/claude/) Opus 4.7 at 1M tokens, or Kimi K2.6 at 256K.

## Pricing

Yi-Lightning pricing via third-party aggregators. Open weights free on [Hugging Face 01-ai](https://huggingface.co/01-ai). WorldWise enterprise pricing is quoted directly by 01.AI.

| Surface | Price | Notes |
|---|---|---|
| Yi-34B open weights | Free | Custom Yi License, commercial use with revenue thresholds |
| Yi-Coder-9B / 1.5B | Free | Apache 2.0, no commercial restrictions |
| Yi-Lightning (direct, historical) | ~$0.14/M input and output | October 2024 pricing via Kai-Fu Lee announcement |
| Yi-Lightning (third-party gateways) | Varies | OpenRouter, AIMLAPI, other aggregators |
| WorldWise 2.5 enterprise platform | Custom | Multi-agent platform; CEO-led sales motion in 2026 |

*Prices verified 2026-05-13 via [01.AI company site](https://www.01.ai/), [Hugging Face 01-ai](https://huggingface.co/01-ai), [01.AI Wikipedia](https://en.wikipedia.org/wiki/01.AI), and [SCMP coverage of 01.AI's enterprise pivot](https://www.scmp.com/tech/tech-trends/article/3303403/ai-entrepreneur-lee-kai-fu-bets-his-start-ups-future-deepseek-and-open-source). Direct 01.AI API access post-pivot remains uncertain; third-party gateways are the reliable path for Yi-Lightning, while WorldWise 2.5 is a sales-led enterprise platform.*

## Against the alternatives

| | Yi (frozen) | DeepSeek V3 | Qwen3 open-weight | GLM-5.1 |
|---|---|---|---|---|
| **Active development** | No (WorldWise platform active) | Yes | Yes (monthly) | Yes |
| **Open weights** | Custom Yi License + Apache 2.0 (Coder) | V3 open | Apache 2.0 | MIT |
| **Current benchmarks** | Frozen at 2024 level | Frontier reasoning | Frontier multilingual | SWE-Bench Pro leader |
| **API price** | ~$0.14/M (third-party) | ~$0.28/M | ~$0.15-$0.325/M | $1.00/M |
| **Context window** | 200K (Yi-34B-200K) | 64K | 1M (Qwen3.6 Plus) | 200K |
| **Vendor roadmap** | None for new Yi; WorldWise 2.5 active | Active | Active | Active |
| **Best viewed as** | Legacy research baseline plus WorldWise on-ramp | Cheap capable API | Open-weight multilingual | Open-weight coding leader |

## Failure modes

- **No further pre-training of Yi.** 01.AI confirmed in March 2025 that new Yi generations are not planned, and the May 2026 site still positions WorldWise rather than a Yi-2 release. The model family will never match current frontier benchmarks.
- **Yi-Lightning API availability is uncertain.** Direct 01.AI hosted access post-pivot is ambiguous. Third-party gateways remain the reliable path, but per-provider SLAs vary.
- **Yi License restrictions on Yi-34B.** Commercial deployment above certain revenue thresholds requires separate agreement. Apache 2.0 only covers the Yi-Coder variants.
- **Community support declining.** GitHub activity on the Yi repo has dropped following the pivot. Fewer third-party tutorials, fewer active contributors.
- **Enterprise path flows through WorldWise.** 01.AI's WorldWise 2.5 platform is the company's go-to-market headline. Customers buying from 01.AI are mostly buying the agent platform, with Yi as a brand asset rather than the underlying frontier model.
- **Benchmark drift.** Yi-Lightning's late-2024 Chatbot Arena ranking does not reflect 2026 frontier scores. DeepSeek V3, Qwen3, GLM-5.1, and Kimi K2.6 have all surpassed it.
- **Same Chinese-provider data residency posture as active vendors.** Without the benefit of an active Yi roadmap to justify the tradeoff.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity; unweighted average). Longevity is scored low to reflect the frozen-model status of the Yi family, even though 01.AI as a company remains operational via WorldWise 2.5. Last verified 2026-05-13 against [01.AI company site](https://www.01.ai/), [01.AI Wikipedia](https://en.wikipedia.org/wiki/01.AI), [SCMP interview with Kai-Fu Lee](https://www.scmp.com/tech/tech-trends/article/3303403/ai-entrepreneur-lee-kai-fu-bets-his-start-ups-future-deepseek-and-open-source), [TMTPost WanZhi coverage](https://en.tmtpost.com/post/7497277), and [Hugging Face 01-ai](https://huggingface.co/01-ai).

## FAQ

**Is 01.AI still developing Yi?**
The Yi pre-training program has been on pause since March 2025. The company keeps Yi-Lightning and Yi open-source models listed on its site, but its 2026 product energy goes into WorldWise 2.5, an enterprise multi-agent platform. No Yi-2 is announced.

**Is Yi open source?**
Mixed. Yi-34B uses a custom Yi License that permits commercial use up to certain revenue thresholds. Yi-Coder-9B and Yi-Coder-1.5B ship under Apache 2.0 with no commercial restrictions.

**How does Yi-Lightning compare in 2026?**
At its October 2024 launch, Yi-Lightning ranked joint third on Chatbot Arena at ~$0.14/M tokens. Since then, DeepSeek V3, Qwen3, GLM-5.1, and Kimi K2.6 have passed it on both quality and price. 01.AI still labels it "Global SOTA MoE LLM" on the corporate site, but third-party benchmarks do not back that claim against current frontier models.

**Should I start a new project on Yi?**
Only if you specifically need a frozen-weight research baseline or already have Yi-Coder integrated. For new production work, [DeepSeek](/tools/deepseek/), [Qwen](/tools/qwen/), [GLM](/tools/glm/), and [Kimi](/tools/kimi/) offer active roadmaps at similar or better price points.

**What is WorldWise?**
01.AI's enterprise LLM platform, now at version 2.5. It packages multi-agent "Super Employee" deployments for business customers and is the headline product on 01.AI's 2026 corporate site. The platform is sold directly by 01.AI's go-to-market team and replaces the earlier WanZhi-branded enterprise effort as the company's commercial centerpiece.

## Sources

- [01.AI company site](https://www.01.ai/): WorldWise 2.5 positioning and Yi-Lightning marketing as of May 2026
- [01.AI Wikipedia](https://en.wikipedia.org/wiki/01.AI): pivot timeline and current strategy
- [SCMP: Kai-Fu Lee bets on DeepSeek](https://www.scmp.com/tech/tech-trends/article/3303403/ai-entrepreneur-lee-kai-fu-bets-his-start-ups-future-deepseek-and-open-source): strategic reversal interview
- [TMTPost: 01.AI WanZhi platform](https://en.tmtpost.com/post/7497277): original enterprise pivot coverage that preceded the WorldWise rebrand
- [TechNode: Kai-Fu Lee predicts China AI endgame](https://technode.com/2025/03/21/01-ai-founder-kai-fu-lee-predicts-the-endgame-of-chinas-ai-models-names-deepseek-as-frontrunner/): public stance on pre-training economics
- [Hugging Face 01-ai](https://huggingface.co/01-ai): current weight availability
- [Yi open-source GitHub](https://github.com/01-ai/Yi): repo activity and community status
- [Yi: Open Foundation Models paper](https://arxiv.org/abs/2403.04652): original model architecture and training

## Related

- **Category:** [AI Research](/categories/ai-research/)
