---
type: news
slug: 2026-06-05-github-copilot-model-deprecations-plugins
title: "GitHub pairs Copilot model deprecations with enterprise plugin controls"
date: 2026-06-05
severity: major
summary: "GitHub deprecated GPT-5.2 and GPT-5.2-Codex across most Copilot experiences and started previewing enterprise-managed Copilot plugins in VS Code, turning model and extension governance into buyer requirements."
categories: [ai-coding, ai-automation]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-09
last_verified: 2026-06-09
related_tools: [github-copilot, cursor, codex, windsurf]
sources:
  - url: https://github.blog/changelog/2026-06-05-gpt-5-2-and-gpt-5-2-codex-deprecated/
    title: "GitHub: GPT-5.2 and GPT-5.2-Codex deprecated"
  - url: https://github.blog/changelog/2026-06-05-enterprise-managed-plugins-in-vs-code-in-public-preview/
    title: "GitHub: Enterprise-managed plugins in VS Code in public preview"
---

# GitHub pairs Copilot model deprecations with enterprise plugin controls

GitHub's June 5, 2026 Copilot updates show two sides of production AI tooling: model lifecycle risk and enterprise plugin governance.

AiPedia verified both GitHub Changelog entries on June 9, 2026.

## What changed

GitHub says GPT-5.2 and GPT-5.2-Codex are deprecated across most Copilot experiences, including chat, inline edits, ask and agent modes, and completions. GPT-5.2 remains available for Copilot code review. GitHub points users toward newer alternatives such as GPT-5.5 and GPT-5.3-Codex.

GitHub also announced public-preview support for enterprise-managed plugins in VS Code 1.122. Enterprise admins can define plugin marketplaces in `.github-private/.github/copilot/settings.json`, and plugins can be auto-installed. GitHub says hooks and MCP configurations are always enabled in this model.

## Why it matters

Coding-agent buyers now have two governance jobs:

- Manage model churn so workflows do not silently degrade when a favorite model disappears.
- Manage plugin access so agents do not gain uncontrolled routes into internal systems.

This matters especially for companies using [GitHub Copilot](/tools/github-copilot/) beyond autocomplete. Once Copilot agents can work in repos, call tools, use extensions, and create PRs, model and plugin policy becomes part of software-delivery governance.

## Buyer action

Enterprise teams should create a Copilot change-control checklist:

- Approved model list and fallback model.
- Regression tasks for model changes.
- Plugin approval policy.
- MCP and hook review.
- AI Credit budget alerts.
- Required human review for agent-authored changes.

## Watch-outs

Model deprecations are not just a nuisance. They can change coding style, test-fix behavior, hallucination profile, and review quality. If a team depends on a model for migration work or CI repairs, the deprecation plan should include real task re-validation.

## AiPedia verdict

GitHub is making Copilot more powerful and more governable at the same time. That is the right direction. Buyers should treat this as a signal to move Copilot from "developer perk" into the same policy stack as IDE extensions, CI permissions, and repo access.
