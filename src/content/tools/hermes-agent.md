---
type: tool
slug: hermes-agent
title: Hermes Agent
tagline: Self-improving open-source AI agent from Nous Research. Persistent memory, auto-generated skills, natural language scheduling, six terminal backends, 15+ messaging platforms, and optional Nous Portal tool/model routing.
category: ai-automation
company: nous-research
url: https://hermes-agent.nousresearch.com/
github_url: https://github.com/NousResearch/atropos
pricing_model: open-source
price_range: "Free (MIT license; BYOK API costs)"
status: active
launched: 2026-02
last_updated: 2026-06-12
last_verified: 2026-06-12
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 10
  moat: 4
  longevity: 7
facts:
  best_for:
    value: Best for builders who want an open-source personal/ops agent with persistent memory, skills, scheduled jobs, and
      messaging integrations rather than a single hosted SaaS assistant.
    source: https://hermes-agent.nousresearch.com/
    source_label: Hermes Agent official site
    source_id: hermes-agent-official
    verified_at: '2026-06-12'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  pricing_anchor:
    value: Hermes Agent is MIT-licensed open-source software; real cost depends on the LLM/API providers, optional Nous Portal
      subscription, hosting, sandbox backend, and messaging services connected to it.
    source: https://github.com/NousResearch/hermes-agent
    source_label: Hermes Agent GitHub repository
    source_id: hermes-agent-repository
    verified_at: '2026-06-12'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  open_source_or_local:
    value: The repository is public and designed for self-hosted or user-controlled agent operation.
    source: https://github.com/NousResearch/hermes-agent
    source_label: Hermes Agent GitHub repository
    source_id: hermes-agent-repository
    verified_at: '2026-06-12'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  api_available:
    value: Docs cover the setup and extension path for an agent runtime, including tools, skills, scheduling, provider configuration,
      terminal backends, messaging gateway setup, MCP, and Nous Portal tool routing.
    source: https://hermes-agent.nousresearch.com/docs
    source_label: Hermes Agent docs
    source_id: hermes-agent-docs
    verified_at: '2026-06-12'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  watch_out_for:
    value: 'Hermes Agent is powerful but operator-owned: buyers need comfort managing providers, credentials, tool permissions,
      and long-running agent behavior.'
    source: https://hermes-agent.nousresearch.com/docs
    source_label: Hermes Agent docs
    source_id: hermes-agent-docs
    verified_at: '2026-06-12'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
tags: [open-source, self-hosted, persistent-memory, auto-skills, multi-platform, telegram, discord, slack, whatsapp, signal, nous-research, mit-license]
seo_title: "Hermes Agent: Features, Review & Pricing (June 2026)"
meta_description: "Hermes Agent is Nous Research's MIT-licensed autonomous AI agent, current v0.15.2. Persistent memory, auto-generated skills, natural language cron, six terminal backends, 15+ messaging platforms, and optional Nous Portal routing."
author: "aipedia.wiki Editorial"
best_for:
  - developers wanting a self-improving self-hosted agent
  - scheduled AI tasks delivered to messaging apps
  - teams comfortable with Docker or Modal deploys
  - privacy-first deployments with no data egress
not_best_for:
  - non-technical users wanting plug-and-play agents
  - teams needing IDE-integrated coding assistance
  - workflows where managed cloud uptime is required
quick_answer: >-
  Hermes Agent is Nous Research's MIT-licensed autonomous agent. Current GitHub releases show v0.15.2 as of May 29, 2026. It runs as a persistent server, connects CLI plus 15+ messaging platforms, and can use six terminal backends: local, Docker, SSH, Daytona, Singularity, and Modal. Persistent memory, auto-written skills, natural language cron, subagents, and optional Nous Portal tool/model routing are the differentiators. Free to self-host; bring your own API keys or use a Nous Portal subscription.
price_history:
  - date: 2026-06-02
    plan: "Open-source"
    price: "Free"
    source: "https://github.com/NousResearch/hermes-agent"
    source_label: "Hermes Agent GitHub"
    source_id: hermes-agent-pricing
    note: "Reverified MIT license and current v0.15.2 release. Hermes remains free to self-host; real spend comes from model/API providers, optional Nous Portal subscription, hosting, and connected tools."
  - date: 2026-02-15
    plan: "Open-source"
    price: "Free"
    source: "https://hermes-agent.nousresearch.com/"
    source_label: "Source"
    source_id: hermes-agent-pricing
    note: "Public release under MIT license from Nous Research."
  - date: 2026-04-17
    plan: "Open-source"
    price: "Free"
    source: "https://hermes-agent.nousresearch.com/"
    source_label: "Source"
    source_id: hermes-agent-pricing
    note: "Verified unchanged. Self-hosted only; API costs are BYOK."
  - date: 2026-05-13
    plan: "Open-source"
    price: "Free"
    source: "https://hermes-agent.nousresearch.com/"
    source_label: "Source"
    source_id: hermes-agent-pricing
    note: "Historical May snapshot; superseded by the 2026-06-02 refresh after the v0.15.2 release stream expanded the documented backend/platform surface."
---

# Hermes Agent

Free, MIT-licensed autonomous AI agent from Nous Research ([hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/)). Runs as a persistent server on user infrastructure and connects a CLI plus 15+ messaging platforms from a single gateway.

Three features set it apart from a standard chatbot: persistent memory across restarts, auto-generated skills that the agent writes and refines from experience, and natural language cron scheduling that delivers recurring output to any connected platform.

As of June 12, 2026, the official GitHub release stream is at v0.15.2 and the current docs/README describe a broader platform surface than the early spring build: 15+ messaging platforms, six terminal backends, MCP support, subagents, a Tool Gateway through Nous Portal, and provider switching across Nous Portal, OpenRouter, OpenAI, Anthropic-compatible routes, NovitaAI, NVIDIA NIM, z.ai/GLM, Kimi/Moonshot, MiniMax, Hugging Face, and custom endpoints.

## System Verdict

> **Pick Hermes Agent if a self-hosted assistant that actually remembers and improves is worth setup time.** The agent writes procedural skills after multi-step tasks, stores them for reuse, and keeps full-text searchable memory across sessions. Nothing in the managed-SaaS category behaves this way.
>
> Six terminal backends cover most deploy patterns as of the current docs: local, Docker, SSH, Daytona, Singularity, and Modal. Daytona and Modal are the serverless/persistent options for agents that should hibernate between conversations.
>
> **Skip it if the user wants plug-and-play.** There is no managed cloud. Setup means env vars, Docker, a model API key, and at least one platform integration. [ChatGPT](/tools/chatgpt/) or a hosted Zapier agent will be faster to stand up.
>
> **Who pays what:** Hermes itself is free under MIT. The real cost is the model/API route, optional Nous Portal subscription, hosting, and tool providers. Light self-hosted use can be cheap, but always-on agents, browser tools, image/TTS tools, and frontier-model-heavy workflows need spend limits.

## Key Facts

| | |
|---|---|
| **License** | MIT open-source (Nous Research) |
| **Released** | February 2026 |
| **Current version** | v0.15.2 release stream (verified June 12, 2026) |
| **Deployment** | Self-hosted/local or user-controlled infrastructure (local, Docker, SSH, Daytona, Singularity, Modal) |
| **Platforms from one process** | CLI plus Telegram, Discord, Slack, WhatsApp, Signal, Matrix, Mattermost, Email, SMS, DingTalk, Feishu, WeCom, BlueBubbles, Home Assistant, Microsoft Teams, and more as docs evolve |
| **Model/providers** | Nous Portal, OpenRouter, NovitaAI, NVIDIA NIM, Xiaomi MiMo, z.ai/GLM, Kimi/Moonshot, MiniMax, Hugging Face, OpenAI, and custom endpoints |
| **Persistent memory** | Full-text searchable across sessions and platforms |
| **Auto-generated skills** | Yes, after multi-tool-call tasks |
| **Scheduling** | Natural language cron ("daily digest at 7am") |
| **Serverless hibernation** | Modal backend |

Every data point above was verified against vendor documentation and GitHub releases on 2026-06-12. See Sources.

## What it actually is

A persistent daemon that bridges chat platforms to a large language model and a sandboxed execution environment. The daemon owns memory, scheduling, and the skill library. The model is swappable via config.

Memory is the core primitive. Conversations, user profiles, and learned skills persist across restarts and cross-reference across platforms. A Telegram message can reference a skill written during a CLI session last week.

The skill system is emergent, not pre-authored. After a multi-step task (typically five or more tool calls), the agent can write a structured document capturing the procedure, known pitfalls, and verification steps. That document becomes callable later.

## When to pick Hermes Agent

- **Recurring AI tasks should land in Telegram, Slack, or Discord.** Natural language cron handles the schedule; the platform bridge handles delivery.
- **Memory across weeks matters.** The agent accumulates context on projects, preferences, and past outputs. This is the missing feature in stateless SaaS assistants.
- **Self-hosting is a requirement.** Data stays on user-owned infrastructure. No telemetry, no cloud.
- **Model lock-in is unacceptable.** Provider is a config swap: OpenAI, Anthropic, OpenRouter, Nous Portal, or a custom endpoint.
- **Parallel subagents for concurrent work.** Spawn isolated subagents with independent terminal sessions; useful for pipeline-style tasks.

## When to pick something else

- **IDE-integrated coding help:** [Claude Code](/tools/claude-code/) or [Cursor](/tools/cursor/). Hermes is a conversational assistant, not a codebase editor.
- **Zero-setup managed agent:** [ChatGPT](/tools/chatgpt/) Agent Mode or a hosted Zapier workflow. No server, no Docker.
- **Browser-first autonomous tasks:** [Goose](/tools/goose/) or an Operator-style product. Hermes has browser automation but focus is chat-delivered workflows.
- **Image or video generation:** Hermes has image gen, but dedicated tools like [Midjourney](/tools/midjourney/) and Veo 3 do better work.
- **Strict enterprise audit and SSO:** No managed-tenant option; compliance-heavy teams need a vendored platform.

## Pricing

| Component | Cost |
|---|---|
| Hermes Agent (self-hosted) | Free, MIT license, full feature set |
| Model/API route | Usage-based BYOK, or optional Nous Portal subscription for model/tool routing |
| Daytona or Modal backend | Usage-based/serverless-style persistence. Can hibernate when idle, but operators still need spend and permission controls |

*Verified 2026-06-12 via the [official site/docs](https://hermes-agent.nousresearch.com/docs/) and [GitHub repository/releases](https://github.com/nousresearch/hermes-agent/releases). No mandatory subscription; Nous Portal is optional infrastructure for model/tool routing.*

## Against the alternatives

| | Hermes Agent | AutoGen | Goose | ChatGPT Agent Mode |
|---|---|---|---|---|
| **License** | MIT | MIT | Apache-2.0 | Proprietary |
| **Persistent memory** | Yes, full-text searchable | No, session-only | No built-in | Limited, snippet-based |
| **Auto-written skills** | Yes | No | No | No |
| **Multi-platform chat bridge** | Yes, 6+ platforms | No | No | No |
| **Natural language cron** | Yes | No | No | No |
| **Self-host** | Required | Yes | Yes | No |
| **Managed cloud** | No | No | No | Yes |
| **Best viewed as** | Personal ops daemon | Research framework | CLI agent with MCP | Consumer chat agent |

## Failure modes

- **Self-hosted only.** No managed cloud means the operator owns uptime, updates, and security patches.
- **Setup is not plug-and-play.** Platform bridges, terminal backend, model route, tool permissions, and optional Portal setup all need configuration. Comfortable with Docker or server setup is the baseline.
- **API costs are unbounded by default.** No built-in spend caps. A runaway skill calling OpenAI frontier models can burn through credits fast.
- **Version churn.** Early-stage project; breaking changes to config format have shipped between releases.
- **Low moat.** MIT license plus open architecture means forks are trivial. Differentiation depends on Nous Research staying active.
- **No IDE integration.** Not a coding assistant for in-editor flows.
- **Memory can drift.** Full-text search is useful but does not reason about contradictions; stale facts persist until curated.
- **Smaller ecosystem than OpenClaw.** Fewer community skills and templates to crib from.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies product details against primary sources, and generates the editorial analysis shown. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-06-12 against the [Hermes Agent docs](https://hermes-agent.nousresearch.com/docs/), [GitHub repository](https://github.com/nousresearch/hermes-agent), [GitHub releases](https://github.com/nousresearch/hermes-agent/releases), and [Nous Research](https://nousresearch.com/).

## FAQ

**Is Hermes Agent free?**
Yes. MIT license, full feature set in the open-source release. The only cost is whatever model API the operator configures.

**Which models work?**
Nous Portal, OpenRouter, NovitaAI, NVIDIA NIM, Xiaomi MiMo, z.ai/GLM, Kimi/Moonshot, MiniMax, Hugging Face, OpenAI, and custom endpoints are listed in the current GitHub README. Switching is a config/model selection change.

**What makes it different from a Telegram bot?**
Persistent cross-session memory, auto-generated skills that the agent writes from experience, natural language cron scheduling, and a single process that bridges Telegram, Discord, Slack, WhatsApp, Signal, Email, and CLI.

**Which sandbox backends ship?**
Six in the current docs/README: local, Docker, SSH, Daytona, Singularity, and Modal. Daytona and Modal are the serverless/persistent options that can hibernate when idle.

**Who builds Hermes Agent?**
Nous Research, an AI research lab focused on open-weight models and agent architectures. Hermes Agent ships under the same org that publishes the Hermes model series.

## Sources

- [Hermes Agent official site](https://hermes-agent.nousresearch.com/): feature overview, platform list, setup docs
- [Hermes Agent GitHub](https://github.com/nousresearch/hermes-agent): MIT license, codebase, release notes
- [Nous Research](https://nousresearch.com/): lab background, Hermes model series
- [Hermes Agent docs](https://hermes-agent.nousresearch.com/docs/): sandbox backends, scheduling syntax

## Related

- **Category:** [AI Automation](/categories/ai-automation/)
