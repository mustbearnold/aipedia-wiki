# AI Presentation Category Refresh ExecPlan

## 1. Objective

Refresh `src/content/categories/ai-presentation.md` into a current May 8, 2026 category buying hub for AI presentation tools. The goal is to improve mobile-first decision clarity, search ranking potential, affiliate conversion quality, source-backed trust, and topical authority around the presentation-tool cluster.

## 2. Current state

- Route: `/categories/ai-presentation/`
- Page source: `src/content/categories/ai-presentation.md`
- Route implementation: `src/pages/categories/[slug].astro`
- Template: `src/layouts/CategoryLayout.astro`
- Data model: category frontmatter supports `top_picks.best_overall`, `top_picks.budget`, and `top_picks.pro_team`; the route passes active primary and secondary category tools into the template.
- Rendered active tool set for this category comes from active tools with `category: ai-presentation` or `secondary_categories` including `ai-presentation`. That currently includes Gamma, Beautiful.ai, Pitch, Decktopus AI, Presentations.AI, Napkin AI, Prezi, and Lovart. Tome is excluded because its tool record has `status: dead`; Claude Design is excluded because its tool record has `status: beta`.
- Current content issues:
  - Metadata is verified only to `2026-04-14`.
  - `tool_count` says 6, but the active category route renders 8 tools.
  - Meta description and body still say Gamma, Beautiful.ai, and Tome lead the category.
  - Tome is described as an active AI storytelling presentation tool even though `src/content/tools/tome.md` marks the original presentation product dead.
  - Pricing and plan examples are April-era and conflict with the current May 2026 tool records and official sources.
  - The page reads like a directory overview rather than a buyer decision page.
  - The body does not clearly guide buyers to the stronger `/guides/best-ai-for-presentations/` page or presentation comparison pages.

## 3. Target state

- Update metadata, `tool_count`, `last_updated`, and `last_verified` to May 8, 2026.
- Add configured top picks for the mobile hero:
  - Best overall: Gamma for prompt-to-deck and deck/doc/web output.
  - Best free or budget: Napkin AI for free visual generation and low-cost diagram workflows.
  - Best pro or team: Pitch for collaboration-first deck workflows.
- Rewrite body into a crawlable buying hub:
  - Quick verdict.
  - Best tools by buyer job.
  - Money-page decision flow.
  - Pricing reality.
  - What to avoid.
  - Category map.
  - Internal links to guide, tool pages, comparisons, and Tome caution.
  - Official sources verified on 2026-05-08.
- Keep affiliate trust intact: Prezi and Decktopus can be discussed where product fit is real, but not forced into top slots for commission reasons.

## 4. Scope

Included:

- Modify `src/content/categories/ai-presentation.md`.
- Add this ExecPlan and keep it updated.
- Use official current vendor sources checked on 2026-05-08.
- Run content, build, and mobile QA for `/categories/ai-presentation/`.

Excluded:

- Rebuilding `CategoryLayout.astro` unless QA exposes a critical obvious bug.
- Rewriting every presentation tool page in this checkpoint.
- Rewriting Tome comparison pages in this checkpoint; they will be logged as merge/noindex candidates.

## 5. Files likely affected

- `src/content/categories/ai-presentation.md`
- `.agent/AI_PRESENTATION_CATEGORY_REFRESH_EXECPLAN.md`

## 6. Data model impact

- Uses existing category frontmatter fields only.
- Updates `tool_count` from 6 to 8 to match the active route data.
- Adds `top_picks` to drive the mobile-first category hero.
- No schema changes expected.
- No affiliate data changes expected.

## 7. SEO impact

- Replaces stale April metadata with a May 2026 buyer-intent title and meta description.
- Removes the dead Tome recommendation from an indexable category page.
- Adds original decision value and internal links to the strengthened presentation guide and high-intent comparisons.
- Canonical remains handled by the existing layout and route.
- ItemList structured data continues to come from active tools passed by the route.

## 8. Conversion impact

- Top-pick CTAs will route users to Gamma, Napkin AI, and Pitch with `pageType="category"` and `placement="category_top_pick"` tracking.
- Ranked-list CTAs remain tracked through `CommercialCTA`.
- Affiliate-enabled tools, especially Prezi and Decktopus, remain visible in the ranked list and body only where they help the buyer choose.
- Disclosure remains handled by the existing commercial CTA/disclosure system; the page body should avoid commission language that biases editorial ranking.

## 9. Mobile UX impact

- The first mobile screen should show freshness, editorial trust, category title, and three useful top-pick cards.
- Body content should avoid wide tables as the primary decision mechanism.
- Any comparison table should be compact and supplementary; stacked markdown sections should carry the buyer flow.
- QA must check 360, 390, 430, 768, and 1024 px for horizontal overflow.

## 10. Implementation steps

1. Confirm route/tool behavior and active category membership.
2. Verify current official sources for Gamma, Beautiful.ai, Pitch, Decktopus, Presentations.AI, Napkin AI, and Prezi as of 2026-05-08.
3. Rewrite category frontmatter and body with May 8 verification language.
4. Run a focused category content gate for word count, required sections, active top picks, current date, official sources, and banned stale Tome language.
5. Run `git diff --check` for touched files.
6. Run KPI/content checks and the available project checks.
7. QA `/categories/ai-presentation/` in the app browser.
8. Run viewport QA at 360, 390, 430, 768, and 1024 px.
9. Update this ExecPlan with final results and next task.

## 11. Verification commands

- Focused category gate for `src/content/categories/ai-presentation.md`.
- `git diff --check -- src\content\categories\ai-presentation.md .agent\AI_PRESENTATION_CATEGORY_REFRESH_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- App-browser QA for `/categories/ai-presentation/`
- External Playwright viewport QA at 360, 390, 430, 768, and 1024 px

## 12. Acceptance criteria

- `last_updated` and `last_verified` are `2026-05-08`.
- The body is a substantive buyer guide, not a thin category stub.
- Tome is not recommended as an active presentation tool.
- `tool_count` and top picks match active category route behavior.
- Official sources are listed and visible.
- No stale April 2026 framing, old Tome-active language, or unsupported pricing claims remain.
- Category CTAs include required tracking payload fields.
- Mobile QA finds no horizontal overflow at required widths.
- Checks and build pass, or failures are documented with exact causes.

## 13. Risks and mitigations

- Risk: Vendor pricing pages use client-rendered or region-specific details.
  - Mitigation: Use current official source pages, avoid overclaiming exact plan details in the category, and route deep pricing decisions to current tool pages and the presentation guide.
- Risk: The active route includes adjacent tools such as Lovart that are not full deck generators.
  - Mitigation: Explain the category map clearly so users understand full deck builders versus visual/creative assist tools.
- Risk: Existing Tome comparison pages may still be indexable and stale.
  - Mitigation: Log Tome comparisons as merge/noindex candidates and keep this category page from linking to Tome as a live recommendation.

## 14. Progress log

- 2026-05-08: Selected this checkpoint after rebuilding `/guides/best-ai-for-presentations/` because the category page still recommended Tome as active, carried April verification, and did not match the active route data.
- 2026-05-08: Inspected `src/pages/categories/[slug].astro`, `src/layouts/CategoryLayout.astro`, `src/content.config.ts`, active presentation tool frontmatter, and the current category markdown.
- 2026-05-08: Verified current official sources for Gamma, Beautiful.ai, Pitch, Decktopus, Presentations.AI, Napkin AI, and Prezi.
- 2026-05-08: Rebuilt `src/content/categories/ai-presentation.md` as a 1,315-word buyer category page. Updated metadata, `tool_count`, top picks, visible May 8 verification language, current source list, buyer-job sections, pricing reality, avoidance guidance, and internal links.
- 2026-05-08: Focused content gate passed: current dates, `tool_count: 8`, required buyer sections, official sources, no stale Tome-active language, and 1,315 body words.
- 2026-05-08: `git diff --check` initially caught markdown hard-line trailing spaces; removed them and reran successfully.
- 2026-05-08: `node scripts/audit-site-kpis.mjs --json` passed. It also highlighted thin presentation comparison risks such as `decktopus-vs-pitch`, `beautiful-ai-vs-pitch`, and `gamma-vs-tome`.
- 2026-05-08: `npm run test:scripts`, `npm run check`, and `npm run build:fast` passed. Build generated 905 pages, and indexability/commercial CTA audits passed.
- 2026-05-08: App-browser QA passed for `/categories/ai-presentation/`: title, canonical, one H1, top picks, required sections, current May 8 text, stale strings absent, and 11 CTAs with complete `data-cta-*` tracking.
- 2026-05-08: External viewport QA passed at 360, 390, 430, 768, and 1024 px: route 200, no horizontal overflow, one H1, correct canonical, visible buyer sections, stale strings absent, and complete CTA tracking.
- 2026-05-08: During the follow-up Gamma vs Pitch comparison checkpoint, corrected the Gamma help source link to the exact verified official article URL.

## 15. Final report

Files changed:

- `src/content/categories/ai-presentation.md`
- `.agent/AI_PRESENTATION_CATEGORY_REFRESH_EXECPLAN.md`

What improved:

- Replaced the stale April category stub with a May 8, 2026 source-backed buyer hub.
- Removed the live Tome recommendation and reframed Tome as a dead/historical product.
- Added configured mobile top picks: Gamma, Napkin AI, and Pitch.
- Updated `tool_count` from 6 to 8 to match active route behavior.
- Added clear category segmentation across full deck generators, team/business deck platforms, visual builders, and historical tools.
- Added pricing reality, what-to-avoid guidance, ranking methodology, internal links, and official sources.
- Corrected the Gamma help source URL to the exact official article verified during the presentation-guide research pass.

Mobile impact:

- The first mobile screen now surfaces freshness, editorial trust, 8 ranked tools, and three useful top-pick cards.
- Viewport QA found zero horizontal overflow at 360, 390, 430, 768, and 1024 px.

SEO impact:

- Title/meta now target "Best AI Presentation Tools" with May 2026 freshness.
- The page now has substantive crawlable buyer guidance and source links instead of thin directory copy.
- Internal links connect the category to the strengthened presentation guide, Gamma/Pitch/Beautiful.ai tool pages, and key comparison targets.

Conversion impact:

- Category CTAs are stronger because top picks map to buyer jobs, not random sorted scores.
- 11 commercial CTAs render with complete `data-cta-*` payloads: page type, placement, tool slug, category slug, destination type, and affiliate flag.
- Affiliate-enabled tools remain visible where relevant without displacing editorial winners.

Checks run:

- Focused category content gate.
- `git diff --check -- src\content\categories\ai-presentation.md .agent\AI_PRESENTATION_CATEGORY_REFRESH_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- App-browser QA for `/categories/ai-presentation/`
- External Playwright viewport QA at 360, 390, 430, 768, and 1024 px.

Remaining risks / next steps:

- Several presentation comparison pages are still thin and stale. Highest impact next target is `src/content/comparisons/beautiful-ai-vs-pitch.md` or `src/content/comparisons/decktopus-vs-pitch.md`.
- Tome comparison pages should likely be merged, rewritten as dead-product alternatives, or noindexed because Tome is not an active 2026 buying option.
- Gamma, Pitch, Beautiful.ai, and Prezi tool pages still contain some older body verification language and should be refreshed in later Tier 1 tool checkpoints.
