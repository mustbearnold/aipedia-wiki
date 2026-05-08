# Category Buyer Flow Refresh ExecPlan

### 1. Objective

Improve AiPedia category pages as mobile-first buyer decision pages. This checkpoint fixes category trust and SEO issues where secondary-category tools can outrank primary-category tools, then refreshes the stale AI SEO category with current, source-backed buyer guidance as of 2026-05-08.

### 2. Current state

Relevant inspected files:

- `src/pages/categories/[slug].astro` collects active tools whose primary `category` equals the category slug or whose `secondary_categories` includes the slug. It does not pass whether the match is primary or secondary.
- `src/layouts/CategoryLayout.astro` sorts every matched tool only by average score. This can make secondary-category tools appear before true category tools in visible ranked lists and `ItemListLD`.
- `src/content/categories/ai-design.md` is already current as of 2026-05-08 with buyer-path copy and configured top picks.
- `src/content/categories/ai-seo.md` is stale as of 2026-04-13. It says "Compare 7 tools" while current matching data has 9 primary AI SEO tools, uses old pricing language, and includes affiliate commission rates in editorial copy.
- `CommercialCTA.astro` already applies affiliate links, sponsored rel, disclosure, and CTA tracking payloads when templates pass `affiliate.link`.

Known issue:

- Category ordering currently treats primary and secondary category membership as equivalent. This weakens topical relevance, schema trust, and buyer clarity.

### 3. Target state

Category pages should prioritize true primary-category tools before secondary-category tools, then sort within each group by editorial score. The mobile top of category pages should still expose best overall, budget, and pro/team picks with tracked CTAs and nearby disclosures when affiliate links exist.

The AI SEO category should be a May 8, 2026 buyer guide that explains:

- Best overall SEO data suite.
- Best budget optimizer.
- Best agency/pro suite.
- When to use AI visibility/GEO tools versus classic SEO suites.
- Current pricing caveats from official sources.
- Why affiliate availability does not influence ranking.

### 4. Scope

Included:

- Add primary/secondary match metadata to category tool data.
- Sort category lists and schema so primary matches rank first, then score.
- Refresh `src/content/categories/ai-seo.md` with current sources, top picks, buyer paths, pricing reality, and trust warnings.
- Verify category affiliate CTA propagation, disclosures, schema basics, build health, and mobile overflow.

Excluded:

- Rewriting every AI SEO tool page.
- Changing affiliate URLs.
- Creating new comparison pages in this checkpoint.
- Rebuilding the full category layout design system.

### 5. Files likely affected

- `.agent/CATEGORY_BUYER_FLOW_REFRESH_EXECPLAN.md`
- `src/pages/categories/[slug].astro`
- `src/layouts/CategoryLayout.astro`
- `src/content/categories/ai-seo.md`

### 6. Data model impact

No collection schema migration is required. The category route will add transient rendered tool data such as `category_match_type: "primary" | "secondary"` for sorting and schema output. This does not change source content files or persisted tool records.

### 7. SEO impact

Primary-category-first sorting improves topical relevance in visible category lists and `ItemListLD`. The AI SEO category will get a unique current title, meta description, top-pick frontmatter, current verification dates, and source-backed buyer copy. This reduces thin/stale content risk and avoids editorial copy that exposes affiliate commission rates.

### 8. Conversion impact

Existing `CommercialCTA` tracking remains the conversion path. This checkpoint preserves category CTA placements (`category_top_pick`, `category_ranked_list`) and verifies affiliate CTAs render with sponsored rel, disclosure, tool slug, page type, category slug, placement, price range, and affiliate program data.

### 9. Mobile UX impact

The template already uses top-pick cards and stacked category rows. This checkpoint preserves that mobile-first structure and verifies category pages at 360, 390, 430, 768, and 1024 widths for horizontal overflow. The AI SEO copy will avoid making a wide table the only useful mobile experience.

### 10. Implementation steps

1. Add category match metadata in `src/pages/categories/[slug].astro`.
2. Update `src/layouts/CategoryLayout.astro` sorting to rank primary matches before secondary matches, then score descending.
3. Refresh `src/content/categories/ai-seo.md` with current frontmatter, configured top picks, source-backed buyer guidance, and no public commission-rate copy.
4. Build and run checks.
5. Verify `/categories/ai-seo/` and `/categories/ai-design/` in the in-app browser/local build for CTA tracking, disclosure, schema/list order, and mobile overflow.

### 11. Verification commands

- `npm run audit:provenance`
- `npm run check`
- `npm run build:fast`
- `npm run test:scripts`
- Playwright/browser QA for `/categories/ai-seo/` and `/categories/ai-design/` at 360, 390, 430, 768, and 1024 widths.

### 12. Acceptance criteria

- AI Design category no longer starts the ranked list or ItemList schema with secondary-category tools like Claude or GPT Image when primary AI Design tools are available.
- AI SEO category has `last_verified: 2026-05-08`, current title/meta copy, configured top picks, and source-backed buyer guidance.
- AI SEO category does not publish affiliate commission rates as editorial recommendation copy.
- Affiliate CTAs on category pages use the approved central affiliate link when present and render disclosure/tracking data.
- Build and relevant checks pass, or failures are clearly documented with exact cause.
- Mobile QA finds no horizontal overflow at required widths on affected category pages.

### 13. Risks and mitigations

- Risk: Primary-first sorting may push high-scoring secondary tools lower. Mitigation: keep secondary tools in the list and preserve score sorting inside each match group.
- Risk: Current official pricing pages can be dynamic or locale-sensitive. Mitigation: cite official sources, avoid hard claims where the crawl is ambiguous, and disclose pricing caveats.
- Risk: Category sorting affects every category page. Mitigation: small transient data addition, no content schema migration, and build/test/mobile QA across representative categories.

### 14. Progress log

- 2026-05-08 21:49 NZST: Inspected category route/layout, AI SEO and AI Design category content, package scripts, schema, affiliate CTA component, and built sales guide affiliate propagation. Found stale AI SEO copy and primary/secondary category sorting issue.
- 2026-05-08 21:57 NZST: Added transient `category_match_type` in the category route and primary-first sorting in `CategoryLayout.astro`. Refreshed `ai-seo.md` with May 8 buyer guidance, top picks, current official sources, and no commission-rate recommendation copy. Updated visible AI SEO category price snippets for Frase, Surfer SEO, and MarketMuse where the category list consumed stale tool data.
- 2026-05-08 22:03 NZST: Added `tests/scripts/category-primary-sort.test.mjs` to guard the primary-category sort behavior. Verified with `npm run audit:provenance`, `npm run test:scripts`, `npm run check`, and `npm run build:fast`. In-app browser QA confirmed `/categories/ai-seo/` title, top picks, CTA counts, and affiliate CTA counts; `/categories/ai-design/` now starts with Canva, Figma, Framer AI, Lovable, and Google Stitch. Playwright viewport QA passed at 360, 390, 430, 768, and 1024 for `/categories/ai-seo/` and `/categories/ai-design/` with no horizontal overflow.
- 2026-05-08 22:18 NZST: Finished the follow-up trust pass for configured category top picks. `CategoryLayout.astro` now renders `top_picks.reason` when configured, with no placeholder output for categories that only configure labels. Static output QA found 3 reason blocks on `/categories/ai-seo/`, 3 on `/categories/ai-presentation/`, and 0 on `/categories/ai-design/`. Playwright viewport QA passed at 360, 390, 430, 768, and 1024 for all three category routes with no horizontal overflow. In-app browser QA confirmed AI SEO top-pick reason copy and affiliate disclosures are visible in the rendered page.

### 15. Final report

Changed files:

- `.agent/CATEGORY_BUYER_FLOW_REFRESH_EXECPLAN.md`
- `src/pages/categories/[slug].astro`
- `src/layouts/CategoryLayout.astro`
- `src/content/categories/ai-seo.md`
- `src/content/tools/frase.md`
- `src/content/tools/surfer-seo.md`
- `src/content/tools/marketmuse.md`
- `src/styles/t2-canvas.css`
- `tests/scripts/category-primary-sort.test.mjs`

Behavior shipped:

- Category pages now retain secondary-category discovery but rank primary-category tools first, then by editorial score, then title.
- AI SEO category is current as of 2026-05-08, has 9 tools, configured top picks, source-backed buyer paths, pricing caveats, and no public commission-rate recommendation copy.
- Configured category top-pick reasons now render in the mobile-first top-pick cards, improving trust and buyer clarity on categories with editorial reason data.
- Visible AI SEO category price snippets for Frase, Surfer SEO, and MarketMuse were brought in line with current official pricing pages where the category page rendered them.
- A regression test now protects the category primary-first sorting behavior.

Verification:

- `npm run audit:provenance` passed.
- `npm run test:scripts` passed: 20 tests.
- `npm run check` passed.
- `npm run build:fast` passed: 908 pages built; indexability and representative commercial CTA audits passed.
- In-app browser QA passed for `/categories/ai-seo/` and `/categories/ai-design/`.
- Playwright viewport QA passed at 360, 390, 430, 768, and 1024 for both affected category routes.
- Follow-up static and browser QA confirmed category top-pick reasons render correctly on `/categories/ai-seo/` and `/categories/ai-presentation/`, while `/categories/ai-design/` does not render empty reason blocks. Viewport QA passed at 360, 390, 430, 768, and 1024 for all three routes.

Remaining risks:

- Several AI SEO tool pages beyond Frase, Surfer SEO, and MarketMuse still deserve full buyer-page rewrites; this checkpoint only fixed stale visible category data and the most obvious stale tool-page claims touched by the category page.
- The next category trust pass should add reason data to more category frontmatter records, starting with monetizable categories that currently configure only labels or slugs.
