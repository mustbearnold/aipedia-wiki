---
type: tool
slug: glm
title: GLM (ChatGLM)
tagline: Zhipu AI's open-source LLM family, with GLM-5.1 topping SWE-Bench Pro at 58.4% as of April 2026.
category: ai-chatbots
secondary_categories: [ai-coding, ai-research]
company: Zhipu AI (Z.ai)
url: https://www.zhipuai.cn/en
pricing_model: freemium
price_range: "Free (GLM-4.7-Flash) / API from $1.00/M tokens (GLM-5)"
status: active
launched: 2022-08
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: quarterly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 7
  value: 8
  moat: 4
  longevity: 7
tags: [open-source, chinese-llm, coding, agentic, glm-5, zhipu-ai, z-ai, swe-bench, api]
seo_title: "GLM (ChatGLM): Features, Pricing & Review (April 2026)"
meta_description: "GLM-5.1 from Zhipu AI (Z.ai) open-sourced April 7, 2026 under MIT. Topped SWE-Bench Pro at 58.4%. Free GLM-4.7-Flash tier, API from $1/M tokens. Trained on Huawei Ascend."
author: "aipedia.wiki Editorial"
best_for:
  - agentic coding and SWE-bench-style tasks
  - developers wanting open-weight frontier coding models
  - bilingual Chinese-English professional workflows
  - teams evaluating domestic-hardware-trained models
not_best_for:
  - polished English consumer chat
  - teams needing Western data residency on hosted API
  - users prioritizing writing quality over coding
quick_answer: >-
  GLM is Zhipu AI's open LLM family, rebranded Z.ai in 2026. GLM-5.1 (April 7) opens under MIT and tops SWE-Bench Pro at 58.4%. Free Flash models, paid API from $1/M input. Pick it for open-weight agentic coding. Skip for English writing polish or cheapest reasoning API.
---

# GLM (ChatGLM)

Zhipu AI's open-source LLM family, developed in Beijing as a 2019 spinoff of Tsinghua University's KEG Lab. The consumer product rebranded to **Z.ai** in early 2026. The current flagship is **GLM-5.1**, released open-source under MIT license on April 7, 2026, and trained entirely on Huawei Ascend 910B chips with no Nvidia hardware.

GLM-5.1 topped SWE-Bench Pro at 58.4% at launch. The proprietary GLM-5 (February 2026) scored 77.8% on SWE-bench Verified, ahead of Gemini 3 Pro at 76.2% and within reach of Claude Opus 4.6 at 80.9%.

## System Verdict

> **Pick GLM if you need an open-weight coding model near the SWE-Bench frontier.** GLM-5.1 is freely downloadable under MIT, runs on consumer Hugging Face hardware or enterprise Ascend clusters, and matches or edges past Claude Opus 4.6 on specific coding benchmarks. OpenAI and Anthropic API compatibility makes it a drop-in backend for Cursor, Cline, and Continue.dev.
>
> **Skip it if you want a polished English consumer product or the cheapest API.** Z.ai chat is functional but secondary to the Chinese-language experience. [DeepSeek](/tools/deepseek/) undercuts GLM-5 by 3-4x on pure API cost for non-coding chat. Zhipu raised prices 30% at GLM-5's launch and another 10% at GLM-5.1, so cost predictability trails [Qwen](/tools/qwen/) and DeepSeek.
>
> **Who uses which surface:** Free Flash models for hobbyists and light tasks, GLM-5 API for production coding workloads, Coding Plan subscription (~$10 to $80/month) for IDE users, self-hosted GLM-5.1 weights for teams avoiding vendor lock-in.

## Key Facts

| | |
|---|---|
| **Flagship model** | GLM-5.1 (open-sourced April 7, 2026 under MIT) |
| **Proprietary flagship** | GLM-5 (released February 11, 2026) |
| **Architecture** | 744-754B MoE, ~40B active parameters per token |
| **Context window** | 200K tokens |
| **Max output** | 128K tokens per response |
| **SWE-Bench Pro** | 58.4% (GLM-5.1) · above GPT-5.4 at 57.7% and Claude Opus 4.6 at 57.3% |
| **SWE-bench Verified** | 77.8% (GLM-5) |
| **Training hardware** | Huawei Ascend 910B, MindSpore framework, zero Nvidia |
| **API pricing** | GLM-5 $1.00/M input · GLM-4.7 $0.60/M input |
| **Free tier** | GLM-4.7-Flash (203K context) and GLM-4.5-Flash, registered users |
| **License** | MIT on GLM-5.1 weights |

Every data point above was verified on 2026-04-17. See Sources.

## What it actually is

A single LLM family covering two audiences: developers calling the API or self-hosting weights, and consumers chatting at z.ai or chatglm.cn. The model family is optimized for agentic engineering and long-horizon coding, not generalist chat.

GLM-5.1 ships as open weights under MIT on [Hugging Face](https://huggingface.co/zai-org/GLM-5). That combination, MIT license plus frontier SWE-Bench scores, is rare. Most labs at this benchmark tier keep weights closed.

The real moats are the open-weight coding lead and the Huawei Ascend training stack. GLM is the first Chinese frontier model trained without Nvidia, which matters for customers evaluating supply-chain independence. The consumer chat product is secondary to that positioning.

## When to pick GLM

- **Agentic coding workloads.** GLM-5.1's 58.4% SWE-Bench Pro score is the current open-weight leader, edging past closed frontier models on that specific benchmark.
- **Cursor, Cline, or Continue.dev backend swap.** GLM supports OpenAI-compatible and Anthropic-compatible API formats. Drop-in replacement against paid Claude or GPT endpoints.
- **Self-hosted frontier coding.** MIT-licensed weights permit local deployment, fine-tuning, and commercial use without licensing fees.
- **Huawei Ascend infrastructure.** Enterprises on domestic Chinese compute get a native-stack option that does not require Nvidia.
- **Bilingual Chinese-English technical work.** Legal, finance, and engineering teams operating across both languages get trained-in-parallel fluency.

## When to pick something else

- **Cheapest API for general chat:** [DeepSeek](/tools/deepseek/) at ~$0.28/M input is 3-4x cheaper than GLM-5.
- **Polished English writing:** [Claude](/tools/claude/) Opus 4.7 or [ChatGPT](/tools/chatgpt/). GLM's English is functional, not best-in-class.
- **Broadest open-weight coverage:** [Qwen](/tools/qwen/). Apache 2.0 across more sizes, wider language coverage, more active monthly releases.
- **Google Workspace integration:** [Gemini](/tools/gemini/). GLM has no Workspace hooks.
- **Consumer-grade product polish:** [ChatGPT](/tools/chatgpt/) or [Claude](/tools/claude/). Z.ai chat is developer-adjacent, not consumer-first.

## Pricing

Subscription pricing via [Zhipu AI Open Platform](https://open.bigmodel.cn/pricing) and [bigmodel.cn pricing](https://bigmodel.cn/pricing).

| Plan / Model | Price | Notes |
|---|---|---|
| GLM-4.7-Flash | Free | 203K context, registered users, lightweight tasks |
| GLM-4.5-Flash | Free | General-purpose lightweight |
| GLM-5 API | $1.00/M input | Flagship, 30% increase at Feb 2026 launch, +10% on GLM-5.1 |
| GLM-4.7 API | $0.60/M input | Previous flagship, still available |
| Coding Plan Lite | ~$10/month | Entry IDE access, Q2 2026 discount to $27/quarter |
| Coding Plan Pro | ~$30/month | GLM-5 access, higher limits, $81/quarter discounted |
| Coding Plan Max | ~$80/month | Highest limits, $216/quarter discounted |

*Prices verified 2026-04-17 via [Zhipu AI Open Platform pricing](https://open.bigmodel.cn/pricing) and [Vibecoding pricing breakdown](https://vibecoding.app/blog/zhipu-ai-glm-pricing-2026). Zhipu raised GLM prices 30% in February 2026 and another 10% on the GLM-5.1 release.*

## Against the alternatives

| | GLM-5.1 | Claude Opus 4.7 | DeepSeek V3 | Qwen3.6 Plus |
|---|---|---|---|---|
| **Open weights** | MIT | Closed | Partial (V3 open) | Apache 2.0 |
| **SWE-Bench Pro** | 58.4% | 57.3% on 4.6 | Strong reasoning | Strong coding |
| **API input price** | $1.00/M | $5.00/M | ~$0.28/M | ~$0.325/M |
| **Context window** | 200K | 1M | 64K | 1M |
| **Training hardware** | Huawei Ascend | Nvidia | Nvidia | Nvidia + Alibaba silicon |
| **English polish** | Functional | Strongest | Moderate | Moderate |
| **Best viewed as** | Open-weight coding leader | Reasoning specialist | Cheap capable API | Open-weight multilingual |

## Failure modes

- **Price increases at each major release.** Zhipu raised API rates 30% at GLM-5 and 10% at GLM-5.1. Cost predictability is lower than at DeepSeek or Qwen.
- **Z.ai consumer UX lags.** The chat interface is functional in English but built for a Chinese-first audience. Menu labels, error messages, and onboarding trail ChatGPT or Claude.
- **Thin competitive moat.** SWE-Bench leaderboard positions shift monthly. DeepSeek, Qwen, and Kimi are all active challengers with comparable release cadence.
- **API cost undercut by DeepSeek.** At $1/M input, GLM-5 is ~3.5x DeepSeek's rate. The benchmark advantage is coding-specific; on general chat, DeepSeek wins on value.
- **Huawei Ascend training is a signal, not a benefit.** For most Western developers, it does not change the product. For Chinese enterprises it matters materially.
- **Third-party tutorials are thinner.** Smaller global developer community than ChatGPT or Claude. Fewer Stack Overflow threads, fewer YouTube walkthroughs.
- **Hosted API runs on Chinese infrastructure.** Western teams with strict data residency rules cannot use bigmodel.cn. Self-hosted weights are the workaround.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity; unweighted average). Last verified 2026-04-17 against [GLM-5.1 on Hugging Face](https://huggingface.co/zai-org/GLM-5), [Zhipu AI Open Platform pricing](https://open.bigmodel.cn/pricing), [Modem Guides GLM-5.1 benchmark coverage](https://www.modemguides.com/blogs/ai-news/glm-5-1-open-source-benchmarks-local-ai), and [TrendForce price-hike coverage](https://www.trendforce.com/news/2026/02/16/news-rising-costs-and-demand-drive-chinas-llm-price-jump-zhipu-glm%E2%80%915-hikes-30-in-first-2026-increase/).

## FAQ

**Is GLM free to use?**
Partially. GLM-4.7-Flash and GLM-4.5-Flash are free for registered users on the Zhipu AI platform. GLM-5 and GLM-5.1, the SWE-Bench leaders, require either a paid API ($1/M input) or a Coding Plan subscription starting at ~$10/month.

**What changed between GLM-5 and GLM-5.1?**
GLM-5 launched February 11, 2026 as a proprietary API. GLM-5.1 shipped April 7, 2026 with a 10% price increase and full open-source release under MIT license. GLM-5.1 also took the SWE-Bench Pro lead at 58.4%.

**Can I use GLM with Cursor or VS Code?**
Yes. GLM exposes OpenAI-compatible and Anthropic-compatible API formats. Set a custom endpoint in Cursor, Cline, Continue.dev, or any editor that accepts a custom OpenAI endpoint, using your Zhipu API key.

**What does "trained on Huawei Ascend" mean in practice?**
GLM-5 and GLM-5.1 were trained end-to-end on Huawei Ascend 910B chips with the MindSpore framework, with no Nvidia hardware. For most users the output is indistinguishable. For Chinese enterprises and compliance buyers, it is a supply-chain independence signal.

**Is GLM faster or slower than Claude or GPT?**
Inference latency depends on the deployment. Self-hosted GLM-5.1 on modern hardware runs within the same range as hosted Claude Sonnet or GPT-5.3. Hosted Z.ai API performance varies with regional load.

## Sources

- [GLM-5 / GLM-5.1 on Hugging Face](https://huggingface.co/zai-org/GLM-5): open-weight release, MIT license, benchmarks
- [Zhipu AI Open Platform pricing](https://open.bigmodel.cn/pricing): current API and Coding Plan rates
- [Modem Guides: GLM-5.1 Open Source](https://www.modemguides.com/blogs/ai-news/glm-5-1-open-source-benchmarks-local-ai): SWE-Bench Pro leaderboard details
- [TrendForce: China LLM price jump](https://www.trendforce.com/news/2026/02/16/news-rising-costs-and-demand-drive-chinas-llm-price-jump-zhipu-glm%E2%80%915-hikes-30-in-first-2026-increase/): 30% price increase at GLM-5 launch
- [Lushbinary GLM-5 developer guide](https://lushbinary.com/blog/glm-5-developer-guide-zhipu-ai-huawei-ascend-open-weight/): Huawei Ascend training stack
- [Z.AI Developer Documentation](https://docs.z.ai/guides/llm/glm-5): API and model reference

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/) · [AI Coding](/categories/ai-coding/)
- **Comparisons:** [ChatGPT vs GLM](/comparisons/chatgpt-vs-glm/) · [Claude vs GLM](/comparisons/claude-vs-glm/) · [DeepSeek vs GLM](/comparisons/deepseek-vs-glm/)
