# AiPedia Active ExecPlans

Keep this file short. Archive completed detail under `.agent/archive/` once final reports are written.

For plain-English project state, read `.agent/CURRENT_STATUS.md` first. For completed work, read `.agent/WORK_LOG.md`.

## Current Snapshot

- Last updated: 2026-06-22.
- Check `master` with `git status --short --branch` before starting work.
- The June 2026 standards remediation, Guard Challenge Workflow, Project Folder Tidy, Verification Router, June 17 news catch-up, Vercel CLI install, decision loop tooling, strict comparison cleanup, `activepieces-vs-n8n`, `activepieces-vs-zapier`, multi-loop buildout, freshness metadata scheduling, Quality Pruning workflow-policy cleanup, and the Presentations.AI plus MiniMax freshness pass are complete.
- The decision content flywheel is the default repeatable loop. Use `npm run loop:next -- --json`.
- Comparison pages must compare the same buyer job and workflow. Same primary category is necessary but not sufficient. Cross-category and different-workflow pairs are review-only and must not become published `vs` pages.
- The selector now uses explicit workflow lanes for broad categories, including automation, image, coding, music, chatbots, video, voice, design, writing, notes, and search.
- The multi-loop system is green. Latest recorded broad review is 7 ok / 0 attention / 0 skipped after `npm run build:fast`. Use `npm run loop:system` to list loops and `npm run loop:all -- --json` to review all loop signals. Use `npm run loop:all:record -- --json` when a broad review should create durable JSON history.
- `.agents/` and `skills-lock.json` are gitignored local agent/plugin artifacts. `check-smart` default dirty-path discovery also ignores them, while still treating canonical `.agent/` docs as project changes.
- The live comparison inventory is 46 policy-aligned pages. `scripts/guard-content.mjs` now protects it with a 41-page floor after accepted Guard Challenge review.
- Current next selected cluster is `amazon-q-vs-github-copilot`.
- Current freshness state: 0 due-now items after the Presentations.AI, MiniMax, Claude, Claude Code, Gemini, GitHub Copilot, Grammarly, Qwen, Hailuo, HeyGen, and Adobe Firefly passes. June 22 hotfixes filled the June 18 through June 22 `/news/` gap, replaced the visible blue/cyan brand regression with the selected lantern logo, hardened homepage decision-path evidence so featured cards must be registered, current, and high confidence, fixed the 319 px homepage portal overflow, restyled the homepage `Recently verified` panel away from the ugly orange-brown wash, tightened homepage text density into one-line decision copy, and compacted plus spaced the overcrowded homepage decision-card evidence rails for 319 px mobile. Top-layer visual work also fixed non-home horizontal squeeze, `/guides/` and `/news/` filter overflow, and shared mobile breadcrumb spread on `/explore/` and sibling top routes. The detail page width parity hotfix extends the same narrow-mobile canvas discipline to tool, comparison, guide, workflow, category, company, answer, trend, and news detail routes, and gives structured detail layouts the shared 1040 px desktop shell. The visual layout precision standard now requires disciplined grid math, card containment, balanced text-to-card ratios, and no broken wrapping across mobile, tablet, and desktop. The News and Market Change loop now requires missed-date checks for broad AI news and AI tools or tool-control news, plus `/news/`, homepage latest-news, assets, affected links, crawl surfaces, and mobile/tablet/desktop route QA. Tool refreshes now use batched planning with `npm run tool:refresh:batch -- --limit 4`, `npm run tool:refresh:batch:check` for the fast grouped gate, and one expensive build/route-QA gate per batch. The next freshness queue starts with Augment Code, Base44, BLACKBOX AI, Captions.ai, and Cline unless a fresh loop recommendation makes the Amazon Q vs GitHub Copilot decision cycle higher leverage.
- Current build timing baseline from 2026-06-21: `npm run build:fast` has recently passed in roughly 2 to 3 minutes for normal content runs. The full loop verifier can take about 8 minutes when content, guards, script tests, build, and route QA are all touched.
- Route QA uses 360, 390, 430, 768, 1024, and 1366 px for rendered route work. Include 319 px for homepage, nav, card grids, and narrow-mobile risk, and include 346 px when reproducing the in-app browser reports from this visual pass.

## Active: June 21 To June 22 Site Freshness Goal

### Objective

Run the AiPedia loop system until every tracked website page, volatile fact, source-backed claim, commercial surface, parent hub, crawl surface, and loop receipt is fresh for the June 21 to June 22, 2026 refresh window, or explicitly documented as non-blocking future queue work.

### Status

- 2026-06-21: Goal created and active.
- 2026-06-21: Cleared June 21 due-now freshness items for Presentations.AI and MiniMax.
- 2026-06-21: Updated affected tool records, AI Presentation, AI Coding, AI Chatbots, AI Research, source registry rows, and `PAGE_REFRESH_LEDGER.md`.
- 2026-06-21: Verification passed with `npm run check:smart:run`, `npm run loop:all -- --json`, `npm run loop:freshness -- --json`, `npm run audit:freshness -- --json`, `npm run audit:provenance:changed -- --json`, `npm run ledger:pages:check`, `node scripts/guard-em-dashes.mjs`, and `git diff --check`.
- 2026-06-21: Started the next freshness batch for Claude and Claude Code. Paused safely before ledger/build/route QA/commit. Pause receipt: `.agent/loop-runs/2026-06-21-claude-claude-code-freshness-paused.md`.
- 2026-06-22: Completed the Claude and Claude Code freshness batch. Completion receipt: `.agent/loop-runs/2026-06-22-claude-claude-code-freshness-complete.md`.
- 2026-06-22: Closed the reported homepage blue-logo regression by removing the legacy nav logo hue filter, installing the selected lantern brand assets, regenerating favicons, and deleting cyan brand PNGs.
- 2026-06-22: Filled missing `/news/` coverage for June 18, 19, 20, 21, and 22 with source-backed desk and focused stories. Generated all required OG and thumbnail assets, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-22-news-logo-hotfix.md`.
- 2026-06-22: Verification passed for the hotfix with targeted asset/news checks, script tests, `npm run ledger:pages:check`, `npm run build:fast`, route QA for `/` and `/news/` at 360, 390, 430, 768, 1024, and 1366 px, `npm run typecheck`, and `npm run check:links`.
- 2026-06-22: Closed the reported homepage decision-path evidence regression. The local/open-model and marketing/automation cards now use current registered sources, the general-assistant answer has registered source-backed evidence, and the shared tool evidence model no longer lets old price-history rows or score-band confidence weaken live recommendation evidence.
- 2026-06-22: Verification passed for the decision-evidence hotfix with `node --test tests\scripts\search-catalog.test.mjs tests\scripts\generated-models.test.mjs`, `npm run typecheck`, `npm run build:fast`, homepage route QA at 319, 360, 390, 430, 768, 1024, and 1366 px, built-output text scan, and live browser DOM inspection at 319 px.
- 2026-06-22: Closed the reported 319 px homepage portal overflow by switching very narrow homepage portal grids to two columns and adding text containment to portal labels. Verification passed with ledger regeneration, `npm run typecheck`, `npm run build:fast`, homepage route QA at 319, 360, 390, 430, 768, 1024, and 1366 px, ledger check, `git diff --check`, and live browser DOM geometry inspection.
- 2026-06-22: Closed the reported homepage `Recently verified` panel style issue by replacing the orange-brown panel wash with neutral charcoal styling, a subtle cool highlight, and a thin amber accent. Verification passed with ledger regeneration, `npm run typecheck`, `npm run build:fast`, homepage route QA at 319, 360, 390, 430, 768, 1024, and 1366 px, ledger check, `git diff --check`, and live browser DOM style and geometry inspection.
- 2026-06-22: Closed the reported homepage text-density issue by removing visible portal blurbs, news summaries, top-tool taglines, and long catalog blurbs, then replacing featured decision summaries with one-line homepage copy. Verification passed with ledger regeneration, `npm run typecheck`, `npm run build:fast`, homepage route QA at 319, 360, 390, 430, 768, 1024, and 1366 px, stale-copy `rg` sweep, ledger check, em-dash guard, `git diff --check`, and live app-browser DOM inspection.
- 2026-06-22: Closed the reported overcrowded/cramped homepage decision-card issue by compacting the homepage-only evidence rail into one source row plus tiny freshness and confidence signals, increasing homepage spacing, and keeping the strict registered-source/current/high-confidence build guard. Verification passed with ledger regeneration, ledger check, `npm run typecheck`, `npm run build:fast`, homepage route QA at 319, 360, 390, 430, 768, 1024, and 1366 px, focused Playwright regression, `npm run smoke:visual`, `npm run smoke:api`, OG SVG check, em-dash guard, and `git diff --check`.
- 2026-06-22: Added the visual layout precision standard to canonical operating docs and loop tooling. Future rendered UI work must check grid math, gutters, card containment, balanced text density, CTA placement, no orphan labels, no broken wrapping, and no horizontal overflow across mobile, tablet, and desktop.
- 2026-06-22: Added the News loop rules standard to canonical operating docs and loop tooling. Future news catch-up work must check each missed date for broad AI news and AI tools or tool-control news when sourceable, keep `/news/`, homepage latest-news, OG assets, affected-tool links, crawl surfaces, and ledger rows aligned, and verify `/news/` across mobile, tablet, and desktop.
- 2026-06-22: Rebuilt with `npm run build:fast` after the first recorded broad loop correctly flagged stale rendered output. The latest recorded broad loop is back to 7 ok / 0 attention / 0 skipped.
- 2026-06-22: Fixed the selected lantern logo palette after visual smoke found brownish pixels outside Signal Orange. Regenerated brand sizes and favicons. `npm run smoke:visual` passed 158/158, and `npm run check:smart:run` passed.
- 2026-06-22: Completed the Gemini tool refresh for the June 22 freshness queue. The Gemini tool page, AI Chatbots, AI Search, AI Coding, AI Infrastructure, Gemini source registry rows, page refresh ledger, and `.agent/loop-runs/2026-06-22-gemini-tool-refresh.md` are updated and verified.
- 2026-06-22: Completed the GitHub Copilot tool refresh for the June 22 freshness queue. The GitHub Copilot tool page, AI Coding category hub, GitHub Copilot vs Supermaven comparison, GitHub Copilot alternatives guide, Best AI Tools for Developers guide, Copilot source registry rows, page refresh ledger, top-layer parent surfaces, and `.agent/loop-runs/2026-06-22-github-copilot-tool-refresh.md` are updated and verified.
- 2026-06-22: Completed the Grammarly tool refresh for the June 22 freshness queue. The Grammarly tool page, AI Writing category hub, Grammarly source registry rows, page refresh ledger, and `.agent/loop-runs/2026-06-22-grammarly-tool-refresh.md` are updated and verified through quality, freshness, provenance, ledger, typecheck, build, and route QA.
- 2026-06-22: Added the batched tool-refresh planner. `npm run tool:refresh:batch -- --limit 4` groups the next tools, source IDs, parent routes, and one combined closeout gate so future refresh work avoids a full build after every single tool.
- 2026-06-22: Completed the Qwen, Hailuo, HeyGen, and Adobe Firefly batched freshness refresh. The four tool pages, AI Chatbots, AI Video, AI Image, source registry rows, page refresh ledger, and `.agent/loop-runs/2026-06-22-qwen-hailuo-heygen-adobe-firefly-batch.md` are updated and verified. `npm run tool:refresh:batch:check` now provides the fast grouped gate before the single typecheck/build/route-QA closeout.

### Next

- Treat the rest-of-date operating plan as: rerun and record all loops after any new worktree change, then decide between the next batched freshness tools and the Amazon Q vs GitHub Copilot decision cycle from the fresh loop recommendations.
- Keep the detail page width parity CSS/layout edits, generated page ledger update, verification notes, and `.agent` receipt together when inspecting history.
- Regenerate and inspect `PAGE_REFRESH_LEDGER.md`.
- Run focused smart verification plus mobile and desktop route QA for affected rendered routes.
- Record a final complete loop receipt only after verification passes.
- Commit and push only after the batch is solid.
- Then continue the freshness window with the next batched queue and the remaining facts due on 2026-06-22.
- Keep deleting or avoiding invalid different-workflow comparison pages.
- Record each meaningful cycle in `.agent/loop-runs/`.
- Keep `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, `.agent/WORK_LOG.md`, and `.agent/LOOPS.md` current before each push.

## Active: Decision Content Flywheel

### Objective

Run AiPedia as a repeatable buyer-decision loop: cluster, verify, improve decision page, update hubs, check, record, repeat.

### Source Spec

`docs/superpowers/specs/2026-06-21-aipedia-decision-content-loop.md`

### Commands

- `npm run loop:next`: read-only brief for the next buyer-intent cluster.
- `npm run loop:next -- --json`: structured brief for automation or agent handoff.
- `npm run coverage:backlog`: regenerate the coverage backlog when the selected cluster looks stale.
- `npm run loop:verify -- --date <YYYY-MM-DD> --route /compare/<slug>/ --path <changed paths>`: date-stable rendered-cycle verification.
- `npm run loop:record -- --date <YYYY-MM-DD> --slug <slug> --status complete`: durable run receipt.

### Status

- 2026-06-21: Strict comparison cleanup deleted false-vs comparison files and removed public links to deleted routes.
- 2026-06-21: `src/data/comparison-policy.json` no longer has an adjacent-workflow allowlist.
- 2026-06-21: `coverage:backlog`, `coverage:next`, and `loop:next` now select only same-primary-category pairs that are not blocked as false-vs.
- 2026-06-21: The selector now uses explicit workflow-family lanes for broad categories so same-category but different-workflow pages do not slip in as automatic `vs` pages.
- 2026-06-21: Guard and test fixtures were updated through an accepted Guard Challenge after the comparison inventory changed.
- 2026-06-21: Completed `activepieces-vs-n8n`.
- 2026-06-21: Completed `activepieces-vs-zapier`; recorded `.agent/loop-runs/2026-06-21-activepieces-vs-zapier.md`.
- 2026-06-21: Current next selected cluster is `amazon-q-vs-github-copilot`.
- 2026-06-21: Loop hardening includes `loop:verify`, `qa:route`, `loop:record`, changed-route smart guidance, raw Markdown table rejection for changed comparison pages, executable route QA, conditional fallback builds, receipt-safe command recording, per-command timing, scoped fast-build environment handling, build-before-browser-check ordering, exact route QA replacement for safe content-only route cycles, and explicit workflow-family selection for broad categories.
- 2026-06-21: Multi-loop registry added Decision Content, Freshness, Trust and Provenance, Revenue and Conversion, Quality Pruning, Performance and UX, and News and Market Change loops.
- 2026-06-21: Quality Pruning cleanup deleted 19 no-shared-workflow comparison pages, removed public links, strengthened the comparison quality audit with workflow-lane enforcement, re-anchored comparison inventory fixtures through Guard Challenge records, and brought `npm run loop:all -- --json` to 7 ok / 0 attention.
- 2026-06-21: Loop runner now reports ranked recommendations, checks built-output freshness for rendered-output loops, and can persist system loop-run JSON receipts with deltas from the previous recorded run.
- 2026-06-21: Presentations.AI and MiniMax freshness pass cleared the old second-ranked freshness recommendation. Current decision recommendation remains `amazon-q-vs-github-copilot`.

## Active: Multi-Loop System

### Objective

Keep AiPedia maintenance repeatable without turning it into bureaucracy. The loop system should tell an agent which queue to run, what signal matters, what can be skipped, and what must be verified before editing.

### Commands

- `npm run loop:system`: list every registered loop.
- `npm run loop:all -- --json`: run every loop read-only.
- `npm run loop:all:record -- --json`: run every loop and write a machine-readable run receipt.
- `npm run loop:decision -- --json`: review the Decision Content loop.
- `npm run loop:freshness -- --json`: review stale and due fact queues.
- `npm run loop:trust -- --json`: review provenance and source health.
- `npm run loop:conversion -- --json`: review rendered commercial CTA tracking.
- `npm run loop:quality -- --json`: review thin, invalid, or low-quality content.
- `npm run loop:performance -- --json`: review built-output budgets and indexability.
- `npm run loop:news -- --json`: review news rendering and market-change xrefs.

### Status

- 2026-06-21: Initial buildout complete in the current working batch.
- 2026-06-21: First run found two attention loops: Freshness and Quality Pruning.
- 2026-06-21: Revised runner after review so due-soon freshness volume is queue context, not an alarm.
- 2026-06-21: Revised runner summaries to expose sample failures, issues, gaps, top review queue items, and top tools.
- 2026-06-21: Freshness metadata scheduling fixed 17 missing high-volatility `next_review_at` values.
- 2026-06-22: Latest broad review is 7 ok / 0 attention / 0 skipped after a fresh `npm run build:fast`. The latest system receipt is `.agent/loop-runs/system/latest.json`.
- 2026-06-21: Built-output freshness now fails into `attention` when stale or unknown, preventing rendered-output loops from looking green without a trustworthy build.
- 2026-06-21: `check-smart` now filters local-only untracked `.agents/` and `skills-lock.json` noise from default discovery, without filtering explicit paths, staged files, or canonical `.agent/` docs.
- 2026-06-21: Loop summaries now always show ok, attention, and skipped counts, including all-green runs.
- 2026-06-21: `.gitignore` now ignores `.agents/` and `skills-lock.json` so raw git status is aligned with the smart-check filter.
- 2026-06-21: Cleared due-now freshness items by refreshing Presentations.AI integration, API, enterprise, and pricing facts plus MiniMax M3, API, coding, multimodal, long-context, and pay-go facts. Parent category hubs, source registry, page ledger, and route QA were updated.
- 2026-06-22: Added explicit news catch-up rules to `.agent/OPERATING_RULES.md`, `.agent/LOOPS.md`, `src/data/aipedia-loops.json`, and `tests/scripts/aipedia-loops.test.mjs`. The News loop now surfaces active-month date coverage, broad AI news, AI tools or tool-control news, homepage latest-news alignment, and `/news/` layout QA as first-class review requirements.

### Next Improvement Pass

- Rerun `npm run loop:all:record -- --json` after any further dirty worktree change.
- Then run either the Qwen freshness queue or the `amazon-q-vs-github-copilot` Decision Content cycle, depending on the fresh recorded recommendations and current-source availability.
- After each meaningful cycle, rerun the relevant loop plus `npm run loop:all -- --json` and record whether attention returns.
- For broad loop-system reviews, use `npm run loop:all:record -- --json` so `.agent/loop-runs/system/latest.json` captures the run, recommendations, built-output freshness, and trend.

## Active: Top-Layer Visual Uplift

### Objective

Bring non-homepage top-layer routes up to the current homepage standard: warm-neutral surfaces, clean one-line intent where possible, consistent grid math, contained card copy, no colored-tint drift, and no mobile crowding at 319, 360, 390, 430, 768, 1024, and 1366 px.

### Reviewed Plan

- Keep information architecture, canonical URLs, slugs, schema, and ranking logic unchanged unless a route-specific bug requires it.
- Use the homepage as the visual reference: charcoal panels, Signal Orange accents, compact trust signals, generous but efficient spacing, and no cyan or blue decorative surfaces.
- Apply the first reusable layer to top-level index surfaces only: `/tools/`, `/categories/`, `/compare/`, `/guides/`, `/news/`, `/answers/`, `/trends/`, and `/workflows/`.
- Match homepage-like width discipline: non-home top-layer desktop canvases should not force three-card rows into the old 680 px reading measure, and narrow-mobile canvases should not lose usable width compared with the homepage.
- Extend that width discipline to detail routes: structured detail pages should use the shared 1040 px desktop shell where cards, rails, and comparison structures need room; pure prose detail pages should keep the 680 px desktop reading measure while still using the wider narrow-mobile rail.
- Fix local copy problems separately when the visible text itself is causing density, starting with the long `/categories/` refresh paragraph.
- Verify by build, route QA, browser geometry checks, and a focused visual regression for the homepage evidence tint.

### Execution Slices

- Slice 1: Complete 2026-06-22. Removed the remaining homepage compact-evidence tint, added a regression, added shared top-layer card/control polish, widened non-home top-layer index canvases to stop desktop card squeeze, matched the homepage narrow-mobile frame, changed `/guides/` and `/news/` mobile filters to contained grids, hardened those filters with route-owned rules after live 346 px reports, corrected the page-scoped selectors to avoid layout-owned parents, restored the shared active-chip state, shortened the categories refresh line, fixed shared mobile breadcrumb geometry after `/explore/` showed the current crumb stretching away from `aipedia`, and QAed `/`, `/tools/`, `/categories/`, `/compare/`, `/guides/`, `/news/`, `/answers/`, `/trends/`, and `/workflows/`.
- Detail width parity: Complete 2026-06-22. Added a global `gt-canvas-wide` utility, added the shared narrow-mobile `gt-canvas` rule for non-home pages, opted category, company, comparison, guide, and workflow layouts into the 1040 px structured shell, kept pure prose article layouts at 680 px on desktop, and QAed representative tool, comparison, answer, guide, workflow, trend, category, company, and news detail routes at 319, 346, 360, 390, 430, 768, 1024, and 1366 px.
- Slice 2: inspect and tune `/guides/`, `/news/`, `/answers/`, `/trends/`, `/workflows/`, and the most visited detail templates for page-specific hierarchy and copy density now that shared surface and width math are fixed.
- Slice 3: extend the visual precision checks into loop docs/tests so future page work catches card tint, overflow, cramped density, and broken text ratios before shipping.

## Recommended Next: Amazon Q Vs GitHub Copilot Comparison Sprint

### Objective

Create a high-intent, source-backed comparison page for `amazon-q-vs-github-copilot` while refreshing affected Amazon Q Developer, GitHub Copilot, AI Coding, parent hubs, source registry, LLM surfaces, and ledger rows.

### Why This Is Next

- `npm run loop:next -- --json` selects `amazon-q-vs-github-copilot`.
- Both tools are in the `ide_copilot_extensions` workflow lane, so this is a real same-job coding-assistant comparison.
- The expected buyer question is AWS-centered development and cloud operations versus broad IDE and GitHub-native coding assistance.

### First Slice

- Verify current June 2026 Amazon Q Developer and GitHub Copilot pricing, IDE support, enterprise controls, model access, limits, agent features, source, privacy, and affiliate facts.
- Refresh `src/content/tools/amazon-q.md` and `src/content/tools/github-copilot.md` only where current sources justify changes.
- Create or refresh `src/content/comparisons/amazon-q-vs-github-copilot.md`.
- Inspect and update affected parent surfaces, especially `/compare/`, `/tools/`, AI Coding category pages, sitemap/LLM surfaces, and `PAGE_REFRESH_LEDGER.md`.

### Verification

- `npm run loop:verify -- --date <YYYY-MM-DD> --route /compare/amazon-q-vs-github-copilot/ --path <changed paths>`
- `npm run loop:record -- --date <YYYY-MM-DD> --slug amazon-q-vs-github-copilot --status complete`
- Retry commands if needed:
- `npm run ledger:pages -- --date <YYYY-MM-DD>`
- `npm run ledger:pages:check -- --date <YYYY-MM-DD>`
- `npm run audit:coverage-quality:changed`
- `npm run audit:tool-quality`
- `npm run audit:facts`
- `npm run audit:provenance:changed`
- `npm run check:smart:run -- --path <changed paths>`
- `npm run build:fast` if rendered output or pre-ship confidence requires it and `loop:verify` did not already run it.
- `npm run qa:route -- --route /compare/amazon-q-vs-github-copilot/ --widths 360,390,430,768,1024,1366`

## Active: Oldest-First AI Tools Wiki Refresh

### Objective

Refresh tracked AiPedia pages from oldest to newest, prioritizing tool and buyer-decision pages where product, pricing, model, affiliate, and recommendation facts can go stale.

### Scope

- Work from `PAGE_REFRESH_LEDGER.md`, oldest first.
- Verify volatile facts with current June 2026 sources before editing.
- Update tool/content frontmatter, source fields, `last_verified`, `last_updated`, and buyer-decision copy where needed.
- Inspect affected top-layer and parent surfaces, including `/tools/`, `/categories/`, `/compare/`, `/answers/`, sitemap/LLM surfaces, and relevant parent category hubs.
- Regenerate or update `PAGE_REFRESH_LEDGER.md` in the same change.

### Verification

- `npm run ledger:pages`
- `npm run ledger:pages:check`
- `npm run audit:facts`
- `npm run audit:provenance`
- `npm run check:links`
- `npm run check:smart`

### Status

- 2026-06-22: Gemini refresh complete.
- 2026-06-22: GitHub Copilot, Grammarly, Qwen, Hailuo, HeyGen, and Adobe Firefly refreshes complete. The next queue starts with Augment Code, Base44, BLACKBOX AI, Captions.ai, and Cline unless the broad loop runner promotes a decision-content cycle first.

## Planned: Phase 3 Parallel Surface Agent Orchestration

### Objective

Use parallel agents for independent surface maintenance without confusing ownership or verification.

### Status

- Planned but not executed on `master`.
- Recompute missed news dates before starting.
- Verify current sources before assigning any public content updates.
