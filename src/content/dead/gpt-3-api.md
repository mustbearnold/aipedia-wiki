---
type: dead
slug: gpt-3-api
title: GPT-3 API (text-davinci models)
tagline: OpenAI's third-generation language models text-davinci-002 and text-davinci-003 deprecated in January 2024.
category: ai-writing
company: OpenAI
url: https://openai.com
status: dead
launched: 2020-06
died: 2024-01-04
cause: shutdown
acquired_by: ""
seo_title: "GPT-3 API (text-davinci): What Happened? (Deprecated)"
meta_description: "OpenAI deprecated GPT-3's text-davinci models on January 4, 2024. Learn what they were, what replaced them, and how to migrate."
author: "aipedia.wiki Editorial"
last_updated: 2026-06-27
last_verified: 2026-06-27
---

# GPT-3 API (text-davinci Models) Shutdown

OpenAI's GPT-3 API text-davinci-002 and text-davinci-003 models powered early AI writing applications until their shutdown on January 4, 2024. OpenAI ended support for these legacy completion models to shift developers to newer chat-based endpoints like gpt-3.5-turbo.[2]

## What It Was

GPT-3 launched in June 2020 as OpenAI's breakthrough in large language models, with API access expanding in late 2021. The text-davinci series formed GPT-3's top capabilities: text-davinci-001 in 2021, text-davinci-002 with RLHF improvements in 2022, and text-davinci-003 for better instruction following in November 2022.[2]

These models used a completion API (prompt input, text output) before chat formats emerged. Pricing reached $0.02 per 1,000 tokens for text-davinci-003. Applications included blog generation, marketing copy, summarization, question-answering, early chatbots, and code tasks.[2]

## What Happened

OpenAI announced deprecations for older GPT-3 completions models including text-davinci-002 and text-davinci-003 in July 2023, setting January 4, 2024, as the shutdown date.[2] Post-shutdown, calls routed to gpt-3.5-turbo-instruct as a bridge, though outputs differed enough to affect some uses.[2]

This followed signals since ChatGPT's November 2022 launch, pushing toward gpt-3.5-turbo chat models. The text-davinci models joined prior GPT-3 deprecations in a pattern of retiring legacy endpoints.[2]

## Why It Died

Newer models like GPT-3.5 (2022) and GPT-4 (2023) outperformed text-davinci on benchmarks while cutting costs: gpt-3.5-turbo at $0.002 per 1,000 tokens, a 10x drop.[2] OpenAI maintains 12 to 24 months of overlap before full shutdowns, as seen with this GPT-3 cycle completing amid GPT-4 adoption.[2]

Retaining infrastructure for low-usage models proved inefficient as capabilities advanced.

## Current Alternatives

Teams replacing text-davinci models use these active APIs as of June 2026:

- **[GPT-5.5](../tools/chatgpt.md)** via OpenAI API: Current flagship line after the GPT-4o shutdown on February 16, 2026; handles text generation with top performance.[1][2]
- **[Claude](../tools/claude.md)** via Anthropic API: Matches GPT capabilities for writing; reduces OpenAI reliance.[1]
- **[Gemini](../tools/gemini.md)** via Google API: Competitive on instruction tasks; viable migration option.[1]
- **Llama 4 (open-source)**: Self-hostable at low cost; approaches closed-model quality for text tasks.[1]

## Lessons

OpenAI's model lifecycle shows rapid iteration: expect 12 to 24 month support windows before deprecations, as with text-davinci to GPT-4o, now to GPT-5 family.[1][2] Developers must audit dependencies yearly and test replacements early, since bridges like gpt-3.5-turbo-instruct alter behaviors.[2]

Diversification cuts risks; relying on one provider invites disruptions, as GPT-4o retirement affected API users despite ChatGPT variances.[1][3] Open-source options like Llama provide hedges against proprietary shutdowns.[1]

## Sources

- [OpenAI deprecations page](https://developers.openai.com/api/docs/deprecations)[2]
- [GPT-4o retirement details](https://www.nxcode.io/resources/news/gpt-4o-retirement-2026)[1]
- [GPT-4o shutdown report](https://www.aicerts.ai/news/agreeable-shut-down-openai-retires-gpt-4o-amid-backlash/)[3]
---