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
died: 2023-03
cause: shutdown
acquired_by: ""
seo_title: "OpenAI Codex: What Happened? (Discontinued)"
meta_description: "OpenAI Codex API was deprecated in March 2023. Learn what it was, why OpenAI shut it down, and the best alternatives for AI coding today."
author: "aipedia.wiki Editorial"
last_updated: 2026-04-14
---

# OpenAI Codex (Discontinued)

OpenAI Codex was a dedicated AI code-generation API based on GPT-3, fine-tuned on billions of lines of public code from GitHub. It was the original engine behind GitHub Copilot from its launch in 2021 through early 2023. OpenAI deprecated the Codex API on March 23, 2023, directing developers to GPT-4, which had surpassed it on every benchmark.

## What It Was

Codex was offered as a standalone API with two primary models: `code-davinci-002` (most capable, optimized for code completion and generation) and `code-cushman-001` (faster, lighter). It supported over a dozen programming languages, with strongest performance in Python, JavaScript, TypeScript, Go, Ruby, and SQL.

Key capabilities included:

- **Code completion:** fill in next lines given a prefix
- **Docstring-to-code:** write a natural language description, get working code
- **Code-to-explanation:** describe what existing code does
- **Unit test generation:** produce test cases from a function signature
- **Cross-language translation:** convert code between languages

During its beta period (2021–2022), Codex was free. When it moved to general availability, it was priced at $0.10 per 1,000 tokens for `code-davinci-002`. GitHub Copilot's subscription model abstracted these costs for end users.

## What Happened

OpenAI announced the deprecation of the Codex API on March 23, 2023, with the models going offline that same day. The official rationale was straightforward: GPT-4, released earlier in March 2023, was significantly better at code than Codex on every measure. Maintaining a separate specialized API became redundant.

GitHub Copilot had already begun migrating from Codex to GPT-4 in early 2023 as part of Copilot X. Developers using the Codex API directly were given no migration window — the deprecation was effective immediately upon announcement, which drew criticism from teams that had built production tooling around the models.

## Why It Failed

Codex was not a product failure — it succeeded at its job and powered one of the most successful developer tools in history. It was retired because a general-purpose model (GPT-4) outperformed a specialized one (Codex), making the specialized model redundant. This is a common pattern in AI product cycles: fine-tuned specialist models get leapfrogged by the next generation of foundation models. OpenAI's incentive to maintain the Codex API separately evaporated once GPT-4 made it obsolete.

The immediate deprecation without migration window was the only genuine failure — production systems using `code-davinci-002` broke overnight.

## Alternatives

If you were using the Codex API directly, the best replacements are:

- **GPT-4o via OpenAI API** — the direct successor; better at code than Codex ever was, with 128K context
- **[GitHub Copilot](../tools/github-copilot.md)** — the highest-level abstraction for developers; uses GPT-4o under the hood
- **[Cursor](../tools/cursor.md)** — IDE-integrated AI coding built on top of frontier models including Claude and GPT-4o
- **[Aider](../tools/aider.md)** — open-source CLI coding agent with model flexibility

## Sources

- [OpenAI deprecation announcement — March 2023](https://openai.com/blog/gpt-4)
- [OpenAI API deprecation notice](https://platform.openai.com/docs/deprecations)
