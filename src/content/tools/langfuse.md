---
type: tool
slug: langfuse
title: Langfuse
tagline: Open-source LLM engineering platform for observability, prompt management, evals, datasets, and OpenTelemetry tracing. ClickHouse acquired Langfuse in Jan 2026; cloud pricing starts free, with Core at $29/mo.
category: ai-automation
company: Langfuse
url: https://langfuse.com
github_url: https://github.com/langfuse/langfuse
pricing_model: freemium
price_range: "$0 free / $29 Core / $199 Pro / $2,499 Enterprise"
status: active
launched: 2023-04
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
    value: "Best for engineering teams that want open-source LLM observability, prompt management, datasets, evaluations, and trace-based debugging across production AI applications."
    source: "https://langfuse.com/docs"
    source_label: "Langfuse documentation"
    source_id: langfuse-docs
    verified_at: 2026-05-13
    volatility: medium
    confidence: high
    next_review_at: 2026-11-13
  pricing_anchor:
    value: "Langfuse Cloud has a free Hobby plan with 50k units/month, Core at $29/month, Pro at $199/month, and Enterprise at $2,499/month; paid overage is listed at $8 per additional 100k units with volume discounts."
    source: "https://langfuse.com/pricing"
    source_label: "Langfuse pricing"
    source_id: langfuse-pricing
    verified_at: 2026-05-13
    volatility: high
    confidence: high
    next_review_at: 2026-08-13
  observability_surface:
    value: "Langfuse combines traces, sessions, agent graphs, prompt management, datasets, custom scores, LLM-as-judge evaluations, annotations, metrics, and dashboards."
    source: "https://langfuse.com/docs"
    source_label: "Langfuse documentation"
    source_id: langfuse-docs
    verified_at: 2026-05-13
    volatility: medium
    confidence: high
    next_review_at: 2026-11-13
  open_source:
    value: "Langfuse says code outside the /ee folders is MIT-licensed, all product features are freely available under MIT, and a commercial Enterprise license is needed for advanced security capabilities such as SCIM, extended audit logging, and data retention policies."
    source: "https://langfuse.com/handbook/chapters/open-source"
    source_label: "Langfuse open-source handbook"
    source_id: langfuse-open-source
    verified_at: 2026-05-13
    volatility: medium
    confidence: high
    next_review_at: 2026-11-13
  clickhouse_acquisition:
    value: "ClickHouse announced in January 2026 that it had acquired Langfuse while also closing a $400M Series D; Langfuse said the product, endpoints, support channels, open-source posture, and self-hosting commitment stayed in place."
    source: "https://langfuse.com/blog/joining-clickhouse"
    source_label: "Langfuse joins ClickHouse"
    source_id: langfuse-clickhouse-acquisition
    verified_at: 2026-05-13
    volatility: medium
    confidence: high
    next_review_at: 2026-11-13
  watch_out_for:
    value: "Langfuse is not an AI gateway. It requires instrumentation and evaluation discipline; self-hosted teams also need to operate Postgres, ClickHouse, Redis/Valkey, and object storage."
    source: "https://langfuse.com/self-hosting"
    source_label: "Langfuse self-hosting"
    source_id: langfuse-self-hosting
    verified_at: 2026-05-13
    volatility: medium
    confidence: high
    next_review_at: 2026-11-13
tags: [llm-observability, prompt-management, evals, open-source, mit, clickhouse, yc]
seo_title: "Langfuse Review: Pricing, Evals & Open Source (May 2026)"
meta_description: "Langfuse is an open-source LLM engineering platform for observability, prompt management and evals. Verified May 13, 2026: Hobby is free, Core is $29/mo, Pro is $199/mo, Enterprise is $2,499/mo."
author: "aipedia.wiki Editorial"
best_for:
  - LLM app teams wanting observability, evals, and prompt management in one tool
  - framework-agnostic production AI workflows
  - teams that need a self-hostable open-source option
  - prompt engineering workflows with version control and trace-linked evaluation
not_best_for:
  - AI gateway, caching, failover, or load-balancing needs
  - teams that want no-code analytics without instrumentation work
  - teams without capacity to run ClickHouse/Postgres/Redis/S3 for self-hosting
quick_answer: >-
  Langfuse is an open-source LLM engineering platform for tracing, prompt management, datasets, evals, metrics, and production debugging. Pick it when you want a self-hostable LangSmith-style control plane with strong prompt/eval workflows. Skip it if you need an AI gateway: Langfuse observes and evaluates traffic, but Helicone or LiteLLM handles caching, failover, and routing. Pricing verified May 13, 2026: Hobby is free with 50k units/month, Core is $29/month, Pro is $199/month, and Enterprise is $2,499/month.
price_history:
  - date: 2026-05-10
    plan: "Hobby"
    price: "$0"
    source: "https://langfuse.com/pricing"
    source_label: "Langfuse pricing"
    source_id: langfuse-pricing
    note: "Official pricing lists 50k included units/month, 30 days data access, 2 users, and community support."
  - date: 2026-05-10
    plan: "Core"
    price: "$29/mo"
    source: "https://langfuse.com/pricing"
    source_label: "Langfuse pricing"
    source_id: langfuse-pricing
    note: "Official pricing lists 100k included units/month, $8 per additional 100k units before volume discounts, 90 days data access, unlimited users, in-app support, and 48-hour response time SLO."
  - date: 2026-05-10
    plan: "Pro"
    price: "$199/mo"
    source: "https://langfuse.com/pricing"
    source_label: "Langfuse pricing"
    source_id: langfuse-pricing
    note: "Official pricing lists 100k included units/month, $8 per additional 100k units before volume discounts, 3 years data access, higher rate limits, SOC 2 and ISO 27001 reports, and prioritized in-app support."
  - date: 2026-05-10
    plan: "Teams add-on"
    price: "$300/mo optional add-on"
    source: "https://langfuse.com/pricing"
    source_label: "Langfuse pricing"
    source_id: langfuse-pricing
    note: "Optional Pro add-on for Enterprise SSO, SSO enforcement, fine-grained RBAC, and dedicated Slack or MS Teams support."
  - date: 2026-05-10
    plan: "Enterprise"
    price: "$2,499/mo"
    source: "https://langfuse.com/pricing"
    source_label: "Langfuse pricing"
    source_id: langfuse-pricing
    note: "Official pricing lists Enterprise at $2,499/month with Pro plus Teams, audit logs, SCIM API, custom rate limits, uptime SLA, support SLA, and dedicated support engineer."
  - date: 2026-04-18
    plan: "Core"
    price: "$29/mo"
    source: "https://langfuse.com/pricing"
    source_label: "Langfuse pricing"
    source_id: langfuse-pricing
    note: "Historical check; refreshed on 2026-05-10 with explicit Pro, Teams add-on, Enterprise, and acquisition wording."
  - date: 2026-05-13
    plan: "Hobby / Core / Pro / Teams add-on / Enterprise"
    price: "$0 / $29 / $199 / $300 add-on / $2,499 per month"
    source: "https://langfuse.com/pricing"
    source_label: "Langfuse pricing"
    source_id: langfuse-pricing
    note: "Re-verified the full plan ladder, 50k/100k included unit allowances, 30-day/90-day/3-year retention tiers, $8 per 100k unit overage with graduated rates to $6 at 50M+ units, and the Teams add-on for SSO/RBAC. No material changes versus the May 10 refresh."
---

# Langfuse

Langfuse is an open-source LLM engineering platform for teams that need to trace, debug, evaluate, and improve AI applications in production. It combines observability, prompt management, datasets, evaluation, metrics, playground workflows, and OpenTelemetry-based ingestion rather than acting as a gateway or proxy.

ClickHouse acquired Langfuse in January 2026. The important buyer detail: ClickHouse announced the acquisition alongside its own $400M Series D, but Langfuse did not say the Langfuse acquisition price was $400M. Langfuse's own acquisition post says the roadmap, open-source/self-hosting commitment, Cloud endpoints, product experience, and support channels stayed in place.

## System Verdict

> **Pick Langfuse if you want an open-source observability and eval layer for LLM apps.** It is strongest when engineering, product, and prompt teams need a shared place to inspect traces, compare prompt versions, run dataset experiments, score outputs, and monitor quality over time.
>
> **Skip it if your biggest need is an AI gateway.** Langfuse can ingest traces from SDKs, frameworks, OpenTelemetry, and proxy-based logging, but it does not replace a gateway for caching, failover, load balancing, or provider routing. Pair it with [Helicone](/tools/helicone/) or LiteLLM when gateway control matters.
>
> **ClickHouse ownership is more infrastructure tailwind than buyer risk right now.** The product already uses ClickHouse for analytical workloads, and the acquisition should help performance and scale. The thing to watch is enterprise packaging over time, especially security and governance features that sit behind paid licensing.

## Key Facts

| | |
|---|---|
| **Best for** | LLM observability, prompt management, evals, datasets, and production debugging |
| **Open-source posture** | Code outside `/ee` folders is MIT-licensed; product features are available under MIT; advanced enterprise security features require commercial licensing |
| **Free tier** | Hobby: 50,000 units/month, 30 days data access, 2 users |
| **Best first paid plan** | Core at $29/mo: 100k units/month, 90-day data access, unlimited users, in-app support |
| **Pro plan** | $199/mo: 3 years data access, higher rate limits, SOC 2 and ISO 27001 reports, prioritized support |
| **Teams add-on** | $300/mo optional Pro add-on for SSO, SSO enforcement, fine-grained RBAC, and dedicated Slack/MS Teams support |
| **Enterprise** | $2,499/mo plus optional yearly commitment terms, custom volume pricing, audit logs, SCIM, custom rate limits, uptime/support SLA |
| **Overage pricing** | Paid plans list $8 per additional 100k units, with lower rates at higher volume |
| **Self-hostable** | Yes, using Docker or production deployments with Postgres, ClickHouse, Redis/Valkey, and object storage |
| **Integrations** | Python SDK, JS/TS SDK, OpenTelemetry endpoint, LangChain/LangGraph, OpenAI SDK, LiteLLM, Vercel AI SDK, LlamaIndex, Mastra, and many more |

Every data point above was verified against Langfuse or ClickHouse primary sources on 2026-05-13. See Sources.

## What it actually is

Langfuse sits between observability, prompt operations, and evaluation. Traces show the flow of an LLM request, sessions group multi-step conversations or agent workflows, dashboards expose quality/cost/latency metrics, and prompt management lets teams version, label, test, and link prompts back to traces.

The evaluation layer is the reason Langfuse is more than a logging sink. Teams can score outputs, gather user feedback, run LLM-as-judge evaluators, use annotation queues, and test prompts or models against datasets. That makes it useful for teams trying to answer "did this model or prompt change improve the product?" rather than only "what happened in this request?"

Langfuse is also unusually open for this category. The core product is built in public, self-hosting is documented, and the OpenTelemetry endpoint lets teams ingest traces from languages and frameworks beyond the native Python and JavaScript SDKs. The tradeoff is operational complexity if you self-host: production Langfuse needs more than a single app container.

## When to pick Langfuse

- **You need trace-linked evals.** Langfuse is useful when debugging, quality scoring, annotation, and prompt comparison need to happen on the same production traces.
- **You want prompt management without LangChain lock-in.** Prompt versioning, release labels, prompt experiments, and trace linking work outside a single framework.
- **You need a self-hostable LLM observability stack.** Langfuse is attractive when data-control, procurement, or usage economics push against closed hosted-only tools.
- **You run multi-framework AI systems.** OpenTelemetry support and a broad integration catalog help when applications use a mix of LangChain, LangGraph, Mastra, OpenAI SDKs, LiteLLM, LlamaIndex, or custom code.
- **You want a generous engineering trial.** Hobby gives enough units for real instrumentation proof-of-concept work before a team moves to Core.

## When to pick something else

- **AI gateway or provider routing:** [Helicone](/tools/helicone/) or LiteLLM. Langfuse observes and evaluates, but it is not a gateway.
- **Pure LangChain/LangGraph shop:** [LangSmith](https://smith.langchain.com) can be smoother if the whole team is already inside the LangChain ecosystem.
- **Evals-first workflows:** [Braintrust](https://www.braintrust.dev) may be sharper when the buying center is evaluation infrastructure rather than open-source observability.
- **General app observability:** Datadog, New Relic, Honeycomb, Grafana, or OpenTelemetry backends cover the whole application stack; Langfuse is LLM-specific.

## Pricing

Pricing via [langfuse.com/pricing](https://langfuse.com/pricing):

| Plan | Price | Included usage | Retention | Who's it for |
|---|---|---|---|---|
| Hobby | $0 | 50k units/month | 30 days | Proofs of concept, side projects, small eval loops |
| Core | $29/mo | 100k units/month | 90 days | **Best first paid plan for production teams** |
| Pro | $199/mo | 100k units/month | 3 years | Scaling teams needing higher limits, long history, compliance reports, and prioritized support |
| Teams add-on | $300/mo optional | Adds governance/support features | Follows Pro | Teams needing SSO, SSO enforcement, fine-grained RBAC, and dedicated Slack/MS Teams support |
| Enterprise | $2,499/mo | 100k units/month plus custom volume terms | 3 years | Large teams needing audit logs, SCIM, custom limits, SLA language, dedicated support, and procurement options |

Paid overage is listed at $8 per additional 100k units, with lower rates at higher volume. The pricing calculator shows graduated rates below $8/100k at 1M+ monthly units and lower again at 10M+ and 50M+ units.

## Best plan recommendation

Start on Hobby if the goal is instrumentation proof: connect one application, capture traces, link a prompt, create a dataset, and run a small eval loop. Move to Core when a production feature needs longer retention, unlimited users, more units, and support expectations.

Pro is the practical team plan once history, rate limits, annotation queues, compliance reports, or prioritized support matter. Enterprise is for procurement-heavy deployments with audit logs, SCIM, custom rate limits, SLA language, dedicated support, or marketplace/invoice billing.

Self-hosting is not "free cloud." It can be the right call for data control or heavy usage economics, but teams must operate Postgres, ClickHouse, Redis/Valkey, object storage, upgrades, backups, access control, and incident response.

## Failure modes

- **Unit accounting can surprise agent teams.** Langfuse prices by units, and complex agent workflows can generate many observations per end-user request.
- **It is not a gateway.** No native caching, failover, load balancing, or routing layer. Use a gateway beside it if traffic control matters.
- **Self-hosted operations are real.** Production deployments use Postgres, ClickHouse, Redis/Valkey, and object storage. That is manageable for platform teams, but not a casual side project.
- **Prompt management requires process.** Versioning and release labels only work if the team stops editing prompts informally in code, notebooks, or provider dashboards.
- **Enterprise governance is plan-sensitive.** SSO, SCIM, audit logs, retention controls, and dedicated channels are paid or add-on territory. Verify exact plan terms before procurement.
- **OTel context propagation matters.** For reliable filtering by user, session, metadata, version, release, or tags, Langfuse's OpenTelemetry docs recommend propagating those attributes across spans, not only setting them on the root trace.

## Against the alternatives

| | Langfuse | Helicone | LangSmith | Braintrust |
|---|---|---|---|---|
| **Best viewed as** | Open-source LLM engineering platform | AI gateway and observability layer | LangChain-native observability/evals | Evaluation-focused platform |
| **Open-source/self-host appeal** | Strong | Stronger for gateway workflows | Low | Low |
| **Prompt management** | Strong | Lighter | Strong | Lighter |
| **Evals** | Strong | Adequate for many gateway teams | Strong | Strongest focus |
| **Gateway features** | No | Yes | No | No |
| **Best buyer** | Framework-agnostic AI engineering team | Multi-provider traffic owner | LangChain-heavy team | Eval infrastructure team |

## Methodology

This page was refreshed on 2026-05-13 by re-checking Langfuse pricing, documentation, self-hosting docs, open-source handbook, integrations docs, OpenTelemetry docs, GitHub repository, the Langfuse acquisition post, and ClickHouse's Series D/acquisition announcement; no material plan, retention, or overage changes versus the May 10 refresh. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). The most volatile fields are pricing, included units, retention, enterprise governance packaging, self-hosting requirements, and ClickHouse post-acquisition packaging.

## FAQ

**Is Langfuse free to use?**
Yes. Hobby is free with 50k included units/month, 30 days data access, 2 users, and community support. The self-hosted core is also open-source, but operating it still costs infrastructure and engineering time.

**Did the ClickHouse acquisition change anything for users?**
As of this May 13, 2026 refresh, Langfuse's own acquisition post says the roadmap, Cloud product experience, endpoints, support channels, open-source commitment, and self-hosting commitment stayed in place. The acquisition was announced alongside ClickHouse's $400M Series D, not as a confirmed $400M purchase price for Langfuse.

**Can I use Langfuse without LangChain?**
Yes. Langfuse supports native Python and JS/TS SDKs, a public API, OpenTelemetry ingestion, proxy-based logging via LiteLLM, and many framework integrations. LangChain and LangGraph are options, not requirements.

**How does Langfuse compare to Helicone?**
Langfuse is stronger for prompt management, datasets, evals, and trace-linked quality workflows. Helicone is stronger when the buyer needs gateway controls such as caching, failover, load balancing, and provider routing. Many teams can use both.

**Can Langfuse run fully self-hosted?**
Yes, but production self-hosting requires infrastructure. Langfuse documents Docker, VM/local, Kubernetes, AWS, Azure, GCP, and Railway paths, and the architecture uses Postgres, ClickHouse, Redis/Valkey, and S3-compatible object storage.

## Related

- **Category:** [AI Automation](/categories/ai-automation/) · [AI Coding](/categories/ai-coding/)
- **Compare:** Langfuse vs [Helicone](/tools/helicone/)
- **See also:** [LangGraph](/tools/langgraph/) · [Mastra](/tools/mastra/)

## Sources

- [Langfuse pricing](https://langfuse.com/pricing): plan prices, included units, retention, overage, Teams add-on, Enterprise packaging
- [Langfuse documentation](https://langfuse.com/docs): observability, prompt management, evaluations, metrics, datasets, and lifecycle positioning
- [Langfuse integrations](https://langfuse.com/integrations): SDKs, OpenTelemetry, framework, provider, gateway, and analytics integrations
- [Langfuse OpenTelemetry docs](https://langfuse.com/integrations/native/opentelemetry): OTLP endpoint, SDK v4, span propagation, and integration caveats
- [Langfuse self-hosting](https://langfuse.com/self-hosting): Docker/self-hosting posture, deployment options, and infrastructure requirements
- [Langfuse open-source handbook](https://langfuse.com/handbook/chapters/open-source): MIT and Enterprise extension licensing posture
- [Langfuse GitHub repository](https://github.com/langfuse/langfuse): public repository and release activity
- [Langfuse joins ClickHouse](https://langfuse.com/blog/joining-clickhouse): acquisition continuity, open-source and self-hosting statements
- [ClickHouse Series D and Langfuse acquisition](https://clickhouse.com/blog/clickhouse-raises-400-million-series-d-acquires-langfuse-launches-postgres): ClickHouse's January 2026 $400M Series D and Langfuse acquisition announcement

## Review History

- **2026-04-18:** New Langfuse page. Pricing and ClickHouse acquisition language verified against then-current sources.
- **2026-05-10:** Refreshed pricing, included units, retention, Pro/Enterprise/Teams add-on details, open-source licensing caveats, self-hosting requirements, OpenTelemetry caveats, and corrected acquisition wording.
- **2026-05-13:** Re-verified plan prices, included units, retention, and graduated overage rates against the live pricing page; no material changes. Updated verification dates throughout.
