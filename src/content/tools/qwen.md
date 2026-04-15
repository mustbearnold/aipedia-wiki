---
type: tool
slug: qwen
title: Qwen
tagline: Alibaba's open-weight LLM family covering chat, coding, vision, and reasoning across 100+ languages.
category: ai-chatbots
secondary_categories: [ai-coding, ai-research]
company: Alibaba Cloud
url: https://qwen.ai/
pricing_model: freemium
price_range: "Free (open weights) / API from $0.23/M tokens"
status: active
launched: 2023-09
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
  utility: 9
  value: 10
  moat: 5
  longevity: 8
tags: [open-weights, alibaba, multilingual, coding, vision, reasoning, qwen3, api, chinese-llm]
seo_title: "Qwen: Features, Pricing & Review (2026)"
meta_description: "Qwen is Alibaba's open-weight LLM family. Qwen3 72B rivals frontier models like GPT-5.4 on benchmarks; API starts at $0.23/M tokens. 119 languages, coding, vision, and reasoning models included."
author: "aipedia.wiki Editorial"
quick_answer: >-
  Qwen is Alibaba Cloud's family of open-weight large language models covering text, code, vision, math, and reasoning, with models ranging from 600M to 235B parameters. The flagship Qwen3-235B-A22B matched DeepSeek-R1 and Gemini 2.5 Pro on reasoning and coding benchmarks at its April 2025 release; current comparisons are against GPT-5.4 and Claude Opus 4.6. Alibaba Cloud API access starts at $0.23/M tokens for Qwen 2.5 72B; best for developers who want open-weight frontier performance they can self-host or access cheaply, not for teams needing a polished consumer chat product with strong English-only focus.
best_for:
  - - multilingual applications (119 languages)
  - developers wanting open weights to self-host
  - coding and math workloads
  - cost-sensitive API usage
not_best_for:
  - - users wanting a polished consumer chat app
  - teams needing enterprise compliance guarantees
  - workloads where Alibaba data residency is a concern
---

# Qwen

Qwen (pronounced "chwen") is Alibaba Cloud's series of open-weight large language models, developed by the Qwen team inside Alibaba. The family spans text generation, code, vision-language, math, and reasoning, with models from 600M to 235B parameters. Qwen3, released April 29, 2025, is the current flagship generation, pre-trained on approximately 36 trillion tokens across 119 languages ([Qwen blog](https://qwenlm.github.io/blog/qwen3/)). By late 2025 the series had expanded to Qwen3.5 and Qwen3.6 Plus, with Qwen3.6 Plus supporting a 1M-token context window and agentic capabilities suited for complex coding and research workflows ([Alibaba Cloud Blog](https://www.alibabacloud.com/blog/qwen3-6-plus-towards-real-world-agents_603005)).

## What It Does

Qwen covers multiple modalities through specialized sub-families. The core text models (Qwen3, Qwen 2.5) handle general chat, summarization, translation, and long-document analysis across 119 languages, with context windows up to 128K tokens for most sizes. Qwen2.5-Coder, released in two sizes (7B on September 19, 2024, and 32B on November 11, 2024), is a dedicated code model covering 338 programming languages with a 131K token context window and competitive HumanEval and SWE-bench scores ([Qwen GitHub](https://github.com/QwenLM/Qwen3)). As of April 2026, Qwen3-Coder-Next (80B MoE with 3B active parameters) is the newer agentic coding model, scoring roughly 70.6 to 71.3% on SWE-bench. Qwen-VL handles vision-language tasks, including image understanding, OCR, and document analysis. QwQ is a reasoning-focused model in the Qwen family, designed for step-by-step chain-of-thought similar to DeepSeek-R1.

Qwen3 introduced hybrid thinking/non-thinking modes, letting users trade latency for reasoning depth. The 235B-parameter MoE flagship (Qwen3-235B-A22B) activates only 22B parameters per inference, keeping it cost-efficient while matching or exceeding Gemini 2.5 Pro and DeepSeek-R1 on coding and math benchmarks at release.

## Who It's For

- **Multilingual product teams** building applications in 119 languages, especially Chinese, Japanese, Korean, Arabic, and European languages
- **Developers wanting cost-efficient API access** to a frontier-tier model at $0.23-$0.325/M input tokens
- **Self-hosters** who want to run capable models locally; sizes from 0.5B (single CPU) to 72B (4x A100) available
- **Coding and math teams** using Qwen2.5-Coder or Qwen3 with thinking mode for complex technical tasks
- **Researchers** needing an open-weight baseline competitive with closed models for comparison studies

## Pricing

| Plan | Price | Notes |
|------|-------|-------|
| Open Weights (HuggingFace) | Free | Self-host any model; 0.5B to 235B available |
| Qwen 2.5 72B (Alibaba API) | $0.23/M input, ~$0.90/M output | Competitive frontier model |
| Qwen3.5 Plus (Alibaba API) | $0.26/M input, $1.56/M output | Feb 2026 release, text + image + video input |
| Qwen3.6 Plus (Alibaba API) | $0.325/M input, $1.95/M output | 1M context, agentic coding |
| Batch Invocation | 50% off real-time price | Available for supported models |
| Qwen-Turbo | $0.0004/K input, $0.0012/K output | Fast, lightweight tasks |

*Prices verified 2026-04-15 from [Alibaba Cloud Model Studio](https://www.alibabacloud.com/help/en/model-studio/model-pricing) and [OpenRouter](https://openrouter.ai/qwen/qwen3.6-plus).*

## Key Features

- **119-language multilingual support:** pre-trained on data covering 119 languages and dialects, with strong performance in Chinese, Japanese, Korean, Arabic, and major European languages ([Qwen Blog](https://qwenlm.github.io/blog/qwen3/))
- **Hybrid thinking/non-thinking modes:** Qwen3 models can switch between fast response and extended chain-of-thought reasoning within the same model, without needing separate model deployments
- **Open weights with commercial license:** model weights released on HuggingFace under permissive licenses, enabling local deployment and fine-tuning
- **Qwen2.5-Coder 32B:** dedicated code model, 131K context, covers 338 programming languages; competitive on HumanEval and SWE-bench
- **Qwen3.6 Plus 1M context:** the latest release supports 1 million token context for entire-codebase and long-document workflows
- **Vision-language (Qwen-VL):** image, document, and screenshot understanding; trained on multimodal data from the start
- **Efficient MoE architecture:** Qwen3-235B activates only 22B parameters per token, making frontier-scale inference affordable
- **Multiple inference providers:** available via Alibaba Cloud, Together AI, DeepInfra, OpenRouter, and self-hosting

## Limitations

- **Consumer chat product is minimal:** qwen.ai does not offer the same polished consumer experience as ChatGPT or Claude; primarily an API and open-weight resource
- **Data residency concerns:** Alibaba Cloud is a Chinese company; enterprise buyers in regulated industries need to evaluate accordingly
- **Thin moat:** open-weight releases mean competitors can reproduce and improve on Qwen's work continuously; leadership positions shift quickly
- **Documentation primarily in Chinese first:** official docs are often translated but some resources lag in English quality
- **Vision and multimodal less mature than text models:** Qwen-VL is capable but lags behind GPT-4o Vision in independent evaluations

## Bottom Line

Qwen is the strongest open-weight LLM family for multilingual and coding workloads as of April 2026. At $0.23/M input tokens for Qwen 2.5 72B, it delivers frontier-adjacent performance at a price that undercuts most closed models by 5-10x. Teams building multilingual products, or developers who want to self-host a capable model without per-token costs, get more options here than from any other single source. ChatGPT and Claude offer better product experience; DeepSeek offers a more focused (and in some benchmarks stronger) reasoning model at similar pricing.

## Best Alternatives

- [DeepSeek](../tools/deepseek.md): stronger reasoning benchmarks with R1; similarly priced API; more focused model family
- [ChatGPT](../tools/chatgpt.md): polished consumer product, broader integrations; 10x higher API cost
- [Claude](../tools/claude.md): best writing and reasoning quality; significantly more expensive

## FAQ

**Is Qwen open source?**
Yes. Qwen model weights are released publicly on HuggingFace under permissive licenses (varies by model size). You can download and run them locally, fine-tune them, or deploy them commercially without paying Alibaba, as long as you follow the license terms. The hosted API on Alibaba Cloud is separate and pay-per-token.

**How does Qwen3 compare to GPT-4o?**
Qwen3-235B-A22B-Thinking, the flagship reasoning variant, matches or exceeds GPT-4o on math and coding benchmarks as of its April 2025 release. For general chat, Qwen3 72B is competitive with GPT-4o at roughly 10x lower API cost. GPT-4o has better multimodal integration and a more polished interface.

**What is QwQ?**
QwQ (formally QwQ-32B) is a reasoning-focused model in the Qwen family, designed to perform extended chain-of-thought reasoning similar to DeepSeek-R1 and OpenAI o1. It was released as an open-weight model and is available on HuggingFace. Qwen3's built-in thinking mode largely overlaps with QwQ's capabilities in more recent releases.

## Sources

- [Qwen3 official blog post](https://qwenlm.github.io/blog/qwen3/)
- [Alibaba Cloud Model Studio pricing](https://www.alibabacloud.com/help/en/model-studio/model-pricing)
- [Qwen3.6-Plus announcement](https://www.alibabacloud.com/blog/qwen3-6-plus-towards-real-world-agents_603005)
- [OpenRouter Qwen3.6 Plus pricing](https://openrouter.ai/qwen/qwen3.6-plus)
- [Qwen Wikipedia](https://en.wikipedia.org/wiki/Qwen)

## Related

- **Category:** [AI Chatbots](../categories/ai-chatbots.md)
- **Category:** [AI Coding](../categories/ai-coding.md)
