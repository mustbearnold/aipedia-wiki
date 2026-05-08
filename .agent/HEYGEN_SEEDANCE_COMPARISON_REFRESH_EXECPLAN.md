# HeyGen vs Seedance Comparison Refresh ExecPlan

## 1. Objective

Refresh `src/content/comparisons/heygen-vs-seedance.md` into a current, source-backed buyer decision page that correctly compares HeyGen's avatar/business-video platform against ByteDance Seedance 2.0 as a frontier multimodal AI video model.

## 2. Current state

- Route: `/compare/heygen-vs-seedance/`
- Content file: `src/content/comparisons/heygen-vs-seedance.md`
- Current body word count: about 607 words, below the 700-word comparison thin-risk floor.
- The page incorrectly names `Seedance 3.1` even though the current tool record and official ByteDance source are `Seedance 2.0`.
- The page cites `seedance.ai` pricing/docs/blog/API paths as if official. Current source-backed tool data says `seedance.ai` is independent and not affiliated with ByteDance or its products.
- It includes stale or unsupported pricing claims such as "Pro $49/mo" and "Enterprise $199/mo".

## 3. Current sources checked on 2026-05-08

- HeyGen pricing: `https://www.heygen.com/pricing`
- HeyGen LiveAvatar help: `https://help.heygen.com/en/articles/10035615-how-to-get-started-with-liveavatars`
- ByteDance Seedance 2.0: `https://seed.bytedance.com/en/seedance2_0`
- Seedance 2.0 official launch: `https://seed.bytedance.com/en/blog/seedance-2-0-official-launch`
- BytePlus Seedance 2.0 API reference: `https://docs.byteplus.com/api/docs/ModelArk/1520757`
- BytePlus Seedance 2.0 resource packs: `https://docs.byteplus.com/api/docs/ModelArk/2191775`
- Seedance.ai independent disclosure: `https://www.seedance.ai/`

## 4. Target state

The refreshed comparison should:

- Use `Seedance 2.0` consistently.
- Remove unsupported `seedance.ai` pricing/docs/API claims as official evidence.
- Make the buyer split clear: HeyGen for avatar-led business video; Seedance 2.0 for raw multimodal/cinematic video model testing.
- Include current pricing/access guidance without pretending BytePlus resource packs are a normal SaaS subscription.
- Include current source links and visible May 8 verification.
- Clear the comparison thin-risk word floor without filler.

## 5. Scope

Included:

- Rewrite `src/content/comparisons/heygen-vs-seedance.md`.
- Update frontmatter title, metadata, dates, and source list.
- Run focused KPI/fact/provenance checks and broader check/build commands.
- Run mobile viewport QA for `/compare/heygen-vs-seedance/`.

Excluded:

- Tool template changes.
- Logo asset work.
- Affiliate application work.
- Bulk noindex/deletion work.

## 6. Verification commands

- Body word-count and stale-string check for `src/content/comparisons/heygen-vs-seedance.md`
- `node scripts/audit-site-kpis.mjs --json`
- `node scripts/audit-tool-facts.mjs --json`
- `npm run audit:provenance`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- Local viewport QA at 360, 390, 430, 768, and 1024 px

## 7. Acceptance criteria

- No visible `Seedance 3.1`, fake `Pro $49/mo`, or official-seeming `seedance.ai` route claims remain.
- The body is above 700 words.
- The page is verified as of 2026-05-08 and cites official ByteDance/BytePlus/HeyGen sources.
- Build/check commands pass.
- The route returns 200 and has no horizontal overflow at required mobile widths.

## 8. Progress log

- 2026-05-08 05:48 UTC: Selected `heygen-vs-seedance` as the next checkpoint because it had stale model naming, unofficial source usage, unsupported pricing, and thin-page risk. Verified official ByteDance, BytePlus, HeyGen, and Seedance.ai disclosure sources before editing.
- 2026-05-08: Rewrote `src/content/comparisons/heygen-vs-seedance.md` as a current buyer decision page for avatar/business video vs frontier multimodal video generation. Removed stale `Seedance 3.1` naming, unsupported `seedance.ai` official-route claims, and fake SaaS pricing claims.
- 2026-05-08: Focused content gate passed with 1,922 body words, no banned stale strings, and visible May 8 verification language.
- 2026-05-08: KPI/fact/provenance/check/build verification passed. Comparison thin-risk count dropped from 200 to 199 after this checkpoint.
- 2026-05-08: Browser and Playwright QA passed for `/compare/heygen-vs-seedance/` at 360, 390, 430, 768, and 1024 px with HTTP 200, no horizontal overflow, current-source signals, decision copy, disclosure text, and three tracked commercial CTAs.

## 9. Final report

Completed for this checkpoint.

- Content changed: `src/content/comparisons/heygen-vs-seedance.md`
- Plan changed: `.agent/HEYGEN_SEEDANCE_COMPARISON_REFRESH_EXECPLAN.md`
- SEO/trust impact: the page now targets the correct entity, `Seedance 2.0`, separates official ByteDance/BytePlus evidence from the independent `seedance.ai` site, and removes unsupported pricing/access claims.
- Mobile/conversion impact: the route renders without horizontal overflow at required mobile widths and keeps tracked buyer CTAs visible in the comparison flow.
- Verification: focused content gate, KPI audit, fact audit, provenance audit, script tests, `npm run check`, `npm run build:fast`, app-browser QA, and viewport QA all passed for this checkpoint.
- Remaining risk: the broader comparison library still has 199 thin-risk pages and needs systematic refreshes in ranked revenue/SEO order.
