---
type: tool
slug: langflow
title: Langflow
tagline: Open-source visual canvas for LangChain-based LLM workflows, agents, MCP servers, and RAG pipelines. The June 2026 release line added Langflow 1.10 Desktop and 1.10.1 release candidates, while security patch pressure remains a production concern.
category: ai-automation
company: langflow
url: https://langflow.org
github_url: https://github.com/langflow-ai/langflow
pricing_model: open-source
price_range: "$0 self-host · managed terms vary"
status: active
launched: 2023-04
last_updated: 2026-06-25
last_verified: 2026-06-25
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 9
  moat: 3
  longevity: 7
facts:
  best_for:
    value: "Best for engineers who want a visual, open-source canvas for RAG, LangChain/LangGraph prototypes, agents, and API-deployable AI workflows."
    source: https://www.langflow.org/
    source_label: Langflow official site
    source_id: langflow-official
    verified_at: 2026-06-25
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  pricing_anchor:
    value: "The core Langflow project is open source and self-hostable; the former DataStax-hosted Langflow service was deprecated March 9, 2026 and fully shut down April 9, 2026, so buyers should verify the current first-party, desktop, or partner cloud route before relying on managed hosting."
    source: https://www.langflow.org/
    source_label: Langflow official site
    source_id: langflow-pricing
    verified_at: 2026-06-25
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
  workflow_surface:
    value: "Langflow turns components into flows that can be run, tested, deployed through the API, and served for agentic or retrieval applications rather than acting as a generic SaaS automation suite."
    source: https://docs.langflow.org/
    source_label: Langflow documentation
    source_id: langflow-docs
    verified_at: 2026-06-25
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  open_source:
    value: "The GitHub repository is the best source for current license, release cadence, security releases, install paths, and community-maintained integrations."
    source: https://github.com/langflow-ai/langflow
    source_label: Langflow GitHub repository
    source_id: langflow-repository
    verified_at: 2026-06-25
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  watch_out_for:
    value: "Buyers needing hard SLAs, deep enterprise controls, or non-LLM business-app automation should still validate managed terms and pin/patch self-hosted versions, because June 2026 release candidates and recent CVE coverage make version hygiene part of the buying decision."
    source: https://docs.langflow.org/
    source_label: Langflow documentation
    source_id: langflow-docs
    verified_at: 2026-06-25
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
tags: [llm-workflows, ai-agents, langchain, open-source, visual-builder, no-code, rag, automation, langgraph]
seo_title: "Langflow: Features, Pricing & Review (June 2026)"
meta_description: "Langflow is a free, open-source visual builder for LangChain LLM workflows, AI agents, MCP servers, and RAG pipelines. June 2026 review updated for the post-DataStax hosted shutdown path and the v1.9-v1.10 memory/stability work."
author: "aipedia.wiki Editorial"
best_for:
  - developers prototyping LangChain and LangGraph workflows visually
  - AI engineers building RAG pipelines
  - teams deploying flows as REST or MCP endpoints
  - open-source-first shops avoiding vendor lock-in
not_best_for:
  - non-technical users without LangChain familiarity
  - teams needing general business SaaS automation
  - organizations needing a vendor SLA out of the box
quick_answer: >-
  Langflow is the open-source visual canvas for LangChain LLM workflows. Pick it for fast RAG and agent prototypes that deploy as REST or MCP endpoints. Skip for general SaaS automation (n8n or Zapier) or if a vendor SLA is required. Production teams should patch aggressively after the 2026 security disclosures.
price_history:
  - date: 2026-03-09
    plan: "DataStax Langflow cloud"
    price: "Deprecated"
    source: "https://langflow.org"
    source_label: "Source"
    source_id: langflow-pricing
    verified_at: 2026-06-25
    note: "DataStax-hosted Langflow deprecated; shutdown April 9, 2026. OSS continues."
  - date: 2026-04-15
    plan: "Langflow OSS"
    price: "$0"
    source: "https://langflow.org"
    source_label: "Source"
    source_id: langflow-pricing
    verified_at: 2026-06-25
    note: "Self-host continues free. Version 1.8.4 released April 1, 2026."
  - date: 2026-05-13
    plan: "Langflow Cloud + OSS"
    price: "$0"
    source: "https://langflow.org"
    source_label: "Source"
    source_id: langflow-pricing
    verified_at: 2026-06-25
    note: "Free first-party Langflow Cloud tier live alongside OSS. Version 1.9.2 released May 1, 2026."
  - date: 2026-06-08
    plan: "Langflow Cloud + OSS"
    price: "$0 self-host · free cloud start"
    source: "https://github.com/langflow-ai/langflow/releases"
    source_label: "Langflow GitHub releases"
    source_id: langflow-releases
    verified_at: 2026-06-25
    note: "Version 1.9.6 is the latest stable release checked; 1.9.3 was a critical security release, so production users should pin and patch."
  - date: 2026-06-23
    plan: "Langflow OSS / managed routes"
    price: "$0 self-host; managed terms vary"
    source: "https://www.langflow.org/"
    source_label: "Langflow official site"
    source_id: langflow-pricing
    verified_at: 2026-06-25
    note: "Official site still positions Langflow as the open-source agentic/RAG builder; June 2026 blog highlights v1.10 Desktop and the release feed shows 1.10.1 release candidates, while the old DataStax hosted service remains shut down."
---

# Langflow

Langflow is the open-source visual canvas for LangChain-based LLM workflows, agents, MCP servers, and RAG pipelines. The June 2026 project story is operational maturity: the Langflow team shipped Langflow 1.10 Desktop, the GitHub release feed showed 1.10.1 release candidates on June 22, and recent security coverage means production buyers should treat patching as part of the deployment plan. DataStax-hosted Langflow was deprecated March 9, 2026 and shut down April 9, 2026; the OSS project continues independently.

## System Verdict

> **Pick Langflow if the workload is LangChain-shaped.** Drag nodes for models, prompts, retrievers, tools, and agents onto a canvas, connect them, and deploy the result as a REST or MCP endpoint. 150+ pre-built components cover most RAG and agent patterns without writing orchestration code.
>
> **Skip it if the problem is general business automation.** [n8n](/tools/n8n/) handles SaaS glue better. [Zapier](/tools/zapier/) covers 9,000+ apps. Langflow's integration library is LLM-centric, not business-app-centric.
>
> **Who pays which tier:** Self-host for full control, verify the current first-party or partner cloud path if managed hosting matters, or use a partner support contract for teams that need SLA-backed deployment.

## Key Facts

| | |
|---|---|
| **License** | MIT (fully open source) |
| **Current release focus** | June 2026 Langflow 1.10 Desktop and 1.10.1 release candidates |
| **Core product** | Visual canvas for LangChain and LangGraph flows |
| **Components** | 150+ pre-built nodes: models, prompts, retrievers, tools, agents, embeddings |
| **Deployment** | REST API · MCP server · Python export · self-host or managed route |
| **Managed hosting** | Verify the current first-party or partner cloud route before production commitments |
| **DataStax cloud status** | Deprecated March 9, 2026 · shut down April 9, 2026 |
| **Self-host** | Free · Docker · Python · unlimited |
| **Supported models** | Major API providers and local models through LangChain-compatible components; verify exact model names in the current component docs |
| **LangGraph support** | Native (multi-agent, stateful memory, tool calling) |

Every volatile data point above was verified against vendor documentation on 2026-06-25. See Sources.

## What it actually is

A Python application with a React canvas that lets engineers assemble LangChain and LangGraph flows as draggable nodes and edges. Each node is a LangChain component: a model, a prompt template, a retriever, a vector store, an agent, a tool.

Flows run in real time on the canvas for debugging, with per-node inputs and outputs visible inline. Finished flows export three ways: as Python code for integration into an existing codebase, as a REST API endpoint for external apps to hit, or as an MCP server for direct consumption by AI agents that speak the Model Context Protocol.

The moat is thin. Flowise offers a near-identical visual LangChain experience. LangGraph Studio ships from LangChain directly. Langflow's edge is active development, the MCP server export, and the larger component library, but the category is crowded and the core idea is not defensible on its own.

## When to pick Langflow

- **The pipeline is a LangChain or LangGraph flow.** Retrievers, chains, agents, and tool-calling nodes are first-class. Faster than writing orchestration code by hand.
- **RAG prototypes need fast iteration.** A document-loader-to-answer chain lands in minutes. Swap embedders, retrievers, or models without touching code.
- **The deploy target is an MCP server.** Version 1.9 exposes flows as MCP endpoints with telemetry on the deployments API, so downstream agents can consume them without custom glue.
- **Multi-agent handoff is the hard part.** LangGraph integration handles stateful agent coordination better than ad-hoc orchestration.
- **The team prefers open source over managed SaaS.** Self-host on a $10 VPS, run locally during development, or verify the current managed route when ops budget is zero.

## When to pick something else

- **General SaaS automation (CRM, email, Slack, forms):** [n8n](/tools/n8n/) self-hosted or [Zapier](/tools/zapier/). Langflow is LLM-centric, not business-app-centric.
- **Cost-efficient visual automation at scale:** [Make](/tools/make/). Operations-based billing for non-AI workflows.
- **Customer-facing chat or voice agents:** [Voiceflow](/tools/voiceflow/). Purpose-built conversation designer.
- **Pure code-first agent control:** LangGraph directly, or CrewAI. No visual canvas, but full code clarity.
- **Hard-SLA LangChain hosting:** LangSmith or LangGraph Platform from LangChain itself for explicit uptime contracts. Langflow managed routes may cover convenience, but buyers should verify SLA language before production commitments.

## Pricing

Langflow is MIT-licensed and free to self-host. Managed hosting terms should be checked directly because the old DataStax-hosted service is gone and partner clouds can vary.

| Option | Price | Notes |
|------|-------|-------|
| Self-host (Docker, Python, Kubernetes) | $0 | Full control. VPS cost typically $5 to $20/month. |
| Current managed route | Verify live terms | Useful when users want to avoid infrastructure; do not rely on the old DataStax-hosted path. |
| Cloud partners (IBM watsonx, Render, Railway) | Partner pricing | Optional managed hosting through ecosystem vendors. Verify current partner list on [langflow.org](https://langflow.org). |
| Ecosystem support contracts | Custom | SLA-backed deployment through partner integrators. |

*Prices and release status verified 2026-06-25 via [langflow.org](https://langflow.org), [Langflow documentation](https://docs.langflow.org/), and [Langflow GitHub releases](https://github.com/langflow-ai/langflow/releases). DataStax-hosted Langflow was deprecated March 9, 2026 and shut down April 9, 2026; do not assume old DataStax URLs or data remain available.*

## Against the alternatives

| | Langflow | Flowise | [n8n](/tools/n8n/) | LangGraph (code) |
|---|---|---|---|---|
| **License** | MIT | Apache 2.0 | Fair-code | MIT |
| **Focus** | LangChain LLM flows | LangChain LLM flows | General automation + AI | Code-first agents |
| **Visual canvas** | Yes | Yes | Yes | No |
| **Component count** | 150+ | ~120 | 500+ (broader categories) | N/A |
| **MCP server export** | Yes (1.9+) | Partial | Via code node | Direct |
| **Best for** | LangChain prototyping | Simpler LLM flows | SaaS + AI workflows | Production agent code |
| **Moat** | Thin, ecosystem-driven | Thin, similar niche | License + AI Agent nodes | Framework depth |

## Failure modes

- **Moat is thin.** Flowise, LangGraph Studio, and several smaller projects offer overlapping functionality. Switching cost is low, which cuts both ways.
- **LangChain lock-in.** Flows assume LangChain abstractions. Migrating to raw SDK calls or LlamaIndex requires rewriting the logic.
- **Large flows clutter fast.** Canvases past 40 nodes become hard to navigate. Sub-flows and careful grouping help; exporting to Python for maintenance is often the answer.
- **Not pure no-code.** Non-template use assumes familiarity with LangChain concepts (chains, retrievers, agents, tool calling). Operators without that grounding stall.
- **DataStax cloud shutdown.** Teams that stood up workflows on DataStax-hosted Langflow before March 2026 had to migrate to self-host or another partner by the April 9, 2026 cutoff; data left on the hosted service was deleted after that date.
- **Component quality varies.** Community-contributed nodes ship at uneven maturity. Core nodes are solid; some integrations lag model releases.
- **Version churn and patch pressure.** The 1.9.x line included a critical security release, June 2026 reporting covered exposed-instance vulnerabilities, and the release feed showed 1.10.1 release candidates on June 22. Pin versions for production and schedule upgrade testing.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-06-25 against [langflow.org](https://langflow.org), the [Langflow GitHub releases](https://github.com/langflow-ai/langflow/releases), [Langflow blog](https://www.langflow.org/blog), and the [Langflow documentation](https://docs.langflow.org/).

## FAQ

**Is Langflow free?**
Yes. MIT-licensed and free to self-host with no usage caps. A $5 to $20/month VPS covers small self-hosted deployments, but production teams should still pin versions, monitor security releases, and verify current managed-hosting terms before depending on a cloud route ([Langflow GitHub](https://github.com/langflow-ai/langflow)).

**What happened to DataStax Langflow?**
DataStax deprecated its hosted Langflow service March 9, 2026 and shut it down April 9, 2026. All DataStax Langflow data was scheduled for deletion at shutdown. The open-source Langflow project continues independently, but teams should verify the current managed-hosting route rather than relying on old DataStax Langflow assumptions.

**Langflow vs Flowise?**
Both are open-source visual LangChain builders. Langflow has a larger component library, native LangGraph support, and MCP server export. Flowise is simpler and lighter-weight. Most teams will feel small differences between them.

**Langflow vs n8n?**
Langflow targets LangChain LLM pipelines. [n8n](/tools/n8n/) targets general business automation with 500+ SaaS integrations. Pick Langflow for RAG and agent prototypes. Pick n8n for workflows that glue CRM, email, and Slack together.

**Can Langflow flows be deployed to production?**
Yes. Flows export as REST API endpoints, MCP servers, or Python code. Pinning a Langflow version and running behind a reverse proxy is the standard production pattern.

## Sources

- [Langflow official site](https://langflow.org): docs, components, and tutorials
- [Langflow GitHub](https://github.com/langflow-ai/langflow): source, releases, and license
- [Langflow documentation](https://docs.langflow.org/): component reference and deployment guides
- [DataStax Langflow deprecation notice](https://docs.datastax.com/en/langflow/index.html): March 2026 shutdown schedule

## Related

- **Category:** [AI Automation](/categories/ai-automation/)
- **See also:** [n8n](/tools/n8n/) · [Zapier](/tools/zapier/) · [Make](/tools/make/) · [Voiceflow](/tools/voiceflow/)
