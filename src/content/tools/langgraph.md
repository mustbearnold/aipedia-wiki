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
last_updated: 2026-05-10
last_verified: 2026-05-10
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
    verified_at: '2026-05-10'
    volatility: medium
    confidence: high
    next_review_at: '2026-08-10'
  pricing_anchor:
    value: "LangGraph is free and MIT-licensed; current paid LangSmith layers include Developer at $0/seat/month, Plus at $39/seat/month, Enterprise custom, and usage-based LangSmith Deployment for hosted agents."
    source: https://www.langchain.com/pricing
    source_label: LangChain pricing
    source_id: langgraph-pricing
    verified_at: '2026-05-10'
    volatility: high
    confidence: high
    next_review_at: '2026-06-10'
  runtime_architecture:
    value: "LangGraph is positioned as the orchestration runtime for durable execution, streaming, human-in-the-loop, and persistence, while LangSmith provides tracing, evaluation, prompts, and deployment across frameworks."
    source: https://docs.langchain.com/oss/python/langgraph/overview
    source_label: LangGraph documentation
    source_id: langgraph-docs
    verified_at: '2026-05-10'
    volatility: medium
    confidence: high
    next_review_at: '2026-08-10'
  deployment_billing:
    value: "LangSmith Deployment is the current hosted-agent layer formerly called LangGraph Platform; deployment runs are billed separately from trace/seat pricing, and uptime can add cost while a deployment stays live."
    source: https://docs.langchain.com/langsmith/billing
    source_label: LangSmith billing documentation
    source_id: langsmith-billing
    verified_at: '2026-05-10'
    volatility: high
    confidence: high
    next_review_at: '2026-06-10'
  open_source:
    value: "The GitHub repository identifies LangGraph as an MIT-licensed low-level orchestration framework for stateful agents and points JavaScript/TypeScript users to LangGraph.js and the JS docs."
    source: https://github.com/langchain-ai/langgraph
    source_label: LangGraph GitHub repository
    source_id: langgraph-repository
    verified_at: '2026-05-10'
    volatility: medium
    confidence: high
    next_review_at: '2026-08-10'
  watch_out_for:
    value: "LangGraph is a low-level developer framework, not a finished business app; teams own graph design, state, persistence, evaluation, deployment, and debugging choices."
    source: https://docs.langchain.com/oss/python/langgraph/overview
    source_label: LangGraph documentation
    source_id: langgraph-docs
    verified_at: '2026-05-10'
    volatility: medium
    confidence: high
    next_review_at: '2026-08-10'
tags: [agent-framework, graph, python, typescript, javascript, langchain, stateful, production, langsmith]
seo_title: "LangGraph: Features, Pricing & Review (May 2026)"
meta_description: "LangGraph is LangChain's MIT-licensed orchestration runtime for stateful production agents. Current May 2026 review covers LangSmith pricing, deployment billing, and alternatives."
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
  LangGraph is LangChain's low-level runtime for long-running, stateful agents and workflows. The library is MIT-licensed and free for Python and JavaScript/TypeScript teams; LangSmith adds paid observability and deployment, with Plus at $39/seat/month and usage-based deployment meters as of May 10, 2026. Pick it when you need durable execution, persistence, streaming, or human approval. Skip it for simple one-shot calls or no-code automation.
---

# LangGraph

LangGraph is LangChain's low-level orchestration runtime for stateful AI agents. Where LangChain gives you higher-level agent APIs, LangGraph gives developers explicit control over graphs, state, persistence, interrupts, streaming, and multi-agent workflows.

## System Verdict

> **Pick LangGraph if you are building production agents that need more than one LLM call.** It is strongest when the workflow must branch, loop, pause for approval, persist state, recover after failure, or coordinate multiple agents.
>
> **Skip it if the job is a simple prompt, tool call, or no-code workflow.** Direct provider SDKs, LangChain's higher-level agent API, Mastra, CrewAI, or LangFlow can be faster depending on the team and abstraction level.
>
> **Commercial reality:** the LangGraph library is free and MIT-licensed. The paid layer is LangSmith: Developer is $0/seat/month, Plus is $39/seat/month, Enterprise is custom, and hosted LangSmith Deployment can add deployment-run and uptime costs.

## Key Facts

| | |
|---|---|
| **Last verified** | May 10, 2026 |
| **License** | MIT for the library |
| **Languages** | Python and JavaScript/TypeScript |
| **Current product shape** | LangGraph for orchestration; LangSmith for tracing, evaluation, prompts, and deployment |
| **Official proof points** | LangChain's docs/site list companies including Klarna, Uber, J.P. Morgan, Replit, Elastic, and more |
| **Core concepts** | Durable execution, persistence, streaming, interrupts, memory, subgraphs |
| **Library cost** | $0 |
| **LangSmith plans** | Developer $0/seat/month; Plus $39/seat/month; Enterprise custom |
| **Hosted deployment** | LangSmith Deployment, formerly LangGraph Platform |
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

## Pricing

| Product | Current public price | Notes |
|---|---|---|
| LangGraph library | $0 | MIT-licensed open-source framework |
| LangSmith Developer | $0/seat/month | Includes one seat and a free monthly trace allowance |
| LangSmith Plus | $39/seat/month | Adds team collaboration and one dev-sized LangSmith Deployment |
| LangSmith Deployment | Usage-based beyond the included dev deployment | Deployed LangGraph agents can incur $0.005 deployment-run charges plus uptime costs while the deployment database stays live |
| LangSmith Enterprise | Custom | Adds advanced hosting, security, support, and enterprise deployment options |

Pricing verified May 10, 2026 against LangChain's public pricing and LangSmith billing docs. Model/API provider costs are separate from LangSmith.

## Failure Modes

- **Low-level by design.** LangGraph does not hide the agent architecture. Teams must still design state, tools, routing, evals, and deployment behavior.
- **Billing has multiple meters.** Seats, traces, deployment runs, uptime, and third-party model costs can all matter once LangSmith is in production.
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

Produced by the aipedia.wiki editorial pipeline. Last verified May 10, 2026 against LangGraph official materials, LangGraph Python and JavaScript docs, LangChain pricing, LangSmith billing docs, the LangGraph GitHub repository, and the LangChain/LangGraph v1.0 announcement.

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

- 2026-05-10: Refreshed LangGraph pricing, hosted deployment naming, source-backed buyer guidance, and current verification language.
- 2026-04-18: Initial agent-framework review.

## Related

- **Category:** [AI Automation](/categories/ai-automation/) and [AI Coding](/categories/ai-coding/)
- **Compare:** LangGraph vs [Mastra](/tools/mastra/) - LangGraph vs [CrewAI](/tools/crewai/)
- **See also:** [LangFlow](/tools/langflow/) - [Microsoft Agent Framework](/tools/microsoft-agent-framework/) - [Langfuse](/tools/langfuse/)
