# Lovable Tool Page Refresh ExecPlan

## 1. Objective

Refresh `src/content/tools/lovable.md` into a current May 8, 2026 buyer decision page that matches the rebuilt AI Design category and the refreshed Lovable vs Bolt.new vs v0 comparison.

## 2. Current state

- Route: `/tools/lovable/`
- Content file: `src/content/tools/lovable.md`
- Current problems:
  - Shows `last_verified: 2026-05-02` in frontmatter but visible body still says verified 2026-04-17.
  - SEO title says April 2026.
  - Pricing references old Starter and Launch tiers at $20/month and $50/month.
  - Mentions an unsupported default model claim.
  - Overstates the page around Supabase-only backend instead of the current Lovable Cloud plus Supabase paths.
  - Comparison section says Bolt.new has no built-in backend, which is no longer acceptable after current Bolt docs were checked.

## 3. Current sources checked on 2026-05-08

- Lovable pricing: `https://lovable.dev/pricing`
- Lovable plans and credits docs: `https://docs.lovable.dev/introduction/plans-and-credits`
- Lovable quick start: `https://docs.lovable.dev/introduction/getting-started`
- Lovable Cloud docs: `https://docs.lovable.dev/integrations/cloud`
- Lovable Supabase integration docs: `https://docs.lovable.dev/integrations/supabase`
- Lovable GitHub integration docs: `https://docs.lovable.dev/integrations/github`

## 4. Target state

- Reframe Lovable as a buyer page for founders and teams choosing an AI app builder.
- Update pricing to current Free, Pro, Business, and Enterprise structure.
- Make Pro 100 credits at $25/month the default first paid-plan recommendation for most builders.
- Explain credit burn, cloud costs, top-ups, rollovers, and Business/Enterprise reasons.
- Keep trust high by removing unsupported model claims and clearly naming production review requirements.
- Keep internal links to AI Design, Bolt.new, v0, Replit Agent, Cursor, Claude, and the high-intent comparison.

## 5. Verification plan

- Focused content gate for word count, May 8 verification, current plan names/prices, stale-string removal, required buyer sections, and official source links.
- `git diff --check -- src\content\tools\lovable.md src\data\source-registry.json .agent\LOVABLE_TOOL_REFRESH_EXECPLAN.md`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run check`
- `npm run build:fast`
- App-browser QA for `/tools/lovable/`
- Viewport QA at 360, 390, 430, 768, and 1024 px for route 200, no document-level overflow, current source visibility, and CTA tracking payloads.

## 6. Acceptance criteria

- No old Starter/Launch pricing, April verification, unsupported model names, or stale "Bolt no backend" comparison claim remains.
- Body is over 1,200 words and reads as a buyer decision page.
- Pricing, best plan, watch-outs, alternatives, methodology, FAQ, and sources are visible.
- Facts and source registry entries use current May 8 source IDs.
- Route builds and renders with tracked official CTAs and no mobile overflow.

## 7. Progress log

- 2026-05-08: Selected this page after the Lovable vs Bolt.new vs v0 comparison refresh because stale tool-page facts would undermine the newly rebuilt app-builder buyer path.
- 2026-05-08: Rewrote the tool page into a 2,100+ word buyer decision page with current Free, Pro, Business, and Enterprise pricing, Lovable Cloud/Supabase positioning, best-plan guidance, production watch-outs, and source-backed facts.
- 2026-05-08: Added `lovable-plans-credits` and `lovable-cloud` source registry entries for current pricing and backend provenance.
- 2026-05-08: Focused content gate, source-registry JSON validation, `git diff --check`, and `node scripts/audit-site-kpis.mjs --json` passed.
- 2026-05-08: Initial `npm run check` failed because the rewritten page dropped a required internal news xref for the Claude Design story. Added the link back to Recent Developments, then `npm run check` passed.
- 2026-05-08: `npm run build:fast` passed after the rewrite. The fast build generated 905 pages and the commercial CTA audit passed.
- 2026-05-08: App-browser QA passed for `/tools/lovable/`: title, canonical, one H1, May 8 sections, stale-string absence, and eight tracked official CTAs were confirmed.
- 2026-05-08: Viewport QA passed at 360, 390, 430, 768, and 1024 px with route 200, no document-level horizontal overflow, visible buyer sections, and complete CTA payloads.

## 8. Final report

Refreshed `src/content/tools/lovable.md` as a current app-builder buyer page. The page now recommends Free for testing and Pro 100 credits at $25/month as the default first paid plan, explains credit/top-up/cloud risks, removes old plan/model claims, and links official Lovable pricing/docs plus relevant internal comparisons and news.
