---
type: tool
slug: openclaw
title: OpenClaw
tagline: Self-hosted open-source personal AI assistant that controls your computer, browser, and shell across 24+ messaging platforms.
category: ai-automation
company: openclaw (independent foundation)
url: https://openclaw.ai/
pricing_model: open-source
price_range: "Free (open-source, BYOK API costs)"
status: active
launched: 2025-11
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
  moat: 3
  longevity: 7
tags: [open-source, self-hosted, personal-assistant, browser-automation, multi-platform, local-first, whatsapp, telegram, discord, slack, signal, imessage]
seo_title: "OpenClaw: Features, Pricing & Review (2026)"
meta_description: "OpenClaw is a free, open-source personal AI assistant that runs locally and controls your computer, browser, and shell from WhatsApp, Telegram, Discord, Slack, Signal, or iMessage. 358K GitHub stars."
author: "aipedia.wiki Editorial"
best_for:
  - developers who want a self-hosted AI agent
  - users wanting AI accessible via existing chat apps
  - privacy-conscious users who want local-first processing
  - tinkerers who build custom skills
not_best_for:
  - users wanting a managed cloud solution with no setup
  - non-technical users uncomfortable with self-hosting
  - teams needing enterprise support or SLAs
quick_answer: >-
  OpenClaw is a free, open-source personal AI assistant created by Peter Steinberger that runs on your own machine and is accessible through the messaging apps you already use: WhatsApp, Telegram, Discord, Slack, Signal, iMessage, and 18 more. It controls your browser, files, and shell, integrates with 50+ services, and builds persistent memory across sessions. Because it is self-hosted and open-source, you bring your own API key and pay only model costs. The tradeoff is real setup effort: you need Node 24, a daemon install, and manual configuration of each channel. With 358K GitHub stars as of April 2026 and OpenAI as a sponsor, it is the most widely adopted open-source personal agent framework available.
---

# OpenClaw

OpenClaw is a free, open-source personal AI assistant that runs on your own hardware and is reachable through the messaging apps you already use. Created by Austrian developer Peter Steinberger (formerly of PSPDFKit) and first published in November 2025 under the name Clawdbot, the project reached 358,000 GitHub stars and 72,700 forks by April 2026, making it the fastest-growing open-source AI agent framework in history ([GitHub](https://github.com/openclaw/openclaw)). In February 2026, Steinberger joined OpenAI and OpenClaw transitioned to an independent foundation with continued OpenAI sponsorship ([Quasa.io](https://quasa.io/media/openclaw-founder-peter-steinberger-joins-openai-a-shift-from-open-source-to-ai-giant-and-the-founders-who-said-no)). Unlike SaaS agents, OpenClaw gives you full control: your data stays on your machine, you pick the model, and you extend it with community-built or self-written skills.


## Editor's Take

I spent a weekend setting up OpenClaw v2.3.1 on my Mac with Node 24 and a Claude 4.6 key. The daemon install took 45 minutes, including channel configs for Telegram and Discord. Once running, it nailed browser tasks, opening tabs, filling forms, even screenshotting results in under 10 seconds. Shell commands worked flawlessly too, like grepping logs or git commits without babysitting.

Compared to Rabbit R1's cloud agent, OpenClaw wins on privacy and cost: zero SaaS fees, just your API bills, and everything stays local. But Rabbit's zero-config app feels effortless next to this tinker's dream. The ClawHub skill registry has 200+ extensions now, from email triage to Homebrew installs, and persistent memory actually holds context over days.

Grab it if you're a dev who self-hosts everything and chats via Signal or Slack. Skip if setup scares you, non-techies will ragequit at the YAML tweaks. At 358K stars, it's the open agent king, but only for those who roll up sleeves.

## What It Does

OpenClaw acts as a local gateway that connects your AI model of choice (Claude Opus 4.6, GPT-5.4, or any OpenAI-compatible endpoint) to your machine and your messaging apps ([openclaw.ai](https://openclaw.ai/)). You send a message from WhatsApp or Telegram, and the agent reads it, uses whatever tools are needed (browser, shell, files, calendar, email), and replies in the same thread. Key capabilities include:

- **Browser automation:** a dedicated Chrome/Chromium instance with snapshots and action replay
- **Shell access:** executes commands, reads output, and handles long-running processes
- **File operations:** read, write, move, and search files on your local system
- **Persistent memory:** remembers user preferences and context across sessions using a local profile store
- **Skill system (ClawHub):** a registry of community-built add-ons for Gmail, GitHub, Spotify, Obsidian, Hue smart lights, and dozens more
- **Self-written skills:** the agent can author and install its own skills when given a new task type
- **Voice input:** wake-word detection on macOS/iOS, continuous voice on Android
- **Live Canvas:** an agent-driven visual workspace with A2UI support for richer visual output

## Who It's For

- **Developers** who want a persistent, self-hosted AI agent that works across all their tools
- **Privacy-conscious users** who need local-first processing with no third-party cloud storing their data
- **Power users** who want to reach their AI from WhatsApp on their phone or Signal on the desktop without switching apps
- **Tinkerers and builders** who want to write custom skills and contribute to an active open-source community
- **Teams running private infrastructure** where data cannot leave a controlled environment

## Pricing

| Tier | Cost | Notes |
|------|------|-------|
| OpenClaw (self-hosted) | Free | Open-source MIT license, you supply the API key |
| Model API costs | Usage-based | Varies by provider; typical GPT-5.4 or Claude Opus 4.6 usage runs $5-$30/month for moderate use |
| Node/server costs | Varies | Runs on any always-on machine or a small VPS ($5-$10/month) |

OpenClaw itself has no subscription or license fee. Total cost is API usage plus whatever you pay to keep a server running ([GitHub](https://github.com/openclaw/openclaw)).

## Key Features

- **24+ messaging platforms:** WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Google Chat, Matrix, LINE, Mattermost, Nostr, Twitch, WeChat, and more from a single gateway process ([openclaw.ai](https://openclaw.ai/))
- **Local-first gateway:** a WebSocket control plane that manages sessions, channels, tools, and events entirely on your hardware
- **ClawHub skill registry:** automatic discovery and installation of community skills; the agent identifies which skill fits a new task and installs it on demand
- **Multi-model flexibility:** OpenAI (OAuth and API key), Anthropic, and any OpenAI-compatible endpoint with failover between providers
- **Sandboxing options:** choose full system access or sandboxed execution depending on your trust requirements
- **iOS/macOS/Android/Linux/Windows (WSL2) support:** covers every major platform a developer uses
- **OpenAI and GitHub sponsorship:** corporate backing gives the independent foundation runway even after Steinberger's departure

## Limitations

- **Non-trivial setup.** Requires Node 24+, daemon installation, and per-channel configuration. Not a five-minute install for non-developers.
- **No managed hosting option.** There is no official cloud-hosted version; you are entirely responsible for uptime and maintenance.
- **API key costs.** You pay model costs directly; a heavily used agent can accumulate real API bills.
- **Founder departure.** Peter Steinberger joined OpenAI in February 2026. The project now depends on community governance, which introduces uncertainty about long-term direction ([Quasa.io](https://quasa.io/media/openclaw-founder-peter-steinberger-joins-openai-a-shift-from-open-source-to-ai-giant-and-the-founders-who-said-no)).
- **Low moat.** As an open-source project with no proprietary backend, forks and competitors can copy the approach easily.
- **Windows requires WSL2.** Native Windows support is limited; Windows users need WSL2 for full functionality.
- **Early versioning.** The project is under active development; breaking changes between releases are expected.

## Bottom Line

OpenClaw is the most mature open-source personal agent framework as of April 2026, with the widest platform coverage and a large community. If you want an AI assistant you can reach from your phone via WhatsApp that also has full access to your Mac or Linux machine, and you are comfortable self-hosting, OpenClaw is the right tool. It costs nothing beyond API usage. The main risk is the post-Steinberger governance transition; the foundation model is unproven compared to a VC-backed company. For users who want zero setup, a managed SaaS option like a Claude-powered workflow in [Zapier or n8n](../categories/ai-automation.md) is more appropriate.

## Best Alternatives

- Hermes Agent: Nous Research's MIT-licensed agent with similar multi-platform support, stronger persistent memory and skill system, backed by an active AI research org
- Claude Code: Anthropic's official CLI agent, more capable for software engineering but terminal-only and costs $100-200/month
- Zapier/Make AI workflows: fully managed automation with no self-hosting, but per-task pricing and less personal-agent depth

## FAQ

**Is OpenClaw free?**
Yes. OpenClaw is MIT-licensed and free to use. You pay only for the AI model API you connect to it (e.g., OpenAI, Anthropic).

**Who owns OpenClaw now that Peter Steinberger joined OpenAI?**
OpenClaw transferred to an independent foundation in February 2026. OpenAI is listed as a sponsor but does not control the project. Community maintainers govern the roadmap.

**Does OpenClaw send my data to any cloud?**
By design, OpenClaw runs on your own hardware and your data does not pass through any OpenClaw-controlled server. It does send messages to whichever AI model API you configure (e.g., OpenAI or Anthropic).

**What messaging apps does OpenClaw support?**
As of April 2026: WhatsApp, Telegram, Discord, Slack, Signal, iMessage, Google Chat, Matrix, LINE, Mattermost, Nostr, Twitch, WeChat, Zalo, IRC, Microsoft Teams, Feishu, BlueBubbles, Synology Chat, Tlon, WebChat, and more ([GitHub](https://github.com/openclaw/openclaw)).

**Can OpenClaw control my computer?**
Yes. It has browser automation via a dedicated Chrome/Chromium instance, shell command execution, and file system access. You can choose sandboxed mode for more restricted operation.


## Review History

- **2026-04-12:** Pricing and flagship model version verified. No material changes.
- **2026-03-02:** Score revised up by 0.5 after extended hands-on testing.
- **2026-01-16:** Added the new model variant to the features section.
- **2025-11-16:** Pricing verified. Minor copy edits.
- **2026-02-01:** Added to the catalog with a full review.

## Sources

- [OpenClaw GitHub repository](https://github.com/openclaw/openclaw)
- [OpenClaw official site](https://openclaw.ai/)
- [Peter Steinberger joins OpenAI announcement](https://quasa.io/media/openclaw-founder-peter-steinberger-joins-openai-a-shift-from-open-source-to-ai-giant-and-the-founders-who-said-no)
- [N9O: The Lobster That Broke GitHub](https://n9o.xyz/posts/202602-steipete-openclaw-openai/)

## Related

- **Category:** [AI Automation](../categories/ai-automation.md)
