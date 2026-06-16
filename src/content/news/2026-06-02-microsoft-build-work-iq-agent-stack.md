---
type: news
slug: 2026-06-02-microsoft-build-work-iq-agent-stack
title: "Microsoft Build 2026 makes Work IQ, Foundry, and in-house models the agent stack to watch"
date: 2026-06-02
severity: major
summary: "Microsoft used Build 2026 to frame agents around Work IQ APIs, Fabric IQ, Foundry IQ, new Microsoft AI models, Copilot Credits, and a governed Microsoft 365 tenant boundary for enterprise agent development."
categories: [ai-automation, ai-infrastructure, ai-chatbots]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-16
last_verified: 2026-06-16
related_tools: [microsoft-agent-framework]
sources:
  - url: https://blogs.microsoft.com/blog/2026/06/02/microsoft-build-2026-be-yourself-at-work/
    title: "Microsoft: Microsoft Build 2026: Be yourself at work"
  - url: https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/02/announcing-the-new-work-iq-apis/
    title: "Microsoft: Announcing the new Work IQ APIs"
  - url: https://www.microsoft.com/en-us/licensing/news/work-iq-general-availability
    title: "Microsoft Licensing: Work IQ general availability"
---

# Microsoft Build 2026 makes Work IQ, Foundry, and in-house models the agent stack to watch

Microsoft's June 2 Build 2026 announcements put a sharper product shape around enterprise agents: the agent needs a work-intelligence layer, a model stack, a developer framework, governance, and a billing system.

June 16 refresh note: AiPedia rechecked Microsoft's Build 2026, Work IQ API, licensing, and Partner Center source pages after Work IQ reached GA. Read the current-day follow-up: [AI News Desk, June 16, 2026: Work IQ GA turns Microsoft 365 agents into a metered context layer](/news/2026-06-16-ai-news-desk/).

The most buyer-relevant part is **Work IQ**. Microsoft says the Work IQ APIs are generally available as of June 16, 2026, giving developers and IT administrators a way to build agents on the same intelligence layer that powers Microsoft 365 Copilot.

## What changed

Microsoft's Work IQ API architecture is split into four domains:

- **Chat:** programmatic Copilot-style responses, including citations and agent access;
- **Context:** agent-ready source data instead of a synthesized answer;
- **Tools:** actions across Microsoft 365 entities such as email, meetings, and documents;
- **Workspaces:** tenant-bound places for agent state, files, memory, progress, and intermediate outputs.

Microsoft also says Work IQ usage is priced through Copilot Credits, with an admin-center cost-management dashboard for spend limits and monitoring. The licensing notice says there is no separate Work IQ API subscription, SKU, or per-user license; Work IQ Tool API calls are listed at 0.1 Copilot Credits per call, while query-style Chat and Context usage varies by scenario complexity.

Build also brought a model-layer update. Microsoft described MAI-Thinking-1 as a 35-billion active-parameter reasoning model in private preview on Foundry, along with MAI-Image-2.5, MAI-Transcribe 1.5, MAI-Voice-2, and MAI-Code-1 availability in Copilot and VS Code.

## Why it matters

The important part is not one model benchmark. It is the stack.

Microsoft is making the work graph an agent platform. If a company's email, documents, meetings, files, and approvals already live in Microsoft 365, then Work IQ becomes a natural grounding layer. That is hard for a standalone agent startup to match unless it has deep integrations and permission mirroring.

For [Microsoft Agent Framework](/tools/microsoft-agent-framework/) buyers, the Build signal is that the open-source framework is not sitting alone. It belongs beside Microsoft Foundry, Copilot Studio, Work IQ, and Microsoft 365 governance.

## Buyer questions

Before adopting Work IQ-based agents, ask:

- Which Microsoft 365 data can each agent read?
- Which actions can the agent take without approval?
- How are Copilot Credits budgeted by tenant, group, and user?
- Are Work IQ outputs discoverable and auditable under existing compliance rules?
- Will the agent run inside Microsoft 365 only, or call external models and tools?
- How does the team test agent behavior before broad release?

## AiPedia verdict

This is a **major Microsoft enterprise-agent update**.

Work IQ gives Microsoft a credible answer to the hardest agent problem: context with permissions. Buyers should not treat it as a generic automation API. It is Microsoft 365 becoming programmable agent infrastructure, with Copilot Credits as the meter and Foundry as the model/developer layer.
