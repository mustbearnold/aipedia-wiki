---
type: news
slug: 2026-06-09-anthropic-claude-fable-5-mythos-5
title: "Anthropic launches Claude Fable 5 and restricted Claude Mythos 5"
date: 2026-06-09
severity: breaking
summary: "Anthropic launched Claude Fable 5 as its generally available Mythos-class model, with safeguards, higher pricing, 30-day retention rules, and restricted Claude Mythos 5 access. Update: Anthropic says access to both Fable 5 and Mythos 5 is suspended as of June 12 after a US government directive."
categories: [ai-chatbots, ai-coding, ai-infrastructure, ai-research]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-13
last_verified: 2026-06-13
related_tools: [claude, claude-code, cursor, github-copilot]
sources:
  - url: https://www.anthropic.com/news/fable-mythos-access
    title: "Anthropic: Statement on the US government directive to suspend access to Fable 5 and Mythos 5"
  - url: https://www.anthropic.com/news/claude-fable-5-mythos-5
    title: "Anthropic: Claude Fable 5 and Claude Mythos 5"
  - url: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5
    title: "Claude API docs: Introducing Claude Fable 5 and Claude Mythos 5"
  - url: https://aws.amazon.com/blogs/aws/anthropic-claude-fable-5-on-aws-mythos-class-capabilities-with-built-in-safeguards-now-available/
    title: "AWS: Anthropic Claude Fable 5 on AWS"
---

# Anthropic launches Claude Fable 5 and restricted Claude Mythos 5

Anthropic launched **Claude Fable 5** on June 9, 2026 as the first generally available Mythos-class Claude model, while keeping **Claude Mythos 5** restricted to approved partners through Project Glasswing and future trusted-access programs.

**Update, June 13:** Anthropic says access to both Fable 5 and Mythos 5 is now suspended after a US government directive received on June 12. Anthropic says all other Claude models are unaffected and that it is working to restore access. Read the late-day update: [Claude Fable/Mythos suspended, GPT-5.2 retired, OpenAI probed](/news/2026-06-13-us-blocks-anthropic-fable-mythos-openai-probe/).

AiPedia verified Anthropic's launch announcement, June 12 access statement, Claude API documentation, and AWS Bedrock availability notes on June 13, 2026.

## What changed

Fable 5 is the public-facing release. Anthropic positions it above Opus-class Claude models for long-running software engineering, knowledge work, vision, scientific research, and other difficult agentic tasks.

Mythos 5 is the more restricted sibling. Anthropic says it shares the same underlying model but has safeguards lifted in selected domains for approved cyberdefenders and infrastructure providers. That matters because Anthropic is trying to split frontier capability into two buying lanes:

- **General users and most enterprises:** use Claude Fable 5 with conservative safeguards.
- **Approved high-trust security and infrastructure teams:** use Claude Mythos 5 through restricted access.

## Availability and price

Anthropic's launch documentation said Claude Fable 5 was available through the Claude API, Claude Platform on AWS, Amazon Bedrock, Vertex AI, and Microsoft Foundry, with the `claude-fable-5` model ID on Anthropic's API.

That availability is no longer the current buyer state. As of Anthropic's June 12 statement, access to Fable 5 and Mythos 5 is suspended for all customers while Anthropic complies with a US government directive. Anthropic says access to all other Claude models is not affected.

The listed price is **$10 per million input tokens and $50 per million output tokens** for both Fable 5 and Mythos 5. Anthropic also says these Mythos-class models carry 30-day data retention requirements and are not available under zero data retention.

For subscription users, the original access story was temporary and capacity-dependent. Anthropic said Fable 5 would be included on Pro, Max, Team, and seat-based Enterprise plans through June 22, 2026, then require usage credits from June 23 unless capacity allowed an extension. While access is suspended, buyers should not treat that launch-window packaging as usable plan access.

## Why tool buyers should care

This is not just another model card. It is a procurement fork.

If you buy [Claude](/tools/claude/) for everyday research, writing, coding, and analysis, Fable 5 is the model to test for the hardest work you currently route to Opus. If you buy [Claude Code](/tools/claude-code/) for repo-scale work, Fable 5 is the release to evaluate on long-horizon migrations, complex refactors, benchmark-quality code review, and design-to-code tasks.

If you operate in cybersecurity, critical infrastructure, or advanced bio/life-sciences research, the more important question is whether you qualify for restricted Mythos-class access and whether the 30-day retention requirement is acceptable for your data-governance posture.

## Watch-outs

The safeguards are part of the product, not a footnote. Anthropic says some high-risk requests fall back to Claude Opus 4.8 and that conservative classifiers may catch harmless sessions. Teams should test their own workflows before assuming Fable 5 will behave like a simple drop-in upgrade.

The retention policy is also material. If your organization requires zero data retention for sensitive work, Fable 5 and Mythos 5 may not fit that workload as of June 13, 2026.

Availability is now the main watch-out. If your team was testing Fable 5 for production workflows, do not switch defaults until Anthropic restores access and confirms the model route your account will actually receive.

Cost needs its own pilot. Fable 5's headline quality may justify the premium for hard problems, but it can become expensive when users hand it vague, long-running tasks without budgets, review stops, or prompt discipline.

## Buyer action

Run a controlled Fable 5 pilot before changing defaults:

- Pick five hard tasks that Opus 4.8, GPT-5.5, Gemini 3.5, or your current coding stack struggles with.
- Measure outcome quality, time saved, review burden, token cost, and refusal/fallback behavior.
- Separate high-trust workflows from routine chat so expensive model access does not become the default for lightweight work.
- Update data-retention approvals before sending regulated, customer, source-code, or security-sensitive context.
- For coding teams, require pull-request review and CI evidence before accepting agent-produced changes.

## AiPedia verdict

Claude Fable 5 is a major release because Anthropic tried to move some Mythos-class capability into general availability. The June 12 suspension makes the buyer lesson sharper: higher capability now comes with model-availability risk, retention requirements, safety fallbacks, and government-governance exposure. Treat Fable 5 as a model to watch and test when restored, not as a stable default route today.
