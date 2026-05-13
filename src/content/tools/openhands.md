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
price_range: "Free (MIT, BYOK) · Free Individual SaaS (10 conv/day) · Enterprise custom"
status: active
launched: 2024-03
last_updated: 2026-05-13
last_verified: 2026-05-13
price_history:
  - date: 2026-05-13
    price: "see note"
    change: "All Hands AI restructured OpenHands Cloud: the $20/mo Pro tier was retired in favor of a free Individual SaaS plan (10 daily conversations, BYOK or at-cost OpenHands provider) plus custom Enterprise. Self-hosted MIT remains free."
  - date: 2026-04-17
    price: "see note"
    change: "Pricing verified: Self-hosted free, Cloud Free on MiniMax, Pro $20/mo BYOK, Enterprise custom."
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
facts:
  best_for:
    value: "Open-source AI software engineer (formerly OpenDevin). MIT-licensed CLI, GUI, and SDK that autonomously write and test code in a Docker sandbox with any LLM. Best for software development and code-assistant workflows."
    source: "https://docs.openhands.dev/"
    source_label: "OpenHands documentation"
    source_id: openhands-official
    verified_at: 2026-05-13
    volatility: medium
    confidence: medium
  pricing_anchor:
    value: "As of May 2026 OpenHands Cloud has two public tiers: free Individual SaaS (10 daily conversations, BYOK or at-cost OpenHands provider) and custom-priced Enterprise (SAML/SSO, private VPC, unlimited concurrent runs). The $20/mo Pro tier was retired. Self-hosting under MIT remains free."
    source: "https://openhands.dev/pricing"
    source_label: "OpenHands pricing"
    source_id: openhands-pricing
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
  watch_out_for:
    value: "Verify current daily conversation caps, model access policy, and Enterprise VPC terms on the live pricing page before procurement. The product moved off a $20/mo Pro tier in 2026."
    source: "https://openhands.dev/pricing"
    source_label: "OpenHands pricing"
    source_id: openhands-pricing
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
tags: [open-source, ai-software-engineer, docker, sandboxed, devin-alternative, multi-model, python, typescript, github-integration, self-hosted, openhands-cloud]
seo_title: "OpenHands: Features, Pricing & Review (May 2026)"
meta_description: "OpenHands (formerly OpenDevin) is a free, MIT-licensed AI software engineer maintained by All Hands AI. Self-host free; OpenHands Cloud offers a free Individual SaaS tier (10 conv/day, BYOK) and custom Enterprise. Pro $20/mo retired May 2026."
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
  OpenHands is the MIT-licensed AI software engineer formerly named OpenDevin, maintained by All Hands AI. Self-host free, or use OpenHands Cloud with a free Individual SaaS tier (10 daily conversations, BYOK or at-cost provider) and a custom Enterprise plan. The $20/mo Pro tier was retired in May 2026. Pick it for autonomous coding on your own stack; skip for inline IDE autocomplete.
---

# OpenHands

OpenHands is the open-source AI software engineer previously known as OpenDevin, maintained by All Hands AI. It reads, writes, runs, and debugs code inside a Docker sandbox, accessible via CLI, GUI, Python SDK, or OpenHands Cloud ([docs.openhands.dev](https://docs.openhands.dev/)).

The repo carries 71K+ GitHub stars as of May 2026. Model is bring-your-own: Claude Opus 4.7, GPT-5.5, Gemini 3.1 Pro, Grok 4.3, DeepSeek V4, Kimi K2.6, or any LiteLLM-compatible endpoint.

## Recent developments

- **May 2026:** OpenHands Cloud retired the $20/mo Pro tier. The current public lineup is a free Individual SaaS plan (10 daily conversations, BYOK or at-cost OpenHands provider) plus custom-priced Enterprise (SAML/SSO, private VPC, unlimited concurrency, Large Codebase SDK).

## System Verdict

> **Pick OpenHands if autonomous software engineering at Devin-class capability is the goal and infrastructure ownership is acceptable.** The MIT license, Docker sandbox, and GitHub PR integration make it production-credible for real tasks. Model flexibility is the moat against closed services.
>
> **Skip it if IDE autocomplete is the primary need.** OpenHands delegates full tasks; it does not pair-program inline. Cursor or Claude Code fit in-editor workflows better.
>
> **Who pays which tier:** Self-host free for developers who run Docker locally. OpenHands Cloud Individual SaaS is free with a 10 daily conversation cap and BYOK (or the OpenHands provider at cost, no markup). Enterprise covers SAML/SSO, private VPC, unlimited concurrent conversations, and the Large Codebase SDK with custom pricing.

## Key Facts

| | |
|---|---|
| **Former name** | OpenDevin (renamed 2024) |
| **Maintainer** | All Hands AI |
| **License** | MIT (core) · Enterprise directory is separate-licensed |
| **GitHub stars** | 71,200+ (May 2026) |
| **Interfaces** | CLI · Local GUI · Python SDK · OpenHands Cloud |
| **Sandbox** | Docker container per task |
| **Cloud Individual (free)** | 10 daily conversations · BYOK or OpenHands provider at cost · API keys for CLI/SDK |
| **Cloud Enterprise** | SaaS or self-hosted in your VPC · SAML/SSO · unlimited concurrent runs · Large Codebase SDK · dedicated Slack channel · custom pricing |
| **Model support** | Claude Opus 4.7 · GPT-5.5 · Gemini 3.1 Pro · Grok 4.3 · DeepSeek V4 · Kimi K2.6 · Llama 4 · any LiteLLM endpoint |

Every data point above was verified against vendor sources on 2026-05-13. See Sources.

## What it actually is

An agent loop that wraps any LLM inside a controlled code-execution environment. Given a task, OpenHands plans the approach, edits files, runs tests, reads failures, iterates, and submits a pull request.

Deployment is your choice. CLI for terminal natives. Local GUI for browser-based work. Python SDK for custom agent automation. OpenHands Cloud for zero-setup evaluation.

The moat is low and the team knows it. The architecture is public, the model layer is swappable, and competing forks exist. Positioning rests on community velocity, benchmark leadership, and the cloud platform rather than protocol lock-in.

## When to pick OpenHands

- **Devin-class capability without the Devin bill.** Self-hosting plus BYOK beats commercial Devin on price for most solo developers.
- **Private infrastructure.** Code must not leave the company network. Enterprise self-hosting inside your VPC gives full audit control.
- **Model-agnostic coding agent.** Benchmark Claude Opus 4.7 against GPT-5.5, Gemini 3.1 Pro, Grok 4.3, or Kimi K2.6 on the same task without rewriting the agent.
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
| Cloud Individual | Free | GitHub login, 10 daily conversations, BYOK or OpenHands provider at cost, no markup |
| Cloud Enterprise | Custom | SaaS or self-hosted VPC, SAML/SSO, unlimited concurrent runs, Large Codebase SDK, dedicated Slack channel |
| Model API costs | Usage-based | Typical session: $0.50-$5 on Claude Opus 4.7 or GPT-5.5 |

*Prices verified 2026-05-13 via [OpenHands pricing](https://openhands.dev/pricing). The $20/mo Pro tier was retired in May 2026; the current free Individual SaaS plan replaces it with a daily conversation cap and the same BYOK model. Self-hosting under MIT remains fully free.*

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
- **Free Cloud caps at 10 conversations per day.** Heavy users should self-host or move to Enterprise.
- **Variable reliability on complex refactors.** Large multi-file changes can exceed context limits or produce code requiring human fix-up.
- **Low moat.** Architecture is public; commercial services compete on reliability, not novelty.
- **Slower than IDE tools for one-file edits.** The plan-act-observe loop adds latency. Cline in VS Code wins on micro-edits.
- **Enterprise directory has separate license terms.** The enterprise extensions are not under MIT. Read the licensing before deploying.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-05-13 against [OpenHands documentation](https://docs.openhands.dev/), [OpenHands pricing](https://openhands.dev/pricing), and the [All-Hands-AI/OpenHands GitHub repo](https://github.com/All-Hands-AI/OpenHands).

## FAQ

**OpenHands vs OpenDevin: same project?**
Yes. OpenDevin was renamed OpenHands in 2024. All development and releases now ship under the OpenHands name, maintained by All Hands AI.

**Is OpenHands free?**
Self-hosting is fully free under MIT. OpenHands Cloud offers a free Individual SaaS tier via GitHub login: 10 daily conversations, BYOK or the OpenHands provider at cost with no markup. The $20/mo Pro plan was retired in May 2026. Enterprise is custom-priced for SaaS or self-hosted VPC deployments with SAML/SSO, unlimited concurrent runs, and the Large Codebase SDK.

**Does OpenHands work with Claude?**
Yes. OpenHands is model-agnostic. Claude Opus 4.7, GPT-5.5, Gemini 3.1 Pro, Grok 4.3, DeepSeek V4, Kimi K2.6, Llama 4, and any LiteLLM-compatible endpoint are supported via API key.

**OpenHands vs Devin?**
Both are autonomous software engineers that turn task descriptions into reviewable PRs. OpenHands is open-source, self-hostable, and model-agnostic. Devin is commercial, managed, and faster to onboard. OpenHands wins on price and control; Devin wins on reliability out of the box.

**Can OpenHands open GitHub pull requests?**
Yes. Native GitHub and GitLab integration. It clones a repo, reads issues, implements a fix inside a Docker sandbox, and opens a PR for human review.

## Sources

- [OpenHands documentation](https://docs.openhands.dev/): Architecture, deployment modes, agent loop
- [OpenHands pricing](https://openhands.dev/pricing): Cloud Individual and Enterprise tiers
- [All-Hands-AI/OpenHands GitHub](https://github.com/All-Hands-AI/OpenHands): Source, stars, release history
- [OpenHands Index announcement](https://openhands.dev/blog/openhands-index): January 2026 platform update

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
