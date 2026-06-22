---
type: tool
slug: microsoft-agent-framework
title: Microsoft Agent Framework
tagline: Microsoft's open-source agentic AI engine, merging Semantic Kernel and AutoGen, now sitting beside the Work IQ, Foundry, Copilot Credits, and Agent 365 stack.
category: ai-automation
company: microsoft
url: https://learn.microsoft.com/en-us/agent-framework/overview/
github_url: https://github.com/microsoft/agent-framework
pricing_model: open-source
price_range: "Free (open source)"
status: active
launched: 2026-04
last_updated: 2026-06-22
last_verified: 2026-06-22
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
    value: "Microsoft's open-source agentic AI engine, merging Semantic Kernel and AutoGen. Free, production-oriented, and tightly integrated with Microsoft Foundry; June 2026 Build updates make Work IQ, Foundry IQ, Microsoft 365 tenant context, Agent 365, and Copilot Credits the adjacent enterprise-agent layer. Best for .NET and Python agentic workflows, multi-agent orchestration, and Microsoft-aligned business-process automation."
    source: "https://blogs.microsoft.com/blog/2026/06/02/microsoft-build-2026-be-yourself-at-work/"
    source_label: "Microsoft Build 2026 agent stack"
    source_id: microsoft-build-2026-work-iq
    verified_at: 2026-06-22
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Free open source under the MIT license on GitHub; cost lives in LLM inference, Microsoft Foundry/Azure infrastructure, Work IQ API consumption through Copilot Credits, and any third-party models or tools used by the deployed agent"
    source: "https://github.com/microsoft/agent-framework"
    source_label: "Microsoft Agent Framework GitHub"
    source_id: maf-github
    verified_at: 2026-06-22
    next_review_at: 2026-08-13
    volatility: low
    confidence: high
  watch_out_for:
    value: "Active 1.x framework cadence plus fast-moving Work IQ/Foundry/Copilot Credit surfaces. As of June 22, GitHub releases show python-1.9.0 from June 18 and dotnet-1.10.0 from June 10; Work IQ APIs are generally available and billed through Copilot Credits. Verify GA access, admin billing controls, provider support, non-Azure data boundaries, and exact .NET/Python package versions before architecture decisions."
    source: "https://learn.microsoft.com/en-us/partner-center/announcements/2026-june"
    source_label: "Microsoft Partner Center Work IQ update"
    source_id: microsoft-work-iq-partner-center
    verified_at: 2026-06-22
    next_review_at: 2026-06-29
    volatility: medium
    confidence: high
tags: [agent-framework, microsoft, open-source, autogen-successor, semantic-kernel, azure, microsoft-foundry, enterprise, dotnet, python]
seo_title: "Microsoft Agent Framework: Features & Review (June 2026)"
meta_description: "Microsoft Agent Framework is the open-source successor to Semantic Kernel and AutoGen. Updated June 22, 2026 for python-1.9.0, dotnet-1.10.0, Work IQ GA, Copilot Credits, tool approval, and provider-risk guidance."
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
  Microsoft Agent Framework 1.0 shipped April 2026 as the successor to both Semantic Kernel and AutoGen. Its current release stream is python-1.9.0 (June 18) and dotnet-1.10.0 (June 10). It is open source, free, and aligned with Microsoft Foundry, Azure OpenAI, OpenAI, Anthropic, Ollama, GitHub Copilot, and Copilot Studio. As of June 22, Work IQ APIs are generally available with Copilot Credits billing. Pick it for Microsoft-aligned enterprise agent deployments, but pin versions and verify Work IQ access, admin controls, and cost before production architecture.
---

# Microsoft Agent Framework

Microsoft's consolidated answer to the agent-framework fragmentation of 2024-2025. It merges the orchestration strengths of Semantic Kernel with the multi-agent patterns of AutoGen into one framework. By the June 22 check, the release stream showed python-1.9.0 and dotnet-1.10.0. The June 2026 Build and Work IQ GA updates also make the surrounding Microsoft stack clearer: Agent Framework for code, Microsoft Foundry for model/app development, Work IQ APIs for Microsoft 365 work context, and Agent 365/Defender/Purview-style controls for governed agents.

The current docs lean on **Microsoft Foundry** (renamed from Azure AI Foundry) as the reference platform, but the framework speaks directly to Microsoft Foundry, Anthropic, Azure OpenAI, OpenAI, Ollama, and a growing list of providers.

## Recent developments

- **June 22, 2026 check:** GitHub releases now show python-1.9.0 from June 18, with AgentLoopMiddleware, harness tool approval, shell-tool integration, telemetry improvements, and breaking MCP sampling guardrails. dotnet-1.10.0 remains the latest .NET tag in the checked release feed.
- **June 16, 2026 check:** Work IQ APIs are generally available. Microsoft's licensing notice says billing uses Copilot Credits with no separate Work IQ API subscription, SKU, or per-user license, while Partner Center tells administrators to configure consumptive billing, access policies, limits, and alerts before custom or third-party Work IQ agents use Microsoft 365 data.
- **June 10, 2026:** dotnet-1.10.0 remains the checked .NET release line. Recent releases include multiple breaking or experimental changes, so pin tested package versions before production rollout.
- **June 2, 2026:** [Microsoft Build 2026 put Work IQ APIs, Foundry IQ, Fabric IQ, Copilot Credits, Agent 365, and new Microsoft AI models around the enterprise-agent stack](/news/2026-06-02-microsoft-build-work-iq-agent-stack/). Agent Framework remains the open-source code layer, but Microsoft-aligned buyers should evaluate it with Work IQ, Foundry, and governance controls rather than in isolation.
- **May 8, 2026:** `dotnet-1.5.0` was the May baseline release. It has now been superseded by the June release stream.
- **May 1, 2026:** [Microsoft put a legal AI agent directly inside Word through its Frontier program](/news/2026-05-03-microsoft-word-legal-agent-frontier/). That is not the open-source Agent Framework itself, but it shows the same Microsoft pattern: domain-specific agents wrapped in structured workflows, approvals, and familiar enterprise surfaces.

## System Verdict

> **Pick Microsoft Agent Framework if you're already on Microsoft Foundry or migrating from Semantic Kernel or AutoGen.** The framework is open source, production-oriented, and deeply integrated with Microsoft Foundry, Azure OpenAI, GitHub Copilot, and Copilot Studio. If your organization is a Microsoft shop, this is the default agent framework to evaluate first.
>
> **Skip it if your stack is not Microsoft-aligned.** TypeScript teams should use [Mastra](/tools/mastra/). Python-first teams not on Azure should look at [LangGraph](https://langchain-ai.github.io/langgraph/) or [CrewAI](/tools/crewai/). The framework is technically independent of Azure but meaningfully better inside that ecosystem.
>
> **AutoGen is now maintenance-only.** If you're on AutoGen, Microsoft recommends migration to Agent Framework. [AG2](/tools/ag2/) (the community-forked AutoGen continuation) is the other path.

## Key Facts

| | |
|---|---|
| **Current version** | python-1.9.0 (June 18, 2026) and dotnet-1.10.0 (June 10, 2026) on the public GitHub releases page |
| **License** | MIT open source |
| **Languages** | .NET (C#) + Python |
| **Framework cost** | Free |
| **Metered adjacent costs** | LLM inference, Azure/Microsoft Foundry infrastructure, Work IQ API consumption through Copilot Credits, and third-party tools/models |
| **Microsoft integration** | Microsoft Foundry, Azure OpenAI Service, GitHub Copilot SDK, Copilot Studio, Work IQ, Agent 365 |
| **Predecessors merged** | Semantic Kernel (orchestration) + AutoGen (multi-agent) |
| **AutoGen status** | Maintenance mode only. New projects should not start there. |
| **Native provider support** | Microsoft Foundry, Azure OpenAI, OpenAI, Anthropic, Ollama, Foundry Local, GitHub Copilot, Copilot Studio, and custom providers |
| **Core primitives** | Agents (LLMs + tools + MCP servers) and Workflows (graph-based, type-safe routing, checkpointing, human-in-the-loop) |

## When to pick Microsoft Agent Framework

- **Azure or Microsoft Foundry enterprises.** Deep integration with Microsoft Foundry, Azure OpenAI, Copilot Studio, Entra ID, Azure Monitor. Migration path from existing Copilot Studio agents is the cleanest.
- **Existing Semantic Kernel or AutoGen users.** Migration guides shipped with 1.0 and remain the official Microsoft path. Expect refactoring rather than a drop-in swap.
- **.NET / C# shops.** The best .NET-native agent framework available in 2026. The June 10 dotnet-1.10.0 release reinforces that .NET is a first-class target, not an afterthought.
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
- **Work IQ API consumption** when agents ground in Microsoft 365 context through Work IQ APIs. Microsoft's licensing notice says Work IQ is generally available as of June 16, 2026 and is billed through Copilot Credits, not a separate Work IQ API SKU.
- **Optional Microsoft enterprise support** via existing Microsoft contracts

No framework licensing fees.

Verified 2026-06-22 via [Microsoft Agent Framework overview](https://learn.microsoft.com/en-us/agent-framework/overview/), the [agent-framework GitHub releases](https://github.com/microsoft/agent-framework/releases), [Microsoft Build 2026](https://blogs.microsoft.com/blog/2026/06/02/microsoft-build-2026-be-yourself-at-work/), the [Work IQ API announcement](https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/02/announcing-the-new-work-iq-apis/), the [Work IQ licensing notice](https://www.microsoft.com/en-us/licensing/news/work-iq-general-availability), and the [Partner Center Work IQ update](https://learn.microsoft.com/en-us/partner-center/announcements/2026-june).

## Failure modes

- **Azure gravity.** The framework works outside Azure, but the reference architecture, documentation, and observability story all assume Microsoft Foundry. Non-Azure users do more setup.
- **Complexity vs simple use cases.** A single-agent script that just calls an LLM with a few tools doesn't need this framework. Use a provider SDK directly.
- **Migration work from AutoGen.** Not drop-in. Some multi-agent patterns need rewriting to match the new primitives.
- **Active 1.x cadence.** python-1.9.0 shipped June 18 and dotnet-1.10.0 shipped June 10, with recent release notes including breaking guardrail, file-access, hosting, and approval-flow changes. Pin the version you tested against; do not assume patches between minors are non-breaking.
- **Work IQ is a separate consumption surface.** As of June 16, Work IQ APIs are generally available, and Microsoft says API consumption draws down Copilot Credits. Do not budget Work IQ agents as "free framework" usage.
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

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-06-22 against the [Microsoft Agent Framework overview](https://learn.microsoft.com/en-us/agent-framework/overview/), the [providers overview](https://learn.microsoft.com/en-us/agent-framework/agents/providers/), the [agent-framework GitHub releases page](https://github.com/microsoft/agent-framework/releases), [Microsoft Build 2026](https://blogs.microsoft.com/blog/2026/06/02/microsoft-build-2026-be-yourself-at-work/), the [Work IQ API announcement](https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/02/announcing-the-new-work-iq-apis/), the [Work IQ licensing notice](https://www.microsoft.com/en-us/licensing/news/work-iq-general-availability), and the [Partner Center Work IQ update](https://learn.microsoft.com/en-us/partner-center/announcements/2026-june).

## FAQ

**What happened to AutoGen?**
AutoGen is now in maintenance mode and will not receive new features. Microsoft recommends new projects start on Agent Framework. The community-forked [AG2](/tools/ag2/) continues the AutoGen lineage as an independent open-source project for teams that want to stay on that trajectory.

**Does Agent Framework require Azure?**
No. It's open source and has native client support for Microsoft Foundry, Azure OpenAI, OpenAI, Anthropic, Ollama, Foundry Local, GitHub Copilot, Copilot Studio, and custom providers. Microsoft Foundry is the reference deployment target, not a strict requirement.

**Is there a visual agent builder?**
Not in the framework itself. Microsoft Foundry provides a visual experience for agent composition that sits on top. For pure visual building without Azure, see [LangFlow](/tools/langflow/).

**How does it compare to Semantic Kernel?**
Agent Framework is Semantic Kernel's successor. Existing Semantic Kernel code has a documented migration path. Most orchestration patterns transfer with refactoring.

## Sources

- [Microsoft Agent Framework overview](https://learn.microsoft.com/en-us/agent-framework/overview/): agents, workflows, migration posture, and third-party-system responsibility warning
- [Microsoft Agent Framework providers](https://learn.microsoft.com/en-us/agent-framework/agents/providers/): provider matrix and non-Azure data/cost caveat
- [Microsoft Agent Framework GitHub releases](https://github.com/microsoft/agent-framework/releases): python-1.9.0, dotnet-1.10.0, release cadence, and breaking-change notes
- [Microsoft Build 2026](https://blogs.microsoft.com/blog/2026/06/02/microsoft-build-2026-be-yourself-at-work/): Work IQ, Foundry, Agent 365, local/cloud agent runtime, and governance stack
- [Work IQ API announcement](https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/02/announcing-the-new-work-iq-apis/): Work IQ context, MCP tool surface, Microsoft 365 tenant boundary, and agent controls
- [Work IQ licensing notice](https://www.microsoft.com/en-us/licensing/news/work-iq-general-availability): June 16, 2026 GA date and Copilot Credits consumption billing
- [Partner Center Work IQ API and consumptive pricing update](https://learn.microsoft.com/en-us/partner-center/announcements/2026-june): post-GA admin setup, billing, access policies, limits, and alerts

## Related

- **Category:** [AI Automation](/categories/ai-automation/) · [AI Coding](/categories/ai-coding/)
- **Compare:** MS Agent Framework vs [Mastra](/tools/mastra/) · vs [CrewAI](/tools/crewai/)
- **See also:** [AG2](/tools/ag2/) · [LangFlow](/tools/langflow/)
