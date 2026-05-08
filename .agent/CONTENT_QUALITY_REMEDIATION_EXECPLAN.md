# Content Quality Remediation ExecPlan

## 1. Objective

Reduce thin-page risk across AiPedia's indexable money and authority pages without adding filler. The goal is to make tool, comparison, use-case, and news pages more useful for buyer decisions, search rankings, trust, and internal linking.

## 2. Current measured state

`npm run audit:kpis` now reports content-quality risk floors:

- Active/beta tools under 800 words: 0
- Comparisons under 700 words: 207
- Use cases under 850 words: 48
- News under 300 words: 46

The comparison count is the largest debt. Many comparison markdown files are short, but the comparison template also injects scorecards, buyer-fit panels, canonical fact tables, related comparisons, commercial CTAs, and source-review links. The next step is to prioritize pages by commercial and search value, not word count alone.

## 3. Target state

- Tier-1 and high-intent tool pages stay above the 800-word active-tool floor.
- High-intent comparison pages include original decision logic beyond generated fact tables.
- Use-case pages answer best overall, budget/free, pro/team, plan choice, who should avoid, and alternatives.
- Short news pages either carry enough original analysis or are merged/noindexed if they do not add durable value.
- KPI audits expose remaining risk clearly without failing CI until the backlog is intentionally burned down.

## 4. Scope

Included:

- Tool-page content upgrades for active pages under the risk floor.
- Report-only KPI audit fields for thin-page risk.
- Prioritized manual upgrades for high-intent comparison and use-case pages.
- Recommendations to merge, noindex, or delete low-value pages that cannot justify indexation.

Excluded from this pass:

- Bulk AI-generated rewrites.
- New unsupported facts or sources.
- Automated mass content expansion without editorial review.
- Changing indexability of existing pages without a route-level review.

## 5. Implementation steps

1. Add report-only thin-risk counters to the KPI audit.
2. Bring active/beta tool pages above the 800-word risk floor with source-backed buyer guidance.
3. Re-run content, fact, provenance, and build checks.
4. Prioritize the 207 thin comparisons by search/commercial value and upgrade the first batch.
5. Prioritize the 48 thin use cases by affiliate intent and upgrade the first batch.
6. Review the 46 short news pages for merge/noindex candidates.
7. Promote floors from report-only to stricter guardrails only after the backlog is intentionally reduced.

## 6. Progress log

- 2026-05-08: Added `quality_floors` and `thin_risk` sections to `scripts/audit-site-kpis.mjs`.
- 2026-05-08: Upgraded the active/beta tool thin-risk set: watsonx Orchestrate, Perplexity Comet, Browserbase, ServiceNow, Grok Code Fast 1, Pinecone, Dia, Langfuse, and Humata.
- 2026-05-08: `npm run audit:kpis` reports 0 active/beta tools under 800 words. Remaining debt is concentrated in comparisons, use cases, and short news.
- 2026-05-08: Upgraded the first high-intent use-case batch: resume writing, professional headshots, logo design, cover letters, and Runway alternatives. Use-case thin-risk count moved from 48 to 44.
- 2026-05-08: Upgraded the first high-intent comparison batch: Canva vs Midjourney, Cursor vs Lovable, DeepSeek vs Mistral AI, Figma AI vs v0, and Aider vs Cursor. Comparison thin-risk count moved from 207 to 202.

## 7. Verification commands

- `npm run audit:kpis`
- `npm run guard:check`
- `npm run test:scripts`
- `npm run smoke:visual`
- `npm run build:fast`

## 8. Risks and mitigations

- Risk: word-count work turns into filler. Mitigation: only add buyer guidance, rollout advice, plan picks, alternatives, and evaluation criteria tied to existing facts.
- Risk: short comparison pages look thin in audits even when templates add value. Mitigation: keep both markdown and built-page quality in view before noindexing or deleting pages.
- Risk: news pages may be timely but not durable. Mitigation: merge into tool pages, trend pages, or recent-development sections when standalone value is weak.
