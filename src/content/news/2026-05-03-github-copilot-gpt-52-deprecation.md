---
type: news
slug: 2026-05-03-github-copilot-gpt-52-deprecation
title: "GitHub sets June 1 retirement for GPT-5.2 and GPT-5.2-Codex in Copilot"
date: 2026-05-03
severity: major
summary: "GitHub will remove GPT-5.2 and GPT-5.2-Codex from most Copilot experiences on June 1, pushing users to GPT-5.5 and GPT-5.3-Codex while Enterprise admins review model policies."
affects: [github-copilot]
categories: [ai-coding, ai-models]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-03
last_verified: 2026-05-03
sources:
  - url: https://github.blog/changelog/2026-05-01-upcoming-deprecation-of-gpt-5-2-and-gpt-5-2-codex/
    title: "GitHub Changelog: Upcoming deprecation of GPT-5.2 and GPT-5.2-Codex"
---

# GitHub sets June 1 retirement for GPT-5.2 and GPT-5.2-Codex in Copilot

GitHub has put a date on the next Copilot model cleanup: GPT-5.2 and GPT-5.2-Codex will be deprecated across Copilot Chat, inline edits, Ask, Agent mode, code completions, and other Copilot experiences on June 1, 2026. The one exception GitHub names is GPT-5.2-Codex inside Copilot Code Review.

The suggested replacements are straightforward: GPT-5.5 for GPT-5.2, and GPT-5.3-Codex for GPT-5.2-Codex. Enterprise administrators may need to enable the alternatives through Copilot model policies before developers see them in the model selector.

This is not a flashy launch, but it is operationally important. Copilot is no longer a static subscription with one hidden model. It is a fast-rotating model router where the default set changes on a cadence that admins, power users, and benchmarkers need to track.

## Why this matters

The retirement clarifies GitHub's current ladder.

GPT-5.5 is the higher-end general coding and reasoning path inside Copilot Pro+, Business, and Enterprise. GPT-5.3-Codex is the replacement for older Codex-specialized workflows. Keeping GPT-5.2-Codex alive only for Copilot Code Review suggests GitHub still sees that model variant as useful in a narrower review context, even while moving chat, agent, and completion experiences forward.

The admin burden is the hidden story. Enterprises with model allow/deny policies may think they already bought access to the best models, only to discover developers cannot select the replacement because policy was not updated. The June 1 date gives teams a clean migration window: enable alternatives, update internal docs, refresh eval baselines, and watch premium-credit or AI-credit consumption under the new models.

## What teams should do now

Copilot admins should check three things before June 1.

First, confirm whether GPT-5.5 and GPT-5.3-Codex are enabled for the right user groups. GitHub's own note says availability can be checked in individual Copilot settings and the VS Code/github.com model selector after policy enablement.

Second, update any team playbooks that say "use GPT-5.2" or "use GPT-5.2-Codex." Agent prompts, internal coding guides, onboarding docs, and eval scripts are exactly where old model names linger.

Third, rerun the team's coding-agent evals. Model retirement is not just a selector cleanup. It can change latency, token burn, review behavior, and failure modes. If you rely on Copilot for private-repo code review, separately track the exception: GPT-5.2-Codex remains there for now, but that may turn into its own migration later.

## Buyer take

This strengthens Copilot's value proposition and its complexity at the same time. The upside is that GitHub keeps paying attention to the model stack instead of letting stale defaults rot. The downside is that buyers now need model-governance hygiene: policy ownership, release monitoring, eval baselines, and budget checks.

For individual developers, the practical advice is simple: move routine work to GPT-5.3-Codex or cheaper defaults, reserve GPT-5.5 for harder reasoning, and avoid building muscle memory around model names that may disappear on the next monthly cleanup.
