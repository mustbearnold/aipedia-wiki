# AI Design Category Refresh ExecPlan

## 1. Objective

Refresh `src/content/categories/ai-design.md` into a current, mobile-first buying guide for AI design tools and AI app builders as of May 8, 2026.

## 2. Current state

- Route: `/categories/ai-design/`
- Content file: `src/content/categories/ai-design.md`
- Metadata and body are verified only to 2026-04-17.
- The body says v0 competes at `$20/month` and lists `Premium`, which conflicts with the current public v0 pricing page.
- It includes old or unsupported claims such as Google Stitch `350 gen/mo`, Figma stock impact, Lovable `$20M ARR in 2 months`, and short video-idea notes that do not help buyers.
- The category currently reads like a thin directory summary rather than a mobile-first decision page.

## 3. Current sources checked on 2026-05-08

- Canva AI: `https://www.canva.com/canva-ai/`
- Figma pricing: `https://www.figma.com/pricing/`
- Google Stitch announcement: `https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/`
- Lovable pricing: `https://lovable.dev/pricing`
- Bolt.new pricing: `https://bolt.new/pricing`
- v0 pricing: `https://v0.app/pricing`
- v0 docs: `https://v0.app/docs`

## 4. Target state

- Update metadata and visible verification language to May 8, 2026.
- Add configured category top picks for the mobile hero.
- Split the buyer decision by job:
  - non-designer content and brand assets
  - professional product design and design systems
  - full-stack app builders
  - Vercel-native app/UI builders
  - browser app builders
  - experimental vibe-design canvases
- Remove stale public v0 `$20 Premium`, Stitch quota, ARR, and fake model claims.
- Include source-backed pricing and buyer caveats only where official sources support them.
- Keep internal links to tool pages and comparison routes.

## 5. Verification plan

- Focused word-count and stale-string check for `src/content/categories/ai-design.md`.
- `node scripts/audit-site-kpis.mjs --json`
- `npm run check`
- `npm run build:fast`
- Browser QA for `/categories/ai-design/`
- Local viewport QA at 360, 390, 430, 768, and 1024 px
- Category CTA payload QA

## 6. Acceptance criteria

- No stale `$20/mo Premium`, `Updated April 2026`, `2026-04-17`, `350 gen/mo`, fake model, or ARR claims remain.
- The body is substantive enough to be a buyer guide, not a thin category stub.
- The route returns 200 with no horizontal overflow at required widths.
- Category top-pick and ranked-list CTAs include required tracking payload fields.
- Build/check commands pass or failures are documented.

## 7. Progress log

- 2026-05-08: Selected AI Design category because v0, Google Stitch, Lovable, Bolt, Canva, and Figma buyer claims had drifted from current official sources.
- 2026-05-08: Rewrote `src/content/categories/ai-design.md` as a 1,546-word current buyer guide. Updated metadata/top picks, split the category by buyer job, added source-backed pricing reality, removed stale April 2026/v0 legacy pricing/Stitch quota/ARR/fake model claims, and added the next money-page rebuild queue.
- 2026-05-08: Focused content gate passed: current May 8 verification, official sources present, required buyer sections present, no banned stale strings.
- 2026-05-08: App-browser QA on `/categories/ai-design/` passed for title, canonical, one H1, May 8 visibility, buyer sections, current v0 pricing, and 23 tracked commercial CTAs (3 top-pick, 20 ranked-list) with category payload fields.
- 2026-05-08: Viewport QA at 360, 390, 430, 768, and 1024 px passed: route 200, zero horizontal overflow, top picks visible, current pricing visible, no retired v0 pricing strings, and no missing CTA payload fields.
- 2026-05-08: Verification passed:
  - `git diff --check -- src\content\categories\ai-design.md .agent\AI_DESIGN_CATEGORY_REFRESH_EXECPLAN.md`
  - `node scripts/audit-site-kpis.mjs --json`
  - `npm run check`
  - `npm run build:fast`

## 8. Final report

Changed files:

- `src/content/categories/ai-design.md`
- `.agent/AI_DESIGN_CATEGORY_REFRESH_EXECPLAN.md`

What improved:

- The AI Design category now functions as a buyer decision page instead of a thin category summary.
- Top picks are configured for the mobile hero: Canva, Google Stitch, and Figma.
- The body separates visual design, product design, full-stack app builders, Vercel-native app building, browser builders, and experimental design canvases.
- Current official-source pricing is included for Figma, Lovable, Bolt.new, and v0; Canva and Stitch are caveated where public pricing/access is not durable enough.
- Stale v0 legacy pricing, Stitch quota, ARR, Figma stock, April 2026, and fake model-version claims were removed.

Mobile impact:

- Required category-page first-screen intent is satisfied with current top picks.
- Viewport QA found zero horizontal overflow at 360, 390, 430, 768, and 1024 px.

SEO impact:

- Updated title/meta to target "Best AI Design & App Builder Tools (May 2026)".
- Added substantive buyer copy, source section, current verification language, and internal links to high-intent comparison rebuild targets.

Conversion impact:

- Category page renders 23 tracked commercial CTAs with page type, placement, tool slug, category slug, destination type, and affiliate/official metadata.
- The page now points buyers toward the highest-intent next money pages: Lovable vs Bolt.new vs v0, Figma AI vs v0, Canva AI vs v0, and Google Stitch vs v0.

Remaining risks / next step:

- The highest-impact next task is rebuilding `/compare/lovable-vs-bolt-vs-v0/`, because it is directly linked from this category and likely still contains stale app-builder pricing/scope language.
