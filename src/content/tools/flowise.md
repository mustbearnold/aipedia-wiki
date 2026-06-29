---
type: tool
slug: flowise
title: Flowise
tagline: Open-source visual builder for AI agents and LLM workflows, with chatflows, agentflows, assistants, RAG pipelines, evaluations, tracing, teams, and self-hosting.
category: ai-automation
secondary_categories: [ai-infrastructure]
company: FlowiseAI
url: https://flowiseai.com
github_url: https://github.com/FlowiseAI/Flowise
pricing_model: open-source
price_range: "Open-source self-hosting; Flowise Cloud Free and Starter routes"
status: active
launched: 2023
last_updated: 2026-06-28
last_verified: 2026-06-28
update_frequency: monthly
seo_title: "Flowise Review: Open-Source AI Agent Builder, Workflows & Cloud Caveats (June 2026)"
meta_description: "Flowise review refreshed June 28, 2026: open-source AI agents and LLM workflows, AgentFlow V2, chatflows, RAG, production self-hosting, cloud plan caveats, and alternatives."
author: "aipedia.wiki Editorial"
best_plan: "Use self-hosting for serious evaluation, or Flowise Cloud Free for small tests; verify Starter pricing inside checkout before buying cloud capacity."
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 8
  moat: 6
  longevity: 7
facts:
  best_for:
    value: "Developers and technical operators building visual LLM workflows, chatflows, AgentFlow V2 agents, RAG pipelines, assistants, evaluations, tracing, and API-backed deployments."
    source: "https://docs.flowiseai.com/readme.md"
    source_label: "Flowise introduction docs"
    source_id: flowise-docs
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Flowise is open source for self-hosting. The docs describe Flowise Cloud Free with 2 flows and 2 assistants, plus a Starter plan with unlimited flows and assistants, but do not publish the Starter dollar price."
    source: "https://docs.flowiseai.com/migration-guide/cloud-migration.md"
    source_label: "Flowise Cloud migration docs"
    source_id: flowise-cloud-migration
    verified_at: 2026-06-28
    next_review_at: 2026-07-12
    volatility: high
    confidence: medium
  open_source_or_local:
    value: "Flowise documentation describes local, cloud, and established cloud-provider deployments, with production guidance for queue mode, PostgreSQL, S3 storage, and secrets management."
    source: "https://docs.flowiseai.com/configuration/running-in-production.md"
    source_label: "Flowise production docs"
    source_id: flowise-production-docs
    verified_at: 2026-06-28
    confidence: high
  watch_out_for:
    value: "Production Flowise needs operational ownership for queue mode, database choice, secrets, storage, rate limits, model keys, human approvals, and workflow checkpoints."
    source: "https://docs.flowiseai.com/configuration/running-in-production.md"
    source_label: "Flowise production docs"
    source_id: flowise-production-docs
    verified_at: 2026-06-28
    next_review_at: 2026-07-12
    volatility: medium
    confidence: high
tags: [ai-automation, agents, llm-workflows, rag, open-source, self-hosted, visual-builder, agentflow]
best_for:
  - technical teams that want visual AI workflow building with source control nearby
  - builders comparing chatflows, assistants, and agent workflows
  - teams that need self-hosted AI workflow experiments before buying a managed platform
  - RAG and agent prototypes that need evaluation, tracing, and API deployment paths
not_best_for:
  - non-technical business users who want a managed SaaS automation catalog
  - teams without an owner for hosting, databases, model keys, and workflow security
  - buyers who need a public cloud price table before evaluation
quick_answer: >-
  Flowise is a strong open-source visual builder for LLM workflows and agents. Use it when technical teams want chatflows, AgentFlow V2, RAG, evaluations, tracing, and self-hosting. Verify Flowise Cloud Starter pricing in checkout because the docs describe plan limits but do not publish a dollar price.
price_history:
  - date: 2026-06-28
    plan: "Open-source self-hosting"
    price: "Free software, infrastructure and model costs extra"
    source: "https://docs.flowiseai.com/configuration/deployment.md"
    source_label: "Flowise deployment docs"
    source_id: flowise-deployment-docs
    verified_at: 2026-06-28
    note: "Flowise can be deployed locally or on cloud providers. Production costs depend on infrastructure, database, storage, and model usage."
  - date: 2026-06-28
    plan: "Flowise Cloud Free"
    price: "Free cloud route with 2 flows and 2 assistants"
    source: "https://docs.flowiseai.com/migration-guide/cloud-migration.md"
    source_label: "Flowise Cloud migration docs"
    source_id: flowise-cloud-migration
    verified_at: 2026-06-28
    note: "Cloud migration docs describe Free limits and Starter as the upgrade path."
  - date: 2026-06-28
    plan: "Flowise Cloud Starter"
    price: "Starter plan, price not published in docs"
    source: "https://docs.flowiseai.com/migration-guide/cloud-migration.md"
    source_label: "Flowise Cloud migration docs"
    source_id: flowise-cloud-migration
    verified_at: 2026-06-28
    note: "Docs say Starter has unlimited flows and assistants and mention a first-month-free promotion, but exact current dollar pricing should be checked in Flowise Cloud checkout."
---

# Flowise

Flowise is an open-source visual builder for LLM workflows and agents. Its docs describe three main building blocks: Assistant, Chatflow, and Agentflow. The newer AgentFlow V2 surface is designed for explicit workflow orchestration with standalone nodes, visual dependencies, shared state, loops, conditionals, checkpoints, human-in-the-loop steps, streaming, and MCP tools.

That makes Flowise useful when a technical team wants a visual layer over agent and RAG workflows without giving up self-hosting. It is not the easiest choice for a non-technical operations team that only needs app-to-app automation.

## System Verdict

> **Pick Flowise when technical users need a visual LLM workflow and agent builder.** It is strongest for chatflows, AgentFlow V2 workflows, RAG pipelines, assistants, evaluations, tracing, API/SDK/CLI routes, and self-hosted experiments.
>
> **Skip it when the buyer is a non-technical ops team.** For broad business automation, [Zapier](/tools/zapier/), [Make](/tools/make/), [n8n](/tools/n8n/), or [Activepieces](/tools/activepieces/) is usually easier to govern.
>
> **Best plan guidance:** start self-hosted if the team can own infrastructure, or use Flowise Cloud Free for a small test. Verify Starter pricing in checkout because the docs describe unlimited flows and assistants but do not publish a dollar price.

## Key Facts

| | |
|---|---|
| Core job | Visual AI agent and LLM workflow builder |
| Main builders | Assistant, Chatflow, Agentflow |
| AgentFlow V2 | Nodes, dependencies, loops, conditionals, state, checkpoints, human input |
| Open-source route | Self-host locally or on cloud providers |
| Cloud route | Free plan and Starter plan described in docs |
| Production warning | Queue mode, PostgreSQL, storage, secrets, and rate limits need ownership |

## When To Pick Flowise

- **You want visual agent workflows.** AgentFlow V2 is built around explicit workflow orchestration, not only one-shot prompts.
- **You need RAG and chatflow prototypes.** Flowise is a natural shortlist for retrieval, assistants, and API-backed LLM apps.
- **You want self-hosting optionality.** Local and cloud-provider deployment docs make it viable for technical teams that need control.
- **You care about operational AI features.** Tracing, analytics, evaluations, human-in-the-loop patterns, and API routes are part of the product surface.

## When To Pick Something Else

- **Generic SaaS automation:** [Zapier](/tools/zapier/) or [Make](/tools/make/) for business users.
- **Technical workflow automation:** [n8n](/tools/n8n/) or [Activepieces](/tools/activepieces/) when app connectors and execution billing are the main problem.
- **AI app platform:** [Dify](/tools/dify/) if the buyer wants a broader AI app, chatbot, workflow, and publishing platform.
- **Low-level agent runtime:** [LangGraph](/tools/langgraph/) when developers need code-first durable agent architecture.

## Pricing

Flowise pricing was checked on June 28, 2026 against Flowise docs. The public docs confirm an open-source self-host route and describe Flowise Cloud Free and Starter. They do not publish the current Starter dollar price.

| Route | Buyer fit | What to verify |
|---|---|---|
| Self-hosted Flowise | Technical teams that can operate their own stack | Hosting, database, storage, model keys, secrets, upgrades, monitoring |
| Flowise Cloud Free | Small tests and imports within limits | 2 flows and 2 assistants in the docs |
| Flowise Cloud Starter | Cloud users who need more capacity | Exact checkout price, promotion terms, limits, support, data handling |

For production self-hosting, Flowise docs recommend more than a one-container hobby setup. They discuss queue mode, main servers, workers, PostgreSQL instead of SQLite at scale, storage, secrets management, and rate limits. Treat those as buying requirements, not optional polish.

## Failure Modes

- **Visual does not mean low-risk.** Agent flows can still call tools, write data, branch, loop, and pause for human input.
- **Self-hosting needs an operator.** Databases, storage, secrets, model keys, monitoring, rate limits, and upgrades need a named owner.
- **Cloud price is not fully public in docs.** Verify Starter cost and limits inside the live Cloud checkout before buying.
- **RAG quality needs evaluation.** Ingestion, chunking, retrieval, answer review, and source display still need tests.
- **Agent loops can burn model spend.** Put budget limits and logs around each workflow before giving agents write access.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline. Scoring follows the four-dimension rubric at [/about/scoring/](/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-28 against Flowise introduction docs, AgentFlow V2 docs, deployment docs, production docs, cloud migration docs, and GitHub repository.

## FAQ

**Is Flowise open source?**
Yes. Flowise has a public GitHub repository and docs for local and cloud-provider deployment.

**What is AgentFlow V2?**
AgentFlow V2 is Flowise's explicit workflow orchestration surface. The docs describe standalone nodes, visual dependencies, shared state, loops, conditionals, checkpoints, human input, streaming, and MCP tools.

**How much does Flowise Cloud cost?**
The docs describe Free and Starter plan behavior, including 2 flows and 2 assistants on Free and unlimited flows and assistants on Starter. They do not publish the Starter dollar price, so check live checkout before buying.

## Sources

- [Flowise official site](https://flowiseai.com/): product positioning
- [Flowise introduction docs](https://docs.flowiseai.com/readme.md): visual builder, agents, workflows, RAG, tracing, evaluations, teams, APIs
- [Flowise AgentFlow V2 docs](https://docs.flowiseai.com/using-flowise/agentflowv2.md): workflow orchestration, state, loops, human-in-the-loop, MCP
- [Flowise deployment docs](https://docs.flowiseai.com/configuration/deployment.md): local and cloud deployment routes
- [Flowise production docs](https://docs.flowiseai.com/configuration/running-in-production.md): production architecture, queue mode, database, storage, secrets
- [Flowise Cloud migration docs](https://docs.flowiseai.com/migration-guide/cloud-migration.md): Free and Starter plan details
- [Flowise GitHub repository](https://github.com/FlowiseAI/Flowise): open-source project and release surface

## Related

- **Category:** [AI Automation](/categories/ai-automation/) · [AI Infrastructure](/categories/ai-infrastructure/)
- **Alternatives:** [Dify](/tools/dify/) · [LangGraph](/tools/langgraph/) · [Langflow](/tools/langflow/) · [n8n](/tools/n8n/) · [Activepieces](/tools/activepieces/)
