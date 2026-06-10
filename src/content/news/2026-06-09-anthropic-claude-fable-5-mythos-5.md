---
type: news
slug: 2026-06-09-anthropic-claude-fable-5-mythos-5
title: "Anthropic launches Claude Fable 5 and restricted Claude Mythos 5"
date: 2026-06-09
severity: breaking
summary: "Anthropic launched Claude Fable 5 as its generally available Mythos-class model, with safeguards, higher pricing, 30-day retention rules, and restricted Claude Mythos 5 access for approved cyberdefense and infrastructure partners."
categories: [ai-chatbots, ai-coding, ai-infrastructure, ai-research]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-10
last_verified: 2026-06-10
related_tools: [claude, claude-code, cursor, github-copilot]
sources:
  - url: https://www.anthropic.com/news/claude-fable-5-mythos-5
    title: "Anthropic: Claude Fable 5 and Claude Mythos 5"
  - url: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5
    title: "Claude API docs: Introducing Claude Fable 5 and Claude Mythos 5"
  - url: https://aws.amazon.com/blogs/aws/anthropic-claude-fable-5-on-aws-mythos-class-capabilities-with-built-in-safeguards-now-available/
    title: "AWS: Anthropic Claude Fable 5 on AWS"
---

# Anthropic launches Claude Fable 5 and restricted Claude Mythos 5

Anthropic launched **Claude Fable 5** on June 9, 2026 as the first generally available Mythos-class Claude model, while keeping **Claude Mythos 5** restricted to approved partners through Project Glasswing and future trusted-access programs.

AiPedia verified Anthropic's announcement, Claude API documentation, and AWS Bedrock availability notes on June 10, 2026.

## What changed

Fable 5 is the public-facing release. Anthropic positions it above Opus-class Claude models for long-running software engineering, knowledge work, vision, scientific research, and other difficult agentic tasks.

Mythos 5 is the more restricted sibling. Anthropic says it shares the same underlying model but has safeguards lifted in selected domains for approved cyberdefenders and infrastructure providers. That matters because Anthropic is trying to split frontier capability into two buying lanes:

- **General users and most enterprises:** use Claude Fable 5 with conservative safeguards.
- **Approved high-trust security and infrastructure teams:** use Claude Mythos 5 through restricted access.

## Availability and price

Claude Fable 5 is available through the Claude API, Claude Platform on AWS, Amazon Bedrock, Vertex AI, and Microsoft Foundry according to Anthropic's docs. Developers can call it with the `claude-fable-5` model ID on Anthropic's API.

The listed price is **$10 per million input tokens and $50 per million output tokens** for both Fable 5 and Mythos 5. Anthropic also says these Mythos-class models carry 30-day data retention requirements and are not available under zero data retention.

For subscription users, the access story is temporary and capacity-dependent. Anthropic says Fable 5 is included on Pro, Max, Team, and seat-based Enterprise plans through June 22, 2026, then requires usage credits from June 23 unless Anthropic extends or restores the included window.

## Why tool buyers should care

This is not just another model card. It is a procurement fork.

If you buy [Claude](/tools/claude/) for everyday research, writing, coding, and analysis, Fable 5 is the model to test for the hardest work you currently route to Opus. If you buy [Claude Code](/tools/claude-code/) for repo-scale work, Fable 5 is the release to evaluate on long-horizon migrations, complex refactors, benchmark-quality code review, and design-to-code tasks.

If you operate in cybersecurity, critical infrastructure, or advanced bio/life-sciences research, the more important question is whether you qualify for restricted Mythos-class access and whether the 30-day retention requirement is acceptable for your data-governance posture.

## Watch-outs

The safeguards are part of the product, not a footnote. Anthropic says some high-risk requests fall back to Claude Opus 4.8 and that conservative classifiers may catch harmless sessions. Teams should test their own workflows before assuming Fable 5 will behave like a simple drop-in upgrade.

The retention policy is also material. If your organization requires zero data retention for sensitive work, Fable 5 and Mythos 5 may not fit that workload as of June 10, 2026.

Cost needs its own pilot. Fable 5's headline quality may justify the premium for hard problems, but it can become expensive when users hand it vague, long-running tasks without budgets, review stops, or prompt discipline.

## Buyer action

Run a controlled Fable 5 pilot before changing defaults:

- Pick five hard tasks that Opus 4.8, GPT-5.5, Gemini 3.5, or your current coding stack struggles with.
- Measure outcome quality, time saved, review burden, token cost, and refusal/fallback behavior.
- Separate high-trust workflows from routine chat so expensive model access does not become the default for lightweight work.
- Update data-retention approvals before sending regulated, customer, source-code, or security-sensitive context.
- For coding teams, require pull-request review and CI evidence before accepting agent-produced changes.

## AiPedia verdict

Claude Fable 5 is a major release because Anthropic is no longer holding all Mythos-class capability behind a narrow gate. The buyer upside is real for complex work. The buyer risk is also real: higher cost, retention requirements, safety fallbacks, and more autonomous output mean teams need stronger governance, not just a stronger model.
