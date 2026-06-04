---
type: tool
slug: microsoft-agent-framework
title: Microsoft Agent Framework
tagline: Microsoft's open-source agentic AI engine, merging Semantic Kernel and AutoGen, now sitting beside the June 2026 Work IQ and Microsoft Foundry agent stack.
category: ai-automation
company: microsoft
url: https://learn.microsoft.com/en-us/agent-framework/overview/
github_url: https://github.com/microsoft/agent-framework
pricing_model: open-source
price_range: "Free (open source)"
status: active
launched: 2026-04
last_updated: 2026-06-03
last_verified: 2026-06-03
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 9
  value: 10
  moat: 8
  longevity: 9
facts:
  best_for:
    value: "Microsoft's open-source agentic AI engine, merging Semantic Kernel and AutoGen. Free, production-ready, and tightly integrated with Microsoft Foundry; June 2026 Build updates make Work IQ, Foundry IQ, and Microsoft 365 tenant-bound context the adjacent enterprise-agent layer. Best for .NET and Python agentic workflows, multi-agent orchestration, and Microsoft-aligned business-process automation."
    source: "https://blogs.microsoft.com/blog/2026/06/02/microsoft-build-2026-be-yourself-at-work/"
    source_label: "Microsoft Build 2026 agent stack"
    source_id: microsoft-build-2026-work-iq
    verified_at: 2026-06-03
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Free open source under MIT-aligned licensing on GitHub; cost lives in LLM inference (Microsoft Foundry, Anthropic, OpenAI, Azure OpenAI, Ollama) and Azure infrastructure if deployed there"
    source: "https://github.com/microsoft/agent-framework"
    source_label: "Microsoft Agent Framework GitHub"
    source_id: maf-github
    verified_at: 2026-06-03
    next_review_at: 2026-08-13
    volatility: low
    confidence: high
  watch_out_for:
    value: "Active 1.x framework cadence plus fast-moving Microsoft Build/Work IQ/Foundry surfaces. Verify current docs, Work IQ availability, Copilot Credit costs, and provider support before architecting around any single client."
    source: "https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/02/announcing-the-new-work-iq-apis/"
    source_label: "Microsoft Work IQ APIs"
    source_id: microsoft-work-iq-apis
    verified_at: 2026-06-03
    next_review_at: 2026-06-13
    volatility: medium
    confidence: high
tags: [agent-framework, microsoft, open-source, autogen-successor, semantic-kernel, azure, microsoft-foundry, enterprise, dotnet, python]
seo_title: "Microsoft Agent Framework: Features & Review (June 2026)"
meta_description: "Microsoft Agent Framework is the open-source successor to Semantic Kernel and AutoGen. Updated June 2026 for Microsoft Build, Work IQ APIs, Foundry IQ, Copilot Credits, and enterprise agent-stack guidance."
author: "aipedia.wiki Editorial"
best_for:
  - Azure and Microsoft Foundry enterprises building AI agents
  - teams currently on Semantic Kernel or AutoGen
  - .NET and Python shops wanting one unified framework
  - production deployments needing Microsoft-backed SLAs
  - graph-based multi-agent workflows with checkpointing and human-in-the-loop
not_best_for:
  - TypeScript-first teams (pick Mastra)
  - solo devs without Azure infrastructure
  - simple agent use cases (framework is heavy)
quick_answer: >-
  Microsoft Agent Framework 1.0 shipped April 2026 as the production-ready successor to both Semantic Kernel and AutoGen. Its current release stream is dotnet-1.8.0 (June 2) and python-1.7.0 (May 28). It is open source, free, and aligned with Microsoft Foundry, Anthropic, Azure OpenAI, OpenAI, and Ollama. After Microsoft Build 2026, evaluate it beside Work IQ APIs, Foundry IQ, Microsoft 365 tenant context, and Copilot Credits. Pick it for Microsoft-aligned enterprise agent deployments. Skip it for TypeScript-first or lightweight use cases.
---

# Microsoft Agent Framework

Microsoft's consolidated answer to the agent-framework fragmentation of 2024-2025. Merges the orchestration strengths of Semantic Kernel with the multi-agent patterns of AutoGen into one framework. Version 1.0 shipped April 2026; by the June 3 check, the release stream had moved to dotnet-1.8.0 and python-1.7.0. The June 2026 Build update also makes the surrounding Microsoft stack clearer: Agent Framework for code, Microsoft Foundry for model/app development, and Work IQ APIs for Microsoft 365 work context.

The current docs lean on **Microsoft Foundry** (renamed from Azure AI Foundry) as the reference platform, but the framework speaks directly to Microsoft Foundry, Anthropic, Azure OpenAI, OpenAI, Ollama, and a growing list of providers.

## Recent developments

- **June 2, 2026:** [Microsoft Build 2026 put Work IQ APIs, Foundry IQ, Fabric IQ, Copilot Credits, and new Microsoft AI models around the enterprise-agent stack](/news/2026-06-02-microsoft-build-work-iq-agent-stack/). Agent Framework remains the open-source code layer, but Microsoft-aligned buyers should evaluate it with Work IQ and Foundry rather than in isolation.
- **June 2, 2026:** [`microsoft/agent-framework`](https://github.com/microsoft/agent-framework/releases) shipped **dotnet-1.8.0** after python-1.7.0 landed on May 28. The framework is still moving quickly; pin tested versions before production rollout.
- **May 8, 2026:** `dotnet-1.5.0` was the May baseline release. It has now been superseded by the June release stream.
- **May 1, 2026:** [Microsoft put a legal AI agent directly inside Word through its Frontier program](/news/2026-05-03-microsoft-word-legal-agent-frontier/). That is not the open-source Agent Framework itself, but it shows the same Microsoft pattern: domain-specific agents wrapped in structured workflows, approvals, and familiar enterprise surfaces.

## System Verdict

> **Pick Microsoft Agent Framework if you're already on Microsoft Foundry or migrating from Semantic Kernel or AutoGen.** The .NET 1.5.0 release is production-ready, open source, and deeply integrated with Microsoft Foundry, Azure OpenAI, and Copilot Studio. If your organization is a Microsoft shop, this is the default agent framework going forward.
>
> **Skip it if your stack is not Microsoft-aligned.** TypeScript teams should use [Mastra](/tools/mastra/). Python-first teams not on Azure should look at [LangGraph](https://langchain-ai.github.io/langgraph/) or [CrewAI](/tools/crewai/). The framework is technically independent of Azure but meaningfully better inside that ecosystem.
>
> **AutoGen is now maintenance-only.** If you're on AutoGen, Microsoft recommends migration to Agent Framework. [AG2](/tools/ag2/) (the community-forked AutoGen continuation) is the other path.

## Key Facts

| | |
|---|---|
| **Current version** | dotnet-1.8.0 (June 2, 2026) and python-1.7.0 (May 28, 2026) on the public GitHub releases page |
| **License** | Open source |
| **Languages** | .NET (C#) + Python |
| **Cost** | Free |
| **Microsoft integration** | Microsoft Foundry, Azure OpenAI Service, Copilot Studio |
| **Predecessors merged** | Semantic Kernel (orchestration) + AutoGen (multi-agent) |
| **AutoGen status** | Maintenance mode only. New projects should not start there. |
| **Native provider support** | Microsoft Foundry, Anthropic, Azure OpenAI, OpenAI, Ollama, [and more](https://learn.microsoft.com/en-us/agent-framework/agents/providers/) |
| **Core primitives** | Agents (LLMs + tools + MCP servers) and Workflows (graph-based, type-safe routing, checkpointing, human-in-the-loop) |

## When to pick Microsoft Agent Framework

- **Azure or Microsoft Foundry enterprises.** Deep integration with Microsoft Foundry, Azure OpenAI, Copilot Studio, Entra ID, Azure Monitor. Migration path from existing Copilot Studio agents is the cleanest.
- **Existing Semantic Kernel or AutoGen users.** Migration guides shipped with 1.0 and remain current through the 1.5 line. Most existing code ports with modest refactoring.
- **.NET / C# shops.** The best .NET-native agent framework available in 2026. First-party AOT support, strong tooling, and the June 2 dotnet-1.8.0 release reinforce that .NET is a first-class target, not an afterthought.
- **Graph-based multi-agent orchestration.** Workflows give explicit control over execution order, type-safe routing, checkpointing, and human-in-the-loop pauses. Compare to LangGraph for the Python equivalent.
- **Production SLAs matter.** Microsoft-backed framework with commercial support options through Azure. Compare to community-maintained alternatives.

## When to pick something else

- **TypeScript-first:** [Mastra](/tools/mastra/) is purpose-built for TypeScript ergonomics.
- **Not on Azure, Python-first:** [LangGraph](https://langchain-ai.github.io/langgraph/) has the largest Python community and is cloud-agnostic.
- **Multi-agent "crew" patterns:** [CrewAI](/tools/crewai/) emphasizes role-based agent teams with a simpler mental model.
- **Lightweight agent needs:** If you just need a single agent with tools, direct provider SDKs (OpenAI Agents, Claude Agent SDK) are simpler than a full framework.

## Pricing

Microsoft Agent Framework is free and open source. You pay for:

- **LLM inference** (Microsoft Foundry, Azure OpenAI, OpenAI API, Anthropic, Ollama local, or another provider)
- **Azure infrastructure** if deployed on Microsoft Foundry or other Azure services
- **Optional Microsoft enterprise support** via existing Microsoft contracts

No framework licensing fees.

Verified 2026-06-03 via [Microsoft Agent Framework overview](https://learn.microsoft.com/en-us/agent-framework/overview/), the [agent-framework GitHub releases](https://github.com/microsoft/agent-framework/releases), [Microsoft Build 2026](https://blogs.microsoft.com/blog/2026/06/02/microsoft-build-2026-be-yourself-at-work/), and the [Work IQ API announcement](https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/02/announcing-the-new-work-iq-apis/).

## Failure modes

- **Azure gravity.** The framework works outside Azure, but the reference architecture, documentation, and observability story all assume Microsoft Foundry. Non-Azure users do more setup.
- **Complexity vs simple use cases.** A single-agent script that just calls an LLM with a few tools doesn't need this framework. Use a provider SDK directly.
- **Migration work from AutoGen.** Not drop-in. Some multi-agent patterns need rewriting to match the new primitives.
- **Active 1.x cadence.** dotnet-1.8.0 shipped June 2, only weeks after dotnet-1.5.0. Pin the version you tested against; do not assume patches between minors are non-breaking.
- **Third-party model and tool risk.** Microsoft explicitly notes in the docs that any non-Azure-direct model or third-party tool is your responsibility for data flow, compliance, and cost. Review before wiring up Anthropic, OpenAI, or Ollama in regulated workloads.
- **Documentation is Microsoft-style.** Extensive but dense. Easier to onboard via Microsoft Foundry's guided experience than raw docs.

## Against the alternatives

| | MS Agent Framework | LangGraph | Mastra | CrewAI | AG2 |
|---|---|---|---|---|---|
| **Primary language** | .NET + Python | Python | TypeScript | Python | Python |
| **Cloud fit** | Azure | Any | Vercel / any | Any | Any |
| **License** | Open source | Open source | Open source | Open source | Open source |
| **Maturity (2026)** | 1.0 new, polished | Established | Early (1.0) | Established | AutoGen fork |
| **Best for** | MS enterprises | Python-first | TS shops | Role-based crews | AutoGen users not on Azure |

## Methodology

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-06-03 against the [Microsoft Agent Framework overview](https://learn.microsoft.com/en-us/agent-framework/overview/), the [agent-framework GitHub releases page](https://github.com/microsoft/agent-framework/releases), [Microsoft Build 2026](https://blogs.microsoft.com/blog/2026/06/02/microsoft-build-2026-be-yourself-at-work/), and the [Work IQ API announcement](https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/02/announcing-the-new-work-iq-apis/).

## FAQ

**What happened to AutoGen?**
AutoGen is now in maintenance mode and will not receive new features. Microsoft recommends new projects start on Agent Framework. The community-forked [AG2](/tools/ag2/) continues the AutoGen lineage as an independent open-source project for teams that want to stay on that trajectory.

**Does Agent Framework require Azure?**
No. It's open source and has native client support for Microsoft Foundry, Anthropic, Azure OpenAI, OpenAI, and Ollama. Microsoft Foundry is the reference deployment target, not a requirement.

**Is there a visual agent builder?**
Not in the framework itself. Microsoft Foundry provides a visual experience for agent composition that sits on top. For pure visual building without Azure, see [LangFlow](/tools/langflow/).

**How does it compare to Semantic Kernel?**
Agent Framework is Semantic Kernel's successor. Existing Semantic Kernel code has a documented migration path. Most orchestration patterns transfer with refactoring.

## Related

- **Category:** [AI Automation](/categories/ai-automation/) · [AI Coding](/categories/ai-coding/)
- **Compare:** MS Agent Framework vs [Mastra](/tools/mastra/) · vs [CrewAI](/tools/crewai/)
- **See also:** [AG2](/tools/ag2/) · [LangFlow](/tools/langflow/)
