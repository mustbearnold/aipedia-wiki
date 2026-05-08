# Money Guide Picks Batch 2 ExecPlan

### 1. Objective

Migrate the next high-intent guide cluster to explicit, source-backed `guide_picks` and remove stale April-era buyer claims from the pages most likely to influence commercial decisions outside the already-protected coding, SEO, video, presentations, meeting-notes, blog-writing, and marketer guides.

### 2. Current state

The shared guide template already supports structured mobile decision cards through `guide_picks`, and `scripts/audit-guide-picks.mjs` protects the first migrated money-guide batch. The next cluster still relies on heuristic picks and has stale April 2026 language, broad third-party sources, and some tool mismatches:

- `src/content/use-cases/best-ai-tools-for-small-business.md`
- `src/content/use-cases/best-ai-tools-for-freelancers.md`
- `src/content/use-cases/best-ai-tools-for-agencies.md`
- `src/content/use-cases/best-ai-tools-for-ecommerce.md`
- `src/content/use-cases/best-ai-tools-for-sales-teams.md`
- `src/content/use-cases/best-ai-tools-for-customer-support.md`

### 3. Target state

Each migrated guide should answer the first mobile-screen buyer question with explicit cards for:

- best overall
- budget/free
- pro/team

Each pick must have a valid tool slug, plan guidance, concise editorial reason, and official/source-backed URLs verified on 2026-05-08. Body copy should avoid unsupported benchmark percentages, fake exact pricing, and old model/version claims.

### 4. Scope

Included:

- Add `guide_picks` to the six selected use-case guides.
- Rewrite the weakest stale intro, quick verdict, at-a-glance, top-pick, and FAQ sections where needed.
- Update `last_updated`, `last_verified`, and meta descriptions to 2026-05-08 current-source framing.
- Extend `scripts/audit-guide-picks.mjs` protected guide list to include this batch.
- Run content audits, guide-pick audit, script tests, build, and route/mobile QA.

Excluded:

- Adding missing third-party tools that do not yet exist as AiPedia tool records.
- Creating new guide routes.
- Schema changes.
- Server-side commercial event work.

### 5. Source basis

Official/current source checks for this batch include:

- OpenAI ChatGPT pricing and business pricing pages.
- Anthropic Claude pricing and Max/Team plan docs.
- Google Gemini subscription page.
- Cursor pricing.
- Apollo pricing and product pages.
- Clay pricing and product pages.
- Instantly pricing/help pages.
- Amplemarket pricing/product pages.
- Intercom Fin and pricing pages.
- Ada platform and AI-agent pricing explainer.
- Voiceflow pricing where used.
- Zapier, Copy.ai, Jasper, Canva, Perplexity, and Midjourney official pricing/product pages where used.

### 6. Implementation steps

1. Inspect the six guide files and current tool records before editing.
2. Add source-backed `guide_picks` to `small business`, `freelancers`, and `agencies`.
3. Add source-backed `guide_picks` to `ecommerce`, `sales teams`, and `customer support`.
4. Rewrite stale high-risk body sections and remove unsupported percentages/prices where official verification is weak.
5. Extend the guide-picks audit required list to cover the six new guide slugs.
6. Run focused content checks for dates, required picks, invalid stale terms, and minimum useful depth.
7. Run `npm run audit:guide-picks`, `npm run test:scripts`, `npm run check`, and `npm run build:fast`.
8. QA the six guide routes at 360, 390, 430, 768, and 1024 px for overflow, decision cards, guide CTAs, and stale text.
9. Update this ExecPlan with progress and verification results.

### 7. Acceptance criteria

- All six guides have `last_verified: 2026-05-08`.
- All six guides have valid `guide_picks.best_overall`, `guide_picks.budget`, and `guide_picks.pro_team`.
- `tools_mentioned` includes every guide-pick tool.
- No migrated guide keeps `as of April 2026`, `2026-04-15`, unsupported benchmark percentages, or non-existent model names in buyer claims.
- `npm run audit:guide-picks` protects thirteen required guide routes after this batch.
- Build and focused tests pass.
- Mobile QA finds no horizontal overflow on the six guide routes.

### 8. Progress log

- 2026-05-08: Created plan after inspecting the first protected guide-picks rollout, the master repo audit, and the six next high-intent guide files.
- 2026-05-08: Rewrote `best-ai-tools-for-small-business.md`, `best-ai-tools-for-freelancers.md`, and `best-ai-tools-for-agencies.md` with explicit `guide_picks`, current May 8 metadata, official source links, buyer-fit sections, and no stale April-era model/pricing claims.
- 2026-05-08: Rewrote `best-ai-tools-for-ecommerce.md`, `best-ai-tools-for-sales-teams.md`, and `best-ai-tools-for-customer-support.md` with explicit `guide_picks`, current May 8 metadata, official source links, and buyer-flow guidance. The sales guide was rebuilt around AiPedia canonical tools Apollo, Instantly, Clay, Amplemarket, and ChatGPT instead of ranking unsupported non-canonical Gong/Salesforce entries.
- 2026-05-08: Extended `scripts/audit-guide-picks.mjs` so the six new guide routes are part of the required protected money-guide set.
- 2026-05-08: Focused content audit passed for all six guide files: each has `last_verified: 2026-05-08`, `guide_picks`, three required decision slots, a Quick Verdict, Sources, no stale April language, and more than 850 body words.
- 2026-05-08: Verification passed: `npm run audit:guide-picks`, `npm run test:scripts`, `npm run check`, and `npm run build:fast`.
- 2026-05-08: Playwright viewport QA passed for all six routes at 360, 390, 430, 768, and 1024 px: no horizontal overflow, exactly three decision cards, exactly three guide decision CTAs, tracked guide CTA payloads, and no stale April/Gong/Zendesk benchmark copy.
- 2026-05-08: In-app browser QA passed on `/guides/best-ai-tools-for-sales-teams/`: expected title/H1, three decision cards, three tracked decision CTAs, and no stale Gong or April copy.

### 9. Final report

Completed this checkpoint.

Changed files:

- `src/content/use-cases/best-ai-tools-for-small-business.md`
- `src/content/use-cases/best-ai-tools-for-freelancers.md`
- `src/content/use-cases/best-ai-tools-for-agencies.md`
- `src/content/use-cases/best-ai-tools-for-ecommerce.md`
- `src/content/use-cases/best-ai-tools-for-sales-teams.md`
- `src/content/use-cases/best-ai-tools-for-customer-support.md`
- `scripts/audit-guide-picks.mjs`
- `.agent/MONEY_GUIDE_PICKS_BATCH2_EXECPLAN.md`

Behavior shipped:

- Six more high-intent money guides now render explicit mobile-first guide decision cards from structured editorial data.
- The protected guide-picks set increased to 13 required money routes.
- Stale April 2026 language, unsupported model/version claims, broad roundup sourcing, and unsupported benchmark percentages were removed from the migrated guide batch.
- The sales-team guide now routes buyers through real AiPedia canonical tool records instead of unsupported non-canonical ranking entries.

Tests passed:

- Focused Node content audit for the six guide files.
- `npm run audit:guide-picks`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- Playwright route/mobile QA at 360, 390, 430, 768, and 1024 px.
- In-app browser QA on the rebuilt sales-team guide.

Remaining risks:

- Several other use-case pages still have stale April-era generated copy and should be migrated by commercial value.
- Some referenced canonical tool pages, such as Apollo and Clay, still have April-era body sections even though their structured facts were refreshed earlier. They should get full tool-page refreshes in a later checkpoint.
