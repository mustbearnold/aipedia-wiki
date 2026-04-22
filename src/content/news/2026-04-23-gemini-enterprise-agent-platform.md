---
type: news
slug: 2026-04-23-gemini-enterprise-agent-platform
title: "Google launches Gemini Enterprise Agent Platform at Cloud Next: Studio, Registry, Identity, Gateway, Observability"
date: 2026-04-23
severity: major
summary: "At Cloud Next 2026 Day 2, Google launched the Gemini Enterprise Agent Platform, a unified stack for building, scaling, governing, and optimizing AI agents. Built on Vertex AI. Components: Agent Studio (authoring), Agent-to-Agent Orchestration, Agent Registry, Agent Identity, Agent Gateway, Agent Observability. Single biggest enterprise-agent launch Google has shipped to date; positions against Anthropic's Claude Code + Skills + MCP stack and AWS Bedrock Agents."
affects: [gemini]
categories: [ai-model-release, ai-business]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-22
last_verified: 2026-04-22
sources:
  - url: "https://cloud.google.com/blog/topics/google-cloud-next/welcome-to-google-cloud-next26"
    title: "Welcome to Google Cloud Next '26 - Google Cloud Blog"
  - url: "https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/next-2026/"
    title: "Google Cloud Next 2026: news and updates - Google Blog"
---

**Google** launched the **Gemini Enterprise Agent Platform** at Cloud Next 2026 on April 23, 2026. It is the most complete enterprise-agent stack Google has shipped, built on top of Vertex AI and deeply integrated with Google Cloud data and security.

## The six components

- **Agent Studio:** low-code and pro-code agent authoring with versioning.
- **Agent-to-Agent Orchestration:** agents can call other agents, passing scoped context and tool access.
- **Agent Registry:** catalogs deployed agents; permissioned discovery; enforced lifecycle policies.
- **Agent Identity:** cryptographic identity for each agent. Supports audit, access control, and cross-tenant scoping.
- **Agent Gateway:** single managed entry for external invocations, rate limiting, and policy enforcement.
- **Agent Observability:** tracing, step-level logging, and cost attribution per agent run.

## Why the stack matters

Frontier-model access is now a commodity for enterprises. The differentiator is **what you wrap around the model**: identity, registry, policy, audit, observability. Google is the first hyperscaler to ship all six as a single integrated product rather than six separate services.

Comparison:

| Stack | Identity | Registry | Orchestration | Observability |
|---|---|---|---|---|
| **Gemini Enterprise Agent Platform** | Yes (native) | Yes | A2A | Full tracing |
| **AWS Bedrock Agents** | IAM, partial | No formal registry | Limited | CloudWatch-based |
| **Azure AI Foundry Agents** | Entra ID | Yes (model catalog) | Limited | Azure Monitor |
| **Anthropic Claude Code + Skills + MCP** | Per-session | No registry | Tool-level | Session-level |

Google's advantage is platform cohesion. The trade-off: vendor lock, since the Platform is cloud-native to GCP.

## Integration with TPU 8i

Agent workloads are latency-sensitive. Gemini Enterprise Agent Platform is expected to progressively migrate to [TPU 8i](/news/2026-04-23-google-tpu-8t-8i-cloud-next-day2/) as capacity comes online. The stated design target of serving "millions of concurrent agents" on 8i-class silicon lines up with the agent-platform pitch.

## Pricing

Not fully disclosed at launch. Usage-based billing across:

- Gemini model inference (per token, standard Vertex AI rates).
- Agent Platform service fees (per 1M agent-run events).
- Storage (registry, observability data).

Expect competitive pressure on per-agent-run pricing as AWS and Azure respond.

## Ecosystem impact

- **Agent SIs and consultancies:** [$750M Google partner budget](/news/2026-04-23-google-750m-agent-partner-fund/) directly subsidizes SI resellers of Gemini Agents through 2027.
- **Wiz integration:** [Agentic Defense](/news/2026-04-23-google-wiz-agentic-defense/) ships the first security-agent implementation on the Platform.
- **Enterprise customers already on Vertex AI:** upgrade path is mostly config, not net-new deployment.

## Related

- [TPU 8t/8i unveiled on Cloud Next Day 2](/news/2026-04-23-google-tpu-8t-8i-cloud-next-day2/)
- [Google commits $750M partner fund for Gemini Agents](/news/2026-04-23-google-750m-agent-partner-fund/)
- [Google + Wiz ship Agentic Defense](/news/2026-04-23-google-wiz-agentic-defense/)
