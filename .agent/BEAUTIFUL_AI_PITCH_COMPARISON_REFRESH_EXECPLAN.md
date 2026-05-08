# Beautiful.ai vs Pitch Comparison Refresh ExecPlan

## 1. Objective

Rebuild `src/content/comparisons/beautiful-ai-vs-pitch.md` into a current May 8, 2026 buyer comparison for teams choosing between design-controlled presentations and collaborative deck operations.

## 2. Current state

- Route: `/compare/beautiful-ai-vs-pitch/`
- Content file: `src/content/comparisons/beautiful-ai-vs-pitch.md`
- Template: `src/layouts/ComparisonLayout.astro`
- Current body is about 515 words and below the 700-word comparison floor.
- It says "as of April 2026" and contains unsupported model claims such as Beautiful.ai using Gemini 3.1 Pro and Pitch using Claude Sonnet 4.6.
- Pricing is stale or wrong for Pitch, and the source list includes weak or likely non-source links.
- The page does not clearly answer the buyer question: controlled Smart Slide design system versus team collaboration, analytics, guest access, and distribution.

## 3. Target state

- Update frontmatter to `last_updated: 2026-05-08` and `last_verified: 2026-05-08`.
- Keep `winner: depends`, because Beautiful.ai wins design-control workflows and Pitch wins collaboration/distribution workflows.
- Rebuild the body above 1,000 words with:
  - Quick verdict.
  - Winner by use case.
  - Where Beautiful.ai wins.
  - Where Pitch wins.
  - Pricing and plan guidance.
  - Buyer recommendations.
  - What to avoid.
  - FAQ.
  - Official sources.
- Remove all model-version claims and stale April framing.

## 4. Scope

Included:

- Modify `src/content/comparisons/beautiful-ai-vs-pitch.md`.
- Add and update this ExecPlan.
- Run checks and browser/mobile QA.

Excluded:

- Rewriting the Beautiful.ai or Pitch tool pages.
- Changing the comparison layout.
- Rewriting other presentation comparisons in this checkpoint.

## 5. Files likely affected

- `src/content/comparisons/beautiful-ai-vs-pitch.md`
- `.agent/BEAUTIFUL_AI_PITCH_COMPARISON_REFRESH_EXECPLAN.md`

## 6. Data model impact

- Existing comparison frontmatter only.
- Keep `canonical_fact_table: true`.
- No schema, affiliate, source registry, or analytics model changes.

## 7. SEO impact

- Improves a thin high-intent comparison page in the AI presentation cluster.
- Replaces fake AI-model claims with current official feature and pricing evidence.
- Adds internal links to `/categories/ai-presentation/`, `/guides/best-ai-for-presentations/`, and canonical tool pages.

## 8. Conversion impact

- Clarifies the right click:
  - Beautiful.ai for Smart Slides, design guardrails, brand themes, PowerPoint import/export, and polished business decks.
  - Pitch for workspace collaboration, guests, advanced links, pitch rooms, custom domains, analytics, and team deck workflows.
- Existing `ComparisonLayout` CTAs should continue tracking comparison cards and use-case winner CTA.

## 9. Mobile UX impact

- Body should use short scannable sections instead of relying on a wide table.
- Viewport QA must check 360, 390, 430, 768, and 1024 px for overflow.

## 10. Implementation steps

1. Verify current official Beautiful.ai and Pitch sources on 2026-05-08.
2. Rewrite comparison body and metadata.
3. Run focused stale-claim gate.
4. Run `git diff --check`.
5. Run KPI and project checks.
6. QA `/compare/beautiful-ai-vs-pitch/` in the app browser.
7. Run viewport QA at required widths.
8. Update final report.

## 11. Verification commands

- Focused comparison gate.
- `git diff --check -- src\content\comparisons\beautiful-ai-vs-pitch.md .agent\BEAUTIFUL_AI_PITCH_COMPARISON_REFRESH_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- App-browser QA for `/compare/beautiful-ai-vs-pitch/`
- External Playwright viewport QA at 360, 390, 430, 768, and 1024 px.

## 12. Acceptance criteria

- Body is above 1,000 words.
- Current May 8 dates in frontmatter and visible copy.
- No April framing, fake model claims, or unsupported Pitch/Beautiful.ai pricing remain.
- Official source list only.
- CTA tracking complete.
- No horizontal overflow at required widths.

## 13. Risks and mitigations

- Risk: Both products overlap on AI generation and collaboration language.
  - Mitigation: Rank by buyer job: Beautiful.ai for design control, Pitch for deck operations.
- Risk: Pricing differences are nuanced by annual/monthly billing.
  - Mitigation: Use official pricing page language and identify billing assumptions.
- Risk: This comparison may imply a universal winner.
  - Mitigation: Keep `winner: depends` and state the split clearly in the first screen/body.

## 14. Progress log

- 2026-05-08: Selected this checkpoint after Gamma vs Pitch because `beautiful-ai-vs-pitch` remains one of the thinnest, most commercially relevant presentation comparisons and still carries unsupported model/pricing claims.
- 2026-05-08: Verified current official Beautiful.ai and Pitch sources. Beautiful.ai supports Smart Slides, staged AI workflow, brand controls, unlimited AI content generation, PowerPoint import/export, analytics, Pro/Team/Enterprise pricing, 14-day trial, and one-off presentation pricing. Pitch supports Free/Plus/Team/Business plans, member limits, AI credits, guests, links, analytics, pitch rooms, custom domains, PowerPoint export, and subscription mechanics.
- 2026-05-08: Rebuilt `src/content/comparisons/beautiful-ai-vs-pitch.md` as a 1,622-word buyer comparison with current metadata, official sources, pricing guidance, winner-by-use-case logic, buyer recommendations, what-to-avoid guidance, FAQ, and presentation-cluster internal links.
- 2026-05-08: Verification passed: focused stale-claim gate, `git diff --check`, `node scripts/audit-site-kpis.mjs --json`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, app-browser QA, and external Playwright viewport QA at 360, 390, 430, 768, and 1024 px.

## 15. Final report

Changed files:

- `src/content/comparisons/beautiful-ai-vs-pitch.md`
- `.agent/BEAUTIFUL_AI_PITCH_COMPARISON_REFRESH_EXECPLAN.md`

Behavior shipped:

- Replaced a thin, stale comparison with a current May 8, 2026 buyer decision page.
- Removed unsupported April 2026 framing, fake Gemini/Claude model claims, stale Pitch pricing, and weak secondary source links.
- Preserved `winner: depends` while making the buyer split clear: Beautiful.ai for Smart Slides/design guardrails and Pitch for collaborative deck operations, guests, analytics, advanced links, and pitch rooms.
- Kept existing `ComparisonLayout` tracked CTAs working: 3 comparison CTAs rendered with complete `data-cta-*` payloads and `data-compare-cta` markers.

Verification passed:

- Focused comparison gate: word count, current dates, required buyer sections, official source list, and banned stale strings.
- `git diff --check -- src\content\comparisons\beautiful-ai-vs-pitch.md .agent\BEAUTIFUL_AI_PITCH_COMPARISON_REFRESH_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- App-browser QA for `/compare/beautiful-ai-vs-pitch/`: title, canonical, H1, current sections, stale-claim absence, and CTA payloads.
- External viewport QA at 360, 390, 430, 768, and 1024 px: route 200, title/canonical/H1 correct, no horizontal overflow, 3 tracked CTAs complete, and first-screen decision text present.

Remaining risks:

- Beautiful.ai and Pitch pricing can change, so this page should remain on quarterly refresh or faster if either vendor changes plan limits.
- The broader presentation comparison cluster still contains stale Tome-era pages and thin comparisons that may hurt crawl quality until noindexed, merged, deleted, or rebuilt.

Recommended next task:

- Rebuild `src/content/comparisons/decktopus-vs-pitch.md` or clean up Tome comparison pages, prioritizing pages with active buyer demand and avoiding indexable comparisons that recommend discontinued Tome workflows.
