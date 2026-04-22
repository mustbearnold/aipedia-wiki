---
type: news
slug: 2026-04-23-google-agentic-data-cloud-knowledge-catalog
title: "Google ships Agentic Data Cloud, Knowledge Catalog, and cross-cloud AI-native Lakehouse"
date: 2026-04-23
severity: major
summary: "At Cloud Next 2026 Day 2, Google launched the Agentic Data Cloud stack: Knowledge Catalog (trusted business-context grounding for agents), Data Agent Kit (Gemini-powered data-science authoring), and a cross-cloud AI-native Lakehouse with vendor-neutral data access. Solves the agent-grounding problem that kept most 2025 agent pilots from clearing POC. Competes directly with Databricks Mosaic AI and Snowflake Cortex on AI-native data infrastructure."
affects: [gemini]
categories: [ai-infrastructure, ai-business]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-22
last_verified: 2026-04-22
sources:
  - url: "https://cloud.google.com/blog/topics/google-cloud-next/welcome-to-google-cloud-next26"
    title: "Welcome to Google Cloud Next '26 - Google Cloud Blog"
  - url: "https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/next-2026/"
    title: "Google Cloud Next 2026: news and updates"
---

**Google** launched the **Agentic Data Cloud** stack at Cloud Next 2026 Day 2 (April 23, 2026). Three components ship together: Knowledge Catalog, Data Agent Kit, and a cross-cloud AI-native Lakehouse.

## The three components

- **Knowledge Catalog.** Indexes business context across the customer's data estate (databases, data warehouses, object storage, SaaS systems). Makes trusted business context queryable by name so agents know what "revenue" or "customer" mean inside this organization. Solves the grounding problem that killed most 2025 agent POCs.
- **Data Agent Kit.** Gemini-powered authoring for data scientists. Natural-language prompts generate SQL, Python, dbt models, and dashboard specs. Outputs versioned and reviewable.
- **Cross-cloud AI-native Lakehouse.** Unified access to data regardless of where it lives (BigQuery, S3, Azure Data Lake, Snowflake, Databricks). AI-native means the Lakehouse understands embeddings and vector indices as first-class citizens, not as an adapter.

## Why it matters

The bottleneck in enterprise agent deployments is **grounding data, not model quality**. An agent that can't tell you which product SKU generated the highest margin last quarter because the SKU table isn't linked to the finance schema is a failed agent. Knowledge Catalog is Google's answer: a mapping layer that makes business context accessible to agents without hand-wiring integrations.

This is the fight with **Databricks Mosaic AI** and **Snowflake Cortex**. Both have been building AI-native data platforms since 2023. Google is playing catch-up on data-platform maturity but ahead on agent-platform cohesion through the [Gemini Enterprise Agent Platform](/news/2026-04-23-gemini-enterprise-agent-platform/).

## Who wins

Three buyer profiles:

1. **Google Cloud BigQuery shops.** Upgrade path is mostly provisioning. Knowledge Catalog pulls existing BigQuery metadata automatically.
2. **Multi-cloud enterprises with data in Snowflake or Databricks.** Can use the cross-cloud Lakehouse to surface that data to Gemini Agents without migration. Interesting for agent pilots that don't require data move.
3. **Greenfield AI-first teams.** Agentic Data Cloud is a serious contender over Databricks or Snowflake for new deployments that prioritize agent grounding over classic analytics workloads.

## Competitive positioning

| Stack | Strengths | Weaknesses |
|---|---|---|
| **Google Agentic Data Cloud** | Agent grounding depth, Gemini integration, cross-cloud | Newer, ecosystem thinner |
| **Databricks Mosaic AI** | Largest open-source ecosystem (MLflow, Delta, Unity) | Agent-platform cohesion weaker |
| **Snowflake Cortex** | Data warehousing depth, governance maturity | Agent tooling less developed |
| **AWS Bedrock + Glue** | Full AWS-stack integration | Fragmented across multiple services |

## Pricing

Not disclosed at launch. Expected mix: storage-based (Lakehouse), per-query (Knowledge Catalog lookups), per-run (Data Agent Kit authoring). Watch for GA pricing in Q3 2026.

## Related

- [Gemini Enterprise Agent Platform launches](/news/2026-04-23-gemini-enterprise-agent-platform/)
- [TPU 8t/8i unveiled on Cloud Next Day 2](/news/2026-04-23-google-tpu-8t-8i-cloud-next-day2/)
- [Google + Wiz ship Agentic Defense](/news/2026-04-23-google-wiz-agentic-defense/)
