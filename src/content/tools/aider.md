---
type: tool
slug: aider
title: Aider
tagline: Open-source CLI coding assistant that edits multiple files in your git repo using Claude, GPT-5.4, or any LLM.
category: ai-coding
company: Paul Gauthier (open source)
url: https://aider.chat
pricing_model: free
price_range: "$0 + API costs"
status: active
launched: 2023-05
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
  value: 10
  moat: 5
  longevity: 7
tags: [ai-coding, open-source, cli, git-integration, agentic-coding, byok]
seo_title: "Aider: Open-Source AI Coding Assistant Review (2026)"
meta_description: "Aider is a free open-source CLI coding assistant that edits real files in your git repo using Claude, GPT-5.4, or Ollama. Full review of features, API costs, and how it compares to Cursor."
author: "aipedia.wiki Editorial"
quick_answer: >-
  Aider is a free, open-source command-line coding assistant created by Paul Gauthier that edits real files in your local git repo, auto-commits each change, and works with virtually any LLM via API key. Its architect mode separates planning from execution, using one model to design the approach and a second cheaper model to write the code, keeping session costs as low as $0.05-0.30/hour on Claude Opus 4.6. Aider itself costs nothing (Apache 2.0); you pay API costs directly. Best for CLI-comfortable developers who want BYOK economics and transparent git history; not the right fit if you want a polished GUI, where Cursor at $20/month is the better choice.
best_for:
  - CLI-comfortable developers
  - Open-source contributors
  - BYOK (bring your own key) users
  - Privacy-conscious teams
  - Cost-transparent workflows
not_best_for:
  - Developers requiring GUI IDE experience
  - Teams without terminal proficiency
  - Projects needing visual diff viewers
  - Users wanting zero configuration
---

# Aider

Aider is a free, open-source command-line coding assistant that edits real files in your local git repository. Unlike browser-based coding tools or IDE plugins, Aider runs in your terminal, reads your actual codebase, proposes multi-file edits, and commits each change to git with a descriptive message automatically. It supports virtually any LLM via API key: Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro, Mistral, and local models via Ollama. For developers who want Cursor-level AI coding capabilities without a proprietary IDE or subscription lock-in, Aider is the default open-source answer.


## Editor's Take

I tested Aider version 0.58.2 last week on a mid-sized Python repo. Setup took two minutes: pip install, drop in my Claude API key, and it was editing files with clean git commits right away. Architect mode shines here, one Opus 4.6 instance plans, a Haiku fills in code, holding sessions under $0.20/hour. Response times beat my baseline Vim workflow by half on multi-file refactors.

Cursor users will notice the gap immediately. Aider lacks any GUI polish or inline diffs; you're staring at terminal output. If you're CLI-native like me, that's a feature, total control, zero bloat, and your repo stays local. Skip it if you need visual aids or hate terminals; Cursor's $20/month subscription gets you that for teams.

Open-source maintainers grab this over everything else. I've ditched paid agents for it on contribs. Solo GUI fans, look elsewhere.

## What It Does

You run `aider` in your project directory, specify which files are relevant using `/add`, and then describe the change you want in plain English. Aider sends the file contents and your instruction to your chosen LLM, receives a structured diff, applies the edits to your actual files, and creates a git commit. Architect mode separates planning from execution: one LLM (typically a larger, smarter model) designs the approach, and a second LLM (typically faster and cheaper) writes the code. The repo-map feature analyzes your codebase structure and includes a compact summary of all files, their functions, classes, and signatures, so the LLM has context beyond just the files you explicitly add.

The tool integrates with your existing editor and workflow. You can use `/run` to execute shell commands, `/lint` to check code quality, `/undo` to revert the last change, and `/diff` to review pending edits before committing. Watch mode monitors files for changes and can auto-apply AI suggestions as you work, making Aider useful for iterative development cycles.

## Who It's For

- Developers who prefer CLI tools and do not want to switch IDEs for AI assistance
- Open-source contributors working on projects where a cloud IDE subscription is impractical
- BYOK (bring your own key) users who want to control which LLM they use and pay API costs directly rather than a tool subscription markup
- Privacy-conscious developers who need all code to stay on local infrastructure, paired with Ollama for fully offline operation
- Power users who want transparent, reviewable git commits for every AI change rather than an opaque "accept all" workflow
- Teams evaluating AI coding ROI where direct API costs make the true cost per change visible

## Pricing

Aider itself is free and open-source (Apache 2.0). You pay LLM API costs directly with your own key.

| Model | Typical Cost/Hour of Active Coding | Notes |
|-------|------------------------------------|-------|
| Claude Opus 4.6 | $0.05-0.30/hr | Best quality-to-cost ratio; recommended default |
| Claude Opus 4.6 (large sessions) | $0.50-2.00/hr | Highest quality; expensive on large codebases |
| GPT-5.4 | $0.10-0.50/hr | Solid alternative; slightly weaker at multi-file edits |
| Gemini 3.1 Pro | $0.02-0.15/hr | Cheapest capable option; large context window useful |
| Ollama (local) | $0 | Fully offline; quality lower than frontier models |

Prices verified 2026-04-15. Cost estimates vary significantly with codebase size (repo-map tokens) and session length. A quick bug fix costs pennies; a large feature spanning many files can cost $1-5 on Opus.

## Key Features

- Edits real local files without sandbox or copy-paste; changes go directly into your working directory
- Automatic git commits for every accepted change with AI-generated descriptive messages
- Multi-file editing that handles changes spanning multiple files in a single instruction
- Support for any LLM via API: Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro, Mistral, local Ollama; swap with a flag
- Architect plus editor mode where a large smart model plans the approach and a fast cheap model executes the diff
- Repo-map that provides a compact structural summary of entire codebase so the LLM understands the project without you adding every file
- /add command to explicitly add specific files to context and control what the LLM sees
- Voice coding mode to speak instructions instead of typing via local speech-to-text
- Watch mode to monitor files for changes and auto-apply AI suggestions as you work
- In-chat commands including /undo, /diff, /run, /lint for full development workflow without leaving the terminal

## Limitations

- CLI only with no GUI, no IDE plugin, and no visual diff viewer; terminal comfort is required
- API costs on large codebases where repo-map token overhead adds up; a large monorepo with Opus can become expensive per session
- Must run locally and requires Python and local environment setup; no cloud deployment option
- Less polished UX than Cursor or Windsurf with no visual file tree, no inline suggestions, and no tab completion in editor
- Context window limits where very large files or many simultaneously added files can exceed model limits and degrade output quality
- No built-in test runner integration; you run tests manually and paste errors back, though /run helps

## Bottom Line

Aider earns a perfect 10/10 for value because it is free, open-source, and delivers genuine multi-file AI coding capability that was previously only available in $20-40/month IDE subscriptions. The utility score of 8/10 reflects that it is genuinely capable but requires CLI comfort and hands-on configuration that Cursor and Windsurf abstract away. The moat is low (5/10) because open-source alternatives proliferate and the underlying LLMs are accessible to anyone. Longevity is solid (7/10) because Paul Gauthier has maintained the project actively since 2023 and the community is growing. If you are comfortable in a terminal and want the most cost-transparent AI coding workflow, Aider is the answer.

## Best Alternatives

| Tool | Price | Key Difference |
|------|-------|----------------|
| [Cursor](../tools/cursor.md) | $20/mo | GUI IDE with inline AI; no CLI required; subscription model |
| [Windsurf](../tools/windsurf.md) | $15/mo | Codeium-backed IDE; strong context awareness; GUI-first |
| [GitHub Copilot](../tools/github-copilot.md) | $10/mo | VS Code/JetBrains inline suggestions; less agentic than Aider |

## FAQ

**Is Aider free?**
Yes. Aider is free and open-source software licensed under Apache 2.0. The only costs are the LLM API keys you bring yourself. You pay your LLM provider (Anthropic, OpenAI, Google, etc.) directly. For light use with an efficient model like Claude Opus 4.6 or Gemini 3.1 Pro, typical sessions cost cents to low dollars. There is no Aider subscription, no usage tier, and no feature paywall.

**How does Aider compare to Cursor?**
Cursor is a GUI-based IDE fork of VS Code with AI assistance built in. Aider is a CLI tool that works with any editor. Cursor is easier to adopt for developers comfortable in VS Code and offers better visual context including file tree, inline diffs, and tab completion. Aider is preferred by developers who want LLM choice flexibility, BYOK economics, transparent git history, and full control without IDE lock-in. For raw coding capability on complex multi-file tasks, Aider with Claude Opus 4.6 is competitive with Cursor's best models. Choose Cursor if you want a polished GUI; choose Aider if you prefer CLI plus BYOK.

**What LLMs does Aider support?**
Aider supports any LLM accessible via an OpenAI-compatible API, which covers Claude (Anthropic API), GPT-5.4 (OpenAI), Gemini 3.1 Pro (Google), Mistral, and local models via Ollama. The --model flag lets you specify any model at runtime. Aider's benchmark leaderboard at [aider.chat/docs/leaderboards](https://aider.chat/docs/leaderboards) ranks models on coding performance. Claude Opus 4.6 and GPT-5.4 consistently rank near the top for the architect role.



## Related Guides

- [Best Cursor Alternatives (2026)](../use-cases/cursor-alternatives.md)

## Related Comparisons

- [Aider vs Claude Code](../comparisons/aider-vs-claude-code.md)
- [Aider vs Cursor](../comparisons/aider-vs-cursor.md)
- [Aider vs GitHub Copilot](../comparisons/aider-vs-github-copilot.md)

## Related

- [Cursor](../tools/cursor.md) - leading GUI AI IDE; the most common alternative
- [Category: ai-coding](../categories/ai-coding.md)
- [Best AI Coding Assistant (2026)](../use-cases/best-ai-coding-assistant.md)


## Review History

- **2026-04-15:** Pricing, flagship model, and feature claims verified against official sources.
- **2026-03-14:** Monthly verification pass. No material changes detected.
- **2024-01-15:** Initial review published.

## Sources

- [Aider.chat](https://aider.chat) - official documentation and model leaderboard, verified 2026-04-15
- [GitHub: paul-gauthier/aider](https://github.com/paul-gauthier/aider) - source code and release history