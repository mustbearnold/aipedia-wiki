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
last_updated: 2026-06-25
last_verified: 2026-06-25
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
facts:
  runtime_model:
    value: "Open-source CLI pair programmer that edits real files in a local git repository and can commit changes after each step."
    source: "https://aider.chat/"
    source_label: "Aider homepage"
    source_id: aider-official
    verified_at: 2026-06-25
    next_review_at: 2026-07-14
    volatility: medium
    confidence: high
  model_choice:
    value: "BYOK model support through provider APIs and local models; total cost is the $0 Aider tool cost plus provider/router token usage or local hardware cost."
    source: "https://aider.chat/docs/"
    source_label: "Aider docs"
    source_id: aider-pricing
    verified_at: 2026-06-25
    next_review_at: 2026-07-14
    volatility: medium
    confidence: high
  open_source_or_local:
    value: "Yes. Source is available on GitHub and the workflow runs in your local repo."
    source: "https://github.com/Aider-AI/aider"
    source_label: "Aider GitHub repository"
    source_id: aider-repository
    verified_at: 2026-06-23
    next_review_at: 2026-07-14
    volatility: medium
    confidence: high
  best_for:
    value: "Developers who want a terminal-native, git-aware coding agent they can pair with many LLMs instead of a hosted IDE product."
    source: "https://aider.chat/docs/"
    source_label: "Aider docs"
    source_id: aider-pricing
    verified_at: 2026-06-23
    next_review_at: 2026-07-14
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Not a managed enterprise coding platform; teams must handle API keys, model selection, security review, and local workflow discipline themselves."
    source: "https://aider.chat/docs/"
    source_label: "Aider docs"
    source_id: aider-pricing
    verified_at: 2026-06-23
    next_review_at: 2026-07-14
    volatility: medium
    confidence: medium
tags: [ai-coding, open-source, cli, git-integration, agentic-coding, byok, architect-mode, repo-map]
seo_title: "Aider: Open-Source AI Coding Assistant Review (June 2026)"
meta_description: "Aider is a free open-source CLI pair-programmer that edits real files in your git repo, auto-commits each change, and supports Claude, OpenAI, Gemini, Mistral, Ollama, and OpenAI-compatible models via BYOK. Architect mode, repo-map, /ask /edit /architect chat modes. Verified June 2026."
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
  Pick Aider for a free, open-source CLI pair-programmer that edits real files and can commit changes to git. Skip it if a polished GUI matters more; Cursor's $20/mo wins there. BYOK keeps the Aider tool cost at $0, but token spend still depends on provider, model, repo-map size, context, and session length.
price_history:
  - date: 2026-06-25
    plan: "License and BYOK cost model"
    price: "Free Apache 2.0 tool; model/API usage billed by the provider or router"
    source: "https://aider.chat/docs/"
    source_label: "Aider docs"
    source_id: aider-pricing
    verified_at: 2026-06-25
    note: "Rechecked official docs, release history, and GitHub repository. Aider remains a free open-source terminal pair-programmer with provider/API/local model connections; cost depends on the chosen model route and session shape."
  - date: 2026-06-14
    plan: "License and BYOK cost model"
    price: "Free Apache 2.0 tool; model/API usage billed by the provider or router"
    source: "https://aider.chat/docs/"
    source_label: "Aider docs"
    source_id: aider-pricing
    verified_at: 2026-06-14
    note: "Re-verified official docs and GitHub repository. Aider remains an open-source terminal pair-programmer with provider/API/local model connections; page copy now avoids unsourced per-hour cost precision and fixes the Claude Code alternative link."
  - date: 2024-01-15
    plan: "License"
    price: "Free (Apache 2.0)"
    source: "https://aider.chat/docs/"
    source_label: "Source"
    source_id: aider-pricing
    verified_at: 2026-06-14
    note: "Open-source since launch"
  - date: 2026-04-15
    plan: "License"
    price: "Free (Apache 2.0)"
    source: "https://aider.chat/docs/"
    source_label: "Source"
    source_id: aider-pricing
    verified_at: 2026-06-14
    note: "Verified unchanged. BYOK API costs remain the only spend."
  - date: 2026-05-13
    plan: "License"
    price: "Free (Apache 2.0)"
    source: "https://aider.chat/docs/"
    source_label: "Source"
    source_id: aider-pricing
    verified_at: 2026-06-14
    note: "Re-verified unchanged in May. BYOK API or local-model costs remain the only spend."
  - date: 2026-06-01
    plan: "License"
    price: "Free (Apache 2.0)"
    source: "https://aider.chat/docs/"
    source_label: "Source"
    source_id: aider-pricing
    verified_at: 2026-06-14
    note: "Re-verified June 1, 2026. License unchanged; model choice and token cost depend on Aider's live model docs, provider APIs, and local Ollama setup."
  - date: 2026-06-02
    plan: "License"
    price: "Free (Apache 2.0)"
    source: "https://aider.chat/docs/"
    source_label: "Aider docs"
    source_id: aider-pricing
    verified_at: 2026-06-14
    note: "Re-verified during Aider comparison refresh. License unchanged; API or local-model costs remain the spend driver."
---

# Aider

A free, open-source CLI pair-programmer. Runs in the terminal, reads the actual codebase, proposes multi-file edits, and commits each change to git with a descriptive message.

Supports many LLMs via API key: Claude, OpenAI, Gemini, Mistral, OpenAI-compatible endpoints, plus local models through Ollama. Maintained by Paul Gauthier under Apache 2.0.

## System Verdict

> **Pick Aider for one of the most cost-transparent AI coding workflows available.** Every edit can become a git commit with an AI-written message. Architect mode splits planning from execution: a stronger model designs the approach, and a cheaper model can write the code. The tool itself is free; the cost variable is the provider, router, local model, context size, and retry loop you choose.
>
> **Skip it for a polished GUI.** No visual diff viewer, no file tree, no inline completions. [Cursor](/tools/cursor/) at $20/mo fills that gap.
>
> **Who pays what:** Aider is free. API, router, Copilot-credit, or local-hardware costs ride on your chosen model path, so large repositories and long sessions need budget discipline.

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
| **Supported LLMs** | Claude · OpenAI frontier models · Gemini · Mistral · Ollama · any OpenAI-compatible API |
| **Voice coding** | Yes, via local speech-to-text |
| **Watch mode** | Yes, auto-applies suggestions as files change |

Every data point above was verified against vendor documentation on 2026-06-25. See Sources.

## What it actually is

A terminal tool. Run `aider` in a project directory, add files to context with `/add`, then describe the change in plain English. Aider sends file contents plus the instruction to the chosen LLM, receives a structured diff, applies it to real files, and creates a git commit.

Architect mode runs two models. A larger reasoning model designs the approach. A faster cheaper model turns the plan into specific diffs. Quality stays high, cost stays low when you choose the model pair carefully.

Repo-map builds a compact structural summary of the codebase: files, functions, classes, signatures. The LLM gets project context without every file loaded explicitly. Token budget defaults to 1K and tunes via `--map-tokens`.

In-chat commands cover the full workflow: `/run` for shell, `/lint` for quality checks, `/undo` to revert, `/diff` to review pending edits, `/ask` to discuss without editing, `/architect` to switch to the two-model plan-then-write flow.

## When to pick Aider

- **You live in a terminal.** Vim, tmux, remote SSH sessions: Aider slots in without changing your editor.
- **You want git history as the audit log.** Every change becomes a commit with a descriptive message. No hidden edits.
- **You need BYOK economics.** Aider is free, so spend comes from the model path you choose. Keep an eye on repo-map size, large files, retry loops, and premium frontier-model context.
- **You run fully offline sometimes.** Ollama integration covers local models with no network calls.
- **You contribute to open source.** Aider's transparent git workflow fits OSS review patterns cleanly.

## When to pick something else

- **Polished GUI IDE:** [Cursor](/tools/cursor/) at $20/mo. File tree, inline diffs, tab completion.
- **IDE-native agent with a subscription:** [Windsurf](/tools/windsurf/) Pro at $20/mo. Cascade for multi-file agent edits.
- **Free IDE extension with approval gates:** [Cline](/tools/cline/) in VS Code or JetBrains. Plan/Act modes.
- **Inline autocomplete only:** [GitHub Copilot](/tools/github-copilot/) at $10/mo.
- **Terminal-first agentic runs:** [Claude Code](/tools/claude-code/) on Max 5x at $100/mo. Flat-rate subscription path for deeper agentic capability, with separate interactive and Agent SDK credit rules to model.

## Pricing

Aider itself is free under Apache 2.0. You pay model usage directly through the provider, router, subscription-integrated path, or local hardware you choose.

| Model path | Direct Aider fee | Notes |
|---|---:|---|
| Provider API keys | $0 + provider token usage | Strong for developers who want direct OpenAI, Anthropic, Gemini, DeepSeek, or similar billing control |
| OpenRouter or OpenAI-compatible APIs | $0 + router/provider token usage | Useful when teams want model choice or centralized API routing |
| GitHub Copilot connection | $0 + Copilot plan/credit usage | Useful for teams already governed through GitHub, but credit drawdown should be modeled |
| Ollama or local models | $0 + local hardware cost | Fully offline-capable path; quality depends on the local model |

*License and cost model verified 2026-06-25. Real cost varies with codebase size, repo-map token overhead, provider pricing, model choice, context window, retry loops, and session length. Check live provider pricing before treating any Aider workflow as cheap at scale.*

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

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity, unweighted average). Last verified 2026-06-25 against [aider.chat docs](https://aider.chat/docs/), [Aider installation docs](https://aider.chat/docs/install.html), the [chat modes reference](https://aider.chat/docs/usage/modes.html), the [repo-map docs](https://aider.chat/docs/repomap.html), [Aider release history](https://aider.chat/HISTORY.html), and the [Aider GitHub repo](https://github.com/Aider-AI/aider).

## FAQ

**Is Aider free?**
Yes. Apache 2.0 open source. The direct Aider fee is $0. Your real spend comes from the API key, router, subscription-integrated path, or local model you choose. Large repo maps, long sessions, and retry loops can make premium models expensive.

**What is architect mode?**
A two-model workflow. A larger reasoning model proposes the approach. A faster cheaper model turns the plan into file-level diffs. Keeps quality high and session cost low.

**Which models does Aider support?**
Any LLM reachable through a supported provider or OpenAI-compatible API: Claude, OpenAI frontier models, Gemini, Mistral, plus local models via Ollama. The `--model` flag sets the model at runtime. Model rankings live on the [Aider leaderboard](https://aider.chat/docs/leaderboards).

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
- **Comparisons:** [Aider vs Claude Code](/compare/aider-vs-claude-code/)
