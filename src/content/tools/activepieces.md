---
type: tool
slug: activepieces
title: Activepieces
tagline: >-
  Open-source MIT-licensed automation platform. Free to self-host; cloud Standard is
  free for 10 flows, then $5 per active flow per month.
category: ai-automation
company: Activepieces Inc.
url: 'https://www.activepieces.com'
github_url: https://github.com/activepieces/activepieces
pricing_model: open-source
price_range: Free self-host / $5 per active flow (cloud)
status: active
launched: 2022-06
last_updated: 2026-04-17
last_verified: 2026-04-17
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
  moat: 6
  longevity: 7
tags: [automation, open-source, zapier-alternative, no-code, workflow, self-hosted, mcp]
seo_title: 'Activepieces Review: Open-Source Zapier Alternative (April 2026)'
meta_description: >-
  Activepieces is an MIT-licensed no-code automation platform with AI agents and
  native MCP support. Free to self-host; cloud Standard free for 10 flows, then
  $5/flow/month. Verified April 2026.
author: aipedia.wiki Editorial
best_for:
  - teams leaving Zapier on cost
  - privacy-sensitive automations kept on-prem
  - AI agent workflows with MCP tool servers
  - developer teams comfortable with Docker
not_best_for:
  - non-technical users wanting zero infra
  - workflows needing 1000+ third-party connectors
  - heavy enterprise SSO/audit requirements without an annual contract
quick_answer: >-
  Activepieces is an MIT-licensed Zapier alternative. Self-host free with unlimited runs, or use cloud Standard (10 flows free, then $5 per active flow per month). Every piece doubles as an MCP server for Claude Desktop, Cursor, and Windsurf. Pick it for cost and privacy; skip if the connector catalog (~400) gaps your stack.
price_history:
  - date: 2026-02-01
    plan: "Standard"
    price: "$5/flow/mo"
    note: "Per-flow pricing replaces per-task metering; 10 flows included free."
  - date: 2026-04-17
    plan: "Self-hosted"
    price: "Free"
    note: "Verified unchanged. MIT license, unlimited runs."
---

# Activepieces

Open-source no-code automation platform from Activepieces Inc. Positioned as a [Zapier](/tools/zapier/) alternative, with the full codebase under MIT license on [GitHub](https://github.com/activepieces/activepieces). Every piece doubles as a Model Context Protocol server, so flows can be called from Claude Desktop, Cursor, or Windsurf as AI agent tools.

Two deployment paths: self-host free on your own infrastructure, or use the cloud Standard plan (10 flows free, then $5 per active flow per month).

## System Verdict

> **Pick Activepieces if cost or data residency ruled out Zapier.** Self-hosted is genuinely free with unlimited runs. Cloud Standard starts free for 10 active flows and scales at $5 per flow, not per task, which avoids the step-multiplier trap that makes Zapier expensive.
>
> The MCP integration is the real 2026 upgrade. Pieces contributed to the catalog auto-expose as MCP servers, so a single Activepieces install gives an agent in [Claude Desktop](/tools/claude/) or [Cursor](/tools/cursor/) access to ~400 tools without writing connector code.
>
> **Skip it if the connector catalog gaps your stack.** Zapier still wins on raw breadth. Skip too if the team has no Docker comfort, no Postgres admin, and no appetite for version upgrades. [Make](/tools/make/) is the better managed pick there.
>
> **Who pays which tier:** solo self-host for hobbyists and privacy-first teams, cloud Standard free for small teams under 10 flows, cloud Standard paid ($5/flow) for production teams, Enterprise annual contract for SSO, audit logs, and Git sync.

## Key Facts

| | |
|---|---|
| **License** | MIT (self-host free, unlimited runs) |
| **Cloud Standard** | 10 active flows free, then $5 per active flow per month |
| **Connectors ("pieces")** | ~400 (Gmail, Slack, Stripe, HubSpot, Notion, plus LLM providers) |
| **MCP servers** | Every piece exposes as MCP automatically |
| **AI actions** | Native pieces for GPT-5.4, Claude Opus 4.7, Gemini 3.1 Pro |
| **Self-host stack** | Docker Compose, Postgres, Redis |
| **Code steps** | JavaScript (Node-based) |
| **Enterprise deploy** | Custom annual contract (SSO, audit, Git sync, private pieces) |

Every data point above was verified against vendor documentation on 2026-04-17. See Sources.

## What it actually is

A visual workflow builder with drag-and-drop triggers, actions, branches, loops, and JavaScript code steps. Self-hosted runs on Docker Compose with Postgres and Redis. Cloud handles hosting and metering.

The 2026 positioning shift is AI agents and MCP. Contributing a piece to the public catalog auto-exposes it as an MCP server, usable from [Claude Desktop](/tools/claude/), Cursor, or Windsurf. This makes Activepieces a two-way bridge: flows call LLMs, and LLMs call flows.

The moats are thin. Code is MIT-licensed, so any competitor can fork. Differentiation rests on community contribution velocity, the MCP-first catalog, and the simplicity of the per-flow pricing model.

## When to pick Activepieces

- **Cost is the dealbreaker.** Zapier's step-based metering is punishing on multi-action flows. Activepieces charges per active flow, not per execution.
- **Data cannot leave on-prem.** Self-hosted deployment keeps every webhook, payload, and log on infrastructure the team controls.
- **The agent stack uses MCP.** Pieces expose as MCP servers natively; Claude Desktop or Cursor can invoke them without custom connectors.
- **The team has Docker and Postgres comfort.** Self-host setup runs in 20 minutes. Updates, backups, and scaling are the team's job.
- **Workflows need AI actions inline.** Native pieces for GPT-5.4, Claude Opus 4.7, and Gemini 3.1 Pro remove boilerplate OpenAI and Anthropic SDK calls.

## When to pick something else

- **Broadest connector catalog:** [Zapier](/tools/zapier/) ships 7,000+ integrations. Activepieces lists ~400.
- **Managed cloud with deep node library:** [n8n](/tools/n8n/) offers a similar open-source story plus cloud. Self-host n8n if the team prefers Node-flavored workflows over drag-and-drop.
- **Visual workflow builder with generous free tier:** [Make](/tools/make/) remains the best pick for non-technical users who will never self-host.
- **Enterprise SSO, SCIM, audit out of the box without a custom contract:** Zapier Enterprise or [Workato](/tools/workato/).
- **Coding the agent logic directly:** LangGraph or the MCP SDK. Activepieces is a GUI-first product.

## Pricing

Pricing via [activepieces.com/pricing](https://www.activepieces.com/pricing):

| Plan | Price | What you get |
|---|---|---|
| Self-hosted (Community) | Free | MIT license, unlimited flows, unlimited runs, all pieces, all MCP servers |
| Cloud Standard | Free for 10 active flows, $5 per additional flow/mo | Unlimited runs, AI agents, unlimited tables, email support |
| Cloud Unlimited | Custom (annual) | SSO, audit logs, role permissions, centralized AI billing, Git sync, private pieces |
| Embed | From $30,000/yr | Embedded builder and agents, JS SDK, custom templates, white-label |

*Prices verified 2026-04-17 via [activepieces.com/pricing](https://www.activepieces.com/pricing). Pricing shifted from per-task to per-active-flow in early 2026.*

## Against the alternatives

| | Activepieces | Zapier | n8n | Make |
|---|---|---|---|---|
| **License** | MIT open-source | Proprietary | Sustainable-Use (fair-code) | Proprietary |
| **Self-host** | Yes, free, unlimited | No | Yes, free | No |
| **Connector count** | ~400 | 7,000+ | 400+ | 1,500+ |
| **Native MCP** | Yes, every piece | No | No | No |
| **Pricing model** | Per active flow | Per task | Per execution | Per operation |
| **Entry cloud price** | Free (10 flows) | $29.99/mo | $24/mo | Free tier + $9/mo |
| **Best viewed as** | MCP-first automation | Breadth champion | Coder-friendly OSS | Polished visual builder |

## Failure modes

- **Connector gaps.** Niche SaaS apps common on Zapier may be missing. Workaround is custom HTTP pieces or community contributions, both of which cost time.
- **Self-host operations load.** Postgres backups, Redis uptime, Docker updates, and TLS renewal are the operator's problem. Cloud Standard exists for teams that do not want that.
- **Per-flow pricing surprises.** A flow that triggers 10,000 times per month costs the same $5 as one that fires twice. That is usually a win, but low-volume test flows still count against the active-flow total.
- **Community piece quality varies.** Official pieces are maintained; community contributions can go stale when upstream APIs change.
- **MCP exposure needs review.** Every published piece becomes an MCP server. Teams running private pieces must opt into that exposure explicitly to avoid leaking internal endpoints to external agents.
- **Enterprise controls require a contract.** SSO, SCIM, audit logs, and Git sync live behind the Unlimited annual plan. No self-serve path to those features.
- **JavaScript-only code steps.** Python, Ruby, Go, or Bash custom logic has to run as an external HTTP endpoint that the flow calls.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and product details against primary sources, and generates the editorial analysis shown. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against [activepieces.com/pricing](https://www.activepieces.com/pricing) and the [Activepieces GitHub repository](https://github.com/activepieces/activepieces).

## FAQ

**Is self-hosting truly free?**
Yes. MIT license, unlimited flows, unlimited runs, all pieces. The operator pays only for the server, database, and Redis. No Activepieces billing.

**How is cloud pricing structured in 2026?**
Cloud Standard is free for the first 10 active flows, then $5 per active flow per month. Runs are unlimited. This replaces the earlier per-task model.

**Does Activepieces support MCP?**
Yes. Every piece in the public catalog automatically exposes as a Model Context Protocol server. Claude Desktop, [Cursor](/tools/cursor/), and Windsurf can call Activepieces flows as agent tools.

**Activepieces vs Zapier in 2026?**
Activepieces wins on cost, self-host option, and native MCP. Zapier wins on connector breadth (7,000+ vs ~400) and hands-off reliability.

**Which AI models ship as native pieces?**
GPT-5.4, Claude Opus 4.7, Gemini 3.1 Pro, plus OpenRouter, vector-store, and agent pieces. Switching provider is a config change.

## Sources

- [Activepieces pricing](https://www.activepieces.com/pricing): plan structure, per-flow cost
- [Activepieces GitHub](https://github.com/activepieces/activepieces): MIT license, codebase, MCP positioning
- [Activepieces self-hosting docs](https://www.activepieces.com/docs/install/overview): Docker Compose, Postgres, Redis setup
- [Pricing-model blog post](https://www.activepieces.com/blog/automation-pricing): 2026 shift from per-task to per-flow billing

## Related

- **Category:** [AI Automation](/categories/ai-automation/)
- **Comparisons:** [Activepieces vs Zapier](/comparisons/activepieces-vs-zapier/) · [Activepieces vs n8n](/comparisons/activepieces-vs-n8n/) · [Activepieces vs Make](/comparisons/activepieces-vs-make/)
