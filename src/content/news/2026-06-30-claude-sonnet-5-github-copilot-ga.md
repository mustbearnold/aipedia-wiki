---
type: news
slug: 2026-06-30-claude-sonnet-5-github-copilot-ga
title: "Claude Sonnet 5 goes generally available in GitHub Copilot"
date: 2026-06-30
severity: minor
summary: "GitHub made Claude Sonnet 5 generally available across Copilot Pro, Pro+, Business, and Enterprise plans, adding a new Sonnet-class option for IDE and CLI workflows. Usage is billed under GitHub's usage-based Copilot pricing, so teams should check consumption before rolling it out broadly."
categories: [ai-coding]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-30
last_verified: 2026-06-30
related_tools: [github-copilot, claude, claude-code]
sources:
  - url: https://github.blog/changelog/2026-06-30-claude-sonnet-5-is-generally-available-for-github-copilot/
    title: "GitHub Changelog: Claude Sonnet 5 is generally available for GitHub Copilot"
  - url: https://www.anthropic.com/news/claude-sonnet-5
    title: "Anthropic: Introducing Claude Sonnet 5"
  - url: https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/
    title: "GitHub Blog: GitHub Copilot is moving to usage-based billing"
---

# Claude Sonnet 5 goes generally available in GitHub Copilot

GitHub made Claude Sonnet 5 generally available in Copilot on June 30, 2026, rolling out to Copilot Pro, Pro+, Max, Business, and Enterprise users. GitHub's changelog describes it as a new Sonnet-class option "for everyday development and agentic workflows," available across VS Code, Visual Studio, JetBrains IDEs, Xcode, Eclipse, the GitHub CLI, mobile apps, and the web. The rollout is gradual, and it operates under GitHub's Zero Data Retention policy for Copilot.

The model itself is not new to [Claude](/tools/claude/) users, but its arrival in [GitHub Copilot](/tools/github-copilot/) matters because of when it landed: the same day GitHub's usage-based billing model is now fully in effect.

## What changed

- Claude Sonnet 5 is now selectable inside Copilot for Pro, Pro+, Max, Business, and Enterprise plans.
- Enterprise and Business admins can control access to the model through Copilot's model policy settings.
- Usage is billed at provider list pricing under GitHub's usage-based billing, which replaced premium request units with token-metered GitHub AI Credits starting June 1, 2026.
- Code completions and Next Edit suggestions remain included in all plans and do not consume AI Credits; Sonnet 5 usage in chat and agentic sessions does.
- Fallback to a lower-cost model when credits run out is no longer available under the new billing system, so exhausted credits mean usage is governed by admin budget controls instead.

## Buyer signal

This is a routine model-availability update on its surface, but the billing context changes what "generally available" means for team budgets. Under the old premium-request system, adding a new frontier model to Copilot was mostly a capability decision. Under usage-based billing, every Sonnet 5 session now draws directly against a team's GitHub AI Credits pool, calculated on input, output, and cached tokens. Teams that don't check per-seat and pooled credit consumption before turning Sonnet 5 on broadly risk the same "meter shock" that some developers reported after the June 1 billing switch.

For engineering leads comparing [AI Coding](/categories/ai-coding/) tools, Sonnet 5's Copilot debut is also a reminder that model choice and platform billing are now tightly coupled. The same model is available directly through Claude Code with its own usage terms, so teams should compare cost per session across both paths rather than assuming Copilot access is the cheaper or simpler option by default.

## What to do

- Confirm your Copilot plan tier and whether Sonnet 5 is enabled under your organization's model policy.
- Check current AI Credits consumption before defaulting teams to Sonnet 5 for agentic or long-running sessions.
- Compare Sonnet 5 costs and quality between GitHub Copilot and direct Claude Code access for your specific workflows.
- Set admin budget controls now, since there is no automatic fallback to a cheaper model once credits run out.

## AiPedia take

Adding a strong Sonnet-class model to Copilot is a good move for developers who want model choice inside one billing relationship, but the real story is that GitHub Copilot has fully shifted the cost conversation onto engineering teams. Sonnet 5's general availability is worth adopting for its coding and agentic strengths. Just don't flip it on for a whole org without checking the meter first.
