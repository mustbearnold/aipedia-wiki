---
type: news
slug: 2026-05-06-anthropic-spacex-colossus-claude-limits
title: "Anthropic uses SpaceX Colossus capacity to raise Claude Code and API limits"
date: 2026-05-06
severity: major
summary: "Anthropic said a compute deal with SpaceX's Colossus 1 facility lets it raise Claude Code five-hour limits, remove peak-hour reductions for Pro and Max users, and increase Claude Opus API rate limits."
categories: [ai-infrastructure, ai-coding, ai-models]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-07
last_verified: 2026-05-07
affects: [claude, claude-code]
related_tools: [claude, claude-code]
sources:
  - url: https://www.anthropic.com/news/higher-limits-spacex
    title: "Higher usage limits for Claude and a compute deal with SpaceX"
---

# Anthropic uses SpaceX Colossus capacity to raise Claude Code and API limits

Anthropic announced on May 6, 2026, that a compute agreement with SpaceX will substantially increase Claude capacity. The company says the additional capacity is already translating into higher usage limits for Claude Code and the Claude API.

The customer-facing changes are direct: Anthropic says it is doubling Claude Code five-hour rate limits for Pro, Max, Team, and seat-based Enterprise plans, removing peak-hour reductions for Claude Code on Pro and Max, and materially increasing Claude Opus API rate limits.

The underlying infrastructure is SpaceX's Colossus 1 facility. Public reporting around the announcement describes the agreement as providing more than 300 megawatts of capacity and over 220,000 NVIDIA GPUs within the month, making it one of the most visible near-term compute expansions in the frontier-model market.

## Why this matters

For Claude Code users, limits are not a footnote. Agentic coding sessions can burn through usage windows quickly, especially when they read repos, run tests, and iterate on failures.

For API customers, higher Opus throughput improves the case for using Claude on large document, coding, and agent workloads where rate limits previously forced queueing or fallback models.

## Buyer take

Rebenchmark Claude Code before assuming old usage limits still define the product. Teams that rejected Claude Code because of rate-window friction may get a different answer after the limit changes.

For API users, compare the new rate limits with actual latency, cost, and error-rate behavior. More capacity helps, but it does not remove the need for backoff, fallbacks, and budget controls.

## What is still unclear

The announcement improves near-term capacity, but the durability of higher limits depends on sustained demand, pricing, regional infrastructure, and whether Anthropic changes plan packaging again.
