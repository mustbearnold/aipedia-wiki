# AiPedia June 2026 Standards Remediation And Re-Review Spec

**Status:** Ready for implementation planning
**Date:** 2026-06-20
**Owner:** AiPedia maintainers + parallel agent implementers
**Trigger:** Comprehensive June 2026 standards review found current gaps in factual freshness, commercial trust, mobile-first decision surfaces, crawl integrity, and verification confidence.

---

## 1. Objective

Fix the June 2026 review findings without turning the work into one tangled mega-edit.

The implementation must use parallel subagents with narrow ownership lanes, then run one integrated verification and re-review pass. The goal is not only to patch the known failures, but to strengthen the guards so the same classes of issues are caught before shipping.

---

## 2. Review Findings To Close

The remediation is complete only when these findings are resolved or explicitly converted into tracked baseline debt:

1. Canonical Semrush page is stale while `/tools/semrush-demo/` is also crawlable.
2. Affiliate URLs can render even when `affiliate.application_status` is not approved.
3. Company flagship and sticky mobile affiliate CTAs can suppress nearby disclosure.
4. Tool, category, and comparison mobile first screens miss required decision data.
5. Internal link auditing misses broken `/compare/`, `/guides/`, `/workflows/`, `/answers/`, `/categories/`, `/companies/`, `/trends/`, `/reports/`, `/dead/`, `/glossary/`, and top-layer route links.
6. `price_history` rows and source registry entries have incomplete row-level freshness/provenance.
7. `audit:coverage-quality --all` reports baseline comparison debt, but the new-page blocking contract is not cleanly separated from baseline reporting.
8. CI and local runtime declarations disagree on Node version and build confidence.
9. `check:dist` expects Pagefind but `build:fast` deliberately skips it.
10. There is no real lint/typecheck gate.
11. Top-layer structured data and `/llms-full.txt` coverage are incomplete.
12. Mobile nav lacks dialog semantics and focus management.
13. The commercial CTA audit is too representative-route limited to catch approval/disclosure regressions.

---

## 3. Work Model

Use four parallel subagents plus one integrating main agent.

Each subagent receives:

- its lane scope
- its owned files
- explicit instruction that other agents may be editing the repo
- explicit instruction not to revert unrelated changes
- a final report naming changed files, commands run, and unresolved risks

The main agent owns:

- branch/worktree coordination
- resolving overlapping changes
- running unified verification
- final review
- final report

Subagents should run focused tests only. The main agent runs the expensive full gates after integration.

---

## 4. Lane A: Content And Provenance

### Scope

1. Make `/tools/semrush/` the only indexable Semrush tool page.
2. Merge any useful current facts from `semrush-demo` into `semrush`.
3. Remove, redirect, or noindex `semrush-demo` so it is not a duplicate crawl target.
4. Add missing `source_id` values to MeetGeek facts.
5. Add row-level `verified_at` to touched `price_history` records and define a plan for the wider 817-row baseline.
6. Add `last_checked` to touched source-registry entries and define a plan for the wider source-registry baseline.
7. Improve tool-quality audit usability for changed tool pages.

### Likely Files

- `src/content/tools/semrush.md`
- `src/content/tools/semrush-demo.md`
- `src/content/tools/meetgeek.md`
- `src/data/source-registry.json`
- `PAGE_REFRESH_LEDGER.md`
- `vercel.json`, if a redirect is chosen
- `scripts/audit-tool-quality.mjs`
- `tests/scripts/audit-tool-quality.test.mjs`
- `package.json`, only if adding a script alias

### Acceptance Criteria

- `/tools/semrush/` reflects Adobe ownership and current June 2026 Semrush facts.
- `/tools/semrush-demo/` is not an indexable duplicate.
- No touched MeetGeek fact with `verified_at` lacks a valid `source_id`.
- Touched pricing rows have `source_id` and `verified_at`.
- Touched source-registry rows have `last_checked`.
- The broader price/source freshness debt is visible as report-only baseline debt or a follow-up queue, not silently hidden.
- Ledger reflects actual refreshed pages and affected top-layer surfaces.

### Focused Verification

```powershell
npm run audit:provenance
npm run audit:freshness -- --json
npm run audit:sources
node scripts/audit-tool-quality.mjs --file src/content/tools/semrush.md
node scripts/audit-tool-quality.mjs --file src/content/tools/meetgeek.md
npm run ledger:pages:check
```

---

## 5. Lane B: Commercial Trust And Analytics

### Scope

1. Gate affiliate CTA hrefs on `application_status: approved`.
2. Fall back to official URLs for `none`, `applied`, `paused`, `rejected`, missing, or unknown affiliate states.
3. Show nearby disclosure on company flagship affiliate CTAs.
4. Show compact visible disclosure on sticky mobile affiliate CTAs without causing overflow.
5. Improve stack-builder CTA labels and event names.
6. Expand commercial CTA audit coverage for approval state, disclosure proximity, sponsored rel, and stack-builder attributes.

### Likely Files

- `src/lib/content-models/tool-page-model.ts`
- `src/components/CommercialCTA.astro`
- `src/components/godtier/StickyCTA.astro`
- `src/layouts/CompanyLayout.astro`
- `src/pages/stack-builder/index.astro`
- `src/lib/analytics/events.ts`
- `src/components/CommercialAnalytics.astro`
- `scripts/audit-commercial-cta.mjs`
- `tests/scripts/analytics-events.test.mjs`
- new focused tests under `tests/scripts/`

### Acceptance Criteria

- Non-approved affiliate records render official destination metadata and official links.
- Approved affiliate CTAs retain `rel="nofollow sponsored"` where appropriate.
- Company flagship affiliate CTA has visible disclosure and truthful trust copy.
- Sticky affiliate CTA has visible compact disclosure at 360, 390, 430, and 768 widths.
- Stack-builder row CTAs use reader-benefit labels, stable placements, and declared analytics events.
- Commercial audit fails on ungated affiliate links and missing disclosure.

### Focused Verification

```powershell
npm run test:scripts
node scripts/audit-commercial-cta.mjs --json
npm run check:quick
```

Rendered QA routes:

- `/tools/apollo/`
- `/tools/castmagic/`
- `/companies/openai/`
- `/stack-builder/?roles=solo-founder&budget=standard`

---

## 6. Lane C: SEO, Internal Links, Mobile UX, And LLM Surfaces

### Scope

1. Fix known broken internal links.
2. Expand `audit-internal-links.mjs` beyond `/tools/` and `/news/`.
3. Make tool pages satisfy the mobile first-screen law.
4. Make category pages expose best overall, free/budget, and pro/team picks in the first mobile screen.
5. Make comparison pages expose winner for most people and winner by use case in the first mobile screen.
6. Repair mobile nav accessibility.
7. Add or normalize structured data for top-layer index pages.
8. Make `/llms-full.txt` accurately cover active indexable major surfaces.

### Known Broken Links To Address

- `/compare/ahrefs-vs-semrush/`
- `/compare/surfer-seo-vs-clearscope/`
- `/compare/omniseo-vs-semrush/`
- `/compare/chatgpt-vs-perplexity/`, should likely route to `/compare/perplexity-vs-chatgpt/`
- `/guides/best-ai-voice-generator/`, likely should route to `/answers/best-ai-voice-generator-2026/` or a real guide if created

### Likely Files

- `scripts/audit-internal-links.mjs`
- `tests/scripts/audit-internal-links.test.mjs`
- `src/components/Nav.astro`
- `src/styles/global.css`
- `src/layouts/ToolLayout.astro`
- `src/layouts/CategoryLayout.astro`
- `src/layouts/ComparisonLayout.astro`
- top-layer pages under `src/pages/`
- `src/pages/llms.txt.ts`
- `src/pages/llms-full.txt.ts`
- `tests/smoke/visual-routes.spec.mjs`
- `PAGE_REFRESH_LEDGER.md`

### Acceptance Criteria

- `npm run check:links` fails on missing internal routes across markdown and Astro surfaces.
- All known broken links are fixed or removed.
- Mobile first-screen laws pass on representative tool, category, and comparison pages.
- Mobile nav has dialog semantics, label, `aria-modal`, focus trap, Escape close, backdrop close, return focus, and scroll locking.
- Top-layer pages keep unique title, description, canonical, crawlable content, and appropriate structured data.
- `/llms-full.txt` no longer claims “every active page” while omitting whole active sections.

### Focused Verification

```powershell
node --test tests/scripts/audit-internal-links.test.mjs
npm run check:links
npm run guard:check
npm run build:fast
npx playwright test tests/smoke/visual-routes.spec.mjs --config=playwright.config.mjs
```

Mobile QA widths:

- 360
- 390
- 430
- 768
- 1024+

Routes:

- `/tools/chatgpt/`
- `/categories/ai-coding/`
- `/compare/chatgpt-vs-claude/`
- `/tools/`
- `/categories/`
- `/compare/`
- `/`
- `/llms.txt`
- `/llms-full.txt`

---

## 7. Lane D: Build, CI, Coverage Quality, And Re-Review Tooling

### Scope

1. Align Node version across `.nvmrc`, `.node-version`, `package.json`, lockfile, and CI.
2. Split fast local build from full merge/deploy confidence.
3. Make `check:dist` validate the output of a full build with Pagefind present.
4. Add `lint` and `typecheck` scripts.
5. Include lint/typecheck/full build/dist check in CI or pre-ship command.
6. Keep `audit:coverage-quality --file` blocking for changed/new comparison pages.
7. Make `audit:coverage-quality --all` a baseline report or triage queue for existing debt.
8. Document the final re-review protocol for parallel subagent work.

### Likely Files

- `package.json`
- `package-lock.json`
- `.nvmrc`
- `.node-version`
- `.github/workflows/ci.yml`
- `scripts/check-dist-budget.mjs`
- `scripts/lib/built-site-dir.mjs`
- `scripts/audit-coverage-quality.mjs`
- `scripts/check-smart.mjs`
- `src/data/operator-surfaces.json`
- tests under `tests/scripts/`
- `.agent/OPERATING_RULES.md`
- `docs/agents/coverage-agent.md`

### Acceptance Criteria

- One Node version is authoritative.
- `npm run lint` and `npm run typecheck` exist and are meaningful.
- `npm run check:ci` includes quick checks, lint, typecheck, full build, and `check:dist`.
- CI no longer treats `build:fast` as final build confidence.
- `check:dist` fails if Pagefind is missing from a full-build output, but does not confuse fast-build output with production confidence.
- Coverage all-mode preserves baseline debt reporting without weakening per-file blocking behavior.
- Operator docs require final re-review after integrating parallel subagent work.

### Focused Verification

```powershell
node --check scripts/check-dist-budget.mjs
node --check scripts/audit-coverage-quality.mjs
npm run lint
npm run typecheck
npm run test:scripts
npm run audit:commands
```

---

## 8. Parallel Subagent Plan

### Dispatch

Spawn four worker subagents at once:

1. **Content/provenance worker** owns Lane A files.
2. **Commercial trust worker** owns Lane B files.
3. **SEO/mobile worker** owns Lane C files.
4. **Build/CI worker** owns Lane D files.

Each worker must:

- avoid unrelated refactors
- not revert user or other-agent work
- run only lane-focused checks
- report changed files and residual risks
- stop and report if their lane needs facts verified against current June 2026 sources

### Integration

The main agent then:

1. Reviews every worker diff.
2. Resolves conflicts.
3. Runs the unified verification suite.
4. Performs a re-review using explorer subagents.
5. Fixes any re-review blockers.
6. Produces final status with pass/fail commands and residual risk.

---

## 9. Unified Verification Suite

The final integration pass must run:

```powershell
git diff --check
npm run lint
npm run typecheck
npm run test:scripts
npm run audit:commands
npm run audit:provenance
npm run audit:facts
npm run audit:freshness
npm run audit:sources
npm run check:links
npm run check:news
npm run check:security
npm run guard:check
npm run build
npm run check:dist
npm run smoke:api
npm run smoke:visual
npm run check:ci
```

If a new lint/typecheck script is added during the work, it must be meaningful before this suite is considered green.

If full `npm run build` is too slow during development, workers may use `npm run build:fast`, but the main integration pass must run the full build.

---

## 10. Re-Review Protocol

After implementation and unified verification, spawn independent read-only reviewers:

1. **Content/provenance re-review:** Semrush, MeetGeek, pricing rows, source registry, ledger, source IDs.
2. **Commercial trust re-review:** approval-state gating, disclosures, rel attributes, analytics attributes, stack-builder CTAs.
3. **SEO/mobile re-review:** broad links, sitemap/indexability, top-layer schema, `/llms-full.txt`, mobile first-screen laws, nav accessibility.
4. **Build/tooling re-review:** Node version, CI, lint/typecheck, check:dist/Pagefind, coverage-quality split.

Each re-reviewer reports findings only. The main agent verifies any P0/P1 finding locally before final report.

Completion requires either:

- zero P0/P1 findings, or
- user-approved deferral with an issue/spec link and explicit risk.

---

## 11. Non-Goals

This remediation will not:

- rewrite the whole content corpus
- fix every legacy comparison quality issue in one pass
- redesign the site
- migrate away from Astro or Vercel
- create new affiliate relationships
- add accounts, auth, personalization, or paid features
- bypass current-date verification for volatile AI/commercial claims
- weaken guards to make the site appear green

---

## 12. Risks And Mitigations

### Risk: parallel workers overlap

Mitigation: file ownership is lane-based. The main agent integrates, not the workers.

### Risk: stronger audits reveal large baseline debt

Mitigation: changed/new pages stay blocking; existing corpus debt becomes a clear report or queue unless the user approves a larger cleanup.

### Risk: full CI becomes slower

Mitigation: keep `build:fast` for local iteration, but make full build the merge/deploy confidence path.

### Risk: commercial gating reduces affiliate revenue

Mitigation: trust wins. Non-approved links fall back to official URLs until approval is documented.

### Risk: Semrush refresh expands scope

Mitigation: update canonical page and affected hubs only; do not refresh every Semrush comparison unless it carries stale acquisition/pricing claims or broken links.

---

## 13. Completion Definition

This spec is complete when:

1. All lanes have been implemented and integrated.
2. Known June 2026 findings are resolved or converted into explicit baseline debt.
3. Fresh volatile facts touched by the work are verified against current June 2026 primary/current sources.
4. `PAGE_REFRESH_LEDGER.md` reflects every materially refreshed page and top-layer surface.
5. Unified verification suite passes or failures are documented as unrelated with evidence.
6. Independent re-review finds no unresolved P0/P1 issues.
7. Final report lists changed files, commands run, pass/fail status, and remaining risks.

---

## 14. Evidence Consulted

- Comprehensive June 2026 standards review from 2026-06-20.
- `AGENTS.md`
- `package.json`
- `.github/workflows/ci.yml`
- `.nvmrc`
- `.node-version`
- `vercel.json`
- `src/content/tools/semrush.md`
- `src/content/tools/semrush-demo.md`
- `src/content/tools/meetgeek.md`
- `src/content/tools/castmagic.md`
- `src/layouts/ToolLayout.astro`
- `src/layouts/CategoryLayout.astro`
- `src/layouts/ComparisonLayout.astro`
- `src/layouts/CompanyLayout.astro`
- `src/components/CommercialCTA.astro`
- `src/components/godtier/StickyCTA.astro`
- `src/components/Nav.astro`
- `src/pages/stack-builder/index.astro`
- `src/pages/llms-full.txt.ts`
- `scripts/audit-internal-links.mjs`
- `scripts/audit-commercial-cta.mjs`
- `scripts/audit-coverage-quality.mjs`
- `scripts/check-dist-budget.mjs`
- `scripts/audit-provenance-pricing.mjs`
- `scripts/audit-source-health.mjs`
- `PAGE_REFRESH_LEDGER.md`
