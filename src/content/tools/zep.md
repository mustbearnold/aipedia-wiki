---
type: tool
slug: zep
title: Zep
tagline: Production agent memory and context engineering platform with temporal context graphs, credit-based plans, hosted cloud, BYOK, BYOC, and Graphiti open-source context graph work.
category: ai-infrastructure
secondary_categories: [ai-automation]
company: Zep Software, Inc.
url: https://www.getzep.com
github_url: https://github.com/getzep/graphiti
pricing_model: freemium
price_range: "Free 10k credits/month / Flex $125/month / Flex Plus $375/month / Enterprise custom"
status: active
last_updated: 2026-06-28
last_verified: 2026-06-28
update_frequency: monthly
seo_title: "Zep Review: Agent Memory Pricing, Credits & Best Use Cases (June 2026)"
meta_description: "Zep review refreshed June 28, 2026: agent memory, temporal context graph, Flex, Flex Plus, Enterprise, credits, deployment models, Graphiti, and alternatives."
author: "aipedia.wiki Editorial"
best_plan: "Use the free 10k-credit path for prototypes, Flex when production agent memory needs 50k credits/month and basic limits, Flex Plus for 200k credits/month, observations, custom extraction, webhooks, analytics, and longer API logs, and Enterprise for SLA, BYOK, BYOC, HIPAA, audit logs, and custom rate limits."
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 7
  moat: 8
  longevity: 8
facts:
  best_for:
    value: "Agent teams that need persistent memory, temporal context graphs, and automated context assembly from chat history and business data."
    source: "https://www.getzep.com/"
    source_label: "Zep official site"
    source_id: zep-official
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Zep pricing lists a free 10k-credit prototyping path, Flex at $125/month or $1,250/year billed annually, Flex Plus at $375/month or $3,750/year billed annually, and Enterprise custom."
    source: "https://www.getzep.com/pricing/"
    source_label: "Zep pricing"
    source_id: zep-pricing
    verified_at: 2026-06-28
    next_review_at: 2026-07-12
    volatility: high
    confidence: high
  usage_model:
    value: "Credits are consumed by Episode size: one credit up to 350 bytes, another credit for each additional 350 bytes or part, with memory, retrieval, storage, threads, users, and graph storage listed as unmetered."
    source: "https://www.getzep.com/pricing/"
    source_label: "Zep pricing"
    source_id: zep-pricing
    verified_at: 2026-06-28
    next_review_at: 2026-07-12
    volatility: high
    confidence: high
  open_source_or_local:
    value: "Zep's Graphiti repository is Apache-2.0 licensed, but the Zep managed product is priced separately as a commercial agent-memory platform."
    source: "https://github.com/getzep/graphiti/blob/main/LICENSE"
    source_label: "Graphiti license"
    source_id: zep-graphiti-license
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Agent memory can contain sensitive user facts, business context, retrieved documents, and inferred relationships, so buyers need consent, deletion, retention, BYOK/BYOC, and audit-log review before production."
    source: "https://help.getzep.com/concepts"
    source_label: "Zep docs concepts"
    source_id: zep-docs-concepts
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
tags: [agent-memory, context-engineering, context-graph, graph-rag, temporal-memory, agents, graphiti, byok, byoc]
best_for:
  - AI agents that need persistent user and task memory
  - teams building assistants that must remember facts across sessions
  - products that need temporal context graphs instead of only vector retrieval
  - enterprises that need cloud, BYOK, BYOC, HIPAA, and audit-log procurement options
not_best_for:
  - teams that only need a vector database for document chunks
  - simple chatbots with no durable memory requirement
  - buyers who cannot govern sensitive memory extraction and deletion
  - teams that need a complete agent framework instead of a memory layer
quick_answer: >-
  Zep is a production agent-memory and context-engineering platform. Pick it when an AI product needs persistent memories, temporal context graphs, and context assembly across users, sessions, and business data. Compare Mem0 for managed/open-source memory choices, Qdrant or Weaviate for vector database control, and LangGraph or Mastra when the missing piece is agent orchestration.
price_history:
  - date: 2026-06-28
    plan: "Free prototyping"
    price: "10,000 credits/month"
    source: "https://www.getzep.com/pricing/"
    source_label: "Zep pricing"
    source_id: zep-pricing
    verified_at: 2026-06-28
    note: "Zep pricing describes a free prototyping path with 10,000 credits/month and limits."
  - date: 2026-06-28
    plan: "Flex"
    price: "$125/month or $1,250/year"
    source: "https://www.getzep.com/pricing/"
    source_label: "Zep pricing"
    source_id: zep-pricing
    verified_at: 2026-06-28
    note: "Includes 50,000 credits/month, 600 requests/minute, 5 projects, 10 custom entity/edge types, 1-day API logs, 30-day rollover, and $25 per extra 10k credits."
  - date: 2026-06-28
    plan: "Flex Plus"
    price: "$375/month or $3,750/year"
    source: "https://www.getzep.com/pricing/"
    source_label: "Zep pricing"
    source_id: zep-pricing
    verified_at: 2026-06-28
    note: "Includes 200,000 credits/month, 1,000 requests/minute, 10 projects, observations, custom extraction, webhooks, analytics, 7-day API logs, 60-day rollover, and $75 per extra 40k credits."
  - date: 2026-06-28
    plan: "Enterprise"
    price: "Custom"
    source: "https://www.getzep.com/pricing/"
    source_label: "Zep pricing"
    source_id: zep-pricing
    verified_at: 2026-06-28
    note: "Listed for custom credits, negotiated rates, guaranteed rate limits, SLA, unlimited projects, SOC 2 Type II, HIPAA BAA, audit and API logs retained for one year, Slack/Teams support, dedicated account manager, Cloud, BYOK, and BYOC deployment."
---

# Zep

Zep is an agent-memory and context-engineering platform. It is built for products where an agent needs to remember facts, relationships, and time-sensitive context across sessions instead of only retrieving documents from a vector index.

The plain-English fork: choose Zep when memory itself is the product risk. Choose a vector database when the problem is mostly document search.

## System Verdict

> **Pick Zep when agents need persistent, scoped memory.** It is strongest for assistants that must remember user facts, chat history, business data, relationships, and temporal context across sessions.
>
> **Skip it when you only need RAG storage.** [Qdrant](/tools/qdrant/), [Weaviate](/tools/weaviate/), and [Pinecone](/tools/pinecone/) fit better when the problem is vector search over documents.
>
> **Best plan guidance:** use the free 10k-credit route to test memory quality. Flex is the first self-serve production plan. Flex Plus is better when observations, custom extraction instructions, webhooks, analytics, and longer API logs matter. Enterprise is for SLA, BYOK, BYOC, HIPAA, audit logs, and custom rate limits.

## Key Facts

| | |
|---|---|
| Core job | Agent memory, temporal context graphs, and context assembly |
| Free path | 10,000 credits/month for prototyping |
| Flex | $125/month or $1,250/year, 50,000 credits/month |
| Flex Plus | $375/month or $3,750/year, 200,000 credits/month |
| Enterprise | Custom credits, negotiated rates, SLA, BYOK, BYOC, HIPAA, audit logs |
| Credit unit | Episode size, starting at 1 credit per 350 bytes |
| Open-source related project | Graphiti is Apache-2.0 licensed |

## When To Pick Zep

- **Your agent needs memory beyond chat history.** Zep is useful when facts, relationships, and context need to persist across sessions.
- **Temporal context matters.** The platform is designed around context graphs that can track changing facts over time.
- **You need managed memory infrastructure.** Zep Cloud avoids building memory extraction, graph storage, retrieval, and production operations from scratch.
- **You need enterprise deployment options.** Enterprise adds SLA, guaranteed rate limits, audit/API logs, HIPAA BAA, BYOK, BYOC, support, and custom rates.
- **You are testing memory as a capability.** The free 10k-credit path gives teams a lower-risk way to test before a production commitment.

## When To Pick Something Else

- **Managed or open-source memory fork:** [Mem0](/tools/mem0/) when the buyer wants a managed cloud plus Apache-2.0 OSS route around memories.
- **Vector search:** [Qdrant](/tools/qdrant/), [Weaviate](/tools/weaviate/), or [Pinecone](/tools/pinecone/) when the job is retrieval over documents and embeddings.
- **Agent orchestration:** [LangGraph](/tools/langgraph/), [Mastra](/tools/mastra/), or [CrewAI](/tools/crewai/) when the team needs the workflow/runtime layer rather than memory storage.
- **Observability and evals:** [LangSmith](/tools/langsmith/), [Braintrust](/tools/braintrust/), or [Langfuse](/tools/langfuse/) when debugging and release-quality evidence are the priority.
- **Search and extraction:** [Tavily](/tools/tavily/) or [Firecrawl](/tools/firecrawl/) when the missing data comes from live web context.

## Pricing

Zep pricing was checked on June 28, 2026 against the official pricing page.

| Plan | Price | Included shape | Buyer fit |
|---|---|---|---|
| Free prototyping | 10,000 credits/month | Limited free usage for tests | First memory-quality checks |
| Flex | $125/month or $1,250/year | 50,000 credits/month, 600 requests/minute, 5 projects, 1-day API logs | Early production agent memory |
| Flex Plus | $375/month or $3,750/year | 200,000 credits/month, 1,000 requests/minute, 10 projects, observations, custom extraction, webhooks, analytics, 7-day API logs | Production memory with more controls |
| Enterprise | Custom | Custom credits, negotiated rates, SLA, unlimited projects, SOC 2 Type II, HIPAA BAA, 1-year audit/API logs, BYOK, BYOC | Regulated and high-volume teams |

Credits are consumed by Episode size. Zep lists one credit for an Episode up to 350 bytes, another credit for each additional 350 bytes or part, and one eighth of a credit for webhook invocations where available. Memory, retrieval, storage, threads, users, and graph storage are listed as unmetered.

## Failure Modes

- **Bad memory is worse than no memory.** Incorrect, stale, or over-broad facts can make an agent feel confident for the wrong reason.
- **Consent and deletion matter.** Agent memory can store personal facts, preferences, account context, and business data.
- **Credit use depends on Episode design.** Payload size, ingestion volume, webhook usage, and extraction behavior drive cost.
- **A memory layer is not a full agent stack.** You still need orchestration, tools, evals, logs, permissions, and fallback behavior.
- **Enterprise controls may be non-optional.** BYOK, BYOC, HIPAA, audit logs, and retention terms can decide fit for regulated workloads.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline. Scoring follows the four-dimension rubric at [/about/scoring/](/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-28 against Zep pricing, official site metadata, docs concepts, and Graphiti licensing.

## FAQ

**Is Zep free?**
Zep lists a free prototyping route with 10,000 credits/month. Production plans start with Flex and Flex Plus, while Enterprise is custom.

**How does Zep charge?**
Zep uses credits based on Episode size. An Episode can be a chat message, JSON payload, or block of text.

**Zep vs Mem0?**
Both target agent memory. Zep leans into production context graphs and commercial deployment options. Mem0 is a strong comparison when the buyer wants a managed platform plus an Apache-2.0 open-source route.

## Sources

- [Zep official site](https://www.getzep.com/): product positioning and context engineering claims
- [Zep pricing](https://www.getzep.com/pricing/): Flex, Flex Plus, Enterprise, credits, limits, and deployment options
- [Zep docs concepts](https://help.getzep.com/concepts): product concepts and memory/context model
- [Graphiti repository](https://github.com/getzep/graphiti): open-source context graph project
- [Graphiti license](https://github.com/getzep/graphiti/blob/main/LICENSE): Apache-2.0 license

## Related

- **Category:** [AI Infrastructure](/categories/ai-infrastructure/) · [AI Automation](/categories/ai-automation/)
- **Alternatives:** [Mem0](/tools/mem0/) · [Qdrant](/tools/qdrant/) · [Weaviate](/tools/weaviate/) · [LangGraph](/tools/langgraph/)
