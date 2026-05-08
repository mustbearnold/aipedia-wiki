# Ad Copy Guide Refresh ExecPlan

## 1. Objective

Rebuild `best-ai-for-ad-copy` from a stale generic-model list into a current, mobile-first buyer guide for ad-copy and ad-creative workflows. The page should support SEO intent, source-backed trust, and affiliate revenue by routing paid-ad buyers toward AdCreative.ai when creative/copy testing volume is the real problem.

## 2. Current state

`src/content/use-cases/best-ai-for-ad-copy.md` is verified `2026-05-03`, but its visible content still says April 2026 and relies on weak third-party ranking sources. It ranks ChatGPT, Claude, and DeepSeek, even though the intent is commercial marketing copy and the repo now has an approved AdCreative.ai affiliate record. It has no `guide_picks`, so it misses the decision-card module used by stronger money guides.

Relevant systems:

- `src/pages/guides/[slug].astro` renders use cases under `/guides/[slug]/`.
- `src/layouts/GuideLayout.astro` uses `guide_picks` and `tools_mentioned` to render decision cards and tracked commercial CTAs.
- `src/content/tools/adcreative.md` has AdCreative.ai affiliate URL `https://free-trial.adcreative.ai/46864ltm9g0d`, FirstPromoter network, and `last_verified: 2026-05-08`.
- `scripts/audit-commercial-cta.mjs` can protect representative money routes from losing required affiliate CTAs.

## 3. Target state

The page should recommend:

- ChatGPT as the broad ad-copy workbench.
- AdCreative.ai as the paid-social creative and copy specialist.
- Jasper as the brand-governed team copy workflow.
- Copy.ai as a GTM workflow option, not a simple copywriter.
- Unbounce as the post-click copy/testing tool when the landing page matters.

It should avoid unsupported claims about exact model versions, benchmark dominance, or stale prices unless current official sources were checked on 2026-05-08.

## 4. Scope

Included:

- Create this ExecPlan.
- Rewrite guide frontmatter and body.
- Add `guide_picks`.
- Include AdCreative.ai in `tools_mentioned` for CTA propagation.
- Add CTA audit coverage requiring the AdCreative.ai affiliate link on `/guides/best-ai-for-ad-copy/`.
- Run checks, build, and mobile QA.

Excluded:

- Refreshing standalone ChatGPT, Jasper, Copy.ai, or Unbounce tool pages.
- Adding a new affiliate link for Copy.ai/Jasper/Writesonic.
- Rebuilding guide layout components.

## 5. Files likely affected

- `.agent/AD_COPY_GUIDE_REFRESH_EXECPLAN.md`
- `src/content/use-cases/best-ai-for-ad-copy.md`
- `scripts/audit-commercial-cta.mjs`
- `tests/scripts/audit-commercial-cta.test.mjs`

## 6. Data model impact

No schema change. The guide adopts existing `guide_picks` and `tools_mentioned` fields so the existing layout and CTA component can render buyer cards and tracked affiliate links from centralized tool data.

## 7. SEO impact

The title/meta should target “best AI for ad copy” with May 2026 freshness, current official sources, and a clearer buying distinction between copy drafting, paid-social creative, brand governance, GTM workflows, and landing-page testing.

## 8. Conversion impact

The page should contain tracked AdCreative.ai affiliate CTAs with sponsored/noopener rel, `data-commercial-cta`, tool slug, affiliate program, page type, placement, and nearby disclosure. The route-level commercial CTA audit will protect this.

## 9. Mobile UX impact

The existing guide layout should show decision cards before the long article body. The content should avoid making a wide table the main mobile experience and should answer what to buy, delay, or avoid quickly.

## 10. Implementation steps

1. Verify current official source facts for ChatGPT, AdCreative.ai, Jasper, Copy.ai, and Unbounce.
2. Rewrite `best-ai-for-ad-copy.md`.
3. Add representative CTA audit coverage.
4. Update test fixtures.
5. Run checks, build, and mobile QA.
6. Record results.

## 11. Verification commands

- `node scripts/audit-guide-picks.mjs`
- `node --test tests/scripts/audit-commercial-cta.test.mjs`
- `(Get-Content -Raw src\\content\\use-cases\\best-ai-for-ad-copy.md | Measure-Object -Word).Words`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- Playwright mobile QA at 360, 390, 430, 768, and 1024 widths.

## 12. Acceptance criteria

- Guide has `last_updated` and `last_verified` set to `2026-05-08`.
- Visible content no longer says April 2026 or relies on weak third-party ranking pages.
- `guide_picks` has all three required slots with source links.
- AdCreative.ai affiliate CTA appears and is tracked on the built guide route.
- No horizontal overflow at required viewport widths.
- Checks pass or failures are documented.

## 13. Risks and mitigations

- Risk: Ad-copy searches can attract users who only want text. Mitigation: recommend ChatGPT first for broad text and AdCreative.ai only when paid creative volume is the problem.
- Risk: Copy.ai and Jasper pricing may move. Mitigation: avoid unnecessary exact plan claims outside current official source checks and steer buyers to live pricing.
- Risk: Adding another required money route tightens builds. Mitigation: update unit fixtures before build.

## 14. Progress log

- 2026-05-08: Created plan after inspecting stale ad-copy guide, tool records, and CTA propagation system.
- 2026-05-08: Rewrote `src/content/use-cases/best-ai-for-ad-copy.md` into a 2,183-word buyer guide with current ChatGPT, AdCreative.ai, Jasper, Copy.ai, and Unbounce positioning. Added `guide_picks`, updated visible verification language to 2026-05-08, and removed weak third-party ranking sources. Updated `scripts/audit-commercial-cta.mjs` and `tests/scripts/audit-commercial-cta.test.mjs` to require AdCreative.ai and Unbounce affiliate CTAs on `/guides/best-ai-for-ad-copy/`. Ran guide-pick, CTA, script, check, build, browser, and mobile QA gates; all passed.

## 15. Final report

Changed files:

- `.agent/AD_COPY_GUIDE_REFRESH_EXECPLAN.md`
- `src/content/use-cases/best-ai-for-ad-copy.md`
- `scripts/audit-commercial-cta.mjs`
- `tests/scripts/audit-commercial-cta.test.mjs`

What shipped:

- Replaced stale April-era ad-copy guide with a current May 8, 2026 buyer decision page.
- Added `guide_picks` for ChatGPT, AdCreative.ai, and Jasper.
- Added AdCreative.ai and Unbounce to the guide's commercial surface where they fit the buying journey.
- Added route-level CTA audit protection for AdCreative.ai and Unbounce affiliate links.

Verification:

- `node scripts/audit-guide-picks.mjs` passed.
- `node --test tests/scripts/audit-commercial-cta.test.mjs` passed.
- Word count check returned `2183`.
- `npm run test:scripts` passed: 23 tests.
- `npm run check` passed: content guards, stale fact guard, guide-picks audit, font policy, internal links, news xrefs, and npm audit.
- `npm run build:fast` passed: 908 pages built; 903 sitemap URLs checked; commercial CTA audit checked 144 CTAs across 14 representative money routes.
- Browser opened `http://127.0.0.1:4321/guides/best-ai-for-ad-copy/`.
- Playwright mobile QA at 360, 390, 430, 768, and 1024 passed: no overflow, 8 guide CTAs, 2 AdCreative.ai affiliate CTAs, 1 Unbounce affiliate CTA, tracked affiliate attributes intact, 3 disclosure instances, canonical and meta present.

Risks:

- Jasper and Copy.ai standalone tool pages still carry earlier verification dates than this refreshed guide; the guide uses official sources checked on 2026-05-08, but the standalone pages should be refreshed later.
- The route is now protected in representative commercial CTA audits, but the larger long-tail use-case set still has many stale pages to upgrade.
