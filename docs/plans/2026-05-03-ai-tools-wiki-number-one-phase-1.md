# AIpedia #1 AI Tools Wiki Phase 1 Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Move AIpedia from a strong static Astro wiki toward a freshness-governed, canonical-fact-driven AI tools intelligence layer.

**Architecture:** Keep `src/content/` as the editorial source of truth. Centralize volatile buyer facts under tool-page `facts:` frontmatter, render those facts into comparison pages with `canonical_fact_table: true`, and use report-only audits until the existing stale backlog is reduced enough to convert them into hard build gates.

**Tech Stack:** Astro content collections, Markdown frontmatter, Node audit scripts, existing `guard:check`, project knowledge graph scripts, and generated comparison fact tables.

---

## Baseline From 2026-05-03 Audit

Repository path: `/home/mustbearnold/projects/aipedia-wiki`

Current content inventory:

- 835 markdown files in active `src/content/` source tree.
- 247 tool pages.
- 263 comparison pages.
- 92 use-case pages.
- 184 news pages.
- 15 category pages.
- 12 trend pages.
- 7 workflow pages.
- 8 dead-tool pages.
- 5 company pages.
- 1 glossary page.
- 1 report page.

Current canonical-fact coverage:

- 26 tool pages currently define `facts:` frontmatter.
- 106 of 263 comparison pages have `canonical_fact_table: true`.
- 157 comparison pages still lack generated canonical fact tables.

Current quality checks:

- `npm run guard:check`: PASS.
- `npm run check:links`: PASS, no broken `/tools/` or `/news/` links.
- `npm run check:news`: PASS, 216 recent news-to-tool cross references checked with no gaps.
- `npm run audit:comparisons`: PASS as report-only, 30 review candidates, 0 high-severity candidates.
- `npm run kg -- stats`: PASS.
- `npm run build`: PASS.

Main risk discovered:

- Freshness metadata is broadly present, but volatile facts are still repeated too widely in evergreen prose.
- New report-only stale-fact audit found 928 evergreen volatile-fact hits across 210 files.
- Breakdown: 822 GPT-5.4 hits, 11 DALL-E 3 hits, 12 DALL-E 4 hits, 5 Sora 2 current-capability hits, 78 GPT-4o review hits.
- This does not mean every hit is wrong. It means these pages contain hardcoded facts that can go stale and should be migrated to canonical data or rewritten into non-volatile language.

New guard/audit added in this phase:

- `scripts/audit-evergreen-stale-facts.mjs`
- `npm run audit:stale-evergreen`
- `npm run audit:stale-evergreen:strict`

The strict command intentionally exists but should not be wired into CI yet. Use it only after the backlog is cleaned up.

---

## Phase 1 Sprint Backlog

### Task 1: Clean the highest-risk OpenAI canonical truth cluster

**Objective:** Make OpenAI, ChatGPT, and image-generation pages consistent before broad replacements.

**Files:**

- Modify: `src/content/tools/chatgpt.md`
- Modify: `src/content/companies/openai.md`
- Modify: `src/content/categories/ai-image.md`
- Modify: `src/content/tools/gpt-image-2.md`
- Review: `src/content/tools/dalle.md`

**Steps:**

1. Read ChatGPT `facts:` frontmatter and confirm canonical current values for flagship model, image model, video support, context, pricing, and source links.
2. Update `src/content/companies/openai.md` to stop naming GPT-5.4 and DALL-E 4 as current products if ChatGPT facts say otherwise.
3. Update `src/content/categories/ai-image.md` to replace current DALL-E 3 positioning with GPT Image 2 / ChatGPT Images 2 wording.
4. Keep clearly historical DALL-E prose only in `src/content/tools/dalle.md` and ensure it points readers to GPT Image 2.
5. Run `npm run audit:stale-evergreen` and confirm the DALL-E 3 / DALL-E 4 count drops.
6. Run `npm run guard:check`.

**Acceptance criteria:**

- OpenAI current product language no longer contradicts ChatGPT facts.
- AI image category names GPT Image 2 as the OpenAI image surface, not DALL-E 3.
- Historical DALL-E page remains intact and clear.
- Guard passes.

### Task 2: Fix the 25 highest-hit stale volatile pages

**Objective:** Reduce the biggest trust leaks first.

**Priority files from audit:**

- `src/content/glossary/index.md`
- `src/content/use-cases/best-ai-tools-for-developers.md`
- `src/content/companies/openai.md`
- `src/content/tools/cursor.md`
- `src/content/tools/poe.md`
- `src/content/use-cases/best-ai-for-resume-writing.md`
- `src/content/use-cases/best-free-ai-tools.md`
- `src/content/tools/claude.md`
- `src/content/tools/perplexity.md`
- `src/content/use-cases/best-ai-for-cover-letters.md`
- `src/content/use-cases/best-ai-for-translation.md`
- `src/content/use-cases/grammarly-alternatives.md`
- `src/content/tools/github-copilot.md`
- `src/content/use-cases/best-ai-automation-platform.md`
- `src/content/use-cases/best-ai-for-code-review.md`
- `src/content/use-cases/best-ai-tools-for-sales-teams.md`
- `src/content/use-cases/best-ai-tools-for-students.md`
- `src/content/comparisons/capacities-vs-obsidian.md`
- `src/content/tools/grok.md`
- `src/content/tools/julius.md`
- `src/content/use-cases/ai-customer-support.md`
- `src/content/use-cases/best-ai-for-summarization.md`
- `src/content/use-cases/best-ai-tools-for-marketers.md`
- `src/content/use-cases/notion-ai-alternatives.md`
- `src/content/use-cases/best-ai-for-newsletter-writers.md`

**Steps:**

1. For each file, run `node scripts/audit-evergreen-stale-facts.mjs --json` and inspect the exact hits.
2. Decide per hit whether it is a current fact, historical context, or generic comparison wording.
3. For current facts, replace hardcoded model names with canonical facts or stable wording such as "OpenAI's current flagship ChatGPT model" when the exact model name is not essential.
4. For comparison pages, prefer adding tool `facts:` and `canonical_fact_table: true` over hand-editing table rows.
5. For use-case pages, avoid volatile model names in intros unless they are sourced and last-verified.
6. Re-run the audit after each batch of five files.

**Acceptance criteria:**

- Top 25 files are either cleaned or annotated for a specific canonical-fact migration.
- Total stale evergreen audit count drops materially from the 928-hit baseline.
- No page loses buyer-facing clarity.
- Guard and build pass.

### Task 3: Expand canonical facts for the top volatile tools

**Objective:** Increase reusable fact coverage before migrating more comparisons.

**Files likely to modify:**

- `src/content/tools/openrouter.md`
- `src/content/tools/perplexity.md`
- `src/content/tools/codex.md`
- `src/content/tools/poe.md`
- `src/content/tools/aider.md`
- `src/content/tools/continue.md`
- `src/content/tools/v0.md`
- `src/content/tools/bolt.md`
- `src/content/tools/lovable.md`
- `src/content/tools/gpt-image-2.md`
- `src/content/tools/runway.md`
- `src/content/tools/veo.md`
- `src/content/tools/kling.md`
- `src/content/tools/elevenlabs.md`
- `src/content/tools/midjourney.md`

**Steps:**

1. Read `src/content.config.ts` to confirm allowed `facts:` schema keys.
2. For each tool, add concise facts for flagship model, context window, pricing, image/video support, API availability, source, source label, and verified date where applicable.
3. Avoid internal editorial notes in renderable fields.
4. Run `npm run guard:check` after every 5 tools.

**Acceptance criteria:**

- Canonical-facts tool count increases from 26 to at least 40.
- No facts contain long prose or internal-only caveats.
- Guard passes.

### Task 4: Migrate 25 comparison pages to generated fact tables

**Objective:** Make comparison pages less stale and more internally consistent.

**Starting candidates:**

- `src/content/comparisons/aider-vs-github-copilot.md`
- `src/content/comparisons/beautiful-ai-vs-presentations-ai.md`
- `src/content/comparisons/bolt-vs-google-stitch.md`
- `src/content/comparisons/canva-vs-v0.md`
- `src/content/comparisons/capacities-vs-fireflies.md`
- `src/content/comparisons/capacities-vs-obsidian.md`
- `src/content/comparisons/claude-vs-elicit.md`
- `src/content/comparisons/codeium-vs-github-copilot.md`
- `src/content/comparisons/continue-vs-devin.md`
- `src/content/comparisons/cursor-vs-claude-code-vs-copilot.md`
- `src/content/comparisons/cursor-vs-lovable.md`
- `src/content/comparisons/cursor-vs-tabnine.md`
- `src/content/comparisons/perplexity-vs-phind.md`
- `src/content/comparisons/semrush-vs-surfer-seo.md`

**Steps:**

1. Prioritize pages where both tools already have `facts:`.
2. Add missing facts to the tool pages first when only one side has data.
3. Set `canonical_fact_table: true` in comparison frontmatter.
4. Remove or rewrite static At-a-Glance rows that duplicate generated facts.
5. Search the page for stale strings after each migration: `GPT-5.4`, `DALL-E 3`, `DALL-E 4`, `Sora 2`, `128K`.
6. Run `npm run guard:check` and inspect one built HTML page for empty fact cells.

**Acceptance criteria:**

- `canonical_fact_table: true` count rises from 106 to at least 131.
- No migrated page contains stale current-model rows.
- Generated table renders without half-empty rows.

### Task 5: Normalize news metadata gaps

**Objective:** Make news cross-reference automation more reliable.

**Observed issue:** 48 news files lacked an `affects` key in the audit sample. The current cross-reference checker still passes because it focuses on recent news-to-tool links, but missing `affects` limits automated propagation.

**Files:**

- News files reported by metadata audit, starting with:
  - `src/content/news/2026-04-15-jane-street-coreweave-7-billion.md`
  - `src/content/news/2026-05-01-meta-assured-robot-intelligence-acquisition.md`
  - `src/content/news/2026-04-28-amazon-join-the-chat-shopping-ai.md`
  - `src/content/news/2026-04-20-coinbase-ai-agents-slack-email-teammates.md`
  - `src/content/news/2026-04-15-zetrix-avatar-blockchain-agents.md`

**Steps:**

1. Add `affects: []` when no corresponding AIpedia tool page exists.
2. Add real slugs only when `src/content/tools/<slug>.md` exists.
3. Run `npm run check:news`.
4. Run `npm run guard:check`.

**Acceptance criteria:**

- Metadata missing count drops from 48 to 0 for required news fields.
- News checker still passes.

### Task 6: Promote stale audit into a staged quality gate

**Objective:** Prevent the backlog from growing without breaking the current build.

**Files:**

- Modify: `scripts/audit-evergreen-stale-facts.mjs`
- Modify: `package.json`
- Later modify: `.github/workflows/ci.yml`

**Steps:**

1. Keep `npm run audit:stale-evergreen` report-only until the count is manageable.
2. Add an optional baseline file after cleanup, for example `scripts/baselines/evergreen-stale-facts.json`.
3. Change the script so CI fails only if hit counts increase above baseline.
4. Once total high hits are below an editorial threshold, switch `audit:stale-evergreen:strict` into CI.

**Acceptance criteria:**

- No new volatile-fact debt can be added silently.
- Existing debt can be paid down incrementally.
- CI does not block on known backlog before cleanup.

---

## Verification Commands

Use these after every meaningful batch:

```bash
npm run audit:stale-evergreen
npm run audit:comparisons
npm run check:links
npm run check:news
npm run guard:check
npm run build
```

After build, clean unrelated generated churn unless the task explicitly updates generated assets:

```bash
git restore -- src/data/github-stats.json public/pagefind public/og
```

Then inspect:

```bash
git status --short --branch
git diff --stat
```

---

## Strategic Principle

Do not chase breadth until the freshness system is hard to break. AIpedia wins by becoming the site where current tool facts, comparison tables, news, and buyer recommendations all agree with each other.
