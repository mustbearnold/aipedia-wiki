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

Treat `npm run affiliate:conversion:inventory -- --json` as the source of truth for current counts. Do not copy static inventory totals into status docs unless they were generated during the same implementation pass. The generated registry under `src/data/_meta/tools-registry.json` may lag the markdown source, so use markdown plus this script as the source of truth until the registry generator is repaired.

## Runner Contract Skeleton

The affiliate conversion lane should become runner-backed before it scales beyond small manual slices. Until that runner exists, use this contract as the implementation target.

Current MVP commands:

```bash
npm run runner:affiliate-conversion:plan
npm run runner:affiliate-conversion:reports
npm run runner:affiliate-conversion:handoff
```

The planner writes local artifacts under `local/tmp/aipedia-runner/affiliate-conversion/`:

- `affiliate-conversion-plan.json`
- `workers/*.md`
- `reports/*.json`
- `affiliate-report-summary.md`
- `affiliate-implementation-handoff.md`

The MVP is planning, report scaffolding, strict report validation, and no-content implementation handoff only. It must not edit public content pages, source registry rows, page ledger rows, tool markdown, category hubs, news content, or generated site output.

### Planner Output

The planner should emit JSON with:

- `current_date`: local project date used for verification.
- `inventory_summary`: configured-link tools, live-approved tools, configured-not-live tools, and recommended planning ceiling from `affiliate:conversion:inventory`.
- `clusters`: one object per candidate buyer-intent cluster, including `primary_tool`, `monetization_state`, `affiliate_status`, `affiliate_network`, `score`, `archetype`, `buyer_job`, `existing_coverage`, `duplicate_intent_risk`, `required_sources`, `affected_routes`, `parent_surfaces`, `route_qa_risk`, and `recommended_worker_id`.
- `agent_briefs`: bounded worker prompts and one integrator prompt.
- `commands`: cheap gates, expensive gates, route QA args, and receipt paths.

### Worker Report Schema

Each worker report should include:

```json
{
  "worker_id": "",
  "owned_paths": [],
  "clusters": [
    {
      "primary_tool": "",
      "buyer_job": "",
      "status": "pending|complete|blocked|deferred",
      "changed_files": [],
      "source_urls": [],
      "claim_receipts": [
        {
          "claim": "",
          "path": "",
          "source_url": "",
          "verified_at": "YYYY-MM-DD",
          "confidence": "primary-confirmed|primary-conflict|account-gated|checkout-gated|region-rendered|blocked-live-check|secondary-only",
          "query": "",
          "caveat": ""
        }
      ],
      "commercial_cta_notes": [],
      "parent_surface_notes": [],
      "duplicate_intent_notes": [],
      "route_qa_risks": [],
      "checks": []
    }
  ],
  "handoff_notes": ""
}
```

### Ownership Boundaries

Workers may edit only the assigned guide, comparison, workflow, answer, or tool-support files named in the planner. The integrator owns shared files, source registry rows, parent hubs, top-layer pages, `PAGE_REFRESH_LEDGER.md`, receipts, and final verification.

Workers must not edit:

- `PAGE_REFRESH_LEDGER.md`
- `src/data/source-registry.json`
- unrelated parent hubs or top-layer routes
- `.agent/**`
- `workflows/**`
- runner or audit scripts

### Closeout Contract

A runner-backed affiliate batch should close out in this order:

```bash
npm run affiliate:conversion:inventory -- --json
npm run audit:affiliate-conversion -- --strict --json
npm run audit:provenance:changed -- --json
npm run ledger:pages && npm run ledger:pages:check
npm run typecheck
npm run build:fast
npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route <changed routes>
git diff --check
```

The runner receipt should record planner path, worker report paths, claim receipt count, source count, CTA count, duplicate-intent decisions, reviewer outcomes, command timings, failed-then-fixed checks, and residual risks.

Strict report validation should be run only after workers mark clusters as `complete`, `blocked`, or `deferred`:

```bash
npm run runner:affiliate-conversion:reports -- --strict
```

Pending scaffold reports may stay blank. Completed clusters must include claim receipts, parent-surface notes, commercial CTA notes for live affiliate tools, duplicate-intent notes for medium or high duplicate risk, and check records with visible notes for non-passed checks. Blocked or deferred clusters must include a rationale in `handoff_notes`.

### Implementation Handoff

After reports pass strict validation, generate a reviewer-ready patch plan:

```bash
npm run runner:affiliate-conversion:handoff
```

The handoff command refuses to create an implementation-ready artifact when strict report validation fails or when every cluster is still pending, blocked, or deferred. Pending scaffold reports can summarize, but they are not selected for implementation.

The handoff records the planner path, report summary path, selected complete clusters, claim receipts, duplicate-intent decisions, commercial CTA notes, parent and top-layer surface checklist, route QA routes and risk notes, exact verification gates, no-edit boundaries, integrator-owned shared files, and unresolved blocked or deferred items. It is still no-content and does not authorize public page edits by itself.

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
