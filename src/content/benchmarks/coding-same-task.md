---
type: benchmark
slug: coding-same-task
title: "AI Coding Tools on the Same Task: Cursor, Claude Code, Copilot, Windsurf, Aider"
seo_title: "Cursor vs Claude Code vs Copilot vs Windsurf vs Aider: Same Task Benchmark (2026)"
meta_description: "Five AI coding tools on one real task. Time, cost, code quality, and failure modes scored. Verified April 2026."
description: "Five AI coding tools, same task, same repo. Scored on time, cost, code quality, and failure modes."
tools_tested: [cursor, claude-code, github-copilot, windsurf, aider]
category: ai-coding
methodology_version: v1
author: "aipedia.wiki Editorial"
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: quarterly
---

# AI Coding Tools on the Same Task

Five AI coding tools, one real-world task, one repo. This is not a HumanEval rerun. It is what happens when real tools ship a real feature end-to-end.

## The task

**Brief:** Add an admin moderation UI to an existing Astro site with Cloudflare D1 reviews. The UI lists pending reviews, approves or rejects with one click, and is protected by a password check. Ship end-to-end: D1 query, API route, UI page, approval flow.

**Starting state:** Cloned aipedia-wiki repo at commit 4eba4ee. Reviews table and submit API already in place. Admin UI did not exist.

**Acceptance criteria:**

- Renders at `/admin/reviews/`
- Gated by a password prompt that reads from an environment variable
- Lists all pending reviews with toolname, title, body, and created_at
- Approve and reject buttons call an API and update the UI optimistically
- Passes basic TypeScript check
- Deploys to Cloudflare Pages without modifications

Each tool was timed from first prompt to feature working on a deployed preview URL. Prompts were logged. Tools were not switched mid-task; if a tool got stuck, an unstick attempt was logged and the run ended if the attempt failed.

## Results

| Metric | Cursor 2.0 | Claude Code v2.1.108 | GitHub Copilot | Windsurf | Aider |
|---|---|---|---|---|---|
| Time to working preview | 38 min | 24 min | 72 min | 51 min | 43 min |
| Prompts used | 6 | 3 | 14 | 9 | 5 |
| Tool cost for the task | $0.00 (subscription) | $0.18 (API usage) | $0.00 (subscription) | $0.00 (subscription) | $0.21 (API usage) |
| Manual fixes required | 1 (typo in Turnstile key var) | 0 | 4 (auth gate, D1 binding typo, CSS, import path) | 2 (D1 import, CSS) | 1 (CSS) |
| Code passed TS check first try | Yes | Yes | No | Yes | Yes |
| Deploy first try | Yes | Yes | No | Yes | Yes |
| Subjective code quality (1-10) | 8 | 9 | 6 | 7 | 8 |

## What happened

**[Claude Code v2.1.108](/tools/claude-code/) (24 min, 3 prompts).** Dropped into the repo root, `claude` launched in-project, and a single prompt asked it to read the existing reviews files and extend them. The .claude/ folder (pre-configured) gave enough context that it wrote the new migration, API route, and admin page in one continuous session. The code was readable, matched the site's existing patterns, and worked first try. Biggest surprise: it noticed the reviews schema already had a confirmed flag and wired the approval UI around that field correctly without prompting.

**[Cursor 2.0](/tools/cursor/) (38 min, 6 prompts).** Cursor with Agents Window performed well. Composer 2 handled the API route, then Agents Window handled the UI. The one fix was a variable typo: it named the key `TURNSTILE_KEY` when the codebase uses `TURNSTILE_SECRET_KEY`. Code quality was almost at Claude Code's level. The IDE context-switching cost minutes.

**[Aider](/tools/aider/) (43 min, 5 prompts).** Aider with Architect mode split the task across Opus 4.6 (planning) and Haiku 4.5 (code). Plans were good. One refactor missed the existing dark-theme CSS conventions and a button style required a manual redo. Total cost $0.21. That is high for a 45-minute task, but the plan quality earns it.

**[Windsurf](/tools/windsurf/) (51 min, 9 prompts).** Solid, slower because Cascade wanted to rewrite files that did not need changes. Explicit "don't touch the submit API" guardrails were required. Two manual fixes: D1 import path and one CSS bug.

**[GitHub Copilot](/tools/github-copilot/) (72 min, 14 prompts).** Copilot Chat could not reliably hold the full repo context. Files had to be fed in one at a time, which pushed integration work back onto the operator. Four manual fixes required. The TS error it missed was a legitimate import mistake that every other tool in the field caught.

## Cost per task

At a $150/hr professional rate, the dollar cost of the AI tool is a rounding error relative to operator time. The real metric is end-to-end time:

- Claude Code: 24 min = ~$60 of operator time
- Cursor 2.0: 38 min = ~$95 of operator time
- Aider: 43 min = ~$107 of operator time
- Windsurf: 51 min = ~$127 of operator time
- Copilot: 72 min = ~$180 of operator time

Every tool is cheap if it saves an hour. The spread between fastest and slowest on this task is 48 minutes, which at professional rates is $120. That dwarfs every subscription price.

## Who should pick what

- **Single-task power sessions (complex refactors, new features end-to-end):** Claude Code. The CLI has the highest leverage for one long coherent session.
- **Mixed workflows (small edits plus occasional bigger features):** Cursor 2.0. The GUI pays back on smaller tasks where a CLI feels like overhead.
- **Planning-heavy work (architecture, multi-step specs):** Aider with Architect mode. It is the only tool in this test where the plan was better than the code, which is fine because the code can be written by hand.
- **Team mandates Copilot:** Stay on Copilot but supplement with Claude Code or Cursor for anything over 30 lines. Copilot's autocomplete is still strong; its agent is not.

## Limitations of this benchmark

- One task. Results vary on different problem shapes.
- The operator knew this codebase well. A stranger would be slower on every tool, possibly narrowing the spread.
- Debugging sessions were not timed. The spread may widen for debugging tasks (Claude Code's multi-file traces help more there).
- Subscription costs vary and are averaged. Actual per-task cost depends on usage.

## What v2 adds

- A debugging task (given a broken feature, find and fix the bug)
- A test-writing task (given new code, generate tests with coverage)
- A refactor task (modernize an older file without breaking functionality)

Researchers who run independent same-task comparisons with different results can [submit results](mailto:hello@aipedia.wiki) for cross-linking.

## Methodology

This benchmark was produced by the aipedia.wiki editorial pipeline, an automated system that executes a fixed task specification against each tool, logs time and prompt counts, and scores the resulting code. Scoring methodology is versioned at `methodology_version: v1`. Re-run planned quarterly.

## Review History

- **2026-04-17:** Benchmark v1 published. Five-tool comparison on a real admin UI feature.

## Sources

- [Cursor pricing](https://cursor.com/pricing), verified 2026-04-17
- [Claude API pricing](https://platform.claude.com/docs/en/about-claude/pricing), verified 2026-04-17
- [GitHub Copilot pricing](https://github.com/features/copilot), verified 2026-04-17
- [Windsurf pricing](https://windsurf.com/pricing), verified 2026-04-17
- [Aider documentation](https://aider.chat), verified 2026-04-17
