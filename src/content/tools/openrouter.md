---
type: tool
slug: openrouter
title: OpenRouter
tagline: Unified LLM API for hundreds of models, with OpenAI-compatible requests, provider routing, fallbacks, app attribution, and per-model token pricing.
category: ai-infrastructure
secondary_categories: [ai-chatbots, ai-coding, ai-automation]
company: OpenRouter, Inc.
url: https://openrouter.ai
pricing_model: freemium
price_range: "Free tier (25+ models, 50 req/day) · Pay-as-you-go (5.5% platform fee on 400+ models) · Enterprise custom"
status: active
launched: 2023
last_updated: 2026-05-13
last_verified: 2026-05-13
price_history:
  - date: 2026-05-13
    price: "see note"
    source: "https://openrouter.ai/pricing"
    source_label: "OpenRouter pricing"
    source_id: openrouter-official
    verified_at: 2026-05-13
    change: "Public tiers verified: Free (25+ models, 50 requests/day), Pay-as-you-go (5.5% platform fee, 400+ models), Enterprise (custom volume pricing with SSO/SAML and regional routing). Zero Completion Insurance covers failed requests."
  - date: 2026-04-28
    price: "see note"
    source: "https://openrouter.ai/models"
    source_label: "OpenRouter models"
    source_id: openrouter-official
    verified_at: 2026-04-28
    change: "Model menu verified to include Claude Opus 4.7, GPT-5.5, Gemini 3.1 Pro, Grok 4.3, DeepSeek V4, Kimi K2.6, Qwen 3.6, Mistral 3, Llama 4, Nemotron 3 Nano Omni, and Poolside Laguna XS.2 and M.1."
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 9
  value: 8
  moat: 7
  longevity: 8
facts:
  best_for:
    value: "Unified LLM API for 400+ models, with OpenAI-compatible requests, provider routing, fallbacks, app attribution, prompt caching, regional routing, Zero Completion Insurance, and per-model token pricing. Best for AI infrastructure, retrieval, vector search, hosting, or developer platforms that want one billing account across providers."
    source: "https://openrouter.ai/pricing"
    source_label: "OpenRouter pricing"
    source_id: openrouter-official
    verified_at: 2026-05-13
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Three public tiers as of May 2026: Free (25+ models, 50 requests/day), Pay-as-you-go (5.5% platform fee on 400+ models), Enterprise (custom volume pricing with SSO/SAML, regional routing, no training on customer data)."
    source: "https://openrouter.ai/pricing"
    source_label: "OpenRouter pricing"
    source_id: openrouter-official
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
  watch_out_for:
    value: "The 5.5% platform fee on Pay-as-you-go stacks on top of provider token prices. Model-page pricing can change as providers update rates. Pin critical workflows, watch spend, and verify provider routing policy before sending regulated data."
    source: "https://openrouter.ai/pricing"
    source_label: "OpenRouter pricing"
    source_id: openrouter-official
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
tags: [llm-api, model-router, openai-compatible, fallback, agents, inference, developers]
seo_title: "OpenRouter Review: Unified LLM API, Routing & Pricing (May 2026)"
meta_description: "OpenRouter gives developers one OpenAI-compatible API for 400+ models including Opus 4.7, GPT-5.5, Gemini 3.1 Pro, Grok 4.3, DeepSeek V4, and Kimi K2.6. Free tier (50 req/day), 5.5% platform fee Pay-as-you-go, custom Enterprise with SSO and regional routing."
author: aipedia.wiki Editorial
best_for:
  - developers testing many frontier and open-weight models
  - apps that need provider fallback without custom routing code
  - prototypes that should stay OpenAI SDK compatible
  - agent builders comparing price, latency, and data policy by provider
not_best_for:
  - regulated workloads needing a direct vendor contract for every model call
  - teams that already standardized on one provider
  - buyers wanting guaranteed enterprise SLAs without sales negotiation
quick_answer: >-
  OpenRouter is the fastest practical way to test and ship across many LLM providers from one API. Three tiers: Free (25+ models, 50 requests/day), Pay-as-you-go (5.5% platform fee on 400+ models including Opus 4.7, GPT-5.5, Gemini 3.1 Pro, Grok 4.3, DeepSeek V4, and Kimi K2.6), and Enterprise (custom volume pricing, SSO/SAML, regional routing). Pick it for model choice, OpenAI-compatible integration, routing, fallback, and fast experimentation. Skip it when procurement, data residency, or direct-provider support matters more than optionality.
---

# OpenRouter

OpenRouter is a unified API layer for LLMs. Developers point an OpenAI-compatible client at OpenRouter, choose a model slug, and can route across providers without rewriting application code.

The product is useful because the model market changes faster than most app code should. A team can compare [ChatGPT](/tools/chatgpt/), [Claude](/tools/claude/), [Gemini](/tools/gemini/), [DeepSeek](/tools/deepseek/), [Qwen](/tools/qwen/), [Kimi](/tools/kimi/), and smaller open models behind one billing account and one request schema. As of May 2026, every current-generation frontier model flows through OpenRouter: **Claude Opus 4.7**, **GPT-5.5**, **Gemini 3.1 Pro**, **Grok 4.3**, **DeepSeek V4**, and **Kimi K2.6**.

## Recent developments

- **May 13, 2026:** Pricing structure verified. Three tiers: Free (25+ models, 50 requests/day), Pay-as-you-go (5.5% platform fee on 400+ models), Enterprise (custom volume pricing with SSO/SAML and regional routing). Zero Completion Insurance covers failed requests across all tiers.
- **May 1, 2026:** [xAI moved Grok 4.3 into the API with OpenRouter access](/news/2026-05-03-xai-grok-43-custom-voices-api/), making OpenRouter one of the fastest ways to benchmark Grok's low-price reasoning profile against Claude, Gemini, OpenAI, Kimi, and Qwen without SDK rewrites.
- **April 30, 2026:** [Poolside released Laguna XS.2 (33B MoE, Apache 2.0) for local agentic coding and Laguna M.1 (225B MoE) as a free-tier API](/news/2026-04-30-poolside-laguna-xs2-open-model-local-agentic-coding/). Both models are available through OpenRouter for testing, provider routing, and deployment alongside the other 400+ models.
- **April 28, 2026:** [NVIDIA launched Nemotron 3 Nano Omni](/news/2026-04-28-nvidia-nemotron-3-nano-omni/) with OpenRouter listed as one of the access routes for the open multimodal agent model.
- **April 28, 2026:** [Mistral 3 shipped with Large 3 and new Ministral models](/news/2026-04-28-mistral-3-open-model-release/), giving OpenRouter users another open-model family to test against Llama, Qwen, DeepSeek, Gemma, and closed frontier models.

## System Verdict

> **Pick OpenRouter if model choice is the bottleneck.** It is especially strong for prototypes, indie apps, eval benches, and agent frameworks that need to try new models quickly.
>
> **Skip it for tightly governed enterprise deployments.** Direct contracts with OpenAI, Anthropic, Google, or a cloud marketplace can be cleaner for security review, support escalation, and committed-use discounts.
>
> The real value is not just aggregation. Provider routing, fallbacks, cost stats, app attribution, and OpenAI-compatible requests remove a lot of plumbing that small teams otherwise build themselves.

## Key Facts

| | |
|---|---|
| **Core product** | Unified API and web chat for 400+ LLMs |
| **API style** | OpenAI-compatible chat completions |
| **Routing** | Provider choice, provider fallback, price/latency sorting, regional routing |
| **Tool calling** | Available when the underlying model/provider supports it |
| **Frontier models** | Claude Opus 4.7 · GPT-5.5 · Gemini 3.1 Pro · Grok 4.3 · DeepSeek V4 · Kimi K2.6 · Qwen 3.6 · Mistral 3 · Llama 4 |
| **Free tier** | 25+ models, 50 requests/day |
| **Pay-as-you-go** | 5.5% platform fee on 400+ models, prompt caching, activity logs, spend controls |
| **Enterprise** | Custom volume pricing, SSO/SAML, regional routing, no training on customer data |
| **Reliability** | Zero Completion Insurance covers failed requests |
| **Best fit** | Developer apps, agent tooling, model comparison |

Verified 2026-05-13 against [openrouter.ai/pricing](https://openrouter.ai/pricing).

## When to pick OpenRouter

- **You need optionality.** Model quality, latency, and price move weekly. OpenRouter makes switching less painful.
- **You want fallback behavior.** If a provider errors, routing can try alternatives instead of returning failure to the user.
- **Your code already uses the OpenAI SDK.** In many cases the migration is a base URL and model-name change.
- **You are building an agent stack.** Routing, tool-calling pass-through, and provider preferences are practical for agent workflows.
- **You need visibility by model.** Cost and generation metadata help teams compare more than benchmark vibes.

## When to pick something else

- **Direct vendor support matters.** Use OpenAI, Anthropic, Google, or Mistral directly for contract-backed support.
- **You need dedicated open-model infrastructure.** [Together AI](/tools/together-ai/), Fireworks AI, or [Groq](/tools/groq/) are better when the workload is mostly one model family.
- **You need media-generation APIs.** [Fal.ai](/tools/fal-ai/) and [Replicate](/tools/replicate/) cover image, video, and audio model hosting more deeply.
- **Data controls are the sale.** Ask for enterprise terms or use direct providers with explicit zero-retention commitments.

## Pricing

| Tier | Cost | What you get |
|---|---|---|
| Free | $0 | 25+ models, 50 requests/day |
| Pay-as-you-go | 5.5% platform fee on top of per-model token rates | 400+ models, prompt caching, activity logs, spend controls, Zero Completion Insurance |
| Enterprise | Custom (sales) | Volume pricing, SSO/SAML, regional routing, no training on customer data |

Per-model token pricing varies by provider route. Some models are free or promotional. The same app can run a free open model for background tasks and Opus 4.7 or GPT-5.5 for final answers.

That flexibility is the point and the risk. Without pinned budgets, provider preferences, and model choices, traffic can land on more expensive routes than expected. Prompt caching and the OpenAI-compatible app attribution header help track spend by surface.

Verified 2026-05-13 via [openrouter.ai/pricing](https://openrouter.ai/pricing).

## Failure Modes

- **Provider variance.** The same model name can behave differently by host, quantization, context length, or uptime.
- **Governance complexity.** A single gateway can touch many downstream providers. Security teams need to understand the route policy.
- **Budget surprises.** Model pages change as providers update pricing. Pin critical workflows and watch spend.
- **Fallback quality drift.** A fallback may preserve uptime while changing output quality. Use evals for critical flows.
- **Not every feature is universal.** Tool calling, structured outputs, multimodal input, and zero-retention options depend on model/provider support.

## Methodology

Last verified 2026-05-13 against OpenRouter's pricing page and developer documentation. Scoring weighs developer utility, breadth of model access, pricing transparency, durability of the gateway role, and risk from provider dependence.

## FAQ

**Is OpenRouter just a proxy?**
No. The proxy is part of it, but routing, provider selection, fallbacks, rankings, cost stats, and app attribution are the product layer.

**Can OpenRouter replace direct OpenAI or Anthropic APIs?**
For many prototypes and production apps, yes. For large regulated deployments, direct provider contracts may still be cleaner.

**Does OpenRouter support tool calling?**
Yes when the selected underlying model and provider support tool/function calling.

## Sources

- [OpenRouter pricing](https://openrouter.ai/pricing)
- [OpenRouter quickstart](https://openrouter.ai/docs/quickstart)
- [OpenRouter provider routing docs](https://openrouter.ai/docs/guides/routing/provider-selection)
- [OpenRouter API reference](https://openrouter.ai/docs/api/reference/overview)

## Related

- **Category:** [AI Infrastructure](/categories/ai-infrastructure/) · [AI Chatbots](/categories/ai-chatbots/) · [AI Coding](/categories/ai-coding/)
- **See also:** [ChatGPT](/tools/chatgpt/) · [Claude](/tools/claude/) · [Gemini](/tools/gemini/) · [Together AI](/tools/together-ai/) · [Fireworks AI](/tools/fireworks-ai/) · [Groq](/tools/groq/)
