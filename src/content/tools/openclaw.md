---
type: tool
slug: openclaw
title: OpenClaw
tagline: Self-hosted open-source personal AI assistant that controls your computer, browser, and shell from 22+ messaging surfaces, with current fast-talk mode, DM pairing, and sandbox guardrails.
category: ai-automation
company: openclaw-foundation
url: https://openclaw.ai/
github_url: https://github.com/openclaw/openclaw
pricing_model: open-source
price_range: "Free (MIT) · BYOK/subscription-auth model costs · hosting or always-on machine on you"
status: active
launched: 2025-11
last_updated: 2026-06-25
last_verified: 2026-06-25
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
    value: "Self-hosted open-source personal AI assistant that controls your computer, browser, shell, and messaging channels from 22+ supported surfaces including WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Nextcloud Talk, QQ, and WebChat. GitHub API showed 380K+ stars and 79K+ forks on June 25, 2026. Best for local-first personal automation when the operator can own security, pairing, sandboxing, and updates."
    source: "https://github.com/openclaw/openclaw"
    source_label: "openclaw/openclaw GitHub"
    source_id: openclaw-official
    verified_at: 2026-06-25
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "OpenClaw is MIT-licensed and free. Total cost equals bring-your-own-key or subscription-auth LLM usage plus whatever you spend on an always-on machine, server, or local node."
    source: "https://github.com/openclaw/openclaw"
    source_label: "openclaw/openclaw GitHub"
    source_id: openclaw-official
    verified_at: 2026-06-25
    next_review_at: 2026-09-12
    volatility: low
    confidence: high
  watch_out_for:
    value: "OpenClaw is self-hosted and highly privileged: uptime, upgrades, gateway exposure, DM pairing/allowlists, sandbox configuration, credentials, and tool permissions are the user's responsibility. June 2026 security coverage of phishing and agent-identity failures makes patch cadence, sender verification, and exposure review non-negotiable."
    source: "https://github.com/openclaw/openclaw"
    source_label: "openclaw/openclaw GitHub"
    source_id: openclaw-official
    verified_at: 2026-06-25
    next_review_at: 2026-09-12
    volatility: medium
    confidence: high
tags: [open-source, self-hosted, personal-assistant, browser-automation, multi-platform, local-first, whatsapp, telegram, discord, slack, signal, imessage]
seo_title: "OpenClaw: Features, Pricing & Review (June 2026)"
meta_description: "OpenClaw is a free, open-source personal AI assistant that runs locally and reaches your AI from WhatsApp, Telegram, Discord, Slack, Signal, iMessage, QQ, and 15+ more channels. MIT license, 380K+ GitHub stars, fast-talk mode, DM pairing, sandbox modes, and serious self-hosting security caveats."
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
  OpenClaw is the open-source personal AI assistant by Peter Steinberger. MIT-licensed, self-hosted, reachable from WhatsApp, Telegram, Discord, Slack, Signal, iMessage, QQ, Nextcloud Talk, and 15+ more surfaces. GitHub API showed 380K+ stars on June 25, 2026, and the latest release is 2026.6.10. Steinberger joined OpenAI in February 2026; the project moved to an independent foundation with OpenAI sponsorship. Free plus BYOK/subscription-auth model costs. Pick it for local-first personal automation; skip if daemon setup, DM allowlists, gateway exposure, sender verification, and sandbox policy feel like too much ownership.
---

# OpenClaw

OpenClaw is the open-source personal AI agent built by Austrian developer Peter Steinberger, first published November 2025 as Clawdbot, renamed Moltbot after an Anthropic trademark complaint, then renamed OpenClaw three days later ([Wikipedia](https://en.wikipedia.org/wiki/OpenClaw)).

It runs on your machine, controls your browser and shell, and is reachable from the messaging apps you already use. GitHub API showed 380K+ stars and 79K+ forks on June 25, 2026. That momentum is real; so is the operational risk of running a privileged local agent across chat, browser, shell, files, and credentials.

## Recent developments

- **June 25, 2026:** GitHub API check shows 380K+ stars and 79K+ forks. The latest release, 2026.6.10, adds automatic fast mode for short conversational turns, improved Zai/GLM model routing, safer session/channel state, and trusted policy preservation through hook composition.
- **June 2026:** New TechRadar coverage of Varonis' OpenClaw email-agent tests found that an agent could block malicious links and OAuth apps but still grant sensitive access when an attacker used urgent identity-based requests. Treat sender verification as a required control, not a prompt preference.
- **June 12, 2026:** Current GitHub check shows 378K+ stars, 79K+ forks, 58K+ commits, and official README emphasis on DM pairing, explicit public-DM opt-in, `openclaw doctor`, and sandbox mode for non-main sessions. Treat remote exposure, unknown inbound messages, and skill installation as security decisions, not convenience toggles.
- **June 9, 2026:** TechRadar covered a critical OpenClaw WebSocket-style hijack case that was reportedly patched promptly, but the buying lesson is broader: privileged local agents need inventory, patch cadence, limited permissions, and identity-style governance before enterprise use.
- **May 14, 2026:** [Anthropic created separate Claude Agent SDK credits](/news/2026-05-14-anthropic-claude-agent-sdk-credit-split/), restoring an official subscription-auth path for third-party Agent SDK tools such as OpenClaw while capping programmatic use at $20-$200/month depending on the Claude plan. OpenClaw remains free and self-hosted, but heavy Claude-backed automation now needs explicit model-spend budgeting.
- **May 13, 2026:** Star count updated to 371K+. Channel coverage expanded across WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, IRC, Microsoft Teams, Matrix, Feishu, LINE, Mattermost, Nextcloud Talk, Nostr, Synology Chat, Tlon, Twitch, Zalo, WeChat, QQ, and WebChat.
- **April 30, 2026:** [Apple said AI and agentic tools helped drive unexpected Mac demand](/news/2026-04-30-apple-mac-ai-agent-demand/). OpenClaw was named in coverage of Mac mini and Mac Studio demand, reinforcing the hardware reality behind local-first personal agents.
- **April 30, 2026:** [Stripe turned Link into an agent wallet for approved AI purchases](/news/2026-04-30-stripe-link-agent-wallet/), explicitly naming personal AI agents such as OpenClaw as a use case. This gives OpenClaw-style local agents a safer payment path than exposing raw card details.

## System Verdict

> **Pick OpenClaw if a persistent, self-hosted personal AI agent reachable from your phone is the goal and setup time is not the bottleneck.** The cross-app gateway is the real moat. WhatsApp, Telegram, Discord, Slack, Signal, iMessage, and more all reach the same agent, with the same memory, running on your hardware.
>
> **Skip it if zero-config matters more than control.** Setup needs Node 24 or Node 22.19+, a daemon install, per-channel configuration, DM pairing/allowlists, and sandbox policy. ChatGPT or Claude apps are easier if you do not want to run your own privileged assistant.
>
> **Who pays which tier:** Everyone. OpenClaw itself is free. Costs are bring-your-own-key or subscription-auth LLM bills plus whatever you pay to keep a local node, server, or always-on machine running.

## Key Facts

| | |
|---|---|
| **Creator** | Peter Steinberger (ex-PSPDFKit) |
| **Governance** | Independent foundation · OpenAI sponsorship · community maintainers |
| **License** | MIT |
| **First release** | November 2025 (as Clawdbot) |
| **GitHub stars** | 380K+ (GitHub API, checked June 25, 2026) |
| **Messaging channels** | 22+ supported surfaces including WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, IRC, Microsoft Teams, Matrix, Feishu, LINE, Mattermost, Nextcloud Talk, Nostr, Synology Chat, Tlon, Twitch, Zalo, Zalo Personal, WeChat, QQ, and WebChat |
| **Model support** | Provider/model configuration, subscription OAuth for OpenAI ChatGPT/Codex, auth-profile rotation, and failover; verify exact provider model access separately |
| **Interface** | Messaging-first · Live Canvas A2UI · Voice Wake (macOS/iOS) · voice input |
| **Platforms** | macOS · iOS · Android · Linux · Windows (WSL2) |
| **Skill system** | ClawHub registry · auto-discover · auto-install · multi-agent routing |
| **Safety** | DM pairing defaults, allowlists, `openclaw doctor`, gateway exposure runbook, and sandbox modes for non-main sessions |

Every data point above was verified against vendor sources on 2026-06-25. See Sources.

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
| OpenClaw (self-hosted) | Free | MIT license, BYOK or subscription-auth model access, BYO server/local node |
| LLM/model costs | Usage-based | Depends on provider, model, context, tool use, caching, and Claude/OpenAI subscription-auth policy |
| Server / local node | Variable | Any always-on machine can work; remote hosting adds exposure and patching obligations |

*No OpenClaw subscription. No license fee. No managed cloud tier. Total cost equals model usage plus whatever you spend on the machine or hosting layer ([GitHub](https://github.com/openclaw/openclaw)).*

## Against the alternatives

| | OpenClaw | [ChatGPT](/tools/chatgpt/) Operator | Claude apps |
|---|---|---|---|
| **License** | MIT (open-source) | Proprietary SaaS | Proprietary SaaS |
| **Hosting** | Your hardware | OpenAI cloud | Anthropic cloud |
| **Privacy model** | Local data, BYOK calls outbound | OpenAI-hosted | Anthropic-hosted |
| **Channel coverage** | 22+ messaging surfaces | Browser + mobile | Browser + mobile + CLI |
| **Skill extensibility** | ClawHub + self-authored | OpenAI ecosystem | Anthropic MCP |
| **Setup effort** | High (daemon + channels) | Zero | Zero |
| **Pricing shape** | BYOK + self-host | Subscription | Subscription |
| **Best viewed as** | Local-first personal agent platform | Managed generalist agent | Anthropic-native assistant |

## Failure modes

- **Setup has friction.** Node 24, daemon, per-channel credentials. Not a five-minute install.
- **No managed hosting.** Uptime, upgrades, and backups are the user's responsibility.
- **Gateway exposure is dangerous.** The official README tells operators to read the security guide and exposure runbook before exposing anything remotely, and June 2026 security coverage reinforces that a patched agent can still be risky if deployed loosely.
- **Sender identity needs enforcement.** Secondary security testing in June 2026 showed agent behavior can fail on urgent social-engineering requests even when link and OAuth defenses work. Use allowlists, approval gates, and identity checks around email, Slack, calendar, and workspace actions.
- **Inbound DMs are untrusted input.** Keep DM pairing/allowlists on unless you have a defined public-bot threat model; run `openclaw doctor` after channel changes.
- **Sandbox policy matters.** Host tools run with full access in the main session. Group, channel, and non-main sessions need sandbox rules before the agent touches files, browsers, nodes, cron, or gateway actions.
- **Founder departure.** Steinberger joined OpenAI in February 2026. The foundation model is healthy but unproven versus a VC-backed company's roadmap velocity.
- **Low moat.** MIT license and public architecture invite forks. Differentiation rests on community momentum and skill breadth.
- **Windows needs WSL2.** Native Windows users face extra setup versus macOS or Linux.
- **Breaking changes during rapid development.** Active project. Expect version-to-version config churn.
- **API bills can surprise.** A heavily used agent on frontier models can run up real costs without prompt caching, skill limits, and usage monitoring.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-25 against the [openclaw/openclaw GitHub repo](https://github.com/openclaw/openclaw), [openclaw.ai](https://openclaw.ai/), official releases, official security/exposure documentation linked from the README, June 2026 security coverage, [Steinberger's OpenAI announcement](https://steipete.me/posts/2026/openclaw), [TechCrunch coverage](https://techcrunch.com/2026/02/15/openclaw-creator-peter-steinberger-joins-openai/), and the [OpenClaw Wikipedia entry](https://en.wikipedia.org/wiki/OpenClaw).

## FAQ

**Is OpenClaw free?**
Yes. MIT-licensed, free to self-host. You pay only model usage or subscription-auth costs plus whatever the always-on machine or server costs.

**What happened after Peter Steinberger joined OpenAI?**
Steinberger announced the move on February 14, 2026. OpenClaw transitioned to an independent foundation on the same announcement. OpenAI remains a sponsor. Community maintainers govern the roadmap ([steipete.me](https://steipete.me/posts/2026/openclaw)).

**Does OpenClaw send my data to a third-party cloud?**
By design, OpenClaw runs on your own hardware. No OpenClaw-controlled server touches your data. Outbound calls go only to the LLM provider you configure (Claude, GPT, local model, etc).

**Which messaging apps does OpenClaw support?**
WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, IRC, Microsoft Teams, Matrix, Feishu, LINE, Mattermost, Nextcloud Talk, Nostr, Synology Chat, Tlon, Twitch, Zalo, Zalo Personal, WeChat, QQ, and WebChat. The gateway design keeps a single assistant across every channel.

**Can OpenClaw control my computer?**
Yes. Dedicated browser automation, shell command execution, and filesystem access are the point of the tool. That is also why DM pairing, allowlists, sandbox mode, and gateway exposure controls matter before real use.

## Sources

- [openclaw/openclaw GitHub](https://github.com/openclaw/openclaw): Source, stars, channels, install path, security defaults, sandboxing links, verified 2026-06-25
- [OpenClaw releases](https://github.com/openclaw/openclaw/releases): 2026.6.10 release notes, verified 2026-06-25
- [openclaw.ai](https://openclaw.ai/): Official product site, verified 2026-06-25
- [OpenClaw security guide](https://docs.openclaw.ai/security): Official security documentation linked from README, verified 2026-06-12
- [OpenClaw gateway exposure runbook](https://docs.openclaw.ai/gateway-exposure): Official exposure documentation linked from README, verified 2026-06-12
- [TechRadar: OpenClaw vulnerability and agentic AI security](https://www.techradar.com/pro/what-the-openclaw-vulnerability-reveals-about-the-future-of-agentic-ai-security): June 2026 security coverage, verified 2026-06-12
- [TechRadar: OpenClaw phishing-agent test](https://www.techradar.com/pro/security/openclaw-ai-agent-tricked-into-phishing-attacks-with-user-data-compromised): Secondary security coverage of Varonis testing, verified 2026-06-25
- [Peter Steinberger: OpenClaw, OpenAI and the future](https://steipete.me/posts/2026/openclaw): Founder post on OpenAI move
- [TechCrunch: OpenClaw creator joins OpenAI](https://techcrunch.com/2026/02/15/openclaw-creator-peter-steinberger-joins-openai/): Coverage of the transition
- [Wikipedia: OpenClaw](https://en.wikipedia.org/wiki/OpenClaw): Naming history (Clawdbot to Moltbot to OpenClaw) and project timeline

## Related

- **Category:** [AI Automation](/categories/ai-automation/)
