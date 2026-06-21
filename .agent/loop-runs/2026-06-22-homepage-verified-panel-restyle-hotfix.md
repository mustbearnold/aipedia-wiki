# Homepage Verified Panel Restyle Hotfix

Date: 2026-06-22

Status: Complete in the verified June 22 batch

## Trigger

Matt selected the homepage `Recently verified` panel in the in-app browser and reported that the orange style looked ugly and almost brown.

## Root Cause

The panel used a broad warm overlay on top of the dark site surface. On the narrow mobile viewport this read as a muddy orange-brown block instead of a premium trust or verification module.

## Changes

- Restyled `.gt-home-refresh` in `src/pages/index.astro` to use a neutral charcoal base.
- Kept the AiPedia amber brand language as a thin inset accent instead of a full panel wash.
- Added a subtle cool highlight so the panel has depth without becoming brown.
- Restyled `.gt-home-refresh-lane` cards to stay neutral, readable, and contained.
- Regenerated `PAGE_REFRESH_LEDGER.md` for the homepage refresh scope.

## Verification

- `npm run ledger:pages`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npm run ledger:pages:check`
- `git diff --check`
- Live in-app browser DOM style and geometry check at `http://127.0.0.1:4321/` on the 319 px viewport.

## Browser Findings

- Panel background resolved to `rgba(8, 12, 18, 0.94)` with a soft cool gradient.
- The amber treatment is now an inset accent line, not a full warm wash.
- All three inner guide cards stayed inside the panel.
- No horizontal overflow was present at 319 px.

## Residual Risk

None known for this panel. The broader June 21 to June 22 freshness goal remains active.
