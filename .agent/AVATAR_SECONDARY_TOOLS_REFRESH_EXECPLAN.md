# Avatar Secondary Tools Refresh ExecPlan

## 1. Objective

Refresh the D-ID, Hedra, Argil, and Captions.ai tool pages so the avatar-video cluster is current as of 2026-05-08, source-backed, mobile-first, and useful for buyers coming from the new "best AI avatar video generator" guide. The goal is to remove stale pricing/model claims, improve trust, and make the next click toward an official product or stronger alternative more informed.

## 2. Current state

The affected records live in:

- `src/content/tools/d-id.md`
- `src/content/tools/hedra.md`
- `src/content/tools/argil.md`
- `src/content/tools/captions.md`
- `src/data/source-registry.json`

The pages currently contain April 2026 SEO titles, old verification language, and several risky claims:

- D-ID still lists exact old Lite/Pro/Advanced prices and unverified LLM/latency claims.
- Hedra still lists old Free/Lite/Creator/Professional pricing and credits, despite official pricing now showing Basic, Creator, Professional, Teams, and Enterprise.
- Argil still frames pricing as Creator/Business/Enterprise and repeats an unsupported 30-minute single-shot claim, while official pricing now uses Classic, Pro, Scale, and Enterprise.
- Captions.ai has generally correct plan names but needs current Scale 2x/4x, credit, iOS-pricing caveats, and current feature-gating language.

## 3. Target state

Each page should:

- Show `last_verified: 2026-05-08`.
- Use cautious, source-backed claims only.
- Use current plan names, prices, and credit ranges where official pages expose them.
- Avoid unsupported exact latency/model/API assertions.
- Give a clear verdict, best-plan recommendation, watch-out, alternatives, pricing summary, FAQ, sources, and related links.
- Keep content readable on mobile with bullets and short decision sections instead of wide comparison tables as the primary experience.

## 4. Scope

Included:

- Refresh four tool markdown pages.
- Update source registry entries for current official pages.
- Run provenance, content, build, visual smoke, and focused mobile QA.

Excluded:

- Template/component changes.
- New affiliate programs or tracking-system changes.
- New comparison pages.

## 5. Files likely affected

- `src/content/tools/d-id.md`
- `src/content/tools/hedra.md`
- `src/content/tools/argil.md`
- `src/content/tools/captions.md`
- `src/data/source-registry.json`
- `.agent/AVATAR_SECONDARY_TOOLS_REFRESH_EXECPLAN.md`

## 6. Data model impact

No schema migration. Existing frontmatter fields, `facts`, `price_history`, source IDs, and related markdown sections are reused. New source IDs may be added for D-ID API pricing and Hedra models if the refreshed pages cite those as structured sources.

## 7. SEO impact

The update removes stale "April 2026" titles/descriptions and replaces them with May 2026 titles aligned to buyer queries such as "D-ID pricing", "Hedra pricing", "Argil review", and "Captions.ai pricing". It also strengthens internal alternatives and source-backed decision language.

## 8. Conversion impact

The pages become stronger pre-click decision pages. They clarify when to use each tool, when to skip it, and what plan or official checkout path a visitor should inspect next. D-ID and Hedra are not treated as generic avatar tools; each gets a clearer buyer use case.

## 9. Mobile UX impact

The markdown is structured as short verdicts, bullet lists, pricing bullets, and FAQ blocks so the rendered tool template has crawlable, readable mobile content at 360, 390, 430, 768, and desktop widths without relying on wide markdown tables.

## 10. Implementation steps

1. Verify official facts on 2026-05-08 from D-ID, Hedra, Argil, and Captions primary sources.
2. Rewrite the four tool pages with current pricing, positioning, watch-outs, and sources.
3. Update source registry URLs and any new source IDs.
4. Run stale-claim sweeps and JSON validation.
5. Run provenance/content/build/smoke checks.
6. Open affected pages in the in-app browser and run focused mobile overflow/CTA/source QA.

## 11. Verification commands

- `node -e "JSON.parse(require('fs').readFileSync('src/data/source-registry.json','utf8')); console.log('source registry ok')"`
- `npm run audit:provenance`
- `npm run build:fast`
- `npm run check`
- `npm run smoke:visual`
- Focused browser/mobile QA for `/tools/d-id/`, `/tools/hedra/`, `/tools/argil/`, and `/tools/captions/` at 360, 390, 430, 768, and 1024 widths.

## 12. Acceptance criteria

- No stale April 2026 review titles or "Every data point above" language remains in the four pages.
- Current source-backed pricing is present or cautiously caveated where official pricing is dynamic.
- Provenance audit and build pass.
- Mobile QA finds no horizontal overflow on affected tool routes.
- Final report lists exact files changed, commands run, pass/fail status, and remaining risks.

## 13. Risks and mitigations

- Some pricing pages are dynamic or region/platform specific. Mitigation: cite official page, avoid exact prices where the static official page does not expose them, and add caveats.
- AI video model availability changes quickly. Mitigation: set high-volatility facts and short review windows.
- Full visual smoke can fail on unrelated pages. Mitigation: document any unrelated failures and still run focused QA on touched routes.

## 14. Progress log

- 2026-05-08: Verified current official sources. D-ID Studio/API pricing is dynamic, D-ID AI Agents is now at `/ai-agents/`, Hedra pricing lists Basic $15, Creator $30, Professional $75, Teams $75, Enterprise custom, Hedra models page confirms pooled credits and Veo/Kling/Hedra model routing, Argil pricing lists Classic $39, Pro $149, Scale $499, Enterprise custom with Seedance 2.0 on Pro+, and Captions pricing lists Pro $9.99, Max $24.99, Scale $69.99/$139.99/$279.99 with iOS-pricing caveat.
- 2026-05-08: Rewrote `src/content/tools/d-id.md`, `src/content/tools/hedra.md`, `src/content/tools/argil.md`, and `src/content/tools/captions.md` with May 8 verification dates, current pricing, current source-backed positioning, safer watch-outs, pricing guidance, alternatives, FAQ, and sources.
- 2026-05-08: Updated `src/data/source-registry.json` for D-ID's current Visual AI Agents URL, added D-ID API pricing, and added Hedra models as a primary official source.
- 2026-05-08: Verification passed: source registry JSON parse, `npm run audit:provenance`, `npm run build:fast`, `npm run check`, `npm run smoke:visual`, and focused mobile QA for `/tools/d-id/`, `/tools/hedra/`, `/tools/argil/`, and `/tools/captions/` at 360, 390, 430, 768, and 1024 widths.

## 15. Final report

Shipped. The avatar-video support pages now use current official May 8, 2026 facts and avoid stale April-era pricing/model claims. Remaining risk: D-ID pricing remains partly dynamic and should be checked again before any exact plan-price copy is restored; Argil has an affiliate-program signal but no configured buyer affiliate deep link yet.
