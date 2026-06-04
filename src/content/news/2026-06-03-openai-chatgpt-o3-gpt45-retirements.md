---
type: news
slug: 2026-06-03-openai-chatgpt-o3-gpt45-retirements
title: "OpenAI sets ChatGPT retirement dates for o3 and GPT-4.5"
date: 2026-06-03
severity: major
summary: "OpenAI's ChatGPT release notes say o3 retires from ChatGPT on August 26, 2026 and GPT-4.5 retires from ChatGPT on June 27, 2026; the notice applies to ChatGPT only, not the API."
categories: [ai-chatbots, ai-coding]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-03
last_verified: 2026-06-03
related_tools: [chatgpt]
sources:
  - url: https://help.openai.com/en/articles/6825453-chatgpt-release-notes
    title: "OpenAI: ChatGPT release notes"
---

# OpenAI sets ChatGPT retirement dates for o3 and GPT-4.5

OpenAI's ChatGPT release notes now list retirement dates for two older paid-user models in ChatGPT: OpenAI o3 and GPT-4.5.

OpenAI says **GPT-4.5 retires from ChatGPT on June 27, 2026** after a 30-day sunset period, and **OpenAI o3 retires from ChatGPT on August 26, 2026** after a 90-day sunset period. The same release note says these changes apply to ChatGPT only and do not change API availability.

## What changed

This is a model-access change inside ChatGPT, not a new product launch.

The affected users are paid ChatGPT users who still select these older models through model settings. Users relying on GPT-5.5 defaults are not the main audience for the notice.

## Why buyers should care

Model retirements are not just trivia. They affect:

- saved prompts that were tuned around an older model style;
- internal docs that tell teams to use a retired model;
- evals and QA baselines that were never rerun on the new default;
- enterprise training material;
- workflows where a "legacy" model behaved differently enough to matter.

This is especially important for teams using [ChatGPT](/tools/chatgpt/) as a broad assistant across writing, analysis, research, and Codex-style coding work. If a team documents "use o3 for this" or "use GPT-4.5 for that," those notes need to be replaced before the cutoff.

## What to do before the dates

Teams should:

- export or copy any model-specific prompt guidance worth preserving;
- rerun critical prompts on the current default and paid-tier models;
- update internal training docs;
- mark GPT-4.5 and o3 workflows as sunsetted;
- tell users the API note is separate from the ChatGPT note.

## AiPedia verdict

This is a **major ChatGPT maintenance story**, not a flashy release.

OpenAI is compressing ChatGPT around newer models. That is normal for a fast-moving assistant, but buyers should not treat model settings as durable infrastructure. If a workflow matters, test it against the model that will actually be available after the retirement date.
