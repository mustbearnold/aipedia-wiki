---
type: tool
slug: letta
title: Letta
tagline: Stateful agent framework with persistent memory. Build AI agents that learn, remember, and improve across sessions.
category: ai-automation
company: letta-ai
url: https://www.letta.com/
pricing_model: open-source
price_range: "Free (open-source self-host); hosted plans $0-$200/month"
status: active
launched: 2023-10
last_updated: 2026-04-15
last_verified: 2026-04-15
update_frequency: frequent
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
tags: [agent-framework, memory, stateful, memgpt, open-source, python, llm-agents, long-term-memory, rag]
seo_title: "Letta (formerly MemGPT): Features, Pricing & Review (2026)"
meta_description: "Letta (formerly MemGPT) is an open-source stateful agent framework with persistent, portable memory. Self-host free or use hosted plans from $0-$200/month."
author: "aipedia.wiki Editorial"
best_for:
  - developers building agents that need long-term memory
  - teams that need memory portable across LLM providers
  - researchers experimenting with stateful agent architectures
  - applications requiring personalized, evolving AI assistants
not_best_for:
  - teams that only need simple single-turn LLM calls
  - developers who want a no-code visual workflow builder
quick_answer: >-
  Letta (formerly MemGPT) is an open-source Python framework for building stateful AI agents with persistent, structured memory. Agents store memory in blocks (persona, human context, archival storage) that persist across sessions and can be ported between LLM providers. Originally a UC Berkeley research project, Letta has grown to 22k+ GitHub stars and offers a self-hosted open-source path plus hosted plans from free to $200/month. Best for developers who need agents that genuinely remember and improve over time; not a drop-in replacement for simple chatbot frameworks.
---

# Letta

Letta is an open-source framework for building stateful AI agents with long-term memory. Originally developed as MemGPT at UC Berkeley and published in a 2023 research paper, it was renamed Letta as the project grew beyond its academic roots into a production-grade agent platform ([Letta GitHub](https://github.com/letta-ai/letta)). The core differentiator is structured, persistent memory: agents maintain memory blocks for persona, user context, and archival storage that survive across sessions and can be migrated between LLM providers. As of April 2026, Letta has 22k+ GitHub stars, 100+ contributors, and is licensed Apache-2.0.

## What It Does

Letta gives AI agents a memory architecture that goes beyond a conversation's context window. Rather than starting fresh each session, a Letta agent stores information in typed memory blocks (core memory for persona and user facts; archival memory for long-form recall) and retrieves relevant context automatically before each response ([Letta Docs](https://docs.letta.com/)). The framework is model-agnostic: you can run the same agent on OpenAI today and switch to Anthropic or a local Ollama model tomorrow without losing state. Agents can also spawn subagents, use background memory subagents to compress and improve their own prompts over time, and call external tools including web search. The Letta server exposes a REST API so agents can be embedded in any application. A desktop app and CLI are also available for local development.

## Who It's For

- **Application developers** building AI assistants that must remember user preferences, history, and context across many sessions
- **ML engineers** who want fine-grained control over what an agent knows and when it retrieves information
- **Teams requiring LLM portability** who cannot risk vendor lock-in and need memory to survive model switches
- **Researchers** studying agent architectures, memory management, and long-horizon task completion
- **Enterprises** deploying personalized agents at scale via the API plan with per-agent billing

## Pricing

| Plan | Price | Key Limits |
|------|-------|-----------|
| Open-source (self-host) | Free | Unlimited; bring your own compute and API keys |
| Free (hosted) | $0/month | Limited usage quota, open-weights models only |
| Pro | $20/month | Up to 20 stateful agents, usage quota for frontier models |
| Max Lite | $100/month | Up to 50 agents, 5x higher limits on Letta Auto |
| Max | $200/month | Up to 50 agents, 20x limits, early access features |
| API Plan | $20/month base + usage | Unlimited agents at $0.10/agent/month active; $0.00015/sec tool execution |

*Prices verified 2026-04-15 ([Letta Pricing](https://www.letta.com/pricing)). Self-hosting is fully free with your own LLM API keys.*

## Key Features

- **Persistent memory blocks:** Core memory (persona, human context) and archival memory persist across sessions and are transparently editable ([Letta Docs](https://docs.letta.com/))
- **Model-agnostic:** Works with OpenAI, Anthropic, Google, Mistral, Ollama, and other providers; memory is portable between them
- **Background memory subagents:** Subagents can review and compress memory, improving prompts and context over time without manual intervention
- **Tool use and function calling:** Agents call tools including web search, custom Python functions, and MCP-compatible integrations
- **REST API and SDKs:** Python and TypeScript SDKs; full REST API for embedding agents in applications
- **Memory palace UI:** Desktop and web interface for visualizing and editing what an agent knows
- **Subagents:** Agents can spawn child agents for parallel or specialized tasks
- **Self-hostable:** Run the Letta server locally or on your own infrastructure; Apache-2.0 license

## Limitations

- **More complex than simple frameworks.** Letta's memory architecture adds overhead. If you need a stateless RAG pipeline or a simple chatbot, lighter tools (LangChain, direct API calls) are less work.
- **Self-hosted setup requires DevOps.** Running `letta server` locally is straightforward; production self-hosting requires database management and infrastructure care.
- **Moat is moderate.** The stateful-memory position is defensible, but LangGraph, CrewAI, and other frameworks are adding memory features; the category is maturing quickly.
- **Hosted free tier is limited.** Meaningful hosted usage requires a paid plan. Open-source self-hosting sidesteps this but shifts cost to your own API spend.
- **Python-first.** TypeScript SDK exists but the ecosystem depth is primarily Python.
- **Category uncertainty.** As frontier models extend their own context windows, the relative advantage of external memory management may narrow over time.

## Bottom Line

Letta is the most mature open-source framework for agents that need genuine long-term memory and cross-session continuity. It is the right choice when your use case specifically requires agents that learn from past interactions, remember individual users, or carry state across many sessions and model versions. For simpler agentic workflows or teams that do not need persistent memory, CrewAI or LangGraph involve less architectural overhead. The self-hosted path is genuinely free; the hosted tiers offer a managed option at competitive prices relative to building memory infrastructure yourself.

## Best Alternatives

- [CrewAI](../tools/crewai.md): Multi-agent orchestration with role-based agents; better for task pipelines, weaker on long-term memory
- [LangFlow](../tools/langflow.md): Visual workflow builder built on LangChain; more accessible to non-developers, less control over memory internals
- [Relevance AI](../tools/relevance-ai.md): No-code agent builder with memory features; managed platform rather than self-hostable framework

## FAQ

**What is the difference between Letta and MemGPT?**
They are the same project. MemGPT was the original research prototype published in a 2023 UC Berkeley paper demonstrating how paging-style memory management could extend LLM context. The team renamed the project Letta as it matured into a production framework with a full API, SDKs, and hosted plans.

**Can I use Letta for free?**
Yes. The core framework is Apache-2.0 open-source and fully free to self-host. You supply your own LLM API keys and compute. Letta also offers a hosted free tier with limited quota, and paid hosted plans starting at $20/month for more capacity.

**How does Letta memory compare to just using RAG?**
RAG retrieves documents at query time and discards them after the response. Letta memory is structured, typed, and agent-owned: the agent actively reads and writes its own memory blocks, summarizes old conversations into archival storage, and can inspect or edit what it knows. This makes Letta agents more like a system with a persistent world model than a retrieval system with a session.

## Sources

- [Letta GitHub (letta-ai/letta)](https://github.com/letta-ai/letta): 22.1k stars, Apache-2.0, project history
- [Letta official site](https://www.letta.com/): Product overview, feature descriptions
- [Letta pricing page](https://www.letta.com/pricing): Tier details verified 2026-04-15
- [Letta documentation](https://docs.letta.com/): Architecture and memory block documentation

## Related

- **Category:** [AI Automation](../categories/ai-automation.md)
