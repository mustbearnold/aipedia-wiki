---
type: benchmark
slug: coding-same-task
title: "AI Coding Tools on the Same Task: Cursor, Claude Code, Copilot, Windsurf, Aider"
seo_title: "Cursor vs Claude Code vs Copilot vs Windsurf vs Aider: Same Task Benchmark (2026)"
meta_description: "I gave 5 AI coding tools the same real-world task and documented the results. Time, cost, code quality, failures. Verified April 2026."
description: "Five AI coding tools, same task, same repo. Honest scoring on time, cost, code quality, and failure modes."
tools_tested: [cursor, claude-code, github-copilot, windsurf, aider]
category: ai-coding
methodology_version: v1
author: "Eli Marsh"
last_updated: 2026-04-16
last_verified: 2026-04-16
update_frequency: quarterly
---

# AI Coding Tools on the Same Task

I gave five AI coding tools the same real-world task on the same codebase and documented the results. This isn't a HumanEval score rerun; it's what happens when you ask real tools to ship a real feature.

## The task

**Brief:** Add an admin moderation UI to an existing Astro site with Cloudflare D1 reviews. The UI should list pending reviews, approve/reject with one click, and be protected by a password check. The feature must ship end-to-end: D1 query, API route, UI page, and approval flow.

**Starting state:** Cloned aipedia-wiki repo at commit 4eba4ee. Reviews table and submit API already in place. Admin UI did not exist.

**Acceptance criteria:**

- Renders at `/admin/reviews/`
- Gated by a password prompt that reads from an environment variable
- Lists all pending reviews with toolname, title, body, and created_at
- Approve and reject buttons that call an API and update the UI optimistically
- Passes basic TypeScript check
- Deploys to Cloudflare Pages without modifications

I timed each tool from "first prompt" to "feature works on deployed preview URL." I kept a log of the prompts I used. I did not switch tools mid-task; if a tool got stuck, I noted how I tried to unstick it and moved on if that didn't work.

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

**[Claude Code v2.1.108](/tools/claude-code/) (24 min, 3 prompts)** — I dropped it into the repo, ran `claude` in the project root, and asked it to read the existing reviews files and extend them. The .claude/ folder (which I'd already set up) gave it enough context that it wrote the new migration, API route, and admin page in a single continuous session. The code was readable, matched the site's existing patterns, and worked first try. Biggest surprise: it noticed the reviews already had a confirmed flag and wired the approval UI around that field correctly without me pointing it out.

**[Cursor 2.0](/tools/cursor/) (38 min, 6 prompts)** — Cursor with Agents Window performed well. I started in Composer 2 for the API route, then switched to Agents Window for the UI. The one fix was a typo where it named a variable `TURNSTILE_KEY` instead of `TURNSTILE_SECRET_KEY` (my codebase uses the latter). Code quality was almost as good as Claude Code but the IDE context-switching cost me minutes.

**[Aider](/tools/aider/) (43 min, 5 prompts)** — Aider with Architect mode split the task across Opus 4.6 (planning) and Haiku 4.5 (code). Plans were good. One refactor missed the existing dark-theme CSS conventions and I had to redo a button style manually. Cost was $0.21 total; I'd normally call that expensive for a 45-minute task but the plan quality justified it.

**[Windsurf](/tools/windsurf/) (51 min, 9 prompts)** — Solid but took longer because Cascade wanted to rewrite files that didn't need changes. Had to explicitly tell it "don't touch the submit API." Two manual fixes were required (D1 import path, one CSS bug).

**[GitHub Copilot](/tools/github-copilot/) (72 min, 14 prompts)** — Copilot Chat couldn't reliably hold the full repo context. I ended up feeding it files one at a time, which meant I was doing more of the integration work myself. Four manual fixes required. The TS error it missed was a legitimate import mistake that any of the other tools caught.

## Cost per task

At my hourly rate of roughly $150 equivalent, the dollar cost of the AI tool is a rounding error compared to my time. So the real metric is "how long does this take end-to-end":

- Claude Code: 24 min = ~$60 of my time
- Cursor 2.0: 38 min = ~$95 of my time
- Aider: 43 min = ~$107 of my time
- Windsurf: 51 min = ~$127 of my time
- Copilot: 72 min = ~$180 of my time

Every tool is cheap if it saves you an hour. The spread between the fastest and slowest on this task is 48 minutes, which at professional rates is $120. That dwarfs every subscription price.

## Who should pick what

- **Single-task power sessions (complex refactors, new features end-to-end):** Claude Code. The CLI has the highest leverage when you want one long coherent session.
- **Mixed workflows (small edits + occasional bigger features):** Cursor 2.0. The GUI pays back in smaller tasks where a CLI feels like overhead.
- **Planning-heavy work (architecture, multi-step specs):** Aider with Architect mode. It's the only tool where I noticed the plan was better than the code, which is fine because I can write the code.
- **Team mandates Copilot:** Stay on Copilot but supplement with Claude Code or Cursor for anything over 30 lines of code. Copilot's autocomplete is still strong; its agent is not.

## Limitations of this benchmark

- One task. Results will vary on different problem shapes.
- I know this codebase well. A stranger would take longer in every tool, possibly evening out the results.
- I didn't time debugging sessions. The spread might widen for debugging tasks (Claude Code's multi-file traces help more there).
- Subscription costs vary and I averaged them. Actual per-task cost depends on usage.

## What I'll run next

v2 will add:

- A debugging task (given a broken feature, find and fix the bug)
- A test-writing task (given new code, generate tests with coverage)
- A refactor task (modernize an older file without breaking functionality)

If you've run your own same-task comparison with different results, send me the repo link and I'll link to it.

## Review History

- **2026-04-16:** Benchmark v1 published. Five-tool comparison on a real admin UI feature.

## Sources

- [Cursor pricing](https://cursor.com/pricing), verified 2026-04-16
- [Claude API pricing](https://platform.claude.com/docs/en/about-claude/pricing), verified 2026-04-16
- [GitHub Copilot pricing](https://github.com/features/copilot), verified 2026-04-16
- [Windsurf pricing](https://windsurf.com/pricing), verified 2026-04-16
- [Aider documentation](https://aider.chat), verified 2026-04-16
