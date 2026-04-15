---
type: tool
slug: yi
title: Yi (01.AI)
tagline: Kai-Fu Lee's open-weight LLM family from 01.AI, known for large context windows and competitive benchmark scores at low inference cost.
category: ai-research
company: 01ai
url: https://www.01.ai/
pricing_model: open-source
price_range: "Free (open-weight); Yi-Lightning API at $0.14/1M tokens"
status: active
launched: 2023-11
last_updated: 2026-04-15
last_verified: 2026-04-15
update_frequency: irregular
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 6
  value: 8
  moat: 4
  longevity: 4
tags: [open-source, llm, kai-fu-lee, chinese-ai, yi-34b, yi-lightning, open-weight, 01ai]
seo_title: "Yi (01.AI) LLM: Models, Pricing & Review (2026)"
meta_description: "Yi is 01.AI's open-weight LLM family from Kai-Fu Lee's lab. Yi-Lightning at $0.14/1M tokens, Yi-34B open-source. Honest 2026 review including the March 2025 pivot away from pre-training."
author: "aipedia.wiki Editorial"
best_for:
  - researchers and developers wanting a large open-weight model for self-hosting
  - teams needing very long context windows at low API cost
  - Chinese-English bilingual applications
not_best_for:
  - teams wanting active frontier model development (01.AI stopped pre-training in March 2025)
  - production workloads requiring guaranteed long-term support from the original lab
quick_answer: >-
  Yi is the open-weight LLM family developed by 01.AI, the Beijing-based AI startup founded by Kai-Fu Lee in March 2023. The Yi-34B model was notable at launch for beating Llama 2 on benchmarks, and Yi-Lightning (October 2024) offered competitive reasoning at just $0.14 per million tokens. However, in March 2025, 01.AI stopped pre-training large models and pivoted to selling AI business solutions built on DeepSeek's models. The Yi open-weight models remain available on Hugging Face and third-party APIs, but active flagship model development from 01.AI has ceased.
---

# Yi (01.AI)

Yi is the series of large language models developed by 01.AI, a Beijing-based AI startup founded in March 2023 by Kai-Fu Lee, the former president of Google China and co-founder of Sinovation Ventures. The company achieved unicorn status (valuation over $1 billion) within eight months of its founding ([Wikipedia](https://en.wikipedia.org/wiki/01.AI)). The Yi model family, especially Yi-34B, attracted significant developer interest at launch for its open-weight availability and competitive benchmarks against Llama 2. The flagship Yi-Lightning model (October 2024) offered frontier-tier reasoning at $0.14 per million tokens.

Important context for 2026: In March 2025, 01.AI stopped pre-training large language models, pivoting instead to selling tailored enterprise AI solutions built on DeepSeek's models ([Wikipedia](https://en.wikipedia.org/wiki/01.AI)). The existing Yi model weights remain downloadable and are hosted by third-party API providers, but 01.AI is no longer developing new foundation models under the Yi family.

## What It Does

The Yi model family provides open-weight text LLMs that can be self-hosted or accessed via third-party API providers. Key capabilities include long-context processing (Yi-34B-200K supports a 200,000-token context window), bilingual Chinese-English performance, and coding assistance via the Yi-Coder variant. Yi-Lightning was the highest-performance Yi model, ranked joint third among LLM providers on Chatbot Arena in late 2024 when it launched.

The enterprise-facing WorldWise platform from 01.AI offers custom AI agent solutions, but these now run on DeepSeek models rather than Yi.

## Who It's For

- **Researchers and academics** wanting a capable open-weight model for experiments and fine-tuning without API costs
- **Self-hosting developers** who need a 34B parameter model with 200K context that can run on their own infrastructure
- **Cost-sensitive API users** who want Yi-Lightning's quality at $0.14 per million tokens via third-party providers
- **Chinese-English bilingual applications** where Yi's Chinese-language training provides an edge

## Pricing

### Yi-Lightning (via third-party API providers)

| Provider | Input cost | Output cost |
|----------|-----------|-------------|
| 01.AI direct (via Kai-Fu Lee post, Oct 2024) | $0.14/1M tokens | $0.14/1M tokens |
| Third-party providers (OpenRouter, AIMLAPI, etc.) | Varies | Varies |

### Open-weight models (self-hosted)

| Model | Parameters | Context | License |
|-------|-----------|---------|---------|
| Yi-34B | 34B | 4K (base) / 200K (extended) | Yi License (commercial use allowed with restrictions) |
| Yi-6B | 6B | 4K | Yi License |
| Yi-Coder-9B | 9B | 128K | Apache 2.0 |
| Yi-Coder-1.5B | 1.5B | 128K | Apache 2.0 |

*Model weights available at [huggingface.co/01-ai](https://huggingface.co/01-ai). Yi-Lightning pricing sourced from [Kai-Fu Lee LinkedIn post, October 2024](https://www.linkedin.com/posts/kaifulee_01ais-new-model-yi-lightning-is-now-6-activity-7252115411469492224-PArf) and [Wikipedia](https://en.wikipedia.org/wiki/01.AI).*

## Key Features

- **Yi-34B-200K:** 34 billion parameters with a 200,000-token context window; one of the largest open-weight context windows available at launch in 2023-2024
- **Yi-Lightning:** Joint third on Chatbot Arena benchmarks at launch (October 2024); $0.14/1M tokens made it substantially cheaper than comparable Western models
- **Yi-Coder:** Coding-focused variant supporting 52 programming languages with 128K context; Yi-Coder-9B and Yi-Coder-1.5B both under Apache 2.0 license
- **Bilingual performance:** Trained with strong Chinese and English language data; competitive on both language benchmarks
- **Wanzhi productivity assistant:** Companion application for document and task workflows, comparable in concept to Microsoft Copilot ([Wikipedia](https://en.wikipedia.org/wiki/01.AI))
- **Hugging Face availability:** All open-weight models available for direct download and fine-tuning

## Limitations

- **Pre-training stopped March 2025:** 01.AI no longer develops new foundation models under Yi. The pivot to DeepSeek-based solutions means no new Yi generations are expected ([Wikipedia](https://en.wikipedia.org/wiki/01.AI))
- **Yi-Lightning API availability unclear post-pivot:** Direct API access via 01.AI's own platform status as of April 2026 is uncertain; primary access is through third-party API aggregators
- **No Yi-2 successor:** Unlike most frontier labs that iterate rapidly, Yi has had no announced successor since Yi-Lightning in October 2024
- **Yi license restrictions on large-scale commercial use:** Yi-34B uses a custom Yi License rather than Apache 2.0; commercial use above certain thresholds requires separate agreements
- **Chinese-company risk:** Same geopolitical and data-residency concerns as other Chinese AI providers
- **Community support declining:** GitHub activity and community engagement on the Yi repo have reduced following the pivot announcement

## Bottom Line

Yi-34B and Yi-Lightning were genuinely impressive models when they launched: competitive benchmarks, very long context windows, and among the lowest inference costs available. For self-hosting, Yi-34B-200K remains a solid choice for bilingual Chinese-English applications. Yi-Coder is a capable open coding model under Apache 2.0. However, 01.AI's March 2025 decision to stop pre-training means the model family is now in maintenance mode. If you are building on Yi today, plan for no further improvements from the original lab. For a continuously improving open-weight model, Llama 3 or Qwen 2.5 are better-supported alternatives. For cheap API access with frontier quality, DeepSeek now offers what Yi-Lightning promised, with more active development.

## Best Alternatives

- Llama 3 (Meta): Actively developed open-weight models with Apache 2.0 license; stronger community support
- Qwen 2.5 (Alibaba): Strong Chinese-English bilingual performance, active development, and competitive pricing
- DeepSeek: Where 01.AI itself now points for enterprise solutions; highly competitive pricing and active development
- [Claude](claude.md): If quality is the priority over self-hosting or cost

## FAQ

**Is Yi open-source?**
The Yi model weights are open-weight (freely downloadable), but not fully open-source in the Apache 2.0 sense. Yi-34B uses a custom Yi License; Yi-Coder-9B and Yi-Coder-1.5B use Apache 2.0. Commercial use of Yi-34B above certain usage thresholds requires a separate commercial agreement.

**Is 01.AI still developing new Yi models?**
No. In March 2025, 01.AI stopped pre-training large language models and pivoted to selling enterprise AI solutions built on DeepSeek's models. The existing Yi model weights remain available, but no new Yi generations are expected from 01.AI.

**How does Yi-Lightning compare to other cheap API models?**
When it launched in October 2024, Yi-Lightning was joint third on Chatbot Arena at $0.14 per million tokens, making it one of the best value models available. Since then, DeepSeek V3 and similar models have raised the bar on both quality and price. Yi-Lightning remains available via third-party providers but is no longer a frontier model.

## Sources

- [01.AI official site](https://www.01.ai/)
- [01.AI Wikipedia](https://en.wikipedia.org/wiki/01.AI)
- [Hugging Face 01-ai model page](https://huggingface.co/01-ai)
- [Yi open-source GitHub](https://github.com/01-ai/Yi)
- [Yi-Lightning pricing via Kai-Fu Lee on LinkedIn](https://www.linkedin.com/posts/kaifulee_01ais-new-model-yi-lightning-is-now-6-activity-7252115411469492224-PArf)
- [Yi: Open Foundation Models paper (arXiv)](https://arxiv.org/abs/2403.04652)
- [TechCrunch: 01.AI unicorn valuation](https://techcrunch.com/2023/11/05/valued-at-1b-kai-fu-lees-llm-startup-unveils-open-source-model/)

## Related

- **Category:** [AI Research](../categories/ai-research.md)
