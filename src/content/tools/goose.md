---
type: tool
slug: goose
title: Goose
tagline: Open-source AI agent originally from Block, now governed by the Linux Foundation's Agentic AI Foundation. Desktop, CLI, and API across 15+ LLM providers with 70+ MCP extensions.
category: ai-automation
company: agentic-ai-foundation
url: https://goose-docs.ai/
github_url: https://github.com/aaif-goose/goose
pricing_model: open-source
price_range: "Free (Apache-2.0; BYOK LLM costs)"
status: active
launched: 2025-01
last_updated: 2026-06-25
last_verified: 2026-06-25
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
facts:
  best_for:
    value: Best for developers who want an open-source, extensible local AI agent that can operate across coding and computer
      tasks.
    source: https://github.com/aaif-goose/goose
    source_label: Goose GitHub repository
    source_id: goose-releases
    verified_at: '2026-06-25'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
  pricing_anchor:
    value: Goose itself is open source; practical cost comes from chosen model providers, local/remote execution, and any surrounding
      infrastructure.
    source: https://github.com/aaif-goose/goose
    source_label: Goose GitHub repository
    source_id: goose-repository
    verified_at: '2026-06-25'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
  open_source_or_local:
    value: The repository and release feed are the authoritative sources for license, installation, v1.38.0 release status, extensions, and project activity.
    source: https://github.com/aaif-goose/goose/releases
    source_label: Goose GitHub releases
    source_id: goose-repository
    verified_at: '2026-06-25'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  runtime_architecture:
    value: Goose should be evaluated as an extensible agent runtime; check provider setup, extension permissions, MCP/tooling
      behavior, and local security posture.
    source: https://goose-docs.ai/
    source_label: Goose documentation
    source_id: goose-official
    verified_at: '2026-06-25'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
  watch_out_for:
    value: 'Open-source agent power comes with risk: require sandboxing, secrets hygiene, review checkpoints, and clear provider-cost
      controls before daily-driver use.'
    source: https://github.com/aaif-goose/goose
    source_label: Goose GitHub repository
    source_id: goose-repository
    verified_at: '2026-06-25'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
tags: [open-source, agent, cli, desktop-app, multi-llm, mcp, automation, coding, block, linux-foundation, rust, aaif, apache-2]
seo_title: "Goose AI Agent: Features, Review & Alternatives (June 2026)"
meta_description: "Goose is the free Apache-2.0 AI agent originally from Block and now under AAIF governance. Desktop, CLI, and API with 15+ LLM providers, MCP extensions, and the aaif-goose/goose repo."
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
    source: "https://github.com/aaif-goose/goose"
    source_label: "Source"
    source_id: goose-pricing
    verified_at: 2026-06-25
    note: "Block contributed Goose to the Linux Foundation's Agentic AI Foundation (AAIF)."
  - date: 2026-04-17
    plan: "Open-source"
    price: "Free"
    source: "https://github.com/aaif-goose/goose"
    source_label: "Source"
    source_id: goose-pricing
    verified_at: 2026-06-25
    note: "Verified unchanged. Apache-2.0, BYOK LLM costs."
  - date: 2026-06-02
    plan: "Open-source"
    price: "Free"
    source: "https://github.com/aaif-goose/goose"
    source_label: "Source"
    source_id: goose-pricing
    verified_at: 2026-06-25
    note: "Verified unchanged. Apache-2.0, BYOK LLM costs. Repository now resolves to aaif-goose/goose."
  - date: 2026-06-23
    plan: "Open-source"
    price: "Free"
    source: "https://github.com/aaif-goose/goose/releases"
    source_label: "Goose GitHub releases"
    source_id: goose-pricing
    verified_at: 2026-06-25
    note: "Verified unchanged. Apache-2.0, BYOK LLM costs. Latest GitHub release shown as v1.38.0 from June 17, 2026."
---

# Goose

Free, Apache-2.0 AI agent originally open-sourced by Block (the company behind Square, Cash App, and Tidal) in January 2025. In December 2025, Block contributed Goose to the Linux Foundation's Agentic AI Foundation (AAIF). The code now lives under the [aaif-goose/goose](https://github.com/aaif-goose/goose) repository, with v1.38.0 shown as the latest GitHub release checked on June 25, 2026.

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
| **GitHub stars** | 50,000+ as of June 2026 |
| **Pricing** | Free. Users pay their own LLM costs |

Every data point above was verified against vendor documentation on 2026-06-25. See Sources.

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

*Goose itself is Apache-2.0 and free. Users pay the LLM provider directly. Verified 2026-06-25 via [GitHub releases](https://github.com/aaif-goose/goose/releases), the [repository](https://github.com/aaif-goose/goose), and the [current Goose docs](https://goose-docs.ai/).*

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
- **BYOK API costs.** No bundled LLM quota. Heavy use of Claude, OpenAI, or other frontier providers accumulates real bills.
- **No built-in long-term memory.** Session state resets unless a memory extension is wired in manually.
- **MCP is a shared standard.** Provider flexibility and MCP are increasingly table-stakes across agent tools, so the moat is narrowing.
- **Non-developer UX gaps.** Configuring providers, extensions, and recipes assumes comfort with env vars, YAML, and a terminal.
- **Organizational transition still in progress.** Move from Block to AAIF/Linux Foundation is recent; some docs and references still reference the original Block URLs.
- **Prompt injection defenses are basic.** Sandbox mode exists, but adversarial inputs can still escape in edge cases. Review tool permissions for production workloads.
- **Desktop app maturity varies by OS.** Linux and macOS lead; Windows parity is improving but trails.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and product details against primary sources, and generates the editorial analysis shown. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-25 against [Goose documentation](https://goose-docs.ai/), the [aaif-goose/goose GitHub repository](https://github.com/aaif-goose/goose), [Goose releases](https://github.com/aaif-goose/goose/releases), and the [Block open-source announcement](https://block.xyz/inside/block-open-source-introduces-codename-goose).

## FAQ

**Who owns Goose?**
Goose was created and open-sourced by Block (Square, Cash App, Tidal) in January 2025. In December 2025, Block contributed the project to the Linux Foundation's Agentic AI Foundation (AAIF), where it is now community-governed. Code now lives at [aaif-goose/goose](https://github.com/aaif-goose/goose).

**Is Goose really free?**
Yes. Apache-2.0 open-source, no subscription, no usage fees to Goose. Users pay whichever LLM provider they configure.

**Goose vs Aider or Claude Code for coding?**
Goose is broader: general automation, research, file management, plus coding. Aider is narrower and optimized for code + git commits. [Claude Code](/tools/claude-code/) offers deeper autonomous coding within a codebase but costs $100 to $200 per month and runs only on Anthropic models.

**Which LLMs work with Goose?**
15+ providers including Anthropic, OpenAI, Google Gemini, Mistral, Ollama local models, OpenRouter, Azure, and Bedrock. Provider is a config switch.

**Does Goose support MCP?**
Yes, natively and deeply. 70+ documented MCP extensions cover GitHub, Google Drive, databases, browsers, Slack, and custom APIs.

## Sources

- [Goose GitHub (aaif-goose/goose)](https://github.com/aaif-goose/goose): Apache-2.0 license, codebase, governance history
- [Goose releases](https://github.com/aaif-goose/goose/releases): current release status
- [Goose documentation](https://goose-docs.ai/): desktop, CLI, API, extensions, and provider support
- [Block open-source announcement](https://block.xyz/inside/block-open-source-introduces-codename-goose): original launch context
- [Agentic AI Foundation](https://www.aaif.dev/): Linux Foundation project handling Goose governance since December 2025

## Related

- **Category:** [AI Automation](/categories/ai-automation/) · [AI Coding](/categories/ai-coding/)
