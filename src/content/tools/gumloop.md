---
type: tool
slug: gumloop
title: Gumloop
tagline: YC W24 drag-and-drop AI workflow builder for marketing and ops teams. Solo $37/mo · 10K credits · 5 concurrent runs · bring-your-own API keys cut AI node cost to 1 credit.
category: ai-automation
secondary_categories: [ai-coding]
company: Gumloop Inc.
url: https://gumloop.com
pricing_model: freemium
price_range: "$0-$244/month"
status: active
launched: 2023-04
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: monthly
seo_title: "Gumloop: Features, Pricing & Review (2026)"
meta_description: "Gumloop is a YC W24 AI workflow automation platform. Free tier with 2K credits, Solo $37/mo, Team $244/mo. Drag-and-drop builder, bring-your-own API keys, OpenAI/Anthropic/Gemini/DeepSeek backbones."
author: "aipedia.wiki Editorial"
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 7
  moat: 6
  longevity: 7
tags: [ai-automation, workflow-builder, no-code, yc-backed, gumloop]
best_for:
  - marketing and ops teams wanting AI-first automation
  - drag-and-drop workflow building with GPT, Claude, Gemini, DeepSeek nodes
  - bring-your-own-API-key workloads where per-run cost matters
  - internal AI agents for sales enrichment, data analysis, and CRM updates
not_best_for:
  - teams already standardized on Zapier or Make with deep integration libraries
  - self-hosted or air-gapped deployments (n8n is better)
  - pure LLM chat or coding assistance (use ChatGPT, Claude, Copilot)
quick_answer: >-
  Gumloop is a YC W24 drag-and-drop AI workflow builder aimed at marketing, sales, and ops teams. Free tier gives 2,000 credits. Solo is $37/mo with 10K credits, Team is $244/mo with 60K credits and 10 seats. Pick it for AI-native no-code automation. Skip for broad SaaS connector breadth or self-hosting.
price_history:
  - date: 2026-04-18
    plan: "Solo"
    price: "$37/mo"
    note: "Verified, unchanged; 20% discount on annual billing"
  - date: 2026-04-18
    plan: "Team"
    price: "$244/mo"
    note: "Verified; 60K credits, up to 10 seats"
---

# Gumloop

Gumloop is a drag-and-drop AI workflow automation platform from Y Combinator's W24 batch. The company was founded in April 2023 by McGill grads Max Brodeur-Urbas and Rahul Behal, originally as AgentHub. Vancouver-born, now headquartered in San Francisco.

Funding totals ~$70M. $3.1M seed (2024), $17M Series A (January 2025), $50M Series B led by Benchmark (March 2026).

The product targets non-developers on marketing, sales, and ops teams. Workflows run as modular nodes on a canvas: AI calls, scrapers, CRM writes, email sends, approvals. LLM backbones include OpenAI, Anthropic, Gemini, and DeepSeek.

The anchor moat is the bring-your-own-API-key model. Connecting your own OpenAI or Anthropic key collapses any AI node cost to 1 credit, regardless of whether it calls Haiku or Opus 4.7.

## System Verdict

> **Pick Gumloop if you want an AI-native no-code builder that treats LLM calls as first-class nodes.** Teams that write Claude or GPT prompts into every step, need drag-and-drop speed, and have their own API keys will get the best economics here. The BYOK discount is genuinely large on advanced-model nodes.
>
> **Skip it if you need the biggest SaaS connector library, self-hosting, or sub-$37 paid pricing.** [Zapier](/tools/zapier/) still has more native integrations, [n8n](/tools/n8n/) wins on self-hosted deployments, and [Make](/tools/make/) is cheaper for non-AI workflows. Gumloop's value shows up when the workflow is mostly AI, not mostly SaaS glue.
>
> **Who pays which tier:** Free for prototyping individual agents, Solo $37/mo for one builder running regular jobs, Team $244/mo for a marketing or sales team with 10 seats, Enterprise for companies needing SSO, SCIM, audit logs, and private infrastructure.

## Key Facts

| | |
|---|---|
| **Company** | Gumloop Inc. (ex-AgentHub) · YC W24 · San Francisco |
| **Founders** | Max Brodeur-Urbas, Rahul Behal (April 2023) |
| **Funding** | Seed $3.1M (2024) · Series A $17M (Jan 2025) · Series B $50M (Mar 2026) |
| **Category** | AI workflow automation, drag-and-drop builder |
| **LLM backbones** | OpenAI, Anthropic, Gemini, DeepSeek |
| **Integrations** | Slack, Gmail, GitHub, Linear, Stripe, Airtable, Google Docs, HubSpot, Salesforce, Sheets, Dropbox, Asana, Zoom, Tableau |
| **Free tier** | 2,000 credits/mo · 2 concurrent runs · forum support |
| **Solo** | $37/mo · 10K credits · 1 seat · API keys · 5 list steps |
| **Team** | $244/mo · 60K credits · up to 10 seats · workspaces · Slack support |
| **Enterprise** | Custom · SSO/SCIM · audit logs · on-call · private infrastructure |
| **API access** | Yes, Solo and above |
| **Annual discount** | ~20% off all paid tiers |

## What it actually is

A visual canvas where each node is an action: an AI call, a web scrape, a Google Sheets write, a Slack message. Nodes connect into flows that run on triggers (schedule, webhook, email, file drop).

The AI nodes accept a prompt and a model pick. Standard models (GPT-4.1 Nano, Claude Haiku) cost 2 credits. Advanced (GPT-4.1, Claude Sonnet) cost 20. Expert (GPT-5, Opus) cost 30. Contact enrichment nodes cost 60.

Bring-your-own API keys cuts every AI node to 1 credit. On Opus-heavy workflows that is a 30x reduction in Gumloop credit burn. You still pay Anthropic or OpenAI directly, but your Gumloop plan lasts longer.

Gumstack is a separate product layer that monitors and audits AI chats and agent interactions across tools. It is an optional add-on on Enterprise.

## When to pick Gumloop

- **AI-first workflows.** Sales enrichment, content repurposing, ticket classification, meeting summaries. Tasks where the LLM call is the work, not glue between two SaaS apps.
- **Small non-developer teams.** Marketing or RevOps staff who need to ship automations without engineering. Drag-and-drop learning curve is shallow compared to n8n's JavaScript-heavy escape hatches.
- **BYOK economics.** Teams with existing OpenAI or Anthropic spend. Feeding keys into Gumloop collapses AI node cost to 1 credit each, which makes Opus-grade reasoning affordable at scale.
- **Pre-built agent templates.** Data analysis, customer support, CRM updates, call analysis. Templates ship as editable flows so customization is fast.
- **Multi-model routing.** Swap OpenAI, Anthropic, Gemini, DeepSeek per node to match task to model strength.

## When to pick something else

- **Widest integration catalog:** [Zapier](/tools/zapier/) still leads on raw number of connectors (8,000+). Gumloop's native list is narrower.
- **Self-hosted or air-gapped:** [n8n](/tools/n8n/) runs on your own infra. Gumloop is cloud-only.
- **Complex branching without AI:** [Make](/tools/make/) has more powerful flow control for non-AI logic and cheaper entry pricing.
- **Open-source and free forever:** [Activepieces](/tools/activepieces/) is MIT-licensed and self-hostable.
- **Enterprise agent orchestration:** [Relevance AI](/tools/relevance-ai/) targets the same market with more agent-specific tooling.
- **Code-first multi-agent systems:** [CrewAI](/tools/crewai/) for developers building agent crews in Python.

## Pricing

Plans via [gumloop.com/pricing](https://gumloop.com/pricing):

| Plan | Price | Credits | Seats | Key features |
|---|---|---|---|---|
| Free | $0 | 2K/mo | 1 | 2 concurrent runs, forum support |
| Solo | $37/mo | 10K/mo | 1 | API keys, 5 list steps, event triggers, 5 concurrent runs |
| Team | $244/mo | 60K/mo | up to 10 | Workspaces, 15 list steps, unified billing, Slack support |
| Enterprise | Custom | Custom | Unlimited | SSO/SCIM, audit logs, on-call, VPC, incognito mode, Gumstack add-on |

Annual billing shaves ~20% off Solo and Team. All tiers support Bring Your Own API Keys, which drops AI node cost from 2-30 credits to 1 credit.

Credit consumption at a glance:
- Standard AI (GPT-4.1 Nano, Claude Haiku): 2 credits
- Advanced AI (GPT-4.1, Claude Sonnet): 20 credits
- Expert AI (GPT-5, Claude Opus): 30 credits
- Contact enrichment: 60 credits
- Any AI node with BYOK: 1 credit

Prices verified 2026-04-18 via [Gumloop pricing](https://gumloop.com/pricing) and cross-checked against [Lindy's Gumloop pricing breakdown](https://www.lindy.ai/blog/gumloop-pricing) and [CheckThat.ai's Gumloop pricing guide](https://checkthat.ai/brands/gumloop/pricing).

## Against the alternatives

| | Gumloop | Zapier | n8n | Make | Relevance AI |
|---|---|---|---|---|---|
| **Entry price** | $0 Free, $37 Solo | $0, $19.99 Starter | $0 self-host, $20 cloud | $0, $9 Core | $0, $19 Pro |
| **Native integrations** | ~80-100 | 8,000+ | 500+ | 1,500+ | ~50 |
| **Self-host option** | No | No | Yes (source-available) | No | No |
| **Drag-and-drop** | Yes | Linear zap editor | Node canvas | Node canvas | Agent-first UI |
| **Native AI nodes** | First-class (4 LLM vendors) | Added later, thinner | AI nodes via community | AI via add-on | Agent-native |
| **BYOK discount** | Yes (1 credit per AI node) | Limited | Yes | Limited | No |
| **Best viewed as** | AI-native no-code builder | SaaS glue generalist | Developer self-host | Flow-logic powerhouse | Agent orchestration |

## Failure modes

- **Credit math gets expensive on deep workflows without BYOK.** A 10-step flow with two expert AI nodes and one enrichment burns 120 credits per run. 10K Solo credits cover ~83 runs a month. Heavy users need BYOK, the Team tier, or Enterprise.
- **Integration depth is narrower than Zapier.** Gumloop's native connectors cover the obvious SaaS apps. Long-tail tools frequently require HTTP or custom-code nodes, which costs dev time.
- **Cloud-only.** No self-host option. Regulated industries and air-gapped environments need n8n or Activepieces instead.
- **Gumstack is Enterprise-gated.** The governance and audit layer is not available on Team, which is the tier most mid-market buyers sit on.
- **Credits do not roll over.** Unused monthly credits expire. Bursty workloads pay for peak capacity.
- **No explicit per-tier rate limit publication.** Concurrent run caps are documented (2, 5, custom), but per-minute or per-node throttling is not.
- **Documentation assumes some savvy.** Templates help, but wiring up custom auth headers or non-listed APIs is closer to light scripting than pure no-code.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-18 against [Gumloop pricing](https://gumloop.com/pricing), [YC's Gumloop company profile](https://www.ycombinator.com/companies/gumloop), [BetaKit's Series B coverage](https://betakit.com/vancouver-founded-gumloop-sticks-50-million-usd-series-b-round-to-let-employees-build-their-own-ai-agents/), and the [Lindy Gumloop pricing guide](https://www.lindy.ai/blog/gumloop-pricing).

## FAQ

**Is Gumloop free to use?**
Yes. The free tier gives 2,000 credits per month, 2 concurrent runs, and forum-only support. Enough to prototype a workflow or two. Solo at $37/month unlocks API keys, higher credit limits, 5 concurrent runs, and event triggers.

**What LLMs does Gumloop support?**
OpenAI, Anthropic, Gemini, and DeepSeek are first-class backbones. Each AI node lets you pick the vendor and model. Bring-your-own keys cut Gumloop credit cost per call to 1, regardless of which model you pick.

**How does Gumloop compare to Zapier?**
Different products aimed at overlapping buyers. [Zapier](/tools/zapier/) wins on breadth (8,000+ connectors) and is the default if your job is gluing SaaS apps together. Gumloop wins when the workflow centers on LLM reasoning, multi-step AI pipelines, or model routing. Teams already heavy on OpenAI or Anthropic API spend benefit from Gumloop's BYOK pricing.

## Related

- **Category:** [AI Automation](/categories/ai-automation/)
