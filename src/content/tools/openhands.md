---
type: tool
slug: openhands
title: OpenHands
tagline: Open-source AI software engineer (formerly OpenDevin). MIT-licensed CLI, GUI, and SDK that autonomously write and test code in a Docker sandbox with any LLM.
category: ai-coding
company: all-hands-ai
url: https://docs.openhands.dev/
github_url: https://github.com/All-Hands-AI/OpenHands
pricing_model: open-source
price_range: "Free (MIT, BYOK) · Cloud free tier · Pro $20/mo · Enterprise custom"
status: active
launched: 2024-03
last_updated: 2026-05-03
last_verified: 2026-05-03
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
tags: [open-source, ai-software-engineer, docker, sandboxed, devin-alternative, multi-model, python, typescript, github-integration, self-hosted, openhands-cloud]
seo_title: "OpenHands: Features, Pricing & Review (April 2026)"
meta_description: "OpenHands (formerly OpenDevin) is a free, MIT-licensed AI software engineer maintained by All Hands AI. Self-host free; OpenHands Cloud offers a free MiniMax tier, a $20/mo Pro subscription, and Enterprise self-hosted options."
author: "aipedia.wiki Editorial"
best_for:
  - developers wanting a free Devin alternative
  - teams needing self-hosted autonomous coding
  - open-source contributors and researchers
  - model-agnostic agentic coding setups
not_best_for:
  - users wanting tight IDE autocomplete
  - beginners needing guided step-by-step help
  - teams requiring managed SLAs with zero infrastructure
quick_answer: >-
  OpenHands is the MIT-licensed AI software engineer formerly named OpenDevin, maintained by All Hands AI. Self-host free, or use OpenHands Cloud with a free MiniMax tier, a $20/mo Pro subscription for BYOK, and an Enterprise self-hosted plan. Pick it for autonomous coding on your own stack; skip for inline IDE autocomplete.
---

# OpenHands

OpenHands is the open-source AI software engineer previously known as OpenDevin, maintained by All Hands AI. It reads, writes, runs, and debugs code inside a Docker sandbox, accessible via CLI, GUI, Python SDK, or OpenHands Cloud ([docs.openhands.dev](https://docs.openhands.dev/)).

The repo carries 71K+ GitHub stars as of April 2026. Model is bring-your-own: Claude Opus 4.7, OpenAI frontier models, Gemini 3.1 Pro, or any LiteLLM-compatible endpoint.

## System Verdict

> **Pick OpenHands if autonomous software engineering at Devin-class capability is the goal and infrastructure ownership is acceptable.** The MIT license, Docker sandbox, and GitHub PR integration make it production-credible for real tasks. Model flexibility is the moat against closed services.
>
> **Skip it if IDE autocomplete is the primary need.** OpenHands delegates full tasks; it does not pair-program inline. Cursor or Claude Code fit in-editor workflows better.
>
> **Who pays which tier:** Self-host free for developers who run Docker locally. OpenHands Cloud free tier on MiniMax for zero-setup evaluation. Pro at $20/mo for BYOK cloud runs. Enterprise for on-prem Kubernetes deployments with RBAC and Slack/Jira hooks.

## Key Facts

| | |
|---|---|
| **Former name** | OpenDevin (renamed 2024) |
| **Maintainer** | All Hands AI |
| **License** | MIT (core) · Enterprise directory is separate-licensed |
| **GitHub stars** | 71,200+ (April 2026) |
| **Interfaces** | CLI · Local GUI · Python SDK · OpenHands Cloud |
| **Sandbox** | Docker container per task |
| **Cloud free tier** | MiniMax model, GitHub login, limited tasks |
| **Pro subscription** | $20/mo · BYOK · covers Cloud runtime compute |
| **Enterprise** | Self-hosted on Kubernetes · RBAC · Slack/Jira · custom pricing |
| **Model support** | Claude · GPT · Gemini · Llama 4 · any LiteLLM endpoint |

Every data point above was verified against vendor sources on 2026-04-17. See Sources.

## What it actually is

An agent loop that wraps any LLM inside a controlled code-execution environment. Given a task, OpenHands plans the approach, edits files, runs tests, reads failures, iterates, and submits a pull request.

Deployment is your choice. CLI for terminal natives. Local GUI for browser-based work. Python SDK for custom agent automation. OpenHands Cloud for zero-setup evaluation.

The moat is low and the team knows it. The architecture is public, the model layer is swappable, and competing forks exist. Positioning rests on community velocity, benchmark leadership, and the cloud platform rather than protocol lock-in.

## When to pick OpenHands

- **Devin-class capability without the Devin bill.** Self-hosting plus BYOK beats commercial Devin on price for most solo developers.
- **Private infrastructure.** Code must not leave the company network. Self-host on Kubernetes with full audit control.
- **Model-agnostic coding agent.** Benchmark Claude Opus 4.7 against OpenAI frontier models on the same task without rewriting the agent.
- **Autonomous PR workflows.** Feed an issue, get a reviewable pull request. Works on GitHub and GitLab natively.
- **Research on agent architectures.** Open evaluation infrastructure and Theory-of-Mind tooling for measuring agent performance.

## When to pick something else

- **IDE autocomplete and pair-programming:** Cursor, [Cline](/tools/cline/), or GitHub Copilot.
- **Managed autonomous agent with zero setup:** Devin (Cognition) for a commercial SLA.
- **Terminal coding on Anthropic models:** Claude Code CLI for deepest Claude integration.
- **Visual agent workflow builder:** [Langflow](/tools/langflow/) or [Relevance AI](/tools/relevance-ai/).
- **Multi-agent team orchestration:** [CrewAI](/tools/crewai/).

## Pricing

| Tier | Cost | Notes |
|------|------|-------|
| Self-hosted (MIT) | Free | Full features, BYO API key and infrastructure |
| Cloud Free | Free | GitHub login, MiniMax model, limited tasks |
| Cloud Pro | $20/mo | Covers runtime compute, BYO LLM keys |
| Cloud Enterprise | Custom | Self-hosted Kubernetes, RBAC, Slack/Jira, support |
| Model API costs | Usage-based | Typical session: $0.50-$5 on Claude Opus 4.7 or OpenAI frontier models |

*Prices verified 2026-04-17 via [OpenHands pricing](https://openhands.dev/pricing) and [Pro subscription docs](https://docs.openhands.dev/openhands/usage/cloud/pro-subscription). Self-hosting remains fully free.*

## Against the alternatives

| | OpenHands | Claude Code | Devin |
|---|---|---|---|
| **License** | MIT (open-source) | Proprietary | Proprietary |
| **Hosting** | Self or Cloud | Anthropic cloud | Cognition cloud |
| **Model choice** | Any (BYOK) | Claude only | Cognition's stack |
| **Entry cost** | Free (self-host) | $20/mo Pro | Paid per-task |
| **Sandbox** | Docker | Anthropic-managed | Cognition-managed |
| **GitHub PR integration** | Native | Native | Native |
| **IDE autocomplete** | No | No (CLI-first) | No |
| **Best viewed as** | Model-agnostic open-source agent | Anthropic-native CLI agent | Managed commercial SLA |

## Failure modes

- **No inline autocomplete.** Task-delegation only. Pair-programming requires Cursor or Cline.
- **Docker dependency for self-hosting.** Full sandbox safety needs Docker. Lightweight mode drops isolation.
- **Cloud free tier uses MiniMax.** Claude or GPT on Cloud requires the $20/mo Pro plan or self-hosting with your own key.
- **Variable reliability on complex refactors.** Large multi-file changes can exceed context limits or produce code requiring human fix-up.
- **Low moat.** Architecture is public; commercial services compete on reliability, not novelty.
- **Slower than IDE tools for one-file edits.** The plan-act-observe loop adds latency. Cline in VS Code wins on micro-edits.
- **Enterprise directory has separate license terms.** The enterprise extensions are not under MIT. Read the licensing before deploying.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against [OpenHands documentation](https://docs.openhands.dev/), [OpenHands pricing](https://openhands.dev/pricing), the [Pro subscription docs](https://docs.openhands.dev/openhands/usage/cloud/pro-subscription), and the [All-Hands-AI/OpenHands GitHub repo](https://github.com/All-Hands-AI/OpenHands).

## FAQ

**OpenHands vs OpenDevin: same project?**
Yes. OpenDevin was renamed OpenHands in 2024. All development and releases now ship under the OpenHands name, maintained by All Hands AI.

**Is OpenHands free?**
Self-hosting is fully free under MIT. OpenHands Cloud offers a free tier on MiniMax via GitHub login. Pro at $20/mo covers cloud runtime compute with bring-your-own LLM keys. Enterprise is custom-priced for on-prem Kubernetes.

**Does OpenHands work with Claude?**
Yes. OpenHands is model-agnostic. Claude Opus 4.7, OpenAI frontier models, Gemini 3.1 Pro, Llama 4, and any LiteLLM-compatible endpoint are supported via API key.

**OpenHands vs Devin?**
Both are autonomous software engineers that turn task descriptions into reviewable PRs. OpenHands is open-source, self-hostable, and model-agnostic. Devin is commercial, managed, and faster to onboard. OpenHands wins on price and control; Devin wins on reliability out of the box.

**Can OpenHands open GitHub pull requests?**
Yes. Native GitHub and GitLab integration. It clones a repo, reads issues, implements a fix inside a Docker sandbox, and opens a PR for human review.

## Sources

- [OpenHands documentation](https://docs.openhands.dev/): Architecture, deployment modes, agent loop
- [OpenHands pricing](https://openhands.dev/pricing): Cloud tiers and Pro subscription
- [Pro subscription docs](https://docs.openhands.dev/openhands/usage/cloud/pro-subscription): $20/mo Pro plan details
- [All-Hands-AI/OpenHands GitHub](https://github.com/All-Hands-AI/OpenHands): Source, stars, release history
- [OpenHands Index announcement](https://openhands.dev/blog/openhands-index): January 2026 platform update

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
