# 2026-06-22 Visual Layout Precision Standard

## Trigger

Matt stated that every AiPedia page must keep mathematically disciplined visual layout, including text placement, overflow prevention, and text-to-card or text-to-box ratios.

## Decision

This is now a non-negotiable rendered-page standard. Route QA remains the automated floor, but future sessions must also inspect layout precision:

- Grid math and container symmetry.
- Consistent gutters, card padding, chip spacing, and radius systems.
- Card containment for headings, metadata, source chips, and CTAs.
- Balanced text-to-card ratios in repeated cards and boxes.
- No awkward orphan text, one-letter-per-line wrapping, clipping, or text escaping its parent.
- No lopsided visual weight on mobile, tablet, or desktop.

## Files Updated

- `AGENTS.md`
- `.agent/OPERATING_RULES.md`
- `.agent/LOOPS.md`
- `.agent/PROJECT_MAP.md`
- `.agent/CURRENT_STATUS.md`
- `.agent/PLANS.md`
- `.agent/WORK_LOG.md`
- `src/data/aipedia-loops.json`
- `scripts/decision-loop.mjs`
- `tests/scripts/decision-loop.test.mjs`

## Verification

- `npm run qa:route -- --route /news/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `node --test tests\scripts\decision-loop.test.mjs tests\scripts\aipedia-loops.test.mjs`
- `npm run loop:system -- --json`
- `npm run loop:next -- --json`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`

## Residual Risk

Automated route QA catches overflow and metadata failures, but it cannot fully judge visual harmony. Future rendered changes must include browser or screenshot judgment for symmetry, spacing, card ratios, and text placement before they are called done.
