---
type: tool
slug: pipedream
title: Pipedream
tagline: Developer-first workflow automation with inline JS, Python, Go, and Bash nodes. 3,000+ integrations. Hosts MCP servers that expose 10,000+ prebuilt tools to AI agents. Workday signed a definitive agreement to acquire Pipedream in November 2025.
category: ai-automation
company: pipedream
url: https://pipedream.com
pricing_model: freemium
price_range: "$0-$99+/month"
status: active
launched: 2019-03
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: monthly
seo_title: "Pipedream: Features, Pricing & Review (2026)"
meta_description: "Pipedream is the code-first workflow automation platform. Free tier, Basic $29/mo, Advanced $79/mo. 3,000+ integrations. Hosts MCP servers for AI agents. Workday signed a definitive agreement to acquire Pipedream Nov 2025. Verified April 18, 2026."
author: "aipedia.wiki Editorial"
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
  longevity: 7
tags: [workflow-automation, developer-tools, mcp, code-first, pipedream]
best_for:
  - developers who want scriptable, version-controlled workflows
  - teams building AI agents that need tool access to 3,000+ APIs
  - long-running or complex logic that Zapier's task-counting model punishes
  - secure API-key management across many third-party services
not_best_for:
  - non-technical users who do not want to touch code
  - teams that need an enterprise UI-first no-code builder
  - workloads that must self-host on-premise (no self-hosted edition)
quick_answer: >-
  Pipedream is the code-first workflow automation platform for developers, with inline JS, Python, Go, and Bash nodes next to 3,000+ prebuilt connectors. Pick it for scriptable automations and AI-agent tool access via its hosted MCP servers. Skip it for pure no-code work where Zapier or Make fit better.
price_history:
  - date: 2025-03-28
    plan: "MCP servers"
    price: "free"
    note: "Pipedream shipped hosted MCP servers exposing 10,000+ tools to AI agents."
  - date: 2025-11-19
    plan: "Acquisition"
    price: "n/a"
    note: "Workday signed a definitive agreement to acquire Pipedream."
  - date: 2026-04-18
    plan: "Basic / Advanced"
    price: "$29 / $79 per month"
    note: "Verified unchanged; Pipedream continues to operate independently pending deal close."
---

# Pipedream

Pipedream is a workflow automation platform built for developers. Workflows are trigger-and-step pipelines, like Zapier or Make, but any step can be inline **JavaScript, Python, Go, or Bash** code alongside 3,000+ prebuilt connectors. That makes Pipedream the go-to pick when an automation needs real logic, typed data handling, or version-controlled source rather than a purely visual builder.

In March 2025 Pipedream shipped hosted **MCP (Model Context Protocol) servers** that expose 10,000+ prebuilt tools to AI agents. That turned Pipedream into one of the primary tool-access layers for LLM agents alongside Zapier MCP and custom SDKs.

**Workday signed a definitive agreement to acquire Pipedream on November 19, 2025.** The deal was announced to close in Q4 of Workday's fiscal 2026. Pipedream and Workday continue to operate independently pending closing conditions, and Pipedream's public pricing and free tier remain unchanged.

## System Verdict

> **Pick Pipedream if your automations need real code and you run AI agents that need tool access to many APIs.** Dropping a Python or JS node anywhere in the workflow removes the Zapier-shaped ceiling on logic. The MCP server exposes 10,000+ tools to any LLM agent in one integration, which is the single cleanest path from "I want my agent to call 50 SaaS APIs" to a working system.
>
> **Skip it if your team is non-technical or the stakeholder list includes someone who insists on pure no-code.** [Zapier](/tools/zapier/) still wins on breadth of connectors (9,000+ vs 3,000+) and on the natural-language Zap builder. [Make](/tools/make/) is cheaper at high volume and has the best visual debugging. Pipedream has no self-hosted edition, so [n8n](/tools/n8n/) remains the pick for data-residency or on-premise deployments.
>
> **Who pays which tier:** Free for hobby and exploration use (100 credits, 3 active workflows). Basic $29/mo for small teams needing longer-running workflows and more credits. Advanced $79/mo for unlimited active workflows, priority support, and longer event history. Business is custom-quoted for SSO, audit logs, and dedicated support.

## Key Facts

| | |
|---|---|
| **Core model** | Trigger-and-step workflows with inline JS / Python / Go / Bash code nodes |
| **Prebuilt integrations** | 3,000+ apps |
| **MCP servers** | Hosted, free for personal use; exposes 10,000+ tools to AI agents (shipped March 28, 2025) |
| **Credit unit** | 1 credit = 30 seconds of compute at 256 MB memory |
| **Free tier** | 100 credits/day · 3 active workflows · 3 connected accounts · 5-minute execution cap |
| **Basic** | $29/mo · 2,000 credits/day · 10 workflows · 5 connected accounts |
| **Advanced** | $79/mo · 10,000 credits/day · unlimited workflows · 1-year event history |
| **Business** | Custom · unlimited credits · SSO/SAML · audit logs · dedicated support |
| **Workflow execution cap** | 5 min (Free) · 12.5 min (paid) · custom (Business) |
| **Self-hosting** | None |
| **Corporate status** | Workday signed a definitive agreement to acquire Pipedream (Nov 19, 2025); deal pending close |

## What it actually is

Pipedream workflows are a sequence of steps. Each step is either a prebuilt action (send Slack message, write to Postgres, call OpenAI, etc.) or a custom code step. Custom code runs in a managed Node.js, Python, Go, or Bash environment with access to any npm or PyPI package.

That architecture is the headline differentiator. Zapier, Make, and Gumloop all have "run code" escape hatches. In Pipedream the code step is first-class and sits inline in the workflow graph alongside prebuilt actions.

Three other pieces matter. **Data Stores** give each workspace a key-value store for cross-workflow state. **Sources** let workflows listen on HTTP webhooks, schedules, email, RSS, and polling triggers. **Pipedream Connect** is the separate SDK product that lets you embed integrations into your own app or agent, billed on API credits and end-user counts.

## When to pick Pipedream

- **Developer-heavy teams.** Inline JS and Python nodes remove the "I have to write a custom HTTP action" friction that breaks Zapier budgets. Version control works through the built-in Git-style history.
- **AI-agent tool access.** Pipedream's hosted MCP servers expose 10,000+ prebuilt tools across 3,000+ APIs. Point Claude, ChatGPT, or a custom LangChain agent at one MCP endpoint and get real SaaS-side action coverage in minutes.
- **Workflows that need real logic.** Branching, loops, retries, rate-limit handling, and typed data transformations all stay readable when you drop into Python rather than chaining no-code blocks.
- **Secure API-key management.** Connected accounts store OAuth tokens and API keys server-side. Workflows use them without ever exposing the raw credential to the LLM or to logs.
- **Cost efficiency at moderate volume.** One credit covers the whole workflow run up to 30 seconds, not per step. That undercuts Zapier's per-task billing for multi-step flows.

## When to pick something else

- **Pure no-code stakeholders:** [Zapier](/tools/zapier/) wins on connector breadth (9,000+) and on the natural-language Zap builder. The AI Copilot builds working multi-step Zaps from prose.
- **Complex visual debugging and branching:** [Make](/tools/make/) has the clearest visual debugger and cheaper per-operation billing at sustained high volume.
- **Self-hosting and data residency:** [n8n](/tools/n8n/) is free self-hosted and ideal when the data must not leave your servers.
- **AI-first agent orchestration:** [CrewAI](/tools/crewai/), [Relevance AI](/tools/relevance-ai/), and [Gumloop](/tools/gumloop/) are built agent-first. Pipedream is a workflow platform that happens to host MCP servers. The distinction matters when the agent logic itself needs to be the primary product.
- **Fully free alternative for hobby use:** [Activepieces](/tools/activepieces/) is open-source and competes directly on code-first flexibility.

## Pricing

Subscription pricing via [pipedream.com/pricing](https://pipedream.com/pricing):

| Plan | Price | Credits/day | Active workflows | Connected accounts | Execution cap | Who's it for |
|------|-------|-------------|------------------|--------------------|---------------|--------------|
| Free | $0 | 100 | 3 | 3 | 5 minutes | Hobby use and evaluation |
| Basic | $29/mo | 2,000 | 10 | 5 | 12.5 minutes | Small-team automations |
| Advanced | $79/mo | 10,000 | Unlimited | Unlimited | 12.5 minutes | **Working developer teams land here** |
| Business | Custom | Unlimited | Unlimited | Unlimited | Custom | SSO / audit / dedicated support |

*Credits are consumed at 1 credit per 30 seconds of compute at 256 MB memory. Most single-step or short multi-step workflows use one credit per invocation regardless of step count. Credits reset daily and do not roll over.*

**Pipedream Connect** is a separate product, billed on API credits (1 credit per 30 seconds of compute) and end-user counts. Use Connect to embed Pipedream integrations into your own SaaS or AI agent.

**MCP server access** is free for personal use at [mcp.pipedream.com](https://mcp.pipedream.com). Production deployments inside apps run through Pipedream Connect.

Prices verified 2026-04-18 via [Pipedream pricing](https://pipedream.com/pricing) and the [Pipedream pricing docs](https://pipedream.com/docs/pricing).

## Against the alternatives

| | Pipedream | Zapier | Make | n8n |
|---|---|---|---|---|
| **Connector count** | 3,000+ | 9,000+ | 2,000+ | 1,000+ |
| **Inline code** | First-class (JS · Python · Go · Bash) | Escape hatch only | Escape hatch only | First-class (JS · Python) |
| **Billing model** | Per 30 s of compute | Per task (each step) | Per operation | Free self-hosted · paid cloud |
| **Self-hosting** | No | No | No | Yes (free) |
| **MCP server** | Hosted · 10,000+ tools | Hosted · Zapier MCP | No native MCP | Community builds |
| **Natural-language builder** | Limited | AI Copilot | Limited | Limited |
| **Best viewed as** | Developer workflow platform | No-code breadth incumbent | Visual power user | Self-hosted developer alternative |

## Failure modes

- **No self-hosting.** Everything runs on Pipedream's infrastructure. Data-residency-sensitive and regulated workloads should pick n8n instead.
- **Credit unit can surprise at heavy compute.** One credit covers 30 seconds at 256 MB. Longer or heavier workflows use more credits, and heavy AI-inference steps inside a workflow eat credits quickly.
- **Free tier event history is short.** 30-day history on Basic, 1 year on Advanced. Long-horizon debugging needs the higher tier.
- **No native versioning UX for team collaboration.** Workflow history exists, but there is no equivalent of a pull-request review flow. Teams building critical automations should layer their own review discipline.
- **Non-technical users hit a wall.** The platform exposes real code surface by design. Teams without developer capacity should start with Zapier or Make.
- **Pending Workday acquisition.** The November 2025 definitive agreement introduces uncertainty about long-term product direction, pricing, and whether Pipedream stays independently sold. The deal was expected to close in Q4 of Workday's fiscal 2026. Readers evaluating for multi-year deployments should price in the concentration risk.
- **MCP tool sprawl.** The hosted MCP server exposes 10,000+ tools. Agents given unfiltered access make worse decisions than agents given scoped tool allowlists. Use Pipedream's per-workflow MCP scoping.
- **Execution cap on paid tiers.** 12.5 minutes per workflow on Basic and Advanced. Long-running jobs need to be chunked or moved to Business.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-18 against [Pipedream pricing](https://pipedream.com/pricing), [Pipedream pricing docs](https://pipedream.com/docs/pricing), the [MCP Servers documentation](https://pipedream.com/docs/connect/mcp), the [Pipedream MCP launch announcement](https://mcp.pipedream.com/), and [Workday's November 2025 press release](https://newsroom.workday.com/2025-11-19-Workday-Signs-Definitive-Agreement-to-Acquire-Pipedream).

## FAQ

**Is Pipedream free to use?**
Yes for hobby and evaluation work. The free tier gives 100 credits/day, 3 active workflows, and a 5-minute execution cap. Paid plans start at Basic $29/month for 2,000 credits/day and longer-running workflows.

**What is Pipedream's MCP server?**
A hosted Model Context Protocol endpoint at [mcp.pipedream.com](https://mcp.pipedream.com) that exposes 10,000+ prebuilt tools across 3,000+ APIs to any MCP-compatible AI agent. It is free for personal use. Production embedding into apps runs through Pipedream Connect.

**Is Workday buying Pipedream?**
Workday signed a definitive agreement to acquire Pipedream on November 19, 2025, expected to close in Q4 of Workday's fiscal 2026. The two companies continue to operate independently pending closing conditions. Pipedream's public pricing and product surface are unchanged as of April 2026.

## Related

- **Category:** [AI Automation](/categories/ai-automation/)
- **Alternatives:** [Zapier](/tools/zapier/) · [Make](/tools/make/) · [n8n](/tools/n8n/) · [Activepieces](/tools/activepieces/) · [Gumloop](/tools/gumloop/) · [Relevance AI](/tools/relevance-ai/) · [CrewAI](/tools/crewai/)
