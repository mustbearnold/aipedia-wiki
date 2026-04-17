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
  utility: 9
  value: 10
  moat: 5
  longevity: 7
tags: [open-weights, reasoning, chinese-llm, coding, math, api, free-tier, deepseek-v3, r1]
seo_title: "DeepSeek: Features, Pricing & Review (April 2026)"
meta_description: "DeepSeek V3.2 is the current flagship as of April 2026. API from $0.28/M input tokens. Free chat. V4 has slipped earlier target windows and is not yet public."
author: "aipedia.wiki Editorial"
best_for:
  - developers seeking low-cost API access
  - math and coding tasks requiring reasoning
  - self-hosters running open weights locally
  - researchers needing an open-weight frontier baseline
not_best_for:
  - enterprise buyers needing SOC 2 / GDPR assurances
  - users who prefer a polished consumer product
  - workloads requiring guaranteed uptime SLAs
quick_answer: >-
  DeepSeek is the cheapest credible frontier-grade LLM stack. V3.2 handles chat and coding at $0.28/M input tokens (9x cheaper than GPT-5.4); R1 handles reasoning. Pick for cost-sensitive API work or self-hosting; skip for regulated enterprise or polished consumer UX.
price_history:
  - date: 2025-01-20
    plan: "API"
    price: "$0.28/M input"
    note: "R1 launched and held baseline API pricing"
  - date: 2026-04-17
    plan: "API"
    price: "$0.28/M input"
    note: "Verified unchanged. Cache-hit rate $0.028/M."
---

# DeepSeek

Chinese AI lab founded under High-Flyer Capital Management in Hangzhou. Releases open-weight frontier models alongside a free chat interface and a pay-per-token API that undercuts GPT-5.4 by roughly 9x.

DeepSeek-V3.2 is the current API flagship as of April 2026. DeepSeek-R1 (released January 2025) remains the standalone reasoning model. V4 has missed at least two target windows and is not yet public.

## System Verdict

> **Pick DeepSeek if API cost is the hard constraint and frontier-class reasoning is the requirement.** At $0.28/M input tokens (cache miss) and $0.028/M (cache hit), it sits roughly 9x below GPT-5.4 and 5x below Claude Opus 4.7. R1 matched o1 on AIME 2024 at launch. V3.2 handles general chat, coding, and long-context work up to 128K tokens.
>
> **Skip it if compliance, polish, or uptime SLAs matter.** The Berlin Data Protection Authority flagged DeepSeek as non-compliant with GDPR in mid-2025, triggering DSA Article 16 notifications to Apple and Google. U.S. House Select Committee scrutiny over chip-export violations continues. EU enterprises under GDPR Article 44 and any U.S.-regulated industry should assume this is not deployable.
>
> **Who pays:** Free for chat at [chat.deepseek.com](https://chat.deepseek.com), API pay-per-token for developers. No consumer subscription. No enterprise SKU with SOC 2 or SLAs.

## Key Facts

| | |
|---|---|
| **Current flagship** | DeepSeek-V3.2 (general chat and coding) |
| **Reasoning model** | DeepSeek-R1 (open-weight, January 2025) |
| **V4 status** | Not yet released. Missed multiple target windows; expected late April 2026 |
| **Context window** | 128K tokens on API endpoints |
| **API endpoints** | `deepseek-chat` (non-thinking) · `deepseek-reasoner` (thinking) |
| **API pricing (cache miss)** | $0.28/M input · $0.42/M output |
| **API pricing (cache hit)** | $0.028/M input (90% discount) |
| **Off-peak discount** | Up to 75% on cached inputs · 16:30-00:30 GMT |
| **New account credit** | 5M free tokens on registration |
| **Chat interface** | Free · no declared usage cap · DeepThink + web search |
| **Open weights** | V3, V3.2, R1 on HuggingFace · Apache-compatible for V3 family |
| **Compliance posture** | Chinese company · GDPR concerns flagged by Berlin DPA · U.S. export-control scrutiny ongoing |

Every data point verified on 2026-04-17 against [DeepSeek API docs](https://api-docs.deepseek.com/quick_start/pricing).

## What it actually is

Two product layers on the same underlying models. A free chat interface at [chat.deepseek.com](https://chat.deepseek.com) runs V3.2 plus a DeepThink reasoning mode with web search. A pay-per-token API exposes `deepseek-chat` (non-thinking) and `deepseek-reasoner` (thinking) endpoints.

V3.2 uses Mixture-of-Experts architecture. Inference is efficient relative to its capability level. Both endpoints support 128K context.

The model weights for V3, V3.2, and R1 are public on HuggingFace. Distilled variants (R1-Distill 7B, 14B, 32B) run on consumer GPUs. Full V3.2 requires datacenter-class memory.

The moats are narrow. Open weights mean any well-funded lab can reproduce the architecture. The defensibility sits in training-data curation and inference-cost engineering, not in the model itself.

## When to pick DeepSeek

- **You need frontier-class reasoning on a tight API budget.** $0.28/M input is the cheapest credible rate from a model that can solve AIME or SWE-bench work.
- **You self-host.** V3 family weights are public. Quantized distills run on single consumer GPUs via Ollama or LM Studio.
- **You want repeatable-prompt workloads cheap.** Context caching drops cache-hit input tokens to $0.028/M (90% off).
- **You're benchmarking against an open-weight baseline.** R1's paper and weights are the reference point for cost-efficient reasoning.
- **You build in cost-sensitive markets.** The 9x delta vs GPT-5.4 is the product.

## When to pick something else

- **Enterprise compliance, SOC 2, GDPR:** [ChatGPT](/tools/chatgpt/) or [Claude](/tools/claude/). DeepSeek has open regulatory questions in EU and U.S. jurisdictions.
- **Polished consumer chat:** [ChatGPT](/tools/chatgpt/), [Claude](/tools/claude/), or [Gemini](/tools/gemini/). DeepSeek's web UI is functional but minimal.
- **Long-context over 128K:** [Claude Opus 4.7](/tools/claude/) or [Gemini 3.1 Pro](/tools/gemini/) at 1M tokens flat rate.
- **Open-weight with larger Western community:** [Llama](/tools/llama/) or [Qwen](/tools/qwen/) for alternate licensing and tooling.
- **Uptime SLAs:** [Mistral](/tools/mistral-ai/) or [Anthropic](/tools/claude/) offer contractual SLAs. DeepSeek does not.

## Pricing

API pricing via [api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing).

| Plan | Price | Who's it for |
|---|---|---|
| Chat (Free) | $0 | Any user · V3.2 + DeepThink + web search · no declared cap |
| API cache hit | $0.028/M input | Repeated-prompt workloads (RAG, agents) |
| API cache miss | $0.28/M input · $0.42/M output | Standard API calls |
| New account | 5M free tokens | One-time grant on registration |

*Prices verified 2026-04-17 via [DeepSeek API pricing](https://api-docs.deepseek.com/quick_start/pricing). Off-peak discounts of up to 75% on cached inputs apply 16:30-00:30 GMT. `deepseek-reasoner` billed at same per-token rate but generates extra reasoning tokens, so effective cost per task is higher than `deepseek-chat`.*

## Against the alternatives

| | DeepSeek V3.2 | GPT-5.4 | Claude Opus 4.7 |
|---|---|---|---|
| **Input price (per M tokens)** | $0.28 | ~$2.50 | $5 |
| **Output price (per M tokens)** | $0.42 | ~$10 | $25 |
| **Context window** | 128K | Undisclosed | 1M |
| **Open weights** | Yes (V3 family, R1) | No | No |
| **Self-hostable** | Yes | No | No |
| **SOC 2 / GDPR posture** | Open questions | Yes | Yes |
| **Consumer polish** | Functional | Strongest ecosystem | Strongest reasoning |
| **Best viewed as** | Cost-optimized API baseline | Generalist default | Reasoning specialist |

## Failure modes

- **V4 keeps slipping.** Expected in late April 2026 but missed at least two earlier target windows. Don't plan migrations around an unreleased model.
- **No R2 announced.** R1 (January 2025) remains the standalone reasoning product. Capability-wise it still holds, but the gap to Opus 4.7 on agentic coding is widening.
- **Regulatory posture is hostile in EU and U.S.** Berlin DPA has flagged the service as non-compliant with GDPR. House Select Committee reports cite export-control violations. Banking, healthcare, government, and most EU enterprise workloads cannot deploy this.
- **No SLA or uptime guarantee.** The service hit heavy rate-limiting during the January 2025 R1 launch spike. Stability has improved but is not contractually backed.
- **Chat UI is minimal.** No Projects, no Canvas, no GPT Store equivalent. DeepThink reasoning is visible but the surrounding product is utilitarian.
- **Thin moat.** Open-weight releases let any lab reproduce or fine-tune the architecture. Qwen, Llama, and Mistral Small 4 compete directly on cost-per-capability.
- **Reasoner output tokens multiply cost.** `deepseek-reasoner` bills at the same per-token rate but generates chain-of-thought tokens. Effective cost per completed task is meaningfully higher than `deepseek-chat`.
- **Data residency is China.** Chat conversations and API calls route through Chinese infrastructure. Even outside regulated industries, this is a disclosure burden.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against [DeepSeek API docs](https://api-docs.deepseek.com/quick_start/pricing), the [DeepSeek-R1 paper](https://arxiv.org/abs/2501.12948), and [chat.deepseek.com](https://chat.deepseek.com).

## FAQ

**Is DeepSeek free?**
Yes. The chat interface at [chat.deepseek.com](https://chat.deepseek.com) is free with no declared usage cap and includes DeepThink reasoning and web search. The API is pay-per-token; new accounts get 5M free tokens on registration.

**Is DeepSeek V4 out?**
No. V4 is expected late April 2026 but has missed earlier windows. V3.2 remains the current API flagship. A V4-Lite has been seen in internal API testing without a public release.

**How does DeepSeek R1 compare to OpenAI o1?**
At launch (January 2025), R1 matched o1 on AIME 2024 (79.8% vs 79.2%) and MATH-500 (97.3% vs 96.4%). R1 is open-weight and free via chat, or $0.28/M input via the `deepseek-reasoner` endpoint. On 2026 agentic-coding benchmarks, Claude Opus 4.7 and GPT-5.4 Codex have pulled ahead.

**Can I run DeepSeek locally?**
Yes. Weights for V3, V3.2, and R1 are on HuggingFace. Distilled R1 variants (7B, 14B, 32B) run on consumer GPUs via Ollama or LM Studio. Full V3.2 needs datacenter memory.

**Is DeepSeek safe for enterprise use?**
For regulated industries, no. The Berlin DPA flagged the app as non-compliant with GDPR. U.S. House Select Committee reports cite export-control violations. Banking, healthcare, government, and EU data workloads should not use the hosted API. Self-hosting the open weights avoids the data-transfer issue but does not change origin or export-control questions.

## Sources

- [DeepSeek API Pricing Docs](https://api-docs.deepseek.com/quick_start/pricing): current per-token rates and cache discounts
- [DeepSeek-R1 ArXiv paper](https://arxiv.org/abs/2501.12948): benchmark results and architecture
- [chat.deepseek.com](https://chat.deepseek.com): consumer chat interface
- [DeepSeek Wikipedia](https://en.wikipedia.org/wiki/DeepSeek): company and regulatory background

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/) · [AI Coding](/categories/ai-coding/)
- **Comparisons:** [ChatGPT vs DeepSeek](/comparisons/chatgpt-vs-deepseek/) · [Claude vs DeepSeek](/comparisons/claude-vs-deepseek/) · [DeepSeek vs Gemini](/comparisons/deepseek-vs-gemini/) · [DeepSeek vs Mistral AI](/comparisons/deepseek-vs-mistral-ai/) · [DeepSeek vs Qwen](/comparisons/deepseek-vs-qwen/)
