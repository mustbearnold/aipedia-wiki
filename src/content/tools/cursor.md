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
last_updated: 2026-04-13
last_verified: 2026-04-13
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
tags: [code-editor, ide, autocomplete, ai-coding, vscode-fork, agentic-coding]
seo_title: "Cursor: Features, Pricing & Review (2026)"
meta_description: "Cursor is an AI-native code editor built on VS Code with autocomplete, chat, and agent mode. Free tier available; Pro costs $20/mo. Best IDE for AI coding."
author: "aipedia.wiki Editorial"
quick_answer: >-
  Cursor is an AI-native code editor built on VS Code, developed by Anysphere and launched in March 2023. Its tab autocomplete predicts multi-line edits rather than just the next token, and Composer (agent mode) handles multi-file refactors from a single description, making it more deeply integrated than GitHub Copilot at $10/month. The Hobby plan is free with limits; Pro costs $20/month with 500 fast premium model requests included; higher tiers reach $200/month for 20x usage. Best for professional developers who want AI woven into a VS Code-style IDE, not for those who prefer a fully agentic CLI workflow (Claude Code handles that better). Heavy users exhaust the 500 monthly fast requests in one to two weeks.
---

# Cursor

Cursor is an AI-native code editor developed by Anysphere. It is a fork of VS Code that deeply integrates LLMs into autocomplete, inline editing, codebase-aware chat, and agentic multi-file coding. It is primarily used for professional software development with AI assistance. Cursor supports Claude, GPT-4o, and other models as backends. As of April 2026, pricing is: Hobby free, Pro $20/month, Pro+ $60/month (3x usage credits), Ultra $200/month (20x usage credits), and Teams $40/user/month. Compared to GitHub Copilot at $10/month, Cursor is more deeply integrated but costs twice as much at the entry tier.

## What It Does

Cursor is a VS Code fork that deeply integrates AI into every part of the coding workflow, offering tab autocomplete, inline editing via Cmd+K, codebase-aware chat, and autonomous multi-file editing through Composer agent mode ([Cursor](https://cursor.com)). It supports Claude, GPT-4o, and other models as backends, with the ability to switch models per task or bring your own API key ([Cursor Docs](https://docs.cursor.com)).

## Who It's For

- **Professional developers** who want AI integrated into their existing VS Code workflow
- **Full-stack developers** working across multiple files and frameworks
- **Solo developers/indie hackers** who need to move fast across unfamiliar codebases
- **Teams** that want standardized AI-assisted development

## Pricing

Cursor costs $0-$200/month across five individual tiers plus a $40/user Teams tier. The free Hobby plan offers limited agent requests and tab completions, Pro at $20/month provides unlimited tab completions plus $20 of monthly usage credits for premium models, and higher tiers (Pro+ $60, Ultra $200) multiply the credit allowance ([Cursor Pricing](https://cursor.com/pricing)).

| Plan | Price | Key Limits |
|------|-------|-----------|
| Hobby | $0 | Limited agent requests, limited tab completions |
| Pro | $20/mo | Unlimited tab completions + $20/mo usage credits for premium models |
| Pro+ | $60/mo | 3x Pro credits ($60/mo worth) |
| Ultra | $200/mo | 20x Pro usage + priority access to new features |
| Teams | $40/user/mo | Shared chats, centralized billing, RBAC, SSO |
| Enterprise | Custom | Volume pricing + dedicated support |

*Prices verified 2026-04-14. Annual billing saves 20% on all paid tiers. Check [cursor.com/pricing](https://cursor.com/pricing) for current rates.*

## Key Features

- **Tab autocomplete:** predicts your next edit, not just the next token. Multi-line, multi-cursor, context-aware ([Cursor](https://cursor.com)).
- **Cmd+K inline editing:** highlight code, describe the change, it rewrites. Faster than switching to a chat panel.
- **Codebase-aware chat:** `@codebase` indexes your entire project for architecture questions, usage finding, and pattern understanding ([Cursor Docs](https://docs.cursor.com)).
- **Composer (Agent mode):** describe a feature, Cursor plans and implements across multiple files. Review and accept changes.
- **Model flexibility:** use Claude Opus/Sonnet, GPT-4o, or bring your own API key. Switch models per task.
- **VS Code compatibility:** all extensions, keybindings, and settings from VS Code work. Zero migration friction.

## Limitations

Cursor's main constraints are request limits on Pro (500 fast premium requests/month), VS Code lock-in, and less autonomous agency compared to CLI tools like Claude Code ([Cursor Pricing](https://cursor.com/pricing)).

- **Not truly agentic.** Composer handles multi-file edits but doesn't run commands, fix build errors, or iterate on test failures the way Claude Code does. It's an assistant, not an autonomous agent.
- **Request limits on Pro.** 500 fast premium requests/month. Heavy users burn through this in 1-2 weeks. After that, you get slow requests (10-30 second waits).
- **VS Code lock-in.** If you prefer JetBrains, Vim/Neovim, or other editors, Cursor isn't an option.
- **Privacy concerns.** Your code is sent to LLM providers. Cursor has a privacy mode, but it disables some features. Sensitive codebases may need evaluation.
- **Subscription creep.** $20/mo on top of any API costs if you use your own keys for additional requests.

## Bottom Line

Cursor is the best choice for developers who want AI deeply integrated into a VS Code-based IDE, but Claude Code wins if you prefer a CLI-based fully agentic workflow. The tab autocomplete alone is worth the $20/mo. Composer is useful for scaffolding and refactoring but isn't as autonomous as Claude Code. If you want the best IDE experience with AI built in, Cursor wins.

## Best Alternatives

- **[Claude Code](../categories/ai-coding.md):** CLI-based, fully agentic. More powerful but no GUI. Best for power users comfortable in the terminal. $100-200/mo via Max subscription.
- **[GitHub Copilot](../categories/ai-coding.md):** $10/mo, works inside VS Code as an extension. Less integrated than Cursor but cheaper. Now includes Claude Opus 4.6.
- **[Windsurf](../categories/ai-coding.md):** Cursor competitor at $15/mo. Similar feature set, slightly less polished. Good budget option.
- **[Devin](../categories/ai-coding.md):** fully autonomous AI developer. Delegates entire features. Different use case: Devin replaces the developer, Cursor assists the developer.

## FAQ

**Is Cursor free?**
Yes, Cursor has a free Hobby plan that includes 2,000 autocomplete suggestions and 50 slow premium model requests per month. It is enough to evaluate the tool but not sufficient for daily professional use. Most active developers will need the Pro plan.

**How much does Cursor cost?**
Cursor Pro costs $20/month and includes unlimited autocomplete plus 500 fast premium requests per month. Cursor Business costs $40/month per seat and adds admin controls, SAML SSO, and centralized billing.

**What are the best alternatives to Cursor?**
Claude Code is the best alternative for developers who prefer a CLI-based, fully agentic coding workflow ($100-$200/month via Max subscription). GitHub Copilot at $10/month is a cheaper VS Code extension option. Windsurf at $15/month offers a similar IDE experience at a lower price.

## Related

- **Category:** [AI Coding](../categories/ai-coding.md)
- **Trends:** [Vibe Coding](../trends/vibe-coding.md)
- **Comparisons:** [Cursor vs Claude Code vs Copilot](../comparisons/cursor-vs-claude-code-vs-copilot.md)

## Sources

- [Official website](https://cursor.com)
- [Pricing page](https://cursor.com/pricing)
- [Documentation](https://docs.cursor.com)
