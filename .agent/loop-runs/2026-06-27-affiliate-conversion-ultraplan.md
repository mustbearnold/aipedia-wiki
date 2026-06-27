# 2026-06-27 Affiliate Conversion Page Ultraplan

Status: Foundation implemented locally, goal active.

Objective: create high-converting, source-backed buyer pages for every tool with a configured affiliate link, without producing doorway pages, duplicated intent, stale claims, or trust-eroding CTA surfaces.

## Current Inventory

Command:

```bash
npm run affiliate:conversion:inventory
```

Baseline result:

- Tool markdown files: 265.
- Tools with configured affiliate links: 26.
- Tools with approved-live affiliate links: 22.
- Tools with configured links but not live-approved: 4.
- Existing affiliate money guides detected by audit: 35.
- First-pass planning ceiling: 108 pages.

The planning ceiling is not a generation mandate. Existing pages count toward coverage when they already target a real buyer job. Pages should be created only when the intent is unique, current, and decision-useful.

## Approved-Live Tools

High-fit tools eligible for up to five distinct pages:

- Amplemarket.
- Apollo.io.
- Argil.
- Beautiful.ai.
- CloudTalk.
- Consensus.
- Descript.
- Dext.
- Gamma.
- Hume AI.
- Lindy.
- MeetGeek.
- NeuronWriter.
- OmniSEO.
- QuillBot.
- Reclaim.ai.
- SaneBox.

Lower-score or narrower tools eligible for up to three distinct pages unless evidence shows a stronger niche:

- AdCreative.ai.
- Decktopus AI.
- Prezi.
- Rytr.
- Unbounce.

## Configured But Not Live-Approved

These need affiliate-status cleanup or deliberate non-affiliate handling before conversion-page expansion:

- Castmagic.
- Fireflies.ai.
- Magnific AI.
- Mubert.

## Page Archetypes

1. Specific ICP winner page.
   - Example: best AI calendar for Google Workspace power users.
   - Highest conversion fit when one tool clearly wins for one buyer.

2. Workflow stack page.
   - Example: solo founder stack or accountant stack with the affiliate tool as an anchor.
   - Best when the tool converts as part of a practical operating setup.

3. Same-job alternative or switcher page.
   - Example: SaneBox alternative for Superhuman users who cannot migrate clients.
   - Must compare the same buyer job.

4. Plan/pricing decision page.
   - Example: which Dext plan for small accounting practices.
   - Use when plan friction blocks conversion.

5. Adjacent same-job comparison support.
   - Example: Apollo vs Amplemarket for mid-market outbound teams.
   - Must obey comparison policy and avoid cross-workflow matchups.

## Visual Direction

Use the existing AiPedia guide and tool-page design language:

- Mobile first, decision first.
- Above the fold: trust strip, buyer identity, winner, best plan, watch-out, CTA, disclosure.
- No big decorative affiliate heroes.
- No generic three-card SaaS sections.
- No raw affiliate markdown links.
- CTA labels must be benefit-specific and consistent for the same intent.
- Source proof and pricing caveats stay near the claim they support.

Potential reusable components after the first cluster:

- `AffiliateBuyerSnapshot`.
- `PlanPicker`.
- `CommercialCtaGroup`.
- `AffiliateDisclosureNote`.
- `AlternativeSwapCards`.

## Guardrails Implemented

New command:

```bash
npm run affiliate:conversion:inventory
```

New audit:

```bash
npm run audit:affiliate-conversion
```

New optional `use-cases` metadata fields:

- `intent_type`
- `primary_tool`
- `affiliate_tools`
- `competitor_tools`
- `buyer_job`
- `audience`
- `not_for`
- `decision_criteria`
- `canonical_parent`
- `cluster_id`
- `source_refs`
- `sources`
- `freshness_window_days`
- `volatile_claims`
- `monetization_disclosure_required`
- `indexability_reason`

## Audit Baseline

Command:

```bash
AIPEDIA_CURRENT_DATE=2026-06-27 npm run --silent audit:affiliate-conversion -- --json
```

Result:

- `ok: true`.
- Money guides: 35.
- Errors: 0.
- Warnings: 245.

Warnings are expected because existing money guides predate the stricter structured metadata. The next cleanup pass should backfill metadata on existing money guides before generating large volumes of new pages.

## Rollout Order

1. Backfill structured metadata for the 35 existing affiliate money guides.
2. Fix or defer the four configured-but-not-live affiliate tools.
3. Build the first five-page cluster for one strong approved tool with source coverage and obvious distinct intents.
4. Run subagent review before finalizing the first cluster:
   - SEO/quality reviewer.
   - Visual/mobile reviewer.
   - Accuracy/source reviewer.
5. Promote repeated cluster patterns into reusable components only after the first cluster proves the pattern.
6. Scale by category batches, not one-off pages:
   - Sales and outbound: Apollo, Amplemarket, CloudTalk.
   - Research and writing: Consensus, QuillBot, Rytr.
   - Content and media: Descript, Argil, Hume AI, Mubert, Magnific.
   - Presentation and landing pages: Gamma, Beautiful.ai, Prezi, Decktopus, Unbounce.
   - Operations: Dext, Lindy, Reclaim.ai, SaneBox, MeetGeek.
   - SEO: NeuronWriter, OmniSEO, AdCreative.ai.

## Completion Definition

The full goal is not complete until:

- Every configured affiliate-link tool has an approved page cluster or documented deferral.
- Every page has current sources, structured metadata, a unique buyer job, honest plan guidance, disclosure, and tracked CTA.
- Existing money guides are brought up to the structured metadata contract.
- Parent hubs, `/guides/`, `/tools/`, `/categories/`, sitemap/LLM surfaces, and `PAGE_REFRESH_LEDGER.md` are updated.
- Build, source checks, commercial CTA audit, and route QA pass across required mobile and desktop widths.
