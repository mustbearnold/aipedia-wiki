---
type: tool
slug: weaviate
title: Weaviate
tagline: Open-source vector database and managed cloud for RAG, semantic search, hybrid search, multi-tenancy, embeddings, and AI-native retrieval.
category: ai-infrastructure
secondary_categories: [ai-search, ai-automation]
company: Weaviate
url: https://weaviate.io
github_url: https://github.com/weaviate/weaviate
pricing_model: open-source
price_range: Free self-host/cloud entry; Flex from $45/mo; Plus from $280/mo; Premium from $400/mo; AI services usage-based
status: active
launched: 2019
last_updated: 2026-06-10
last_verified: 2026-06-10
update_frequency: monthly
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
  flagship_model:
    value: "Weaviate vector database plus Weaviate Cloud database AI services for embeddings, Query Agent, and Engram memory."
    source: "https://weaviate.io/"
    source_label: "Weaviate official site"
    source_id: weaviate-best-for
    verified_at: 2026-06-10
    next_review_at: 2026-09-10
    confidence: high
  best_paid_tier:
    value: "Weaviate Cloud Premium ($400/mo starting) when managed service, dedicated deployment, 99.95% uptime, and 1-hour Sev 1 response matter; Flex ($45/mo) for low-commit shared-cloud entry and Plus ($280/mo) for a higher shared-cloud floor."
    source: "https://weaviate.io/pricing"
    source_label: "Weaviate pricing"
    source_id: weaviate-best-paid-tier
    verified_at: 2026-06-10
    next_review_at: 2026-09-10
    confidence: high
  best_for:
    value: "Hybrid search, RAG, metadata filtering, multi-tenancy, open-source vector infrastructure, and agent memory when Engram-managed context is part of the architecture."
    source: "https://weaviate.io/"
    source_id: weaviate-best-for
    verified_at: 2026-06-10
    confidence: high
  add_ons:
    value: "Weaviate Embeddings $0.025 to $0.065 per 1M tokens by model; Query Agent free to try at 1,000 requests/month or $30/org/month with 4,000 included requests plus usage-based overage."
    source: "https://weaviate.io/pricing"
    source_label: "Weaviate pricing"
    source_id: weaviate-add-ons
    verified_at: 2026-06-10
    next_review_at: 2026-09-10
    confidence: high
  agent_memory:
    value: "Engram by Weaviate became generally available on June 3, 2026 as a managed memory and context service for agents inside Weaviate Cloud, with a free tier."
    source: "https://weaviate.io/blog/engram-generally-available"
    source_label: "Weaviate Engram GA blog"
    source_id: weaviate-engram-ga
    verified_at: 2026-06-10
    next_review_at: 2026-09-10
    confidence: high
tags: [vector-database, open-source, rag, semantic-search, hybrid-search, embeddings, retrieval]
seo_title: "Weaviate Review: Vector Database, Engram & Cloud Pricing (June 2026)"
meta_description: "June 2026 Weaviate review: open-source vector database, Weaviate Cloud pricing, Flex/Plus/Premium tiers, hosted embeddings, Query Agent, and Engram managed memory for AI agents."
author: aipedia.wiki Editorial
best_for:
  - teams wanting open-source vector database control
  - RAG apps needing hybrid search and metadata filtering
  - multi-tenant retrieval systems
  - teams that may start self-hosted and later use managed cloud
not_best_for:
  - tiny projects that fit pgvector
  - teams that want fully proprietary managed search with minimal tuning
  - non-technical users looking for an enterprise-search app
quick_answer: >-
  Weaviate is a strong open-source vector database for teams that want RAG retrieval without giving up self-hosting optionality. Pick it for hybrid search, multi-tenancy, open deployment paths, and agent memory via Engram when context retention is part of the product. Skip it for tiny apps where pgvector is enough.
---

# Weaviate

Weaviate is an open-source vector database with a managed cloud service. It is built for AI retrieval patterns: semantic search, hybrid search, RAG, metadata filtering, embeddings, multi-tenancy, and agent-facing query workflows.

It competes with [Pinecone](/tools/pinecone/), [Qdrant](/tools/qdrant/), Milvus, Chroma, and Postgres plus pgvector.

## Recent developments

- **June 10, 2026:** Pricing and positioning reverified. Weaviate Cloud now shows Free, Flex from $45/mo, Plus from $280/mo, and Premium from $400/mo; Weaviate Embeddings remain $0.025-$0.065 per 1M tokens; Query Agent has a 1,000-request/month free trial path and a $30/org/month plan with 4,000 included requests plus usage-based overage.
- **June 3, 2026:** Weaviate made **Engram** generally available as a managed memory and context service for agents in Weaviate Cloud, with a free tier. This widens Weaviate from vector database/retrieval infrastructure into the agent-memory lane for teams that need durable, scoped memories.

## System Verdict

> **Pick Weaviate if you want an open vector database with a mature cloud path.** It is one of the strongest choices when self-hosting optionality and managed operations both matter.
>
> **Skip it when vector search is a small side feature.** A general database with vector support may be enough.
>
> Weaviate's appeal is balance: open-source core, managed cloud, hybrid retrieval, and enterprise features without being cloud-only.

## Key Facts

| | |
|---|---|
| **Core product** | Open-source vector database |
| **Cloud** | Weaviate Cloud managed service |
| **Use cases** | RAG, semantic search, hybrid retrieval, recommendations |
| **Search modes** | Vector, keyword, hybrid, filters |
| **AI services** | Embeddings and query agent features in cloud plans |
| **Agent memory** | Engram managed memory/context service, GA June 3, 2026, with free tier |
| **Cloud plans** | Free cloud entry, Flex from $45/month, Plus from $280/month, Premium from $400/month |
| **Cloud uptime SLAs** | Flex 99.5% · Plus 99.9% · Premium up to 99.95%, 1-hour Severity 1 response |
| **Add-ons** | Weaviate Embeddings $0.025 to $0.065/1M tokens · Query Agent free to try at 1,000 requests/month or $30/org/mo with 4,000 requests included |
| **Pricing** | Free self-host/free cloud entry plus paid cloud plans and usage-based AI services |
| **Best fit** | Teams wanting control plus managed upgrade path |

## When to pick Weaviate

- **Open-source matters.** You can self-host and inspect the core system.
- **Hybrid search matters.** Combining keyword and semantic retrieval is first-class.
- **You need multi-tenancy.** Weaviate is often chosen for SaaS retrieval systems.
- **You want a managed path.** Start local or self-hosted, then move production to Weaviate Cloud.
- **You care about retrieval features, not just storage.** Schema, modules, filters, query patterns, Query Agent, hosted embeddings, and Engram memory can be part of the product.

## When to pick something else

- **Fully managed default:** [Pinecone](/tools/pinecone/) is easier for teams that do not want to operate anything.
- **Rust-native open-source vector DB:** [Qdrant](/tools/qdrant/).
- **Postgres-first apps:** pgvector through your existing database.
- **Workplace search:** [Glean](/tools/glean/) adds connectors, permissions, and employee-facing UX.


## How to evaluate it

Evaluate Weaviate as a retrieval platform, not just a nearest-neighbor index. The deciding factors are hybrid search quality, schema design, multi-tenancy needs, embedding workflow, cloud operations, and how cleanly it fits the rest of your RAG stack. If you already know your workload is simple vector lookup, a narrower database or Postgres with pgvector may be easier to run.

Weaviate's strongest buyer fit is a team that wants open-source optionality without giving up a managed cloud path. That matters when procurement, data residency, or architecture reviews make cloud lock-in a concern. It also matters for teams that expect retrieval to become a core product surface rather than a small feature hidden behind a chatbot.

Compare it directly with [Qdrant](/tools/qdrant/) and [Pinecone](/tools/pinecone/). Qdrant is appealing for focused open-source vector search and self-hosting. Pinecone is appealing for managed cloud simplicity. Weaviate sits in the middle: broader retrieval features, open deployment choices, and enough product surface for teams building search or RAG as a durable capability.

## Pricing

Weaviate can be self-hosted for free. As verified on 2026-06-10, Weaviate Cloud lists a free entry plan, Flex from $45/month, Plus from $280/month, and Premium from $400/month. Flex is the low-commit shared-cloud pay-as-you-go path with 99.5% availability; Plus raises the shared-cloud floor and SLA; Premium adds predictable spend, enhanced reliability, support, and shared or dedicated deployment options with up to 99.95% availability and 1-hour Severity 1 response.

Pricing dimensions include vector dimensions, storage, backup, index type, compression, region, and cloud plan. The public calculator defaults to $45/month for a small Flex-shaped estimate, but production buyers should model their own vector dimensions, object count, object size, backup retention, compression profile, cloud provider, and region before migrating.

The practical advice: use the calculator before migration, and compare against pgvector if your index is small.

Weaviate lists database AI services that run inside Weaviate Cloud. **Weaviate Embeddings** is hosted embedding generation priced $0.025 to $0.065 per 1M tokens depending on model. **Query Agent** is free to try at 1,000 requests/month or available as a $30/organization monthly plan with 4,000 included requests plus usage-based pricing for additional requests. These are useful, but they mean the full bill can include database, backup, AI service, support, and agent usage rather than only vector storage.

Engram is a separate strategic signal. Weaviate describes it as a managed memory and context service for agents, generally available in Weaviate Cloud with a free tier. Treat it as an agent-architecture decision, not a generic vector-table feature.

## Evaluation checklist

- Estimate vector dimensions, object count, object size, and backup volume before choosing a plan.
- Test hybrid retrieval quality against plain vector search and keyword search.
- Decide whether multi-tenancy belongs inside Weaviate or in your application layer.
- Check whether compression changes recall enough to matter.
- Model Premium or dedicated cloud if HIPAA, SSO/SAML, PrivateLink, customer-managed keys, or stronger SLAs are required.
- Treat Query Agent, hosted embeddings, and Engram as separate cost and architecture decisions.

## Failure Modes

- **Operational learning curve.** Self-hosting search infrastructure is real work.
- **Pricing dimensions need modeling.** Vector dimensions, storage, backups, support, and region choices all matter.
- **Schema decisions linger.** Poor chunking and metadata design can make retrieval worse than the database deserves.
- **Not an enterprise-search app.** Weaviate is infrastructure. It does not solve workplace permissions and UX by itself.
- **Migration can be expensive.** Re-indexing embeddings and changing retrieval semantics require testing.
- **Add-ons change scope.** Embeddings, Query Agent, and Engram can make Weaviate more than a vector DB, but they also add procurement and evaluation work.

## Methodology

Last verified 2026-06-10 against [weaviate.io/pricing](https://weaviate.io/pricing), the [Weaviate homepage](https://weaviate.io/), the [Engram GA announcement](https://weaviate.io/blog/engram-generally-available), [Weaviate documentation](https://weaviate.io/developers/weaviate), and the [Weaviate GitHub](https://github.com/weaviate/weaviate). Scoring reflects open-source leverage, feature depth, cloud maturity, agent-memory optionality, and operational complexity.

## FAQ

**Is Weaviate open source?**
Yes. The core database is open source, with managed cloud services available.

**Weaviate vs Pinecone?**
Weaviate gives more open-source control. Pinecone is more managed-first.

**Can Weaviate do hybrid search?**
Yes. Hybrid semantic and keyword retrieval is a core use case.

## Sources

- [Weaviate pricing](https://weaviate.io/pricing) (verified 2026-06-10)
- [Weaviate homepage](https://weaviate.io/) (verified 2026-06-10)
- [Weaviate Engram GA announcement](https://weaviate.io/blog/engram-generally-available) (verified 2026-06-10)
- [Weaviate documentation](https://weaviate.io/developers/weaviate) (verified 2026-06-10)
- [Weaviate GitHub](https://github.com/weaviate/weaviate) (verified 2026-06-10)

## Related

- **Category:** [AI Infrastructure](/categories/ai-infrastructure/) · [AI Search](/categories/ai-search/)
- **See also:** [Pinecone](/tools/pinecone/) · [Qdrant](/tools/qdrant/) · [Glean](/tools/glean/) · [Hugging Face](/tools/hugging-face/)
