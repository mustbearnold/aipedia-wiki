---
type: tool
slug: zed
title: Zed
tagline: Native Rust code editor with GPU rendering, real-time multiplayer, and the open-weight Zeta2.1 edit-prediction model. Free for individuals.
category: ai-coding
company: zed-industries
url: https://zed.dev
github_url: https://github.com/zed-industries/zed
pricing_model: freemium
price_range: "$0-$30/seat/month"
status: active
launched: 2024-01
last_updated: 2026-05-13
last_verified: 2026-05-13
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
    value: "Native Rust code editor with GPU rendering, real-time multiplayer, and the open-weight Zeta2.1 edit-prediction model. Free for individuals. Best for software development and code-assistant workflows."
    source: "https://zed.dev/pricing"
    source_label: "Source"
    source_id: zed-pricing
    verified_at: 2026-05-13
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Pro; $10/mo; $5 in hosted AI credits included monthly, then API list price plus 10%."
    source: "https://zed.dev/pricing"
    source_label: "Source"
    source_id: zed-pricing
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
  watch_out_for:
    value: "Pricing restructured May 2026: Pro dropped to $10/mo, new Business tier launched at $30/seat replacing Teams. Verify current pricing, AI credit allowance, and overage policy before procurement."
    source: "https://zed.dev/pricing"
    source_label: "Source"
    source_id: zed-pricing
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
tags: [code-editor, rust, collaborative, ai-coding, performance, open-source, linux, macos, windows, zeta]
seo_title: "Zed: Features, Pricing & Review (May 2026)"
meta_description: "Zed is a native Rust code editor with GPU rendering, real-time multiplayer, and AI via Claude Opus 4.7, OpenAI frontier models, and Gemini. Free tier runs the open-weight Zeta2.1 edit-prediction model. Pro $10/month with $5 in AI credits; Business $30/seat."
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
  Zed is a native Rust code editor with GPU rendering and real-time multiplayer. The editor is free. Personal includes 2,000 accepted Zeta2.1 edit predictions plus unlimited BYOK AI. Pro at $10/month bundles $5 in hosted AI credits with API-plus-10% overage. Business at $30/seat adds org-wide policy controls. Pick it for speed and collaboration; skip it for deep extension ecosystems.
price_history:
  - date: 2026-05-13
    plan: "Pro"
    price: "$10/mo"
    source: "https://zed.dev/pricing"
    source_label: "Source"
    source_id: zed-pricing
    note: "Pricing restructured: Pro dropped from $20 to $10/mo, $5 monthly AI credit included, API list plus 10% overage. New Business tier $30/seat launched May 6 replacing Teams."
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

> **May 8, 2026:** Zed shipped **Zeta2.1**, the next edit-prediction model. 3x fewer output tokens than Zeta2, 28% faster at p50 (189ms to 136ms), open-weight on Hugging Face with Rust bindings on PyPI for self-hosting. Default in Zed today.
>
> **May 6, 2026:** **Zed for Business** launched at $30 per seat per month. Org-wide AI policy controls, prompt-sharing and edit-prediction training disabled by default, BYOK for Anthropic, OpenAI, Google, and AWS at no extra charge. Pro pricing simultaneously cut from $20 to **$10/month** with $5 in hosted AI credits included.
>
> **April 17, 2026:** [Zed shipped Claude Opus 4.7 support within 24 hours](/news/2026-04-17-opus-4-7-day-two-ide-adoption/) of Anthropic's release, alongside Cursor, Windsurf, and Continue. Model selector lists Opus 4.7 as the default Claude option.

Native code editor from Zed Industries, founded by several original authors of Atom and Tree-sitter. Written in Rust with a custom GPU-accelerated rendering engine (GPUI). Startup sits under 100ms. Scrolling stays smooth on 10k-line files.

The editor is free and open-source (Apache 2.0). Runs on macOS, Linux, and Windows (stable since Q1 2026).

## System Verdict

> **Pick Zed when editor performance and real-time collaboration drive the decision.** Native Rust beats every Electron-based competitor on startup, scrolling, and memory. Multiplayer editing is first-class, not a plugin: shared buffers, cursor presence, voice channels. The new open-weight Zeta2.1 edit-prediction model runs locally, predicts the next edit (not the next token), and ships 3x cheaper in tokens than Zeta2.
>
> **Skip it if the VS Code extension ecosystem is load-bearing.** [Cursor](/tools/cursor/) keeps the VS Code plugin story and ships the deepest agent mode available. [JetBrains AI](/tools/jetbrains-ai/) wins on IDE-native code intelligence. [GitHub Copilot](/tools/github-copilot/) installs into any editor at $10/month.
>
> **Who pays which tier:** Free for the editor plus 2,000 accepted Zeta2.1 edit predictions and unlimited BYOK AI, Pro $10/month for unlimited edit prediction plus $5 in hosted AI credits (then API-price-plus-10%), Business $30/seat for org-wide policy controls, shared admin, and centralized billing.

## Key Facts

| | |
|---|---|
| **Engine** | Rust plus custom GPU renderer (GPUI) |
| **Platforms** | macOS, Linux, Windows (stable Q1 2026) |
| **License** | Apache 2.0, open-source |
| **Edit prediction** | Zeta2.1 (May 8, 2026): open-weight, 3x fewer tokens, 28% faster at p50, default in Zed |
| **AI models** | Claude Opus 4.7, OpenAI frontier models, Gemini 3.1 Pro, Grok, Ollama BYOK |
| **Free tier** | 2,000 accepted edit predictions, unlimited AI with BYOK |
| **Pro** | $10/month, unlimited edit prediction, $5 in AI credits monthly, API list plus 10% overage |
| **Business** | $30/seat/month (May 6, 2026): org-wide AI policies, training disabled by default, BYOK at no extra charge |
| **Student plan** | Pro, free |
| **Multiplayer** | Shared buffers, cursor presence, voice |
| **Agent Client Protocol** | Claude Code, Codex CLI, Gemini CLI, OpenCode |

Every data point above was verified against vendor sources on 2026-05-13. See Sources.

## What it actually is

One native editor covering three jobs: a fast code editor, an AI assistant panel, and a real-time multiplayer surface. Tree-sitter powers syntax and structural parsing across 60+ languages.

AI integration splits into two features. The **Zeta2.1** edit-prediction model (shipped May 8, 2026) runs locally and predicts the next edit, not just the next token, so one tab accepts multi-line changes. Zeta2.1 uses a new "Multi-Region" prompt format that targets only sections requiring changes, cutting output tokens 3x versus Zeta2 and dropping p50 latency from 189ms to 136ms. The weights are open and available on Hugging Face for self-hosting. The assistant panel handles chat, inline transformations, and multi-file context through Claude Opus 4.7, OpenAI frontier models, Gemini 3.1 Pro, Grok, or a local Ollama model.

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

| Plan | Price | Edit prediction | Hosted AI | Who's it for |
|---|---|---|---|---|
| Personal | $0 | 2,000 accepted Zeta2.1 predictions | Unlimited with BYOK | Most individuals |
| Pro | $10/mo | Unlimited Zeta2.1 | $5 monthly credit, then API plus 10% | Heavy hosted-AI users |
| Pro (students) | $0 | Unlimited Zeta2.1 | $5 monthly credit | Verified students |
| Business | $30/seat/mo | Unlimited Zeta2.1 | BYOK or provider cost plus 10% | Org policy controls, billing, governance |

*Prices verified 2026-05-13 via [zed.dev/pricing](https://zed.dev/pricing), the [Zed for Business launch](https://zed.dev/blog/zed-for-business), and [zed.dev/education](https://zed.dev/education). Pro was cut from $20 to $10 on May 6, 2026. Business launched the same day with org-wide AI policies, prompt-sharing and edit-prediction training off by default, token spend caps, and BYOK at no extra charge. Pro includes a two-week free trial. Overages bill at API list price plus 10%, either at month-end or per $10 of usage, whichever comes first. SSO, SAML/OIDC, SCIM, and SOC 2 certification are on the Business roadmap but not shipped yet.*

## Against the alternatives

| | Zed Pro | Cursor Pro | VS Code + Copilot |
|---|---|---|---|
| **Price** | $10/mo | $20/mo | $10/mo |
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
- **Overage billing is granular.** Hosted AI beyond the $5 Pro credit charges per $10 of usage. Heavy users need to monitor spend or move to BYOK.
- **Business tier is missing enterprise basics.** SSO, SAML/OIDC, SCIM, and SOC 2 are not yet shipped on the May 6 Business launch. Heavily regulated buyers should wait or stay on BYOK Personal.
- **Multiplayer needs team-wide adoption.** Collaboration only works when every participant is on Zed.
- **Smaller community than VS Code or JetBrains.** Fewer themes, fewer tutorials, fewer Stack Overflow answers.
- **Zeta2.1 is edit prediction, not chat.** Heavy chat users still need hosted credits on Pro or a BYOK API key.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity; unweighted average). Last verified 2026-05-13 against [zed.dev/pricing](https://zed.dev/pricing), the [Zeta2.1 release post](https://zed.dev/blog/zeta2-1), the [Zed for Business launch post](https://zed.dev/blog/zed-for-business), and [zed.dev/docs/ai/edit-prediction](https://zed.dev/docs/ai/edit-prediction).

## FAQ

**Is Zed free?**
The editor is free and open-source under Apache 2.0. The Personal plan includes 2,000 accepted Zeta2.1 edit predictions plus unlimited BYOK AI. Pro at $10/month unlocks unlimited edit prediction and $5 in monthly hosted AI credits, with overage at API list price plus 10% ([zed.dev/pricing](https://zed.dev/pricing)).

**Does Zed run on Windows?**
Yes. Windows went stable in Q1 2026 and runs on macOS, Linux, and Windows.

**What is Zeta2.1?**
Zeta2.1 (released May 8, 2026) is Zed's latest edit-prediction model. Uses a "Multi-Region" prompt format that targets only the sections requiring changes, cutting output tokens 3x versus Zeta2, dropping p50 latency from 189ms to 136ms, and lifting acceptance rates by 0.51%. Open-weight on Hugging Face with Rust bindings on PyPI for self-hosting. Unlimited use on Pro and Business; 2,000 accepted predictions on Personal.

**What AI models does Zed support?**
Claude Opus 4.7, OpenAI frontier models, Gemini 3.1 Pro, and Grok via hosted billing. Local models work through Ollama. BYOK is supported on every tier. Business adds BYOK for Anthropic, OpenAI, Google, and AWS at no extra charge.

**What changed in May 2026?**
Pro dropped from $20 to $10/month on May 6. Hosted prompts shifted to $5 of token credits per month instead of a flat 500-prompt quota. Teams was retired in favor of the new Business tier at $30/seat with org-wide AI policy controls. Zeta2.1 shipped two days later on May 8.

**How does Zed compare to Cursor?**
Zed wins on native performance, multiplayer, open-source ethics, and price ($10 vs $20). Cursor wins on the VS Code extension ecosystem and the Composer agent mode. Most buyers pick based on whether editor speed or agent depth matters more.

## Sources

- [Zed pricing](https://zed.dev/pricing): Personal, Pro, and Business tier details
- [Zed for Business launch](https://zed.dev/blog/zed-for-business): May 6, 2026 Business tier announcement
- [Zeta2.1 release](https://zed.dev/blog/zeta2-1): May 8, 2026 edit-prediction model update
- [Zed Edit Prediction docs](https://zed.dev/docs/ai/edit-prediction): Zeta2.1 model details
- [Zed education](https://zed.dev/education): free Pro for verified students

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
