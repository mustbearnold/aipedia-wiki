---
type: tool
slug: letta
title: Letta
tagline: Stateful agent platform (formerly MemGPT) with persistent, portable memory. Build agents that learn across sessions and survive model swaps.
category: ai-automation
company: letta-ai
url: https://www.letta.com/
github_url: https://github.com/letta-ai/letta
pricing_model: open-source
price_range: "Free (open-source) · Letta Code Free · Pro $20/mo · Enterprise custom"
status: active
launched: 2023-10
last_updated: 2026-06-08
last_verified: 2026-06-08
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
facts:
  best_for:
    value: "Best for developers building stateful agents that need persistent memory, tool use, and model-agnostic agent state across sessions."
    source: https://www.letta.com/
    source_label: Letta official site
    source_id: letta-official
    verified_at: '2026-06-08'
    volatility: medium
    confidence: high
    next_review_at: '2026-12-08'
  pricing_anchor:
    value: "As of June 2026, letta.com/pricing routes buyers to Letta Code pricing. The hosted ladder is Free, Pro $20/mo (Letta Auto quota plus pay-as-you-go), and Enterprise custom. BYOK is supported on every tier."
    source: https://docs.letta.com/letta-code/pricing
    source_label: Letta Code pricing
    source_id: letta-code-pricing
    verified_at: '2026-06-08'
    volatility: high
    confidence: high
    next_review_at: '2026-09-08'
  memory_architecture:
    value: "Letta's core differentiation is explicit long-term agent memory and state management rather than a stateless chat-completion wrapper."
    source: https://docs.letta.com/
    source_label: Letta documentation
    source_id: letta-docs
    verified_at: '2026-06-08'
    volatility: medium
    confidence: high
    next_review_at: '2026-12-08'
  open_source:
    value: "The repository is the best source for current server, SDK, local-development, and licensing details for teams evaluating self-hosting."
    source: https://github.com/letta-ai/letta
    source_label: Letta GitHub repository
    source_id: letta-repository
    verified_at: '2026-06-08'
    volatility: medium
    confidence: high
    next_review_at: '2026-12-08'
  watch_out_for:
    value: "Stateful memory improves continuity but adds governance work around retention, deletion, retrieval quality, and sensitive-data handling."
    source: https://docs.letta.com/
    source_label: Letta documentation
    source_id: letta-docs
    verified_at: '2026-06-08'
    volatility: medium
    confidence: high
    next_review_at: '2026-12-08'
tags: [agent-framework, memory, stateful, memgpt, open-source, python, llm-agents, long-term-memory, rag, letta-code]
seo_title: "Letta (formerly MemGPT): Features, Pricing & Review (June 2026)"
meta_description: "Letta is the open-source stateful agent platform formerly known as MemGPT. Verified June 8, 2026: self-host free under Apache-2.0, or use Letta Code Free / Pro $20/mo / Enterprise with Letta Auto and BYOK."
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
  Letta is the open-source stateful agent platform formerly known as MemGPT. Apache-2.0 and free to self-host. Hosted offerings now consolidate around Letta Code: Free, Pro $20/mo (Letta Auto quota plus pay-as-you-go), and Enterprise (custom per-seat). BYOK on every tier. Pick it when agents must remember users, carry state across model swaps, or power a memory-first coding CLI.
price_history:
  - date: 2026-04-17
    plan: "Letta Cloud tier ladder"
    price: "Free, Professional, Scale, Max, Enterprise"
    source: "https://www.letta.com/pricing"
    source_label: "Letta pricing (legacy)"
    source_id: letta-pricing-legacy
    note: "Prior multi-tier Cloud structure with premium/standard request quotas."
  - date: 2026-05-13
    plan: "Letta Code"
    price: "Free / Pro $20/mo / Enterprise custom"
    source: "https://docs.letta.com/letta-code/pricing"
    source_label: "Letta Code pricing"
    source_id: letta-code-pricing
    note: "letta.com/pricing now 301-redirects to Letta Code pricing. Consolidated to three tiers. Pro adds Letta Auto quota (open-weights models, automatic routing) and pay-as-you-go overage; up to 20 stateful agents. BYOK is supported on every tier. Letta Auto Chat and Auto Fast variants exposed."
  - date: 2026-06-08
    plan: "Letta Code"
    price: "Free / Pro $20/mo / Enterprise custom"
    source: "https://docs.letta.com/letta-code/pricing"
    source_label: "Letta Code pricing"
    source_id: letta-code-pricing
    note: "Re-verified the Free, Pro, and Enterprise ladder, Pro $20/month, up to 20 stateful agents, Letta Auto quota, pay-as-you-go overage, all-plan BYOK, and Personal Plans versus API Plan split."
---

# Letta

Letta is the open-source stateful agent platform originally released as MemGPT at UC Berkeley. The core is Apache-2.0 licensed. As of June 2026, the hosted platform has consolidated around Letta Code, a memory-first coding CLI with **Letta Auto** model routing ([docs](https://docs.letta.com/letta-code/)). The legacy letta.com/pricing route now points buyers to Letta Code pricing.

The differentiator is typed memory blocks (persona, human context, archival) that persist across sessions and port between LLM providers.

## System Verdict

> **Pick Letta if your agent must remember users, carry state across sessions, or survive a model swap without losing context.** The memory architecture is the real product. Core memory, archival memory, and background memory subagents give agents an editable world model rather than a fresh context window per turn.
>
> **Skip it if your workload is stateless.** Simple RAG, one-shot chat, or deterministic pipelines ship faster with [LangChain](/tools/langflow/) or direct API calls. Letta's memory layer is overhead if you never retrieve from it.
>
> **Who pays which tier:** Free self-hosted for research and prototypes. Letta Code Free for evaluation with BYOK. Pro $20/mo for individual developers who want Letta Auto routing and pay-as-you-go overage. Enterprise for managed per-seat deployments with private models and dedicated quotas.

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
| **Hosted tiers (June 2026)** | Free · Pro $20/mo · Enterprise (custom per-seat) |
| **Letta Auto** | Automatic model routing (open-weights + frontier). Variants: Auto Chat, Auto Fast |
| **BYOK** | Supported on every tier (paid users can layer pay-as-you-go credits) |
| **Pro tier limits** | Up to 20 stateful agents · Letta Auto quota · pay-as-you-go overage |
| **Typical usage cost** | Vendor estimates $100-$200+/month for active coding workloads |

Every data point above was verified against vendor sources on 2026-06-08. See Sources.

## What it actually is

A stateful agent runtime. Every agent owns typed memory blocks that it reads and writes. The agent loop runs before each response, retrieves relevant archival context, and can hand off to background subagents that compress and improve its own prompts.

Memory is the portable layer. Swap the underlying LLM from OpenAI to Anthropic and the agent keeps its history, persona, and learned facts. That portability is the product-level claim that sets Letta apart from LangGraph or CrewAI.

Letta Code is the most interesting recent ship and now the front door for the hosted product. A Terminal-Bench top-ranked OSS harness, it puts a persisted agent behind a coding CLI so sessions accumulate context over days instead of starting cold. Letta Auto handles model routing (open-weights plus frontier), with Auto Chat and Auto Fast variants for non-coding and speed-optimized work.

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
| Letta Code Free | $0/mo | Limited agents, limited Letta Auto, BYOK only |
| Letta Code Pro | $20/mo | Up to 20 stateful agents · Letta Auto quota + pay-as-you-go overage · BYOK |
| Enterprise | Custom | Managed per-seat for teams, private models, SAML/OIDC SSO, dedicated quotas |

*Prices verified 2026-06-08 via [Letta Code pricing](https://docs.letta.com/letta-code/pricing). The legacy `letta.com/pricing` route now points buyers to this Letta Code pricing surface. Self-hosting is free; you still pay for LLM tokens through your provider. Vendor estimates active coding workloads can run $100-$200+/month when using paid Letta Auto on Pro.*

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
- **Hosted free tier is tight.** Free Letta Code is evaluation-scale only. Real usage means Pro $20/mo (with pay-as-you-go overage) or self-hosting.
- **Pricing model changed in 2026.** The prior 5-tier Cloud ladder (Free, Professional, Scale, Max, Enterprise) is gone; teams that were budgeting against those tiers should re-baseline against Free / Pro $20 / Enterprise and the new Letta Auto consumption model.

## Recent changes

- **2026-05-13:** Hosted pricing consolidated. `letta.com/pricing` now 301-redirects to [Letta Code pricing](https://docs.letta.com/letta-code/pricing). The new ladder is Free, Pro $20/mo, and Enterprise (managed per-seat). Pro includes Letta Auto quota plus pay-as-you-go overage and supports up to 20 stateful agents. BYOK is available on every tier. Letta Auto exposes Auto Chat and Auto Fast variants.
- **2026-06-08:** Re-verified Letta Code pricing, Pro $20/month, Letta Auto quota/overage, BYOK on every plan, Constellation cloud features, remote-environment quickstart, and the Personal Plans versus API Plan split.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-06-08 against [Letta Code pricing](https://docs.letta.com/letta-code/pricing), [Letta Code docs](https://docs.letta.com/letta-code/), the [Letta Code quickstart](https://docs.letta.com/letta-code/quickstart), and the [letta-ai/letta GitHub repo](https://github.com/letta-ai/letta).

## FAQ

**Is Letta the same project as MemGPT?**
Yes. MemGPT was the original 2023 UC Berkeley research prototype. The team renamed it Letta as it matured into a production-ready platform with hosted tiers, SDKs, and Letta Code.

**Is Letta free?**
Yes. The core is Apache-2.0 open-source and free to self-host. You pay only LLM API costs through your chosen provider. Letta Code also offers a free hosted tier with limited agents, limited Letta Auto usage, and BYOK only. Real production usage typically moves to Pro $20/mo with pay-as-you-go overage.

**What is Letta Code?**
A memory-first coding CLI built on the Letta API. Install with `npm install -g @letta-ai/letta-code`. Unlike session-based coding assistants, Letta Code keeps a persisted agent that learns across days and is portable across models ([docs](https://docs.letta.com/letta-code/)).

**How does Letta memory compare to RAG?**
RAG retrieves documents at query time and discards them. Letta memory is typed, editable, and agent-owned. The agent reads and writes its own memory blocks, compresses old conversations to archival storage, and can introspect what it knows.

**Can Letta swap between LLM providers mid-agent?**
Yes. Memory lives outside the model. Switch from OpenAI to Anthropic or a local Ollama endpoint without losing persona, user facts, or conversation history.

## Sources

- [Letta Code pricing](https://docs.letta.com/letta-code/pricing): Current hosted tiers, Letta Auto details, BYOK terms (letta.com/pricing now redirects here)
- [Letta Code docs](https://docs.letta.com/letta-code/): CLI install and memory-first coding architecture
- [Letta Code announcement](https://www.letta.com/blog/letta-code): Terminal-Bench results and positioning
- [letta-ai/letta GitHub](https://github.com/letta-ai/letta): Apache-2.0 source and release history
- [Letta documentation](https://docs.letta.com/): Memory block architecture reference

## Related

- **Category:** [AI Automation](/categories/ai-automation/)
