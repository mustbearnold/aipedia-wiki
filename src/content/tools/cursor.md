---
type: tool
slug: cursor
title: Cursor
tagline: AI-native code editor on a VS Code fork. Claude Opus 4.7, GPT-5.5, Gemini 3.1 Pro, and Cursor's own Composer 2 are first-class. Cursor 3.0 (April 2, 2026) turns the editor into an Agents Window for orchestrating fleets of parallel agents.
category: ai-coding
company: anysphere
url: https://cursor.com
pricing_model: freemium
price_range: "$0-$200/month"
status: active
launched: 2023-03
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
  value: 8
  moat: 7
  longevity: 9
facts:
  flagship_model:
    value: "Claude Opus 4.7, GPT-5.5, Gemini 3.1 Pro, Composer 2"
    source: "/tools/cursor/"
    source_label: "AIpedia Cursor review"
    verified_at: 2026-04-23
  coding_agent:
    value: "Agents Window, Cloud Agents, Composer 2, and Bugbot add-on"
    source: "/news/2026-04-02-cursor-3-agent-first-release/"
    source_label: "Cursor 3 release coverage"
    verified_at: 2026-04-23
  context_window:
    value: "Model-dependent; Opus 4.7 up to 1M tokens"
    source: "/tools/cursor/"
    source_label: "AIpedia Cursor review"
    verified_at: 2026-04-23
  best_paid_tier:
    value: "Pro ($20/mo); Pro+ ($60/mo) for heavier frontier-model use"
    source: "/tools/cursor/"
    source_label: "AIpedia Cursor review"
    verified_at: 2026-04-23
  best_for:
    value: "GUI-first multi-agent coding inside a VS Code fork"
    source: "/tools/cursor/"
    source_label: "AIpedia Cursor review"
    verified_at: 2026-04-23
tags: [code-editor, ide, autocomplete, ai-coding, vscode-fork, agentic-coding, cloud-agents, mcp, composer, claude-opus-4-7]
seo_title: "Cursor: Features, Pricing & Review (April 2026)"
meta_description: "Cursor is an AI-native VS Code fork. Claude Opus 4.7 added at launch (April 16, 2026). Cursor 3.0 (April 2, 2026) ships the Agents Window with Cloud Agents, Design Mode, and parallel agent orchestration. Hobby free; Pro $20; Pro+ $60; Ultra $200; Teams $40/user."
author: "aipedia.wiki Editorial"
best_for:
  - professional developers on VS Code ergonomics
  - multi-file and multi-agent refactors
  - teams wanting standardized AI-assisted development
  - Claude Opus 4.7 users who need GUI + browser + design mode alongside agents
not_best_for:
  - pure terminal-agent workflows (Claude Code is stronger)
  - JetBrains, Vim/Neovim, or Zed loyalists
  - extremely budget-conscious users (GitHub Copilot is cheaper)
quick_answer: >-
  Cursor is the strongest GUI-first AI IDE in April 2026, built as a VS Code fork with a multi-agent Agents Window. Pick it for parallel agents, Design Mode, and one bill covering Opus 4.7, GPT-5.5, and Gemini 3.1 Pro at API rates. Skip it for CLI agent loops (Claude Code) or budget-tier completions (GitHub Copilot at $10).
price_history:
  - date: 2026-04-16
    plan: "Pro"
    price: "$20/mo"
    note: "Claude Opus 4.7 added within minutes of Anthropic release; billed at $5/$25 per MTok from the usage pool"
  - date: 2026-04-02
    plan: "Pro / Pro+ / Ultra / Teams"
    price: "$20 / $60 / $200 / $40-user"
    note: "Cursor 3.0 ships the Agents Window · pricing structure unchanged"
  - date: 2026-04-17
    plan: "Pro"
    price: "$20/mo"
    note: "Verified, unchanged"
---

# Cursor

Anysphere's AI-native code editor. A VS Code fork with LLMs wired into autocomplete (Tab), inline edits (Cmd+K), codebase-aware chat (@codebase), and the Agents Window (the multi-agent workbench introduced in Cursor 3.0 on April 2, 2026).

## Recent developments

- **May 1, 2026:** [The MCP STDIO command-execution flaw made Cursor's MCP layer part of the shell-access threat model](/news/2026-05-03-mcp-stdio-command-execution-flaw/). Cursor users should audit `mcp.json`, disable automatic registration where possible, and sandbox third-party servers.
- **May 1, 2026:** [Replit argued for independence as Cursor deal talk reshaped AI coding](/news/2026-05-01-replit-cursor-deal-independence/). Cursor's reported SpaceX/xAI acquisition option keeps strategic-owner risk and infrastructure upside central to how enterprises evaluate the IDE.
- **April 27, 2026:** [Cursor and Claude were named in a reported PocketOS database-deletion incident](/news/2026-04-27-cursor-claude-database-deletion-incident/). Treat it as an agent-permissions and backup-design warning, not proof that AI coding tools should never touch infrastructure.
- **April 22, 2026:** [SpaceX and xAI lined up a $60B option to buy Cursor](/news/2026-04-22-spacex-xai-cursor-acquisition-option/). It is an option and partnership, not a completed acquisition, but it makes Cursor's long-term independence a live strategic question.
- **April 23, 2026:** [Google discloses 75% of internal new code is AI-generated](/news/2026-04-23-google-75-percent-internal-code-ai-generated/). Hyperscaler benchmark for agentic-coding adoption; validates Cursor's position as mainstream IDE default.
- **April 21, 2026:** [Moonshot Kimi K2.6 ships with Agent Swarm mode](/news/2026-04-21-moonshot-kimi-k2-6-agent-swarm/). Strong open-weights coding scores (SWE-Bench Pro 58.6, HLE-with-tools 54.0) make Kimi a viable BYO-key backbone for self-hosted enterprise Cursor deployments.
- **April 17:** [Cursor in talks for $2B+ round at $50B valuation](/news/2026-04-17-cursor-2b-at-50b-valuation/). Nearly doubles the $29.3B valuation from 6 months ago. $2B ARR in Feb 2026. Thrive and a16z co-lead; Nvidia and Battery participating.
- **April 16:** [Systemic MCP vulnerability exposes 200k servers](/news/2026-04-16-mcp-vulnerability-200k-servers/). Cursor's MCP plugin layer inherits the exposure. Audit installed MCP servers; prefer first-party or sandboxed.
- **April 16:** [OpenAI Codex Desktop ships as "super app"](/news/2026-04-16-openai-codex-desktop-super-app/) with computer use, memory, image gen, 90+ plugins. Desktop-agent surface, not an IDE, but the Computer Use plus Memory combo is the long-term threat to IDE-as-home paradigm.
- **April 17:** [Cursor ships Opus 4.7 support on day two](/news/2026-04-17-opus-4-7-day-two-ide-adoption/) of Anthropic's release, alongside Windsurf, Zed, and Continue. Kept Cursor current with the April 2026 flagship within 24 hours.
- **April 2:** [Cursor 3 release makes the Agents Window the primary interface](/news/2026-04-02-cursor-3-agent-first-release/). Agent-first IDE shift; traditional editor view moves to a background role for users opting into the new layout.

Claude Opus 4.7, GPT-5.5, Gemini 3.1 Pro, Grok 4.20, Kimi K2.5, and Cursor's in-house Composer 2 are all first-class. Opus 4.7 landed in Cursor within minutes of Anthropic's April 16, 2026 release.

## System Verdict

> **Pick Cursor if you want the strongest GUI-first AI IDE in April 2026.** Cursor 3.0's Agents Window orchestrates parallel agents across local worktrees, cloud sandboxes, and remote SSH, with Design Mode for clicking on UI elements in a live browser preview and Best-of-N runs for model shoot-outs. Claude Opus 4.7 support hit within minutes of Anthropic's release, and the $20 Pro tier buys API-rate access to every frontier model behind a single bill.
>
> **Skip it if a CLI agent loop is what you actually want.** Claude Code outmatches Cursor on autonomous terminal workflows, and GitHub Copilot is cheaper ($10/mo) if you're happy with single-file completions on stock VS Code. JetBrains, Vim/Neovim, and Zed users have no path into Cursor. It's a full editor fork, not an extension.
>
> **Who pays which tier:** Hobby (free) for evaluation, Pro $20/mo for most professional developers, Pro+ $60/mo when $20 of credits burns in the first week, Ultra $200/mo for sustained Opus-4.7-and-Cloud-Agents workloads, Teams $40/user/mo for organizations wanting SSO and pooled usage.

## Key Facts

| | |
|---|---|
| **Current release** | Cursor 3.1 (April 13, 2026) · Cursor 3.0 shipped April 2, 2026 |
| **Base** | Fork of VS Code (all extensions, keybindings, settings portable) |
| **Flagship models** | Claude Opus 4.7 · GPT-5.5 · Gemini 3.1 Pro · Composer 2 |
| **Other supported models** | Claude Sonnet 4.6 / Haiku 4.5 · GPT-5.3 Instant/Thinking Mini · GPT-5-Codex · Gemini 3 Flash · Grok 4.20 · Kimi K2.5 |
| **Agent modes** | Tab (autocomplete) · Cmd+K (inline edit) · Agents Window (multi-agent) · Cloud Agents (remote sandboxes) · Design Mode · Bugbot (PR review, separate add-on) |
| **Model pricing inside Cursor** | Base API rates (Opus 4.7 = $5/$25 per MTok; 1M context flat-rate, no long-context surcharge) |
| **Subscription pricing** | Hobby $0 · Pro $20 · Pro+ $60 · Ultra $200 · Teams $40/user · Enterprise custom |
| **Annual discount** | ~20% off paid tiers |
| **Add-on** | Bugbot $40/user/mo (Pro trial + Teams + Enterprise) |
| **Recent shutdowns** | Notepads (deprecated in Cursor 2.0, Oct 2025) |

## What it actually is

A single desktop editor that covers four autonomy levels on one "autonomy slider": Tab (predictive completion), Cmd+K (targeted single-file rewrites), the Composer 2-driven Agents Window (supervised multi-file work), and Cloud Agents (remote sandboxes that build, test, and demo a feature end-to-end). Every agent session can be launched locally, in a git worktree, in a cloud sandbox, or on a remote SSH machine, all from the same window.

The real moats are three. First, editor integration: Cursor is a VS Code fork, so the LSP, extensions, keybindings, and debugger UX are already production-grade. AI features bolt onto an editor developers already use.

Second, model coverage without per-model billing: one subscription buys Opus 4.7, GPT-5.5, Gemini 3.1 Pro, Grok, Kimi, and Composer 2 at API rates with no markup on 1M-token context.

Third, the Agents Window's orchestration surface (Best-of-N runs, worktree isolation, cloud handoff, Design Mode) doesn't exist in stock VS Code + Copilot or in Claude Code.

## When to pick Cursor

- **You want a GUI-first multi-agent workbench.** Cursor 3.0's Agents Window runs parallel agents across local/worktree/cloud/SSH and lets you click UI elements in a live browser preview (Design Mode) instead of describing them in text.
- **You're already on VS Code ergonomics.** Extensions, keybindings, settings, and LSP all carry over. The migration cost is a folder import.
- **You want one bill for every frontier model.** Opus 4.7, GPT-5.5, Gemini 3.1 Pro, Grok 4.20, Kimi K2.5, and Composer 2 are all accessed at API rates from a single usage pool.
- **You run supervised multi-file refactors.** Composer 2 handles plan-and-implement across many files better than single-file extensions. The Agents Window lets you watch 8+ agents at once.
- **You want to ship Claude Opus 4.7 immediately.** Cursor added Opus 4.7 within minutes of Anthropic's April 16, 2026 release and charges no long-context surcharge up to 1M tokens.

## When to pick something else

- **Pure terminal / autonomous agent loop:** [Claude Code](/tools/claude-code/). Stronger CLI agent with cleaner autonomous iteration on test failures and build errors.
- **Budget VS Code coding assist:** [GitHub Copilot](/tools/github-copilot/). $10/mo, less integrated but cheaper entry.
- **Cursor-style IDE on a tighter budget:** [Windsurf](/tools/windsurf/). Similar workflow at a lower price point.
- **Open-source agent inside stock VS Code:** [Cline](/tools/cline/). Bring-your-own-API-key agent with no editor fork.
- **Terminal pair-programmer with precise diff control:** [Aider](/tools/aider/). Git-native, no editor fork, popular for surgical edits.
- **Open-source VS Code AI extension:** [Continue](/tools/continue/). Fully configurable, self-hostable.
- **Zero-AI performance-first editor:** [Zed](/tools/zed/). Rust-based, fast, AI features newer and narrower than Cursor's.

## Pricing

Subscription tiers via [cursor.com/pricing](https://cursor.com/pricing):

| Plan | Price | Usage pool | Who's it for |
|---|---|---|---|
| Hobby | $0 | Limited Tab + Agent requests | Evaluation only |
| Pro | $20/mo | $20 of monthly credits on all frontier models | **Most professional developers land here** |
| Pro+ | $60/mo | 3× Pro credits | Devs burning Pro credits in under a week |
| Ultra | $200/mo | 20× Pro credits · priority access to new features | Sustained Opus 4.7 + Cloud Agents workloads |
| Teams | $40/user/mo | Shared pool · SSO (SAML/OIDC) · usage analytics · RBAC | Organizations wanting centralized billing + audit |
| Enterprise | Custom | Pooled usage · SCIM · AI code tracking API · audit logs | Compliance-heavy orgs |

Add-on: **Bugbot** at $40/user/mo for automated PR review (up to 200 PRs/mo on Pro trial, unlimited on Teams). Annual billing saves roughly 20% on all paid tiers.

Model usage inside Cursor is billed at base API rates. Opus 4.7 runs $5 input / $25 output per MTok, GPT-5.5 $2.50 input, Gemini 3.1 Pro $2.00 input, Composer 2 $0.50 input.

The 1M-token context is flat-rate with no long-context surcharge. "Auto" mode picks a cheaper model when intelligence isn't the binding constraint.

Prices verified 2026-04-17 via [cursor.com/pricing](https://cursor.com/pricing) and [cursor.com/docs/models](https://cursor.com/docs/models).

## Against the alternatives

| | Cursor Pro $20 | Claude Code (via Claude Max $100) | GitHub Copilot $10 |
|---|---|---|---|
| **Model access** | Opus 4.7 · GPT-5.5 · Gemini 3.1 Pro · Grok · Kimi · Composer 2 | Opus 4.7 · Sonnet 4.6 · Haiku 4.5 | Opus 4.7 · GPT-5.5 · Gemini (curated) |
| **Agent mode** | Agents Window · Cloud Agents · Design Mode · Best-of-N | Claude Code CLI (terminal, autonomous loop) | Copilot Chat + Agent Mode (extension) |
| **Multi-file edits** | Composer 2 + parallel agents in worktrees | Full codebase reads/writes from terminal | Single-repo, extension-bounded |
| **IDE integration** | Native (VS Code fork) | None · terminal-first | Extension inside stock VS Code / JetBrains |
| **Pricing model** | $20/mo + usage pool at API rates | $100/mo flat for Max 5x tier | $10/mo flat, unlimited basic completions |
| **Best viewed as** | GUI-first multi-agent workbench | Strongest autonomous CLI agent | Cheap VS Code autocomplete + chat |

## Failure modes

- **Pro $20 credits burn fast.** The $20 usage pool runs out in 1-2 weeks for heavy users on Opus 4.7 or GPT-5.5. After that you get slow requests or overage at API rates. Power users skip straight to Pro+ or Ultra.
- **Opus 4.7 is the most expensive model in the pool.** Cursor's own docs flag it as "most expensive, consumes usage limits faster than alternatives." Use Composer 2, Sonnet 4.6, or Auto mode for routine work and save Opus for hard problems.
- **VS Code lock-in.** Cursor is a full editor fork. JetBrains, Vim/Neovim, Zed, and Emacs users have no entry path. Migrating out later means reinstalling extensions and settings on stock VS Code.
- **Not a fully autonomous agent.** Cloud Agents iterate inside a sandbox, but the Agents Window is still a supervised workbench. Claude Code's terminal loop is more aggressive at self-correcting on test failures and build errors.
- **Diff UI can desync on long agent runs.** Multi-agent sessions in worktrees occasionally surface stale diffs in the Agents Window; refresh or reopen the worktree to force-sync.
- **MCP configs can become shell access.** The May 1 [MCP STDIO flaw](/news/2026-05-03-mcp-stdio-command-execution-flaw/) makes plugin/config hygiene a first-order security requirement for Cursor teams using MCP.
- **Model-hopping inflates spend.** Users switch models mid-session ("try GPT-5.5 on this file, now Opus on the next") and burn more credits than they'd expect. Pin a default and deviate deliberately.
- **Background/Cloud Agents rename is still confusing.** Cursor 2.0 (Oct 2025) renamed Background Agents to Cloud Agents. Documentation and third-party tutorials from late 2025 still use both names interchangeably.
- **Privacy mode disables some features.** Cursor sends code to LLM providers by default. Privacy Mode (opt-in; on by default for Business/Enterprise) exempts code from training but disables a subset of indexing features. Sensitive codebases should evaluate trade-offs before adopting.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, normalizes factual claims, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against [cursor.com/pricing](https://cursor.com/pricing), [cursor.com/docs/models](https://cursor.com/docs/models), the [Cursor changelog](https://cursor.com/changelog), the [Cursor 2.0 release notes](https://cursor.com/changelog/2-0), and the [Claude Opus 4.7 Cursor docs page](https://cursor.com/docs/models/claude-opus-4-7).

## FAQ

**Is Cursor free to use?**
Yes. The Hobby plan is free with limited Tab completions and Agent requests. It's enough to evaluate Cursor but not for daily professional work. Pro at $20/mo is the standard paid entry point.

**Does Cursor support Claude Opus 4.7?**
Yes. Opus 4.7 was added to Cursor within minutes of Anthropic's [April 16, 2026 release](https://cursor.com/docs/models/claude-opus-4-7). It's billed at $5 input / $25 output per MTok from the usage pool, with no long-context surcharge up to the 1M token window. A high-effort "thinking" variant is recommended for the strongest results.

**What's new in Cursor 3.0?**
Cursor 3.0 (released April 2, 2026) reorganizes the editor around the Agents Window: a multi-agent workbench with parallel agents across local, worktree, cloud, and remote-SSH environments, Design Mode for clicking on UI elements in a live browser preview, and Best-of-N runs for side-by-side model comparison.

Cursor 3.1 (April 13) added a tiled layout and upgraded voice input. The April 15 release introduced Canvases (interactive visualizations inside the Agents Window).

**What's the difference between Pro, Pro+, and Ultra?**
All three include the same frontier models and features. The only difference is the usage pool: Pro is $20 of monthly credits, Pro+ is 3× that for $60/mo, Ultra is 20× that for $200/mo plus priority access to new features. Ultra is aimed at developers running sustained Opus 4.7 and Cloud Agents workloads.

**Cursor or Claude Code?**
Different shapes. Cursor is a GUI-first editor with a multi-agent window. Claude Code is a terminal-first autonomous agent.

Use Cursor when you want an editor with an Agents Window attached. Use Claude Code when you want the agent to run the whole loop in a terminal with minimal human supervision. Many developers use both: Cursor for interactive work, Claude Code for batch agentic runs.

**What happened to Background Agents?**
Cursor 2.0 (October 29, 2025) renamed Background Agents to Cloud Agents. Functionality expanded in Cursor 3.0 with seamless local-to-cloud handoff and self-hosted deployment support for enterprises that need code and execution to stay inside their own network.

**Does Cursor work with JetBrains, Vim, or Zed?**
No. Cursor is a VS Code fork, not a plugin. Users on other editors should look at [GitHub Copilot](/tools/github-copilot/), [Cline](/tools/cline/), [Continue](/tools/continue/), or [Aider](/tools/aider/) depending on the editor and workflow.

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
- **Alternatives:** [Claude Code](/tools/claude-code/) · [GitHub Copilot](/tools/github-copilot/) · [Windsurf](/tools/windsurf/) · [Cline](/tools/cline/) · [Aider](/tools/aider/) · [Continue](/tools/continue/) · [Zed](/tools/zed/)
- **Comparisons:** [Cursor vs Claude Code vs Copilot](/compare/cursor-vs-claude-code-vs-copilot/) · [Claude vs Cursor](/compare/claude-vs-cursor/) · [Cline vs Cursor](/compare/cline-vs-cursor/) · [Continue vs Cursor](/compare/continue-vs-cursor/)
