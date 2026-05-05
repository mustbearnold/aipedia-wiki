---
type: tool
slug: cody
title: Cody
tagline: Sourcegraph's enterprise code intelligence plus AI, now Enterprise-only after the July 2025 self-serve sunset.
category: ai-coding
company: sourcegraph
url: https://sourcegraph.com/cody
pricing_model: enterprise
price_range: "$59/user/month"
status: active
launched: 2023-07
last_updated: 2026-05-04
last_verified: 2026-05-04
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 7
  value: 6
  moat: 7
  longevity: 7
facts:
  product_scope:
    value: "Sourcegraph Cody is now positioned around enterprise code intelligence and AI assistance over Sourcegraph’s code graph."
    source: "https://sourcegraph.com/docs/cody"
    source_label: "Sourcegraph Cody docs"
    source_id: cody-docs
    verified_at: 2026-05-04
    next_review_at: 2026-08-04
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Enterprise-focused pricing is published through Sourcegraph pricing; self-serve Cody plans were sunset, so teams should expect sales-led packaging."
    source: "https://sourcegraph.com/pricing"
    source_label: "Sourcegraph pricing"
    source_id: cody-pricing
    verified_at: 2026-05-04
    next_review_at: 2026-08-04
    volatility: high
    confidence: high
  best_for:
    value: "Large engineering organizations that already value Sourcegraph code search/code intelligence and want AI assistance tied to enterprise code context."
    source: "https://sourcegraph.com/docs/cody"
    source_label: "Sourcegraph Cody docs"
    source_id: cody-docs
    verified_at: 2026-05-04
    next_review_at: 2026-08-04
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Not the default pick for individual developers after the self-serve shift; compare Cursor, Copilot, Cline, and Aider for lower-friction adoption."
    source: "https://sourcegraph.com/pricing"
    source_label: "Sourcegraph pricing"
    source_id: cody-pricing
    verified_at: 2026-05-04
    next_review_at: 2026-08-04
    volatility: high
    confidence: high
tags: [codebase-search, ai-coding, enterprise, sourcegraph, ide-plugin, vscode, jetbrains]
seo_title: "Cody by Sourcegraph: Features, Pricing & Review (April 2026)"
meta_description: "Cody is now Enterprise-only at $59/user/month after Sourcegraph retired the Free and Pro self-serve tiers in July 2025. Cross-repo code graph context is the one thing Copilot and Cursor cannot match."
author: "aipedia.wiki Editorial"
best_for:
  - enterprise teams on multi-repo codebases
  - organizations already using Sourcegraph code search
  - cross-repository AI context at scale
  - regulated shops needing model whitelisting and audit logs
not_best_for:
  - solo developers
  - small teams without Sourcegraph
  - anyone wanting self-serve pricing
  - buyers comparing monthly to GitHub Copilot
quick_answer: >-
  Cody is Sourcegraph's code intelligence plus AI layer. Free and Pro were retired on July 23, 2025. Enterprise runs at $59/user/month with cross-repo context and model whitelisting. Pick it if Sourcegraph already runs; skip it for solo or small-team work.
price_history:
  - date: 2025-07-23
    plan: "Free and Pro"
    price: "discontinued"
    source: "https://sourcegraph.com/pricing"
    source_label: "Source"
    source_id: cody-pricing
    note: "Self-serve tiers retired. Enterprise is the only path forward."
  - date: 2026-04-15
    plan: "Enterprise"
    price: "$59/user/mo"
    source: "https://sourcegraph.com/pricing"
    source_label: "Source"
    source_id: cody-pricing
    note: "Verified unchanged on pricing page."
---

# Cody

Sourcegraph's AI coding assistant. Built on top of Sourcegraph's code graph, which indexes symbols, definitions, and usages across every repo in an org. That single architectural choice is what separates Cody from editor-local tools like [GitHub Copilot](/tools/github-copilot/) and [Cursor](/tools/cursor/).

Self-serve is gone. Free and Pro shut down July 23, 2025. Enterprise is the only current path.

## System Verdict

> **Pick Cody if Sourcegraph already runs inside the org and cross-repo context is a daily need.** Nothing else reasons across hundreds of repos at once. Model whitelisting, SSO, audit logs, and self-hosted options clear enterprise procurement without friction.
>
> **Skip it otherwise.** No self-serve tier exists. [GitHub Copilot](/tools/github-copilot/) at $10/user/month covers most shops. [Cursor](/tools/cursor/) wins on agent mode. [Cline](/tools/cline/) and [Continue](/tools/continue/) cover BYOK workflows at zero.
>
> **Who pays:** Enterprise engineering orgs with 50+ repos, existing Sourcegraph licenses, and compliance requirements other coding tools do not meet.

## Key Facts

| | |
|---|---|
| **Product status** | Enterprise only as of July 23, 2025 |
| **Pricing** | $59/user/month, annual contract |
| **Models** | Claude Opus 4.7, OpenAI frontier models, Gemini 3.1 Pro, admin-configurable |
| **Core moat** | Sourcegraph code graph: cross-repo symbol + usage context |
| **Editor support** | VS Code, JetBrains, Visual Studio, CLI |
| **Deployment** | Sourcegraph Cloud or self-hosted |
| **Compliance** | SSO, audit logs, model whitelisting, data residency |
| **Sibling product** | Amp (agentic coding), now spinning out as a separate company |

Every data point above was verified against vendor sources on 2026-04-17. See Sources.

## What it actually is

One enterprise product: AI chat, autocomplete, and code actions layered on top of Sourcegraph's existing code intelligence backend. The code graph is the differentiator. Cody reads symbol definitions and usages across hundreds of repos, then feeds that context into the chosen model.

Model choice is admin-configurable. Teams can restrict the lineup to a single vendor, route through Azure OpenAI or AWS Bedrock, or run everything through an internal AI gateway. That level of control does not exist in [GitHub Copilot](/tools/github-copilot/) or [Cursor](/tools/cursor/).

Amp, the agentic coding product from the same team, is spinning out as a separate company under co-founders Quinn Slack and Beyang Liu. Cody stays with Sourcegraph under new CEO Dan Adler.

## When to pick Cody

- **A Sourcegraph license already covers the org.** The code graph is the moat. Pay for Cody to unlock AI on top of it.
- **AI needs to reason across 50+ repos.** Cross-repo context is the one capability Copilot and Cursor cannot reproduce.
- **Compliance gates require model whitelisting or self-hosting.** Enterprise tier ships SSO, SCIM, audit logs, and on-prem deployment.
- **Internal APIs and org-wide conventions matter.** Cody traces usage of internal packages across the codebase without manual `@`-mentions.
- **Procurement wants one vendor for search + AI.** Sourcegraph bundles both under a single contract.

## When to pick something else

- **Solo or small team without Sourcegraph:** [GitHub Copilot](/tools/github-copilot/) at $10/user/month is the better default.
- **AI-native IDE experience:** [Cursor](/tools/cursor/) ships the deepest agent mode.
- **Agentic coding from the terminal:** [Claude Code](/tools/claude-code/) handles multi-file work autonomously.
- **Free or BYOK autocomplete:** [Continue](/tools/continue/) and [Cline](/tools/cline/) both cover this.
- **Local, privacy-first completion:** [Tabnine](/tools/tabnine/) runs on-device.
- **Agentic coding from Sourcegraph itself:** Amp is the current sibling product; evaluate it directly if agent behavior is the target.

## Pricing

| Plan | Price | Key capabilities |
|---|---|---|
| Enterprise | $59/user/month | Sourcegraph code graph, cross-repo context, model whitelisting, SSO, audit logs, self-hosted option |

*Prices verified 2026-04-17 via [Sourcegraph pricing](https://sourcegraph.com/pricing) and the [Cody plan changes notice](https://sourcegraph.com/blog/changes-to-cody-free-pro-and-enterprise-starter-plans). Free and Pro were retired on July 23, 2025. Annual contract only.*

## Against the alternatives

| | Cody Enterprise | GitHub Copilot Business | Cursor Business |
|---|---|---|---|
| **Price** | $59/user/mo | $19/user/mo | $40/user/mo |
| **Cross-repo context** | **Strongest (code graph)** | File + workspace | File + workspace |
| **Agent mode** | Limited (see Amp) | Workspace agent | Composer (strongest) |
| **Model choice** | Admin-configurable, multi-vendor | GitHub-curated | Multi-model |
| **Self-hosted option** | Yes | No | No |
| **Audit logs + SSO** | Yes | Yes | Yes |
| **Best viewed as** | Code intelligence + AI | Default IDE autocomplete | AI-native IDE |

## Failure modes

- **No self-serve tier.** Free and Pro closed July 23, 2025. Individual developers cannot buy Cody.
- **Value depends on Sourcegraph.** Shops without existing Sourcegraph deployments pay for a code graph they do not already use.
- **Agent mode lags.** Autonomous multi-file edits sit inside Amp, a separate product. Cody itself stays conversational.
- **Price gap vs Copilot.** $59/user/month against Copilot Business $19 is a 3x premium. The cross-repo context must justify that gap.
- **Corporate separation risk.** Amp is spinning out as its own company. Roadmap clarity between Cody and Amp is still resolving.
- **Procurement cycle.** Enterprise-only means sales contact, contract, and annual commit. No quick trial for solo buyers.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity; unweighted average). Last verified 2026-04-17 against [Sourcegraph pricing](https://sourcegraph.com/pricing) and [the plan-change announcement](https://sourcegraph.com/blog/changes-to-cody-free-pro-and-enterprise-starter-plans).

## FAQ

**Can I still buy Cody Free or Pro?**
No. Sourcegraph retired both self-serve tiers on July 23, 2025. The only current product is Cody Enterprise at $59/user/month with annual contract ([plan changes notice](https://sourcegraph.com/blog/changes-to-cody-free-pro-and-enterprise-starter-plans)).

**What models does Cody support?**
Claude Opus 4.7, OpenAI frontier models, and Gemini 3.1 Pro on Enterprise tier. Admins can whitelist models, route through Azure OpenAI or AWS Bedrock, and enforce which models any given team can call.

**How does Cody differ from Amp?**
Cody is conversational AI plus autocomplete on top of the code graph. Amp is the agentic coding product: multi-step edits, shared team workflows, CLI-first. Amp is being spun out as a separate company under Quinn Slack and Beyang Liu while Cody stays with Sourcegraph.

**Can Cody be self-hosted?**
Yes. Enterprise deployments can run on-prem or in a customer-managed cloud, routing AI calls through an internal gateway. That satisfies data residency and model-control requirements other vendors do not meet.

**Is Cody worth $59 per seat against GitHub Copilot at $19?**
Only if cross-repo context pays for itself. Shops with 50+ repos and heavy internal-API surface area get real value from the code graph. Single-repo teams do not.

## Sources

- [Sourcegraph pricing](https://sourcegraph.com/pricing): current Enterprise tier and per-seat cost
- [Changes to Cody Free, Pro, and Enterprise Starter plans](https://sourcegraph.com/blog/changes-to-cody-free-pro-and-enterprise-starter-plans): July 23, 2025 retirement announcement
- [Sourcegraph changelog](https://sourcegraph.com/changelog): model availability and feature updates

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
- **Comparisons:** [Cody vs Cursor](/compare/cody-vs-cursor/), [Claude vs Cody](/compare/claude-vs-cody/)
