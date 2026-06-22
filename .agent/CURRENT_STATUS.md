# AiPedia Current Status

Last updated: 2026-06-22

Audience: maintainers, future agents, and Matt.

## Source Of Truth Stack

1. `.agent/CURRENT_STATUS.md`: where we are now.
2. `.agent/PLANS.md`: active or immediately resumable work.
3. `.agent/WORK_LOG.md`: append-only record of major landed work.
4. `.agent/LOOPS.md`: human guide to the repeatable loop system.
5. `.agent/OPERATING_RULES.md` and `.agent/PROJECT_MAP.md`: repo rules, paths, and verification surfaces.

Local ignored docs, old specs, and archived plans are not canonical when they conflict with this stack.

## Plain English

AiPedia is back on the normal Decision Content Flywheel. The TanStack rebuild idea is not active.

The loop system is now healthy and more useful than a simple pass/fail dashboard. `npm run loop:all -- --json` reports 7 ok loops and 0 attention loops across Decision Content, Freshness, Trust and Provenance, Revenue and Conversion, Quality Pruning, Performance and UX, and News and Market Change. The runner now also emits ranked recommendations and checks whether built-output loops are using fresh `dist-fast/client` output.

The comparison policy is strict: publish direct comparison pages only when tools serve the same buyer job and workflow. Same primary category is necessary, but not enough by itself. Do not create or keep `vs` pages for tools in different categories or for same-category tools that solve different workflows. Use category pages, buyer guides, alternatives sections, and internal-link blocks for those relationships instead.

The visual layout policy is also strict: every rendered page must keep disciplined grid math, card containment, consistent spacing, balanced text-to-card ratios, no broken wrapping, no horizontal overflow, and no lopsided visual weight across mobile, tablet, and desktop. Route QA is the automated floor, not the whole visual review.

The latest completed maintenance batch fixed the Quality Pruning loop: invalid no-shared-workflow comparison pages were deleted, public links were removed, the comparison-quality audit now enforces workflow lanes, and content inventory guard fixtures were re-anchored through Guard Challenge records. The live comparison inventory is now 46 policy-aligned comparison pages, with a content guard floor of 41.

The June 21 to June 22 site freshness goal is active. The first freshness pass cleared the June 21 due-now queue by refreshing Presentations.AI and MiniMax, including affected parent category hubs, source registry rows, and the page refresh ledger. A June 22 hotfix closed the reported homepage blue-logo regression and filled the June 18, 19, 20, 21, and 22 news gap on `/news/`. Follow-up homepage hotfixes closed the reported decision-evidence fallback labels, the 319 px portal overflow, the ugly orange-brown verified-guide panel styling, the homepage text-density issue, and the overcrowded/cramped decision-card evidence rails. The homepage now keeps direct one-line guidance plus compact trust signals, with more breathing room around the hero, portals, route section, and decision cards. The News and Market Change loop now explicitly requires missed-date coverage checks for both broad AI news and AI tools or tool-control news, plus `/news/`, homepage latest-news, OG assets, affected-tool links, crawl surfaces, and mobile/tablet/desktop layout QA. The Claude and Claude Code freshness batch that was paused on June 21 is complete after ledger, build, smart verification, route QA, provenance, freshness, and visual smoke checks. The previous top-layer visual batch is pushed on `master` at `3a2a5ca5`.

The latest tool refresh batches updated Gemini, GitHub Copilot, Grammarly, Qwen, Hailuo, HeyGen, and Adobe Firefly for the June 22 freshness queue. Gemini, the affected AI Chatbots, AI Search, AI Coding, and AI Infrastructure category hubs, the source registry, and the page refresh ledger now reflect current June 22 checks for Gemini app limits, Google AI plans, Gemini Code Assist/Antigravity changes, Gemini image/video/Search grounding docs, Workspace privacy, Googlebook, and Gemini 3.5 Flash standard, batch/flex, and priority API pricing. GitHub Copilot, the AI Coding category hub, the GitHub Copilot vs Supermaven comparison, Copilot alternatives guide, developer tools guide, Copilot source registry rows, top-layer parent surfaces, and the page refresh ledger now reflect current June 22 checks for Free caps, AI Credits, individual sign-up reopening, Fable 5 unavailability, MAI-Code-1-Flash rollout, Opus 4.6 fast's June 29 deprecation, AGENTS.md code review support, usage metrics, and Copilot app/platform changes. Grammarly, the AI Writing category hub, Grammarly source registry rows, and the page refresh ledger now reflect current June 22 checks for Free and Pro prompt allowances, Pro pricing and 149-seat cap, Superhuman suite pricing and consolidation caveats, Enterprise controls, affiliate-cookie status, privacy/trust claims, and Expert Review risk. Qwen, Hailuo, HeyGen, Adobe Firefly, AI Chatbots, AI Video, AI Image, relevant source registry rows, and the page refresh ledger now reflect current June 22 checks for Qwen Studio/Qwen Cloud, MiniMax Hailuo 2.3 pricing and route limits, HeyGen app/API/LiveAvatar pricing, and Adobe Firefly plans/API/partner-model caveats. The next freshness queue now starts with Augment Code, Base44, BLACKBOX AI, Captions.ai, and Cline unless a fresh broad loop run promotes the Amazon Q vs GitHub Copilot decision-content cycle.

The tool-refresh process changed after the first resumed tools proved too slow. Future tool refreshes should use `npm run tool:refresh:batch -- --limit 4` to group several queue items, run `npm run tool:refresh:batch:check -- --file <tool>...` as the fast grouped gate after ledger generation, and run one expensive typecheck/build/route-QA closeout per batch. Do not return to one full build per tool unless a template/layout/runtime change, high-risk commercial claim, or isolated failure requires it.

The first top-layer visual uplift slice is complete and pushed. The homepage compact evidence tint is fixed, and `/tools/`, `/categories/`, `/compare/`, `/guides/`, `/news/`, `/answers/`, `/trends/`, and `/workflows/` now share a warmer, homepage-aligned index-card and control surface layer. The non-home top-layer pages no longer inherit the old 680 px desktop canvas that made three-card rows feel squeezed; those index canvases now use a 1040 px desktop measure while matching the homepage narrow-mobile frame at 319 and 430 px. `/guides/` and `/news/` filter chips now have both shared and route-owned mobile grid rules, so the old horizontal strip cannot return through Astro CSS ordering. The route-owned rules are rooted on page-owned filter elements, not `#main-content`, because page-scoped Astro CSS cannot reliably match layout-owned parents. The active chip state is Signal Orange again. `/categories/` no longer exposes the long maintenance paragraph as visible copy. A follow-up shared `Hero` fix stopped mobile breadcrumbs from spreading across the row, so `aipedia / Explore` and the same crumb pattern on other top routes stay compact at 319, 346, and 430 px. Route QA passed for the affected top-layer routes at 319, 346, 360, 390, 430, 768, 1024, and 1366 px where relevant.

The latest follow-up is a detail page width parity hotfix. Tool, comparison, guide, workflow, category, company, answer, trend, and news detail pages now inherit the same narrow-mobile canvas width discipline as the homepage and top-layer routes, so they no longer feel horizontally squashed at 319 to 430 px. Structured detail layouts now opt into the shared 1040 px `gt-canvas-wide` desktop shell. Pure prose article layouts intentionally keep the 680 px desktop reading measure while still receiving the wider narrow-mobile rail.

The next selected Decision Content candidate is `amazon-q-vs-github-copilot`.

## Done Recently

- Batched tool-refresh planner:
  - Added `scripts/tool-refresh-batch.mjs` and `npm run tool:refresh:batch`.
  - Added `scripts/tool-refresh-batch-check.mjs` and `npm run tool:refresh:batch:check`.
  - The planner groups the freshness queue by tool slug, lists due facts and source IDs, infers parent category routes, and prints one combined closeout gate.
  - The fast batch gate runs per-tool quality checks plus changed provenance, freshness, ledger check, em-dash guard, and `git diff --check` without typecheck, build, or route QA.
  - Updated `.agent/LOOPS.md` and `.agent/OPERATING_RULES.md` so batched refreshes are the default and full builds happen once per batch.
- Qwen, Hailuo, HeyGen, and Adobe Firefly batch refresh:
  - Refreshed `src/content/tools/qwen.md`, `src/content/tools/hailuo.md`, `src/content/tools/heygen.md`, and `src/content/tools/adobe-firefly.md` for June 22, 2026 using current official sources.
  - Updated AI Chatbots, AI Video, and AI Image parent hubs plus the relevant source registry rows.
  - Added the Hailuo payment policy source row and regenerated `PAGE_REFRESH_LEDGER.md`.
  - Proved the new batched workflow: `npm run tool:refresh:batch:check` passed in about 8 seconds, then one typecheck, one fast build, and one combined route QA closed the whole batch.
  - Recorded `.agent/loop-runs/2026-06-22-qwen-hailuo-heygen-adobe-firefly-batch.md`.
- Grammarly tool freshness refresh:
  - Refreshed `src/content/tools/grammarly.md` for June 22, 2026 using current official Grammarly and Superhuman sources.
  - Confirmed Free still includes 100 AI prompts, Pro still includes 2,000 monthly prompts and up to 149 seats, and Pro pricing remains $30/member/month monthly, $60/member/quarter, or $144/member/year.
  - Confirmed Superhuman Pro remains $12/member/month annual or $30 monthly, Business remains $33/member/month annual or $40 monthly, Enterprise is custom, and existing subscriptions do not automatically consolidate into suite pricing.
  - Updated the AI Writing category hub, Grammarly source registry rows, `PAGE_REFRESH_LEDGER.md`, and `.agent/loop-runs/2026-06-22-grammarly-tool-refresh.md`.
- GitHub Copilot tool freshness refresh:
  - Refreshed `src/content/tools/github-copilot.md` for June 22, 2026 using current official GitHub sources.
  - Confirmed plan pricing is unchanged, Free includes 2,000 completions plus 50 chat requests, and individual Student/Pro/Pro+/Max sign-ups are reopening gradually.
  - Clarified Fable 5 remains unavailable, MAI-Code-1-Flash is expanding across more Copilot surfaces, and Opus 4.6 fast is scheduled for Copilot-wide deprecation on June 29, 2026.
  - Updated AI Coding, GitHub Copilot vs Supermaven, GitHub Copilot alternatives, and Best AI Tools for Developers surfaces.
  - Updated Copilot source registry rows, added missing Copilot source IDs, regenerated `PAGE_REFRESH_LEDGER.md`, and route-QAed affected routes plus `/tools/`, `/categories/`, `/compare/`, and `/guides/`.
  - Recorded `.agent/loop-runs/2026-06-22-github-copilot-tool-refresh.md`.
- Gemini tool freshness refresh:
  - Refreshed `src/content/tools/gemini.md` for June 22, 2026 using current official Google sources.
  - Clarified Gemini 3.5 Flash standard, batch/flex, and priority API pricing.
  - Updated Gemini Code Assist guidance for the June 18 shift to Antigravity surfaces for unpaid and Google One users, while keeping Standard and Enterprise plan guidance separate.
  - Updated affected AI Chatbots, AI Search, AI Coding, and AI Infrastructure category hubs.
  - Updated Gemini source registry rows and regenerated `PAGE_REFRESH_LEDGER.md`.
  - Recorded `.agent/loop-runs/2026-06-22-gemini-tool-refresh.md`.
- Top-layer visual uplift slice 1:
  - Added `src/styles/top-layer-index-polish.css` and imported it from `src/layouts/BaseLayout.astro`.
  - Aligned top-layer index cards, search controls, trackers, chips, borders, and card text containment with the current homepage surface language.
  - Widened non-home top-layer index canvases from the inherited 680 px measure to a 1040 px desktop measure, with homepage-matched narrow-mobile framing.
  - Converted `/guides/` and `/news/` mobile filters from horizontal chip strips into contained two-column chip grids.
  - Hardened `/guides/` and `/news/` with route-owned mobile filter rules after live browser reports showed the shared rule was not enough at 346 px.
  - Corrected those route-owned filter rules to avoid `#main-content`, which belongs to the parent layout and can miss Astro page scoping.
  - Restored the shared active-chip state so selected filters keep the Signal Orange fill.
  - Fixed shared mobile breadcrumb geometry in `src/components/godtier/Hero.astro` so current crumbs do not stretch away from the root crumb on `/explore/` and sibling top routes.
  - Fixed the remaining homepage compact-evidence tint by forcing homepage decision-card evidence metrics to render transparent.
  - Shortened the `/categories/` refresh paragraph into a compact sourced-route status line.
  - Expanded the focused Playwright homepage decision-card regression so it catches colored evidence-chip backgrounds.
  - Recorded `.agent/loop-runs/2026-06-22-top-layer-visual-uplift-slice-1.md`.
- Detail page width parity hotfix:
  - Added a global `gt-canvas-wide` utility in `src/styles/godtier-tokens.css` for structured detail layouts that need the same 1040 px desktop shell as top-layer routes.
  - Added a shared narrow-mobile `gt-canvas` rule so detail routes use the homepage-like rail at 319 to 430 px instead of the old squeezed reading frame.
  - Opted category, company, comparison, guide, and workflow layouts into `gt-canvas-wide`; tool pages already used that class.
  - Kept pure prose answer, trend, and news article layouts on the 680 px desktop reading measure while widening their narrow-mobile canvas.
  - Recorded `.agent/loop-runs/2026-06-22-detail-page-width-parity-hotfix.md`.
- Homepage decision-card density and spacing hotfix:
  - Compressed the homepage-only compact evidence rail so decision-path cards show one source row plus tiny freshness and confidence signals instead of bulky trust chips.
  - Opened up homepage rhythm by increasing mobile canvas padding, hero-to-portal spacing, portal tile spacing, decision-section spacing, card gaps, and decision-card padding.
  - Kept the strict homepage evidence build guard in place: featured cards still require registered source evidence, current freshness, at least high confidence, and one or more source rows.
  - Added a Playwright visual smoke regression for 319 px card geometry and row spacing so the cards cannot quietly become overcrowded again.
  - Recorded `.agent/loop-runs/2026-06-22-homepage-decision-card-density-hotfix.md`.
- News loop rules standard:
  - Added a dedicated news coverage discipline to `.agent/OPERATING_RULES.md`.
  - Updated `.agent/LOOPS.md` and `src/data/aipedia-loops.json` so missed-date catch-up requires broad AI news plus AI tools or tool-control coverage when current sources support both.
  - Added regression coverage in `tests/scripts/aipedia-loops.test.mjs` so the news-loop rule is visible in executable registry output.
  - Recorded `.agent/loop-runs/2026-06-22-news-loop-rules-standard.md`.
- Claude and Claude Code freshness completion:
  - Completed the paused Claude and Claude Code batch from June 21.
  - Verified stale Agent SDK and Mythos bad phrases are gone from the affected active surfaces.
  - Normalized the selected lantern logo so the logo and favicon raster assets pass the Signal Orange palette guard.
  - Passed changed-tool provenance, ledger check, freshness loop, affected route QA, full visual smoke, and `npm run check:smart:run`.
  - Recorded `.agent/loop-runs/2026-06-22-claude-claude-code-freshness-complete.md`.
- Layout precision standard:
  - Added a strict visual layout precision rule to `AGENTS.md` and `.agent/OPERATING_RULES.md`.
  - Updated `.agent/LOOPS.md`, `.agent/PROJECT_MAP.md`, the Performance and UX loop registry, and the Decision Content loop brief so route QA includes layout precision review.
  - Added decision-loop regression coverage for the new visual QA language.
- Homepage copy density pass:
  - Tightened the homepage into short, direct decision copy without generic AI phrasing.
  - Removed homepage portal blurbs, news summaries, top-tool taglines, and long catalog blurbs from the visible homepage.
  - Replaced featured decision-path summaries with homepage-specific one-line guidance.
  - Shortened homepage news labels and the verified-guide/trust copy so mobile cards stay scannable.
  - Recorded `.agent/loop-runs/2026-06-22-homepage-copy-density-hotfix.md`.
- Homepage verified-guide panel restyle:
  - Replaced the broad orange/brown wash on the `Recently verified` homepage panel with a neutral charcoal panel, subtle cool highlight, and thin amber accent.
  - Kept the inner guide cards contained on the 319 px browser viewport and preserved the section's decision-guide content.
  - Recorded `.agent/loop-runs/2026-06-22-homepage-verified-panel-restyle-hotfix.md`.
- Homepage mobile portal containment:
  - Fixed the reported `Comparisons` portal overflow at 319 px by switching the homepage portal grid to two columns on very narrow screens.
  - Added defensive wrapping on homepage portal meta and title text so labels cannot outgrow their tile.
  - Recorded `.agent/loop-runs/2026-06-22-homepage-mobile-portal-containment-hotfix.md`.
- Homepage decision-path evidence hardening:
  - Added current registered decision evidence for the homepage local/open-model, marketing/automation, and general-assistant paths.
  - Added a homepage build assertion so featured decision paths fail the build if any card is not registered, current, and high confidence.
  - Fixed the tool evidence model so old price-history rows stay as audit history without making live recommendation evidence stale.
  - Fixed the tool evidence model so evidence confidence is based on provenance, fact confidence, and freshness, not the editorial score band.
  - Added regression tests for source-backed answer evidence and historical price rows.
  - Recorded `.agent/loop-runs/2026-06-22-homepage-decision-evidence-hotfix.md`.
- June 22 news and lantern logo hotfix:
  - Replaced the old blue/cyan brand path with the selected lantern logo across nav, footer, fallback brand images, favicon generation, and generic brand PNGs.
  - Removed the legacy nav image hue filter that recolored the lantern logo blue in the browser.
  - Deleted the cyan brand PNG files and verified no `crystal-cyan`, cyan-forward, or hue-rotate references remain outside unrelated tool logo assets.
  - Added June 18, 19, 20, 21, and 22 news coverage, including daily desk posts and focused OpenAI, Shopify, G7, Anthropic, and AI-tool-control stories.
  - Regenerated news OG images, favicons, the page ledger, and the affected homepage/news top-layer metadata.
  - Recorded `.agent/loop-runs/2026-06-22-news-logo-hotfix.md`.
- Claude and Claude Code freshness batch:
  - Updated Claude and Claude Code tool records plus related company, category, comparison, guide, answer, and top-layer summary surfaces for the June 21 Fable/Mythos suspension and paused Agent SDK credit guidance.
  - Added `anthropic-api-data-retention` and `anthropic-web-search-tool` source registry entries.
  - Recorded `.agent/loop-runs/2026-06-21-claude-claude-code-freshness-paused.md` as the pause point and `.agent/loop-runs/2026-06-22-claude-claude-code-freshness-complete.md` as the completion receipt.
  - Passed final checks: stale phrase scan, changed-tool provenance, ledger check, freshness loop, affected route QA, full visual smoke, and `npm run check:smart:run`.
- Presentations.AI and MiniMax freshness pass:
  - Refreshed Presentations.AI integration, API, enterprise, pricing, and verification metadata using current June 2026 official sources.
  - Refreshed MiniMax M3, long-context, multimodal, coding, API, and pay-go pricing metadata using current June 2026 official sources.
  - Updated affected AI Presentation, AI Coding, AI Chatbots, and AI Research category surfaces.
  - Updated `src/data/source-registry.json` and `PAGE_REFRESH_LEDGER.md`.
  - Recorded `.agent/loop-runs/2026-06-21-presentations-ai-minimax-freshness.md`.
- Quality Pruning workflow-policy cleanup:
  - Deleted 19 live comparison pages whose tools did not share an approved workflow lane.
  - Removed public links to those deleted routes from affected tool pages, category pages, and curated comparison surfaces.
  - Regenerated `PAGE_REFRESH_LEDGER.md` and `src/data/coverage-backlog.json`.
  - Strengthened `scripts/audit-coverage-quality.mjs` so live comparison pages fail when they violate `src/data/comparison-policy.json` workflow lanes.
  - Updated `scripts/audit-coverage-gaps.mjs` so review-only false-vs pairs use `review_id` instead of a publishable route-style `slug`.
  - Added focused tests for shared-lane pass and no-shared-lane fail.
  - Re-anchored the content inventory guard from 60 to 41 comparisons through an accepted Guard Challenge, matching 46 live comparisons minus the existing five-page safety margin.
  - Added wrapping for long comparison-body links in `src/layouts/ComparisonLayout.astro`, fixing 360 px route QA overflow on Decktopus comparison pages.
- Loop system hardening:
  - Added ranked `review.recommendations` and short `review.next_actions` to `scripts/aipedia-loops.mjs`, so green runs still explain the best next move.
  - Added built-output freshness checks for Conversion and Performance/UX loop commands that depend on `dist-fast/client`.
  - Hardened built-output freshness so stale or unknown freshness becomes an attention signal instead of a false green.
  - Added `npm run loop:all:record`, which writes timestamped JSON receipts and `.agent/loop-runs/system/latest.json`.
  - Recorded fresh system-level loop receipts under `.agent/loop-runs/system/`, with the latest pointer in `.agent/loop-runs/system/latest.json`.
  - Tightened `check-smart` default dirty-path discovery so local-only untracked `.agents/` and `skills-lock.json` artifacts do not create verification noise, while canonical `.agent/` project docs still count.
  - Made the loop review summary always state ok, attention, and skipped counts explicitly.
  - Added `.agents/` and `skills-lock.json` to `.gitignore` so raw `git status` stays focused on AiPedia source changes.
- Multi-loop system:
  - Added `src/data/aipedia-loops.json`, `scripts/aipedia-loops.mjs`, `.agent/LOOPS.md`, and npm aliases for all seven loops.
  - Tuned loop summaries so attention signals show actionable samples and due-soon freshness work is queue context, not a false alarm.
  - Added high-volatility `next_review_at` metadata where missing, so Freshness is green.
- Activepieces/Zapier decision cycle:
  - Added `src/content/comparisons/activepieces-vs-zapier.md`.
  - Verified current June 2026 Activepieces and Zapier facts before writing.
  - Recorded `.agent/loop-runs/2026-06-21-activepieces-vs-zapier.md`.

## Active Work

- Decision Content Flywheel:
  - Use `npm run loop:next -- --json` to confirm the next valid same-workflow comparison before editing.
  - Current recommended next cycle: `amazon-q-vs-github-copilot`.
  - Verify June 2026 Amazon Q Developer and GitHub Copilot facts before editing. Do not carry forward stale pricing, model, availability, or plan claims.
  - Use `npm run loop:verify -- --date <YYYY-MM-DD> --route /compare/<slug>/ --path <changed paths>` before closing rendered comparison work.
  - Use `npm run loop:record -- --date <YYYY-MM-DD> --slug <slug> --status complete` after a completed, failed, partial, or blocked major cycle.
- Oldest-First AI Tools Wiki Refresh:
  - Work from `PAGE_REFRESH_LEDGER.md`, oldest first.
  - Verify volatile facts against current June 2026 sources before editing.
  - Update source fields, `last_verified`, affected parent hubs, and the ledger in the same change.
- Multi-Loop Review:
  - Use `npm run loop:all -- --json` for broad loop review.
  - Use `npm run loop:all:record -- --json` when a broad review should become durable run history.
  - Current attention signals: none.
  - Latest recorded broad review: 7 ok / 0 attention / 0 skipped after `npm run build:fast`.
  - Current runner recommendations: begin `amazon-q-vs-github-copilot`, then continue the due-soon tool freshness queue.
  - Rest-of-date priority order: rerun and record the loop suite after any new worktree change, then choose between the next batched freshness tools and the Amazon Q vs GitHub Copilot decision cycle based on the refreshed queue.
  - Current freshness queue has 0 due-now items and 465 due-soon facts. Claude, Claude Code, Gemini, GitHub Copilot, Grammarly, Qwen, Hailuo, HeyGen, and Adobe Firefly are complete. The next freshness queue starts with Augment Code, Base44, BLACKBOX AI, Captions.ai, and Cline unless the fresh loop recommendation says a decision-content cycle has higher leverage.
- Top-Layer Visual Uplift:
  - Slice 1 is complete and pushed.
  - The reported horizontal squeeze on non-home top-layer pages is fixed in the shared polish layer.
  - The follow-up detail page width parity hotfix is the latest master change.
  - Tool, comparison, guide, workflow, category, company, answer, trend, and news detail routes now share the homepage-like narrow-mobile canvas rule.
  - Slice 2 should still inspect `/guides/`, `/news/`, `/answers/`, `/trends/`, and `/workflows/` manually in the browser for copy density and section-specific hierarchy after the shared card polish.
  - Slice 3 should move reusable visual precision checks into loop docs or tests so future top-layer changes catch tint drift, cramped cards, and broken text ratios earlier.
- Phase 3 Parallel Surface Agent Orchestration:
  - Planned but not executed on `master`.
  - If resumed, recompute missed news dates and verify current sources before dispatching subagents.

## Verification Baseline

Latest Qwen, Hailuo, HeyGen, and Adobe Firefly batched tool freshness checks:

- `npm run tool:refresh:batch:check -- --file src\content\tools\qwen.md --file src\content\tools\hailuo.md --file src\content\tools\heygen.md --file src\content\tools\adobe-firefly.md --json`
- `npm run ledger:pages`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/qwen/ --route /categories/ai-chatbots/ --route /tools/hailuo/ --route /categories/ai-video/ --route /tools/heygen/ --route /tools/adobe-firefly/ --route /categories/ai-image/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`

The batched fast gate exited 0 in about 8 seconds. It covers per-tool quality for the four refreshed tools, changed provenance, freshness, ledger check, em-dash guard, and `git diff --check`. `npm run typecheck` passed with 0 errors. `npm run build:fast` passed in about 2 minutes 25 seconds. Combined route QA passed for all refreshed tool routes, affected parent hubs, `/tools/`, and `/categories/` at 319, 360, 390, 430, 768, 1024, and 1366 px. Freshness loop still reports 0 due-now items; the top review queue now starts with Augment Code, Base44, BLACKBOX AI, Captions.ai, and Cline.

Latest Grammarly tool freshness checks:

- `npm run audit:tool-quality -- --file src/content/tools/grammarly.md`
- `npm run audit:provenance:changed -- --json`
- `npm run loop:freshness -- --json`
- `npm run ledger:pages:check`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/grammarly/ --route /categories/ai-writing/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`

The final Grammarly checks exited 0. `npm run loop:freshness -- --json` still reported 0 due-now items and 465 due-soon facts after that refresh. `npm run build:fast` passed in about 2 minutes 37 seconds, and route QA passed for Grammarly plus affected parent/top-layer routes at 319, 360, 390, 430, 768, 1024, and 1366 px.

Latest top-layer visual uplift slice 1 checks:

- Live in-app browser DOM check at `http://127.0.0.1:4321/` for `/`, `/tools/`, `/categories/`, `/compare/`, `/guides/`, `/news/`, `/answers/`, `/trends/`, and `/workflows/` at 319 px.
- `npm run ledger:pages`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route / --route /tools/ --route /categories/ --route /compare/ --route /guides/ --route /news/ --route /answers/ --route /trends/ --route /workflows/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npx playwright test tests/smoke/visual-routes.spec.mjs --config=playwright.config.mjs -g "homepage decision cards"`
- Live in-app browser geometry sweep confirmed `/tools/`, `/categories/`, `/compare/`, `/guides/`, `/news/`, `/answers/`, `/trends/`, and `/workflows/` use the wider desktop canvas and the same 319 px card width as the homepage.
- Follow-up live in-app browser check confirmed `/guides/` and `/news/` filters are contained and visibly active at 319, 346, 360, and 430 px.
- Follow-up `npm run qa:route -- --route /guides/ --route /news/ --widths 319,346,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `git diff --check`

Browser verification confirmed the homepage decision evidence metrics now compute to transparent backgrounds with zero-width borders, all checked top-layer cards use the shared warm-neutral card polish, non-home desktop cards are no longer squeezed into 203 px columns, and no checked route has horizontal overflow at 319 px. The first route-QA attempt caught `/guides/` and `/news/` mobile filter overflow; the filters were fixed and route QA then passed. Later live browser reports on `/guides/` and `/news/` at 346 px were closed by rooting page-owned filter grid rules on `.gt-guide-filters` and `.gt-news-filters`, then restoring the shared active-chip override. The follow-up `/explore/` breadcrumb report was closed by changing shared mobile crumb items from growing flex children to compact fit-content items; live checks confirmed `/explore/`, `/tools/`, `/news/`, `/guides/`, and `/compare/` keep a 6 px crumb gap with zero overflow at 319, 346, and 430 px.

Latest detail page width parity checks:

- Live geometry baseline confirmed the old detail canvas squeeze at 346 px before the fix: `/tools/chatgpt/`, `/compare/chatgpt-vs-claude/`, and `/answers/chatgpt-vs-claude-which-is-better/` used a 283 px canvas with about 247 px body/card width.
- Live geometry verification after the fix confirmed `/tools/chatgpt/`, `/compare/chatgpt-vs-claude/`, `/answers/chatgpt-vs-claude-which-is-better/`, `/guides/best-ai-coding-assistant/`, `/workflows/agentic-coding-workflow/`, `/trends/ai-coding-model-arms-race/`, `/categories/ai-chatbots/`, `/companies/anthropic/`, and `/news/2026-06-22-ai-news-desk/` use a 315 px canvas with about 287 px body/card width at 346 px and no positive horizontal overflow.
- Live geometry verification at 1366 px confirmed structured detail layouts use a 1040 px canvas while pure prose answer, trend, and news article pages remain on the intentional 680 px reading measure.
- `npm run ledger:pages`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/chatgpt/ --route /compare/chatgpt-vs-claude/ --route /answers/chatgpt-vs-claude-which-is-better/ --route /guides/best-ai-coding-assistant/ --route /workflows/agentic-coding-workflow/ --route /trends/ai-coding-model-arms-race/ --route /categories/ai-chatbots/ --route /companies/anthropic/ --route /news/2026-06-22-ai-news-desk/ --widths 319,346,360,390,430,768,1024,1366 --site-dir dist-fast/client`

Latest Claude and Claude Code completion checks:

- Stale bad-phrase scan for Agent SDK credit and Mythos limited-availability wording.
- `npm run audit:provenance:changed -- --json`
- `npm run ledger:pages:check`
- `npm run loop:freshness -- --json`
- Affected route QA for Claude, Claude Code, affected category hubs, Anthropic, affected comparisons, guides, answers, `/tools/`, and `/categories/` at 360, 390, 430, 768, 1024, and 1366 px.
- `npm run smoke:visual`
- `node scripts\prep-favicons.mjs --check --json`
- `npm run check:smart:run`

The first `check:smart:run` attempt failed because an old preview server occupied port 4321, then visual smoke exposed a real Signal Orange palette issue in the selected lantern logo. The stale server was stopped, the lantern source was normalized to amber/orange, favicons were regenerated, `npm run smoke:visual` passed 158/158, and the final `npm run check:smart:run` passed.

Latest June 22 news/logo hotfix checks:

- `node scripts/guard-em-dashes.mjs`
- `node scripts/audit-news-rendering.mjs`
- `node scripts/audit-news-xrefs.mjs`
- `node scripts/prep-favicons.mjs --check --json`
- `node scripts/generate-og-news.mjs --check <June 18-22 slugs>`
- `node scripts/generate-og-svgs.mjs --check --limit 20 --json`
- `node scripts/generate-logo-manifest.mjs --check`
- `node --test tests\scripts\prep-favicons.test.mjs tests\scripts\generate-og-news.test.mjs`
- `node scripts\optimize-og-images.mjs --check --limit 20 --json`
- `npm run ledger:pages:check`
- `git diff --check`
- `npm run build:fast`
- `npm run qa:route -- --route / --widths 360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npm run qa:route -- --route /news/ --widths 360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npm run typecheck`
- `npm run check:links`

Browser spot checks also confirmed the homepage nav image uses `/brand/aipedia-logo-lantern-48.png`, has `filter: none`, shows as amber, and `/news/` exposes June 18 through June 22 coverage without horizontal overflow on mobile and desktop.

Latest homepage decision-evidence hotfix checks:

- `node --test tests\scripts\search-catalog.test.mjs tests\scripts\generated-models.test.mjs`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `rg -n "No source attached|Unknown source|Low confidence|Medium confidence|Evidence-only source|Inline source" dist-fast\client\index.html`
- Browser DOM check at `http://127.0.0.1:4321/` with 319 px viewport.

Browser verification confirmed five homepage decision cards, all with registered source, current freshness, high confidence, no bad fallback text, and no horizontal overflow.

Latest homepage mobile portal containment hotfix checks:

- `npm run ledger:pages`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npm run ledger:pages:check`
- `git diff --check`
- Browser DOM geometry check at `http://127.0.0.1:4321/` with 319 px viewport.

Browser verification confirmed the homepage portal grid uses two columns at 319 px, every portal title and meta label is contained inside its card, and there is no horizontal overflow.

Latest homepage verified-guide panel restyle checks:

- `npm run ledger:pages`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npm run ledger:pages:check`
- `git diff --check`
- Browser DOM style and geometry check at `http://127.0.0.1:4321/` with 319 px viewport.

Browser verification confirmed the selected `Recently verified` panel now uses neutral charcoal styling, all three inner guide cards remain inside the panel, and there is no horizontal overflow.

Latest homepage copy density checks:

- `npm run ledger:pages`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `rg -n "agentically|Product, model, pricing, funding|Choose the closest intent|These guides separate|gt-news-summary|gt-wiki-portal small|gt-tool-tagline|buyerFit|Verdicts, pricing notes|Short verdict pages|AI copy tells|generic AI" dist-fast\client\index.html src\pages\index.astro`
- `npm run ledger:pages:check`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`
- Live app-browser DOM check at `http://127.0.0.1:4321/?brand-check=lantern&copy-check=compact2` with 319 px viewport.

Browser verification confirmed no horizontal overflow, no visible homepage leaf text over 90 characters in the inspected main content, no portal description nodes, no news summary nodes, no top-tool tagline nodes, and compact one-line decision-path summaries.

Latest homepage decision-card density and spacing checks:

- `npm run ledger:pages`
- `node scripts\generate-page-refresh-ledger.mjs --check --json`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npx playwright test tests/smoke/visual-routes.spec.mjs --config=playwright.config.mjs --grep "homepage decision cards keep evidence compact and spaced"`
- `npm run smoke:visual`
- `npm run smoke:api`
- `npm run ledger:pages:check`
- `node scripts\guard-em-dashes.mjs`
- `node scripts\generate-og-svgs.mjs --check --limit 20 --json`
- `git diff --check`

Static verified output is being served at `http://127.0.0.1:4321/` from `dist-fast/client`. The visible in-app browser tab was not exposed through the browser automation API, so the current verification uses route QA, focused Playwright smoke coverage, full visual smoke, API smoke, and the live static server.

Latest layout precision standard checks:

- `npm run qa:route -- --route /news/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `node --test tests\scripts\decision-loop.test.mjs tests\scripts\aipedia-loops.test.mjs`
- `npm run loop:system -- --json`
- `npm run loop:next -- --json`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`

The checks codify the visual standard and confirm the current homepage and news route have no automated route-QA overflow or metadata failures at 319, 360, 390, 430, 768, 1024, and 1366 px.

Latest news loop rules standard checks:

- `node --test tests\scripts\aipedia-loops.test.mjs`
- `npm run loop:system -- --json`
- `npm run loop:news -- --json`
- `npm run loop:all:record -- --json`
- `npm run build:fast`
- `npm run loop:all:record -- --json`
- `npm run qa:route -- --route /news/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `node scripts\guard-em-dashes.mjs`

The first recorded broad loop caught stale built output after homepage source edits. `npm run build:fast` refreshed `dist-fast/client`, then the second recorded broad loop passed with 7 ok / 0 attention / 0 skipped. The News loop checked 410 news files, 0 issues, 0 cross-reference gaps, and `min_stories_per_day: 2`.

## Known Caveats

- `node scripts/audit-site-kpis.mjs --json` still reports `neuronwriter-vs-surfer-seo` under the 700-word comparison KPI threshold. This is an improvement opportunity, not a failing loop signal.
- Freshness is green for due-now items, but the June 22 due-soon queue still needs current-source review before the active site freshness goal can be called complete.
- The current Gemini, GitHub Copilot, Grammarly, Qwen, Hailuo, HeyGen, and Adobe Firefly refresh batches are verified locally through focused freshness/provenance/ledger checks, typecheck, build, and route QA, and should be pushed before starting a large unrelated batch.
- The detail page width parity CSS/layout edits, generated page ledger update, and `.agent` receipt are intentionally grouped together.
- Historical work-log and archive entries mention deleted comparison routes. Treat those as history, not live routing guidance.
- Full local verifier runs are reliable but slow. Prefer `npm run check:smart`, focused tests, `npm run build:fast`, and exact `qa:route` unless a full pre-ship gate is needed.
- CRLF warnings may appear for a few script/test files when Git normalizes line endings. They were non-blocking in the latest checks.
- Global `vercel@54.14.2` install emits upstream dependency deprecation warnings for `stream-to-promise@2.2.0` and `tar@7.5.7` through Vercel CLI's own dependency graph. This is not an AiPedia repo dependency issue.
- `.agents/` and `skills-lock.json` are local agent/plugin state. They are gitignored and ignored by `check-smart` default untracked discovery. Leave them untouched unless the task explicitly concerns local agent tooling.

## Start The Next Session

1. Run `git status --short --branch`.
2. Read `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `.agent/WORK_LOG.md`.
3. Confirm `origin/master` includes the latest tool freshness batch and detail page width parity hotfix before starting new work.
4. Read `.agent/LOOPS.md`, `.agent/PROJECT_MAP.md`, and `.agent/OPERATING_RULES.md`.
5. Use `npm run loop:system` to pick the right loop, or `npm run loop:next -- --json` to continue Decision Content only after the paused batch is closed.
6. If editing website content or commercial claims, apply the current-date, ledger, source, top-layer, mobile, SEO, and affiliate rules from `.agent/OPERATING_RULES.md`.

## Finish A Major Session

1. Update `.agent/CURRENT_STATUS.md`.
2. Update `.agent/PLANS.md`.
3. Append `.agent/WORK_LOG.md`.
4. Update any source spec only when that spec directly governed the work.
5. Run the smallest valid verification gate and report what passed, what failed, and what remains.
