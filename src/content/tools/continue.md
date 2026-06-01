---
type: tool
slug: continue
title: Continue
tagline: Open-source AI coding extension for VS Code and JetBrains. BYOK for any model, Continue Hub for shared agents, MIT licensed.
category: ai-coding
company: continue-dev
url: https://continue.dev
github_url: https://github.com/continuedev/continue
pricing_model: freemium
price_range: "$0-$20/seat/month"
status: active
launched: 2023-05
last_updated: 2026-06-01
last_verified: 2026-06-01
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
  longevity: 8
facts:
  best_for:
    value: "Continue is best for engineering teams that want an open-source coding assistant in VS Code or JetBrains with explicit control over model providers, prompts, context, and team-shared assistants."
    source: "https://docs.continue.dev/"
    source_label: "Continue docs"
    source_id: continue-docs
    verified_at: 2026-06-01
    volatility: low
    confidence: high
  pricing_anchor:
    value: "Continue's published self-serve tiers are Starter (pay-as-you-go at $3 per million tokens), Team ($20/seat with $10 of bundled credits), and Company (custom). The extension itself is free under MIT; the buyer decision is BYOK/model-control versus bundled proprietary coding agents."
    source: "https://www.continue.dev/pricing"
    source_label: "Continue pricing"
    source_id: continue-pricing
    verified_at: 2026-06-01
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
  model_control:
    value: "Continue's docs emphasize configuring models and context providers, making it a strong fit where teams need provider flexibility or private/local model routing."
    source: "https://docs.continue.dev/"
    source_label: "Continue docs"
    source_id: continue-docs
    verified_at: 2026-06-01
    volatility: medium
    confidence: high
  team_distribution:
    value: "Continue Hub is the distribution layer for reusable assistants and blocks, which matters for teams standardizing coding-agent behavior across repositories."
    source: "https://hub.continue.dev/"
    source_label: "Continue Hub"
    source_id: continue-hub
    verified_at: 2026-06-01
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Continue rewards teams willing to configure context, models, and rules; developers seeking a no-setup assistant may prefer a more opinionated hosted product."
    source: "https://docs.continue.dev/"
    source_label: "Continue docs"
    source_id: continue-docs
    verified_at: 2026-06-01
    volatility: medium
    confidence: high
tags: [open-source, byok, local-model, ai-coding, vscode, jetbrains, self-hosted, continue-hub]
seo_title: "Continue.dev Review: Open-Source Copilot Alternative for VS Code & JetBrains"
meta_description: "Continue.dev is a free MIT-licensed AI coding extension for VS Code, JetBrains, and Vim. Compare BYOK setup, Team pricing, local Ollama support, and Copilot/Cursor tradeoffs."
author: "aipedia.wiki Editorial"
best_for:
  - BYOK developers
  - privacy-conscious workflows with local models
  - multi-IDE teams (VS Code + JetBrains + Vim)
  - teams with existing API agreements (Bedrock, Azure, Vertex)
  - open-source contributors
not_best_for:
  - zero-configuration setups
  - users wanting bundled frontier models
  - individuals who just want autocomplete
quick_answer: >-
  Continue.dev is the open-source Copilot alternative for developers who want BYOK model choice across VS Code, JetBrains, and Vim. Pick it for local Ollama workflows, Bedrock/Azure/Vertex routing, or team-shared agents. Skip it if you want the easiest first-day setup, where GitHub Copilot or Cursor is simpler. Its main advantage is provider control, not a bundled frontier-model subscription.
decision_brief:
  items:
    - label: Start here
      value: "Free OSS + BYOK"
      detail: "Best for developers who already have model keys or want local Ollama."
    - label: Upgrade when
      value: "Agents need governance"
      detail: "Team adds shared agents, private sharing, and usage controls."
    - label: Compare against
      value: "Copilot and Cursor"
      detail: "Copilot is easier; Cursor is more polished; Continue is more controllable."
price_history:
  - date: 2026-03-01
    plan: "Team"
    price: "$20/seat/mo"
    source: "https://www.continue.dev/pricing"
    source_label: "Source"
    source_id: continue-pricing
    note: "Team tier restructured with $10 per-seat frontier-model credits included"
  - date: 2026-04-15
    plan: "Solo"
    price: "$0"
    source: "https://www.continue.dev/pricing"
    source_label: "Source"
    source_id: continue-pricing
    note: "Solo remains free with full open-source extension access"
  - date: 2026-05-13
    plan: "Starter"
    price: "$3/M tokens"
    source: "https://www.continue.dev/pricing"
    source_label: "Source"
    source_id: continue-pricing
    note: "Verified pay-as-you-go Starter tier at $3 per million tokens (input and output) with Slack, Sentry, and Snyk integrations. Team holds at $20/seat with $10 bundled credits; Company stays custom."
  - date: 2026-06-01
    plan: "Pricing refresh"
    price: "Free OSS + Starter $3/M tokens + Team $20/seat/mo"
    source: "https://www.continue.dev/pricing"
    source_label: "Source"
    source_id: continue-pricing
    note: "Re-verified June 1, 2026. Continue remains BYOK/open-source for core IDE use; paid Continue tiers cover managed credits, integrations, shared agents, and team governance."
---

# Continue

An open-source AI coding extension for VS Code and JetBrains, developed by Continue.dev under the MIT license. Unlike Copilot or Cursor, Continue ships no model of its own. It is a flexible IDE layer that connects to any model you pick.

Current Claude, OpenAI, Gemini, Mistral, and local models via Ollama, LM Studio, or vLLM all route through the same extension interface when configured through Continue's provider settings.

> **Historical adoption signal:** [Continue added Claude Opus 4.7 support within 24 hours](/news/2026-04-17-opus-4-7-day-two-ide-adoption/) of Anthropic's April 2026 release, alongside Cursor, Windsurf, and Zed. As of June 1, 2026, verify the current model menu in Continue docs and your provider settings before standardizing.

## System Verdict

> **Pick Continue for maximum model choice with zero vendor lock-in.** The extension is free under MIT and stays BYOK. Starter pay-as-you-go at $3 per million tokens covers solo developers who want managed billing and integrations without a seat fee. Team at $20/seat/mo adds shared agents, centralized governance, and $10 of frontier-model credits per seat. Company tier covers custom SSO, BYOK for API keys, and SLAs.
>
> **Skip it for out-of-the-box plug-and-play.** [GitHub Copilot](/tools/github-copilot/) at $10/mo works from day one with less configuration. [Cursor](/tools/cursor/) at $20/mo bundles models and visual polish.
>
> **Who pays what:** Free OSS extension stays free with your own keys. Starter $3/M tokens is the smallest paid step for solo devs who want integrations and managed credits. Team $20/seat/mo is right for small teams wanting shared agents and governance. Company custom covers enterprise compliance.

## Key Facts

| | |
|---|---|
| **License** | MIT, open source |
| **Primary IDEs** | VS Code · JetBrains (IntelliJ, PyCharm, WebStorm) · Vim/Neovim |
| **Model providers** | Anthropic · OpenAI · Google · Mistral · AWS Bedrock · Azure OpenAI · GCP Vertex · Ollama · LM Studio · vLLM |
| **Continue Hub** | Shared agents, slash commands, rules, MCPs |
| **@codebase context** | Project indexing with embeddings |
| **Custom slash commands** | Yes, defined in config |
| **Agentic tools** | `@terminal`, `@edit`, custom functions |
| **Free OSS extension** | $0, full BYOK use of your own keys |
| **Starter pricing** | $3 per million tokens, pay-as-you-go, includes Slack/Sentry/Snyk integrations |
| **Team pricing** | $20/seat/mo with $10/seat frontier-model credits |
| **Company pricing** | Custom with SSO, BYOK keys, SLAs |

Every data point above was verified against vendor documentation on 2026-06-01. See Sources.

## What it actually is

An IDE extension that adds a chat panel, autocomplete, and inline edit commands. Model choice is per-task. A fast local model handles autocomplete; a larger cloud model handles complex reasoning. Both live in the same interface.

`@codebase` indexes the project with embeddings. The extension answers architecture and usage questions with full file context. Inline editing takes highlighted code plus a natural-language change request.

Continue Hub is the shared layer. Agents, slash commands, rules, and MCP servers publish once and install across team members. Solo developers use it for personal reusable prompts; teams use it for governance and consistency.

Context providers pull documentation, GitHub issues, terminal output, web search, and images. Agentic tools like `@terminal` and custom functions cover multi-step runs. Config lives in `~/.continue/config.json` and is version-controllable.

## When to pick Continue

- **You want full model choice without IDE lock-in.** Swap between Claude, OpenAI, Gemini, Mistral, or local Ollama routes as your provider policy and budget change.
- **Your team spans VS Code, JetBrains, and Vim.** Continue ships on all three; Cursor does not.
- **You already have API access through Bedrock, Azure, or Vertex.** Route usage through existing enterprise agreements.
- **Data residency is non-negotiable.** Local Ollama or LM Studio keeps code entirely on-device.
- **You want Team governance without losing BYOK.** Shared agents and slash commands via Continue Hub.

## When to pick something else

- **Fastest plug-and-play setup:** [GitHub Copilot](/tools/github-copilot/) at $10/mo.
- **Polished IDE with bundled models:** [Cursor](/tools/cursor/) at $20/mo.
- **VS Code autonomous agent with approval gates:** [Cline](/tools/cline/). Plan/Act modes, free BYOK.
- **CLI workflow with auto git commits:** [Aider](/tools/aider/). Free, BYOK, terminal-only.
- **Terminal-first agentic runs:** [Claude Code](/tools/claude/) on Max 5x at $100/mo.

## Pricing

Pricing via [continue.dev/pricing](https://www.continue.dev/pricing).

| Plan | Price | Features | Who's it for |
|------|-------|----------|--------------|
| Free OSS extension | $0 | Full open-source extension · BYOK any provider | **Individuals on BYOK** |
| Starter | $3 per million tokens | Pay-as-you-go input and output · create and run agents · Slack/Sentry/Snyk integrations · purchase frontier-model credits | Pay-as-you-go solo developers |
| Team | $20/seat/mo | $10/seat frontier credits · team agent management · private agent sharing · usage controls · Gmail/GitHub SSO | Small teams |
| Company | Custom | Custom SSO (SAML/OIDC) · BYOK API keys · commitment options · invoicing · SLAs | Compliance-heavy orgs |

*Prices verified 2026-06-01 via [Continue pricing](https://www.continue.dev/pricing). The OSS extension stays free and BYOK; model costs are paid directly to the chosen provider, or eliminated entirely with a local Ollama model. Starter is the smallest paid tier and bills $3 per million tokens on input and output.*

## Against the alternatives

| | Continue (Free OSS) | GitHub Copilot | Cursor Pro |
|---|---|---|---|
| **Price** | Free + BYOK | $10/mo bundled | $20/mo bundled |
| **Model choice** | Any BYOK provider | GitHub-hosted models | Mostly bundled |
| **IDE support** | VS Code · JetBrains · Vim | VS Code · JetBrains · Visual Studio | VS Code fork |
| **Setup time** | 15-30 min | Under 5 min | Under 10 min |
| **Local model option** | Yes via Ollama | No | Partial |
| **Best viewed as** | Flexible BYOK IDE layer | Fastest plug-and-play | Polished bundled IDE |

## Failure modes

- **No AI included.** Must configure and pay for your own model. Adds friction versus Copilot.
- **Autocomplete quality tracks the chosen model.** A slow or misconfigured local model produces poor completions. Matching model to task takes trial runs.
- **Setup overhead.** First-time configuration (keys, model selection, context providers, embeddings) runs 15-30 minutes.
- **No built-in hosting.** Unlike Cursor or Copilot, no Continue-managed model. All infrastructure is user-managed.
- **Community-driven support.** Documentation is solid. Support runs through GitHub issues and Discord, not dedicated channels.
- **Hub governance is new.** Team-level policy controls are improving but younger than enterprise-grade competitors.
- **Moat is low.** Openness and flexibility are the bet. No proprietary model advantage.
- **Model provider limits apply.** Rate limits, context windows, and quality floors are set by the chosen provider, not by Continue.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-06-01 against [Continue pricing](https://www.continue.dev/pricing), [Continue docs](https://docs.continue.dev), and the [Continue GitHub repo](https://github.com/continuedev/continue).

## FAQ

**Does Continue cost anything?**
The OSS extension is free under MIT and stays BYOK: you pay your provider directly. Starter at $3 per million tokens is the smallest paid step, with Slack, Sentry, and Snyk integrations. Team at $20/seat/mo adds governance and $10/seat of frontier-model credits. Company tier covers SSO, BYOK keys, and SLAs.

**Can I use Continue fully offline?**
Yes. Configure a local Ollama, LM Studio, or vLLM model and code never leaves the machine. This is one of Continue's strongest compliance stories.

**Continue vs GitHub Copilot, which is better?**
Copilot is easier on day one and ships quality autocomplete bundled. Continue is free and gives full control over model, provider, and data flow. Teams with existing API contracts or strict data-residency needs usually come out cheaper and more flexible on Continue.

**Which IDEs does Continue support?**
VS Code, JetBrains (IntelliJ, PyCharm, WebStorm), and Vim/Neovim. The extension is near-feature-parity across all three.

**What is Continue Hub?**
A shared registry for agents, slash commands, rules, and MCP servers. Publish once, install across team members. Solos use it for reusable personal prompts; teams use it for consistency and governance.

## Sources

- [Continue pricing](https://www.continue.dev/pricing): Starter, Team, Company plans verified 2026-06-01
- [Continue docs](https://docs.continue.dev): configuration, context providers, models
- [GitHub: continuedev/continue](https://github.com/continuedev/continue): source code and releases
- [continue.dev](https://continue.dev): product overview

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
- **Comparisons:** [Claude Code vs Continue](/compare/claude-code-vs-continue/) · [Continue vs Cursor](/compare/continue-vs-cursor/) · [Continue vs Devin](/compare/continue-vs-devin/) · [Continue vs GitHub Copilot](/compare/continue-vs-github-copilot/) · [Continue vs Val Town](/compare/continue-vs-val-town/)
