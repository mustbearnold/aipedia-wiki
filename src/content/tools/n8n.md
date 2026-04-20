---
type: tool
slug: n8n
title: n8n
tagline: Open-source workflow automation with native AI Agent nodes, self-host or cloud.
category: ai-automation
company: n8n-gmbh
url: https://n8n.io
pricing_model: freemium
price_range: "$0 (self-host) - $800+/month (Business cloud)"
status: active
launched: 2019-06
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: monthly
affiliate:
  has_program: true
  commission: "30% recurring"
  cookie_days: 90
  network: direct
  link: null
  application_status: rejected
  applied_date: 2026-04-15
  notes: "Declined 2026-04-15. Do not retry unless vendor policy changes."
scores:
  utility: 9
  value: 10
  moat: 7
  longevity: 9
tags: [automation, workflows, ai-agents, no-code, open-source, integrations, zapier-alternative, self-host]
seo_title: "n8n: Features, Pricing & Review (April 2026)"
meta_description: "n8n is the open-source workflow automation platform with native AI Agent nodes. Free to self-host with unlimited executions. Cloud plans from €24/mo."
author: "aipedia.wiki Editorial"
best_for:
  - developers and agencies avoiding vendor lock-in
  - teams needing data residency or self-hosting
  - native AI agent workflows
  - high-volume automation with predictable cost
not_best_for:
  - non-technical users who want zero setup
  - teams needing 9,000+ pre-built integrations
  - organizations mandating SaaS-only procurement
quick_answer: >-
  n8n is the open-source automation platform with native AI Agent nodes. Self-host for free with unlimited executions. Pick it for developer control, data residency, and AI agents. Skip for non-technical teams or long-tail SaaS coverage.
price_history:
  - date: 2025-10-15
    plan: "Cloud Starter"
    price: "€24/mo"
    note: "Cloud pricing migrated to EUR"
  - date: 2026-04-15
    plan: "Community (self-host)"
    price: "$0"
    note: "Free self-host verified unchanged"
---

# n8n

n8n is the open-source workflow automation platform built by n8n GmbH. Visual canvas, 500+ integrations, native AI Agent nodes, and JavaScript or Python code nodes when the visual layer runs out. Self-host for free with unlimited executions, or run managed cloud from €24/month.

## System Verdict

> **Pick n8n if the automation layer needs to be owned, not rented.** Self-hosting is free with unlimited workflows and unlimited executions. The AI Agent node ships autonomous multi-step agents with tool calling out of the box. JavaScript and Python code nodes close any gap the visual canvas leaves.
>
> **Skip it if onboarding speed outweighs control.** [Zapier](/tools/zapier/) ships 9,000+ integrations to n8n's 500+. Non-technical operators land faster on Zapier or [Make](/tools/make/). Teams that refuse server ops work belong on managed platforms.
>
> **Who pays which tier:** Community self-host for engineers and agencies, Starter €24/mo for small cloud use, Pro €60/mo for active production, Business €800/mo for SSO and scale, Enterprise custom for on-prem and dedicated support.

## Key Facts

| | |
|---|---|
| **License** | Fair-code (source-available, self-host permitted) |
| **Core product** | Visual workflow canvas with code fallback |
| **Integration count** | 500+ apps |
| **AI Agent node** | Native · connects to Claude Opus 4.7, GPT-5.4, Gemini 3.1 Pro, Llama 4, local models |
| **Code nodes** | JavaScript · Python |
| **Cloud pricing** | Starter €24 · Pro €60 · Business €800 · Enterprise custom |
| **Self-host** | Free · unlimited workflows · unlimited executions |
| **Deployment** | Docker · Kubernetes · VPS · Railway · any Node.js host |
| **Data residency** | Full control in self-host |

Every data point above was verified against vendor documentation on 2026-04-17. See Sources.

## What it actually is

A workflow automation engine built on Node.js with a drag-and-drop canvas and a code escape hatch. Workflows run locally, in Docker, on a VPS, in Kubernetes, or on n8n's managed cloud. The same workflow file moves between them.

The AI Agent node is the part worth noticing. Point it at any LLM, give it tools (HTTP requests, database queries, subworkflows), and it reasons through multi-step tasks without external orchestration frameworks. Chain nodes sequence LLM calls with memory and tool access.

The moat is the license and the agent stack. Source-available with self-host permitted means no vendor can pull the rug. Native AI Agent nodes beat bolt-on LLM modules in [Make](/tools/make/) and [Zapier](/tools/zapier/) for agentic workloads. The trade-off is 500+ integrations to Zapier's 9,000+ and a steeper learning curve than either.

## When to pick n8n

- **Data residency or compliance rules require on-prem.** Self-host on a controlled server. No traffic leaves the perimeter.
- **The workflow involves AI agents with tool calling.** The AI Agent node is purpose-built. [Make](/tools/make/) calls LLMs but does not run agent loops; [Zapier](/tools/zapier/) Agents work but cost task credits per tool call.
- **Budget is tight and volume is high.** Self-host is free. A $5 to $20/month VPS handles tens of thousands of executions without cloud bills.
- **The team writes code.** JavaScript and Python code nodes cover anything the visual layer cannot. Credentials, versioning, and queue mode scale to production.
- **Agencies run automation for clients.** Self-host on the client's infrastructure keeps margins high and data ownership clean.

## When to pick something else

- **Non-technical team with zero server ops:** [Zapier](/tools/zapier/). Lower learning curve, AI Copilot builds flows from prompts, 9,000+ integrations.
- **Cost-efficient complex branching without self-hosting:** [Make](/tools/make/). Operations-based billing stays affordable at volume.
- **LangChain-native RAG and multi-agent pipelines:** [Langflow](/tools/langflow/). Visual canvas tuned to LLM chains, not SaaS glue.
- **Customer-facing chat or voice agents:** [Voiceflow](/tools/voiceflow/). Built for support, not workflow ops.
- **Niche long-tail SaaS integration:** Zapier. 9,000+ connectors covers the tail that n8n often requires HTTP nodes to reach.

## Pricing

Subscription pricing via [n8n.io/pricing](https://n8n.io/pricing).

| Plan | Monthly | Executions | Key limits | Who's it for |
|------|---------|------------|-----------|--------------|
| Community (self-host) | $0 | Unlimited | Self-managed infrastructure | **Developers and agencies land here** |
| Starter (cloud) | €24 | 2,500 | Unlimited workflows, 5 users | Small teams, light cloud use |
| Pro (cloud) | €60 | 10,000 | Admin features, priority support | Active production |
| Business (cloud) | €800 | 40,000 | SSO, audit logs, dedicated resources | Enterprise scale |
| Enterprise | Custom | Unlimited | On-prem option, dedicated support, SLA | Regulated orgs |

*Prices verified 2026-04-17 via [n8n pricing](https://n8n.io/pricing). Qualifying startups get 50% off the Business plan. Self-hosted Community Edition has no feature caps; hosting cost is the VPS bill (typically $5 to $20/month).*

## Against the alternatives

| | n8n | [Zapier](/tools/zapier/) | [Make](/tools/make/) | [Langflow](/tools/langflow/) |
|---|---|---|---|---|
| **License** | Source-available, self-host OK | Proprietary SaaS | Proprietary SaaS | Open source (MIT) |
| **Integration count** | 500+ | 9,000+ | 2,000+ | LLM-focused |
| **AI agents** | Native AI Agent nodes | Zapier Agents + Central | LLM modules (no agents) | LangGraph-based |
| **Self-host** | Free, unlimited | None | None | Free, unlimited |
| **Code escape hatch** | JS + Python nodes | Code step (JS/Python) | Custom functions | Custom Python nodes |
| **Best viewed as** | Dev-friendly open source | Incumbent generalist | Cost-efficient cloud | LLM-chain specialist |

## Failure modes

- **Learning curve is steeper than [Zapier](/tools/zapier/).** The JSON data model, expression syntax, and credential system assume technical comfort. Non-technical operators stall.
- **500+ integrations lags [Zapier](/tools/zapier/).** Niche SaaS often requires hand-built HTTP nodes and OAuth. Doable but costs engineering time.
- **Self-host ops is real work.** Upgrades, backups, credential encryption, queue mode, and scaling to worker processes fall on whoever runs the server.
- **AI Agent node tuning matters.** Complex multi-step reasoning can loop or stall without careful prompt and tool design. Not fire-and-forget.
- **Cloud executions burn fast.** Heavy cron schedules or high-frequency triggers chew through monthly execution limits. Self-host removes the limit entirely.
- **UI clutters past 20 nodes.** Large workflows become visually hard to navigate. Sub-workflows and careful grouping help.
- **No enterprise-grade SaaS polish on lower cloud tiers.** SSO, audit logs, and dedicated resources land only on Business and Enterprise.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against [n8n pricing](https://n8n.io/pricing), [n8n documentation](https://docs.n8n.io), and the [n8n AI Agent node docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/).

## FAQ

**Is n8n free?**
Yes, self-hosted. The Community Edition runs on any Node.js host with unlimited workflows and unlimited executions. Hosting cost is the VPS bill (typically $5 to $20/month). Cloud plans start at €24/month ([n8n pricing](https://n8n.io/pricing)).

**What does the AI Agent node do?**
It runs autonomous multi-step reasoning with tool calling. Connect any LLM (Claude Opus 4.7, GPT-5.4, Gemini 3.1 Pro, local models), define tools, and the agent plans and executes tasks inside a workflow ([n8n Agent docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/)).

**n8n vs Zapier?**
n8n wins on self-host, native AI agents, and cost at volume. [Zapier](/tools/zapier/) wins on integration breadth (9,000+ vs 500+) and onboarding speed for non-technical users.

**Is n8n really open source?**
Fair-code licensed: source-available, self-host permitted, commercial use permitted with limits on offering n8n itself as a managed service. The distinction matters for vendors resetting n8n as a product; it does not affect normal self-host use.

**How do cloud executions count AI workflows?**
AI workflows count as regular executions. There is no separate AI pricing tier. A tool-calling Agent run counts as one execution regardless of how many LLM calls it makes internally.

## Sources

- [n8n pricing](https://n8n.io/pricing): current cloud plan rates and execution limits
- [n8n documentation](https://docs.n8n.io): self-host setup, nodes, and workflow reference
- [n8n AI Agent node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/): native agent capabilities
- [n8n GitHub](https://github.com/n8n-io/n8n): source, releases, and license

## Related

- **Category:** [AI Automation](/categories/ai-automation/)
- **Comparisons:** [n8n vs Make vs Zapier](/comparisons/n8n-vs-make-vs-zapier/) · [ChatGPT vs n8n](/comparisons/chatgpt-vs-n8n/)
