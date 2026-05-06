---
type: news
slug: 2026-05-05-anthropic-financial-services-agent-templates
title: "Anthropic ships ten financial-services agent templates and expands data connectors"
date: 2026-05-05
severity: major
summary: "Anthropic released finance-focused agent templates for Claude Cowork, Claude Code, and Managed Agents, plus new market-data connectors and a Moody’s MCP app, alongside Microsoft 365 add-ins for Excel, PowerPoint, and Word."
categories: [ai-finance, ai-agents, ai-enterprise, ai-business]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-06
last_verified: 2026-05-06
affects: [claude-code]
related_tools: [claude-code]
sources:
  - url: https://www.anthropic.com/news/finance-agents
    title: "Agents for financial services"
---

# Anthropic ships ten financial-services agent templates and expands data connectors

Anthropic announced on May 5, 2026, a packaged set of ten financial-services agent templates aimed at research, client coverage, month-end close, KYC screening, and related workflows. The templates ship as plugins for Claude Cowork and Claude Code and as cookbooks for Claude Managed Agents, with assets published through Anthropic’s financial-services marketplace on GitHub.

The same post expands Microsoft 365 surface area: Excel, PowerPoint, and Word add-ins are generally available, with Outlook support described as coming soon. Anthropic emphasizes cross-app context so analysts can start work in one Office app and continue elsewhere without restating background.

Connector additions cover Dun and Bradstreet, Fiscal AI, Financial Modeling Prep, Guidepoint, IBISWorld, SS&C IntraLinks, Third Bridge, Verisk, and a Moody’s MCP app for ratings-aware workflows. Anthropic also cites a Vals AI Finance Agent benchmark score for Opus 4.7 as context for model choice.

## Why this matters

Financial institutions buy AI in layers: model quality, desktop integration, data entitlements, and auditability. Anthropic is bundling those layers into reference architectures so teams can move from slide decks to deployed agents faster than a bespoke build.

The Managed Agents path matters for overnight batch work and long-running deal processes where desktop plugins are the wrong abstraction. Cowork and Claude Code paths matter for analyst-in-the-loop review, which is still how most banks want high-stakes outputs handled.

## Buyer take

Templates are starting points, not compliance approvals. Legal, risk, and audit teams still need evidence on data handling, retention, human approvals, and model-change management.

Map each template to your own segregation-of-duties rules. Pitch generation, KYC screening, and close automation touch different control frameworks. A single “AI agent” label is not enough for sign-off.

## Developer take

If you use Claude Code in finance, review the new plugins and cookbooks as you would any third-party automation: pin versions, log tool usage, and test failure modes on malformed filings or stale market data.

For Managed Agents, validate connector scopes and ensure least-privilege credentials align with your vault and rotation policies.
