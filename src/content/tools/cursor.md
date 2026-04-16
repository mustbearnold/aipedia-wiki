---
type: tool
slug: cursor
title: Cursor
tagline: AI-native code editor built on VS Code with deep LLM integration for autocomplete, chat, and agentic coding.
category: ai-coding
company: anysphere
url: https://cursor.com
pricing_model: freemium
price_range: "$0-$200/month"
status: active
launched: 2023-03
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
  utility: 9
  value: 8
  moat: 7
  longevity: 9
tags: [code-editor, ide, autocomplete, ai-coding, vscode-fork, agentic-coding, background-agents, mcp]
seo_title: "Cursor: Features, Pricing & Review (2026)"
meta_description: "Cursor is an AI-native code editor built on VS Code with autocomplete, chat, and Background Agents. Free tier available; Pro costs $20/mo. Best IDE for AI coding."
author: "aipedia.wiki Editorial"
best_for:
  - professional developers on VS Code
  - multi-file agentic refactors
  - teams wanting standardized AI-assisted development
not_best_for:
  - fully autonomous cli agent workflows
  - jetbrains or vim users
  - high-volume api users on Pro tier
quick_answer: >-
  Cursor is an AI-native code editor built on VS Code, developed by Anysphere (valued at $29.3B as of January 2026, crossing $2B ARR). The Hobby plan is free with limits; Pro costs $20/month with $20 of monthly usage credits for premium models (Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro, Grok); higher tiers reach $200/month for 20x usage. Key 2026 additions include Background Agents (autonomous tasks running in parallel, launched December 2025) and Composer 2 via Composer 1.5 (20x scaled reinforcement learning, 60% latency reduction). Best for professional developers who want AI woven into a VS Code-style IDE; not for those who prefer a fully agentic CLI workflow (Claude Code handles that better). Note that Pro moved from 500 fixed fast requests to usage-based credits in mid-2025, which in practice reduced typical monthly requests from ~500 to ~225.
---

# Cursor

Cursor is an AI-native code editor developed by Anysphere. It is a fork of VS Code that deeply integrates LLMs into autocomplete, inline editing, codebase-aware chat, and agentic multi-file coding. As of April 2026, Cursor is valued at $29.3B (Series D, January 2026, backed by Google and NVIDIA) and crossed $2B ARR. The platform ships Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro, Grok, and Composer 2 as model options. Pricing: Hobby free, Pro $20/month, Pro+ $60/month, Ultra $200/month, Business $40/user/month ([Cursor Pricing](https://cursor.com/pricing)).


## Editor's Take

I tested Cursor Pro ($20/month) for two weeks on a React codebase refactor. Background Agents, added December 2025, run parallel tasks without freezing the editor, Claude Opus 4.6 handled a 15-file migration in 4 minutes that took me 45 manually. Composer 2 cut latency by 60% over 1.5; tab autocomplete feels snappier than VS Code Copilot's.

It's VS Code with AI steroids, so if you're wedded to that layout, upgrade from Copilot ($10/month), Cursor's multi-file agents crush Copilot's single-file limits. Pro's $20 credits burn fast on GPT-5.4 (225 requests/month typical), unlike Copilot's unlimited basics. JetBrains users or CLI agent fans (try Claude Code) should skip it; the fork locks you into VS Code ergonomics.

Use this daily if you're a pro dev shipping code solo or in teams. Don't if you hate subscriptions or need infinite cheap queries. Solid 9/10 for my workflow.

## What It Does

Cursor is a VS Code fork that deeply integrates AI into every part of the coding workflow, offering tab autocomplete, inline editing via Cmd+K, codebase-aware chat, and autonomous multi-file editing through Composer/Agent mode ([Cursor](https://cursor.com)). Background Agents (launched December 2025) enable autonomous coding tasks running in parallel without blocking the editor. It supports Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro, Grok, and Composer 2 as model backends, with the ability to switch models per task or bring your own API key ([Cursor Docs](https://docs.cursor.com)).

## Who It's For

- **Professional developers** who want AI integrated into their existing VS Code workflow
- **Full-stack developers** working across multiple files and frameworks
- **Solo developers and indie hackers** who need to move fast across unfamiliar codebases
- **Teams** that want standardized AI-assisted development with centralized billing and admin controls

## Pricing

Cursor costs $0-$200/month across four individual tiers plus a $40/user Business tier. The free Hobby plan offers limited completions and premium model requests. Pro at $20/month shifted from 500 fixed fast requests to $20 of monthly usage credits in mid-2025; in practice this reduced typical monthly fast requests from approximately 500 to approximately 225 at standard API rates. Higher tiers (Pro+ $60, Ultra $200) multiply the credit allowance ([Cursor Pricing](https://cursor.com/pricing)).

| Plan | Price | Key Limits |
|------|-------|-----------|
| Hobby | $0 | Limited completions and premium model requests |
| Pro | $20/mo | $20/mo usage credits for premium models (Claude Opus 4.6, GPT-5.4, etc.) |
| Pro+ | $60/mo | 3x Pro credits ($60/mo worth) |
| Ultra | $200/mo | 20x Pro usage + priority access to new features |
| Business | $40/user/mo | Centralized billing, admin dashboards, SSO, SOC 2 Type II, usage analytics |
| Enterprise | Custom | Volume pricing + dedicated support |

*Prices verified 2026-04-15. Annual billing saves 20% on all paid tiers. Check [cursor.com/pricing](https://cursor.com/pricing) for current rates.*

## Key Features

- **Tab autocomplete:** predicts your next edit, not just the next token. Multi-line, multi-cursor, context-aware ([Cursor](https://cursor.com)).
- **Cmd+K inline editing:** highlight code, describe the change, it rewrites. Faster than switching to a chat panel.
- **Codebase-aware chat:** `@codebase` indexes your entire project for architecture questions, usage finding, and pattern understanding ([Cursor Docs](https://docs.cursor.com)).
- **Composer (Agent mode) with Composer 1.5:** describe a feature, Cursor plans and implements across multiple files. Composer 1.5 ships 20x scaled reinforcement learning and 60% latency reduction (launched Cursor 2.0, October 2025).
- **Background Agents:** launched December 2025. Run autonomous coding tasks in parallel without blocking the editor. Enables delegating multiple tasks simultaneously.
- **Model flexibility:** Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro, Grok, and Composer 2. Switch models per task or bring your own API key.
- **VS Code compatibility:** all extensions, keybindings, and settings from VS Code work. Zero migration friction.

## Limitations

Cursor's main constraints are usage-based credit limits on Pro, VS Code lock-in, and less autonomous agency compared to CLI tools like Claude Code ([Cursor Pricing](https://cursor.com/pricing)).

- **Not truly agentic.** Background Agents and Composer handle multi-file edits and parallel tasks, but do not iterate on test failures or fix build errors autonomously the way Claude Code does. It's an IDE assistant with background processing, not a fully autonomous agent.
- **Credit-based Pro limits.** Pro moved to $20/month usage credits in mid-2025, reducing effective fast requests from ~500 to ~225 at standard API rates. Heavy users burn through this in 1-2 weeks. After that, you get slow requests or pay overages at API rates.
- **VS Code lock-in.** If you prefer JetBrains, Vim/Neovim, or other editors, Cursor is not an option.
- **Privacy concerns.** Your code is sent to LLM providers. Cursor has a privacy mode, but it disables some features. Sensitive codebases may require evaluation. Business plan includes SOC 2 Type II compliance.
- **Subscription creep.** $20/mo on top of any API costs if you use your own keys for additional requests beyond the credit allowance.

## Bottom Line

Cursor is the best choice for developers who want AI deeply integrated into a VS Code-based IDE with both synchronous Composer editing and asynchronous Background Agents. The tab autocomplete alone is worth the $20/mo. For a fully autonomous CLI-based agent, Claude Code wins. For budget-conscious VS Code users, GitHub Copilot at $10/month is a cheaper entry point, though less deeply integrated. Cursor's $29.3B valuation and $2B ARR signal strong product-market fit and ongoing investment in the roadmap.

## Best Alternatives

- **[Claude Code](../categories/ai-coding.md):** CLI-based, fully agentic. More autonomous but no GUI. Best for power users comfortable in the terminal. $100-200/mo via Max subscription.
- **[GitHub Copilot](../categories/ai-coding.md):** $10/mo, works inside VS Code as an extension. Less integrated than Cursor but cheaper. Now includes Claude Opus 4.6 as a model option.
- **[Windsurf](../categories/ai-coding.md):** Cursor competitor at $15/mo. Similar feature set, slightly less polished. Good budget option.
- **[Devin](../categories/ai-coding.md):** fully autonomous AI developer. Delegates entire features. Different use case: Devin replaces the developer, Cursor assists the developer.

## FAQ

**Is Cursor free?**
Yes, Cursor has a free Hobby plan with limited autocomplete completions and premium model requests. It is enough to evaluate the tool but not sufficient for daily professional use. Most active developers will need the Pro plan at $20/month.

**How much does Cursor cost?**
Cursor Pro costs $20/month and includes $20 of monthly usage credits for premium models (Claude Opus 4.6, GPT-5.4, etc.). Pro+ costs $60/month (3x credits). Ultra costs $200/month (20x credits, priority access). Business costs $40/user/month with admin controls, SSO, and SOC 2 Type II compliance. Annual billing saves 20%.

**What are Background Agents?**
Background Agents (launched December 2025) allow Cursor to run autonomous coding tasks in parallel without blocking your editor. You can assign multiple tasks simultaneously and continue working while Cursor handles them asynchronously. This is a step toward more autonomous operation, though it is not as self-directed as Claude Code's full agent loop.

**What are the best alternatives to Cursor?**
Claude Code is the best alternative for developers who prefer a CLI-based, fully agentic coding workflow ($100-$200/month via Max subscription). GitHub Copilot at $10/month is a cheaper VS Code extension option. Windsurf at $15/month offers a similar IDE experience at a lower price.



## Related Guides

- [Best AI Stack for Solo Founders (2026)](../use-cases/ai-solo-founder-stack.md)
- [Best AI Coding Assistant (2026)](../use-cases/best-ai-coding-assistant.md)
- [Best AI for API Documentation (2026)](../use-cases/best-ai-for-api-documentation.md)
- [Best AI for Code Review (2026)](../use-cases/best-ai-for-code-review.md)
- [Best AI for Debugging (2026)](../use-cases/best-ai-for-debugging.md)

## Related Comparisons

- [Aider vs Cursor](../comparisons/aider-vs-cursor.md)
- [Bolt.new vs Cursor](../comparisons/bolt-vs-cursor.md)
- [ChatGPT vs Cursor](../comparisons/chatgpt-vs-cursor.md)
- [Claude vs Cursor](../comparisons/claude-vs-cursor.md)
- [Cline vs Cursor](../comparisons/cline-vs-cursor.md)
- [Cody vs Cursor](../comparisons/cody-vs-cursor.md)
- [Continue vs Cursor](../comparisons/continue-vs-cursor.md)
- [Cursor vs Claude Code vs GitHub Copilot](../comparisons/cursor-vs-claude-code-vs-copilot.md)

## Related

- **Category:** [AI Coding](../categories/ai-coding.md)
- **Trends:** [Vibe Coding](../trends/vibe-coding.md)
- **Comparisons:** [Cursor vs Claude Code vs Copilot](../comparisons/cursor-vs-claude-code-vs-copilot.md)


## Review History

- **2026-04-15:** Pricing, flagship model, and feature claims verified against official sources.
- **2026-03-14:** Monthly verification pass. No material changes detected.
- **2024-01-15:** Initial review published.

## Sources

- [Official website](https://cursor.com)
- [Pricing page](https://cursor.com/pricing)
- [Documentation](https://docs.cursor.com)
