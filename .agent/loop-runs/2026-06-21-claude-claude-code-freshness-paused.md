# Claude And Claude Code Freshness Pass, Paused

- Date: 2026-06-21
- Status: superseded by `.agent/loop-runs/2026-06-22-claude-claude-code-freshness-complete.md`
- Branch: `master`
- Commit: not committed
- Loop: Freshness

This file records the safe pause point from June 21. The batch was completed locally on June 22 after ledger, build, route QA, smart verification, and loop checks passed.

## What Was Done

- Rechecked Claude and Claude Code against current June 2026 primary sources.
- Updated Claude and Claude Code tool pages to June 21, 2026 for:
  - Fable/Mythos access suspension.
  - Opus 4.8 as the stable buyable high-end Claude route.
  - paused Agent SDK credit changes.
  - Claude pricing, web search, data retention, API, and Claude Code cost guidance.
- Added source registry IDs for:
  - `anthropic-api-data-retention`
  - `anthropic-web-search-tool`
- Updated related live surfaces touched so far:
  - AI Chatbots, AI Coding, AI Automation, and AI Writing category hubs.
  - Anthropic company profile.
  - ChatGPT vs Claude, Claude vs Gemini, Claude vs Grok, and Aider vs Claude Code comparisons.
  - Claude alternatives, Cursor alternatives, Best AI Coding Assistant, and Solo Founder Stack guides.
  - Homepage, Tools index, Categories index refresh comments.
  - Best AI Chatbot, Best AI Coding Tool, and ChatGPT vs Claude answer pages.

## Verified So Far

- `node -e "JSON.parse(require('fs').readFileSync('src/data/source-registry.json','utf8')); console.log('source-registry json ok')"`
- `git diff --check`
- `node scripts/guard-em-dashes.mjs`
- `npm run audit:provenance:changed -- --json`

Results:

- Source registry JSON parses.
- No whitespace diff issues.
- No em dashes.
- Changed-tool provenance passed for Claude and Claude Code, including no unknown source IDs.

## Not Done Yet

- `PAGE_REFRESH_LEDGER.md` has not been regenerated.
- `.agent/CURRENT_STATUS.md` and `.agent/PLANS.md` record this pause, but the work is not complete.
- No build or route QA has been run for the changed rendered surfaces.
- No `npm run check:smart:run` has been run after these edits.
- No loop receipt with `complete` status has been recorded.
- No commit or push has been made.

## Resume Here

1. Run `git status --short --branch`.
2. Re-scan for stale Claude credit and Fable/Mythos wording:
   - `rg "Agent SDK credits are now active|Agent SDK credits became active|monthly per-user Agent SDK credits|active per-user credits|Mythos is limited availability|Mythos is limited to approved" src -n`
3. Finish any remaining same-batch Claude/Claude Code surfaces found by the scan.
4. Run `npm run ledger:pages -- --date 2026-06-21`, then inspect and verify the ledger diff.
5. Run the focused smart check for the dirty paths, then route QA at 360, 390, 430, 768, 1024, and 1366 px for affected rendered routes.
6. Run:
   - `npm run audit:provenance:changed -- --json`
   - `npm run ledger:pages:check`
   - `npm run loop:freshness -- --json`
   - `npm run loop:all -- --json`
   - `git diff --check`
   - `node scripts/guard-em-dashes.mjs`
7. Record the final loop receipt only after the batch is verified.
8. Commit and push only after verification is solid.
