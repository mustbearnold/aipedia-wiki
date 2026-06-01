---
type: tool
slug: ag2
title: AG2
tagline: Community-forked AutoGen continuation. Open-source multi-agent framework ("The Open-Source AgentOS"). Free, maintained by the ag2ai community after Microsoft's AutoGen pivoted to maintenance.
category: ai-automation
company: ag2ai
url: https://www.ag2.ai
github_url: https://github.com/ag2ai/ag2
pricing_model: open-source
price_range: "Free (open source)"
status: active
launched: 2024-10
current_version: "0.13.0"
current_version_date: 2026-05-29
last_updated: 2026-06-01
last_verified: 2026-06-01
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 10
  moat: 6
  longevity: 7
facts:
  best_for:
    value: Best for developers building multi-agent systems who want an open-source AgentOS-style framework descended from the AutoGen ecosystem.
    source: https://www.ag2.ai/
    source_label: AG2 official site
    source_id: ag2-official
    verified_at: '2026-06-01'
    volatility: medium
    confidence: high
    next_review_at: '2026-08-13'
  pricing_anchor:
    value: AG2 is open-source software (Apache 2.0 for new code; original AutoGen components retain MIT); costs come from hosting, model/API usage, observability, and engineering time rather than a vendor SaaS tier.
    source: https://github.com/ag2ai/ag2
    source_label: AG2 GitHub repository
    source_id: ag2-repository
    verified_at: '2026-06-01'
    volatility: medium
    confidence: high
    next_review_at: '2026-08-13'
  open_source_or_local:
    value: AG2 is available as an open-source repository and can be installed for local or self-managed agent development. Latest release verified from GitHub is v0.13.2 (2026-05-29).
    source: https://github.com/ag2ai/ag2/releases
    source_label: AG2 releases
    source_id: ag2-releases
    verified_at: '2026-06-01'
    volatility: medium
    confidence: high
    next_review_at: '2026-08-13'
  api_available:
    value: AG2 is a developer framework, so its API is the programming surface and docs rather than a hosted inference API.
    source: https://docs.ag2.ai/
    source_label: AG2 docs
    source_id: ag2-docs
    verified_at: '2026-06-01'
    volatility: medium
    confidence: high
    next_review_at: '2026-08-13'
  enterprise_controls:
    value: Enterprise readiness depends on the team's own deployment, secrets management, evaluation, logging, and guardrail stack around AG2. The framework remains pre-1.0 (current v0.13.2), so API surface is still being tidied through deprecations.
    source: https://docs.ag2.ai/
    source_label: AG2 docs
    source_id: ag2-docs
    verified_at: '2026-06-01'
    volatility: medium
    confidence: high
    next_review_at: '2026-08-13'
  watch_out_for:
    value: Do not compare AG2 as if it were a turnkey automation SaaS; it is a framework that requires engineering ownership and production hardening, and it is still pre-1.0 with active deprecation cycles.
    source: https://github.com/ag2ai/ag2
    source_label: AG2 GitHub repository
    source_id: ag2-repository
    verified_at: '2026-06-01'
    volatility: medium
    confidence: high
    next_review_at: '2026-08-13'
tags: [agent-framework, autogen-successor, python, multi-agent, open-source, community]
seo_title: "AG2: Features & Review (June 2026)"
meta_description: "AG2 is the community-forked continuation of Microsoft AutoGen. Apache 2.0 Python framework for multi-agent AI systems. Free. Current release v0.13.2 (May 29, 2026). Best for AutoGen users staying off Azure."
author: "aipedia.wiki Editorial"
best_for:
  - existing AutoGen users who don't want to migrate to Microsoft Agent Framework
  - Python teams building multi-agent systems
  - cloud-agnostic deployments
  - community-driven open-source ethos
not_best_for:
  - Azure-aligned enterprises (use Microsoft Agent Framework)
  - TypeScript teams (use Mastra)
  - production deployments needing enterprise-grade support
quick_answer: >-
  AG2 is the community-led continuation of Microsoft AutoGen after Microsoft merged AutoGen into the Microsoft Agent Framework. Fully open source, free, Python-based, cloud-agnostic. Best for multi-agent systems and AutoGen users who want to stay on that trajectory without migrating to Microsoft's framework. Skip it if you need enterprise SLAs or Azure integration.
---

# AG2

Formerly Microsoft AutoGen, AG2 spun out as an independent open-source project in late 2024 when Microsoft pivoted AutoGen to maintenance mode. Calls itself "The Open-Source AgentOS." Python-based, Apache 2.0 licensed for new code (original AutoGen components retain MIT), community-led, no vendor strings attached.

## Recent changes

- **2026-06-01 verification:** AG2 v0.13.2 is the current GitHub release (shipped May 29, 2026). The release adds Agent Evaluations in beta, Anthropic V2 and Bedrock V2 clients, TinyFish search/fetch tools, LlamaIndex 0.13 support, and a `ContextExpression` code-injection security fix. The project is still tracking toward a 1.0 cut, with the beta framework set to become the official framework at v1.0.

## System Verdict

> **Pick AG2 if you love AutoGen's patterns and don't want to migrate to Microsoft's framework.** The core concepts (GroupChat, ConversableAgent, multi-agent conversations) are preserved and continuing to develop. Fully cloud-agnostic, MIT-style licensing, active community.
>
> **Skip it if you're on Azure or starting a new enterprise project.** [Microsoft Agent Framework](/tools/microsoft-agent-framework/) is the production-grade direction Microsoft is investing in, with Azure AI Foundry integration and enterprise support. AG2 has none of that.
>
> **Also skip for production-critical systems right now.** AG2 is not production-ready for most enterprise use cases. No first-party observability platform. No built-in enterprise security. Code execution capabilities need careful sandboxing. Great for research and prototyping, but evaluate carefully for anything customer-facing.

## Key Facts

| | |
|---|---|
| **Origin** | Fork of Microsoft AutoGen, November 2024 |
| **License** | Apache 2.0 for new code; original AutoGen components retain MIT |
| **Latest release** | v0.13.2 (2026-05-29); still pre-1.0 |
| **Path to 1.0** | Still pre-1.0; docs say "the current framework will be tidied up through deprecations over the next few minor versions" |
| **Primary language** | Python |
| **Cost** | Free |
| **Maintenance** | Community-led via the ag2ai organization |
| **Core patterns** | ConversableAgent, GroupChat, swarms, sequential orchestration, tool use, code execution, RAG, structured outputs, human-in-the-loop |
| **LLM support** | OpenAI, Anthropic, Google, any OpenAI-compatible endpoint, local via Ollama |
| **Production-readiness** | Not yet production-grade for most enterprise use; active development |

## When to pick AG2

- **AutoGen legacy code.** Existing AutoGen projects continue working with AG2. Migration is mostly rename + minor API updates.
- **Research and prototyping.** Fast iteration on multi-agent patterns. Academic and experimental work thrives here.
- **Cloud-agnostic preference.** No Azure gravity. Runs anywhere Python runs.
- **Open-source ethos.** Community-maintained, no Microsoft (or Vercel-style) corporate direction. Contribute if you care about the trajectory.

## When to pick something else

- **Enterprise with Azure:** [Microsoft Agent Framework](/tools/microsoft-agent-framework/). First-party, production-ready, enterprise SLAs.
- **Python enterprise without Azure:** [LangGraph](https://langchain-ai.github.io/langgraph/) has the largest community and deepest ecosystem. LangSmith for observability.
- **TypeScript stack:** [Mastra](/tools/mastra/).
- **Role-based "crew" patterns:** [CrewAI](/tools/crewai/) emphasizes multi-agent crews with roles, goals, and tasks.

## Pricing

AG2 is free and open source. No commercial tier. You pay only for:

- **LLM inference** (whichever provider you configure)
- **Compute** (self-host or cloud of choice)
- **Observability** (logs, traces, evals, and alerts you add yourself)
- **Security hardening** (sandboxing, secrets handling, permissions, and review)
- **Engineering time** (agent design, testing, deployment, and maintenance)

Verified 2026-06-01 via [ag2.ai](https://www.ag2.ai/), [AG2 GitHub](https://github.com/ag2ai/ag2), and the [AG2 releases page](https://github.com/ag2ai/ag2/releases).

## Buyer fit

AG2 is best for teams that already understand agent frameworks and want to keep control. It is not a no-code automation product. The user has to define agents, tools, memory, code execution, model routing, and guardrails.

Good fits:

- research teams testing multi-agent coordination patterns
- AutoGen users who want continuity outside Microsoft's enterprise roadmap
- Python developers building internal prototypes
- teams comparing AG2, LangGraph, CrewAI, and Microsoft Agent Framework
- cloud-agnostic teams that want to avoid platform lock-in early

Weak fits:

- business users who need a ready-made automation app
- regulated enterprises without a strong platform engineering team
- teams that need vendor support, hosted observability, or enterprise SLAs
- TypeScript-first teams that do not want a Python agent layer

## Production checklist

Before using AG2 beyond prototyping, answer these questions:

- How are tool permissions restricted per agent?
- Where does code execution run, and how is it sandboxed?
- Which prompts, model calls, tool calls, and outputs are logged?
- What eval set catches regressions before deploy?
- How are secrets injected without exposing them to agents or logs?
- Who reviews agent-created changes before they affect customers?

AG2's openness is the advantage, but it also means production discipline is the user's job.

## Failure modes

- **Not production-ready for enterprise.** Known shortcomings: no first-party observability, no built-in enterprise security, code execution needs careful sandboxing. Acceptable for research or startups; risky for regulated industries.
- **Community bus factor.** AG2 depends on volunteer maintainers. Direction and pace can shift.
- **Smaller community than LangChain.** Fewer Stack Overflow answers, fewer YouTube tutorials. Discord + GitHub for support.
- **Future unclear.** If Microsoft Agent Framework dominates, AG2 may stagnate. If AG2 carves out independent traction, it becomes the AutoGen lineage default. Both scenarios are live as of June 2026, and the still-pre-1.0 status means breaking changes can land between releases.
- **Framework enthusiasm can outrun product need.** Multi-agent systems add coordination overhead. Use AG2 when separate agents solve a real problem, not because a single prompt chain feels less exciting.

## Against the alternatives

| | AG2 | Microsoft Agent Framework | LangGraph | CrewAI |
|---|---|---|---|---|
| **Lineage** | AutoGen fork | Semantic Kernel + AutoGen merge | LangChain family | Independent |
| **License** | Open source | Open source | Open source | Open source |
| **Enterprise fit** | Limited | Strong (Azure) | Strong (via LangSmith) | Moderate |
| **Language** | Python | .NET + Python | Python | Python |
| **Best for** | AutoGen continuation, research | Azure production | Python production | Multi-agent crews |

## Methodology

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-06-01 against [ag2.ai](https://www.ag2.ai/), [AG2 GitHub](https://github.com/ag2ai/ag2), the [AG2 releases page](https://github.com/ag2ai/ag2/releases) (v0.13.2 on 2026-05-29), and the [2026 agentic frameworks guide](https://blog.softmaxdata.com/definitive-guide-to-agentic-frameworks-in-2026-langgraph-crewai-ag2-openai-and-more/).

## FAQ

**What is the current AG2 version?**
v0.13.2, released on 2026-05-29. The project still sits below a 1.0 milestone; the docs note ongoing deprecation cycles as the beta framework hardens for that cut.

**Why did AutoGen split into AG2 and Microsoft Agent Framework?**
Microsoft decided to merge AutoGen and Semantic Kernel into a unified Microsoft Agent Framework (1.0 released April 2026). The community-led fork called AG2 emerged to continue the AutoGen direction independently.

**Should I migrate from AG2 to Microsoft Agent Framework?**
If you're Azure-aligned or need enterprise SLAs: yes. If you're cloud-agnostic and value open-source independence: stay on AG2. If you're brand new: probably start on LangGraph for the widest ecosystem.

**Is AG2 production-ready?**
For startups and research, yes. For regulated enterprise, not yet. No first-party observability or enterprise security; code execution capabilities need careful sandboxing.

**Who maintains AG2?**
The ag2ai organization on GitHub. Community-driven, no single corporate sponsor.

## Related

- **Category:** [AI Automation](/categories/ai-automation/) · [AI Coding](/categories/ai-coding/)
- **Compare:** AG2 vs [Microsoft Agent Framework](/tools/microsoft-agent-framework/) · AG2 vs [CrewAI](/tools/crewai/)
- **See also:** [Mastra](/tools/mastra/) · [LangFlow](/tools/langflow/)
