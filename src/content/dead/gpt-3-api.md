---
type: dead
slug: gpt-3-api
title: GPT-3 API (text-davinci models)
tagline: OpenAI's landmark third-generation language models — text-davinci-002 and text-davinci-003 — deprecated in January 2024.
category: ai-writing
company: OpenAI
url: https://openai.com
status: dead
launched: 2020-06
died: 2024-01
cause: shutdown
acquired_by: ""
seo_title: "GPT-3 API (text-davinci): What Happened? (Deprecated)"
meta_description: "OpenAI deprecated GPT-3's text-davinci models on January 4, 2024. Learn what they were, what replaced them, and how to migrate."
author: "aipedia.wiki Editorial"
last_updated: 2026-04-14
---

# GPT-3 API — text-davinci Models (Discontinued)

The GPT-3 API, specifically the `text-davinci-002` and `text-davinci-003` models, were OpenAI's primary language model endpoints from 2020 through 2022. They powered the first wave of AI writing tools and startups — Jasper, Copy.ai, and hundreds of others were built entirely on `text-davinci-003`. OpenAI deprecated these models on January 4, 2024, directing developers to the `gpt-3.5-turbo-instruct` or GPT-4 family.

## What It Was

GPT-3 launched in June 2020 as a research breakthrough, followed by general API availability in late 2021. The `davinci` series represented GPT-3's most capable models:

- **text-davinci-001:** original GPT-3 davinci model (2021)
- **text-davinci-002:** improved with instruction fine-tuning via RLHF (2022) — the model that spawned the AI writing tool industry
- **text-davinci-003:** further improved instruction following, better at longer-form content (November 2022)

These models used a text completion API format (prompt in, completion out) rather than the chat format later popularized by ChatGPT. Pricing was $0.02 per 1,000 tokens for `text-davinci-003` — relatively expensive by later standards.

Use cases that ran on these models:

- Long-form blog post and article generation
- Marketing copy and ad creative at scale
- Summarization of long documents
- Question-answering over custom knowledge bases
- Early chatbot products before the ChatGPT era
- Code generation (before Codex was deprecated)

## What Happened

OpenAI deprecated the `text-davinci-002` and `text-davinci-003` models effective January 4, 2024, along with several other legacy GPT-3 and Codex models. The deprecation had been signaled months in advance; OpenAI had been steering developers toward the `gpt-3.5-turbo` chat models since ChatGPT's launch in November 2022.

After January 4, 2024, calls to the deprecated model IDs began routing to `gpt-3.5-turbo-instruct` — a legacy completions-format model OpenAI maintained as a compatibility bridge. This eased migration for some applications but changed output characteristics enough to break others.

## Why It Was Deprecated

GPT-3.5 and GPT-4, available from 2022 and 2023 respectively, were significantly more capable than the `text-davinci` models on every benchmark. The chat-format models (`gpt-3.5-turbo`) were also cheaper: $0.002 per 1,000 tokens vs. $0.02 for `text-davinci-003` — a 10x cost reduction. Maintaining aging model infrastructure for diminishing usage made no business sense.

The broader pattern: OpenAI has consistently deprecated older models as newer generations arrive, with roughly 12–24 months of overlap. The GPT-3 deprecation was a clean cycle completion as GPT-4 became the standard.

## Alternatives

For teams that were using GPT-3 `text-davinci` models:

- **GPT-4o mini via OpenAI API** — best price/performance replacement for most text generation tasks; cheaper than `text-davinci-003` was
- **GPT-3.5-turbo-instruct** — OpenAI's legacy compatibility model in completion format, if you cannot migrate to chat format
- **[Claude](../tools/claude.md) via Anthropic API** — competitive with GPT-4 on writing quality; good alternative if you want to diversify away from OpenAI dependency
- **Mistral or Llama 3 (open-source)** — if cost is the primary concern; self-hostable models now match GPT-3 quality at near-zero inference cost

## Sources

- [OpenAI model deprecation policy](https://platform.openai.com/docs/deprecations)
- [OpenAI January 2024 deprecation announcement](https://openai.com/blog)
