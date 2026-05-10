---
type: tool
slug: hermes-agent
title: Hermes Agent
tagline: Self-improving open-source AI agent from Nous Research. Best paired with DeepSeek V4 Flash for low-cost memory, skills, scheduling, browser, and multi-platform automation work.
category: ai-automation
company: nous-research
url: https://hermes-agent.nousresearch.com/
github_url: https://github.com/NousResearch/atropos
pricing_model: open-source
price_range: "Free (MIT license; DeepSeek V4 Flash from $0.14/M input tokens)"
status: active
launched: 2026-02
last_updated: 2026-05-10
last_verified: 2026-05-10
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
    value: Best for builders who want an open-source personal/ops agent with persistent memory, skills, scheduled jobs, browser control,
      messaging integrations, and a low-cost DeepSeek V4 Flash default model rather than a single hosted SaaS assistant.
    source: https://hermes-agent.nousresearch.com/
    source_label: Hermes Agent official site
    source_id: hermes-agent-official
    verified_at: '2026-05-10'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-04'
  pricing_anchor:
    value: Hermes Agent is open-source software; with DeepSeek V4 Flash, model cost can start at $0.14/M cache-miss input tokens
      and $0.28/M output tokens before hosting and messaging costs.
    source: https://api-docs.deepseek.com/quick_start/pricing
    source_label: DeepSeek API pricing docs
    source_id: deepseek-api-pricing
    verified_at: '2026-05-10'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-04'
  open_source_or_local:
    value: The repository is public and designed for self-hosted or user-controlled agent operation.
    source: https://github.com/NousResearch/hermes-agent
    source_label: Hermes Agent GitHub repository
    source_id: hermes-agent-repository
    verified_at: '2026-05-10'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-04'
  api_available:
    value: Docs cover setup for an agent runtime with tools, skills, scheduling, provider configuration, and compatible model endpoints.
    source: https://hermes-agent.nousresearch.com/docs
    source_label: Hermes Agent docs
    source_id: hermes-agent-docs
    verified_at: '2026-05-10'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-04'
  watch_out_for:
    value: 'Hermes Agent is powerful but operator-owned: buyers need comfort managing providers, DeepSeek/OpenRouter credentials,
      tool permissions, memory hygiene, and long-running agent behavior.'
    source: https://hermes-agent.nousresearch.com/docs
    source_label: Hermes Agent docs
    source_id: hermes-agent-docs
    verified_at: '2026-05-10'
  default_model:
    value: "DeepSeek V4 Flash is the recommended low-cost default for routine Hermes Agent work because it supports 1M context, tool calls, thinking/non-thinking modes, and low listed API pricing."
    source: https://api-docs.deepseek.com/quick_start/pricing
    source_label: DeepSeek API pricing docs
    source_id: deepseek-api-pricing
    verified_at: '2026-05-10'
    volatility: high
    confidence: high
    next_review_at: '2026-06-10'
tags: [open-source, self-hosted, persistent-memory, auto-skills, multi-platform, telegram, discord, slack, whatsapp, signal, nous-research, mit-license]
seo_title: "Hermes Agent + DeepSeek V4 Flash: Features, Review & Pricing"
meta_description: "Hermes Agent is Nous Research's MIT-licensed autonomous AI agent. Verified May 2026: pair it with DeepSeek V4 Flash for low-cost 1M-context memory, skills, scheduling, browser, and multi-platform automation."
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
  Hermes Agent is Nous Research's MIT-licensed autonomous agent. It runs as a persistent server and connects messaging, email, CLI, browser, tools, memory, skills, and scheduled jobs from one process. For AiPedia-style maintenance work, DeepSeek V4 Flash is the best low-cost default model because it has 1M context, tool-call support, thinking/non-thinking modes, and very low listed API pricing.
price_history:
  - date: 2026-02-15
    plan: "Open-source"
    price: "Free"
    source: "https://hermes-agent.nousresearch.com/"
    source_label: "Source"
    source_id: hermes-agent-pricing
    note: "Public release under MIT license from Nous Research."
  - date: 2026-04-17
    plan: "DeepSeek V4 Flash"
    price: "$0.14/M cache-miss input, $0.0028/M cache-hit input, $0.28/M output"
    source: "https://api-docs.deepseek.com/quick_start/pricing"
    source_label: "Source"
    source_id: deepseek-api-pricing
    note: "Recommended low-cost default model for routine Hermes Agent operation; pricing remains volatile."
---

# Hermes Agent

Free, MIT-licensed autonomous AI agent from Nous Research ([hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/)). Runs as a persistent server on user infrastructure and connects messaging, email, CLI, browser, memory, skills, tools, and scheduled automations from a single gateway.

Three features set it apart from a standard chatbot: persistent memory across restarts, auto-generated skills that the agent writes and refines from experience, and natural language cron scheduling that delivers recurring output to connected platforms. For cost-sensitive always-on work, AiPedia recommends configuring Hermes Agent with `deepseek-v4-flash` first, then escalating only when verification or task complexity demands a stronger model.

**May 10, 2026 verification:** Hermes Agent's official site lists MIT open source status, persistent memory, auto-generated skills, natural language scheduling, isolated subagents, sandboxing, browser control, and multi-model reasoning. DeepSeek's official API docs list `deepseek-v4-flash` with 1M context, tool calls, JSON output, thinking and non-thinking modes, cache-hit input pricing at $0.0028/M tokens, cache-miss input pricing at $0.14/M tokens, and output pricing at $0.28/M tokens.

## System Verdict

> **Pick Hermes Agent if a self-hosted assistant that actually remembers and improves is worth setup time.** The agent writes procedural skills after multi-step tasks, stores them for reuse, and keeps memory across sessions. Paired with DeepSeek V4 Flash, it becomes unusually cheap for long-running repo maintenance, scheduled checks, and low-risk automation loops.
>
> Six sandbox backends cover every deploy pattern: local, Docker, SSH, Daytona, Singularity, and Modal. Modal and Daytona hibernate when idle, keeping cost near zero between active conversations.
>
> **Skip it if the user wants plug-and-play.** There is no managed cloud. Setup means env vars, Docker, a model API key, and at least one platform integration. [ChatGPT](/tools/chatgpt/) or a hosted Zapier agent will be faster to stand up.
>
> **Who pays what:** Hermes itself is free under MIT. The real cost is the model API and hosting. Start routine automation on DeepSeek V4 Flash, then reserve higher-cost frontier models for sensitive editorial judgments, major refactors, or tasks where V4 Flash fails verification.

## Key Facts

| | |
|---|---|
| **License** | MIT open-source (Nous Research) |
| **Released** | February 2026 |
| **Deployment** | Self-hosted only (local, Docker, SSH, Daytona, Singularity, Modal) |
| **Platforms from one process** | Telegram, Discord, Slack, WhatsApp, Signal, Email, CLI |
| **Recommended default model** | DeepSeek V4 Flash for low-cost routine agent work |
| **DeepSeek V4 Flash context** | 1M tokens |
| **DeepSeek V4 Flash pricing** | $0.0028/M cache-hit input · $0.14/M cache-miss input · $0.28/M output |
| **Model providers** | DeepSeek API, OpenAI, Anthropic, OpenRouter, Nous Portal, custom endpoints |
| **Persistent memory** | Full-text searchable across sessions and platforms |
| **Auto-generated skills** | Yes, after multi-tool-call tasks |
| **Scheduling** | Natural language cron ("daily digest at 7am") |
| **Serverless hibernation** | Modal and Daytona backends |

Every data point above was verified against vendor documentation on 2026-05-10. See Sources.

## What it actually is

A persistent daemon that bridges chat platforms to a large language model and a sandboxed execution environment. The daemon owns memory, scheduling, and the skill library. The model is swappable via config.

Memory is the core primitive. Conversations, user profiles, and learned skills persist across restarts and cross-reference across platforms. A Telegram message can reference a skill written during a CLI session last week.

DeepSeek V4 Flash is the practical default model because Hermes Agent benefits from cheap context and tool-call loops. Use non-thinking mode for fast extraction, scripted checks, and routine edits; use thinking mode for planning, issue triage, and multi-step automation. Keep a stronger fallback model available for high-risk factual, legal, security, or architecture decisions.

The skill system is emergent, not pre-authored. After a multi-step task (typically five or more tool calls), the agent can write a structured document capturing the procedure, known pitfalls, and verification steps. That document becomes callable later.

## When to pick Hermes Agent

- **Recurring AI tasks should land in chat, CLI, or email.** Natural language cron handles the schedule; the platform bridge handles delivery.
- **You want low-cost always-on repository maintenance.** DeepSeek V4 Flash makes large-context sweeps, ledger checks, and routine scripts cheaper than most frontier-model defaults.
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
| Model API (BYOK) | Usage-based. Typical $5 to $30 per month on OpenRouter light use |
| Modal or Daytona backend | Usage-based. Hibernates when idle, near $0 between sessions |

*Verified 2026-04-17 via the [official site](https://hermes-agent.nousresearch.com/) and [GitHub repository](https://github.com/nousresearch/hermes-agent). No subscription, no managed tier.*

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
- **Setup is not plug-and-play.** Six platform bridges, a sandbox backend, and model API keys all need configuration. Comfortable with Docker is the baseline.
- **API costs are unbounded by default.** No built-in spend caps. DeepSeek V4 Flash is cheap, but runaway scheduled jobs or recursive skills can still burn credits.
- **Version churn.** Early-stage project; breaking changes to config format have shipped between releases.
- **Low moat.** MIT license plus open architecture means forks are trivial. Differentiation depends on Nous Research staying active.
- **No IDE integration.** Not a coding assistant for in-editor flows.
- **Memory can drift.** Full-text search is useful but does not reason about contradictions; stale facts persist until curated.
- **Smaller ecosystem than OpenClaw.** Fewer community skills and templates to crib from.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies product details against primary sources, and generates the editorial analysis shown. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-05-10 against the [Hermes Agent site](https://hermes-agent.nousresearch.com/), [Hermes Agent docs](https://hermes-agent.nousresearch.com/docs/), [GitHub repository](https://github.com/nousresearch/hermes-agent), [Nous Research](https://nousresearch.com/), and [DeepSeek API pricing docs](https://api-docs.deepseek.com/quick_start/pricing).

## FAQ

**Is Hermes Agent free?**
Yes. MIT license, full feature set in the open-source release. The only cost is whatever model API the operator configures.

**Which models work?**
DeepSeek V4 Flash is AiPedia's recommended low-cost default for Hermes Agent. Hermes can also route through OpenAI, Anthropic, OpenRouter, Nous Portal, and custom endpoints. Switching is a config change.

**What makes it different from a Telegram bot?**
Persistent cross-session memory, auto-generated skills that the agent writes from experience, natural language cron scheduling, and a single process that bridges Telegram, Discord, Slack, WhatsApp, Signal, Email, and CLI.

**Which sandbox backends ship?**
Six: local, Docker, SSH, Daytona, Singularity, and Modal. Modal and Daytona hibernate when idle, making them cheap for always-on personal agents.

**Who builds Hermes Agent?**
Nous Research, an AI research lab focused on open-weight models and agent architectures. Hermes Agent ships under the same org that publishes the Hermes model series.

## Sources

- [Hermes Agent official site](https://hermes-agent.nousresearch.com/): feature overview, platform list, setup docs
- [Hermes Agent GitHub](https://github.com/nousresearch/hermes-agent): MIT license, codebase, release notes
- [Nous Research](https://nousresearch.com/): lab background, Hermes model series
- [Hermes Agent docs](https://hermes-agent.nousresearch.com/docs/): sandbox backends, scheduling syntax
- [DeepSeek API pricing docs](https://api-docs.deepseek.com/quick_start/pricing): DeepSeek V4 Flash model name, 1M context, tool-call support, and token pricing

## Related

- **Category:** [AI Automation](/categories/ai-automation/)
- **Comparisons:** [ChatGPT vs Hermes Agent](/compare/chatgpt-vs-hermes-agent/)
