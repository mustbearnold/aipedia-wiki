# 2026-06-26 Non-Tool Page Refresh Batch 01

- Status: Complete locally, pending final commit and push.
- Branch: `master`.
- Current date used: 2026-06-26.
- Planner: `npm run --silent page:refresh:batch -- --limit 12 --max-workers 3 --pages-per-worker 4 --json`.
- Scope: first live non-tool page-refresh batch.

## Pages Refreshed

- `/terms/`
- `/disclosure/`
- `/reports/`
- `/answers/best-ai-for-students/`
- `/answers/best-ai-for-writing-2026/`
- `/answers/best-ai-video-generator-2026/`
- `/answers/best-ai-voice-generator-2026/`
- `/compare/build/`
- `/dead/`
- `/compare/elevenlabs-vs-murf/`
- `/compare/elevenlabs-vs-wellsaid/`
- `/compare/frase-vs-marketmuse/`

## Shared Surfaces Updated

- `/answers/`
- `/compare/`
- `/categories/ai-voice/`
- `/categories/ai-seo/`
- `PAGE_REFRESH_LEDGER.md`
- `workflows/page-refresh/README.md`

AI Writing and AI Video category hubs were inspected. Both were already verified on 2026-06-26 and did not need visible copy changes for these answer-page edits.

## Workflow Improvements From This Run

- Added `--write-agent-prompts <dir>` to `scripts/page-refresh-batch.mjs` so worker and integrator prompts can be launched from exact generated files. This removes manual route-path transcription.
- Added planner test coverage for prompt-file writing.
- Fixed `scripts/audit-coverage-quality.mjs` to honor `AIPEDIA_CURRENT_DATE` or `CURRENT_DATE` so local timezone drift does not mark current-day `last_verified` values as future dates.
- Added `--allow-noindex` and `--skip-comparison-content-checks` to `scripts/qa-route.mjs` for intentional noindex interactive routes such as `/compare/build/`. Default route QA remains strict.
- Updated `workflows/page-refresh/README.md` with exact prompt-file and interactive-route guidance.

## Timing

- Planner JSON: 0.39s.
- Prompt-file generation after improvement: 0.42s.
- Worker shard 01: 4m00s.
- Worker shard 02: 6m17s.
- Worker shard 03: 2m22s.
- Parallel worker phase critical path: 6m17s.
- Ledger generate: 0.60s, then 0.57s after hub edits.
- Ledger check: 0.61s.
- Frontmatter changed: 0.13s.
- Em-dash guard: 0.20s.
- Provenance changed: 0.53s.
- Coverage-quality changed after audit fix: 0.45s.
- Facts audit: 0.49s.
- Internal-link audit: 0.47s.
- Typecheck: 13.00s.
- Build fast: 16.79s.
- Route QA content matrix: 20.39s for 17 routes x 7 widths.
- Route QA interactive builder: 2.67s for 1 route x 7 widths.

Slowest route QA samples:

- `/categories/ai-seo/` at 1366 px: 1175ms.
- `/tools/` at 1366 px: 1110ms.
- `/categories/ai-voice/` at 1366 px: 1094ms.
- `/terms/` at 1024 px: 1090ms.
- `/terms/` at 768 px: 1079ms.

## Failed Then Fixed

- `audit:coverage-quality:changed` initially failed because the audit used UTC-derived current date and treated 2026-06-26 as future. Fixed by honoring `AIPEDIA_CURRENT_DATE` and `CURRENT_DATE`.
- `qa-route` initially failed `/compare/build/` because it is intentionally noindex and interactive, while the generic comparison checks expect indexable comparison content with source links. Fixed with explicit opt-in flags for noindex and comparison-content skips.
- Manual worker prompt transcription assigned nonexistent `src/pages/reports.astro` and `src/pages/dead.astro`, even though the planner JSON had the correct `index.astro` paths. Fixed the workflow by adding prompt-file generation and documenting that prompts must not be hand-transcribed.

## Sources Checked

- FTC Endorsement Guides FAQ.
- ASA/CAP affiliate marketing guidance.
- ChatGPT pricing.
- NotebookLM school-account help.
- Google Classroom NotebookLM update.
- Claude for Education.
- Gemini for Students.
- Claude Opus 4.8.
- Claude status.
- Grammarly Pro pricing support.
- Runway API changelog.
- Google Veo API docs and Cloud migration notice.
- Cartesia Sonic-3.5 and Ink-2 launch.
- Fish Audio plans and S2.1 Pro API note.
- Voxtral TTS model docs.
- ElevenLabs pricing and API pricing.
- Murf pricing, Falcon page, Falcon 2 docs, and API docs.
- WellSaid pricing, help, API docs, and API product page.
- Frase pricing and AI Visibility help.
- MarketMuse pricing, home, content planning, inventory, and content briefs.

## Verification

- `node --check scripts/page-refresh-batch.mjs`
- `node --check scripts/audit-coverage-quality.mjs`
- `node --check scripts/qa-route.mjs`
- `npm exec --yes --package=node@24 -- node --test tests/scripts/page-refresh-batch.test.mjs`
- `node scripts/check-frontmatter.mjs --changed`
- `node scripts/guard-em-dashes.mjs`
- `npm run ledger:pages && npm run ledger:pages:check`
- `npm run audit:provenance:changed -- --json`
- `AIPEDIA_CURRENT_DATE=2026-06-26 npm run audit:coverage-quality:changed`
- `AIPEDIA_CURRENT_DATE=2026-06-26 npm run audit:facts`
- `npm run check:links`
- `npm run typecheck`
- `AIPEDIA_CURRENT_DATE=2026-06-26 npm run build:fast`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --route ... --widths 319,360,390,430,768,1024,1366 --timing-file local/tmp/page-refresh-timings/2026-06-26-route-qa-content.json`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --route /compare/build/ --widths 319,360,390,430,768,1024,1366 --allow-noindex --skip-comparison-content-checks --timing-file local/tmp/page-refresh-timings/2026-06-26-route-qa-compare-builder-after-fix.json`

## Next Optimization Targets

- Add a shard-safe worker report artifact so integrator notes, source URLs, and timing can be parsed instead of copied from chat.
- Teach `check:smart` not to recommend invalid `audit:facts --path` commands.
- Consider a route-QA policy map for intentional noindex routes so `/compare/build/` does not require flags every run.
- Keep first page-refresh batches to 12 to 24 pages until source and worker timing stabilizes, then scale toward 60.
