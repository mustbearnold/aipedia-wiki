# Affiliate Conversion Page Workflow

Purpose: build source-backed, mobile-first buyer pages around tools with configured affiliate links, without creating thin doorway pages or letting monetization override trust.

Current date target: verify volatile facts against current sources before publishing. Search queries for volatile AI, pricing, company, or product claims must include the current month and year.

## Scope Definitions

- Configured affiliate link: a tool markdown record has a non-empty `affiliate.link`.
- Live affiliate CTA: the configured link is also `affiliate.application_status: approved`. `CommercialCTA` only uses affiliate links when status is approved.
- Conversion page: an indexable guide, comparison, workflow, answer, or future dedicated page whose primary job is helping a specific buyer decide whether one affiliate-linked tool is the right purchase.

Run the inventory:

```bash
npm run affiliate:conversion:inventory
npm run affiliate:conversion:inventory -- --json
npm run audit:affiliate-conversion
npm run audit:affiliate-conversion -- --strict --json
```

As of the first inventory pass, there are 26 configured-link tools, 22 live-approved affiliate tools, and 4 configured-but-not-live tools. The generated registry under `src/data/_meta/tools-registry.json` may lag the markdown source, so use markdown plus this script as the source of truth until the registry generator is repaired.

## Page Count Strategy

Do not create five pages for every tool by default. Create the maximum number of pages only when each page has a distinct buyer job, unique search intent, current source support, and a decision that is not already satisfied by an existing guide.

First-pass budget:

- 5 pages for live-approved tools with good buyer fit and score at or above 7.25.
- 3 pages for live-approved lower-score tools where a narrower buyer niche can still be honest.
- 2 pages for configured-but-not-live tools until approval metadata is fixed.

The current scripted budget is 108 pages across 26 configured-link tools. That is a planning ceiling, not a blind generation target. Existing guides count toward the budget when they already target the right buyer and use the tool as a real decision pick.

## Five Archetypes

Use these archetypes in priority order. A tool should not receive all five unless all five can be made specific and useful.

1. Specific ICP winner page: `Best <job> tool for <specific user>`
   - Example shape: best AI calendar for Google Workspace power users.
   - First screen must show winner, who should buy, who should skip, best plan, watch-out, source freshness, and CTA.

2. Workflow stack page: `<role> stack with <tool> as the anchor`
   - Example shape: solo founder stack, accountant stack, podcast workflow.
   - Use when the affiliate tool converts better as part of a setup than as a standalone category answer.

3. Alternative or switcher page: `<status quo> alternative for <specific buyer>`
   - Use only when the alternative solves the same buyer job.
   - Avoid unrelated cross-category comparison pages.

4. Plan decision page: `<tool> plan/pricing for <specific buyer>`
   - Use when pricing friction is the conversion bottleneck.
   - Must cite current pricing, checkout caveats, annual/monthly differences, and who should not upgrade.

5. Adjacent comparison page: `<tool A> vs <tool B> for <specific workflow>`
   - Use only for same-job tools.
   - Must include winner for most people, winner by use case, plan guidance, and source-backed tradeoffs.

## Required Page Contract

Every affiliate conversion page must include:

- Structured frontmatter: `intent_type`, `primary_tool`, `affiliate_tools`, `competitor_tools`, `buyer_job`, `audience`, `not_for`, `decision_criteria`, `cluster_id`, `freshness_window_days`, `volatile_claims`, `monetization_disclosure_required`, and `indexability_reason`.
- Unique buyer: role, team size, platform, budget, workflow, or risk profile.
- Current verification: `last_verified`, source list, pricing/source facts verified for the current date.
- Verdict: should this buyer use the tool or not?
- Best plan: which plan to buy or when to stay free.
- Best alternative: one honest non-affiliate or affiliate alternative where useful.
- Watch-out: the main reason this buyer might regret buying.
- Commercial CTA: `CommercialCTA` with page type, placement, tool slug, page slug, affiliate disclosure, and official fallback.
- Internal links: tool page, category hub, related guides, and same-job comparisons.
- Ledger update: `PAGE_REFRESH_LEDGER.md` row for every new or refreshed page, plus affected top-layer surfaces.

## Visual System

Pages should feel like AiPedia buyer decision pages, not generic affiliate landing pages.

- Typography: use the existing AiPedia type scale and tokens. Keep hero headlines short enough to fit on mobile and desktop without wrapping into awkward stacks.
- First mobile screen: trust strip, verdict, buyer identity, tool, score or confidence, best plan, CTA, disclosure, and watch-out.
- Layout: disciplined grid, consistent gutters, no nested cards, no card bloat, no repeated generic three-card sections.
- CTA rhythm: one primary CTA intent per page, repeated in hero, decision card, and sticky mobile CTA with consistent wording.
- Proof: source chips and evidence rails near claims, not buried after the sale.
- Visual variety: use compact decision panels, plan cards, comparison matrices, and workflow timelines. Do not decorate with generic AI-purple gradients or unrelated illustrations.
- Mobile QA: check 319, 360, 390, 430, 768, 1024, and 1366 px for every new page template or page batch.

## Quality Gates

Before publishing a page batch:

```bash
npm run affiliate:conversion:inventory
npm run audit:affiliate-conversion -- --strict --json
npm run guard:check
npm run audit:guide-picks
npm run audit:provenance:changed -- --json
npm run ledger:pages && npm run ledger:pages:check
npm run typecheck
npm run build:fast
npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route <changed routes>
```

Add live source checks for every volatile source touched by the page batch. If a page changes affiliate CTAs, run or inspect the commercial CTA audit after build.

## Review Loop

Use subagents for independent review before finalizing major batches:

- SEO and quality reviewer: rejects thin, duplicate, doorway-like, same-intent, or unsupported pages.
- Visual and mobile reviewer: rejects pages below 9.9/10 for layout precision, typography, CTA hierarchy, source proof placement, and mobile containment.
- Accuracy reviewer: rejects stale pricing, unsupported rankings, missing source IDs, or claims that depend on account-gated checkout without caveats.

The integrator must either fix every rejection or document why the page is deferred.
