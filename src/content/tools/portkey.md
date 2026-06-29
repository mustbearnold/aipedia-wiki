---
type: tool
slug: portkey
title: Portkey
tagline: LLM gateway, observability, prompt management, routing, guardrails, governance, caching, and cost controls for production AI applications.
category: ai-infrastructure
secondary_categories: [ai-automation, ai-coding]
company: Portkey
url: https://portkey.ai
github_url: https://github.com/Portkey-AI/gateway
pricing_model: freemium
price_range: "Developer free / Production $49/month / Enterprise custom"
status: active
last_updated: 2026-06-28
last_verified: 2026-06-28
update_frequency: monthly
seo_title: "Portkey Review: AI Gateway Pricing, Guardrails & Routing (June 2026)"
meta_description: "Portkey review refreshed June 28, 2026: Developer, Production, Enterprise, AI Gateway, logs, prompts, guardrails, governance, and alternatives."
author: "aipedia.wiki Editorial"
best_plan: "Use Developer for prototyping, Production at $49/month when an app needs production logs, prompt templates, guardrails, RBAC, and support, and Enterprise for high-volume logs, custom retention, SSO, private hosting, compliance, and custom governance."
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 9
  value: 8
  moat: 8
  longevity: 8
facts:
  best_for:
    value: "Teams that need an LLM gateway with provider routing, observability, prompt management, guardrails, analytics, API key management, governance, and reliability controls."
    source: "https://docs.portkey.ai/docs/llms.txt"
    source_label: "Portkey docs"
    source_id: portkey-docs
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Portkey pricing lists Developer as Free Forever with 10k recorded logs/month, Production at $49/month with 100k recorded logs/month and $9 overages per additional 100k requests, and Enterprise as custom pricing."
    source: "https://portkey.ai/pricing"
    source_label: "Portkey pricing"
    source_id: portkey-pricing
    verified_at: 2026-06-28
    next_review_at: 2026-07-12
    volatility: high
    confidence: high
  gateway_surface:
    value: "Portkey docs describe AI Gateway, Guardrails, Observability, Prompts, and Governance features, including analytics APIs for cost, latency, requests, errors, feedback, cache, tokens, and users."
    source: "https://docs.portkey.ai/docs/llms.txt"
    source_label: "Portkey docs"
    source_id: portkey-docs
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  open_source_or_local:
    value: "The Portkey Gateway repository is MIT licensed, while Portkey Cloud pricing separates Developer, Production, and Enterprise plans."
    source: "https://github.com/Portkey-AI/gateway/blob/main/LICENSE"
    source_label: "Portkey Gateway license"
    source_id: portkey-gateway-license
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Developer is explicitly not positioned for production workloads; production buyers should model recorded logs, retention, overages, private deployment, compliance, provider keys, latency, and guardrail policy ownership."
    source: "https://portkey.ai/pricing"
    source_label: "Portkey pricing"
    source_id: portkey-pricing
    verified_at: 2026-06-28
    next_review_at: 2026-07-12
    volatility: high
    confidence: high
tags: [ai-gateway, llm-observability, routing, guardrails, prompt-management, governance, caching, api-keys, open-source]
best_for:
  - production AI apps that need one gateway across model providers
  - teams that need LLM logs, traces, feedback, cost, latency, and error analytics
  - orgs that want prompt management, guardrails, budgets, and API key governance
  - buyers comparing gateway control against eval-first observability tools
not_best_for:
  - teams that only need prompt evaluation without live traffic routing
  - simple prototypes that can use provider dashboards directly
  - buyers who need a full no-code workflow automation platform
  - teams unwilling to own guardrail policy and provider-key governance
quick_answer: >-
  Portkey is a production LLM gateway and control plane. Pick it when routing, logs, prompts, guardrails, governance, analytics, caching, and provider-key controls need to sit in front of AI traffic. Compare Helicone for open-source observability/gateway simplicity, Braintrust for eval-heavy workflows, and LangSmith for LangChain-native agent operations.
price_history:
  - date: 2026-06-28
    plan: "Developer"
    price: "Free Forever"
    source: "https://portkey.ai/pricing"
    source_label: "Portkey pricing"
    source_id: portkey-pricing
    verified_at: 2026-06-28
    note: "Includes 10k recorded logs/month, 3-day log retention, 30-day metrics retention, gateway, observability, three prompt templates, simple caching, deterministic guardrails, and community support. Portkey says it is not suitable for production workloads."
  - date: 2026-06-28
    plan: "Production"
    price: "$49/month"
    source: "https://portkey.ai/pricing"
    source_label: "Portkey pricing"
    source_id: portkey-pricing
    verified_at: 2026-06-28
    note: "Includes 100k recorded logs/month, $9 overages per additional 100k requests, 30-day log retention, 90-day metrics retention, alerts, partner guardrails, unlimited prompt templates, RBAC, service account API keys, production support, and semantic caching."
  - date: 2026-06-28
    plan: "Enterprise"
    price: "Custom"
    source: "https://portkey.ai/pricing"
    source_label: "Portkey pricing"
    source_id: portkey-pricing
    verified_at: 2026-06-28
    note: "Listed for 10M+ recorded logs/month, custom retention, custom guardrail hooks, SSO, granular budgets, rate limits, private cloud, data export, VPC hosting, compliance, and custom BAAs."
---

# Portkey

Portkey is an LLM gateway and control plane for production AI traffic. It combines routing, key management, observability, prompt management, guardrails, caching, cost tracking, analytics, and governance around model calls.

The short version: Portkey belongs on the shortlist when the team needs a gateway in front of model providers, not only an eval dashboard after the fact.

## System Verdict

> **Pick Portkey when production AI traffic needs a control plane.** It is strongest when provider routing, logs, cost visibility, prompt management, guardrails, budgets, key governance, and private deployment options matter together.
>
> **Skip it when evals are the core job.** [Braintrust](/tools/braintrust/) or [promptfoo](/tools/promptfoo/) should be checked first when release quality, red teaming, or vulnerability testing is the main buying reason.
>
> **Best plan guidance:** use Developer for prototyping only. Production at $49/month is the first serious plan for live apps. Enterprise is the route when 10M+ recorded logs, SSO, custom retention, private hosting, compliance, or custom guardrails matter.

## Key Facts

| | |
|---|---|
| Core job | LLM gateway, routing, observability, prompts, guardrails, governance, and caching |
| Developer | Free Forever, 10k recorded logs/month |
| Production | $49/month, 100k recorded logs/month, $9 per extra 100k requests |
| Enterprise | Custom pricing with 10M+ recorded logs, custom retention, private cloud, VPC, compliance, and SSO |
| Open-source component | Portkey Gateway is MIT licensed |
| Main cost risk | Recorded logs, retention, overages, provider spend, guardrail policy, and private deployment needs |

## When To Pick Portkey

- **You need a gateway before model providers.** Portkey is useful when model access, routing, retries, fallback, and governance need a shared layer.
- **You want LLM traffic analytics.** Cost, latency, requests, errors, feedback, cache, tokens, and user data can be tracked through the platform.
- **You need prompt management.** Prompt templates, playgrounds, API endpoints, versioning, and variables live alongside gateway controls.
- **You need guardrails and policy.** Portkey can sit in the path where rate limits, budgets, guardrails, and API key rules are enforced.
- **You have enterprise deployment constraints.** Private cloud, VPC hosting, custom retention, compliance, BAAs, and SSO sit in the Enterprise lane.

## When To Pick Something Else

- **Open-source observability and gateway:** [Helicone](/tools/helicone/) when simple open-source gateway/observability and provider-cost pass-through are the main attraction.
- **Evals and experiments:** [Braintrust](/tools/braintrust/) when release quality, datasets, experiments, and scored outputs are more important than traffic routing.
- **LangChain operations:** [LangSmith](/tools/langsmith/) when LangGraph/LangChain traces, deployments, sandboxes, Fleet, and Engine controls matter most.
- **Model marketplace routing:** [OpenRouter](/tools/openrouter/) when the buyer primarily needs one API across many model providers and public model pricing.
- **Workflow automation:** [n8n](/tools/n8n/) or [Zapier](/tools/zapier/) when the job is SaaS workflow execution rather than LLM traffic governance.

## Pricing

Portkey pricing was checked on June 28, 2026 against the official pricing page.

| Plan | Price | Included shape | Buyer fit |
|---|---|---|---|
| Developer | Free Forever | 10k recorded logs/month, 3-day log retention, 30-day metrics retention | Prototypes, tests, enterprise POCs |
| Production | $49/month | 100k recorded logs/month, $9 per extra 100k requests, 30-day logs, 90-day metrics, alerts, RBAC, support | Production apps with moderate traffic |
| Enterprise | Custom | 10M+ recorded logs/month, custom retention, custom guardrails, SSO, private cloud, data export, VPC hosting, compliance | High-volume and regulated teams |

Developer is useful, but Portkey explicitly frames it as not suitable for production workloads. Production buyers should model recorded log volume, retention, gateway latency, provider spend, guardrail false positives, prompt-template ownership, and incident response.

## Failure Modes

- **Gateway changes can break production.** Routing, fallbacks, retries, and guardrails need staged rollout and rollback plans.
- **Logs are not the only meter.** Provider token spend, gateway overages, private hosting, support, and compliance needs may matter more than the base plan.
- **Guardrails need owners.** A gateway can enforce policy, but the team still needs to define, test, and review that policy.
- **Latency has to be measured.** Any gateway adds a control layer, so real traffic should be tested before standardizing.
- **Developer is not production.** The free tier is for evaluation, not a reliable operating model for live user traffic.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline. Scoring follows the four-dimension rubric at [/about/scoring/](/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-28 against Portkey pricing, Portkey docs, the Portkey Gateway repository, and the Portkey Gateway license.

## FAQ

**Is Portkey free?**
Portkey lists Developer as Free Forever with 10k recorded logs/month, but says it is not suitable for production workloads.

**Is Portkey open source?**
The Portkey Gateway repository is MIT licensed. Portkey Cloud has Developer, Production, and Enterprise plans.

**Portkey vs Helicone?**
Both sit in the LLM observability/gateway lane. Portkey leans harder into governance, prompts, guardrails, and enterprise control. Helicone is a strong comparison for open-source observability and gateway simplicity.

## Sources

- [Portkey pricing](https://portkey.ai/pricing): Developer, Production, Enterprise, logs, retention, overages, and enterprise controls
- [Portkey docs](https://docs.portkey.ai/docs/llms.txt): AI Gateway, Guardrails, Observability, Prompts, and Governance documentation index
- [Portkey Gateway repository](https://github.com/Portkey-AI/gateway): open-source gateway project
- [Portkey Gateway license](https://github.com/Portkey-AI/gateway/blob/main/LICENSE): MIT license

## Related

- **Category:** [AI Infrastructure](/categories/ai-infrastructure/) · [AI Automation](/categories/ai-automation/) · [AI Coding](/categories/ai-coding/)
- **Alternatives:** [Helicone](/tools/helicone/) · [Braintrust](/tools/braintrust/) · [LangSmith](/tools/langsmith/) · [OpenRouter](/tools/openrouter/)
