# Veo Comparison Cluster ExecPlan

### 1. Objective

Create direct, source-backed money comparison pages for Google Veo 3.1 against Seedance 2.0, Kling 3.0, and Runway. This closes a high-intent SEO and buyer-decision gap in AiPedia's AI video cluster while avoiding a risky rename of the existing four-way page.

### 2. Current state

The repo generates comparison pages from `src/content/comparisons/*.md` through `src/pages/compare/[slug].astro`. Each comparison becomes:

- a public route at `/compare/[slug]/`
- an API entry in `/api/comparisons.json`
- an embeddable SVG in `/embed/comparisons/[slug].svg`
- related-comparison candidates on tool and comparison pages

Existing video comparisons include:

- `src/content/comparisons/kling-vs-seedance-vs-runway.md`, whose title/tools include Veo but whose slug omits Veo
- `src/content/comparisons/pika-vs-seedance.md`
- `src/content/comparisons/kling-vs-pika.md`
- `src/content/comparisons/pika-vs-runway.md`
- `src/content/comparisons/hailuo-vs-kling.md`

Direct Veo comparison slugs do not exist yet:

- `veo-vs-seedance.md`
- `veo-vs-kling.md`
- `runway-vs-veo.md`

Current verified tool records exist:

- `src/content/tools/veo.md`
- `src/content/tools/seedance.md`
- `src/content/tools/kling.md`
- `src/content/tools/runway.md`

Official source checks for this checkpoint:

- Google DeepMind Veo page confirms Veo 3.1 as Google's latest video generation model with audio.
- Gemini API video docs confirm `veo-3.1-generate-preview`, vertical aspect ratio, 4K config, image-to-video, reference images, first/last frame control, scene extension, supported model versions, and video-with-audio output.
- Gemini API pricing confirms Veo 3.1 Standard/Fast/Lite paid-tier per-second pricing.
- Google January 2026 update confirms vertical 9:16 output, 1080p/4K options, and Flow/Gemini API/Vertex AI/Google Vids availability.
- ByteDance Seed and BytePlus confirm Seedance 2.0 model identity, API route, and resource-pack route.
- Kuaishou confirms Kling 3.0 model family capabilities.
- Runway confirms Gen-4.5, Aleph, Act-Two, Veo 3.1, third-party video models, workspace pricing, and API model list.

### 3. Target state

Add three direct comparison pages that satisfy AiPedia's mobile-first comparison law:

- first-screen decision hero via shared layout
- clear winner for most people or split decision
- winner by use case
- pricing/access guidance
- who should choose/avoid each tool
- current official sources
- `last_updated` and `last_verified` set to 2026-05-08
- no stale April copy, fake benchmark numbers, or unsupported pricing claims

### 4. Scope

Included:

- Add `src/content/comparisons/veo-vs-seedance.md`.
- Add `src/content/comparisons/veo-vs-kling.md`.
- Add `src/content/comparisons/runway-vs-veo.md`.
- Optionally update related-link lists in affected tool records if low risk.
- Run content, type, build, browser, and viewport QA.

Excluded:

- Renaming `kling-vs-seedance-vs-runway.md`.
- Creating redirects.
- Creating a full `/compare/runway-vs-kling-vs-seedance-vs-veo/` canonical migration.
- Running live model benchmarks.

### 5. Files likely affected

- `src/content/comparisons/veo-vs-seedance.md`
- `src/content/comparisons/veo-vs-kling.md`
- `src/content/comparisons/runway-vs-veo.md`
- `.agent/VEO_COMPARISON_CLUSTER_EXECPLAN.md`
- Possibly `src/content/tools/veo.md`, `src/content/tools/seedance.md`, `src/content/tools/kling.md`, and `src/content/tools/runway.md` related-link sections.

### 6. Data model impact

No schema change. New comparison records use the existing comparison content model and `canonical_fact_table: true`.

### 7. SEO impact

The new pages target high-intent queries that the current site underserves:

- Veo vs Seedance
- Veo vs Kling
- Runway vs Veo

They also improve internal-link coverage around the AI video category and give the compare index/direct tool pages better route options. The existing four-way slug remains as-is to avoid redirect/canonical mistakes during this checkpoint.

### 8. Conversion impact

The shared comparison template supplies tracked CTAs for:

- `comparison_hero_winner`
- `comparison_tool_card`
- `comparison_use_case_winner`

The content should increase click quality by distinguishing raw model tests, Google/API procurement, creator value, and production workflow rather than pushing one vague "best video generator" answer.

### 9. Mobile UX impact

The direct pages inherit the comparison decision hero and mobile fact-card behavior. Body content must remain concise enough for mobile and avoid wide raw tables as the primary experience.

### 10. Implementation steps

1. Create this ExecPlan after inspecting routing and current video comparison content.
2. Verify current official sources for Veo, Seedance, Kling, and Runway.
3. Add `veo-vs-seedance.md`.
4. Add `veo-vs-kling.md`.
5. Add `runway-vs-veo.md`.
6. Run focused content audit for required sections, current dates, stale terms, and source quality.
7. Run comparison tests and broader checks.
8. Run build and inspect generated routes.
9. QA the three new routes in the in-app browser and at 360, 390, 430, 768, and 1024 widths.
10. Update progress and final report.

### 11. Verification commands

- Custom node content audit for new comparison files.
- `node --test tests/scripts/comparison-layout-mobile-decision.test.mjs`
- `node --test tests/scripts/audit-commercial-cta.test.mjs`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- In-app browser route QA.
- Playwright viewport QA for the three new routes.

### 12. Acceptance criteria

- Three new comparison routes build successfully.
- Each new page has `last_verified: 2026-05-08`.
- Each new page has at least 900 words of source-backed buyer content.
- Each new page includes Quick Answer, Winner By Use Case, Pricing/Access Guidance, Bottom Line, FAQ, and Sources.
- No page includes stale "April 2026" language, fake benchmark numbers, or unsupported prices.
- Mobile QA passes at 360, 390, 430, 768, and 1024.
- Commercial CTA payloads remain present and tracked.

### 13. Risks and mitigations

- **Risk:** Veo per-second API costs can be misread as consumer plan pricing.
  **Mitigation:** Clearly separate Gemini API/Vertex AI pricing from Flow/Gemini app access.

- **Risk:** Direct pages duplicate the four-way page.
  **Mitigation:** Each direct page will answer a unique buyer pair and link broader comparisons as context.

- **Risk:** Seedance and Kling access routes are less static than Google/Runway.
  **Mitigation:** Use official sources and avoid overclaiming exact plan access.

### 14. Progress log

- 2026-05-08: Created ExecPlan after inspecting comparison route generation, existing video comparison files, current Veo/Seedance/Kling/Runway tool records, and official source pages.
- 2026-05-08: Added direct comparison pages for `veo-vs-seedance`, `veo-vs-kling`, and `runway-vs-veo`, all with `last_verified: 2026-05-08`, canonical fact tables, current official source links, buyer-fit guidance, pricing/access caveats, FAQ sections, and decision-first conclusions.
- 2026-05-08: Updated related comparison links in `src/content/tools/veo.md`, `src/content/tools/seedance.md`, `src/content/tools/kling.md`, and `src/content/tools/runway.md` so the new money pages are reachable from the affected canonical tool pages.
- 2026-05-08: Updated the stable KPI test baseline from 263 to 266 comparison pages because this checkpoint intentionally added three new comparison records.
- 2026-05-08: Verification passed: focused content audit for the three new pages, `node --test tests/scripts/comparison-layout-mobile-decision.test.mjs`, `node --test tests/scripts/audit-commercial-cta.test.mjs`, `git diff --check`, `npm run test:scripts`, `npm run check`, and `npm run build:fast`.
- 2026-05-08: Browser QA passed for `/compare/veo-vs-seedance/`, `/compare/veo-vs-kling/`, and `/compare/runway-vs-veo/`: correct titles/H1s, one `comparison_hero_winner` CTA per page, four tracked commercial CTAs per page, no stale `Seedance 3.1` or `April 2026` copy.
- 2026-05-08: Playwright viewport QA passed at 360, 390, 430, 768, and 1024 px for all three new routes: no horizontal overflow, mobile fact cards visible through 820 px, desktop fact table visible at 1024 px, and no missing commercial CTA tracking payload fields.

### 15. Final report

Completed for this checkpoint.

Files changed:

- `src/content/comparisons/veo-vs-seedance.md`
- `src/content/comparisons/veo-vs-kling.md`
- `src/content/comparisons/runway-vs-veo.md`
- `src/content/tools/veo.md`
- `src/content/tools/seedance.md`
- `src/content/tools/kling.md`
- `src/content/tools/runway.md`
- `tests/scripts/audit-site-kpis.test.mjs`
- `.agent/VEO_COMPARISON_CLUSTER_EXECPLAN.md`

What improved:

- AiPedia now has direct indexable buyer pages for three high-intent video-model comparison queries instead of relying on one broad four-way page with a less direct slug.
- The pages make current 2026 distinctions between raw video model testing, Google/API procurement, creator pricing/value, and production workflow.
- Each page cites current official sources and avoids stale April 2026 language, unsupported benchmark claims, and over-specific access claims where vendors have volatile pricing or account-flow details.

Mobile impact:

- The pages inherit the comparison decision hero and passed viewport QA at 360, 390, 430, 768, and 1024 px.
- Mobile users get stacked canonical fact cards instead of a wide table, with the desktop table reserved for wider screens.

SEO impact:

- Added three targeted comparison routes for `Veo vs Seedance`, `Veo vs Kling`, and `Runway vs Veo`.
- Updated affected tool-page related-link lists so the new comparison pages receive internal links from canonical tool hubs.
- Build generated 908 pages and indexability passed across generated sitemap HTML.

Conversion impact:

- Each new route exposes four tracked commercial CTAs through the shared comparison CTA system.
- CTA payload QA confirmed required page type, placement, tool, label, destination, page slug, and comparison-pair fields are present.

Checks run:

- Focused node content audit for the three new comparison files.
- `node --test tests/scripts/comparison-layout-mobile-decision.test.mjs`
- `node --test tests/scripts/audit-commercial-cta.test.mjs`
- `git diff --check`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- In-app browser route QA.
- Playwright viewport QA for `/compare/veo-vs-seedance/`, `/compare/veo-vs-kling/`, and `/compare/runway-vs-veo/`.

Remaining risks:

- The existing broad page `kling-vs-seedance-vs-runway.md` includes Veo in title/tools but not in the slug. That may deserve a future redirect/canonical migration, but it was intentionally excluded from this checkpoint to avoid route churn without a larger redirect plan.
