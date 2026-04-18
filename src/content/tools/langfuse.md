---
type: tool
slug: langfuse
title: Langfuse
tagline: Open-source LLM engineering platform with observability, evals, and prompt management. YC W23, acquired by ClickHouse for $400M in Jan 2026. Generous free tier, Core at $29/mo.
category: ai-automation
company: langfuse
url: https://langfuse.com
pricing_model: freemium
price_range: "$0 free / $29/mo Core / scale via units"
status: active
launched: 2023-04
last_updated: 2026-04-18
last_verified: 2026-04-18
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
tags: [llm-observability, prompt-management, evals, open-source, mit, clickhouse, yc]
seo_title: "Langfuse: Features, Pricing & Review (April 2026)"
meta_description: "Langfuse is an MIT-licensed LLM engineering platform. Free tier 50k units/month, Core $29/mo. Acquired by ClickHouse Jan 2026 ($400M). Best open-source alternative to LangSmith with strong evals + prompt mgmt."
author: "aipedia.wiki Editorial"
best_for:
  - LLM app teams wanting observability + evals + prompt management in one tool
  - framework-agnostic production workflows
  - teams that need MIT-licensed self-hostable option
  - prompt engineering workflows with version control
not_best_for:
  - AI Gateway / proxy features (use Helicone)
  - Pure LangChain shops (LangSmith integrates deeper)
  - Minimal teams that just need basic logging (provider dashboards suffice)
quick_answer: >-
  Langfuse is the MIT-licensed open-source LLM engineering platform. Covers observability, evals, prompt management, playground, and datasets. Free tier is 50k units/month (10x most competitors). Core at $29/mo adds 100k units and 90-day retention. ClickHouse acquired Langfuse in January 2026 for $400M; the MIT license and pricing stayed intact. Pick it for strong evals + prompt management.
---

# Langfuse

An open-source LLM engineering platform that combines observability, evaluation, prompt management, and datasets in one tool. Ingests traces via OpenTelemetry, LangChain, OpenAI SDK, LiteLLM, and more. Acquired by ClickHouse in January 2026 at a $400M valuation via Series D. The MIT-licensed core stayed open.

## System Verdict

> **Pick Langfuse if you want the strongest open-source observability + evals story.** Free tier at 50k units/month is genuinely generous (roughly 10× typical competitor free tiers). Prompt management is a standout: versioned prompts, A/B tests, deploy flows that many teams bolt onto LangSmith or build themselves.
>
> **Skip it if you need AI Gateway features.** [Helicone](/tools/helicone/) has caching, load balancing, and failover; Langfuse doesn't. Many teams run Langfuse for evals + prompt mgmt and Helicone for gateway features side by side.
>
> **ClickHouse acquisition is a good thing.** ClickHouse is the fastest open-source analytics database on earth, now the storage backend for Langfuse. Expect better-at-scale query performance and no rent-seeking (ClickHouse's own product is similarly priced and similarly open).

## Key Facts

| | |
|---|---|
| **License** | MIT (core is fully open source) |
| **Free tier** | 50,000 units/month (10× typical competitor) |
| **Core plan** | $29/mo: 100k units, 90-day retention, 48-hour support SLO, unlimited users |
| **Overage pricing** | $8 per additional 100k units across all paid tiers |
| **Acquired by** | ClickHouse, January 2026, Series D $400M |
| **Self-hostable** | Yes |
| **Integrations** | OpenTelemetry, LangChain, LangGraph, OpenAI SDK, LiteLLM, Anthropic, Vercel AI SDK, more |
| **Core features** | Observability, prompt management, evals, playground, datasets |

## When to pick Langfuse

- **Prompt engineering workflows.** Versioned prompts with deploy flows and A/B testing are first-class. Version control for prompts shouldn't be an afterthought.
- **Eval-driven LLM development.** Run evals on traces, compare prompt versions against datasets, track quality over time.
- **Framework-agnostic teams.** Ingests from any LLM SDK via OpenTelemetry. No LangChain lock-in.
- **Self-hosted preference.** MIT license allows running on your own infrastructure with no usage restrictions.
- **Generous free tier.** Real use at 50k units/mo. Small teams never need to pay.

## When to pick something else

- **AI Gateway needs:** [Helicone](/tools/helicone/) for caching, load balancing, failover.
- **LangChain-first shops:** [LangSmith](https://smith.langchain.com) is more tightly coupled.
- **Pure eval focus:** [Braintrust](https://www.braintrust.dev) has a sharper evals-first product.
- **App-wide observability:** Datadog / New Relic for everything else; Langfuse is LLM-specific.

## Pricing

| Plan | Price | Units/month | Retention |
|---|---|---|---|
| Hobby | $0 | 50,000 | 30 days |
| Core | $29/mo | 100,000 | 90 days |
| Pro | Higher tier (scales) | More units | Extended |
| Team | Higher tier | More units | Extended + compliance |
| Enterprise | Custom | Unlimited | Custom + SSO, audit |

Overage on all paid tiers: $8 per 100k units. Self-hosted: $0 (MIT). Verified 2026-04-18 via [langfuse.com/pricing](https://langfuse.com/pricing).

## Failure modes

- **Unit accounting can surprise.** One "unit" maps to one trace span. Complex agent workflows generate many spans per user request. Watch your quota.
- **Not a gateway.** No caching, no failover, no load balancing. If you need those, pair with Helicone or LiteLLM.
- **Self-hosted ops overhead.** Docker + ClickHouse + Postgres stack. Acceptable for teams with ops capacity; tedious without.
- **Prompt management requires discipline.** Great features only work if the team actually versions prompts. Rolling your own "edit and hope" approach defeats the point.
- **Some enterprise features gated.** Audit logs, SSO, compliance controls available at higher tiers only.

## Against the alternatives

| | Langfuse | Helicone | LangSmith | Braintrust |
|---|---|---|---|---|
| **License** | MIT | Open source | Closed | Closed |
| **Free tier** | 50k units/mo | 10k requests/mo | Limited | Limited |
| **Prompt management** | Strong | Basic | Good | Basic |
| **Evals** | Strong | Adequate | Strong | Strongest |
| **AI Gateway** | No | Yes | No | No |
| **Best for** | Framework-agnostic + evals | Multi-provider + gateway | LangChain teams | Eval-heavy teams |

## Methodology

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-04-18 against [langfuse.com/pricing](https://langfuse.com/pricing) and [Langfuse GitHub](https://github.com/langfuse/langfuse).

## FAQ

**Is Langfuse really free?**
Hobby plan (50k units/month, 30-day retention) is free forever with no credit card. Self-hosted is $0 under MIT license.

**Did the ClickHouse acquisition change anything for users?**
No major changes as of April 2026. The MIT license remained, pricing stayed the same, and no new paywalls were added. ClickHouse benefits from owning Langfuse's user base; Langfuse benefits from ClickHouse's scale.

**Can I use Langfuse without LangChain?**
Yes. Langfuse ingests traces via OpenTelemetry, direct SDK instrumentation, or plain HTTP. LangChain integration is one of many.

**How does Langfuse compare to Helicone?**
Langfuse has stronger prompt management and evals. Helicone has the AI Gateway (caching, failover, load balancing). Many teams run both for different concerns.

## Related

- **Category:** [AI Automation](/categories/ai-automation/) · [AI Coding](/categories/ai-coding/)
- **Compare:** Langfuse vs [Helicone](/tools/helicone/)
- **See also:** [LangGraph](/tools/langgraph/) · [Mastra](/tools/mastra/)
