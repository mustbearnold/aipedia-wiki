---
type: tool
slug: cline
title: Cline
tagline: Open-source AI coding agent for VS Code with Plan/Act modes, terminal execution, browser automation, and bring-your-own-key model support. 60K+ GitHub stars.
category: ai-coding
company: cline
url: https://cline.bot/
pricing_model: open-source
price_range: "Free (open-source, BYOK API costs)"
status: active
launched: 2024-07
last_updated: 2026-04-15
last_verified: 2026-04-15
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
  moat: 4
  longevity: 7
tags: [open-source, vscode, byok, plan-act-mode, mcp, terminal-execution, browser-automation, checkpoints, cursor-alternative, claude-dev]
seo_title: "Cline: Features, Pricing & Review (2026)"
meta_description: "Cline is a free open-source AI coding agent for VS Code (formerly Claude Dev) with 60K+ GitHub stars, Plan/Act modes, MCP tool creation, and support for Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro, and local models. No subscription required."
author: "aipedia.wiki Editorial"
best_for:
  - VS Code developers who want an autonomous coding agent
  - developers who want to avoid a monthly subscription
  - power users who want to control which AI model they use
  - teams building custom MCP tools for their workflow
not_best_for:
  - developers on JetBrains who want the richest experience (support is newer)
  - users wanting a zero-setup managed subscription with guardrails
  - beginners who need hand-holding rather than autonomous execution
quick_answer: >-
  Cline is a free, open-source VS Code extension (formerly Claude Dev) that acts as an autonomous coding agent inside your IDE. It creates and edits files, runs terminal commands, automates browsers via Claude's Computer Use capability, and builds custom MCP tools. You bring your own API key for Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro, or any local model; the extension itself costs nothing. With 60,300+ GitHub stars and 5 million+ installations as of April 2026, it is the most-adopted open-source coding agent in VS Code. Plan mode lets you review and revise the agent's approach before any code is written; Act mode runs autonomously with approval checkpoints. Compared to Cursor, Cline costs nothing beyond API usage and is more transparent about what it executes, but lacks Cursor's built-in subscription model and polished UX for non-technical users.
---

# Cline

Cline is a free, open-source AI coding agent for VS Code, formerly known as Claude Dev. It runs autonomously inside your editor: it reads your codebase, writes and edits files, runs terminal commands, controls a browser, and creates custom MCP tools -- all with human approval gates at each step ([cline.bot](https://cline.bot/)). The extension itself costs nothing; you supply an API key for whichever model you prefer. With 60,300+ GitHub stars and 5 million+ installs across VS Code and JetBrains as of April 2026, it is the most widely adopted open-source coding agent available for IDE integration ([GitHub: cline/cline](https://github.com/cline/cline)). Enterprise users include Samsung, Salesforce, Oracle, Amazon, and Microsoft.

## What It Does

Cline extends VS Code into an autonomous coding agent that can handle complex multi-file engineering tasks from a single natural language instruction ([cline.bot](https://cline.bot/)). The agent:

- **Reads your codebase:** uses file access, glob search, and context commands (@file, @folder, @url, @problems) to gather relevant context before acting
- **Writes and edits files:** creates new files or modifies existing ones, showing diffs for review before applying
- **Executes terminal commands:** runs builds, tests, installs, and scripts in your terminal; can proceed while long-running processes continue in the background
- **Automates browsers:** leverages Claude's Computer Use to launch a browser, interact with elements, capture screenshots, and debug visual or runtime errors
- **Builds MCP tools on demand:** if you need a custom integration (e.g., Jira, AWS, a private API), you can ask Cline to create and install an MCP server for it
- **Maintains checkpoints:** takes workspace snapshots so you can compare or roll back to any prior state during a session

## Who It's For

- **VS Code developers** who want the most capable open-source coding agent without a monthly subscription
- **BYOK users** who already pay for API access (Claude, OpenAI, Gemini, Bedrock, Vertex) and want to route usage through their own account
- **Engineering teams** who want transparency and approval gates on every file edit and command, rather than trusting a fully autonomous background agent
- **Builders** who want to extend the agent with custom MCP tools for their specific workflow
- **Organizations** with data-handling requirements that preclude sending code to a third-party hosted service

## Pricing

| Tier | Cost | Notes |
|------|------|-------|
| Cline extension | Free | MIT-licensed, VS Code Marketplace and Open VSX |
| API costs | Usage-based | Varies by model; Claude Opus 4.6 ~$3/MTok input, GPT-5.4 ~$5/MTok input; typical session $0.50-$5 |

There is no Cline subscription. All costs are the AI model API usage you generate. For light use with a cheap model (e.g., Claude Haiku or a local Ollama model), monthly spend can be under $5 ([cline.bot](https://cline.bot/)).

## Key Features

- **Plan/Act dual modes:** Plan mode generates and displays a step-by-step implementation plan for your review before writing a line; Act mode executes with approval checkpoints at each significant step ([cline.bot](https://cline.bot/))
- **Bring-your-own-key model support:** Anthropic (Claude Opus 4.6), OpenAI (GPT-5.4), Google Gemini (Gemini 3.1 Pro), AWS Bedrock, Azure OpenAI, GCP Vertex, OpenRouter, Cerebras, Groq, and any OpenAI-compatible API; local models via LM Studio or Ollama
- **MCP (Model Context Protocol):** first-class support for creating custom tools at runtime; ask Cline to build a Jira MCP server and it installs it, no manual configuration required
- **Terminal integration:** executes commands in your VS Code integrated terminal with full output visibility and "Proceed While Running" for non-blocking background tasks
- **Browser automation:** Claude Computer Use enables clicks, scrolls, form fills, and screenshot capture for front-end debugging
- **Checkpoint system:** workspace snapshots at each significant step; compare before/after states and restore to any prior point
- **Context management:** @url, @problems, @file, @folder commands to precisely scope what context the agent receives, preventing context window overflow
- **Proactive error fixing:** monitors for compiler errors and import issues and proposes fixes before you notice them
- **60,300+ GitHub stars, 5M+ installs:** large community, active plugins, and enterprise adoption ([GitHub: cline/cline](https://github.com/cline/cline))

## Limitations

- **API costs are on you.** Heavy use with frontier models (Claude Opus 4.6, GPT-5.4) can cost $20-$50/month or more. No usage caps or cost guardrails are built in.
- **VS Code primary.** JetBrains support (IntelliJ, PyCharm, WebStorm) and a CLI exist but are newer and less mature than the VS Code extension.
- **No built-in model subscription.** Unlike Cursor, there is no bundled model access; you set up and manage API keys yourself.
- **Autonomous execution risk.** In Act mode with broad permissions, the agent can make extensive changes before human review. Plan mode mitigates this but adds friction.
- **Low moat as open-source.** Architecture is fully public; any IDE maker or competing extension can replicate the approach.
- **Context limits on large repos.** Very large codebases can exceed model context limits; context management commands help but do not eliminate the issue.
- **No cloud sync or team features.** Cline is a local extension; there is no shared workspace, team dashboard, or centralized audit log.

## Bottom Line

Cline is the best open-source VS Code coding agent for developers who want autonomous capability at zero fixed cost. Plan/Act modes offer more control transparency than most competitors, and the BYOK model means you are not locked into any single AI provider. Compared to [Cursor](cursor.md) ($20/month), Cline costs nothing beyond API usage and is more transparent, but Cursor has a more polished UX and integrated model subscription that removes setup friction. Compared to [Claude Code](claude-code.md) ($100-$200/month), Cline has IDE integration Cursor and Claude Code lack, though Claude Code's agentic depth on very complex multi-file tasks is higher. For pure autonomous software engineering (write the whole feature and open a PR), [OpenHands](openhands.md) is a better fit than Cline.

## Best Alternatives

- [Cursor](cursor.md): polished IDE fork with built-in model subscription at $20/month, better UX for non-technical users, less transparent execution
- [Claude Code](claude-code.md): Anthropic's CLI agent, deeper autonomous capability, $100-$200/month, terminal only
- [OpenHands](openhands.md): open-source autonomous software engineer in Docker sandbox, better for full task delegation than interactive pair-programming
- GitHub Copilot: $10/month, inline autocomplete plus basic agent mode, lower setup friction but less capable for complex tasks

## FAQ

**Is Cline free?**
The Cline extension is free and open-source (MIT license). You pay only for the AI model API calls you make. There is no Cline subscription.

**What was Cline called before?**
Cline was originally released as Claude Dev in mid-2024. It was renamed to Cline to reflect its model-agnostic support for Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro, and local models.

**How does Cline's Plan mode work?**
In Plan mode, Cline analyzes your codebase and task, then generates a step-by-step implementation plan displayed for your review. You can edit, approve, or reject the plan before any code is written. This gives you control over the agent's approach before it takes action.

**Can Cline work with local models?**
Yes. Cline supports local models via LM Studio and Ollama. Running a local model eliminates API costs entirely, though capability will be lower than frontier models.

**How does Cline compare to Cursor?**
Cline is free (you pay API costs), open-source, and runs inside standard VS Code. Cursor is a paid VS Code fork ($20/month Pro) with a bundled model subscription and a more polished UX. Cline gives you more control over the model and execution; Cursor gives you less setup friction. For teams with strong VS Code workflows who want to minimize fixed costs, Cline is the better choice.

**What is MCP and why does it matter in Cline?**
Model Context Protocol (MCP) is an open standard for extending AI agents with custom tools. In Cline, you can ask the agent to build an MCP server for any integration (Jira, AWS, a private API) and it will create and install the server automatically, giving you a repeatable tool for future sessions.

## Sources

- [Cline official site](https://cline.bot/)
- [Cline GitHub repository](https://github.com/cline/cline)
- [VS Code Marketplace listing](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)

## Related

- **Category:** [AI Coding](../categories/ai-coding.md)
