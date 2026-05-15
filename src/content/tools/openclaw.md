---
type: tool
slug: openclaw
title: OpenClaw
tagline: Self-hosted open-source personal AI agent that controls your computer, browser, and shell from 24+ messaging apps. Now governed by an independent foundation.
category: ai-automation
company: openclaw-foundation
url: https://openclaw.ai/
github_url: https://github.com/openclaw/openclaw
pricing_model: open-source
price_range: "Free (MIT) · BYOK API costs · server hosting on you"
status: active
launched: 2025-11
last_updated: 2026-05-15
last_verified: 2026-05-15
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
facts:
  best_for:
    value: "Self-hosted open-source personal AI agent that controls your computer, browser, and shell from 22+ messaging apps including QQ and Nextcloud Talk. Governed by an independent foundation with OpenAI sponsorship; 371K+ GitHub stars as of May 2026. Best for workflow automation, agentic operations, and business-process automation."
    source: "https://github.com/openclaw/openclaw"
    source_label: "openclaw/openclaw GitHub"
    source_id: openclaw-official
    verified_at: 2026-05-13
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "OpenClaw is MIT-licensed and free. Total cost equals bring-your-own-key LLM usage plus whatever you spend on hosting (a $5-$10/mo VPS or always-on machine is enough)."
    source: "https://github.com/openclaw/openclaw"
    source_label: "openclaw/openclaw GitHub"
    source_id: openclaw-official
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: low
    confidence: high
  watch_out_for:
    value: "OpenClaw is self-hosted: uptime, upgrades, sandbox configuration, and credentials for each messaging channel are the user's responsibility. The project ships breaking changes during rapid development; pin versions for production."
    source: "https://github.com/openclaw/openclaw"
    source_label: "openclaw/openclaw GitHub"
    source_id: openclaw-official
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: medium
    confidence: high
tags: [open-source, self-hosted, personal-assistant, browser-automation, multi-platform, local-first, whatsapp, telegram, discord, slack, signal, imessage]
seo_title: "OpenClaw: Features, Pricing & Review (May 2026)"
meta_description: "OpenClaw is a free, open-source personal AI agent that runs locally and reaches your AI from WhatsApp, Telegram, Discord, Slack, Signal, iMessage, QQ, and 15+ more channels. MIT license, 371K+ GitHub stars, governed by an independent foundation with OpenAI sponsorship."
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
  OpenClaw is the open-source personal AI agent by Peter Steinberger. MIT-licensed, self-hosted, reachable from WhatsApp, Telegram, Discord, Slack, Signal, iMessage, QQ, Nextcloud Talk, and 16 more apps. 371K+ GitHub stars as of May 2026. Steinberger joined OpenAI in February 2026; the project moved to an independent foundation with OpenAI sponsorship. Free plus BYOK API costs. Pick it for local-first personal agents; skip if setup scares you.
---

# OpenClaw

OpenClaw is the open-source personal AI agent built by Austrian developer Peter Steinberger, first published November 2025 as Clawdbot, renamed Moltbot after an Anthropic trademark complaint, then renamed OpenClaw three days later ([Wikipedia](https://en.wikipedia.org/wiki/OpenClaw)).

It runs on your machine, controls your browser and shell, and is reachable from the messaging apps you already use. The repo carries 371K+ GitHub stars as of May 2026, up from 247K in early March, and continues to climb.

## Recent developments

- **May 14, 2026:** [Anthropic created separate Claude Agent SDK credits](/news/2026-05-14-anthropic-claude-agent-sdk-credit-split/), restoring an official subscription-auth path for third-party Agent SDK tools such as OpenClaw while capping programmatic use at $20-$200/month depending on the Claude plan. OpenClaw remains free and self-hosted, but heavy Claude-backed automation now needs explicit model-spend budgeting.
- **May 13, 2026:** Star count updated to 371K+. Channel coverage now spans 22 messaging apps including QQ, Nextcloud Talk, and WebChat. Active development continues with 49K+ commits, with recent emphasis on Voice Wake for macOS and iOS, Live Canvas with A2UI, multi-agent routing, and sandbox security modes for group and channel safety.
- **April 30, 2026:** [Apple said AI and agentic tools helped drive unexpected Mac demand](/news/2026-04-30-apple-mac-ai-agent-demand/). OpenClaw was named in coverage of Mac mini and Mac Studio demand, reinforcing the hardware reality behind local-first personal agents.
- **April 30, 2026:** [Stripe turned Link into an agent wallet for approved AI purchases](/news/2026-04-30-stripe-link-agent-wallet/), explicitly naming personal AI agents such as OpenClaw as a use case. This gives OpenClaw-style local agents a safer payment path than exposing raw card details.

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
| **GitHub stars** | 371K+ (May 2026), rising |
| **Messaging channels** | 22 (WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, IRC, Microsoft Teams, Matrix, Feishu, LINE, Mattermost, Nextcloud Talk, Nostr, Synology Chat, Tlon, Twitch, Zalo, WeChat, QQ, WebChat) |
| **Model support** | Claude Opus 4.7 · GPT-5.5 · Gemini 3.1 Pro · Grok 4.3 · DeepSeek V4 · Kimi K2.6 · any OpenAI-compatible endpoint · provider failover |
| **Interface** | Messaging-first · Live Canvas A2UI · Voice Wake (macOS/iOS) · voice input |
| **Platforms** | macOS · iOS · Android · Linux · Windows (WSL2) |
| **Skill system** | ClawHub registry · auto-discover · auto-install · multi-agent routing |
| **Safety** | Sandbox security modes for group and channel safety |

Every data point above was verified against vendor sources on 2026-05-13. See Sources.

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
| LLM API costs | Usage-based | Typical Claude Opus 4.7 or OpenAI frontier models use: $5-$30/month |
| Server / VPS | ~$5-$10/mo | Any always-on machine works |

*No subscription. No license fee. No managed cloud tier. Total cost equals LLM usage plus whatever you spend on hosting ([GitHub](https://github.com/openclaw/openclaw)).*

## Against the alternatives

| | OpenClaw | [ChatGPT](/tools/chatgpt/) Operator | Claude apps |
|---|---|---|---|
| **License** | MIT (open-source) | Proprietary SaaS | Proprietary SaaS |
| **Hosting** | Your hardware | OpenAI cloud | Anthropic cloud |
| **Privacy model** | Local data, BYOK calls outbound | OpenAI-hosted | Anthropic-hosted |
| **Channel coverage** | 22 messaging apps | Browser + mobile | Browser + mobile + CLI |
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

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-05-13 against the [openclaw/openclaw GitHub repo](https://github.com/openclaw/openclaw), [openclaw.ai](https://openclaw.ai/), [Steinberger's OpenAI announcement](https://steipete.me/posts/2026/openclaw), [TechCrunch coverage](https://techcrunch.com/2026/02/15/openclaw-creator-peter-steinberger-joins-openai/), and the [OpenClaw Wikipedia entry](https://en.wikipedia.org/wiki/OpenClaw).

## FAQ

**Is OpenClaw free?**
Yes. MIT-licensed, free to self-host. You pay only LLM API usage (OpenAI, Anthropic, or any compatible provider) plus whatever a small always-on server costs.

**What happened after Peter Steinberger joined OpenAI?**
Steinberger announced the move on February 14, 2026. OpenClaw transitioned to an independent foundation on the same announcement. OpenAI remains a sponsor. Community maintainers govern the roadmap ([steipete.me](https://steipete.me/posts/2026/openclaw)).

**Does OpenClaw send my data to a third-party cloud?**
By design, OpenClaw runs on your own hardware. No OpenClaw-controlled server touches your data. Outbound calls go only to the LLM provider you configure (Claude, GPT, local model, etc).

**Which messaging apps does OpenClaw support?**
WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, IRC, Microsoft Teams, Matrix, Feishu, LINE, Mattermost, Nextcloud Talk, Nostr, Synology Chat, Tlon, Twitch, Zalo, WeChat, QQ, and WebChat. The gateway design keeps a single agent across every channel.

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
