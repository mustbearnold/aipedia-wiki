---
type: dead
slug: openai-codex
title: OpenAI Codex
tagline: OpenAI's dedicated code-generation API, the engine that originally powered GitHub Copilot.
category: ai-coding
company: OpenAI
url: https://openai.com
status: dead
launched: 2021-08
died: 2023-03-23
cause: shutdown
acquired_by: ""
seo_title: "OpenAI Codex: What Happened? (Discontinued)"
meta_description: "OpenAI Codex API was deprecated on March 23, 2023. Learn what it was, why OpenAI shut it down, and the best alternatives for AI coding today."
author: "aipedia.wiki Editorial"
last_updated: 2026-06-12
last_verified: 2026-06-12
---

# OpenAI Codex (Discontinued)

OpenAI Codex was a dedicated API for AI code generation based on GPT-3 and fine-tuned on public GitHub code. OpenAI shut it down on March 23, 2023, because newer models like GPT-3.5-Turbo and later successors outperformed it on coding tasks.[1][2]

> **Not the same as today's Codex.** This page covers the original 2021 to 2023 Codex completion API. OpenAI later reused the Codex name for its current coding agent (the Codex CLI and cloud agent, now running on the GPT-5.5 Codex model). That product is active and unrelated to the deprecated API below.

## What It Was

Codex launched in August 2021 as a free beta API. It powered GitHub Copilot and supported code completion, generation from natural language, code explanation, unit test creation, and cross-language translation across languages like Python, JavaScript, and SQL.[2]

The API offered models such as `code-davinci-002` for high capability and `code-cushman-001` for speed. Pricing started at $0.10 per 1,000 tokens upon general availability. GitHub Copilot handled costs via subscription for its users.[2]

## What Happened

OpenAI announced the Codex API deprecation on March 23, 2023, with models `code-davinci-002`, `code-davinci-001`, `code-cushman-002`, and `code-cushman-001` going offline that day.[1][2] Developers were directed to GPT-3.5-Turbo or GPT-4o as replacements, with no migration period.[2]

GitHub Copilot transitioned to newer models around that time. A later `codex-mini-latest` model was deprecated on February 12, 2026, but the core Codex API ended in 2023.[1]

## Why It Died

Codex succeeded in powering tools like Copilot but became redundant when general-purpose models like GPT-3.5-Turbo and GPT-4 surpassed its coding performance.[2] OpenAI prioritized investment in newer foundation models over maintaining a specialized API.[1][2]

The sudden shutdown without warning disrupted production systems dependent on Codex models.[2]

## Current Alternatives

Current replacements for Codex API users include:

- **[GitHub Copilot](../tools/github-copilot.md)**, IDE-integrated coding assistant using latest OpenAI models
- **[Cursor](../tools/cursor.md)**, AI-powered code editor with frontier model support
- **[Aider](../tools/aider.md)**, Open-source CLI tool for AI-assisted coding
- **[Claude Code](../tools/claude-code.md)**, Anthropic's coding interface via API and apps
- **[Windsurf (formerly Codeium)](../tools/codeium.md)**, AI coding autocomplete and agent, now part of Cognition's stack

## Lessons

Specialized AI models like Codex often get replaced by advancing general-purpose foundation models, as seen with GPT-3.5 and beyond.[1][2] Companies prioritize scalable, multi-task models over niche APIs.

Sudden deprecations without transition periods risk breaking user workflows; phased sunsets with clear timelines build trust.[2]

Rapid AI progress shortens product lifecycles, requiring developers to build model-agnostic systems for resilience.[1]

## Sources

- [OpenAI API Deprecations](https://developers.openai.com/api/docs/deprecations)[1]
- [Hacker News: OpenAI Codex Discontinuation](https://news.ycombinator.com/item?id=35242069)[2]
- [OpenAI Codex Changelog](https://developers.openai.com/codex/changelog)[4]