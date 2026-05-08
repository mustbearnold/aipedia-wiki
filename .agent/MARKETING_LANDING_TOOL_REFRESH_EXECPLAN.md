# Marketing And Landing Tool Refresh ExecPlan

### 1. Objective

Refresh the monetized AdCreative.ai and Unbounce tool pages into current, mobile-first buyer decision pages that support AiPedia's revenue and SEO goals without weakening editorial trust. The work should make each page clearer about who should buy, who should avoid, which plan to consider, what changed or is volatile, and where affiliate CTAs lead.

### 2. Current state

- `src/content/tools/adcreative.md` already has an approved affiliate link and May 8, 2026 verification metadata, but the page still reads like an older directory review. It contains wide comparison/pricing tables, references to non-AiPedia alternatives, and some pricing/plan language that is too precise for AdCreative.ai's volatile promotional pricing surface.
- `src/content/tools/unbounce.md` already has an approved PartnerStack affiliate link and May 8, 2026 verification metadata, but the page mixes older claims, a broad pricing table as the main pricing experience, and unsupported statements around historical conversion data that should be either sourced carefully or removed.
- Source registry entries already exist for `adcreative-official`, `adcreative-pricing`, and `unbounce-pricing`.
- Affiliate CTA rendering and tracking are handled by the existing tool-page template and affiliate metadata, so this checkpoint should preserve those fields rather than introduce a new CTA system.

### 3. Target state

On mobile, each page should quickly answer:

- Is this tool worth trying?
- Who should use it?
- Who should avoid it?
- Which plan should buyers inspect first?
- What is the main watch-out?
- What alternative should a visitor consider?
- Why is the recommendation current and source-backed?

Desktop should retain richer comparison/detail sections, but not at the cost of mobile readability or crawlable decision content.

### 4. Scope

Included:

- Rewrite AdCreative.ai and Unbounce tool page bodies into buyer-focused editorial pages.
- Refresh frontmatter facts, quick answers, pricing summaries, and source-backed verification copy where needed.
- Preserve approved affiliate links, program metadata, and existing template-driven tracking.
- Run content, provenance, build, and mobile QA checks for affected routes.

Excluded:

- No template rebuild in this checkpoint.
- No new comparison pages.
- No new category rewrite beyond verifying affected category render paths.
- No new analytics event system unless checks expose a critical issue.

### 5. Files likely affected

- `.agent/MARKETING_LANDING_TOOL_REFRESH_EXECPLAN.md`
- `src/content/tools/adcreative.md`
- `src/content/tools/unbounce.md`

### 6. Data model impact

The tool content records keep the existing schema. The changes update structured editorial fields, facts, price history, source labels, and visible verification copy. Affiliate data remains centralized in the tool records and should continue to feed template CTAs automatically.

### 7. SEO impact

Each page should receive stronger unique buyer intent content for queries such as "AdCreative.ai review", "AI ad creative generator", "Unbounce review", and "AI landing page builder". The pages should include crawlable verdicts, plan guidance, alternatives, pricing warnings, source links, internal links, and current verification language.

### 8. Conversion impact

The approved affiliate links remain in the tool records so hero/final CTAs continue to use tracked outbound links. The rewritten content should increase qualified clicks by clarifying buyer fit, plan choice, pricing risk, and main objections before the CTA.

### 9. Mobile UX impact

The body copy will favor short sections, scannable bullets, and simple decision tables only where useful. The affected pages must be checked at 360, 390, 430, 768, and desktop widths for horizontal overflow, readable pricing guidance, visible disclosure, and usable CTAs.

### 10. Implementation steps

1. Verify current official source facts for AdCreative.ai and Unbounce as of 2026-05-08.
2. Rewrite `src/content/tools/adcreative.md` with current buyer verdict, best plan guidance, watch-outs, alternatives, pricing volatility, and source-backed notes.
3. Rewrite `src/content/tools/unbounce.md` with current plan limits, best-fit guidance, Smart Traffic gating, pricing cautions, alternatives, and source-backed notes.
4. Run focused content metadata checks for dates, affiliate links, stale claims, word count, and source IDs.
5. Run provenance, check, and fast build commands.
6. QA affected routes at required mobile widths and confirm affiliate CTA/disclosure/tracking attributes render.
7. Update this ExecPlan with the final report and next recommended task.

### 11. Verification commands

- `npm run audit:provenance`
- `npm run check`
- `npm run build:fast`
- Focused Node/Playwright route QA for:
  - `/tools/adcreative/`
  - `/tools/unbounce/`
  - `/categories/ai-seo/`
  - `/categories/ai-design/`

### 12. Acceptance criteria

- Both tool records retain approved affiliate links.
- Both pages show `last_verified: 2026-05-08`.
- Volatile pricing and feature facts are sourced to official current pages.
- No obvious stale verification copy remains.
- Mobile QA passes without horizontal overflow at 360, 390, 430, 768, and 1024 widths.
- Build and relevant checks pass or failures are documented honestly.

### 13. Risks and mitigations

- AdCreative.ai pricing is promotional and dynamic. Mitigation: avoid over-claiming exact package details beyond the official current entry point and instruct buyers to verify live billing cadence/credit terms.
- Unbounce feature tables are large. Mitigation: summarize the buyer-relevant plan thresholds in content and rely on the official feature comparison for exhaustive detail.
- Existing dirty worktree contains many unrelated changes. Mitigation: scope this checkpoint to the two tool pages and this plan file; do not revert unrelated work.

### 14. Progress log

- 2026-05-08: Created plan after rereading project doctrine and checking official AdCreative.ai and Unbounce pages. AdCreative source shows feature/promo-heavy dynamic pricing; Unbounce source has stable current plan pricing and limits.
- 2026-05-08: Rewrote `src/content/tools/adcreative.md` into a buyer-focused page with current pricing caveats, plan guidance, platform-native AI pressure, alternatives, and source-backed warnings. Restored required Meta/X news cross-links after `npm run check` exposed the removed references.
- 2026-05-08: Rewrote `src/content/tools/unbounce.md` around paid-campaign buyer fit, Build/Experiment/Optimize plan guidance, Smart Traffic gating, Starter limitations, alternatives, and source-backed pricing.
- 2026-05-08: Added `unbounce-features` to `src/data/source-registry.json` and pointed Unbounce feature facts at that source ID instead of reusing the pricing source for feature claims.
- 2026-05-08: Verification passed: focused metadata/source checks, `npm run audit:provenance`, `npm run check`, `npm run build:fast`, focused browser/in-app CTA checks, Playwright mobile QA at 360/390/430/768/1024, and `npm run test:scripts`.

### 15. Final report

Changed files:

- `.agent/MARKETING_LANDING_TOOL_REFRESH_EXECPLAN.md`
- `src/content/tools/adcreative.md`
- `src/content/tools/unbounce.md`
- `src/data/source-registry.json`

Behavior shipped:

- AdCreative.ai now reads as a paid-social creative-volume buyer page with current-source caution around volatile credits and billing, stronger alternatives, clear "do not buy if" guidance, and market-pressure context from current news links.
- Unbounce now reads as a paid-campaign landing page buyer page with a clear distinction between Starter, Build, Experiment, and Optimize, including Smart Traffic gating and realistic plan recommendations.
- Approved affiliate links remain centralized in the two tool records and render as tracked sponsored CTAs on tool pages.
- Unbounce feature facts now have their own registered primary source ID.

Verification:

- Focused Node metadata/source check: passed.
- `npm run audit:provenance`: passed.
- First `npm run check`: failed because the AdCreative rewrite removed required current-news cross-links.
- `npm run check` after fix: passed.
- `npm run build:fast`: passed; 908 pages built; commercial CTA audit passed.
- In-app browser checks for `/tools/adcreative/` and `/tools/unbounce/`: passed; each rendered 2 affiliate CTAs, sponsored rel, tracking attributes, and disclosure text.
- Playwright mobile QA for `/tools/adcreative/`, `/tools/unbounce/`, `/categories/ai-seo/`, and `/categories/ai-design/` at 360, 390, 430, 768, and 1024 widths: passed; no horizontal overflow detected.
- `npm run test:scripts`: passed; 19 tests.

Remaining risks:

- AdCreative.ai pricing is highly promotional/dynamic, so the page intentionally avoids precise package claims beyond the public current entry point.
- Category routes checked for layout health but do not currently show direct AdCreative/Unbounce affiliate CTAs; affiliate propagation is strongest on tool pages and routes that render commercial CTA components.
- The working tree contains many unrelated prior changes. This checkpoint intentionally touched only the two tool pages, one source registry entry, and this ExecPlan.

Recommended next task:

- Continue with the next monetized marketing-tool cluster by upgrading the category-level buyer flow for `/categories/ai-seo/` and `/categories/ai-design/`, especially direct tracked CTAs for approved affiliate tools where the category template can support them without turning the category into a spammy link list.
