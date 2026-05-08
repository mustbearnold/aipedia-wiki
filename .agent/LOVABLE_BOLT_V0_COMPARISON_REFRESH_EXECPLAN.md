# Lovable vs Bolt.new vs v0 Comparison Refresh ExecPlan

## 1. Objective

Refresh `src/content/comparisons/lovable-vs-bolt-vs-v0.md` into a current May 8, 2026 buyer decision page for the highest-intent AI app-builder comparison linked from the AI Design category.

## 2. Current state

- Route: `/compare/lovable-vs-bolt-vs-v0/`
- Content file: `src/content/comparisons/lovable-vs-bolt-vs-v0.md`
- Current page claims:
  - April 15, 2026 freshness.
  - Bolt.new at `$20/mo`.
  - v0 at `$20/mo`.
  - v0 as UI components only.
  - Bolt without built-in backend/database.
  - Fake/generated flagship model rows such as `GPT-5.3 Codex`.
- Layout: `src/layouts/ComparisonLayout.astro`
  - Renders comparison hero cards, winner by use case, buyer fit panels, canonical fact table, markdown body, commercial CTA tracking.
  - Supports 3-tool comparison pages, but the body must do the hard editorial work because the score-race UI only renders for 2-tool comparisons.

## 3. Current sources checked on 2026-05-08

- Lovable pricing: `https://lovable.dev/pricing`
- Lovable docs: `https://docs.lovable.dev/`
- Bolt pricing: `https://bolt.new/pricing`
- Bolt intro docs: `https://support.bolt.new/building/intro-bolt`
- Bolt database docs: `https://support.bolt.new/cloud/database`
- Bolt token docs: `https://support.bolt.new/account-and-subscription/tokens`
- Bolt supported technologies: `https://support.bolt.new/building/supported-technologies`
- v0 pricing: `https://v0.app/pricing`
- v0 docs: `https://v0.app/docs`
- Vercel updated v0 pricing: `https://vercel.com/blog/updated-v0-pricing`

## 4. Target state

- Reframe the page around buyer jobs:
  - Lovable for founder MVPs and full-stack app scaffolds with editable code/GitHub workflow.
  - Bolt.new for browser-native build/run/debug workflows, JavaScript app work, Bolt Cloud databases, hosting, and token-aware iteration.
  - v0 for Vercel-native web apps, React/Next.js/Tailwind/shadcn workflows, high-fidelity UI, deploys, and PR review loops.
- Keep Lovable as the editorial winner for most founder-style app-builder buyers, while making Bolt and v0 the right winners for their lanes.
- Replace fake model rows with plan/pricing/runtime/backend/deploy/review-flow facts.
- Update metadata and visible verification to May 8, 2026.
- Keep `canonical_fact_table: true`.

## 5. Verification plan

- Focused content gate for word count, current dates, source coverage, stale-string removal, and required buyer sections.
- `git diff --check -- src\content\comparisons\lovable-vs-bolt-vs-v0.md .agent\LOVABLE_BOLT_V0_COMPARISON_REFRESH_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run check`
- `npm run build:fast`
- App-browser QA for `/compare/lovable-vs-bolt-vs-v0/`
- Viewport QA at 360, 390, 430, 768, and 1024 px for route 200, no horizontal overflow, current source visibility, and CTA payloads.

## 6. Acceptance criteria

- No April 2026, `$20/mo` Bolt/v0, old v0 component-only, fake model, or "Bolt no backend" claims remain.
- Body is over 1,200 words and reads as a buyer decision page.
- Winner by use case is explicit.
- Pricing guidance reflects official May 8, 2026 sources.
- Sources are visible and dated 2026-05-08.
- Route builds and renders with tracked comparison CTAs and no mobile overflow.

## 7. Progress log

- 2026-05-08: Selected this comparison as the next checkpoint because the refreshed AI Design category identifies it as the highest-intent app-builder money page and the current page has stale pricing/scope/model claims.
- 2026-05-08: Rewrote the comparison into a 2,200+ word buyer decision page with May 8 verification, current official pricing/source links, explicit winner-by-use-case guidance, and removal of stale/fake app-builder claims.
- 2026-05-08: Focused content gate, stale-string scan, `git diff --check`, and `node scripts/audit-site-kpis.mjs --json` passed for the refreshed comparison.
- 2026-05-08: `npm run check` and `npm run build:fast` passed. The fast build generated 905 pages and the commercial CTA audit passed.
- 2026-05-08: App-browser QA passed for `/compare/lovable-vs-bolt-vs-v0/`: title, canonical, one H1, May 8/source sections, stale-string absence, and four tracked comparison CTAs were confirmed.
- 2026-05-08: Viewport QA passed at 360, 390, 430, 768, and 1024 px with route 200, no document-level horizontal overflow, visible buyer sections, and complete CTA payloads.

## 8. Final report

Refreshed `src/content/comparisons/lovable-vs-bolt-vs-v0.md` as a current buyer decision page. The page now recommends Lovable for most founder-style MVP buyers, Bolt.new for browser-native build/run/debug workflows, and v0 for Vercel-native React/Next.js/web-app workflows. Removed stale April pricing, fake model rows, and outdated backend/scope claims. Mobile, SEO, CTA tracking, and build checks passed.
