---
type: tool
slug: orkes
title: Orkes
tagline: Durable workflow and agent-orchestration engine from the creators of Netflix's open-source Conductor. Sits underneath LangGraph, CrewAI, and other agent frameworks rather than replacing them. Free Developer Edition, Enterprise pricing by quote.
category: ai-automation
secondary_categories: [ai-infrastructure]
company: Orkes, Inc.
url: https://orkes.io
pricing_model: freemium
price_range: "Free Developer Edition; Enterprise custom (contact sales)"
status: active
launched: 2022-02
last_updated: 2026-07-02
last_verified: 2026-07-02
update_frequency: monthly
seo_title: "Orkes: Conductor Orchestration Platform Pricing & Review (July 2026)"
meta_description: "Orkes is the enterprise platform built on Netflix's open-source Conductor engine for durable workflow and AI-agent orchestration. Verified July 2, 2026: free Developer Edition for prototyping, Enterprise is custom quote only, $60M Series B closed April 2026."
author: "aipedia.wiki Editorial"
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 6
  moat: 7
  longevity: 8
facts:
  best_for:
    value: "Best for engineering teams that need durable, code-first execution underneath AI agents and business workflows, especially teams already running or considering Netflix's open-source Conductor and wanting enterprise governance, observability, and SLAs on top of it."
    source: "https://orkes.io/"
    source_label: "Source"
    source_id: orkes-platform
    verified_at: 2026-07-02
    volatility: medium
    confidence: medium
  pricing_anchor:
    value: "No public dollar tiers. Developer Edition is free and feature-rich (all Conductor OSS features plus enterprise features, pre-built templates, community support) but explicitly not for production: no SLA, limited scalability, rate limits. Enterprise is custom-quoted with up to 99.99% availability SLA, dedicated Technical Account Manager, and Orkes-hosted or customer-hosted (AWS, Azure, GCP, on-prem) deployment. A 14-day Enterprise trial is available via signup."
    source: "https://orkes.io/pricing"
    source_label: "Source"
    source_id: orkes-pricing
    verified_at: 2026-07-02
    next_review_at: 2026-08-02
    volatility: high
    confidence: medium
  funding:
    value: "Orkes closed a $60M Series B in April 2026, led by AVP with new investor Prosperity7 Ventures and existing investors Nexus Venture Partners, Battery Ventures, and Vertex Ventures US. That follows a $20M Series A (2024) and a $9.3M seed/stealth round (2022), putting cumulative disclosed funding near $90M."
    source: "https://www.finsmes.com/2026/04/orkes-raises-60m-in-series-b-funding.html"
    source_label: "Source"
    source_id: orkes-funding
    verified_at: 2026-07-02
    volatility: medium
    confidence: high
  watch_out_for:
    value: "There is no self-serve paid tier between free and Enterprise: teams that outgrow the non-production Developer Edition go straight to a sales-quoted contract with no published floor price. Budget for a sales cycle, not a credit-card checkout."
    source: "https://orkes.io/pricing"
    source_label: "Source"
    source_id: orkes-pricing
    verified_at: 2026-07-02
    next_review_at: 2026-08-02
    volatility: high
    confidence: medium
tags: [ai-automation, orchestration, conductor, netflix-conductor, durable-execution, workflow-engine, agent-orchestration, open-source]
best_for:
  - engineering teams running Netflix Conductor OSS who want managed hosting and enterprise governance
  - durable execution underneath agent frameworks like LangGraph, CrewAI, or OpenAI Agents SDK
  - regulated or mission-critical workflows needing human-in-the-loop approvals and audit trails
  - polyglot teams needing Java, Python, Go, JS/TS, or C# SDKs against one orchestration engine
not_best_for:
  - solo developers or small teams wanting a self-serve paid tier with a published price
  - no-code builders who want a visual canvas as the primary interface (n8n fits better)
  - teams that want a single opinionated agent framework rather than an execution layer underneath one
quick_answer: >-
  Orkes is the enterprise platform built on Netflix's open-source Conductor engine, providing durable workflow and agent orchestration underneath frameworks like LangGraph and CrewAI rather than competing with them. Conductor core is open source and free; Orkes' own pricing is free Developer Edition (non-production) or custom-quoted Enterprise, verified July 2, 2026. Pick it when you need durable execution, human-in-the-loop approvals, and governance at production scale. Skip it if you want a published self-serve price or a no-code-first builder.
price_history:
  - date: 2026-07-02
    plan: "Developer Edition / Enterprise"
    price: "Free / Custom"
    source: "https://orkes.io/pricing"
    source_label: "Source"
    source_id: orkes-pricing
    verified_at: 2026-07-02
    note: "Initial verification. No published dollar tiers exist between the free, non-production Developer Edition and custom-quoted Enterprise. 14-day Enterprise trial available."
  - date: 2026-04-23
    plan: "Series B"
    price: "$60M raised"
    source: "https://www.finsmes.com/2026/04/orkes-raises-60m-in-series-b-funding.html"
    source_label: "Source"
    source_id: orkes-funding
    verified_at: 2026-07-02
    note: "Led by AVP with Prosperity7 Ventures joining; Nexus Venture Partners, Battery Ventures, and Vertex Ventures US returned. Follows a 2024 Series A ($20M) and 2022 seed ($9.3M)."
---

# Orkes

Orkes is the commercial platform built by the original creators of **Netflix's Conductor**, the open-source workflow orchestration engine Netflix released in 2016. The founding team (Jeu George, Viren Baraiya, Boney Sekh, and Dilip Lukose) left Netflix, reunited in 2021, and launched Orkes out of stealth in February 2022 to offer a managed and enterprise-hardened version of the same engine.

In 2026 Orkes repositions Conductor as **"the operating system for AI agents and workflows"**: a durable, code-first execution layer that sits *underneath* agent frameworks like LangGraph, CrewAI, OpenAI Agents SDK, and Google ADK rather than competing with them. Teams keep their agent framework of choice for reasoning and tool calls, and route the actual execution, retries, state, and human approvals through Conductor.

## System Verdict

> **Pick Orkes if you're already running (or seriously considering) Conductor and need production governance on top.** Durable execution, human-in-the-loop pauses, event-driven triggers, and audit trails are the core value, backed by SDKs in Java, Python, Go, JavaScript/TypeScript, and C#.
>
> **Skip it if you want a published self-serve price or a no-code-first canvas.** There is no dollar figure between the free, non-production Developer Edition and a custom-quoted Enterprise contract. Teams that want to swipe a card and scale should look at [n8n](/tools/n8n/) or stay inside a single agent framework's own hosted layer.
>
> **Commercial reality:** Conductor itself is open source and free to self-host from GitHub. Orkes' own value-add, managed hosting plus enterprise features, is free only in the non-production Developer Edition; every production deployment goes through a sales-quoted Enterprise agreement. Orkes raised a $60M Series B in April 2026, so expect continued platform investment rather than an imminent shutdown risk.

## Key Facts

| | |
|---|---|
| **Company** | Orkes, Inc., founded 2021, launched from stealth February 2022 |
| **Founders** | Jeu George (CEO), Viren Baraiya (co-CTO), Boney Sekh (co-CTO), Dilip Lukose (CPO), all original Netflix Conductor architects |
| **Core engine** | Conductor, open source, originally created at Netflix (2016) |
| **Latest funding** | $60M Series B, April 2026, led by AVP; ~$90M raised cumulatively since 2022 |
| **SDKs** | Java, Python, Go, JavaScript/TypeScript, C# |
| **Positioning** | Durable execution layer underneath agent frameworks (LangGraph, CrewAI, OpenAI Agents SDK, Google ADK), not a replacement for them |
| **Deployment** | Orkes-hosted (cloud) or customer-hosted (AWS, Azure, GCP, on-prem, dedicated VPC/VNet) |
| **Free tier** | Developer Edition: all Conductor OSS + enterprise features, no SLA, not for production |
| **Paid tier** | Enterprise only, custom-quoted, up to 99.99% SLA, dedicated TAM |
| **Named customers** | Twilio, LinkedIn, Quest Diagnostics, United Wholesale Mortgage, Woodside Energy, per company materials |

## What it actually is

Conductor is a **workflow orchestration engine**: you define workflows as JSON/code, and Conductor tracks state, retries failed steps, persists progress across restarts, and resumes long-running processes that can span minutes, hours, or days. Netflix built it internally to coordinate microservices and open-sourced it in 2016; it has since become one of the more widely deployed workflow engines outside the big cloud vendors' native offerings.

Orkes is the company, not a fork: it maintains the open-source Conductor project and layers a hosted/enterprise product on top, adding governance, security, observability, SLAs, and support that the raw OSS project doesn't provide on its own.

For 2026's AI wave, Orkes repositions the same durable-execution primitives for agents specifically: pausing a workflow for human approval before an agent takes a risky action, retrying a failed tool call without losing state, and giving compliance teams an audit trail of what an agent actually did. The pitch is explicitly **"bring your own agent framework"**: LangGraph, CrewAI, OpenAI Agents SDK, or Google ADK handle the reasoning and tool-calling; Conductor/Orkes handles the durable, governed execution around it.

## When to pick Orkes

- **You're already on Conductor OSS.** Orkes is the natural upgrade path from self-hosted Conductor to managed hosting with enterprise support, without a rewrite.
- **Durable execution across long-running or failure-prone workflows.** Multi-step agent chains that must survive restarts, retries, and partial failures fit Conductor's core design better than a stateless framework loop.
- **Human-in-the-loop governance is a requirement, not a nice-to-have.** Regulated industries (finance, healthcare, energy) need pause-for-approval steps and audit trails before an agent acts.
- **Polyglot engineering org.** Native SDKs in Java, Python, Go, JavaScript/TypeScript, and C# mean teams aren't locked into a single language's agent ecosystem.
- **You want the orchestration layer decoupled from the agent framework.** If the team expects to swap LangGraph for CrewAI (or vice versa) later, keeping execution in Conductor avoids re-platforming the durability layer too.

## When to pick something else

- **Self-serve pricing with a published dollar figure:** [n8n](/tools/n8n/). Community self-host is free, hosted plans start around published Starter/Pro pricing, no sales call required to get started.
- **A single opinionated Python/JS agent framework without a separate execution engine:** [LangGraph](/tools/langgraph/) for stateful graph-based agents, or [CrewAI](/tools/crewai/) for role-based agent crews.
- **No-code-first visual automation for smaller teams:** [n8n](/tools/n8n/) again, or Zapier-class tools, where the canvas is the product rather than a code-first SDK.
- **You want to avoid any sales-quoted pricing entirely.** Orkes has no self-serve paid tier; if that's a dealbreaker, an open-source-only, self-hosted Conductor deployment (unsupported) or a framework with transparent usage-based billing is a better fit.

## Pricing

Verified 2026-07-02 via [orkes.io/pricing](https://orkes.io/pricing):

| Plan | Price | What's included | Who it's for |
|---|---|---|---|
| Developer Edition | Free | All Conductor OSS features plus enterprise features, pre-built workflow templates, early access to new features, community support | Prototyping, evaluation, non-production use only |
| Enterprise | Custom (contact sales) | Full platform, up to 99.99% availability SLA, SLA-backed response times, multi-channel support (email, portal, Slack, Teams), dedicated Technical Account Manager, expert architectural guidance | Production workloads, teams needing governance and support contracts |

There is no published tier between these two. Enterprise deployment can be **Orkes-hosted** (fully managed) or **customer-hosted** (AWS, Azure, Google Cloud, on-premises, dedicated VPC/VNet, cross-region backup and failover). A 14-day Enterprise trial is offered at signup.

Separately, the underlying **Conductor engine is open source** and can be self-hosted for free without any Orkes contract; you lose managed hosting, enterprise features, and support in that path.

## Against the alternatives

| | Orkes | LangGraph | CrewAI | n8n |
|---|---|---|---|---|
| **Core model** | Durable execution engine (Conductor), framework-agnostic | Low-level stateful graph runtime | Role-based multi-agent crews | Visual + code-first workflow automation |
| **Pricing** | Free Developer Edition (non-prod) / Enterprise custom | Free library; LangSmith from $0-$39/seat/mo | Open source; CrewAI Enterprise custom | Free self-host; hosted plans from published rates |
| **Primary language** | Java, Python, Go, JS/TS, C# | Python, JavaScript/TypeScript | Python | Node.js (visual canvas, code nodes) |
| **Relationship to agent frameworks** | Sits underneath them (bring your own) | Is one itself | Is one itself | Has its own AI Agent node |
| **Self-serve checkout** | No | Yes (LangSmith) | Partial | Yes |
| **Best viewed as** | Governed execution layer for agents at scale | Stateful agent orchestration library | Fast multi-agent prototyping | No-code-friendly automation with AI nodes |

## Recent developments

- **April 2026: $60M Series B.** Led by AVP, with new investor Prosperity7 Ventures and returning investors Nexus Venture Partners, Battery Ventures, and Vertex Ventures US. Orkes says it has tripled its customer base since the 2024 Series A and now counts hundreds of thousands of developers and millions of installs across its open-source and commercial user base.
- **AI-agent repositioning.** Orkes now markets Conductor explicitly as infrastructure for AI agents, adding "Orkes Agentic Workflows" and an "Agentspan" observability product aimed at giving teams explainability into agent decision-making, alongside the pre-existing workflow-orchestration core.
- **Framework-agnostic messaging.** Marketing and docs increasingly emphasize "bring your own agent framework" (LangGraph, OpenAI Agents SDK, Google ADK, CrewAI), positioning Orkes as infrastructure rather than a competing agent framework.

## System verdict

Orkes is infrastructure, not a finished agent product: teams still choose and build their own agents in LangGraph, CrewAI, or another framework, then route execution through Conductor for durability and governance. That makes it a strong fit for engineering-led organizations that already value Conductor's failure-recovery model, and a poor fit for teams that want a single self-serve subscription with a visible price tag. The lack of a published paid tier below Enterprise is the single biggest buying friction: budget for a sales conversation, not a checkout page.

## FAQ

<details>
<summary>Is Orkes free?</summary>
Partially. The underlying Conductor engine is open source and free to self-host. Orkes' own Developer Edition is also free but explicitly not for production (no SLA, rate limits, variable performance). Production use requires a custom-quoted Enterprise agreement.
</details>

<details>
<summary>What is the difference between Conductor and Orkes?</summary>
Conductor is the open-source workflow orchestration engine, originally created at Netflix and released in 2016. Orkes, Inc. is the company founded in 2021 by Conductor's original architects; it maintains the open-source project and sells a managed, enterprise-hardened version on top of it.
</details>

<details>
<summary>Does Orkes replace LangGraph or CrewAI?</summary>
No. Orkes positions itself as complementary infrastructure that sits underneath agent frameworks like LangGraph, CrewAI, OpenAI Agents SDK, and Google ADK. Teams keep their chosen framework for agent reasoning and route execution, retries, and human-approval steps through Orkes/Conductor.
</details>

<details>
<summary>How much does Orkes Enterprise cost?</summary>
There is no published price. Enterprise is quote-based after a sales conversation, and a 14-day trial is available through the Orkes signup flow. Verified July 2, 2026 against the official pricing page.
</details>

<details>
<summary>Who founded Orkes?</summary>
Jeu George (CEO), Viren Baraiya and Boney Sekh (co-CTOs), and Dilip Lukose (CPO), all of whom built Conductor while at Netflix. They founded Orkes in 2021 and launched publicly in February 2022.
</details>

<details>
<summary>What languages does Orkes support?</summary>
Native SDKs are available for Java, Python, Go, JavaScript/TypeScript, and C#.
</details>

## Sources

- [Orkes official site](https://orkes.io/)
- [Orkes pricing page](https://orkes.io/pricing)
- [Orkes about us](https://orkes.io/about-us)
- [Orkes $60M Series B coverage, FinSMEs](https://www.finsmes.com/2026/04/orkes-raises-60m-in-series-b-funding.html)
- [Orkes $60M Series B coverage, The SaaS News](https://www.thesaasnews.com/news/orkes-raises-60m-series-b)
- [TechCrunch: Orkes stealth launch, $9.3M, 2022](https://techcrunch.com/2022/02/28/orkes-from-the-creators-of-netflixs-open-source-conductor-workflow-orchestration-tool-comes-out-of-stealth-with-9-3m/)
- [TechCrunch: Orkes $20M Series A, 2024](https://techcrunch.com/2024/02/21/orkes-raises-20m-series-a/)

## Related

- **Category:** [AI Automation](/categories/ai-automation/)
- **Compare:** Orkes vs [LangGraph](/tools/langgraph/) - Orkes vs [CrewAI](/tools/crewai/) - Orkes vs [n8n](/tools/n8n/)
- **See also:** [LangGraph](/tools/langgraph/) - [CrewAI](/tools/crewai/) - [n8n](/tools/n8n/)
</content>
