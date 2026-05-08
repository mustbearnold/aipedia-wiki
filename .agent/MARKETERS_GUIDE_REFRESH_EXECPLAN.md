# Marketers Guide Refresh ExecPlan

## 1. Objective

Refresh `best-ai-tools-for-marketers` into a current, mobile-first buyer decision guide that routes marketing visitors toward the right stack: ChatGPT for broad strategy and copy, AdCreative.ai for paid ad creative volume, and Unbounce for landing-page conversion. The checkpoint improves SEO freshness, trust, affiliate conversion, and audit coverage for the newly supplied AdCreative.ai and Unbounce affiliate links.

## 2. Current state

`src/content/use-cases/best-ai-tools-for-marketers.md` is stale. It is verified `2026-05-03`, but the visible copy still says April 2026, cites weak third-party ranking pages, and ranks ChatGPT, Jasper, and Gemini as generic picks. The current page does not use AdCreative.ai or Unbounce even though those are approved affiliate tools with current tool records:

- `src/content/tools/adcreative.md` has the affiliate URL `https://free-trial.adcreative.ai/46864ltm9g0d`, FirstPromoter network, and `last_verified: 2026-05-08`.
- `src/content/tools/unbounce.md` has the affiliate URL `https://unbounce.partnerlinks.io/f49zh5fwcfoo`, PartnerStack network, and `last_verified: 2026-05-08`.

`src/pages/guides/[slug].astro` renders use-case guides from content entries. `GuideLayout.astro` reads `guide_picks` and `tools_mentioned`, then renders tracked `CommercialCTA` components from centralized tool records. `scripts/audit-guide-picks.mjs` already protects `best-ai-tools-for-marketers`, but `scripts/audit-commercial-cta.mjs` does not yet require AdCreative.ai and Unbounce affiliate CTAs on this guide.

## 3. Target state

The guide should answer quickly on mobile:

- Best overall marketing AI tool.
- Best ad creative production tool.
- Best conversion landing-page tool.
- What not to buy yet.
- Which plan or tier to inspect.
- Why the recommendation is current and source-backed as of 2026-05-08.

The page should remain static and crawlable, with no new client JavaScript.

## 4. Scope

Included:

- Rewrite the marketer guide content and frontmatter.
- Update `tools_mentioned` and `guide_picks` to include ChatGPT, AdCreative.ai, Unbounce, Jasper, and Gemini.
- Add commercial CTA audit coverage for the guide requiring AdCreative.ai and Unbounce affiliate links.
- Update tests for the representative CTA audit route.
- Run guide-pick, CTA, script, check, build, and mobile overflow QA.

Excluded:

- Rebuilding `GuideLayout.astro`.
- Refreshing standalone ChatGPT, Jasper, or Gemini tool pages.
- Adding new affiliate programs.

## 5. Files likely affected

- `.agent/MARKETERS_GUIDE_REFRESH_EXECPLAN.md`
- `src/content/use-cases/best-ai-tools-for-marketers.md`
- `scripts/audit-commercial-cta.mjs`
- `tests/scripts/audit-commercial-cta.test.mjs`

## 6. Data model impact

The guide uses the existing use-case content model. `tools_mentioned` becomes the propagation control for guide CTAs, and `guide_picks` provides the top mobile decision module. No schema migration is needed.

## 7. SEO impact

The rewrite targets stronger search intent around “best AI tools for marketers” with May 2026 freshness, distinct tool roles, official sources, better plan guidance, and internal links to relevant tool pages/categories. The title and meta description should be unique and current.

## 8. Conversion impact

AdCreative.ai and Unbounce affiliate CTAs should appear through the shared guide CTA system with tracking attributes, affiliate program payloads, and nearby disclosure. The audit will protect those exact affiliate URLs on the built route.

## 9. Mobile UX impact

The guide uses the existing mobile-first `GuideLayout` decision card stack. Content avoids wide tables as the primary buying surface and gives concise stacked recommendations before deeper detail. QA must check 360, 390, 430, 768, and 1024 widths for overflow and CTA/disclosure presence.

## 10. Implementation steps

1. Verify current source facts against official pages dated 2026-05-08.
2. Rewrite marketer guide frontmatter and body.
3. Add route-level CTA audit coverage for AdCreative.ai and Unbounce on `/guides/best-ai-tools-for-marketers/`.
4. Update CTA audit unit fixtures.
5. Run checks and mobile QA.
6. Record results in this plan.

## 11. Verification commands

- `node scripts/audit-guide-picks.mjs`
- `node --test tests/scripts/audit-commercial-cta.test.mjs`
- `(Get-Content -Raw src\\content\\use-cases\\best-ai-tools-for-marketers.md | Measure-Object -Word).Words`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- Playwright mobile QA at 360, 390, 430, 768, and 1024 widths.

## 12. Acceptance criteria

- Guide has current `last_updated` and `last_verified` set to `2026-05-08`.
- Guide copy no longer relies on stale April wording or weak ranking sources.
- `tools_mentioned` includes `adcreative` and `unbounce`.
- Built guide contains tracked affiliate CTAs for AdCreative.ai and Unbounce.
- Affiliate disclosure appears near commercial decisions.
- No horizontal overflow at required mobile widths.
- Relevant checks pass or failures are documented.

## 13. Risks and mitigations

- Risk: pricing and plan pages can change quickly. Mitigation: use official sources, visible verification date, and caveat volatile live checkout details.
- Risk: adding more required CTA routes can make builds stricter. Mitigation: update tests and run `build:fast`.
- Risk: ChatGPT/Gemini/Jasper volatile product claims drift. Mitigation: keep claims high-level unless official source was rechecked during this checkpoint.

## 14. Progress log

- 2026-05-08: Created ExecPlan after inspecting guide content, tool records, CTA audit, test fixtures, and doctrine files.
- 2026-05-08: Rewrote `src/content/use-cases/best-ai-tools-for-marketers.md` as a 2,234-word source-backed buyer guide with ChatGPT, AdCreative.ai, Unbounce, Jasper, and Gemini. Updated `scripts/audit-commercial-cta.mjs` and `tests/scripts/audit-commercial-cta.test.mjs` so `/guides/best-ai-tools-for-marketers/` must include tracked AdCreative.ai and Unbounce affiliate CTAs. Ran guide-pick, CTA, script, check, build, and mobile QA gates; all passed.

## 15. Final report

Changed files:

- `.agent/MARKETERS_GUIDE_REFRESH_EXECPLAN.md`
- `src/content/use-cases/best-ai-tools-for-marketers.md`
- `scripts/audit-commercial-cta.mjs`
- `tests/scripts/audit-commercial-cta.test.mjs`

What shipped:

- Replaced stale April-era marketer guide with a current May 8, 2026 buyer stack.
- Added AdCreative.ai and Unbounce to `tools_mentioned` so guide CTA cards propagate their centralized affiliate links.
- Added required representative CTA audit coverage for AdCreative.ai and Unbounce on the marketer guide.
- Kept the page static, crawlable, and mobile decision-first through the existing guide layout.

Verification:

- `node scripts/audit-guide-picks.mjs` passed.
- `node --test tests/scripts/audit-commercial-cta.test.mjs` passed.
- Word count check returned `2234`.
- `npm run test:scripts` passed: 23 tests.
- `npm run check` passed: content guards, stale fact guard, guide-picks audit, font policy, internal links, news xrefs, and npm audit.
- `npm run build:fast` passed: 908 pages built; 903 sitemap URLs checked; commercial CTA audit checked 136 CTAs across 13 representative money routes.
- Browser opened `http://127.0.0.1:4321/guides/best-ai-tools-for-marketers/`.
- Playwright mobile QA at 360, 390, 430, 768, and 1024 passed: no overflow, 8 guide CTAs, 2 AdCreative.ai affiliate CTAs, 2 Unbounce affiliate CTAs, tracked affiliate attributes intact, 4 disclosure instances, canonical and meta present.

Risks:

- ChatGPT, Jasper, and Gemini standalone tool records still have some `last_verified` dates earlier than this guide. The guide avoids unsupported narrow claims and cites official pages checked on 2026-05-08, but those tool pages should be refreshed in later checkpoints.
- The guide is now protected, but broader guide-route coverage is still representative rather than exhaustive.
