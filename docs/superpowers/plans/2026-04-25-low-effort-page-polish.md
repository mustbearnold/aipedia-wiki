# Low Effort Page Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring every public aipedia.wiki page family up to the April 2026 premium visual system, removing low-effort remnants without destabilizing the already-strong homepage, news, tool, category, and comparison templates.

**Architecture:** Fix shared design debt first, then upgrade the highest-risk routes sequentially. The plan preserves Astro content collections as source of truth, reuses the existing `MoatLayer`, `CategoryIcon`, `ToolLogo`, `ScoreGrid`, and BaseLayout visual language, and avoids broad rewrites of strong templates.

**Tech Stack:** Astro 6, TypeScript frontmatter, existing CSS variables/design classes, static content collections, local dev server at `http://127.0.0.1:4321/`, Browser plugin visual QA.

---

## Design Bar

Every page changed by this plan must satisfy these checks:

- No emoji as primary UI iconography on public pages. Use `CategoryIcon`, existing SVG/lucide-style inline icons, or branded tool logos.
- No empty-feeling hero or one-input page without contextual navigation.
- No stale counters such as `0 verified this week` unless the number is intentionally meaningful.
- No “placeholder”, “coming soon”, “demo”, “mock”, “TODO”, or “TBD” visible to users.
- The page should feel like the same product as `/`, `/news/`, `/tools/chatgpt/`, `/categories/ai-chatbots/`, and `/compare/adobe-firefly-vs-canva/`.
- Validate with screenshots at desktop width and one narrow/mobile width for routes touched in the task.

## File Map

- Modify `src/pages/stack-builder/index.astro`: remove emoji role/category UI, rebuild the top half and empty/results states.
- Modify `src/pages/search.astro`: turn the standalone search page into a premium search command center.
- Modify `src/pages/guides/index.astro`: resolve Guides vs Use Cases naming, remove stale verification metric, improve browsing surface.
- Modify `src/pages/compare/build.astro`: upgrade empty state and suggested comparisons, align with premium compare styling.
- Modify `src/pages/about/scoring.astro`: replace emoji dimension icons and improve methodology cards.
- Modify `src/pages/404.astro`: replace trophy emoji and tighten recovery links.
- Modify `src/pages/companies/index.astro`: make the small company collection feel intentional, not thin.
- Modify `src/pages/answers/index.astro`: add stronger category grouping and trust cues.
- Optional modify `src/components/CategoryIcon.astro`: expose sizes/tones needed by stack builder and methodology pages.
- Optional create `src/components/PremiumPageHeader.astro`: shared compact header pattern if three or more pages repeat the same markup.
- Test with `npm run guard:check`.
- Avoid full `npm run build` until the end of all tasks unless a content/schema failure appears.

---

### Task 1: Shared Visual Primitives

**Files:**
- Inspect: `src/components/CategoryIcon.astro`
- Inspect: `src/components/MoatLayer.astro`
- Optional create: `src/components/PremiumPageHeader.astro`

- [ ] **Step 1: Inspect current reusable components**

Run:

```powershell
Get-Content src/components/CategoryIcon.astro
Get-Content src/components/MoatLayer.astro
Get-Content src/layouts/BaseLayout.astro -TotalCount 220
```

Expected: identify whether `CategoryIcon` can replace emoji category icons at `sm`, `md`, and `lg` sizes without new assets.

- [ ] **Step 2: Decide whether a shared header component is worth it**

Use this rule:

```text
Create PremiumPageHeader.astro only if stack-builder, search, guides, compare/build, answers, and companies would otherwise duplicate the same eyebrow/title/description/stat strip markup.
Do not create it for only one or two pages.
```

- [ ] **Step 3: If created, implement `PremiumPageHeader.astro`**

Create the component with these props:

```ts
interface Props {
  eyebrow?: string;
  eyebrowTone?: 'teal' | 'violet' | 'neutral';
  title: string;
  accent?: string;
  description?: string;
  meta?: Array<{ label: string; value: string }>;
}
```

Markup requirements:

```astro
<section class="p3-pagehead">
  {eyebrow && <div class:list={['p3-pagehead-eyebrow', `is-${eyebrowTone ?? 'teal'}`]}>{eyebrow}</div>}
  <h1 class="p3-pagehead-title">
    {title}{accent && <span>{accent}</span>}
  </h1>
  {description && <p class="p3-pagehead-copy">{description}</p>}
  {meta?.length ? (
    <div class="p3-pagehead-meta">
      {meta.map((item) => (
        <div class="p3-pagehead-stat">
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  ) : null}
</section>
```

CSS requirements:

```css
.p3-pagehead { max-width: 920px; padding: clamp(3rem, 8vw, 6rem) 0 2rem; }
.p3-pagehead-title { font-size: clamp(3rem, 7vw, 6.5rem); line-height: .94; letter-spacing: 0; }
.p3-pagehead-title span { color: var(--accent-primary); }
.p3-pagehead-copy { max-width: 760px; color: var(--text-secondary); font-size: clamp(1.05rem, 2vw, 1.35rem); line-height: 1.55; }
.p3-pagehead-meta { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); border: 1px solid var(--border); background: var(--bg-card); border-radius: 8px; overflow: hidden; }
.p3-pagehead-stat { padding: 1.15rem 1.25rem; border-right: 1px solid var(--border); }
.p3-pagehead-stat strong { display: block; font-family: var(--font-mono); font-size: 2rem; color: var(--text-primary); }
.p3-pagehead-stat span { display: block; margin-top: .25rem; text-transform: uppercase; letter-spacing: .12em; font-size: .72rem; color: var(--text-muted); }
```

- [ ] **Step 4: Verify no visual regression**

Run:

```powershell
npm run guard:check
```

Expected: content guard passes.

Commit:

```powershell
git add src/components
git commit -m "feat: add shared premium page primitives"
```

---

### Task 2: Rebuild `/stack-builder/`

**Files:**
- Modify: `src/pages/stack-builder/index.astro`
- Optional modify: `src/components/CategoryIcon.astro`

- [ ] **Step 1: Remove emoji from role and category data**

Replace role objects shaped like:

```ts
{ id: 'solo-founder', label: 'Solo Founder', emoji: '🚀', desc: 'Shipping and selling a startup alone' }
```

with:

```ts
{ id: 'solo-founder', label: 'Solo Founder', icon: 'launch', desc: 'Shipping and selling a startup alone' }
```

Use these exact role icon keys:

```ts
const roles = [
  { id: 'solo-founder',    label: 'Solo Founder',        icon: 'launch',    desc: 'Shipping and selling a startup alone' },
  { id: 'content-creator', label: 'Content Creator',     icon: 'media',     desc: 'YouTube, TikTok, podcasts, social' },
  { id: 'developer',       label: 'Developer',           icon: 'code',      desc: 'Software engineer shipping daily' },
  { id: 'marketer',        label: 'Marketer',            icon: 'growth',    desc: 'B2B or B2C growth and demand gen' },
  { id: 'student',         label: 'Student / Researcher',icon: 'research',  desc: 'Academic work, papers, thesis' },
  { id: 'designer',        label: 'Designer',            icon: 'design',    desc: 'Product, brand, or UI/UX design' },
  { id: 'agency',          label: 'Agency / Freelancer', icon: 'briefcase', desc: 'Client work across creative and ops' },
  { id: 'data-analyst',    label: 'Data Analyst',        icon: 'analytics', desc: 'Analytics, reporting, research' },
];
```

Replace `categoryEmoji` with `categoryIcon`:

```ts
const categoryIcon: Record<string, string> = {
  'ai-chatbots': 'chatbots',
  'ai-coding': 'coding',
  'ai-writing': 'writing',
  'ai-image': 'image',
  'ai-video': 'video',
  'ai-voice': 'voice',
  'ai-notes': 'notes',
  'ai-search': 'search',
  'ai-seo': 'seo',
  'ai-automation': 'automation',
  'ai-design': 'design',
  'ai-music': 'music',
  'ai-presentation': 'presentation',
  'ai-research': 'research',
};
```

- [ ] **Step 2: Upgrade the first viewport**

The top of `/stack-builder/` should communicate:

```text
Build a working AI stack.
Choose a role, budget, and workflow. aipedia assembles a sourced stack from reviewed tools, then lets you swap individual picks.
```

Add a right-side summary panel on desktop:

```text
Stack logic
1. Role need
2. Budget ceiling
3. Recent product movement
4. Substitution risk
```

Do not use a decorative card inside another card.

- [ ] **Step 3: Replace role cards with premium selectable controls**

Each role button must have:

```html
<span class="sb-role-icon" aria-hidden="true">...</span>
<span class="sb-role-title">Developer</span>
<span class="sb-role-desc">Software engineer shipping daily</span>
```

Use inline SVG icons for role icon keys. Keep dimensions stable:

```css
.sb-role-icon {
  width: 2.5rem;
  height: 2.5rem;
  display: inline-grid;
  place-items: center;
  border-radius: 8px;
  background: rgba(88, 242, 220, .08);
  border: 1px solid rgba(88, 242, 220, .2);
}
```

- [ ] **Step 4: Replace the sparkle placeholder**

Delete:

```astro
<div class="text-4xl mb-3">✨</div>
```

Replace with a premium empty state:

```astro
<section id="stack-placeholder" class="sb-empty">
  <div class="sb-empty-grid" aria-hidden="true">
    <span></span><span></span><span></span>
  </div>
  <p class="sb-empty-kicker">Awaiting inputs</p>
  <h2>Pick a role and budget to generate the stack.</h2>
  <p>The result will show categories, recommended tools, price range, and safer alternatives.</p>
</section>
```

- [ ] **Step 5: Polish generated stack output**

Generated stack sections must show:

```text
Category
Primary pick
Why it is here
Monthly price
Swap alternatives
Recently updated badge, if available
```

Make each stack category dense and scannable, closer to `/tools/[slug]/` detail quality than a wizard toy.

- [ ] **Step 6: Browser QA**

Open:

```text
http://127.0.0.1:4321/stack-builder/
```

Check:

- Desktop first viewport has no emoji.
- Selecting `Developer` + `Premium` renders results without layout shift.
- Share and copy Markdown controls still work.
- Mobile width does not overflow role buttons or budget controls.

Run:

```powershell
npm run guard:check
```

Commit:

```powershell
git add src/pages/stack-builder/index.astro src/components/CategoryIcon.astro
git commit -m "feat: polish stack builder experience"
```

---

### Task 3: Rebuild `/search/`

**Files:**
- Modify: `src/pages/search.astro`
- Inspect: `src/components/SearchModal.astro`

- [ ] **Step 1: Inspect current search implementation**

Run:

```powershell
Get-Content src/pages/search.astro
Get-Content src/components/SearchModal.astro
```

Expected: identify whether `/search/` can reuse the same data/search index conventions as the modal.

- [ ] **Step 2: Replace the bare page with a search command center**

The first viewport must contain:

```text
Search the AI tools wiki.
Tools, comparisons, news, companies, workflows, and use-case guides.
```

Use a large input, but surround it with useful context:

```text
Popular searches: ChatGPT, Claude Code, AI video, automation, free tools
Search lanes: Tools, Comparisons, News, Guides
```

- [ ] **Step 3: Add curated quick links below the input**

Render four groups:

```ts
const quickSearchGroups = [
  { label: 'Frontier assistants', links: ['ChatGPT', 'Claude', 'Gemini', 'Grok'] },
  { label: 'Build software', links: ['Cursor', 'Claude Code', 'GitHub Copilot', 'Codex'] },
  { label: 'Create media', links: ['Midjourney', 'GPT Image 2', 'Runway', 'ElevenLabs'] },
  { label: 'Operate a business', links: ['n8n', 'Zapier', 'Perplexity', 'NotebookLM'] },
];
```

Clicking a quick link should prefill the input when possible, or link to `/search/?q=<term>` if that is how the existing search page works.

- [ ] **Step 4: Add an empty state for first load**

Before the user types, show:

```text
Start with a tool, category, or problem.
Examples: "best AI coding assistant", "voice cloning", "ChatGPT alternatives"
```

Do not let the footer sit immediately under a lonely input.

- [ ] **Step 5: Browser QA**

Open:

```text
http://127.0.0.1:4321/search/
```

Check:

- Page no longer looks like a forgotten utility route.
- Search input is visible above the fold.
- Quick links are visible and fit on mobile.
- The header/footer spacing feels intentional.

Run:

```powershell
npm run guard:check
```

Commit:

```powershell
git add src/pages/search.astro src/components/SearchModal.astro
git commit -m "feat: upgrade search page"
```

---

### Task 4: Reposition `/guides/` as Use Cases

**Files:**
- Modify: `src/pages/guides/index.astro`
- Modify only if needed: `src/pages/guides/[slug].astro`

- [ ] **Step 1: Resolve naming**

Use this product language everywhere on the index:

```text
Use cases
Problem-first pages for picking tools by workflow, budget, and risk.
```

Avoid mixing:

```text
Guides
Use Cases
Best-of lists
```

Choose “Use Cases” for the page identity because the breadcrumb already points there and the content collection is `use-cases`.

- [ ] **Step 2: Remove stale metric**

Delete or replace:

```text
0 verified this week
```

Replace with a real, durable stat:

```text
92 use cases
115 tools mentioned
14 categories covered
```

- [ ] **Step 3: Improve index browsing**

Group cards by intent:

```ts
const lanes = [
  'Build software',
  'Create media',
  'Grow a business',
  'Research and study',
  'Operate workflows',
];
```

If content already has category metadata, derive lanes from it. If not, use a small explicit slug-to-lane map inside `src/pages/guides/index.astro`.

- [ ] **Step 4: Add editorial confidence surface**

Near the top, add a compact explanation:

```text
Each use case ranks tools from the same sourced catalog as the tool pages. No sponsored placements.
```

Keep it short and embedded in the layout, not as marketing copy.

- [ ] **Step 5: Browser QA**

Open:

```text
http://127.0.0.1:4321/guides/
http://127.0.0.1:4321/guides/best-ai-coding-assistant/
```

Check:

- Index does not feel dated or stale.
- Dynamic guide page remains strong.
- Breadcrumb/title language is consistent.

Run:

```powershell
npm run guard:check
```

Commit:

```powershell
git add src/pages/guides/index.astro src/pages/guides/[slug].astro
git commit -m "feat: sharpen use case hub"
```

---

### Task 5: Upgrade `/compare/build/`

**Files:**
- Modify: `src/pages/compare/build.astro`

- [ ] **Step 1: Improve empty state**

Replace the empty selection line:

```text
No tools selected yet. Search below to add the first one.
```

with:

```text
Start a comparison.
Add two to four tools. The builder will line up scores, pricing, category fit, and tradeoffs.
```

- [ ] **Step 2: Upgrade suggested comparisons**

Make suggested comparisons look like premium cards with:

```text
Comparison title
Category/lane
Tools included count
Open comparison action
```

Suggested examples:

```ts
const popularComparisons = [
  { title: 'Claude vs ChatGPT vs Gemini', lane: 'Frontier assistants', slugs: ['claude', 'chatgpt', 'gemini'] },
  { title: 'Cursor vs Claude Code vs Codex vs Windsurf', lane: 'AI coding agents', slugs: ['cursor', 'claude-code', 'codex', 'windsurf'] },
  { title: 'Midjourney vs Adobe Firefly vs Flux vs Ideogram', lane: 'Image generators', slugs: ['midjourney', 'adobe-firefly', 'flux', 'ideogram'] },
  { title: 'Perplexity vs Exa vs You.com', lane: 'AI search engines', slugs: ['perplexity', 'exa', 'you-com'] },
  { title: 'ElevenLabs vs Cartesia vs Resemble AI', lane: 'Voice generators', slugs: ['elevenlabs', 'cartesia', 'resemble-ai'] },
];
```

- [ ] **Step 3: Make the builder feel live**

Add a compact score rail preview that activates after one tool is selected:

```text
1 selected
Add one more to unlock score comparison.
```

After two tools:

```text
Comparison ready
Utility, Value, Moat, Longevity, Pricing
```

- [ ] **Step 4: Browser QA**

Open:

```text
http://127.0.0.1:4321/compare/build/
```

Check:

- First viewport no longer feels sparse.
- Search field and popular comparisons have clear hierarchy.
- Selecting tools still works.

Run:

```powershell
npm run guard:check
```

Commit:

```powershell
git add src/pages/compare/build.astro
git commit -m "feat: polish comparison builder"
```

---

### Task 6: Methodology and Recovery Pages

**Files:**
- Modify: `src/pages/about/scoring.astro`
- Modify: `src/pages/404.astro`

- [ ] **Step 1: Replace emoji dimension icons in scoring**

Replace `icon: '⚡'` and any other emoji icons with semantic keys:

```ts
const dimensions = [
  { key: 'utility', label: 'Utility', icon: 'signal', accent: 'violet' },
  { key: 'value', label: 'Value', icon: 'value', accent: 'teal' },
  { key: 'moat', label: 'Moat', icon: 'shield', accent: 'blue' },
  { key: 'longevity', label: 'Longevity', icon: 'timeline', accent: 'cyan' },
];
```

Render the icon with inline SVG or a local helper function. Keep each icon inside a fixed 40x40 visual box.

- [ ] **Step 2: Make scoring cards more data-room than blog**

Each dimension card should show:

```text
Dimension name
Score range: 1 to 10
What earns 9-10
What earns 1-3
```

- [ ] **Step 3: Replace trophy on 404**

Delete the trophy emoji in the “Top-rated AI tools” heading.

Replace with:

```astro
<span class="t2-index-dot" aria-hidden="true"></span>
```

or a simple shield/star SVG matching the current visual system.

- [ ] **Step 4: Browser QA**

Open:

```text
http://127.0.0.1:4321/about/scoring/
http://127.0.0.1:4321/404/
```

Check:

- No emoji visible.
- Cards feel consistent with tool-page score cards.
- 404 still gives useful recovery paths.

Run:

```powershell
npm run guard:check
```

Commit:

```powershell
git add src/pages/about/scoring.astro src/pages/404.astro
git commit -m "feat: refine methodology and recovery pages"
```

---

### Task 7: Strengthen Thin Hubs

**Files:**
- Modify: `src/pages/companies/index.astro`
- Modify: `src/pages/answers/index.astro`
- Optional modify: `src/pages/reports/index.astro`
- Optional modify: `src/pages/trends/index.astro`
- Optional modify: `src/pages/workflows/index.astro`

- [ ] **Step 1: Companies hub**

Keep the five-company reality, but frame it intentionally:

```text
Tracked AI companies.
Only companies with reviewed products, funding notes, and source-backed product links are listed here.
```

Add a compact stat strip:

```text
5 tracked companies
217 reviewed products
101 news items linked
```

- [ ] **Step 2: Answers hub**

Group answer cards into:

```text
Best tools
Tool comparisons
Buying decisions
Free and budget
```

Do not leave it as a flat list of generic SEO questions.

- [ ] **Step 3: Reports hub**

If `/reports/` has only one report, make the page an archive instead of pretending to be a large feed:

```text
Monthly field reports.
Long-form summaries of score movement, launches, and pricing changes.
```

Show the April report as a feature row, then add “next report” cadence copy only if it is true.

- [ ] **Step 4: Trends and workflows hubs**

Check first viewport for stale labels or overly generic card copy.

Keep the existing visual language if it passes. Only edit copy/card grouping if something reads thin.

- [ ] **Step 5: Browser QA**

Open:

```text
http://127.0.0.1:4321/companies/
http://127.0.0.1:4321/answers/
http://127.0.0.1:4321/reports/
http://127.0.0.1:4321/trends/
http://127.0.0.1:4321/workflows/
```

Check:

- No page feels like a half-filled directory.
- Thin content is framed as curated, not empty.
- Cards retain consistent radius, borders, and color palette.

Run:

```powershell
npm run guard:check
```

Commit:

```powershell
git add src/pages/companies/index.astro src/pages/answers/index.astro src/pages/reports/index.astro src/pages/trends/index.astro src/pages/workflows/index.astro
git commit -m "feat: strengthen secondary hubs"
```

---

### Task 8: Static Low-Effort Sweep

**Files:**
- Inspect all public routes under `src/pages`
- Modify only files with visible low-effort remnants

- [ ] **Step 1: Run marker scan**

Run:

```powershell
Select-String -Path src/pages/**/*.astro,src/pages/*.astro,src/components/**/*.astro -Pattern "TODO|FIXME|lorem|placeholder|coming soon|under construction|TBD|dummy|mock|demo|🚧|✨|🔥|💡|🎬|🏆|📝|🎨|🎵|⚡" -CaseSensitive:$false | Select-Object Path,LineNumber,Line
```

Expected:

```text
Only demo routes may contain demo copy.
No public production route should contain user-visible emoji placeholders.
```

- [ ] **Step 2: Fix production hits**

For each production hit:

```text
If it is user-visible copy, rewrite it.
If it is a design icon, replace it with SVG/CategoryIcon.
If it is code-only and harmless, leave it.
If it is in demo-* route, leave it.
```

- [ ] **Step 3: Route status spot-check**

Run:

```powershell
$routes = @(
  '/', '/news/', '/compare/', '/compare/build/', '/guides/', '/categories/', '/tools/chatgpt/',
  '/companies/', '/answers/', '/reports/', '/trends/', '/workflows/', '/stack-builder/',
  '/search/', '/about/', '/about/editorial/', '/about/scoring/', '/media-kit/', '/privacy/', '/terms/', '/404/'
)
foreach ($route in $routes) {
  $res = Invoke-WebRequest -Uri "http://127.0.0.1:4321$route" -UseBasicParsing -TimeoutSec 15
  "$route $($res.StatusCode)"
}
```

Expected: every listed route returns `200`.

- [ ] **Step 4: Browser screenshot pass**

Use the in-app browser to capture desktop screenshots for:

```text
/stack-builder/
/search/
/guides/
/compare/build/
/about/scoring/
/companies/
/answers/
/reports/
```

Then capture mobile/narrow screenshots for:

```text
/stack-builder/
/search/
/guides/
/compare/build/
```

Expected: no text overlap, no accidental empty first viewport, no emoji icons, no inconsistent palette.

- [ ] **Step 5: Final verification**

Run:

```powershell
npm run guard:check
```

Only after all visual QA passes, run the full build once:

```powershell
npm run build
```

Expected:

```text
guard-content passes
astro build completes
pagefind generation completes
```

Commit:

```powershell
git add src/pages src/components docs/superpowers/plans/2026-04-25-low-effort-page-polish.md
git commit -m "chore: complete low effort page polish"
```

---

## Recommended Execution Order

1. Task 1: shared primitives.
2. Task 2: `/stack-builder/`, because it is the biggest visual mismatch.
3. Task 3: `/search/`, because the user already called it out and it affects global navigation.
4. Task 4: `/guides/`, because it has stale product positioning.
5. Task 5: `/compare/build/`, because `/compare/` and comparison detail pages are strong but the builder lags.
6. Task 6: methodology and 404 cleanup.
7. Task 7: thin hub strengthening.
8. Task 8: final sweep and single full build.

## Self-Review

- Spec coverage: covers every low-effort family identified in the audit: stack builder, search, guides/use cases, compare builder, scoring, 404, companies, answers, reports, trends, workflows.
- Placeholder scan: this plan intentionally references banned marker words only inside scan commands and replacement instructions; implementation tasks require removing them from production UI.
- Type consistency: role icon keys and category icon keys are explicitly named in Task 2; later tasks do not introduce conflicting APIs.
- Verification: each task has route-specific browser QA plus `npm run guard:check`; full `npm run build` is deferred to the final sweep to respect the user preference against repeated builds.
