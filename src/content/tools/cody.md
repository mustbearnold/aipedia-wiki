---
type: tool
slug: cody
title: Cody
tagline: Sourcegraph's enterprise code intelligence plus AI, now sold inside Sourcegraph Enterprise after the July 2025 self-serve sunset.
category: ai-coding
company: sourcegraph
url: https://sourcegraph.com/cody
pricing_model: enterprise
price_range: "Enterprise starts at $16K"
status: active
launched: 2023-07
last_updated: 2026-05-10
last_verified: 2026-05-10
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
    verified_at: 2026-05-10
    next_review_at: 2026-06-10
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Sourcegraph's current pricing page frames Enterprise as starting at $16K with included AI-feature credits; Cody Free and Pro were sunset, so teams should expect sales-led packaging."
    source: "https://sourcegraph.com/pricing"
    source_label: "Sourcegraph pricing"
    source_id: cody-pricing
    verified_at: 2026-05-10
    next_review_at: 2026-06-10
    volatility: high
    confidence: high
  best_for:
    value: "Large engineering organizations that already value Sourcegraph code search/code intelligence and want AI assistance tied to enterprise code context."
    source: "https://sourcegraph.com/docs/cody"
    source_label: "Sourcegraph Cody docs"
    source_id: cody-docs
    verified_at: 2026-05-10
    next_review_at: 2026-06-10
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Not the default pick for individual developers after the self-serve shift; compare Cursor, Copilot, Cline, and Aider for lower-friction adoption."
    source: "https://sourcegraph.com/pricing"
    source_label: "Sourcegraph pricing"
    source_id: cody-pricing
    verified_at: 2026-05-10
    next_review_at: 2026-06-10
    volatility: high
    confidence: high
tags: [codebase-search, ai-coding, enterprise, sourcegraph, ide-plugin, vscode, jetbrains]
seo_title: "Cody by Sourcegraph: Features, Pricing & Review (May 2026)"
meta_description: "Cody is Sourcegraph's Enterprise AI coding assistant. Free and Pro ended in July 2025; Sourcegraph Enterprise now starts at $16K with AI-feature credits. Verified May 2026."
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
  Cody is Sourcegraph's code intelligence plus AI layer. Free and Pro were retired on July 23, 2025. Sourcegraph Enterprise now starts at $16K with AI-feature credits, cross-repo context, and model controls. Pick it if Sourcegraph already runs; skip it for solo or small-team work.
price_history:
  - date: 2025-07-23
    plan: "Free and Pro"
    price: "discontinued"
    source: "https://sourcegraph.com/pricing"
    source_label: "Sourcegraph pricing"
    source_id: cody-pricing
    note: "Self-serve tiers retired. Enterprise is the only path forward."
  - date: 2026-04-15
    plan: "Enterprise"
    price: "$59/user/mo"
    source: "https://sourcegraph.com/pricing"
    source_label: "Sourcegraph pricing"
    source_id: cody-pricing
    note: "Historical public per-user pricing snapshot before the current Enterprise pricing page changed presentation."
  - date: 2026-05-10
    plan: "Sourcegraph Enterprise"
    price: "Starts at $16K"
    source: "https://sourcegraph.com/pricing"
    source_label: "Sourcegraph pricing"
    source_id: cody-pricing
    note: "Current Sourcegraph pricing page says Enterprise starts at $16K and includes credits for AI features."
---

# Cody

Sourcegraph's AI coding assistant. Built on top of Sourcegraph's code graph, which indexes symbols, definitions, and usages across every repo in an org. That single architectural choice is what separates Cody from editor-local tools like [GitHub Copilot](/tools/github-copilot/) and [Cursor](/tools/cursor/).

Self-serve is gone. Free and Pro shut down July 23, 2025. Sourcegraph Enterprise is the current public path, now framed as a platform sale starting at $16K with included AI-feature credits.

## System Verdict

> **Pick Cody if Sourcegraph already runs inside the org and cross-repo context is a daily need.** Cody's moat is Sourcegraph's indexed code context across local and remote codebases. Model controls, SSO, audit logs, self-hosted options, and Sourcegraph Model Provider support clear enterprise procurement without friction.
>
> **Skip it otherwise.** No self-serve tier exists. [GitHub Copilot](/tools/github-copilot/) at $10/user/month covers most shops. [Cursor](/tools/cursor/) wins on agent mode. [Cline](/tools/cline/) and [Continue](/tools/continue/) cover BYOK workflows at zero.
>
> **Who pays:** Enterprise engineering orgs with many repos, Sourcegraph buying intent, and compliance requirements other coding tools do not meet.

## Key Facts

| | |
|---|---|
| **Product status** | Sourcegraph Enterprise only as of July 23, 2025 |
| **Pricing** | Sourcegraph Enterprise starts at $16K with AI-feature credits |
| **Models** | Sourcegraph Model Provider, third-party LLM providers, model filters, model overrides, admin-configurable |
| **Core moat** | Sourcegraph code graph: cross-repo symbol + usage context |
| **Editor support** | VS Code, JetBrains, Visual Studio, CLI |
| **Deployment** | Sourcegraph Cloud or self-hosted |
| **Compliance** | Enterprise admin controls, model configuration, Sourcegraph Cloud or self-hosted deployment |
| **Sibling product** | Amp is the agentic workflow path for former Free/Pro Cody users |

Every data point above was verified against vendor sources on 2026-05-10. See Sources.

## What it actually is

One enterprise product: AI chat, autocomplete, and code actions layered on top of Sourcegraph's existing code intelligence backend. The code graph is the differentiator. Cody reads symbol definitions and usages across hundreds of repos, then feeds that context into the chosen model.

Model choice is admin-configurable. Sourcegraph's model configuration docs cover Sourcegraph-provided models, provider overrides, model overrides, self-hosted models, default models, and model filters. Sourcegraph Model Provider, also called Cody Gateway, gives Enterprise customers zero-configuration access to models from providers including Anthropic and OpenAI, while self-hosted deployments can use third-party LLM providers.

Amp is the agentic coding path Sourcegraph pointed former Cody Free and Pro users toward during the July 2025 transition. Cody stays as the Sourcegraph Enterprise code-intelligence assistant.

## When to pick Cody

- **Sourcegraph Enterprise already covers the org.** The code graph is the moat. Use Cody to unlock AI on top of it.
- **AI needs to reason across 50+ repos.** Cross-repo context is the one capability Copilot and Cursor cannot reproduce.
- **Compliance gates require model controls or self-hosting.** Enterprise setup supports Sourcegraph Cloud or self-hosted Sourcegraph, provider configuration, model filters, and admin controls.
- **Internal APIs and org-wide conventions matter.** Cody traces usage of internal packages across the codebase without manual `@`-mentions.
- **Procurement wants one vendor for search + AI.** Sourcegraph's Enterprise platform bundles code search, Deep Search, MCP/API/CLI access, and AI-feature credits.

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
| Sourcegraph Enterprise | Starts at $16K | Code graph, cross-repo context, Deep Search, Cody, MCP/API/CLI access, AI-feature credits, admin controls, single-tenant cloud, self-hosted option |

*Pricing verified 2026-05-10 via [Sourcegraph pricing](https://sourcegraph.com/pricing) and the [Cody plan changes notice](https://sourcegraph.com/blog/changes-to-cody-free-pro-and-enterprise-starter-plans). Free and Pro were retired on July 23, 2025. Expect a sales-led enterprise contract, not a self-serve seat checkout.*

## Against the alternatives

| | Cody Enterprise | GitHub Copilot Business | Cursor Business |
|---|---|---|---|
| **Price** | Enterprise starts at $16K | $19/user/mo | $40/user/mo |
| **Cross-repo context** | **Strongest (code graph)** | File + workspace | File + workspace |
| **Agent mode** | Limited (see Amp) | Workspace agent | Composer (strongest) |
| **Model choice** | Admin-configurable, model filters/overrides | GitHub-curated | Multi-model |
| **Self-hosted option** | Yes | No | No |
| **Audit logs + SSO** | Yes | Yes | Yes |
| **Best viewed as** | Code intelligence + AI | Default IDE autocomplete | AI-native IDE |

## Failure modes

- **No self-serve tier.** Free and Pro closed July 23, 2025. Individual developers cannot buy Cody.
- **Value depends on Sourcegraph.** Shops without existing Sourcegraph deployments pay for a code graph they do not already use.
- **Agent mode lags.** Autonomous multi-file edits sit inside Amp, a separate product. Cody itself stays conversational.
- **Price gap vs Copilot.** Sourcegraph Enterprise starts at $16K, while Copilot Business is $19/user/month. The code graph and platform features must justify that gap.
- **Amp split in buyer intent.** Sourcegraph points former Cody Free/Pro users toward Amp for agentic workflows, while Cody remains enterprise code intelligence. Buyers must know which job they need.
- **Procurement cycle.** Enterprise-only means sales contact, contract, and platform evaluation. No quick trial for solo buyers.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity; unweighted average). Last verified 2026-05-10 against [Sourcegraph pricing](https://sourcegraph.com/pricing), [Sourcegraph Cody docs](https://sourcegraph.com/docs/cody), [Sourcegraph Model Provider docs](https://sourcegraph.com/docs/model-provider), and [the plan-change announcement](https://sourcegraph.com/blog/changes-to-cody-free-pro-and-enterprise-starter-plans).

## FAQ

**Can I still buy Cody Free or Pro?**
No. Sourcegraph retired both self-serve tiers on July 23, 2025. The current public path is Sourcegraph Enterprise, which the pricing page now frames as starting at $16K with included AI-feature credits ([plan changes notice](https://sourcegraph.com/blog/changes-to-cody-free-pro-and-enterprise-starter-plans)).

**What models does Cody support?**
Cody Enterprise can use Sourcegraph Model Provider/Cody Gateway or configured third-party LLM providers. Admins can set default models, provider overrides, model overrides, self-hosted models, and model filters.

**How does Cody differ from Amp?**
Cody is AI chat, completions, edits, prompts, and context on top of Sourcegraph. Amp is the agentic workflow path Sourcegraph introduced for former Cody Free and Pro users.

**Can Cody be self-hosted?**
Yes. Sourcegraph docs describe Cody setup on Sourcegraph Cloud and self-hosted Sourcegraph Enterprise. Self-hosted customers can configure Sourcegraph Model Provider or third-party LLM providers.

**Is Cody worth Sourcegraph Enterprise spend against GitHub Copilot at $19/user/month?**
Only if cross-repo context and Sourcegraph's platform features pay for themselves. Shops with many repos and heavy internal-API surface area get real value from the code graph. Single-repo teams do not.

## Sources

- [Sourcegraph pricing](https://sourcegraph.com/pricing): current Enterprise plan starting price and AI-credit packaging
- [Changes to Cody Free, Pro, and Enterprise Starter plans](https://sourcegraph.com/blog/changes-to-cody-free-pro-and-enterprise-starter-plans): July 23, 2025 retirement announcement
- [Sourcegraph Cody docs](https://sourcegraph.com/docs/cody): supported surfaces and Cody feature scope
- [Sourcegraph Model Provider docs](https://sourcegraph.com/docs/model-provider): Cody Gateway, model-provider access, rate limits, privacy, and security
- [Sourcegraph model configuration docs](https://sourcegraph.com/docs/cody/enterprise/model-configuration): Enterprise model filters and provider/model overrides

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
- **Comparisons:** [Cody vs Cursor](/compare/cody-vs-cursor/), [Claude vs Cody](/compare/claude-vs-cody/)
