# AiPedia Current Status

Last updated: 2026-06-30

Audience: maintainers, future agents, and Matt.

## Read First

1. `INDEX.md`: root LLM-readable repo map and canonical start point.
2. `.agent/CURRENT_STATUS.md`: current state and next action.
3. `.agent/PLANS.md`: active or immediately resumable plans.
4. `.agent/LOOPS.md`: repeatable loop commands and rules.
5. `.agent/OPERATING_RULES.md` and `.agent/PROJECT_MAP.md`: repo rules, paths, and verification map.
6. `workflows/README.md`: committed repeatable workflow procedures.
7. `.agent/specialists/README.md`: saved project-local specialist agents.
8. `.agent/WORK_LOG.md`: append-only proof trail. Read newest entries only unless investigating history.

Old specs, archived plans, local ignored docs, and stale chat history are not canonical when they conflict with this stack.

## Current State

- Branch: `agent-os-absolute-meta-2026-06-30`. The active goal is the June 30, 2026 AiPedia Agentic Tooling Meta Operating System, system-first. Content pages are only bounded test workloads. Progress must improve or validate scripts, runners, schemas, workflows, skills, scoring, memory, receipts, pause/resume, DAG planning, evals, or automation.
- Latest system slice: runner closeout receipts now attach checked DAG proof refs through `AIPEDIA_DAG_GRAPHS` and `AIPEDIA_DAG_VALIDATION_REPORTS`, using the same typed `agent-task-dag` and `agent-task-dag-validation-report` artifact refs as loop closeouts. `agent:closeout:check` now validates DAG artifact refs on runner receipts too. Focused Rust and Node tests prove runner receipt emission and fail-closed validation. Live runner proof receipt: `.agent/evals/runner-dag-closeouts/2026-06-30-slice-36-receipts/2026-06-30T09-05-41Z-tool-refresh-closeout.json`. Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T09-09-51-766Z-loop-run.json`. Latest trend check saw 2 metric-aware receipts, 0 missing metrics, 0 loop status changes, 0 command status changes, latest wall duration 5381 ms, and latest estimated full receipt tokens 11071.
- Previous system slice: `loop:all:record` now accepts repeatable `--dag-graph <path>` and `--dag-validation-report <path>` closeout refs. Loop receipts record those as typed `agent-task-dag` and `agent-task-dag-validation-report` artifacts, and `agent:closeout:check` reads the referenced files, confirms graph schema, requires validation report schema `aipedia.agent-task-dag-check.v1`, requires `ok: true`, and rejects non-zero validation issues. Focused tests prove loop receipt attachment and fail-closed closeout validation. Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T08-57-20-080Z-loop-run.json`. Latest trend check saw 2 metric-aware receipts, 0 missing metrics, 0 loop status changes, 0 command status changes, median wall duration 5350.5 ms, and latest estimated full receipt tokens 10876.
- Previous system slice: canonical `npm run runner:agent-plan` now wraps the Rust graph writer and immediately runs `agent:dag:check` against the generated artifact. It accepts `--validation-out <path>` to persist the validator report, and focused wrapper tests prove both the passing checked-graph path and the fail-closed invalid-DAG path without making script tests compile Rust. Durable live proof: `.agent/evals/agent-dag-contracts/2026-06-30-slice-34-cursor-agent-task-graph.json` plus `.agent/evals/agent-dag-contracts/2026-06-30-slice-34-cursor-agent-task-graph.validation.json`. Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T08-48-03-374Z-loop-run.json`.
- Previous system slice: `runner:agent-plan` now emits a validated `aipedia.agent-task-dag.v1` node contract instead of a loose planning sketch. The graph includes canonical evidence, impact, score, memory join, synthesis, patch/report, validation, and status-doc nodes with IDs, phases, dependency edges, permissions, artifacts, validators, and receipt hooks. New `agent:dag:check` validates graph shape, canonical node presence, memory dependencies, permissions, command payloads, artifact and validator coverage, duplicate IDs, missing dependencies, self-dependencies, and cycles. Durable live proof: `.agent/evals/agent-dag-contracts/2026-06-30-slice-33-cursor-agent-task-graph.json`. Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T08-39-11-427Z-loop-run.json`.
- Previous system slice: `agent:closeout:check` now recognizes `aipedia.runner-interrupt-proof.v1` proof reports as first-class receipts. The validator checks live proof status, non-zero interrupted runner status, copied pause and closeout artifact paths, all four interruption assertions, embedded receipt-validation results, optional backward-compatible proof reports, and strict `trace` plus `artifact_refs` when requested. `runner:interrupt-proof` now writes `residual_risks`, `trace`, and `artifact_refs` into new proof reports. Durable strict proof artifacts: `.agent/evals/runner-interrupt-proofs/2026-06-30-slice-32-proof-report-closeout-check-*`. Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T08-25-05-232Z-loop-run.json`.
- Previous system slice: `runner:interrupt-proof` packages the live interrupted runner closeout proof as a repeatable smoke command. The script writes a disposable `local/tmp/aipedia-runner-interrupt-proof/` fixture, runs the real Rust tool-refresh closeout against a `ledger:pages` script that self-sends SIGINT, expects the runner to exit non-zero, copies the generated pause and failed closeout receipts into `.agent/evals/runner-interrupt-proofs/`, persists an `aipedia.runner-interrupt-proof.v1` proof report, and validates the copied receipts through `agent:closeout:check`. Durable proof artifacts: `.agent/evals/runner-interrupt-proofs/2026-06-30-slice-31-repeatable-interrupt-proof-*`. Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T08-10-26-335Z-loop-run.json`.
- Previous system slice: `agent:closeout:check` now enforces interrupted runner pause links. Any runner closeout receipt with `commands[].interrupted: true` must include a non-empty `interrupted_pause_receipt` field and an `artifact_refs` entry with `role: output`, `kind: interrupted-pause-receipt`, and a matching path. Focused validator tests prove the positive linked receipt, malformed `interrupted` flag rejection, and missing-link failure paths. The Slice 29 linked proof receipts still pass, while the older Slice 28 unlinked interrupted closeout now fails with `runner-interrupted-pause-receipt-missing`. Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T07-57-43-981Z-loop-run.json`.
- Previous system slice: interrupted failed runner closeout receipts now link to their generated pause receipts. Tool-refresh and page-refresh closeout JSON include `interrupted_pause_receipt` when pause capture runs, artifact refs include `kind: interrupted-pause-receipt`, and markdown closeouts print the pause path. A focused Rust test and live fixture proof show the failed closeout now has both `commands[0].interrupted: true` and a matching pause receipt artifact ref. Durable proof receipts are under `.agent/evals/runner-interrupt-proofs/2026-06-30-slice-29-*`. Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T07-47-07-903Z-loop-run.json`.
- Previous system slice: automatic runner pause capture now has a live interrupted-workflow proof. A disposable fixture ran the real Rust tool-refresh closeout with a `ledger:pages` script that self-sent SIGINT and exited 130. The runner detected `ledger generate` as interrupted, wrote and validated an interrupted pause receipt, wrote a failed closeout receipt, and bailed with the pause path. Durable proof receipts are committed under `.agent/evals/runner-interrupt-proofs/`; the failed closeout records `commands[0].interrupted: true`, and the pause receipt preserves the separate Synthesia WIP under observed-before-agent files with no proof-agent touched files. Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T07-37-37-688Z-loop-run.json`.
- Previous system slice: runner closeouts now detect interrupted child commands and attempt a validated pause receipt before bailing. The Rust runner records an `interrupted` flag when a closeout command exits from SIGINT, SIGTERM, or status 130, writes an interrupted runner pause receipt through the shared `runner:pause-receipt` path, preserves `AIPEDIA_OBSERVED_DIRTY_BEFORE_AGENT`, and serializes the interrupted state into closeout command receipts. Rust format, check, tests, focused interrupt coverage, scoped `check:smart --run`, `check:quick`, enforced `loop:all:record`, efficiency trends, and required closeout validation passed. Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T07-29-33-698Z-loop-run.json`.
- Previous system slice: pause receipts now carry trace and artifact lineage. `agent:pause-receipt` writes trace ID, span ID, parent span ID, start/end times, duration, and artifact refs for the receipt output, captured git status, agent-touched dirty files, observed-before-agent dirty files, embedded next commands, validation done, and validation pending. `agent:closeout:check --require-trace-artifacts` now enforces that lineage on pause receipts. Focused pause and closeout tests, live `local/tmp/slice26-pause-trace-receipt.json` validation, scoped `check:smart`, `check:quick`, enforced `loop:all:record`, efficiency trends, and required closeout validation passed, while keeping the Synthesia content WIP under observed-before-agent state. Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T07-13-28-570Z-loop-run.json`.
- Previous system slice: runner workflows now have an explicit validated pause receipt path. `runner:pause-receipt` exposes a Rust `pause` subcommand that delegates writing to `agent:pause-receipt`, checks the writer validation block, then runs an independent validation pass before reporting success. Default local paths include subsecond precision under `local/tmp/aipedia-runner/pauses/`. Rust format, check, tests, command-surface audit, live `local/tmp/aipedia-runner/pauses/slice25-runner-pause.json` smoke, `agent:closeout:check --receipt`, scoped `check:smart`, `check:quick`, enforced `loop:all:record`, efficiency trends, and required closeout validation passed. The smoke preserved the Synthesia content WIP as observed-before-agent state and limited touched files to `package.json` plus `tools/aipedia-runner/src/main.rs`. Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T07-01-25-237Z-loop-run.json`.
- Previous system slice: pause receipts now have schema validation and closeout recognition. `agent:pause-receipt` validates generated receipts, adds `--validate` and `--receipt` modes for existing `aipedia.pause-receipt.v1` files, and separates pre-existing dirty files from `files_touched_by_agent` when they are declared with `--observed-dirty-before-agent`. `agent:closeout:check` now recognizes pause receipts as `pause-receipt`. Focused pause and closeout tests, live `local/tmp/slice24-pause-receipt-v2.json` validation, `check:quick`, enforced `loop:all:record`, efficiency trends, and required closeout validation passed. Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T06-47-49-517Z-loop-run.json`.
- Previous system slice: enforced memory expiration and promotion during JSONL retrieval. `agent:memory:record` now writes `expires_after_days` and `retrieval_priority`; `agent:memory:query` hides expired records by default, supports `--include-expired`, accepts deterministic `--current-date`, promotes same-route memory via `--route`, keeps raw `score`, adds boosted `rank_score`, and exposes per-match retrieval metadata. Focused tests, live `/tools/cursor/` memory smoke, `check:quick`, enforced `loop:all:record`, efficiency trends, and required closeout validation passed. Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T06-36-23-004Z-loop-run.json`. Latest trend check saw 2 metric-aware receipts, 0 missing metrics, 0 loop status changes, 0 command status changes, and persistent attention in `freshness`, `performance-ux`, and `revenue-conversion`.
- Previous system slice: proved page-refresh workflow policy fail-closed behavior on a runner-produced page-refresh receipt while leaving the separate Synthesia content WIP untouched. A bounded dry-run `runner:page-refresh:closeout` produced a structurally complete page-refresh receipt, and `agent:closeout:check --require-workflow-policy` rejected it with exactly `runner-workflow-policy-input-freshness-stale` because `PAGE_REFRESH_LEDGER.md` is stale. Durable proof: `.agent/evals/closeout-policy-receipts/2026-06-30-slice-22-page-refresh-policy-blocker.json`. Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T06-24-53-589Z-loop-run.json`. This is a negative proof, not rendered page quality validation.
- Previous system slice: extended `agent:efficiency:trends` with receipt-derived stability signals. The trend report now includes loop status comparisons, loop status changes, loop status change rate, command status comparisons, command status changes, command status change rate, persistent attention loops, latest attention loops, new attention loops, resolved attention loops, and recent loop status changes. Focused tests, `check:quick`, enforced `loop:all:record`, required closeout validation, and a live two-run trend check passed. Durable receipt: `.agent/loop-runs/system/2026-06-30T06-15-03-030Z-loop-run.json`. The latest trend comparison saw 7 loop comparisons, 0 loop status changes, 16 command comparisons, 0 command status changes, median wall duration 5098 ms, and latest-run deltas of +174 ms wall duration and -105 full receipt bytes.
- Previous system slice: added `agent:efficiency:trends`, a loop-efficiency trend summarizer over `.agent/loop-runs/system/*-loop-run.json`. It reports metric coverage, median wall and command duration, attention-rate and receipt-size medians, estimated receipt-token proxy, latest-run metrics, deltas from the previous metric-aware run, and repeated slow commands. `--fail-on-missing-metrics` can make the selected receipt window fail closed. Focused tests, `check:quick`, enforced `loop:all:record`, required closeout validation, and a live two-run trend check passed. Durable receipt: `.agent/loop-runs/system/2026-06-30T06-05-43-634Z-loop-run.json`. The latest trend delta was -39 ms wall duration and -158 full receipt bytes versus the previous metric-aware run.
- Previous system slice: added first-class loop `efficiency_metrics` and closeout enforcement. `loop:all:record` now records wall duration, total command duration, command and loop counts, attention and skipped rates, artifact counts, system artifacts per second, receipt bytes, and slowest commands. `agent:closeout:check --require-efficiency-metrics` fails missing or mismatched metrics. Focused tests, `check:quick`, enforced `loop:all:record`, and required closeout validation passed. Durable receipt: `.agent/loop-runs/system/2026-06-30T05-56-59-972Z-loop-run.json`.
- Previous system slice: expanded reviewed score gold-set coverage from 3 to 6 real-route cases. New cases cover a fresh same-workflow comparison, a fresh affiliate buyer guide, and current news. Governed `agent:score:calibrate --require-gold-set-review` passed with 6 cases, 0 mismatches, governance hash `5af262308abdf0e3e991aa4a49bfc84071c63c06fece0999ed6a517ecd9adadd`, and threshold review `pass`. Durable receipt: `.agent/evals/score-calibration-receipts/2026-06-30-slice-18-score-goldset-expansion.json`.
- Previous system slice: proved affiliate handoff policy validation on a bounded runner-produced handoff receipt. A one-cluster Argil affiliate plan plus local complete worker report produced markdown and `aipedia.affiliate-handoff-receipt.v1` JSON, and `agent:closeout:check --require-workflow-policy` passed with 1 checked receipt, 0 failures, and 0 issues. Durable proof: `.agent/evals/closeout-policy-receipts/2026-06-30-slice-17-affiliate-handoff-policy-check.json`.
- Previous system slice: extended affiliate conversion handoffs into machine-readable policy receipts. `runner:affiliate-conversion:handoff` now writes `aipedia.affiliate-handoff-receipt.v1` JSON beside the markdown handoff, and `agent:closeout:check --require-workflow-policy` validates selected clusters, evidence counts, route QA scope, CommercialCTA and live-source gates, and shared-file no-edit boundaries for affiliate handoff receipts.
- Previous system slice: proved workflow-specific closeout policy validation on a bounded runner-produced tool-refresh receipt. A one-tool BLACKBOX AI planner plus dry-run closeout produced local runner JSON, and `agent:closeout:check --require-workflow-policy` passed with 1 checked receipt, 0 failures, and 0 issues. Durable proof: `.agent/evals/closeout-policy-receipts/2026-06-30-slice-15-tool-refresh-policy-check.json`.
- Previous system slice: added workflow-specific runner closeout policy validation. `agent:closeout:check --require-workflow-policy` now enforces tool-refresh and page-refresh command labels, artifact refs, standard route QA widths, zero-status commands, embedded `system_progress`, and fresh matching `input_freshness`.
- Previous system slice: added governance for deliberate score gold-set baseline changes. `agent:score:calibrate` now emits `gold_set_governance`, normalizes a baseline hash, validates case rationales and expectations, and supports `--require-gold-set-review` plus `--gold-set-review <path>` so baseline changes need matching review records.
- Previous system slice: added explicit safe auto-refresh policy for stale generated planner inputs. `agent:input-freshness -- --workflow <id> --refresh-stale --json` now plans refreshes without mutating files; `--apply-refreshes` executes eligible refreshes and re-checks; tracked generated files require both explicit `--workflow <id>` and `--allow-tracked-mutations`.
- Previous system slice: wired shared generated-input freshness receipts into Rust runner closeouts. Tool-refresh and page-refresh closeout JSON now embed workflow-specific `input_freshness` from `agent-input-freshness-receipt.mjs`, and `agent:closeout:check` validates the embedded schema, command metadata, summary counts, and workflow match when present.
- Previous system slice: added shared generated-input freshness receipts. `agent:input-freshness -- --all --json` now checks decision-content backlog, tool-refresh freshness report, page-refresh ledger, and affiliate-conversion inventory in one `aipedia.input-freshness-receipt.v1` schema. The saved receipt `.agent/evals/input-freshness-receipts/2026-06-30-slice-10-input-freshness.json` correctly reports decision-content, tool-refresh, and affiliate-conversion fresh, and page-refresh stale because the separate Synthesia content WIP has not had the ledger regenerated.
- Previous system slice: added gold-set calibration receipts and threshold review for non-stale scoring. `agent:score:calibrate -- --gold-set .agent/evals/score-calibration-goldset.json --json` now validates real-route expectations and writes a receipt at `.agent/evals/score-calibration-receipts/2026-06-30-slice-09-score-goldset.json` with 3 passing cases, 0 mismatches, and threshold review `pass`.
- Previous system slice: added trace/span and artifact refs to loop and Rust runner closeout receipts. `agent:closeout:check --require-trace-artifacts` enforces the trace and artifact contract.
- Previous system slice: added non-stale scoring v2 with page-type weights, stale-decay score penalties, risk profiles, confidence profiles, calibration summaries, docs, and focused tests.
- Previous system slice: added stale-input gates to the major planners. `tool-refresh-batch --fail-on-stale-inputs` and `affiliate-conversion-plan --fail-on-stale-inputs` validate fresh live generated reports, `page-refresh-batch --fail-on-stale-ledger` blocks stale `PAGE_REFRESH_LEDGER.md`, and the Rust runner forwards strict planner flags.
- Previous system slice: standardized closeout identity fields across loop and Rust runner receipts. `loop:all:record` accepts `--goal-id`, `--run-id`, repeatable `--risk`, and repeatable `--next-action`; runner closeout JSON reads matching `AIPEDIA_*` environment values; `agent:closeout:check --require-closeout-identity` enforces the contract.
- Previous system slice: extended Rust runner tool-refresh and page-refresh closeout JSON with optional `system_progress` from `agent-system-progress-check.mjs`, and tightened `agent:closeout:check` so runner receipts validate that field when present.
- Previous system slice: added `agent:closeout:check`, a deterministic loop and Rust runner receipt validator. It validates enforced `system_progress` for June 30 meta closeouts, checks runner `aipedia.closeout-receipt.v1` receipts, and passed across 22 existing system receipts with 0 issues.
- Previous system slice: wired `agent:system-progress` into `loop:all:record` receipts, added `--require-system-progress` for operating-system closeouts, added regression tests, updated loop docs, and recorded `.agent/loop-runs/system/2026-06-30T03-01-47-100Z-loop-run.json` with a passing `system_progress` block.
- Previous system slice: added stale backlog enforcement to `loop:next`, added `agent:system-progress` so content-only diffs cannot count as operating-system progress, added durable JSON `agent:pause-receipt` generation, documented the compliance state, and added focused tests. Verification passed `test:scripts`, `check:quick`, `check:smart`, `loop:system`, `loop:all`, `git diff --check`, and the em-dash guard.
- The system goal is not complete. Next system work should add an explicit closeout-check mode that requires a checked DAG proof when a workflow declares DAG planning, prove page-refresh runner policy on a bounded receipt once the separate Synthesia WIP is resolved, keep expanding reviewed scoring coverage for stale high-risk and source-gap cases, and add exact token plus correction-rate metrics when the runtime exposes reliable inputs.
- Pre-existing content WIP remains intentionally separate and must not be included in system commits unless the user explicitly resumes it: `src/content/tools/synthesia.md`, `src/data/coverage-backlog.json`, `src/data/source-registry.json`, and `src/content/comparisons/captions-vs-synthesia.md`.
- Branch: `master`. The Codex operating-system refactor is merged into `master` at `0ff8fb6a`: committed central `AGENTS.md`, architecture audit, operating manual, task templates, report format, workflow docs, skills, helper scripts, memory/scoring/parallel roadmap docs, refactor report, read-only CLIs for evidence bundles, parent-surface impact detection, page quality scoring, score calibration, JSONL memory records, CPU lexical vector query, and a Rust `runner:agent-plan` task-DAG contract. An all-night agent-system improvement goal is active. First live pilot used the new tools on the June 29 news refresh, published three source-backed AI/tool stories, and hardened static hub impact detection, non-ledger content-route resolution, inline news source accounting, memory source counts, and news-specific buyer-intent scoring. Second loop fixed score calibration so inline news sources count as source coverage, updated canonical JSON loop commands to use `npm --silent run`, and recorded a green broad loop receipt with 7 ok, 0 attention, and 0 skipped. Third loop used the `loop:next` recommendation to add `/compare/amazon-q-vs-github-copilot/`, refreshed the affected Amazon Q, GitHub Copilot, AI Coding, top-layer, LLM, source-registry, and ledger surfaces, and fixed comparison evidence extraction so visible `## Sources` links count toward source coverage. Fourth loop fixed the `audit:coverage-quality:changed -- --changed-file ...` wrapper conflict discovered during that comparison pilot. Fifth loop added `/compare/antigravity-vs-cursor/`, refreshed the affected Antigravity, Cursor, AI Coding, top-layer, LLM, source-registry, and ledger surfaces, proved the changed-file coverage wrapper on another real comparison, and repaired a source-registry date drift for the shared `aipedia-news` internal citation. Sixth loop added `/compare/argil-vs-heygen/`, refreshed the affected Argil, HeyGen, AI Video, top-layer, LLM, source-registry, and ledger surfaces, and repaired visible AI Video source-date registry drift surfaced by the stricter date-consistency guard. Seventh loop added `/compare/argil-vs-synthesia/`, refreshed Argil, Synthesia, AI Video, top-layer, LLM, source-registry, and ledger surfaces, and verified twelve current official Argil/Synthesia sources. Eighth loop added `/compare/blackbox-ai-vs-replit-agent/`, refreshed BLACKBOX AI, Replit Agent, AI Coding, top-layer, LLM, source-registry, and ledger surfaces, verified eighteen current official or primary source rows, and caught the Replit Pro annual price drift so the page now uses the official $95/month annual pricing instead of the stale $90 value. Ninth loop added `/compare/boomy-vs-suno/`, refreshed Boomy, Suno, AI Music, top-layer, LLM, source-registry, and ledger surfaces, and used the page-quality score to catch a weak internal-link lane before shipping, raising the comparison from 0.82 to 0.88 after adding relevant music alternatives. Tenth loop added `/compare/boomy-vs-udio/`, refreshed Boomy, Udio, AI Music, top-layer, LLM, source-registry, and ledger surfaces, repaired the Udio Warner source row so the fact source and registry URL match, and recorded the sharper Boomy-support split: eleven checked rows were HTTP 200 while three support rows were raw-HTTP 403 and remain access-sensitive. Eleventh loop added `/compare/capacities-vs-notion-ai/`, refreshed Capacities, Notion AI, AI Notes, top-layer, LLM, source-registry, and ledger surfaces, used scoring feedback to lift the page from 0.80 to 0.89 with adjacent-decision links, and repaired AI Notes registry-date drift surfaced by the date-consistency guard after ten live source checks. Twelfth loop added `/compare/captions-vs-heygen/`, refreshed Captions.ai, HeyGen, AI Video, top-layer, LLM, source-registry, and ledger surfaces, verified seventeen current official Captions/HeyGen rows, recorded a 0.88 monitor score, and confirmed route QA across 319 to 1366 px. CuPy remains intentionally deferred until CPU retrieval, rerank, or dedupe metrics show a real hotspot. Next loop should continue testing the system on real production routes, starting with the current `captions-vs-synthesia` decision recommendation unless a fresh loop run changes the ranking.
- June 28 tool expansion day is paused by user request after nine verified batches: Firecrawl, Composio, Dify, Flowise, LangSmith, Tavily, Pydantic AI, Mem0, Braintrust, Portkey, Zep, promptfoo, Arize Phoenix, Ragas, OpenPipe, LangWatch, Patronus AI, DeepEval, Traceloop, BAML, LiteLLM, LlamaIndex, Haystack, DSPy, Respan, Agno, Instructor, Chainlit, OpenLIT, Opik, Mirascope, Outlines, Inspect AI, OpenAI Evals, Guardrails AI, and LM Evaluation Harness are now source-backed tool pages with logos, OG cards, registry rows, parent-hub maintenance, top-layer refresh notes, LLM/search surfaces, and ledger updates. Dify paid-plan amounts, Flowise Cloud Starter price, and the Mem0 Pro web-vs-mobile pricing mismatch remain visible live-check caveats. The promptfoo acquisition note is backed by promptfoo's own current update and OpenAI's announcement; the OpenAI page loads in browser but returned raw HTTP 403 in source audit. Batch 04 caveats are visible in content: Phoenix is marketed as open-source but carries Elastic License 2.0 limits, LangWatch paid pricing is euro-denominated with event and retention meters, Ragas framework use still requires evaluator/model spend, and OpenPipe usage pricing needs clean datasets and eval baselines before training. Batch 05 caveats are visible in content: Patronus AI now blends eval platform and Digital World Model research positioning, DeepEval framework cost is separate from Confident AI cloud, Traceloop is joining ServiceNow, and BAML uses the official docs favicon because no fuller public logo was found. Batch 06 caveats are visible in content: LiteLLM Enterprise pricing is not public, LlamaIndex framework and LlamaParse/LlamaCloud costs are separate, deepset platform pricing is not a simple Haystack library price, and DSPy needs real metrics and examples before optimization is useful. Batch 07 caveats are visible in content: Respan's public pricing does not expose a clean Team base price in rendered HTML, Agno Pro is currently $150/month on the checked pricing page, Instructor is a library rather than a governance platform, and Chainlit is a developer Python chat UI framework rather than a managed chatbot product. Batch 08 caveats are visible in content: OpenLIT Cloud pricing is not public, Opik cloud costs depend on spans and retention, Mirascope Cloud has been discontinued while the SDKs remain active, and Dottxt API pricing for Outlines could not be verified from a public pricing page. Batch 09 caveats are visible in content: OpenAI Evals is a migration bridge with read-only and shutdown dates, Guardrails AI hosted or remote-validator pricing was not publicly verified, and Inspect AI plus LM Evaluation Harness are free frameworks but still require model, compute, sandbox, GPU, storage, and review budgets. Resume net-new tool pages only after the daily news surface is current or the user explicitly resumes tool expansion.
- Root `DESIGN.md` now defines AiPedia's agent-readable visual identity contract, backed by `npm run design:lint` using `@google/design.md@0.3.0`. `check:smart` routes `DESIGN.md` through the existing Phase 3 design-token surface.
- Site-wide design consistency pass is verified: `src/styles/godtier-tokens.css` now aliases shared `--gt-*` shape tokens to canonical panel, card, and pill radii, and `tests/scripts/design-tokens.test.mjs` guards that bridge. Full design/build/browser verification passed on June 28, including visual smoke and route QA across 319, 360, 390, 430, 768, 1024, and 1366 px.
- `npm run qa:agent` is available as a local-only Playwright buyer-journey harness with deterministic timing, layout, CTA, disclosure, and optional PageAgent LLM metrics. Use deterministic mode for routine route QA; use `--page-agent --llm-base-url <url> --model <name>` only when a compatible local or proxied LLM endpoint is ready.
- Root project orientation is cleaned up and pushed: `INDEX.md` is the LLM-readable entrypoint, tracked specialist agents live under `.agent/specialists/`, `.agents/` remains gitignored local runtime state, and the former `.Agents/` root folder is retired.
- Specialist library now includes `expert-project-manager`, `agentic-workflow-software-engineer`, and `master-mathematician-coding-expert`.
- The TanStack rebuild is not active.
- The loop system is healthy: latest broad recorded review is 7 ok / 0 attention / 0 skipped after a fresh `npm run build:fast`; the Captions.ai vs HeyGen comparison pilot passed memory recording, focused source/provenance/link/coverage checks, guard, `typecheck`, `build:fast`, and targeted route QA across 319 to 1366 px. Fresh recommendations are `captions-vs-synthesia` for decision content and BLACKBOX AI `best_paid_tier` for freshness. The latest system lesson is that low-context registry patches are risky; source-registry edits should include source IDs in every hunk, and duplicate URL rows such as HeyGen developer pricing should be updated together when a visible URL check depends on them.
- Comparison policy is strict: publish `vs` pages only for tools that solve the same buyer job and workflow. Cross-category or different-workflow pages must be deleted or avoided.
- Visual layout policy is strict: every rendered page must preserve grid math, spacing, containment, readable text ratios, and no horizontal overflow across mobile, tablet, and desktop.
- Top-layer and detail width parity work is complete and pushed. The homepage, top-layer indexes, and representative detail pages now share the narrow-mobile width discipline requested in browser feedback.
- News catch-up for June 18-22 is complete, and the selected lantern logo is active. The old blue/cyan brand regression was closed.
- Homepage reported issues are closed: decision-card overcrowding, source/freshness/confidence fallback labels, 319 px portal overflow, orange-brown verified panel styling, and copy density.
- The model availability tracker interruption is handled: `/trends/model-availability-churn/` is now a simple daily frontier-model availability ledger, `/` and `/news/` are marked for daily refresh, and the Codex app automation `daily-aipedia-news-and-model-availability-refresh` is active. The `/news/` daily automation explicitly requires at least three source-backed AI or AI-tool stories per run. Treat the daily news pass as the first editorial task each day: verify current sources, publish or explicitly record skipped lanes, update `/news/`, `/`, affected top-layer pages, LLM/feed/sitemap surfaces, and the ledger.
- Jun 26-29 focused news coverage is complete with three source-backed individual stories for each date and no daily desk page. Latest June 29 pass added Google AI Studio Gemini API-key incident coverage, OpenAI and HP Frontier enterprise rollout coverage, and Grok 4.5 private beta benchmark caution. `/news/`, `/`, RSS, LLM manifests, OG assets, and ledger were inspected and verified. Official OpenAI and xAI pages were access-sensitive from raw HTTP, and the Google AI Studio status page required live/dynamic-page handling.
- Tool pages now use the shared decision-spine default: hero, decision card, plan guidance, fit, recent changes, alternatives, related comparisons, then collapsed proof/score math and full review notes. Keep future tool-page work in this format unless there is a deliberate template migration.
- The optimized tool-refresh workflow now has a committed procedure under `workflows/tool-refresh/` and a local skill mirror `$aipedia-tool-refresh-workflow` under `.agents/skills/aipedia-tool-refresh-workflow/`. Treat `workflows/` as canonical for clean clones, and keep the local skill aligned while tuning. In the Codex Windows app, use six parallel shard workers with up to 10 tools per worker because six active agents was the observed ceiling on June 24.
- The tool-refresh planner now includes registered source metadata, scoped `audit:sources` commands, shard-level `source_ids`, and a default one-day recent-refresh exclusion so overnight runs do not immediately reselect yesterday's completed high-volatility pages. Use `--include-same-day`, `--exclude-recent-days 0`, or an explicit `--exclude-verified-date` only when intentionally revisiting recent pages.
- The latest timing pass changed route QA closeout to concurrency 6 with per-route/per-width timing. Same 75-route, seven-width matrix passed at concurrency 6 after the closeout baseline at concurrency 4 took 126s.
- Workflow closeout guardrails are now stronger: runner JSON receipts record superseded failed receipts with the passing receipt path, failed command, failed status, and failed elapsed time; `audit:date-consistency` also checks visible markdown source-link dates against `src/data/source-registry.json` `last_checked` rows, not only frontmatter source IDs.
- Non-tool page refresh now has a Rust-runner-backed repeatable workflow under `workflows/page-refresh/`. Use `npm run runner:page-refresh:plan`, `npm run runner:page-refresh:reports`, and `npm run runner:page-refresh:closeout` as the default path. The runner wraps the Node planner, writes exact worker prompts and worker JSON report scaffolds, splits standard content route QA from intentional noindex interactive route QA, aggregates worker reports, times every closeout gate, and writes local receipts.
- The first live non-tool page-refresh batch is complete and pushed: 12 routes across terms, disclosure, reports, answers, compare-builder, dead archive, and three comparison pages. The follow-up optimization pass added parseable worker reports, route-QA policy mapping, and closeout micro-timing so future speed, efficiency, quality, and accuracy reviews have structured data.
- Non-tool page-refresh batch 02 is pushed: 12 comparison and guide routes from Frase/NeuronWriter through heavy-inbox triage, parent hubs `/compare/`, `/guides/`, AI SEO, AI Presentation, AI Chatbots, AI Automation, and `PAGE_REFRESH_LEDGER.md`. Worker reports parsed 3/3 with 89 source URLs, 51 confidence labels, 29 caveats, and 75 parent surface notes. Final closeout passed in 51.528s.
- Page-refresh workflow optimization is verified: planner routes now carry explicit QA policy classes, archived noindex content remains content/frontmatter-only for QA, and the Rust report summary now emits worker efficiency metrics plus parent-surface hints.
- Non-tool page-refresh batch 03 is verified: 18 guide routes from academic writing through LinkedIn, with affected `/guides/`, `/answers/best-ai-for-writing-2026/`, AI Writing, AI Research, AI Coding, AI Design, AI Automation, AI Search, and `PAGE_REFRESH_LEDGER.md`. Worker reports parsed 6/6 with 175 report source URLs, 35 confidence labels, 21 caveats, and 41 parent notes. Final closeout passed in 62.57s wall time. One archived noindex legal-research route stayed out of indexable route QA by policy.
- The page-refresh workflow now has `npm run page:source-health`, a bounded concurrent source checker with per-source and per-page timing, per-host delay, timeout controls, and explicit access-sensitive handling for 401, 403, and 429. It is wired into `runner:page-refresh:closeout` before typecheck and can be skipped only for scoped workflow tests with `-- --skip-source-health`. A smoke run over the next two planned pages checked 21 source URLs in 5.211s and correctly flagged one existing 404: `https://www.canva.com/logo-maker/` on `/guides/best-ai-for-logo-design/`.
- Non-tool page-refresh batch 12 is pushed: the final 18 non-tool stale routes were moved to June 27 verification across guides, Anthropic, GitHub Copilot vs Supermaven, `/media-kit/`, `/workflows/design-agency-replacement/`, and `/sitemap-index.xml`. The batch replaced a slow Adobe source with the current Adobe Firefly plans and credits page.
- Final six tool refresh is verified locally: `phind`, `tome`, `semrush-demo`, `dalle`, `dext`, and `grok-code-fast` are refreshed to June 27 with affected category hubs, `/`, `/tools/`, `/categories/`, source registry, and ledger updates. Strict 3-day stale count is now 0 tracked pages. Semrush Demo remains an archived noindex route and was checked separately with `--allow-noindex`; Grok Code Fast now caveats the current xAI-docs redirect-target conflict.
- Affiliate conversion page buildout is active. Current inventory after the SaneBox demotion is 25 configured affiliate-link tools, 21 approved-live tools, and 4 configured-but-not-live tools. The 35 existing affiliate money guides have been backfilled with structured conversion metadata and anti-doorway/CTA-plan fields, bringing strict `audit:affiliate-conversion` from 245 warnings to 0. Two subagents accepted the foundation at 9.9/10 after audit hardening and committed negative tests. The Dext cluster now has five distinct first-pass buyer intents: broad receipt tool, pricing for bookkeeping firms, Dext vs Hubdoc, Dext vs AutoEntry for Sage bookkeepers, and client document collection for bookkeeping firms. CloudTalk has two first-pass phone buyer intents. Decktopus has the consultant proposal-deck buyer slice. Argil has a plan-decision slice for UGC avatar video teams focused on Classic, Pro, Scale, Enterprise, credit burn, API usage, Product Showcase, and consent risk. Gamma now has a plan-decision slice for founders, consultants, and lean teams choosing Free, Plus, Pro, or Ultra around annual prices, credits, card caps, custom domains, analytics, API access, and checkout caveats. Consensus now has a plan-decision slice for students, labs, clinicians, and research teams choosing Free, Pro, Deep, Teams, or Enterprise around Pro messages, Deep reviews, Study Snapshots, Library/Collections, and formal-review alternatives. The SaneBox pricing guide is verified as an official-link buyer guide, not a live affiliate page, while referral attribution and current commercial terms remain unvalidated. Strict affiliate audit now sees 50 money guides, 21 live affiliate tools, 0 errors, and 0 warnings.
- The first full 60-tool workflow baseline completed on June 24, 2026 in 36m 55s through the main route QA, and 41m 31s including documentation, supplemental route QA, and final sanity checks. Core workflow timing: 25m 07s worker collection, then 11m 48s integration and verification. Closeout timings were ledger 2s, batch check 37s, typecheck 32s, check:quick 22s, build:fast 64s, main route QA 107s for 80 routes across five widths, and supplemental route QA 4s for two edited routes missed by the main matrix.

## Freshness Queue

Completed for June 21-22:

- Presentations.AI and MiniMax.
- Claude and Claude Code.
- Gemini.
- GitHub Copilot.
- Grammarly.
- Qwen.
- Hailuo.
- HeyGen.
- Adobe Firefly.
- Augment Code.
- Base44.
- BLACKBOX AI.
- Captions.ai.
- Cline.
- CodeRabbit.
- Cody.
- Comet.
- D-ID.
- Hedra.
- Mastra.
- Microsoft Agent Framework.
- Midjourney.
- NotebookLM.
- Qodo.
- Capacities.
- Beehiiv.
- Browserbase.
- Castmagic.
- CloudTalk.
- Grok.
- Cursor.
- Lindy.
- n8n.
- Mistral AI.
- Argil.
- Canva.
- Replit Agent.
- Claude.
- Gemini.
- Decktopus.
- Grok.
- n8n.

Latest completed batches:

- June 28 tool expansion batch 01: `firecrawl`, `composio`, `dify`, and `flowise` were added as new active tool pages. Affected parent hubs: AI Infrastructure and AI Automation. Shared updates: source registry, logo manifest, tool OG registry and cards, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, search/home generated APIs, and `PAGE_REFRESH_LEDGER.md`.
- June 28 tool expansion batch 02: `langsmith`, `tavily`, `pydantic-ai`, and `mem0` were added as new active tool pages. Affected parent hubs: AI Infrastructure, AI Automation, AI Search, and AI Coding. Shared updates: source registry, tool registry, logo manifest, OG assets, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, search/home generated APIs, and `PAGE_REFRESH_LEDGER.md`.
- June 28 tool expansion batch 03: `braintrust`, `portkey`, `zep`, and `promptfoo` were added as new active tool pages. Affected parent hubs: AI Infrastructure, AI Automation, and AI Coding. Shared updates: source registry, tool registry, logo manifest, OG assets, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, search/home generated APIs, and `PAGE_REFRESH_LEDGER.md`.
- June 28 tool expansion batch 04: `arize-phoenix`, `ragas`, `openpipe`, and `langwatch` were added as new active tool pages. Affected parent hubs: AI Infrastructure, AI Automation, and AI Coding. Shared updates: source registry, tool registry, logo manifest, OG assets, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, search/home generated APIs, and `PAGE_REFRESH_LEDGER.md`.
- June 28 tool expansion batch 05: `patronus-ai`, `deepeval`, `traceloop`, and `baml` were added as new active tool pages. Affected parent hubs: AI Infrastructure, AI Automation, and AI Coding. Shared updates: source registry, tool registry, logo manifest, OG assets, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, search/home generated APIs, and `PAGE_REFRESH_LEDGER.md`.
- June 28 tool expansion batch 06: `litellm`, `llamaindex`, `haystack`, and `dspy` were added as new active tool pages. Affected parent hubs: AI Infrastructure, AI Coding, AI Automation, and AI Search. Shared updates: source registry, tool registry, logo manifest, OG assets, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, search/home generated APIs, and `PAGE_REFRESH_LEDGER.md`.
- June 28 tool expansion batch 07: `respan`, `agno`, `instructor`, and `chainlit` were added as new active tool pages. Affected parent hubs: AI Infrastructure, AI Coding, AI Automation, and AI Chatbots. Shared updates: source registry, tool registry, logo manifest, OG assets, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, search/home generated APIs, and `PAGE_REFRESH_LEDGER.md`.
- June 28 tool expansion batch 08: `openlit`, `opik`, `mirascope`, and `outlines` were added as new active tool pages. Affected parent hubs: AI Infrastructure, AI Coding, and AI Automation. Shared updates: source registry, tool registry, logo manifest, OG assets, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, search/home generated APIs, and `PAGE_REFRESH_LEDGER.md`.
- June 28 tool expansion batch 09: `inspect-ai`, `openai-evals`, `guardrails-ai`, and `lm-evaluation-harness` were added as new active tool pages. Affected parent hubs: AI Infrastructure, AI Coding, and AI Automation. Shared updates: source registry, tool registry, logo manifest, OG assets, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, search/home generated APIs, and `PAGE_REFRESH_LEDGER.md`.
- Verification for the nine-batch expansion: thirty-six `audit:tool-quality` runs passed across the new tool files; changed frontmatter, provenance, date consistency, ledger, logo manifest, OG, guard, typecheck, `build:fast`, route QA, generated API/LLM smoke, `check:quick`, em-dash guard, and `git diff --check` passed. Selected live-source audits passed with one access-sensitive raw HTTP 403 for `openai-promptfoo-acquisition` in batch 03, all 17 batch-04 source IDs returning HTTP 200, all 18 batch-05 source IDs returning HTTP 200, all 13 batch-06 source IDs returning HTTP 200, all 17 batch-07 source IDs returning HTTP 200, all 26 batch-08 source IDs returning HTTP 200, and all 16 batch-09 source IDs returning HTTP 200. Earlier route QA intentionally failed on `/search/` noindex and plain-text LLM routes before rerunning on indexable HTML and checking LLM/search content separately. Batch 07 also had two useful closeout catches: `build:fast` caught a homepage evidence downgrade from a medium-confidence Respan category pick, and `check:quick` caught invalid `type: license` source rows plus the problem with forcing the June 28 content date into current-date fixture tests. Batch 09 closeout caught one high-volatility OpenAI Evals fact missing `next_review_at`, plus an older `dalle-best-for` source-registry date that lagged the touched category pages; both were fixed.

- Four-tool June 25 serial shard from the regenerated due-soon queue: `luma`, `magnific`, `meshy`, and `opusclip`.
- Affected parent hubs: AI Video, AI Image, AI Design, and AI Writing.
- Shared updates: `src/data/source-registry.json`, `PAGE_REFRESH_LEDGER.md`, and affected parent source/date summaries. Meshy's current individual ladder now includes Pro, Premium, and Ultra before Studio; Magnific API guidance now warns that pay-per-usage is marked for June 30, 2026 discontinuation.

Latest completed and pushed content batch:

- Intentional same-day revisit batch from the regenerated queue with `--include-same-day`: `consensus`, `beehiiv`, `blackbox-ai`, `browserbase`, `canva`, `castmagic`, `cline`, `cloudtalk`, `coderabbit`, `midjourney`, `notebooklm`, `qodo`, `replit-agent`, `claude`, `decktopus`, `gemini`, `grok`, `n8n`, `claude-code`, `github-copilot`, `grammarly`, `mistral-ai`, `qwen`, `capacities`, `cursor`, `hailuo`, `heygen`, `adobe-firefly`, `argil`, `augment-code`, `base44`, `captions`, `cody`, `comet`, `continue`, `copy-ai`, `crewai`, `d-id`, `hedra`, `lindy`, `mastra`, `microsoft-agent-framework`, `dia`, `figma`, `chatgpt`, `deepseek`, `meetgeek`, `elevenlabs`, `elicit`, `voxtral`, `descript`, `suno`, `synthesia`, `udio`, `bolt`, `lovable`, `mubert`, `pika`, `v0`, and `kling`.
- Material buyer updates: Replit Pro annual pricing was revisited again on June 29 and now uses the current official $95/month annual price; Figma gained Config 2026/agent-workspace context; Capacities gained Release 66 AI Chat Connectors 2.0; Captions was manually caught after a hand-transcribed worker prompt missed it; Synthesia Studio Express-1 avatar add-on is now primary-confirmed at $1,000/year for annual Studio users.
- Workflow improvements from the timing review: `audit:tool-quality` now uses local/explicit current date instead of UTC-only date slicing, `qa-route` can write route/viewport timing JSON, runner closeout persists route QA timing, and runner route QA uses concurrency 6 while preserving the same route/viewport coverage.

Previous completed and pushed branch batch:

- Third six-worker June 25 batch from the regenerated due-soon queue: `zapier`, `sudowrite`, `writesonic`, `pitch`, `gamma`, `fish-audio`, `quillbot`, `murf`, `resemble-ai`, `stable-diffusion`, `wellsaid`, `freepik`, `you-com`, `kagi`, `scite`, `semantic-scholar`, `kimi`, `langfuse`, `leonardo`, `letta`, `llama`, `lm-studio`, `logseq`, `mem`, `morphic`, `ollama`, `open-webui`, `paradox`, `reflect`, `reka`, `replicate`, `riverside`, `sanebox`, `spellbook`, `stable-audio`, `tactiq`, `writer`, `rows`, `voiceflow`, `tripo3d`, `typingmind`, `uizard`, `unbounce`, `watsonx-orchestrate`, `weaviate`, `whisper`, `workato`, `yi`, `antigravity`, `cohere`, `gpt-image-2`, `openclaw`, `hermes-agent`, and `jan-ai`.
- Affected parent hubs inspected: AI Automation, AI Writing, AI Presentation, AI Voice, AI Image, AI Search, AI Research, AI Chatbots, AI Notes, AI Infrastructure, AI Music, AI Design, and AI Coding. The `/tools/` and `/categories/` top-layer routes were covered in route QA.
- Shared updates: `src/data/source-registry.json`, `PAGE_REFRESH_LEDGER.md`, `.tmp-tool-refresh-batch.json`, `.tmp-route-qa-args.txt`, and agent status docs. Current buyer-impact notes: WellSaid moved off stale Creative-era pricing; Freepik/Magnific and QuillBot carry region-rendered caveats; Kimi keeps K2.6 as primary-source current with K2.7-Code secondary-only; Mem flags conflicting pricing labels; Ollama treats `v0.30.11-rc0` as pre-release; watsonx Orchestrate is back on the valid AI Automation category; GPT Image 2 uses current OpenAI API token pricing; Jan.ai is refreshed to v0.8.3 and Apache-2.0 licensing.

Previous large batch:

- 60-tool six-shard baseline run from `.tmp-tool-refresh-batch.json`: `cody`, `comet`, `continue`, `copy-ai`, `crewai`, `d-id`, `hedra`, `lindy`, `mastra`, `microsoft-agent-framework`, `midjourney`, `notebooklm`, `qodo`, `replit-agent`, `claude`, `decktopus`, `gemini`, `grok`, `n8n`, `claude-code`, `github-copilot`, `grammarly`, `mistral-ai`, `qwen`, `capacities`, `cursor`, `hailuo`, `heygen`, `adobe-firefly`, `argil`, `augment-code`, `base44`, `dia`, `figma`, `chatgpt`, `deepseek`, `meetgeek`, `elevenlabs`, `elicit`, `voxtral`, `windsurf`, `codeium`, `descript`, `perplexity`, `kling`, `runway`, `seedance`, `veo`, `suno`, `synthesia`, `udio`, `bolt`, `lovable`, `mubert`, `pika`, `v0`, `langgraph`, `minimax`, `pipedream`, and `lovart`.
- Affected parent hubs: AI Automation, AI Chatbots, AI Coding, AI Design, AI Image, AI Infrastructure, AI Music, AI Notes, AI Presentation, AI Research, AI Search, AI Video, AI Voice, and AI Writing.
- Shared updates: `src/data/source-registry.json`, `PAGE_REFRESH_LEDGER.md`, tool-refresh planner same-day exclusion, affected category hubs, and the historical Claude Agent SDK billing news correction.

Latest completed news pass:

1. `/news/2026-06-24-google-gemini-computer-use-preview/`
2. `/news/2026-06-25-github-copilot-best-month-ai-coding-demand/`
3. `/news/2026-06-25-google-gemini-35-pro-delay-buyer-risk/`
4. `/news/2026-06-25-openai-anthropic-raise-us-workforce-push/`

Prior Jun 23-24 pass:

1. `/news/2026-06-23-openai-daybreak-codex-security/`
2. `/news/2026-06-23-samsung-chatgpt-codex-enterprise/`
3. `/news/2026-06-23-claude-error-rate-fallback-planning/`
4. `/news/2026-06-24-zai-glm-52-open-model-pressure/`
5. `/news/2026-06-24-google-ai-talent-openai-anthropic/`

Next due-soon tracked-tool queue:

- Strict 3-day target is empty after the final six tool refresh. Recompute before broader future batches with `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`.

Use `$aipedia-tool-refresh-workflow` for the parallel batched tool refresh flow:

1. Save a 60-tool plan with `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`.
2. If using subagents, assign one worker per shard from `agent_briefs.worker_briefs`; each worker may edit only the tool markdown files listed in its shard, and launch at most six active workers at once.
3. The integrator reviews worker diffs, updates source registry rows, affected parent hubs, top-layer surfaces, and `PAGE_REFRESH_LEDGER.md` once.
4. Run `npm run tool:refresh:batch:check -- --plan <planner-json>` as the fast grouped gate.
5. Run one `npm run typecheck`, one `npm run build:fast`, and one combined `npm run qa:route`.

Do not return to one full build per tool unless a template, runtime, layout, generated asset, high-risk commercial claim, or isolated failure requires it.

## Active Work

### June 30 Agentic Tooling Meta OS

The current goal is to turn the June 30 meta spec into working AiPedia agent infrastructure, not just more content output. Slices 01 through 32 hardened stale planner input handling, system-progress checking, durable pause receipts, closeout validation, runner system-progress receipts, closeout identity fields, planner stale-input gates, non-stale scoring v2, closeout trace/artifact refs, scoring gold-set calibration receipts, shared generated-input freshness receipts, runner input-freshness closeout integration, safe generated-input refresh policy, score gold-set baseline governance, workflow-specific runner and affiliate handoff closeout policies, bounded runner policy proofs, reviewed score gold-set expansion, loop efficiency metrics, loop efficiency trend summaries, receipt-derived stability signals, page-refresh stale-input policy blocking, memory expiration and promotion, pause receipt schema validation, runner pause integration, pause trace/artifact lineage, automatic interrupted runner pause capture, a live interrupted runner proof, interrupted closeout pause receipt linkage, validator enforcement for interrupted pause links, repeatable interrupted runner proof packaging, and first-class proof-report closeout validation. Keep the goal active until the operating system is materially implemented, tested on real workloads, documented, committed, pushed, and reviewed against the six lenses in `docs/agentic-tooling-meta-compliance.md`.

Next system actions:

1. Harden `runner:agent-plan` DAG contracts with validated node metadata, permissions, artifacts, validators, and receipt hooks.
2. Run a positive bounded page-refresh policy proof after the separate stale ledger/content WIP is resolved.
3. Expand the reviewed scoring gold set during real workload pilots, especially stale high-risk tools and source-gap remediation cases.
4. Add exact model-token usage and correction rate when reliable inputs are available.

### Non-Tool Page Refresh Workflow

The first repeatable non-tool page-refresh lane is now proven on a 12-page live batch and has a Rust runner:

```bash
npm run runner:page-refresh:plan
npm run runner:page-refresh:reports
npm run runner:page-refresh:closeout
```

Batch 01 refreshed `/terms/`, `/disclosure/`, `/reports/`, `/dead/`, four answer pages, `/compare/build/`, and three comparison pages. Use generated prompt files and report scaffolds, not hand-transcribed prompts or chat-only worker summaries. The measured critical path was the 6m17s worker shard; closeout build was 16.79s, content route QA was 20.39s, and interactive builder QA was 2.67s. Next page-refresh batch can stay at 12 to 24 pages while worker reports stabilize, then scale by measured shard duration.

Batch 02 refreshed six comparison routes and six guide routes. Closeout receipt: `local/tmp/aipedia-runner/page-refresh/receipts/2026-06-26T07-03-32Z-page-refresh-closeout.md`. Durable receipt: `.agent/loop-runs/2026-06-26-page-refresh-batch-02.md`. Keep the archived-noindex policy: refresh archived pages when selected, but do not include them in indexable route QA unless explicitly testing noindex behavior.

The follow-up workflow optimization added route policy classes and worker efficiency reporting. Use `npm run runner:page-refresh:reports` before integration review; the summary now includes pages/minute, sources/page, caveats/page, confidence labels/page, failed worker checks, and parent-surface hints.

Batch 03 refreshed 18 guide routes from `/guides/best-ai-for-academic-writing/` through `/guides/best-ai-for-linkedin/`. Closeout receipt: `local/tmp/aipedia-runner/page-refresh/receipts/2026-06-26T08-22-14Z-page-refresh-closeout.md`. Durable receipt: `.agent/loop-runs/2026-06-26-page-refresh-batch-03.md`. The follow-up workflow patch added bounded concurrent page-source health and updated worker-report scaffolds so check objects use `command`, `status`, and `notes`.

Next page-refresh content move: the strict 3-day target is complete locally across non-tool and tool rows. Start the next cycle from a fresh ledger snapshot after the final commit and push.

### Oldest-First Tool Freshness

The Consensus, Beehiiv, BLACKBOX AI, Browserbase, Canva, Captions, Castmagic, Cline, CloudTalk, and CodeRabbit batch is verified locally. It updates:

- `src/content/categories/ai-research.md`
- `src/content/categories/ai-writing.md`
- `src/content/categories/ai-coding.md`
- `src/content/categories/ai-automation.md`
- `src/content/categories/ai-design.md`
- `src/content/categories/ai-image.md`
- `src/content/categories/ai-presentation.md`
- `src/content/categories/ai-video.md`
- `src/data/source-registry.json`
- `PAGE_REFRESH_LEDGER.md`
- `/tools/` and `/categories/` via ledger/build output

Next active batch:

- Regenerate the planner and skip recently refreshed pages unless a newer request explicitly revisits them.
- Use six shard workers in the Codex Windows app, with up to 10 tool markdown files per worker. The previous one-tool-per-worker run hit the app's active-agent ceiling after six workers, so the workflow now scales by increasing each worker's shard size instead of increasing concurrent agents.

### Decision Content Flywheel

The `amazon-q-vs-github-copilot` recommendation has been exercised as the third all-night system-loop pilot. It is verified locally and should be committed before selecting the next comparison or workflow-hardening task.

### Affiliate Conversion Page Buildout

The first new approved-tool page after the metadata foundation is complete and pushed: `/guides/dext-pricing-for-bookkeeping-firms/`. It targets Dext pricing for bookkeeping firms, links from AI Automation, and keeps the broader receipt-tool guide as a sibling rather than a duplicate cluster. Visual/mobile review accepted at 9.9/10 after the related-link polish was fixed. Accuracy/SEO review accepted at 9.9/10 after Hubdoc was narrowed to Xero-included or standalone positioning.

Latest affiliate move: the Consensus cluster is verified and pushed with `/guides/consensus-pricing-for-students-and-researchers/`, a plan-decision page for students, labs, clinicians, and research teams choosing Free, Pro, Deep, Teams, or Enterprise without overbuying Deep reviews or using Consensus where Elicit, Scite, Semantic Scholar, Perplexity, or NotebookLM is a better fit. It updates the Consensus tool page, academic citation and citation sibling guides, the researcher-tools guide, AI Research, `/guides/`, `/tools/`, `/categories/`, `/`, `/search/`, `/llms.txt`, `/llms-full.txt`, source registry rows, and `PAGE_REFRESH_LEDGER.md`. Final focused gates passed: current-source checks, changed frontmatter, strict affiliate conversion, selected live sources with the Perplexity raw-HTTP 403 caveat, changed provenance, guide picks, freshness queue, date consistency, daily news, ledger, guard, typecheck, `build:fast`, rendered CTA/disclosure/tracking checks, search/LLM surface checks, and route QA across affected routes at 319, 360, 390, 430, 768, 1024, and 1366 px.

Previous affiliate move: the Gamma cluster is verified with `/guides/gamma-pricing-for-founders-and-consultants/`, a plan-decision page for founders, consultants, solo marketers, and lean teams choosing Free, Plus, Pro, or Ultra without overbuying credits, domains, analytics, or API access. It updates the Gamma tool page, the core presentation guide, the consultant guide, AI Presentation, `/guides/`, `/tools/`, `/categories/`, `/`, `/explore/`, `/search/`, `/llms.txt`, `/llms-full.txt`, source registry rows, and `PAGE_REFRESH_LEDGER.md`. The pricing page returned 403 to the raw HTTP source checker but loaded in Chromium and exposed Individual annual-billing prices at Free $0, Plus $9/seat/month, Pro $18/seat/month, and Ultra $90/seat/month. The content preserves Gamma's current source conflict: subscription help lists Pro at 50 cards per prompt and says Ultra is only available monthly, while pricing lists Pro at 60 cards and displays annual Ultra pricing.

Previous affiliate move: the CloudTalk cluster is locally verified with two new guide pages: `/guides/cloudtalk-pricing-for-smb-sales-and-support-teams/` for Lite, Starter, Essential, Expert, AI Conversation Intelligence, AI Receptionist, AI Specialist, dialer, caller-ID, and spam-remediation plan math, and `/guides/best-ai-receptionist-for-smb-phone-teams/` for missed calls, after-hours routing, message capture, appointment confirmation, escalation, Retell AI, Vapi, and Intercom alternatives. It updates the CloudTalk tool page, the SMB phone-system guide, AI Automation, AI Voice, homepage, LLM surfaces, source registry, ledger, and SoftwareApplication schema pricing behavior.

### Top-Layer Visual Uplift

Shared width and card-surface work is complete. Future visual work should inspect page-specific hierarchy and copy density for `/guides/`, `/news/`, `/answers/`, `/trends/`, `/workflows/`, and high-traffic detail templates.

## Current Verification Baseline

Latest Consensus affiliate conversion slice passed:

- Current June 2026 source checks for Consensus subscription plans, how Consensus works, changelog, official search surface, affiliate redirect, Elicit, Scite, Semantic Scholar, NotebookLM, and Perplexity. Selected live-source audit checked 15 source IDs with 14 raw HTTP OK and 1 access-sensitive caveat: Perplexity Enterprise pricing returned raw HTTP 403 but loaded in browser.
- `npm run ledger:pages && npm run ledger:pages:check`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run guard:check`
- `npm run check:frontmatter -- --changed`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run --silent audit:affiliate-conversion -- --strict --json`
- `npm run audit:provenance:changed -- --json`
- `npm run audit:guide-picks`
- `node scripts/audit-freshness-queue.mjs --json`
- `AIPEDIA_CURRENT_DATE=2026-06-28 node scripts/audit-date-consistency.mjs --changed --json`
- `npm run check:news`
- `git diff --check`
- `npm run typecheck`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run build:fast`
- `npm run qa:route -- --site-dir dist-fast/client --allow-noindex --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route / --route /guides/consensus-pricing-for-students-and-researchers/ --route /tools/consensus/ --route /guides/best-ai-research-tool-for-academic-citations/ --route /guides/best-ai-for-citations/ --route /guides/best-ai-tools-for-researchers/ --route /categories/ai-research/ --route /guides/ --route /tools/ --route /categories/ --route /search/ --route /tools/semrush-demo/`
- Generated surface and rendered checks confirmed the new guide in Consensus, AI Research, sibling guides, homepage, `/guides/`, `/search/`, `/llms.txt`, and `/llms-full.txt`; rendered CTA checks confirmed PartnerStack affiliate links, disclosure copy, placement IDs, tool slug, and page-type tracking.

Latest planner/source-maintenance pass passed:

- `npm exec --yes --package=node@24 -- node --test tests/scripts/tool-refresh-batch.test.mjs`
- `node --check scripts/tool-refresh-batch.mjs`
- `npm run audit:provenance:changed -- --json`
- `npm run ledger:pages:check`
- `node scripts/guard-em-dashes.mjs`
- `npm run --silent loop:freshness -- --json`
- `npm run --silent audit:sources -- --json --live --limit 0 --source-id minimax-speech-t2a --source-id instantly-leads`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/consensus/ --route /tools/minimax-speech/ --route /tools/instantly/ --route /categories/ai-research/ --route /categories/ai-voice/ --route /categories/ai-automation/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client --concurrency 4`

The new batch source-health probe selected 170 sources: 158 returned HTTP OK, 12 were unreachable, and 0 had content-hash changes. Clear 404s for `minimax-speech-t2a` and `instantly-leads` were fixed and live-checked. Remaining unreachable sources are mostly 403 or timeout cases: Gemini API pricing/changelog, Jasper credits pricing, Boomy support docs, Imagen docs, Jimeng, Wispr Bloomberg, Ada platform, and similar access-sensitive routes.

Latest four-tool serial shard passed:

- `npm run audit:tool-quality -- --file src/content/tools/luma.md`
- `npm run audit:tool-quality -- --file src/content/tools/magnific.md`
- `npm run audit:tool-quality -- --file src/content/tools/meshy.md`
- `npm run audit:tool-quality -- --file src/content/tools/opusclip.md`
- `npm run audit:provenance:changed -- --json`
- `npm run --silent audit:sources -- --json --live --limit 0 ...` across 22 refreshed Luma, Magnific, Meshy, and OpusClip sources
- `npm run tool:refresh:batch:check -- --file src/content/tools/luma.md --file src/content/tools/magnific.md --file src/content/tools/meshy.md --file src/content/tools/opusclip.md`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/luma/ --route /tools/magnific/ --route /tools/meshy/ --route /tools/opusclip/ --route /categories/ai-video/ --route /categories/ai-image/ --route /categories/ai-design/ --route /categories/ai-writing/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client --concurrency 4`

Latest Pinecone/PixVerse/Playground/Qdrant shard passed:

- `npm run audit:tool-quality -- --file src/content/tools/pinecone.md --file src/content/tools/pixverse.md --file src/content/tools/playground-ai.md --file src/content/tools/qdrant.md`
- `npm run audit:provenance:changed -- --json`
- `npm run --silent audit:sources -- --json --live --limit 0` across 13 refreshed Pinecone, PixVerse, Playground AI, and Qdrant sources
- `npm run ledger:pages && npm run ledger:pages:check`
- `npm run tool:refresh:batch:check -- --file src/content/tools/pinecone.md --file src/content/tools/pixverse.md --file src/content/tools/playground-ai.md --file src/content/tools/qdrant.md`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/pinecone/ --route /tools/pixverse/ --route /tools/playground-ai/ --route /tools/qdrant/ --route /categories/ai-infrastructure/ --route /categories/ai-search/ --route /categories/ai-image/ --route /categories/ai-video/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client --concurrency 4`

Latest six-worker 60-tool refresh batch passed:

- `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`
- `npm run typecheck`
- `npm run build:fast`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 4 $(cat .tmp-route-qa-args.txt) --widths 319,360,390,430,768,1024,1366`

This run refreshed 60 tools from Reclaim AI through Supermaven, updated affected category hubs, source registry rows, the page refresh ledger, and `.agent/loop-runs/2026-06-25-six-worker-60-tool-refresh-batch.md`. First grouped check caught and fixed long sentences in Hume and Tana, a banned phrase in Supermaven, five source-registry `last_checked` gaps, and a ledger check race caused by concurrent ledger generation.

Latest third six-worker tool refresh batch passed and is pushed on `codex/refresh-tool-pages-june-23`:

- `npm run ledger:pages && npm run ledger:pages:check`
- `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`
- `npm run typecheck`
- `npm run build:fast`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 4 $(cat .tmp-route-qa-args.txt) --widths 319,360,390,430,768,1024,1366`

This run refreshed 54 tools from Zapier through Jan.ai, updated source registry rows, the page refresh ledger, corrected the saved planner route set, and wrote `.agent/loop-runs/2026-06-25-third-six-worker-tool-refresh-batch.md`. First grouped check caught Kimi filler phrases, watsonx category/sentence issues, one missing source-registry `last_checked`, and missing price-history `verified_at` metadata; all were fixed. First route QA failed only on nonexistent `/categories/ai-enterprise/`, a planner artifact after correcting watsonx Orchestrate back to AI Automation; the corrected 69-route matrix passed.

Workflow improvement is complete and pushed on `codex/refresh-tool-pages-june-23`:

- Added `npm run check:frontmatter` and wired it into `tool:refresh:batch:check` so malformed markdown YAML is caught before typecheck/build.
- Updated planner-generated worker prompts to require source-confidence labels for constrained facts.
- Updated planner closeout commands to put `npm run ledger:pages && npm run ledger:pages:check` before the grouped checker.
- Verification passed: `node --check` for the changed scripts, `node --test tests/scripts/tool-refresh-batch.test.mjs`, `npm run check:frontmatter`, planner smoke, `npm run audit:commands`, `npm run ledger:pages && npm run ledger:pages:check`, and `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-workflow-smoke.json`.

Rust workflow runner now exists at `tools/aipedia-runner/`:

- `npm run runner:tool-refresh:plan` writes planner JSON, worker prompts, and route QA args under `local/tmp/aipedia-runner/`.
- `npm run runner:tool-refresh:closeout` runs ledger precheck, grouped batch check, typecheck, build, route QA, and a local receipt in order.
- Smoke verification passed with a two-tool planner and closeout using `--skip-build --skip-route-qa`; full build/route QA should be used on real rendered batches.

Latest completed 60-tool baseline refresh passed:

- `node --check scripts\tool-refresh-batch.mjs`
- `node --test tests\scripts\build-performance.test.mjs`
- `npm run ledger:pages`
- `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`
- `npm run typecheck`
- `npm run check:quick`
- `npm run build:fast`
- `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 4 --widths 319,390,430,768,1024` across 80 routes: `/`, `/tools/`, `/categories/`, `/news/`, `/trends/`, `/trends/model-availability-churn/`, `/compare/`, all 60 refreshed tool routes, and affected category routes.
- `npm run ledger:pages:check`, `node scripts\guard-em-dashes.mjs`, `npm run audit:provenance:changed -- --json`, `npm run loop:freshness -- --json`, and `git diff --check` passed inside `tool:refresh:batch:check`.

The current planner still shows 0 due-now tool pages but many due-soon facts or sources. Because high-volatility pages can remain due-soon immediately after a refresh, the planner now skips pages verified since yesterday by default. `build:fast` now takes roughly 65-70 seconds on the optimized path because it still prerenders hundreds of routes and runs guard, indexability, commercial CTA, sitemap, and budget checks. Pay that cost once per batch.

June 24 workflow profiling found the refresh closeout costs are now roughly: `tool:refresh:batch:check` 37 seconds for the 60-tool plan, `typecheck` 32 seconds, `check:quick` 22 seconds, `build:fast` 64 seconds end to end after content-cache optimization, and `qa:route` 107 seconds for 80 routes across 5 widths when using `--concurrency 4`. `scripts/build-fast.mjs` prints stage timings, `scripts/qa-route.mjs` supports `--base-url` plus `--concurrency`, `scripts/tool-refresh-batch.mjs` emits six shard-worker briefs with up to 10 tools per worker, and `scripts/tool-refresh-batch-check.mjs` can consume saved planner JSON with `--plan`.

Latest completed news refresh passed:

- `node scripts\guard-em-dashes.mjs`
- `npm run ledger:pages:check`
- `npm run check:news`
- `node scripts\audit-news-rendering.mjs --json`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /news/ --route / --route /news/2026-06-23-openai-daybreak-codex-security/ --route /news/2026-06-23-samsung-chatgpt-codex-enterprise/ --route /news/2026-06-23-claude-error-rate-fallback-planning/ --route /news/2026-06-24-zai-glm-52-open-model-pressure/ --route /news/2026-06-24-google-ai-talent-openai-anthropic/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`

Latest completed tool-page template migration passed:

- `npm run ledger:pages`
- `npm run typecheck`
- `npm run test:scripts`
- `npm run build:fast`
- `npm run smoke:visual`
- `npm run qa:route -- --route /tools/chatgpt/ --route /tools/claude/ --route /tools/cursor/ --route /tools/midjourney/ --route /tools/notion-ai/ --route /tools/watsonx-orchestrate/ --route /tools/ --route /compare/ --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `node scripts\guard-em-dashes.mjs`
- `git diff --check`

## Known Caveats

- Freshness is green for due-now items and high-volatility scheduling metadata. The planner now skips yesterday's refreshed tools by default, but due-soon facts still need continued current-source review.
- Do not run `npm run typecheck` and `npm run build:fast` in parallel. Astro uses a shared local content data store under `node_modules/.astro`, and concurrent content sync can race. Run them sequentially.
- `node scripts/audit-site-kpis.mjs --json` still reports `neuronwriter-vs-surfer-seo` below the 700-word comparison KPI threshold. This is known improvement debt, not a failing loop signal.
- Full local verification remains reliable but should be centralized. Prefer 60-tool planner batches split across six shard workers, integrator-owned shared files, focused worker checks, `tool:refresh:batch:check -- --plan`, `check:smart`, one final `build:fast`, and exact `qa:route` with `--concurrency 4`. For editing loops, use `qa-route --base-url` against the running local server instead of rebuilding.
- `.agent/specialists/` is the committed specialist-agent library. The saved specialists are `expert-project-manager/`, `agentic-workflow-software-engineer/`, and `master-mathematician-coding-expert/`.
- `.agents/skills/aipedia-tool-refresh-workflow/` is local skill state and currently gitignored with `.agents/`. Keep improving it in this workspace; move the stable form into the loop registry only after repeated successful runs.
- Vercel CLI state has been inconsistent across sessions. If Vercel operations are needed, confirm with `vercel --version`; if missing, install with `npm i -g vercel`.
- `.agents/` and `skills-lock.json` are local agent/plugin state. They are gitignored and ignored by `check-smart` default untracked discovery. The former `.Agents/` root folder is retired and should not be recreated.

## Start Next Session

1. Run `git status --short --branch`.
2. Read this file and `.agent/PLANS.md`.
3. Run the daily AI and AI-tools news pass first using `workflows/news-refresh/README.md`; search with the current month and year, publish only source-backed stories, or record why a lane was skipped.
4. Update `/news/`, `/`, affected tool/category/trend pages, LLM/feed/sitemap surfaces, and `PAGE_REFRESH_LEDGER.md` for the news pass.
5. After daily news is current, continue the affiliate conversion buildout from `.agent/PLANS.md`, or push any already verified local commits if needed.

## Finish Major Work

1. Update `.agent/CURRENT_STATUS.md`.
2. Update `.agent/PLANS.md`.
3. Append `.agent/WORK_LOG.md`.
4. Add or update a receipt under `.agent/loop-runs/`.
5. Run the smallest valid verification gate and report what passed, what failed, and what remains.
