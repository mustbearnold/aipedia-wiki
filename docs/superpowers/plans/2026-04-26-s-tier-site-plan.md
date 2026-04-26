# S+++ Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make aipedia.wiki release-clean, trust-dense, fast, searchable, and operationally credible enough to deserve S+++ status across engineering, editorial, SEO, product UX, security, and maintainability.

**Architecture:** Treat this as a staged quality program, not one oversized feature. First make the build and deployment path deterministic. Then strengthen trust artifacts and content evidence. Then improve decision UX, performance, and production operations. Each task below should land in its own commit so regressions are easy to bisect.

**Tech Stack:** Astro 6, Cloudflare Pages/Workers, D1, Pagefind, Tailwind 4, Node 22, built-in Node test runner for script-level checks, GitHub Actions for CI.

---

## S+++ Definition

The website reaches S+++ only when these gates are all true:

- `npm ci` completes on a clean checkout.
- `npm run guard:check` completes on Windows and Linux.
- `npm run build` completes from a clean checkout with no manual guard bypass.
- Pagefind output in the deploy directory is fresh and under 10 MB unless the corpus grows enough to justify a documented budget increase.
- `npm audit --audit-level=moderate` reports zero vulnerabilities.
- `node scripts/audit-internal-links.mjs` is clean.
- `node scripts/audit-news-xrefs.mjs` is clean or folded into `npm run guard:check`.
- Every high-volatility comparison renders canonical fact data instead of hardcoded model, pricing, context-window, or availability claims.
- Public trust surfaces match the live corpus counts and current operating model.
- Search supports meaningful filtering by type, category, pricing, score band, and freshness.
- Production-facing APIs fail closed for missing CAPTCHA, missing rate-limit storage, or missing secrets.
- Core route screenshots are checked on desktop and mobile before promotion.

## Operating Rules

- Use the live project path for this plan: `C:\Users\mustb\Projects\moaw\aipedia-wiki`.
- Implement on `master`, per user instruction.
- Keep generated-file churn separate from hand edits.
- Commit at the end of every task.
- Do not edit `../wikis/ai-tools.legacy-backup-2026-04-17/`.
- Do not replace `src/pages/index.astro` with a demo page.
- Do not surface affiliate details in reader-facing copy.

## File Map

Foundation files:

- Modify: `scripts/guard-stale-facts.mjs` for CRLF-safe parsing.
- Modify: `package.json` for deterministic build, test, audit, and CI commands.
- Create: `scripts/build-pagefind.mjs` for clean Pagefind generation in the deploy tree.
- Create: `.github/workflows/ci.yml` for clean-checkout verification.
- Modify: `package-lock.json` after dependency and script changes.

Security and platform files:

- Modify: `src/layouts/BaseLayout.astro` to remove Google Fonts calls.
- Modify: `src/styles/global.css` to self-host installed fonts.
- Modify: `public/_headers` to keep CSP aligned with actual assets.
- Modify: `src/pages/api/subscribe.ts` and `functions/api/reviews/submit.ts` to allow CAPTCHA bypass only on local development hosts.
- Modify: `functions/api/tool-finder.ts` to remove hardcoded volatile facts and fail closed when rate limiting is unavailable in production.

Trust and content files:

- Modify: `src/pages/llms.txt.ts` to compute live counts.
- Modify: `SETUP-D1-AND-FINDER.md` and `REVIEWS-SETUP.md` to match actual shipped routes.
- Modify: `src/content.config.ts` only if new canonical fact fields are needed.
- Modify: high-volatility tool files in `src/content/tools/`.
- Modify: high-volatility comparison files in `src/content/comparisons/`.

Search and product files:

- Modify: `src/layouts/ToolLayout.astro`, `src/layouts/ComparisonLayout.astro`, `src/layouts/ArticleLayout.astro`, and list pages to emit Pagefind metadata.
- Modify: `src/pages/search.astro` to expose filter controls.
- Modify: `src/components/SearchModal.astro` only after the full search page works.
- Create: `src/pages/tool-finder.astro` if the API remains in scope after security cleanup.

Verification files:

- Create: `scripts/check-dist-budget.mjs`.
- Create: `tests/smoke/visual-routes.spec.mjs` if Playwright is added.
- Modify: `README.md` with real project commands.

---

### Task 1: Confirm Master and Capture Baseline

**Files:**

- No source files changed in this task.

- [x] **Step 1: Confirm the working branch**

Run:

```powershell
git branch --show-current
```

Expected: `master`.

- [x] **Step 2: Capture current verification failures**

Run:

```powershell
npm ci
npm run guard:check
npm run build
npm audit --audit-level=moderate
node scripts/audit-internal-links.mjs
node scripts/audit-news-xrefs.mjs
```

Expected current state:

- `npm ci` passes.
- `npm run guard:check` fails in `scripts/guard-stale-facts.mjs`.
- `npm run build` fails during `prebuild`.
- `npm audit --audit-level=moderate` fails with Astro/PostCSS advisories.
- `node scripts/audit-internal-links.mjs` passes.
- `node scripts/audit-news-xrefs.mjs` fails with 43 gaps.

- [x] **Step 3: Confirm no source changes from baseline capture**

Run:

```powershell
git status --short
```

Expected: only intentionally added plan files are changed.

---

### Task 2: Make the Stale-Fact Guard Cross-Platform

**Files:**

- Modify: `scripts/guard-stale-facts.mjs`

- [x] **Step 1: Verify the current CRLF failure**

Run:

```powershell
npm run guard:check
```

Expected: fails and reports missing `facts.*.value` for `src/content/tools/chatgpt.md`.

- [x] **Step 2: Patch frontmatter splitting**

In `scripts/guard-stale-facts.mjs`, replace the frontmatter extraction inside `readMarkdownFiles` with CRLF-safe logic:

```js
      const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const body = frontmatter ? raw.slice(frontmatter[0].length) : raw;
```

- [x] **Step 3: Run the guard again**

Run:

```powershell
npm run guard:check
```

Expected: `guard-content` passes and `guard-stale-facts` reports canonical ChatGPT facts present.

- [x] **Step 4: Check that no content files changed**

Run:

```powershell
git status --short
```

Expected: only `scripts/guard-stale-facts.mjs` is changed.

- [x] **Step 5: Commit**

Run:

```powershell
git add scripts/guard-stale-facts.mjs
git commit -m "fix: make stale fact guard crlf safe"
```

---

### Task 3: Make Pagefind Build Output Deterministic

**Files:**

- Create: `scripts/build-pagefind.mjs`
- Modify: `package.json`
- Modify: `package-lock.json` only if npm changes it during script normalization

- [x] **Step 1: Measure current output size**

Run:

```powershell
node -e "const fs=require('fs'),path=require('path');function walk(d){let a=[];if(!fs.existsSync(d))return a;for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);a=e.isDirectory()?a.concat(walk(p)):a.concat(p)}return a}for(const d of ['public/pagefind','dist/pagefind','dist/client/pagefind']){const files=walk(d);const bytes=files.reduce((s,p)=>s+fs.statSync(p).size,0);console.log(d,files.length,Math.round(bytes/1024/1024)+'MB')}}"
```

Expected current signal: `public/pagefind` and `dist/client/pagefind` are far larger than fresh `dist/pagefind`.

- [x] **Step 2: Create the clean Pagefind script**

Create `scripts/build-pagefind.mjs` with this content:

```js
#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST_CLIENT = join(PROJECT_DIR, 'dist', 'client');
const DIST_PAGEFIND = join(DIST_CLIENT, 'pagefind');
const PUBLIC_PAGEFIND = join(PROJECT_DIR, 'public', 'pagefind');

function removeDir(path) {
  if (existsSync(path)) rmSync(path, { recursive: true, force: true });
}

function dirBytes(path) {
  if (!existsSync(path)) return 0;
  let total = 0;
  const stack = [path];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    const stat = statSync(current);
    if (stat.isDirectory()) {
      for (const name of fs.readdirSync(current)) stack.push(join(current, name));
    } else {
      total += stat.size;
    }
  }
  return total;
}

import fs from 'node:fs';

if (!existsSync(DIST_CLIENT)) {
  console.error('[build-pagefind] dist/client does not exist. Run astro build first.');
  process.exit(2);
}

removeDir(DIST_PAGEFIND);
removeDir(join(PROJECT_DIR, 'dist', 'pagefind'));

const pagefindRunner = join(PROJECT_DIR, 'node_modules', 'pagefind', 'lib', 'runner', 'bin.cjs');
const result = spawnSync(process.execPath, [pagefindRunner, '--site', DIST_CLIENT, '--output-path', DIST_PAGEFIND], {
  stdio: 'inherit',
  cwd: PROJECT_DIR,
});

if (result.status !== 0) process.exit(result.status ?? 1);

removeDir(PUBLIC_PAGEFIND);
mkdirSync(PUBLIC_PAGEFIND, { recursive: true });
cpSync(DIST_PAGEFIND, PUBLIC_PAGEFIND, { recursive: true });

const mb = Math.round(dirBytes(DIST_PAGEFIND) / 1024 / 1024);
console.log(`[build-pagefind] wrote dist/client/pagefind and public/pagefind (${mb}MB)`);
```

- [x] **Step 3: Replace the build script**

In `package.json`, replace the `build` script with:

```json
"build": "node scripts/copy-content.mjs && astro build && node scripts/build-pagefind.mjs"
```

- [x] **Step 4: Run the build**

Run:

```powershell
npm run build
```

Expected: build completes and Pagefind reports output under `dist/client/pagefind`.

- [x] **Step 5: Verify output size**

Run:

```powershell
node -e "const fs=require('fs'),path=require('path');function walk(d){let a=[];if(!fs.existsSync(d))return a;for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);a=e.isDirectory()?a.concat(walk(p)):a.concat(p)}return a}for(const d of ['public/pagefind','dist/client/pagefind']){const files=walk(d);const bytes=files.reduce((s,p)=>s+fs.statSync(p).size,0);console.log(d,files.length,Math.round(bytes/1024/1024)+'MB')}}"
```

Expected: both directories are fresh and roughly the same size.

- [x] **Step 6: Commit**

Run:

```powershell
git add package.json package-lock.json scripts/build-pagefind.mjs public/pagefind
git commit -m "fix: generate pagefind deterministically"
```

---

### Task 4: Upgrade Vulnerable Dependencies

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`

- [x] **Step 1: Confirm current advisories**

Run:

```powershell
npm audit --audit-level=moderate
```

Expected: advisories for Astro, PostCSS, and `@astrojs/cloudflare`.

- [x] **Step 2: Apply safe patch upgrades**

Run:

```powershell
npm install astro@^6.1.6 @astrojs/cloudflare@^13.1.10 postcss@^8.5.10
```

Expected: lockfile updates without changing the framework family.

Implemented with current compatible floors: `astro@^6.1.9`, `@astrojs/cloudflare@^13.2.1`, `@tailwindcss/vite@^4.2.4`, `tailwindcss@^4.2.4`, and `wrangler@^4.85.0`; `npm audit fix` lifted transitive `postcss` to a safe version.

- [x] **Step 3: Re-run audit and build**

Run:

```powershell
npm audit --audit-level=moderate
npm run guard:check
npm run build
```

Expected: audit reports zero moderate-or-higher vulnerabilities; guards and build pass.

- [x] **Step 4: Commit**

Run:

```powershell
git add package.json package-lock.json
git commit -m "chore: upgrade patched astro dependencies"
```

---

### Task 5: Add CI for Clean-Checkout Reality

**Files:**

- Create: `.github/workflows/ci.yml`
- Modify: `package.json`

- [x] **Step 1: Add script aliases**

In `package.json`, add:

```json
"check:links": "node scripts/audit-internal-links.mjs",
"check:news": "node scripts/audit-news-xrefs.mjs",
"check:security": "npm audit --audit-level=moderate",
"check": "npm run guard:check && npm run check:links && npm run check:news && npm run check:security"
```

- [x] **Step 2: Create GitHub Actions workflow**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Use Node 22
        uses: actions/setup-node@v4
        with:
          node-version: '22.12.0'
          cache: npm

      - name: Install
        run: npm ci

      - name: Guards and audits
        run: npm run check

      - name: Build
        run: npm run build
```

- [x] **Step 3: Run the CI command locally**

Run:

```powershell
npm run check
npm run build
```

Expected: both pass before the workflow is committed. If `check:news` still fails, move Task 7 before this task and commit CI after news crossrefs are fixed.

- [x] **Step 4: Commit**

Run:

```powershell
git add package.json .github/workflows/ci.yml
git commit -m "ci: verify guards audits and build"
```

---

### Task 6: Fix News Cross-Reference Debt

**Files:**

- Modify: affected files under `src/content/tools/`
- Modify: `scripts/audit-news-xrefs.mjs` only if the audit needs clearer output

- [x] **Step 1: Generate the current gap list**

Run:

```powershell
node scripts/audit-news-xrefs.mjs
```

Expected: reports the current gap table.

- [x] **Step 2: Add a "Recent signals" section to high-traffic affected tools**

For each affected high-traffic tool (`chatgpt`, `claude`, `claude-code`, `claude-design`, `codex`, `gemini`, `github-copilot`, `deepseek`, `grok`, `cohere`), add or update a section in the body:

```markdown
## Recent signals

- [April 25, 2026 news desk](/news/2026-04-25-ai-news-catchup/): summary of the relevant market update for this tool.
```

Use the exact news slug reported by `node scripts/audit-news-xrefs.mjs`. Keep each bullet factual and short.

- [x] **Step 3: Re-run the audit after each tool**

Run:

```powershell
node scripts/audit-news-xrefs.mjs
```

Expected: the gap count decreases after each edited tool.

- [x] **Step 4: Finish with a clean audit**

Run:

```powershell
node scripts/audit-news-xrefs.mjs
npm run guard:check
```

Expected: both commands pass.

- [x] **Step 5: Commit**

Run:

```powershell
git add src/content/tools scripts/audit-news-xrefs.mjs
git commit -m "content: link recent news signals from tool pages"
```

---

### Task 7: Make Public Trust Surfaces Dynamic

**Files:**

- Modify: `src/pages/llms.txt.ts`
- Modify: `README.md`
- Modify: `SETUP-D1-AND-FINDER.md`
- Modify: `REVIEWS-SETUP.md`
- Modify: `SAFETY.md` if floors or retired collections changed

- [x] **Step 1: Replace hardcoded corpus counts in `llms.txt.ts`**

In `src/pages/llms.txt.ts`, after collections are loaded, add:

```ts
  const tools = await getCollection('tools').catch(() => []);
  const comparisons = await getCollection('comparisons').catch(() => []);
  const useCases = await getCollection('use-cases').catch(() => []);
```

Then replace the static summary line with:

```ts
  lines.push(`> Independent AI tools encyclopedia maintained by aipedia.wiki Editorial. ${tools.length} tool pages across ${activeCategories.length} categories, ${comparisons.length} head-to-head comparisons, ${useCases.length} use-case guides. Public pages carry verification metadata and editorial sourcing controls.`);
```

- [x] **Step 2: Fix stale setup claims**

Update `SETUP-D1-AND-FINDER.md` so it says:

```markdown
## Current status

- Reviews API functions exist under `functions/api/reviews/`.
- Reviews UI exists at `/admin/reviews/`.
- Tool Finder API exists at `functions/api/tool-finder.ts`.
- Public Tool Finder UI is not present until `src/pages/tool-finder.astro` is added.
- Newsletter signup is implemented at `src/pages/api/subscribe.ts`.
```

- [x] **Step 3: Replace starter README content**

Replace the Astro starter README with a short project README:

```markdown
# aipedia.wiki

Astro site for aipedia.wiki, an AI tools encyclopedia and comparison system.

## Commands

```bash
npm ci
npm run guard:check
npm run build
npm run check
```

## Source of truth

Edit editorial content directly in `src/content/`. Do not edit the retired legacy backup tree.
```

- [x] **Step 4: Build and inspect manifests**

Run:

```powershell
npm run build
Get-Content dist/client/llms.txt -TotalCount 20
```

Expected: `/llms.txt` reports live counts, not old rounded counts.

- [x] **Step 5: Commit**

Run:

```powershell
git add src/pages/llms.txt.ts README.md SETUP-D1-AND-FINDER.md REVIEWS-SETUP.md SAFETY.md
git commit -m "docs: align trust surfaces with current site"
```

---

### Task 8: Self-Host Fonts and Align CSP

**Files:**

- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`
- Modify: `public/_headers`
- Modify: `src/pages/privacy.astro`

- [x] **Step 1: Remove Google font network calls**

In `src/layouts/BaseLayout.astro`, remove the two preconnect tags and the Google Fonts stylesheet tag.

- [x] **Step 2: Import local fonts**

At the top of `src/styles/global.css`, below `@import 'tailwindcss';`, add:

```css
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/inter/600.css';
@import '@fontsource/inter/700.css';
@import '@fontsource/inter/800.css';
@import '@fontsource/jetbrains-mono/400.css';
@import '@fontsource/jetbrains-mono/500.css';
```

Keep the existing `font-family: 'Geist', 'Inter', ...` temporarily only if visual QA shows it falls back cleanly. Prefer changing it to:

```css
font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
```

- [x] **Step 3: Keep CSP strict**

In `public/_headers`, keep:

```text
font-src 'self' data:;
style-src 'self' 'unsafe-inline';
```

Do not add Google font domains after removing Google Fonts.

- [x] **Step 4: Build and inspect generated CSS**

Run:

```powershell
npm run build
Select-String -Path dist/client/**/*.html -Pattern "fonts.googleapis|fonts.gstatic"
```

Expected: no matches.

- [x] **Step 5: Commit**

Run:

```powershell
git add src/layouts/BaseLayout.astro src/styles/global.css public/_headers
git commit -m "perf: self host site fonts"
```

---

### Task 9: Fail Closed for Production API Protection

**Files:**

- Modify: `src/pages/api/subscribe.ts`
- Modify: `functions/api/reviews/submit.ts`
- Modify: `functions/api/tool-finder.ts`

- [x] **Step 1: Add a shared local-host check in each API file**

Use this helper in each file:

```ts
function isLocalRequest(request: Request): boolean {
  const host = new URL(request.url).hostname;
  return host === 'localhost' || host === '127.0.0.1' || host === '::1';
}
```

- [x] **Step 2: Update Turnstile verification**

Replace permissive CAPTCHA bypass logic with:

```ts
async function verifyTurnstile(token: string, ip: string, secret: string, request: Request): Promise<boolean> {
  if (!secret) return isLocalRequest(request);
  if (!token) return false;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  form.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  });
  const data: any = await res.json();
  return !!data.success;
}
```

Update call sites to pass `request`.

- [x] **Step 3: Make Tool Finder rate limiting fail closed outside local development**

In `functions/api/tool-finder.ts`, replace DB-missing and DB-error fallbacks:

```ts
async function checkRateLimit(env: Env, ipHash: string, request: Request): Promise<boolean> {
  if (!env.DB) return isLocalRequest(request);
  try {
    await env.DB
      .prepare(
        `CREATE TABLE IF NOT EXISTS finder_usage (
          ip_hash TEXT NOT NULL,
          created_at INTEGER NOT NULL DEFAULT (unixepoch())
        )`,
      )
      .run();
    const recent = await env.DB
      .prepare(
        `SELECT COUNT(*) AS n FROM finder_usage
         WHERE ip_hash = ? AND created_at > unixepoch() - 86400`,
      )
      .bind(ipHash)
      .first<{ n: number }>();
    if ((recent?.n ?? 0) >= 20) return false;
    await env.DB.prepare('INSERT INTO finder_usage (ip_hash) VALUES (?)').bind(ipHash).run();
    return true;
  } catch {
    return false;
  }
}
```

- [x] **Step 4: Remove hardcoded volatile model facts from Tool Finder**

In `functions/api/tool-finder.ts`, replace the `Current flagship models...` rule with:

```ts
- Use aipedia.wiki pages and citations for model, pricing, and feature facts. Do not invent current flagship versions or context windows.
```

- [x] **Step 5: Build**

Run:

```powershell
npm run build
```

Expected: build passes.

- [x] **Step 6: Commit**

Run:

```powershell
git add src/pages/api/subscribe.ts functions/api/reviews/submit.ts functions/api/tool-finder.ts
git commit -m "security: fail closed for protected api routes"
```

---

### Task 10: Add Pagefind Metadata and Search Filters

**Files:**

- Modify: `src/layouts/ToolLayout.astro`
- Modify: `src/layouts/ComparisonLayout.astro`
- Modify: `src/layouts/ArticleLayout.astro`
- Modify: `src/pages/search.astro`

- [x] **Step 1: Add metadata to tool pages**

Inside `ToolLayout.astro`, within the page body and marked `data-pagefind-ignore`, add:

```astro
<div class="sr-only" data-pagefind-ignore>
  <span data-pagefind-filter="Type">Tool</span>
  {catLabel && <span data-pagefind-filter="Category">{catLabel}</span>}
  {f.pricing_model && <span data-pagefind-filter="Pricing">{f.pricing_model}</span>}
  {f.status && <span data-pagefind-filter="Status">{f.status}</span>}
  {overall >= 9 && <span data-pagefind-filter="Score">9+</span>}
  {overall >= 8 && overall < 9 && <span data-pagefind-filter="Score">8-8.9</span>}
  {overall < 8 && <span data-pagefind-filter="Score">Below 8</span>}
</div>
```

- [x] **Step 2: Add metadata to comparison pages**

Inside `ComparisonLayout.astro`, add:

```astro
<div class="sr-only" data-pagefind-ignore>
  <span data-pagefind-filter="Type">Comparison</span>
  {tools.map((t) => <span data-pagefind-filter="Tool">{t.title}</span>)}
  {winningTool && <span data-pagefind-filter="Editorial Pick">{winningTool.title}</span>}
</div>
```

- [x] **Step 3: Add metadata to article pages**

Inside `ArticleLayout.astro`, add a `type` prop defaulting to `Article` and render:

```astro
<div class="sr-only" data-pagefind-ignore>
  <span data-pagefind-filter="Type">{type}</span>
</div>
```

Pass `type="News"`, `type="Guide"`, or `type="Company"` from relevant pages in a later pass only where the page layout already knows the type.

- [x] **Step 4: Configure filters in the full search page**

In `src/pages/search.astro`, update PagefindUI config:

```js
const search = new PagefindUI({
  element: '#search',
  showSubResults: true,
  showImages: false,
  resetStyles: false,
  filters: ['Type', 'Category', 'Pricing', 'Status', 'Score'],
});
```

- [x] **Step 5: Rebuild Pagefind and verify filters**

Run:

```powershell
npm run build
Select-String -Path dist/client/pagefind/pagefind-entry.json -Pattern "filters"
```

Expected: Pagefind output contains filter metadata.

Verification note: Pagefind 1.5.2 writes filter metadata into `pagefind/filter/*.pf_filter`; the build summary reported `Indexed 7 filters`, and the generated filter files include Type, Category, Pricing, Status, Score, Tool, and Editorial Pick.

- [x] **Step 6: Commit**

Run:

```powershell
git add src/layouts/ToolLayout.astro src/layouts/ComparisonLayout.astro src/layouts/ArticleLayout.astro src/pages/search.astro
git commit -m "feat: add filtered site search metadata"
```

---

### Task 11: Build the Public Tool Finder UI or Remove the API

**Files if keeping Tool Finder:**

- Create: `src/pages/tool-finder.astro`
- Modify: `src/components/Nav.astro`
- Modify: `functions/api/tool-finder.ts`

**Files if removing Tool Finder:**

- Delete: `functions/api/tool-finder.ts`
- Modify: `SETUP-D1-AND-FINDER.md`

- [x] **Step 1: Choose the direction**

Use this rule:

- Keep Tool Finder if `PERPLEXITY_API_KEY`, Turnstile, and D1 are configured in production.
- Remove Tool Finder if secrets are not ready or the recommendation UX is not ready for public traffic.

Chosen path: keep Tool Finder. D1 is configured in `wrangler.jsonc`; the API now fails closed outside local development, validates Turnstile, rate limits through D1, and the UI handles disabled/error states if `PERPLEXITY_API_KEY` is not present.

- [x] **Step 2A: If keeping, create `src/pages/tool-finder.astro`**

Create a page that uses `BaseLayout`, shows one textarea, renders results, and posts to `/api/tool-finder`.

Client script core:

```js
const res = await fetch('/api/tool-finder', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ query, turnstile_token }),
});
const data = await res.json();
```

Render each match as a link to `/tools/${match.slug}/`.

- [ ] **Step 2B: If removing, delete the API route**

Run:

```powershell
git rm functions/api/tool-finder.ts
```

Then update `SETUP-D1-AND-FINDER.md` to say Tool Finder is not shipped.

- [x] **Step 3: Build**

Run:

```powershell
npm run build
```

Expected: build passes and no public docs claim a missing route exists.

Verification note: `npm run build` passed after stopping the local preview server that was locking `dist/client`; Playwright checked `/tool-finder/` at 1440x900 and 390x844 with no horizontal overflow, active navigation, no nested `<main>`, and a clear preview-only API unavailable state.

- [x] **Step 4: Commit**

Run one of:

```powershell
git add src/pages/tool-finder.astro src/components/Nav.astro functions/api/tool-finder.ts
git commit -m "feat: add public tool finder"
```

or:

```powershell
git add SETUP-D1-AND-FINDER.md
git commit -m "chore: remove unshipped tool finder api"
```

---

### Task 12: Expand Canonical Facts Beyond ChatGPT

**Files:**

- Modify: `src/content.config.ts`
- Modify: `scripts/guard-stale-facts.mjs`
- Modify: selected files in `src/content/tools/`
- Modify: selected files in `src/content/comparisons/`

- [x] **Step 1: Pick the first canonical-facts cohort**

Use this first cohort:

```text
chatgpt
claude
gemini
grok
deepseek
midjourney
runway
elevenlabs
cursor
github-copilot
```

- [x] **Step 2: Add required fact keys per cohort**

In `scripts/guard-stale-facts.mjs`, expand `REQUIRED_FACTS`:

```js
const REQUIRED_FACTS = {
  chatgpt: ['flagship_model', 'context_window', 'image_generation', 'real_time_voice', 'web_browsing', 'best_paid_tier'],
  claude: ['flagship_model', 'context_window', 'best_paid_tier', 'coding_agent'],
  gemini: ['flagship_model', 'context_window', 'image_generation', 'video_generation', 'best_paid_tier'],
  grok: ['flagship_model', 'context_window', 'real_time_voice', 'best_paid_tier'],
  deepseek: ['flagship_model', 'context_window', 'best_for'],
  midjourney: ['flagship_model', 'image_generation', 'best_paid_tier'],
  runway: ['video_generation', 'best_paid_tier', 'best_for'],
  elevenlabs: ['real_time_voice', 'best_paid_tier', 'best_for'],
  cursor: ['coding_agent', 'best_paid_tier', 'best_for'],
  'github-copilot': ['coding_agent', 'best_paid_tier', 'best_for'],
};
```

- [x] **Step 3: Add facts to tool frontmatter**

For each cohort tool file in `src/content/tools/`, add frontmatter like:

```yaml
facts:
  flagship_model:
    value: "Current value from official source"
    source: "Official source URL or internal news URL"
    source_label: "Readable label"
    verified_at: 2026-04-26
```

Use official vendor docs, official pricing pages, official changelogs, or existing aipedia news pages. Do not use third-party summaries for pricing or flagship model facts.

- [x] **Step 4: Convert cohort comparisons**

For every comparison whose `tools:` includes a cohort slug, set:

```yaml
canonical_fact_table: true
```

Remove manual `## At a Glance` sections when they duplicate volatile facts.

- [x] **Step 5: Run guards and sample build**

Run:

```powershell
npm run guard:check
npm run build
```

Expected: guard passes and comparison pages render canonical fact tables.

- [x] **Step 6: Commit**

Run:

```powershell
git add src/content.config.ts scripts/guard-stale-facts.mjs src/content/tools src/content/comparisons
git commit -m "content: expand canonical volatile facts"
```

---

### Task 13: Upgrade Comparison Quality in Priority Batches

**Files:**

- Modify: selected files under `src/content/comparisons/`
- Modify: `scripts/guard-content.mjs` if comparison floors should enforce stronger quality

- [x] **Step 1: Identify priority comparisons**

Run:

```powershell
node -e "const fs=require('fs'),path=require('path');const dir='src/content/comparisons';for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.md'))){const p=path.join(dir,f),s=fs.readFileSync(p,'utf8');const body=s.replace(/^---[\\s\\S]*?---/,'');const words=body.split(/\\s+/).filter(Boolean).length;const links=(body.match(/https?:\\/\\//g)||[]).length;if(words<900||links<3)console.log(f,words,links)}"
```

Expected: prints low-depth or low-source comparisons.

- [x] **Step 2: For each priority comparison, add the full structure**

Each upgraded comparison must have:

```markdown
## Quick Answer

## Scorecard

## Where [Tool A] Wins

## Where [Tool B] Wins

## Pricing and Limits

## Current Product Signals

## Best Choice by User Type

## Sources
```

- [x] **Step 3: Preserve editorial rules**

For each edited comparison:

- No paid-placement language.
- No invented testing claim.
- Every important current claim has a source.
- Sentences stay short.
- Verdict is practical, not promotional.

- [x] **Step 4: Run checks after every 10 comparisons**

Run:

```powershell
npm run guard:check
node scripts/audit-internal-links.mjs
node scripts/audit-news-xrefs.mjs
```

Expected: all pass.

- [x] **Step 5: Commit per batch**

Run:

```powershell
git add src/content/comparisons
git commit -m "content: deepen priority comparisons"
```

---

### Task 14: Add Distribution and SEO Budget Checks

**Files:**

- Create: `scripts/check-dist-budget.mjs`
- Modify: `package.json`
- Modify: `.github/workflows/ci.yml`

- [x] **Step 1: Create the budget script**

Create `scripts/check-dist-budget.mjs`:

```js
#!/usr/bin/env node

import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const budgets = [
  { path: join(PROJECT_DIR, 'dist', 'client', 'pagefind'), maxMb: 10 },
  { path: join(PROJECT_DIR, 'dist', 'client', 'index.html'), maxMb: 0.3 },
  { path: join(PROJECT_DIR, 'dist', 'client', 'tools', 'index.html'), maxMb: 0.7 },
];

function bytes(path) {
  if (!existsSync(path)) return 0;
  const stat = statSync(path);
  if (!stat.isDirectory()) return stat.size;
  let total = 0;
  for (const name of readdirSync(path)) total += bytes(join(path, name));
  return total;
}

let failed = false;
for (const budget of budgets) {
  const mb = bytes(budget.path) / 1024 / 1024;
  const label = budget.path.replace(PROJECT_DIR, '.');
  console.log(`${label}: ${mb.toFixed(2)}MB / ${budget.maxMb}MB`);
  if (mb > budget.maxMb) failed = true;
}

if (failed) process.exit(2);
```

- [x] **Step 2: Add the script alias**

In `package.json`, add:

```json
"check:dist": "node scripts/check-dist-budget.mjs"
```

- [x] **Step 3: Run after build in CI**

In `.github/workflows/ci.yml`, add:

```yaml
      - name: Distribution budget
        run: npm run check:dist
```

- [x] **Step 4: Verify locally**

Run:

```powershell
npm run build
npm run check:dist
```

Expected: budgets pass.

- [x] **Step 5: Commit**

Run:

```powershell
git add scripts/check-dist-budget.mjs package.json .github/workflows/ci.yml
git commit -m "ci: enforce distribution budgets"
```

---

### Task 15: Establish Visual QA Smoke Tests

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `tests/smoke/visual-routes.spec.mjs`
- Modify: `.github/workflows/ci.yml`

- [ ] **Step 1: Add Playwright**

Run:

```powershell
npm install -D @playwright/test
npx playwright install chromium
```

- [ ] **Step 2: Create smoke test file**

Create `tests/smoke/visual-routes.spec.mjs`:

```js
import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/tools/chatgpt/',
  '/tools/claude/',
  '/compare/chatgpt-vs-claude/',
  '/tools/',
  '/search/',
];

for (const route of routes) {
  test(`route renders without obvious breakage: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow).toBe(false);
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });
}
```

- [ ] **Step 3: Add scripts**

In `package.json`, add:

```json
"smoke:visual": "playwright test tests/smoke/visual-routes.spec.mjs --config=playwright.config.mjs"
```

Create `playwright.config.mjs`:

```js
export default {
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: true,
    timeout: 120000,
  },
  use: {
    baseURL: 'http://127.0.0.1:4321',
    viewport: { width: 1280, height: 900 },
  },
};
```

- [ ] **Step 4: Run the smoke test locally**

Run:

```powershell
npm run smoke:visual
```

Expected: all listed routes pass with no horizontal overflow.

- [ ] **Step 5: Add CI only after it is stable locally**

In `.github/workflows/ci.yml`, add:

```yaml
      - name: Install Playwright Chromium
        run: npx playwright install chromium

      - name: Visual smoke
        run: npm run smoke:visual
```

- [ ] **Step 6: Commit**

Run:

```powershell
git add package.json package-lock.json playwright.config.mjs tests/smoke/visual-routes.spec.mjs .github/workflows/ci.yml
git commit -m "test: add visual smoke coverage"
```

---

### Task 16: Real Benchmark Lab, Only With Evidence

**Files:**

- Create: `docs/benchmarks/methodology.md`
- Create: `benchmarks/fixtures/README.md`
- Create: `benchmarks/results/.gitkeep`
- Create: `scripts/benchmark-manifest.mjs`
- Modify: `src/content.config.ts` only after benchmark artifacts exist

- [ ] **Step 1: Document benchmark rules**

Create `docs/benchmarks/methodology.md`:

```markdown
# Benchmark Methodology

aipedia.wiki publishes benchmark pages only when the raw prompt, date, tool version, tier, result artifact, scoring rubric, and reviewer notes are saved in the repository.

Benchmarks must include:

- Tool slug
- Tool tier
- Run date
- Prompt or input fixture
- Output artifact path
- Scoring rubric
- Score notes
- Known limitations

No benchmark page ships from memory, vendor marketing, or unsaved manual observation.
```

- [ ] **Step 2: Create fixture README**

Create `benchmarks/fixtures/README.md`:

```markdown
# Benchmark Fixtures

Store reusable prompts, input files, images, documents, and task descriptions here. Each benchmark result must point to the fixture it used.
```

- [ ] **Step 3: Create manifest script**

Create `scripts/benchmark-manifest.mjs`:

```js
#!/usr/bin/env node

import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), 'benchmarks', 'results');
if (!existsSync(root)) {
  console.log('[benchmark-manifest] no benchmark results directory');
  process.exit(0);
}

const files = readdirSync(root).filter((name) => name.endsWith('.json'));
console.log(`[benchmark-manifest] ${files.length} result file(s)`);
for (const file of files) console.log(`- ${file}`);
```

- [ ] **Step 4: Add no public benchmark pages yet**

Do not re-enable the retired benchmark collection until at least one complete benchmark result exists.

- [ ] **Step 5: Commit**

Run:

```powershell
git add docs/benchmarks/methodology.md benchmarks/fixtures/README.md benchmarks/results/.gitkeep scripts/benchmark-manifest.mjs
git commit -m "docs: define evidence-first benchmark lab"
```

---

## Final Verification Gate

After all tasks in this plan are complete, run:

```powershell
npm ci
npm run check
npm run build
npm run check:dist
npm run smoke:visual
node scripts/audit-internal-links.mjs
node scripts/audit-news-xrefs.mjs
npm audit --audit-level=moderate
git status --short
```

Expected:

- All commands pass.
- `git status --short` is clean after the final commit.
- The site builds from a clean checkout without guard bypass.
- Search filters exist in Pagefind output.
- Public trust docs match actual routes and counts.

## Execution Handoff

Plan complete. Two execution options:

**1. Subagent-Driven (recommended)** - Dispatch a fresh subagent per task, review between tasks, and keep commits small.

**2. Inline Execution** - Execute tasks in this session using checkpoints between phases.

Recommended first execution batch:

1. Task 1: Confirm master and baseline.
2. Task 2: CRLF-safe stale-fact guard.
3. Task 3: deterministic Pagefind.
4. Task 4: dependency security.
5. Task 6: news cross-reference cleanup.
6. Task 5: CI once all checks pass.
