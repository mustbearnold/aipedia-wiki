# AiPedia Active ExecPlans

Keep this file short. Archive completed plans under `.agent/archive/` once their final report is written.

## Active: Project Folder Tidy And Verification Router

### Objective

Tidy the AiPedia working tree so future agents can orient faster, avoid generated clutter, and run scoped verification instead of defaulting to broad checks and builds.

### Scope

- Add agent and script orientation maps.
- Add `check-smart` verification routing.
- Keep private/local operator artifacts clearly ignored.
- Archive completed historical ExecPlans.
- Remove safe ignored generated artifacts after verification boundaries are clear.

### Verification

- `npm run check:smart -- --path scripts/check-smart.mjs --path tests/scripts/check-smart.test.mjs --path package.json --path README.md`
- `npm run test:scripts`
- `npm run audit:commands`
- `git diff --check`

### Status

- 2026-06-17: Started cleanup branch and goal.
- 2026-06-17: Added project maps, script docs, smart check router, and archived the old plan history.
- 2026-06-17: Removed 63 completed one-off `.agent/*.md` plan/audit files and 23 empty unregistered `.worktrees/` directories.

## Active: June 17, 2026 AI News Coverage Catch-Up

### Objective

Backfill the uncovered June 17, 2026 AiPedia news date with source-backed coverage of the main AI and AI tools stories that affect buyer decisions.

### Scope

- Track the lane in GitHub issue #41.
- Add a June 17 daily AI News Desk.
- Add focused supporting news pages for Google Pixel/Gemini tools, Microsoft Copilot Cowork billing, G7 AI sovereignty, and NVIDIA AI infrastructure.
- Refresh affected `/news/`, RSS, LLM, and ledger surfaces.

### Verification

- `node scripts/generate-og-news.mjs <new-slugs>`
- `npm run check:news`
- `node scripts/audit-news-rendering.mjs`
- `npm run ledger:pages`
- `npm run ledger:pages:check`
- `npm run guard:check`
- `npm run build:fast`

### Status

- 2026-06-17: GitHub issue #41 opened and June date gap confirmed. Research completed against current June 2026 Google, Microsoft, AP, Consilium, and Coherent sources.

## Archive

Historical completed plans live in `.agent/archive/PLANS-2026-05-to-2026-06.md`.
