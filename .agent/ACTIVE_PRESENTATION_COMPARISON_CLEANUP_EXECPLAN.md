# Active Presentation Comparison Cleanup ExecPlan

## 1. Objective

Refresh the remaining active presentation comparison pocket so AiPedia's presentation cluster no longer mixes current pages with stale April 2026 pages, fake model labels, thin pricing guidance, or weak buyer recommendations.

## 2. Current state

- Affected routes:
  - `/compare/beautiful-ai-vs-decktopus/`
  - `/compare/beautiful-ai-vs-gamma/`
  - `/compare/decktopus-vs-gamma/`
- Affected files:
  - `src/content/comparisons/beautiful-ai-vs-decktopus.md`
  - `src/content/comparisons/beautiful-ai-vs-gamma.md`
  - `src/content/comparisons/decktopus-vs-gamma.md`
- Current issues:
  - Metadata still says `as of April 2026`.
  - Two pages are below the 700-word comparison quality floor.
  - Beautiful.ai vs Decktopus uses fake product/model names like `Design AI v3.2` and `Slide AI v2.8`.
  - Beautiful.ai vs Gamma cites low-value third-party ranking pages instead of official vendor sources.
  - Pricing and plan advice is too shallow for buyer decision pages.

## 3. Target state

- All three pages use `last_updated: 2026-05-08` and `last_verified: 2026-05-08`.
- All three pages include current, official-source-backed buyer guidance:
  - Beautiful.ai vs Decktopus: Beautiful.ai for brand-governed team decks; Decktopus for fast interactive presentation delivery.
  - Beautiful.ai vs Gamma: Gamma for multi-format content and fast drafts; Beautiful.ai for controlled brand decks.
  - Decktopus vs Gamma: Gamma for most deck/doc/web buyers; Decktopus for interactive delivery, forms, analytics, and presentation funnels.
- Remove fake model names, unsupported pricing claims, and stale third-party sources.
- Preserve tracked comparison CTAs from `ComparisonLayout`.

## 4. Scope

Included:

- Rewrite three comparison markdown files.
- Update this ExecPlan.
- Run focused gates, `git diff --check`, KPI audit, scripts tests, project check, build, app-browser QA, and viewport QA.

Excluded:

- Tool page rewrites.
- Broad comparison layout changes, except for critical template issues discovered during required QA. The mobile decision hero and mobile facts-card work is tracked separately in `.agent/COMPARISON_MOBILE_DECISION_HERO_EXECPLAN.md`.
- Noindex/sitemap work.

## 5. Files likely affected

- `src/content/comparisons/beautiful-ai-vs-decktopus.md`
- `src/content/comparisons/beautiful-ai-vs-gamma.md`
- `src/content/comparisons/decktopus-vs-gamma.md`
- `.agent/ACTIVE_PRESENTATION_COMPARISON_CLEANUP_EXECPLAN.md`

## 6. Data model impact

- Comparison frontmatter only.
- `canonical_fact_table: true` remains unchanged.
- No new schema fields.
- Winner fields may be set to the active default when the decision is clear.

## 7. SEO impact

- Improves three commercial comparison routes with current May 2026 titles, meta descriptions, and official sources.
- Removes fake product/model labels and stale third-party citations.
- Reduces thin-page risk in the comparison collection.

## 8. Conversion impact

- Adds plan and workflow guidance that routes buyers to the best-fit CTA instead of generic "which is better" content.
- Maintains tracked comparison CTAs and commercial disclosure behavior from the shared layout.

## 9. Mobile UX impact

- First mobile screen should show the editorial winner and key use-case split through the shared comparison hero.
- Markdown sections must be short and scannable, with Quick Verdict, Winner By Use Case, Pricing And Plan Guidance, What To Avoid, and FAQ.
- Viewport QA must cover 360, 390, 430, 768, and 1024 px with no overflow.

## 10. Implementation steps

1. Use the May 8, 2026 official source set already verified in the preceding presentation checkpoints.
2. Rewrite the three comparison pages.
3. Run focused content/stale-claim gates.
4. Run `git diff --check`.
5. Run KPI audit, scripts tests, project check, and fast build.
6. QA routes in the app browser and required viewport widths.
7. Update final report.

## 11. Verification commands

- Focused active presentation comparison gate.
- `git diff --check -- src\content\comparisons\beautiful-ai-vs-decktopus.md src\content\comparisons\beautiful-ai-vs-gamma.md src\content\comparisons\decktopus-vs-gamma.md .agent\ACTIVE_PRESENTATION_COMPARISON_CLEANUP_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- App-browser QA for refreshed routes.
- External Playwright viewport QA at 360, 390, 430, 768, and 1024 px.

## 12. Acceptance criteria

- All three pages exceed 700 words.
- All three pages use May 8, 2026 verification dates and visible current verification language.
- No stale/fake terms remain: `as of April 2026`, `Design AI v3.2`, `Slide AI v2.8`, `NxCode`, `GPT-5.3`, `Gemini 3.1 Pro`, `Claude Sonnet 4.6`.
- Official source links replace weak third-party ranking links.
- Existing comparison CTAs remain tracked.
- Build and checks pass.

## 13. Risks and mitigations

- Risk: Gamma exact pricing is not visible in static extraction from its official pricing page.
  - Mitigation: Use plan names and feature differences verified from the official page, and avoid exact Gamma price claims in new copy.
- Risk: The pages overlap with the just-refreshed Presentations.AI cluster.
  - Mitigation: Keep each page scoped to its unique buyer decision: brand governance vs interactive delivery, brand governance vs multi-format publishing, and interactive delivery vs multi-format publishing.

## 14. Progress log

- 2026-05-08: Inspected all three files and confirmed stale April 2026 metadata, thin buyer guidance, fake product/model labels, and weak sources. Reused current official source set verified for Beautiful.ai, Decktopus, and Gamma during adjacent May 8 presentation comparison checkpoints.
- 2026-05-08: Rewrote `beautiful-ai-vs-decktopus`, `beautiful-ai-vs-gamma`, and `decktopus-vs-gamma` with May 8, 2026 verification dates, official sources, clear buyer verdicts, plan guidance, avoid guidance, and FAQ sections.
- 2026-05-08: Focused content gate passed: word counts 1352, 1293, and 1324; no stale/fake terms remained.
- 2026-05-08: `git diff --check`, KPI audit, `npm run test:scripts`, `npm run check`, and `npm run build:fast` passed.
- 2026-05-08: App-browser QA passed after the shared comparison template fix: titles/canonicals/H1s correct, required sections present, no banned stale terms, 4 tracked comparison CTAs per page, and 0 missing CTA payload fields.
- 2026-05-08: External viewport QA passed at 360, 390, 430, 768, and 1024 px after the shared mobile facts-card fix: no overflow, hero CTA visible, decision module before VS banner, mobile fact cards through 820 px, desktop fact table at 1024 px.

## 15. Final report

Implemented.

Changed files:

- `src/content/comparisons/beautiful-ai-vs-decktopus.md`
- `src/content/comparisons/beautiful-ai-vs-gamma.md`
- `src/content/comparisons/decktopus-vs-gamma.md`
- `.agent/ACTIVE_PRESENTATION_COMPARISON_CLEANUP_EXECPLAN.md`

Related template checkpoint:

- `.agent/COMPARISON_MOBILE_DECISION_HERO_EXECPLAN.md`
- `src/layouts/ComparisonLayout.astro`
- `src/components/comparison/ComparisonFactTable.astro`
- `src/styles/t2-canvas.css`
- `src/styles/compare-home-cards.css`
- `scripts/audit-commercial-cta.mjs`
- `tests/scripts/audit-commercial-cta.test.mjs`
- `tests/scripts/comparison-layout-mobile-decision.test.mjs`

What shipped:

- Three active presentation comparison pages now use current official-source-backed May 8, 2026 buyer guidance.
- Shared comparison pages now show the decision and tracked hero CTA before decorative compare assets.
- Canonical facts now render as mobile/tablet cards instead of a wide table through 820 px.

Verification:

- Focused active presentation comparison gate passed.
- `git diff --check` passed with CRLF warnings only.
- `node scripts/audit-site-kpis.mjs --json` passed before the template checkpoint; comparison thin-risk dropped to 183.
- `node --test tests/scripts/comparison-layout-mobile-decision.test.mjs` passed.
- `node --test tests/scripts/audit-commercial-cta.test.mjs` passed.
- `npm run test:scripts` passed, 19/19.
- `npm run check` passed.
- `npm run build:fast` passed; 905 pages built; indexability and commercial CTA audits passed.
- App-browser and external viewport QA passed for the three refreshed routes.

Remaining risk:

- Gamma pricing still avoids exact dollar claims where official static extraction did not expose prices. Continue using official Gamma checkout/pricing pages for any future exact pricing update.
