---
type: tool
slug: qdrant
title: Qdrant
tagline: Open-source vector database written in Rust, with managed cloud, Free/Standard/Premium tiers, hybrid/private cloud options, metadata filtering, payload indexes, and RAG-ready retrieval.
category: ai-infrastructure
secondary_categories: [ai-search, ai-automation]
company: Qdrant
url: https://qdrant.tech
github_url: https://github.com/qdrant/qdrant
pricing_model: open-source
price_range: Free self-host; Free Cloud tier; Standard usage-based; Premium/Hybrid/Private sales-led
status: active
launched: 2021
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
  utility: 9
  value: 8
  moat: 7
  longevity: 8
facts:
  flagship_model:
    value: "Qdrant vector database"
    source: "https://qdrant.tech/documentation/"
    source_label: "Qdrant documentation"
    source_id: qdrant-best-for
    verified_at: 2026-06-25
    next_review_at: 2026-07-22
    confidence: high
  best_paid_tier:
    value: "Standard Cloud for production managed clusters; Premium when SSO/private links/higher SLA matter; Hybrid or Private Cloud when the cluster must run in the buyer's environment"
    source: "https://qdrant.tech/pricing/"
    source_label: "Qdrant pricing"
    source_id: qdrant-pricing
    verified_at: 2026-06-25
    next_review_at: 2026-07-22
    confidence: high
  best_for:
    value: "Open-source vector search, metadata filtering, RAG retrieval, and self-hostable AI infrastructure"
    source: "https://qdrant.tech/documentation/"
    source_id: qdrant-best-for
    verified_at: 2026-06-25
    confidence: high
  latest_release:
    value: "Qdrant v1.18.2 was still the latest GitHub release checked on June 25, 2026; the June 4 release notes include bug fixes plus REST auth whitelist bypass and malicious snapshot length security fixes"
    source: "https://github.com/qdrant/qdrant/releases/tag/v1.18.2"
    source_label: "Qdrant v1.18.2 release notes"
    source_id: qdrant-release-v1-18-2
    verified_at: 2026-06-25
    next_review_at: 2026-07-22
    confidence: high
tags: [vector-database, open-source, rust, rag, semantic-search, retrieval, embeddings]
seo_title: "Qdrant Review: Open-Source Vector Database & Cloud Pricing (June 2026)"
meta_description: "Qdrant is an open-source Rust vector database with Free, Standard, Premium, Hybrid, and Private Cloud options for RAG, semantic search, payload filtering, and AI retrieval workloads."
author: aipedia.wiki Editorial
best_for:
  - teams wanting a fast open-source vector database
  - RAG systems that rely heavily on metadata filters
  - self-hosted or hybrid cloud retrieval workloads
  - developers who prefer simple APIs and Rust-native performance
not_best_for:
  - teams wanting fully packaged enterprise workplace search
  - very small apps that can stay in pgvector
  - buyers wanting a proprietary fully managed default
quick_answer: >-
  Qdrant is a strong open-source vector database for teams that want fast retrieval, metadata filtering, and self-hosting optionality. Pick it for RAG infrastructure with control, especially if Free/Standard Cloud gives a managed path without losing open-source optionality. Skip it when you need a workplace-search product or when Postgres vector search is enough.
---

# Qdrant

Qdrant is an open-source vector database written in Rust. It stores embeddings, attaches payload metadata, and searches vectors with filters for RAG, semantic search, recommendations, and AI-native retrieval systems.

It is one of the main open-source alternatives to [Pinecone](/tools/pinecone/) and [Weaviate](/tools/weaviate/).

## System Verdict

> **Pick Qdrant if you want open-source vector search with a clean developer experience.** It is especially appealing for teams that care about performance, metadata filters, and self-hosting.
>
> **Skip it if you need an end-user search app.** Qdrant is infrastructure. It will not give you Glean-style connectors, permissions UI, and workplace assistant UX.
>
> Qdrant's strength is focused execution. It does fewer platform-y things than Hugging Face or Weaviate, but the vector database itself is direct and capable.

## Key Facts

| | |
|---|---|
| **Core product** | Open-source vector database |
| **Language** | Rust |
| **Use cases** | RAG, semantic search, recommendations, filtering |
| **Cloud** | Qdrant Cloud managed clusters |
| **Cloud tiers** | Free · Standard · Premium |
| **Hybrid / Private** | Options for customer environments, regulated workloads, and isolated deployments |
| **Pricing** | Free prototype cluster; Standard usage-based; Premium minimum spend; marketplace billing via $0.01 Resource Usage Units |
| **Operations** | Snapshots, monitoring, distributed deployment, and production checklist |
| **Latest release checked** | v1.18.2, published June 4, 2026 and still latest on June 25 |
| **Best fit** | Teams needing retrieval infrastructure with control |

## When to pick Qdrant

- **You want self-hosting.** Run Qdrant in your own environment when data control matters.
- **Payload filtering matters.** Many RAG systems need metadata-aware retrieval, not pure vector similarity.
- **You like a focused database.** Qdrant does not try to be a full app platform.
- **You may need cloud later.** Qdrant Cloud gives a managed option without switching databases.
- **You are building internal retrieval services.** The API is straightforward for service teams.

## When to pick something else

- **Most managed production default:** [Pinecone](/tools/pinecone/).
- **Broader AI-native vector platform:** [Weaviate](/tools/weaviate/).
- **App database plus vectors:** pgvector in Postgres.
- **Enterprise search and assistant:** [Glean](/tools/glean/).


## How to evaluate it

Evaluate Qdrant with the retrieval workload you actually have, not with a generic vector benchmark. The important questions are filter selectivity, recall at your target latency, ingestion behavior, payload schema design, and operational comfort. RAG teams should test chunk metadata, hybrid retrieval strategy, and re-ranking outside the database before treating any vector store as the full search system.

Qdrant is a strong fit when the team wants infrastructure control. Self-hosting keeps deployment choices open, while Qdrant Cloud reduces operational burden for teams that do not want to run clusters themselves. The simpler product scope can be an advantage: fewer platform assumptions, clearer database behavior, and less pressure to adopt a full enterprise search suite.

Choose something else if your hardest problem is connectors, permissions, or end-user UX. Glean-style workplace search tools solve a different layer. [Weaviate](/tools/weaviate/) is stronger when you want a broader vector platform with hybrid search and managed-cloud packaging. [Pinecone](/tools/pinecone/) is stronger when a cloud-native managed service is the default priority.

## Pricing

Self-hosting Qdrant is free apart from infrastructure costs. Qdrant Cloud now has a clearer public tier shape:

| Qdrant lane | Current buyer meaning | Watch-out |
|---|---|---|
| OSS / self-host | Run the open-source vector database yourself | You own backups, upgrades, observability, and scaling |
| Free Cloud | Single-node prototype cluster with 0.5 vCPU, 1GB RAM, and 4GB disk | Good for testing, not high availability |
| Standard Cloud | Usage-based managed clusters for production workloads | Model CPU, memory, disk, backups, and inference tokens before launch |
| Premium Cloud | Minimum-spend enterprise lane with SSO, private VPC links, premium support, and higher SLA posture | Sales-led; verify minimum spend and security controls |
| Hybrid / Private Cloud | Managed Qdrant in your own infrastructure or a dedicated/isolated deployment | Best for regulated workloads, data residency, and air-gapped needs |

Billing can run through credit card or AWS, GCP, and Azure marketplaces.

For small projects, self-hosting or pgvector may be cheaper. For production teams that value managed operations, Qdrant Cloud removes database maintenance work.

As verified on 2026-06-25, Qdrant's cloud billing docs emphasize resource-shaped pricing rather than a simple per-query SaaS plan, with credit card billing through Stripe or AWS, GCP, and Azure marketplace subscriptions billed at $0.01 per Resource Usage Unit. That means teams should model cluster size, replicas, disk storage, snapshots, traffic patterns, marketplace billing, and any Cloud Inference usage before procurement.

## Evaluation checklist

Before committing to Qdrant:

- Test recall and latency with your real chunking strategy.
- Measure metadata filter selectivity, not only nearest-neighbor speed.
- Decide whether hybrid search and reranking happen inside or outside the database layer.
- Plan backups, snapshots, upgrades, and monitoring before production launch.
- Confirm how tenant isolation maps to collections, payloads, or separate clusters.
- Benchmark pgvector for small Postgres-native apps before adding a separate vector database.
- Compare Qdrant Cloud against self-hosting once operations time is included.

## Buyer fit

Qdrant is strongest for engineering teams that want a focused vector database with open-source optionality. It is a good match when the product team owns retrieval quality and wants control over deployment, payload schema, filters, and evaluation.

It is weaker when the buyer expects a finished knowledge product. Qdrant will not connect to every SaaS app, infer company permissions, or ship an employee-facing answer UI. It is the retrieval layer, not the entire enterprise-search system.

## Failure Modes

- **Infrastructure still needs design.** Chunking, embeddings, filters, and evals matter more than database branding.
- **Self-hosting takes ownership.** Backups, upgrades, observability, and scaling become your job.
- **Cloud pricing is resource-shaped.** CPU, memory, and disk choices need modeling.
- **No workplace connectors.** You will build the ingestion and permissions layer.
- **Embedding migration is non-trivial.** Changing models means re-indexing and validating retrieval quality.
- **Retrieval evals are still your job.** A fast vector database does not prove that answers are correct.

## Methodology

Last verified 2026-06-25 against Qdrant documentation, Qdrant pricing, cloud billing docs, and GitHub v1.18.2 release notes. Scoring weighs open-source value, retrieval utility, cloud path, and platform breadth.

## FAQ

**Is Qdrant open source?**
Yes. Qdrant's core vector database is open source.

**How is Qdrant Cloud priced?**
Managed clusters are priced by resource usage. The Free tier is limited to 0.5 vCPU, 1GB RAM, and 4GB disk; Standard is usage-based; Premium is sales-led with minimum spend and additional enterprise controls.

**Qdrant vs Weaviate?**
Qdrant is a focused Rust vector database. Weaviate is a broader AI-native vector platform with more built-in cloud services.

## Sources

- [Qdrant Cloud billing](https://qdrant.tech/documentation/cloud-pricing-payments/)
- [Qdrant pricing](https://qdrant.tech/pricing/)
- [Qdrant documentation](https://qdrant.tech/documentation/)
- [Qdrant GitHub](https://github.com/qdrant/qdrant)
- [Qdrant v1.18.2 release notes](https://github.com/qdrant/qdrant/releases/tag/v1.18.2)

## Related

- **Category:** [AI Infrastructure](/categories/ai-infrastructure/) · [AI Search](/categories/ai-search/)
- **See also:** [Pinecone](/tools/pinecone/) · [Weaviate](/tools/weaviate/) · [Glean](/tools/glean/)
