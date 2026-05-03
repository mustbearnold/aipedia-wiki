---
type: tool
slug: aider
title: Aider
tagline: Free open-source CLI pair-programmer. Edits real files in your git repo, auto-commits each change, works with any LLM via BYOK.
category: ai-coding
company: Paul Gauthier (open source)
url: https://aider.chat
github_url: https://github.com/Aider-AI/aider
pricing_model: free
price_range: "$0 + API costs"
status: active
launched: 2023-05
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
  utility: 8
  value: 10
  moat: 5
  longevity: 7
tags: [ai-coding, open-source, cli, git-integration, agentic-coding, byok, architect-mode, repo-map]
seo_title: "Aider: Open-Source AI Coding Assistant Review (April 2026)"
meta_description: "Aider is a free open-source CLI pair-programmer that edits real files in your git repo, auto-commits each change, and supports Claude Opus 4.7, OpenAI frontier models, Gemini, and Ollama via BYOK. Architect mode, repo-map, /ask /edit /architect chat modes. Verified April 2026."
author: "aipedia.wiki Editorial"
best_for:
  - CLI-comfortable developers
  - Open-source contributors
  - BYOK users
  - privacy-conscious teams running Ollama
  - cost-transparent workflows
not_best_for:
  - developers wanting a polished GUI
  - teams without terminal proficiency
  - users needing visual diffs
  - zero-configuration setups
quick_answer: >-
  Pick Aider for a free, open-source CLI pair-programmer that edits real files and auto-commits every change to git. Skip it if a polished GUI matters more; Cursor's $20/mo wins there. BYOK keeps session costs as low as pennies on Gemini 3.1 Pro.
price_history:
  - date: 2024-01-15
    plan: "License"
    price: "Free (Apache 2.0)"
    note: "Open-source since launch"
  - date: 2026-04-15
    plan: "License"
    price: "Free (Apache 2.0)"
    note: "Verified unchanged. BYOK API costs remain the only spend."
---

# Aider

A free, open-source CLI pair-programmer. Runs in the terminal, reads the actual codebase, proposes multi-file edits, and commits each change to git with a descriptive message.

Supports any LLM via API key: Claude Opus 4.7, OpenAI frontier models, Gemini 3.1 Pro, Mistral, plus local models through Ollama. Maintained by Paul Gauthier under Apache 2.0.

## System Verdict

> **Pick Aider for the most cost-transparent AI coding workflow available.** Every edit becomes a git commit with an AI-written message. Architect mode splits planning from execution: a smart model designs the approach, a cheaper model writes the code. Session cost lands at pennies on Gemini 3.1 Pro or $0.05-$0.30/hour on Claude Opus 4.7.
>
> **Skip it for a polished GUI.** No visual diff viewer, no file tree, no inline completions. [Cursor](/tools/cursor/) at $20/mo fills that gap.
>
> **Who pays what:** Extension is free. API costs ride on your own provider key. Most sessions are under $1. Large features on Opus can reach $5.

## Key Facts

| | |
|---|---|
| **License** | Apache 2.0 open source |
| **Maintainer** | Paul Gauthier |
| **Interface** | Terminal CLI |
| **Chat modes** | `/code` (default) · `/ask` · `/architect` · `/help` |
| **Architect mode** | Two-model: architect plans, editor writes diffs |
| **Repo-map** | Compact codebase summary, 1K-token default budget |
| **Git integration** | Auto-commits every accepted change with descriptive message |
| **Supported LLMs** | Claude Opus 4.7 · OpenAI frontier models · Gemini 3.1 Pro · Mistral · Ollama · any OpenAI-compatible API |
| **Voice coding** | Yes, via local speech-to-text |
| **Watch mode** | Yes, auto-applies suggestions as files change |

Every data point above was verified against vendor documentation on 2026-04-17. See Sources.

## What it actually is

A terminal tool. Run `aider` in a project directory, add files to context with `/add`, then describe the change in plain English. Aider sends file contents plus the instruction to the chosen LLM, receives a structured diff, applies it to real files, and creates a git commit.

Architect mode runs two models. A larger smart model (typically Opus 4.7) designs the approach. A faster cheaper model (typically Haiku 4.5 or lower-cost OpenAI models) turns the plan into specific diffs. Quality stays high, cost stays low.

Repo-map builds a compact structural summary of the codebase: files, functions, classes, signatures. The LLM gets project context without every file loaded explicitly. Token budget defaults to 1K and tunes via `--map-tokens`.

In-chat commands cover the full workflow: `/run` for shell, `/lint` for quality checks, `/undo` to revert, `/diff` to review pending edits, `/ask` to discuss without editing, `/architect` to switch to the two-model plan-then-write flow.

## When to pick Aider

- **You live in a terminal.** Vim, tmux, remote SSH sessions: Aider slots in without changing your editor.
- **You want git history as the audit log.** Every change becomes a commit with a descriptive message. No hidden edits.
- **You need BYOK economics.** Gemini 3.1 Pro sessions run $0.02-$0.15/hour. Opus 4.7 sessions land under $0.30/hour via architect mode.
- **You run fully offline sometimes.** Ollama integration covers local models with no network calls.
- **You contribute to open source.** Aider's transparent git workflow fits OSS review patterns cleanly.

## When to pick something else

- **Polished GUI IDE:** [Cursor](/tools/cursor/) at $20/mo. File tree, inline diffs, tab completion.
- **IDE-native agent with a subscription:** [Windsurf](/tools/windsurf/) Pro at $20/mo. Cascade for multi-file agent edits.
- **Free IDE extension with approval gates:** [Cline](/tools/cline/) in VS Code or JetBrains. Plan/Act modes.
- **Inline autocomplete only:** [GitHub Copilot](/tools/github-copilot/) at $10/mo.
- **Terminal-first agentic runs:** [Claude Code](/tools/claude/) on Max 5x at $100/mo. Flat rate, deeper agentic capability.

## Pricing

Aider itself is free under Apache 2.0. You pay LLM API costs directly.

| Model | Cost/hour of active coding | Notes |
|-------|---------------------------|-------|
| Gemini 3.1 Pro | $0.02-$0.15/hr | Cheapest capable option, long context |
| Claude Opus 4.7 (architect mode) | $0.05-$0.30/hr | Best quality-to-cost ratio |
| OpenAI frontier models | $0.10-$0.50/hr | Solid alternative, slightly weaker on multi-file edits |
| Claude Opus 4.7 (full sessions) | $0.50-$2.00/hr | Highest quality, expensive on large codebases |
| Ollama (local) | $0 | Fully offline; quality below frontier models |

*Costs verified 2026-04-17. Cost varies with codebase size (repo-map token overhead) and session length. Bug fixes cost pennies; large features spanning many files can cost $1-$5 on Opus.*

## Against the alternatives

| | Aider | Cursor Pro | Cline |
|---|---|---|---|
| **Price** | Free + BYOK API | $20/mo flat | Free + BYOK API |
| **Form factor** | Terminal CLI | VS Code fork | VS Code / JetBrains extension |
| **Model choice** | Any via API | Mostly bundled | Any BYOK provider |
| **Architect mode** | Yes, two-model plan + edit | Partial | Partial |
| **Auto git commits** | Yes, per change | Manual | Manual |
| **Best viewed as** | CLI-native BYOK pair-programmer | Polished default IDE | Free agentic extension |

## Failure modes

- **Terminal-only.** No GUI, no visual diff viewer, no file tree. Terminal comfort required.
- **Repo-map token overhead on monorepos.** Large codebases push more tokens into every request. Opus sessions can reach $5 on big feature work.
- **Local Python setup.** Requires Python on the host. No one-click install, no cloud deployment option.
- **Context-window saturation on large files.** Many simultaneously-added big files can blow past the model's limit and degrade output.
- **No built-in test runner.** Manual workflow: run tests, paste errors back. `/run` helps but is not integrated.
- **No visual review of pending edits.** `/diff` surfaces text diffs in the terminal. No side-by-side inline preview.
- **Voice coding is local-only.** Speech-to-text runs on-device; accuracy varies with hardware and microphone.
- **Open-source moat is low.** Any team can fork the approach. Longevity depends on continued maintainer engagement.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against [aider.chat docs](https://aider.chat/docs/), the [chat modes reference](https://aider.chat/docs/usage/modes.html), the [repo-map docs](https://aider.chat/docs/repomap.html), and the [Aider GitHub repo](https://github.com/Aider-AI/aider).

## FAQ

**Is Aider free?**
Yes. Apache 2.0 open source. Only cost is the API key you bring. Light sessions run pennies; large features on Opus reach $5. A local Ollama model costs nothing.

**What is architect mode?**
A two-model workflow. A larger smart model (typically Opus 4.7) proposes the approach. A faster cheaper model (typically Haiku 4.5 or lower-cost OpenAI models) turns the plan into file-level diffs. Keeps quality high and session cost low.

**Which models does Aider support?**
Any LLM reachable through an OpenAI-compatible API: Claude Opus 4.7, OpenAI frontier models, Gemini 3.1 Pro, Mistral, plus local models via Ollama. The `--model` flag sets the model at runtime. Model rankings live on the [Aider leaderboard](https://aider.chat/docs/leaderboards).

**Aider vs Cursor, which should I pick?**
Cursor is a GUI VS Code fork with bundled models and inline diffs. Aider is a CLI with BYOK, auto-commit, and architect mode. Pick Cursor for visual polish; pick Aider for terminal workflow, git transparency, and lowest cost.

**Does Aider commit to git automatically?**
Yes. Every accepted change becomes a git commit with an AI-generated descriptive message. Rollback is `git revert` or `/undo` in-chat.

## Sources

- [aider.chat docs](https://aider.chat/docs/): official documentation
- [Chat modes reference](https://aider.chat/docs/usage/modes.html): `/code`, `/ask`, `/architect`, `/help`
- [Repo-map docs](https://aider.chat/docs/repomap.html): codebase summary mechanism
- [GitHub: Aider-AI/aider](https://github.com/Aider-AI/aider): source and release history
- [Aider leaderboard](https://aider.chat/docs/leaderboards): model rankings on coding benchmarks

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
- **Comparisons:** [Aider vs Claude Code](/compare/aider-vs-claude-code/) · [Aider vs Cursor](/compare/aider-vs-cursor/) · [Aider vs GitHub Copilot](/compare/aider-vs-github-copilot/)
