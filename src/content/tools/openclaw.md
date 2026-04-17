---
type: tool
slug: openclaw
title: OpenClaw
tagline: Self-hosted open-source personal AI agent that controls your computer, browser, and shell from 24+ messaging apps. Now governed by an independent foundation.
category: ai-automation
company: openclaw-foundation
url: https://openclaw.ai/
pricing_model: open-source
price_range: "Free (MIT) · BYOK API costs · server hosting on you"
status: active
launched: 2025-11
last_updated: 2026-04-17
last_verified: 2026-04-17
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
  moat: 3
  longevity: 7
tags: [open-source, self-hosted, personal-assistant, browser-automation, multi-platform, local-first, whatsapp, telegram, discord, slack, signal, imessage]
seo_title: "OpenClaw: Features, Pricing & Review (April 2026)"
meta_description: "OpenClaw is a free, open-source personal AI agent that runs locally and reaches your AI from WhatsApp, Telegram, Discord, Slack, Signal, or iMessage. MIT license, 247K+ GitHub stars, governed by an independent foundation with OpenAI sponsorship."
author: "aipedia.wiki Editorial"
best_for:
  - developers wanting a self-hosted personal agent
  - users who want AI inside their existing chat apps
  - privacy-conscious operators running local-first
  - tinkerers building custom skills on ClawHub
not_best_for:
  - users who want a managed cloud agent with zero setup
  - non-technical users uncomfortable with daemons and YAML
  - teams needing enterprise support or SLAs
quick_answer: >-
  OpenClaw is the open-source personal AI agent by Peter Steinberger. MIT-licensed, self-hosted, reachable from WhatsApp, Telegram, Discord, Slack, Signal, iMessage and 18 more apps. Steinberger joined OpenAI in February 2026; the project moved to an independent foundation with OpenAI sponsorship. Free plus BYOK API costs. Pick it for local-first personal agents; skip if setup scares you.
---

# OpenClaw

OpenClaw is the open-source personal AI agent built by Austrian developer Peter Steinberger, first published November 2025 as Clawdbot, renamed Moltbot after an Anthropic trademark complaint, then renamed OpenClaw three days later ([Wikipedia](https://en.wikipedia.org/wiki/OpenClaw)).

It runs on your machine, controls your browser and shell, and is reachable from the messaging apps you already use. The repo carries 247K+ GitHub stars as of early March 2026 and continues to climb.

## System Verdict

> **Pick OpenClaw if a persistent, self-hosted personal AI agent reachable from your phone is the goal and setup time is not the bottleneck.** The cross-app gateway is the real moat. WhatsApp, Telegram, Discord, Slack, Signal, iMessage, and more all reach the same agent, with the same memory, running on your hardware.
>
> **Skip it if zero-config matters more than control.** Setup needs Node 24, a daemon install, and per-channel configuration. Rabbit, Claude apps, or ChatGPT Operator Mode are easier if you do not want to run your own server.
>
> **Who pays which tier:** Everyone. OpenClaw itself is free. Costs are bring-your-own-key LLM bills plus whatever you pay to keep a small VPS or always-on machine running.

## Key Facts

| | |
|---|---|
| **Creator** | Peter Steinberger (ex-PSPDFKit) |
| **Governance** | Independent foundation · OpenAI sponsorship · community maintainers |
| **License** | MIT |
| **First release** | November 2025 (as Clawdbot) |
| **GitHub stars** | 247K+ (March 2026), rising |
| **Messaging channels** | 24+ (WhatsApp, Telegram, Discord, Slack, Signal, iMessage, Teams, Matrix, WeChat, Nostr, and more) |
| **Model support** | Claude · GPT · any OpenAI-compatible endpoint · provider failover |
| **Interface** | Messaging-first · Live Canvas A2UI · voice input |
| **Platforms** | macOS · iOS · Android · Linux · Windows (WSL2) |
| **Skill system** | ClawHub registry · auto-discover · auto-install |

Every data point above was verified against vendor sources on 2026-04-17. See Sources.

## What it actually is

A local gateway process that sits between your messaging apps and an LLM. You chat from WhatsApp or Signal; OpenClaw receives the message on your hardware, runs whatever tools it needs (browser, shell, files, calendar, email), and replies in the same thread.

Skills live in ClawHub, a registry of community-built add-ons. The agent can identify which skill fits a task and install it on demand. It can even author its own skills for new task types.

The founder story matters. Steinberger joined OpenAI in February 2026; OpenClaw transitioned to an independent foundation with continued OpenAI sponsorship. Long-term direction now depends on community governance.

## When to pick OpenClaw

- **Personal AI reachable from your phone.** Chat on WhatsApp, get full desktop control at home.
- **Privacy-first setups.** Code, files, and browsing stay on your hardware. Only outbound LLM API calls leave.
- **Always-on agent.** Unlike on-demand chatbots, OpenClaw persists and can run scheduled or triggered workflows.
- **Tinkerers and skill authors.** ClawHub plus self-written skills make OpenClaw a platform, not just a product.
- **Local-first orgs.** Private infrastructure deployments where data residency rules out SaaS.

## When to pick something else

- **Managed, zero-setup agent:** [ChatGPT](/tools/chatgpt/) Operator Mode or Claude apps. No daemons, no YAML.
- **Multi-agent Python framework:** [CrewAI](/tools/crewai/) or [Letta](/tools/letta/).
- **Workflow automation with big SaaS catalog:** [Zapier](/tools/zapier/) or [n8n](/tools/n8n/).
- **Voice-first conversational AI:** [Voiceflow](/tools/voiceflow/).
- **Visual agent flow builder:** [Langflow](/tools/langflow/) or [Relevance AI](/tools/relevance-ai/).

## Pricing

| Tier | Cost | Notes |
|------|------|-------|
| OpenClaw (self-hosted) | Free | MIT license, BYOK API, BYO server |
| LLM API costs | Usage-based | Typical Claude Opus 4.7 or GPT-5.4 use: $5-$30/month |
| Server / VPS | ~$5-$10/mo | Any always-on machine works |

*No subscription. No license fee. No managed cloud tier. Total cost equals LLM usage plus whatever you spend on hosting ([GitHub](https://github.com/openclaw/openclaw)).*

## Against the alternatives

| | OpenClaw | [ChatGPT](/tools/chatgpt/) Operator | Claude apps |
|---|---|---|---|
| **License** | MIT (open-source) | Proprietary SaaS | Proprietary SaaS |
| **Hosting** | Your hardware | OpenAI cloud | Anthropic cloud |
| **Privacy model** | Local data, BYOK calls outbound | OpenAI-hosted | Anthropic-hosted |
| **Channel coverage** | 24+ messaging apps | Browser + mobile | Browser + mobile + CLI |
| **Skill extensibility** | ClawHub + self-authored | OpenAI ecosystem | Anthropic MCP |
| **Setup effort** | High (daemon + channels) | Zero | Zero |
| **Pricing shape** | BYOK + self-host | Subscription | Subscription |
| **Best viewed as** | Local-first personal agent platform | Managed generalist agent | Anthropic-native assistant |

## Failure modes

- **Setup has friction.** Node 24, daemon, per-channel credentials. Not a five-minute install.
- **No managed hosting.** Uptime, upgrades, and backups are the user's responsibility.
- **Founder departure.** Steinberger joined OpenAI in February 2026. The foundation model is healthy but unproven versus a VC-backed company's roadmap velocity.
- **Low moat.** MIT license and public architecture invite forks. Differentiation rests on community momentum and skill breadth.
- **Windows needs WSL2.** Native Windows users face extra setup versus macOS or Linux.
- **Breaking changes during rapid development.** Active project. Expect version-to-version config churn.
- **API bills can surprise.** A heavily used agent on Claude Opus 4.7 can run up real costs without prompt caching and careful skill design.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against the [openclaw/openclaw GitHub repo](https://github.com/openclaw/openclaw), [openclaw.ai](https://openclaw.ai/), [Steinberger's OpenAI announcement](https://steipete.me/posts/2026/openclaw), [TechCrunch coverage](https://techcrunch.com/2026/02/15/openclaw-creator-peter-steinberger-joins-openai/), and the [OpenClaw Wikipedia entry](https://en.wikipedia.org/wiki/OpenClaw).

## FAQ

**Is OpenClaw free?**
Yes. MIT-licensed, free to self-host. You pay only LLM API usage (OpenAI, Anthropic, or any compatible provider) plus whatever a small always-on server costs.

**What happened after Peter Steinberger joined OpenAI?**
Steinberger announced the move on February 14, 2026. OpenClaw transitioned to an independent foundation on the same announcement. OpenAI remains a sponsor. Community maintainers govern the roadmap ([steipete.me](https://steipete.me/posts/2026/openclaw)).

**Does OpenClaw send my data to a third-party cloud?**
By design, OpenClaw runs on your own hardware. No OpenClaw-controlled server touches your data. Outbound calls go only to the LLM provider you configure (Claude, GPT, local model, etc).

**Which messaging apps does OpenClaw support?**
WhatsApp, Telegram, Discord, Slack, Signal, iMessage, Microsoft Teams, Google Chat, Matrix, LINE, Mattermost, Nostr, Twitch, WeChat, Zalo, IRC, Feishu, BlueBubbles, Synology Chat, Tlon, WebChat, and more. The gateway design keeps a single agent across every channel.

**Can OpenClaw control my computer?**
Yes. Dedicated Chrome/Chromium browser automation, shell command execution, and filesystem access. Sandboxed mode is available for higher-trust environments.

## Sources

- [openclaw/openclaw GitHub](https://github.com/openclaw/openclaw): Source, stars, skills
- [openclaw.ai](https://openclaw.ai/): Official product site
- [Peter Steinberger: OpenClaw, OpenAI and the future](https://steipete.me/posts/2026/openclaw): Founder post on OpenAI move
- [TechCrunch: OpenClaw creator joins OpenAI](https://techcrunch.com/2026/02/15/openclaw-creator-peter-steinberger-joins-openai/): Coverage of the transition
- [Wikipedia: OpenClaw](https://en.wikipedia.org/wiki/OpenClaw): Naming history (Clawdbot to Moltbot to OpenClaw) and project timeline

## Related

- **Category:** [AI Automation](/categories/ai-automation/)
- **Comparisons:** [OpenClaw vs ChatGPT Operator](/comparisons/openclaw-vs-chatgpt/) · [OpenClaw vs Claude Code](/comparisons/openclaw-vs-claude-code/) · [OpenClaw vs n8n](/comparisons/openclaw-vs-n8n/)
