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
price_range: "Free (chat) / Usage-based (V4-Flash from $0.14/M input; V4-Pro quarter-price from $0.435/M input)"
status: active
launched: 2023-07
last_updated: 2026-06-24
last_verified: 2026-06-24
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
    value: "DeepSeek-V4-Flash (default) and DeepSeek-V4-Pro are now the documented production models on the API; legacy `deepseek-chat` and `deepseek-reasoner` endpoint names map to V4-Flash non-thinking and thinking modes and are flagged for deprecation"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "DeepSeek API pricing docs"
    source_id: deepseek-api-pricing
    verified_at: 2026-06-24
    volatility: high
    confidence: high
    next_review_at: 2026-07-04
  context_window:
    value: "1M tokens on V4-Flash and V4-Pro · 384K maximum output tokens"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "DeepSeek API pricing docs"
    source_id: deepseek-api-pricing
    verified_at: 2026-06-24
    volatility: high
    confidence: high
    next_review_at: 2026-07-04
  pricing_anchor:
    value: "Chat is free; V4-Flash API is $0.14/M cache-miss input, $0.0028/M cache-hit input, $0.28/M output. V4-Pro is now listed at the adjusted quarter-price after the May promotion: $0.435/M cache-miss input, $0.003625/M cache-hit input, and $0.87/M output. Cache-hit input was cut to one-tenth of launch pricing on April 26, 2026."
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "DeepSeek API pricing docs"
    source_id: deepseek-api-pricing
    verified_at: 2026-06-24
    volatility: high
    confidence: high
    next_review_at: 2026-07-04
  free_plan:
    value: "Yes: chat.deepseek.com offers a free consumer chat interface"
    source: "https://chat.deepseek.com"
    source_label: "DeepSeek Chat"
    source_id: deepseek-chat
    verified_at: 2026-06-20
    volatility: high
    confidence: high
    next_review_at: 2026-07-04
  best_paid_tier:
    value: "API is the buyer path for production use; cache-heavy workloads benefit most from DeepSeek pricing"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "DeepSeek API pricing docs"
    source_id: deepseek-api-pricing
    verified_at: 2026-06-24
    volatility: high
    confidence: high
    next_review_at: 2026-07-04
  api_available:
    value: "Yes: API models are deepseek-v4-flash and deepseek-v4-pro; legacy `deepseek-chat` and `deepseek-reasoner` endpoint names still resolve to V4-Flash non-thinking and thinking modes but are flagged for deprecation"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "DeepSeek API pricing docs"
    source_id: deepseek-api-pricing
    verified_at: 2026-06-24
    volatility: high
    confidence: high
    next_review_at: 2026-07-04
  image_generation:
    value: "No primary image-generation product in DeepSeek chat/API buyer positioning"
    source: "https://chat.deepseek.com"
    source_label: "DeepSeek Chat"
    source_id: deepseek-chat
    verified_at: 2026-06-20
    volatility: low
    confidence: high
  video_generation:
    value: "No primary video-generation product in DeepSeek chat/API buyer positioning"
    source: "https://chat.deepseek.com"
    source_label: "DeepSeek Chat"
    source_id: deepseek-chat
    verified_at: 2026-06-20
    volatility: low
    confidence: high
  real_time_voice:
    value: "No primary real-time voice-agent product; DeepSeek is focused on text chat, coding, and reasoning models"
    source: "https://chat.deepseek.com"
    source_label: "DeepSeek Chat"
    source_id: deepseek-chat
    verified_at: 2026-06-20
    volatility: low
    confidence: high
  web_browsing:
    value: "Yes in the consumer chat interface as a web-search/chat feature"
    source: "https://chat.deepseek.com"
    source_label: "DeepSeek Chat"
    source_id: deepseek-chat
    verified_at: 2026-06-20
    volatility: high
    confidence: high
    next_review_at: 2026-07-04
  coding_agent:
    value: "Not a full IDE coding agent by itself; DeepSeek models are used for code and can power coding workflows through other tools"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "DeepSeek API pricing docs"
    source_id: deepseek-api-pricing
    verified_at: 2026-06-24
    volatility: medium
    confidence: high
  enterprise_controls:
    value: "Enterprise governance details are thinner than OpenAI, Anthropic, Google, or Azure-style procurement; API buyers should evaluate data and jurisdiction requirements"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "DeepSeek API pricing docs"
    source_id: deepseek-api-pricing
    verified_at: 2026-06-20
    volatility: medium
    confidence: high
  data_retention_or_privacy:
    value: "Jurisdiction, data handling, and regulatory posture are major procurement review items for sensitive workloads"
    source: "https://chat.deepseek.com"
    source_label: "DeepSeek Chat"
    source_id: deepseek-chat
    verified_at: 2026-06-20
    volatility: medium
    confidence: high
  open_source_or_local:
    value: "Yes: DeepSeek publishes V4 and earlier open-weight models on Hugging Face for local/self-hosted use, depending on model, license, and hardware"
    source: "https://huggingface.co/deepseek-ai"
    source_label: "DeepSeek Hugging Face organization"
    source_id: deepseek-huggingface
    verified_at: 2026-06-24
    volatility: medium
    confidence: high
  best_for:
    value: "Low-cost reasoning, coding assistance, API experimentation, and teams comfortable evaluating open-weight or China-origin model tradeoffs"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "DeepSeek API pricing docs"
    source_id: deepseek-api-pricing
    verified_at: 2026-06-24
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Model/version naming and pricing can change quickly; governance, privacy, and geopolitical procurement constraints matter more than raw benchmark scores"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "DeepSeek API pricing docs"
    source_id: deepseek-api-pricing
    verified_at: 2026-06-24
    volatility: high
    confidence: high
    next_review_at: 2026-07-04
tags: [open-weights, reasoning, chinese-llm, coding, math, api, free-tier, deepseek-v3, deepseek-v4, r1]
seo_title: "DeepSeek: Features, Pricing & Review (June 2026)"
meta_description: "DeepSeek V4-Flash and V4-Pro are the documented API models at 1M context. V4-Flash bills $0.14/M cache-miss input, $0.0028/M cache-hit, $0.28/M output. V4-Pro is now quarter-price at $0.435/$0.003625/$0.87."
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
  DeepSeek is one of the cheapest credible frontier-grade LLM stacks. V4-Flash and V4-Pro are the documented production API models with a 1M context window, and current Hugging Face pages now show V4 open-weight releases. V4-Flash bills $0.14/M cache-miss input, $0.0028/M cache-hit, and $0.28/M output; V4-Pro is listed at the adjusted quarter-price after its May promotion. Pick for cost-sensitive API work, coding-model routing, or self-hosting experiments; skip for regulated enterprise or polished consumer UX.
price_history:
  - date: 2026-06-24
    plan: "V4 API and open-weight recheck"
    price: "V4-Flash $0.14/$0.28; V4-Pro $0.435/$0.87 per MTok"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "DeepSeek API pricing docs"
    source_id: deepseek-api-pricing
    verified_at: 2026-06-24
    note: "Official docs still list V4-Flash and V4-Pro with 1M context, 384K max output, cache-hit pricing, OpenAI and Anthropic-compatible endpoints, and July 24 deprecation for legacy aliases; Hugging Face still shows DeepSeek V4 model releases."
  - date: 2025-01-20
    plan: "API"
    price: "$0.28/M input"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "Source"
    source_id: deepseek-api-pricing
    verified_at: 2025-01-20
    note: "R1 launched and held baseline API pricing"
  - date: 2026-04-17
    plan: "API"
    price: "$0.28/M input"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "Source"
    source_id: deepseek-api-pricing
    verified_at: 2026-04-17
    note: "Verified unchanged. Cache-hit rate $0.028/M."
  - date: 2026-04-24
    plan: "V4 preview"
    price: "Pricing not yet verified"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "Source"
    source_id: deepseek-api-pricing
    verified_at: 2026-04-24
    note: "AP reports pro and flash V4 preview models with improved knowledge, reasoning, and agentic capabilities."
  - date: 2026-04-26
    plan: "Cache-hit cut"
    price: "Input cache hit -90%"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "Source"
    source_id: deepseek-api-pricing
    verified_at: 2026-04-26
    note: "Input cache hit pricing reduced to one-tenth of launch pricing across the API lineup."
  - date: 2026-04-27
    plan: "V4-Pro promo"
    price: "75% off through May 31"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "Source"
    source_id: deepseek-api-pricing
    verified_at: 2026-04-27
    note: "Reuters reported a temporary V4-Pro developer discount. DeepSeek's docs later converted the post-promo price to an adjusted quarter-price on June 1."
  - date: 2026-05-13
    plan: "V4-Flash"
    price: "$0.14 in / $0.28 out per MTok"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "Source"
    source_id: deepseek-api-pricing
    verified_at: 2026-05-13
    note: "API pricing docs now publish V4-Flash and V4-Pro as the documented models. V4-Flash: $0.14/M cache-miss input, $0.0028/M cache-hit, $0.28/M output. V4-Pro was still in a 75% promo window at this check. Context window listed at 1M tokens with 384K max output. Legacy `deepseek-chat` and `deepseek-reasoner` endpoint names map to V4-Flash modes and are flagged for deprecation."
  - date: 2026-06-02
    plan: "V4-Pro adjusted price"
    price: "$0.435 in / $0.87 out per MTok"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "Source"
    source_id: deepseek-api-pricing
    verified_at: 2026-06-02
    note: "DeepSeek pricing docs now say the V4-Pro promo ended May 31 and the official price was adjusted to one-quarter of the original price starting June 1, leaving $0.435/M cache-miss input, $0.003625/M cache-hit input, and $0.87/M output as the current listed rates."
  - date: 2026-06-05
    plan: "V4 API recheck"
    price: "V4-Flash $0.14/$0.28; V4-Pro $0.435/$0.87 per MTok"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "Source"
    source_id: deepseek-api-pricing
    verified_at: 2026-06-05
    note: "Rechecked after the DeepSeek vs Gemini/Mistral/Qwen comparison refresh. Official docs still list V4-Flash and V4-Pro with 1M context, 384K max output, cache-hit pricing, and July 24 deprecation for legacy deepseek-chat/deepseek-reasoner aliases."
  - date: 2026-06-20
    plan: "V4 API and open-weight recheck"
    price: "V4-Flash $0.14/$0.28; V4-Pro $0.435/$0.87 per MTok"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "DeepSeek API pricing docs"
    source_id: deepseek-api-pricing
    verified_at: 2026-06-20
    note: "Rechecked for the Cursor vs DeepSeek comparison. Official docs still list V4-Flash and V4-Pro with 1M context, 384K max output, cache-hit pricing, OpenAI and Anthropic-compatible endpoints, and July 24 deprecation for legacy aliases; Hugging Face now shows DeepSeek V4 model releases."
  - date: 2026-06-20
    plan: "GitHub Copilot comparison recheck"
    price: "V4-Flash $0.14/$0.28; V4-Pro $0.435/$0.87 per MTok"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "DeepSeek API pricing docs"
    source_id: deepseek-api-pricing
    verified_at: 2026-06-20
    note: "Rechecked for DeepSeek vs GitHub Copilot. The buyer split is now explicit: DeepSeek is a low-cost model/API and open-weight lane, while Copilot is the GitHub-native coding product."
  - date: 2026-06-20
    plan: "Replit Agent comparison recheck"
    price: "V4-Flash $0.14/$0.28; V4-Pro $0.435/$0.87 per MTok"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "DeepSeek API pricing docs"
    source_id: deepseek-api-pricing
    verified_at: 2026-06-20
    note: "Rechecked for DeepSeek vs Replit Agent. The buyer split is now explicit: DeepSeek is the low-cost model/API backend lane, while Replit Agent is the browser app-builder lane."
---

# DeepSeek

Chinese AI lab founded under High-Flyer Capital Management in Hangzhou. Releases open-weight frontier models alongside a free chat interface and a pay-per-token API that undercuts OpenAI frontier-model pricing.

DeepSeek-V4-Flash and DeepSeek-V4-Pro are the documented production models on the API. Both expose a 1M token context window with 384K maximum output, support thinking mode by default, and offer JSON output, tool calls, and chat prefix completion. V4-Pro is now listed at the adjusted quarter-price after the May 31 promo ended. The legacy `deepseek-chat` and `deepseek-reasoner` endpoint names still resolve to V4-Flash non-thinking and thinking modes respectively, and DeepSeek's docs flag them for deprecation. Hugging Face now lists DeepSeek V4 releases alongside earlier V3, V3.2, and R1 model families, so self-hosting is a real evaluation path even though hardware, license, and deployment controls still decide fit.

Related coverage: [AI Industry Roundup, April 24](/news/2026-04-24-ai-industry-roundup/) tracked the DeepSeek V4 preview alongside frontier-coding model news, Anthropic capital pressure, and Cohere-Aleph Alpha. On April 27, [DeepSeek cut V4-Pro pricing by 75%](/news/2026-04-27-deepseek-v4-pro-price-cut/) in a developer adoption push that ended May 31 before the same quarter-price became the adjusted public rate on June 1. The June 20 DeepSeek vs GitHub Copilot refresh now separates DeepSeek's low-cost model/backend role from Copilot's GitHub-native developer workflow, while DeepSeek vs Replit Agent separates DeepSeek as model infrastructure from Replit's browser-native app-builder workflow.

## System Verdict

> **Pick DeepSeek if API cost is the hard constraint and frontier-class reasoning is the requirement.** V4-Flash bills $0.14 per million cache-miss input tokens and $0.28 per million output tokens, with cache-hit input at $0.0028 per million after the April 26, 2026 cache-hit cut. V4-Pro lists at $0.435 input cache-miss, $0.003625 input cache-hit, and $0.87 output after the June 1 price adjustment. That keeps DeepSeek dramatically below most Western frontier-model APIs for similar long-context reasoning envelopes.
>
> **Skip it if compliance, polish, or uptime SLAs matter.** The Berlin Data Protection Authority flagged DeepSeek as non-compliant with GDPR in mid-2025, triggering DSA Article 16 notifications to Apple and Google. U.S. House Select Committee scrutiny over chip-export violations continues. EU enterprises under GDPR Article 44 and any U.S.-regulated industry should assume this is not deployable.
>
> **Who pays:** Free for chat at [chat.deepseek.com](https://chat.deepseek.com), API pay-per-token for developers. No consumer subscription. No enterprise SKU with SOC 2 or SLAs.

## Key Facts

| | |
|---|---|
| **Current flagship API models** | DeepSeek-V4-Flash (default) and DeepSeek-V4-Pro (premium quarter-price after June 1 adjustment) |
| **Reasoning** | Thinking mode supported on both V4 models; DeepSeek-R1 (open-weight, January 2025) remains the standalone reasoning weights release |
| **Context window** | 1M tokens on V4-Flash and V4-Pro |
| **Max output** | 384K tokens |
| **API endpoints** | `deepseek-v4-flash` and `deepseek-v4-pro`. Legacy `deepseek-chat` (non-thinking) and `deepseek-reasoner` (thinking) names map to V4-Flash modes and are flagged for deprecation. |
| **V4-Flash pricing (per MTok)** | $0.14 cache-miss input · $0.0028 cache-hit input · $0.28 output |
| **V4-Pro pricing (per MTok, quarter-price after June 1 adjustment)** | $0.435 cache-miss input · $0.003625 cache-hit input · $0.87 output |
| **Cache-hit policy** | Input cache hit was reduced to one-tenth of launch pricing on April 26, 2026 |
| **Features** | JSON output, tool calls, chat prefix completion, thinking mode |
| **New account credit** | 5M free tokens on registration |
| **Chat interface** | Free · no declared usage cap · DeepThink + web search |
| **Open weights** | DeepSeek V4 releases plus V3, V3.2, and R1 model families on Hugging Face; self-hosting depends on model, license, hardware, and governance |
| **Compliance posture** | Chinese company · GDPR concerns flagged by Berlin DPA · U.S. export-control scrutiny ongoing |

API, model, context, pricing, and open-weight data above were reverified on 2026-06-24 against [DeepSeek API docs](https://api-docs.deepseek.com/quick_start/pricing), the official V4 release note, the API changelog, and DeepSeek's Hugging Face organization. Regulatory and procurement risk notes remain from the prior cited checks.

## What it actually is

Two product layers on the same underlying models. A free chat interface at [chat.deepseek.com](https://chat.deepseek.com) runs DeepSeek's current model with a DeepThink reasoning mode and web search. A pay-per-token API exposes `deepseek-v4-flash` and `deepseek-v4-pro` models, with the legacy `deepseek-chat` (non-thinking) and `deepseek-reasoner` (thinking) names still resolving to V4-Flash modes during a deprecation window.

Both V4 models support a 1M token context window with 384K maximum output, JSON output, tool calls, chat prefix completion, and thinking mode by default. V4-Pro's May promotion expired on May 31, but DeepSeek says the official price was adjusted to one-quarter of the original price from June 1, keeping the public listed rate at $0.435/M cache-miss input and $0.87/M output. Cache-hit input pricing was cut to one-tenth of launch pricing on April 26, 2026.

DeepSeek publishes V4 and earlier model families on Hugging Face. Distilled R1 variants still run on consumer GPUs, while full V3/V4-class routes need serious memory, deployment review, and license checks. Do not treat "open weights" as a free production green light: data handling, export-control posture, hosting location, and model-serving cost still matter.

The moats are narrow. Open weights mean any well-funded lab can reproduce earlier-generation architecture. Defensibility sits in training-data curation and inference-cost engineering, not in the model itself.

## When to pick DeepSeek

- **You need frontier-class reasoning on a tight API budget.** V4-Flash at $0.14/M cache-miss input is the cheapest credible rate from a model that can hold a 1M context window and run agentic workflows.
- **You self-host.** V3 family weights are public. Quantized distills run on single consumer GPUs via Ollama or LM Studio.
- **You want repeatable-prompt workloads cheap.** After the April 26, 2026 cut and June 1 V4-Pro adjustment, V4-Flash cache-hit input is $0.0028/M and V4-Pro cache-hit input is $0.003625/M.
- **You're benchmarking against an open-weight baseline.** R1's paper and weights remain the reference point for cost-efficient reasoning.
- **You build in cost-sensitive markets.** The cost gap versus most Western frontier-model APIs is the product.

## When to pick something else

- **Enterprise compliance, SOC 2, GDPR:** [ChatGPT](/tools/chatgpt/) or [Claude](/tools/claude/). DeepSeek has open regulatory questions in EU and U.S. jurisdictions.
- **Polished consumer chat:** [ChatGPT](/tools/chatgpt/), [Claude](/tools/claude/), or [Gemini](/tools/gemini/). DeepSeek's web UI is functional but minimal.
- **Long-context with stronger enterprise posture:** [Claude](/tools/claude/) and [Gemini](/tools/gemini/) remain safer procurement paths for teams that need Western enterprise controls more than DeepSeek's lowest price.
- **Open-weight with larger Western community:** [Llama](/tools/llama/) or [Qwen](/tools/qwen/) for alternate licensing and tooling.
- **Uptime SLAs:** [Mistral](/tools/mistral-ai/) or [Anthropic](/tools/claude/) offer contractual SLAs. DeepSeek does not.

## Pricing

API pricing via [api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing).

| Plan | Cache-miss input | Cache-hit input | Output | Who's it for |
|---|---|---|---|---|
| Chat (Free) | $0 | $0 | $0 | Any user · DeepThink + web search · no declared cap |
| `deepseek-v4-flash` | $0.14/M | $0.0028/M | $0.28/M | Default API workload (replaces legacy `deepseek-chat` and `deepseek-reasoner`) |
| `deepseek-v4-pro` (quarter-price after June 1 adjustment) | $0.435/M | $0.003625/M | $0.87/M | Premium reasoning runs and large agentic workloads |
| New account credit | 5M free tokens | n/a | n/a | One-time grant on registration |

*Prices verified 2026-06-24 via [DeepSeek API pricing](https://api-docs.deepseek.com/quick_start/pricing). V4-Pro pricing now reflects DeepSeek's June 1 adjustment to one-quarter of the original price after the May promotion ended. Cache-hit input was cut to one-tenth of launch pricing on April 26, 2026. Thinking mode is supported by default on both V4 models and generates additional reasoning tokens, so effective cost per task is higher than the raw input figure suggests.*

## Against the alternatives

| | DeepSeek V4-Flash | OpenAI frontier models | Claude flagship APIs |
|---|---|---|---|
| **Input price (per M tokens)** | $0.14 | ~$2.50 | $5 |
| **Output price (per M tokens)** | $0.28 | ~$10 | $25 |
| **Context window** | 1M | Undisclosed | 1M |
| **Open weights** | Yes, including current V4 releases and earlier V3/R1 families on Hugging Face | No | No |
| **Self-hostable** | Yes, subject to model, hardware, license, and governance review | No | No |
| **SOC 2 / GDPR posture** | Open questions | Yes | Yes |
| **Consumer polish** | Functional | Strongest ecosystem | Strongest reasoning |
| **Best viewed as** | Cost-optimized API baseline | Generalist default | Reasoning specialist |

## Failure modes

- **Do not treat the quarter-price as immutable.** DeepSeek converted the May V4-Pro discount into the June 1 adjusted price, but model naming and rates still move quickly. Re-check the official pricing docs before locking annual budgets or hardcoding endpoint economics.
- **Legacy endpoint deprecation.** `deepseek-chat` and `deepseek-reasoner` still resolve to V4-Flash modes but are flagged for deprecation. Production code should migrate to `deepseek-v4-flash` and `deepseek-v4-pro` to avoid surprise breakage.
- **Open weights do not remove deployment risk.** V4 and earlier model releases are visible on Hugging Face, but teams still need to verify license terms, memory cost, serving stack, data residency, model updates, and procurement posture before self-hosting.
- **No R2 announced.** R1 (January 2025) remains the standalone open-weight reasoning product. Capability-wise it still holds, but frontier coding agents have moved past R1 for high-autonomy software work.
- **Regulatory posture is hostile in EU and U.S.** Berlin DPA has flagged the service as non-compliant with GDPR. House Select Committee reports cite export-control violations. Banking, healthcare, government, and most EU enterprise workloads cannot deploy this.
- **No SLA or uptime guarantee.** The service hit heavy rate-limiting during the January 2025 R1 launch spike. Stability has improved but is not contractually backed.
- **Chat UI is minimal.** No Projects, no Canvas, no GPT Store equivalent. DeepThink reasoning is visible but the surrounding product is utilitarian.
- **Thin moat.** Open-weight releases let any lab reproduce or fine-tune earlier-generation architecture. Qwen, Llama, and Mistral Small 4 compete directly on cost-per-capability.
- **Thinking-mode output tokens multiply cost.** Both V4 models default to thinking mode, which generates additional reasoning tokens. Effective cost per completed task is meaningfully higher than the raw input rate suggests, especially on V4-Pro.
- **Data residency is China.** Chat conversations and API calls route through Chinese infrastructure. Even outside regulated industries, this is a disclosure burden.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-24 against [DeepSeek API docs](https://api-docs.deepseek.com/quick_start/pricing), the [DeepSeek V4 release note](https://api-docs.deepseek.com/news/news260424), [DeepSeek API changelog](https://api-docs.deepseek.com/updates/), and [DeepSeek Hugging Face](https://huggingface.co/deepseek-ai). R1 paper, chat interface, and regulatory/background items remain from prior cited checks.

## FAQ

**Is DeepSeek free?**
Yes. The chat interface at [chat.deepseek.com](https://chat.deepseek.com) is free with no declared usage cap and includes DeepThink reasoning and web search. The API is pay-per-token; new accounts get 5M free tokens on registration.

**Is DeepSeek V4 out?**
Yes. As of June 24, 2026, V4-Flash and V4-Pro are the documented production models on the API pricing page, both with a 1M context window and 384K maximum output. V4-Pro is listed at the adjusted quarter-price after the May promotion ended. The legacy `deepseek-chat` and `deepseek-reasoner` endpoint names still resolve to V4-Flash modes but are flagged for deprecation.

**How does DeepSeek R1 compare to OpenAI o1?**
At launch (January 2025), R1 matched o1 on AIME 2024 (79.8% vs 79.2%) and MATH-500 (97.3% vs 96.4%). R1 is open-weight and free via chat. Its role today is as the open-weight reasoning baseline, with V4-Flash and V4-Pro handling production thinking-mode workloads on the API.

**Can I run DeepSeek locally?**
Yes, but not casually. DeepSeek's Hugging Face organization now lists V4 releases as well as V3, V3.2, R1, and other earlier families. Distilled R1 variants can run on consumer GPUs via Ollama or LM Studio, but full V3/V4-class deployments need serious hardware, license review, security review, and model-serving operations.

**Is DeepSeek safe for enterprise use?**
For regulated industries, no. The Berlin DPA flagged the app as non-compliant with GDPR. U.S. House Select Committee reports cite export-control violations. Banking, healthcare, government, and EU data workloads should not use the hosted API. Self-hosting the open weights avoids the data-transfer issue but does not change origin or export-control questions.

## Sources

- [DeepSeek API Pricing Docs](https://api-docs.deepseek.com/quick_start/pricing): current per-token rates, V4-Flash and V4-Pro models, and cache discounts verified 2026-06-24
- [DeepSeek V4 release note](https://api-docs.deepseek.com/news/news260424): V4-Flash, V4-Pro, 1M context, API availability, open weights, and legacy endpoint deprecation verified 2026-06-24
- [DeepSeek API changelog](https://api-docs.deepseek.com/updates/): release sequence and current V4-era model history verified 2026-06-24
- [DeepSeek-R1 ArXiv paper](https://arxiv.org/abs/2501.12948): benchmark results and architecture
- [chat.deepseek.com](https://chat.deepseek.com): consumer chat interface
- [DeepSeek V4 preview coverage](/news/2026-04-24-deepseek-v4-preview-release/): April 24, 2026 preview release note
- [DeepSeek V4-Pro price-cut coverage](/news/2026-04-27-deepseek-v4-pro-price-cut/): April 27, 2026 temporary discount and cache-hit pricing signal
- [DeepSeek Hugging Face organization](https://huggingface.co/deepseek-ai): open-weight model releases verified 2026-06-24
- [DeepSeek Wikipedia](https://en.wikipedia.org/wiki/DeepSeek): company and regulatory background

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/) · [AI Coding](/categories/ai-coding/)
- **Comparisons:** [DeepSeek vs Mistral AI](/compare/deepseek-vs-mistral-ai/) · [DeepSeek vs Qwen](/compare/deepseek-vs-qwen/)
