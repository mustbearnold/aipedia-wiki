---
type: tool
slug: claude-code
title: Claude Code
tagline: Anthropic's terminal-based agentic coding CLI. Reads, writes, and runs across full codebases autonomously. Included with Claude Pro at $20/mo; Max tiers scale usage up to 20x.
category: ai-coding
company: anthropic
url: https://code.claude.com
pricing_model: paid
price_range: "$20-$200/month"
status: active
launched: 2025-02
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
  utility: 10
  value: 8
  moat: 9
  longevity: 9
tags: [cli, agentic-coding, terminal, codebase-wide, autonomous, anthropic, claude-opus, ultraplan, monitor, mcp, skills]
seo_title: "Claude Code: Features, Pricing & Review (April 2026)"
meta_description: "Claude Code is Anthropic's CLI agentic coding tool running on Claude Opus 4.7. Reads, writes, and runs across full codebases autonomously. Included with Pro $20/mo; Max 5x $100/mo or Max 20x $200/mo."
author: "aipedia.wiki Editorial"
best_for:
  - professional backend developers
  - teams needing autonomous multi-file refactoring
  - CLI-first workflows with MCP tool integration
  - long-running agentic sessions with checkpointing
not_best_for:
  - users who want IDE integration
  - free-tier developers
  - beginners uncomfortable with the terminal
quick_answer: >-
  Claude Code is Anthropic's terminal-based agentic coding CLI running on Claude Opus 4.7. Pick Max 5x at $100/mo for sustained coding; Pro at $20/mo covers lighter use. Skip for IDE workflows (Cursor, Copilot) or free tooling (Cline).
price_history:
  - date: 2026-04-16
    plan: "Default model"
    price: "Claude Opus 4.7"
    note: "Opus 4.7 released April 16, 2026; new tokenizer produces 1.0-1.35x more tokens vs 4.6."
  - date: 2026-04-15
    plan: "Pro"
    price: "$20/mo"
    note: "Claude Code available on Pro tier as of 2026; previously Max-only."
  - date: 2026-04-17
    plan: "Claude Design handoff"
    price: "Bundled"
    note: "Claude Code now receives production-build bundles from Claude Design (new Pro+ product). Closed loop: prompt -> design -> Claude Code -> working app."
---

# Claude Code

Claude Code is Anthropic's terminal-based agentic coding CLI. It runs inside your shell, reads files across an entire codebase, writes code, executes tests, runs commands, and self-corrects through errors without manual intervention.

Claude Opus 4.7 (released April 16, 2026) is the default backing model. Access is included with Claude Pro at $20/mo and scales through Max 5x at $100/mo and Max 20x at $200/mo. No free tier.

## Recent developments (April-May 2026)

- **May 1:** [The MCP STDIO command-execution flaw reframed MCP server configs as privileged shell-access surfaces](/news/2026-05-03-mcp-stdio-command-execution-flaw/). Claude Code teams should inventory MCP configs, sandbox STDIO tools, and treat config approval as a security event, not a routine plugin install.
- **April 30:** [Claude Security entered public beta for Enterprise codebase scans](/news/2026-04-30-claude-security-public-beta/). It gives Anthropic a first-party vulnerability-review and patch-proposal surface next to Claude Code's terminal agent loop.
- **April 30:** [A coding-agent security roundup warned that attackers keep targeting credentials, not model weights](/news/2026-04-30-ai-coding-agent-credential-security-roundup/). Claude Code teams should treat permissions, command approvals, secrets, and environment separation as first-order security controls.
- **April 30:** [Sources: Anthropic could raise $50B at $900B valuation](/news/2026-04-30-anthropic-50b-900b-valuation-round/). The round would dramatically expand resources for Claude Code's development, compute capacity, and enterprise roadmap, backed by a $30B+ revenue run rate.
- **April 29:** [Agent skill libraries are becoming a coding-agent workflow layer](/news/2026-04-29-agent-skills-ecosystem-github-trending/). Claude Code is one of the clearest beneficiaries because its users already treat local instructions, skills, hooks, and MCP integrations as versioned engineering assets.
- **April 29:** [Anthropic updated its Responsible Scaling Policy around external review](/news/2026-04-29-anthropic-rsp-external-review-update/). Claude Code buyers should track these governance changes because coding agents increasingly operate with filesystem, terminal, and tool permissions.
- **April 27:** [Cursor and Claude were named in a reported PocketOS database-deletion incident](/news/2026-04-27-cursor-claude-database-deletion-incident/). Claude Code users should treat it as a reminder that prompt rules are not a security boundary for production infrastructure.
- **April 25:** [AI News Desk, April 25](/news/2026-04-25-ai-news-catchup/) tied Claude Code's backdrop to GPT-5.5 API access, Copilot distribution, Project Deal, and Google-Anthropic financing.
- **April 24:** [Anthropic and NEC announce a 30,000-employee Claude rollout](/news/2026-04-24-anthropic-nec-ai-engineering-workforce/). Claude Code is part of the partnership surface for software-engineering productivity, alongside Claude and Claude Cowork.
- **April 24:** [Google reportedly plans up to $40B in Anthropic cash and compute investment](/news/2026-04-24-google-anthropic-40b-investment/), expanding the multi-cloud capacity story behind Claude Code if completed.
- **April 21:** [Kimi K2.6 Agent Swarm ships](/news/2026-04-21-moonshot-kimi-k2-6-agent-swarm/) with strong open-weight SWE-bench and HLE-with-tools results, raising the self-hosted baseline Claude Code competes against.
- **April 20:** [Amazon commits up to $25B more to Anthropic](/news/2026-04-20-amazon-anthropic-25b-infrastructure-pact/), adding compute capacity behind Claude and Claude Code workloads.
- **April 17:** [Dario Amodei meets White House Chief of Staff over Mythos](/news/2026-04-17-amodei-white-house-mythos/). Sign of a thaw in Anthropic's federal relationship. Outcome shapes long-term enterprise trajectory for Claude Code + Claude at scale.
- **April 16:** [Systemic MCP vulnerability exposes 200k servers](/news/2026-04-16-mcp-vulnerability-200k-servers/) to arbitrary command execution. Affects every MCP server Claude Code invokes. Treat third-party MCP servers as shell-access risk; prefer first-party or sandbox via container.
- **April 16:** [OpenAI ships Codex Desktop as "super app"](/news/2026-04-16-openai-codex-desktop-super-app/): computer use, memory, gpt-image-2, 90+ plugins, multi-agent. Desktop-agent surface competes directly with Claude Code's CLI-native workflow.
- **April 14:** [Anthropic receiving $800B valuation offers](/news/2026-04-14-anthropic-800b-valuation-offers/), more than double February's $350B round. Supports continued Claude Code investment and enterprise roadmap.
- **April 17:** [Claude Design ships](/news/2026-04-17-anthropic-launches-claude-design/) with a direct handoff path to Claude Code. Design a prototype in Claude Design, then one-click package it into a production-build bundle for Claude Code. Closed loop: prompt → design → working app.
- **April 17:** [Cursor, Windsurf, Zed, Continue, GitHub Copilot all shipped Opus 4.7 support within 24 hours](/news/2026-04-17-opus-4-7-day-two-ide-adoption/) of the Anthropic release. Claude Code itself picked up 4.7 on day zero through the Anthropic SDK.
- **April 16:** [Opus 4.7 ships as default backing model](/news/2026-04-16-anthropic-claude-opus-47/). Takes measurable leads on agentic coding, scaled tool use, and long-context reasoning. New tokenizer = 1.0-1.35x more tokens per input, same $5/$25 per MTok.
- **April 14:** [Claude computer-use agent](/news/2026-04-14-anthropic-claude-computer-use-agent/) expands availability. Available inside Claude Code as research preview.

## System Verdict

> **Pick Claude Code if you run serious multi-file engineering from the terminal.** The agentic loop (plan, execute, validate, self-correct) is the deepest on the market as of April 2026. Opus 4.7 takes measurable leads on agentic coding benchmarks against OpenAI frontier models and Gemini 3.1 Pro. MCP server support, Skills, and Agent SDK hosting turn it into a production agent platform, not just a coding assistant.
>
> **Skip it if you want IDE-integrated coding, visual editing, or a free tier.** [Cursor](/tools/cursor/) at $20/mo owns IDE-integrated AI coding with inline autocomplete and visual diffs. [GitHub Copilot](/tools/github-copilot/) at $10/mo is the cheapest entry for GitHub-centric teams. [Cline](/tools/cline/) is free open-source VS Code with BYOK. Claude Code is CLI-only and demands real terminal comfort.
>
> **Who pays which tier:** Pro $20/mo for light agentic sessions and individual contributors, Max 5x $100/mo for sustained daily coding, Max 20x $200/mo when Claude Code is your primary development tool. API key (BYOK) pay-per-token suits teams building commercial products on top of Claude Code; third-party services routing Claude Code through Max subscriptions are restricted per Anthropic's April 2026 policy.

## Key Facts

| | |
|---|---|
| **Backing model** | Claude Opus 4.7 (released April 16, 2026) · Sonnet 4.6 · Haiku 4.5 selectable |
| **Context window** | 1M tokens (Opus and Sonnet) · 200K (Haiku) |
| **Interface** | Terminal only · no IDE integration · macOS and Linux native · Windows via WSL |
| **Agent loop** | Plan → execute → validate → self-correct · extended thinking on Opus |
| **Ultraplan** | Research preview · cloud-based planning session with web UI revision |
| **Monitor tool** | Background event watcher · streams CI and server events into session |
| **MCP support** | First-class Model Context Protocol server integration |
| **Skills** | Named, configurable workflow shortcuts |
| **Checkpointing** | Save and restore session state during long runs |
| **Pricing** | Pro $20 · Max 5x $100 · Max 20x $200 · API pay-per-token |

Every data point above was verified against vendor sources on 2026-04-17. See Sources.
The enterprise partnership surface was refreshed on 2026-04-24 after Anthropic's NEC announcement.

## What it actually is

A CLI-based agentic coding tool that runs in your shell and treats your entire codebase as context. You describe a task; Claude Code plans the full sequence, reads relevant files, makes coordinated edits across multiple files, runs tests or builds, reads errors, and iterates until the task completes.

Opus 4.7 is the default model. Sonnet 4.6 and Haiku 4.5 are selectable for cost or speed trade-offs. The 1M token context on Opus and Sonnet means real-world codebases load in one session.

Feature surface expanded through 2026. Ultraplan (research preview) launches a cloud-based planning session with a web UI for plan revision, then executes the approved plan from your terminal. The Monitor tool watches CI logs, server output, and running processes and streams events into the active session; paired with `/loop` self-pacing, the agent reacts to live events without manual polling.

MCP (Model Context Protocol) server support makes external tools first-class: configure transport, auth, error handling, and tool search across any MCP-compatible service. Skills package repeatable workflows as named commands. Agent SDK hosting documentation covers deploying Claude Code agents into production pipelines. Checkpointing saves session state for rollback on long runs.

The moats: the agent loop depth no IDE-based competitor matches, Claude Opus 4.7's lead on agentic coding benchmarks, and the MCP + Skills + Agent SDK combination that turns Claude Code into a platform for building production AI pipelines.

## When to pick Claude Code

- **You run multi-file refactors, migrations, or large test-driven work.** Agent loop self-corrects through failed tests until the task completes, often without human intervention.
- **You already pay for Claude Pro or Max.** Claude Code is included; there is no separate Claude Code subscription.
- **You need MCP tool integration.** First-class MCP server support beats every IDE-integrated competitor on external tool plumbing.
- **You build production AI agents.** Agent SDK hosting and Skills support ship the work beyond personal use.
- **You work backend or infrastructure.** Terminal-native workflows fit naturally. No context-switch into a GUI.
- **Your codebase is large.** The 1M context on Opus 4.7 loads real-world repos in one session, no chunking required.

## When to pick something else

- **IDE-integrated AI coding:** [Cursor](/tools/cursor/) at $20/mo. Visual diffs, inline autocomplete, and a VS Code-familiar interface.
- **Cheapest GitHub-centric entry:** [GitHub Copilot](/tools/github-copilot/) at $10/mo with Claude Opus agent mode.
- **Free open-source option:** [Cline](/tools/cline/). VS Code agent, BYOK for models. No fixed subscription.
- **Autonomous cloud coding:** [Devin](/tools/devin/) or similar cloud-only agents if you want runs without a local terminal.
- **GUI-only users:** Cursor, [Windsurf](/tools/windsurf/), or Zed AI. Claude Code has no visual mode.

## Pricing

Subscription pricing via [claude.com/pricing](https://claude.com/pricing). Claude Code is not sold separately; access comes with a Claude subscription tier or an API key.

| Plan | Price | Claude Code access | Who's it for |
|------|-------|--------------------|--------------|
| Free | $0 | **Not included** | N/A for Claude Code |
| Pro | $20/mo ($17 annual) | Included · light usage | Individual contributors, lighter sessions |
| Max 5x | $100/mo | 5x Pro usage limits | **Most daily coders should land here** |
| Max 20x | $200/mo | 20x Pro usage limits | Primary dev tool, sustained agentic workloads |
| Team (Premium) | $100/seat/mo | Premium seats only, 5-seat minimum | Teams standardizing on Claude Code |
| API (BYOK) | Pay-per-token | Unrestricted | Commercial products built on Claude Code |

*Prices verified 2026-04-17 via [Anthropic pricing](https://claude.com/pricing) and [Claude Code docs](https://code.claude.com/docs/en/overview). Pro users see lower rate ceilings than Max tiers; heavy agentic workloads should price against Max. Third-party services routing Claude Code through Max subscriptions are restricted per Anthropic's April 2026 policy; use API key path for commercial redistribution.*

## Against the alternatives

| | Claude Code | Cursor | GitHub Copilot |
|---|---|---|---|
| **Interface** | Terminal only | VS Code fork | VS Code / JetBrains / Neovim |
| **Backing model** | Opus 4.7 / Sonnet 4.6 / Haiku 4.5 | Opus 4.7 / OpenAI frontier models / Gemini 3.1 | Opus 4.7 agent mode, OpenAI frontier models |
| **Context depth** | 1M tokens (Opus) | Depends on model | Depends on model |
| **Agent autonomy** | **Deepest** · full agentic loop | Strong · IDE-bounded | Growing · agent mode added |
| **MCP support** | **First-class** | Emerging | Limited |
| **Entry price** | $20/mo (Pro) | $20/mo (Pro) | $10/mo |
| **Free tier** | None | Limited | None for full features |
| **Best viewed as** | CLI agentic platform | IDE AI assistant | GitHub-centric copilot |

## Failure modes

- **No IDE or GUI.** Terminal-only. No inline autocomplete, no visual diff, no syntax highlighting. Cursor or Cline if IDE integration matters.
- **No free tier.** Requires Pro at minimum. API key access still costs money from the first token.
- **Rate limits not fully published.** Pro caps hit faster than Max; Max 20x is the only tier with published "primary tool all day" framing. Heavy users discover limits by hitting them.
- **Opus 4.7 tokenizer bump.** Same per-token rate as 4.6 but 1.0-1.35x more effective tokens. API workloads need re-benchmarking before migrating.
- **MCP STDIO is privileged execution.** The May 1 [MCP STDIO disclosure](/news/2026-05-03-mcp-stdio-command-execution-flaw/) means third-party MCP server configs should be reviewed like shell scripts and sandboxed before use.
- **Ultraplan is research preview.** Cloud planning is not production-ready and may change or be removed.
- **Windows support is WSL only.** Native Windows is unsupported; WSL works but adds setup friction.
- **Session context limits on long runs.** Even 1M tokens fills on sustained sessions. Checkpointing helps but does not eliminate the ceiling.
- **Third-party subscription restrictions.** Commercial products cannot route Claude Code through a Max subscription. API key (BYOK) path is required for redistribution.
- **Computer Use inside Claude Code is research preview.** Not production-ready and not available in claude.ai chat.
- **No IDE refactoring visualization.** Agent explains what it did after the fact. Users who prefer reviewing proposed changes before they commit should use Cursor.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and feature details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-24 against [Claude Code docs](https://code.claude.com/docs/en/overview), [Anthropic pricing](https://claude.com/pricing), [Claude Code llms.txt](https://code.claude.com/llms.txt), the [Opus 4.7 release coverage](https://www.anthropic.com/news/claude-opus-4-7), and the [NEC partnership](/news/2026-04-24-anthropic-nec-ai-engineering-workforce/).

## FAQ

**Is Claude Code free?**
No. Claude Code is not included in the free Claude tier. Access requires a Claude Pro subscription ($20/mo), Max 5x ($100/mo), Max 20x ($200/mo), or an Anthropic API key with pay-per-token billing ([Claude Code pricing](https://claude.com/pricing)).

**What model does Claude Code run on?**
Claude Opus 4.7 is the default backing model as of April 16, 2026. Sonnet 4.6 and Haiku 4.5 are selectable for cost or speed trade-offs. The 1M token context window applies to Opus and Sonnet.

**What is Ultraplan?**
A research preview feature that launches a cloud-based planning session with a web UI. Claude auto-creates a default environment, presents a plan for revision, and then executes the approved plan from your terminal. Not production-ready.

**What is the Monitor tool?**
A background event watcher that streams CI logs, server events, and process output into an active Claude Code session. Combined with `/loop` self-pacing, the agent reacts to live events in real time rather than requiring manual copy-paste.

**What operating systems does Claude Code support?**
macOS and Linux natively. Windows users run it via WSL (Windows Subsystem for Linux). Native Windows support is not documented.

**Claude Code vs Cursor?**
Claude Code is terminal-only with deeper autonomous execution across full codebases; both support Opus 4.7. Cursor is a VS Code fork with IDE features, visual editing, and inline autocomplete at $20/mo. For pure autonomous multi-file engineering, Claude Code is stronger. For day-to-day coding inside a familiar editor, Cursor wins.

## Sources

- [Claude Code docs](https://code.claude.com/docs/en/overview): Feature reference, setup, and agent documentation
- [Claude Code llms.txt](https://code.claude.com/llms.txt): Full capability manifest
- [Anthropic pricing](https://claude.com/pricing): Max plan prices and tier access
- [Opus 4.7 release](https://www.anthropic.com/news/claude-opus-4-7): Backing model details

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
- **Comparisons:** [Cursor vs Claude Code vs Copilot](/compare/cursor-vs-claude-code-vs-copilot/) · [Claude Code vs GitHub Copilot](/compare/claude-code-vs-github-copilot/) · [Claude Code vs Devin](/compare/claude-code-vs-devin/) · [Aider vs Claude Code](/compare/aider-vs-claude-code/) · [Claude Code vs Continue](/compare/claude-code-vs-continue/)
