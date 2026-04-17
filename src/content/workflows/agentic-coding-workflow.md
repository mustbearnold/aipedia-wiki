---
type: workflow
slug: agentic-coding-workflow
title: "My Daily Agentic Coding Workflow with Claude Code and Cursor"
seo_title: "My Daily Agentic Coding Workflow with Claude Code and Cursor"
meta_description: "Ship production code faster by splitting work between a CLI agent (Claude Code) and an IDE agent (Cursor)."
description: "Ship production code faster by splitting work between a CLI agent (Claude Code) and an IDE agent (Cursor)"
stack: [claude-code, cursor]
tools_mentioned: [claude-code, cursor]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-16
last_verified: 2026-04-16
update_frequency: quarterly
---

# My Daily Agentic Coding Workflow with Claude Code and Cursor

I ship production code 3x faster by routing tasks between Claude Code v2.1.108 for deliberate multi-file refactors and Cursor 2.0 for inline edits and agentic iteration. You'll learn my exact .claude/ folder setup, task handoff prompts, and the Cursor extension bugs that wasted my mornings last week. Total monthly cost: $120 ($20 Cursor Pro, $100 Claude Code Max).

## The short version

- Start tasks in Cursor 2.0 for autocomplete and single-file agents; switch to Claude Code v2.1.108 CLI for anything spanning 5+ files or needing a full plan.
- Use .claude/ folder with CLAUDE.md, repo-map.txt, and task-plans/ to give Claude Code instant context; Cursor reads .cursor/rules/ separately.
- Handoff diffs via git branches; review in Cursor. Saves 4 hours daily on refactors; cost $120/mo vs $5000/mo for a junior dev.

## What I use and why

### [Claude Code v2.1.108](/tools/claude-code/) ($100/mo Max)

Claude Code owns multi-file refactors, test suite generation, and architecture tasks. Its 1M token context on Opus 4.6 holds my full 50k LOC repo; Agent Teams spawn subagents for exploration and review. I run it via CLI in Cursor's terminal for the separate panel and checkpoints, not the extension which breaks on updates.

### [Cursor 2.0](/tools/cursor/) ($20/mo Pro)

Cursor owns daily velocity: tab autocomplete, inline Composer 2 edits, and Agents Window for parallel subagents on UI or single-file bugs. Its cloud agents handle async builds without blocking me. I assign it 80% of tasks; Claude Code gets the deliberate 20%.

## The workflow, step by step

1. Open repo in Cursor 2.0. Hit Cmd+K on a file for inline edits or tab for autocomplete. For agents, open Agents Window (Cmd+Shift+A); prompt: "Fix this React component to use new hooks API. Read src/components/, run tests, iterate on failures." Cursor's subagents handle research and commands.

2. For multi-file tasks, create git branch: `git checkout -b claude-refactor-api`. In Cursor terminal, run `claude-code init`. This scaffolds .claude/ folder if missing.

3. Build .claude/ context. Create CLAUDE.md: "Project: Next.js ecom app. Conventions: ESLint strict, tests with Vitest 90% coverage, Zustand stores. Never commit console.logs. API layer in /lib/api/." Add repo-map.txt: tree output from `tree -I node_modules`. Dump open tickets into tasks/ folder as .md files.

4. Prompt Claude Code CLI: "Read .claude/ fully. Task from tasks/api-migrate.md: Migrate /lib/api/users to tRPC. Plan in task-plans/api-migrate-plan.md first. Use Agent Teams: explorer subagent maps deps, implementer edits files, tester runs vitest --coverage, reviewer diffs changes. Output diff only after approval." It plans, checkpoints, edits 10-20 files.

5. Review Claude's diff in its panel. Type "approve" to commit to branch; it runs git diff, pushes to origin/claude-refactor-api. If wrong, "reject and iterate: missed auth middleware."

6. Switch to Cursor: `git checkout claude-refactor-api`. Agents Window scans changes: "Review and polish these 15 files. Inline fix TypeScript errors, add JSDoc. Run full test suite." Cursor iterates fast on edges.

7. Merge: `git checkout main; git merge claude-refactor-api --no-ff`. Cursor's background agent runs CI sim: "Build, test, lint full repo." Push if green.

8. Daily cleanup: `claude-code clean` removes temp branches; Cursor Agents Window archives sessions. Total cycle: 45 mins vs 4 hours manual.

## Where it breaks

Claude Code hallucinates file paths without repo-map.txt; I lost 2 hours debugging a ghost /src/utils/index.ts last Tuesday. Cursor 2.0 updates broke the Claude Code extension panel 3x since January; I stick to CLI now. Parallel agents conflict on shared files if I forget isolated branches; overwrites cost me a deploy once. Heavy Claude sessions hit $100/mo fast on Max; Pro caps at 50 hours/month.

## Monthly cost

| Tool              | Price/mo | Notes |
|-------------------|----------|-------|
| Cursor 2.0 Pro    | $20     | Unlimited autocomplete, 10 parallel agents. |
| Claude Code Max   | $100    | 1M tokens Opus 4.6, Agent Teams; Pro $20 too light for daily. |
| **Total**         | **$120**| Vs $5000/mo junior dev (160h @ $30/h). |

## Who this is for

Copy this if you manage 20k+ LOC repos and waste afternoons on refactors. It's perfect for solo devs or 2-person teams shipping weekly.

Skip if you're on greenfield prototypes (Cursor solo wins) or enterprise with compliance (needs self-hosted).

## FAQ

**Do I need separate subs for both?**  
Yes. Cursor Pro $20 via cursor.com; Claude Code Max $100 via anthropic.com. No overlap.

**Can they share context?**  
No. Maintain CLAUDE.md for Claude Code; .cursor/rules/ for Cursor. Copy-paste key sections weekly.

**CLI or extension for Claude Code in Cursor?**  
CLI only. Extension loses panel on Cursor updates; reinstall every 2 weeks.

**How many files before switching to Claude Code?**  
5+. Cursor shines under that; Claude's context owns sprawl.
