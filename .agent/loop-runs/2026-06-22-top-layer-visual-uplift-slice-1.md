# Top-Layer Visual Uplift Slice 1

Date: 2026-06-22
Branch: `master`
Status: complete locally

## Scope

- Fixed the remaining homepage compact-evidence tint in decision cards.
- Added a shared top-layer index polish stylesheet for hub cards and controls.
- Imported the polish layer from `src/layouts/BaseLayout.astro`.
- Widened non-home top-layer index canvases from the inherited 680 px desktop measure to 1040 px.
- Matched the non-home top-layer narrow-mobile frame to the homepage at 319 and 430 px.
- Converted `/guides/` and `/news/` mobile filter chips from horizontal scroll strips into contained two-column grids.
- Hardened `/guides/` and `/news/` with route-owned mobile filter grid rules after the live in-app browser still exposed the old strip behavior on `/guides/` and `/news/` at 346 px.
- Corrected those route-owned rules to root on page-owned elements, not `#main-content`, because Astro page-scoped CSS cannot reliably match layout-owned parents.
- Restored the shared active-chip state so selected filters keep the Signal Orange fill instead of being flattened by the shared neutral polish layer.
- Fixed shared `Hero` mobile breadcrumb geometry after `/explore/` showed the current crumb stretching away from `aipedia`.
- Shortened the visible `/categories/` refresh text into a compact status line.
- Expanded the homepage decision-card Playwright regression so compact evidence metrics must stay transparent and borderless.

## Routes Checked

- `/`
- `/tools/`
- `/categories/`
- `/compare/`
- `/guides/`
- `/news/`
- `/answers/`
- `/trends/`
- `/workflows/`

## Verification

- Live in-app browser DOM and geometry checks at 319, 430, 768, and 1366 px for the routes above.
- `npm run ledger:pages`
- `npm run typecheck`
- `node scripts\guard-em-dashes.mjs`
- `git diff --check`
- `npm run build:fast`
- First `npm run qa:route -- --route / --route /tools/ --route /categories/ --route /compare/ --route /guides/ --route /news/ --route /answers/ --route /trends/ --route /workflows/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client` run failed on `/guides/` and `/news/` mobile filter overflow.
- Fixed the filter overflow, reran `npm run build:fast`, then reran `npm run qa:route -- --route / --route /tools/ --route /categories/ --route /compare/ --route /guides/ --route /news/ --route /answers/ --route /trends/ --route /workflows/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- `npx playwright test tests/smoke/visual-routes.spec.mjs --config=playwright.config.mjs -g "homepage decision cards"`
- Follow-up live in-app browser check for `/guides/` and `/news/` at 319, 346, 360, and 430 px after the user-reported filter strip regressions.
- Follow-up `npm run build:fast`
- Follow-up `npm run qa:route -- --route /guides/ --route /news/ --widths 319,346,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- Follow-up live in-app browser breadcrumb geometry checks for `/explore/`, `/tools/`, `/news/`, `/guides/`, and `/compare/` at 319, 346, and 430 px.
- Final follow-up `npm run typecheck`
- Final follow-up `node scripts\guard-em-dashes.mjs`
- Final follow-up `git diff --check`
- Final follow-up `npm run build:fast`
- Final follow-up `npm run qa:route -- --route /explore/ --route /tools/ --route /categories/ --route /compare/ --route /guides/ --route /news/ --route /answers/ --route /trends/ --route /workflows/ --widths 319,346,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- Final follow-up `npm run ledger:pages:check`

## Result

- Homepage compact evidence metrics now compute to transparent backgrounds with zero-width borders.
- Checked top-layer cards use the warm-neutral polish layer.
- Non-home top-layer routes no longer squeeze desktop cards into the old 680 px canvas.
- `/guides/` and `/news/` mobile filter chips are contained at 319, 360, 390, and 430 px.
- `/guides/` and `/news/` active filter chips are visibly selected, and every chip is contained at the reported 346 px width.
- The final route-owned selectors are scoped as `.gt-guide-filters` and `.gt-news-filters` descendants, not through `#main-content`.
- `aipedia / Explore` now stays as a compact breadcrumb trail with a 6 px crumb gap at 346 px, and the same shared hero crumb behavior is verified on sibling top-layer routes.
- Route QA passed for all listed routes at 319, 360, 390, 430, 768, 1024, and 1366 px.
- Follow-up route QA passed for `/guides/` and `/news/` at 319, 346, 360, 390, 430, 768, 1024, and 1366 px.
- Final follow-up route QA passed for `/explore/`, `/tools/`, `/categories/`, `/compare/`, `/guides/`, `/news/`, `/answers/`, `/trends/`, and `/workflows/` at 319, 346, 360, 390, 430, 768, 1024, and 1366 px.

## Next

- Slice 2 should manually inspect `/guides/`, `/news/`, `/answers/`, `/trends/`, and `/workflows/` for page-specific hierarchy and copy density after the shared surface layer.
- Slice 3 should add reusable visual precision checks or loop language for top-layer surface drift.
