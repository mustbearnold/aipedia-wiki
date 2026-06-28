# AiPedia Current Status

Last updated: 2026-06-28

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

- Branch: `master`. Highest ongoing priority is daily AI and AI-tools news freshness, before affiliate expansion or broad refresh work, because the public news surface is the clearest signal that AiPedia is current. The affiliate conversion buildout remains active after the daily news pass is complete. The June 27 strict 3-day whole-site refresh target is complete. Latest affiliate slice adds `/guides/gamma-pricing-for-founders-and-consultants/`, refreshes `/tools/gamma/`, the presentation and consultant sibling guides, AI Presentation, homepage, top-layer indexes, search/LLM surfaces, source registry, and ledger. The Gamma pass browser-verified the current Individual annual prices and now flags the current Gamma source conflicts around Pro's 50 versus 60 card cap and Ultra annual availability.
- Root `DESIGN.md` now defines AiPedia's agent-readable visual identity contract, backed by `npm run design:lint` using `@google/design.md@0.3.0`. `check:smart` routes `DESIGN.md` through the existing Phase 3 design-token surface.
- Site-wide design consistency pass is verified: `src/styles/godtier-tokens.css` now aliases shared `--gt-*` shape tokens to canonical panel, card, and pill radii, and `tests/scripts/design-tokens.test.mjs` guards that bridge. Full design/build/browser verification passed on June 28, including visual smoke and route QA across 319, 360, 390, 430, 768, 1024, and 1366 px.
- `npm run qa:agent` is available as a local-only Playwright buyer-journey harness with deterministic timing, layout, CTA, disclosure, and optional PageAgent LLM metrics. Use deterministic mode for routine route QA; use `--page-agent --llm-base-url <url> --model <name>` only when a compatible local or proxied LLM endpoint is ready.
- Root project orientation is cleaned up and pushed: `INDEX.md` is the LLM-readable entrypoint, tracked specialist agents live under `.agent/specialists/`, `.agents/` remains gitignored local runtime state, and the former `.Agents/` root folder is retired.
- Specialist library now includes `expert-project-manager`, `agentic-workflow-software-engineer`, and `master-mathematician-coding-expert`.
- The TanStack rebuild is not active.
- The loop system is healthy: latest broad recorded review is 7 ok / 0 attention / 0 skipped after a fresh `npm run build:fast`.
- Comparison policy is strict: publish `vs` pages only for tools that solve the same buyer job and workflow. Cross-category or different-workflow pages must be deleted or avoided.
- Visual layout policy is strict: every rendered page must preserve grid math, spacing, containment, readable text ratios, and no horizontal overflow across mobile, tablet, and desktop.
- Top-layer and detail width parity work is complete and pushed. The homepage, top-layer indexes, and representative detail pages now share the narrow-mobile width discipline requested in browser feedback.
- News catch-up for June 18-22 is complete, and the selected lantern logo is active. The old blue/cyan brand regression was closed.
- Homepage reported issues are closed: decision-card overcrowding, source/freshness/confidence fallback labels, 319 px portal overflow, orange-brown verified panel styling, and copy density.
- The model availability tracker interruption is handled: `/trends/model-availability-churn/` is now a simple daily frontier-model availability ledger, `/` and `/news/` are marked for daily refresh, and the Codex app automation `daily-aipedia-news-and-model-availability-refresh` is active. The `/news/` daily automation explicitly requires at least three source-backed AI or AI-tool stories per run. Treat the daily news pass as the first editorial task each day: verify current sources, publish or explicitly record skipped lanes, update `/news/`, `/`, affected top-layer pages, LLM/feed/sitemap surfaces, and the ledger.
- Jun 26-28 focused news coverage is complete with three source-backed individual stories for each date and no daily desk page. Latest pass added GPT-5.6 access and benchmark-risk coverage, Newegg conversational shopping, Gemini in Sheets formula fixes, Claude Mythos and Fable access-risk updates, Sail Research agent-infrastructure funding, Claude Opus 4.7 fast-mode deprecation, and Veo Vertex AI endpoint migration. `/news/`, `/`, RSS, LLM manifests, affected category hubs, OG assets, and ledger were inspected and verified.
- Tool pages now use the shared decision-spine default: hero, decision card, plan guidance, fit, recent changes, alternatives, related comparisons, then collapsed proof/score math and full review notes. Keep future tool-page work in this format unless there is a deliberate template migration.
- The optimized tool-refresh workflow now has a committed procedure under `workflows/tool-refresh/` and a local skill mirror `$aipedia-tool-refresh-workflow` under `.agents/skills/aipedia-tool-refresh-workflow/`. Treat `workflows/` as canonical for clean clones, and keep the local skill aligned while tuning. In the Codex Windows app, use six parallel shard workers with up to 10 tools per worker because six active agents was the observed ceiling on June 24.
- The tool-refresh planner now includes registered source metadata, scoped `audit:sources` commands, shard-level `source_ids`, and a default one-day recent-refresh exclusion so overnight runs do not immediately reselect yesterday's completed high-volatility pages. Use `--include-same-day`, `--exclude-recent-days 0`, or an explicit `--exclude-verified-date` only when intentionally revisiting recent pages.
- The latest timing pass changed route QA closeout to concurrency 6 with per-route/per-width timing. Same 75-route, seven-width matrix passed at concurrency 6 after the closeout baseline at concurrency 4 took 126s.
- Non-tool page refresh now has a Rust-runner-backed repeatable workflow under `workflows/page-refresh/`. Use `npm run runner:page-refresh:plan`, `npm run runner:page-refresh:reports`, and `npm run runner:page-refresh:closeout` as the default path. The runner wraps the Node planner, writes exact worker prompts and worker JSON report scaffolds, splits standard content route QA from intentional noindex interactive route QA, aggregates worker reports, times every closeout gate, and writes local receipts.
- The first live non-tool page-refresh batch is complete and pushed: 12 routes across terms, disclosure, reports, answers, compare-builder, dead archive, and three comparison pages. The follow-up optimization pass added parseable worker reports, route-QA policy mapping, and closeout micro-timing so future speed, efficiency, quality, and accuracy reviews have structured data.
- Non-tool page-refresh batch 02 is pushed: 12 comparison and guide routes from Frase/NeuronWriter through heavy-inbox triage, parent hubs `/compare/`, `/guides/`, AI SEO, AI Presentation, AI Chatbots, AI Automation, and `PAGE_REFRESH_LEDGER.md`. Worker reports parsed 3/3 with 89 source URLs, 51 confidence labels, 29 caveats, and 75 parent surface notes. Final closeout passed in 51.528s.
- Page-refresh workflow optimization is verified: planner routes now carry explicit QA policy classes, archived noindex content remains content/frontmatter-only for QA, and the Rust report summary now emits worker efficiency metrics plus parent-surface hints.
- Non-tool page-refresh batch 03 is verified: 18 guide routes from academic writing through LinkedIn, with affected `/guides/`, `/answers/best-ai-for-writing-2026/`, AI Writing, AI Research, AI Coding, AI Design, AI Automation, AI Search, and `PAGE_REFRESH_LEDGER.md`. Worker reports parsed 6/6 with 175 report source URLs, 35 confidence labels, 21 caveats, and 41 parent notes. Final closeout passed in 62.57s wall time. One archived noindex legal-research route stayed out of indexable route QA by policy.
- The page-refresh workflow now has `npm run page:source-health`, a bounded concurrent source checker with per-source and per-page timing, per-host delay, timeout controls, and explicit access-sensitive handling for 401, 403, and 429. It is wired into `runner:page-refresh:closeout` before typecheck and can be skipped only for scoped workflow tests with `-- --skip-source-health`. A smoke run over the next two planned pages checked 21 source URLs in 5.211s and correctly flagged one existing 404: `https://www.canva.com/logo-maker/` on `/guides/best-ai-for-logo-design/`.
- Non-tool page-refresh batch 12 is pushed: the final 18 non-tool stale routes were moved to June 27 verification across guides, Anthropic, GitHub Copilot vs Supermaven, `/media-kit/`, `/workflows/design-agency-replacement/`, and `/sitemap-index.xml`. The batch replaced a slow Adobe source with the current Adobe Firefly plans and credits page.
- Final six tool refresh is verified locally: `phind`, `tome`, `semrush-demo`, `dalle`, `dext`, and `grok-code-fast` are refreshed to June 27 with affected category hubs, `/`, `/tools/`, `/categories/`, source registry, and ledger updates. Strict 3-day stale count is now 0 tracked pages. Semrush Demo remains an archived noindex route and was checked separately with `--allow-noindex`; Grok Code Fast now caveats the current xAI-docs redirect-target conflict.
- Affiliate conversion page buildout is active. Current inventory after the SaneBox demotion is 25 configured affiliate-link tools, 21 approved-live tools, and 4 configured-but-not-live tools. The 35 existing affiliate money guides have been backfilled with structured conversion metadata and anti-doorway/CTA-plan fields, bringing strict `audit:affiliate-conversion` from 245 warnings to 0. Two subagents accepted the foundation at 9.9/10 after audit hardening and committed negative tests. The Dext cluster now has five distinct first-pass buyer intents: broad receipt tool, pricing for bookkeeping firms, Dext vs Hubdoc, Dext vs AutoEntry for Sage bookkeepers, and client document collection for bookkeeping firms. CloudTalk has two first-pass phone buyer intents. Decktopus has the consultant proposal-deck buyer slice. Argil has a plan-decision slice for UGC avatar video teams focused on Classic, Pro, Scale, Enterprise, credit burn, API usage, Product Showcase, and consent risk. Gamma now has a plan-decision slice for founders, consultants, and lean teams choosing Free, Plus, Pro, or Ultra around annual prices, credits, card caps, custom domains, analytics, API access, and checkout caveats. The SaneBox pricing guide is verified as an official-link buyer guide, not a live affiliate page, while referral attribution and current commercial terms remain unvalidated. Strict affiliate audit now sees 48 money guides, 21 live affiliate tools, 0 errors, and 0 warnings.
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

Latest completed batch:

- Four-tool June 25 serial shard from the regenerated due-soon queue: `luma`, `magnific`, `meshy`, and `opusclip`.
- Affected parent hubs: AI Video, AI Image, AI Design, and AI Writing.
- Shared updates: `src/data/source-registry.json`, `PAGE_REFRESH_LEDGER.md`, and affected parent source/date summaries. Meshy's current individual ladder now includes Pro, Premium, and Ultra before Studio; Magnific API guidance now warns that pay-per-usage is marked for June 30, 2026 discontinuation.

Latest completed and pushed content batch:

- Intentional same-day revisit batch from the regenerated queue with `--include-same-day`: `consensus`, `beehiiv`, `blackbox-ai`, `browserbase`, `canva`, `castmagic`, `cline`, `cloudtalk`, `coderabbit`, `midjourney`, `notebooklm`, `qodo`, `replit-agent`, `claude`, `decktopus`, `gemini`, `grok`, `n8n`, `claude-code`, `github-copilot`, `grammarly`, `mistral-ai`, `qwen`, `capacities`, `cursor`, `hailuo`, `heygen`, `adobe-firefly`, `argil`, `augment-code`, `base44`, `captions`, `cody`, `comet`, `continue`, `copy-ai`, `crewai`, `d-id`, `hedra`, `lindy`, `mastra`, `microsoft-agent-framework`, `dia`, `figma`, `chatgpt`, `deepseek`, `meetgeek`, `elevenlabs`, `elicit`, `voxtral`, `descript`, `suno`, `synthesia`, `udio`, `bolt`, `lovable`, `mubert`, `pika`, `v0`, and `kling`.
- Material buyer updates: Replit Pro annual effective pricing corrected to $90/month; Figma gained Config 2026/agent-workspace context; Capacities gained Release 66 AI Chat Connectors 2.0; Captions was manually caught after a hand-transcribed worker prompt missed it; Synthesia Studio Express-1 avatar add-on is now primary-confirmed at $1,000/year for annual Studio users.
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

Recommended next comparison remains `amazon-q-vs-github-copilot`, but do not start it until the active freshness batch is closed or intentionally paused.

### Affiliate Conversion Page Buildout

The first new approved-tool page after the metadata foundation is complete and pushed: `/guides/dext-pricing-for-bookkeeping-firms/`. It targets Dext pricing for bookkeeping firms, links from AI Automation, and keeps the broader receipt-tool guide as a sibling rather than a duplicate cluster. Visual/mobile review accepted at 9.9/10 after the related-link polish was fixed. Accuracy/SEO review accepted at 9.9/10 after Hubdoc was narrowed to Xero-included or standalone positioning.

Latest affiliate move: the Gamma cluster is locally verified with `/guides/gamma-pricing-for-founders-and-consultants/`, a plan-decision page for founders, consultants, solo marketers, and lean teams choosing Free, Plus, Pro, or Ultra without overbuying credits, domains, analytics, or API access. It updates the Gamma tool page, the core presentation guide, the consultant guide, AI Presentation, `/guides/`, `/tools/`, `/categories/`, `/`, `/explore/`, `/search/`, `/llms.txt`, `/llms-full.txt`, source registry rows, and `PAGE_REFRESH_LEDGER.md`. The pricing page returned 403 to the raw HTTP source checker but loaded in Chromium and exposed Individual annual-billing prices at Free $0, Plus $9/seat/month, Pro $18/seat/month, and Ultra $90/seat/month. The content now preserves Gamma's current source conflict: subscription help lists Pro at 50 cards per prompt and says Ultra is only available monthly, while pricing lists Pro at 60 cards and displays annual Ultra pricing. Final focused gates passed: browser source check, changed frontmatter, strict affiliate conversion, selected live sources with the raw-pricing 403 caveat, changed provenance, date consistency, fact audit, ledger, guard, command audit, links/news/security, typecheck, `build:fast`, search/LLM surface checks, metadata/disclosure checks, QA agent metrics, and route QA across affected routes at 319, 360, 390, 430, 768, 1024, and 1366 px.

Previous affiliate move: the CloudTalk cluster is locally verified with two new guide pages: `/guides/cloudtalk-pricing-for-smb-sales-and-support-teams/` for Lite, Starter, Essential, Expert, AI Conversation Intelligence, AI Receptionist, AI Specialist, dialer, caller-ID, and spam-remediation plan math, and `/guides/best-ai-receptionist-for-smb-phone-teams/` for missed calls, after-hours routing, message capture, appointment confirmation, escalation, Retell AI, Vapi, and Intercom alternatives. It updates the CloudTalk tool page, the SMB phone-system guide, AI Automation, AI Voice, homepage, LLM surfaces, source registry, ledger, and SoftwareApplication schema pricing behavior.

### Top-Layer Visual Uplift

Shared width and card-surface work is complete. Future visual work should inspect page-specific hierarchy and copy density for `/guides/`, `/news/`, `/answers/`, `/trends/`, `/workflows/`, and high-traffic detail templates.

## Current Verification Baseline

Latest Gamma affiliate conversion slice passed:

- Chromium browser source check for Gamma pricing and Help Center pages, plus `npm run --silent audit:sources -- --json --live --limit 0 --source-id gamma-api-docs --source-id gamma-affiliate-help --source-id gamma-official --source-id gamma-subscription-help`; raw HTTP returned 403 for `gamma-official`, while Chromium loaded `https://gamma.app/pricing` and exposed the current Individual annual-billing prices.
- `npm run ledger:pages && npm run ledger:pages:check`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run guard:check`
- `npm run check:frontmatter -- --changed`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run --silent audit:affiliate-conversion -- --strict --json`
- `npm run audit:provenance:changed -- --json`
- `npm run audit:date-consistency -- --json`
- `npm run audit:facts`
- `npm run audit:commands`
- `npm run check:links`
- `npm run check:news`
- `npm run check:security`
- `npm run typecheck`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run build:fast`
- `npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /guides/gamma-pricing-for-founders-and-consultants/ --route /tools/gamma/ --route /guides/best-ai-for-presentations/ --route /guides/best-ai-tools-for-consultants/ --route /categories/ai-presentation/ --route /guides/ --route /tools/ --route /categories/ --route /`
- `npm run qa:route -- --site-dir dist-fast/client --concurrency 4 --widths 319,390,768,1024 --allow-noindex --route /search/ --route /explore/`
- `npm run qa:agent -- --site-dir dist-fast/client --concurrency 2 --widths 390,1024 --route /guides/gamma-pricing-for-founders-and-consultants/ --route /tools/gamma/ --out local/tmp/qa-agent-gamma-cluster.json`
- Generated surface checks confirmed the new guide in `/llms.txt`, `/llms-full.txt`, Gamma, presentation, consultant, category, search, and top-layer surfaces; rendered metadata checks confirmed canonical, meta description, affiliate disclosure, Gamma guide links, and current verification dates on the new guide, Gamma tool page, presentation guide, and AI Presentation category.

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
