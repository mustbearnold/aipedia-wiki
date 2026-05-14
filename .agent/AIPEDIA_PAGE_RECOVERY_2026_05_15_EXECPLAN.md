# AiPedia Page Recovery ExecPlan

## 1. Objective

Recover the May 2026 guide, workflow, tool, news, and hub updates so they improve mobile UX, trust, affiliate conversion, SEO, and maintainability instead of adding thin or visually inconsistent pages.

## 2. Current state

The site is on `master` with commit `4531eff2` pushed. The working tree only has private/temp untracked files. New guide and workflow pages use `GuideLayout.astro` and `WorkflowLayout.astro`; tool pages use `ToolLayout.astro`. The new `gt-*` design system exists, but prose/table styles are duplicated across layouts, sticky CTAs bypass `CommercialCTA`, and mobile table cardification only targets older prose classes.

## 3. Target state

Guide, workflow, tool, article, and hub pages should share a premium mobile-first visual system. Commercial CTAs should carry consistent analytics attributes. Mobile users should see decision cards instead of cramped tables. Affiliate disclosures should sit near purchase decisions without overpowering editorial trust.

## 4. Scope

Included: shared body enhancements, guide/workflow/tool/article layouts, commercial CTA defaults, affected hubs, `PAGE_REFRESH_LEDGER.md`, and representative verification.

Excluded: private/temp files including `.tmp-*`, `.refresh-queue.json`, and `affiliate-applications.xlsx`.

Affected top-layer surfaces: `/guides/`, `/workflows/`, `/news/`, `/tools/`, `/explore/`, sitemap/RSS/LLM outputs, and page refresh ledger.

## 5. Files likely affected

- `src/components/CommercialCTA.astro`
- `src/components/godtier/StickyCTA.astro`
- `src/components/godtier/BodyEnhancements.astro`
- `src/layouts/GuideLayout.astro`
- `src/layouts/WorkflowLayout.astro`
- `src/layouts/ToolLayout.astro`
- `src/layouts/ArticleLayout.astro`
- `src/styles/godtier-tokens.css`
- `PAGE_REFRESH_LEDGER.md`

## 6. Data model impact

No required URL or collection changes. Workflow pages may later add optional structured fields for buyer profile, stack order, and cost, but the first pass derives from existing `stack`, tool prices, and descriptions.

## 7. SEO impact

Preserve existing canonicals and indexability. Improve crawlable above-fold summaries and parent hubs. Regenerate the ledger after edits.

## 8. Conversion impact

Sticky CTAs must use the same commercial tracking payload as regular CTAs. Guide/workflow CTAs should use clearer labels and fewer noisy repeated pitches. Disclosures stay near affiliate decisions.

## 9. Mobile UX impact

At 360, 390, 430, 768, and desktop widths, body tables become stacked cards on mobile, CTAs remain 44px+ tap targets, hero/meta text avoids awkward wrapping, and workflows show buying order before long prose.

## 10. Implementation steps

1. Add shared body/table enhancement for `article.gt-body`.
2. Route sticky CTAs through commercial CTA tracking.
3. Upgrade guide winner and tier cards.
4. Upgrade workflow summary and stack cards.
5. Align shared CSS and remove table squeeze behavior.
6. Refresh affected hubs and ledger.
7. Run checks/build and browser QA.

## 11. Verification commands

- `npm run test:scripts`
- `npm run guard:check`
- `npm run build:fast`
- `npm run ledger:pages`
- Browser QA on representative pages at mobile and desktop widths.

## 12. Acceptance criteria

No broken build, no untracked private files staged, no horizontal overflow on representative pages, tracked CTA attributes present on sticky and inline commercial links, mobile tables render as cards, and top-layer pages/ledger reflect the edited surfaces.

## 13. Risks and mitigations

Risk: adding client script weight. Mitigation: small idempotent inline script only for body tables and source callouts.

Risk: affiliate over-optimization. Mitigation: one primary CTA in decision surfaces, honest disclosures, and review links beside commercial links.

## 14. Progress log

- 2026-05-15: Started recovery implementation after inspecting layouts, CTA components, scripts, and May 2026 source coverage.
- 2026-05-15: Routed sticky CTAs through `CommercialCTA`, added shared `BodyEnhancements`, cardified mobile prose/pricing tables, improved guide/workflow decision surfaces, corrected Codex Windows sandbox facts against current OpenAI sources, refreshed the A/B landing-page guide against current Unbounce pages, and regenerated `PAGE_REFRESH_LEDGER.md`.
- 2026-05-15: Fixed mobile breadcrumb wrapping by enforcing one-line fade behavior in both `Hero.astro` and the shared legacy `Breadcrumb.astro`; cleaned the above-fold decision card hierarchy so score/status, pricing, affiliate disclosure, and editorial trust no longer compete visually.

## 15. Final report

Verification completed:

- `npm run ledger:pages` passed and rewrote the ledger with 732 rows.
- `npm run build:fast` passed, including content guard, stale-fact guard, guide-pick audit, logo audit, ledger check, source font audit, Astro build, sitemap generation, indexability audit, and commercial CTA audit.
- `npm run build` passed on the longer run, including prebuild, GitHub stats refresh with stale fallback for rate-limited repos, OG/news image generation, Astro/Cloudflare build, sitemap, Pagefind, built font policy, and audits.
- Browser QA passed across 50 route/viewport combinations at 360, 390, 430, 768, and 1024 widths for representative tool, guide, workflow, news, hub, about, and legacy breadcrumb pages.
- `npm run lint --if-present` and `npm run typecheck --if-present` had no configured script output.
- `npm run test:scripts` still fails 6 pre-existing/stale assertions: KPI expected tool count, category snapshot expectations, comparison mobile snapshot expectations, and search analytics function-name expectations.

Residual risks:

- Build output still warns about missing referenced tool slugs (`googlebook`, `codestral`, `daybreak`, `coda`, `anytype`, `supabase`, `vercel`, `stripe`, `substack`). These warnings predate this recovery slice and should be cleaned in a focused content-link pass.
