# 2026-06-22 Argil, Canva, Replit Agent, Claude, Gemini Batch

Status: Complete locally, verified, not yet pushed.

## Scope

- `src/content/tools/argil.md`
- `src/content/tools/canva.md`
- `src/content/tools/replit-agent.md`
- `src/content/tools/claude.md`
- `src/content/tools/gemini.md`
- Parent hubs: `src/content/categories/ai-video.md`, `src/content/categories/ai-design.md`, `src/content/categories/ai-coding.md`, `src/content/categories/ai-chatbots.md`
- Shared surfaces: `src/data/source-registry.json`, `PAGE_REFRESH_LEDGER.md`, `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, `.agent/WORK_LOG.md`

## Source Checks

- Argil: pricing, API pricing, pay-as-you-go pricing, and Product Showcase docs rechecked on 2026-06-22.
- Canva: Canva AI, Pro, Business, AI Pass, AI 2.0 newsroom, AI Product Terms, Canva Shield, and Claude connector sources rechecked on 2026-06-22.
- Replit Agent: pricing, Agent docs, App Testing, Web Search, AI billing, Custom Skills, and Package Firewall sources rechecked on 2026-06-22.
- Claude: pricing, model docs, Fable/Mythos access statement, Agent SDK credit help, API/data-retention docs, web search docs, and Claude for Small Business sources rechecked on 2026-06-22.
- Gemini: Gemini API model/pricing docs, Google One AI plans, Code Assist business surface, Gemini app limits, Workspace privacy, Drive sharing, subscriptions, Android/Antigravity update, image-generation docs, and Veo 3.1 video docs were kept at 2026-06-22 verification.

## Verification

- `npm run ledger:pages`
- `npm run tool:refresh:batch:check -- --file src\content\tools\argil.md --file src\content\tools\canva.md --file src\content\tools\replit-agent.md --file src\content\tools\claude.md --file src\content\tools\gemini.md`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/argil/ --route /categories/ai-video/ --route /tools/canva/ --route /categories/ai-design/ --route /tools/replit-agent/ --route /categories/ai-coding/ --route /tools/claude/ --route /categories/ai-chatbots/ --route /tools/gemini/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`

## Notes

- `tool:refresh:batch:check` covered per-tool quality audits, changed provenance, loop freshness, ledger check, em dash guard, and `git diff --check`.
- `build:fast` passed guard, stale facts, logo, indexability, commercial CTA, sitemap, and budget checks.
- The next planner queue has no due-now tools but still has due-soon work. Continue the goal with the next batch from `npm run tool:refresh:batch -- --limit 5 --json`.
