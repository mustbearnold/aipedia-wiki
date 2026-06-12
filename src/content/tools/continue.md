---
type: tool
slug: continue
title: Continue
tagline: Open-source AI PR-check and coding-agent stack. Turn repo standards into source-controlled checks that run as GitHub status checks.
category: ai-coding
company: continue-dev
url: https://continue.dev
github_url: https://github.com/continuedev/continue
pricing_model: freemium
price_range: "$0-$20/seat/month"
status: active
launched: 2023-05
last_updated: 2026-06-12
last_verified: 2026-06-12
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
  moat: 5
  longevity: 8
facts:
  best_for:
    value: "Engineering teams that want source-controlled AI checks on every pull request, with human-owned standards encoded as markdown checks in the repository."
    source: "https://docs.continue.dev/"
    source_label: "Continue docs"
    source_id: continue-docs
    verified_at: 2026-06-12
    volatility: low
    confidence: high
  pricing_anchor:
    value: "Continue's published self-serve tiers are Starter at $3 per million input/output tokens, Team at $20/seat/month with $10 in credits per seat, and Company custom with SAML/OIDC, BYOK, commitments, invoicing, and SLA."
    source: "https://www.continue.dev/pricing"
    source_label: "Continue pricing"
    source_id: continue-pricing
    verified_at: 2026-06-12
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
  model_control:
    value: "Company tier explicitly includes BYOK, while Starter and Team are built around creating and running agents with purchasable frontier-model credits."
    source: "https://docs.continue.dev/"
    source_label: "Continue docs"
    source_id: continue-docs
    verified_at: 2026-06-12
    volatility: medium
    confidence: high
  team_distribution:
    value: "Team tier adds private-agent sharing, centralized agent management, controls over which agents the team can use, and Gmail/GitHub SSO login."
    source: "https://www.continue.dev/pricing"
    source_label: "Continue pricing"
    source_id: continue-pricing
    verified_at: 2026-06-12
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Continue is not a no-setup IDE bundle. The value depends on teams writing clear checks, governing agents, and reviewing suggested fixes before merge."
    source: "https://docs.continue.dev/"
    source_label: "Continue docs"
    source_id: continue-docs
    verified_at: 2026-06-12
    volatility: medium
    confidence: high
tags: [open-source, ai-checks, pull-request-review, ai-coding, cli, github-status-checks, byok, code-quality]
seo_title: "Continue.dev Review: Source-Controlled AI PR Checks (June 2026)"
meta_description: "Continue runs source-controlled AI checks on pull requests. Starter is $3/M tokens, Team is $20/seat with credits, Company adds SSO, BYOK, invoicing, and SLA."
author: "aipedia.wiki Editorial"
best_for:
  - teams encoding code-review standards as PR checks
  - engineering leaders standardizing AI quality gates
  - developers who want open-source Continue CLI workflows
  - teams needing Company BYOK and SSO paths
  - repo owners who want suggested fixes but human merge decisions
not_best_for:
  - zero-configuration autocomplete
  - teams that do not want to maintain AI check prompts
  - buyers expecting a full AI-native IDE
quick_answer: >-
  Continue is now best treated as source-controlled AI quality control for software teams. Write checks in `.continue/checks/`, run them on pull requests, and let Continue report GitHub status checks with suggested fixes. Pick it for repo-owned standards and agent governance; skip it if you only want plug-and-play autocomplete.
decision_brief:
  items:
    - label: Start here
      value: "PR checks"
      detail: "Turn code-review standards into markdown checks in the repo."
    - label: Upgrade when
      value: "Teams need agents"
      detail: "Team adds private agent sharing, controls, SSO, and bundled credits."
    - label: Compare against
      value: "Copilot Review"
      detail: "Copilot is packaged; Continue is more standards-as-code."
price_history:
  - date: 2026-06-04
    plan: "Source-controlled checks refresh"
    price: "Free OSS + Starter $3/M tokens + Team $20/seat/mo"
    source: "https://www.continue.dev/pricing"
    source_label: "Source"
    source_id: continue-pricing
    note: "Re-verified for the Continue comparison refresh. Public homepage/docs now position Continue around source-controlled AI checks on every pull request; GitHub repo lists Apache-2.0 license."
  - date: 2026-03-01
    plan: "Team"
    price: "$20/seat/mo"
    source: "https://www.continue.dev/pricing"
    source_label: "Source"
    source_id: continue-pricing
    note: "Team tier restructured with $10 per-seat frontier-model credits included"
  - date: 2026-04-15
    plan: "Solo"
    price: "$0"
    source: "https://www.continue.dev/pricing"
    source_label: "Source"
    source_id: continue-pricing
    note: "Solo remains free with full open-source extension access"
  - date: 2026-05-13
    plan: "Starter"
    price: "$3/M tokens"
    source: "https://www.continue.dev/pricing"
    source_label: "Source"
    source_id: continue-pricing
    note: "Verified pay-as-you-go Starter tier at $3 per million tokens (input and output) with Slack, Sentry, and Snyk integrations. Team holds at $20/seat with $10 bundled credits; Company stays custom."
  - date: 2026-06-01
    plan: "Pricing refresh"
    price: "Free OSS + Starter $3/M tokens + Team $20/seat/mo"
    source: "https://www.continue.dev/pricing"
    source_label: "Source"
    source_id: continue-pricing
    note: "Re-verified June 1, 2026. Continue remains BYOK/open-source for core IDE use; paid Continue tiers cover managed credits, integrations, shared agents, and team governance."
---

# Continue

Continue is an open-source AI quality-control stack for software teams. Its current public docs and homepage put the front door on source-controlled AI checks: write a check as markdown in `.continue/checks/`, open a pull request, and Continue runs that check as a GitHub status check with suggested fixes when code misses the standard.

That makes Continue less of a "buy another autocomplete" decision and more of a standards-as-code decision. It is for teams that want AI review behavior to live in the repo, not only in a proprietary IDE sidebar.

## System Verdict

> **Pick Continue when your team wants AI checks that are explicit, source-controlled, and decided by humans.** The best use is turning real review rules such as security, API consistency, dependency hygiene, or internal conventions into repeatable checks that run on every pull request.
>
> **Skip it if you just want first-day autocomplete.** [GitHub Copilot](/tools/github-copilot/) is easier for inline help, and [Cursor](/tools/cursor/) is a stronger all-in-one AI IDE. Continue asks the team to define standards clearly.
>
> **Who pays what:** Starter is pay-as-you-go at $3 per million input/output tokens. Team is $20/seat/month with $10 in credits per seat, private-agent sharing, agent controls, and Gmail/GitHub SSO. Company is custom and adds SAML/OIDC, BYOK, commitments, invoicing, and SLA.

## Key Facts

| | |
|---|---|
| **Primary job** | Source-controlled AI checks on pull requests |
| **How checks work** | Markdown files in `.continue/checks/` become GitHub status checks |
| **Open-source repo** | `continuedev/continue`, Apache-2.0 license |
| **CLI** | Continue CLI (`cn`) powers AI checks |
| **Starter pricing** | $3 per million input/output tokens, pay as you go |
| **Team pricing** | $20/seat/month with $10 in credits per seat |
| **Company pricing** | Custom pricing with SAML/OIDC, BYOK, commitments, invoicing, and SLA |
| **Best fit** | Teams standardizing code-review rules, quality gates, and AI-agent behavior |
| **Main watch-out** | Weak prompts become weak checks; humans still decide whether suggested fixes merge |

Every data point above was verified against vendor documentation on 2026-06-12. See Sources.

## What It Actually Is

Continue lets a team describe an engineering standard in a markdown check. The official docs show checks with a name, description, and prompt. When a pull request opens, Continue evaluates the diff against those checks and reports the result as a GitHub status check. If a check fails, it can suggest a fix for a human to accept or reject.

The open-source repository describes the product as source-controlled AI checks powered by the Continue CLI. That is the clearest current buyer framing: Continue is an AI review and agent-governance layer, not a hosted IDE replacement.

The pricing page adds the commercial layer. Starter is usage-based for trying and running agents. Team is the operational tier for private agents, agent controls, and SSO. Company is the enterprise route when BYOK, SAML/OIDC, commitments, invoicing, and SLA matter.

## When To Pick Continue

- **You want review rules in the repo.** Checks in `.continue/checks/` make AI behavior visible, versioned, and auditable.
- **You want AI review to match your standards.** Continue is stronger for "enforce this rule every PR" than for generic unsolicited code opinions.
- **You need private team agents.** Team adds private-agent sharing and controls over which agents developers can use.
- **You need a Company BYOK path.** The pricing page explicitly puts BYOK in the enterprise tier.
- **You want human-controlled fixes.** Continue can suggest a fix, but review ownership stays with the team.

## When To Pick Something Else

- **Fastest inline coding help:** [GitHub Copilot](/tools/github-copilot/) is simpler for day-one completions, chat, and GitHub-native workflow.
- **Full AI-native IDE:** [Cursor](/tools/cursor/) is the better pick when the developer wants editor, agents, cloud agents, Bugbot, and usage analytics in one product.
- **Autonomous ticket delegation:** [Devin](/tools/devin/) fits better when a team wants an agent to work in a sandbox and return a PR.
- **Terminal-first repo agent:** [Claude Code](/tools/claude-code/) fits deeper local repo investigation, shell work, and long debugging loops.
- **Hosted TypeScript scripts:** [Val Town](/tools/val-town/) is a runtime for vals, cron jobs, and webhooks, not a code-review stack.

## Pricing

Pricing via [continue.dev/pricing](https://www.continue.dev/pricing).

| Plan | Price | What it adds | Best for |
|---|---:|---|---|
| Starter | $3 per million tokens | Create and run AI agents, Slack/Sentry/Snyk integrations, frontier-model credits | Teams testing AI checks or light usage |
| Team | $20/seat/month | $10 credits per seat, private-agent sharing, agent controls, Gmail/GitHub SSO | Small teams standardizing checks |
| Company | Custom | SAML/OIDC, BYOK, commitments, invoicing, SLA | Enterprise compliance and procurement |

The important pricing detail is not only the seat price. Check volume, model choice, agent run length, and how often suggested fixes are generated determine the real bill.

## Against The Alternatives

| | Continue | GitHub Copilot | Cursor |
|---|---|---|---|
| **Best viewed as** | Source-controlled AI PR checks | GitHub-native AI coding platform | Managed AI-native IDE |
| **Daily user surface** | PR checks, CLI, agents | IDE, GitHub, CLI, code review, cloud agent | VS Code fork with agents, Tab, Bugbot, Cloud Agents |
| **Pricing anchor** | $3/M tokens Starter; $20/seat Team | Free; Pro $10; Pro+ $39; Max $100; Business $19; Enterprise $39 | Hobby free; Individual from $20; Teams $40/user |
| **Governance strength** | Team-owned standards in repo | GitHub policy, org, model, and billing controls | Editor/team admin, privacy mode, usage analytics |
| **Main risk** | Check quality depends on prompt quality | AI Credits can move costs quickly | Editor lock-in and usage-based model burn |

## Failure Modes

- **Generic checks create noise.** Continue is strongest when checks are narrow and tied to real team standards.
- **Human review still matters.** A green AI check is not proof of correctness, security, or architectural fitness.
- **Pricing can scale with PR volume.** Starter token billing is simple, but large diffs and many checks can add up.
- **Company BYOK is not the same as free local AI.** Enterprise routing still needs procurement, provider governance, and security review.
- **It is not a full IDE.** Developers wanting a polished coding environment should compare Cursor, Copilot, Claude Code, and Cline.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-12 against [Continue pricing](https://www.continue.dev/pricing), [Continue docs](https://docs.continue.dev), [Continue homepage](https://www.continue.dev/), and the [Continue GitHub repo](https://github.com/continuedev/continue).

## FAQ

**Is Continue free?**
The open-source repository is public under Apache-2.0. The current commercial pricing page lists Starter at $3 per million tokens, Team at $20/seat/month, and Company custom.

**Is Continue a GitHub Copilot replacement?**
Only for some jobs. Copilot is better for inline coding help and GitHub-native assistant workflows. Continue is better when the team wants AI review standards written into the repo.

**Does Continue support BYOK?**
Yes, but the current pricing page lists BYOK under Company. Treat BYOK as an enterprise/procurement feature unless the team's self-managed open-source workflow is already proven.

**What should I test first?**
Start with one narrow check, such as secrets, input validation, deprecated API use, or a house-style rule. If that check creates useful signal without review noise, expand to more standards.

## Sources

- [Continue homepage](https://www.continue.dev/) - source-controlled AI checks positioning, verified 2026-06-12
- [Continue docs](https://docs.continue.dev/) - check files and GitHub status-check workflow, verified 2026-06-12
- [Continue pricing](https://www.continue.dev/pricing) - Starter, Team, Company tiers, verified 2026-06-12
- [GitHub: continuedev/continue](https://github.com/continuedev/continue) - open-source repository and Apache-2.0 license, verified 2026-06-12

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
- **Comparisons:** [Claude Code vs Continue](/compare/claude-code-vs-continue/) | [Continue vs Cursor](/compare/continue-vs-cursor/) | [Continue vs Devin](/compare/continue-vs-devin/) | [Continue vs GitHub Copilot](/compare/continue-vs-github-copilot/) | [Continue vs Val Town](/compare/continue-vs-val-town/)
