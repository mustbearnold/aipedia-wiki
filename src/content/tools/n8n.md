---
type: tool
slug: n8n
title: n8n
tagline: Source-available workflow automation with native AI Agent nodes, self-host or cloud.
category: ai-automation
company: n8n-gmbh
url: https://n8n.io
github_url: https://github.com/n8n-io/n8n
pricing_model: freemium
price_range: "$0 (Community self-host) - €667+/month (Business self-host)"
status: active
launched: 2019-06
last_updated: 2026-06-26
last_verified: 2026-06-26
update_frequency: monthly
affiliate:
  has_program: true
  commission: "30% for 12 months"
  cookie_days: null
  network: direct
  link: null
  application_status: rejected
  applied_date: 2026-04-15
  notes: "Public affiliate page confirms 30% on n8n Cloud referrals for 12 months, paid through PartnerStack after approval; AiPedia's application was declined 2026-04-15. Do not retry unless vendor policy changes."
scores:
  utility: 9
  value: 10
  moat: 7
  longevity: 9
facts:
  flagship_model:
    value: "Native AI Agent node with tool calling across supported LLM providers"
    source: "https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/"
    source_label: "n8n AI Agent node docs"
    source_id: n8n-agent-docs
    verified_at: 2026-06-26
    volatility: high
    confidence: high
    next_review_at: 2026-06-30
  context_window:
    value: "Model-dependent: n8n connects to external LLM providers and local models rather than publishing a single context window"
    source: "https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/"
    source_label: "n8n AI Agent node docs"
    source_id: n8n-agent-docs
    verified_at: 2026-06-26
    volatility: high
    confidence: high
    next_review_at: 2026-06-30
  pricing_anchor:
    value: "Community self-host free; hosted Starter €20/mo and Pro €50/mo; Business self-host €667/mo; Enterprise custom (annual billing; plans include unlimited users, workflows, and integrations, with execution-based usage)"
    source: "https://n8n.io/pricing"
    source_label: "n8n pricing"
    source_id: n8n-pricing
    verified_at: 2026-06-24
    volatility: high
    confidence: high
    next_review_at: 2026-06-30
  free_plan:
    value: "Yes: Community self-host runs free without a license key. Hosted Starter and Pro have no-credit-card trials, while the Business trial requires a credit card; there is no permanent free hosted tier."
    source: "https://docs.n8n.io/hosting/"
    source_label: "n8n self-hosting docs"
    source_id: n8n-hosting-docs
    verified_at: 2026-06-24
    volatility: high
    confidence: high
    next_review_at: 2026-06-30
  best_paid_tier:
    value: "Community self-host for technical teams that can operate it; Pro cloud for most hosted production; Business self-host for SSO, environments, Git version control, and self-host governance; Enterprise for hosted/self-hosted governance, 200+ concurrency, support SLA, log streaming, external secret store, and extended retention"
    source: "https://n8n.io/pricing"
    source_label: "n8n pricing"
    source_id: n8n-pricing
    verified_at: 2026-06-24
    volatility: high
    confidence: high
    next_review_at: 2026-06-30
  api_available:
    value: "Yes: HTTP nodes, code nodes, webhooks, credentials, and workflow APIs support programmatic automation"
    source: "https://docs.n8n.io"
    source_label: "n8n documentation"
    source_id: n8n-docs
    verified_at: 2026-06-24
    volatility: medium
    confidence: high
  image_generation:
    value: "Not native as a core model; n8n can orchestrate image-generation APIs through workflow nodes"
    source: "https://docs.n8n.io"
    source_label: "n8n documentation"
    source_id: n8n-docs
    verified_at: 2026-06-24
    volatility: medium
    confidence: high
  video_generation:
    value: "Not native as a core model; n8n can orchestrate video-generation APIs through workflow nodes"
    source: "https://docs.n8n.io"
    source_label: "n8n documentation"
    source_id: n8n-docs
    verified_at: 2026-06-24
    volatility: medium
    confidence: high
  real_time_voice:
    value: "No primary real-time voice product; voice workflows require connected services"
    source: "https://docs.n8n.io"
    source_label: "n8n documentation"
    source_id: n8n-docs
    verified_at: 2026-06-24
    volatility: low
    confidence: high
  web_browsing:
    value: "Workflow web access through HTTP/browser-style integrations, not a packaged general web-browsing assistant"
    source: "https://docs.n8n.io"
    source_label: "n8n documentation"
    source_id: n8n-docs
    verified_at: 2026-06-24
    volatility: medium
    confidence: high
  coding_agent:
    value: "No dedicated software-coding agent; n8n is an automation and AI-agent workflow platform"
    source: "https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/"
    source_label: "n8n AI Agent node docs"
    source_id: n8n-agent-docs
    verified_at: 2026-06-24
    volatility: medium
    confidence: high
  enterprise_controls:
    value: "Business self-host adds SSO/SAML/LDAP, environments, Git version control, scaling options, and 30-day insights; Enterprise adds hosted or self-hosted procurement, 200+ concurrency, 365-day insights, external secret store, log streaming, extended data retention, and dedicated support/SLA"
    source: "https://n8n.io/pricing"
    source_label: "n8n pricing"
    source_id: n8n-pricing
    verified_at: 2026-06-24
    volatility: high
    confidence: high
    next_review_at: 2026-06-30
  data_retention_or_privacy:
    value: "Hosted plans store data in the EU on Frankfurt, Germany servers; self-hosted data lives wherever the buyer runs n8n, but Business/Enterprise self-host license keys ping n8n daily and telemetry is on by default unless disabled"
    source: "https://n8n.io/pricing"
    source_label: "n8n pricing"
    source_id: n8n-pricing
    verified_at: 2026-06-24
    volatility: medium
    confidence: high
  open_source_or_local:
    value: "Yes: source-available fair-code under the Sustainable Use License and n8n Enterprise License; self-hosting is permitted"
    source: "https://github.com/n8n-io/n8n"
    source_label: "n8n GitHub repository"
    source_id: n8n-github
    verified_at: 2026-06-24
    volatility: medium
    confidence: high
  best_for:
    value: "Developer-friendly automation, self-hosted workflows, and AI agents with tool calling"
    source: "https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/"
    source_label: "n8n AI Agent node docs"
    source_id: n8n-agent-docs
    verified_at: 2026-06-24
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Steeper learning curve, fewer built-in integrations than Zapier, real ops burden when self-hosted, Business is a self-host license rather than the next hosted-cloud tier, and Business overages can invoice in EUR4,000 buckets of 300,000 executions"
    source: "https://docs.n8n.io/hosting/"
    source_label: "n8n self-hosting docs"
    source_id: n8n-hosting-docs
    verified_at: 2026-06-24
    volatility: medium
    confidence: high
tags: [automation, workflows, ai-agents, no-code, source-available, integrations, zapier-alternative, self-host]
seo_title: "n8n Review (June 2026): AI Agents, Pricing, Self-Host"
meta_description: "n8n is the source-available workflow automation platform with AI Agent nodes, free Community self-hosting, hosted Starter €20/mo, hosted Pro €50/mo, Business self-host €667/mo, and execution-based pricing."
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
  n8n is the source-available automation platform with native AI Agent nodes. Self-host Community for free when someone can operate it. Hosted Starter is €20/mo and hosted Pro is €50/mo; Business is a €667/mo self-host license and Enterprise is custom. Pick it for developer control, EU-hosted cloud data, self-hosting, and AI agents. Skip for non-technical teams or long-tail SaaS coverage.
price_history:
  - date: 2026-06-26
    plan: "Community · Starter · Pro · Business · Enterprise"
    price: "Community $0 self-host · Starter €20/mo hosted · Pro €50/mo hosted · Business €667/mo self-host · Enterprise custom"
    source: "https://n8n.io/pricing"
    source_label: "n8n pricing"
    source_id: n8n-pricing
    verified_at: 2026-06-26
    note: "June 26 recheck: public pricing remains Community self-host free, hosted Starter €20/month, hosted Pro €50/month, Business self-host €667/month, and Enterprise custom, with unlimited users and execution-based usage."
  - date: 2025-10-15
    plan: "Cloud Starter"
    price: "€24/mo"
    source: "https://n8n.io/pricing"
    source_label: "Source"
    source_id: n8n-pricing
    verified_at: 2025-10-15
    note: "Cloud pricing migrated to EUR"
  - date: 2026-04-15
    plan: "Community (self-host)"
    price: "$0"
    source: "https://n8n.io/pricing"
    source_label: "Source"
    source_id: n8n-pricing
    verified_at: 2026-04-15
    note: "Free self-host verified unchanged"
  - date: 2026-05-13
    plan: "Starter · Pro · Business"
    price: "Starter €20/mo · Pro €50/mo · Business €667/mo (annual)"
    source: "https://n8n.io/pricing"
    source_label: "Source"
    source_id: n8n-pricing
    verified_at: 2026-05-13
    note: "Pricing cut and restructured to annual billing; unlimited users added across paid tiers. Business is currently a self-host plan."
  - date: 2026-06-24
    plan: "Community · Starter · Pro · Business · Enterprise"
    price: "Community $0 self-host · Starter €20/mo hosted · Pro €50/mo hosted · Business €667/mo self-host · Enterprise custom"
    source: "https://n8n.io/pricing"
    source_label: "n8n pricing"
    source_id: n8n-pricing
    verified_at: 2026-06-24
    note: "Verified unchanged from the May restructure. Starter includes 50 AI Workflow Builder credits, Pro includes 150, Business lists AI Workflow Builder as coming soon, Enterprise lists 1000 credits on n8n Cloud, and GitHub showed n8n@2.27.3 as the latest release on June 19, 2026."
---

# n8n

n8n is the source-available workflow automation platform built by n8n GmbH. Visual canvas, 400+ built-in integrations, native AI Agent nodes that now work as Tools Agents, and JavaScript or Python code nodes when the visual layer runs out. Self-host Community for free if you can operate it, or run hosted cloud from €20/month on annual billing.

## Recent developments

- **June 26, 2026 verification:** Current sources still keep the buyer model unchanged: Community self-host is the free route, hosted Starter is EUR20/month, hosted Pro is EUR50/month, Business is EUR667/month for self-host governance, and Enterprise is custom. The pricing page still separates hosted Starter/Pro from self-host Business.
- **June 24, 2026 verification:** Current sources still kept the buyer model unchanged: Community self-host is the free route, hosted Starter is EUR20/month, hosted Pro is EUR50/month, Business is EUR667/month for self-host governance, and Enterprise is custom. GitHub marked n8n@2.27.3 as the latest release, dated June 19, 2026.
- **May 2026:** Pricing restructured. Starter dropped from €24 to €20/month, Pro from €60 to €50, and Business from €800 to €667 (all annual billing). Every paid tier now includes unlimited users; tiers separate primarily on workflow-execution caps, concurrent executions, and admin features.
- **June 21, 2026 verification:** n8n's pricing page still says all plans include unlimited users, unlimited workflows, and every integration, with pricing based on monthly workflow executions rather than per-step task counts. Starter and Pro are hosted by n8n; Business is currently self-hosted. The AI Agent docs still say all AI Agent nodes work as a Tools Agent in current versions.
- **June 21, 2026 buyer-risk check:** Business self-host uses a license key that pings n8n daily for usage tracking, telemetry is enabled by default unless disabled, and Business overages are listed at EUR4,000 for each extra 300,000-execution bucket. Treat Business as procurement for governed self-hosting, not as the next hosted-cloud plan.
- **June 21, 2026 affiliate check:** n8n's public affiliate page confirms 30% commission on n8n Cloud referrals for 12 months. AiPedia still has no tracked n8n affiliate link because its prior application was declined.

## System Verdict

> **Pick n8n if the automation layer needs to be owned, not rented.** Community self-hosting is free, while paid cloud and self-host licenses scale by workflow-execution volume and governance features. The AI Agent node ships autonomous multi-step agents with tool calling, memory, subworkflows, HTTP requests, and model-provider choice. JavaScript and Python code nodes close any gap the visual canvas leaves.
>
> **Skip it if onboarding speed outweighs control.** [Zapier](/tools/zapier/) ships 9,000+ integrations to n8n's 400+ built-in integrations. Non-technical operators land faster on Zapier or [Make](/tools/make/). Teams that refuse server ops work should avoid n8n self-hosting and stay on hosted platforms.
>
> **Who pays which tier:** Community self-host for engineers and agencies, Starter €20/mo for small hosted cloud use, Pro €50/mo for active hosted production, Business €667/mo for self-hosted SSO/environments/Git versioning, Enterprise custom for hosted or self-hosted governance plus log streaming, external secret stores, extended retention, 200+ concurrency, and dedicated support. All paid tiers ship unlimited users; pricing scales on workflow-execution volume.

## Key Facts

| | |
|---|---|
| **License** | Fair-code (source-available, self-host permitted) |
| **Core product** | Visual workflow canvas with code fallback |
| **Integration count** | 400+ built-in integrations, with broader app/service pages often framed as 1000+ services |
| **AI Agent node** | Native Tools Agent behavior in current versions · connects to OpenAI, Anthropic, Google Gemini, Mistral, Cohere, AWS Bedrock, Azure OpenAI, Ollama, and other supported model providers |
| **Code nodes** | JavaScript · Python |
| **Plan pricing (annual)** | Hosted Starter €20 · hosted Pro €50 · self-host Business €667 · Enterprise custom |
| **Paid-tier users** | Unlimited on every paid tier (May 2026 update) |
| **Self-host** | Free Community Edition; paid Business/Enterprise license keys unlock higher-governance editions · GitHub repo at 193k+ stars |
| **Deployment** | Docker · Kubernetes · VPS · Railway · any Node.js host |
| **Data residency** | Hosted plans store data in Frankfurt, Germany; self-host is wherever the buyer runs it, with license-key pings and default telemetry to review on paid self-host |

Every data point above was verified against vendor documentation on 2026-06-24. See Sources.

## What it actually is

A workflow automation engine built on Node.js with a drag-and-drop canvas and a code escape hatch. Workflows run locally, in Docker, on a VPS, in Kubernetes, or on n8n's managed cloud. The same workflow file moves between them.

The AI Agent node is the part worth noticing. Point it at any LLM, give it tools (HTTP requests, database queries, subworkflows), and it reasons through multi-step tasks without external orchestration frameworks. Current docs say all AI Agent nodes now work as Tools Agents; older workflows that already used Tools Agent should keep their behavior.

The moat is the license and the agent stack. Source-available fair-code with self-host permitted means buyers can inspect the code and run their own instance. Native AI Agent nodes beat bolt-on LLM modules in [Make](/tools/make/) and [Zapier](/tools/zapier/) for technical agentic workloads. The trade-off is fewer built-in integrations than Zapier and a steeper learning curve than either.

## When to pick n8n

- **Data residency or compliance rules require on-prem.** Self-host on controlled infrastructure. n8n explicitly warns that self-hosting requires server, scaling, security, and configuration knowledge.
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

Subscription pricing via [n8n.io/pricing](https://n8n.io/pricing). Public paid prices below are quoted at annual billing.

| Plan | Monthly | Executions | Concurrent | Users | Shared projects | Who's it for |
|------|---------|------------|-----------|-------|-----------------|--------------|
| Community (self-host) | $0 | Self-managed | Self-tuned | Self-managed | Self-managed | **Developers and agencies land here** |
| Starter (cloud) | €20 | 2,500 | 5 | Unlimited | 1 | Small teams, light cloud use |
| Pro (cloud) | €50 | 10,000 | 20 | Unlimited | 3 | Active production |
| Business (self-host) | €667 | 40,000 | Higher | Unlimited | 6 | SSO / SAML / LDAP, environments, Git version control, self-host scale |
| Enterprise | Custom | Custom | 200+ | Unlimited | Unlimited | Hosted or self-hosted governance, external secret store, log streaming, extended retention, dedicated support, SLA |

*Prices verified 2026-06-26 via [n8n pricing](https://n8n.io/pricing). Plans include unlimited users, workflows, and integrations. Pricing is based on monthly workflow executions, not per-step cost. Qualifying startups get 50% off the Business plan. Community self-host is free, but n8n's own hosting docs recommend it only for expert users because mistakes can cause data loss, security issues, and downtime. Business overages are listed at EUR4,000 per extra 300,000 executions when the buyer exceeds quota and does not upgrade.*

## Against the alternatives

| | n8n | [Zapier](/tools/zapier/) | [Make](/tools/make/) | [Langflow](/tools/langflow/) |
|---|---|---|---|---|
| **License** | Source-available, self-host OK | Proprietary SaaS | Proprietary SaaS | Open source (MIT) |
| **Integration count** | 400+ built-in integrations | 9,000+ | 3,000+ | LLM-focused |
| **AI agents** | Native AI Agent nodes | Zapier Agents + AI orchestration | Make AI Agents and AI Toolkit | LangGraph-based |
| **Self-host** | Free Community path; paid licenses for governance | None | None | Free, unlimited |
| **Code escape hatch** | JS + Python nodes | Code step (JS/Python) | Custom functions | Custom Python nodes |
| **Best viewed as** | Dev-friendly source-available workflow platform | Incumbent generalist | Cost-efficient cloud | LLM-chain specialist |

## Failure modes

- **Learning curve is steeper than [Zapier](/tools/zapier/).** The JSON data model, expression syntax, and credential system assume technical comfort. Non-technical operators stall.
- **400+ built-in integrations lags [Zapier](/tools/zapier/).** Niche SaaS often requires hand-built HTTP nodes and OAuth. Doable but costs engineering time.
- **Self-host ops is real work.** Upgrades, backups, credential encryption, queue mode, and scaling to worker processes fall on whoever runs the server.
- **AI Agent node tuning matters.** Complex multi-step reasoning can loop or stall without careful prompt and tool design. Not fire-and-forget.
- **Cloud executions burn fast.** Heavy cron schedules or high-frequency triggers chew through monthly execution limits. Self-hosting moves the bottleneck to the buyer's infrastructure, license tier, and operating discipline.
- **UI clutters past 20 nodes.** Large workflows become visually hard to navigate. Sub-workflows and careful grouping help.
- **Business is not the next hosted-cloud tier.** The current pricing page marks Business as self-hosted, while Starter and Pro are hosted by n8n. Buyers who need hosted governance should talk to Enterprise sales.
- **Paid self-host is not fully isolated from vendor metering.** Business and Enterprise license keys ping n8n daily to keep paid features active and report production-execution usage; telemetry is also enabled by default unless disabled.
- **Overages are chunky.** Business workflows continue after the quota, but n8n lists EUR4,000 overage buckets for each extra 300,000 executions if there is no upgrade path.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity, unweighted average). Last refreshed 2026-06-26 against [n8n pricing](https://n8n.io/pricing), [n8n hosting docs](https://docs.n8n.io/hosting/), [n8n AI Agent node docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/), the [n8n GitHub repository](https://github.com/n8n-io/n8n), and the [n8n affiliate program page](https://n8n.io/affiliates/).

## FAQ

**Is n8n free?**
Yes, self-hosted. The Community Edition runs free without a cloud subscription; hosting cost is the VPS/container bill and the operator's maintenance time. n8n's own docs recommend self-hosting for expert users because server, scaling, and security mistakes can cause data loss or downtime. Hosted cloud starts at €20/month on annual billing ([n8n pricing](https://n8n.io/pricing), [hosting docs](https://docs.n8n.io/hosting/)).

**What does the AI Agent node do?**
It runs autonomous multi-step reasoning with tool calling. Current n8n docs say all AI Agent nodes work as a Tools Agent, while older workflows that already used Tools Agent should continue to behave as intended. The workflow can connect to OpenAI, Anthropic, Google Gemini, Mistral, Cohere, AWS Bedrock, Azure OpenAI, Ollama, and more through model/provider nodes. Define tools, and the agent plans and executes tasks inside a workflow ([n8n Agent docs](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/)).

**n8n vs Zapier?**
n8n wins on self-host, native AI agents, and cost at volume. [Zapier](/tools/zapier/) wins on integration breadth (9,000+ vs 400+ built-in integrations) and onboarding speed for non-technical users.

**Is n8n really open source?**
Fair-code licensed: source-available under the Sustainable Use License plus n8n Enterprise License. The code is visible, self-hosting is permitted, and buyers can add nodes, but this is not the same as a plain permissive open-source license.

**How do cloud executions count AI workflows?**
n8n prices by workflow execution. The current pricing FAQ defines an execution as one run of the entire workflow regardless of the number of steps or data processed, so AI workflows should be modeled by trigger frequency and conversation volume rather than per-node task counts. Separate model-provider API charges may still apply when the workflow calls paid LLMs.

## Sources

- [n8n pricing](https://n8n.io/pricing): current plan rates, execution limits, AI Workflow Builder credits, EU hosted-data note, overage buckets, license-key metering, and affiliate-program pointer (refreshed 2026-06-26)
- [n8n hosting docs](https://docs.n8n.io/hosting/): Community self-host path and self-hosting risk guidance (refreshed 2026-06-26)
- [n8n AI Agent node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/): native agent capabilities and Tools Agent behavior (refreshed 2026-06-26)
- [n8n GitHub](https://github.com/n8n-io/n8n): source, license, integrations, current release, and self-hostability (refreshed 2026-06-26)
- [n8n affiliate program](https://n8n.io/affiliates/): public commission framing; AiPedia has no approved link (refreshed 2026-06-26)

## Related

- **Category:** [AI Automation](/categories/ai-automation/)
- **Comparisons:** [Activepieces vs n8n](/compare/activepieces-vs-n8n/)
