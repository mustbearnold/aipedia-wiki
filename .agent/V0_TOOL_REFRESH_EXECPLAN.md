# v0 Tool Page Refresh ExecPlan

## 1. Objective

Refresh `src/content/tools/v0.md` into a current, source-backed buyer decision page for v0 by Vercel as of May 8, 2026.

## 2. Current state

- Route: `/tools/v0/`
- Content file: `src/content/tools/v0.md`
- The page still uses April 2026 metadata and body verification language despite frontmatter dates from 2026-05-02.
- It frames v0 mainly as a shadcn/ui component generator and repeatedly says it stops at the component boundary.
- Current v0 docs now describe v0 as an AI agent for real code, full-stack apps, agents, backend connections, deployment, and pull requests.
- It still promotes a public `Premium $20/mo` buyer path, but the current public pricing page lists Free, Team, Business, and Enterprise plus model token pricing.
- The page needs stronger buyer guidance for solo builders, Vercel teams, non-developers, and production risk review.

## 3. Current sources checked on 2026-05-08

- v0 pricing: `https://v0.app/pricing`
- v0 docs: `https://v0.app/docs`
- Vercel updated v0 pricing announcement: `https://vercel.com/blog/updated-v0-pricing`
- v0 changelog: `https://v0.app/changelog`

## 4. Target state

- Update frontmatter and visible verification language to May 8, 2026.
- Remove stale April 2026, April 17, May 2, and public Premium $20/mo claims.
- Position v0 as Vercel's AI app builder, not just a component factory.
- Explain the current public pricing page: Free, Team, Business, Enterprise, included credits, daily login credits, and model token pricing.
- Preserve caution: generated code still needs accessibility, security, state, data, performance, and maintainability review.
- Keep affiliate disclosure honest because no tracked v0 affiliate publisher link is configured.
- Keep internal links to relevant alternatives and comparisons.

## 5. Verification plan

- Focused word-count and stale-string check for `src/content/tools/v0.md`.
- `node scripts/audit-tool-facts.mjs --json`
- `npm run audit:provenance`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- Browser QA for `/tools/v0/`
- Local viewport QA at 360, 390, 430, 768, and 1024 px

## 6. Acceptance criteria

- No stale public `Premium $20/mo`, `April 2026`, `2026-04-17`, or `2026-05-02` claims remain.
- All changed volatile facts have 2026-05-08 verification language and primary sources.
- Tool page remains above the 800-word quality floor.
- Route returns 200 with no horizontal overflow at required widths.
- Official CTA/disclosure behavior remains intact.
- Build/check commands pass or failures are documented with exact output.

## 7. Progress log

- 2026-05-08: Selected v0 because the refreshed ChatGPT vs v0 comparison exposed stale standalone tool page claims around pricing and product scope.
- 2026-05-08: Rewrote `src/content/tools/v0.md` as a current buyer decision page: updated metadata, `last_verified`, facts, verdict, pricing, CTA label, buyer guidance, alternatives, failure modes, FAQ, and source list against official v0/Vercel sources.
- 2026-05-08: Removed stale public `Premium $20/mo`, `April 2026`, `2026-04-17`, and `2026-05-02` language. Repositioned v0 from a component factory to Vercel's AI app builder while preserving production-review warnings.
- 2026-05-08: Verification passed: focused v0 content gate, diff check, tool-fact audit, provenance audit, script tests, `npm run check`, `npm run build:fast`, app-browser QA, hero CTA QA, and viewport overflow/CTA sweep at 360/390/430/768/1024 px.

## 8. Final report

Completed on 2026-05-08.

- Files changed: `src/content/tools/v0.md`, `.agent/V0_TOOL_REFRESH_EXECPLAN.md`.
- SEO impact: updated title/meta/date/source language for current May 2026 buyer search intent and removed stale pricing/product claims.
- Mobile impact: route returns 200 with zero horizontal overflow across required widths and mobile-visible buyer decision content.
- Conversion impact: hero CTA now reads `Try v0 by Vercel free` instead of the weaker `Open v0 by Vercel`; six rendered commercial CTAs carry required tracking payload fields.
- Trust impact: volatile pricing, token billing, plan names, product scope, and affiliate-link status are now source-backed and verified on 2026-05-08.
- Remaining risk: several v0-related comparison/category pages still contain stale April wording and old model/pricing claims, especially `canva-vs-v0`, `cursor-vs-v0`, and `src/content/categories/ai-design.md`.
