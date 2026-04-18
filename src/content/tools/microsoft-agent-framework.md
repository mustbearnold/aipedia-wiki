---
type: tool
slug: microsoft-agent-framework
title: Microsoft Agent Framework
tagline: Microsoft's open-source agentic AI engine, merging Semantic Kernel and AutoGen. Version 1.0 shipped April 2026. Free, production-ready, and tightly integrated with Azure AI Foundry.
category: ai-automation
company: microsoft
url: https://learn.microsoft.com/en-us/agent-framework/overview/
pricing_model: open-source
price_range: "Free (open source)"
status: active
launched: 2026-04
last_updated: 2026-04-18
last_verified: 2026-04-18
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
tags: [agent-framework, microsoft, open-source, autogen-successor, semantic-kernel, azure, enterprise]
seo_title: "Microsoft Agent Framework: Features & Review (April 2026)"
meta_description: "Microsoft Agent Framework 1.0 (April 2026) is the successor to both Semantic Kernel and AutoGen. Free, open-source, production-ready. The default choice for Azure-backed enterprise agent deployments."
author: "aipedia.wiki Editorial"
best_for:
  - Azure-based enterprises building AI agents
  - teams currently on Semantic Kernel or AutoGen
  - .NET and Python shops wanting one unified framework
  - production deployments needing Microsoft-backed SLAs
not_best_for:
  - TypeScript-first teams (pick Mastra)
  - solo devs without Azure infrastructure
  - simple agent use cases (framework is heavy)
quick_answer: >-
  Microsoft Agent Framework 1.0 shipped April 2026 as the production-ready successor to both Semantic Kernel and AutoGen. Open source, free, and the default choice for enterprise agent deployments on Azure AI Foundry. Supports .NET and Python. AutoGen is now in maintenance mode; new projects should start here. Pick it for Azure-aligned enterprise. Skip it for TypeScript-first or lightweight use cases.
---

# Microsoft Agent Framework

Microsoft's consolidated answer to the agent-framework fragmentation of 2024-2025. Merges the orchestration strengths of Semantic Kernel with the multi-agent patterns of AutoGen into one framework. Version 1.0 shipped April 2026.

## System Verdict

> **Pick Microsoft Agent Framework if you're already on Azure or migrating from Semantic Kernel or AutoGen.** The 1.0 release is production-ready, open source, and deeply integrated with Azure AI Foundry. If your organization is a Microsoft shop, this is the default agent framework going forward.
>
> **Skip it if your stack is not Microsoft-aligned.** TypeScript teams should use [Mastra](/tools/mastra/). Python-first teams not on Azure should look at [LangGraph](https://langchain-ai.github.io/langgraph/) or [CrewAI](/tools/crewai/). The framework is technically independent of Azure but meaningfully better inside that ecosystem.
>
> **AutoGen is now maintenance-only.** If you're on AutoGen, Microsoft recommends migration to Agent Framework. [AG2](/tools/ag2/) (the community-forked AutoGen continuation) is the other path.

## Key Facts

| | |
|---|---|
| **Current version** | 1.0 (April 2026) |
| **License** | Open source |
| **Languages** | .NET (C#) + Python |
| **Cost** | Free |
| **Azure integration** | Azure AI Foundry, Azure OpenAI Service, Copilot Studio |
| **Predecessors merged** | Semantic Kernel (orchestration) + AutoGen (multi-agent) |
| **AutoGen status** | Maintenance mode only. New projects should not start there. |
| **Non-Azure LLM support** | OpenAI API, Anthropic, Google, open-weight via OpenAI-compatible endpoints |

## When to pick Microsoft Agent Framework

- **Azure-native enterprises.** Deep integration with Azure AI Foundry, Azure OpenAI, Copilot Studio, Entra ID, Azure Monitor. Migration path from existing Copilot Studio agents is the cleanest.
- **Existing Semantic Kernel or AutoGen users.** Migration guides shipped with 1.0. Most existing code ports with modest refactoring.
- **.NET / C# shops.** The best .NET-native agent framework available in 2026. First-party AOT support, strong tooling.
- **Production SLAs matter.** Microsoft-backed framework with commercial support options through Azure. Compare to community-maintained alternatives.

## When to pick something else

- **TypeScript-first:** [Mastra](/tools/mastra/) is purpose-built for TypeScript ergonomics.
- **Not on Azure, Python-first:** [LangGraph](https://langchain-ai.github.io/langgraph/) has the largest Python community and is cloud-agnostic.
- **Multi-agent "crew" patterns:** [CrewAI](/tools/crewai/) emphasizes role-based agent teams with a simpler mental model.
- **Lightweight agent needs:** If you just need a single agent with tools, direct provider SDKs (OpenAI Agents, Claude Agent SDK) are simpler than a full framework.

## Pricing

Microsoft Agent Framework is free and open source. You pay for:

- **LLM inference** (Azure OpenAI, OpenAI API, or another provider)
- **Azure infrastructure** if deployed on Azure AI Foundry
- **Optional Microsoft enterprise support** via existing Microsoft contracts

No framework licensing fees.

Verified 2026-04-18 via [Microsoft Agent Framework overview](https://learn.microsoft.com/en-us/agent-framework/overview/) and [Microsoft Foundry Blog introduction](https://devblogs.microsoft.com/foundry/introducing-microsoft-agent-framework-the-open-source-engine-for-agentic-ai-apps/).

## Failure modes

- **Azure gravity.** The framework works outside Azure, but the reference architecture, documentation, and observability story all assume Azure. Non-Azure users do more setup.
- **Complexity vs simple use cases.** A single-agent script that just calls an LLM with a few tools doesn't need this framework. Use a provider SDK directly.
- **Migration work from AutoGen.** Not drop-in. Some multi-agent patterns need rewriting to match the new primitives.
- **New framework, early ecosystem.** 1.0 is production-ready but the community tool library is less mature than LangChain's Python ecosystem.
- **Documentation is Microsoft-style.** Extensive but dense. Easier to onboard via Azure AI Foundry's guided experience than raw docs.

## Against the alternatives

| | MS Agent Framework | LangGraph | Mastra | CrewAI | AG2 |
|---|---|---|---|---|---|
| **Primary language** | .NET + Python | Python | TypeScript | Python | Python |
| **Cloud fit** | Azure | Any | Vercel / any | Any | Any |
| **License** | Open source | Open source | Open source | Open source | Open source |
| **Maturity (2026)** | 1.0 new, polished | Established | Early (1.0) | Established | AutoGen fork |
| **Best for** | MS enterprises | Python-first | TS shops | Role-based crews | AutoGen users not on Azure |

## Methodology

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-04-18 against [Microsoft Agent Framework overview](https://learn.microsoft.com/en-us/agent-framework/overview/) and the [version 1.0 release blog](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/).

## FAQ

**What happened to AutoGen?**
AutoGen is now in maintenance mode and will not receive new features. Microsoft recommends new projects start on Agent Framework. The community-forked [AG2](/tools/ag2/) continues the AutoGen lineage as an independent open-source project for teams that want to stay on that trajectory.

**Does Agent Framework require Azure?**
No. It's open source and works with any LLM provider (OpenAI, Anthropic, Google, local via Ollama). Azure is the reference deployment target, not a requirement.

**Is there a visual agent builder?**
Not in the framework itself. Azure AI Foundry provides a visual experience for agent composition that sits on top. For pure visual building without Azure, see [LangFlow](/tools/langflow/).

**How does it compare to Semantic Kernel?**
Agent Framework is Semantic Kernel's successor. Existing Semantic Kernel code has a documented migration path. Most orchestration patterns transfer with refactoring.

## Related

- **Category:** [AI Automation](/categories/ai-automation/) · [AI Coding](/categories/ai-coding/)
- **Compare:** MS Agent Framework vs [Mastra](/tools/mastra/) · vs [CrewAI](/tools/crewai/)
- **See also:** [AG2](/tools/ag2/) · [LangFlow](/tools/langflow/)
