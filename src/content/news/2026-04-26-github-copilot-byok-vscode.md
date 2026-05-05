---
type: news
slug: 2026-04-26-github-copilot-byok-vscode
title: "GitHub Copilot Business and Enterprise get BYOK models in VS Code"
date: 2026-04-26
severity: major
summary: "GitHub made bring-your-own-language-model-key support available in VS Code for Copilot Business and Enterprise users, letting teams use provider API keys in VS Code Chat and agents."
affects: [github-copilot]
categories: [ai-tools, ai-coding, enterprise-ai]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-05
last_verified: 2026-05-05
sources:
  - url: "https://github.blog/changelog/2026-04-22-bring-your-own-language-model-key-in-vs-code-now-available/"
    title: "Bring your own language model key in VS Code now available - GitHub Changelog"
---

GitHub Copilot Business and Enterprise users can now use **bring your own language model key** in VS Code.

GitHub says BYOK models work in VS Code Chat, including the built-in plan agent and custom agents. It does not apply to code completions. Usage is billed directly by the chosen provider and does not count against GitHub Copilot request quotas.

## Why it matters

This gives enterprises more control over model routing and billing while keeping Copilot inside the developer environment.

The important boundary is completions. BYOK applies to VS Code Chat and agent workflows, not inline code completion. That makes it most relevant for tasks where teams want a specific provider model for planning, debugging, refactoring, or custom agents while still using the familiar Copilot interface.

## Tool impact

For [GitHub Copilot](/tools/github-copilot/), BYOK makes the product less dependent on a single bundled model picker. Teams can standardize on Copilot UX while routing some work to their own provider contracts.

Admins should review provider terms, logging, retention, rate limits, and cost controls before enabling BYOK broadly. Otherwise, the same developer experience can hide very different data and billing paths.
