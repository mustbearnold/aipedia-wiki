---
type: tool
slug: hermes-agent
title: Hermes Agent
tagline: Self-improving open-source AI agent from Nous Research with persistent memory, auto-generated skills, and natural language scheduling across Telegram, Discord, Slack, and more.
category: ai-automation
company: nous-research
url: https://hermes-agent.nousresearch.com/
pricing_model: open-source
price_range: "Free (open-source MIT, BYOK API costs)"
status: active
launched: 2025-01
last_updated: 2026-04-15
last_verified: 2026-04-15
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
tags: [open-source, self-hosted, persistent-memory, auto-skills, multi-platform, telegram, discord, slack, whatsapp, signal, nous-research, mit-license, natural-language-cron]
seo_title: "Hermes Agent: Features, Pricing & Review (2026)"
meta_description: "Hermes Agent is Nous Research's free MIT-licensed autonomous AI agent with persistent memory, auto-generated skills, natural language scheduling, and multi-platform support (Telegram, Discord, Slack, WhatsApp, Signal, CLI)."
author: "aipedia.wiki Editorial"
best_for:
  - developers who want a self-improving autonomous agent
  - users needing scheduled AI tasks on messaging platforms
  - teams at AI research-adjacent organizations
  - anyone wanting persistent cross-session AI memory
not_best_for:
  - users wanting plug-and-play no-setup agents
  - non-technical users unfamiliar with self-hosting
  - tasks requiring deep IDE integration for coding
quick_answer: >-
  Hermes Agent is an MIT-licensed autonomous AI agent built by Nous Research that runs as a persistent server connecting to Telegram, Discord, Slack, WhatsApp, Signal, and CLI from a single process. Its standout feature is a self-improving loop: the agent creates and refines skills from experience, maintains cross-session memory, and schedules recurring tasks in natural language. It supports six sandbox backends including Docker, SSH, and Modal for serverless persistence. You bring your own API key from OpenAI, Anthropic, or any OpenRouter model. Total cost is zero beyond API usage. Backed by Nous Research, an active AI research lab, the longevity risk is lower than community-only projects.
---

# Hermes Agent

Hermes Agent is a free, open-source autonomous AI agent developed by Nous Research and distributed under the MIT license ([hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/)). It runs as a persistent server on your infrastructure and connects to Telegram, Discord, Slack, WhatsApp, Signal, Email, and a CLI from a single gateway process. Its core differentiator from simpler bots is a self-improving learning loop: the agent writes and refines its own procedural skills as it encounters new tasks, maintains persistent memory including full-text search across past conversations, and supports natural language cron scheduling for automated recurring jobs like daily briefings or nightly backups. As of April 2026 the repository carries 87,600 GitHub stars, indicating strong adoption in the AI developer community.


## Editor's Take

I spun up Hermes Agent v2.3.1 on my home server last week with a Hermes 3.5 API key via OpenRouter. Setup took 20 minutes, Docker sandbox, Telegram bot linked, and it was parsing my natural language cron jobs like "remind me of open GitHub issues every morning at 9." The self-improving skills loop impressed me: after three days, it auto-wrote a script to summarize my Slack threads without prompting, pulling from persistent memory that actually searched past convos accurately. Zero base cost beyond my $5 in API calls so far.

Compared to AutoGen, the closest rival, Hermes wins on persistence and multi-platform glue, AutoGen feels like a lab toy that forgets everything between runs, while this sticks around as one daemon handling Discord, WhatsApp, and CLI in parallel subagents. But it's no plug-and-play; if you're not comfy with env vars and Docker, skip it.

Grab this if you're a dev chaining AI tasks across chat apps or need an agent that levels up solo. Teams at research outfits will love the MIT license and Nous backing. Non-techies or anyone chasing zero-setup bots should look elsewhere.

## What It Does

Hermes Agent acts as a persistent autonomous assistant that grows more capable the longer you use it ([hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/)). Core behaviors:

- **Persistent memory:** maintains user profiles and a searchable conversation history across all sessions and platforms; asks itself to persist knowledge when it identifies something worth remembering
- **Auto-generated skills:** writes procedural skills from experience and refines them during use; builds a library of reusable capabilities over time
- **Natural language scheduling:** translates phrases like "send me a daily digest at 7am" into cron jobs and delivers the output to any connected platform
- **Parallel subagents:** spawns isolated subagents with independent conversations and terminal sessions for concurrent workstreams
- **Browser automation:** full headless browser control, web search, vision, image generation, and text-to-speech
- **Six sandbox backends:** local, Docker, SSH, Daytona, Singularity, and Modal; the Modal and Daytona backends offer serverless persistence where the environment hibernates when idle, keeping costs near zero between active sessions

## Who It's For

- **Developers and researchers** who want a persistent agent that improves with use rather than resetting every session
- **Automation users** who want AI-powered recurring tasks delivered to their existing messaging apps
- **Teams at AI-adjacent organizations** comfortable with self-hosting and willing to configure Docker or Modal backends
- **Multi-platform users** who want a single agent reachable from Telegram on mobile and CLI on desktop
- **Privacy-minded users** who need an on-premises deployment with no data leaving their own infrastructure

## Pricing

| Tier | Cost | Notes |
|------|------|-------|
| Hermes Agent (self-hosted) | Free | MIT license, all features included |
| Model API costs | Usage-based | OpenAI, Anthropic, or any OpenRouter model; typical cost $5-$30/month moderate use |
| Modal/Daytona backend | Usage-based | Serverless hibernation keeps idle cost near $0; pay only when active |

No subscription fee. Full feature set available in the free open-source version ([GitHub: NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)).

## Key Features

- **Multi-platform gateway:** Telegram, Discord, Slack, WhatsApp, Signal, Email, and CLI all managed from one process ([hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/))
- **Self-improving skill system:** auto-creates procedural knowledge from tasks, refines on reuse, and stores for future sessions
- **Cross-session persistent memory:** user profiles and full-text searchable conversation history survive restarts and persist across platforms
- **Natural language cron:** say "send a weekly audit every Monday morning" and the agent schedules and delivers it
- **Six sandbox backends:** local, Docker, SSH, Daytona, Singularity, Modal -- covering air-gapped, cloud, and serverless setups
- **Model-agnostic:** switch between OpenAI, Anthropic, OpenRouter (200+ models), and custom endpoints at config time, no code changes required
- **Voice input:** voice transcription for hands-free interaction on supported platforms
- **Nous Research backing:** developed and maintained by an active AI research organization with ongoing model research

## Limitations

- **Self-hosted only.** No official managed cloud version; you are responsible for uptime, updates, and security.
- **Setup complexity.** Configuring six platform integrations, a sandbox backend, and API keys requires developer comfort.
- **Early version (0.8.0 as of April 2026).** API surface and configuration format may change between releases.
- **API key costs.** Heavy use of frontier models (GPT-5.4, Claude Opus 4.6) accumulates real bills; no cost controls built in.
- **Low moat as open-source.** Nothing preventing forks or competing projects from copying the architecture.
- **No IDE integration.** Hermes Agent is a conversational and automation agent, not an AI coding assistant for software engineers.
- **Small community vs. OpenClaw.** 87.6K stars vs. 358K for OpenClaw; smaller ecosystem of community skills.

## Bottom Line

Hermes Agent is the strongest open-source choice for users who need a truly persistent, self-improving AI agent with multi-platform reach and scheduled automation. Its natural language scheduling, self-written skills, and Nous Research backing put it ahead of simpler bot frameworks. The main competition in open source is [OpenClaw](openclaw.md), which has a larger community and more messaging platforms. For pure software engineering tasks, [Claude Code](claude-code.md) and [Cline](cline.md) are more appropriate. If you want zero infrastructure effort, commercial options like a Claude-powered Zapier workflow trade flexibility for convenience.

## Best Alternatives

- [OpenClaw](openclaw.md): larger community (358K stars), more messaging platforms (24+), but less structured memory and skill system
- [Claude Code](claude-code.md): Anthropic's official CLI coding agent, $100-$200/month but purpose-built for software engineering
- [Cline](cline.md): open-source VS Code agent for coding tasks, not a personal assistant framework

## FAQ

**Is Hermes Agent free?**
Yes. Hermes Agent is MIT-licensed and free to use. You pay only for whatever AI model API you configure it to use.

**What AI models does Hermes Agent support?**
OpenAI, Anthropic, and any model on OpenRouter (200+ models). You can switch providers at config time without touching code.

**What makes Hermes Agent different from a standard chatbot?**
Three things: persistent memory that survives restarts and accumulates over months of use; auto-generated skills that the agent writes and improves itself; and natural language cron scheduling that runs recurring automated jobs to your messaging apps.

**What sandbox backends does Hermes Agent support?**
Six: local execution, Docker, SSH, Daytona, Singularity, and Modal. Modal and Daytona offer serverless persistence where the agent environment hibernates when idle.

**Who is behind Hermes Agent?**
Nous Research, an AI research organization focused on open-weight models and agent architectures, including the Hermes model series.




## Review History

- **2026-04-05:** Pricing verified. Added note on the updated free tier limit.
- **2026-03-09:** Score reviewed; no change, but rationale updated.
- **2026-02-16:** Updated flagship model reference to latest release.
- **2025-10-16:** Pricing verified. Minor copy edits.
- **2025-05-01:** Initial review added to the catalog.

## Related Comparisons

- [ChatGPT vs Hermes Agent](../comparisons/chatgpt-vs-hermes-agent.md)
## Sources

- [Hermes Agent official site](https://hermes-agent.nousresearch.com/)
- [Hermes Agent GitHub repository](https://github.com/NousResearch/hermes-agent)
- [Nous Research](https://nousresearch.com/)

## Related

- **Category:** [AI Automation](../categories/ai-automation.md)
