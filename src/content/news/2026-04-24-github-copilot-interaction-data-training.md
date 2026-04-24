---
type: news
slug: 2026-04-24-github-copilot-interaction-data-training
title: "GitHub Copilot starts using Free, Pro, and Pro+ interaction data for model training unless users opt out"
date: 2026-04-24
severity: major
summary: "GitHub's Copilot interaction-data policy takes effect on April 24, 2026. From this date onward, inputs, outputs, code snippets, and associated context from Copilot Free, Pro, and Pro+ users may be used to train and improve GitHub AI models unless the user opts out. Copilot Business, Copilot Enterprise, and enterprise-owned repository interaction data are excluded."
affects: [github-copilot]
categories: [ai-coding, ai-policy, ai-business]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-24
last_verified: 2026-04-24
sources:
  - url: "https://github.blog/news-insights/company-news/updates-to-github-copilot-interaction-data-usage-policy/"
    title: "Updates to GitHub Copilot interaction data usage policy - GitHub Blog"
---

GitHub's new **Copilot interaction-data training policy** takes effect on April 24, 2026.

## What changes

For Copilot Free, Pro, and Pro+ users, GitHub says interaction data can be used to train and improve AI models unless users opt out.

GitHub lists the included data as:

- inputs sent to Copilot
- outputs accepted or modified
- code snippets shown to the model
- surrounding cursor context
- comments and documentation
- file names and repository structure
- navigation patterns
- chat, inline suggestion, and feedback interactions

## What is excluded

GitHub says the program does not use:

- Copilot Business interaction data
- Copilot Enterprise interaction data
- enterprise-owned repository interaction data
- data from users who opt out
- issues, discussions, or private repositories at rest

Important nuance: private repositories **at rest** are excluded, but active Copilot interactions can include private-repo context if the user is using Copilot there.

## Why it matters

This is one of the biggest AI-coding privacy changes of 2026 because it affects individual developers by default. It also creates a policy split:

- enterprise users get stronger isolation
- individual users get opt-out training by default

For tool scoring, it is a value-versus-trust tradeoff: Copilot may improve from real-world data, but individual developers and small teams need to revisit privacy settings.

## Related

- [OpenAI releases GPT-5.5 for ChatGPT and Codex](/news/2026-04-23-openai-gpt-55-release/)
- [Google says 75% of its new internal code is AI-generated](/news/2026-04-23-google-75-percent-internal-code-ai-generated/)
