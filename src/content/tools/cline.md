---
type: tool
slug: cline
title: Cline
tagline: Free open-source autonomous coding agent for VS Code and JetBrains. Plan/Act modes, MCP tool creation, full BYOK model choice.
category: ai-coding
company: cline
url: https://cline.bot/
github_url: https://github.com/cline/cline
pricing_model: open-source
price_range: "Free (BYOK API costs)"
status: active
launched: 2024-07
last_updated: 2026-05-03
last_verified: 2026-05-03
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
tags: [open-source, vscode, jetbrains, byok, plan-act-mode, mcp, terminal-execution, browser-automation, checkpoints, cursor-alternative, claude-dev]
seo_title: "Cline: Features, Pricing & Review (April 2026)"
meta_description: "Cline is a free open-source AI coding agent for VS Code and JetBrains (formerly Claude Dev). Plan/Act modes, MCP tool creation, BYOK for Claude Opus 4.7, OpenAI frontier models, Gemini, or local models. No subscription. Verified April 2026."
author: "aipedia.wiki Editorial"
best_for:
  - VS Code or JetBrains devs wanting autonomous agents without a subscription
  - BYOK users already paying for API access
  - teams building custom MCP tools
  - privacy-sensitive workflows via local models
not_best_for:
  - zero-setup plug-and-play users
  - beginners needing hand-holding
  - teams requiring centralized cloud dashboards
quick_answer: >-
  Pick Cline for a free, open-source agentic coding extension with Plan/Act modes and full BYOK model choice. Skip it if a managed subscription with guardrails fits better, in which case Cursor or GitHub Copilot are simpler day one.
price_history:
  - date: 2024-07-01
    plan: "Extension"
    price: "Free (MIT)"
    note: "Launched as Claude Dev, renamed Cline for model-agnostic support"
  - date: 2026-04-15
    plan: "Extension"
    price: "Free (MIT)"
    note: "Verified unchanged. BYOK API costs remain the only spend."
---

# Cline

A free open-source AI coding agent for VS Code and JetBrains, formerly known as Claude Dev. Runs autonomously inside the IDE: reads the codebase, writes and edits files, runs terminal commands, controls a browser, and builds custom MCP tools with approval gates at each step.

The extension itself costs nothing. Bring your own API key for Claude Opus 4.7, OpenAI frontier models, Gemini 3.1 Pro, or a local model via Ollama.

## System Verdict

> **Pick Cline if you want a capable autonomous agent inside VS Code or JetBrains with no subscription and full model choice.** Plan mode shows the approach before any code is written; Act mode executes with explicit approval at every significant step.
>
> 60,300+ GitHub stars and 5M+ installs. Reported enterprise use at Samsung, Salesforce, Oracle, Amazon, and Microsoft.
>
> **Skip it for zero-setup usage or centralized team dashboards.** [Cursor](/tools/cursor/) bundles a model subscription and more polished UX. [GitHub Copilot](/tools/github-copilot/) has the lowest setup friction for individuals.
>
> **Who pays what:** Extension is free. API costs land on your provider bill. Light use on Haiku 4.5 or a local model can run under $5/month; heavy Opus 4.7 use can reach $20-$50/month on frontier-heavy sessions.

## Key Facts

| | |
|---|---|
| **License** | MIT, open source |
| **Primary IDE** | VS Code · JetBrains (IntelliJ, PyCharm, WebStorm) · CLI |
| **Modes** | Plan (read-only planning) · Act (execution with approval gates) |
| **BYOK providers** | Anthropic · OpenAI · Google · AWS Bedrock · Azure OpenAI · GCP Vertex · OpenRouter · Cerebras · Groq |
| **Local models** | LM Studio · Ollama · any OpenAI-compatible API |
| **MCP support** | First-class, runtime MCP server creation |
| **Terminal execution** | Yes, with Proceed While Running for non-blocking tasks |
| **Browser automation** | Yes, via Claude Computer Use |
| **Checkpoints** | Workspace snapshots at each significant step |
| **GitHub stars** | 60,300+ · 5M+ installs |

Every data point above was verified against vendor documentation on 2026-04-17. See Sources.

## What it actually is

An open-source VS Code and JetBrains extension that turns the IDE into an autonomous coding agent. Plan mode is read-only: Cline analyzes the task, explores the codebase, and proposes an approach without modifying anything. Act mode executes, with user approval required for every significant step.

Context commands scope what the agent sees: @file, @folder, @url, @problems. Terminal commands run in the integrated terminal with full output visibility. Browser automation runs through Claude's Computer Use (clicks, scrolls, form fills, screenshots).

MCP support is first-class. Ask Cline to build a Jira MCP server and it creates, installs, and registers the server for you. Checkpoints snapshot the workspace so rollback to any prior state is one click.

BYOK is total. Any Anthropic, OpenAI, or Google API key works. AWS Bedrock, Azure OpenAI, GCP Vertex, OpenRouter, Cerebras, Groq, and any OpenAI-compatible endpoint route cleanly. Local models via LM Studio or Ollama cost nothing beyond hardware.

## When to pick Cline

- **You want an autonomous coding agent without a monthly subscription.** Extension is free, costs match API usage.
- **You already pay for API access.** Route usage through your existing Anthropic, OpenAI, or Google account.
- **You need transparent approval gates.** Every file edit and terminal command waits for explicit approval in Act mode.
- **You want custom MCP tools for your stack.** Jira, AWS, private APIs: ask Cline to build the MCP server and it handles the rest.
- **Data residency matters.** Pair Cline with a local Ollama model to keep code entirely on-device.

## When to pick something else

- **Polished IDE with bundled models:** [Cursor](/tools/cursor/) at $20/mo. Less setup, more design polish.
- **Lightest-weight inline autocomplete:** [GitHub Copilot](/tools/github-copilot/) at $10/mo.
- **Terminal-first agentic runs:** [Claude Code](/tools/claude/) CLI. Deeper agentic capability on complex multi-file tasks.
- **CLI-first open source with git-commit transparency:** [Aider](/tools/aider/). Free, BYOK, auto-commits every change.
- **Async ticket delegation:** [Devin](/tools/devin/). Hand a ticket off, review the PR.

## Pricing

| Tier | Cost | Notes |
|------|------|-------|
| Cline extension | Free | MIT license · VS Code Marketplace · Open VSX |
| API costs | Usage-based | Varies by model and session length |
| Local models | $0 | Via LM Studio or Ollama |

Typical session costs on BYOK (verified 2026-04-17):

| Model | Typical session | Notes |
|-------|-----------------|-------|
| Claude Haiku 4.5 | Pennies to under $1 | Fastest, cheapest |
| Claude Opus 4.7 | $0.50-$5 | Best multi-file quality |
| OpenAI frontier models | $0.50-$5 | Strong alternative |
| Gemini 3.1 Pro | $0.02-$2 | Long context, lowest cost tier |
| Ollama (local) | $0 | Hardware-bound quality |

*Costs verified 2026-04-17 via vendor API pricing pages. Light use can run under $5/month; heavy Opus 4.7 use can reach $20-$50/month.*

## Against the alternatives

| | Cline | Cursor Pro | Claude Code (Max 5x) |
|---|---|---|---|
| **Price** | Free + BYOK API | $20/mo flat | $100/mo flat |
| **Form factor** | Extension in VS Code / JetBrains | VS Code fork | Terminal CLI |
| **Model choice** | Any BYOK provider | Mostly bundled | Claude-only |
| **MCP support** | Runtime build + install | Partial | MCP registry |
| **Approval gates** | Plan/Act · explicit per step | Partial | Transcript-level |
| **Best viewed as** | Free agentic IDE layer | Polished default IDE | Strongest CLI agent |

## Failure modes

- **API costs are on you.** No built-in usage caps or guardrails. Heavy frontier-model sessions can compound quickly.
- **VS Code gets priority over JetBrains and CLI.** JetBrains and the CLI exist but lag the VS Code extension on feature parity.
- **No bundled model subscription.** Setup requires API keys, account configuration, and provider routing. Not plug-and-play.
- **Autonomous execution risk.** Act mode with broad permissions makes real changes fast. Plan mode mitigates this but adds friction.
- **Open-source moat is low.** Architecture is public. Any IDE maker can replicate the approach.
- **Context limits on very large repos.** Context management commands help. Monorepos still need careful scoping.
- **No team dashboard or audit log.** Cline is a local extension. No shared workspace, centralized logs, or team-wide policy.
- **Browser automation depends on Computer Use.** Requires a Claude model and is still evolving. Flakier than core coding flows.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against [cline.bot](https://cline.bot/), [Cline docs](https://docs.cline.bot/introduction/overview), the [Cline GitHub repo](https://github.com/cline/cline), and the [VS Code Marketplace listing](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev).

## FAQ

**Is Cline free?**
The extension is free and MIT-licensed. You pay only for the API calls to your chosen provider. A local Ollama model brings total cost to zero.

**What was Cline called before?**
It launched as Claude Dev in mid-2024. Renamed to Cline to reflect model-agnostic support for Claude, OpenAI frontier models, Gemini 3.1 Pro, and local models.

**How does Plan mode work?**
Plan mode is read-only. Cline analyzes the codebase and task, then generates a step-by-step plan for your review. No code is written until you approve and switch to Act mode.

**Can Cline run fully offline?**
Yes. Configure Cline with a local Ollama or LM Studio model. Code stays on-device; no API calls leave your machine.

**What is MCP and why does it matter here?**
Model Context Protocol is an open standard for extending AI agents with custom tools. In Cline you can ask for a Jira or AWS MCP server and the agent will build, install, and register it automatically.

**Cline vs Cursor, which should I pick?**
Cursor is a polished VS Code fork with a bundled model subscription and less setup work. Cline is a free extension with full BYOK flexibility and transparent Plan/Act approval gates. Pick Cursor for out-of-the-box polish; pick Cline to minimize fixed costs and keep model choice open.

## Sources

- [cline.bot](https://cline.bot/): product features, documentation, and release notes
- [Cline docs: overview](https://docs.cline.bot/introduction/overview): Plan/Act modes and MCP setup
- [GitHub: cline/cline](https://github.com/cline/cline): source code, stars, community
- [VS Code Marketplace listing](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev): installs and ratings

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
- **Comparisons:** [Claude vs Cline](/compare/claude-vs-cline/) · [Cline vs Cursor](/compare/cline-vs-cursor/)
