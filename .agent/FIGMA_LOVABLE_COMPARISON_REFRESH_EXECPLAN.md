# Figma + Lovable Comparison Refresh ExecPlan

## 1. Objective

Refresh the Figma facts that power comparison tables, then rebuild `src/content/comparisons/figma-vs-lovable.md` into a current May 8, 2026 buyer decision page.

## 2. Current state

- Routes: `/tools/figma/`, `/compare/figma-vs-lovable/`
- Files:
  - `src/content/tools/figma.md`
  - `src/content/comparisons/figma-vs-lovable.md`
  - `src/data/source-registry.json`
- Current problems:
  - `figma-vs-lovable` is only about 508 words and still says "as of April 2026."
  - The comparison cites weak third-party sources and unsupported model claims.
  - The Figma tool page still has visible April verification copy and says Claude Opus is the default Make model, while current Figma docs say the default may change and list selectable models separately.
  - The comparison's canonical fact table reads Figma tool facts, so the Figma record needs current May 8 verification before the comparison is rebuilt.

## 3. Current sources checked on 2026-05-08

- Figma pricing: `https://www.figma.com/pricing/`
- Figma AI credits: `https://help.figma.com/hc/en-us/articles/33459875669015-How-AI-credits-work`
- Figma Make model selection: `https://help.figma.com/hc/en-us/articles/36400680326551-Select-an-AI-model-to-use-in-Figma-Make`
- Figma Make creation/editing docs: `https://help.figma.com/hc/en-us/articles/31304485164695-Create-and-edit-a-Figma-Make-file`
- Figma Make advanced/code handoff docs: `https://help.figma.com/hc/en-us/articles/35710574222487-Beyond-the-basics-Using-Figma-Make`
- Figma plans/features docs: `https://help.figma.com/hc/en-us/articles/360040328273-Figma-plans-and-features`
- Lovable pricing: `https://lovable.dev/pricing`
- Lovable plans and credits: `https://docs.lovable.dev/introduction/plans-and-credits`
- Lovable Cloud: `https://docs.lovable.dev/integrations/cloud`

## 4. Target state

- Figma tool page should use May 8 verification, current pricing, AI credits, Make model-selection language, Make app/code handoff, Sites/Buzz beta framing, and correct buyer watch-outs.
- Comparison should answer the buyer question quickly: Figma wins design systems, product design collaboration, Dev Mode, and design-to-functional-prototype workflows; Lovable wins founder MVPs, app generation, backend/cloud paths, and nontechnical launch speed.
- Remove unsupported model claims and stale April language.
- Preserve mobile-first comparison template behavior, canonical fact table, tracked CTAs, and source-backed commercial disclosures.

## 5. Verification plan

- Focused content gate for word count, May 8 language, required buyer sections, source links, and stale-string removal.
- Source registry JSON parse/check.
- `git diff --check -- src\content\tools\figma.md src\content\comparisons\figma-vs-lovable.md src\data\source-registry.json .agent\FIGMA_LOVABLE_COMPARISON_REFRESH_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run check`
- `npm run build:fast`
- App-browser QA for `/tools/figma/` and `/compare/figma-vs-lovable/`
- Viewport QA at 360, 390, 430, 768, and 1024 px for both routes.

## 6. Acceptance criteria

- Figma and comparison pages show May 8, 2026 verification language.
- No stale strings remain: April 2026 framing, "Claude Opus default", "Claude Sonnet 4.6 backend", unsupported "Gemini 3.1 Pro integration" as a Figma-wide flagship, or old Lovable $20/Teams language.
- Comparison body is over 1,200 words and includes quick answer, winner by use case, pricing, plan guidance, production watch-outs, source-backed methodology, FAQ, and related links.
- Tool/comparison CTAs are tracked with page slug, tool slug, placement, destination, affiliate flag, and disclosure behavior.
- Build and relevant checks pass.

## 7. Progress log

- 2026-05-08: Selected this checkpoint after Bolt because `figma-vs-lovable` is one of the thinnest comparison pages and directly supports the refreshed AI Design buyer path.
- 2026-05-08: Rebuilt `src/content/tools/figma.md` with current Figma pricing, Full-seat framing, AI credits, Figma Make model-selection language, Make/Sites/Buzz scope, best-plan guidance, alternatives, source links, and an internal news cross-reference required by `audit-news-xrefs`.
- 2026-05-08: Rebuilt `src/content/comparisons/figma-vs-lovable.md` from a thin April comparison into a current buyer decision page: quick answer, winner by use case, pricing reality, product-scope split, best plan guidance, production/handoff risks, methodology, FAQ, sources, and related internal links.
- 2026-05-08: Added current Figma registry sources for Make creation, Make advanced/code handoff, plans/features, and billing.
- 2026-05-08: Browser QA and viewport QA passed for `/tools/figma/` and `/compare/figma-vs-lovable/`; both routes had unique titles, canonicals, one H1, May 8 verification language, complete commercial CTA tracking, and no horizontal document overflow at 360, 390, 430, 768, or 1024 px.

## 8. Final report

Files changed:

- `src/content/tools/figma.md`
- `src/content/comparisons/figma-vs-lovable.md`
- `src/data/source-registry.json`
- `.agent/FIGMA_LOVABLE_COMPARISON_REFRESH_EXECPLAN.md`

What improved:

- Figma now has a source-backed May 8, 2026 buyer page instead of stale April verification and outdated Figma Make model language.
- The comparison now supports high-intent "Figma vs Lovable" searches with a clear buyer split, pricing guidance, plan recommendations, production warnings, and source-backed methodology.
- The comparison no longer sits in the KPI audit's shortest comparison list, reducing comparison thin-page risk from 197 to 196 pages.

Mobile impact:

- Both pages keep the decision summary, pricing, watch-outs, and CTAs in crawlable content that works in the existing mobile-first tool and comparison templates.
- Viewport QA found no horizontal document overflow at 360, 390, 430, 768, or 1024 px.

SEO impact:

- Updated unique titles and meta descriptions for May 2026 intent.
- Added canonical-compatible source-backed content, FAQs, related internal links, and the required Claude Design news cross-reference.
- Removed stale April language and unsupported model-default claims.

Conversion/revenue impact:

- CTAs use specific buyer labels and the existing tracked CTA system.
- Content explains when the buyer should start with Figma versus Lovable, reducing low-fit clicks while improving qualified commercial intent.
- No tracked affiliate publisher links are configured for either Figma or Lovable, so the pages transparently use official vendor links.

Checks run:

- Focused content gate for word count, required sections, May 8 language, and stale-string removal.
- Source registry JSON parse/check.
- `git diff --check -- src\content\tools\figma.md src\content\comparisons\figma-vs-lovable.md src\data\source-registry.json .agent\FIGMA_LOVABLE_COMPARISON_REFRESH_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- App-browser QA for `/tools/figma/` and `/compare/figma-vs-lovable/`
- External Playwright viewport QA at 360, 390, 430, 768, and 1024 px for both routes.

Remaining risks / next steps:

- The comparison template auto-generates a use-case winner CTA from score data even when `winner: depends`; content still makes the no-universal-winner nuance clear, but this template behavior should be reviewed in a later comparison-template checkpoint.
- Many comparison pages remain thin; the next checkpoint should prioritize another high-intent buyer comparison or money use-case rather than the shortest page alone.
