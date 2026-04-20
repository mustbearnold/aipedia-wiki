---
type: tool
slug: goose
title: Goose
tagline: Open-source AI agent originally from Block, now governed by the Linux Foundation's Agentic AI Foundation. Desktop, CLI, and API across 15+ LLMs with 70+ MCP extensions.
category: ai-automation
company: agentic-ai-foundation
url: https://block.github.io/goose/
github_url: https://github.com/block/goose
pricing_model: open-source
price_range: "Free (Apache-2.0; BYOK LLM costs)"
status: active
launched: 2025-01
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: frequent
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 10
  moat: 5
  longevity: 7
tags: [open-source, agent, cli, desktop-app, multi-llm, mcp, automation, coding, block, linux-foundation, rust, aaif, apache-2]
seo_title: "Goose AI Agent: Features, Review & Alternatives (April 2026)"
meta_description: "Goose is the free Apache-2.0 AI agent from Block, contributed to the Linux Foundation's Agentic AI Foundation in December 2025. Desktop, CLI, and API with 15+ LLM providers and 70+ MCP extensions."
author: "aipedia.wiki Editorial"
best_for:
  - developers wanting a free self-hosted autonomous agent
  - teams needing LLM provider flexibility
  - MCP ecosystem power users
  - CLI-first workflows
not_best_for:
  - users who want managed hosted agents
  - non-developers needing no-code interfaces
  - deep IDE coding integration (Cursor/Claude Code are better)
quick_answer: >-
  Goose is a free Apache-2.0 AI agent originally from Block (Square, Cash App), contributed to the Linux Foundation's Agentic AI Foundation in December 2025. It runs on desktop, CLI, and API with 15+ LLM providers and 70+ MCP extensions. Best for developers wanting a vendor-neutral autonomous agent; no managed hosting tier.
price_history:
  - date: 2025-12-15
    plan: "Open-source"
    price: "Free"
    note: "Block contributed Goose to the Linux Foundation's Agentic AI Foundation (AAIF)."
  - date: 2026-04-17
    plan: "Open-source"
    price: "Free"
    note: "Verified unchanged. Apache-2.0, BYOK LLM costs."
---

# Goose

Free, Apache-2.0 AI agent originally open-sourced by Block (the company behind Square, Cash App, and Tidal) in January 2025. In December 2025, Block contributed Goose to the Linux Foundation's Agentic AI Foundation (AAIF). The project is now community-governed under the [block/goose](https://github.com/block/goose) repository.

Runs as a native desktop app, CLI, and API on macOS, Linux, and Windows. Supports 15+ LLM providers through a unified interface and extends via 70+ Model Context Protocol extensions.

## System Verdict

> **Pick Goose if the team wants a free, vendor-neutral autonomous agent.** Provider-agnostic by design: Anthropic, OpenAI, Google, Mistral, Ollama local, OpenRouter, Azure, and Bedrock all work without changing workflows. Apache-2.0 permits commercial use with zero restriction.
>
> MCP is the ecosystem play. Goose was one of the earliest adopters and has one of the deepest extension libraries, with 70+ documented connectors covering GitHub, Google Drive, databases, browsers, and custom APIs. Rust-native on the back end, so startup and tool-call latency stay low.
>
> **Skip it if the workload demands managed hosting or deep IDE integration.** No cloud tier. [Cursor](/tools/cursor/) and [Claude Code](/tools/claude-code/) are purpose-built for in-editor autonomous coding; Goose is broader but less tuned.
>
> **Who pays what:** nobody pays Goose. The real cost is LLM usage. Local Ollama models run free; frontier [Claude](/tools/claude/) or [ChatGPT](/tools/chatgpt/) API calls cost what they cost.

## Key Facts

| | |
|---|---|
| **License** | Apache-2.0 (permissive, commercial use OK) |
| **Governance** | Linux Foundation Agentic AI Foundation (AAIF), since December 2025 |
| **Original creator** | Block (Square, Cash App, Tidal) |
| **Languages** | Rust (core, ~50% of codebase) + TypeScript (UI) |
| **Platforms** | macOS, Linux, Windows (native desktop + CLI + API) |
| **LLM providers** | 15+ (Anthropic, OpenAI, Google, Mistral, Ollama, OpenRouter, Azure, Bedrock, more) |
| **MCP extensions** | 70+ documented |
| **GitHub stars** | 29,000+ as of April 2026 |
| **Pricing** | Free. Users pay their own LLM costs |

Every data point above was verified against vendor documentation on 2026-04-17. See Sources.

## What it actually is

A general-purpose autonomous agent that executes multi-step tasks on the local machine. Users describe what they need; Goose plans and executes a sequence of tool calls: browsing, code execution, API calls, file operations, until the task completes.

The Rust core handles orchestration, tool dispatch, and sandboxing. A TypeScript frontend ships as the desktop app. The CLI wraps the same core for terminal workflows.

Provider flexibility is the architectural commitment. Swap LLMs via config; workflows, extensions, and recipes do not change. This matters when frontier model rankings shift every few months.

## When to pick Goose

- **Vendor neutrality is a hard requirement.** Providers are config-swappable; no lock-in to Anthropic or OpenAI.
- **MCP is the integration standard the team already invested in.** 70+ extensions beat most single-vendor catalogs.
- **Tasks span research, file operations, coding, and API calls.** Goose handles mixed workloads, not just code.
- **Local LLM (Ollama) is acceptable or required.** Works fully offline with local models for privacy-sensitive workflows.
- **YAML recipes need to capture and share workflows.** Reusable, portable configurations travel between teammates and CI.

## When to pick something else

- **IDE-integrated autonomous coding:** [Cursor](/tools/cursor/) or [Claude Code](/tools/claude-code/). Better in-editor ergonomics, deeper codebase awareness.
- **Managed hosted agent:** [ChatGPT](/tools/chatgpt/) Agent Mode or a hosted platform. Goose runs only on user machines.
- **Persistent memory across sessions:** [Letta](/tools/letta/) or [Hermes Agent](/tools/hermes-agent/). Goose has no built-in long-term memory blocks.
- **No-code UX:** [Zapier](/tools/zapier/), [Make](/tools/make/), or [Activepieces](/tools/activepieces/). Goose assumes developer comfort.
- **Git-native coding loop:** [Aider](/tools/aider/). Narrower scope, tighter commit-level integration.

## Pricing

| Plan | Price |
|---|---|
| Open-source (all surfaces) | Free |
| Desktop app | Free, bring your own LLM API keys |
| CLI | Free |
| API (self-host) | Free |

*Goose itself is Apache-2.0 and free. Users pay the LLM provider directly. Verified 2026-04-17 via [GitHub](https://github.com/block/goose) and the [official docs](https://block.github.io/goose/).*

## Against the alternatives

| | Goose | Cursor | Claude Code | Aider |
|---|---|---|---|---|
| **License** | Apache-2.0 open-source | Proprietary | Proprietary | Apache-2.0 |
| **Hosted tier** | No | Yes | Yes | No |
| **LLM providers** | 15+ | Limited | Claude only | OpenAI, Anthropic, others |
| **Scope** | General automation + code | IDE coding | CLI coding | Git-native coding |
| **MCP ecosystem** | 70+ extensions, deep | Growing | Growing | Limited |
| **Local model support** | Yes (Ollama) | No | No | Yes |
| **Best viewed as** | Vendor-neutral autonomous agent | Best coding IDE | Best CLI coder (Claude) | Commit-focused coder |

## Failure modes

- **No managed hosting.** Runs on user machines only. Teams wanting a cloud-hosted agent need a different tool.
- **BYOK API costs.** No bundled LLM quota. Heavy use of Claude Opus 4.7 or GPT-5.4 accumulates real bills.
- **No built-in long-term memory.** Session state resets unless a memory extension is wired in manually.
- **MCP is a shared standard.** Provider flexibility and MCP are increasingly table-stakes across agent tools, so the moat is narrowing.
- **Non-developer UX gaps.** Configuring providers, extensions, and recipes assumes comfort with env vars, YAML, and a terminal.
- **Organizational transition still in progress.** Move from Block to AAIF/Linux Foundation is recent; some docs and references still reference the original Block URLs.
- **Prompt injection defenses are basic.** Sandbox mode exists, but adversarial inputs can still escape in edge cases. Review tool permissions for production workloads.
- **Desktop app maturity varies by OS.** Linux and macOS lead; Windows parity is improving but trails.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and product details against primary sources, and generates the editorial analysis shown. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against [Goose documentation](https://block.github.io/goose/), the [block/goose GitHub repository](https://github.com/block/goose), and the [Block open-source announcement](https://block.xyz/inside/block-open-source-introduces-codename-goose).

## FAQ

**Who owns Goose?**
Goose was created and open-sourced by Block (Square, Cash App, Tidal) in January 2025. In December 2025, Block contributed the project to the Linux Foundation's Agentic AI Foundation (AAIF), where it is now community-governed. Code still lives at [block/goose](https://github.com/block/goose).

**Is Goose really free?**
Yes. Apache-2.0 open-source, no subscription, no usage fees to Goose. Users pay whichever LLM provider they configure.

**Goose vs Aider or Claude Code for coding?**
Goose is broader: general automation, research, file management, plus coding. Aider is narrower and optimized for code + git commits. [Claude Code](/tools/claude-code/) offers deeper autonomous coding within a codebase but costs $100 to $200 per month and runs only on Anthropic models.

**Which LLMs work with Goose?**
15+ providers including Anthropic, OpenAI, Google Gemini, Mistral, Ollama local models, OpenRouter, Azure, and Bedrock. Provider is a config switch.

**Does Goose support MCP?**
Yes, natively and deeply. 70+ documented MCP extensions cover GitHub, Google Drive, databases, browsers, Slack, and custom APIs.

## Sources

- [Goose GitHub (block/goose)](https://github.com/block/goose): Apache-2.0 license, codebase, governance history
- [Goose documentation](https://block.github.io/goose/): features, extensions, provider support
- [Block open-source announcement](https://block.xyz/inside/block-open-source-introduces-codename-goose): original launch context
- [Agentic AI Foundation](https://www.aaif.dev/): Linux Foundation project handling Goose governance since December 2025

## Related

- **Category:** [AI Automation](/categories/ai-automation/) · [AI Coding](/categories/ai-coding/)
