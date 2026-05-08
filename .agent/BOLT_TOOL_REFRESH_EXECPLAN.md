# Bolt.new Tool Page Refresh ExecPlan

## 1. Objective

Refresh `src/content/tools/bolt.md` into a current May 8, 2026 buyer decision page that matches the rebuilt AI Design category and the Lovable vs Bolt.new vs v0 comparison.

## 2. Current state

- Route: `/tools/bolt/`
- Content file: `src/content/tools/bolt.md`
- Current problems:
  - Visible body still says verified 2026-04-17.
  - Unsupported model claims mention OpenAI frontier models, Claude Opus 4.7, and Gemini 3.1 Pro.
  - Current docs show Bolt Cloud database, hosting, domains, and JavaScript-backend support, but the page says no built-in database/backend.
  - Pricing references older token-pack specificity that no longer appears on the current public pricing page and should be stated from current docs only.
  - SEO title is not May 2026/current-date framed.

## 3. Current sources checked on 2026-05-08

- Bolt pricing: `https://bolt.new/pricing`
- Bolt introduction docs: `https://support.bolt.new/building/intro-bolt`
- Bolt database docs: `https://support.bolt.new/cloud/database`
- Bolt token docs: `https://support.bolt.new/account-and-subscription/tokens`
- Bolt supported technologies: `https://support.bolt.new/building/supported-technologies`
- Bolt hosting docs: `https://support.bolt.new/cloud/hosting`
- StackBlitz WebContainers: `https://webcontainers.io/`

## 4. Target state

- Position Bolt.new as the best browser-native build/run/debug app-builder workflow.
- Keep Lovable as better for founder-style guided MVPs and v0 as better for Vercel-native React/Next work.
- Update pricing to current Free, Pro, Teams, and Enterprise structure.
- Explain token burn, rollover, reloads, free daily/monthly limits, databases, hosting, custom domains, and JavaScript-backend limits.
- Remove unsupported current model names and old "no built-in database" claims.

## 5. Verification plan

- Focused content gate for word count, May 8 verification, current pricing/source strings, stale-string removal, and required buyer sections.
- `git diff --check -- src\content\tools\bolt.md src\data\source-registry.json .agent\BOLT_TOOL_REFRESH_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run check`
- `npm run build:fast`
- App-browser QA for `/tools/bolt/`
- Viewport QA at 360, 390, 430, 768, and 1024 px for route 200, no document-level overflow, current source visibility, and CTA tracking payloads.

## 6. Acceptance criteria

- No unsupported model-name claims, April verification language, old token-pack price claims, or "no built-in database/backend" claims remain.
- Body is over 1,200 words and reads as a buyer decision page.
- Pricing, best plan, token economics, Bolt Cloud/database, supported technologies, watch-outs, alternatives, FAQ, and sources are visible.
- Facts and source registry entries use current May 8 source IDs.
- Route builds and renders with tracked official CTAs and no mobile overflow.

## 7. Progress log

- 2026-05-08: Selected this page after the Lovable refresh because stale Bolt facts would undermine the same high-intent AI app-builder buyer path.
- 2026-05-08: Rebuilt the Bolt.new tool record and body around current pricing, token economics, Bolt Cloud database/hosting, WebContainers, supported stack limits, plan guidance, alternatives, FAQ, and source-backed buyer advice.
- 2026-05-08: Added Bolt source registry IDs for introduction, database, hosting, token, and supported-technology docs.
- 2026-05-08: Found and fixed a shared attribution gap in dynamically generated tool pricing-table CTAs: `PostBodyEnhancements.astro` now adds `data-cta-page-slug` and `data-cta-is-sticky="false"` to plan-row commercial links.
- 2026-05-08: Added a script test to guard the dynamic pricing-table CTA tracking attributes.

## 8. Final report

Files changed:

- `src/content/tools/bolt.md`
- `src/data/source-registry.json`
- `src/components/PostBodyEnhancements.astro`
- `tests/scripts/post-body-enhancements.test.mjs`
- `.agent/BOLT_TOOL_REFRESH_EXECPLAN.md`

Verification completed:

- Focused Bolt content gate: 2,241 words, required buyer/source sections present, banned stale claims absent.
- Source registry JSON parse/check: passed.
- `git diff --check -- src\components\PostBodyEnhancements.astro tests\scripts\post-body-enhancements.test.mjs src\content\tools\bolt.md src\data\source-registry.json .agent\BOLT_TOOL_REFRESH_EXECPLAN.md`: passed with line-ending warnings only.
- `node scripts/audit-site-kpis.mjs --json`: passed.
- `node --test tests/scripts/post-body-enhancements.test.mjs`: 1/1 passed.
- `npm run test:scripts`: 16/16 passed.
- `npm run check`: passed (`guard-content`, `guard-stale-facts`, `audit-guide-picks`, font policy, internal links, news xrefs, npm audit).
- `npm run build:fast`: passed; 905 pages built, indexability audit passed, commercial CTA audit passed.
- In-app browser QA for `/tools/bolt/`: title, canonical, H1, meta description, May 8 verification language, buyer sections, current pricing/token/database claims, and stale-string absence passed.
- Browser CTA tracking QA for `/tools/bolt/`: 6 commercial CTAs found; all now include page type, page slug, placement, tool slug/name, label, destination type, affiliate flag, and sticky flag.
- Playwright viewport QA at 360, 390, 430, 768, and 1024 px: route 200, no document-level horizontal overflow, required content visible, stale strings absent, CTA tracking complete.

Remaining risks:

- Bolt has no configured affiliate publisher link, so CTAs are tracked as official destination links until a real affiliate program/link exists.
- The pricing table still scrolls/clips internally on narrow mobile, which is acceptable for document overflow and consistent with current repo smoke-test logic, but a later permanent mobile template pass should convert pricing tables into stacked plan cards.
