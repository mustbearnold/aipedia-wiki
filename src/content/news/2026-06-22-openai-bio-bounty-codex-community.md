---
type: news
slug: 2026-06-22-openai-bio-bounty-codex-community
title: "OpenAI's GPT-5.5 Bio Bounty deadline makes safety testing part of the Codex story"
date: 2026-06-22
severity: major
summary: "OpenAI's GPT-5.5 Bio Bounty application deadline is June 22, 2026, with GPT-5.5 in Codex Desktop in scope. For buyers, this links coding-agent adoption to model safety testing, red-team access, and domain-specific risk review."
categories: [ai-research, ai-coding, ai-chatbots]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-22
last_verified: 2026-06-22
related_tools: [codex, chatgpt]
sources:
  - url: https://openai.smapply.org/prog/gpt-5-5-safety-bio-bounty-program/
    title: "OpenAI: GPT-5.5 Bio Bounty Program"
  - url: https://developers.openai.com/community
    title: "OpenAI Developers: Community"
  - url: /news/2026-06-22-ai-news-desk/
    title: "AiPedia: AI News Desk, June 22, 2026"
---

# OpenAI's GPT-5.5 Bio Bounty deadline makes safety testing part of the Codex story

OpenAI's GPT-5.5 Bio Bounty program reaches its application deadline on June 22, 2026. The program page lists GPT-5.5 in Codex Desktop as the model in scope and offers up to $25,000 for the first true universal jailbreak that clears all five bio-safety questions from a clean chat without prompting moderation.

For the daily context, read: [AI News Desk, June 22, 2026: OpenAI Bio Bounty deadline, Codex community, and AI talent pressure](/news/2026-06-22-ai-news-desk/).

## What changed

- **The deadline is June 22, 2026.** OpenAI's program page lists applications as opening April 23, 2026 and closing June 22, 2026.
- **The scope is specific.** The listed model in scope is GPT-5.5 in Codex Desktop only.
- **The challenge is bio-safety specific.** Participants are asked to identify one universal jailbreaking prompt that succeeds across the listed bio-safety questions.
- **The program is controlled.** OpenAI says invitations go to trusted bio red-teamers and applications are reviewed. It also says prompts, completions, findings, and communications are covered by NDA.
- **Codex community work is active around the same date.** OpenAI Developers lists a June 22 community meetup in Ghent and says verified university students in the United States and Canada can claim $100 in ChatGPT credits to use in Codex.

## Buyer signal: safety evaluation must match the product route

The program is a useful signal because it names a model, a product surface, a risk domain, a test goal, and an access rule. That is the level of detail buyers should ask for when vendors make safety claims.

For a regulated or high-risk workflow, a vague statement that a model is safe is not enough. Ask:

- Which model and product surface did the safety test cover?
- Which risk domain was tested?
- Were external specialists involved?
- Is the result public, private, or covered by NDA?
- Does the test apply to the API, desktop app, enterprise workspace, or only one route?
- What happens if a user discovers a bypass?

## What this means for Codex buyers

Codex is a coding tool, but coding agents can still route into sensitive areas: bioinformatics repos, security automation, lab software, data pipelines, and regulated internal systems. A safety program around GPT-5.5 in Codex Desktop is a reminder that coding-agent governance should not stop at repo permissions.

Before broad rollout, teams should document:

- allowed repositories and data classes;
- whether the tool can access sensitive research or security materials;
- model and app version in use;
- credit limits and admin reporting;
- escalation path for unsafe completions or jailbreak findings;
- fallback coding assistant if access changes.

## AiPedia verdict

This is a major safety and developer-adoption signal. The bounty is narrow, but that is the point. Serious AI safety claims need scoped tests, named surfaces, and domain expertise.

For Codex buyers, treat this as a reminder to pair adoption with controls: repo access, sensitive-data rules, model-route documentation, spend visibility, and an incident path for unsafe behavior.
