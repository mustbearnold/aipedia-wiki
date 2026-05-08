# Top-Layer Page Refresh ExecPlan

## 1. Objective

Refresh AiPedia's top-layer pages so parent hubs no longer lag behind recently improved child pages. The goal is to keep the homepage, section indexes, archive pages, navigation surfaces, and llms manifests aligned with current buyer-page work, improving mobile UX, SEO, trust, affiliate discovery, and maintainability.

## 2. Current State

The repo has strong refreshed child pages in tools, guides, comparisons, video/avatar clusters, sales/marketing guides, and affiliate-enabled records. The top-layer rule now exists in `AGENTS.md`, `docs/AIPEDIA_CODEX_BIBLE.md`, and tracked `.agent/PLANS.md`, but several parent pages still need a maintenance pass after recent child-page work.

Relevant top-layer files:
- `src/pages/index.astro`
- `src/pages/tools/index.astro`
- `src/pages/categories/index.astro`
- `src/pages/compare/index.astro`
- `src/pages/guides/index.astro`
- `src/pages/news/index.astro`
- `src/pages/trends/index.astro`
- `src/pages/workflows/index.astro`
- `src/pages/answers/index.astro`
- `src/pages/explore/index.astro`
- `src/pages/llms.txt.ts`
- `src/pages/llms-full.txt.ts`
- `src/components/Nav.astro`
- `src/components/Footer.astro`

## 3. Target State

Top-level pages should clearly route mobile users to high-intent buyer paths, reflect recently updated content, avoid stale "use case" framing where the public URL says guides, and expose high-value commercial pages such as AI video, avatar video, sales, ad copy, SEO, presentations, design, and comparison clusters.

## 4. Scope

Included:
- Audit and update stale public copy, featured links, metrics, hub descriptions, and section routing on top-layer pages.
- Ensure affected parent hubs reference current child pages and money paths.
- Keep changes source-backed where volatile product facts are involved; avoid new volatile claims unless verified.
- Verify local pages, checks, and build.

Excluded:
- Deep rewrites of every category/tool/comparison child page.
- New product rankings that require broad current-source research unless scoped in this pass.
- Design-system overhaul beyond top-layer maintenance.

## 5. Files Likely Affected

Likely:
- `src/pages/index.astro`
- `src/pages/tools/index.astro`
- `src/pages/categories/index.astro`
- `src/pages/compare/index.astro`
- `src/pages/guides/index.astro`
- `src/pages/explore/index.astro`
- `src/pages/llms.txt.ts`
- `src/pages/llms-full.txt.ts`

Possible:
- `src/pages/news/index.astro`
- `src/pages/trends/index.astro`
- `src/pages/workflows/index.astro`
- `src/pages/answers/index.astro`
- `src/components/Nav.astro`
- `src/components/Footer.astro`

## 6. Data Model Impact

Prefer deriving counts, links, and freshness from existing collections. Do not duplicate volatile pricing/model facts into top-layer templates. If a top-layer feature requires specific tool picks, use stable child-page links and generic buyer-intent labels unless current facts are verified on 2026-05-09.

## 7. SEO Impact

Top-level pages must maintain unique titles/descriptions, canonical URLs through `BaseLayout`, crawlable primary content, and useful internal links to current money pages. Avoid stale labels that confuse `/guides/` with internal `use-cases`.

## 8. Conversion Impact

Top-level pages should route users toward high-intent pages and affiliate-enabled buying paths without adding unsupported claims. Commercial CTAs must retain tracking components where used; plain internal links should move visitors toward pages with tracked CTAs.

## 9. Mobile UX Impact

Mobile first screen should route users quickly: homepage to task/buyer paths, section hubs to best current pages, guide hub to money guides, compare hub to decision comparisons. Avoid wide-only tables and horizontal overflow.

## 10. Implementation Steps

1. Inspect current top-layer page source and live/local rendered signals.
2. Identify stale labels, outdated featured routes, and missing recently updated money paths.
3. Patch the highest-impact top-level pages first: homepage, guides, compare, categories, explore, llms surfaces.
4. Patch secondary top-level pages if audit shows obvious stale public copy.
5. Run source checks, local rendered smoke checks, `npm run check`, and `npm run build:fast`.
6. Review git diff and clean generated churn if any.

## 11. Verification Commands

- `git diff --check`
- `rg` stale-label scans across top-layer pages
- local `Invoke-WebRequest` checks for `/`, `/guides/`, `/compare/`, `/categories/`, `/explore/`
- `npm run check`
- `npm run build:fast`

## 12. Acceptance Criteria

- Parent hubs are current, internally linked, SEO-aligned, and not weaker or staler than recently changed child pages.
- Top-level pages route to current high-intent buyer pages.
- No new placeholder content, fake facts, fake sources, or unsupported commercial claims.
- Checks/build pass or failures are documented.

## 13. Risks And Mitigations

- Risk: adding stale volatile facts. Mitigation: avoid product-specific claims unless verified on 2026-05-09.
- Risk: broad visual churn. Mitigation: keep edits scoped to copy, featured links, and routing unless a clear bug appears.
- Risk: generated build artifacts pollute git. Mitigation: inspect `git status` after build and restore generated churn if unrelated.

## 14. Progress Log

- 2026-05-09: Created plan after reading binding doctrine and inspecting top-layer file structure.
- 2026-05-09: Removed dead `/reports/` public links from the mobile nav and Explore hub after confirming no `src/pages/reports` route exists.
- 2026-05-09: Replaced stale or overbroad freshness claims on top-layer surfaces (`Updated today`, `Verified today`, April-only news archive, April Stack Builder label) with truthful freshness/buyer framing.
- 2026-05-09: Refocused homepage, Guides, Compare, Categories, Explore, and llms manifests toward current buyer paths without adding unsupported volatile product claims.

## 15. Final Report

Completed first top-layer refresh checkpoint.

Files changed:
- `src/pages/index.astro`
- `src/pages/tools/index.astro`
- `src/pages/categories/index.astro`
- `src/pages/compare/index.astro`
- `src/pages/guides/index.astro`
- `src/pages/news/index.astro`
- `src/pages/explore/index.astro`
- `src/pages/answers/index.astro`
- `src/pages/stack-builder/index.astro`
- `src/pages/llms.txt.ts`
- `src/pages/llms-full.txt.ts`
- `src/components/Nav.astro`
- `src/components/Footer.astro`

Verification:
- `rg` scan: no stale `Updated today`, `Verified today`, `Monthly reports`, public `/reports/`, or dead featured guide slug remains in touched top-layer files.
- `git diff --check`: passed.
- `npm run guard:check`: passed.
- `npm run test:scripts`: passed.
- `npm run build:fast`: passed.
- `npm run check`: passed.
- Local route smoke checks for `/`, `/guides/`, `/compare/`, `/categories/`, `/explore/`, `/tools/`, `/news/`, `/stack-builder/`, and `/answers/`: HTTP 200.
- 390px mobile overflow smoke check on the same routes: no horizontal overflow found.

Remaining risk:
- Individual answer pages and some long-tail guides still contain April 2026 product claims. They were not blindly updated because volatile product claims require fresh source verification under the current-date rule.
