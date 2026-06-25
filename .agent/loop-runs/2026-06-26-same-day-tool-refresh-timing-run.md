# June 26 Same-Day Tool Refresh Timing Run

Status: complete locally, verified, pending commit/push.

## Scope

Ran the AiPedia tool refresh workflow on an intentional `--include-same-day` 60-tool plan from Consensus through Kling because the default planner correctly returned 0 due tools.

Tools refreshed: Consensus, Beehiiv, BLACKBOX AI, Browserbase, Canva, Castmagic, Cline, CloudTalk, CodeRabbit, Midjourney, NotebookLM, Qodo, Replit Agent, Claude, Decktopus, Gemini, Grok, n8n, Claude Code, GitHub Copilot, Grammarly, Mistral AI, Qwen, Capacities, Cursor, Hailuo, HeyGen, Adobe Firefly, Argil, Augment Code, Base44, Captions, Cody, Comet, Continue, Copy.ai, CrewAI, D-ID, Hedra, Lindy, Mastra, Microsoft Agent Framework, Dia, Figma, ChatGPT, DeepSeek, MeetGeek, ElevenLabs, Elicit, Voxtral, Descript, Suno, Synthesia, Udio, Bolt, Lovable, Mubert, Pika, v0, and Kling.

Affected parent hubs: AI Automation, AI Chatbots, AI Coding, AI Design, AI Image, AI Music, AI Notes, AI Presentation, AI Research, AI Search, AI Video, AI Voice, and AI Writing.

## Timing

- Worker collection: bounded by the slowest worker at about 45 minutes. Worker-reported shard times were about 6.5, 25, 35, 35, 40, and 45 minutes.
- Runner closeout: 185.4s total.
- Cheap gates: 26.5s total.
- Expensive gates: 158.9s total.
- Ledger generate/check: 0.56s each.
- Grouped checker: 25.4s, with per-tool audits around 0.37s each.
- Typecheck: 16.3s.
- Build fast: 16.4s.
- Route QA baseline: 126.3s at concurrency 4 for 75 routes x 7 widths.
- Route QA optimized rerun: 85.5s internal timing at concurrency 6 for the same 75 routes x 7 widths.

Timing artifacts:

- `local/tmp/aipedia-runner/receipts/2026-06-25T20-10-49Z-tool-refresh-closeout.md`
- `local/tmp/aipedia-runner/receipts/timings/2026-06-25T20-07-44Z-tool-refresh-grouped-check.json`
- `local/tmp/aipedia-runner/manual-timings/2026-06-26-route-qa-concurrency-6.json`

## Improvements Made

- `scripts/audit-tool-quality.mjs` now uses explicit/local current dates, fixing false future-date failures when the user date is ahead of UTC.
- `scripts/qa-route.mjs` now supports `--timing-file` and records route/viewport durations.
- `tools/aipedia-runner/src/main.rs` now persists route QA timing and uses route QA concurrency 6.
- Workflow docs now say to use planner-generated worker prompts verbatim and route QA concurrency 6.

## Verification

Passed:

- `node --check scripts/audit-tool-quality.mjs`
- `node --check scripts/qa-route.mjs`
- `node scripts/check-frontmatter.mjs --changed`
- `git diff --check`
- `npm run ledger:pages && npm run ledger:pages:check`
- `AIPEDIA_CURRENT_DATE=2026-06-26 npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json --timing-file local/tmp/aipedia-runner/manual-timings/2026-06-26-grouped-check.json`
- `AIPEDIA_CURRENT_DATE=2026-06-26 npm run runner:tool-refresh:closeout -- --plan .tmp-tool-refresh-batch.json --route-args .tmp-route-qa-args.txt --receipt-dir local/tmp/aipedia-runner/receipts`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 $(cat .tmp-route-qa-args.txt) --widths 319,360,390,430,768,1024,1366 --timing-file local/tmp/aipedia-runner/manual-timings/2026-06-26-route-qa-concurrency-6.json`
- `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check`
- `cargo check --manifest-path tools/aipedia-runner/Cargo.toml`

## Lessons

- Do not hand-transcribe shard file lists. Use planner-generated prompts directly.
- Route QA, not build, is now the closeout bottleneck for this workflow.
- Concurrency 6 improved route QA speed materially without reducing route or viewport coverage.
