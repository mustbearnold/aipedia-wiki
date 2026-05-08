---
type: news
slug: 2026-05-07-github-copilot-rubber-duck-cross-model-review
title: "GitHub Copilot CLI Rubber Duck now pairs GPT and Claude as critics"
date: 2026-05-07
severity: major
summary: "GitHub expanded Rubber Duck in Copilot CLI so GPT-orchestrated sessions can call a Claude-powered critic, while Claude sessions can use GPT-5.5 for a stronger second opinion."
categories: [ai-coding, ai-agents, ai-models]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-09
last_verified: 2026-05-09
affects: [github-copilot, claude]
related_tools: [github-copilot, claude]
sources:
  - url: https://github.blog/changelog/2026-05-07-rubber-duck-in-github-copilot-cli-now-supports-more-models/
    title: "Rubber Duck in GitHub Copilot CLI now supports more models"
---

# GitHub Copilot CLI Rubber Duck now pairs GPT and Claude as critics

GitHub expanded Rubber Duck in Copilot CLI on May 7, 2026. Rubber Duck is Copilot CLI's cross-family review agent, intended to give a second opinion from a different model family.

When a Copilot CLI session uses a GPT model as the orchestrator and `/experimental` is enabled, Copilot can dispatch a Claude-powered Rubber Duck critic. When Claude is the orchestrator, GitHub says the critic model can now be GPT-5.5.

## Why this matters

The interesting part is not the brand mix. It is the admission that single-model coding agents miss things a different model family may catch: architecture mistakes, subtle bugs, and cross-file conflicts.

This is the direction serious AI coding tools are moving: orchestration plus independent review, not one model generating code and grading itself.

## Buyer take

Developers using Copilot CLI should test Rubber Duck on real refactors, not only toy tasks. The best fit is likely code where a second opinion is worth the latency: migration scripts, security-sensitive changes, database logic, and multi-file edits.

For teams comparing Copilot with Cursor, Claude Code, and Codex, Rubber Duck improves Copilot's CLI story but does not replace human review. Treat it as a risk-reduction layer before PR review.

## What is still unclear

The feature is behind `/experimental`, and GitHub did not publish quantitative evals showing how often Rubber Duck catches issues missed by the orchestrator.
