# Tier-1 Avatar Tool Fact Coverage ExecPlan

## 1. Objective

Raise AiPedia's tier-1 tool fact coverage from 95.5% to 100% by completing missing structured facts for HeyGen and Synthesia, two high-intent AI avatar/video buyer pages. This supports trust, SEO freshness, mobile decision modules, comparison data quality, and affiliate-conversion confidence.

## 2. Current state

The repo is an Astro 6 static site with content collections in `src/content.config.ts`. Tool records live in `src/content/tools/*.md`; source metadata is centralized in `src/data/source-registry.json`; tool fact coverage is audited by `scripts/audit-tool-facts.mjs`.

Current audit findings from `node scripts/audit-tool-facts.mjs --json` on 2026-05-08:

- Tier-1 tools: 25.
- Required fact slots: 400.
- Present required fact slots: 382.
- Completeness: 95.5%.
- Missing tier-1 tools:
  - `src/content/tools/heygen.md`: missing `context_window`, `free_plan`, `best_paid_tier`, `image_generation`, `real_time_voice`, `web_browsing`, `coding_agent`, `enterprise_controls`, `data_retention_or_privacy`, `open_source_or_local`.
  - `src/content/tools/synthesia.md`: missing `context_window`, `image_generation`, `real_time_voice`, `web_browsing`, `coding_agent`, `enterprise_controls`, `data_retention_or_privacy`, `open_source_or_local`.

Supporting files inspected:

- `AGENTS.md`
- `docs/AIPEDIA_CODEX_BIBLE.md`
- `.agent/PLANS.md`
- `package.json`
- `src/content.config.ts`
- `src/content/tools/heygen.md`
- `src/content/tools/synthesia.md`
- `src/data/source-registry.json`

Current official sources checked on 2026-05-08:

- HeyGen pricing: `https://www.heygen.com/pricing`
- HeyGen FAQ: `https://www.heygen.com/faq`
- HeyGen API pricing help: `https://help.heygen.com/en/articles/10060327-heygen-api-pricing-explained`
- HeyGen LiveAvatar help: `https://help.heygen.com/en/articles/10035615-how-to-get-started-with-liveavatars`
- HeyGen security: `https://www.heygen.com/security`
- Synthesia pricing: `https://www.synthesia.io/pricing`
- Synthesia avatar docs: `https://docs.synthesia.io/docs/synthesia-avatars`
- Synthesia personal-avatar docs: `https://docs.synthesia.io/docs/personal-avatars`
- Synthesia security practices: `https://www.synthesia.io/legal/security-practices`
- Synthesia enterprise: `https://www.synthesia.io/enterprise`

## 3. Target state

HeyGen and Synthesia both expose all tier-1 required fact slots, including honest "not applicable" facts for chat-model-only concepts such as context windows, web browsing, and coding agents. The facts must be current as of 2026-05-08, source-backed, and marked with confidence, volatility, and review dates.

## 4. Scope

Included:

- Add missing structured facts to `src/content/tools/heygen.md`.
- Add missing structured facts to `src/content/tools/synthesia.md`.
- Add source-registry entries only if existing official source IDs are insufficient.
- Run focused fact/provenance tests and broader site checks.

Excluded:

- Rewriting visible editorial body copy unless needed to avoid contradicting the new structured facts.
- Template rebuilds.
- New affiliate link applications.
- Deleting/noindexing pages.

## 5. Files likely affected

- `src/content/tools/heygen.md`
- `src/content/tools/synthesia.md`
- `src/data/source-registry.json`
- `.agent/TIER1_AVATAR_FACT_COVERAGE_EXECPLAN.md`

## 6. Data model impact

No schema migration is planned. The existing `facts` object already supports all required keys through `.passthrough()` and canonical optional keys in `toolFacts`.

## 7. SEO impact

Completing tier-1 facts improves the source-backed data available to tool pages, comparisons, and future snippets. The visible title/meta/canonical output should remain unchanged for this checkpoint.

## 8. Conversion impact

More complete facts make HeyGen and Synthesia buyer claims more trustworthy near commercial CTAs, especially around free plans, best paid tiers, enterprise controls, privacy, API/live-avatar surfaces, and what each product is not.

## 9. Mobile UX impact

No template layout changes are planned. Mobile impact is indirect: existing mobile tool modules can draw from more complete and accurate fact data.

## 10. Implementation steps

1. Add missing official source IDs for HeyGen security, HeyGen LiveAvatar, Synthesia security, Synthesia enterprise, and Synthesia personal-avatar docs if needed.
2. Add missing HeyGen facts with current-date source IDs and next-review dates.
3. Add missing Synthesia facts with current-date source IDs and next-review dates.
4. Run fact/provenance audits.
5. Run broader build/check commands.
6. Update this plan's progress log and final report.

## 11. Verification commands

- `node scripts/audit-tool-facts.mjs --json`
- `npm run audit:provenance`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`

## 12. Acceptance criteria

- `audit-tool-facts` reports tier-1 completeness at 100%.
- HeyGen and Synthesia are absent from `priority.tier1.missing_by_tool`.
- Provenance audit reports no missing or unknown source IDs.
- Build and script tests pass.
- No mobile/UI regression is introduced.

## 13. Risks and mitigations

- Risk: negative facts such as "no web browsing" could be too broad. Mitigation: phrase them as product-positioning facts and cite official product/pricing docs.
- Risk: pricing or LiveAvatar details change quickly. Mitigation: use `volatility: high` and `next_review_at: 2026-06-08` where appropriate.
- Risk: adding registry IDs with unsupported type values could break CI. Mitigation: use existing allowed source types only.

## 14. Progress log

- 2026-05-08 04:49 UTC: Audited current repo and identified tier-1 fact coverage as first checkpoint. Verified official HeyGen and Synthesia sources before editing.
- 2026-05-08 04:54 UTC: Added source-backed missing facts for HeyGen and Synthesia. `node scripts/audit-tool-facts.mjs --json` now reports tier-1 completeness at 100% with 25/25 complete tier-1 tools and no missing fact sources, missing verification dates, or stale facts. `npm run audit:provenance` reports 731 registered sources, 1397 fact records, 0 facts missing `source_id`, and 0 price-history rows missing source.
- 2026-05-08 05:08 UTC: Ran broader verification. `npm run test:scripts`, `npm run check`, and `npm run build:fast` passed. Local pages `/tools/heygen/` and `/tools/synthesia/` returned 200 and passed viewport checks at 360, 390, 430, 768, and 1024 px with no horizontal overflow.

## 15. Final report

Checkpoint complete. Tier-1 tool fact coverage is now 100%, with HeyGen and Synthesia carrying current, source-backed structured facts for free plan, best paid tier, enterprise/privacy controls, real-time/avatar capability, and non-applicable buyer-decision fields such as web browsing and coding-agent support. No template rebuild was included in this checkpoint; the mobile impact is data-quality support for existing mobile decision modules rather than a visible layout change.

Verification completed:

- `node scripts/audit-tool-facts.mjs --json`: tier-1 completeness 100%; 25/25 tier-1 tools complete.
- `npm run audit:provenance`: 731 registered sources; 1397 fact records; 0 facts missing `source_id`; 0 price-history rows missing source.
- `npm run test:scripts`: 15/15 script tests passed.
- `npm run check`: passed.
- `npm run build:fast`: passed; 905 pages built; indexability and representative commercial CTA audits passed.
- Local mobile QA: `/tools/heygen/` and `/tools/synthesia/` returned 200 and showed no horizontal overflow at 360, 390, 430, 768, or 1024 px.

Remaining risks:

- This did not resolve the larger strategic debt found in the site KPI audit: many comparison, use-case, and news pages remain short by current audit thresholds.
- The next checkpoint should target the highest-revenue comparison/category template or the comparison thin-page backlog, because that is the larger SEO and buyer-intent opportunity after tier-1 data integrity.
