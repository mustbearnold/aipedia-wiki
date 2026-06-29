---
type: tool
slug: mem0
title: Mem0
tagline: Memory layer for AI agents that persists user, session, and agent context across conversations, with a managed Platform and Apache-2.0 open-source self-hosting path.
category: ai-infrastructure
secondary_categories: [ai-automation, ai-search]
company: Mem0
url: https://mem0.ai
github_url: https://github.com/mem0ai/mem0
pricing_model: freemium
price_range: "Free 10K memories, Starter $19/mo, Growth $79/mo, Pro around $249-$250/mo, Enterprise custom"
status: active
launched: 2024
last_updated: 2026-06-28
last_verified: 2026-06-28
update_frequency: monthly
seo_title: "Mem0 Review: AI Agent Memory, Pricing & Open Source (June 2026)"
meta_description: "Mem0 review refreshed June 28, 2026: managed agent memory, open-source self-hosting, pricing caveats, graph memory, retrieval, MCP, and alternatives."
author: "aipedia.wiki Editorial"
best_plan: "Use Free for proof of fit, Starter or Growth for managed production tests, Pro when graph/entity memory matters, Enterprise for governance or custom terms, and OSS only when self-hosting is required."
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 8
  moat: 7
  longevity: 8
facts:
  best_for:
    value: "AI assistants, agents, and support workflows that need persistent user, session, and agent memories across conversations, with either a managed Platform or self-hosted open-source route."
    source: "https://docs.mem0.ai/platform/overview"
    source_label: "Mem0 Platform overview"
    source_id: mem0-platform-overview
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Mem0 pricing metadata and rendered pricing HTML show a free tier with 10,000 memories, Starter at $19/month, Growth at $79/month, Pro around $249-$250/month with a current desktop/mobile mismatch, and Enterprise custom."
    source: "https://mem0.ai/pricing"
    source_label: "Mem0 pricing"
    source_id: mem0-pricing
    verified_at: 2026-06-28
    next_review_at: 2026-07-12
    volatility: high
    confidence: medium
  platform_vs_oss:
    value: "Mem0 Platform is managed and production-oriented, while Mem0 Open Source is Apache-2.0 and self-hosted with user-managed vector database, LLM, embedder, and infrastructure costs."
    source: "https://docs.mem0.ai/platform/platform-vs-oss"
    source_label: "Mem0 Platform vs Open Source"
    source_id: mem0-platform-vs-oss
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  open_source:
    value: "The Mem0 GitHub repository is Apache-2.0 licensed."
    source: "https://github.com/mem0ai/mem0/blob/main/LICENSE"
    source_label: "Mem0 license"
    source_id: mem0-license
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Memory can improve personalization, but bad extraction, stale facts, weak deletion flows, or insufficient user controls can make agents feel wrong or invasive."
    source: "https://docs.mem0.ai/platform/platform-vs-oss"
    source_label: "Mem0 Platform vs Open Source"
    source_id: mem0-platform-vs-oss
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
tags: [agent-memory, llm-memory, memory-layer, rag, mcp, open-source, apache-2, personalization, vector-search]
best_for:
  - agents that need durable user preferences and context
  - AI assistants where users should not repeat themselves every session
  - support, productivity, education, and health-adjacent workflows that need scoped memory review
  - engineering teams deciding between managed memory and self-hosting
not_best_for:
  - one-off chatbots with no repeat users
  - teams without a deletion, consent, and privacy review plan
  - simple RAG where a vector database is enough
  - high-risk use cases that need deterministic records rather than inferred memories
quick_answer: >-
  Mem0 is best when an AI product needs persistent, scoped memory across sessions. Pick the managed Platform when speed, dashboard, webhooks, and autoscaling matter. Pick open source only when you need infrastructure control. Avoid it if the app cannot explain, edit, delete, or audit memories safely.
price_history:
  - date: 2026-06-28
    plan: "Free"
    price: "Free"
    source: "https://mem0.ai/pricing"
    source_label: "Mem0 pricing"
    source_id: mem0-pricing
    verified_at: 2026-06-28
    note: "Pricing metadata and rendered page show Free with 10,000 memories."
  - date: 2026-06-28
    plan: "Starter"
    price: "$19/month"
    source: "https://mem0.ai/pricing"
    source_label: "Mem0 pricing"
    source_id: mem0-pricing
    verified_at: 2026-06-28
    note: "Rendered page shows Starter at $19/month."
  - date: 2026-06-28
    plan: "Growth"
    price: "$79/month"
    source: "https://mem0.ai/pricing"
    source_label: "Mem0 pricing"
    source_id: mem0-pricing
    verified_at: 2026-06-28
    note: "Rendered page shows Growth at $79/month."
  - date: 2026-06-28
    plan: "Pro"
    price: "$249-$250/month"
    source: "https://mem0.ai/pricing"
    source_label: "Mem0 pricing"
    source_id: mem0-pricing
    verified_at: 2026-06-28
    note: "Desktop HTML showed $249/month while mobile pricing copy showed $250/month; use live checkout for the final price."
  - date: 2026-06-28
    plan: "Enterprise"
    price: "Custom"
    source: "https://mem0.ai/pricing"
    source_label: "Mem0 pricing"
    source_id: mem0-pricing
    verified_at: 2026-06-28
    note: "Enterprise is routed to app.mem0.ai/enterprise."
---

# Mem0

Mem0 is a memory layer for AI agents. It stores and retrieves durable user, session, and agent context so an AI assistant can remember preferences, prior interactions, and useful facts across conversations.

It comes in two routes: Mem0 Platform, a managed hosted service, and Mem0 Open Source, a self-hosted Apache-2.0 path for teams that want infrastructure and data control.

## System Verdict

> **Pick Mem0 when memory is a product feature, not a prompt trick.** It is a good fit when users return over time and expect the agent to remember preferences, past context, or prior decisions.
>
> **Skip it when a vector database is enough.** If the job is only "retrieve chunks from a document set," [Weaviate](/tools/weaviate/), [Pinecone](/tools/pinecone/), [Qdrant](/tools/qdrant/), or pgvector may be simpler.
>
> **Best plan guidance:** use Free to test memory quality and deletion flows. Use Starter or Growth for managed production tests. Use Pro when graph/entity memory and higher managed needs matter. Use Enterprise for custom terms and governance. Use OSS only when self-hosting is a requirement, because you inherit vector DB, LLM, embedder, and ops work.

## Key Facts

| | |
|---|---|
| Core job | Persistent memory for AI agents |
| Product routes | Managed Platform and Open Source |
| Open-source license | Apache-2.0 |
| Platform setup | Managed vector store, rerankers, dashboard, and infrastructure |
| OSS setup | Self-managed library or server with vector DB, LLM, embedder, and storage choices |
| Free tier | 10,000 memories |
| Paid public plans | Starter $19/month, Growth $79/month, Pro around $249-$250/month |
| Enterprise | Custom |
| Main risk | Bad memories, stale memories, privacy controls, deletion UX, and explainability |

## When To Pick Mem0

- **Users return over time.** Memory matters when the user expects continuity between sessions.
- **Personalization is core.** Preferences, recurring tasks, support history, and agent state can become product value.
- **You need managed memory quickly.** Mem0 Platform removes vector database, reranker, and LLM configuration work.
- **You need self-hosting optionality.** Mem0 OSS gives teams an Apache-2.0 route with their own provider and infrastructure choices.
- **You want agent-tool integrations.** The docs include SDK, REST, MCP, CLI, LangChain, CrewAI, LlamaIndex, Vercel AI SDK, and coding-agent usage paths.

## When To Pick Something Else

- **Plain vector search:** [Weaviate](/tools/weaviate/), [Pinecone](/tools/pinecone/), or [Qdrant](/tools/qdrant/) when retrieval over documents is the main job.
- **Open-source app memory inside a framework:** [LangGraph](/tools/langgraph/) when memory is part of a broader graph state design.
- **No-code AI app building:** [Dify](/tools/dify/) when the buyer needs an app platform more than a standalone memory service.
- **Notes and personal knowledge:** [Mem](/tools/mem/) or [Capacities](/tools/capacities/) when the product is for humans managing notes, not developers adding memory to agents.
- **Enterprise work search:** [Glean](/tools/glean/) when permission-aware company search is the core requirement.

## Pricing

Mem0 pricing was checked on June 28, 2026 against the official pricing page and docs. The current public pricing surface has one caveat: the rendered HTML showed Pro at $249/month on one surface and $250/month on another, so checkout should decide the exact dollar figure.

| Plan | Price | Buyer fit |
|---|---|---|
| Free | Free with 10,000 memories | Memory quality proof of fit |
| Starter | $19/month | Small managed projects |
| Growth | $79/month | Production trials and larger managed use |
| Pro | Around $249-$250/month | Higher managed needs and graph/entity memory evaluation |
| Enterprise | Custom | Custom limits, governance, support, and enterprise terms |
| Open Source | Free license, infrastructure separate | Self-hosting, custom providers, data residency, and cost control |

The practical advice: test memory quality before buying. Review what gets stored, how conflicts are resolved, how users can inspect and delete memories, how stale facts decay, and how memory retrieval affects answers. A memory layer can make an agent feel dramatically better, but it can also make it feel invasive or wrong if controls are weak.

## Failure Modes

- **Bad memories create bad personalization.** If extraction stores the wrong fact, future answers can degrade.
- **Stale memories need review.** Preferences and facts change; memory systems need update, decay, and deletion paths.
- **Privacy is product design.** Users should know what is remembered and how to remove it.
- **Self-hosting is not free operations.** OSS teams still run the vector store, LLMs, embeddings, dashboard/server, auth, and backups.
- **Memory is not source truth.** Agent memories should not replace auditable business records for high-stakes decisions.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline. Scoring follows the four-dimension rubric at [/about/scoring/](/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-28 against Mem0 Platform docs, Platform vs OSS docs, Open Source docs, pricing page, GitHub repository, and license.

## FAQ

**Is Mem0 open source?**
Yes. The Mem0 repository is Apache-2.0 licensed. The hosted Platform is a managed product with its own pricing.

**Mem0 vs a vector database?**
A vector database stores and retrieves embeddings. Mem0 is a memory layer that extracts, manages, and searches durable memories for agents.

**Is Mem0 free?**
Mem0 publishes a Free tier with 10,000 memories and an Apache-2.0 open-source route. Managed production plans cost extra.

## Sources

- [Mem0 official site](https://mem0.ai): product positioning
- [Mem0 pricing](https://mem0.ai/pricing): Free, Starter, Growth, Pro, Enterprise public pricing surface
- [Mem0 Platform overview](https://docs.mem0.ai/platform/overview): managed product and feature overview
- [Mem0 Platform vs Open Source](https://docs.mem0.ai/platform/platform-vs-oss): hosted versus self-hosted comparison
- [Mem0 Open Source overview](https://docs.mem0.ai/open-source/overview): OSS setup, defaults, and self-hosted scope
- [Mem0 GitHub repository](https://github.com/mem0ai/mem0): source repository and README
- [Mem0 license](https://github.com/mem0ai/mem0/blob/main/LICENSE): Apache-2.0 license

## Related

- **Category:** [AI Infrastructure](/categories/ai-infrastructure/) · [AI Automation](/categories/ai-automation/) · [AI Search](/categories/ai-search/)
- **Alternatives:** [Weaviate](/tools/weaviate/) · [LangGraph](/tools/langgraph/) · [Dify](/tools/dify/) · [Mem](/tools/mem/)
