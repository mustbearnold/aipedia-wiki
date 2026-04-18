---
type: tool
slug: continue
title: Continue
tagline: Open-source AI coding extension for VS Code and JetBrains. BYOK for any model, Continue Hub for shared agents, MIT licensed.
category: ai-coding
company: continue-dev
url: https://continue.dev
pricing_model: freemium
price_range: "$0-$20/seat/month"
status: active
launched: 2023-05
last_updated: 2026-04-18
last_verified: 2026-04-18
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
tags: [open-source, byok, local-model, ai-coding, vscode, jetbrains, self-hosted, continue-hub]
seo_title: "Continue: Open-Source AI Coding Extension Review (April 2026)"
meta_description: "Continue is a free, MIT-licensed AI coding extension for VS Code and JetBrains. Solo free + BYOK, Team $20/seat with $10 credits, Company custom. Use Claude Opus 4.7, GPT-5.4, Gemini, or local Ollama models. Verified April 2026."
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
  Pick Continue for a free, MIT-licensed AI coding extension with full model choice across VS Code, JetBrains, and Vim. Skip it if you want plug-and-play day-one setup, where GitHub Copilot at $10/mo is simpler. Team tier at $20/seat adds shared agents and governance.
price_history:
  - date: 2026-03-01
    plan: "Team"
    price: "$20/seat/mo"
    note: "Team tier restructured with $10 per-seat frontier-model credits included"
  - date: 2026-04-15
    plan: "Solo"
    price: "$0"
    note: "Solo remains free with full open-source extension access"
---

# Continue

An open-source AI coding extension for VS Code and JetBrains, developed by Continue.dev under the MIT license. Unlike Copilot or Cursor, Continue ships no model of its own. It is a flexible IDE layer that connects to any model you pick.

Claude Opus 4.7, GPT-5.4, Gemini 3.1 Pro, Mistral Large, or local models via Ollama, LM Studio, or vLLM all route through the same extension interface.

> **April 17, 2026:** [Continue added Claude Opus 4.7 support within 24 hours](/news/2026-04-17-opus-4-7-day-two-ide-adoption/) of Anthropic's release, alongside Cursor, Windsurf, and Zed.

## System Verdict

> **Pick Continue for maximum model choice with zero vendor lock-in.** Extension is free. Solo tier stays BYOK. Team tier at $20/seat/mo adds shared agents, centralized governance, and $10 of frontier-model credits per seat. Company tier covers custom SSO, BYOK for API keys, and SLAs.
>
> **Skip it for out-of-the-box plug-and-play.** [GitHub Copilot](/tools/github-copilot/) at $10/mo works from day one with less configuration. [Cursor](/tools/cursor/) at $20/mo bundles models and visual polish.
>
> **Who pays what:** Solo stays free with your own keys. Team $20/seat/mo is right for small teams wanting shared agents and governance. Company custom covers enterprise compliance.

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
| **Solo pricing** | $0, full OSS extension |
| **Team pricing** | $20/seat/mo with $10/seat frontier-model credits |
| **Company pricing** | Custom with SSO, BYOK keys, SLAs |

Every data point above was verified against vendor documentation on 2026-04-17. See Sources.

## What it actually is

An IDE extension that adds a chat panel, autocomplete, and inline edit commands. Model choice is per-task. A fast local model handles autocomplete; a larger cloud model handles complex reasoning. Both live in the same interface.

`@codebase` indexes the project with embeddings. The extension answers architecture and usage questions with full file context. Inline editing takes highlighted code plus a natural-language change request.

Continue Hub is the shared layer. Agents, slash commands, rules, and MCP servers publish once and install across team members. Solo developers use it for personal reusable prompts; teams use it for governance and consistency.

Context providers pull documentation, GitHub issues, terminal output, web search, and images. Agentic tools like `@terminal` and custom functions cover multi-step runs. Config lives in `~/.continue/config.json` and is version-controllable.

## When to pick Continue

- **You want full model choice without IDE lock-in.** Swap Opus 4.7 for Mistral Large at will. Run on-device with Ollama when compliance requires it.
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
| Solo | $0 | Full open-source extension · BYOK any provider | **Individuals on BYOK** |
| Starter | $3/MTok input + output | Pay-as-you-go · create and run agents · Slack/Sentry/Snyk integrations | Pay-as-you-go users |
| Team | $20/seat/mo | $10/seat frontier credits · team agent management · private agent sharing · usage controls · Gmail/GitHub SSO | Small teams |
| Company | Custom | Custom SSO (SAML/OIDC) · BYOK API keys · commitment options · invoicing · SLAs | Compliance-heavy orgs |

*Prices verified 2026-04-17 via [Continue pricing](https://www.continue.dev/pricing). Solo stays free and BYOK; model costs are paid directly to the chosen provider, or eliminated entirely with a local Ollama model.*

## Against the alternatives

| | Continue Solo | GitHub Copilot | Cursor Pro |
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

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against [Continue pricing](https://www.continue.dev/pricing), [Continue docs](https://docs.continue.dev), and the [Continue GitHub repo](https://github.com/continuedev/continue).

## FAQ

**Does Continue cost anything?**
The extension is free under MIT. Solo tier stays BYOK: you pay your provider directly. Team at $20/seat/mo adds governance and $10/seat of frontier-model credits. Company tier covers SSO, BYOK keys, and SLAs.

**Can I use Continue fully offline?**
Yes. Configure a local Ollama, LM Studio, or vLLM model and code never leaves the machine. This is one of Continue's strongest compliance stories.

**Continue vs GitHub Copilot, which is better?**
Copilot is easier on day one and ships quality autocomplete bundled. Continue is free and gives full control over model, provider, and data flow. Teams with existing API contracts or strict data-residency needs usually come out cheaper and more flexible on Continue.

**Which IDEs does Continue support?**
VS Code, JetBrains (IntelliJ, PyCharm, WebStorm), and Vim/Neovim. The extension is near-feature-parity across all three.

**What is Continue Hub?**
A shared registry for agents, slash commands, rules, and MCP servers. Publish once, install across team members. Solos use it for reusable personal prompts; teams use it for consistency and governance.

## Sources

- [Continue pricing](https://www.continue.dev/pricing): Solo, Team, Company plans verified 2026-04-17
- [Continue docs](https://docs.continue.dev): configuration, context providers, models
- [GitHub: continuedev/continue](https://github.com/continuedev/continue): source code and releases
- [continue.dev](https://continue.dev): product overview

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
- **Comparisons:** [Claude Code vs Continue](/comparisons/claude-code-vs-continue/) · [Continue vs Cursor](/comparisons/continue-vs-cursor/) · [Continue vs Devin](/comparisons/continue-vs-devin/) · [Continue vs GitHub Copilot](/comparisons/continue-vs-github-copilot/) · [Continue vs Val Town](/comparisons/continue-vs-val-town/)
