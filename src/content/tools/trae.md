---
type: tool
slug: trae
title: Trae
tagline: ByteDance's AI-first IDE. VS Code fork with SOLO autonomous agent, multi-model backbone (Claude, GPT, DeepSeek, Gemini), and aggressive $3-$10 pricing that undercuts Cursor and Windsurf.
category: ai-coding
secondary_categories: []
company: bytedance
url: https://trae.ai
pricing_model: freemium
price_range: "$0-$100/month"
status: active
launched: 2025-01
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: monthly
seo_title: "Trae: ByteDance's AI IDE Review & Pricing (2026)"
meta_description: "Trae is ByteDance's VS Code fork with SOLO agent mode, Claude, GPT, DeepSeek and Gemini models, and token-based pricing from $0 free through $100 Ultra. Lite at $3/mo is the cheapest way to reach Claude and GPT inside an IDE."
author: "aipedia.wiki Editorial"
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 10
  moat: 6
  longevity: 7
tags: [ai-coding, ide, bytedance, trae, agentic-coding, vscode-fork, solo-mode, builder-mode]
best_for:
  - budget-conscious developers wanting Claude or GPT inside an IDE
  - SOLO autonomous agent runs for greenfield projects
  - Figma-to-code from design screenshots
  - VS Code users who want a fork with extensions intact
not_best_for:
  - enterprise code that cannot leave strict data-governance boundaries
  - workflows requiring the absolute strongest terminal agent (Claude Code wins)
  - users who refuse any ByteDance-adjacent telemetry
quick_answer: >-
  Trae is ByteDance's VS Code fork with an autonomous SOLO agent and multi-model backbone. Pick it for the cheapest path to Claude and GPT inside a full IDE. Skip it for strict enterprise data-residency work or if Claude Code's CLI already covers the workflow.
price_history:
  - date: 2026-02
    plan: "Pricing model"
    price: "Shift to token-based plans"
    note: "Trae moved from fully-free Pro features to tiered token allowances in February 2026."
  - date: 2026-04-18
    plan: "Lite"
    price: "$3/mo"
    note: "Verified entry paid tier with premium model access."
  - date: 2026-04-18
    plan: "Pro"
    price: "$10/mo"
    note: "Verified, SOLO mode included."
---

# Trae

ByteDance's **AI-first IDE**, shipped as a VS Code fork with extensions and keybindings that transfer in one import. Flagship agent is **SOLO mode**, which plans, edits files across the project, and shows live preview without step-by-step approvals. The multi-model backbone covers **Claude 3.7 Sonnet**, **GPT-4o**, **DeepSeek R1**, and **Gemini 2.5 Pro** on a single token-metered bill.

Pricing went from fully free through 2025 to token-based tiers in February 2026. Entry paid plan is **$3/mo Lite**, roughly an order of magnitude under Cursor and Windsurf. Free tier still exists with 5,000 autocompletes and 2 concurrent cloud tasks.

ByteDance's wider AI stack (Doubao, Jimeng, Seedance, Kling) sits behind the same wallet. Trae is best read as a loss-leader play for developer mindshare, not a pure standalone product.

## System Verdict

> **Pick Trae if you want the cheapest route to Claude or GPT inside a full IDE.** Lite at $3/mo is the most aggressive paid coding tier in the market. SOLO mode handles greenfield agent runs competently, Figma-to-code works on screenshots, and the VS Code fork means existing extensions port over cleanly.
>
> **Skip it if you need the strongest terminal agent, or if ByteDance-adjacent telemetry is a dealbreaker.** [Claude Code](/tools/claude-code/) still leads on CLI-native agentic coding. [Cursor](/tools/cursor/) has the deeper IDE polish and enterprise governance. Security researchers have flagged telemetry collection even with settings disabled, which rules Trae out for regulated codebases.
>
> **Who pays which tier:** Free for casual or learning use (5K autocompletes, limited models), Lite $3/mo for solo devs wanting Claude and GPT on a budget, Pro $10/mo for SOLO mode access, Pro+ $30/mo for heavier agent runs, Ultra $100/mo for power users who want 20x Pro usage and model early-access.

## Key Facts

| | |
|---|---|
| **Company** | ByteDance (also ships Doubao, Jimeng, Seedance, Kling) |
| **Launched** | January 2025 (public preview) |
| **Pricing shift** | Token-based tiers since February 2026 |
| **Platforms** | Windows, macOS, Linux (VS Code fork) |
| **Models supported** | Claude 3.7 Sonnet · GPT-4o · DeepSeek R1 · Gemini 2.5 Pro |
| **Agent mode** | SOLO (autonomous planner, multi-file edits, live preview) |
| **Design import** | Figma screenshot to React component |
| **Extensions** | Full VS Code marketplace compatibility |
| **Free tier** | 5,000 autocompletes/mo · 2 concurrent cloud tasks |
| **Paid entry** | Lite at $3/mo with premium model access |

## What it actually is

A VS Code fork with ByteDance's AI layer bolted in at the editor level. Users import existing VS Code settings, themes, and extensions on first launch. The differentiator is the agent layer, not the editor chrome.

**SOLO mode** is the headline feature. It takes a natural-language spec, plans the steps, edits multiple files, runs terminal commands, and surfaces a live preview. It is closest in positioning to Cursor's YOLO mode and Windsurf's Cascade.

**Builder mode** is the lighter variant for smaller scoped tasks: breaks a request into sub-steps, modifies files, previews results.

**Model routing** runs across Claude, GPT, DeepSeek, and Gemini on the same token bill. Users pick per-request or let Trae auto-route. Doubao models are expected to join the IDE routing soon given the parent-company stack.

## When to pick Trae

- **Budget coding.** $3/mo Lite is the cheapest verified path to Claude and GPT inside an IDE. Cursor Pro is $20/mo, Windsurf sits at $15/mo. For hobbyists or early-career devs, the spread matters.
- **Autonomous agent runs on greenfield projects.** SOLO mode plans and executes without the hand-holding you need in Copilot Chat or basic autocomplete.
- **Design-to-code.** The Figma screenshot import to React component is a first-party feature and works without an extra plugin.
- **Existing VS Code users.** Keybindings, themes, and extensions transfer. Muscle memory is preserved.
- **Multi-model comparison inside one IDE.** Pick Claude for reasoning, GPT for breadth, DeepSeek for cost, Gemini for long context, on a single subscription.

## When to pick something else

- **Strongest CLI agent:** [Claude Code](/tools/claude-code/). Terminal-native agentic coding across full codebases is still Anthropic's league.
- **Deep IDE polish and enterprise governance:** [Cursor](/tools/cursor/). Longer track record, clearer data-handling docs, broader team features.
- **Google Cloud-native workflow:** [Antigravity](/tools/antigravity/). First-party Google agentic IDE with Gemini integration.
- **Open-source self-host:** [Cline](/tools/cline/) or [Continue](/tools/continue/). Run any model, keep all code local.
- **Instant web-app prototyping:** [Bolt](/tools/bolt/), [Lovable](/tools/lovable/), or [v0](/tools/v0/). Browser-based, zero-setup, full-stack generation.
- **Windsurf-style Cascade agent:** [Windsurf](/tools/windsurf/). More mature Cascade workflow, Codeium-backed.
- **Privacy-first lightweight editor:** [Zed](/tools/zed/). Fast, minimal, AI-optional.

## Pricing

Subscription pricing verified 2026-04-18 via [trae.ai/pricing](https://www.trae.ai/pricing):

| Plan | Price | What's included | Who's it for |
|---|---|---|---|
| Free | $0 | 5,000 autocompletes/mo, 2 concurrent cloud tasks, limited IDE access | Casual use, learning |
| Lite | $3/mo | Unlimited autocomplete, $5 basic + bonus usage, 2 concurrent tasks, premium models | Budget solo devs |
| Pro | $10/mo | Unlimited autocomplete, $20 basic + bonus usage, **SOLO mode included**, 10 concurrent tasks | **Most paid users land here** |
| Pro+ | $30/mo | 3.5x Pro usage, 15 concurrent cloud tasks | Heavy agent-run workflows |
| Ultra | $100/mo | 20x Pro usage, model early access, 20 concurrent tasks | Power users, early testers |

**Pro includes a 7-day free trial.** Lite had a $3 first-month promo historically; verify current offers on the pricing page.

Models available across paid tiers: Claude 3.7 Sonnet, GPT-4o, DeepSeek R1, Gemini 2.5 Pro. Free tier has limited model selection.

Usage is metered on a token pool per tier, not unlimited. This shifted in February 2026 from the prior fully-free Pro feature set.

Prices verified 2026-04-18 via [Trae pricing page](https://www.trae.ai/pricing) and [ohaiknow Trae review 2026](https://ohaiknow.com/reviews/trae/).

## Against the alternatives

| | Trae Pro | Cursor Pro | Windsurf Pro | Claude Code |
|---|---|---|---|---|
| **Monthly** | $10 | $20 | $15 | Bundled with Claude Pro $20 |
| **Agent mode** | SOLO (IDE) | YOLO / Agent | Cascade | CLI-native |
| **Models** | Claude · GPT · DeepSeek · Gemini | Claude · GPT (default stack) | Claude · GPT | Claude only |
| **IDE type** | VS Code fork | VS Code fork | VS Code fork | Terminal, no GUI |
| **Enterprise posture** | Light (telemetry concerns) | Mature | Mature | Anthropic-governed |
| **Design import** | Figma screenshot native | Extension-based | Extension-based | Not applicable |
| **Best viewed as** | Cheapest multi-model IDE | Polished default IDE | Cascade-first IDE | Strongest agent, no IDE |

## Failure modes

- **Telemetry concerns.** Security researchers have flagged continued data collection even with settings disabled. Regulated codebases should avoid.
- **Token pool limits surprise users.** The February 2026 shift from fully-free Pro to token-based tiers caught heavy users mid-workflow. Budget the month.
- **ByteDance geopolitical exposure.** US enterprise buyers in defence, finance, or government-adjacent work may be blocked by procurement policy regardless of the tool's merits.
- **Model versions lag frontier.** Claude 3.7 and GPT-4o are the currently verified routing targets. Frontier users running Claude Opus 4.7 or GPT-5.4 on direct subscriptions will notice the gap.
- **SOLO mode drifts on complex codebases.** Autonomous agents still over-edit unrelated files when the spec is vague. Keep scope tight on legacy projects.
- **Support is thin compared to Cursor.** Community docs exist, but first-party responsiveness has been uneven during the pricing transition.
- **Cloud task limits are low on free and Lite.** 2 concurrent tasks is a hard ceiling at the lower tiers, which bottlenecks parallel agent work.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-18 against [trae.ai/pricing](https://www.trae.ai/pricing) and [ohaiknow Trae review](https://ohaiknow.com/reviews/trae/).

## FAQ

**Is Trae free?**
Yes. The free tier gives 5,000 autocompletes per month and 2 concurrent cloud tasks. Paid tiers start at $3/mo for Lite, which unlocks premium models.

**Who owns Trae?**
ByteDance, the same parent company behind Doubao, Jimeng, Seedance, and Kling. TikTok is also ByteDance.

**What models does Trae support?**
Claude 3.7 Sonnet, GPT-4o, DeepSeek R1, and Gemini 2.5 Pro are the currently verified routing targets. Selection depends on plan tier.

**What is SOLO mode?**
Trae's autonomous agent. It plans a task, edits multiple files, runs terminal commands, and shows live preview without step-by-step approval. It is included on Pro and higher tiers.

**How does Trae compare to Cursor?**
Trae is cheaper at every tier ($3 and $10 vs $20 for Cursor Pro) and routes to more models by default. Cursor has the longer track record, stronger enterprise governance, and deeper IDE polish. Full comparison at [/tools/cursor/](/tools/cursor/).

**Can I run Trae on Linux?**
Yes. As a VS Code fork, it ships on Windows, macOS, and Linux.

**Is my code sent to ByteDance servers?**
AI inference runs through ByteDance-routed infrastructure by default. Security researchers have flagged telemetry even with settings disabled. Do not use Trae on regulated or proprietary code without a clear data-handling review.

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
- **Alternatives:** [Cursor](/tools/cursor/) · [Windsurf](/tools/windsurf/) · [Cline](/tools/cline/) · [Continue](/tools/continue/) · [Claude Code](/tools/claude-code/) · [Aider](/tools/aider/) · [Codeium](/tools/codeium/) · [Zed](/tools/zed/) · [GitHub Copilot](/tools/github-copilot/) · [Antigravity](/tools/antigravity/)
- **Browser-based app builders:** [Bolt](/tools/bolt/) · [Lovable](/tools/lovable/) · [v0](/tools/v0/) · [Replit Agent](/tools/replit-agent/)
