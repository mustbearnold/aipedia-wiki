---
type: tool
slug: letta
title: Letta
tagline: Stateful agent platform (formerly MemGPT) with persistent, portable memory. Build agents that learn across sessions and survive model swaps.
category: ai-automation
company: letta-ai
url: https://www.letta.com/
pricing_model: open-source
price_range: "Free (open-source) · Hosted from $0 · Letta Max tier for heavy workloads"
status: active
launched: 2023-10
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 9
  moat: 6
  longevity: 7
tags: [agent-framework, memory, stateful, memgpt, open-source, python, llm-agents, long-term-memory, rag, letta-code]
seo_title: "Letta (formerly MemGPT): Features, Pricing & Review (April 2026)"
meta_description: "Letta is the open-source stateful agent platform formerly known as MemGPT. Self-host free under Apache-2.0, or use Letta Cloud with Free, Professional, Scale, and Enterprise tiers. Letta Code ships a memory-first coding CLI."
author: "aipedia.wiki Editorial"
best_for:
  - developers building agents that need long-term memory
  - teams requiring memory portable across LLM providers
  - researchers experimenting with stateful architectures
  - memory-first coding via Letta Code CLI
not_best_for:
  - teams needing simple single-turn LLM calls
  - developers who want a drag-and-drop visual builder
  - workflows with no state or personalization requirement
quick_answer: >-
  Letta is the open-source stateful agent platform formerly known as MemGPT. Apache-2.0 and free to self-host; Letta Cloud adds hosted tiers including Enterprise. Pick it when agents must remember users, carry state across model swaps, or power a memory-first coding CLI via Letta Code.
---

# Letta

Letta is the open-source stateful agent platform originally released as MemGPT at UC Berkeley. The core is Apache-2.0 licensed. Letta Cloud hosts the same platform with tiered plans; Letta Code ships the platform as a memory-first coding CLI ([docs](https://docs.letta.com/letta-code/)).

The differentiator is typed memory blocks (persona, human context, archival) that persist across sessions and port between LLM providers.

## System Verdict

> **Pick Letta if your agent must remember users, carry state across sessions, or survive a model swap without losing context.** The memory architecture is the real product. Core memory, archival memory, and background memory subagents give agents an editable world model rather than a fresh context window per turn.
>
> **Skip it if your workload is stateless.** Simple RAG, one-shot chat, or deterministic pipelines ship faster with [LangChain](/tools/langflow/) or direct API calls. Letta's memory layer is overhead if you never retrieve from it.
>
> **Who pays which tier:** Free self-hosted for research and prototypes. Letta Cloud Professional for individual developers shipping stateful agents. Scale for multi-agent production workloads. Enterprise for private deployments with SSO and dedicated quotas.

## Key Facts

| | |
|---|---|
| **Former name** | MemGPT (UC Berkeley, 2023 paper) |
| **License** | Apache-2.0 (open-source core) |
| **GitHub** | letta-ai/letta · 22K+ stars, 100+ contributors |
| **Memory model** | Typed blocks: core (persona, human) · archival (long-form) |
| **Memory portability** | Cross-provider: OpenAI, Anthropic, Google, Ollama |
| **SDKs** | Python · TypeScript |
| **REST API** | Yes, full agent lifecycle |
| **Letta Code** | `npm install -g @letta-ai/letta-code` · memory-first coding CLI |
| **Hosted tiers** | Free · Professional · Scale · Max · Enterprise |
| **Free tier quota** | 50 premium + 500 standard requests/month |

Every data point above was verified against vendor sources on 2026-04-17. See Sources.

## What it actually is

A stateful agent runtime. Every agent owns typed memory blocks that it reads and writes. The agent loop runs before each response, retrieves relevant archival context, and can hand off to background subagents that compress and improve its own prompts.

Memory is the portable layer. Swap the underlying LLM from OpenAI to Anthropic and the agent keeps its history, persona, and learned facts. That portability is the product-level claim that sets Letta apart from LangGraph or CrewAI.

Letta Code is the most interesting recent ship. A Terminal-Bench top-ranked OSS harness, it puts a persisted agent behind a coding CLI so sessions accumulate context over days instead of starting cold.

## When to pick Letta

- **Personalized AI assistants.** Agents that must remember user preferences, history, and ongoing projects across many sessions.
- **Avoiding vendor lock-in.** Memory that survives a migration from OpenAI to Anthropic or a local Ollama model.
- **Memory-first coding.** Letta Code CLI keeps a single persisted agent across multi-day coding sessions.
- **Research on agent architectures.** Open-source, transparent memory blocks, extensible subagent patterns.
- **Regulated enterprises.** Self-host on your own infrastructure with full control over data residency.

## When to pick something else

- **Multi-agent task pipelines:** [CrewAI](/tools/crewai/). Role-based crews are faster for hierarchical delegation.
- **Visual agent builder on LangChain:** [Langflow](/tools/langflow/).
- **No-code business agents:** [Relevance AI](/tools/relevance-ai/).
- **Voice-first agent UX:** [Voiceflow](/tools/voiceflow/).
- **General workflow automation:** [n8n](/tools/n8n/) or [Zapier](/tools/zapier/).
- **Deterministic production graphs:** LangGraph. More control, less memory tooling.

## Pricing

| Plan | Price | Key limits |
|------|-------|------------|
| Open-source (self-host) | Free | Apache-2.0, BYO compute and API keys |
| Free (Letta Cloud) | $0/mo | 50 premium + 500 standard requests/mo |
| Professional | Paid tier | 500 premium + 5,000 standard requests/mo |
| Scale | Paid tier | 5,000 premium + 50,000 standard requests/mo |
| Max | Power-user tier | High-throughput agentic coding workloads |
| Enterprise | Custom | SAML/OIDC SSO, private models, dedicated quotas |
| API Plan | Usage-based | Unlimited agents; billed per active agent + tool-execution seconds |

*Prices verified 2026-04-17 via [Letta pricing](https://www.letta.com/pricing). Self-hosting is free; you still pay for LLM tokens through your provider.*

## Against the alternatives

| | Letta | LangGraph | [CrewAI](/tools/crewai/) |
|---|---|---|---|
| **Primary abstraction** | Stateful agents with typed memory | State graphs | Role-based crews |
| **Cross-session memory** | Native, portable, editable | Manual wiring | Basic context sharing |
| **Model-switch resilience** | High, memory ports cleanly | Low, bound to graph impl | Mid |
| **Production state control** | Mid | Highest | Mid |
| **Language support** | Python + TS | Python + JS | Python only |
| **Coding CLI** | Letta Code | None native | None native |
| **Best viewed as** | Memory-first agent platform | Deterministic runtime | Fast multi-agent prototyping |

## Failure modes

- **Memory overhead for stateless jobs.** If you never retrieve archival memory, Letta's architecture is weight without benefit. Use plain LangChain.
- **Self-host setup has moving parts.** Production self-hosting wants Postgres, a persistent volume, and careful upgrade discipline.
- **Category convergence.** LangGraph, CrewAI, and ChatGPT Projects are all adding memory features. Letta's advantage narrows as frontier models expand context.
- **Python-first ecosystem.** TypeScript SDK exists but the examples, templates, and community content lean Python.
- **Moat at 6/10.** Research pedigree and memory architecture are real, but the patterns are documented and copyable.
- **Hosted free tier is tight.** 50 premium requests a month is evaluation-scale. Real usage requires Professional or self-hosting.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against [Letta pricing](https://www.letta.com/pricing), [Letta Code docs](https://docs.letta.com/letta-code/), the [Letta Code blog](https://www.letta.com/blog/letta-code), and the [letta-ai/letta GitHub repo](https://github.com/letta-ai/letta).

## FAQ

**Is Letta the same project as MemGPT?**
Yes. MemGPT was the original 2023 UC Berkeley research prototype. The team renamed it Letta as it matured into a production-ready platform with hosted tiers, SDKs, and Letta Code.

**Is Letta free?**
Yes. The core is Apache-2.0 open-source and free to self-host. You pay only LLM API costs through your chosen provider. Letta Cloud also offers a free hosted tier with 50 premium plus 500 standard requests per month.

**What is Letta Code?**
A memory-first coding CLI built on the Letta API. Install with `npm install -g @letta-ai/letta-code`. Unlike session-based coding assistants, Letta Code keeps a persisted agent that learns across days and is portable across models ([docs](https://docs.letta.com/letta-code/)).

**How does Letta memory compare to RAG?**
RAG retrieves documents at query time and discards them. Letta memory is typed, editable, and agent-owned. The agent reads and writes its own memory blocks, compresses old conversations to archival storage, and can introspect what it knows.

**Can Letta swap between LLM providers mid-agent?**
Yes. Memory lives outside the model. Switch from OpenAI to Anthropic or a local Ollama endpoint without losing persona, user facts, or conversation history.

## Sources

- [Letta pricing page](https://www.letta.com/pricing): Current Cloud tiers and quotas
- [Letta Code docs](https://docs.letta.com/letta-code/): CLI install and memory-first coding architecture
- [Letta Code announcement](https://www.letta.com/blog/letta-code): Terminal-Bench results and positioning
- [letta-ai/letta GitHub](https://github.com/letta-ai/letta): Apache-2.0 source and release history
- [Letta documentation](https://docs.letta.com/): Memory block architecture reference

## Related

- **Category:** [AI Automation](/categories/ai-automation/)
- **Comparisons:** [Letta vs CrewAI](/comparisons/letta-vs-crewai/) · [Letta vs LangChain](/comparisons/letta-vs-langchain/)
