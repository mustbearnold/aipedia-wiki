---
type: news
slug: 2026-04-20-anthropic-claude-system-prompt-timeline
title: "Simon Willison Builds Git-Based Timeline of Every Claude System Prompt from 3.0 to Opus 4.7"
date: 2026-04-20
severity: notable
summary: "Researcher Simon Willison published a git-commit-based archive tracing every published Anthropic system prompt from Claude 3.0 (July 2024) through Opus 4.7 (April 2026). The methodology converts Anthropic's monolithic markdown documentation into per-model files with synthetic commit dates, enabling diff-by-diff review of how the system prompt evolved between versions. Anthropic remains the only major AI lab that publishes system prompts for its user-facing chat systems."
affects: [claude]
categories: [ai-research, ai-transparency]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-19
last_verified: 2026-04-19
sources:
  - url: "https://simonwillison.net/"
    title: "Simon Willison's Weblog (April 18, 2026 post on Claude system prompt timeline)"
---

Independent AI researcher **Simon Willison** published April 18, 2026 a git-based archive of every system prompt Anthropic has disclosed for the Claude chat interface, from Claude 3.0 (July 2024) through the current Opus 4.7 (April 2026).

## What's in the archive

Anthropic publishes its system prompts in a monolithic markdown file that covers all models as a single document. Willison's research tool converts that document into:

- **Separate files per model and per model family** (Opus, Sonnet, Haiku)
- **Synthetic git commit dates** so each prompt change shows up in git history at roughly the correct date
- **Browsable via the GitHub commit view** for diff-by-diff review

This enables three things that are not possible with the monolithic source:

1. **Trace evolution.** See how the system prompt for Claude 3 Opus became Claude 3.5, then 4.0, 4.5, 4.6, 4.7.
2. **Compare differences.** Diff any two versions side by side.
3. **Attribute changes to specific dates.** Understand when a given behaviour (refusals, format guidance, tool-use instructions) was added or removed.

## Why this matters

Anthropic is **the only major AI lab** that publishes the system prompts for its user-facing chat systems. OpenAI does not publish ChatGPT's system prompt. Google does not publish Gemini's. xAI does not publish Grok's. This makes Anthropic's disclosure the only primary source for researching how user-facing AI behaviour is shaped at the prompt layer.

That said, the monolithic format limited how researchers could study changes over time. Willison's tool removes that barrier.

## What researchers can now see

The archive makes visible:

- **Refusal-policy evolution.** How Claude's safety refusals shifted between versions
- **Format-output guidance.** When Claude was told to default to markdown, switch to plain text, use code blocks, etc.
- **Tool-use instructions.** How the system prompt guides Claude's use of file tools, web search, computer use
- **Persona instructions.** Subtle wording changes in how Claude is told to describe itself or its capabilities
- **Date grounding.** When (and how) Claude is told to reason about the current date

## Significance

For tool buyers and teams building on Claude, the archive is useful for:

- **Reproducibility.** If a behaviour changes between Claude versions, the system prompt is one of two variables that might explain it (the other being model weights)
- **Prompting strategy.** Seeing what Anthropic itself tells Claude helps developers write complementary user-level system prompts
- **Red teaming.** Security researchers can track whether known prompt-injection defences persist across versions

For the AI transparency debate, Willison's tool strengthens the case that system-prompt disclosure should be an industry norm. One competitor (Anthropic) does it; the rest do not. Having a browsable timeline makes the transparency gap more visible.

## On the Meta "headless services" observation

In a related post April 19, Willison also covered Meta's strategic shift toward "headless" services where APIs become the primary interface rather than GUIs. The observation is adjacent to the system-prompt work: as AI agent orchestration replaces direct-user-facing interfaces, system prompts become more load-bearing, not less. The model's behaviour is increasingly determined by the prompt layer rather than the UI layer.

## Links

- Simon Willison's weblog: [simonwillison.net](https://simonwillison.net/)
- Anthropic's published system prompts: [docs.claude.com/en/release-notes/system-prompts](https://docs.claude.com/en/release-notes/system-prompts)

For aipedia.wiki readers using Claude professionally, the archive is a quiet but significant research asset. Bookmark it if you build anything that depends on Claude's behaviour staying consistent over time.
