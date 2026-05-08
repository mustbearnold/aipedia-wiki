# Video Model Comparison Cluster ExecPlan

### 1. Objective

Refresh AiPedia's high-intent AI video comparison cluster so buyers see current, source-backed, mobile-first decision pages instead of thin or stale model copy. This checkpoint directly supports organic rankings, trust, affiliate/CTA conversion, and editorial quality for one of the site's most commercially important AI categories.

### 2. Current state

Repo inspection found a strong shared comparison template in `src/layouts/ComparisonLayout.astro` with a decision-first mobile hero, tracked `CommercialCTA` surfaces, canonical fact tables, and mobile fact-card rendering through `src/components/comparison/ComparisonFactTable.astro`.

The video comparison content is uneven. Several pages are thin and stale:

- `src/content/comparisons/pika-vs-seedance.md` still says "Seedance 3.1", references April 2026, cites `seedance.ai/docs`, and includes unsupported pricing/output claims.
- `src/content/comparisons/kling-vs-pika.md` is under 500 words and uses older comparison framing.
- `src/content/comparisons/pika-vs-runway.md` is under 500 words, has a malformed snapshot table, and cites unsupported benchmark numbers.
- `src/content/comparisons/hailuo-vs-kling.md` is under 500 words and uses stale pricing/length claims that conflict with current tool records.

Relevant current tool records already exist and were verified on 2026-05-08:

- `src/content/tools/pika.md`
- `src/content/tools/seedance.md`
- `src/content/tools/kling.md`
- `src/content/tools/runway.md`
- `src/content/tools/hailuo.md`
- `src/content/tools/veo.md`

Current official source checks for this checkpoint:

- Pika pricing page confirms Basic, Standard, Pro, Fancy, Pika 2.5 access, credit allowances, and feature availability.
- ByteDance Seedance 2.0 official page confirms the unified multimodal audio-video model and text/image/audio/video reference inputs.
- BytePlus docs confirm official Seedance 2.0 API/resource-pack route.
- Kuaishou release confirms Kling AI 3.0, Video 3.0, Video 3.0 Omni, native audio, multimodal input/output, and up to 15-second generation.
- Runway pricing and API docs confirm Gen-4.5, Gen-4, Aleph, Act-Two, Veo 3.1, third-party video models, plan pricing, and API model pricing.
- MiniMax docs confirm Hailuo 2.3 / 2.3 Fast, API access, and video package pricing.

### 3. Target state

The selected video comparisons should read like buyer decision pages:

- Mobile hero answers who wins, who should choose each product, and where to click.
- Content uses exact current model names: Seedance 2.0, Kling 3.0, Pika 2.5, Runway Gen-4.5/Gen-4/Aleph/Act-Two, Hailuo 2.3.
- Unsupported prices, benchmark percentages, and fake sources are removed.
- Each page includes quick verdict, winner-by-use-case table, pricing/access guidance, avoid/choose sections, bottom line, FAQ, and official sources.
- `last_updated` and `last_verified` are set to 2026-05-08.
- Existing canonical fact table and CTA tracking remain intact.

### 4. Scope

Included in this checkpoint:

- Rewrite `pika-vs-seedance.md`.
- Rewrite `kling-vs-pika.md`.
- Rewrite `pika-vs-runway.md`.
- Rewrite `hailuo-vs-kling.md`.
- Run focused stale-content and comparison checks.
- Run build/type checks after the content pass.
- Perform viewport QA for rewritten routes at 360, 390, 430, 768, and 1024 widths.

Excluded from this checkpoint:

- Creating new Veo comparison slugs.
- Renaming `kling-vs-seedance-vs-runway.md`.
- Rebuilding the video category guide.
- Updating affiliate program inventory.
- Adding new analytics events beyond existing tracked comparison CTAs.

### 5. Files likely affected

- `src/content/comparisons/pika-vs-seedance.md`
- `src/content/comparisons/kling-vs-pika.md`
- `src/content/comparisons/pika-vs-runway.md`
- `src/content/comparisons/hailuo-vs-kling.md`
- `.agent/VIDEO_MODEL_COMPARISON_CLUSTER_EXECPLAN.md`

### 6. Data model impact

This is a content refresh only. It relies on the existing comparison frontmatter fields: `type`, `slug`, `title`, `tools`, `category`, `winner`, `seo_title`, `meta_description`, `last_updated`, `last_verified`, `update_frequency`, and `canonical_fact_table`.

No schema changes are planned. Tool records remain the source of reusable tool-level facts.

### 7. SEO impact

The refresh improves indexable comparison pages by removing stale version names, fake/weak sources, unsupported claims, and malformed tables. Titles and descriptions should better match 2026 search intent for "Pika vs Seedance", "Kling vs Pika", "Pika vs Runway", and "Hailuo vs Kling".

Each page should preserve canonical routes and visible crawlable body content. The shared comparison template handles canonical URL and structured page shell behavior.

### 8. Conversion impact

ComparisonLayout already adds tracked commercial CTAs in the decision hero, tool cards, and use-case winner blocks. Better buyer framing should improve CTA intent by clarifying whether visitors should trial Pika, Runway, Kling, Hailuo, or Seedance, and by warning when a tool is not the right purchase.

### 9. Mobile UX impact

The existing shared template supplies the mobile-first decision hero. The rewritten body content must avoid wide raw tables as the primary mobile experience. Any tables that remain should be short decision tables and not the first mobile answer. QA will check 360, 390, 430, 768, and 1024 widths for horizontal overflow and hero CTA visibility.

### 10. Implementation steps

1. Inspect the selected comparison files and current tool records.
2. Verify current facts against official sources as of 2026-05-08.
3. Rewrite `pika-vs-seedance.md` around Pika 2.5 vs Seedance 2.0.
4. Rewrite `kling-vs-pika.md` around Kling 3.0 vs Pika 2.5.
5. Rewrite `pika-vs-runway.md` around Pika 2.5 vs Runway as production workspace.
6. Rewrite `hailuo-vs-kling.md` around Hailuo 2.3 vs Kling 3.0.
7. Run focused content checks for banned stale terms and minimum decision-page depth.
8. Run comparison CTA/test scripts, type check, and build.
9. Use the app browser and viewport automation for mobile QA.
10. Update this ExecPlan progress log and final report.

### 11. Verification commands

- `node --test tests/scripts/comparison-layout-mobile-decision.test.mjs`
- `node --test tests/scripts/audit-commercial-cta.test.mjs`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- Custom node content audit for rewritten files.
- Browser/viewport QA for `/compare/pika-vs-seedance/`, `/compare/kling-vs-pika/`, `/compare/pika-vs-runway/`, and `/compare/hailuo-vs-kling/`.

### 12. Acceptance criteria

- No rewritten page contains "Seedance 3.1" or stale "as of April 2026" claims.
- No rewritten page uses third-party `seedance.ai` as official Seedance evidence.
- Each rewritten page has `last_verified: 2026-05-08`.
- Each rewritten page has at least 900 words of buyer-useful, source-backed decision content.
- Existing comparison CTAs remain tracked.
- Build and focused tests pass.
- Mobile QA finds no document-level horizontal overflow.

### 13. Risks and mitigations

- **Risk:** Pika and Kling pricing/access surfaces are dynamic.
  **Mitigation:** Use official pricing/source pages but avoid overclaiming static plan access where the source is dynamic or account-specific.

- **Risk:** Comparing raw video quality without controlled benchmark data can overstate certainty.
  **Mitigation:** Frame model ranking as AiPedia editorial testing order and source-backed vendor capability claims, not a completed blind benchmark.

- **Risk:** Rewriting multiple money pages can introduce frontmatter/schema mistakes.
  **Mitigation:** Preserve existing comparison frontmatter shape and run Astro checks/build.

### 14. Progress log

- 2026-05-08: Created ExecPlan after inspecting target comparison files, current video tool records, shared comparison template/tests, and official source pages.
- 2026-05-08: Rewrote `pika-vs-seedance.md`, `kling-vs-pika.md`, `pika-vs-runway.md`, and `hailuo-vs-kling.md` as current buyer decision pages with source-backed model names, pricing/access caveats, winner-by-use-case guidance, FAQ, and official sources.
- 2026-05-08: Focused content audit passed for all four rewritten pages: each has `last_verified: 2026-05-08`, no obsolete Seedance version string, no "as of April 2026" language, no weak third-party source leftovers, required buyer sections, and more than 900 body words.
- 2026-05-08: Verification passed: `node --test tests/scripts/comparison-layout-mobile-decision.test.mjs`, `node --test tests/scripts/audit-commercial-cta.test.mjs`, `npm run test:scripts`, `npm run check`, and `npm run build:fast`. `git diff --check` passed with CRLF warnings only.
- 2026-05-08: In-app browser QA passed for the four routes: each rendered the expected page title/H1, one `comparison_hero_winner` CTA, and no stale Seedance/April copy.
- 2026-05-08: Viewport QA passed at 360, 390, 430, 768, and 1024 widths for all four routes: no document-level horizontal overflow, four tracked comparison CTAs per route, no missing CTA payload fields, mobile fact cards visible through 820px, and desktop fact table visible at 1024px.

### 15. Final report

Changed files:

- `src/content/comparisons/pika-vs-seedance.md`
- `src/content/comparisons/kling-vs-pika.md`
- `src/content/comparisons/pika-vs-runway.md`
- `src/content/comparisons/hailuo-vs-kling.md`
- `.agent/VIDEO_MODEL_COMPARISON_CLUSTER_EXECPLAN.md`

Behavior shipped:

- Four weak AI video comparison pages were rebuilt into mobile-first buyer decision pages.
- Pika vs Seedance now uses Seedance 2.0 and official ByteDance/BytePlus source hierarchy.
- Kling vs Pika now distinguishes cinematic video-model testing from social-effects app workflow.
- Pika vs Runway now distinguishes a lightweight creator app from Runway's production workspace/API value.
- Hailuo vs Kling now distinguishes MiniMax value/API experiments from Kling cinematic model testing.
- Unsupported static prices, stale April copy, fake benchmark precision, and weak third-party source references were removed.

Tests passed:

- Custom focused content audit for the four rewritten files.
- `node --test tests/scripts/comparison-layout-mobile-decision.test.mjs`
- `node --test tests/scripts/audit-commercial-cta.test.mjs`
- `git diff --check` with CRLF warnings only.
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- In-app browser route QA.
- Playwright viewport QA at 360, 390, 430, 768, and 1024.

Unresolved risks:

- Kling and Hailuo app pricing surfaces remain dynamic, so the pages intentionally avoid overclaiming exact consumer-plan access.
- AiPedia still needs new direct Veo money comparisons such as `veo-vs-seedance`, `veo-vs-kling`, and `runway-vs-veo`.
- `kling-vs-seedance-vs-runway.md` now includes Veo in title/tools while the slug omits Veo; handle with a redirect/canonical plan rather than a casual rename.

Recommended next task:

- Build the missing Veo comparison cluster with official Google/Runway/ByteDance/Kuaishou sources and a redirect-aware URL plan.
