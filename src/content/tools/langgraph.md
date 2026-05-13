---
type: tool
slug: langgraph
title: LangGraph
tagline: LangChain's low-level orchestration runtime for long-running, stateful AI agents. MIT-licensed Python and JavaScript libraries; paid spend comes from LangSmith observability and deployment.
category: ai-automation
company: LangChain
url: https://www.langchain.com/langgraph
pricing_model: freemium
price_range: "$0 library / $39 Plus / usage-based deployment"
status: active
launched: 2024-01
last_updated: 2026-05-13
last_verified: 2026-05-13
update_frequency: monthly
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
    value: "Best for engineering teams building long-running, stateful agents and workflows that need durable execution, streaming, human-in-the-loop controls, persistence, or multi-agent coordination."
    source: https://docs.langchain.com/oss/python/langgraph/overview
    source_label: LangGraph documentation
    source_id: langgraph-docs
    verified_at: '2026-05-13'
    volatility: medium
    confidence: high
    next_review_at: '2026-08-13'
  pricing_anchor:
    value: "LangGraph is free and MIT-licensed; current paid LangSmith layers include Developer at $0/seat/month with 5k included base traces, Plus at $39/seat/month with 10k included base traces and a free dev-sized deployment, Enterprise custom, plus usage meters: $2.50 per 1k base traces, $5 per 1k extended (400-day) traces, $0.005 per deployment run, $0.0007/minute dev uptime, and $0.0036/minute production uptime."
    source: https://www.langchain.com/pricing
    source_label: LangChain pricing
    source_id: langgraph-pricing
    verified_at: '2026-05-13'
    volatility: high
    confidence: high
    next_review_at: '2026-06-13'
  runtime_architecture:
    value: "LangGraph is positioned as the orchestration runtime for durable execution, streaming, human-in-the-loop, and persistence, while LangSmith provides tracing, evaluation, prompts, and deployment across frameworks."
    source: https://docs.langchain.com/oss/python/langgraph/overview
    source_label: LangGraph documentation
    source_id: langgraph-docs
    verified_at: '2026-05-13'
    volatility: medium
    confidence: high
    next_review_at: '2026-08-13'
  deployment_billing:
    value: "LangSmith Deployment (formerly LangGraph Platform) is the current hosted-agent layer. Each end-to-end deployment run is $0.005, dev deployment uptime is $0.0007/minute, production deployment uptime is $0.0036/minute, and Plus also includes 500 free Fleet runs per month with $0.05 per additional Fleet run."
    source: https://docs.langchain.com/langsmith/billing
    source_label: LangSmith billing documentation
    source_id: langsmith-billing
    verified_at: '2026-05-13'
    volatility: high
    confidence: high
    next_review_at: '2026-06-13'
  open_source:
    value: "The GitHub repository identifies LangGraph as an MIT-licensed low-level orchestration framework for stateful agents and points JavaScript/TypeScript users to LangGraph.js and the JS docs."
    source: https://github.com/langchain-ai/langgraph
    source_label: LangGraph GitHub repository
    source_id: langgraph-repository
    verified_at: '2026-05-13'
    volatility: medium
    confidence: high
    next_review_at: '2026-08-13'
  watch_out_for:
    value: "LangGraph is a low-level developer framework, not a finished business app; teams own graph design, state, persistence, evaluation, deployment, and debugging choices. Opus 4.7's effective-token bump (1.0 to 1.35x more tokens vs 4.6) also re-prices any Claude-backed LangGraph agent."
    source: https://docs.langchain.com/oss/python/langgraph/overview
    source_label: LangGraph documentation
    source_id: langgraph-docs
    verified_at: '2026-05-13'
    volatility: medium
    confidence: high
    next_review_at: '2026-08-13'
tags: [agent-framework, graph, python, typescript, javascript, langchain, stateful, production, langsmith]
seo_title: "LangGraph: Features, Pricing & Review (May 2026)"
meta_description: "LangGraph is LangChain's MIT-licensed orchestration runtime for stateful production agents. Verified May 13, 2026: LangSmith Plus is $39/seat/mo, deployment runs are $0.005, dev uptime is $0.0007/min, production uptime is $0.0036/min."
author: "aipedia.wiki Editorial"
best_for:
  - Python and JavaScript teams building production agents
  - long-running stateful agent workflows
  - teams already using LangChain or LangSmith
  - graph-native agent architectures with loops, conditional branches, and human approval
not_best_for:
  - simple single-turn LLM calls
  - no-code teams that want a visual builder
  - teams trying to avoid the LangChain ecosystem entirely
quick_answer: >-
  LangGraph is LangChain's low-level runtime for long-running, stateful agents and workflows. The library is MIT-licensed and free for Python and JavaScript/TypeScript teams; LangSmith adds paid observability and deployment, with Plus at $39/seat/month, $0.005 per deployment run, $0.0007/minute dev uptime, and $0.0036/minute production uptime as of May 13, 2026. Pick it when you need durable execution, persistence, streaming, or human approval. Skip it for simple one-shot calls or no-code automation.
price_history:
  - date: 2026-05-13
    plan: "LangSmith Developer"
    price: "$0/seat/mo"
    source: "https://www.langchain.com/pricing"
    source_label: "LangChain pricing"
    source_id: langgraph-pricing
    note: "5k included base traces per month with pay-as-you-go above the included allowance."
  - date: 2026-05-13
    plan: "LangSmith Plus"
    price: "$39/seat/mo"
    source: "https://www.langchain.com/pricing"
    source_label: "LangChain pricing"
    source_id: langgraph-pricing
    note: "10k included base traces, one free dev-sized LangSmith Deployment, and 500 included Fleet runs per month."
  - date: 2026-05-13
    plan: "LangSmith Deployment runs"
    price: "$0.005/run"
    source: "https://docs.langchain.com/langsmith/billing"
    source_label: "LangSmith billing"
    source_id: langsmith-billing
    note: "Per end-to-end invocation of a deployed LangGraph agent. Dev uptime billed at $0.0007/minute; production uptime billed at $0.0036/minute."
  - date: 2026-05-13
    plan: "LangSmith traces"
    price: "$2.50 / 1k base, $5 / 1k extended"
    source: "https://www.langchain.com/pricing"
    source_label: "LangChain pricing"
    source_id: langgraph-pricing
    note: "Base traces include 14-day retention; extended traces include 400-day retention. Upgrading a base trace to extended retention costs $2.50 per 1k conversions."
  - date: 2026-05-10
    plan: "LangSmith Plus"
    price: "$39/seat/mo"
    source: "https://www.langchain.com/pricing"
    source_label: "LangChain pricing"
    source_id: langgraph-pricing
    note: "Historical check; refreshed on 2026-05-13 with explicit dev/production uptime rates, fleet pricing, and base/extended trace tiers."
---

# LangGraph

LangGraph is LangChain's low-level orchestration runtime for stateful AI agents. Where LangChain gives you higher-level agent APIs, LangGraph gives developers explicit control over graphs, state, persistence, interrupts, streaming, and multi-agent workflows.

## System Verdict

> **Pick LangGraph if you are building production agents that need more than one LLM call.** It is strongest when the workflow must branch, loop, pause for approval, persist state, recover after failure, or coordinate multiple agents.
>
> **Skip it if the job is a simple prompt, tool call, or no-code workflow.** Direct provider SDKs, LangChain's higher-level agent API, Mastra, CrewAI, or LangFlow can be faster depending on the team and abstraction level.
>
> **Commercial reality:** the LangGraph library is free and MIT-licensed. The paid layer is LangSmith: Developer is $0/seat/month (5k base traces), Plus is $39/seat/month (10k base traces plus one dev-sized deployment), Enterprise is custom, and LangSmith Deployment adds $0.005 per deployment run, $0.0007/minute dev uptime, and $0.0036/minute production uptime on top of any per-trace and Fleet costs.

## Key Facts

| | |
|---|---|
| **Last verified** | May 13, 2026 |
| **License** | MIT for the library |
| **Languages** | Python and JavaScript/TypeScript |
| **Current product shape** | LangGraph for orchestration; LangSmith for tracing, evaluation, prompts, and deployment |
| **Official proof points** | LangChain's docs/site list companies including Klarna, Uber, J.P. Morgan, Replit, Elastic, and more |
| **Core concepts** | Durable execution, persistence, streaming, interrupts, memory, subgraphs |
| **Library cost** | $0 |
| **LangSmith plans** | Developer $0/seat/month (5k base traces); Plus $39/seat/month (10k base traces, one dev deployment, 500 Fleet runs); Enterprise custom |
| **LangSmith traces** | $2.50 per 1k base traces (14-day retention); $5 per 1k extended traces (400-day retention) |
| **LangSmith Deployment** | $0.005 per deployment run; $0.0007/minute dev uptime; $0.0036/minute production uptime; $0.05 per additional Fleet run |
| **Hosted deployment naming** | LangSmith Deployment, formerly LangGraph Platform |
| **Related** | [Deep Agents](https://docs.langchain.com/oss/python/deepagents/overview): LangChain's higher-level harness built on LangGraph |

## When to pick LangGraph

- **Long-running stateful agents.** Research pipelines, support workflows, code agents, and process automations that need to remember state and resume cleanly fit LangGraph's design.
- **Durable execution matters.** LangGraph is built for workflows that can recover from failures and keep running over time, not just one request-response loop.
- **Human-in-the-loop workflows.** Interrupts let a team inspect, edit, approve, or reject state before the agent continues.
- **Multi-agent or subgraph systems.** Subgraphs help split complex agent behavior into smaller units without giving up central state control.
- **LangSmith is already part of the stack.** The first-party tracing, evals, Studio, and Deployment path are smoother when the team is comfortable with LangChain's ecosystem.

## When to pick something else

- **Simple one-shot LLM calls:** direct [OpenAI](https://platform.openai.com), [Anthropic](https://platform.claude.com), or [Google](https://ai.google.dev) SDKs.
- **TypeScript-first agents with product-style ergonomics:** [Mastra](/tools/mastra/) is purpose-built for TypeScript teams.
- **Visual no-code or low-code building:** [LangFlow](/tools/langflow/) gives a canvas for LangChain and LangGraph workflows.
- **Role-based multi-agent prototypes:** [CrewAI](/tools/crewai/) is easier when the mental model is "crew of specialist agents" rather than explicit graph state.
- **Azure-aligned enterprise:** [Microsoft Agent Framework](/tools/microsoft-agent-framework/) is the more natural fit when Azure AI Foundry is the default platform.

## What changed recently

- **LangSmith deployment uptime is now itemized.** The current public pricing breaks out $0.0007/minute for dev deployments and $0.0036/minute for production deployments alongside the $0.005 per-run charge.
- **Trace pricing is split base vs extended.** Base traces ($2.50 per 1k, 14-day retention) and extended traces ($5 per 1k, 400-day retention) are now separately metered, with a $2.50 per 1k upgrade fee to move base traces into extended retention.
- **Fleet runs are included on Plus.** Plus now includes 500 Fleet runs per month with $0.05 per additional Fleet run.
- **Claude Opus 4.7 is the new flagship behind many LangGraph agents.** Anthropic's April 16 release narrowly retook the agentic-coding lead, and Cursor, Windsurf, Zed, Continue, and Copilot shipped Opus 4.7 support within 24 hours. Per-token rates are unchanged, but the new tokenizer produces 1.0 to 1.35x more tokens for the same input, so any LangGraph agent on Opus needs to re-benchmark cost before migrating.
- **Claude Managed Agents added dreaming, outcomes, and orchestration on May 6.** This puts Anthropic's hosted agent platform in more direct overlap with LangSmith Deployment for teams that prefer a vendor-managed agent harness.

## Pricing

| Product | Current public price | Notes |
|---|---|---|
| LangGraph library | $0 | MIT-licensed open-source framework |
| LangSmith Developer | $0/seat/month | One seat plus 5k included base traces per month |
| LangSmith Plus | $39/seat/month | 10k included base traces, one dev-sized LangSmith Deployment, 500 Fleet runs per month |
| LangSmith traces (base) | $2.50 per 1k | 14-day retention |
| LangSmith traces (extended) | $5 per 1k | 400-day retention; $2.50 per 1k to upgrade base traces into extended retention |
| LangSmith Deployment runs | $0.005 per run | One end-to-end invocation of a deployed LangGraph agent |
| LangSmith Deployment uptime | $0.0007/minute dev; $0.0036/minute production | Listed per minute the deployment database is live |
| LangSmith Fleet runs | $0.05 per additional run | Plus includes 500 Fleet runs per month |
| LangSmith Enterprise | Custom | Adds alternative hosting, custom SSO/RBAC, and dedicated support |

Pricing verified May 13, 2026 against LangChain's public pricing and LangSmith billing docs. Model/API provider costs are separate from LangSmith.

## Failure Modes

- **Low-level by design.** LangGraph does not hide the agent architecture. Teams must still design state, tools, routing, evals, and deployment behavior.
- **Billing has multiple meters.** Seats, base traces, extended traces, deployment runs, dev uptime, production uptime, Fleet runs, and third-party model costs can all matter once LangSmith is in production.
- **Idle dev deployments still bill.** A development LangSmith Deployment that sits idle still incurs $0.0007/minute of uptime (~$30/month per dev deployment); production deployments are roughly five times that. Tear down unused deployments.
- **Opus 4.7 tokenizer can re-price Claude-backed graphs.** Same Anthropic sticker price as 4.6, but 1.0 to 1.35x more effective tokens. Re-benchmark Claude-backed agents before migrating models.
- **Verbose for simple work.** A single LLM call or straightforward tool call is usually cleaner with a direct SDK or LangChain's higher-level agent API.
- **LangChain conventions still show up.** LangGraph can be used standalone, but many real projects use LangChain message, tool, and model abstractions around it.
- **Python examples are the deepest path.** JavaScript/TypeScript support is real, but Python remains the more mature documentation and community path.

## Against the Alternatives

| | LangGraph | Mastra | Microsoft Agent Framework | CrewAI | AG2 |
|---|---|---|---|---|---|
| **Primary fit** | Stateful production agents | TypeScript agents and workflows | Azure enterprise agents | Role-based crews | AutoGen-style multi-agent work |
| **Main language** | Python + JavaScript/TypeScript | TypeScript | .NET + Python | Python | Python |
| **License posture** | MIT library | Open source | Open source | Open source | Open source |
| **Control model** | Explicit graph state and edges | Agent/workflow primitives | Agents plus workflows | Agents with roles/goals | Conversational agent patterns |
| **Hosted path** | LangSmith Deployment | Mastra Cloud/platform path | Azure AI Foundry | CrewAI Enterprise | Self-host/community first |
| **Best for** | Durable stateful agents | TS-first product teams | Microsoft/Azure buyers | Fast crew prototypes | AutoGen continuation |

## Methodology

Produced by the aipedia.wiki editorial pipeline. Last verified May 13, 2026 against LangGraph official materials, LangGraph Python and JavaScript docs, LangChain pricing, LangSmith billing docs, the LangGraph GitHub repository, the LangChain/LangGraph v1.0 announcement, [Anthropic's April 16 Claude Opus 4.7 release coverage](/news/2026-04-16-anthropic-claude-opus-47/), and the [May 6 Claude Managed Agents update](/news/2026-05-06-claude-managed-agents-dreaming-outcomes-orchestration/).

## FAQ

**Is LangGraph really free?**
Yes. The LangGraph library is MIT-licensed and free to use. Paid spend starts when a team uses LangSmith services such as observability, evaluation, or hosted deployment.

**What replaced LangGraph Platform?**
LangChain's current public product language calls the hosted layer LangSmith Deployment. LangSmith billing docs describe it as the deployment product formerly called LangGraph Platform.

**Do I need LangChain to use LangGraph?**
No. LangGraph can be used standalone, but the docs commonly use LangChain components for models and tools, and many teams pair it with LangSmith for tracing and evals.

**What's the difference between LangGraph and LangChain?**
LangChain is the higher-level agent framework. LangGraph is the orchestration runtime underneath or beside it when you need durable execution, persistence, human-in-the-loop, streaming, and explicit state control.

**Does LangGraph compete with Mastra?**
Yes, especially for TypeScript teams choosing an agent/workflow framework. LangGraph has the broader LangChain/LangSmith ecosystem; Mastra often feels more native for TypeScript-first product engineering.

## Sources

- [LangGraph official site](https://www.langchain.com/langgraph)
- [LangGraph Python docs](https://docs.langchain.com/oss/python/langgraph/overview)
- [LangGraph JavaScript docs](https://docs.langchain.com/oss/javascript/langgraph/overview)
- [LangChain pricing](https://www.langchain.com/pricing)
- [LangSmith billing docs](https://docs.langchain.com/langsmith/billing)
- [LangGraph GitHub repository](https://github.com/langchain-ai/langgraph)
- [LangChain and LangGraph v1.0 announcement](https://www.langchain.com/blog/langchain-langgraph-1dot0)

## Review History

- 2026-05-13: Itemized LangSmith Deployment uptime ($0.0007/min dev, $0.0036/min production), base vs extended trace pricing, Fleet runs, and added a price_history block. Folded in Claude Opus 4.7 tokenizer re-pricing and the May 6 Claude Managed Agents release as buyer context.
- 2026-05-10: Refreshed LangGraph pricing, hosted deployment naming, source-backed buyer guidance, and current verification language.
- 2026-04-18: Initial agent-framework review.

## Related

- **Category:** [AI Automation](/categories/ai-automation/) and [AI Coding](/categories/ai-coding/)
- **Compare:** LangGraph vs [Mastra](/tools/mastra/) - LangGraph vs [CrewAI](/tools/crewai/)
- **See also:** [LangFlow](/tools/langflow/) - [Microsoft Agent Framework](/tools/microsoft-agent-framework/) - [Langfuse](/tools/langfuse/)
