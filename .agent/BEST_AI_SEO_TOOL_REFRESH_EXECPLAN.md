# Best AI SEO Tool Guide Refresh ExecPlan

## 1. Objective

Rebuild `src/content/use-cases/best-ai-seo-tool.md` into a current, mobile-first, source-backed buyer guide for SEO teams choosing between content optimization, full-suite SEO, backlink research, AI visibility tracking, and budget content scoring.

## 2. Current state

- Route: `/guides/best-ai-seo-tool/`
- Content file: `src/content/use-cases/best-ai-seo-tool.md`
- Current body word count: about 788 words, below the 850-word use-case quality floor.
- The page still names stale Surfer pricing (`$89/mo Essential`) even though the current official pricing page shows Discovery $49, Standard $99, Pro $182, Peace of Mind $299, and Enterprise $999+ / custom.
- It references unsupported/fake future model names such as `Gemini 3.1 Pro`, `Claude Opus 4.7`, and `Grok 4.20` in SEO/GEO guidance.
- It under-explains buyer segmentation: content optimization vs full SEO suite vs backlink research vs AI visibility vs budget scoring.
- The methodology section claims testing but does not provide enough concrete, source-backed decision value.

## 3. Current sources checked on 2026-05-08

- Surfer pricing: `https://surferseo.com/pricing/`
- Surfer Content Editor: `https://surferseo.com/content-editor/`
- Semrush pricing / SEO Toolkit limits: `https://www.semrush.com/kb/935-manage-your-guru-account`
- Semrush AI Visibility Toolkit: `https://www.semrush.com/kb/1568-tracking-ai-visibility-and-rankings-using-ai-seo-toolkit`
- Ahrefs pricing: `https://ahrefs.com/pricing`
- Ahrefs Brand Radar: `https://ahrefs.com/brand-radar`
- NeuronWriter pricing: `https://neuronwriter.com/pricing-neuron/`
- NeuronWriter features: `https://neuronwriter.com/features/`
- Google helpful, reliable, people-first content guidance: `https://developers.google.com/search/docs/fundamentals/creating-helpful-content`

## 4. Target state

- Current May 8, 2026 verification language in frontmatter and visible body copy.
- Clear first-screen guide picks:
  - Surfer SEO as best overall for content optimization plus AI-search visibility workflows.
  - NeuronWriter as the budget content-scoring pick.
  - Semrush as the pro/team all-in-one SEO-suite pick.
- Ahrefs covered as the backlink/data and AI-visibility-data pick, not misrepresented as the best content optimizer.
- Pricing table uses current official pricing anchors and avoids stale `Essential $89` language.
- The page explains what to buy by buyer type, when to avoid each tool, and which plan to choose.
- The content clears the 850-word use-case floor without filler.
- Commercial CTAs remain tracked and official/affiliate disclosures remain honest.

## 5. Scope

Included:

- Rewrite `src/content/use-cases/best-ai-seo-tool.md`.
- Update guide picks, tools mentioned, metadata, dates, source list, and visible current-date language.
- Run focused stale-string/word-count checks, KPI/fact/provenance checks, broader check/build commands, CTA tracking checks, and mobile viewport QA.

Excluded:

- Tool record data-model changes.
- Affiliate application changes.
- Category template changes.
- Bulk SEO-tool comparison refreshes.

## 6. Verification commands

- Focused word-count and stale/fake-model string check for `src/content/use-cases/best-ai-seo-tool.md`
- `node scripts/audit-site-kpis.mjs --json`
- `node scripts/audit-tool-facts.mjs --json`
- `npm run audit:provenance`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- Local viewport QA for `/guides/best-ai-seo-tool/` at 360, 390, 430, 768, and 1024 px
- CTA payload check for guide commercial CTAs

## 7. Acceptance criteria

- No stale Surfer `$89` / `Essential` buyer claim remains.
- No fake/future model-name references remain in this guide.
- The body is above 850 words and buyer-intent focused.
- The route returns 200 and has no horizontal overflow at required mobile widths.
- Guide CTAs include page type, placement, tool slug, destination type, and page slug.
- Build/check commands pass or any failure is documented with exact output.

## 8. Progress log

- 2026-05-08: Selected `best-ai-seo-tool` because it is a high-intent money guide, under the use-case quality floor, and contains stale pricing/model claims. Verified current official vendor and Google sources before editing.
- 2026-05-08: Rewrote `src/content/use-cases/best-ai-seo-tool.md` into a current buyer guide covering Surfer SEO, Semrush, Ahrefs, and NeuronWriter by buyer type, plan choice, pricing traps, AI visibility, and avoid/fit guidance.
- 2026-05-08: Focused content gate passed with 1,743 body words, no stale `$89` / `Essential` / fake future-model strings, and visible May 8 verification.
- 2026-05-08: Site KPI audit shows use-case thin-risk count dropped from 43 to 42 and `best-ai-seo-tool` no longer appears in the thin-risk list.
- 2026-05-08: Fact audit, provenance audit, script tests, `npm run check`, and `npm run build:fast` passed. Fast build generated 905 pages; indexability and representative commercial CTA audits passed.
- 2026-05-08: Browser and Playwright QA passed for `/guides/best-ai-seo-tool/` at 360, 390, 430, 768, and 1024 px with HTTP 200, no horizontal overflow, current-source signals, buyer-decision copy, disclosure/trust text, and seven tracked commercial CTAs with complete payload fields.

## 9. Final report

Completed for this checkpoint.

- Content changed: `src/content/use-cases/best-ai-seo-tool.md`
- Plan changed: `.agent/BEST_AI_SEO_TOOL_REFRESH_EXECPLAN.md`
- SEO/trust impact: the guide now uses current May 8, 2026 vendor and Google sources, removes stale pricing and fake model references, and adds buyer-specific plan guidance.
- Mobile/conversion impact: the guide's first mobile flow now exposes best overall, budget, and pro/team picks through structured guide cards and tracked CTAs, with no horizontal overflow at required widths.
- Verification: focused content gate, KPI audit, fact audit, provenance audit, script tests, `npm run check`, `npm run build:fast`, app-browser QA, viewport QA, and CTA payload QA all passed for this checkpoint.
- Remaining risk: the broader use-case library still has 42 thin-risk pages, and the comparison library still has 199 thin-risk pages.
