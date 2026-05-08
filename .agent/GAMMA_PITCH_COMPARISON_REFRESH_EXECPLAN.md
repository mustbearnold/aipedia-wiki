# Gamma vs Pitch Comparison Refresh ExecPlan

## 1. Objective

Rebuild `src/content/comparisons/gamma-vs-pitch.md` into a current May 8, 2026 buyer comparison for the AI presentation cluster. The goal is to convert traffic from the refreshed `/categories/ai-presentation/` page into a trustworthy decision between the default prompt-to-deck winner and the team collaboration winner.

## 2. Current state

- Route: `/compare/gamma-vs-pitch/`
- Content file: `src/content/comparisons/gamma-vs-pitch.md`
- Route implementation: `src/pages/compare/[slug].astro`
- Template: `src/layouts/ComparisonLayout.astro`
- Data model: comparison frontmatter supports `tools`, `winner`, `last_updated`, `last_verified`, and `canonical_fact_table`.
- Current issues:
  - Body is only about 477 words, well below the 700-word comparison quality floor.
  - Metadata says "as of April 2026" despite May frontmatter.
  - It contains unsupported/fake volatile model claims such as "Gamma 2.0", "Pitch 3.5", "Claude Sonnet 4.6 integration", "Gemini 3.1 Pro backbone", and token-window claims.
  - It cites secondary/weak sources instead of current official Gamma and Pitch sources.
  - Pricing claims are stale or incorrect for Pitch, including "Pro $20" and "Enterprise $100/user/month".
  - It does not answer the most important buyer distinction: fast solo prompt-to-deck versus team deck operations.

## 3. Target state

- Update `last_updated` and `last_verified` to `2026-05-08`.
- Keep `winner: depends`, because Gamma wins for most solo/fast-deck use cases and Pitch wins for team workflows.
- Rewrite body above 1,000 words with:
  - Quick verdict.
  - Winner by use case.
  - Mobile-friendly decision snapshot.
  - Where Gamma wins.
  - Where Pitch wins.
  - Pricing and plan guidance.
  - Buyer recommendations.
  - What to avoid.
  - FAQ.
  - Official source list.
- Remove unsupported model/version/token claims entirely.
- Use official sources checked on 2026-05-08:
  - `https://gamma.app/ai-presentation-maker`
  - `https://gamma.app/pricing`
  - `https://pitch.com/pricing/us`
  - `https://pitch.com/ai-presentation-maker`

## 4. Scope

Included:

- Modify `src/content/comparisons/gamma-vs-pitch.md`.
- Update this ExecPlan.
- Verify the page in the browser and at mobile widths.

Excluded:

- Rewriting Gamma or Pitch tool pages in this checkpoint.
- Rewriting other presentation comparisons in this checkpoint.
- Changing `ComparisonLayout.astro` unless QA exposes a critical obvious bug.

## 5. Files likely affected

- `src/content/comparisons/gamma-vs-pitch.md`
- `.agent/GAMMA_PITCH_COMPARISON_REFRESH_EXECPLAN.md`
- `src/content/categories/ai-presentation.md` only for the Gamma source-link correction found during this checkpoint.

## 6. Data model impact

- Uses existing comparison frontmatter only.
- Keeps `canonical_fact_table: true` so tool facts still render under the editorial comparison body.
- No schema changes.
- No affiliate data changes.

## 7. SEO impact

- Replaces thin April comparison copy with a current May 2026 page targeting "Gamma vs Pitch".
- Removes unsupported model claims and weak sources that hurt trust.
- Adds buyer-intent sections and internal links to the AI Presentation category, full guide, and canonical tool pages.
- Canonical URL remains handled by the existing route and layout.

## 8. Conversion impact

- Comparison cards and use-case winner CTAs remain handled by `ComparisonLayout` and `CommercialCTA`.
- The body should guide users toward Gamma for fast individual generation and Pitch for teams needing analytics, guests, presentation rooms, custom domains, or collaboration.
- CTA quality improves because the editorial copy now explains why each click is appropriate.

## 9. Mobile UX impact

- The first mobile screen should show the comparison title, verification, compared tool cards, and layout-generated use-case winner cards.
- Body content should avoid a wide table as the sole decision surface.
- Any table should be short enough to fit, with surrounding prose carrying the decision.
- QA must check 360, 390, 430, 768, and 1024 px for overflow.

## 10. Implementation steps

1. Inspect current comparison, route, and layout behavior.
2. Verify current official Gamma and Pitch sources as of 2026-05-08.
3. Rewrite the comparison with source-backed buyer guidance.
4. Run focused comparison gate for word count, current date, required buyer sections, official sources, and banned stale claims.
5. Run `git diff --check` for touched files.
6. Run KPI and project checks.
7. QA `/compare/gamma-vs-pitch/` in the app browser.
8. Run viewport QA at 360, 390, 430, 768, and 1024 px.
9. Update this ExecPlan with final results.

## 11. Verification commands

- Focused comparison content gate.
- `git diff --check -- src\content\comparisons\gamma-vs-pitch.md src\content\categories\ai-presentation.md .agent\GAMMA_PITCH_COMPARISON_REFRESH_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- App-browser QA for `/compare/gamma-vs-pitch/`
- External Playwright viewport QA at 360, 390, 430, 768, and 1024 px.

## 12. Acceptance criteria

- Body is above 1,000 words.
- `last_updated` and `last_verified` are `2026-05-08`.
- No April framing, fake model/version claims, or unsupported token-window claims remain.
- Sources are current official Gamma and Pitch pages.
- The comparison gives a clear default: Gamma for fast individual prompt-to-deck; Pitch for team collaboration and analytics.
- CTA tracking remains complete on comparison cards and use-case winner CTA.
- Mobile QA finds no horizontal overflow.
- Checks and build pass, or failures are documented with exact causes.

## 13. Risks and mitigations

- Risk: Gamma pricing details can be rendered dynamically and not all exact dollar amounts are stable in static extraction.
  - Mitigation: Use official source-backed plan names and feature limits; avoid repeating exact Gamma price claims unless verified from the public page.
- Risk: The `depends` winner can feel indecisive.
  - Mitigation: State the primary decision clearly in the first paragraph: Gamma for most solo buyers, Pitch for teams.
- Risk: Existing canonical tool records have May 3 verification, not May 8.
  - Mitigation: Treat this checkpoint as the comparison's current verification and avoid updating the tool records until their own tool-page refresh.

## 14. Progress log

- 2026-05-08: Selected this checkpoint after AI Presentation category QA because `gamma-vs-pitch` is a thin, stale, high-intent comparison linked from the refreshed category page.
- 2026-05-08: Inspected the current comparison, route, and comparison layout. Confirmed the page uses layout-generated CTAs, use-case winner cards, and canonical fact table.
- 2026-05-08: Verified current official Gamma and Pitch sources. Gamma official pages support prompt-to-deck positioning, plan names, card limits, import/export support, custom branding, analytics, API, and custom-domain features. Pitch official pricing supports Free, Plus, Team, and Business plans, AI credits, member limits, external guests, advanced links, pitch rooms, custom domains, PowerPoint export, and analytics.
- 2026-05-08: Corrected `src/content/categories/ai-presentation.md` to use the actual verified Gamma help article URL instead of a plausible shortened URL.
- 2026-05-08: Rebuilt `src/content/comparisons/gamma-vs-pitch.md` as a 1,713-word buyer comparison. Removed fake model/version/token claims, stale April framing, weak secondary sources, and incorrect Pitch pricing language.
- 2026-05-08: Focused comparison gate passed: current May 8 dates, official source links, required buyer sections, 1,713 words, and banned stale strings absent.
- 2026-05-08: `git diff --check` passed for the comparison, category source correction, and ExecPlan files.
- 2026-05-08: `node scripts/audit-site-kpis.mjs --json` passed and comparison thin-risk count decreased from 196 to 195.
- 2026-05-08: `npm run test:scripts`, `npm run check`, and `npm run build:fast` passed. Build generated 905 pages and indexability/commercial CTA audits passed.
- 2026-05-08: App-browser QA passed for `/compare/gamma-vs-pitch/`: correct title, canonical, one H1, visible buyer sections, stale strings absent, and 3 tracked comparison CTAs with complete `data-cta-*` payloads.
- 2026-05-08: External viewport QA passed at 360, 390, 430, 768, and 1024 px: route 200, no horizontal overflow, correct title/canonical/H1, visible current sections, stale strings absent, and complete comparison CTA tracking.

## 15. Final report

Files changed:

- `src/content/comparisons/gamma-vs-pitch.md`
- `src/content/categories/ai-presentation.md`
- `.agent/GAMMA_PITCH_COMPARISON_REFRESH_EXECPLAN.md`

What improved:

- `gamma-vs-pitch` is now a current buyer decision page instead of a thin AI-generated comparison.
- Removed unsupported claims about Gamma/Pitch model versions, token windows, and obsolete pricing.
- Reframed the decision around actual buyer jobs: Gamma for fast solo prompt-to-deck, Pitch for team collaboration and distribution.
- Added source-backed pricing and plan guidance, buyer recommendations, avoid guidance, FAQ, and official sources.
- Corrected the Gamma help source URL in the AI Presentation category page.

Mobile impact:

- The comparison now uses layout-generated comparison cards and use-case cards, with body content written in scannable sections instead of depending on a wide table.
- Viewport QA found zero horizontal overflow at 360, 390, 430, 768, and 1024 px.

SEO impact:

- The page now targets "Gamma vs Pitch" with May 2026 freshness and deeper intent coverage.
- Body word count increased from about 477 words to 1,713 words, removing it from comparison thin-risk.
- Official source links replaced weak secondary sources.

Conversion impact:

- Editorial copy now explains the correct CTA path: Gamma for creation speed, Pitch for team presentation operations.
- 3 commercial comparison CTAs render with complete tool slug, page type, placement, comparison pair, destination type, and affiliate flag tracking.

Checks run:

- Focused comparison gate.
- `git diff --check -- src\content\comparisons\gamma-vs-pitch.md src\content\categories\ai-presentation.md .agent\GAMMA_PITCH_COMPARISON_REFRESH_EXECPLAN.md .agent\AI_PRESENTATION_CATEGORY_REFRESH_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- App-browser QA for `/compare/gamma-vs-pitch/`
- External Playwright viewport QA at 360, 390, 430, 768, and 1024 px.

Remaining risks / next steps:

- `beautiful-ai-vs-pitch.md` and `decktopus-vs-pitch.md` are still thin and still contain unsupported model/pricing claims.
- Tome comparison pages still need merge/noindex/rewrite treatment because Tome is dead and several pages present it as active.
- Gamma and Pitch tool pages still have some older body verification language from early May/April and should be refreshed in future tool-page checkpoints.
