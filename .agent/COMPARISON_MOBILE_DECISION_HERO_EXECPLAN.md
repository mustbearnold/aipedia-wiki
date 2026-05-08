# Comparison Mobile Decision Hero ExecPlan

## 1. Objective

Rebuild the top of every generated comparison page so mobile users immediately see the buying decision, winner-by-use-case signal, tracked primary CTA, disclosure where relevant, and a path to the full comparison before decorative logos or deeper score panels. This improves mobile UX, conversion, SEO usefulness, and consistency with AiPedia comparison-page doctrine.

## 2. Current state

- Route template: `src/layouts/ComparisonLayout.astro`.
- Shared CTA system: `src/components/CommercialCTA.astro` emits `data-commercial-cta` and `data-cta-*` tracking payloads.
- Shared analytics binder: `src/components/CommercialAnalytics.astro`.
- Comparison detail styling: `src/styles/t2-canvas.css` and `src/styles/compare-home-cards.css`.
- Representative CTA audit: `scripts/audit-commercial-cta.mjs` with tests in `tests/scripts/audit-commercial-cta.test.mjs`.
- Current comparison pages render correct titles/canonicals/CTAs, but the top mobile order is title/meta, versus banner, tool cards, then winner-by-use-case. This buries the decision module below the first mobile screen.

## 3. Target state

On comparison pages, the first mobile screen should show:

- H1 and verification metadata.
- A compact decision panel with verdict label and concise verdict copy.
- A winner-by-use-case preview using existing `useCaseWinnerRows`.
- A tracked primary CTA for the score leader/editorial winner with `placement="comparison_hero_winner"`.
- A secondary link to `#full-comparison`.
- Existing logo banner and detailed tool cards remain below this mobile decision module.

Desktop should keep a premium comparison feel with the decision panel and use-case cards in a two-column hero band, then the decorative versus banner and full tool cards below.

## 4. Scope

Included:

- Add one source guard test for comparison layout order and CTA placement.
- Modify `src/layouts/ComparisonLayout.astro` to render a new decision-first hero block.
- Convert the generated canonical facts block from a wide mobile table to stacked mobile/tablet cards.
- Add responsive CSS in `src/styles/t2-canvas.css` and theme overrides in `src/styles/compare-home-cards.css`.
- Tighten the commercial CTA representative audit to require `comparison_hero_winner`.
- Verify generated pages and mobile widths.

Excluded:

- Rewriting all comparison markdown content.
- Changing tool scores or pricing facts.
- Changing affiliate URLs or partner networks.

## 5. Files likely affected

- `tests/scripts/comparison-layout-mobile-decision.test.mjs`
- `tests/scripts/audit-commercial-cta.test.mjs`
- `scripts/audit-commercial-cta.mjs`
- `src/components/comparison/ComparisonFactTable.astro`
- `src/layouts/ComparisonLayout.astro`
- `src/styles/t2-canvas.css`
- `src/styles/compare-home-cards.css`
- `.agent/ACTIVE_PRESENTATION_COMPARISON_CLEANUP_EXECPLAN.md`

## 6. Data model impact

No schema or content data model changes. The new module reuses existing `winner`, `tools`, `scoreLeader`, `useCaseWinnerRows`, `ctaLabel`, affiliate, category, and comparison-pair data.

## 7. SEO impact

The primary comparison decision becomes more prominent and crawlable near the top of the HTML. Titles, descriptions, canonical URLs, breadcrumbs, and structured data stay unchanged.

## 8. Conversion impact

Adds a first-screen tracked CTA with `data-cta-placement="comparison_hero_winner"` and the existing commercial payload fields. This gives comparison pages a clear top conversion surface before users scroll into the detailed cards.

## 9. Mobile UX impact

At 360, 390, and 430 px, users should see the verdict and primary CTA before the logo banner. At 768 and desktop, the hero decision band should become a compact grid without horizontal overflow.

The canonical facts section should use stacked cards through 820 px and only use the dense table on desktop.

## 10. Implementation steps

1. Add a failing source guard test proving the decision hero must appear before `.t2-vs-banner`, use `comparison_hero_winner`, and preserve the `#full-comparison` jump link.
2. Run the focused test and confirm it fails against the current template.
3. Update `ComparisonLayout.astro` to render the decision-first hero block after header metadata and before the versus banner.
4. Add CSS for `.t2-cmp-decision-hero`, `.t2-cmp-decision-panel`, `.t2-cmp-decision-usecases`, and related mobile states.
5. Convert `ComparisonFactTable.astro` to render mobile fact cards and hide the wide table through 820 px.
6. Update the commercial CTA audit and fixture test to require `comparison_hero_winner`.
7. Run focused tests, then `npm run test:scripts`, `npm run check`, and `npm run build:fast`.
8. Re-run app-browser QA and viewport QA for the active presentation comparison routes.

## 11. Verification commands

- `node --test tests/scripts/comparison-layout-mobile-decision.test.mjs`
- `node --test tests/scripts/audit-commercial-cta.test.mjs`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- App-browser QA for `/compare/beautiful-ai-vs-decktopus/`, `/compare/beautiful-ai-vs-gamma/`, `/compare/decktopus-vs-gamma/`
- External viewport QA at 360, 390, 430, 768, and 1024 px for the same routes.

## 12. Acceptance criteria

- The decision hero is before the versus banner in source order.
- The decision hero contains a tracked `comparison_hero_winner` CTA.
- Existing comparison tool-card and use-case CTAs remain tracked.
- Canonical fact rows render as mobile/tablet cards through 820 px and as a table on desktop.
- No horizontal overflow at required mobile widths on affected routes.
- Titles, canonicals, H1s, and required content sections remain correct.
- Build and script checks pass.

## 13. Risks and mitigations

- Risk: duplicated CTAs feel pushy. Mitigation: use one concise hero CTA and keep the detailed card CTAs as comparison-specific follow-ups.
- Risk: current `winner: depends` pages pick a score leader even when editorial says split decision. Mitigation: keep the verdict text explicit as "Split decision" and present use-case rows next to the CTA.
- Risk: broad template change affects all comparison pages. Mitigation: add source guard, commercial CTA audit coverage, representative route build audit, and viewport QA.

## 14. Progress log

- 2026-05-08: App-browser QA on refreshed presentation comparisons found correct metadata/content but revealed the comparison decision module is not first-screen dominant on mobile. Created this ExecPlan before code changes.
- 2026-05-08: Added failing guard test, implemented decision-first hero before the VS banner, added `comparison_hero_winner` CTA tracking placement, updated commercial CTA audit coverage, and verified focused tests passed.
- 2026-05-08: Viewport QA then found the generated canonical fact table was still a wide mobile/tablet experience. Added a failing guard, converted the component to mobile/tablet fact cards through 820 px, kept desktop table behavior, and re-ran build plus viewport QA.

## 15. Final report

Implemented.

Changed files:

- `src/layouts/ComparisonLayout.astro`
- `src/components/comparison/ComparisonFactTable.astro`
- `src/styles/t2-canvas.css`
- `src/styles/compare-home-cards.css`
- `scripts/audit-commercial-cta.mjs`
- `tests/scripts/audit-commercial-cta.test.mjs`
- `tests/scripts/comparison-layout-mobile-decision.test.mjs`
- `.agent/COMPARISON_MOBILE_DECISION_HERO_EXECPLAN.md`

Verification:

- `node --test tests/scripts/comparison-layout-mobile-decision.test.mjs` passed.
- `node --test tests/scripts/audit-commercial-cta.test.mjs` passed.
- `git diff --check` passed with CRLF warnings only.
- `npm run test:scripts` passed, 19/19.
- `npm run check` passed.
- `npm run build:fast` passed; 905 pages built; indexability and commercial CTA audits passed.
- App-browser QA passed for `/compare/beautiful-ai-vs-decktopus/`, `/compare/beautiful-ai-vs-gamma/`, and `/compare/decktopus-vs-gamma/`: titles, canonicals, H1s, decision-before-VS ordering, stale-term guard, 4 tracked comparison CTAs, 1 hero CTA, and 0 missing CTA payload fields.
- External viewport QA passed at 360, 390, 430, 768, and 1024 px for the same routes: no overflow, hero CTA visible, decision module before VS banner, mobile fact cards visible through 820 px, desktop table visible at 1024 px.

Remaining risk:

- The hero CTA on `winner: depends` pages still points to the score leader. The copy says split decision and the use-case cards qualify the recommendation, but future work could add a split-specific internal CTA such as "Compare plans" or "Pick by workflow."
