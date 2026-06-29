# AiPedia Agent Workflows

These are the canonical repeatable workflows for Codex runs in AiPedia. Use the matching `skills/<name>/SKILL.md` file for task-specific checklists.

## Workflow 1: Refresh Existing AI Tool Page

Inputs:

- Tool slug.
- Page path.
- Official source URL if known.
- Pricing URL if known.
- Docs URL if known.
- Affiliate URL if known.
- Target update reason.

Steps:

1. Read the current tool page.
2. Extract existing pricing, model, feature, CTA, source, and recommendation claims.
3. Identify stale sections, weak caveats, and unsupported claims.
4. Gather official evidence where available.
5. Gather pricing, model, API, version, and release information where available.
6. Gather recent news if it changes buyer guidance.
7. Check affiliate CTA and official fallback link.
8. Retrieve related internal pages, parent category hubs, comparisons, guides, and LLM/search surfaces.
9. Build a compact evidence bundle.
10. Propose a focused content patch.
11. Validate factual claims, source IDs, and verification dates.
12. Validate internal links and parent hubs.
13. Run the scoped build and checks.
14. Write an update report.

Output:

- Changed page.
- Evidence notes.
- Updated sections list.
- Risks.
- Follow-up tasks.

## Workflow 2: Create New AI Tool Page

Inputs:

- Tool name.
- Category.
- Official URL.
- Docs URL if known.
- Pricing URL if known.
- Affiliate URL if available.
- Target user or use case.

Steps:

1. Confirm the tool is not already present.
2. Gather current source evidence from official pages.
3. Classify the tool into AiPedia categories.
4. Identify the best-fit user and buyer job.
5. Identify buyer intent and alternatives.
6. Generate an SEO brief.
7. Create the page using the existing tool schema.
8. Add affiliate CTA only when approved and honest.
9. Add comparison hooks and internal links.
10. Add or verify logo assets and generated OG assets.
11. Update source registry, parent hubs, top-layer surfaces, LLM/search surfaces, and ledger rows.
12. Validate facts.
13. Run build and checks.
14. Write report.

Output:

- New tool page.
- Source rows.
- Logo and OG changes.
- Parent/top-layer updates.
- Verification report.

## Workflow 3: Create Affiliate Buyer-Intent Page

Inputs:

- Niche user.
- Buyer intent keyword.
- Tools to compare.
- Affiliate priority.
- Conversion goal.

Steps:

1. Define search intent.
2. Define user pain.
3. Confirm this is a distinct page, not a duplicate doorway.
4. Map each tool to a specific persona or use case.
5. Build the comparison or plan angle.
6. Create an intro that answers intent fast.
7. Add best-for sections.
8. Add pros, cons, and watch-outs.
9. Add pricing caveats if relevant.
10. Add trust and factuality notes.
11. Add affiliate CTAs with disclosure and official fallback.
12. Add alternatives.
13. Add internal links.
14. Validate SEO and conversion intent.
15. Run build and checks.
16. Write report.

Output:

- Buyer page.
- CTA and disclosure notes.
- Source evidence.
- Duplicate-intent decision.
- Risks and follow-ups.

## Workflow 4: Create Comparison Page

Inputs:

- Tool A.
- Tool B.
- Audience.
- Decision angle.

Steps:

1. Verify both tools solve the same buyer job and workflow.
2. Gather current facts for both tools.
3. Identify overlapping use cases.
4. Identify meaningful differences.
5. Create decision table.
6. Add choose-X-if and choose-Y-if sections.
7. Add plan guidance, watch-outs, and best alternative.
8. Add affiliate CTAs where appropriate.
9. Add internal links.
10. Update parent hubs and route surfaces.
11. Validate claims.
12. Run build and checks.
13. Write report.

Output:

- Comparison page or a documented false-vs rejection.
- Fact table.
- Decision summary.
- Source and CTA notes.
- Verification report.

## Workflow 5: Daily AI Tools News Update

Inputs:

- Date.
- Sources.
- Tool names.
- Importance score.

Steps:

1. Collect candidate news items with current-month searches.
2. De-duplicate.
3. Score importance for buyers, builders, and tool evaluators.
4. Map news to affected tools, categories, comparisons, trends, and guides.
5. Publish or refresh news pages only when source-backed.
6. Record skipped lanes when no current source-backed story is worth publishing.
7. Queue stale pages for refresh when a story changes buyer guidance.
8. Add internal links.
9. Update `/news/`, homepage, feeds, LLM surfaces, OG assets, and ledger rows.
10. Run build and checks.
11. Write report.

Output:

- Published or refreshed stories.
- Skipped-lane notes.
- Affected page queue.
- Source and route QA notes.

## Workflow 6: Repo Maintenance

Inputs:

- Issue or objective.

Steps:

1. Inspect affected area.
2. Find duplicate logic, brittle paths, and existing tests.
3. Refactor safely.
4. Preserve URLs, content, SEO value, affiliate links, and build behavior.
5. Update docs when workflow or operator behavior changes.
6. Add or update tests when behavior changes.
7. Run checks.
8. Write report.

Output:

- Focused patch.
- Updated docs or tests where needed.
- Verification result.
- Residual risks.
