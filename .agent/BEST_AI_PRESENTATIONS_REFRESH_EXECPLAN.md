# Best AI For Presentations Refresh ExecPlan

## 1. Objective

Rebuild `src/content/use-cases/best-ai-for-presentations.md` into a current May 8, 2026 buyer guide for high-intent presentation-tool searches. The goal is to improve organic ranking potential, mobile-first decision clarity, source-backed trust, and qualified commercial clicks from a thin/stale guide page.

## 2. Current state

- Route: `/guides/best-ai-for-presentations/`
- Template: `src/pages/guides/[slug].astro` renders use-case content through `src/layouts/GuideLayout.astro`.
- Data model: `src/content.config.ts` supports `tools_mentioned` and `guide_picks` for best overall, budget, and pro/team guide decision cards.
- Current content file: `src/content/use-cases/best-ai-for-presentations.md`
- Current issues:
  - The guide is about 798 words, below the 850-word use-case quality floor and thin for a money query.
  - Visible copy still says "as of April 2026" and cites April verification language despite a May last-verified date.
  - It relies on weak secondary sources and a YouTube link instead of current official vendor sources.
  - It includes unsupported volatile claims about model versions, Gamma "Version 2.1", Veo clips, Gemini model availability, and Synthesia video-model internals.
  - The buyer set is too narrow: Gamma, Gemini, and Synthesia miss presentation-specific tools already in the repo such as Canva, Pitch, Beautiful.ai, Prezi, Presentations.AI, Napkin AI, and Decktopus.
  - It does not clearly answer which tool to buy for prompt-to-deck speed, free/budget use, team collaboration, polished business decks, video/storytelling presentations, or visual diagrams.

## 3. Target state

- The first mobile screen should use `GuideLayout` decision cards to show:
  - Best overall: Gamma for prompt-to-deck speed and multi-format deck/doc/web output.
  - Budget/free pick: Canva for non-designers who need a generous free tier and broad presentation templates.
  - Pro/team pick: Pitch or Beautiful.ai depending on current source verification and buyer value.
- The body should give a crawlable decision flow:
  - Quick verdict.
  - Winner by use case.
  - Ranked picks with best plan, price, why it wins, when to avoid it, and best alternative.
  - Pricing/plan guidance.
  - A "do not waste money" section.
  - Methodology and sources verified on May 8, 2026.
  - FAQ and internal links to category, tool pages, and key comparisons.
- All volatile facts must be verified against current official/vendor sources as of 2026-05-08.

## 4. Scope

Included:

- Rewrite `src/content/use-cases/best-ai-for-presentations.md`.
- Update metadata, `tools_mentioned`, `guide_picks`, `last_updated`, `last_verified`, sources, internal links, and visible verification language.
- Update `src/data/source-registry.json` only if a needed current source is missing or mislabeled.
- Use existing `GuideLayout` and CTA tracking rather than changing templates unless QA exposes a critical obvious bug.

Excluded:

- Rebuilding the whole guide template.
- Updating every presentation tool page unless the guide needs a critical current fact from a stale record.
- Creating new presentation comparison pages in this checkpoint.

## 5. Files likely affected

- `src/content/use-cases/best-ai-for-presentations.md`
- `src/data/source-registry.json` if new official sources are needed.
- `.agent/BEST_AI_PRESENTATIONS_REFRESH_EXECPLAN.md`

## 6. Data model impact

- Uses existing `tools_mentioned` ordering to control the ranked guide list and CTA rows.
- Uses existing `guide_picks` to control mobile-first buyer decision cards.
- No schema changes expected.
- Affiliate/CTA tracking should remain handled by `GuideLayout` and `CommercialCTA`.

## 7. SEO impact

- Replace generic April title/description with May 2026 buyer-intent metadata.
- Add original decision value: use-case winners, plan guidance, avoid guidance, and official source citations.
- Strengthen internal links to `/categories/ai-presentation/`, relevant tool pages, and comparison pages.
- Keep canonical handled by `BaseLayout` through the current route.

## 8. Conversion impact

- Stronger guide pick CTAs for buyer personas, using current tool data and official/fallback links.
- Include Prezi if it remains a credible presentation-specific pick because it has an approved affiliate link, but do not force it into a top slot unless editorially justified.
- Add honest "do not buy" guidance to improve trust and click quality.

## 9. Mobile UX impact

- Use the existing mobile-first guide decision card module instead of making a wide comparison table primary.
- Keep ranking rows short, scannable, and CTA-friendly.
- Body tables, if any, must be compact and not required for the primary mobile decision.
- QA at 360, 390, 430, 768, and 1024 px must show no horizontal document overflow.

## 10. Implementation steps

1. Verify current official sources for Gamma, Canva, Pitch, Beautiful.ai, Prezi, Presentations.AI, Napkin AI, Decktopus, and any Google/Synthesia mention retained.
2. Decide the final ranked set and top three guide picks based on source-backed buyer fit, not affiliate availability.
3. Rewrite the guide with May 8, 2026 verification language and remove unsupported model/version claims.
4. Update source registry only for missing official source IDs.
5. Run focused content and stale-string gates.
6. Run relevant checks and build.
7. QA `/guides/best-ai-for-presentations/` in the app browser and at required viewport widths.
8. Record final checkpoint results here.

## 11. Verification commands

- Focused content gate for word count, required sections, May 8 language, official sources, and stale-string removal.
- Source registry JSON parse/check if edited.
- `git diff --check -- src\content\use-cases\best-ai-for-presentations.md src\data\source-registry.json .agent\BEST_AI_PRESENTATIONS_REFRESH_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- App-browser QA for `/guides/best-ai-for-presentations/`
- External Playwright viewport QA at 360, 390, 430, 768, and 1024 px.

## 12. Acceptance criteria

- Guide body is above 1,200 words and gives real buyer decision value.
- `last_updated` and `last_verified` are `2026-05-08`.
- No stale April framing or unsupported model/version claims remain.
- Top guide picks and ranked list are backed by official current sources.
- Mobile top decision cards answer best overall, budget/free, and pro/team.
- Commercial CTAs are tracked with guide page slug, tool slug, placement, destination, affiliate flag, and sticky flag where applicable.
- Checks and build pass, or failures are documented with exact cause.

## 13. Risks and mitigations

- Risk: Current vendor pages may hide details behind client-rendered or region-specific pricing.
  - Mitigation: Use official visible pricing pages and avoid overclaiming exact limits where not publicly stable.
- Risk: Presentation tools overlap with general design tools, making rankings fuzzy.
  - Mitigation: Rank by buyer use case and explain who should not buy each tool.
- Risk: Prezi affiliate link could bias recommendations.
  - Mitigation: Mention affiliate status only through site disclosure mechanics; editorial top picks must follow fit and current evidence.

## 14. Progress log

- 2026-05-08: Selected this checkpoint after Figma/Lovable because `best-ai-for-presentations` is a high-intent money guide below the use-case quality floor and contains stale/unsupported volatile facts.
- 2026-05-08: Verified current official sources for Gamma, Canva, Pitch, Beautiful.ai, Prezi, Decktopus, Presentations.AI, Napkin AI, and Gemini in Slides.
- 2026-05-08: Rebuilt `src/content/use-cases/best-ai-for-presentations.md` around buyer use cases, current plan guidance, "do not waste money" warnings, official sources, and mobile-first guide picks.
- 2026-05-08: Focused content gate passed: 2,928 body words, required buyer sections present, May 8 language present, stale April/model/version claims absent.
- 2026-05-08: KPI audit passed and reduced use-case thin risk from 42 to 41 pages.
- 2026-05-08: `npm run test:scripts`, `npm run check`, and `npm run build:fast` passed.
- 2026-05-08: App-browser QA passed for `/guides/best-ai-for-presentations/`: correct title, canonical, one H1, required buyer sections visible, stale strings absent, and 11 commercial CTAs with complete tracking attributes.
- 2026-05-08: External viewport QA passed at 360, 390, 430, 768, and 1024 px: route 200, no horizontal document overflow, required content present, stale strings absent, and CTA tracking complete.

## 15. Final report

Files changed:

- `src/content/use-cases/best-ai-for-presentations.md`
- `.agent/BEST_AI_PRESENTATIONS_REFRESH_EXECPLAN.md`

What improved:

- Replaced a thin, stale April guide with a May 8, 2026 source-backed buyer guide.
- Expanded from 3 picks to 8 relevant presentation workflows: Gamma, Canva, Pitch, Beautiful.ai, Prezi, Decktopus, Presentations.AI, and Napkin AI.
- Removed unsupported model/version claims and weak secondary-source framing.
- Added quick verdict, winner-by-use-case table, plan guidance, buyer watch-outs, do-not-waste-money section, methodology, FAQ, official sources, and stronger related internal links.

Mobile impact:

- Existing `GuideLayout` now shows decision cards for best overall, budget/free, and pro/team using current guide picks.
- Viewport QA found no horizontal overflow at 360, 390, 430, 768, or 1024 px.

SEO impact:

- Title/meta now target May 2026 buyer intent instead of generic/stale April language.
- Use-case word count increased to 2,928 body words, removing the page from the use-case thin-risk bucket.
- Official sources and internal links improve trust, crawlable depth, and topical coverage for the AI presentation cluster.

Conversion/revenue impact:

- The guide now routes buyers by intent: prompt-to-deck, budget/free, team workflow, polished business decks, storytelling/video, sales proposals, low annual billing, and slide visuals.
- Prezi is included transparently as the monetized affiliate opportunity only where its product fit is real.
- Browser QA confirmed 11 commercial CTAs have complete guide tracking payloads.

Checks run:

- Focused content gate for word count, required sections, May 8 language, and stale-string removal.
- `git diff --check -- src\content\use-cases\best-ai-for-presentations.md .agent\BEST_AI_PRESENTATIONS_REFRESH_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- App-browser QA for `/guides/best-ai-for-presentations/`
- External Playwright viewport QA at 360, 390, 430, 768, and 1024 px.

Remaining risks / next steps:

- The canonical tool pages for Gamma, Canva, Pitch, and Beautiful.ai still contain older April-style verification language in their body copy. They should be refreshed in later tool-page checkpoints because this guide now depends on them commercially.
- The AI Presentation category page still looks weaker than this guide and should be rebuilt as a category buying hub.
- Several presentation comparisons remain thin, especially `decktopus-vs-pitch`, `beautiful-ai-vs-pitch`, `gamma-vs-tome`, and older Tome comparisons that may deserve noindex/merge treatment because Tome is dead.
