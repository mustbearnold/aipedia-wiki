---
type: news
slug: 2026-04-16-anthropic-claude-opus-47
title: "Anthropic Ships Claude Opus 4.7, Retakes Frontier Lead"
date: 2026-04-16
severity: major
summary: "Anthropic released Claude Opus 4.7 on April 16, narrowly retaking the lead as the most powerful generally-available LLM on agentic coding, scaled tool use, computer use, and financial-analysis benchmarks. Same $5/$25 per MTok pricing, but a new tokenizer produces 1.0-1.35x more tokens per input."
affects: [claude, claude-code]
categories: [ai-chatbots, ai-coding]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-17
last_verified: 2026-04-17
sources:
  - url: "https://venturebeat.com/technology/anthropic-releases-claude-opus-4-7-narrowly-retaking-lead-for-most-powerful-generally-available-llm"
    title: "Anthropic releases Claude Opus 4.7"
  - url: "https://github.blog/changelog/2026-04-16-claude-opus-4-7-is-generally-available/"
    title: "Claude Opus 4.7 is generally available on GitHub Copilot"
---

Anthropic released Claude Opus 4.7 on April 16, two months after Opus 4.6. The model takes measurable leads on agentic coding, scaled tool use, computer use, and financial-analysis benchmarks against GPT-5.4 and Gemini 3.1 Pro. Pricing stays at $5 input and $25 output per million tokens.

The catch: a new tokenizer produces 1.0 to 1.35x more tokens for the same input compared to 4.6. The sticker price is unchanged but effective cost per prompt rises for some workloads. Budget-sensitive API operations should re-benchmark before migrating.

GitHub Copilot shipped 4.7 availability on the same day. Anthropic also rolled out "Fast Mode" on Opus, a beta option at 6x rates ($30 input, $150 output) for latency-sensitive calls. Batch API discount remains 50% across all models; prompt caching drops cache-hit input cost to 10% of standard.

Claude Code, Anthropic's CLI coding agent, picked up 4.7 immediately. The 1M token context window on Opus and Sonnet is unchanged. No price drop on the older 4.6, which stays available alongside 4.7 for workloads that do not want to re-benchmark tokenizer output.

## Sources

- [Anthropic releases Claude Opus 4.7](https://venturebeat.com/technology/anthropic-releases-claude-opus-4-7-narrowly-retaking-lead-for-most-powerful-generally-available-llm)
- [Claude Opus 4.7 is generally available on GitHub Copilot](https://github.blog/changelog/2026-04-16-claude-opus-4-7-is-generally-available/)
