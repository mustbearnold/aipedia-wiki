---
type: tool
slug: zed
title: Zed
tagline: Native Rust code editor with GPU rendering, real-time multiplayer, and the Zeta2 edit-prediction model. Free for individuals.
category: ai-coding
company: zed-industries
url: https://zed.dev
github_url: https://github.com/zed-industries/zed
pricing_model: freemium
price_range: "$0-$20/month"
status: active
launched: 2024-01
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
  value: 9
  moat: 7
  longevity: 8
facts:
  best_for:
    value: "Native Rust code editor with GPU rendering, real-time multiplayer, and the Zeta2 edit-prediction model. Free for individuals. Best for software development and code-assistant workflows."
    source: "https://zed.dev/pricing"
    source_label: "Source"
    source_id: zed-pricing
    verified_at: 2026-05-03
    volatility: medium
    confidence: medium
  pricing_anchor:
    value: "Pro; $20/mo; 500 prompts/month included. API list price plus 10% beyond the quota."
    source: "https://zed.dev/pricing"
    source_label: "Source"
    source_id: zed-pricing
    verified_at: 2026-05-03
    next_review_at: 2026-08-03
    volatility: high
    confidence: medium
  watch_out_for:
    value: "Non-Tier-1 canonical profile: verify current pricing, usage limits, data policy, and integration details before procurement"
    source: "https://zed.dev/pricing"
    source_label: "Source"
    source_id: zed-pricing
    verified_at: 2026-05-03
    next_review_at: 2026-08-03
    volatility: high
    confidence: medium
tags: [code-editor, rust, collaborative, ai-coding, performance, open-source, linux, macos, windows, zeta]
seo_title: "Zed: Features, Pricing & Review (April 2026)"
meta_description: "Zed is a native Rust code editor with GPU rendering, real-time multiplayer, and AI via Claude, OpenAI frontier models, and Gemini. Free tier runs the Zeta2 edit-prediction model. Pro $20/month with 500 prompts."
author: "aipedia.wiki Editorial"
best_for:
  - developers who find VS Code sluggish
  - pair programmers and remote collaborators
  - Claude and Gemini users wanting native AI
  - BYOK and local-model workflows via Ollama
not_best_for:
  - heavy VS Code extension users
  - developers chasing top-tier agent mode
  - Windows users needing full parity with macOS
  - teams deep in the JetBrains ecosystem
quick_answer: >-
  Zed is a native Rust code editor with GPU rendering and real-time multiplayer. The editor is free. Zeta2 edit prediction ships unlimited on Personal. Pro at $20/month adds 500 hosted AI prompts plus pay-as-you-go. Pick it for speed and collaboration; skip it for deep extension ecosystems.
price_history:
  - date: 2026-04-15
    plan: "Pro"
    price: "$20/mo"
    source: "https://zed.dev/pricing"
    source_label: "Source"
    source_id: zed-pricing
    note: "500 prompts/month included. API list price plus 10% beyond the quota."
  - date: 2026-01-20
    plan: "ACP"
    price: "no change"
    source: "https://zed.dev/pricing"
    source_label: "Source"
    source_id: zed-pricing
    note: "Agent Client Protocol launched with JetBrains; Zed ships Claude Code, Codex CLI, and Gemini CLI integrations."
---

# Zed

> **April 17, 2026:** [Zed shipped Claude Opus 4.7 support within 24 hours](/news/2026-04-17-opus-4-7-day-two-ide-adoption/) of Anthropic's release, alongside Cursor, Windsurf, and Continue. Model selector now lists Opus 4.7 as the default Claude option.

Native code editor from Zed Industries, founded by several original authors of Atom and Tree-sitter. Written in Rust with a custom GPU-accelerated rendering engine (GPUI). Startup sits under 100ms. Scrolling stays smooth on 10k-line files.

The editor is free and open-source (Apache 2.0). Runs on macOS, Linux, and Windows (stable since Q1 2026).

## System Verdict

> **Pick Zed when editor performance and real-time collaboration drive the decision.** Native Rust beats every Electron-based competitor on startup, scrolling, and memory. Multiplayer editing is first-class, not a plugin: shared buffers, cursor presence, voice channels. Zeta2 edit prediction runs unlimited on the free Personal plan.
>
> **Skip it if the VS Code extension ecosystem is load-bearing.** [Cursor](/tools/cursor/) keeps the VS Code plugin story and ships the deepest agent mode available. [JetBrains AI](/tools/jetbrains-ai/) wins on IDE-native code intelligence. [GitHub Copilot](/tools/github-copilot/) installs into any editor at $10/month.
>
> **Who pays which tier:** Free for the editor plus unlimited Zeta2 edit prediction and 50 hosted prompts/month, Pro $20/month for 500 hosted prompts plus API-price-plus-10% overage, Teams for shared workspaces and admin controls.

## Key Facts

| | |
|---|---|
| **Engine** | Rust plus custom GPU renderer (GPUI) |
| **Platforms** | macOS, Linux, Windows (stable Q1 2026) |
| **License** | Apache 2.0, open-source |
| **Edit prediction** | Zeta2, open-source, 30% better than Zeta1 |
| **AI models** | Claude Opus 4.7, OpenAI frontier models, Gemini 3.1 Pro, Grok, Ollama BYOK |
| **Free tier** | Unlimited edit prediction, 50 prompts/month |
| **Pro** | $20/month, 500 prompts/month, API list plus 10% overage |
| **Student plan** | Pro, free |
| **Multiplayer** | Shared buffers, cursor presence, voice |
| **Agent Client Protocol** | Claude Code, Codex CLI, Gemini CLI, OpenCode |

Every data point above was verified against vendor sources on 2026-04-17. See Sources.

## What it actually is

One native editor covering three jobs: a fast code editor, an AI assistant panel, and a real-time multiplayer surface. Tree-sitter powers syntax and structural parsing across 60+ languages.

AI integration splits into two features. Zeta2 edit prediction runs locally-ish and predicts the next edit, not just the next token, so one tab accepts multi-line changes. The assistant panel handles chat, inline transformations, and multi-file context through Claude, OpenAI frontier models, Gemini, Grok, or a local Ollama model.

The Agent Client Protocol (ACP), launched January 2026 in collaboration with JetBrains, ships [Claude Code](/tools/claude-code/), Codex CLI, Gemini CLI, and OpenCode integrations inside the editor. Agent work still happens through these external CLIs, not a native Zed Composer.

## When to pick Zed

- **Editor responsiveness outranks every other factor.** Native Rust plus GPU rendering beats VS Code on startup, scroll, and input latency.
- **Pair programming and remote collaboration are weekly workflows.** Multiplayer is first-class; no external plugin required.
- **Vim bindings matter.** First-class Vim mode ships without plugins.
- **Claude, OpenAI frontier models, or a local Ollama model is the target AI.** Swap freely. BYOK works on every tier.
- **Open-source editor ethics matter.** Apache 2.0 license, public repo, no telemetry-first product model.

## When to pick something else

- **Deep VS Code extension use:** [Cursor](/tools/cursor/) keeps the ecosystem and ships the strongest AI-native IDE.
- **Strongest agent mode:** [Cursor](/tools/cursor/) Composer, [Claude Code](/tools/claude-code/), [Cline](/tools/cline/), or [Aider](/tools/aider/) handle autonomous work better than Zed's current stack.
- **IDE-native intelligence on IntelliJ or PyCharm:** [JetBrains AI](/tools/jetbrains-ai/) hooks into inspections and refactorings.
- **One coding AI for any editor:** [GitHub Copilot](/tools/github-copilot/).
- **Latency-first completion only:** [Supermaven](/tools/supermaven/) still leads pure autocomplete speed.
- **Free BYOK autocomplete plus chat:** [Continue](/tools/continue/) covers VS Code and JetBrains.

## Pricing

| Plan | Price | Edit prediction | Hosted prompts | Who's it for |
|---|---|---|---|---|
| Personal | $0 | Unlimited Zeta2 | 50/mo | Most individuals |
| Pro | $20/mo | Unlimited Zeta2 | 500/mo, then API plus 10% | Heavy hosted-AI users |
| Pro (students) | $0 | Unlimited Zeta2 | 500/mo | Verified students |
| Teams | contact | Unlimited Zeta2 | shared quota | Admin controls, shared workspaces |

*Prices verified 2026-04-17 via [zed.dev/pricing](https://zed.dev/pricing), [zed.dev/docs/ai/models](https://zed.dev/docs/ai/models), and [zed.dev/education](https://zed.dev/education). Pro includes a two-week free trial with $20 of token credits. Overages bill at API list price plus 10%, either at month-end or per $10 of usage, whichever comes first.*

## Against the alternatives

| | Zed Pro | Cursor Pro | VS Code + Copilot |
|---|---|---|---|
| **Price** | $20/mo | $20/mo | $10/mo |
| **Editor engine** | **Native Rust + GPU** | Electron (VS Code fork) | Electron |
| **Startup + scroll** | **Fastest** | Mid | Mid |
| **Real-time multiplayer** | **First-class** | Via extensions | Via Live Share |
| **Agent mode** | External CLIs via ACP | Composer (strongest) | Workspace agent |
| **Extension ecosystem** | LSP plus native extensions | Full VS Code marketplace | Full VS Code marketplace |
| **BYOK support** | Claude, GPT, Gemini, Ollama | Multi-model | Copilot only |
| **Best viewed as** | Native speed + collaboration | AI-native IDE | Universal default |

## Failure modes

- **No VS Code extension marketplace.** Zed ships LSP support and a growing native extension ecosystem. VS Code plugin depth is not reproducible here.
- **Agent mode runs through external CLIs.** ACP wires in [Claude Code](/tools/claude-code/) and others, but there is no native Composer-equivalent yet.
- **Windows parity lags macOS.** Windows went stable in Q1 2026. Some features land on macOS first.
- **Overage billing is granular.** Hosted AI beyond 500 prompts charges per $10 of usage. Heavy users need to monitor spend.
- **Multiplayer needs team-wide adoption.** Collaboration only works when every participant is on Zed.
- **Smaller community than VS Code or JetBrains.** Fewer themes, fewer tutorials, fewer Stack Overflow answers.
- **Zeta2 is edit prediction, not chat.** Heavy chat users still need the hosted-prompt quota on Pro.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity; unweighted average). Last verified 2026-04-17 against [zed.dev/pricing](https://zed.dev/pricing), [zed.dev/docs/ai/models](https://zed.dev/docs/ai/models), and [zed.dev/docs/ai/edit-prediction](https://zed.dev/docs/ai/edit-prediction).

## FAQ

**Is Zed free?**
The editor is free and open-source under Apache 2.0. The Personal plan includes unlimited Zeta2 edit prediction plus 50 hosted AI prompts per month. Pro at $20/month unlocks 500 prompts plus overage at API list price plus 10% ([zed.dev/pricing](https://zed.dev/pricing)).

**Does Zed run on Windows?**
Yes. Windows went stable in Q1 2026 and runs on macOS, Linux, and Windows.

**What is Zeta2?**
Zeta2 is Zed's open-source edit-prediction model, 30% better than Zeta1. It predicts the next edit rather than the next token, so one tab accepts multi-line changes. Unlimited use on every tier.

**What AI models does Zed support?**
Claude Opus 4.7, OpenAI frontier models, Gemini 3.1 Pro, and Grok via hosted billing. Local models work through Ollama. BYOK is supported on every tier.

**How does Zed compare to Cursor?**
Zed wins on native performance, multiplayer, and open-source ethics. Cursor wins on the VS Code extension ecosystem and the Composer agent mode. Most buyers pick based on whether editor speed or agent depth matters more.

## Sources

- [Zed pricing](https://zed.dev/pricing): Personal, Pro, and Teams tier details
- [Zed AI models](https://zed.dev/docs/ai/models): Claude, GPT, Gemini, Grok, Ollama support
- [Zed Edit Prediction docs](https://zed.dev/docs/ai/edit-prediction): Zeta2 model and unlimited-use policy
- [Zed education](https://zed.dev/education): free Pro for verified students

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
