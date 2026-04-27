---
type: news
slug: 2026-04-27-deepseek-v4-pro-price-cut
title: "DeepSeek cuts V4-Pro pricing by 75% to push developer adoption"
date: 2026-04-27
severity: major
summary: "Reuters reported that DeepSeek is offering developers a 75% discount on DeepSeek-V4-Pro until May 5 and cutting cache-hit prices across its API lineup to one-tenth of the previous rate."
affects: [deepseek]
categories: [ai-model-release, ai-business, ai-tools]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-27
last_verified: 2026-04-27
sources:
  - url: "https://ca.marketscreener.com/news/china-s-deepseek-slashes-prices-for-new-ai-model-ce7f59dcdd8fff24"
    title: "China's DeepSeek slashes prices for new AI model - Reuters via MarketScreener"
  - url: "https://www.bloomberg.com/news/articles/2026-04-27/deepseek-slashes-fees-for-new-ai-model-in-chinese-price-war"
    title: "DeepSeek Slashes Fees for New AI Model in Chinese Price War - Bloomberg"
---

DeepSeek turned its V4 launch into a pricing story.

Reuters reported that the company is offering developers a **75% discount on DeepSeek-V4-Pro until May 5** and cutting **input cache-hit pricing across the DeepSeek API lineup to one-tenth of the previous rate**. Bloomberg separately framed the move as part of a Chinese AI price war.

## Why it matters

This is not another benchmark claim. It is a distribution move.

Frontier and near-frontier models are now competing on latency, context length, coding quality, agent reliability, and price. DeepSeek is trying to make the cost side impossible for developers to ignore, especially for agent workloads that reuse long context and can benefit heavily from cheaper cache hits.

## Tool impact

For DeepSeek API users, the immediate question is whether the V4-Pro discount is enough to justify testing it in coding agents, research agents, and long-document workflows before May 5.

For teams using OpenAI, Anthropic, Google, or hosted model routers, the larger question is whether DeepSeek forces another round of price matching, routing changes, or "good enough" model swaps for background tasks.

## What to watch

The discount is time-boxed. Buyers should separate temporary promotional pricing from durable unit economics.

Also watch whether V4-Pro reliability holds under production traffic. A cheap model that needs more retries can still become expensive inside real agent loops.

## Related

DeepSeek's V4 preview is covered separately in [DeepSeek previews new AI model that closes the gap with frontier systems](/news/2026-04-24-deepseek-v4-preview-release/).
