---
type: tool
slug: devin
title: Devin
tagline: Cognition AI's autonomous software engineer. Delegates tickets inside a sandboxed shell, browser, and editor and ships a pull request.
category: ai-coding
company: cognition-ai
url: https://devin.ai
pricing_model: freemium
price_range: "$0-$200/month"
status: active
launched: 2024-12
last_updated: 2026-05-02
last_verified: 2026-05-02
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 7
  moat: 8
  longevity: 8
tags: [autonomous-agent, ai-coding, software-engineer, delegation, agentic-coding, cognition, mcp]
seo_title: "Devin: Features, Pricing & Review (April 2026)"
meta_description: "Devin is Cognition AI's autonomous coding agent. Free starter tier, Pro $20/mo with ACU overage at $2.25, Max $200/mo, Teams $80/mo, Enterprise custom. MCP Marketplace live. Verified April 2026."
author: "aipedia.wiki Editorial"
best_for:
  - delegating well-scoped tickets
  - bug-fix and refactor backlogs
  - engineering managers clearing queues
  - Slack or Linear-native workflows
not_best_for:
  - tight interactive pair-programming
  - ambiguous architectural decisions
  - solo devs on fixed budgets
quick_answer: >-
  Pick Devin to delegate well-scoped tickets end-to-end like a junior engineer. Skip it for interactive pair-programming or architectural work, where Cursor or Claude Code win on speed and reliability. Pro is $20/mo with ACU overage at $2.25; Free tier exists for trials.
price_history:
  - date: 2025-04-03
    plan: "Pro"
    price: "$20/mo"
    note: "Self-serve Pro launched, replacing the old $500 Team-only tier"
  - date: 2026-04-15
    plan: "Teams"
    price: "$80/mo"
    note: "Teams plan re-priced and unlimited-seat structure introduced"
---

# Devin

Cognition AI's autonomous software engineer. Accepts a task description, works inside its own sandboxed environment with a shell, browser, and editor, and opens a pull request when it finishes.

The delegation model is the core differentiator. Assign a ticket over Slack or Linear, then review the PR. No side-by-side pairing like Cursor or Copilot.

## System Verdict

> **Pick Devin if you manage a backlog of well-scoped tickets and can review PRs efficiently.** Bug fixes, API integrations, boilerplate, and refactors with clear acceptance criteria are the sweet spot. The MCP Marketplace (launched 2026) plus Slack and Linear integrations make hand-off close to frictionless.
>
> **Skip it for interactive coding or architectural decisions.** [Cursor](/tools/cursor/) or [Claude Code](/tools/claude/) are faster and more reliable on ambiguous work. Devin burns Agent Compute Units on exploration, which is expensive when specs are fuzzy.
>
> **Who pays which tier:** Free for evaluation, Pro $20/mo for solo devs with small queues, Max $200/mo for heavier individual workloads, Teams $80/mo for shared admin and collaboration, Enterprise for SSO and custom deployment.

## Key Facts

| | |
|---|---|
| **Vendor** | Cognition AI |
| **Primary interface** | Slack · Linear · Web dashboard · Windsurf IDE |
| **Delivery model** | Delegated tickets, sandbox-per-session, PR output |
| **Billing unit** | Agent Compute Unit (ACU), roughly 15 minutes of active work |
| **Pro tier** | $20/mo with usage quota · pay-as-you-go at $2.25/ACU over quota |
| **Max tier** | $200/mo with increased Devin and Windsurf IDE quotas |
| **Teams tier** | $80/mo · unlimited members · shared admin · centralized billing |
| **Concurrent sessions** | Up to 10 on Pro/Max · unlimited on Teams/Enterprise |
| **MCP support** | Yes · MCP Marketplace in Settings (Pro and above) |
| **Underlying models** | Cognition's Devin model family plus Claude Opus 4.7 for reasoning |

Every data point above was verified against vendor documentation on 2026-04-17. See Sources.

## What it actually is

A hosted coding agent that spins up a fresh virtual machine per task. Devin reads documentation, writes code, debugs errors, runs tests, and opens the PR autonomously. Human review happens at the end, not inline.

Assignment flows through Slack, Linear, the web dashboard, or the Windsurf IDE (which Cognition bought in July 2025 and continues to ship). Session playback shows exactly what Devin did, step by step.

Billing runs on Agent Compute Units. One ACU is roughly 15 minutes of active Devin work. Simple bug fixes consume 1-2 ACUs; feature work runs 5-10. Overage is $2.25/ACU above the tier quota.

The moat sits in the sandbox plus MCP Marketplace. No other mainstream agent couples its own VM per task with a ticketed, asynchronous workflow this cleanly.

## When to pick Devin

- **You manage a ticket queue and want to clear routine work.** Well-defined bugs, boilerplate, API integrations, and contained refactors are the sweet spot.
- **Your team already lives in Slack or Linear.** Native assignment beats copy-pasting into a chat window.
- **You need MCP-based integrations in an autonomous agent.** The MCP Marketplace is the easiest install path in the category.
- **You want session playback for audit.** Every action is recorded, replayable, and reviewable before merging.
- **You can write good task specs.** ACU cost scales with ambiguity; tight specs pay back immediately.

## When to pick something else

- **Interactive pair-programming:** [Cursor](/tools/cursor/) or [Windsurf](/tools/windsurf/) at flat monthly rates. Faster feedback, no ACU meter.
- **Terminal-first agentic coding:** [Claude Code](/tools/claude/) on Max 5x at $100/mo. Strongest CLI agent, flat billing.
- **Open-source BYOK delegation:** [Cline](/tools/cline/) inside VS Code with Plan/Act modes. No subscription floor.
- **Ultra-lean CLI workflow:** [Aider](/tools/aider/). Free, BYOK, auto-commits every change to git.
- **Enterprise with strict data controls:** [GitHub Copilot](/tools/github-copilot/) Enterprise. Devin's VPC option works but Copilot's GitHub-native posture is simpler for most orgs.

## Pricing

Pricing via [devin.ai/pricing](https://devin.ai/pricing). Individual plans use the tier quota plus overage; business plans add unlimited seats and admin.

| Plan | Price | ACU Model | Concurrency | Who's it for |
|------|-------|-----------|-------------|--------------|
| Free | $0 | Limited trial access | Low | Evaluating Devin on small tasks |
| Pro | $20/mo | Included quota + $2.25/ACU overage | Up to 10 sessions | Solo devs with light queues |
| Max | $200/mo | Larger quota + overage | Up to 10 sessions | **Heavy individual workloads** |
| Teams | $80/mo | Shared quota | Unlimited | Teams wanting admin + centralized billing |
| Enterprise | Custom | Custom quota + VPC option | Unlimited | SSO, SAML/OIDC, custom deployment |

*Prices verified 2026-04-17 via [Devin pricing](https://devin.ai/pricing) and [Cognition's self-serve plan launch](https://cognition.ai/blog/new-self-serve-plans-for-devin). An ACU is approximately 15 minutes of active Devin work.*

## Against the alternatives

| | Devin Pro | Cursor Pro | Claude Code (Max 5x) |
|---|---|---|---|
| **Model** | Delegated, async, PR-based | Interactive pair-programming | CLI agent, terminal-first |
| **Billing** | $20/mo + ACU overage | $20/mo flat | $100/mo flat |
| **Sandbox per task** | Yes, fresh VM | No, local | No, local/terminal |
| **MCP support** | Yes, Marketplace | Partial | Yes, MCP registry |
| **Session playback** | Yes, replayable | No | Transcript only |
| **Best viewed as** | AI junior dev for tickets | AI pair-programmer | Strongest CLI coding agent |

## Failure modes

- **Variable quality on ambiguous specs.** Unclear acceptance criteria trigger exploration that burns ACUs without producing a clean PR.
- **Review overhead eats into time savings.** Every PR still needs a human reviewer. Roughly 15 to 20 percent require rework per user reports.
- **ACU cost compounds on large tasks.** A feature spanning many files can run 10 to 20 ACUs. Budget carefully before running parallel sessions.
- **Hallucinated APIs on refactors.** Devin occasionally references deprecated libraries on legacy codebases. Always run the test suite before merging.
- **Slower than interactive tools.** Tasks take 10 to 60 minutes. Not useful for tight iteration loops.
- **Concurrency cap on individual plans.** Pro and Max cap at 10 concurrent sessions. Teams is needed for fleet-scale parallelism.
- **No offline or self-hosted option on Pro.** Enterprise offers VPC deployment. Individual tiers run only on Cognition's cloud.
- **ACU overage meter can surprise.** Over-quota usage bills at $2.25/ACU. Heavy weeks on Pro climb fast without a usage cap.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against [Devin pricing](https://devin.ai/pricing), [Cognition's self-serve plan launch](https://cognition.ai/blog/new-self-serve-plans-for-devin), the [MCP Marketplace announcement](https://cognition.ai/blog/mcp-marketplace), and the [Cognition acquisition of Windsurf](https://cognition.ai/blog/windsurf).

## FAQ

**Is Devin free?**
Yes, a limited Free tier exists for evaluation with capped Devin usage. Paid tiers start at Pro $20/mo. See [Devin pricing](https://devin.ai/pricing).

**What is an ACU?**
An Agent Compute Unit is a normalized billing unit covering VM time, model inference, and networking. Roughly 15 minutes of active Devin work. Simple bug fixes cost 1-2 ACUs; feature work runs 5-10.

**Does Devin support MCP?**
Yes. The MCP Marketplace launched in 2026 and is accessible from Settings on Pro and above. It enables quick install of custom tools and third-party integrations.

**How does Devin compare to Cursor or Claude Code?**
Devin delegates full tickets asynchronously and returns a PR. Cursor and Claude Code are interactive: you code alongside them in real time. Choose Devin for queues of well-scoped work, Cursor for pair-programming, Claude Code for terminal-first agentic runs.

**What happened to the $500 plan?**
Cognition replaced the old $500 Team-only tier with self-serve Pro at $20/mo in April 2025. Teams is now $80/mo with unlimited seats, and Max sits at $200/mo for heavy individual use.

## Sources

- [Devin pricing](https://devin.ai/pricing): current plan structure and ACU model
- [Cognition: new self-serve plans for Devin](https://cognition.ai/blog/new-self-serve-plans-for-devin): Pro and Max launch details
- [Cognition: Devin's MCP Marketplace](https://cognition.ai/blog/mcp-marketplace): MCP integration announcement
- [Cognition: acquisition of Windsurf](https://cognition.ai/blog/windsurf): Windsurf IDE integration path
- [MCP Marketplace docs](https://docs.devin.ai/work-with-devin/mcp): MCP setup inside Devin

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
- **Comparisons:** [Claude Code vs Devin](/compare/claude-code-vs-devin/) · [Continue vs Devin](/compare/continue-vs-devin/) · [Cursor vs Devin](/compare/cursor-vs-devin/) · [Devin vs GitHub Copilot](/compare/devin-vs-github-copilot/) · [Devin vs Val Town](/compare/devin-vs-val-town/)
