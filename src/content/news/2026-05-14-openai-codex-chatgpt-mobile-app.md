---
type: news
slug: 2026-05-14-openai-codex-chatgpt-mobile-app
title: "OpenAI puts Codex inside the ChatGPT mobile app so coding agents can be steered from a phone"
date: 2026-05-14
severity: major
summary: "OpenAI is rolling Codex into the ChatGPT mobile app on iOS and Android. The preview lets users monitor active Codex work, review outputs, approve commands, change models, and start new threads from a phone while the agent keeps running on a laptop, devbox, or remote environment."
categories: [ai-coding, ai-agents, ai-productivity]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-15
last_verified: 2026-05-15
affects: [codex, chatgpt]
related_tools: [codex, chatgpt]
sources:
  - url: https://openai.com/index/work-with-codex-from-anywhere/
    title: "OpenAI: Work with Codex from anywhere"
  - url: https://help.openai.com/en/articles/6825453-chatgpt-release-notes
    title: "OpenAI Help Center: ChatGPT release notes"
  - url: https://techcrunch.com/2026/05/14/openai-says-codex-is-coming-to-your-phone/
    title: "TechCrunch: OpenAI says Codex is coming to your phone"
  - url: https://tech.yahoo.com/ai/chatgpt/articles/openai-brings-codex-coding-tool-211519150.html
    title: "Reuters via Yahoo: OpenAI brings Codex coding tool to ChatGPT mobile app"
---

# OpenAI puts Codex inside the ChatGPT mobile app so coding agents can be steered from a phone

OpenAI announced on **May 14, 2026** that **Codex** is now rolling into the **ChatGPT mobile app** on iOS and Android. The preview turns ChatGPT mobile into a live control surface for long-running Codex work: users can monitor active threads, review terminal output and diffs, approve commands, change models, and start new work without being at the machine where Codex is running.

The important detail is that the phone is not doing the coding work. OpenAI says Codex still runs across a connected laptop, a dedicated machine such as a Mac mini, a devbox, or a managed remote environment. The mobile app loads live state from that environment, while files, credentials, permissions, and local setup remain on the machine doing the work.

OpenAI also said **more than 4 million people now use Codex every week**. That number matters because mobile access is not a cosmetic app update. It is OpenAI trying to turn agentic coding into an always-on workflow: start the task at a desk, steer it during a commute, approve a command from a phone, then review the diff later.

## What shipped

The mobile preview covers the core Codex loop:

- View active Codex threads from the ChatGPT mobile app.
- Follow screenshots, terminal output, test results, diffs, and approvals.
- Approve or reject next steps when Codex needs permission.
- Change models or direction mid-task.
- Start new Codex work from a phone while the connected machine keeps the actual repo context.

OpenAI says the connection uses a secure relay layer so trusted machines can be reachable across signed-in ChatGPT devices without being exposed directly to the public internet.

The announcement also bundled several enterprise-facing Codex updates. **Remote SSH is generally available**, letting Codex connect into approved remote environments from SSH configuration. **Hooks are generally available** for prompt scanning, validators, logging, memory creation, and repository-specific behavior. **Programmatic access tokens** are available for Business and Enterprise workspaces. OpenAI also says eligible ChatGPT Enterprise workspaces can use Codex in local environments under HIPAA-compliant terms.

## Why this matters

Agentic coding is becoming less like a single IDE session and more like managing work in flight.

The old coding-assistant pattern was synchronous: autocomplete, ask a question, accept a patch, move on. Codex and Claude Code changed that by letting agents work for minutes or hours. The weak point is coordination. Agents still need approvals, clarification, and taste checks at inconvenient moments. Mobile Codex attacks that exact bottleneck.

For developers, this is a quality-of-life release. For teams, it is a workflow-design release. If a coding agent can run inside a devbox while a human approves only the meaningful forks, the bottleneck shifts from typing code to supervising code. That is the same transition happening across sales agents, support agents, security agents, and creative agents.

It also sharpens the Codex vs. Claude Code comparison. Claude Code remains the strongest terminal-native flow for many developers. Codex is leaning harder into a multi-surface product: ChatGPT, desktop, browser extension, CLI, remote machines, and now mobile.

## Buyer take

Use this update if your coding-agent work already runs longer than a quick prompt.

**Good fit:** developers who leave Codex working on bug investigations, test generation, refactors, documentation, CI cleanup, or customer-support reproduction tasks. The phone becomes the place to keep the task moving, not the place to do deep code review.

**Weak fit:** teams that require full desktop review before any command, repo mutation, or PR creation. Mobile approvals are convenient, but convenience can be a security risk if teams treat them as rubber stamps.

**Procurement question:** ask whether mobile approvals are logged with enough detail for your engineering and security process. The feature is most valuable when it preserves the audit trail: who approved what, from which device, against which repo and command.

For individual users, the most practical recommendation is simple: update both ChatGPT mobile and the Codex app on macOS, then test with a low-risk repo before trusting it on production work. OpenAI says Windows connection support is coming soon, so Windows-heavy teams should treat this as a near-term roadmap item rather than a fully cross-platform workflow today.

## What is still unclear

OpenAI did not publish quantified latency numbers for phone-to-agent relay, failure behavior if a connected machine sleeps, or detailed admin controls for mobile approval policy. It also did not say exactly when Windows host connection support will leave "coming soon."

The larger unanswered question is pricing. Codex is bundled into ChatGPT plans, but long-running agent work can burn real compute. As Anthropic's Claude Agent SDK credit split shows, flat-rate subscriptions are under pressure when agents run programmatically or unattended. Codex mobile makes agentic coding easier to use more often; buyers should expect usage accounting to matter more, not less.
