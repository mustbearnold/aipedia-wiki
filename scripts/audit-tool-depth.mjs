#!/usr/bin/env node
// Phase 2 quality-deepening detector + gate for EXISTING tool pages.
//
// Unlike audit-tool-quality (which gates a brand-new page on completeness and
// freshness), this measures editorial DEPTH on pages that already exist and
// ranks the highest-value pages that fall short, so deepening effort goes where
// it matters most. Importance = how many comparison pages reference the tool.
//
//   --gaps            rank active tool pages by (importance high, depth low)
//   --check --file X  strict deepening gate for one page (exit 1 on any gap)
//   --json            machine-readable output
//
// Read-only. The deepening bar (all must hold for a "god-tier" page):
//   word_count >= 1100, the seven core sections present, both decision sections
//   (when-to-pick + when-to-pick-something-else), a comparison table / "Against
//   the alternatives" section, >= 5 internal /tools or /categories links,
//   >= 4 facts with a source, and clean readability (no filler, no run-ons).

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const PROJECT_DIR = resolve(valueFor('--project-dir') || dirname(dirname(fileURLToPath(import.meta.url))));
const FILE_ARG = valueFor('--file');
const JSON_MODE = args.includes('--json');
const GAPS_MODE = args.includes('--gaps');
const CHECK_MODE = args.includes('--check');
const LIMIT = Number(valueFor('--limit') || 30);
const TOOLS_DIR = join(PROJECT_DIR, 'src', 'content', 'tools');
const COMPARE_DIRS = [join(PROJECT_DIR, 'src', 'content', 'comparisons'), join(PROJECT_DIR, 'src', 'content', 'compare')];

const MIN_WORDS = 1100;
const MIN_INTERNAL_LINKS = 5;
const MIN_FACT_SOURCES = 4;
const MAX_SENTENCE_WORDS = 50;
const CORE_SECTIONS = ['System Verdict', 'Key Facts', 'Pricing', 'Failure modes', 'Methodology', 'FAQ', 'Related'];
const FILLER_TERMS = [
  'seamless', 'seamlessly', 'game-changer', 'game-changing', 'game changer',
  'revolutionize', 'revolutionary', 'cutting-edge', 'state-of-the-art',
  'world-class', 'best-in-class', "in today's fast-paced", 'look no further',
  'unlock the power', 'harness the power', 'take it to the next level',
  'paradigm shift', 'supercharge',
];

function valueFor(name) {
  const inline = args.find((a) => a.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}
function projectPath(p) { return relative(PROJECT_DIR, p).replace(/\\/g, '/'); }
function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function listMd(dir) { return existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => join(dir, f)) : []; }
function splitFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? { fm: m[1], body: raw.slice(m[0].length) } : { fm: '', body: raw };
}
function scalar(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  if (!m) return '';
  let v = m[1].trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
  return v;
}

// Importance: number of comparison pages that mention this slug as a whole word.
function buildComparisonImpact(slugs) {
  const counts = Object.fromEntries(slugs.map((s) => [s, 0]));
  const contents = COMPARE_DIRS.flatMap(listMd).map((p) => readFileSync(p, 'utf8'));
  for (const slug of slugs) {
    const re = new RegExp(`(?<![A-Za-z0-9-])${escapeRegExp(slug)}(?![A-Za-z0-9-])`);
    counts[slug] = contents.filter((c) => re.test(c)).length;
  }
  return counts;
}

function analyze(path, importance) {
  const rel = projectPath(path);
  const raw = readFileSync(path, 'utf8');
  const { fm, body } = splitFrontmatter(raw);
  const slug = scalar(fm, 'slug') || path.split(/[\\/]/).pop().replace(/\.md$/, '');
  const status = scalar(fm, 'status');
  const words = body.replace(/[#>*|`~\-]/g, ' ').split(/\s+/).filter(Boolean).length;

  const gaps = [];
  if (words < MIN_WORDS) gaps.push(`thin body (${words}w < ${MIN_WORDS})`);

  for (const sec of CORE_SECTIONS) {
    if (!new RegExp(`^##\\s+${escapeRegExp(sec)}\\b`, 'im').test(body)) gaps.push(`missing "## ${sec}"`);
  }

  const headings = body.split(/\r?\n/).filter((l) => /^##\s+/.test(l.trim()));
  // Decision section: the newer "When to pick X" template OR the older "Fit & tradeoffs" template.
  const hasPick = headings.some((h) => /^##\s+When to (pick|use|choose)\b/i.test(h.trim()) && !/(something|anything) else/i.test(h))
    || headings.some((h) => /fit (&|and) tradeoffs|tradeoffs/i.test(h));
  const hasPickElse = headings.some((h) => /(something|anything) else|when to skip|when to avoid|tradeoffs/i.test(h))
    || /pick something else|choose something else|when to skip/i.test(body);
  if (!hasPick) gaps.push('no "when to pick" decision section');
  if (!hasPickElse) gaps.push('no "when to pick something else" counterpoint');

  // Comparison: a "vs / Against the alternatives" section, an "## Alternatives" section, or a comparison table.
  const tableToolLinks = body.split(/\r?\n/).filter((l) => l.trim().startsWith('|') && /\/tools\//.test(l)).length;
  const hasComparison = /^##\s+.*(against the alternatives|how it compares|head-to-head|vs\.? )/im.test(body)
    || /^##\s+Alternatives\b/im.test(body) || tableToolLinks >= 2;
  if (!hasComparison) gaps.push('no comparison table / "Against the alternatives"');

  const internalLinks = (body.match(/\]\(\/(tools|categories)\//g) || []).length;
  if (internalLinks < MIN_INTERNAL_LINKS) gaps.push(`under-linked (${internalLinks} < ${MIN_INTERNAL_LINKS} internal)`);

  const factSources = (fm.match(/^\s{4}source:/gm) || []).length;
  if (factSources < MIN_FACT_SOURCES) gaps.push(`few sourced facts (${factSources} < ${MIN_FACT_SOURCES})`);

  const bodyLower = body.toLowerCase();
  const filler = FILLER_TERMS.filter((t) => bodyLower.includes(t));
  if (filler.length) gaps.push(`filler/vendor-speak (${filler.join(', ')})`);

  const proseRaw = body.split(/\r?\n/)
    .filter((l) => { const t = l.trim(); return t && !/^(#|>|\||[-*]\s|\d+\.\s|```)/.test(t); })
    .join(' ');
  let longCount = 0; let longest = 0;
  for (const rawSentence of proseRaw.split(/(?<=[.!?])\s+/)) {
    // Source-citation lists ("Last verified ... against [a], [b], [c]") are link-dense,
    // not run-on prose. Skip sentences with several inline links.
    if ((rawSentence.match(/\]\(/g) || []).length >= 3) continue;
    const clean = rawSentence.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '');
    const n = clean.split(/\s+/).filter(Boolean).length;
    if (n > MAX_SENTENCE_WORDS) { longCount += 1; longest = Math.max(longest, n); }
  }
  if (longCount) gaps.push(`${longCount} run-on sentence(s) (longest ${longest}w)`);

  return { rel, slug, status, words, importance, internalLinks, factSources, gaps };
}

const toolPaths = listMd(TOOLS_DIR);
const slugs = toolPaths.map((p) => p.split(/[\\/]/).pop().replace(/\.md$/, ''));
const impact = buildComparisonImpact(slugs);

// Single-file gate.
if (CHECK_MODE && FILE_ARG) {
  const path = resolve(PROJECT_DIR, FILE_ARG);
  if (!existsSync(path)) { console.error(`${FILE_ARG}: not found`); process.exit(1); }
  const slug = path.split(/[\\/]/).pop().replace(/\.md$/, '');
  const r = analyze(path, impact[slug] ?? 0);
  const report = { ok: r.gaps.length === 0, ...r };
  if (JSON_MODE) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  else if (r.gaps.length) { console.error(`[audit-tool-depth] FAILED (${r.gaps.length}) ${r.rel}:`); for (const g of r.gaps) console.error(`  x ${g}`); }
  else console.log(`[audit-tool-depth] passed: ${r.rel} meets the deepening bar (${r.words}w, ${r.internalLinks} links, importance ${r.importance}).`);
  process.exit(report.ok ? 0 : 1);
}

// Gaps report across all active pages.
const analyzed = toolPaths
  .map((p) => analyze(p, impact[p.split(/[\\/]/).pop().replace(/\.md$/, '')] ?? 0))
  .filter((r) => r.status === 'active' && r.gaps.length);
analyzed.sort((a, b) => b.importance - a.importance || b.gaps.length - a.gaps.length || a.slug.localeCompare(b.slug));

const gapTypeCounts = {};
for (const r of analyzed) for (const g of r.gaps) {
  const type = g.replace(/\(.*\)/, '').replace(/"[^"]*"/g, '"X"').trim();
  gapTypeCounts[type] = (gapTypeCounts[type] || 0) + 1;
}

if (JSON_MODE) {
  process.stdout.write(`${JSON.stringify({ ok: true, active_with_gaps: analyzed.length, gap_type_counts: gapTypeCounts, queue: analyzed.slice(0, LIMIT) }, null, 2)}\n`);
} else {
  console.log(`[audit-tool-depth] ${analyzed.length} active tool page(s) below the deepening bar.`);
  console.log('Gap types:');
  for (const [t, n] of Object.entries(gapTypeCounts).sort((a, b) => b[1] - a[1])) console.log(`  ${n}x ${t}`);
  console.log(`\nTop ${Math.min(LIMIT, analyzed.length)} by importance:`);
  for (const r of analyzed.slice(0, LIMIT)) console.log(`  [${String(r.importance).padStart(2)} refs] ${r.slug} (${r.words}w): ${r.gaps.join('; ')}`);
}
