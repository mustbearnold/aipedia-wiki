---
type: tool
slug: augment-code
title: Augment Code
tagline: Codebase-aware AI coding platform with Agent, Next Edit, completions, Auggie CLI, MCP tools, and credit-based plans from $20 to $200 per developer.
category: ai-coding
company: Augment
url: https://www.augmentcode.com
pricing_model: paid
price_range: "$20-$200/developer/month"
status: active
launched: 2024
last_updated: 2026-05-03
last_verified: 2026-05-03
update_frequency: monthly
seo_title: "Augment Code: Features, Pricing & Review (April 2026)"
meta_description: "Augment Code is an AI coding platform for large codebases. Indie is $20/mo with 40,000 credits, Standard is $60/developer/mo, Max is $200/developer/mo, and Enterprise is custom."
author: aipedia.wiki Editorial
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 7
  moat: 7
  longevity: 8
facts:
  flagship_model:
    value: "Claude Opus 4.6, Claude Sonnet 4.6, Gemini 3.1 Pro, OpenAI frontier models, and other selectable models"
    source: "https://docs.augmentcode.com/models/available-models"
    source_label: "Augment available models"
    source_id: augment-code-flagship-model
    verified_at: 2026-04-28
    next_review_at: 2026-06-03
    confidence: high
  coding_agent:
    value: "Agent can edit files, run terminal/tool workflows, use MCP/native tools, and checkpoint changes"
    source: "https://docs.augmentcode.com/using-augment/agent"
    source_label: "Augment Agent docs"
    source_id: augment-code-coding-agent
    verified_at: 2026-04-28
    confidence: high
  best_paid_tier:
    value: "Standard ($60/developer/month) for teams; Indie ($20/month) for solo evaluation"
    source: "https://www.augmentcode.com/pricing"
    source_label: "Augment pricing"
    source_id: augment-code-best-paid-tier
    verified_at: 2026-04-28
    next_review_at: 2026-06-03
    confidence: high
  best_for:
    value: "Large existing codebases where context quality matters more than editor replacement"
    source: "https://docs.augmentcode.com/introduction"
    source_label: "Augment docs"
    source_id: augment-code-best-for
    verified_at: 2026-04-28
    confidence: high
tags: [ai-coding, coding-agent, codebase-context, vscode, jetbrains, cli, mcp, code-review]
best_for:
  - teams working in large existing codebases
  - developers who want an IDE extension instead of a full editor fork
  - organizations that need paid-plan no-training terms
  - mixed VS Code, JetBrains, and CLI workflows
not_best_for:
  - casual users who only need autocomplete
  - teams that prefer a standalone AI IDE like Cursor
  - buyers who dislike credit accounting
quick_answer: >-
  Augment Code is best viewed as an AI layer for serious existing codebases. Pick it when context quality, IDE flexibility, and enterprise controls matter more than having a shiny all-in-one editor. Skip it if you want flat-rate beginner coding help or a no-credit billing model.
price_history:
  - date: 2026-04-28
    plan: "Indie"
    price: "$20/mo with 40,000 credits"
    source: "https://www.augmentcode.com/pricing"
    source_label: "Source"
    source_id: augment-code-best-paid-tier
    note: "Verified on augmentcode.com/pricing"
  - date: 2026-04-28
    plan: "Standard"
    price: "$60/developer/mo with 130,000 credits"
    source: "https://www.augmentcode.com/pricing"
    source_label: "Source"
    source_id: augment-code-best-paid-tier
    note: "Verified on augmentcode.com/pricing"
  - date: 2026-04-28
    plan: "Max"
    price: "$200/developer/mo with 450,000 credits"
    source: "https://www.augmentcode.com/pricing"
    source_label: "Source"
    source_id: augment-code-best-paid-tier
    note: "Verified on augmentcode.com/pricing"
---

# Augment Code

Augment Code is an AI coding platform built around a codebase context engine. It ships as extensions for Visual Studio Code and JetBrains IDEs, plus **Auggie CLI** for terminal workflows. The main product surfaces are Agent, Next Edit, code completions, chat, MCP/native tools, and AI pull-request review.

The positioning is different from [Cursor](/tools/cursor/) or [Windsurf](/tools/windsurf/): Augment is not trying to replace your editor. It tries to understand a large repository deeply enough to make code changes, answer questions, and review pull requests without forcing a new IDE.

The model menu matters. Augment documents selectable access to Anthropic Claude Haiku 4.5, Opus 4.5, Opus 4.6, Sonnet 4, Sonnet 4.5, Sonnet 4.6, Google Gemini 3.1 Pro, and OpenAI GPT-5.1, GPT-5.2, and OpenAI frontier models. Model choice applies to Agent in the current workspace; Auggie CLI exposes model selection through `/model` or `--model`.

## System Verdict

> **Pick Augment Code if your problem is codebase context.** The strongest fit is a professional team with a large existing repo, multiple IDE preferences, and a need for coding agents plus PR review under one paid contract.
>
> **Skip it for simple autocomplete or beginner app building.** GitHub Copilot is cheaper for completion-heavy work. Cursor and Claude Code are better-known choices for developers who want a full agentic coding environment. Replit Agent, Lovable, and Base44 are better for non-developers building apps from prompts.
>
> **Who pays which tier:** Indie at $20/mo for one developer testing the workflow, Standard at $60/developer/mo for small production teams, Max at $200/developer/mo for heavy agent users, Enterprise for SSO, compliance, and bespoke credit limits.

## Key Facts

| | |
|---|---|
| **Core product** | Codebase-aware AI coding platform |
| **Interfaces** | VS Code extension, JetBrains extensions, Auggie CLI |
| **Main features** | Agent, Next Edit, code completions, chat, MCP/native tools |
| **Agent scope** | Can create, edit, or delete files and use terminal/tools with reviewable diffs |
| **PR review** | Available on all paid plans; Enterprise adds advanced review controls |
| **Selectable models** | Claude Haiku/Opus/Sonnet family, Gemini 3.1 Pro, GPT-5.1/5.2/5.4 |
| **Billing unit** | Credits, pooled at team level |
| **Paid data use** | Paid plans exclude AI training on customer data under commercial terms |
| **Pricing** | Indie $20/mo, Standard $60/developer/mo, Max $200/developer/mo, Enterprise custom |

## What It Actually Is

Augment is an assistant layer for developers who already live in an IDE. Agent handles multi-step coding tasks. Next Edit guides repetitive or related edits. Completions cover the low-latency inline suggestion loop. Auggie CLI brings the same context engine into terminal sessions.

Agent can plan and implement features, upgrade dependencies, document changes, queue tests in the terminal, open Linear tickets, and start pull requests. The important practical detail is reviewability: Augment shows code diffs, tool calls, terminal commands, and checkpoints so a developer can steer or roll back a run.

The product is strongest when the repository already has meaningful structure: tests, package scripts, conventions, docs, and review habits. Augment's context engine can surface that structure to the model; it cannot manufacture engineering discipline from an untested codebase.

## Decision Matrix

| Need | Augment fit | Why |
|---|---|---|
| Existing enterprise codebase | Strong | Editor extensions, context engine, paid no-training terms |
| Greenfield app from a prompt | Weak | Replit Agent, Lovable, or Base44 are more direct |
| Multi-editor team rollout | Strong | VS Code, JetBrains, and CLI surfaces |
| Heavy autonomous CLI loop | Medium | Auggie CLI exists, but Claude Code is cleaner for terminal-first work |
| Low-cost autocomplete | Weak | GitHub Copilot is cheaper and simpler |
| PR review plus coding | Strong | Code Review can use the same paid credit pool |

## When To Pick Augment Code

- **You have a large monorepo or long-lived product codebase.** Augment's pitch is repository understanding, not greenfield app scaffolding.
- **Your team uses multiple editors.** VS Code, JetBrains, and CLI coverage make it easier to standardize the assistant without forcing one editor.
- **You want coding and review in one tool.** Credits can be used for Agent work and Code Review.
- **You care about commercial data terms.** Paid plans state that customer data is not used for AI training.
- **You want MCP and native tools.** Augment can connect to external tooling for richer context and task execution.

## When To Pick Something Else

- **Best GUI-first AI IDE:** [Cursor](/tools/cursor/). Stronger all-in-one agent window and editor-native orchestration.
- **Best terminal agent:** [Claude Code](/tools/claude-code/). Cleaner for autonomous CLI loops.
- **Cheapest mainstream coding assistant:** [GitHub Copilot](/tools/github-copilot/). Better value if completions are the main need.
- **Open-source, bring-your-own-key agent:** [Cline](/tools/cline/) or [Continue](/tools/continue/).
- **Non-developer app builder:** [Lovable](/tools/lovable/), [Base44](/tools/base44/), or [Replit Agent](/tools/replit-agent/).

## Pricing

Pricing via [Augment Code pricing](https://www.augmentcode.com/pricing):

| Plan | Price | Included credits | Fit |
|---|---:|---:|---|
| Indie | $20/mo | 40,000 | One developer using AI a few times per week |
| Standard | $60/developer/mo | 130,000 | Small teams shipping production code |
| Max | $200/developer/mo | 450,000 | Heavy agent usage |
| Enterprise | Custom | Custom | SSO, compliance, dedicated support, bespoke limits |

Auto top-up is listed at $15 for 24,000 credits. Augment's pricing FAQ gives rough examples: a small task with 10 tool calls might cost around 300 credits, while a complex task with 60 tool calls might cost around 4,300 credits.

## Against The Alternatives

| | Augment Code | Cursor | GitHub Copilot |
|---|---|---|---|
| **Primary shape** | IDE extensions + CLI | Full VS Code fork | Extensions across popular IDEs |
| **Best moat** | Codebase context engine | Agent window and editor integration | Distribution through GitHub/Microsoft |
| **Team fit** | Mixed-editor teams | VS Code-first teams | Broadest mainstream adoption |
| **Pricing floor** | $20/mo | Free, then $20/mo Pro | $10/mo individual Copilot |
| **Review workflow** | Built-in Code Review | Bugbot add-on | GitHub-native review features |
| **Best viewed as** | AI layer for production codebases | AI-native editor | Default commodity coding assistant |

## Failure Modes

- **Credit accounting is real work.** Teams need to watch usage by mode and user, especially once Agent and Code Review share the same credit pool.
- **Not a full editor replacement.** That is a feature for some teams, but developers who want a purpose-built AI IDE may prefer Cursor or Windsurf.
- **Agent quality depends on repo hygiene.** Large codebases with weak tests, sparse conventions, or fragile build steps still need careful human review.
- **Indie is light for daily agent work.** 40,000 credits is useful for evaluation, not sustained heavy use.
- **Enterprise value depends on controls.** SSO, CMEK, ISO 42001, data residency, SIEM integration, and audit trails matter only if your organization will use them.
- **Model menus change.** Augment exposes multiple frontier models, but availability and defaults can shift. Pin a team default and track spend by model.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline. Scoring follows the four-dimension rubric at [/about/scoring/](/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-04-28 against primary Augment sources.

## FAQ

**Is Augment Code free?**
No persistent free tier was used for this review. Public pricing starts at Indie for $20/month.

**Does Augment work in JetBrains?**
Yes. Augment documents JetBrains IDE support for completions across IDEs such as WebStorm, PyCharm, and IntelliJ.

**What is Auggie CLI?**
Auggie CLI brings Augment's agent, context engine, and tools into terminal workflows.

**Does Augment train on paid customer data?**
Augment's pricing FAQ says paid plans exclude AI training on customer data under its Commercial Terms of Service.

## Sources

- [Augment Code pricing](https://www.augmentcode.com/pricing): plan prices, credits, top-ups, paid data-use statement
- [Augment documentation](https://docs.augmentcode.com/introduction): IDE and CLI surfaces
- [Augment Agent docs](https://docs.augmentcode.com/using-augment/agent): Agent capabilities, checkpoints, tool use, review flow
- [Augment available models](https://docs.augmentcode.com/models/available-models): current selectable model list and picker behavior

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
- **Alternatives:** [Cursor](/tools/cursor/) · [Claude Code](/tools/claude-code/) · [GitHub Copilot](/tools/github-copilot/) · [Windsurf](/tools/windsurf/) · [Cline](/tools/cline/) · [Continue](/tools/continue/)
