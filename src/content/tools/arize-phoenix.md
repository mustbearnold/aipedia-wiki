---
type: tool
slug: arize-phoenix
title: Arize Phoenix
tagline: Open-source AI observability, tracing, evaluation, prompt engineering, experiments, and Arize AX hosting for teams improving LLM systems.
category: ai-infrastructure
secondary_categories: [ai-automation, ai-coding]
company: Arize AI
url: https://arize.com/phoenix/
github_url: https://github.com/arize-ai/phoenix
pricing_model: freemium
price_range: "Phoenix open source / AX Pro $50/month / AX Enterprise custom"
status: active
last_updated: 2026-06-28
last_verified: 2026-06-28
update_frequency: monthly
seo_title: "Arize Phoenix Review: Pricing, Tracing, Evals & AX Hosting (June 2026)"
meta_description: "Arize Phoenix review refreshed June 28, 2026: open-source Phoenix, Arize AX Pro pricing, traces, evals, prompts, experiments, and alternatives."
author: "aipedia.wiki Editorial"
best_plan: "Use self-hosted Phoenix for open-source tracing and eval workflows, AX Pro at $50/month when a small team wants hosted spans, experiments, prompts, dashboards, and support, and AX Enterprise when retention, scale, governance, and procurement need contract terms."
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
    value: "LLM and agent teams that need OpenTelemetry-based traces, evaluations, prompt iteration, experiments, and production quality review without starting from a generic logs tool."
    source: "https://arize.com/docs/phoenix/llms.txt"
    source_label: "Phoenix docs index"
    source_id: arize-phoenix-docs
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Arize pricing lists Phoenix as open source, AX Pro at $50/month with 25k spans/month, and AX Enterprise as custom pricing."
    source: "https://arize.com/pricing/"
    source_label: "Arize pricing"
    source_id: arize-pricing
    verified_at: 2026-06-28
    next_review_at: 2026-07-12
    volatility: high
    confidence: high
  usage_model:
    value: "AX Pro includes 25k spans per month, with overage pricing listed at $.0008 per span."
    source: "https://arize.com/pricing/"
    source_label: "Arize pricing"
    source_id: arize-pricing
    verified_at: 2026-06-28
    next_review_at: 2026-07-12
    volatility: high
    confidence: high
  open_source_or_local:
    value: "Phoenix is positioned as an open-source AI observability platform, but its repository uses Elastic License 2.0 rather than a permissive Apache or MIT license."
    source: "https://github.com/arize-ai/phoenix/blob/main/LICENSE"
    source_label: "Phoenix license"
    source_id: arize-phoenix-license
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Phoenix is strongest when the team instruments traces and owns eval sets; weak spans, vague rubrics, or unmodeled span overages can make the dashboard less useful than it looks."
    source: "https://arize.com/docs/phoenix/llms.txt"
    source_label: "Phoenix docs index"
    source_id: arize-phoenix-docs
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
tags: [llm-observability, tracing, evals, opentelemetry, prompt-engineering, experiments, open-source, ai-infrastructure]
best_for:
  - AI product teams that need OpenTelemetry-based traces and evals
  - teams comparing prompts, retrieval settings, and agent changes with experiments
  - buyers who want open-source Phoenix but may need hosted Arize AX
  - platform teams that need production quality review for LLM apps
not_best_for:
  - buyers who only need a model gateway or provider router
  - teams that cannot instrument their app with useful spans
  - buyers requiring a permissive OSS license for managed-service resale
  - simple prototypes with no eval or regression workflow
quick_answer: >-
  Arize Phoenix is an open-source AI observability platform for traces, evals, prompt iteration, datasets, and experiments. Pick it when engineering teams want OpenTelemetry-native visibility and evidence for LLM changes. Compare LangSmith for LangChain-native operations, Braintrust for eval program management, and Langfuse when permissive open-source posture matters more.
price_history:
  - date: 2026-06-28
    plan: "Phoenix"
    price: "Open source"
    source: "https://arize.com/pricing/"
    source_label: "Arize pricing"
    source_id: arize-pricing
    verified_at: 2026-06-28
    note: "Arize pricing presents Phoenix as the open-source path for AI observability."
  - date: 2026-06-28
    plan: "AX Pro"
    price: "$50/month"
    source: "https://arize.com/pricing/"
    source_label: "Arize pricing"
    source_id: arize-pricing
    verified_at: 2026-06-28
    note: "Listed for small teams and startups with 25k spans/month and overage pricing at $.0008 per span."
  - date: 2026-06-28
    plan: "AX Enterprise"
    price: "Custom"
    source: "https://arize.com/pricing/"
    source_label: "Arize pricing"
    source_id: arize-pricing
    verified_at: 2026-06-28
    note: "Listed for enterprise scale, retention, governance, and support needs."
---

# Arize Phoenix

Arize Phoenix is Arize's open-source AI observability platform. It is built around OpenTelemetry traces, LLM evaluation, prompt engineering, experiments, datasets, and production quality review.

The buyer question is not whether Phoenix can show traces. It is whether your team can connect traces, evals, prompts, and experiments into a release process that catches regressions before users do.

## System Verdict

> **Pick Arize Phoenix when OpenTelemetry-native AI observability is the job.** It is strongest for teams that need traces, evals, prompt iteration, datasets, and experiments for LLM apps and agents.
>
> **Skip it when the main problem is live traffic routing.** [Portkey](/tools/portkey/) or [Helicone](/tools/helicone/) are better first checks for provider routing, fallback, caching, and gateway governance.
>
> **Best plan guidance:** start with Phoenix if self-hosted observability is enough. Use AX Pro when a small team wants hosted Arize features and a public span allowance. Use AX Enterprise when retention, governance, scale, and support need procurement terms.

## Key Facts

| | |
|---|---|
| Core job | OpenTelemetry AI tracing, evals, prompt work, datasets, experiments |
| Phoenix | Open-source AI observability platform |
| AX Pro | $50/month with 25k spans/month |
| AX overage | $.0008 per span on the pricing page |
| AX Enterprise | Custom pricing |
| License | Elastic License 2.0 for Phoenix |

## When To Pick Arize Phoenix

- **You need trace-linked debugging.** Phoenix helps inspect what happened inside an LLM or agent run instead of only seeing latency and status codes.
- **You need evals connected to production examples.** Traces, datasets, and experiments are most useful when real failures feed the test loop.
- **You use OpenTelemetry.** Phoenix fits teams that want AI observability on a standard tracing foundation.
- **You iterate prompts often.** Prompt playground and experiment workflows help compare prompt versions on the same inputs.
- **You want open-source leverage.** Phoenix is a serious self-host option before committing to hosted Arize AX.

## When To Pick Something Else

- **LangChain-native operations:** [LangSmith](/tools/langsmith/) when LangChain or LangGraph deployment, traces, evals, and support are the center of gravity.
- **Eval program management:** [Braintrust](/tools/braintrust/) when datasets, experiments, scores, human review, and release gates are the main buyer job.
- **Open-source observability with permissive licensing:** [Langfuse](/tools/langfuse/) when license posture and prompt management matter more than Phoenix's Arize stack.
- **AI gateway control:** [Portkey](/tools/portkey/) or [Helicone](/tools/helicone/) when model routing and provider governance are more urgent.
- **Security testing:** [promptfoo](/tools/promptfoo/) when red-team probes, model security, and guardrail testing are first.

## Pricing

Arize pricing was checked on June 28, 2026 against the official pricing page.

| Plan | Public price | Included shape | Buyer fit |
|---|---|---|---|
| Phoenix | Open source | Self-hosted AI observability platform | Teams that can operate Phoenix and want source access |
| AX Pro | $50/month | 25k spans/month, startup/small-team positioning | Small teams that want hosted Arize AX before enterprise procurement |
| AX Enterprise | Custom | Enterprise scale, retention, governance, and support | Larger teams and regulated production environments |

The practical buying advice: model span volume before treating AX Pro as a flat $50/month tool. Traces grow quickly when agents call tools, retrieve context, and run multi-step workflows.

## Failure Modes

- **Bad instrumentation creates weak evidence.** Phoenix needs useful spans, metadata, and prompt or retrieval context.
- **Eval quality still depends on rubrics.** A platform cannot fix vague criteria or stale examples.
- **Span overages can surprise teams.** Agent loops and high-volume monitoring can exceed the included AX Pro span allowance.
- **License posture matters.** Phoenix uses Elastic License 2.0, so managed-service and redistribution plans need legal review.
- **It is not a gateway.** Pair Phoenix with a routing or policy layer when live traffic control is the priority.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline. Scoring follows the four-dimension rubric at [/about/scoring/](/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-28 against Arize Phoenix product, docs, pricing, and license sources.

## FAQ

**Is Arize Phoenix free?**
Phoenix is presented by Arize as the open-source path. Hosted Arize AX has separate Pro and Enterprise packaging.

**What is AX Pro?**
Arize pricing lists AX Pro at $50/month with 25k spans per month and span overage pricing.

**Arize Phoenix vs Braintrust?**
Phoenix is stronger for OpenTelemetry-native observability and trace-driven debugging. Braintrust is stronger when eval operations, datasets, scoring, human review, and release decisions are the central workflow.

## Sources

- [Arize Phoenix](https://arize.com/phoenix/): Phoenix product positioning
- [Phoenix docs index](https://arize.com/docs/phoenix/llms.txt): tracing, evaluation, prompt engineering, datasets, and experiments documentation
- [Arize pricing](https://arize.com/pricing/): Phoenix, AX Pro, AX Enterprise, span allowance, and overage pricing
- [Phoenix license](https://github.com/arize-ai/phoenix/blob/main/LICENSE): Elastic License 2.0

## Related

- **Category:** [AI Infrastructure](/categories/ai-infrastructure/) · [AI Automation](/categories/ai-automation/) · [AI Coding](/categories/ai-coding/)
- **Alternatives:** [LangSmith](/tools/langsmith/) · [Braintrust](/tools/braintrust/) · [Langfuse](/tools/langfuse/) · [Helicone](/tools/helicone/)
