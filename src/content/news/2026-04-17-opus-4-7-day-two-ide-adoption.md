---
type: news
slug: 2026-04-17-opus-4-7-day-two-ide-adoption
title: "Cursor, Windsurf, and Zed Ship Claude Opus 4.7 on Day Two"
date: 2026-04-17
severity: minor
summary: "Twenty-four hours after Anthropic's release, Cursor, Windsurf, Zed, and Continue all rolled out Opus 4.7 as a selectable model. Antigravity has not yet added 4.7 and still routes to Opus 4.6. The speed of IDE adoption reflects how tightly coupled the coding-assistant market has become to Anthropic's release cadence."
affects: [cursor, windsurf, zed, continue, antigravity, claude, claude-code]
categories: [ai-coding]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-17
last_verified: 2026-04-17
sources:
  - url: "https://github.blog/changelog/2026-04-16-claude-opus-4-7-is-generally-available/"
    title: "Claude Opus 4.7 is generally available on GitHub Copilot"
---

Cursor, Windsurf, Zed, and Continue all added Opus 4.7 support within 24 hours of Anthropic's April 16 release. GitHub Copilot shipped same-day. Claude Code picked up 4.7 immediately through the Anthropic SDK.

The exception is Google Antigravity, which still routes coding requests to Opus 4.6. Google has not published a 4.7 adoption date for Antigravity.

IDE-level availability matters more than model benchmarks for most developers. A 4.7 that ships as the default on day two means the measurable gains on agentic coding, tool use, and long-context reasoning reach working developers within the same week as the model release. Sonnet 4.6 and Haiku 4.5 remain the recommended defaults for latency-sensitive and batch workloads.

API pricing on 4.7 stays at $5 input and $25 output per million tokens, unchanged from 4.6. The new tokenizer produces 1.0 to 1.35x more tokens per input, so budget-sensitive workloads should re-benchmark before migrating.

## Sources

- [Claude Opus 4.7 GA on GitHub Copilot](https://github.blog/changelog/2026-04-16-claude-opus-4-7-is-generally-available/)
- [Anthropic Opus 4.7 release coverage (VentureBeat)](https://venturebeat.com/technology/anthropic-releases-claude-opus-4-7-narrowly-retaking-lead-for-most-powerful-generally-available-llm)
