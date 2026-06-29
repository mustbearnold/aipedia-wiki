---
type: tool
slug: langsmith
title: LangSmith
tagline: LangChain's hosted agent and LLM observability platform for tracing, monitoring, evaluation, prompt workflows, deployment, sandboxes, Fleet agents, and Engine optimization.
category: ai-infrastructure
secondary_categories: [ai-automation, ai-coding]
company: LangChain
url: https://smith.langchain.com
pricing_model: freemium
price_range: "$0 Developer / $39 Plus / Enterprise custom, plus usage meters"
status: active
launched: 2023
last_updated: 2026-06-28
last_verified: 2026-06-28
update_frequency: monthly
seo_title: "LangSmith Review: Pricing, Traces, Evals & Deployment (June 2026)"
meta_description: "LangSmith review refreshed June 28, 2026: Developer, Plus, Enterprise, traces, retention tiers, Deployment runs, observability, evals, and alternatives."
author: "aipedia.wiki Editorial"
best_plan: "Use Developer for solo tracing, Plus for teams building and deploying agents, and Enterprise when self-hosting, hybrid deployment, SSO/RBAC, or custom support matters."
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 9
  value: 7
  moat: 8
  longevity: 9
facts:
  best_for:
    value: "Teams building LangChain, LangGraph, or framework-agnostic agents that need traces, monitoring, evaluations, prompt workflows, deployment, sandboxes, Fleet, and Engine controls in one LangChain-operated platform."
    source: "https://www.langchain.com/langsmith/observability"
    source_label: "LangSmith observability"
    source_id: langsmith-observability
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "LangChain pricing lists Developer at $0/seat/month with 5k base traces, Plus at $39/seat/month with 10k base traces and access to Deployment, Sandboxes, Engine, and more, and Enterprise as custom pricing."
    source: "https://www.langchain.com/pricing"
    source_label: "LangChain pricing"
    source_id: langsmith-pricing
    verified_at: 2026-06-28
    next_review_at: 2026-07-12
    volatility: high
    confidence: high
  usage_model:
    value: "LangSmith separates base and extended trace retention, warns that feedback, annotation queues, and automation rules can auto-upgrade traces to extended retention, and documents rate, ingest, monthly trace, usage-limit, and maximum-runs-per-trace boundaries."
    source: "https://docs.langchain.com/langsmith/usage-and-billing"
    source_label: "LangSmith usage and billing"
    source_id: langsmith-usage-billing
    verified_at: 2026-06-28
    next_review_at: 2026-07-12
    volatility: high
    confidence: high
  deployment_meter:
    value: "LangSmith Deployment charges a deployment run for each end-to-end invocation of a deployed LangGraph agent, with $0.005 per run documented in LangSmith billing, while uptime is charged by deployment type."
    source: "https://docs.langchain.com/langsmith/billing"
    source_label: "LangSmith billing documentation"
    source_id: langsmith-billing
    verified_at: 2026-06-28
    next_review_at: 2026-07-12
    volatility: high
    confidence: high
  watch_out_for:
    value: "Trace volume, retention upgrades, deployment runs, deployment uptime, Fleet, Engine, sandboxes, and third-party model/API spend can all create separate cost lines, so LangSmith needs usage limits before production rollout."
    source: "https://docs.langchain.com/langsmith/usage-and-billing"
    source_label: "LangSmith usage and billing"
    source_id: langsmith-usage-billing
    verified_at: 2026-06-28
    next_review_at: 2026-07-12
    volatility: high
    confidence: high
tags: [llm-observability, agent-observability, tracing, evals, langchain, langgraph, deployment, prompts, sandboxes]
best_for:
  - LangGraph and LangChain teams that want first-party tracing and evals
  - agent teams that need deployment, monitoring, and usage controls
  - product teams comparing prompts, models, and agent behavior over time
  - enterprises that want self-hosted or hybrid LangSmith options
not_best_for:
  - teams that only need generic application observability
  - buyers who want an open-source-first control plane
  - simple chatbots with low trace volume and no eval discipline
  - teams avoiding the LangChain ecosystem entirely
quick_answer: >-
  LangSmith is the natural observability and deployment layer for LangChain and LangGraph teams. Pick it when traces, evals, prompt comparison, agent monitoring, deployment, sandboxes, Fleet, and LangChain-native support matter. Compare Langfuse or Braintrust if open-source posture, framework neutrality, or eval-first workflows matter more than LangChain integration.
price_history:
  - date: 2026-06-28
    plan: "Developer"
    price: "$0/seat/month"
    source: "https://www.langchain.com/pricing"
    source_label: "LangChain pricing"
    source_id: langsmith-pricing
    verified_at: 2026-06-28
    note: "Includes up to 5k base traces/month, then pay-as-you-go. Personal organizations are limited until a payment method is added."
  - date: 2026-06-28
    plan: "Plus"
    price: "$39/seat/month"
    source: "https://www.langchain.com/pricing"
    source_label: "LangChain pricing"
    source_id: langsmith-pricing
    verified_at: 2026-06-28
    note: "Includes 10k base traces/month, unlimited seats, email support, and access to Deployment, Sandboxes, Engine, and more."
  - date: 2026-06-28
    plan: "Enterprise"
    price: "Custom"
    source: "https://www.langchain.com/pricing"
    source_label: "LangChain pricing"
    source_id: langsmith-pricing
    verified_at: 2026-06-28
    note: "Listed for advanced hosting, security, support, custom seats, workspaces, SSO/RBAC, self-hosted, and hybrid deployment needs."
  - date: 2026-06-28
    plan: "LangSmith Deployment runs"
    price: "$0.005/run"
    source: "https://docs.langchain.com/langsmith/billing"
    source_label: "LangSmith billing"
    source_id: langsmith-billing
    verified_at: 2026-06-28
    note: "A run is one end-to-end invocation of a deployed LangGraph agent; uptime and model/API spend are separate."
---

# LangSmith

LangSmith is LangChain's hosted platform for observing, evaluating, improving, and deploying AI agents. It is strongest when a team is already building with LangChain or LangGraph and wants first-party traces, evals, prompts, monitoring, deployment, sandboxes, Fleet agents, and Engine optimization in one place.

The buyer question is not "do we need logs?" It is "do we need an agent control plane?" If the answer is yes, LangSmith belongs beside [LangGraph](/tools/langgraph/) in the shortlist.

## System Verdict

> **Pick LangSmith when LangChain or LangGraph is part of the production stack.** The fit is strongest for teams that need traces, evals, prompts, monitoring, deployment, and spend controls around stateful agents.
>
> **Skip it when you want open-source observability first.** [Langfuse](/tools/langfuse/) is the sharper comparison when self-hosting and open-source posture matter more than LangChain-native product integration.
>
> **Best plan guidance:** start on Developer for solo tracing. Move to Plus when a shared organization, team access, Deployment, Sandboxes, Engine, or higher included base trace volume is needed. Use Enterprise when SSO/RBAC, self-hosted or hybrid deployment, support SLA, custom seats, and governance are procurement requirements.

## Key Facts

| | |
|---|---|
| Core job | Agent and LLM observability, evals, prompts, deployment, sandboxes, Fleet, and Engine |
| Best ecosystem fit | LangChain and LangGraph |
| Developer plan | $0/seat/month, 5k base traces/month |
| Plus plan | $39/seat/month, 10k base traces/month, Deployment/Sandboxes/Engine access |
| Enterprise | Custom pricing with advanced hosting, security, and support |
| Trace retention | Base retention and extended retention tiers |
| Deployment meter | $0.005 per deployment run, plus uptime costs |
| Main cost risk | Trace volume, retention upgrades, deployment uptime, Fleet, Engine, sandboxes, and model provider spend |

## When To Pick LangSmith

- **You build with LangGraph.** LangSmith is the first-party path for traces, evals, deployment, and debugging around LangGraph agents.
- **You need trace-linked evals.** Teams can connect real agent behavior to datasets, scores, annotations, prompt changes, and quality review.
- **You want a managed deployment path.** LangSmith Deployment gives agent teams a hosted route instead of only self-managed runtime work.
- **You need buyer-visible controls.** Usage limits, retention settings, workspaces, rate limits, and Enterprise hosting options are part of the platform story.
- **You want one LangChain vendor.** Support, docs, product integration, and ecosystem direction all come from the same company behind LangChain and LangGraph.

## When To Pick Something Else

- **Open-source observability:** [Langfuse](/tools/langfuse/) if self-hosting, MIT-licensed product surface, and framework-neutral tracing are more important.
- **Evals-first engineering:** Braintrust when the buying center is evaluation infrastructure and experiment management.
- **Gateway control:** Helicone or LiteLLM when the need is caching, routing, failover, and provider-level gateway controls.
- **No-code automation:** [Dify](/tools/dify/) or [Flowise](/tools/flowise/) when the buyer wants an app builder, not an observability platform.
- **Raw agent framework:** [Pydantic AI](/tools/pydantic-ai/), [Mastra](/tools/mastra/), or [LangGraph](/tools/langgraph/) when the missing piece is agent code, not agent operations.

## Pricing

LangSmith pricing was checked on June 28, 2026 against LangChain's pricing page and LangSmith billing docs.

| Plan or meter | Current public shape | Buyer fit |
|---|---|---|
| Developer | $0/seat/month with 5k base traces/month | Solo developers, prototypes, personal projects |
| Plus | $39/seat/month with 10k base traces/month | Teams building and deploying agents |
| Enterprise | Custom | Self-hosted/hybrid hosting, SSO/RBAC, SLA, custom workspaces, support |
| Deployment runs | $0.005 per end-to-end deployed-agent run | Hosted agent invocation metering |
| Deployment uptime | Priced by deployment type | Stateful agent deployments that persist live databases |
| Trace retention | Base and extended retention tiers | Cost control, compliance, annotation, and eval workflows |

The practical buying advice: do not buy LangSmith on the seat price alone. Model trace volume, default retention, how many traces get upgraded by feedback or annotation workflows, deployment run volume, uptime, Fleet usage, Engine usage, sandbox compute, and third-party model costs.

## Failure Modes

- **Trace retention becomes a bill lever.** Feedback, annotation queues, and automation rules can auto-upgrade traces to extended retention.
- **Usage limits are not perfect spend limits.** LangSmith documents usage limiting as approximate, so teams still need monitoring and review.
- **Deployment costs are separate from traces.** Runs, uptime, and model/API calls can all grow independently.
- **It can be too much for simple apps.** A small chatbot might not need LangSmith until it has real production debugging, eval, or deployment pain.
- **Vendor fit matters.** LangSmith is strongest in the LangChain ecosystem. Teams that want framework-neutral or open-source-first tooling should compare alternatives.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline. Scoring follows the four-dimension rubric at [/about/scoring/](/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-28 against LangChain pricing, LangSmith observability materials, LangSmith billing docs, and LangSmith usage-and-billing docs.

## FAQ

**Is LangSmith only for LangChain?**
No. LangSmith can support framework-agnostic observability, but it is most natural for LangChain and LangGraph teams.

**Is LangSmith free?**
LangChain lists a Developer plan at $0/seat/month with included base traces. Production usage can still create usage charges.

**LangSmith vs Langfuse?**
LangSmith is the first-party LangChain platform. Langfuse is stronger when open-source posture, self-hosting, and framework neutrality are the main buying criteria.

## Sources

- [LangSmith observability](https://www.langchain.com/langsmith/observability): tracing, monitoring, and agent visibility positioning
- [LangChain pricing](https://www.langchain.com/pricing): Developer, Plus, Enterprise, and product access
- [LangSmith billing docs](https://docs.langchain.com/langsmith/billing): billing setup, limits, and Deployment run meter
- [LangSmith usage and billing docs](https://docs.langchain.com/langsmith/usage-and-billing): retention tiers, rate limits, usage limits, and auto-upgrade behavior

## Related

- **Category:** [AI Infrastructure](/categories/ai-infrastructure/) · [AI Automation](/categories/ai-automation/) · [AI Coding](/categories/ai-coding/)
- **Alternatives:** [Langfuse](/tools/langfuse/) · [LangGraph](/tools/langgraph/) · [Pydantic AI](/tools/pydantic-ai/) · [Dify](/tools/dify/)
