---
type: news
slug: 2026-06-11-openai-acquires-ona-codex-persistent-agents
title: "OpenAI to acquire Ona, giving Codex a persistent cloud workspace for long-running agents"
date: 2026-06-11
severity: major
summary: "OpenAI announced on June 11, 2026 that it will acquire Ona, bringing secure, customer-controlled cloud execution and orchestration into Codex. The buyer signal is that coding-agent competition is moving beyond model quality into where agents run, how credentials are scoped, how work is logged, and whether long-running tasks can continue across devices and sessions."
categories: [ai-coding, ai-automation, ai-infrastructure]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-15
last_verified: 2026-06-15
related_tools: [codex, chatgpt, claude-code, cursor, devin, github-copilot]
sources:
  - url: https://openai.com/index/openai-to-acquire-ona/
    title: "OpenAI: OpenAI to acquire Ona"
  - url: https://ona.com/stories/ona-joins-openai
    title: "Ona: Ona is joining OpenAI"
  - url: https://openai.com/codex/
    title: "OpenAI: Codex product page"
  - url: https://developers.openai.com/codex/pricing
    title: "OpenAI Developers: Codex pricing"
---

# OpenAI to acquire Ona, giving Codex a persistent cloud workspace for long-running agents

OpenAI announced on **June 11, 2026** that it has agreed to acquire **Ona**, a cloud development environment and agent infrastructure company focused on moving developer and agent work into secure cloud workspaces. The deal is subject to customary closing conditions and regulatory approvals. Until it closes, OpenAI and Ona remain separate companies.

For [Codex](/tools/codex/) buyers, the important part is not the acquisition label. It is the runtime layer. OpenAI says Ona will bring secure, persistent, customer-controlled cloud execution into Codex so agents can keep working across hours or days, continue after a laptop or browser closes, and operate inside environments that match enterprise security and governance requirements.

AiPedia verified OpenAI's announcement, Ona's announcement, the live Codex product page, and Codex pricing docs on June 15, 2026.

## What changed

- **OpenAI plans to acquire Ona.** Ona's team is expected to join the Codex team after close.
- **Codex is being pushed beyond one-session coding tasks.** OpenAI says more than 5 million people use Codex each week, up 400% from earlier in 2026, and frames the product around research, analysis, building, automation, and sustained work.
- **Persistent execution is the acquisition thesis.** Ona's technology gives agents a cloud workspace with tools, context, credentials, logs, and review paths that can keep running over time.
- **Customer control is the enterprise pitch.** OpenAI highlights customer-controlled execution, scoped credentials, activity logging, security boundaries, and review workflows rather than only faster code generation.

## Why it matters

Coding agents are becoming less like autocomplete and more like delegated work systems. That changes the buying question. A team evaluating [Codex](/tools/codex/), [Claude Code](/tools/claude-code/), [Cursor](/tools/cursor/), [GitHub Copilot](/tools/github-copilot/), or [Devin](/tools/devin/) now has to ask where the agent runs and who controls the environment, not just which model scores highest on a benchmark.

Ona gives OpenAI a stronger answer for production work. If Codex can run inside a governed cloud environment with repeatable setup, scoped credentials, reviewable activity, and visible progress, it becomes easier to use for migrations, vulnerability fixes, test generation, internal tooling, and other tasks that should not depend on one developer keeping a local machine open.

It also makes agent cost control more urgent. Persistent background work can quietly consume credits, model tokens, CI minutes, browser sessions, and human review time. The same feature that makes Codex more useful can also make it easier to burn through budget if the task is vague.

## Buyer checklist

Before rolling out persistent Codex work, ask:

- Which cloud account or workspace does the agent run inside?
- How are repository, package, secret, database, browser, and production credentials scoped?
- Can admins inspect logs, diffs, shell commands, browser actions, and approvals after the fact?
- Can long-running work pause for human approval before merge, deploy, data export, or credential use?
- Can teams set budget limits by user, workspace, repo, model, task type, or time window?
- What happens to work state if the acquisition closes, product packaging changes, or an enterprise account moves between plans?

## AiPedia verdict

This is a major Codex infrastructure signal. OpenAI is buying the workspace layer that long-running agents need to feel enterprise-safe: reproducible environments, customer control, auditability, scoped access, and cross-device continuity. Treat it as a reason to re-test Codex on serious background work, but do not treat the acquisition as a guarantee until the transaction closes and the integrated controls are visible in customer accounts.
