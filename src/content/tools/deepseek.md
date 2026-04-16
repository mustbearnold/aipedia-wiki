---
type: tool
slug: deepseek
title: DeepSeek
tagline: Open-weight Chinese LLM lab offering frontier reasoning and chat at fractions of GPT-5.4 pricing.
category: ai-chatbots
secondary_categories: [ai-coding, ai-research]
company: DeepSeek
url: https://www.deepseek.com/
pricing_model: freemium
price_range: "Free (chat) / Usage-based (API from $0.28/M tokens)"
status: active
launched: 2023-07
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
  longevity: 7
tags: [open-weights, reasoning, chinese-llm, coding, math, api, free-tier, deepseek-v3, r1]
seo_title: "DeepSeek: Features, Pricing & Review (2026)"
meta_description: "DeepSeek V3.2 is the current flagship as of April 2026. API access starts at $0.28/M input tokens. Free chat interface. V4 expected late April 2026 but not yet released."
author: "aipedia.wiki Editorial"
quick_answer: >-
  DeepSeek is a Chinese AI lab that releases open-weight frontier models. As of April 15, 2026, DeepSeek-V3.2 remains the flagship general chat and coding model; DeepSeek-V4 has not yet launched (expected late April 2026 but has missed earlier target windows). DeepSeek-R1 (January 2025) is the reasoning model, matched or exceeded OpenAI o1 on AIME 2024 at launch; R2 has not been announced. The single biggest differentiator is cost: API access starts at $0.28 per million input tokens, roughly 9x cheaper than GPT-5.4. The chat interface at chat.deepseek.com is free with no declared usage cap. Best for developers and researchers who want frontier performance at minimal cost; not for users who need tight enterprise compliance or a polished product experience.
best_for:
  - developers seeking low-cost API access
  - math and coding tasks requiring reasoning
  - self-hosters running open weights locally
  - researchers needing an open-weight frontier baseline
not_best_for:
  - enterprise buyers needing SOC 2 / GDPR assurances
  - users who prefer a polished consumer product
  - workloads requiring guaranteed uptime SLAs
---

# DeepSeek

DeepSeek is a Chinese AI research lab (Hangzhou-based, founded under High-Flyer Capital Management) that develops and releases open-weight large language models. Its current flagship as of April 15, 2026 is DeepSeek-V3.2, a general chat and coding model. DeepSeek-R1 (released January 20, 2025) remains available as a standalone open-weight reasoning model. DeepSeek-V4 has not yet launched; it was expected in late April 2026 but has missed at least two earlier target windows, and a V4-Lite has been live-tested on API infrastructure since early April without a public release ([Gizchina](https://www.gizchina.com/ai/deepseek-v4-expected-to-launch-in-late-april-with-massive-parameter-scale)). Model weights for V3 and R1 are released publicly. The chat interface is free.

R1's January 2025 launch caused significant market attention when benchmarks showed it matching or exceeding OpenAI o1 on AIME 2024 math (79.8% vs 79.2%) and MATH-500 (97.3% vs 96.4%) at a fraction of the training cost ([ArXiv R1 paper](https://arxiv.org/abs/2501.12948)).


## Editor's Take

I tested DeepSeek's API and chat interface extensively over the past month, and the math is hard to ignore: $0.28 per million input tokens versus GPT-5.4's $2.50+ makes this a no-brainer for cost-conscious developers. V3.2 handles coding and reasoning tasks competently, though it's not faster than o1 on complex problems, it just costs a fraction as much. The free chat tier has no stated usage limits, which is genuinely unusual for a frontier model.

Where this falls apart is everywhere else. The web interface is clunky. API documentation has gaps. There's no SLA, no enterprise support, and the company's Chinese ownership creates compliance friction for regulated industries. V4 was supposed to ship by now and hasn't, which tracks with their pattern of missed timelines. If you're a startup or researcher who needs reasoning capability on a shoestring budget, DeepSeek-R1 is the obvious choice over Claude or o1. If you need reliability, polish, or a vendor your compliance team won't question, spend the extra money elsewhere.

## What It Does

DeepSeek provides two product layers: a free consumer chat interface at [chat.deepseek.com](https://chat.deepseek.com) and a pay-per-token API for developers. The chat interface exposes DeepSeek-V3.2 for standard chat and coding, plus a "DeepThink" mode backed by V3.2's integrated thinking capability, plus web search. The API gives developers access to both `deepseek-chat` (V3.2, non-thinking mode) and `deepseek-reasoner` (V3.2, thinking mode) endpoints, each with a 128K context window ([DeepSeek API Docs](https://api-docs.deepseek.com/quick_start/pricing)).

DeepSeek-Coder V2 is a separate open-weight model trained specifically for code generation and completion across 338 programming languages, competitive with GPT-4o on code benchmarks at its mid-2024 release. The V3.2 series now subsumes most of these capabilities in a unified model, but DeepSeek-Coder V2 remains available as a dedicated code model option for those who want it. No DeepSeek-Coder V3 has been announced as of April 15, 2026. V3.2 uses a Mixture-of-Experts architecture, meaning inference is efficient relative to its apparent capability level.

## Who It's For

- **Developers building on a budget** who want frontier-quality output at roughly 9x lower API cost than GPT-5.4
- **Researchers and ML engineers** who want open weights for fine-tuning, evaluation, or local deployment
- **Coders and math power users** who need step-by-step reasoning in DeepThink mode without paying for OpenAI o1
- **Self-hosters** running quantized versions locally via Ollama or similar inference runtimes
- **Teams in cost-sensitive markets** where API spend is a meaningful line item

## Pricing

| Plan | Price | Key Notes |
|------|-------|-----------|
| Chat (Free) | $0/month | V3.2 + DeepThink reasoning + web search; no declared usage cap |
| API - Cache Hit | $0.014/M input tokens | 90% discount on cached inputs; applies to both endpoints |
| API - Cache Miss | $0.28/M input tokens | Standard input rate; $0.42/M output tokens |
| API New Account | 5M free tokens | One-time grant on registration |

Prices verified 2026-04-15 from [DeepSeek API Docs](https://api-docs.deepseek.com/quick_start/pricing). Off-peak discounts (up to 75% on cached inputs) apply during 16:30-00:30 GMT. The `deepseek-chat` (non-thinking) and `deepseek-reasoner` (thinking) endpoints are priced identically on input; output tokens from the reasoner endpoint may include additional reasoning tokens billed at the same rate.

## Key Features

- **Free chat with frontier models:** chat.deepseek.com provides access to V3.2 and R1-style reasoning at no cost, no declared usage cap ([DeepSeek](https://chat.deepseek.com))
- **DeepThink reasoning mode:** step-by-step chain-of-thought visible in the UI; backed by V3.2's integrated thinking capability
- **Open weights:** V3 and R1 model weights released publicly, enabling local deployment and fine-tuning
- **128K context window:** both API endpoints support 128K tokens, sufficient for large codebases and long documents
- **DeepSeek-Coder V2:** dedicated code model released mid-2024, covers 338 programming languages, competitive on HumanEval; still available as a standalone open-weight option
- **Context caching:** 90% discount on cached inputs ($0.014/M), making repeated-prompt workloads very cheap
- **Web search integration:** available in the free chat interface for current information retrieval
- **Distilled models:** DeepSeek-R1-Distill variants (7B, 14B, 32B) are practical on consumer hardware

## Limitations

- **V4 is not yet released.** Expected late April 2026 but has missed earlier windows. V3.2 is the current API offering, not a new flagship. ([Atlas Cloud](https://www.atlascloud.ai/blog/ai-updates/what-is-deepseek-v4))
- **No R2 announced.** DeepSeek-R1 from January 2025 remains the standalone reasoning model. R2 has not been confirmed.
- **Data privacy concerns for enterprise.** DeepSeek is a Chinese company; enterprise buyers in regulated industries need to assess data residency and compliance risk carefully before using the API.
- **Thin moat.** Open-weight releases mean any well-funded lab can reproduce or build on DeepSeek's architecture, limiting competitive defensibility.
- **API availability fluctuations.** The service experienced heavy load and rate limiting in early 2025 after the R1 launch; stability has improved but is not guaranteed at scale.
- **Chat interface less polished.** Compared to ChatGPT or Claude, the UX is functional but minimal.
- **128K context only via API.** GPT-5.4 and Gemini 3.1 Pro offer longer context options.

## Bottom Line

DeepSeek is the best option for developers who want frontier-level chat and reasoning at the lowest available API cost as of April 2026. At $0.28/M input tokens, it undercuts GPT-5.4 by roughly 9x with comparable or better performance on math and coding benchmarks. V3.2 is the current flagship; V4 is expected but not yet available. For enterprise buyers needing compliance guarantees or teams that need a polished product experience, ChatGPT or Claude are safer choices. For cost-sensitive API usage or self-hosted deployment, nothing in the open-weight market comes close on the value-to-performance ratio.

## Best Alternatives

- [ChatGPT](../tools/chatgpt.md): polished product, broader integrations, better enterprise compliance; roughly 9x higher API cost
- [Claude](../tools/claude.md): strongest writing and reasoning quality, 1M token context window, better for long-document work; significantly more expensive
- [Qwen](../tools/qwen.md): another open-weight model family with strong coding; Qwen3 72B is competitive with comparable API pricing

## FAQ

**Is DeepSeek free?**
Yes. The chat interface at chat.deepseek.com is free with no declared usage limit, including DeepThink (reasoning) mode and web search. The API has a pay-per-token model but new accounts receive 5 million free tokens on registration.

**Is DeepSeek V4 out yet?**
No. As of April 15, 2026, DeepSeek V4 has not been released. V3.2 is the current API flagship. V4 is expected in late April 2026 but has missed at least two earlier target windows. V4-Lite has been observed in API testing since early April but no public release has been announced.

**How does DeepSeek R1 compare to OpenAI o1?**
When R1 launched in January 2025, it matched or slightly exceeded o1 on AIME 2024 (79.8% vs 79.2%) and MATH-500 (97.3% vs 96.4%). R1 is open-weight and available free via chat or at $0.28/M tokens via the `deepseek-reasoner` API endpoint, versus o1's significantly higher pricing. For general chat tasks, V3.2 (non-thinking mode) is more suitable than the reasoning-focused R1.

**Can I run DeepSeek locally?**
Yes. DeepSeek releases model weights publicly, and quantized versions can be run locally via Ollama, LM Studio, or similar inference tools. The full V3 model requires significant GPU memory; smaller distilled versions (DeepSeek-R1-Distill-7B, 14B, 32B) are practical on consumer hardware.

**What is the difference between deepseek-chat and deepseek-reasoner?**
`deepseek-chat` is the V3.2 non-thinking endpoint for standard chat and coding tasks. `deepseek-reasoner` is the V3.2 thinking endpoint that generates step-by-step chain-of-thought reasoning. Both cost $0.28/M input tokens (cache miss) and $0.014/M (cache hit). The reasoner endpoint is slower and produces more tokens, making it more expensive in practice for the same task.




## Related Guides

- [Best AI for Ad Copy (2026)](../use-cases/best-ai-for-ad-copy.md)
- [Best AI Tools Under $10/Month (2026)](../use-cases/best-ai-tools-under-10-month.md)
- [Best Free AI Tools (2026)](../use-cases/best-free-ai-tools.md)
- [Best Jasper Alternatives (2026)](../use-cases/jasper-alternatives.md)

## Related Comparisons

- [ChatGPT vs DeepSeek](../comparisons/chatgpt-vs-deepseek.md)
- [Claude vs DeepSeek](../comparisons/claude-vs-deepseek.md)
- [DeepSeek vs Gemini](../comparisons/deepseek-vs-gemini.md)
- [DeepSeek vs Mistral AI](../comparisons/deepseek-vs-mistral-ai.md)
- [DeepSeek vs Qwen](../comparisons/deepseek-vs-qwen.md)

## Review History

- **2026-04-15:** Pricing, flagship model, and feature claims verified against official sources.
- **2026-03-14:** Monthly verification pass. No material changes detected.
- **2024-01-15:** Initial review published.

## Sources

- [DeepSeek API Pricing Docs](https://api-docs.deepseek.com/quick_start/pricing)
- [DeepSeek-R1 ArXiv paper](https://arxiv.org/abs/2501.12948)
- [DeepSeek V4 expected late April 2026 - Gizchina](https://www.gizchina.com/ai/deepseek-v4-expected-to-launch-in-late-april-with-massive-parameter-scale)
- [DeepSeek V4 overview - Atlas Cloud](https://www.atlascloud.ai/blog/ai-updates/what-is-deepseek-v4)
- [DeepSeek Wikipedia](https://en.wikipedia.org/wiki/DeepSeek)

## Related

- **Category:** [AI Chatbots](../categories/ai-chatbots.md)
- **Category:** [AI Coding](../categories/ai-coding.md)
