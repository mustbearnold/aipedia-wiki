# Decktopus vs Pitch Comparison Refresh ExecPlan

## 1. Objective

Rebuild `src/content/comparisons/decktopus-vs-pitch.md` into a current May 8, 2026 buyer comparison for people choosing between fast AI deck generation and a collaborative team presentation platform.

## 2. Current state

- Route: `/compare/decktopus-vs-pitch/`
- Content file: `src/content/comparisons/decktopus-vs-pitch.md`
- Template: `src/layouts/ComparisonLayout.astro`
- Current body is about 500 words and below the 700-word comparison floor.
- Metadata says "as of April 2026" despite frontmatter dates of May 5.
- The page contains unsupported claims about Decktopus 3.0, GPT-5.3, Pitch 8.2, Gemini 3.1 Pro, 128K/2M token context windows, and wrong Pitch pricing.
- Sources include local tool files and weak secondary links instead of current official vendor pages.

## 3. Target state

- Update frontmatter to `last_updated: 2026-05-08` and `last_verified: 2026-05-08`.
- Keep `winner: depends`, because Decktopus wins fast AI deck generation and interactive lead-capture/microsite workflows, while Pitch wins collaborative deck production, external sharing, analytics, guests, and pitch rooms.
- Rebuild the body above 1,000 words with:
  - Quick verdict.
  - Winner by use case.
  - Where Decktopus wins.
  - Where Pitch wins.
  - Pricing and plan guidance.
  - Buyer recommendations.
  - What to avoid.
  - FAQ.
  - Official sources.
- Remove unsupported model, token-window, and fake benchmark claims.

## 4. Scope

Included:

- Modify `src/content/comparisons/decktopus-vs-pitch.md`.
- Add and update this ExecPlan.
- Run focused gates, project checks, app-browser QA, and viewport QA.

Excluded:

- Rewriting the Decktopus or Pitch tool pages.
- Changing the comparison layout.
- Cleaning Tome pages in this checkpoint.

## 5. Files likely affected

- `src/content/comparisons/decktopus-vs-pitch.md`
- `.agent/DECKTOPUS_PITCH_COMPARISON_REFRESH_EXECPLAN.md`

## 6. Data model impact

- Existing comparison frontmatter only.
- Keep `canonical_fact_table: true`.
- No schema, affiliate, source registry, or analytics model changes.

## 7. SEO impact

- Improves a thin high-intent comparison page in the AI presentation cluster.
- Replaces fake model/context-window content with source-backed buyer guidance.
- Adds useful internal links to `/categories/ai-presentation/`, `/guides/best-ai-for-presentations/`, and the canonical tool pages.

## 8. Conversion impact

- Clarifies the right click:
  - Decktopus for fast AI-generated decks, branded slide generation, PDF imports, forms, voice recording, analytics, embeds, custom domains, and microsite-style sharing.
  - Pitch for team deck operations, guests, advanced links, pitch rooms, custom domains, analytics, PowerPoint exports, and collaboration.
- Existing `ComparisonLayout` CTAs should continue tracking comparison cards and use-case winner CTA.

## 9. Mobile UX impact

- Body should use short scannable sections instead of relying on a wide comparison table.
- Viewport QA must check 360, 390, 430, 768, and 1024 px for overflow.

## 10. Implementation steps

1. Verify current official Decktopus and Pitch sources on 2026-05-08.
2. Rewrite comparison body and metadata.
3. Run focused stale-claim gate.
4. Run `git diff --check`.
5. Run KPI and project checks.
6. QA `/compare/decktopus-vs-pitch/` in the app browser.
7. Run viewport QA at required widths.
8. Update final report.

## 11. Verification commands

- Focused comparison gate.
- `git diff --check -- src\content\comparisons\decktopus-vs-pitch.md .agent\DECKTOPUS_PITCH_COMPARISON_REFRESH_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- App-browser QA for `/compare/decktopus-vs-pitch/`
- External Playwright viewport QA at 360, 390, 430, 768, and 1024 px.

## 12. Acceptance criteria

- Body is above 1,000 words.
- Current May 8 dates in frontmatter and visible copy.
- No April framing, fake model claims, token-window claims, or stale pricing remain.
- Official source list only.
- CTA tracking complete.
- No horizontal overflow at required widths.

## 13. Risks and mitigations

- Risk: Decktopus has presentation, microsite, lead capture, and team branding features, so it should not be reduced to a "simple solo generator."
  - Mitigation: Frame it as fast AI generation plus interactive delivery, while still separating it from Pitch's deeper team deck operations.
- Risk: Pricing pages can expose monthly/annual pricing with different labels.
  - Mitigation: State billing context plainly and point readers to current vendor pricing pages before purchase.
- Risk: This page may overstate AI model specifics.
  - Mitigation: Avoid model names and context-window claims unless an official source states them.

## 14. Progress log

- 2026-05-08: Selected this checkpoint after Beautiful.ai vs Pitch because `decktopus-vs-pitch` is thin, commercially relevant, and contains unsupported model/context-window claims plus stale Pitch pricing.
- 2026-05-08: Verified current official sources. Decktopus pricing lists Pro at $14.99/month billed annually, Business at $34.99/user/month billed annually, Enterprise custom, AI credits, AI presentation generation, AI image generation, PDF export, custom domain, slide analytics, webhook, team/organization, and enterprise branded slide controls. Decktopus product pages also describe prompt-to-branded presentations, brand colors/fonts/logos, regenerate slide, pasted-text conversion, custom templates, Zapier, Q&A, AI images, scripts, PDF transformation, forms, embeds, analytics, voice recording, mobile-responsive microsites, and collaboration. Pitch pricing and AI pages list Free/Plus/Team/Business/Enterprise, AI credits, guest limits, custom fonts, PowerPoint exports, advanced links, pitch rooms, custom domains, co-presenting, roles, version history, analytics, and AI actions for writing, tone, proofreading, image enhancement, and on-brand deck generation.
- 2026-05-08: Rebuilt `src/content/comparisons/decktopus-vs-pitch.md` as a 2,098-word buyer comparison with May 2026 metadata, official sources, pricing guidance, winner-by-use-case logic, buyer recommendations, what-to-avoid guidance, FAQ, and presentation-cluster internal links.
- 2026-05-08: Verification passed: focused stale-claim gate, `git diff --check`, `node scripts/audit-site-kpis.mjs --json`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, app-browser QA, and external Playwright viewport QA at 360, 390, 430, 768, and 1024 px.

## 15. Final report

Changed files:

- `src/content/comparisons/decktopus-vs-pitch.md`
- `.agent/DECKTOPUS_PITCH_COMPARISON_REFRESH_EXECPLAN.md`

Behavior shipped:

- Replaced a thin, stale comparison with a current May 8, 2026 buyer decision page.
- Removed unsupported Decktopus 3.0, GPT-5.3, Pitch 8.2, Gemini 3.1 Pro, 128K/2M context-window, stale pricing, and weak secondary source claims from the public content.
- Preserved `winner: depends` while making the buyer split clear: Decktopus for fast AI decks and interactive/microsite-style delivery; Pitch for collaboration, guests, analytics, advanced links, pitch rooms, and team deck workflows.
- Kept existing `ComparisonLayout` tracked CTAs working: 3 comparison CTAs rendered with complete `data-cta-*` payloads and `data-compare-cta` markers.

Verification passed:

- Focused comparison gate: word count, current dates, required buyer sections, official source list, and banned stale strings.
- `git diff --check -- src\content\comparisons\decktopus-vs-pitch.md .agent\DECKTOPUS_PITCH_COMPARISON_REFRESH_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- App-browser QA for `/compare/decktopus-vs-pitch/`: title, canonical, H1, current sections, stale-claim absence, and CTA payloads.
- External viewport QA at 360, 390, 430, 768, and 1024 px: route 200, title/canonical/H1 correct, no horizontal overflow, 3 tracked CTAs complete, and first-screen decision text present.

Remaining risks:

- Decktopus and Pitch pricing or plan limits can change, so this page should remain on quarterly refresh or faster if either vendor changes pricing.
- The broader presentation comparison cluster still contains stale Tome pages that may hurt crawl quality until noindexed, merged, deleted, or rewritten as discontinued-tool migration pages.

Recommended next task:

- Clean the Tome comparison cluster. At minimum, stop indexable pages from recommending Tome as an active 2026 purchase path; ideally rewrite the strongest Tome pages as migration/alternative pages or noindex the weak duplicates.
