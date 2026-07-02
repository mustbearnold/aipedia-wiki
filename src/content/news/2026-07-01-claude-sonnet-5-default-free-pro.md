---
type: news
slug: 2026-07-01-claude-sonnet-5-default-free-pro
title: "Claude Sonnet 5 becomes the default model for Free and Pro users"
date: 2026-07-01
severity: major
summary: "Anthropic's Claude Sonnet 5 is now the default model across Free and Pro tiers, with a 1M token context window and introductory pricing of $2/$10 per million tokens through August 31. It targets Opus 4.8 level performance at Sonnet-tier cost."
categories: [ai-chatbots, ai-coding, ai-infrastructure]
author: "aipedia.wiki Editorial"
last_updated: 2026-07-01
last_verified: 2026-07-01
related_tools: [claude, claude-code, github-copilot]
sources:
  - url: https://www.anthropic.com/news/claude-sonnet-5
    title: "Anthropic: Introducing Claude Sonnet 5"
  - url: https://platform.claude.com/docs/en/docs/about-claude/models/overview
    title: "Claude Docs: Models overview"
  - url: https://github.blog/changelog/2026-06-30-claude-sonnet-5-is-generally-available-for-github-copilot/
    title: "GitHub Changelog: Claude Sonnet 5 is generally available for GitHub Copilot"
---

# Claude Sonnet 5 becomes the default model for Free and Pro users

Anthropic shipped Claude Sonnet 5 on June 30 and made it the default model for every Free and Pro user on [Claude](/tools/claude/) as of July 1. Anthropic's announcement describes it as the most agentic Sonnet the company has built, with performance close to flagship Opus 4.8 on many tasks but priced at Sonnet tier. It is also rolling out to Max, Team, and Enterprise plans, Claude Code, and the Claude API under the model ID `claude-sonnet-5`.

This is a mass-market release, not a niche upgrade. Sonnet is the tier most Claude users actually run day to day, so a default-model swap changes the baseline experience for the largest share of Anthropic's user base at once.

## What changed

- Claude Sonnet 5 (`claude-sonnet-5`) is now the default model for Free and Pro users on [Claude](/tools/claude/) and claude.ai.
- Anthropic's official model comparison lists a 1M token context window and 128k max output tokens, matching Opus 4.8 and Fable 5 on both specs.
- Introductory pricing is $2 per million input tokens and $10 per million output tokens through August 31, 2026, stepping up to standard pricing of $3/$15 per million tokens afterward.
- Anthropic says Sonnet 5 performs close to Opus 4.8 on many tasks while keeping Sonnet-tier pricing, and it carries the same reliable knowledge cutoff (January 2026) as Opus 4.8 and Fable 5.
- Sonnet 5 does not support Priority Tier, unlike some other current models.
- Claude Sonnet 5 also [reached general availability in GitHub Copilot on June 30](/news/2026-06-30-claude-sonnet-5-github-copilot-ga/), available to Pro, Pro+, Max, Business, and Enterprise Copilot users under Zero Data Retention.

## Buyer signal

For teams comparing [ChatGPT](/tools/chatgpt/), [Gemini](/tools/gemini/), and Claude for everyday coding and knowledge work, the pitch is straightforward: Sonnet-tier cost with performance closer to a flagship model. Anthropic explicitly frames Sonnet 5 as a "strict improvement" over Sonnet 4.6, with a wider range of cost-performance options.

The GitHub Copilot rollout matters just as much as the claude.ai default. Developers already inside [AI Coding](/categories/ai-coding/) workflows in VS Code, JetBrains, or the CLI can now pick Sonnet 5 without leaving their existing tool, which is where most day-to-day model switching actually happens.

## What to do

- If you are on Free or Pro and relied on a pinned model, confirm your workflows still behave as expected after the default switch.
- Lock API integrations to the dated model ID if you need pricing and behavior stability past the August 31 introductory window.
- Re-run your standard coding and agentic-task evals against Sonnet 5 before assuming parity with Sonnet 4.6; "strict improvement" claims are Anthropic's own benchmarking, not independent verification.
- If Priority Tier access matters for latency-sensitive production traffic, check whether Sonnet 5's lack of that feature affects your SLA plans.

## AiPedia take

A default-model swap for Free and Pro is Anthropic pushing its best cost-to-capability model to the widest possible audience, and pairing it with day-one GitHub Copilot availability shows the model was built with coding workflows in mind. The pricing window through August 31 is worth calendaring; budget-sensitive teams should lock in usage now.
