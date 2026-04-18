---
type: news
slug: 2026-04-02-cursor-3-agent-first-release
title: "Anysphere Ships Cursor 3, Making the Agent Console the Primary Interface"
date: 2026-04-02
severity: major
summary: "Cursor 3 launched April 2 as a ground-up redesign that promotes an agent-management console to the primary surface and pushes the traditional IDE into a secondary tab. The release ships Agent Tabs for parallel agents, a new /best-of-n command that runs the same task across multiple models, Design Mode for browser-annotated UI iteration, and Bugbot learned rules for PR code review with near-80% resolution rate."
affects: [cursor]
categories: [ai-coding]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-18
last_verified: 2026-04-18
sources:
  - url: "https://cursor.com/blog/cursor-3"
    title: "Meet the new Cursor (Anysphere)"
  - url: "https://thenewstack.io/cursor-3-demotes-ide/"
    title: "Cursor's $2 billion bet: The IDE is now a fallback, not the default (The New Stack)"
  - url: "https://www.infoq.com/news/2026/04/cursor-3-agent-first-interface/"
    title: "Cursor 3 Introduces Agent-First Interface (InfoQ)"
---

Anysphere shipped Cursor 3 on April 2, a ground-up rebuild codenamed Glass that promotes the agent management console to the primary interface and pushes the traditional IDE into a secondary tab. The release is the clearest signal yet that AI-first coding tools are moving past editor-with-AI-sidebar toward agent-as-primary-surface architectures.

The defining new capability is parallel agent execution. Agents can run locally, in git worktrees, in the cloud, or on remote SSH hosts, all coordinated from one window. Agent Tabs display multiple chats side-by-side or in a grid. The new `/worktree` command spawns an isolated workspace; `/best-of-n` runs the same task across several models and surfaces the strongest output.

Two other features stand out. Design Mode lets the agent annotate and target UI elements directly in a live browser, so visual feedback loops no longer require describing bugs in prose. Bugbot learned rules feeds confirmed reviewer feedback back into the code-review model, lifting bug-catch resolution toward 80%, which Anysphere claims is 15 points ahead of the nearest competitor.

The strategic context is an AI-coding market consolidating around three surfaces: Cursor 3 (agent-first rebuild), [Claude Code](/tools/claude-code/) (terminal-native autonomous coder), and [Antigravity](/tools/antigravity/) (Google's agentic IDE, still on Gemini 3.1 Pro + Opus 4.6). [Windsurf](/tools/windsurf/), [Zed](/tools/zed/), and [Continue](/tools/continue/) continue as editor-first alternatives. The question buyers face in 2026 is whether the editor or the agent console is the default workspace. Cursor 3 has picked a side.

## Sources

- [Anysphere: Meet the new Cursor](https://cursor.com/blog/cursor-3)
- [The New Stack: Cursor's $2B bet on demoting the IDE](https://thenewstack.io/cursor-3-demotes-ide/)
- [InfoQ: Cursor 3 Introduces Agent-First Interface](https://www.infoq.com/news/2026/04/cursor-3-agent-first-interface/)
