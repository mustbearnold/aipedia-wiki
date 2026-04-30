---
type: news
slug: 2026-04-26-github-copilot-cloud-agent-metrics
title: "GitHub adds Copilot cloud-agent fields to usage metrics"
date: 2026-04-26
severity: minor
summary: "GitHub added a used_copilot_cloud_agent field to Copilot usage metrics reports, helping enterprise and organization admins track cloud-agent adoption during the coding-agent rename period."
affects: [github-copilot]
categories: [ai-tools, ai-coding, enterprise-ai]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-30
last_verified: 2026-04-30
sources:
  - url: "https://github.blog/changelog/2026-04-23-copilot-cloud-agent-fields-added-to-usage-metrics/"
    title: "Copilot cloud agent fields added to usage metrics - GitHub Changelog"
---

GitHub added new Copilot cloud-agent reporting fields to usage metrics.

The new `used_copilot_cloud_agent` boolean appears in user-level reports at enterprise and organization levels. GitHub says it mirrors the older `used_copilot_coding_agent` field, which remains for backward compatibility until August 1, 2026.

## Why it matters

Enterprise AI adoption needs measurement. If an admin cannot tell who used an agent, which plan consumed it, and where usage is growing, the product is harder to govern.

## Tool impact

This is not a user-facing [GitHub Copilot](/tools/github-copilot/) feature. It is an admin feature. But admin surfaces increasingly decide whether AI agents survive enterprise rollout.
