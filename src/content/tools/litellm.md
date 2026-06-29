---
type: tool
slug: litellm
title: LiteLLM
tagline: Open-source LLM gateway and Python SDK for one OpenAI-compatible interface across 100+ model providers, with routing, virtual keys, spend tracking, guardrails, MCP, and enterprise controls.
category: ai-infrastructure
secondary_categories: [ai-coding, ai-automation]
company: Berri AI
url: https://www.litellm.ai
github_url: https://github.com/BerriAI/litellm
pricing_model: open-source
price_range: "Free MIT core outside enterprise directory; Enterprise custom"
status: active
last_updated: 2026-06-28
last_verified: 2026-06-28
update_frequency: monthly
seo_title: "LiteLLM Review: Open-Source LLM Gateway, Routing, Pricing & Enterprise (June 2026)"
meta_description: "LiteLLM review refreshed June 28, 2026: OpenAI-compatible gateway, 100+ providers, routing, virtual keys, spend tracking, MCP, guardrails, enterprise controls, license, and alternatives."
author: "aipedia.wiki Editorial"
best_plan: "Use the MIT-licensed LiteLLM SDK and proxy first when a team needs OpenAI-compatible access, routing, virtual keys, budgets, and provider fallback. Evaluate Enterprise only when production gateway governance, SSO/SAML, audit logs, multi-team management, guardrails, support, or enterprise-directory licensing matters."
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 9
  value: 9
  moat: 8
  longevity: 9
facts:
  best_for:
    value: "Teams that need one OpenAI-compatible interface across 100+ LLM providers, plus an optional self-hosted proxy for virtual keys, routing, cost tracking, guardrails, observability, and admin controls."
    source: "https://docs.litellm.ai/docs/"
    source_label: "LiteLLM docs"
    source_id: litellm-docs
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "LiteLLM's public docs and website did not expose a self-serve pricing ladder during the June 28, 2026 check; the open-source core is MIT-licensed outside enterprise-directory restrictions and Enterprise is a sales/trial route."
    source: "https://github.com/BerriAI/litellm/blob/main/LICENSE"
    source_label: "LiteLLM license"
    source_id: litellm-license
    verified_at: 2026-06-28
    next_review_at: 2026-07-28
    volatility: high
    confidence: high
  enterprise_controls:
    value: "LiteLLM Enterprise documentation highlights production gateway features such as SSO/SAML, audit logs, spend tracking, multi-team management, guardrails, deployment guidance, and support."
    source: "https://docs.litellm.ai/docs/enterprise"
    source_label: "LiteLLM Enterprise docs"
    source_id: litellm-enterprise
    verified_at: 2026-06-28
    next_review_at: 2026-07-28
    volatility: high
    confidence: high
  gateway_scope:
    value: "LiteLLM's docs index positions the project around access and management for 100+ LLMs, with routing, load balancing, budgets, rate limits, key management, model providers, MCP, and enterprise deployment topics."
    source: "https://docs.litellm.ai/llms.txt"
    source_label: "LiteLLM docs index"
    source_id: litellm-llms
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  watch_out_for:
    value: "LiteLLM can centralize model traffic quickly, but production buyers still need to test gateway latency, fallback behavior, provider-specific feature drift, enterprise-directory licensing, log retention, and model-provider bills."
    source: "https://docs.litellm.ai/docs/"
    source_label: "LiteLLM docs"
    source_id: litellm-docs
    verified_at: 2026-06-28
    next_review_at: 2026-07-28
    volatility: high
    confidence: high
tags: [llm-gateway, model-routing, openai-compatible, mcp-gateway, virtual-keys, cost-tracking, guardrails, observability, open-source]
best_for:
  - teams that need one API shape across many model providers
  - developers replacing direct provider SDK calls with an OpenAI-compatible gateway
  - AI platforms that need routing, fallback, budgets, virtual keys, and spend tracking
  - enterprises that need SSO, audit logs, multi-team management, guardrails, and support
not_best_for:
  - teams that only call one model provider and do not need gateway controls
  - buyers that want a hosted eval dashboard before routing controls
  - teams unwilling to operate a proxy, monitor latency, and govern logs
  - non-technical teams looking for a no-code AI app builder
quick_answer: >-
  LiteLLM is the open-source LLM gateway to shortlist when a team needs one OpenAI-compatible interface across 100+ providers, plus routing, virtual keys, spend tracking, guardrails, MCP, and enterprise controls. Start with the MIT-licensed SDK or proxy. Move to Enterprise only when production governance, SSO/SAML, audit logs, support, or enterprise licensing is the blocker.
price_history:
  - date: 2026-06-28
    plan: "LiteLLM core"
    price: "Free, MIT-licensed outside enterprise directory restrictions"
    source: "https://github.com/BerriAI/litellm/blob/main/LICENSE"
    source_label: "LiteLLM license"
    source_id: litellm-license
    verified_at: 2026-06-28
    note: "The license says content outside the enterprise-directory restriction is MIT-licensed."
  - date: 2026-06-28
    plan: "LiteLLM Enterprise"
    price: "Custom, sales or trial route"
    source: "https://docs.litellm.ai/docs/enterprise"
    source_label: "LiteLLM Enterprise docs"
    source_id: litellm-enterprise
    verified_at: 2026-06-28
    note: "Enterprise documentation describes production controls and a trial/PoC route, but no public self-serve price table was verified."
---

# LiteLLM

LiteLLM is an open-source SDK and self-hosted gateway for calling many LLM providers through one OpenAI-compatible interface. The buyer value is control: model routing, fallback, virtual keys, spend tracking, rate limits, guardrails, observability, MCP, and enterprise policy in front of model calls.

It belongs in the infrastructure stack when direct provider SDKs have become hard to govern. If the problem is not routing, provider fallback, budgets, or key control, a lighter SDK or direct vendor API may be enough.

## System Verdict

> **Pick LiteLLM when LLM traffic needs a gateway.** It is strongest when a product calls multiple providers and needs OpenAI-compatible routing, virtual keys, spend controls, guardrails, and admin visibility.
>
> **Skip it when evaluation is the first missing layer.** [Braintrust](/tools/braintrust/), [LangSmith](/tools/langsmith/), [DeepEval](/tools/deepeval/), or [Ragas](/tools/ragas/) fit better when release quality and test evidence matter more than traffic routing.
>
> **Best plan guidance:** use the open-source SDK or proxy first. Evaluate Enterprise when SSO/SAML, audit logs, multi-team controls, support, guardrails, deployment help, or enterprise-directory licensing becomes part of the buying decision.

## Key Facts

| | |
|---|---|
| Core job | OpenAI-compatible LLM gateway and SDK |
| Provider scope | Docs describe access to 100+ LLM providers |
| Proxy role | Self-hosted gateway with virtual keys, spend tracking, admin UI, routing, budgets, guardrails, and observability |
| Enterprise controls | SSO/SAML, audit logs, spend tracking, multi-team management, support, and deployment guidance |
| MCP lane | Docs index includes LiteLLM MCP and Agent/MCP gateway topics |
| License | MIT core outside enterprise-directory restrictions |
| Pricing | No public self-serve pricing ladder verified; Enterprise is custom |

## When To Pick LiteLLM

- **You need provider optionality.** LiteLLM lets apps call many model providers through one OpenAI-compatible interface.
- **You need routing and fallback.** It is a stronger fit when model choice, retry logic, and load balancing are production concerns.
- **You need budget controls.** Virtual keys, spend tracking, rate limits, and budgets help platform teams control internal usage.
- **You need an LLM gateway before observability.** LiteLLM sits in the traffic path, so it is a better gateway choice than tools that only observe traces.
- **You need enterprise gateway controls.** SSO/SAML, audit logs, support, and multi-team governance are the reasons to evaluate Enterprise.

## When To Pick Something Else

- **Model marketplace routing:** [OpenRouter](/tools/openrouter/) when the buyer wants a hosted model router rather than a self-hosted gateway layer.
- **Gateway plus analytics:** [Portkey](/tools/portkey/) when a commercial control plane, prompt management, guardrails, logs, caching, and governance are the main requirement.
- **Open-source request logging:** [Helicone](/tools/helicone/) when the need is observability, cost tracking, and replay around model calls.
- **Eval operations:** [Braintrust](/tools/braintrust/) or [LangSmith](/tools/langsmith/) when datasets, evals, prompt testing, and release evidence are first.
- **Typed app code:** [BAML](/tools/baml/) or [Pydantic AI](/tools/pydantic-ai/) when the team needs type-safe LLM application code more than gateway policy.

## Pricing

LiteLLM was checked on June 28, 2026 against the official site, docs, enterprise docs, docs index, and GitHub license. No public self-serve pricing ladder was verified.

| Route | Public price | Buyer fit |
|---|---|---|
| LiteLLM core | Free MIT-licensed software outside enterprise-directory restrictions | Developers and platform teams testing SDK/proxy routing |
| LiteLLM Enterprise | Custom | Teams that need SSO/SAML, audit logs, support, multi-team controls, guardrails, and production deployment guidance |
| Model providers | Provider-specific | Token, tool, search, embedding, image, audio, and retry costs still sit with the model vendors |

The practical buying advice: treat LiteLLM as a gateway/control-plane decision, not a way to make model usage free. The gateway can improve governance and routing, but the provider bill, logging policy, and latency budget still need live tests.

## Failure Modes

- **Gateway latency becomes product latency.** Test LiteLLM in the real call path before standardizing.
- **Fallback can hide quality shifts.** A backup model can answer differently even when the API shape stays the same.
- **Provider features drift.** Tool calling, vision, caching, reasoning flags, and context behavior vary across providers.
- **Logs need retention policy.** Gateway logs can contain sensitive prompts, outputs, keys, or user context.
- **Enterprise licensing needs review.** The license distinguishes enterprise-directory content, so legal and procurement should confirm the exact use case.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline. Scoring follows the four-dimension rubric at [/about/scoring/](/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-28 against LiteLLM official, docs, Enterprise docs, docs index, and GitHub license.

## FAQ

**Is LiteLLM free?**
The LiteLLM core is MIT-licensed outside enterprise-directory restrictions. Enterprise controls and support use a custom sales or trial route.

**What is LiteLLM best for?**
LiteLLM is best for teams that need one OpenAI-compatible gateway across many model providers with routing, fallback, virtual keys, budgets, guardrails, and spend tracking.

**LiteLLM vs OpenRouter?**
LiteLLM is a self-hosted gateway and SDK layer. OpenRouter is a hosted model-router API. Pick LiteLLM when internal control and deployment ownership matter; pick OpenRouter when a managed hosted router is the faster fit.

## Sources

- [LiteLLM official site](https://www.litellm.ai/): product positioning
- [LiteLLM docs](https://docs.litellm.ai/docs/): SDK, proxy, routing, virtual keys, spend tracking, guardrails, observability, and provider interface
- [LiteLLM Enterprise docs](https://docs.litellm.ai/docs/enterprise): SSO/SAML, audit logs, support, production controls, and PoC route
- [LiteLLM docs index](https://docs.litellm.ai/llms.txt): model providers, routing, budgets, MCP, key management, and deployment topics
- [LiteLLM license](https://github.com/BerriAI/litellm/blob/main/LICENSE): MIT core and enterprise-directory restriction language

## Related

- **Category:** [AI Infrastructure](/categories/ai-infrastructure/) · [AI Coding](/categories/ai-coding/) · [AI Automation](/categories/ai-automation/)
- **Alternatives:** [OpenRouter](/tools/openrouter/) · [Portkey](/tools/portkey/) · [Helicone](/tools/helicone/) · [Braintrust](/tools/braintrust/)
