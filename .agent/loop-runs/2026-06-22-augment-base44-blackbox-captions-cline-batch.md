# 2026-06-22 Tool Freshness Batch: Augment, Base44, BLACKBOX, Captions, Cline

Status: complete locally, verified, not yet pushed.

## Scope

Refreshed the oldest-first tool batch selected by `npm run tool:refresh:batch -- --limit 5 --json`:

- `src/content/tools/augment-code.md`
- `src/content/tools/base44.md`
- `src/content/tools/blackbox-ai.md`
- `src/content/tools/captions.md`
- `src/content/tools/cline.md`

Affected hubs and shared surfaces:

- `src/content/categories/ai-coding.md`
- `src/content/categories/ai-design.md`
- `src/content/categories/ai-video.md`
- `src/data/source-registry.json`
- `PAGE_REFRESH_LEDGER.md`
- `.agent/CURRENT_STATUS.md`
- `.agent/PLANS.md`
- `.agent/WORK_LOG.md`

## Source Notes

- Augment: verified Business remains $100/month flat for up to 50 seats with $100 included usage, pay-as-you-go top-ups, Cosmos, CLI, MCP/native tools, SOC 2 Type II, and no AI training.
- Base44: verified annual plan cards, newer cost guide month-to-month prices, and the ongoing Free integration-credit contradiction: plan cards and billing docs say 100/month while FAQ says 500.
- BLACKBOX AI: verified $10/$20/$40 public prices and the continuing model-credit contradiction between card copy and comparison/mobile rows. Cuelinks remains unsuitable as an active affiliate CTA.
- Captions.ai: verified plan ladder, credit allowances, Pro+ rollover language with a 3x cap, narrow top-up eligibility, and model-rate examples remain materially unchanged.
- Cline: verified Open Source remains free for individual developers, inference is usage-based or BYOK, Enterprise remains custom, provider routing remains broad, and public GitHub-star signal now reads roughly 64k.

## Verification

Passed:

- `npm run ledger:pages`
- `npm run tool:refresh:batch:check -- --file src\content\tools\augment-code.md --file src\content\tools\base44.md --file src\content\tools\blackbox-ai.md --file src\content\tools\captions.md --file src\content\tools\cline.md --json`
- `npm run build:fast`
- `npm run typecheck`
- `npm run qa:route -- --route /tools/augment-code/ --route /categories/ai-coding/ --route /tools/base44/ --route /categories/ai-design/ --route /tools/blackbox-ai/ --route /tools/captions/ --route /categories/ai-video/ --route /tools/cline/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `node scripts\guard-em-dashes.mjs`
- `git diff --check`

Important loop note: `typecheck` and `build:fast` both pass, but they must run sequentially. Running them in parallel caused an Astro content data-store rename race under `node_modules/.astro`.

## Next Queue

Next batch from `npm run tool:refresh:batch -- --limit 5 --json`:

1. `coderabbit`
2. `cody`
3. `comet`
4. `d-id`
5. `hedra`

Affected parent hubs for the next batch:

- `src/content/categories/ai-coding.md`
- `src/content/categories/ai-search.md`
- `src/content/categories/ai-video.md`
