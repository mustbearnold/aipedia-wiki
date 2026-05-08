# Tome Comparison Cluster Cleanup ExecPlan

## 1. Objective

Convert the Tome comparison cluster from stale active-tool head-to-head pages into honest May 8, 2026 migration pages that tell readers Tome Slides is discontinued and route them to active AI presentation alternatives.

## 2. Current state

- Routes affected:
  - `/compare/gamma-vs-tome/`
  - `/compare/beautiful-ai-vs-tome/`
  - `/compare/pitch-vs-tome/`
  - `/compare/decktopus-vs-tome/`
  - `/compare/presentations-ai-vs-tome/`
- Content files:
  - `src/content/comparisons/gamma-vs-tome.md`
  - `src/content/comparisons/beautiful-ai-vs-tome.md`
  - `src/content/comparisons/pitch-vs-tome.md`
  - `src/content/comparisons/decktopus-vs-tome.md`
  - `src/content/comparisons/presentations-ai-vs-tome.md`
- Template: `src/layouts/ComparisonLayout.astro`
- Base layout supports `noindex`, but comparison pages are all included in the sitemap and `scripts/audit-indexability.mjs` fails any sitemap URL containing meta noindex.
- Current pages present Tome as an active 2026 purchase option, with fake model names, fake context-window claims, stale pricing, and stale `as of April 2026` copy.

## 3. Target state

- Keep the pages indexable only if they become useful migration/alternative pages.
- Update `last_updated` and `last_verified` to `2026-05-08`.
- Set each `winner` to the active tool, not `depends`, because Tome Slides is no longer an active buyer option.
- Replace fake head-to-head content with:
  - Quick verdict.
  - Why Tome is not a current choice.
  - What the active tool replaces best.
  - Migration guidance for former Tome users.
  - Pricing reality for the active tool.
  - What to avoid.
  - FAQ.
  - Official/current sources.

## 4. Scope

Included:

- Rewrite all five Tome comparison markdown files.
- Add/update this ExecPlan.
- Run focused stale-claim checks, project checks, build, and representative browser/mobile QA.

Excluded:

- Changing sitemap/noindex behavior.
- Deleting comparison routes.
- Rewriting the Tome tool page, unless a build-breaking or critical low-risk correction is discovered.
- Rewriting all presentation category/tool pages again in this checkpoint.

## 5. Files likely affected

- `src/content/comparisons/gamma-vs-tome.md`
- `src/content/comparisons/beautiful-ai-vs-tome.md`
- `src/content/comparisons/pitch-vs-tome.md`
- `src/content/comparisons/decktopus-vs-tome.md`
- `src/content/comparisons/presentations-ai-vs-tome.md`
- `.agent/TOME_COMPARISON_CLUSTER_CLEANUP_EXECPLAN.md`

## 6. Data model impact

- Comparison frontmatter only.
- No new schema fields.
- `winner` moves from `depends` to the active tool slug on each page.
- `canonical_fact_table: true` remains, so the layout still exposes canonical fact tables for the active tool and Tome's dead status.

## 7. SEO impact

- Removes duplicate low-value "Which is better in 2026?" pages that pretend Tome is still active.
- Preserves useful search demand from people searching `Gamma vs Tome`, `Pitch vs Tome`, and related routes by answering the real 2026 question: what should a Tome user choose now?
- Reduces fake-fact risk and improves trust signals with current source-backed shutdown and active-tool guidance.

## 8. Conversion impact

- Redirects commercial intent away from dead Tome CTAs and toward active tools with existing tracked comparison CTAs.
- Makes the active tool the editorial winner so `ComparisonLayout` highlights the viable purchase path.
- Adds "do not buy/use Tome" guidance that should increase trust before the active-tool CTA.

## 9. Mobile UX impact

- Pages should start with the answer: Tome is not a current option; the active tool is the real choice for this workflow.
- Use short sections and bullets so mobile users can decide without reading a legacy product history.
- Check representative routes at 360, 390, 430, 768, and 1024 px for overflow.

## 10. Implementation steps

1. Verify current Tome shutdown and successor/brand status from Tome Help Center, VentureBeat, and Lightfield.
2. Verify current active-tool facts from official vendor pages.
3. Rewrite five comparison pages.
4. Run focused stale-claim/content gates.
5. Run `git diff --check`.
6. Run KPI and project checks.
7. Run build.
8. QA representative Tome routes in the app browser and required viewport widths.
9. Update final report.

## 11. Verification commands

- Focused Tome cluster gate.
- `git diff --check -- src\content\comparisons\gamma-vs-tome.md src\content\comparisons\beautiful-ai-vs-tome.md src\content\comparisons\pitch-vs-tome.md src\content\comparisons\decktopus-vs-tome.md src\content\comparisons\presentations-ai-vs-tome.md .agent\TOME_COMPARISON_CLUSTER_CLEANUP_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- App-browser QA for representative Tome comparison routes.
- External Playwright viewport QA at 360, 390, 430, 768, and 1024 px.

## 12. Acceptance criteria

- No Tome comparison page recommends Tome as an active product.
- No stale Tome pricing, model, benchmark, context-window, or April 2026 active-tool framing remains.
- Each page is above the comparison quality floor and has current dates, active-tool winner, source-backed reasoning, and official/current sources.
- Existing comparison CTAs remain tracked.
- Representative routes show no horizontal overflow at required widths.

## 13. Risks and mitigations

- Risk: Five pages can become near-duplicates.
  - Mitigation: Make each page target a different migration job: Gamma for narrative/card-based decks, Beautiful.ai for Smart Slides, Pitch for team deck ops, Decktopus for fast AI deck plus microsite delivery, Presentations.AI for branded AI deck collaboration.
- Risk: Noindex would require sitemap logic and could break current indexability audits.
  - Mitigation: Rewrite useful pages first; defer noindex/sitemap migration to a dedicated technical SEO checkpoint.
- Risk: Tome shutdown sources differ on final shutdown date.
  - Mitigation: Use the official Tome Help Center's April 30, 2025 sunset date for Tome Slides and avoid unsupported April 15 claims in comparison copy.

## 14. Progress log

- 2026-05-08: Inspected the Tome comparison pages and confirmed they contain fake/stale active-product claims. Verified official Tome Help Center search result for the April 30, 2025 Tome Slides sunset, VentureBeat coverage of the Lightfield pivot, Lightfield's active CRM homepage/changelog, and current active-tool vendor pages for Gamma, Beautiful.ai, Pitch, Decktopus, and Presentations.AI.
- 2026-05-08: Rewrote all five Tome comparison pages as current migration pages. Each page now uses `last_updated: 2026-05-08`, `last_verified: 2026-05-08`, an active-tool `winner`, the official Tome Slides sunset date of April 30, 2025, visible May 8, 2026 verification language, active-tool pricing guidance, "What To Avoid" guidance, FAQ, and current source links.
- 2026-05-08: Focused Tome cluster gate passed. Word counts: `gamma-vs-tome` 1329, `beautiful-ai-vs-tome` 1201, `pitch-vs-tome` 1158, `decktopus-vs-tome` 1076, `presentations-ai-vs-tome` 1074. The gate confirmed current dates, active winners, required Tome shutdown language, visible verification text, and absence of stale/fake claims such as `GPT-5.3`, `Gemini 3.1 Pro`, `Claude Sonnet 4.6`, `128K`, `200K tokens`, `1M tokens`, `Narrative AI v2.1`, `Design Automation Engine`, `Tome 2.5`, `Decktopus 3.2`, `designforonline`, and `nxcode`.
- 2026-05-08: `git diff --check` passed for the five Tome comparison files and this ExecPlan, with only repository CRLF warnings.
- 2026-05-08: `node scripts/audit-site-kpis.mjs --json` passed. Comparison thin-risk count dropped to 188 after this cluster.
- 2026-05-08: `npm run test:scripts` passed 16/16.
- 2026-05-08: `npm run check` passed, including content guard, stale fact guard, guide pick audit, font policy, internal links, news cross-reference check, and npm audit.
- 2026-05-08: `npm run build:fast` passed. The build generated 905 pages, and indexability plus commercial CTA audits passed.
- 2026-05-08: App-browser QA passed for all five Tome routes. Each route had the expected title, canonical URL, one H1, required current shutdown/current-verification sections, no banned stale claims, 3 comparison CTAs, and 0 missing CTA tracking payloads.
- 2026-05-08: External Playwright viewport QA passed for all five Tome routes at 360, 390, 430, 768, and 1024 px. Each route returned 200, had the expected title/canonical/H1, showed the active editorial pick plus Tome's historical/discontinued status near the top, had no horizontal overflow, no banned stale claims, 3 tracked comparison CTAs, and 0 missing CTA payloads.

## 15. Final report

Changed files:

- `src/content/comparisons/gamma-vs-tome.md`
- `src/content/comparisons/beautiful-ai-vs-tome.md`
- `src/content/comparisons/pitch-vs-tome.md`
- `src/content/comparisons/decktopus-vs-tome.md`
- `src/content/comparisons/presentations-ai-vs-tome.md`
- `.agent/TOME_COMPARISON_CLUSTER_CLEANUP_EXECPLAN.md`

What shipped:

- Converted five stale Tome head-to-head pages into honest May 8, 2026 migration pages.
- Removed fake active-product claims, fake model/context-window language, stale April 2026 framing, and unsupported pricing language.
- Made the active tool the clear editorial winner on every page while preserving searchable comparison demand.
- Kept existing tracked comparison CTAs working and routed commercial intent away from dead Tome workflows.

Verification:

- Focused Tome cluster gate: passed.
- `git diff --check`: passed with CRLF warnings only.
- `node scripts/audit-site-kpis.mjs --json`: passed.
- `npm run test:scripts`: passed 16/16.
- `npm run check`: passed.
- `npm run build:fast`: passed.
- App-browser QA: passed for all five Tome comparison routes.
- External viewport QA: passed at 360, 390, 430, 768, and 1024 px.

Remaining risk:

- The Tome tool page itself still has older verification language and should be refreshed in a later dead-tool cleanup checkpoint.
- Noindex/sitemap support for pages that should not remain indexable still needs a dedicated technical SEO checkpoint.
