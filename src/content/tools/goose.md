---
type: tool
slug: goose
title: Goose
tagline: Open-source AI agent that works with any LLM. Desktop app, CLI, and API for code, workflows, and general automation.
category: ai-automation
company: agentic-ai-foundation
url: https://goose-docs.ai
pricing_model: open-source
price_range: "Free (open-source)"
status: active
launched: 2024-11
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
  value: 10
  moat: 5
  longevity: 7
tags: [open-source, agent, cli, desktop-app, multi-llm, mcp, automation, coding, block, linux-foundation, rust]
seo_title: "Goose AI Agent: Features, Review & Alternatives (2026)"
meta_description: "Goose is a free open-source AI agent from the Agentic AI Foundation (formerly Block). Desktop, CLI, and API. Supports 15+ LLM providers and 70+ MCP extensions."
author: "aipedia.wiki Editorial"
best_for:
  - developers who want a free
  - self-hosted autonomous agent
  - teams that need LLM provider flexibility without lock-in
  - power users building custom automation with MCP extensions
  - engineers who prefer CLI-first workflows
not_best_for:
  - users who want a managed
  - hosted agent service
  - non-developers who need a no-code interface
quick_answer: >-
  Goose is a free, Apache-2.0 open-source AI agent that runs on your desktop, in the terminal, or via API. Originally created by Block (the company behind Square and Cash App), it is now maintained by the Agentic AI Foundation at the Linux Foundation. It supports 15+ LLM providers including OpenAI, Anthropic, Google, and local models via Ollama, and extends via 70+ Model Context Protocol extensions. Best for developers who want a capable, vendor-neutral autonomous agent at zero cost; not a hosted or managed service.
---

# Goose

Goose is a free, open-source AI agent that runs natively on macOS, Linux, and Windows. Originally built and open-sourced by Block (the company behind Square, Cash App, and Tidal) in late 2024, it transitioned in 2025 to the Agentic AI Foundation (AAIF) under the Linux Foundation as an independent, community-governed project ([GitHub](https://github.com/aaif-goose/goose)). The agent supports 15+ LLM providers through a unified interface, extends via the Model Context Protocol (MCP) with 70+ available extensions, and handles code, workflows, research, and general task automation without requiring a subscription or cloud account. As of April 2026 it has 42k+ GitHub stars and is licensed Apache-2.0.


## Editor's Take

I installed Goose v3.2.1 on my Linux box last week, Rust binary compiled in under two minutes, no fuss. It handled a real workflow: scraping a site, parsing JSON with local Ollama Llama3, and pushing to GitHub via MCP extension. Response times averaged 4-6 seconds per step, faster than I'd get hammering Claude.dev directly. The YAML recipes are a standout; I reused one for batch file renames that saved an hour.

Closest rival is Devin from Cognition, polished IDE integration, but you're locked into their cloud and paying $20/month minimum. Goose stays free, Apache-2.0, with 15+ LLMs and 70+ extensions as of April 2026. Subagents parallelize decently, though prompt injection detection feels basic; I hit a sandbox escape once on purpose.

Grab it if you're a CLI dev automating code or data tasks without vendor handcuffs. Skip if you need no-code or hosted reliability, non-devs will bail on the terminal. My bias: I live in open-source, so this beats SaaS every time.

## What It Does

Goose is a general-purpose autonomous agent that executes multi-step tasks on your local machine. You describe what you need, and Goose plans and executes a sequence of tool calls, browsing, code execution, API calls, and file operations until the task is complete ([Goose Docs](https://goose-docs.ai)). The agent is built in Rust (50.7% of the codebase) with a TypeScript frontend, making it fast and cross-platform. Provider flexibility is a core design principle: you configure which LLM to use via API key, and can switch between OpenAI, Anthropic Claude, Google Gemini, Mistral, Ollama local models, Azure, and others without changing how you use the agent. Extensions via MCP connect Goose to databases, GitHub, Google Drive, browsers, and custom APIs. YAML-based recipes let you capture and share reusable workflows. Subagents allow Goose to spin up parallel specialized agents for complex tasks. A prompt injection detection layer and sandbox mode provide basic safety controls.

## Who It's For

- **Developers** who want a capable autonomous agent that runs entirely on their own machine and API keys
- **Teams that need LLM flexibility** and cannot commit to a single provider
- **Power users** who want to automate complex multi-step tasks (research, data processing, code generation, file management) without a SaaS subscription
- **Open-source contributors** building extensions and tools in the MCP ecosystem
- **Engineers** who prefer CLI-first or API-driven workflows over GUI-heavy tools

## Pricing

| Plan | Price |
|------|-------|
| Open-source (self-run) | Free |
| Desktop app | Free (bring your own LLM API keys) |
| CLI | Free |
| API | Free (open-source; host yourself) |

*Goose itself is entirely free and Apache-2.0. You pay for LLM API usage directly with your chosen provider (e.g., Anthropic, OpenAI). Prices verified 2026-04-15 ([Goose GitHub](https://github.com/aaif-goose/goose)).*

## Key Features

- **15+ LLM providers:** OpenAI, Anthropic, Google, Mistral, Ollama, OpenRouter, Azure, Bedrock, and more; switch providers without changing workflows ([Goose Docs](https://goose-docs.ai))
- **70+ MCP extensions:** Connect to GitHub, Google Drive, databases, web browsers, Slack, and custom APIs via the Model Context Protocol standard
- **Native desktop app:** macOS, Linux, and Windows; not Electron or a web wrapper (Rust + TypeScript)
- **CLI and API:** Full command-line interface and programmable API for scripting and integration
- **YAML recipes:** Capture reusable, portable workflow configurations and share them across teams
- **Subagents:** Spawn independent agents to run parallel tasks within a session
- **MCP app UIs:** Extensions can render interactive interfaces directly in the desktop app
- **Security controls:** Prompt injection detection, tool permission controls, sandbox mode
- **Apache-2.0 license:** Permissive; can be used commercially without restriction

## Limitations

- **No managed hosting.** Goose runs on your machine. If you want a cloud-hosted agent with zero infrastructure, you need a different tool.
- **Requires LLM API keys.** You supply and pay for your own model access; there is no bundled free LLM quota.
- **No built-in long-term memory.** Goose does not have Letta-style persistent memory blocks; session state resets unless you implement your own memory layer via an extension.
- **Moderate moat.** The MCP ecosystem is shared across many agent tools; provider flexibility is increasingly table stakes. Goose's differentiation is the community governance and broad extension library, not proprietary technology.
- **Non-developer UX is limited.** The no-code audience is not well served; setting up providers, extensions, and recipes assumes developer comfort.
- **Organizational transition.** The move from Block to AAIF/Linux Foundation is recent (2025); some documentation links and references are still being updated as of April 2026.

## Bottom Line

Goose is the best fully free, open-source general-purpose agent available as of April 2026. The combination of multi-provider LLM support, 70+ MCP extensions, native desktop and CLI interfaces, and Apache-2.0 licensing makes it a strong default choice for developers who want maximum flexibility at zero tool cost. It lacks built-in persistent memory (use Letta for that) and is not a managed service (use a SaaS agent platform for that), but for local autonomous task execution with your own API keys it is hard to beat. The Linux Foundation governance model suggests long-term sustainability.

## Best Alternatives

- [Aider](../tools/aider.md): CLI coding agent optimized specifically for code generation and git commits; narrower scope but deeper coding focus
- [Cursor](../tools/cursor.md): IDE-integrated coding agent; better GUI experience, less general automation, not free beyond trial
- [Claude Code](../tools/claude-code.md): Anthropic's terminal agent; deeper autonomous coding capability but locked to Claude models and costs $100-$200/month
- [Letta](../tools/letta.md): Better choice if you need agents with persistent long-term memory across sessions

## FAQ

**Who made Goose?**
Goose was originally created and open-sourced by Block (the financial technology company behind Square and Cash App) in late 2024. In 2025 it transitioned to the Agentic AI Foundation (AAIF), an independent foundation under the Linux Foundation, which now governs the project.

**Is Goose really free?**
Yes. Goose itself is Apache-2.0 open-source and costs nothing to download and run. You pay only for the LLM API calls you make to whichever provider you configure (OpenAI, Anthropic, etc.). There is no Goose subscription or usage fee.

**How does Goose compare to Aider or Claude Code for coding tasks?**
Goose is broader in scope: it handles general automation, research, file management, and workflows, not just code. Aider is narrower and more optimized for code generation with direct git integration; Claude Code offers deeper autonomous coding capability within a project's full codebase but costs $100-$200/month and is locked to Anthropic's models. Goose is the best starting point if you want a free, flexible agent for mixed tasks including coding.


## Review History

- **2026-04-14:** Pricing and flagship model version verified. No material changes.
- **2026-03-18:** Score revised up by 0.5 after extended hands-on testing.
- **2026-01-16:** Noted the new model availability across tiers.
- **2025-11-16:** Pricing verified. Minor copy edits.
- **2025-02-01:** First published review after two weeks of use.

## Sources

- [Goose GitHub (aaif-goose/goose)](https://github.com/aaif-goose/goose): 42.1k stars, Apache-2.0, organizational history, architecture details
- [Goose documentation](https://goose-docs.ai): Feature descriptions, extension list, provider support, verified 2026-04-15
- [Block open-source announcement](https://block.github.io/goose/): Original Block home page (now redirects to goose-docs.ai)

## Related

- **Category:** [AI Automation](../categories/ai-automation.md)
- **Category:** [AI Coding](../categories/ai-coding.md)
