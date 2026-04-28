---
type: news
slug: 2026-04-27-github-copilot-usage-based-billing
title: "GitHub Copilot moves to usage-based billing on June 1"
date: 2026-04-27
severity: major
summary: "GitHub will move all Copilot plans to usage-based billing on June 1, 2026. Premium requests are being replaced by monthly GitHub AI Credits, token-based usage accounting, and optional paid overages for paid plans."
affects: [github-copilot]
categories: [ai-coding, ai-business, ai-pricing]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-28
last_verified: 2026-04-28
sources:
  - url: "https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/"
    title: "GitHub Copilot is moving to usage-based billing - GitHub Blog"
  - url: "https://github.blog/changelog/2026-04-27-github-copilot-code-review-will-start-consuming-github-actions-minutes-on-june-1-2026/"
    title: "GitHub Copilot code review will start consuming GitHub Actions minutes on June 1, 2026 - GitHub Changelog"
---

GitHub is changing the economics of Copilot.

On June 1, 2026, every GitHub Copilot plan will move to usage-based billing. The current premium-request framing is being replaced by **GitHub AI Credits**, with usage calculated from token consumption across input, output, and cached tokens.

Paid plans will include a monthly credit allotment and the option to buy additional usage. That makes Copilot feel less like a flat-seat coding assistant and more like an enterprise AI utility meter.

## What changed

GitHub says all Copilot plans will transition on June 1.

Instead of counting premium requests, each plan will include monthly GitHub AI Credits. Usage will be calculated from token consumption using each model's listed API rates. That means heavy agentic sessions, long-context reviews, and frontier-model calls are more likely to expose cost differences than simple autocomplete.

There is a second billing change for code review. Starting June 1, Copilot code review on private repositories will consume GitHub Actions minutes from the user's or organization's plan entitlement. Public repositories are not changing; Actions minutes remain free there. The code-review change applies to Copilot Pro, Pro+, Business, and Enterprise.

Until June 1, GitHub says Copilot code review continues to draw only from the existing premium request unit allowance and does not consume Actions minutes.

## Why it matters

Copilot is moving into the same cost discipline as other AI development platforms.

The old premium-request model hid a lot of variance. One request could be a small editor interaction or a much larger model call. Token-based accounting is more legible for GitHub and model providers, but it asks teams to think harder about the real cost of agentic development.

For individual developers, the important question is whether normal editor work stays inside the monthly allotment. For teams, the important question is governance: budgets, model policies, usage reporting, and whether private-repo code review starts competing with CI usage for Actions minutes.

## Buyer takeaway

Copilot is still one of the strongest AI coding products because it sits inside GitHub, VS Code, pull requests, and the developer workflow. This update does not reduce its utility.

It does change the value calculation.

Teams should separate three usage lanes:

- Low-cost daily completion and chat.
- Mid-cost review, refactor, and documentation work.
- High-cost agentic loops using frontier models and broad repository context.

That distinction matters because usage-based billing rewards teams that route routine work to cheaper models and reserve expensive model calls for tasks that actually need them.

## What to watch

Before June 1, engineering leaders should review Copilot usage metrics, GitHub Actions budgets, and private-repo review volume.

The risk is not just a higher bill. It is a bill that surprises the wrong owner because AI review usage and CI/CD minutes now share more of the same operational budget surface.
