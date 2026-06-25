---
type: tool
slug: crewai
title: CrewAI
tagline: Open-source Python framework for orchestrating role-based multi-agent teams, plus Basic cloud and custom Enterprise deployment/monitoring. Public releases show 1.14.8 alpha builds and 1.14.7 release-candidate/alpha tags as of June 24, 2026.
category: ai-automation
company: crewai
url: 'https://www.crewai.com'
github_url: https://github.com/crewAIInc/crewAI
pricing_model: open-source
price_range: "Free Basic and MIT core · Enterprise custom"
status: active
launched: 2023-12
last_updated: 2026-06-24
last_verified: 2026-06-24
update_frequency: monthly
seo_title: "CrewAI: Features, Pricing & Review (June 2026)"
meta_description: "CrewAI is an open-source Python multi-agent framework. Basic is free with 50 workflow executions, Enterprise is custom, and public releases show alpha/RC churn as of June 24, 2026."
author: "aipedia.wiki Editorial"
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 7
  value: 8
  moat: 6
  longevity: 6
facts:
  best_for:
    value: Best for Python teams prototyping and operating role-based multi-agent workflows with an open-source framework and
      optional cloud/enterprise platform for deployment, observability, triggers, and team controls.
    source: https://www.crewai.com/
    source_label: CrewAI official site
    source_id: crewai-official
    verified_at: '2026-06-24'
    volatility: medium
    confidence: high
    next_review_at: '2026-07-01'
  pricing_anchor:
    value: CrewAI spans open-source framework use, a Free Basic cloud plan with 50 included/maximum executions, and an Enterprise
      plan with custom pricing sized to workflow. The live pricing page no longer publishes the older $99/mo entry or Ultra dollar figures.
    source: https://www.crewai.com/pricing
    source_label: CrewAI pricing
    source_id: crewai-pricing
    verified_at: '2026-06-24'
    volatility: high
    confidence: high
    next_review_at: '2026-07-01'
  open_source_or_local:
    value: GitHub repository is the proof point for open-source evaluation. On the June 24, 2026 check, the public releases feed showed 1.14.8 alpha/pre-release builds and 1.14.7 release-candidate/alpha builds; AiPedia could not verify a stable 1.14.7 release from the public release feed.
    source: https://github.com/crewAIInc/crewAI/releases
    source_label: CrewAI GitHub releases
    source_id: crewai-repository
    verified_at: '2026-06-24'
    volatility: medium
    confidence: high
    next_review_at: '2026-07-01'
  runtime_architecture:
    value: Docs drive implementation assumptions around agents, crews, flows, tasks, triggers, tools, memory, knowledge, guardrails,
      deployment, observability, and Enterprise console workflows.
    source: https://docs.crewai.com/
    source_label: CrewAI documentation
    source_id: crewai-docs
    verified_at: '2026-06-24'
    volatility: medium
    confidence: high
    next_review_at: '2026-07-01'
  watch_out_for:
    value: CrewAI is not a turnkey business outcome by itself; teams still need tool permissions, evals, observability, error
      handling, cost controls, and human review. Multi-agent runs multiply LLM calls quickly even when the framework license is free.
    source: https://docs.crewai.com/
    source_label: CrewAI documentation
    source_id: crewai-docs
    verified_at: '2026-06-24'
    volatility: medium
    confidence: high
    next_review_at: '2026-07-01'
tags: [ai-agents, multi-agent, open-source, python, orchestration, framework, developer]
best_for:
  - Python developers prototyping multi-agent workflows
  - teams wanting role-based agent design without graph plumbing
  - startups integrating agents into existing Python codebases
  - researchers experimenting with hierarchical agent patterns
not_best_for:
  - JavaScript-first teams
  - cost-sensitive apps with strict LLM budget caps
  - production workflows requiring guaranteed output consistency
  - teams needing a no-code visual builder
quick_answer: >-
  CrewAI is a leading role-based multi-agent framework for Python. The core framework is free and open-source, while the public cloud pricing page shows Basic as Free with 50 included/maximum executions and Enterprise as custom. The June 24, 2026 GitHub release check showed 1.14.8 alpha builds and 1.14.7 release-candidate/alpha builds, so do not treat a stable 1.14.7 line as verified from that feed. Pick it for fast multi-agent prototypes and Python-first agent workflows; skip for cost-capped production or non-Python stacks.
price_history:
  - date: 2026-06-24
    plan: "Basic / Enterprise"
    price: "Basic Free; Enterprise Custom"
    source: "https://crewai.com/pricing"
    source_label: "Source"
    source_id: crewai-pricing
    verified_at: 2026-06-24
    note: "Public pricing still shows Basic as Free with 50 included/maximum executions and Enterprise as Custom. GitHub releases showed 1.14.8 alpha/pre-release builds and 1.14.7 release-candidate/alpha builds; AiPedia could not verify a stable 1.14.7 release from the public release feed."
  - date: 2026-06-02
    plan: "Basic / Enterprise"
    price: "Basic Free; Enterprise Custom"
    source: "https://crewai.com/pricing"
    source_label: "Source"
    source_id: crewai-pricing
    verified_at: 2026-06-24
    note: "Public pricing page now shows Basic as Free with 50 included/maximum executions and Enterprise as Custom. Earlier third-party $99/mo and Ultra dollar figures were removed from AiPedia buyer guidance."
---

# CrewAI

CrewAI is an open-source Python framework for orchestrating role-based AI agent teams. The MIT-licensed core is free; CrewAI's hosted surface adds Studio, deployment, tracing, OpenTelemetry, triggers, workflow chat, and an Enterprise path for SSO, RBAC, dedicated support, and customer-managed infrastructure.

The June 24, 2026 GitHub release check showed 1.14.8 alpha/pre-release builds and 1.14.7 release-candidate/alpha builds. AiPedia could not verify a stable 1.14.7 release from that public feed, so buyers should pin a tested package version instead of assuming the visible alpha/RC train is production-safe. LLM API costs are billed separately by the provider, so the framework can be free while a badly scoped multi-agent run is still expensive.

## System Verdict

> **Pick CrewAI if you are a Python team that wants role-based agent orchestration without writing graph plumbing.** Each agent gets a role, goal, backstory, and tool set. That abstraction ships multi-agent prototypes faster than [LangGraph](/tools/langflow/)'s lower-level graph API.
>
> **Skip it for production-critical workloads, tight cost caps, or non-Python stacks.** Multi-agent LLM calls multiply quickly. Debugging handoffs still means combing verbose logs, not inspecting a visual graph.
>
> **Who pays which tier:** Free open-source for prototypes and internal tools. Basic cloud is free when 50 executions are enough. Enterprise is custom when production automations need larger execution volumes, SSO, RBAC, customer-managed infrastructure, dedicated support, or compliance review.

## Key Facts

| | |
|---|---|
| **Current release signal** | GitHub showed 1.14.8 alpha/pre-release builds and 1.14.7 release-candidate/alpha builds on the June 24 check |
| **Buyer default** | Pin a tested package version; do not assume alpha or RC tags are production-safe |
| **License** | MIT (core framework) |
| **Language** | Python only (no JS/TS SDK) |
| **Process types** | Sequential · Hierarchical · Consensual |
| **Deployment paths** | Self-host free · Basic cloud · custom Enterprise platform |
| **Basic plan** | Free · 50 included/maximum executions on the hosted pricing page |
| **Enterprise tier** | Custom · sized to workflow · SSO, RBAC, dedicated support, customer-managed infrastructure options |
| **Model support** | Bring API keys/providers through the framework and supported integrations; LLM spend is separate |
| **GitHub releases** | Stable 1.14.7 could not be verified from the public release feed on June 24, 2026 |

Every data point above was verified against vendor sources on 2026-06-24. See Sources.

## What it actually is

One Python library plus a hosted control plane. The library defines `Agent`, `Task`, `Crew`, and `Tool` primitives. A crew runs its agents sequentially, hierarchically (manager delegates), or consensually (agents discuss).

The Enterprise platform adds deployment, observability, and team collaboration on top of crews built with the open-source framework. Compliance features (SOC 2, HIPAA) live here, not in the core library.

The moat is thin. The role-based pattern is easy to copy and competing frameworks are adding similar abstractions. Positioning rests on developer experience and the hosted platform, not protocol lock-in.

## When to pick CrewAI

- **Python shop prototyping multi-agent flows.** Role-based setup is faster to author than graph nodes.
- **Hierarchical delegation is the natural shape.** Manager agent routes subtasks to specialists. CrewAI models this directly.
- **Model-agnostic stack.** Swap OpenAI for Anthropic or a local Ollama model without rewriting the crew.
- **Budget cares about licensing, not LLM tokens.** Self-host the framework, pay only API costs.
- **Need enterprise compliance later.** Prototype on open-source, graduate to Enterprise when SOC 2 or HIPAA becomes a procurement gate.

## When to pick something else

- **Non-Python stack:** [n8n](/tools/n8n/) or [Zapier](/tools/zapier/) for visual JS-friendly workflows.
- **No-code agent builder:** [Relevance AI](/tools/relevance-ai/) for business teams without developers.
- **Stateful agents with portable memory:** [Letta](/tools/letta/).
- **Visual graph editor on top of LangChain:** [Langflow](/tools/langflow/).
- **Voice-first agent UX:** [Voiceflow](/tools/voiceflow/).
- **Strict production state control:** LangGraph. Lower-level, more deterministic.

## Pricing

| Plan | Price | Key limits |
|------|-------|------------|
| Open Source | Free | Full framework, self-host, community support |
| Basic | Free | CrewAI cloud, Studio visual editor, standard tools/triggers, GitHub integration, private agent/tool repositories, 50 included and maximum executions |
| Enterprise | Custom | Sized-to-workflow executions, enterprise connectors, SSO, RBAC, customer or CrewAI infrastructure, dedicated support, onboarding, deployment, and development help |

*Pricing verified 2026-06-24 via [CrewAI pricing](https://crewai.com/pricing). The public page now shows Basic as Free and Enterprise as Custom; earlier third-party $99/mo and ~$120K/year Ultra figures should not be treated as current public pricing.*

LLM API costs are separate. A complex crew can burn several dollars per execution without tight caps because planners, workers, tools, retries, and review loops all add calls. Default to cheaper or smaller models for inner-loop agents and reserve expensive frontier reasoning models for planner or final-review roles.

## Against the alternatives

| | CrewAI | LangGraph | [Letta](/tools/letta/) |
|---|---|---|---|
| **Primary abstraction** | Role-based crews | State graphs | Stateful agents with memory blocks |
| **Ease of start** | Highest | Mid | Mid |
| **Production state control** | Mid | Highest | Mid |
| **Cross-session memory** | Basic | Manual | Native, typed, portable |
| **Language support** | Python only | Python + JS | Python + TS |
| **Hosted option** | Enterprise platform | LangGraph Platform | Letta Cloud |
| **Best viewed as** | Fast prototyping framework | Deterministic production runtime | Memory-first agent platform |

## Failure modes

- **LLM cost amplification.** Multiple agents, multiple calls per task. A four-agent crew can 10x the tokens of a single-agent pipeline. Budget controls are the user's responsibility.
- **Output inconsistency.** Agents loop, drift from roles, or produce malformed outputs. Pydantic output schemas help, not a full fix.
- **Debugging is log-archaeology.** No visual execution graph. Traces are verbose and force human parsing.
- **Python only.** Teams on JS, Go, or Rust must wrap CrewAI behind a Python service.
- **Enterprise pricing is gated.** Enterprise is custom on the public page, which frustrates procurement comparisons.
- **Moat is thin.** The role-based pattern is documented and copyable. Competing frameworks are converging.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-06-24 against the [CrewAI GitHub releases](https://github.com/crewAIInc/crewAI/releases), [CrewAI pricing page](https://crewai.com/pricing), and [CrewAI documentation](https://docs.crewai.com/).

## FAQ

**Is CrewAI free?**
Yes. The core framework is MIT-licensed and fully free to self-host. The hosted Basic plan is also listed as Free on the public pricing page, with 50 included/maximum executions. You still supply LLM API keys or pay provider/model costs separately. Enterprise is custom.

**What is the current CrewAI version?**
On the June 24, 2026 check, GitHub releases showed 1.14.8 alpha/pre-release builds and 1.14.7 release-candidate/alpha builds. AiPedia could not verify a stable 1.14.7 release from the public release feed, so production buyers should pin and test an explicit package version. See [releases](https://github.com/crewAIInc/crewAI/releases).

**CrewAI vs LangGraph?**
CrewAI uses role-based agents with goals and backstories. Faster to prototype. LangGraph uses explicit state graphs. More control over production behavior. CrewAI wins on time-to-first-crew; LangGraph wins on deterministic production flows.

**Does CrewAI support local models?**
Yes. CrewAI is model-agnostic through LiteLLM, so Ollama, vLLM, and local OpenAI-compatible endpoints all work without code changes.

**How expensive does a CrewAI run get?**
A four-agent crew on expensive reasoning models can hit several dollars per run without token budgets. Put hard caps on `max_iter`, enforce timeouts, and tier model assignment before shipping anything production-adjacent.

## Sources

- [CrewAI pricing page](https://crewai.com/pricing): Enterprise tiers and execution limits, verified 2026-06-24
- [CrewAI GitHub releases](https://github.com/crewAIInc/crewAI/releases): public alpha, release-candidate, and release feed status, verified 2026-06-24
- [CrewAI documentation](https://docs.crewai.com/): agents, crews, flows, triggers, observability, and Enterprise workflows, verified 2026-06-24

## Related

- **Category:** [AI Automation](/categories/ai-automation/)
