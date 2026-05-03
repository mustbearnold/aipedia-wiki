---
type: tool
slug: deepseek
title: DeepSeek
tagline: Open-weight Chinese LLM lab offering frontier reasoning and chat at fractions of OpenAI frontier-model pricing.
category: ai-chatbots
secondary_categories: [ai-coding, ai-research]
company: DeepSeek
url: https://www.deepseek.com/
pricing_model: freemium
price_range: "Free (chat) / Usage-based (API from $0.28/M tokens)"
status: active
launched: 2023-07
last_updated: 2026-05-03
last_verified: 2026-05-03
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
facts:
  flagship_model:
    value: "DeepSeek-V4 preview; V3.2 verified API baseline"
    source: "/news/2026-04-24-deepseek-v4-preview-release/"
    source_label: "DeepSeek V4 preview coverage"
    verified_at: 2026-04-26
  context_window:
    value: "128K tokens"
    source: "/tools/deepseek/"
    source_label: "AIpedia DeepSeek review"
    verified_at: 2026-04-26
  best_paid_tier:
    value: "Usage-based API; free chat"
    source: "/tools/deepseek/"
    source_label: "AIpedia DeepSeek review"
    verified_at: 2026-04-26
  best_for:
    value: "Cost-sensitive API reasoning, open-weight baselines, and self-hosting"
    source: "/tools/deepseek/"
    source_label: "AIpedia DeepSeek review"
    verified_at: 2026-04-26
tags: [open-weights, reasoning, chinese-llm, coding, math, api, free-tier, deepseek-v3, deepseek-v4, r1]
seo_title: "DeepSeek: Features, Pricing & Review (April 2026)"
meta_description: "DeepSeek launched V4 preview models on April 24, 2026, with pro and flash versions reported by AP. API from $0.28/M input tokens remains the verified public pricing baseline until DeepSeek publishes V4 endpoint pricing."
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
  DeepSeek is the cheapest credible frontier-grade LLM stack. V4 preview launched April 24, 2026 with pro and flash versions reported by AP, while V3.2 pricing remains the verified public API baseline. Pick for cost-sensitive API work or self-hosting; skip for regulated enterprise or polished consumer UX.
price_history:
  - date: 2025-01-20
    plan: "API"
    price: "$0.28/M input"
    note: "R1 launched and held baseline API pricing"
  - date: 2026-04-17
    plan: "API"
    price: "$0.28/M input"
    note: "Verified unchanged. Cache-hit rate $0.028/M."
  - date: 2026-04-24
    plan: "V4 preview"
    price: "Pricing not yet verified"
    note: "AP reports pro and flash V4 preview models with improved knowledge, reasoning, and agentic capabilities."
  - date: 2026-04-27
    plan: "V4-Pro promo"
    price: "75% discount until May 5"
    note: "Reuters reported a temporary V4-Pro developer discount plus lower cache-hit pricing across the API lineup."
---

# DeepSeek

Chinese AI lab founded under High-Flyer Capital Management in Hangzhou. Releases open-weight frontier models alongside a free chat interface and a pay-per-token API that undercuts OpenAI frontier-model pricing by roughly 9x.

DeepSeek-V4 preview launched on April 24, 2026, according to AP, with pro and flash versions described as improving knowledge, reasoning, and agentic capabilities. DeepSeek-V3.2 remains the verified public API pricing baseline until DeepSeek publishes full V4 endpoint details. DeepSeek-R1 (released January 2025) remains the standalone reasoning model.

Related coverage: [AI Industry Roundup, April 24](/news/2026-04-24-ai-industry-roundup/) tracked the DeepSeek V4 preview alongside GPT-5.5 in Copilot, Anthropic capital pressure, and Cohere-Aleph Alpha. On April 27, [DeepSeek cut V4-Pro pricing by 75%](/news/2026-04-27-deepseek-v4-pro-price-cut/) in a developer adoption push.

## System Verdict

> **Pick DeepSeek if API cost is the hard constraint and frontier-class reasoning is the requirement.** At $0.28/M input tokens (cache miss) and $0.028/M (cache hit), it sits roughly 9x below OpenAI frontier models and 5x below Claude Opus 4.7. R1 matched o1 on AIME 2024 at launch. V3.2 handles general chat, coding, and long-context work up to 128K tokens.
>
> **Skip it if compliance, polish, or uptime SLAs matter.** The Berlin Data Protection Authority flagged DeepSeek as non-compliant with GDPR in mid-2025, triggering DSA Article 16 notifications to Apple and Google. U.S. House Select Committee scrutiny over chip-export violations continues. EU enterprises under GDPR Article 44 and any U.S.-regulated industry should assume this is not deployable.
>
> **Who pays:** Free for chat at [chat.deepseek.com](https://chat.deepseek.com), API pay-per-token for developers. No consumer subscription. No enterprise SKU with SOC 2 or SLAs.

## Key Facts

| | |
|---|---|
| **Current flagship** | DeepSeek-V4 preview (pro / flash reported April 24, 2026); V3.2 remains the verified API-pricing baseline |
| **Reasoning model** | DeepSeek-R1 (open-weight, January 2025) |
| **V4 status** | Preview launched April 24, 2026; technical docs, endpoint names, license, and pricing still need verification |
| **Context window** | 128K tokens on API endpoints |
| **API endpoints** | `deepseek-chat` (non-thinking) · `deepseek-reasoner` (thinking) |
| **API pricing (cache miss)** | $0.28/M input · $0.42/M output |
| **API pricing (cache hit)** | $0.028/M input (90% discount) |
| **Off-peak discount** | Up to 75% on cached inputs · 16:30-00:30 GMT |
| **New account credit** | 5M free tokens on registration |
| **Chat interface** | Free · no declared usage cap · DeepThink + web search |
| **Open weights** | V3, V3.2, R1 on HuggingFace · Apache-compatible for V3 family |
| **Compliance posture** | Chinese company · GDPR concerns flagged by Berlin DPA · U.S. export-control scrutiny ongoing |

Every stable pricing data point was verified on 2026-04-17 against [DeepSeek API docs](https://api-docs.deepseek.com/quick_start/pricing). V4 preview status was updated on 2026-04-24 from AP reporting.

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
- **You build in cost-sensitive markets.** The 9x cost gap versus OpenAI frontier-model pricing is the product.

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

| | DeepSeek V3.2 | OpenAI frontier models | Claude Opus 4.7 |
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

- **V4 details are still thin.** Preview availability and a time-boxed V4-Pro discount are reported, but license, endpoint names, context window, benchmark table, and durable pricing are not yet fully documented. Do not plan migrations until DeepSeek publishes technical docs.
- **No R2 announced.** R1 (January 2025) remains the standalone reasoning product. Capability-wise it still holds, but the gap to Opus 4.7 on agentic coding is widening.
- **Regulatory posture is hostile in EU and U.S.** Berlin DPA has flagged the service as non-compliant with GDPR. House Select Committee reports cite export-control violations. Banking, healthcare, government, and most EU enterprise workloads cannot deploy this.
- **No SLA or uptime guarantee.** The service hit heavy rate-limiting during the January 2025 R1 launch spike. Stability has improved but is not contractually backed.
- **Chat UI is minimal.** No Projects, no Canvas, no GPT Store equivalent. DeepThink reasoning is visible but the surrounding product is utilitarian.
- **Thin moat.** Open-weight releases let any lab reproduce or fine-tune the architecture. Qwen, Llama, and Mistral Small 4 compete directly on cost-per-capability.
- **Reasoner output tokens multiply cost.** `deepseek-reasoner` bills at the same per-token rate but generates chain-of-thought tokens. Effective cost per completed task is meaningfully higher than `deepseek-chat`.
- **Data residency is China.** Chat conversations and API calls route through Chinese infrastructure. Even outside regulated industries, this is a disclosure burden.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-27 against [DeepSeek API docs](https://api-docs.deepseek.com/quick_start/pricing), the [DeepSeek-R1 paper](https://arxiv.org/abs/2501.12948), [chat.deepseek.com](https://chat.deepseek.com), [V4 preview coverage](/news/2026-04-24-deepseek-v4-preview-release/), and [Reuters price-cut coverage](/news/2026-04-27-deepseek-v4-pro-price-cut/).

## FAQ

**Is DeepSeek free?**
Yes. The chat interface at [chat.deepseek.com](https://chat.deepseek.com) is free with no declared usage cap and includes DeepThink reasoning and web search. The API is pay-per-token; new accounts get 5M free tokens on registration.

**Is DeepSeek V4 out?**
Yes, but only as a preview according to AP's April 24, 2026 report. DeepSeek has not yet published enough technical detail to treat V4 as a fully verified production replacement for V3.2 in this review.

**How does DeepSeek R1 compare to OpenAI o1?**
At launch (January 2025), R1 matched o1 on AIME 2024 (79.8% vs 79.2%) and MATH-500 (97.3% vs 96.4%). R1 is open-weight and free via chat, or $0.28/M input via the `deepseek-reasoner` endpoint. On 2026 agentic-coding benchmarks, Claude Opus 4.7 and OpenAI Codex models have pulled ahead.

**Can I run DeepSeek locally?**
Yes. Weights for V3, V3.2, and R1 are on HuggingFace. Distilled R1 variants (7B, 14B, 32B) run on consumer GPUs via Ollama or LM Studio. Full V3.2 needs datacenter memory.

**Is DeepSeek safe for enterprise use?**
For regulated industries, no. The Berlin DPA flagged the app as non-compliant with GDPR. U.S. House Select Committee reports cite export-control violations. Banking, healthcare, government, and EU data workloads should not use the hosted API. Self-hosting the open weights avoids the data-transfer issue but does not change origin or export-control questions.

## Sources

- [DeepSeek API Pricing Docs](https://api-docs.deepseek.com/quick_start/pricing): current per-token rates and cache discounts
- [DeepSeek-R1 ArXiv paper](https://arxiv.org/abs/2501.12948): benchmark results and architecture
- [chat.deepseek.com](https://chat.deepseek.com): consumer chat interface
- [DeepSeek V4 preview coverage](/news/2026-04-24-deepseek-v4-preview-release/): April 24, 2026 preview release note
- [DeepSeek V4-Pro price-cut coverage](/news/2026-04-27-deepseek-v4-pro-price-cut/): April 27, 2026 temporary discount and cache-hit pricing signal
- [DeepSeek Wikipedia](https://en.wikipedia.org/wiki/DeepSeek): company and regulatory background

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/) · [AI Coding](/categories/ai-coding/)
- **Comparisons:** [ChatGPT vs DeepSeek](/compare/chatgpt-vs-deepseek/) · [Claude vs DeepSeek](/compare/claude-vs-deepseek/) · [DeepSeek vs Gemini](/compare/deepseek-vs-gemini/) · [DeepSeek vs Mistral AI](/compare/deepseek-vs-mistral-ai/) · [DeepSeek vs Qwen](/compare/deepseek-vs-qwen/)
