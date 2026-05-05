---
type: news
slug: 2026-04-26-github-copilot-byok-vscode
title: "GitHub Copilot Business and Enterprise get BYOK models in VS Code"
date: 2026-04-26
severity: major
summary: "GitHub made bring-your-own-language-model-key support available in VS Code for Copilot Business and Enterprise users, letting teams use provider API keys in VS Code Chat, built-in plan agent workflows, and custom agents."
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

The supported model routes named by GitHub include provider keys for Anthropic, Gemini, OpenAI, OpenRouter, and Azure, plus locally running models through Ollama and Foundry Local. Organization admins can disable the policy in Copilot settings if they do not want developers adding their own model routes.

## Why it matters

This gives enterprises more control over model routing and billing while keeping Copilot inside the developer environment.

The important boundary is completions. BYOK applies to VS Code Chat and agent workflows, not inline code completion. That makes it most relevant for tasks where teams want a specific provider model for planning, debugging, refactoring, or custom agents while still using the familiar Copilot interface.

That boundary keeps the launch from being a full replacement for Copilot's built-in model stack. It is better understood as a flexible chat-and-agent routing layer. A team can keep Copilot as the developer UX while using a preferred model contract for architecture discussion, test generation, migration planning, or agentic tasks.

## What admins need to decide

BYOK changes the governance model. The same VS Code surface can now send prompts to different providers, with different logging, retention, model behavior, cost controls, and regional processing terms.

Before enabling broad use, teams should decide:

- Which model providers are approved for source code and internal context?
- Whether local Ollama or Foundry Local use is allowed for sensitive repositories.
- How developers should label BYOK usage in issue, pull-request, or audit workflows.
- Whether provider billing alerts exist outside GitHub's Copilot quota reporting.
- Which workflows should stay on bundled Copilot models for supportability.

## Tool impact

For [GitHub Copilot](/tools/github-copilot/), BYOK makes the product less dependent on a single bundled model picker. Teams can standardize on Copilot UX while routing some work to their own provider contracts.

Admins should review provider terms, logging, retention, rate limits, and cost controls before enabling BYOK broadly. Otherwise, the same developer experience can hide very different data and billing paths.

For competitors, this raises the bar. Standalone coding assistants need to beat Copilot not only on model quality, but on enterprise policy, IDE convenience, and model-choice flexibility. The more Copilot becomes a neutral-ish model surface inside VS Code, the harder it is for a separate tool to win on "we support your preferred model" alone.

## Aipedia take

BYOK is a strong enterprise move, but it is not magic. It gives teams more choice, and with that choice comes more governance work. The best rollout pattern is controlled: approve a small set of providers, define which repositories can use them, monitor costs outside Copilot quotas, and keep completion expectations separate from chat-and-agent expectations.
