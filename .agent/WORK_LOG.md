# AiPedia Work Log

### 2026-06-27: Non-Tool Page Refresh Batch 04

- Status: Complete and verified locally.
- Commit: this commit.
- Branch: `master`.
- Changed: Refreshed 24 guide routes from `/guides/best-ai-for-logo-design/` through `/guides/best-ai-tool-for-paid-social-creative-velocity/` to June 27 verification. Repaired source-health failures for Canva logo creation, Instapage AdMap, Leadpages A/B testing, Dext business/partner pricing, Consensus subscription plans, AdCreative official product/pricing surface, Lindy docs, and Adobe Firefly plan sourcing. Updated affected parent surfaces `/guides/`, `/categories/`, AI Design, AI Image, AI Presentation, AI Writing, AI SEO, AI Coding, AI Notes, AI Video, AI Voice, AI Automation, AI Research, and `PAGE_REFRESH_LEDGER.md`.
- Timing: Source health after repairs checked 224 URLs with 0 broken and 0 unreachable in 11.725s. Timed runner closeout passed with source health 12.887s, typecheck 17.468s, build:fast 18.397s, and content route QA 37.220s. Supplemental category route QA passed in 14.190s.
- Verification: `node scripts/check-frontmatter.mjs --changed`; `AIPEDIA_CURRENT_DATE=2026-06-27 npm run audit:coverage-quality:changed`; `npm run audit:provenance:changed -- --json`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run page:source-health -- --plan local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json --out local/tmp/aipedia-runner/page-refresh/batch-04-source-health-after-labels.json --concurrency 8 --timeout-ms 8000`; `npm run ledger:pages && npm run ledger:pages:check`; `AIPEDIA_CURRENT_DATE=2026-06-27 npm run runner:page-refresh:closeout`; supplemental `node scripts/qa-route.mjs` for 11 affected category hubs across 319, 360, 390, 430, 768, 1024, and 1366 px.
- Residual risks: Several official sources are access-sensitive from CLI checks, but none are broken or unreachable. Strict 3-day target remains active with 193 tracked pages older than 2026-06-24.
- Next: Regenerate the next page-refresh plan and continue the remaining guide/comparison/company/static/workflow/trend/tool/crawl/report refresh waves.

### 2026-06-26: Page Refresh Source Health Optimization

- Status: Complete and verified.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `scripts/page-source-health.mjs` and `npm run page:source-health` for bounded concurrent source URL checks with per-source and per-page timing, timeout controls, per-host pacing, and access-sensitive handling for 401, 403, and 429. Wired source health into Rust `runner:page-refresh:closeout` before typecheck, added `--skip-source-health` for scoped workflow tests, fixed worker report scaffolds so checks use `command`, `status`, and `notes`, updated workflow docs, and normalized `PAGE_REFRESH_LEDGER.md` after the closeout regen.
- Timing: Focused source-health unit tests run in 299.7ms. A live two-page planner smoke checked 21 source URLs in 5.211s with concurrency 4, replacing the prior serial per-page source-health bottleneck shape from batch 03.
- Verification: `npm exec --yes --package=node@24 -- node --test tests/scripts/page-refresh-batch.test.mjs tests/scripts/page-source-health.test.mjs`; `cargo test --manifest-path tools/aipedia-runner/Cargo.toml`; `npm run runner:page-refresh:plan -- --limit 2 --workers 1 --pages-per-worker 2`; `npm run page:source-health -- --plan local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json --out local/tmp/aipedia-runner/page-refresh/source-health-smoke.json --concurrency 4 --timeout-ms 8000`; `npm run runner:page-refresh:closeout -- --skip-build --skip-route-qa --skip-source-health`; `npm run audit:commands`; `node scripts/guard-em-dashes.mjs && git diff --check`.
- Failed then fixed: The new source-health tests first timed out because the synchronous child process blocked the local HTTP server owned by the same test process. Switched the helper to async `execFile` and reran cleanly.
- Residual risks: The live source-health smoke intentionally failed on an existing content issue: `https://www.canva.com/logo-maker/` returns 404 on `/guides/best-ai-for-logo-design/`. Treat that as the first repair in the next content refresh pass.
- Next: Fix the Canva source on `/guides/best-ai-for-logo-design/`, then run the next oldest-first non-tool batch with source health enabled.

### 2026-06-26: Non-Tool Page Refresh Batch 03

- Status: Complete and verified.
- Commit: this commit.
- Branch: `master`.
- Changed: Ran the optimized Rust page-refresh workflow over 18 guide routes from academic writing through LinkedIn, including one archived noindex legal-research guide. Refreshed June 26 verification language, source dates, and targeted buyer notes; updated affected parent surfaces `/guides/`, `/answers/best-ai-for-writing-2026/`, AI Writing, AI Research, AI Coding, AI Design, AI Automation, AI Search, and `PAGE_REFRESH_LEDGER.md`.
- Timing: Planner 0.73s; bulk source URL check 66.07s for 106 unique URLs; per-page source timing 99.87s across 18 pages; worker reports parsed 6/6 with 175 report source URLs, 35 confidence labels, 21 caveats, and 41 parent notes. Final closeout passed in 62.57s wall time: cheap gates 2.375s, typecheck 14.284s, build:fast 16.124s, and route QA 29.443s for 24 indexable routes across seven widths.
- Verification: `npm run runner:page-refresh:plan -- --limit 18 --workers 6 --pages-per-worker 3`; grouped current-source searches with `June 2026`; bulk and per-page source URL health checks; `npm run ledger:pages`; `npm run ledger:pages:check`; `npm run runner:page-refresh:reports`; `npm run runner:page-refresh:closeout`.
- Failed then fixed: Main-thread generated worker reports used `name` instead of the Rust schema's `command` field for checks, so the first report aggregation parsed 0/6. Rewrote the report checks to the schema and reran aggregation cleanly at 6/6.
- Optimization notes: Source health checks are now the slowest micro-step. Add a bounded concurrent page-source checker with per-domain rate limits and access-sensitive handling for 401, 403, and 429. Also update planner scaffolds so `checks` uses `command`.
- Residual risks: Some official sources are access-gated or rate-limited from CLI checks. The archived legal-research guide remains noindex and intentionally skipped indexable route QA.
- Next: Patch the worker-report scaffold schema and source-health helper before scaling above 18 pages.

### 2026-06-26: Page Refresh Workflow Policy And Report Optimization

- Status: Complete and verified.
- Commit: this commit.
- Branch: `master`.
- Changed: Improved the non-tool page-refresh planner and Rust report aggregator after batch 02. Planner routes now carry explicit QA policy classes: `indexable-buyer`, `parent-category`, `top-layer`, `interactive-noindex`, `archived-noindex`, and `content`. Archived noindex content stays in worker refresh and frontmatter checks while skipping indexable route QA. Worker report summaries now include pages/minute, sources/page, caveats/page, confidence labels/page, failed worker checks, and parent-surface hints grouped by the child routes that referenced them. Updated `workflows/page-refresh/README.md` and focused tests.
- Verification: `node --check scripts/page-refresh-batch.mjs`; `npm exec --yes --package=node@24 -- node --test tests/scripts/page-refresh-batch.test.mjs`; `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check`; `cargo test --manifest-path tools/aipedia-runner/Cargo.toml`; `npm run runner:page-refresh:plan -- --limit 4 --workers 2 --pages-per-worker 2`; `npm run runner:page-refresh:reports`.
- Residual risks: This is workflow instrumentation and QA targeting only. The next real batch should confirm the efficiency metrics remain useful with completed worker reports, not just scaffolds.
- Next: Run one more 12 to 18 page non-tool batch, then compare pages/minute, sources/page, route QA time, and rework count before scaling further.

### 2026-06-26: Non-Tool Page Refresh Batch 02

- Status: Complete locally, verified, pending commit and push.
- Commit: this commit.
- Branch: `master`.
- Changed: Ran the Rust page-refresh workflow over 12 comparison and guide routes from Frase/NeuronWriter through heavy-inbox triage. Refreshed affected AI SEO, AI Presentation, AI Chatbots, and AI Automation category hubs plus `/compare/`, `/guides/`, and `PAGE_REFRESH_LEDGER.md`. Hardened the page-refresh planner so archived noindex content routes stay in content/frontmatter verification but skip indexable route QA, and updated the Rust aggregator to parse structured worker check reports.
- Timing: Worker reports parsed 3/3 with 3935 reported worker seconds, 89 source URLs, 51 confidence labels, 29 caveats, and 75 parent surface notes. Final closeout passed in 51.528s: cheap gates 2.311s, typecheck 12.352s, build:fast 15.761s, and route QA 21.099s for 18 indexable routes across seven widths.
- Verification: `cargo test --manifest-path tools/aipedia-runner/Cargo.toml`; `npm run runner:page-refresh:reports`; `npm run ledger:pages && npm run ledger:pages:check`; `npm run runner:page-refresh:closeout`.
- Failed then fixed: The Rust report parser initially rejected structured worker `checks` objects, and the first closeout route QA failed on intentionally archived noindex guide routes. Fixed both workflow issues, regenerated the saved plan route args, and reran closeout cleanly.
- Residual risks: Source registry rows were not changed because this batch used page-local source lists and parent summaries. Archived noindex pages were refreshed but intentionally excluded from indexable route QA after content/frontmatter checks.
- Next: Commit and push, then run one more 12 to 18 page non-tool batch before scaling the page workflow further.

### 2026-06-26: Rust Page Refresh Runner

- Status: Complete locally, verified, pending commit and push.
- Commit: this commit.
- Branch: `master`.
- Changed: Added Rust runner support for non-tool page refreshes with `page-plan`, `page-reports`, `page-closeout`, and `page-run` subcommands. Added npm scripts for the new runner path, page worker report aggregation, split content and interactive route QA closeout, current-date environment propagation, per-command timing, and page-refresh receipts. Updated workflow docs and agent status docs so the Rust runner is the default page-refresh orchestration path.
- Verification: `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check`; `cargo check --manifest-path tools/aipedia-runner/Cargo.toml`; `cargo test --manifest-path tools/aipedia-runner/Cargo.toml`; `npm exec --yes --package=node@24 -- node --test tests/scripts/page-refresh-batch.test.mjs`; `npm run runner:page-refresh:plan -- --limit 3 --workers 2 --pages-per-worker 2`; `npm run runner:page-refresh:reports`; `npm run runner:page-refresh:closeout -- --dry-run --skip-build --skip-route-qa`; `npm run audit:commands`; `node scripts/guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: This is orchestration only. The Node planner, content audits, Astro checks, and Playwright route QA remain the accuracy layer.
- Next: Commit and push, then use `npm run runner:page-refresh:plan` for the next 12 to 24 page non-tool batch.

### 2026-06-26: Non-Tool Page Refresh Workflow Optimization

- Status: Complete and pushed.
- Commit: 5657acf64.
- Branch: `master`.
- Changed: Optimized `scripts/page-refresh-batch.mjs` for repeatable speed, efficiency, quality, and accuracy review. The planner now emits worker report paths, can write worker JSON report scaffolds, includes per-worker report schemas in prompts, gives the integrator report paths, separates standard content route QA from intentional noindex interactive route QA, and emits `commands.timed_closeout` for closeout micro-step timing. Updated `workflows/page-refresh/README.md`, planner tests, and agent status docs.
- Verification: `node --check scripts/page-refresh-batch.mjs`; `npm exec --yes --package=node@24 -- node --test tests/scripts/page-refresh-batch.test.mjs`; real planner smoke with `--write-agent-prompts`, `--report-dir`, and `--write-report-scaffolds` to `local/tmp/page-refresh-optimization-smoke.json`.
- Residual risks: This improves workflow instrumentation and routing policy only. The next real batch should validate that worker JSON reports are filled consistently enough for automated aggregation.
- Next: Run the next 12 to 24 page non-tool batch using generated prompts and report scaffolds, then tune shard sizing from measured worker reports.

### 2026-06-26: Non-Tool Page Refresh Batch 01

- Status: Complete and pushed.
- Commit: 7fd14b7aa.
- Branch: `master`.
- Changed: Ran the first live non-tool page-refresh workflow over 12 routes: terms, disclosure, reports, dead archive, four answer pages, compare-builder, and three comparison pages. Updated affected parent surfaces `/answers/`, `/compare/`, `/categories/ai-voice/`, `/categories/ai-seo/`, and `PAGE_REFRESH_LEDGER.md`. Added planner prompt-file output, fixed coverage-quality current-date handling, added explicit noindex/interactive route-QA flags, and updated the page-refresh workflow docs.
- Timing: Planner 0.39s; prompt-file generation 0.42s; workers 4m00s, 6m17s, and 2m22s; typecheck 13.00s; build:fast 16.79s; content route QA 20.39s; interactive builder route QA 2.67s. Full receipt: `.agent/loop-runs/2026-06-26-page-refresh-batch-01.md`.
- Verification: `node --check scripts/page-refresh-batch.mjs`; `node --check scripts/audit-coverage-quality.mjs`; `node --check scripts/qa-route.mjs`; `npm exec --yes --package=node@24 -- node --test tests/scripts/page-refresh-batch.test.mjs`; `node scripts/check-frontmatter.mjs --changed`; `node scripts/guard-em-dashes.mjs`; `npm run ledger:pages && npm run ledger:pages:check`; `npm run audit:provenance:changed -- --json`; `AIPEDIA_CURRENT_DATE=2026-06-26 npm run audit:coverage-quality:changed`; `AIPEDIA_CURRENT_DATE=2026-06-26 npm run audit:facts`; `npm run check:links`; `npm run typecheck`; `AIPEDIA_CURRENT_DATE=2026-06-26 npm run build:fast`; route QA for 17 content routes x 7 widths; route QA for `/compare/build/` x 7 widths with intentional noindex/interactive flags.
- Failed then fixed: Manual worker-prompt transcription caused missed `/reports/` and `/dead/` edits even though the planner JSON had correct `index.astro` paths; fixed with `--write-agent-prompts`. `audit:coverage-quality:changed` treated current-day dates as future because it ignored explicit current date; fixed. `qa-route` applied indexable comparison-page assertions to `/compare/build/`; fixed with explicit opt-in flags for noindex interactive routes.
- Residual risks: Source registry rows were not changed because these are mostly static/answer/comparison pages with inline source lists. Next page-refresh run should add a parseable worker report artifact and keep batch size at 12 to 24 pages until worker report integration stabilizes.
- Next: Commit and push, then run the next non-tool page batch using generated prompt files.

### 2026-06-26: Non-Tool Page Refresh Workflow V1

- Status: Complete and pushed.
- Commit: d918f852c.
- Branch: `master`.
- Changed: Added `scripts/page-refresh-batch.mjs`, `npm run page:refresh:batch`, focused planner tests, and the first runnable `workflows/page-refresh/` procedure for non-tool page refreshes. The planner reads `PAGE_REFRESH_LEDGER.md`, excludes tool pages by default, sorts oldest-first, supports type filters, emits six-worker shard prompts, emits one integrator prompt, and includes timing-aware route QA at concurrency 6.
- Verification: `node --check scripts/page-refresh-batch.mjs`; `npm run --silent page:refresh:batch -- --limit 12 --max-workers 3 --pages-per-worker 4 --json > .tmp-page-refresh-batch.json`; `npm exec --yes --package=node@24 -- node --test tests/scripts/page-refresh-batch.test.mjs`; `npm run audit:commands`; `node scripts/guard-em-dashes.mjs`; `npm run ledger:pages && npm run ledger:pages:check`; `git diff --check`.
- Residual risks: This creates the repeatable lane but does not refresh page content yet. The first real page batch should capture actual worker, integration, and route QA timings, then feed stable improvements back into the workflow and planner.
- Next: Use generated prompt files for live page-refresh batches.

### 2026-06-26: Same-Day Tool Refresh Timing Run and Route QA Optimization

- Status: Complete and pushed.
- Branch: `master`.
- Changed: Ran `$aipedia-tool-refresh-workflow` with six shard workers across a 60-tool intentional same-day revisit plan from Consensus through Kling. Integrated worker edits, manually refreshed the missed `captions.md` page, updated affected category hubs, refreshed `src/data/source-registry.json`, regenerated `PAGE_REFRESH_LEDGER.md`, and checked all affected rendered routes.
- Buyer-impact notes: Replit Agent now uses the current Pro annual effective price of $90/month; Capacities now includes Release 66 AI Chat Connectors 2.0; Figma now carries Config 2026 Code Layers, Motion, shaders, generative plugins, Weave tools, agent skills, web search, connectors, and file attachments; Synthesia now primary-confirms Studio Express-1 custom avatar add-on pricing at $1,000/year for annual Studio users; Captions recheck keeps the public self-serve ladder stable and separates Mirage API procurement from app-plan credits.
- Workflow changes: Fixed `audit:tool-quality` so current-date checks use local/explicit current dates instead of UTC-only slicing. Added `--timing-file` support to `qa-route` with per-route and per-viewport timing. Updated the Rust runner to persist route QA timing and increased runner route QA concurrency from 4 to 6 while preserving the same route and viewport coverage. Updated workflow docs and the local skill mirror to use generated worker prompts verbatim and route QA concurrency 6.
- Timing: Six worker shard reports ranged from about 6.5 to 45 minutes; worker collection was bounded by the slowest 45-minute shard. Runner closeout passed in 185.4s: ledger generate 0.56s, ledger check 0.56s, grouped check 25.4s, typecheck 16.3s, build:fast 16.4s, route QA 126.3s at concurrency 4. The optimized rerun of the same 75 routes x 7 widths at concurrency 6 passed with 85.5s internal route QA timing; slowest route totals were category/index routes such as `/categories/ai-automation/`, `/categories/ai-coding/`, `/categories/`, and `/tools/`.
- Verification: `node --check scripts/audit-tool-quality.mjs`; `node --check scripts/qa-route.mjs`; `node scripts/check-frontmatter.mjs --changed`; `git diff --check`; `npm run ledger:pages && npm run ledger:pages:check`; `AIPEDIA_CURRENT_DATE=2026-06-26 npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json --timing-file local/tmp/aipedia-runner/manual-timings/2026-06-26-grouped-check.json`; `AIPEDIA_CURRENT_DATE=2026-06-26 npm run runner:tool-refresh:closeout -- --plan .tmp-tool-refresh-batch.json --route-args .tmp-route-qa-args.txt --receipt-dir local/tmp/aipedia-runner/receipts`; `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 $(cat .tmp-route-qa-args.txt) --widths 319,360,390,430,768,1024,1366 --timing-file local/tmp/aipedia-runner/manual-timings/2026-06-26-route-qa-concurrency-6.json`; `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check`; `cargo check --manifest-path tools/aipedia-runner/Cargo.toml`.
- Failed then fixed: Default planner returned 0 due tools, so this run used `--include-same-day` intentionally. Hand-transcribed worker prompts skipped `captions.md` and briefly assigned `perplexity.md`/`langgraph.md` instead of `comet.md`/`kling.md`; workers corrected the two wrong assignments, and the integrator refreshed Captions manually. Multiple workers hit false `last_verified is in the future` failures because `audit:tool-quality` used UTC date slicing; the audit now accepts explicit/local current dates, and grouped checks pass unshimmed with `AIPEDIA_CURRENT_DATE=2026-06-26`.
- Residual risks: Dynamic, checkout-gated, region-rendered, account-gated, and primary-conflict claims remain caveated in the affected pages, especially Base44 credits, D-ID live plan cards, Canva regional checkout, Captions credit rollover, Udio/Lovable/Kling account-gated pricing, ChatGPT Go regional pricing, and Google/Decktopus localized plan availability.
- Next: Regenerate the default planner without `--include-same-day` before deciding whether another tool freshness batch is actually due.

Purpose: append-only record of major work that has actually landed.

Use this file to answer "what got done?" Use `.agent/CURRENT_STATUS.md` to answer "where are we now?" Use `.agent/PLANS.md` to answer "what is still active?" For context economy, read the newest entries first and stop once you have the relevant proof trail.

## Recording Contract

- Newest entries go first.
- Add an entry after any major implementation, remediation, migration, launch, or multi-file documentation pass.
- Keep entries short enough to scan.
- Include commit, branch, verification, status, and residual risks when known.
- If the current commit introduces the work-log entry, write `this commit` rather than trying to embed its own hash.
- Do not move active work into this file until it is complete, pushed, or explicitly deferred.
- Do not treat local-only ignored docs as canonical unless the entry says so.

## Entry Template

```md
### YYYY-MM-DD: Short Work Name

- Status:
- Commit:
- Branch:
- Changed:
- Verification:
- Residual risks:
- Next:
```

## Entries

### 2026-06-25: Tool Refresh Planner Source-Health Bridge

- Status: Complete locally, partially verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Updated `scripts/tool-refresh-batch.mjs` so batch JSON includes registered source metadata for each planned tool, deduped `commands.source_ids`, scoped offline/live/snapshot `audit:sources` commands, and shard-level `source_ids` in worker briefs. Updated `scripts/README.md`, `tests/scripts/tool-refresh-batch.test.mjs`, and `.agent/CURRENT_STATUS.md`.
- Verification: `node --check scripts/tool-refresh-batch.mjs`; `npm run tool:refresh:batch -- --limit 2 --max-workers 2 --tools-per-worker 1 --json`; `node --test tests/scripts/tool-refresh-batch.test.mjs`; `npm run audit:commands`; `npm run audit:sources -- --json --limit 0 --source-id consensus-pricing`.
- Failed then documented: `npm run check:quick` stopped in the broad script suite because the local shell is using Node 22 and missing installed packages such as `sharp` and `esbuild`; existing dirty-baseline `qa-route` and temporary TypeScript import fixture failures also remain in that broad run. The focused planner test passed.
- Residual risks: Live source-health fetching was not run because this was a planner wiring change and live checks can be slow or network-sensitive. Future batches should use the emitted live command when deciding whether registered source hashes changed.
- Next: Use the emitted `commands.source_health` section before the next large refresh batch to prioritize changed sources and avoid unnecessary page edits.

### 2026-06-22: Capacities, Beehiiv, Browserbase, Castmagic, CloudTalk Batch

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Refreshed Capacities, Beehiiv, Browserbase, Castmagic, and CloudTalk against current June 22 primary sources; updated AI Notes, AI Writing, and AI Automation parent hubs; advanced source registry checks; regenerated `PAGE_REFRESH_LEDGER.md`; and recorded `.agent/loop-runs/2026-06-22-capacities-beehiiv-browserbase-castmagic-cloudtalk-batch.md`.
- Verification: `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --file src\content\tools\capacities.md --file src\content\tools\beehiiv.md --file src\content\tools\browserbase.md --file src\content\tools\castmagic.md --file src\content\tools\cloudtalk.md --json`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/capacities/ --route /categories/ai-notes/ --route /tools/beehiiv/ --route /categories/ai-writing/ --route /tools/browserbase/ --route /categories/ai-automation/ --route /tools/castmagic/ --route /tools/cloudtalk/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: This batch is complete, but the global goal remains active. `npm run tool:refresh:batch -- --limit 5 --json` now queues Grok, Cursor, Lindy, n8n, and Mistral AI.
- Next: Continue the active freshness goal with Grok, Cursor, Lindy, n8n, and Mistral AI.

### 2026-06-22: Qwen, Hailuo, HeyGen, And Adobe Firefly Batch Refresh

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Refreshed Qwen, Hailuo, HeyGen, and Adobe Firefly against current June 22 official sources; updated AI Chatbots, AI Video, and AI Image parent hubs; added the Hailuo payment policy source row; refreshed source registry dates; regenerated `PAGE_REFRESH_LEDGER.md`; added `scripts/tool-refresh-batch-check.mjs`; and added `npm run tool:refresh:batch:check` so future tool refreshes can pass a fast grouped gate before one expensive build/route-QA closeout.
- Verification: `npm run tool:refresh:batch:check -- --file src\content\tools\qwen.md --file src\content\tools\hailuo.md --file src\content\tools\heygen.md --file src\content\tools\adobe-firefly.md --json`; `npm run ledger:pages`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/qwen/ --route /categories/ai-chatbots/ --route /tools/hailuo/ --route /categories/ai-video/ --route /tools/heygen/ --route /tools/adobe-firefly/ --route /categories/ai-image/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: The full build is still expensive because the static site has hundreds of routes plus guard, indexability, commercial CTA, sitemap, and budget checks. The new rule is to pay that cost once per batch unless a template, runtime, layout, generated asset, or high-risk commercial claim requires isolation.
- Next: Push this batch, then run a fresh loop recommendation and choose between the Amazon Q vs GitHub Copilot decision cycle and the next batched freshness queue.

### 2026-06-22: Grammarly Tool Freshness Refresh

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Refreshed `src/content/tools/grammarly.md`, the AI Writing category hub, Grammarly source registry rows, `PAGE_REFRESH_LEDGER.md`, and `.agent/loop-runs/2026-06-22-grammarly-tool-refresh.md`; confirmed Free prompt allowance, Pro prompt allowance and 149-seat cap, Pro pricing, Superhuman suite pricing, Enterprise controls, affiliate cookie status, privacy/trust claims, and Superhuman suite consolidation caveats.
- Verification: `npm run audit:tool-quality -- --file src/content/tools/grammarly.md`; `npm run audit:provenance:changed -- --json`; `npm run loop:freshness -- --json`; `npm run ledger:pages:check`; `node scripts\guard-em-dashes.mjs`; `git diff --check`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/grammarly/ --route /categories/ai-writing/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: This completed Grammarly only at the time. Qwen, Hailuo, HeyGen, and Adobe Firefly were completed in the following batch.
- Next: See the newer batch entry above for the current queue.

### 2026-06-22: Batched Tool Refresh Planner

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `scripts/tool-refresh-batch.mjs`, `npm run tool:refresh:batch`, and operating-loop documentation that makes batched oldest-first tool refreshes the default. The planner groups due tools by slug, lists due facts and source IDs, infers parent category routes, and prints one combined closeout gate.
- Verification: `npm run tool:refresh:batch -- --limit 4 --json`; `npm run check:fast`; `npm run audit:commands`.
- Residual risks: The planner accelerates queue handling and verification grouping, but it does not replace current-source verification or editorial judgment.
- Next: Use `npm run tool:refresh:batch -- --limit 4` plus `npm run tool:refresh:batch:check` for the next queued batch instead of closing each tool with a full build.

### 2026-06-22: GitHub Copilot Tool Freshness Refresh

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Refreshed `src/content/tools/github-copilot.md`, the AI Coding category hub, `github-copilot-vs-supermaven`, `github-copilot-alternatives`, `best-ai-tools-for-developers`, Copilot source registry rows, `PAGE_REFRESH_LEDGER.md`, and `.agent/loop-runs/2026-06-22-github-copilot-tool-refresh.md`; confirmed unchanged plan pricing, Free caps, AI Credits, individual sign-up reopening, Fable 5 unavailability, MAI-Code-1-Flash expansion, Opus 4.6 fast's June 29 deprecation, AGENTS.md code review support, Copilot app GA, and usage metrics.
- Verification: `npm run audit:tool-quality -- --file src/content/tools/github-copilot.md`; `npm run audit:provenance:changed -- --json`; `npm run loop:freshness -- --json`; `npm run ledger:pages:check`; `node scripts\guard-em-dashes.mjs`; `git diff --check`; `npm run audit:coverage-quality:changed`; `npm run typecheck`; `npm run test:scripts`; `npm run build:fast`; `npm run qa:route -- --route /tools/github-copilot/ --route /categories/ai-coding/ --route /compare/github-copilot-vs-supermaven/ --route /guides/github-copilot-alternatives/ --route /guides/best-ai-tools-for-developers/ --route /tools/ --route /categories/ --route /compare/ --route /guides/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: This completes GitHub Copilot only. The remaining freshness queue starts with Grammarly, Qwen, Hailuo, and HeyGen unless the broad loop runner promotes a decision-content cycle first.
- Next: Continue oldest-first freshness with Grammarly or run `amazon-q-vs-github-copilot` if the fresh loop recommendation ranks that higher.

### 2026-06-22: Gemini Tool Freshness Refresh

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Refreshed `src/content/tools/gemini.md`, affected AI Chatbots, AI Search, AI Coding, and AI Infrastructure category hubs, Gemini source registry rows, `PAGE_REFRESH_LEDGER.md`, and `.agent/loop-runs/2026-06-22-gemini-tool-refresh.md`; clarified Gemini 3.5 Flash standard, batch/flex, and priority API pricing; separated Google AI plan guidance from API billing; updated Gemini Code Assist and Antigravity guidance for June 22.
- Verification: `npm run audit:tool-quality -- --file src/content/tools/gemini.md`; `npm run audit:provenance:changed -- --json`; `npm run loop:freshness -- --json`; `npm run ledger:pages:check`; `node scripts\guard-em-dashes.mjs`; `git diff --check`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/gemini/ --route /categories/ai-chatbots/ --route /categories/ai-search/ --route /categories/ai-coding/ --route /categories/ai-infrastructure/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npm run test:scripts`; `npm run audit:coverage-quality:changed`.
- Residual risks: This completes Gemini only. The remaining freshness queue starts with GitHub Copilot, Grammarly, Qwen, Hailuo, and HeyGen unless the broad loop runner promotes a decision-content cycle first.
- Next: Continue oldest-first freshness with GitHub Copilot or run `amazon-q-vs-github-copilot` if the fresh loop recommendation ranks that higher.

### 2026-06-22: Detail Page Width Parity Hotfix

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Added a shared `gt-canvas-wide` utility in `src/styles/godtier-tokens.css`, added a global narrow-mobile `gt-canvas` rule for non-home detail pages, opted category, company, comparison, guide, and workflow layouts into the 1040 px structured desktop shell, kept pure prose article layouts on the 680 px desktop reading measure, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-22-detail-page-width-parity-hotfix.md`.
- Verification: live geometry baseline showed the old 346 px detail route squeeze on `/tools/chatgpt/`, `/compare/chatgpt-vs-claude/`, and `/answers/chatgpt-vs-claude-which-is-better/`; post-fix live geometry confirmed representative tool, comparison, answer, guide, workflow, trend, category, company, and news detail routes share the wider narrow-mobile rail with no positive horizontal overflow; `npm run ledger:pages`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/chatgpt/ --route /compare/chatgpt-vs-claude/ --route /answers/chatgpt-vs-claude-which-is-better/ --route /guides/best-ai-coding-assistant/ --route /workflows/agentic-coding-workflow/ --route /trends/ai-coding-model-arms-race/ --route /categories/ai-chatbots/ --route /companies/anthropic/ --route /news/2026-06-22-ai-news-desk/ --widths 319,346,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: Pure prose answer, trend, and news article pages intentionally stay on the 680 px desktop reading measure, so do not widen those on desktop unless the content model changes. This pass fixes shell width, not every page-specific hierarchy or copy-density issue.
- Next: Continue either Gemini freshness or `amazon-q-vs-github-copilot` based on the next loop recommendation.

### 2026-06-22: Top-Layer Visual Uplift Slice 1

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Added a shared top-layer index polish layer for `/tools/`, `/categories/`, `/compare/`, `/guides/`, `/news/`, `/answers/`, `/trends/`, and `/workflows/`; imported it from `BaseLayout`; aligned cards, search controls, trackers, chips, borders, and text containment with the current homepage surface language; widened non-home top-layer index canvases from the inherited 680 px measure to 1040 px on desktop; matched the homepage narrow-mobile frame; converted `/guides/` and `/news/` mobile filters into contained grids; hardened those filters with route-owned mobile rules after live 346 px reports; corrected the page-scoped selectors to avoid the layout-owned `#main-content`; restored the shared active-chip Signal Orange state; fixed shared mobile breadcrumb geometry after `/explore/` showed the current crumb stretching away from `aipedia`; fixed the remaining homepage compact-evidence tint; shortened the visible `/categories/` maintenance paragraph; and expanded the focused Playwright homepage card regression to reject tinted compact evidence metrics.
- Verification: live in-app browser DOM check for `/`, `/tools/`, `/categories/`, `/compare/`, `/guides/`, `/news/`, `/answers/`, `/trends/`, and `/workflows/` at 319, 430, 768, and 1366 px; `npm run ledger:pages`; `npm run typecheck`; `node scripts\guard-em-dashes.mjs`; `git diff --check`; `npm run build:fast`; first route QA caught `/guides/` and `/news/` mobile filter overflow; after the filter fix, `npm run build:fast` and `npm run qa:route -- --route / --route /tools/ --route /categories/ --route /compare/ --route /guides/ --route /news/ --route /answers/ --route /trends/ --route /workflows/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client` passed; later live browser and route QA checked `/guides/` and `/news/` at 319, 346, 360, 390, 430, 768, 1024, and 1366 px; follow-up live browser checks confirmed `/explore/`, `/tools/`, `/news/`, `/guides/`, and `/compare/` breadcrumbs stay compact with no overflow at 319, 346, and 430 px; final follow-up `npm run qa:route -- --route /explore/ --route /tools/ --route /categories/ --route /compare/ --route /guides/ --route /news/ --route /answers/ --route /trends/ --route /workflows/ --widths 319,346,360,390,430,768,1024,1366 --site-dir dist-fast/client` passed; earlier slice regression `npx playwright test tests/smoke/visual-routes.spec.mjs --config=playwright.config.mjs -g "homepage decision cards"` passed.
- Residual risks: This is a shared-surface and width-math slice, not a full route-by-route content rewrite. The next slice should manually inspect and tune `/guides/`, `/news/`, `/answers/`, `/trends/`, and `/workflows/` for copy density and page-specific hierarchy.
- Next: Run top-layer visual uplift slice 2 before starting unrelated visual redesign work.

### 2026-06-22: Homepage Decision Card Density And Spacing Hotfix

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Fixed the reported overcrowded and cramped homepage decision-path cards at 319 px by compressing the homepage-only evidence rail into one source row plus tiny freshness and confidence signals, then opening up the homepage rhythm around the hero, portals, route section, and decision cards. Kept the strict registered-source, current, high-confidence evidence guard in place. Added a focused Playwright visual smoke regression so the cards cannot quietly return to bulky trust-chip layouts or underspaced rows.
- Verification: `npm run ledger:pages`; `node scripts\generate-page-refresh-ledger.mjs --check --json`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npx playwright test tests/smoke/visual-routes.spec.mjs --config=playwright.config.mjs --grep "homepage decision cards keep evidence compact and spaced"`; `npm run smoke:visual`; `npm run smoke:api`; `npm run ledger:pages:check`; `node scripts\guard-em-dashes.mjs`; `node scripts\generate-og-svgs.mjs --check --limit 20 --json`; `git diff --check`.
- Residual risks: The visible in-app browser tab was not exposed through browser automation, so static local output is served at `http://127.0.0.1:4321/` for manual reload. No blocking layout risk remains after route QA and visual smoke.
- Next: Continue the freshness goal from Gemini or the Amazon Q vs GitHub Copilot recommendation.

### 2026-06-22: Claude And Claude Code Freshness Completion

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Completed the paused Claude and Claude Code freshness batch; refreshed Claude/Claude Code, Anthropic, affected category hubs, comparisons, guides, answer pages, source registry, top-layer surfaces, and ledger rows around Fable/Mythos suspension, Opus 4.8, paused Agent SDK credit changes, Claude Code usage/cost guidance, data retention, and web search. Fixed the selected lantern logo palette so brand and favicon rasters stay inside Signal Orange.
- Verification: stale bad-phrase scan; `npm run audit:provenance:changed -- --json`; `npm run ledger:pages:check`; `npm run loop:freshness -- --json`; affected route QA across Claude, Claude Code, category, comparison, guide, answer, `/tools/`, and `/categories/` routes at 360, 390, 430, 768, 1024, and 1366 px; `node scripts\prep-favicons.mjs --check --json`; `npm run smoke:visual`; `npm run check:smart:run`.
- Residual risks: None blocking. The site still has due-soon freshness work, with Gemini currently first in the queue.
- Next: Rerun the loop suite after any new dirty worktree change, then choose between Gemini freshness and `amazon-q-vs-github-copilot`.

### 2026-06-22: News Loop Rules Standard

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Added explicit missed-date news rules to `.agent/OPERATING_RULES.md`, `.agent/LOOPS.md`, and `src/data/aipedia-loops.json`; the News and Market Change loop now requires broad AI news plus AI tools or tool-control coverage when sourceable, `/news/` and homepage latest-news alignment, OG assets, affected-tool links, source lists, crawl surfaces, ledger updates, and mobile/tablet/desktop layout QA. Added a regression test so the rule remains visible in loop-registry output.
- Verification: `node --test tests\scripts\aipedia-loops.test.mjs`; `npm run loop:system -- --json`; `npm run loop:news -- --json`; `npm run build:fast`; `npm run loop:all:record -- --json`; `npm run qa:route -- --route /news/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `node scripts\guard-em-dashes.mjs`.
- Residual risks: The loop standard is now explicit and green, but article selection still needs editorial judgment and current-source verification. The broader June 21 to June 22 freshness goal remains active and dirty.
- Next: Finish the paused Claude and Claude Code freshness batch, rerun and record all loops, then choose Gemini freshness or the Amazon Q vs GitHub Copilot cycle from the fresh recommendations.

### 2026-06-22: Visual Layout Precision Standard

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Added a strict layout precision rule to the canonical agent docs, expanded the Performance and UX loop and Decision Content brief so rendered work must check grid symmetry, gutters, card containment, text-to-card ratios, CTA placement, orphan text, broken wrapping, and horizontal overflow across mobile, tablet, and desktop.
- Verification: `npm run qa:route -- --route /news/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `node --test tests\scripts\decision-loop.test.mjs tests\scripts\aipedia-loops.test.mjs`; `npm run loop:system -- --json`; `npm run loop:next -- --json`; `node scripts/guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: This codifies the standard and strengthens operator prompts, but true visual balance still needs human/browser judgment alongside route QA.
- Next: Apply this standard to every rendered page change, starting with the remaining June 22 hotfix and freshness work.

### 2026-06-22: Homepage Copy Density Pass

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Tightened homepage visible copy into smart one-line decision guidance; removed portal blurbs, news summaries, top-tool taglines, and long catalog blurbs; shortened homepage news labels, verified-guide copy, and trust copy so the first mobile pass is scannable without generic AI tells.
- Verification: `npm run ledger:pages`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; stale-copy `rg` sweep against `dist-fast\client\index.html` and `src\pages\index.astro`; `npm run ledger:pages:check`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; live app-browser DOM inspection at `http://127.0.0.1:4321/?brand-check=lantern&copy-check=compact2` on the 319 px viewport.
- Residual risks: None known for homepage copy density. The broader June 21 to June 22 freshness goal remains active and dirty.
- Next: Keep this with the June 22 hotfix batch when committing, then finish the paused Claude and Claude Code freshness work.

### 2026-06-22: Homepage Verified Panel Restyle

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Fixed the reported homepage `Recently verified` panel style issue by replacing the broad orange-brown wash with a neutral charcoal panel, subtle cool highlight, and thin amber accent while keeping the guide cards readable and contained.
- Verification: `npm run ledger:pages`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npm run ledger:pages:check`; `git diff --check`; live browser DOM style and geometry inspection at `http://127.0.0.1:4321/` on the 319 px viewport.
- Residual risks: None known for this panel. The broader June 21 to June 22 freshness goal remains active and dirty.
- Next: Keep this with the June 22 hotfix batch when committing, then finish the paused Claude and Claude Code freshness work.

### 2026-06-22: Homepage Mobile Portal Containment

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Fixed the reported 319 px homepage portal overflow by switching the portal grid to two columns on very narrow screens and adding defensive text containment to portal meta/title labels.
- Verification: `npm run ledger:pages`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npm run ledger:pages:check`; `git diff --check`; live browser DOM geometry inspection at `http://127.0.0.1:4321/` on the 319 px viewport.
- Residual risks: None known for the portal card overflow. The broader June 21 to June 22 freshness goal remains active and dirty.
- Next: Keep this with the June 22 hotfix batch when committing, then finish the paused Claude and Claude Code freshness work.

### 2026-06-22: Homepage Decision Evidence Hardening

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Added registered, current, high-confidence evidence to the homepage decision paths that previously fell back to `No source attached` or `Unknown source`; added source-backed evidence for the featured general-assistant answer; added a homepage build assertion for featured decision cards; separated tool-page evidence confidence from editorial score confidence; and kept older price-history rows out of the live recommendation evidence freshness calculation.
- Verification: `node --test tests\scripts\search-catalog.test.mjs tests\scripts\generated-models.test.mjs`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; built-output text scan for bad evidence fallback labels; live browser DOM inspection at `http://127.0.0.1:4321/` on the 319 px viewport.
- Residual risks: The broader June 21 to June 22 freshness goal is still active. The paused Claude and Claude Code batch remains dirty and unfinished.
- Next: Keep this with the June 22 hotfix batch when committing, then finish the paused Claude and Claude Code freshness work before starting another content batch.

### 2026-06-21: Presentations.AI And MiniMax Freshness Pass

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Refreshed Presentations.AI integration, API, enterprise, pricing, and verification metadata; refreshed MiniMax M3, long-context, multimodal, coding, API, and pay-go pricing metadata; updated AI Presentation, AI Coding, AI Chatbots, and AI Research category surfaces; updated `src/data/source-registry.json`, `PAGE_REFRESH_LEDGER.md`, and `.agent/loop-runs/2026-06-21-presentations-ai-minimax-freshness.md`.
- Verification: `npm run check:smart:run`; `npm run loop:all -- --json`; `npm run loop:freshness -- --json`; `npm run audit:freshness -- --json`; `npm run audit:provenance:changed -- --json`; `npm run ledger:pages:check`; `node scripts/guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: This is not whole-site completion. The active freshness goal continues through the June 21 to June 22 window, with Claude, Gemini, and Claude Code next in the due-soon queue.
- Next: Continue the active freshness goal, or run the top Decision Content recommendation `amazon-q-vs-github-copilot` if buyer-decision growth is prioritized.

### 2026-06-21: Gitignored Local Agent Artifacts

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `.agents/` and `skills-lock.json` to `.gitignore`, preserving `.agent/` as the canonical project memory folder; updated active continuity docs so future sessions understand the local-tooling distinction.
- Verification: `git status --short --branch`; `node scripts/check-smart.mjs --json`; `git diff --check`; `node scripts/guard-em-dashes.mjs`; `npm run check:smart:run`.
- Residual risks: None known. Local agent/plugin files stay available on this machine but no longer clutter raw git status.
- Next: Continue loop-system review only if a new noisy or ambiguous signal appears; otherwise move to the top real work queue.

### 2026-06-21: Explicit Loop Review Summary Counts

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Updated `scripts/aipedia-loops.mjs` so `review.summary` always states ok, attention, and skipped loop counts, including all-green runs; added regression coverage for attention and clean summaries; and updated loop continuity docs.
- Verification: `node --test tests/scripts/aipedia-loops.test.mjs`; `node scripts/aipedia-loops.mjs --all --run --json`; `npm run check:smart:run`; `npm run loop:all:record -- --json`.
- Residual risks: None known. This is a reporting-only loop-system improvement.
- Next: Continue reviewing for any remaining practical loop-system improvements.

### 2026-06-21: Check-Smart Local Artifact Noise Filter

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Updated `scripts/check-smart.mjs` so default dirty-path discovery filters local-only untracked `.agents/` and `skills-lock.json` artifacts, while preserving explicit paths, staged files, tracked diffs, and canonical `.agent/` project docs; added focused regression coverage; and updated the `.agent` continuity docs.
- Verification: `node --test tests/scripts/check-smart.test.mjs`; `node scripts/check-smart.mjs --json`; `npm run check:smart:run`; `npm run loop:all:record -- --json`.
- Residual risks: The filter is intentionally narrow. If local agent/plugin state ever becomes part of the actual repo, pass paths explicitly or stage the intended file so `check-smart` includes it.
- Next: Continue the goal by reviewing the latest system loop receipt for any remaining noisy, weak, or under-tested signals.

### 2026-06-21: Built-Output Freshness Attention Hardening

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Tightened `scripts/aipedia-loops.mjs` so built-output loop commands become `attention` when freshness is stale or unknown; added regression coverage for unknown freshness and compact `latest.json` receipts; updated loop docs to make the behavior explicit; and recorded a fresh system loop receipt.
- Verification: `node --test tests/scripts/aipedia-loops.test.mjs`; `npm run loop:all -- --json`; `npm run loop:all:record -- --json`; `npm run check:smart:run`.
- Residual risks: Build freshness is based on filesystem mtimes, so a clean `npm run build:fast` remains the right response whenever rendered-output confidence is uncertain.
- Next: Keep iterating the loop-system goal by reviewing the latest system receipt and improving noisy, weak, or under-tested loop signals.

### 2026-06-21: Loop Runner Recommendation And Ledger Hardening

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added ranked loop recommendations, built-output freshness checks, and opt-in system loop-run JSON receipts to `scripts/aipedia-loops.mjs`; added `npm run loop:all:record`; updated the loop registry with build freshness watch paths and ignored non-rendering loop data; added focused runner tests for stale builds and ledger writes; recorded the first `.agent/loop-runs/system/latest.json`; and updated README, script docs, and `.agent` operating docs.
- Verification: `node --test tests/scripts/aipedia-loops.test.mjs`; `npm run loop:all -- --json`; `npm run loop:all:record -- --json`.
- Residual risks: The system receipt is intentionally opt-in so casual loop checks remain read-only. Build freshness compares filesystem mtimes, so a clean rebuild is still the best answer when rendered-output confidence matters.
- Next: Use the ranked recommendation from the latest system receipt: begin `amazon-q-vs-github-copilot`, or refresh the top due freshness item if fact freshness is higher priority.

### 2026-06-21: Quality Pruning Workflow Policy Cleanup

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Deleted 19 invalid live comparison pages whose tools did not share an approved workflow lane; removed public links from affected tool pages, category pages, and curated comparison surfaces; regenerated `PAGE_REFRESH_LEDGER.md` and `src/data/coverage-backlog.json`; strengthened `scripts/audit-coverage-quality.mjs` to enforce `src/data/comparison-policy.json` workflow lanes; changed review-only coverage backlog entries to use `review_id` instead of route-style slugs; added focused comparison-quality and coverage-gap tests; re-anchored comparison inventory guards from 60 to 41 through accepted Guard Challenge records; and added link wrapping in `src/layouts/ComparisonLayout.astro` to prevent long source links from causing 360 px overflow.
- Verification: `npm run coverage:backlog`; deleted-route `rg` sweep over `src` and `PAGE_REFRESH_LEDGER.md`; `npm run loop:quality -- --json`; `npm run loop:all -- --json`; `node scripts/audit-coverage-quality.mjs --all --json`; `node scripts/guard-content.mjs --baseline --dry-run --json`; `node scripts/guard-content.mjs --json`; `node scripts/audit-site-kpis.mjs --json`; `node scripts/guard-stale-facts.mjs --json`; `node --test tests/scripts/audit-coverage-quality.test.mjs`; `node --test tests/scripts/audit-coverage-gaps.test.mjs`; `node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/guard-content.test.mjs tests/scripts/guard-stale-facts.test.mjs tests/scripts/check-smart.test.mjs`; `npm run guard:challenge:check`; `npm run ledger:pages:check`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run build:fast`; `npm run qa:route -- --route /compare/decktopus-vs-gamma/ --route /compare/decktopus-vs-pitch/`; `npm run check:smart:run`.
- Residual risks: `audit-site-kpis` still flags `neuronwriter-vs-surfer-seo` below the 700-word comparison KPI threshold, but the quality loop is green because the page clears required comparison-quality rules. Historical archives still mention deleted routes as past work.
- Next: Run the next Decision Content cycle, currently `amazon-q-vs-github-copilot`, with current June 2026 source verification before editing.

### 2026-06-21: Freshness Metadata Scheduling

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added missing `next_review_at` values to 17 high-volatility fact records across nine touched tool pages, backfilled missing `price_history[*].verified_at` metadata on those same touched pages from each page's existing `last_verified`, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-21-freshness-metadata-scheduling.md`.
- Verification: `npm run loop:freshness -- --json`; `npm run loop:all -- --json`; `npm run ledger:pages:check -- --date 2026-06-21`; `node scripts/audit-provenance-pricing.mjs --json --changed-file <nine changed tool pages>`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run check:smart:run -- --path <nine changed tool pages> --path PAGE_REFRESH_LEDGER.md`.
- Residual risks: This was scheduling/provenance metadata only, not a fresh source re-verification pass. The broad loop review now has one remaining attention loop: Quality Pruning, with 62 existing all-comparison quality failures.
- Next: Start the Quality Pruning cleanup batch, especially raw Markdown tables and missing required comparison sections.

### 2026-06-21: AiPedia Multi-Loop System

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `.agent/LOOPS.md`, `src/data/aipedia-loops.json`, `scripts/aipedia-loops.mjs`, focused tests, npm aliases for all seven loops, and orientation docs in README, script docs, project map, operating rules, status, and plans. The loop runner supports registry output, read-only execution, loop selection, built-output skips, attention totals, JSON summaries, sample failures, and top queue excerpts.
- Verification: `node --test tests/scripts/aipedia-loops.test.mjs`; `npm run loop:system -- --json`; `npm run loop:all -- --json`; `npm run audit:commands`; `npm run loop:quality -- --json`; `npm run check:quick`.
- Residual risks: The loop system is working, but it exposes real site debt: Freshness reports 17 high-volatility facts missing `next_review_at`, and Quality Pruning reports 62 comparison-quality failures.
- Next: Run a Quality Pruning cleanup batch or schedule the missing high-volatility review dates, then rerun `npm run loop:all -- --json`.

### 2026-06-21: Activepieces Vs Zapier Loop Cycle And Selector Hardening

- Status: Complete and pushed.
- Commit: `b2fd03c5`.
- Branch: `master`.
- Changed: Added `src/content/comparisons/activepieces-vs-zapier.md`; refreshed Activepieces and Zapier current June 2026 facts where verified; expanded `src/data/comparison-policy.json` with explicit workflow-family lanes for broad categories; regenerated `src/data/coverage-backlog.json`; repaired post-cleanup guard and test fixtures through an accepted Guard Challenge; converted changed live comparison tables to mobile-safe stacked bullets; backfilled missing historical `price_history[*].verified_at` values on changed tool pages from each page's existing `last_verified`; added missing provenance metadata discovered by changed-file audits; fixed 360 px overflow on `/tools/pika/`; and recorded `.agent/loop-runs/2026-06-21-activepieces-vs-zapier.md`.
- Verification: `node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/guard-content.test.mjs tests/scripts/guard-stale-facts.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs`; `node --test tests/scripts/audit-coverage-gaps.test.mjs tests/scripts/decision-loop.test.mjs`; `npm run guard:challenge:check`; `npm run coverage:backlog`; `npm run coverage:next -- --json --count 20`; `npm run loop:next -- --json`; `node scripts/audit-provenance-pricing.mjs --json --changed-file <changed tool paths>`; `node scripts/audit-coverage-quality.mjs --changed-file <changed live comparison paths>`; `npm run build:fast`; `npm run qa:route -- --route /tools/pika/ --widths 360 --site-dir dist-fast/client`; `npm run loop:verify -- --date 2026-06-21 --slug activepieces-vs-zapier --route /compare/activepieces-vs-zapier/ --paths <changed paths> --json`.
- Residual risks: Five preexisting live comparison pages remain under the thin-content word threshold. Historical price-history provenance backfills record existing page verification dates and are not fresh fact refreshes. The full verifier passed but took about 8 minutes for the mixed content, guard, build, and route-QA cycle.
- Next: `npm run loop:next -- --json` selects `amazon-q-vs-github-copilot`; verify June 2026 Amazon Q Developer and GitHub Copilot facts before editing.

### 2026-06-21: Activepieces Vs n8n Loop Cycle

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/activepieces-vs-n8n.md`; refreshed Activepieces, n8n, AI Automation, Lindy buyer-path links, the automation buyer guide link surface, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and page refresh ledger rows; removed remaining public references to deleted cross-workflow comparison routes; removed `lovable-vs-bolt-vs-v0` from the legacy compare priority list; and updated KPI, stale-fact, and smart-check tests that still assumed the old false-vs comparison inventory and deleted comparison routes.
- Verification: `node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/guard-stale-facts.test.mjs`; `$env:AIPEDIA_LEDGER_DATE='2026-06-21'; npm run loop:verify -- --date 2026-06-21 --route /compare/activepieces-vs-n8n/ --path <changed paths>`.
- Residual risks: The full loop is reliable but still slow when script-test and runtime page paths are touched. This pass took about 267 seconds, with `check-smart --run` at 263.4 seconds, broad `smoke:visual` at 42.7 seconds, and exact combined route QA at 49.4 seconds.
- Next: `npm run loop:next -- --json` selects `activepieces-vs-zapier`, another same-category AI Automation comparison. Verify Zapier current facts before editing.

### 2026-06-21: Strict Same-Category Comparison Cleanup

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Deleted 179 comparison files, removed public links to those deleted routes, removed the adjacent-workflow allowlist from `src/data/comparison-policy.json`, added 127 blocked pairs for known same-category false-vs traps, hardened `coverage:backlog`, `coverage:next`, and `loop:next` so they select only same-primary-category pairs that are not blocked, regenerated `src/data/coverage-backlog.json` and `PAGE_REFRESH_LEDGER.md`, and rewrote the active `.agent` docs around the stricter policy. The Mistral AI and Poe tool/source refreshes remain, but `mistral-ai-vs-poe` is now blocked and deleted as a direct comparison page. Removed multi-tool pages such as `lindy-vs-zapier-vs-n8n` and `lovable-vs-bolt-vs-v0` should be rebuilt later only as focused two-tool direct-substitute pages.
- Verification: `npm run coverage:backlog`; `$env:AIPEDIA_LEDGER_DATE='2026-06-21'; npm run ledger:pages`; `npm run loop:next -- --json`; one-off inventory audit proving no cross-primary comparison files remain; `rg` over `src` and `PAGE_REFRESH_LEDGER.md` proving no public links to deleted routes remain; `node --test tests/scripts/audit-coverage-gaps.test.mjs tests/scripts/decision-loop.test.mjs tests/scripts/loop-hardening.test.mjs`; `node scripts/guard-em-dashes.mjs`.
- Residual risks: Historical archive docs still mention deleted routes as past work. Treat those as history only. A future content pass can remove or rewrite plain-text historical references in public category prose where they no longer add value.
- Next: Superseded by the Activepieces vs n8n loop cycle. Current next target is `activepieces-vs-zapier`.

### 2026-06-21: False-Vs Comparison Policy Cleanup

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Deleted five definite false-vs comparison pages, removed their visible internal links, added the first `src/data/comparison-policy.json`, changed coverage and loop tooling so false-vs candidates were not auto-selected, regenerated `src/data/coverage-backlog.json`, updated active loop docs, and moved Astro markdown plugins to `processor: unified(...)` so the build no longer emits the old markdown plugin deprecation warning. This entry is superseded by the stricter same-primary-category cleanup above.
- Verification: `node --test tests/scripts/loop-hardening.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/audit-coverage-gaps.test.mjs tests/scripts/decision-loop.test.mjs`; `npm run coverage:backlog`; `node scripts/decision-loop.mjs --json`; `$env:AIPEDIA_LEDGER_DATE='2026-06-21'; npm run build:fast`; `$env:AIPEDIA_LEDGER_DATE='2026-06-21'; npm run check:smart:run`.
- Residual risks: Superseded. Borderline historical cross-category comparison pages were later removed instead of allowed.
- Next: Superseded by the Activepieces vs n8n loop cycle. Current next target is `activepieces-vs-zapier`.

### 2026-06-21: Operator Surface Route QA Contract

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Moved exact parent-hub route QA targets and the content-only broad visual smoke replacement rule into `src/data/operator-surfaces.json`; updated `scripts/check-smart.mjs` to consume the contract instead of hardcoded route and path allowlists; added focused tests proving the contract exists and still preserves broad visual smoke when tooling or runtime paths are part of the change.
- Verification: `node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs tests/scripts/playwright-config.test.mjs`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `node scripts/check-smart.mjs --json --path src/content/comparisons/descript-vs-grok.md --path src/pages/compare/index.astro --path src/data/operator-surfaces.json`.
- Residual risks: The next performance bottleneck appears to be `build:fast`, which took 126.2 seconds in the latest full cycle. `descript-vs-grok` was later blocked by comparison policy as a false-vs secondary-overlap pair.
- Next: Superseded by the Activepieces vs n8n loop cycle. Current next target is `activepieces-vs-zapier`.

### 2026-06-20: DeepSeek Vs Replit Agent Loop Cycle

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/deepseek-vs-replit-agent.md`; refreshed DeepSeek, Replit Agent, AI Coding, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and page refresh ledger rows; added the `deepseek-v4-release-note` source registry row; added `.agent/loop-runs/2026-06-20-deepseek-vs-replit-agent.md`; confirmed the cycle used exact route QA instead of broad visual smoke for this content-only route set.
- Verification: `npm run audit:coverage-quality:changed`; `npm run audit:provenance:changed`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run loop:verify -- --date 2026-06-20 --route /compare/deepseek-vs-replit-agent/ --path <changed paths>`.
- Residual risks: Known Astro markdown plugin deprecation warning remains. The content-only broad-smoke replacement is reliable in tests, but the rule should move into `src/data/operator-surfaces.json` or another contract-level surface model so future agents do not have to infer it from script internals.
- Next: Superseded by comparison-policy cleanup; `descript-vs-grok` is blocked unless policy is deliberately changed.

### 2026-06-20: Content Route Smoke Replacement

- Status: Complete.
- Commit: `3803ddad fix: replace broad smoke for content route loops`.
- Branch: `master`.
- Changed: Updated `scripts/check-smart.mjs` so content-only rendered route cycles can replace broad `smoke:visual` with exact route QA; added parent hub route QA mapping for `/categories/`, `/compare/`, and `/tools/`; sorted route QA commands; exposed `broad_smoke_replaced_by_route_qa` in the smart-check plan; added focused tests.
- Verification: `node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs tests/scripts/playwright-config.test.mjs`; `node scripts/guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: The next cleanup should move the replacement rule out of hardcoded script allowlists and into an explicit operator-surface contract.
- Next: Validate the change in the next full loop cycle, which completed with `deepseek-vs-replit-agent`.

### 2026-06-20: DeepSeek Vs GitHub Copilot Loop Cycle And Route QA Hardening

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/deepseek-vs-github-copilot.md`; refreshed DeepSeek, GitHub Copilot, AI Coding, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and page refresh ledger rows; updated GitHub Copilot guidance for gradual signup reopening, Copilot app GA, AI Credits usage reporting, `AGENTS.md` code-review support, MAI-Code-1-Flash expansion, and Fable 5 suspension caveats; hardened Playwright reuse so browser checks use fresh `dist-fast/client`; made `check-smart --run` execute one combined route QA command for changed tool, category, and comparison routes; allowed local static QA to ignore the hosted reviews API miss; made `loop:verify` recognize combined smart route QA so it does not run a duplicate fallback route.
- Verification: `node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs tests/scripts/playwright-config.test.mjs`; `npm run audit:provenance:changed`; `npm run audit:coverage-quality:changed`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run loop:verify -- --date 2026-06-20 --route /compare/deepseek-vs-github-copilot/ --path <changed paths>`.
- Residual risks: The full verifier is safer but still slow. Final pass was about 251 seconds, with `check-smart --run` at 247.4 seconds, global `smoke:visual` at 47.0 seconds, and exact combined route QA for four routes at 26.1 seconds. Known Astro markdown plugin deprecation warning remains.
- Next: Run `deepseek-vs-replit-agent` as the next Decision Content Flywheel cluster. The next loop-performance opportunity is to split content-route QA from broad `smoke:visual` when no runtime template, layout, component, style, or config changed.

### 2026-06-20: Cursor Vs Grok Loop Cycle And Verifier Ordering Fix

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/cursor-vs-grok.md`; refreshed Cursor, Grok, AI Coding, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and page refresh ledger rows; corrected over-specific xAI Responses API retention wording after current docs proved the storage opt-out but not the old exact 30-day wording; added `.agent/loop-runs/2026-06-20-cursor-vs-grok.md`; updated `check-smart --run` so `build:fast` runs before `smoke:visual` and route QA, and each command prints a duration.
- Verification: `npm run audit:coverage-quality:changed`; `npm run audit:provenance:changed`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run loop:verify -- --date 2026-06-20 --route /compare/cursor-vs-grok/ --path <changed paths>`; `node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs`.
- Residual risks: Full loop verification still takes about 232 seconds, with `check-smart --run` taking 228.9 seconds and `build:fast` reporting about 2 minutes 24 seconds. Build still emits the known Astro markdown plugin deprecation warning.
- Next: Run `deepseek-vs-github-copilot` as the next Decision Content Flywheel cluster. Use the new `check-smart --run` per-command timings to decide whether content-only loops can split from broad script/build verification.

### 2026-06-20: Cursor Vs DeepSeek Loop Cycle And Verifier Env Fix

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/cursor-vs-deepseek.md`; refreshed Cursor, DeepSeek, AI Coding, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and page refresh ledger rows; corrected stale DeepSeek V4 open-weight wording; added `.agent/loop-runs/2026-06-20-cursor-vs-deepseek.md`; scoped `AIPEDIA_FAST_BUILD=1` in `loop:verify` and `check-smart --run` so unit-test fixtures do not inherit fast-build mode while build and route QA still use fast output.
- Verification: `node --test tests/scripts/check-dist-budget.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs`; `npm run audit:provenance:changed`; `npm run audit:coverage-quality:changed`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run loop:verify -- --date 2026-06-20 --route /compare/cursor-vs-deepseek/ --path <changed paths>`.
- Residual risks: Build still emits the known Astro markdown plugin deprecation warning. The verified loop took about 234 seconds, with the smart-verification block at 230.7 seconds and build-fast reporting about 2 minutes 23 seconds.
- Next: Run `cursor-vs-grok` as the next Decision Content Flywheel cluster, and consider reducing loop wall time by splitting content verification from broad script/build verification when only content paths changed.

### 2026-06-21: Decision Loop Review Fixes

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Fixed loop review findings by preserving comma-containing check text in `loop:record`, making changed comparison route QA executable through `check:smart:run`, preventing fallback `build:fast` for non-rendered loop verification, reducing duplicated loop checks, and adding per-command timing to `loop:verify`.
- Verification: `node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs`.
- Residual risks: `check:smart:run` now runs built route QA for changed comparison pages, so comparison content verification is more complete but still intentionally heavier than docs-only checks.
- Next: Run the next Decision Content Flywheel cycle for `cursor-vs-deepseek`, then review loop timings and reliability again.

### 2026-06-21: Decision Loop Verification Hardening

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `npm run loop:verify`, `npm run qa:route`, `npm run loop:record`, `.agent/loop-runs/` receipts, changed-route smart-check guidance, and raw Markdown table rejection for changed comparison pages. Updated the active loop spec, script docs, README, and `.agent` source-of-truth files.
- Verification: `node --test tests/scripts/decision-loop.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/audit-coverage-quality.test.mjs tests/scripts/loop-hardening.test.mjs`; `node scripts/qa-route.mjs --route /compare/claude-vs-replit-agent/ --widths 360 --site-dir dist-fast/client`; `npm run guard:challenge:check`; `npm run check:quick`; `git diff --check`.
- Residual risks: `qa:route` requires a built static output, normally from `npm run build:fast` or `npm run build`. It does not replace source verification or editorial judgment.
- Next: Run the next Decision Content Flywheel cycle, `cursor-vs-deepseek`, with `loop:verify` and `loop:record`.

### 2026-06-20: Claude Vs Replit Agent Loop Cycle

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/claude-vs-replit-agent.md`, refreshed Replit Agent, Claude related links, AI Coding, compare/tools/categories top-layer metadata, source registry, LLM surfaces, coverage backlog, and page refresh ledger rows. Corrected Replit App Testing wording to the current web-app-only scope and replaced mobile-hostile comparison tables with stacked decision bullets.
- Verification: `npm run test:scripts`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run ledger:pages`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run ledger:pages:check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run guard:check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run check:smart:run -- --path <changed paths>`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run build:fast`; `npm run audit:coverage-quality:changed`; `npm run audit:provenance:changed`; `npm run audit:facts`; `npm run audit:tool-quality -- --file src/content/tools/replit-agent.md`; `npm run audit:tool-quality -- --file src/content/tools/claude.md`; `npm run check:links`; Playwright route QA for `/compare/claude-vs-replit-agent/` at 360, 390, 430, 768, 1024, and 1366 px.
- Residual risks: Plain local ledger/build/guard commands still need `AIPEDIA_LEDGER_DATE=2026-06-20` during this date-bound run because the local shell clock is 2026-06-21. Build output still emits the known Astro markdown plugin deprecation warning. Local static route QA sees benign 404s for Vercel analytics scripts that are supplied by Vercel in hosted contexts.
- Next: Run the next Decision Content Flywheel cycle for `cursor-vs-deepseek`.

### 2026-06-20: Decision Loop QA Hardening

- Status: Complete and pushed.
- Commit: this commit.
- Branch: `master`.
- Changed: Hardened `npm run loop:next` so each brief includes stale-backlog warnings, source-registry inspection, related-surface discovery sweeps, and rendered route QA at 360, 390, 430, 768, 1024, and 1366 px. Updated the loop spec and `.agent` docs so desktop QA is recorded alongside mobile and tablet QA.
- Verification: `node --test tests/scripts/decision-loop.test.mjs`, `git diff --check`, em-dash sweep over touched docs/scripts, `npm run check:quick`.
- Residual risks: The route QA requirement is now in the brief and docs, but the command still does not automate browser screenshots by itself.
- Next: Run `claude-vs-replit-agent` with current sources and record route QA at every listed width.

### 2026-06-20: First Decision Content Loop Cycle, Canva Vs Claude

- Status: Complete and pushed.
- Commit: this commit.
- Branch: `master`.
- Changed: Added the `canva-vs-claude` comparison, refreshed Canva, Claude, Claude Code, Anthropic, AI design, AI coding, developer guide, Copilot alternatives, May Agent SDK news correction, source registry, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Corrected the stale Claude Agent SDK credit claim to match current Anthropic help guidance that the June 15 Agent SDK usage changes are paused.
- Verification: `npm run check:quick`, `npm run loop:next -- --json`, `npm run ledger:pages:check`, `npm run audit:coverage-quality:changed`, `npm run audit:provenance:changed`, `npm run audit:facts`, `npm run check:links`, `npm run check:smart:run -- --path <changed paths>` with `build:fast` completing in 2 minutes 13 seconds.
- Residual risks: Existing Astro markdown plugin deprecation warning remains. Public content dates use `2026-06-20` because repo guards use the US/UTC project date while the local New Zealand shell clock showed `2026-06-21`. Individual news articles remain excluded from `PAGE_REFRESH_LEDGER.md` by the ledger generator's current design.
- Next: Run the next loop target, `claude-vs-replit-agent`, with current June 2026 Claude and Replit Agent sources.

### 2026-06-21: Decision Content Loop

- Status: Complete and begun.
- Commit: this commit.
- Branch: `master`.
- Changed: Added the AiPedia decision content loop spec, `npm run loop:next`, tests, script docs, and agent operating guidance. The first loop cycle is selected as `canva-vs-claude` unless the coverage backlog changes or that page already exists.
- Verification: `npm run loop:next -- --json`, `node --test tests/scripts/decision-loop.test.mjs`, `git diff --check`, em-dash sweep over touched docs/scripts, `npm run check:quick`.
- Residual risks: The loop chooses and briefs clusters, but it intentionally does not automate live web research or editorial judgment. Content cycles still require current-source verification before facts are edited.
- Next: Run the first `canva-vs-claude` cycle with current June 2026 Canva and Claude sources, then update parent hubs and ledger rows.

### 2026-06-22: News Gap And Lantern Logo Hotfix

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Replaced the visible blue/cyan brand regression with the selected lantern logo, removed the old nav hue filter that recolored the logo blue, regenerated favicon and brand assets, deleted cyan brand PNGs, added June 18 through June 22 news coverage, regenerated news OG assets and the page refresh ledger, and recorded `.agent/loop-runs/2026-06-22-news-logo-hotfix.md`.
- Verification: `node scripts/guard-em-dashes.mjs`; `node scripts/audit-news-rendering.mjs`; `node scripts/audit-news-xrefs.mjs`; `node scripts/prep-favicons.mjs --check --json`; `node scripts/generate-og-news.mjs --check <June 18-22 slugs>`; `node scripts/generate-og-svgs.mjs --check --limit 20 --json`; `node scripts/generate-logo-manifest.mjs --check`; `node --test tests\scripts\prep-favicons.test.mjs tests\scripts\generate-og-news.test.mjs`; `node scripts\optimize-og-images.mjs --check --limit 20 --json`; `npm run ledger:pages:check`; `git diff --check`; `npm run build:fast`; `npm run qa:route -- --route / --widths 360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npm run qa:route -- --route /news/ --widths 360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npm run typecheck`; `npm run check:links`.
- Residual risks: None blocking. The lantern logo palette was later normalized by the Claude completion pass so visual smoke accepts both nav and favicon rasters.
- Next: Continue from the newest work-log entries for the final June 22 batch status.

### 2026-06-21: Build-Time Diagnosis And Next-Step Recommendation

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Measured local `build:fast` and full `build`, normalized the stale page refresh ledger, recorded the build bottlenecks, and added the recommended next product sprint to active project docs.
- Verification: `npm run ledger:pages:check`, `npm run build:fast` passed in 191.31 seconds, `npm run build` passed in 214.37 seconds, `git diff --check`, `npm run check:quick`.
- Residual risks: Full local build time is still about 3.5 minutes. Astro markdown plugin deprecation warnings remain. Pagefind output is near the 10 MB budget, and large search/archive payloads are likely worth future trimming.
- Next: Start the focused `canva-vs-claude` comparison sprint, or do a small build-performance pass that adds phase timing and trims Pagefind/search payload growth.

### 2026-06-22: CodeRabbit, Cody, Comet, D-ID, Hedra Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `master`.
- Changed: Refreshed CodeRabbit, Cody, Comet, D-ID, and Hedra against current June 22 primary sources, updated affected AI Coding, AI Search, AI Video, AI Voice, code review, and avatar video surfaces, refreshed relevant source registry checks, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-22-coderabbit-cody-comet-d-id-hedra-batch.md`.
- Verification: `npm run tool:refresh:batch:check -- --file src\content\tools\coderabbit.md --file src\content\tools\cody.md --file src\content\tools\comet.md --file src\content\tools\d-id.md --file src\content\tools\hedra.md --json`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/coderabbit/ --route /categories/ai-coding/ --route /tools/cody/ --route /tools/comet/ --route /categories/ai-search/ --route /tools/d-id/ --route /categories/ai-video/ --route /tools/hedra/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `node scripts\guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: Full freshness is still incomplete across the whole tool inventory. Continue the active `/goal` with Mastra, Microsoft Agent Framework, Midjourney, NotebookLM, and Qodo.
- Next: Push this batch, then start the next oldest-first five-tool batch.

### 2026-06-22: Mastra, Microsoft Agent Framework, Midjourney, NotebookLM, Qodo Batch

- Status: Complete and verified.
- Commit: this commit.
- Branch: `master`.
- Changed: Refreshed Mastra, Microsoft Agent Framework, Midjourney, NotebookLM, and Qodo against current June 22 primary sources; updated AI Coding, AI Automation, AI Image, AI Notes, the code-review guide, source registry rows, and `PAGE_REFRESH_LEDGER.md`.
- Verification: `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --file src\content\tools\mastra.md --file src\content\tools\microsoft-agent-framework.md --file src\content\tools\midjourney.md --file src\content\tools\notebooklm.md --file src\content\tools\qodo.md --json`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/mastra/ --route /categories/ai-coding/ --route /tools/microsoft-agent-framework/ --route /categories/ai-automation/ --route /tools/midjourney/ --route /categories/ai-image/ --route /tools/notebooklm/ --route /categories/ai-notes/ --route /tools/qodo/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: Full freshness is still incomplete across the whole tool inventory.
- Next: Rerun `npm run tool:refresh:batch -- --limit 5 --json` for the next oldest-first batch.

### 2026-06-21: Vercel CLI Install And Warning Classification

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Recorded that global `vercel@54.14.2` is installed and classified the npm deprecation warnings as upstream Vercel CLI transitive dependency warnings, not AiPedia repo dependency drift.
- Verification: `vercel --version`, `npm ls -g vercel stream-to-promise tar --depth=6`, `npm view vercel@latest version dependencies.@vercel/fun dependencies.@vercel/backends --json`, `git diff --check`, `npm run check:quick`.
- Residual risks: Vercel CLI currently pins `@vercel/fun@1.3.0`, which pulls `stream-to-promise@2.2.0` and `tar@7.5.7`; `tar@7.5.7` also appears through `@vercel/backends -> @vercel/nft -> @mapbox/node-pre-gyp`. Wait for a Vercel CLI release that bumps those transitive dependencies rather than hand-editing global `node_modules`.
- Next: Use `vercel` for local Vercel workflows after login/linking. Periodically rerun `npm i -g vercel@latest` and verify whether the warnings disappear.

### 2026-06-20: Continuity System Hardening

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added the work log, clarified the source-of-truth stack, and made status recording a required closeout step for future agents.
- Verification: `git diff --check`, `npm run check:quick`.
- Residual risks: Work-log entries are human-maintained and should be checked against Git history when exact file-level proof matters.
- Next: Future major work should update `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and this file before final report.

### 2026-06-20: Project Status Handoff

- Status: Complete and pushed.
- Commit: `ab0502cb docs: update project status handoff`.
- Branch: `master`.
- Changed: Added `.agent/CURRENT_STATUS.md`, trimmed `.agent/PLANS.md`, updated orientation docs, archived completed-plan summaries, and marked the June standards remediation spec complete.
- Verification: `git diff --check`, `npm run check:quick`.
- Residual risks: Local ignored Superpowers docs may still contain historical checklist wording. The committed `.agent/` docs are canonical.
- Next: Use `.agent/CURRENT_STATUS.md` as the first file in future sessions.

### 2026-06-20: June Standards Remediation

- Status: Complete and pushed.
- Commit: `3355ce1d fix: remediate June standards review`.
- Branch: `master`.
- Changed: Closed June standards findings across Semrush duplication, affiliate gating, disclosure proximity, mobile first-screen law, link coverage, source/provenance row freshness, changed-page quality gating, Node/build/CI alignment, Pagefind/dist checks, lint/typecheck gates, top-layer/LLM coverage, nav semantics, and commercial CTA audit coverage.
- Verification: `npm run check:ci` passed twice, plus focused provenance, coverage, ledger, commercial CTA, command, and diff checks.
- Residual risks: GitHub stats used stale cached fallback data during `npm run check:ci` because the GitHub API returned a 403 rate-limit response. Existing Astro markdown plugin deprecation warnings remain.
- Next: Continue current active lanes rather than restarting the remediation spec.

### 2026-06-20: Ops Efficiency Tooling

- Status: Complete and pushed.
- Commit: `af00cf70 feat: add ops efficiency tooling`.
- Branch: `master`.
- Changed: Added `npm run ops:dashboard`, expanded `check-smart`, improved operator docs, and added tests for the new dashboard and verification-routing behavior.
- Verification: Covered by script tests and later `npm run check:ci` during standards remediation.
- Residual risks: Vercel CLI was not installed at the time of this commit. It is now installed globally as recorded in the 2026-06-21 work-log entry.
- Next: Use `npm run ops:dashboard` for read-only branch, worktree, PR, issue, and audit summaries.

### 2026-06-20: Guard Challenge Workflow

- Status: Complete and pushed.
- Commit: `cd6ff483 Merge pull request #43 from mustbearnold/codex/guard-challenge-workflow`.
- Branch: `master`.
- Changed: Added `.agent/guard-challenges/README.md`, `scripts/guard-challenge.mjs`, tests, command-surface invariants, and `check-smart` routing for guard/audit/check edits.
- Verification: Guard challenge tests, command-surface tests, `npm run guard:challenge:check`, `npm run test:scripts`, `npm run audit:commands`, and later CI gates.
- Residual risks: The workflow is intentionally procedural. It does not automate subagent debate.
- Next: Use it only when a guard, audit, check, or fixture may need to change.

### 2026-06-17: Folder Tidy And June 17 News Catch-Up

- Status: Complete and pushed.
- Commit: `1c109370 chore: tidy repo and refresh June 17 coverage`.
- Branch: `master`.
- Changed: Archived old agent plans, cleaned active `.agent/` surfaces, added June 17 news desk and focused stories, and updated news/ledger/crawl surfaces.
- Verification: Covered by the associated branch checks and later remediation CI.
- Residual risks: Historical archived entries are intentionally long. Do not load the archive by default.
- Next: Keep `.agent/PLANS.md` short and current.

### 2026-06-22: Augment, Base44, BLACKBOX, Captions, Cline Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `master`.
- Changed: Cleaned active `.agent` handoff docs, refreshed Augment Code, Base44, BLACKBOX AI, Captions.ai, and Cline against current June 22 sources, updated AI Coding, AI Design, and AI Video hubs, added Base44 cost-guide provenance, normalized historical price-history `verified_at` fields, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-22-augment-base44-blackbox-captions-cline-batch.md`.
- Verification: `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --file src\content\tools\augment-code.md --file src\content\tools\base44.md --file src\content\tools\blackbox-ai.md --file src\content\tools\captions.md --file src\content\tools\cline.md --json`; `npm run build:fast`; `npm run typecheck`; `npm run qa:route -- --route /tools/augment-code/ --route /categories/ai-coding/ --route /tools/base44/ --route /categories/ai-design/ --route /tools/blackbox-ai/ --route /tools/captions/ --route /categories/ai-video/ --route /tools/cline/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `node scripts\guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: `typecheck` and `build:fast` passed only when run sequentially. Running them in parallel caused an Astro `node_modules/.astro/data-store.json` rename race, so the loop docs now warn against parallelizing those two commands.
- Next: Continue the oldest-first batch with CodeRabbit, Cody, Comet, D-ID, and Hedra.

### 2026-06-22: Grok, Cursor, Lindy, n8n, Mistral AI Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `master`.
- Changed: Refreshed Grok, Cursor, Lindy, n8n, and Mistral AI against current June 22 sources, updated AI Chatbots, AI Coding, and AI Automation parent hubs, refreshed source-registry rows, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-22-grok-cursor-lindy-n8n-mistral-ai-batch.md`.
- Verification: `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --file src\content\tools\grok.md --file src\content\tools\cursor.md --file src\content\tools\lindy.md --file src\content\tools\n8n.md --file src\content\tools\mistral-ai.md --json`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/grok/ --route /categories/ai-chatbots/ --route /tools/cursor/ --route /categories/ai-coding/ --route /tools/lindy/ --route /categories/ai-automation/ --route /tools/n8n/ --route /tools/mistral-ai/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npm run ledger:pages:check`; `git diff --check`.
- Residual risks: The goal remains active because the next freshness batch is already queued. Continue current-source checks before editing Argil, Canva, Replit Agent, Claude, and Gemini.
- Next: Continue the oldest-first batch with Argil, Canva, Replit Agent, Claude, and Gemini.

### 2026-06-22: Argil, Canva, Replit Agent, Claude, Gemini Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `master`.
- Changed: Refreshed Argil, Canva, Replit Agent, Claude, and Gemini against current June 22 sources, updated AI Video, AI Design, AI Coding, and AI Chatbots parent hubs, refreshed source-registry rows, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-22-argil-canva-replit-agent-claude-gemini-batch.md`.
- Verification: `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --file src\content\tools\argil.md --file src\content\tools\canva.md --file src\content\tools\replit-agent.md --file src\content\tools\claude.md --file src\content\tools\gemini.md`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/argil/ --route /categories/ai-video/ --route /tools/canva/ --route /categories/ai-design/ --route /tools/replit-agent/ --route /categories/ai-coding/ --route /tools/claude/ --route /categories/ai-chatbots/ --route /tools/gemini/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: The goal remains active. The next planner queue is due-soon rather than due-now, and starts with Claude, Gemini, Grok, n8n, and Claude Code because short review windows and comparison mentions keep them high priority.
- Next: Continue the batched freshness loop until every tracked tool page has been refreshed.

### 2026-06-23: Daily Model, Homepage, And News Cadence

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `master`.
- Changed: Rebuilt `/trends/model-availability-churn/` as a simple daily availability ledger for frontier and widely used models, set the trend record to `update_frequency: daily`, marked homepage and `/news/` route metadata as daily-refresh surfaces, added hidden `UpdateFrequency` metadata to homepage and news, updated `/trends/`, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`, and created Codex app automation `daily-aipedia-news-and-model-availability-refresh`.
- Verification: `npm run ledger:pages`; `npm run ledger:pages:check`; `node scripts/guard-em-dashes.mjs`; `node scripts/audit-news-rendering.mjs`; `git diff --check`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /trends/model-availability-churn/ --route /trends/ --route / --route /news/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: This pass did not add three June 23 news stories immediately; the new daily automation is what enforces that recurring news-production requirement.
- Next: Resume the active tool-page freshness goal after the user-facing page-policy interruption.

### 2026-06-23: Claude, Decktopus, Gemini, Grok, n8n Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `master`.
- Changed: Refreshed Claude, Decktopus, Gemini, Grok, and n8n against current June 2026 sources, updated AI Chatbots, AI Presentation, and AI Automation parent hubs, refreshed source-registry rows, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-23-claude-decktopus-gemini-grok-n8n-batch.md`.
- Verification: `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --file src\content\tools\claude.md --file src\content\tools\decktopus.md --file src\content\tools\gemini.md --file src\content\tools\grok.md --file src\content\tools\n8n.md`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/claude/ --route /categories/ai-chatbots/ --route /tools/decktopus/ --route /categories/ai-presentation/ --route /tools/gemini/ --route /tools/grok/ --route /tools/n8n/ --route /categories/ai-automation/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: The goal remains active. The next planner queue is due-soon rather than due-now, and starts with Claude Code, GitHub Copilot, Grammarly, Mistral AI, and Qwen.
- Next: Continue the batched freshness loop until every tracked tool page has been refreshed.

### 2026-06-23: Claude Code, GitHub Copilot, Grammarly, Mistral AI, Qwen Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `master`.
- Changed: Refreshed Claude Code, GitHub Copilot, Grammarly, Mistral AI, and Qwen against current June 2026 sources, updated AI Coding, AI Writing, and AI Chatbots parent hubs, refreshed source-registry rows, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-23-claude-code-github-copilot-grammarly-mistral-ai-qwen-batch.md`.
- Verification: `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --file src\content\tools\claude-code.md --file src\content\tools\github-copilot.md --file src\content\tools\grammarly.md --file src\content\tools\mistral-ai.md --file src\content\tools\qwen.md`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/claude-code/ --route /categories/ai-coding/ --route /tools/github-copilot/ --route /tools/grammarly/ --route /categories/ai-writing/ --route /tools/mistral-ai/ --route /categories/ai-chatbots/ --route /tools/qwen/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: The goal remains active. The next planner queue is due-soon rather than due-now, and starts with Capacities, Consensus, Cursor, Hailuo, and HeyGen.
- Next: Continue the batched freshness loop until every tracked tool page has been refreshed.

### 2026-06-23: MiniMax Speech, Modal, Morphic, Mubert, Murf Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `master`.
- Changed: Refreshed MiniMax Speech, Modal, Morphic, Mubert, and Murf against current June 23 sources; updated AI Voice, AI Infrastructure, AI Coding, AI Automation, AI Search, AI Chatbots, AI Music, Best AI Voice Generator for YouTube, Best AI Music Generator, and Suno Alternatives surfaces; refreshed source-registry rows; regenerated `PAGE_REFRESH_LEDGER.md`; and recorded `.agent/loop-runs/2026-06-23-minimax-speech-modal-morphic-mubert-murf-batch.md`.
- Verification: `npm run tool:refresh:batch:check -- --file src\content\tools\minimax-speech.md --file src\content\tools\modal.md --file src\content\tools\morphic.md --file src\content\tools\mubert.md --file src\content\tools\murf.md`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/minimax-speech/ --route /tools/modal/ --route /tools/morphic/ --route /tools/mubert/ --route /tools/murf/ --route /categories/ai-voice/ --route /categories/ai-infrastructure/ --route /categories/ai-coding/ --route /categories/ai-automation/ --route /categories/ai-search/ --route /categories/ai-chatbots/ --route /categories/ai-music/ --route /guides/best-ai-voice-youtube/ --route /guides/best-ai-music-generator/ --route /guides/suno-alternatives/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: 127 tracked tool pages remain below the June 23 refresh date. Mubert exact self-serve prices still need live flow confirmation before procurement, as documented in content.
- Next: Continue with NanoChat, Napkin AI, NeuronWriter, NightCafe, and Notion AI.

### 2026-06-24: Jun 23-24 Focused AI News Coverage

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Added five individual source-backed news articles for Jun 23-24 coverage without adding a daily desk page: OpenAI Daybreak/Codex Security, Samsung ChatGPT Enterprise and Codex, Claude reliability incidents, GLM-5.2 open-model pressure, and Google AI talent movement. Updated `/news/`, homepage, RSS, LLM surfaces, generated news OG assets, and regenerated `PAGE_REFRESH_LEDGER.md`.
- Verification: `node scripts\guard-em-dashes.mjs`; `npm run ledger:pages:check`; `npm run check:news`; `node scripts\audit-news-rendering.mjs --json`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /news/ --route / --route /news/2026-06-23-openai-daybreak-codex-security/ --route /news/2026-06-23-samsung-chatgpt-codex-enterprise/ --route /news/2026-06-23-claude-error-rate-fallback-planning/ --route /news/2026-06-24-zai-glm-52-open-model-pressure/ --route /news/2026-06-24-google-ai-talent-openai-anthropic/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: GLM-5.2 coverage relies on named reporting rather than a directly opened Z.ai primary release page because current search did not surface a stable official announcement page. The article avoids unsupported benchmark claims and frames it as market pressure.
- Next: Resume NanoChat, Napkin AI, NeuronWriter, NightCafe, and Notion AI freshness unless a newer user request supersedes it.

### 2026-06-24: Shared Tool Page Decision Spine

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Migrated the shared tool detail template to the new default flow: hero, decision card, plan guidance, fit, recent changes, alternatives, related comparisons, collapsed proof/score math, and collapsed full review notes. Hid reader reviews unless approved reviews exist, normalized older source-registry rows required by script tests, contained `/search/` quick chips on mobile, updated homepage smoke expectations for value labels, and made top-layer card outlines neutral by default.
- Verification: `npm run ledger:pages`; `npm run typecheck`; `npm run test:scripts`; `npm run build:fast`; `npm run smoke:visual`; `npm run qa:route -- --route /tools/chatgpt/ --route /tools/claude/ --route /tools/cursor/ --route /tools/midjourney/ --route /tools/notion-ai/ --route /tools/watsonx-orchestrate/ --route /tools/ --route /compare/ --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `node scripts\guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: `/search/` is intentionally noindex, so it should not be included in `qa:route`; broad smoke covers its mobile overflow instead. The in-app browser screenshot capture timed out, but DOM, overflow, desktop, and drawer-state checks passed against `http://127.0.0.1:4325/tools/chatgpt/`.
- Next: Keep refreshing tool content through the new layout, starting with NanoChat, Napkin AI, NeuronWriter, NightCafe, and Notion AI unless superseded.

### 2026-06-24: NanoChat, Napkin AI, NeuronWriter, NightCafe, Notion AI Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Refreshed NanoChat, Napkin AI, NeuronWriter, NightCafe, and Notion AI against current June 2026 sources, updated AI Research, AI Presentation, AI Design, AI SEO, AI Image, and AI Notes parent hubs, refreshed source-registry rows, regenerated `PAGE_REFRESH_LEDGER.md`, updated `.agent/CURRENT_STATUS.md` and `.agent/PLANS.md`, and recorded `.agent/loop-runs/2026-06-24-nanochat-napkin-neuronwriter-nightcafe-notion-batch.md`.
- Verification: `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --file src\content\tools\nanochat.md --file src\content\tools\napkin-ai.md --file src\content\tools\neuronwriter.md --file src\content\tools\nightcafe.md --file src\content\tools\notion-ai.md`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/nanochat/ --route /tools/napkin-ai/ --route /tools/neuronwriter/ --route /tools/nightcafe/ --route /tools/notion-ai/ --route /categories/ai-research/ --route /categories/ai-presentation/ --route /categories/ai-design/ --route /categories/ai-seo/ --route /categories/ai-image/ --route /categories/ai-notes/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Failed then fixed: First `tool:refresh:batch:check` failed because Napkin AI, NightCafe, and Notion AI price-history rows were missing `verified_at`; added them and reran successfully.
- Residual risks: NightCafe official pricing and model pages were blocked by Cloudflare during non-interactive verification, so the page avoids exact live plan-gate claims and points buyers to confirm in checkout.
- Next: Continue with Consensus, Beehiiv, BLACKBOX AI, Browserbase, and Canva.

### 2026-06-24: Tool Refresh Workflow Timing Pass

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Profiled the current tool-refresh closeout workflow from the live batch, added per-stage timing output to `scripts/build-fast.mjs`, added local-server and concurrency modes to `scripts/qa-route.mjs`, added focused tests, and updated `.agent/LOOPS.md`, `.agent/OPERATING_RULES.md`, `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `scripts/README.md` so future refresh work pays for one whole-site build per batch instead of one build per tool.
- Measured bottlenecks: `build:fast` was the slowest gate at about 166.9 seconds end to end, with about 2m 38s inside Astro and about 2m 13s in static route prerender. The built-output audits after Astro were small: indexability under 1 second, CTA audit about 2 seconds, and budget check under 1 second. `typecheck` took about 31.2 seconds when run alone, and `tool:refresh:batch:check` took about 11.8 seconds.
- Route QA optimization: the 12-route by 5-width matrix took about 65 seconds serially against the local dev server, then about 18.9 seconds with `--concurrency 4`. The same matrix against `dist-fast/client` also passed in about 18.9 seconds with `--concurrency 4`.
- Failed then explained: Running `typecheck` and `build:fast` in parallel produced an Astro content-store `ENOENT rename` race under `node_modules/.astro/data-store.json`. Rerunning `typecheck` alone passed, so the workflow rule is sequential Astro commands.
- Verification: `npm run build:fast`; `node --test tests\scripts\build-fast.test.mjs tests\scripts\qa-route.test.mjs`; `node scripts\guard-em-dashes.mjs`; `node scripts\qa-route.mjs --base-url http://127.0.0.1:4325 --route /tools/consensus/ --route /categories/ai-research/ --route /tools/beehiiv/ --route /categories/ai-writing/ --route /tools/blackbox-ai/ --route /categories/ai-coding/ --route /tools/browserbase/ --route /categories/ai-automation/ --route /tools/canva/ --route /categories/ai-design/ --route /tools/ --route /categories/ --widths 319,390,430,768,1024`; `node scripts\qa-route.mjs --base-url http://127.0.0.1:4325 --concurrency 4 --route /tools/consensus/ --route /categories/ai-research/ --route /tools/beehiiv/ --route /categories/ai-writing/ --route /tools/blackbox-ai/ --route /categories/ai-coding/ --route /tools/browserbase/ --route /categories/ai-automation/ --route /tools/canva/ --route /categories/ai-design/ --route /tools/ --route /categories/ --widths 319,390,430,768,1024`; `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 4 --route /tools/consensus/ --route /categories/ai-research/ --route /tools/beehiiv/ --route /categories/ai-writing/ --route /tools/blackbox-ai/ --route /categories/ai-coding/ --route /tools/browserbase/ --route /categories/ai-automation/ --route /tools/canva/ --route /categories/ai-design/ --route /tools/ --route /categories/ --widths 319,390,430,768,1024`; `npm run audit:commands`; `git diff --check`.
- Residual risks: `build:fast` is still a whole-site Astro prerender and remains the main fixed closeout cost. The next deeper win would require route-scoped build output or reducing the number of generated routes checked in local loops, both of which need more design care.
- Next: Continue the batched freshness loop with fast content gates, optional dev-server route QA using `--base-url --concurrency 4`, then one final sequential `typecheck`, `build:fast`, and built-output route QA using `--concurrency 4`.

### 2026-06-24: Tool Refresh Workflow Optimization Pass

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Made grouped refreshes the planner default, added guarded worker and integrator briefs, taught the batch checker to consume saved planner JSON, added production-only content collection caching for hot global and page paths, and documented the modern refresh loop in README, script docs, `.agent/LOOPS.md`, `.agent/OPERATING_RULES.md`, `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `.agent/loop-runs/2026-06-24-tool-refresh-workflow-timing.md`. This was later expanded from the original 10-tool fanout to six 10-tool shards.
- Measured result: `build:fast` dropped from about 166.9 seconds before optimization to about 65 seconds end to end. Astro static prerender dropped from about 2m 13s to about 37 seconds. `typecheck` is about 25 seconds, and representative route QA is about 11-19 seconds with `--concurrency 4` depending on route count.
- Parallel rule: Ten subagents are useful only when each worker edits exactly one `src/content/tools/<slug>.md` file and returns source, parent-hub, route, and risk notes. The main integrator owns `src/data/source-registry.json`, parent hubs, ledgers, top-layer pages, `.agent` docs, and the expensive closeout gates.
- Verification: `node --test tests\scripts\build-performance.test.mjs tests\scripts\loop-hardening.test.mjs tests\scripts\qa-route.test.mjs tests\scripts\tool-refresh-batch.test.mjs`; `node --check scripts\tool-refresh-batch-check.mjs`; `node --check scripts\tool-refresh-batch.mjs`; `node --check scripts\loop-verify.mjs`; `npm run typecheck`; `npm run build:fast`; `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 4 --route / --route /tools/chatgpt/ --route /news/2026-06-23-openai-daybreak-codex-security/ --route /categories/ai-research/ --route /compare/chatgpt-vs-claude/ --route /dead/bing-chat/ --route /tools/ --route /categories/ --widths 319,390,768,1024`.
- Residual risks: The optimized closeout is much faster, but it is still whole-site validation and should be paid once per integrated batch.
- Next: Use the six-shard-worker plan shape unless the user asks for a smaller batch.

### 2026-06-24: AiPedia Tool Refresh Workflow Skill

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Packaged the optimized refresh process as local skill `$aipedia-tool-refresh-workflow` under `.agents/skills/aipedia-tool-refresh-workflow/`, with a lean `SKILL.md`, UI metadata, and `references/tool-refresh-batch.md` for the detailed worker/integrator checklist. Updated `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `.agent/LOOPS.md` to treat the skill as the incubating playbook before loop-registry promotion.
- Verification: `python C:\Users\mustb\.codex\skills\.system\skill-creator\scripts\quick_validate.py .agents\skills\aipedia-tool-refresh-workflow`; placeholder and em-dash sweeps on the new skill and updated workflow docs; `git diff --check`.
- Residual risks: `.agents/` is intentionally gitignored local skill state, so this is available in this workspace but not committed unless the repo policy changes or the skill moves to a committed location.
- Next: Use the skill on the next six-shard-worker batch, patch the skill after any friction, and promote only the stable final shape into `src/data/aipedia-loops.json`.

### 2026-06-24: Consensus, Beehiiv, BLACKBOX AI, Browserbase, Canva, Captions, Castmagic, Cline, CloudTalk, CodeRabbit Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Refreshed Consensus, Beehiiv, BLACKBOX AI, Browserbase, Canva, Captions, Castmagic, Cline, CloudTalk, and CodeRabbit against current June 2026 sources. Updated AI Research, AI Writing, AI Coding, AI Automation, AI Design, AI Image, AI Presentation, and AI Video parent hubs, refreshed source-registry rows, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-24-consensus-beehiiv-blackbox-browserbase-canva-captions-castmagic-cline-cloudtalk-coderabbit-batch.md`.
- Workflow adaptation: The Codex Windows app hit an active-agent ceiling after six workers. Six tools were completed by workers and four were completed in the main thread. The planner, local skill, loop docs, and operating docs were first adapted to six-worker waves, then expanded to six shard workers with up to 10 tools each.
- Verification: `node --check scripts\tool-refresh-batch.mjs`; `node --test tests\scripts\build-performance.test.mjs`; `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/consensus/ --route /categories/ai-research/ --route /tools/beehiiv/ --route /categories/ai-writing/ --route /tools/blackbox-ai/ --route /categories/ai-coding/ --route /tools/browserbase/ --route /categories/ai-automation/ --route /tools/canva/ --route /categories/ai-design/ --route /tools/captions/ --route /categories/ai-video/ --route /tools/castmagic/ --route /tools/cline/ --route /tools/cloudtalk/ --route /tools/coderabbit/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client --concurrency 4`.
- Failed then adapted: Initial spawns for Castmagic, Cline, CloudTalk, and CodeRabbit failed with `agent thread limit reached`; the batch continued in-thread and the workflow was adapted to wave-limited fanout.
- Residual risks: The planner can still surface same-day refreshed high-volatility pages because their short review windows keep them near due. Skip same-day repeats or tune the planner before the next large run.
- Next: Regenerate the next batch with `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`; the next not-refreshed page observed behind this batch was Cody.

### 2026-06-24: Six Shard Worker Tool Refresh Workflow

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Expanded the tool-refresh planner and local workflow from one worker per tool to six parallel shard workers with up to 10 tool files each. Updated `scripts/tool-refresh-batch.mjs`, focused tests, README, script docs, `.agent` operating docs, the local `$aipedia-tool-refresh-workflow` skill, and normalized `nightcafe-softwareadvice-pricing` to source type `third_party`.
- Verification: `node --check scripts\tool-refresh-batch.mjs`; `node --test tests\scripts\build-performance.test.mjs tests\scripts\tool-refresh-batch.test.mjs`; planner smoke showed `batch=60`, `workers=6`, `tools_per_worker=10`; `npm run check:quick`.
- Failed then fixed: First `npm run check:quick` failed because `nightcafe-softwareadvice-pricing` used invalid source type `directory`; changed it to `third_party` and reran successfully.
- Residual risks: A 60-tool batch will increase integration review and route-QA scope. Keep shared files integrator-owned and use the saved planner JSON for the grouped batch check.
- Next: Generate the next plan with `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`.

### 2026-06-24: Six-Shard 60-Tool Baseline Run

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Ran the new six-shard `$aipedia-tool-refresh-workflow` on 60 tools from Cody through Lovart; integrated source-registry updates, same-day planner exclusion, affected category hubs, `PAGE_REFRESH_LEDGER.md`, the Claude Agent SDK billing correction article, workflow timing docs, and `.agent/loop-runs/2026-06-24-60-tool-refresh-baseline.md`.
- Timing: 36m 55s from `.tmp-tool-refresh-run-start.txt` through the main route QA, and 41m 31s including documentation, supplemental route QA, and final sanity checks. Core timing was 25m 07s worker collection and 11m 48s integration plus verification. Closeout gates: ledger 2s, batch check 37s, typecheck 32s, check:quick 22s, build:fast 64s, main route QA 107s for 80 routes across five widths, supplemental route QA 4s for two edited routes missed by the main matrix.
- Verification: `node --check scripts\tool-refresh-batch.mjs`; `node --test tests\scripts\build-performance.test.mjs`; `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`; `npm run typecheck`; `npm run check:quick`; `npm run build:fast`; `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 4 --widths 319,390,430,768,1024` across 80 routes; supplemental `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 4 --route /categories/ai-infrastructure/ --route /news/2026-05-14-anthropic-claude-agent-sdk-credit-split/ --widths 319,390,430,768,1024`.
- Residual risks: Dynamic account or checkout-dependent facts remain caveated in content, especially Claude Fable/Mythos account routes, Udio exports/API/commercial terms, Pika pricing, Lovable checkout prices, Mubert custom/API/one-track license pricing, Seedance route economics, and Synthesia add-ons.
- Next: Stop for tonight as requested. Future runs should regenerate the plan and use the same six 10-tool shard shape unless the measured app concurrency limit changes.

### 2026-06-25: News Push, Planner Recent-Refresh Exclusion, and Source Health Cleanup

- Status: Complete locally, verified, pushed through the news commit; workflow/source cleanup pending commit.
- Commit: news push `67a2815b` on `master`.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Added and pushed four source-backed Jun 24-25 news stories, updated Gemini and GitHub Copilot tool breadcrumbs, generated news OG assets, and refreshed `/news/` plus the ledger. After the push, updated `scripts/tool-refresh-batch.mjs` so the default planner skips pages verified since yesterday, added focused tests, added the missing `next_review_at` for Consensus `deep_search_update`, replaced dead source URLs for MiniMax Speech T2A docs and Instantly Lead Finder, refreshed affected source-registry rows, and regenerated `PAGE_REFRESH_LEDGER.md`.
- Planner result: `.tmp-tool-refresh-batch.json` now starts with Luma, Magnific, Meshy, MiniMax Speech, OpusClip, Pinecone, PixVerse, Playground AI, Qdrant, Reclaim AI, Relevance AI, and Retell AI instead of immediately reselecting yesterday's June 24 batch.
- Source-health result: scoped live audit selected 170 sources for the next batch; 158 returned HTTP OK, 12 were unreachable, and 0 had content-hash changes. Clear 404s for `minimax-speech-t2a` and `instantly-leads` were fixed and live-checked. Remaining unreachable sources are access-sensitive 403 or timeout cases to handle inside the next editorial batch.
- Verification: `node scripts/guard-em-dashes.mjs`; `npm run check:news`; `node scripts/audit-news-rendering.mjs --json`; `npm run audit:provenance:changed -- --json`; `npm run typecheck`; `npm run build:fast`; news route QA across `/`, `/news/`, four new news articles, Gemini, and GitHub Copilot; `npm exec --yes --package=node@24 -- node --test tests/scripts/tool-refresh-batch.test.mjs`; `node --check scripts/tool-refresh-batch.mjs`; `npm run ledger:pages:check`; `npm run --silent loop:freshness -- --json`; `npm run --silent audit:sources -- --json --live --limit 0 --source-id minimax-speech-t2a --source-id instantly-leads`; final route QA across Consensus, MiniMax Speech, Instantly, affected parent categories, `/tools/`, and `/categories/`.
- Failed then fixed: Default `npm run check:quick` still fails under Node 22 for the existing TypeScript import behavior in `tests/scripts/tool-page-model-behavior.test.mjs`; targeted Node 24 test invocation passed. The first non-live source-health JSON parse failed because npm's banner was redirected into the file; reran with `npm run --silent`.
- Residual risks: Full 60-tool editorial refresh has not been run in this post-news pass because the planner showed 0 due-now tools and subagent fanout was not explicitly authorized in this session. Continue the regenerated Luma-first batch with `$aipedia-tool-refresh-workflow`.

### 2026-06-25: Luma, Magnific, Meshy, and OpusClip Serial Tool Shard

- Status: Complete, verified, and pushed on `codex/refresh-tool-pages-june-23`.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Refreshed Luma, Magnific, Meshy, and OpusClip against current June 2026 primary sources. Updated AI Video, AI Image, AI Design, and AI Writing parent hubs, refreshed source-registry `last_checked` rows, regenerated `PAGE_REFRESH_LEDGER.md`, and regenerated `.tmp-tool-refresh-batch.json`.
- Buyer-impact notes: Meshy now shows the current individual ladder with Pro $20/month, Premium $40/month, Ultra $100/month, and Studio $60/seat/month with a 2-seat minimum. Magnific now warns API buyers that pay-per-usage is marked for June 30, 2026 discontinuation and should not be treated as durable procurement math.
- Verification: `npm run audit:tool-quality -- --file` for all four tool files; `npm run audit:provenance:changed -- --json`; `npm run --silent audit:sources -- --json --live --limit 0` across 22 refreshed sources; `npm run ledger:pages:check`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run tool:refresh:batch:check -- --file src/content/tools/luma.md --file src/content/tools/magnific.md --file src/content/tools/meshy.md --file src/content/tools/opusclip.md`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/luma/ --route /tools/magnific/ --route /tools/meshy/ --route /tools/opusclip/ --route /categories/ai-video/ --route /categories/ai-image/ --route /categories/ai-design/ --route /categories/ai-writing/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client --concurrency 4`.
- Failed then fixed: The first Magnific API pay-per-use source-health pass returned a 404 for `docs.magnific.com/pricing-payg`; updated the registry and visible sources to `https://www.magnific.com/api/pricing`, added the June 30 discontinuation caveat, and reran source health successfully.
- Next: Completed by the Pinecone, PixVerse, Playground AI, and Qdrant shard below.

### 2026-06-27: Non-Tool Page Refresh Batch 05

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Refreshed 24 guide routes from `/guides/best-ai-tools-for-accountants/` through `/guides/best-free-ai-tools/`, updated `/guides/`, `/categories/`, 13 affected category hubs, and regenerated `PAGE_REFRESH_LEDGER.md`. Strict 3-day stale count moved from 193 to 169 tracked pages.
- Buyer-impact notes: Role guides now show June 27 verification language; archived budget pages keep noindex routing but have current recheck framing; the marketer guide no longer relabels old June 6 exact pricing as current and instead uses source-backed billing-cadence caution. Video generator guidance now uses a live Kling 3.0 launch source.
- Source repairs: Replaced the broken Jasper Brand Voice help URL with `https://www.jasper.ai/brand-voice`. Replaced the unreachable Kuaishou investor Kling 3.0 URL with the live GlobeNewswire copy of the launch release.
- Verification: `npm run page:source-health -- --plan local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json --out local/tmp/aipedia-runner/page-refresh/batch-05-source-health-after-pass2.json --concurrency 8 --timeout-ms 8000`; `npm run ledger:pages && npm run ledger:pages:check`; `node scripts/check-frontmatter.mjs --changed`; `AIPEDIA_CURRENT_DATE=2026-06-27 npm run audit:coverage-quality:changed`; `npm run audit:provenance:changed -- --json`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `AIPEDIA_CURRENT_DATE=2026-06-27 npm run runner:page-refresh:closeout`; supplemental `node scripts/qa-route.mjs` for 13 category hubs at 319, 360, 390, 430, 768, 1024, and 1366 px.
- Timing: closeout 81.234s total, cheap gates 2.366s, source health 12.261s, typecheck 14.856s, build:fast 16.824s, content route QA 34.922s, supplemental category route QA 16.319s.
- Failed then fixed: Initial source-health pass found an unreachable Kuaishou URL, then a broken Jasper help URL after replacement; both were fixed and rerun successfully. The first combined ledger generate/check needed a second ledger write before `ledger:pages:check` stabilized.
- Residual risks: Worker report scaffolds parsed 6/6 but were not filled by live subagents because this batch was executed in-thread. Use closeout/source-health/route-QA timings for optimization rather than scaffold worker metrics.
- Next: Continue the oldest-first strict 3-day queue with 169 stale pages left: 38 guides, 37 comparisons, 30 companies, 21 static pages, 14 workflows, 12 trends, 8 dead archive pages, 6 tools, 2 crawl surfaces, and 1 report.

### 2026-06-25: Pinecone, PixVerse, Playground AI, and Qdrant Serial Tool Shard

- Status: Complete, verified, and pushed on `codex/refresh-tool-pages-june-23`.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Refreshed Pinecone, PixVerse, Playground AI, and Qdrant against current June 2026 primary sources. Updated AI Infrastructure, AI Search, AI Image, and AI Video parent hubs, refreshed source-registry `last_checked` rows, added `pixverse-changelog`, and regenerated `PAGE_REFRESH_LEDGER.md`.
- Buyer-impact notes: PixVerse now surfaces the June 16, 2026 Upscale feature release from the official Platform changelog. Qdrant v1.18.2 remains the latest checked GitHub release, but the page now correctly says the release was published June 4, 2026. Pinecone and Playground pricing checks remained stable on June 25.
- Verification: `npm run audit:tool-quality -- --file src/content/tools/pinecone.md --file src/content/tools/pixverse.md --file src/content/tools/playground-ai.md --file src/content/tools/qdrant.md`; `npm run audit:provenance:changed -- --json`; `npm run --silent audit:sources -- --json --live --limit 0` across 13 refreshed sources; `npm run ledger:pages && npm run ledger:pages:check`; `npm run tool:refresh:batch:check -- --file src/content/tools/pinecone.md --file src/content/tools/pixverse.md --file src/content/tools/playground-ai.md --file src/content/tools/qdrant.md`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/pinecone/ --route /tools/pixverse/ --route /tools/playground-ai/ --route /tools/qdrant/ --route /categories/ai-infrastructure/ --route /categories/ai-search/ --route /categories/ai-image/ --route /categories/ai-video/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client --concurrency 4`.
- Failed then fixed: The first provenance pass caught missing confidence on Qdrant `best_for` and missing `verified_at` fields on two older PixVerse price-history rows; added the missing metadata and reran successfully. The first ledger check was stale after parent-page edits; regenerated and reran successfully.
- Next: Completed by the subsequent six-worker 60-tool refresh batch.

### 2026-06-25: Six-Worker 60-Tool Refresh Batch

- Status: Complete, verified, and pushed on `codex/refresh-tool-pages-june-23`.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Ran the six-worker `$aipedia-tool-refresh-workflow` across 60 due-soon tools from Reclaim AI through Supermaven. Integrated worker edits, updated affected category hubs, refreshed `src/data/source-registry.json`, added the Hunyuan HY-Embodied-0.5 paper source, regenerated `PAGE_REFRESH_LEDGER.md`, and checked all affected rendered routes.
- Buyer-impact notes: Tavus pricing now carries the newer Developer surface plus a caveat for duplicated old pricing blocks. Kiro now includes Pro Max. Hume, Vapi, InVideo, Framer, Flux, Codex, Devin, Obsidian, Poe, Groq, Imagen, Genspark, Ahrefs, AssemblyAI, and Supermaven got current buyer-facing corrections or tightened caveats. Other shard tools were reverified against current June 2026 sources with dates and provenance aligned.
- Verification: `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`; `npm run typecheck`; `npm run build:fast`; `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 4 $(cat .tmp-route-qa-args.txt) --widths 319,360,390,430,768,1024,1366`.
- Failed then fixed: The first batch check caught long sentences in `hume.md` and `tana.md`, the banned phrase `best-in-class` in `supermaven.md`, and a ledger check race caused by running ledger generation/check concurrently. Split the sentences, replaced the phrase, regenerated the ledger, and reran the grouped batch check successfully.
- Residual risks: Checkout-gated and account-gated claims remain caveated in content, especially Boomy, Apollo, Jimeng/Dreamina, Gemini Omni API pricing, Ada contact-sales pricing, Tavus overages/concurrency, and Genspark task-level credit burn.
- Next: Move `master` to the verified branch tip, push `master`, regenerate the next planner, and continue the next not-recently-refreshed batch.

### 2026-06-25: Second Six-Worker 60-Tool Refresh Batch

- Status: Complete locally, verified, pending commit and push.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Ran the six-worker `$aipedia-tool-refresh-workflow` across the next 60 planned tools, from Tabnine through Wordtune. Integrated worker edits, updated affected category hubs, refreshed `src/data/source-registry.json`, regenerated `PAGE_REFRESH_LEDGER.md`, and checked all affected rendered routes.
- Buyer-impact notes: Claude Design now carries the Anthropic metering-doc conflict caveat. DeepL and Deepgram have corrected usage and Gemini timing details. Dust moved off stale EUR shorthand to current Business Pro and Max annual-seat pricing. Exa, GLM, Krea, OmniSEO, Recraft, ServiceNow, Surfer SEO, Val Town, ClickUp, Goose, Readwise, Speechify, Tidio, OpenRouter, Rodin, and Make received current buyer-facing corrections or tightened caveats.
- Verification: `npm run ledger:pages && npm run ledger:pages:check`; `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`; `npm run audit:provenance:changed -- --json`; `npm run typecheck`; `npm run build:fast`; `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 4 $(cat .tmp-route-qa-args.txt) --widths 319,360,390,430,768,1024,1366`.
- Failed then fixed: The first grouped batch check failed only on `ledger:pages:check`; rerunning `ledger:pages && ledger:pages:check` fixed it. The first `typecheck` caught a YAML parse error in `src/content/tools/claude-design.md` caused by a colon in an unquoted inline value; changed it to a folded scalar and reran typecheck successfully.
- Residual risks: Make live source checks included access-sensitive 403s, with at least one primary Make source reachable. Account-gated, checkout-gated, and plan-doc-conflict claims are caveated in the affected pages.
- Next: Commit, move `master` to the verified batch, push `master`, then regenerate the next planner before launching another six-worker wave.

### 2026-06-25: Tool Refresh Workflow Speed and Accuracy Upgrade

- Status: Complete locally, verified, pending commit.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Added `scripts/check-frontmatter.mjs` and `npm run check:frontmatter` to catch malformed markdown YAML before Astro typecheck/build. Wired the frontmatter parser into `tool:refresh:batch:check`. Updated `scripts/tool-refresh-batch.mjs` so planner closeout commands run `ledger:pages && ledger:pages:check` before the grouped checker, and so generated worker prompts require source-confidence labels: `primary-confirmed`, `primary-conflict`, `account-gated`, `checkout-gated`, `region-rendered`, `blocked-live-check`, and `secondary-only`. Updated `scripts/README.md`, `.agent/LOOPS.md`, and the local `$aipedia-tool-refresh-workflow` skill docs to match.
- Verification: `node --check scripts/check-frontmatter.mjs`; `node --check scripts/tool-refresh-batch.mjs`; `node --check scripts/tool-refresh-batch-check.mjs`; `node --test tests/scripts/tool-refresh-batch.test.mjs`; `npm run check:frontmatter`; planner smoke with `npm run --silent tool:refresh:batch -- --limit 3 --max-workers 2 --tools-per-worker 2 --json`; `npm run audit:commands`; `npm run ledger:pages && npm run ledger:pages:check`; `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-workflow-smoke.json`.
- Failed then fixed: The first smoke `tool:refresh:batch:check` failed only on `ledger:pages:check`, reproducing the prior wasted-pass pattern. Regenerated the ledger first, reran the grouped checker, and it passed.
- Residual risks: `.agents/skills/aipedia-tool-refresh-workflow/` remains local gitignored skill state, so the committed durable rule lives in `.agent/LOOPS.md`, planner output, tests, and script docs.
- Next: In the next real 60-tool batch, use generated worker prompts directly from `--agents` or JSON `agent_briefs`, run `npm run ledger:pages && npm run ledger:pages:check` before the grouped checker, and keep `typecheck` after the grouped checker.

### 2026-06-25: Committed Workflow Folder

- Status: Complete locally, pending verification and commit.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Added committed `workflows/` as the canonical home for repeatable operating procedures, separate from current-state `.agent/` memory and local-only `.agents/` runtime state. Added the full `workflows/tool-refresh/` procedure, worker prompt, integrator checklist, verification sequence, placeholders for news/page/QA workflows, and reusable run/worker report templates. Updated `.agent` orientation docs to point future agents at `workflows/`.
- Verification: pending.
- Residual risks: The new news/page/QA workflow folders are intentionally placeholders; expand them only from real repeated runs.

### 2026-06-25: Rust Tool Refresh Runner

- Status: Complete locally, verified, pending commit.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Added `tools/aipedia-runner/`, a Rust CLI that wraps the existing proven Node/Astro workflow instead of replacing it. The runner can plan tool-refresh batches, write worker prompt files, generate route QA args, run the ordered closeout gates, and write local receipts under `local/tmp/aipedia-runner/`. Added npm entry points: `runner`, `runner:tool-refresh:plan`, `runner:tool-refresh:route-args`, `runner:tool-refresh:closeout`, and `runner:tool-refresh:run`. Updated workflow docs and script docs to prefer the runner while keeping manual fallback commands.
- Verification: `cargo check --manifest-path tools/aipedia-runner/Cargo.toml`; `npm run runner:tool-refresh:plan -- --limit 2 --workers 2 --tools-per-worker 1`; `npm run runner:tool-refresh:closeout -- --skip-build --skip-route-qa`; `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check`; `cargo test --manifest-path tools/aipedia-runner/Cargo.toml`; `npm run audit:commands`; `node scripts/guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: First version intentionally does not launch Codex subagents by itself. It prepares worker prompts and enforces closeout sequencing around the existing scripts. Full `build:fast` and route QA were not run for this tooling-only change, but the real workflow should run them without skip flags after an actual content batch.
- Next: Use the runner on the next 60-tool refresh, then add file-ownership diff checks and source-health caching after one real runner-backed batch.

### 2026-06-25: Third Six-Worker Tool Refresh Batch

- Status: Complete locally, verified, pending commit and push.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Ran `$aipedia-tool-refresh-workflow` with six shard workers across 54 due-soon tools from Zapier through Jan.ai. Integrated worker edits, refreshed `src/data/source-registry.json`, regenerated `PAGE_REFRESH_LEDGER.md`, corrected the saved planner and route-QA args after moving watsonx Orchestrate back to the valid AI Automation category, and wrote `.agent/loop-runs/2026-06-25-third-six-worker-tool-refresh-batch.md`.
- Buyer-impact notes: WellSaid pricing now uses the current Trial/Starter/Pro/Business/Enterprise ladder; Freepik/Magnific and QuillBot carry region-rendered pricing caveats; Kimi keeps K2.6 as the primary-source flagship and leaves K2.7-Code secondary-only; Mem flags a live pricing-label conflict; Ollama treats `v0.30.11-rc0` as pre-release; GPT Image 2 uses current OpenAI API token pricing; Jan.ai is refreshed to v0.8.3 and Apache-2.0 licensing.
- Verification: `npm run ledger:pages && npm run ledger:pages:check`; `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`; `npm run typecheck`; `npm run build:fast`; `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 4 $(cat .tmp-route-qa-args.txt) --widths 319,360,390,430,768,1024,1366`.
- Failed then fixed: The first grouped batch check caught Kimi filler phrases, watsonx category/sentence issues, missing `last_checked` on `stable-audio-launch`, and missing price-history `verified_at` fields. Fixed and reran successfully. Route QA initially failed only on nonexistent `/categories/ai-enterprise/`, a planner artifact after correcting watsonx; updated planner/route args and reran successfully.
- Residual risks: Region-rendered, checkout-gated, account-gated, and primary-conflict claims remain caveated in affected pages, especially Freepik/Magnific, QuillBot, Mem, Riverside, Stable Audio, Tripo3D, Cohere, Workato, IBM watsonx Orchestrate, Semantic Scholar live count, and OpenClaw secondary-source security testing.
- Next: Commit/push the verified batch, regenerate the next planner, and continue the next due-soon shard.

### 2026-06-26: Tool Refresh Workflow No-Regression Hardening

- Status: Complete locally, verified, pending commit and push with the active batch.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Added `scripts/audit-hub-staleness.mjs` and `npm run audit:hub-staleness:changed`, then wired it into `tool:refresh:batch:check` so refreshed tool pages cannot point at missing or older parent category hubs. Updated planner-generated worker prompts, workflow docs, and local skill notes to require `price_history[].verified_at` on checked commercial rows and explicit primary-category-change reporting. Updated the Rust runner so route QA args are generated from current tool frontmatter instead of stale planner category routes, and runner receipts now include total, cheap-gate, and expensive-gate timing buckets. Fixed the planner metadata test so it uses `--include-same-day` and does not fail when the freshness queue was just refreshed.
- Verification: `node --check scripts/audit-hub-staleness.mjs`; `npm run audit:hub-staleness:changed -- --json`; `node --check scripts/tool-refresh-batch.mjs`; `node --check scripts/tool-refresh-batch-check.mjs`; `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`; `npm exec --yes --package=node@24 -- node --test tests/scripts/tool-refresh-batch.test.mjs`; `npm run audit:commands`; `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check`; `cargo check --manifest-path tools/aipedia-runner/Cargo.toml`; `cargo test --manifest-path tools/aipedia-runner/Cargo.toml`; `npm run runner:tool-refresh:route-args -- --plan .tmp-tool-refresh-batch.json --out local/tmp/aipedia-runner/review-route-args.txt`; `npm run runner:tool-refresh:closeout -- --plan .tmp-tool-refresh-review-smoke.json --route-args local/tmp/aipedia-runner/review-smoke-route-args.txt --receipt-dir local/tmp/aipedia-runner/review-receipts --skip-build --skip-route-qa`; `npm run ledger:pages && npm run ledger:pages:check`; `git diff --check`; `node scripts/guard-em-dashes.mjs`.
- Failed then fixed: `cargo fmt --check` initially flagged formatting in the runner timing block; ran `cargo fmt` and reran Rust checks successfully.
