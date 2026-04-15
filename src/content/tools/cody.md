---
type: tool
slug: cody
title: Cody
tagline: Codebase-aware AI coding assistant by Sourcegraph with deep code search and enterprise access control.
category: ai-coding
company: sourcegraph
url: https://sourcegraph.com/cody
pricing_model: freemium
price_range: "$0-$9/month"
status: active
launched: 2023-07
last_updated: 2026-04-14
last_verified: 2026-04-14
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 7
  value: 8
  moat: 6
  longevity: 7
tags: [codebase-search, ai-coding, enterprise, sourcegraph, ide-plugin, vscode, jetbrains]
seo_title: "Cody by Sourcegraph: AI Coding Assistant Review & Pricing (2026)"
meta_description: "Cody by Sourcegraph is a codebase-aware AI coding assistant. Free on Sourcegraph.com; Pro $9/mo; Enterprise custom. In-depth review and pricing 2026."
author: "aipedia.wiki Editorial"
quick_answer: >-
  Cody is an AI coding assistant developed by Sourcegraph, built on top of Sourcegraph's code search infrastructure, enabling it to reason across entire organizations with hundreds of repositories rather than just open files. The free tier is hosted on Sourcegraph.com with limited completions; Pro is $9/month with higher limits and broader model selection including Claude Opus 4.6 and GPT-5.4. Best for enterprise teams already using Sourcegraph where cross-repository AI context is a genuine daily need; for individual developers or teams without Sourcegraph, GitHub Copilot at $10/month offers comparable or stronger general coding capability at nearly the same price.
---

# Cody

Cody is an AI coding assistant developed by Sourcegraph, the company behind the widely used code search and intelligence platform. Where GitHub Copilot and Cursor rely on embedding-based retrieval of your local project, Cody is built on top of Sourcegraph's code search infrastructure — meaning it can reach across entire organizations with hundreds of repositories, understanding how code is used company-wide rather than just in the file you have open. This makes Cody the most capable option for large enterprise codebases where understanding cross-repository dependencies, internal APIs, and org-wide conventions matters. For individual developers, the free tier at Sourcegraph.com provides competitive chat and autocomplete at no cost, with a Pro plan at $9/month.

## What It Does

Cody integrates as an extension into VS Code and JetBrains and connects to Sourcegraph's code intelligence backend. Autocomplete provides inline suggestions as you type. The chat panel answers questions about your code using context drawn from the current file, open tabs, and (with Sourcegraph Enterprise) your entire codebase across repos. The `@-mention` system lets you pull specific files, symbols, or search results into context explicitly. Cody supports multiple model backends -- including Claude Opus 4.6 and GPT-5.4 -- and allows organizations to configure which models their teams can access. Commands provide one-click actions for common tasks: explain code, generate unit tests, document functions, or fix bugs.

## Who It's For

- **Enterprise teams with large, multi-repo codebases** who need AI that understands cross-repository relationships
- **Teams already using Sourcegraph** for code search who want AI layered on top of existing code intelligence
- **Developers who value codebase context over agent mode** — Cody shines at "how does X work across our repos?" more than autonomous multi-file edits
- **Organizations with security requirements** around which AI models can access code
- **Individual developers** who want a free, capable coding assistant without switching IDEs
- **Teams evaluating AI coding tools at enterprise scale** who need admin controls and audit logs

## Pricing

| Plan | Price | Key Limits |
|------|-------|-----------|
| Free | $0/mo | Sourcegraph.com hosted, limited completions and chats |
| Pro | $9/mo | Higher limits, more model choices, faster responses |
| Enterprise | Custom | Self-hosted or cloud, full Sourcegraph code intelligence, SSO, audit |

> **Verification note:** Pricing confirmed at [sourcegraph.com/pricing](https://sourcegraph.com/pricing) as of 2026-04-14.

## Key Features

- **Sourcegraph code intelligence backend:** understands symbols, definitions, and usages across your entire codebase and across repositories
- **Multi-repo context:** Enterprise tier can answer questions using code from hundreds of repos simultaneously
- **@-mention context system:** explicitly pull specific files, repos, symbols, or search results into your conversation
- **Multi-model support:** choose from Claude Opus 4.6, GPT-5.4, and other models; Enterprise can restrict which models teams use
- **Commands:** one-click prompts for explain, test, document, fix — built-in workflows for common tasks
- **VS Code and JetBrains support:** installs as a plugin into your existing IDE

## Limitations

- **Agent mode is limited.** Cody excels at answering questions and generating code within a context, but autonomous multi-file editing (like Cursor's Composer) is less developed.
- **Free tier limits are vague.** Sourcegraph doesn't publish exact completion or chat counts for the free plan, which makes it harder to evaluate.
- **Enterprise value depends on Sourcegraph.** If your organization doesn't use Sourcegraph for code search, Cody's biggest differentiator (cross-repo intelligence) isn't available.
- **Smaller community than Copilot.** Fewer users means less community content, troubleshooting, and integrations.
- **Pro tier at $9/mo is competitive but not standout.** At this price, GitHub Copilot at $10/mo offers comparable or better general coding capability.

## Bottom Line

Cody earns a strong value score (8/10) and above-average utility (7/10), with a moat that depends heavily on Sourcegraph's enterprise distribution (6/10). For individual developers, the free tier is genuinely competitive and the Pro plan at $9/mo is priced attractively. Where Cody truly differentiates is enterprise deployments with Sourcegraph code intelligence — multi-repo AI context is a real capability gap over Copilot and Cursor. For non-Sourcegraph teams, GitHub Copilot is the stronger general choice.

## Best Alternatives

| Tool | Price | Key Difference |
|------|-------|----------------|
| [GitHub Copilot](github-copilot.md) | $10/mo | More capable autocomplete and agent mode, GitHub ecosystem |
| [Cursor](cursor.md) | $20/mo | Full AI-native IDE, better agent mode, no cross-repo context |
| [Tabnine](tabnine.md) | $12/mo | Privacy-first, on-device execution, no codebase intelligence |
| [Continue](continue.md) | Free | Open-source, BYOK, no proprietary code intelligence |

## FAQ

**How is Cody different from GitHub Copilot?**
Cody's key differentiator is Sourcegraph's code intelligence backend, which enables cross-repository context at enterprise scale. Copilot is more capable on general coding tasks and has a larger model selection. For large enterprise codebases, Cody's multi-repo awareness is a real advantage. For individual developers, Copilot is the better tool.

**Can Cody be self-hosted?**
Yes. Cody Enterprise supports self-hosted deployment via Sourcegraph's on-premises or customer-managed cloud options. This allows organizations with strict data residency requirements to keep code on their own infrastructure.

**Does Cody work with local models?**
On the free and Pro tiers, Cody connects to Sourcegraph.com's hosted models. Enterprise deployments can configure connections to Azure OpenAI, AWS Bedrock, or other enterprise AI gateways, giving organizations control over which models handle their code.

## Sources

- [Official website](https://sourcegraph.com/cody) — verified 2026-04-14
- [Sourcegraph pricing page](https://sourcegraph.com/pricing) — verified 2026-04-14
- [Cody documentation](https://sourcegraph.com/docs/cody) — verified 2026-04-14
