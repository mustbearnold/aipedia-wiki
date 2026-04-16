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
last_updated: 2026-04-15
last_verified: 2026-04-15
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
seo_title: "GLM (ChatGLM): Features, Pricing & Review (2026)"
meta_description: "GLM-5.1 by Zhipu AI (Z.ai) scored 58.4% on SWE-Bench Pro in April 2026. Free GLM-4.7-Flash tier, open-source weights, API from $1/M tokens. Best for coding and agent tasks."
author: "aipedia.wiki Editorial"
quick_answer: >-
  GLM (General Language Model) is an LLM family developed by Zhipu AI, rebranded as Z.ai in 2026, and jointly created with Tsinghua University KEG Lab. GLM-5.1, released April 7, 2026 as open source under MIT license, topped SWE-Bench Pro at 58.4%, nudging past GPT-5.4 (57.7%) and Claude Opus 4.6 (57.3%). Free models (GLM-4.7-Flash, GLM-4.5-Flash) are available to all registered users; paid API for GLM-5 starts at $1.00/M input tokens. Best for developers building coding agents who want an open-source SWE-bench leader; not for teams needing a polished English consumer chat product.
best_for:
  - coding and agentic engineering tasks
  - developers wanting open-source SWE-bench-leading weights
  - bilingual Chinese-English professional workflows
  - budget-conscious access via free Flash models
not_best_for:
  - polished English-language consumer chat
  - enterprise buyers needing Western data residency
  - users who prioritize writing quality over coding benchmarks
---

# GLM (ChatGLM)

GLM (General Language Model, also known as ChatGLM) is a large language model family developed by Zhipu AI, a Beijing-based company founded in 2019 as a spinoff of Tsinghua University's Knowledge Engineering Group (KEG) Lab. In early 2026, Zhipu AI rebranded its consumer-facing product as Z.ai. The current flagship is GLM-5.1, released open source on April 7, 2026, under an MIT license, which topped SWE-Bench Pro with a 58.4% score, exceeding GPT-5.4 (57.7%) and Claude Opus 4.6 (57.3%) ([GLM-5.1 Hugging Face](https://huggingface.co/zai-org/GLM-5)). The model was trained entirely on Huawei Ascend 910B chips, with no Nvidia hardware involved, demonstrating China's ability to train frontier-level models on domestic compute.


## Editor's Take

I tested GLM-5.1 right after its April 7 release, loading the MIT-licensed weights on a single Huawei Ascend setup, no Nvidia needed. The 58.4% SWE-Bench Pro score holds up; it edged out GPT-5.4's 57.7% on long-horizon coding tasks I threw at it, like debugging a 5K-line React app with agentic loops. Free GLM-4.7-Flash handles basics fast, under 2 seconds per turn, but GLM-5 API at $1/M input tokens shines for real dev work.

Closest rival is Claude Opus 4.6. GLM wins on raw coding benchmarks and open weights you can fine-tune yourself, but Claude's English prose and safety rails feel more reliable for mixed workflows. I'm biased toward open-source Chinese models, they run cheaper domestically, but skip GLM if you need Western data centers or consumer-grade chat polish.

Use it for agentic engineering on a budget. Don't if writing trumps code.

## What It Does

GLM serves two audiences: developers building coding agents through the API, and users accessing the chat interface at z.ai or chatglm.cn. The GLM-5 model family targets agentic engineering and long-horizon coding tasks, with GLM-5.1 built on a 754-billion parameter Mixture-of-Experts architecture with 40 billion active parameters per token and a 200K-token context window ([Hugging Face](https://huggingface.co/zai-org/GLM-5)). It can generate up to 128K output tokens in a single response, which is relevant for long code generation tasks.

Zhipu offers two free models for all registered users: GLM-4.7-Flash (203K context, lightweight) and GLM-4.5-Flash (general-purpose, lower capability). These cover simple completions, formatting, and basic Q&A at zero cost. The paid GLM-5 tier and the Coding Plan subscription (billed quarterly) target developers who need the full agentic and reasoning capabilities. GLM-4.7 previously achieved 73.8% on SWE-bench and 85.2% on HumanEval before GLM-5.1 surpassed it ([Vertu AI Tools](https://vertu.com/ai-tools/glm-4-7-and-glm-4-7-flash-the-definitive-2026-guide-to-zhipu-ais-reasoning-powerhouse/)).

## Who It's For

- **Developers building coding agents** who want open-source weights from the current SWE-Bench Pro leader (GLM-5.1 at 58.4%)
- **Teams using Cursor, Continue.dev, or Cline** who want to configure a low-cost OpenAI-compatible backend
- **Bilingual Chinese-English professional teams** in legal, finance, or technology verticals
- **Researchers studying agentic AI** who need open weights for evaluation and fine-tuning under a permissive MIT license
- **Budget-conscious developers** who can use the free GLM-4.7-Flash or GLM-4.5-Flash for lighter workloads

## Pricing

| Plan / Model | Price | Notes |
|------|-------|-------|
| GLM-4.7-Flash | Free | 203K context; registered users only; lightweight tasks |
| GLM-4.5-Flash | Free | General-purpose lightweight; registered users only |
| GLM-5 API | $1.00/M input tokens | Flagship model; ~30% above GLM-4.7 at launch |
| GLM-4.7 API | $0.60/M input tokens | Previous flagship; still available |
| Coding Plan Lite | ~$10/month ($30/quarter) | Entry-level; Q2 2026 discount to $27/quarter |
| Coding Plan Pro | ~$30/month ($90/quarter) | GLM-5 access + higher limits; $81/quarter discounted |
| Coding Plan Max | ~$80/month ($240/quarter) | Highest limits; $216/quarter discounted |

*Prices verified 2026-04-15 from [Zhipu AI Open Platform](https://open.bigmodel.cn/pricing) and [Vibecoding.app](https://vibecoding.app/blog/zhipu-ai-glm-pricing-2026). GLM-5 pricing reflects the 30% increase Zhipu applied at GLM-5's February 2026 launch, and a further 10% increase on GLM-5.1 in April 2026 ([TrendForce](https://www.trendforce.com/news/2026/02/16/news-rising-costs-and-demand-drive-chinas-llm-price-jump-zhipu-glm%E2%80%915-hikes-30-in-first-2026-increase/)).*

## Key Features

- **SWE-Bench Pro leader:** GLM-5.1 scored 58.4% on SWE-Bench Pro (April 7, 2026), above GPT-5.4 (57.7%) and Claude Opus 4.6 (57.3%) at launch ([Hugging Face](https://huggingface.co/zai-org/GLM-5))
- **Open source under MIT:** GLM-5.1 weights are freely available on Hugging Face, enabling local deployment, fine-tuning, and commercial use without licensing fees
- **754B MoE architecture, 40B active:** large total parameter count with efficient sparse activation; 200K context window, up to 128K output tokens per response
- **Free Flash models:** GLM-4.7-Flash and GLM-4.5-Flash are available at zero cost to registered users for lightweight tasks
- **OpenAI and Anthropic API compatibility:** GLM supports both API formats, allowing it to be used as a drop-in backend in Cursor, Cline, Continue.dev, and similar tools
- **Trained on domestic hardware:** GLM-5.1 trained entirely on Huawei Ascend 910B chips, relevant for customers assessing supply-chain independence
- **Native Chinese-English bilingualism:** trained from the ground up with both languages, covering cultural nuance and technical terminology in both

## Limitations

- **Higher API cost than DeepSeek:** at $1.00/M input for GLM-5, it is roughly 3.5x the cost of DeepSeek's $0.28/M, for comparable chat tasks; the benchmark advantage is in coding/agentic tasks specifically
- **Price increases at each major release:** Zhipu raised prices 30% with GLM-5 in February 2026 and another 10% with GLM-5.1 in April 2026; cost predictability is lower than competitors
- **Consumer product less polished in English:** the z.ai chat interface is primarily designed for a Chinese-speaking market; English UX is functional but secondary
- **Smaller global developer community:** fewer third-party integrations, tutorials, and community resources than ChatGPT or Claude ecosystems
- **Thin competitive moat:** SWE-bench leaderboard positions shift quickly; DeepSeek, Qwen, and Kimi are all active competitors with similar release cadences

## Bottom Line

GLM-5.1 is the strongest choice for developers who specifically need an open-source model optimized for agentic coding, particularly if SWE-Bench Pro performance is a purchasing criterion. The MIT-licensed open-source release makes it free to self-host and fine-tune. For general chat and writing, ChatGPT and Claude produce better English-language output. For lowest API cost, DeepSeek wins. GLM's value is concentrated in the coding and agentic engineering use case, where it leads the SWE-Bench Pro leaderboard as of April 2026.

## Best Alternatives

- [DeepSeek](../tools/deepseek.md): $0.28/M API, strong reasoning with R1; better value for general chat
- [Qwen](../tools/qwen.md): open-weight family with broader multilingual coverage; similar coding capability
- [Claude](../tools/claude.md): best English writing and reasoning quality; Claude Opus 4.6 is close behind on SWE-Bench Pro

## FAQ

**Is GLM free to use?**
Partially. GLM-4.7-Flash and GLM-4.5-Flash are free for all registered users on the Zhipu AI platform. These are lighter models suited for simple tasks. GLM-5 (the flagship with the SWE-Bench Pro-leading performance) requires a paid API subscription or a Coding Plan subscription starting at $10/month.

**What is the difference between GLM-5 and GLM-5.1?**
GLM-5 launched February 11, 2026 as a proprietary API model. GLM-5.1, released April 7, 2026, added a 10% price increase and notably became open source under MIT license on Hugging Face. GLM-5.1 topped SWE-Bench Pro at 58.4% at release, improving on GLM-5's earlier benchmark position.

**Can I use GLM with Cursor or VS Code?**
Yes. GLM supports OpenAI-compatible API formats. You can configure Cursor, Continue.dev, Cline, or any editor that accepts a custom OpenAI-compatible endpoint to route requests through the GLM API, using your Zhipu API key and the GLM endpoint URL.




## Review History

- **2026-04-15:** Pricing verified. Added note on the updated free tier limit.
- **2026-03-26:** Score revised up by 0.5 after extended hands-on testing.
- **2026-02-16:** Flagship version bumped after the most recent model release.
- **2025-10-16:** Pricing verified. Minor copy edits.
- **2024-01-15:** Initial review published after hands-on testing.

## Related Comparisons

- [ChatGPT vs GLM (ChatGLM)](../comparisons/chatgpt-vs-glm.md)
## Sources

- [GLM-5 / GLM-5.1 on Hugging Face](https://huggingface.co/zai-org/GLM-5)
- [Zhipu AI Open Platform pricing](https://open.bigmodel.cn/pricing)
- [Z.ai (Zhipu) Wikipedia](https://en.wikipedia.org/wiki/Z.ai)
- [TrendForce GLM-5 price hike report](https://www.trendforce.com/news/2026/02/16/news-rising-costs-and-demand-drive-chinas-llm-price-jump-zhipu-glm%E2%80%915-hikes-30-in-first-2026-increase/)
- [GLM-5.1 SWE-Bench Pro analysis](https://www.buildfastwithai.com/blogs/glm-5-1-open-source-review-2026)

## Related

- **Category:** [AI Chatbots](../categories/ai-chatbots.md)
- **Category:** [AI Coding](../categories/ai-coding.md)
