---
type: news
slug: 2026-06-16-microsoft-work-iq-ga-copilot-credits
title: "Microsoft Work IQ GA checklist: Copilot Credits, tenant context, and admin controls"
date: 2026-06-16
severity: major
summary: "Microsoft Work IQ APIs are generally available as of June 16, 2026. The buyer issue is not whether Microsoft has another agent API; it is how teams govern Microsoft 365 context access, Copilot Credit spend, third-party agents, and auditable actions before rollout."
categories: [ai-automation, ai-infrastructure]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-16
last_verified: 2026-06-16
related_tools: [microsoft-agent-framework]
sources:
  - url: https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/02/announcing-the-new-work-iq-apis/
    title: "Microsoft: Announcing the new Work IQ APIs"
  - url: https://www.microsoft.com/en-us/licensing/news/work-iq-general-availability
    title: "Microsoft Licensing: Work IQ GA"
  - url: https://learn.microsoft.com/en-us/partner-center/announcements/2026-june
    title: "Microsoft Partner Center: Work IQ API and consumptive pricing update"
  - url: /news/2026-06-16-ai-news-desk/
    title: "AiPedia: AI News Desk, June 16, 2026"
  - url: /tools/microsoft-agent-framework/
    title: "AiPedia: Microsoft Agent Framework"
---

# Microsoft Work IQ GA checklist: Copilot Credits, tenant context, and admin controls

Microsoft Work IQ APIs are **generally available as of June 16, 2026**. For buyers, this is not just another Microsoft agent announcement. It is Microsoft 365 becoming a programmable context and action layer for agents, with Copilot Credits as the meter.

Read the daily context first: [AI News Desk, June 16, 2026: Work IQ GA turns Microsoft 365 agents into a metered context layer](/news/2026-06-16-ai-news-desk/).

## What Microsoft made available

Microsoft describes Work IQ APIs as four agent-facing domains:

- **Chat:** programmatic Microsoft 365 Copilot-style responses, including citations;
- **Context:** source data and agent-ready Microsoft 365 context;
- **Tools:** Microsoft 365 actions through a smaller set of agent-oriented verbs;
- **Workspaces:** tenant-bound state, files, memory, progress, and intermediate outputs for long-running agents.

The core buyer read is simple: if a workflow depends on Microsoft 365 data, Work IQ can make that context easier for agents to use. That is useful, but it turns permissions, billing, and auditability into architecture decisions.

## Pricing and billing watch-outs

Microsoft's licensing notice says Work IQ API usage is billed through Copilot Credits. It also says there is no separate Work IQ API subscription, SKU, or per-user license.

That does not mean usage is free. The same notice separates consumption into:

- variable query-style usage for Work IQ Chat API and Work IQ Context API;
- static tool/action usage for Work IQ Tool API;
- 0.1 Copilot Credits per Work IQ Tool API call;
- illustrative light, medium, and heavy scenario prices that vary by complexity.

The practical finance move is to model Work IQ separately from [Microsoft Agent Framework](/tools/microsoft-agent-framework/). Agent Framework can be free and open source while the deployed agent still pays for model inference, Microsoft Foundry/Azure infrastructure, Work IQ API calls, and third-party services.

## Admin controls to set before rollout

Microsoft Partner Center says customers need admin setup for Work IQ GA, especially when custom agents or third-party agents ground in Microsoft 365 data through the APIs.

Before a pilot expands, make sure an administrator has:

- enabled consumption-based billing for Work IQ API usage;
- configured the payment method;
- created access policies for groups, departments, and users;
- set usage limits and alerts;
- reviewed which services and agents can use Work IQ;
- documented the difference between prebuilt Microsoft 365 Copilot agents and custom or third-party agents using Work IQ APIs.

This is the boring part, which is exactly why it matters. The agent can look impressive in a demo while its budget and permission model stay undefined.

## Tenant-context checklist

Work IQ's moat is Microsoft 365 context. Microsoft says Work IQ can use signals from email, calendar, meetings, chats, files, people, collaboration patterns, and line-of-business systems, while keeping data, context, and insights inside the Microsoft 365 tenant trust boundary.

Procurement should ask:

- Which data classes can each agent retrieve?
- Is access inherited from the user, the app, a service account, or a special policy?
- Can the agent take Microsoft 365 actions without a human approving each one?
- Are risky write actions separated from read-only context retrieval?
- Are agent actions auditable and discoverable under existing legal and compliance workflows?
- Does any retrieved context leave Microsoft 365 for a non-Microsoft model, tool, server, or logging system?

## AiPedia verdict

Work IQ GA is a **major enterprise-agent milestone** because it connects agent reasoning to Microsoft 365 work context. The upside is obvious for Microsoft-heavy companies: less brittle retrieval, fewer one-off integrations, and a governed path from context to action.

The watch-out is equally obvious. Do not approve Work IQ-backed agents as "just Microsoft Agent Framework" or "just Copilot." Treat them as metered, permissioned systems that can read company context and take actions. The first rollout document should name the data scope, action scope, Copilot Credit budget, admin limits, alert owners, audit route, fallback plan, and third-party data boundary.
