# News Coverage Backfill ExecPlan

## Objective

Fix the May 2026 news archive gaps by ensuring every day from May 1 through the latest published news date has at least two source-backed, non-duplicate news entries.

## Scope

- Audit news counts by date.
- Add missing non-duplicate news entries for thin or empty days.
- Add a guard so future current-month gaps fail before publishing.
- Regenerate required news OG/thumb assets.
- Verify sources, rendering, links, guard checks, and build.

## Coverage Floor

For the current active news month, every day from the first day of the month through the newest news article date should have at least two news entries.

## Target Thin Days

- 2026-05-02
- 2026-05-09
- 2026-05-10
- 2026-05-15
- 2026-05-17
- 2026-05-23
- 2026-05-24
- 2026-05-25
- 2026-05-26

## Verification

- `node scripts/audit-news-rendering.mjs`
- `npm run test:scripts`
- `npm run guard:check`
- `npm run check:links`
- `npm run check:news`
- `npm run build:fast`
- Rendered mobile/desktop spot checks on newly added news pages.
