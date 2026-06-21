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

The June 21 to June 22 site freshness goal is active. The first freshness pass cleared the June 21 due-now queue by refreshing Presentations.AI and MiniMax, including affected parent category hubs, source registry rows, and the page refresh ledger. A June 22 hotfix closed the reported homepage blue-logo regression and filled the June 18, 19, 20, 21, and 22 news gap on `/news/`. Follow-up homepage hotfixes closed the reported decision-evidence fallback labels, the 319 px portal overflow, the ugly orange-brown verified-guide panel styling, and the homepage text-density issue by reducing visible homepage copy to direct one-line decision guidance. The News and Market Change loop now explicitly requires missed-date coverage checks for both broad AI news and AI tools or tool-control news, plus `/news/`, homepage latest-news, OG assets, affected-tool links, crawl surfaces, and mobile/tablet/desktop layout QA. The Claude and Claude Code freshness batch that was paused on June 21 is now complete after ledger, build, smart verification, route QA, provenance, freshness, and visual smoke checks. This verified June 22 batch is ready to commit and push.

The next selected Decision Content candidate is `amazon-q-vs-github-copilot`.

## Done Recently

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
  - Current runner recommendations: begin `amazon-q-vs-github-copilot`, then refresh Gemini due-soon facts.
  - Rest-of-date priority order: commit and push this verified June 22 batch, rerun and record the loop suite if the worktree changes, then choose between Gemini freshness and the Amazon Q vs GitHub Copilot decision cycle based on the refreshed queue.
  - Current freshness queue has 0 due-now items and 465 due-soon facts. Claude and Claude Code are complete locally. Next freshness target is Gemini unless the fresh loop recommendation says a decision-content cycle has higher leverage.
- Phase 3 Parallel Surface Agent Orchestration:
  - Planned but not executed on `master`.
  - If resumed, recompute missed news dates and verify current sources before dispatching subagents.

## Verification Baseline

Latest completed freshness batch checks:

- `npm run check:smart:run`
- `npm run loop:all -- --json`
- `npm run loop:freshness -- --json`
- `npm run audit:freshness -- --json`
- `npm run audit:provenance:changed -- --json`
- `npm run ledger:pages:check`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`

The final `check:smart:run` pass exited 0. It ran script tests, guard checks, generated-model audits, link/news/provenance checks, `build:fast`, and route QA across `/categories/ai-chatbots/`, `/categories/ai-coding/`, `/categories/ai-presentation/`, `/categories/ai-research/`, `/tools/minimax/`, and `/tools/presentations-ai/` at 360, 390, 430, 768, 1024, and 1366 px. `npm run loop:all -- --json` reported 7 ok loops, 0 attention loops, and 0 skipped loops. `npm run audit:freshness -- --json` reported 0 due-now items.

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
- Freshness is green for due-now items, but the June 22 queue still needs current-source review before the active site freshness goal can be called complete.
- The worktree is intentionally dirty with the verified June 22 batch. Commit and push this batch before starting Gemini or Amazon Q vs GitHub Copilot.
- The June 22 hotfixes, layout precision standard, News loop rules standard, Claude completion, logo/favicons, generated assets, ledger updates, tests, and `.agent` receipts should stay together when committing.
- Historical work-log and archive entries mention deleted comparison routes. Treat those as history, not live routing guidance.
- Full local verifier runs are reliable but slow. Prefer `npm run check:smart`, focused tests, `npm run build:fast`, and exact `qa:route` unless a full pre-ship gate is needed.
- CRLF warnings may appear for a few script/test files when Git normalizes line endings. They were non-blocking in the latest checks.
- Global `vercel@54.14.2` install emits upstream dependency deprecation warnings for `stream-to-promise@2.2.0` and `tar@7.5.7` through Vercel CLI's own dependency graph. This is not an AiPedia repo dependency issue.
- `.agents/` and `skills-lock.json` are local agent/plugin state. They are gitignored and ignored by `check-smart` default untracked discovery. Leave them untouched unless the task explicitly concerns local agent tooling.

## Start The Next Session

1. Run `git status --short --branch`.
2. Read `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `.agent/WORK_LOG.md`.
3. If the worktree is still dirty from the verified June 22 batch, read `.agent/loop-runs/2026-06-22-claude-claude-code-freshness-complete.md` and push that batch before starting new work.
4. Read `.agent/LOOPS.md`, `.agent/PROJECT_MAP.md`, and `.agent/OPERATING_RULES.md`.
5. Use `npm run loop:system` to pick the right loop, or `npm run loop:next -- --json` to continue Decision Content only after the paused batch is closed.
6. If editing website content or commercial claims, apply the current-date, ledger, source, top-layer, mobile, SEO, and affiliate rules from `.agent/OPERATING_RULES.md`.

## Finish A Major Session

1. Update `.agent/CURRENT_STATUS.md`.
2. Update `.agent/PLANS.md`.
3. Append `.agent/WORK_LOG.md`.
4. Update any source spec only when that spec directly governed the work.
5. Run the smallest valid verification gate and report what passed, what failed, and what remains.
