---
type: news
slug: 2026-05-08-github-copilot-code-review-metrics-comment-types
title: "GitHub adds Copilot code-review comment types to usage metrics"
date: 2026-05-08
severity: minor
summary: "GitHub's Copilot usage metrics API now breaks code-review suggestions down by comment type, helping organizations see whether Copilot is surfacing security, bug-risk, and other categories of feedback."
categories: [ai-coding, ai-enterprise, ai-analytics]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-09
last_verified: 2026-05-09
affects: [github-copilot]
related_tools: [github-copilot]
sources:
  - url: https://github.blog/changelog/2026-05-08-copilot-code-review-comment-types-now-in-usage-metrics-api/
    title: "Copilot code review comment types now in usage metrics API"
---

# GitHub adds Copilot code-review comment types to usage metrics

GitHub added a `copilot_suggestions_by_comment_type` array to the Copilot usage metrics API on May 8, 2026. The new field appears under `pull_requests` in enterprise and organization reports.

The API now reports aggregated counts by comment type, such as `security` or `bug_risk`, along with the total number of Copilot review suggestions and how many were applied by developers. GitHub says the breakdown works in single-day and 28-day rolling-window reports.

## Why this matters

AI code review is easier to buy than to evaluate. Raw usage counts tell admins that Copilot reviewed PRs, but not whether it is catching security issues, bug risks, maintainability problems, or low-value noise.

Comment-type metrics move Copilot code review closer to an accountable engineering control. Teams can compare which categories Copilot flags, which ones developers apply, and whether automated review is reducing real risk.

## Buyer take

Copilot Business and Enterprise admins should add these metrics to their quarterly AI coding review. If Copilot generates many suggestions but few accepted fixes, the issue may be configuration, repository fit, developer trust, or suggestion quality.

The data is especially useful before expanding Copilot code review from a pilot to many repositories. Measure comment categories before and after rollout so the investment is tied to outcomes, not just activation.

## What is still unclear

GitHub says repository-level drilldown is not currently available, though it is being investigated. That limits how precisely enterprises can identify which repos get the most valuable or noisy Copilot feedback.
