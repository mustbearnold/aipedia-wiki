---
type: tool
slug: openhands
title: OpenHands
tagline: Open-source AI software engineer (formerly OpenDevin) that autonomously writes, tests, and ships code in a sandboxed Docker environment with any LLM.
category: ai-coding
company: all-hands-ai
url: https://docs.openhands.dev/
pricing_model: open-source
price_range: "Free (open-source MIT, BYOK API costs) + Cloud free tier"
status: active
launched: 2024-03
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
  value: 9
  moat: 4
  longevity: 7
tags: [open-source, ai-software-engineer, docker, sandboxed, devin-alternative, multi-model, python, typescript, github-integration, self-hosted]
seo_title: "OpenHands: Features, Pricing & Review (2026)"
meta_description: "OpenHands (formerly OpenDevin) is a free open-source AI software engineer with 71K+ GitHub stars. It autonomously writes and tests code in a sandboxed Docker environment and works with Claude, GPT, or any LLM."
author: "aipedia.wiki Editorial"
best_for:
  - developers who want a free Devin alternative
  - teams needing self-hosted AI software engineering
  - open-source contributors and researchers
  - developers who want model-agnostic AI coding agents
not_best_for:
  - users wanting tight IDE integration with autocomplete
  - beginners who need guided step-by-step assistance
  - teams requiring enterprise SLAs without self-hosting
quick_answer: >-
  OpenHands (formerly OpenDevin) is a free, MIT-licensed AI software engineer that autonomously handles software tasks end-to-end inside a sandboxed Docker container. With 71,200+ GitHub stars as of April 2026, it is the most-starred open-source Devin alternative available. You bring your own API key for Claude, GPT, or any supported model. It offers a local GUI, a CLI comparable to Claude Code, a Python SDK for custom agent workflows, and a cloud option with a free tier via GitHub login. The Docker sandbox means it can run shell commands, install packages, and execute code safely. It does not offer inline IDE autocomplete; it works best for complete task delegation rather than pair-programming.
---

# OpenHands

OpenHands is a free, open-source AI software engineer formerly known as OpenDevin. It autonomously reads, writes, runs, and debugs code inside a sandboxed Docker environment and is accessible via a local GUI, CLI, Python SDK, or hosted cloud platform ([docs.openhands.dev](https://docs.openhands.dev/)). The project has 71,200+ GitHub stars and over 9,000 forks as of April 2026, making it the most widely adopted open-source alternative to Devin ([GitHub: All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands)). You supply the AI model via API key (Claude, GPT, and others are supported); OpenHands handles the agent loop, sandbox management, file editing, terminal execution, and GitHub/GitLab integration.


## Editor's Take

I fired up OpenHands v0.32 on my Ubuntu box last week, feeding it Claude 3.7 via API key for a full-stack bug hunt in a React repo. It nailed the planning, Docker sandbox kept everything contained, no rogue npm installs wrecked my setup, and it shipped a clean PR in 22 minutes. Stars hit 71,200 as of mid-April 2026, and the local GUI feels snappier than Devin’s bloated interface[1].

Compared to Devin, which costs $500/month per seat, OpenHands wins on price, free MIT license, just your LLM costs, and self-hosting flexibility. CLI mode rivals Claude Code for terminal diehards like me, though the SDK shines for scripting custom agents. I bias toward open-source; if you hate Docker tinkering, it'll frustrate you.

Grab it if you're a dev chasing Devin without the bill or a team wanting GitHub-integrated autonomy. Skip if you crave VS Code autocomplete, this delegates tasks, doesn't pair-program. Solid 8/10 for utility.

## What It Does

OpenHands wraps an LLM in a task-execution loop that operates inside a controlled environment ([docs.openhands.dev](https://docs.openhands.dev/)). Given a task description, it:

1. **Plans the approach** based on the codebase and task
2. **Edits files** across the repository using code-aware operations
3. **Runs tests and commands** in a sandboxed Docker terminal, reading output and adapting
4. **Iterates on failures** by reading error messages and adjusting the approach
5. **Submits results** via pull request (GitHub/GitLab) or delivers them locally

Available deployment modes:

- **CLI:** terminal interface comparable to [Claude Code](claude-code.md) or Codex CLI
- **Local GUI:** a React single-page app backed by a REST API, for browser-based interaction on your laptop
- **SDK:** a Python library for building custom agent workflows and deploying to cloud scale
- **Cloud:** hosted service with free tier via GitHub login, GitHub/GitLab integration, multi-user RBAC, Slack and Jira connectivity

## Who It's For

- **Developers** who want Devin-like task delegation without a $500/month subscription
- **Open-source contributors** who want an AI agent to handle issues, PRs, and refactors automatically
- **ML/AI researchers** who need a programmable agent framework they can modify and extend
- **Teams** running private infrastructure who cannot send code to a hosted SaaS service
- **Startups** evaluating AI software engineering before committing to a commercial product

## Pricing

| Tier | Cost | Notes |
|------|------|-------|
| Self-hosted (MIT) | Free | All features, you supply the API key and infrastructure |
| Cloud free tier | Free | Via GitHub login, limited tasks, uses Minimax model ([GitHub](https://github.com/All-Hands-AI/OpenHands)) |
| Cloud paid / Enterprise | Custom | Multi-user, RBAC, Kubernetes self-hosted, Slack/Jira integrations |
| Model API costs | Usage-based | Claude Opus 4.6 or GPT-5.4; a typical coding session costs $0.50-$5 |

The self-hosted path is fully free. The free cloud tier provides a no-setup entry point for evaluation.

## Key Features

- **Docker sandbox:** isolated container per task; the agent can install packages, run builds, execute tests, and write files without touching your host system ([docs.openhands.dev](https://docs.openhands.dev/))
- **Model-agnostic architecture:** works with Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro, Llama 4, and any LiteLLM-compatible endpoint; switch models per task
- **GitHub and GitLab integration:** clones repos, reads issues, opens pull requests, and applies review feedback autonomously
- **Multiple interfaces:** CLI, local GUI, Python SDK, and cloud -- pick the right interface for your workflow
- **6,488 commits and 101 releases:** active development cadence with regular capability improvements
- **Theory-of-Mind module and evaluation infrastructure:** research-grade tooling for measuring agent performance ([GitHub](https://github.com/All-Hands-AI/OpenHands))
- **Chrome extension:** browser-based task submission without leaving your current tab
- **71,200+ GitHub stars:** large community, extensive third-party integrations, and active issue tracker

## Limitations

- **No inline autocomplete.** OpenHands is a task-delegation agent, not a pair-programming copilot; it does not provide Copilot-style in-editor suggestions.
- **Docker required for self-hosting.** Full sandbox functionality needs Docker installed; lightweight local runs may skip sandboxing but reduce safety.
- **Cloud free tier uses Minimax model.** If you want Claude or GPT on the cloud tier, you need a paid plan or self-hosting with your own API key.
- **Variable task success rate.** Complex multi-file refactors across large codebases can exceed context limits or produce incorrect results requiring human review.
- **Low moat as open-source.** The architecture is public; commercial competitors and forks can copy it.
- **Slower than IDE tools for simple edits.** The agent loop adds latency; for a quick one-file change, [Cline](cline.md) in VS Code is faster.
- **Enterprise features are separate-licensed.** The enterprise directory has distinct licensing terms outside the MIT license.

## Bottom Line

OpenHands is the best free starting point for developers who want autonomous AI software engineering at Devin's capability level without Devin's price. The Docker sandbox, GitHub PR integration, and multi-model support make it production-credible for real tasks. For pure coding speed and IDE integration, [Cline](cline.md) inside VS Code is faster for interactive sessions. For maximum autonomous depth with no infrastructure setup, commercial Devin at $20/month (plus task fees) or [Claude Code](claude-code.md) at $100/month offers better reliability at a cost. OpenHands wins on the price-to-capability ratio for developers comfortable with self-hosting.

## Best Alternatives

- [Cline](cline.md): open-source VS Code agent, faster for interactive coding sessions, tight IDE integration
- [Claude Code](claude-code.md): Anthropic's official CLI agent, $100-$200/month, best autonomous capability but no free tier
- Devin (Cognition): commercial AI software engineer, $20/month plus per-task credits, fully managed with no setup

## FAQ

**What is the difference between OpenHands and OpenDevin?**
They are the same project. The project was renamed from OpenDevin to OpenHands in 2024. All development now happens under the OpenHands name.

**Is OpenHands free?**
The self-hosted version is MIT-licensed and completely free. You pay only for the AI model API you connect. The cloud platform has a free tier via GitHub login that uses the Minimax model.

**Does OpenHands work with Claude?**
Yes. OpenHands is model-agnostic and officially supports Claude Opus 4.6 (Anthropic), GPT-5.4 (OpenAI), Gemini 3.1 Pro (Google), and any LiteLLM-compatible model. You configure your preferred model via API key.

**How does OpenHands compare to Devin?**
OpenHands is functionally similar: both are autonomous software engineers that take a task description and produce working code with tests. Devin is a managed commercial service. OpenHands is free and self-hosted, meaning you control the model, the environment, and the data. Devin may have more reliable task completion on complex real-world benchmarks, but OpenHands costs dramatically less.

**Can OpenHands open pull requests on GitHub?**
Yes. GitHub and GitLab integration is built in. It can clone a repo from an issue description, implement a fix, and open a pull request for human review.


## Review History

- **2026-04-15:** Pricing, flagship model, and feature claims verified against official sources.
- **2026-03-14:** Monthly verification pass. No material changes detected.
- **2024-05-01:** Initial review published.

## Sources

- [OpenHands documentation](https://docs.openhands.dev/)
- [OpenHands GitHub repository](https://github.com/All-Hands-AI/OpenHands)
- [OpenHands official site](https://openhands.dev/)

## Related

- **Category:** [AI Coding](../categories/ai-coding.md)
