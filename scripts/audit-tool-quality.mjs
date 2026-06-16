#!/usr/bin/env node
// Phase 2 quality gate for agent-generated tool pages.
// Validates one tool page (--file) meets the bar before merge: complete
// frontmatter, scores, dated facts, real logo asset, required sections,
// substance, freshness, no placeholders. Read-only; exit 1 on any issue.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const PROJECT_DIR = resolve(valueFor('--project-dir') || dirname(dirname(fileURLToPath(import.meta.url))));
const FILE_ARG = valueFor('--file');
const JSON_MODE = args.includes('--json');
const CATEGORIES_DIR = join(PROJECT_DIR, 'src', 'content', 'categories');
const LOGO_DIR = join(PROJECT_DIR, 'public', 'logos', 'tools');

const PRICING_MODELS = new Set(['free', 'freemium', 'paid', 'enterprise', 'open-source']);
const STATUSES = new Set(['active', 'beta', 'dead', 'acquired']);
const REQUIRED_SCALARS = ['title', 'tagline', 'category', 'company', 'url', 'pricing_model', 'status', 'last_updated', 'last_verified', 'seo_title', 'meta_description', 'author'];
const REQUIRED_SECTIONS = ['System Verdict', 'Pricing'];
const MIN_WORDS = 350;
const VERIFY_MAX_AGE_DAYS = 14;
const PLACEHOLDER = [/\bTODO\b/, /\bTKTK\b/i, /lorem ipsum/i, /\bplaceholder\b/i, /\bXXX\b/];

function valueFor(name) {
  const inline = args.find((a) => a.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}
function projectPath(p) { return relative(PROJECT_DIR, p).replace(/\\/g, '/'); }
function stripQuotes(v) {
  const t = String(v ?? '').trim();
  return (t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'")) ? t.slice(1, -1) : t;
}
function scalar(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  if (!m) return '';
  const v = stripQuotes(m[1]);
  return v === '[]' || v === '{}' ? '' : v;
}
function daysAgo(value, now) {
  const raw = String(value ?? '').trim().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
  const d = new Date(`${raw}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  return Math.round((new Date(`${now.toISOString().slice(0, 10)}T00:00:00Z`).getTime() - d.getTime()) / 86_400_000);
}

const categorySlugs = new Set(
  existsSync(CATEGORIES_DIR)
    ? readdirSync(CATEGORIES_DIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
    : [],
);
const logoSlugs = new Set(
  existsSync(LOGO_DIR)
    ? readdirSync(LOGO_DIR).map((f) => f.replace(/\.(png|svg|jpg|jpeg|webp|gif|ico)$/i, ''))
    : [],
);

function checkFile(path) {
  const rel = projectPath(path);
  const failures = [];
  if (!existsSync(path)) return [`${rel}: file not found`];
  const raw = readFileSync(path, 'utf8');
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return [`${rel}: missing frontmatter`];
  const fm = fmMatch[1];
  const body = raw.slice(fmMatch[0].length);
  const slug = scalar(fm, 'slug') || path.split(/[\\/]/).pop().replace(/\.md$/, '');
  const fileSlug = path.split(/[\\/]/).pop().replace(/\.md$/, '');
  if (slug !== fileSlug) failures.push(`${rel}: slug "${slug}" != filename`);

  for (const key of REQUIRED_SCALARS) if (!scalar(fm, key)) failures.push(`${rel}: missing frontmatter "${key}"`);

  const category = scalar(fm, 'category');
  if (category && categorySlugs.size && !categorySlugs.has(category)) failures.push(`${rel}: category "${category}" is not a known category`);

  const pm = scalar(fm, 'pricing_model');
  if (pm && !PRICING_MODELS.has(pm)) failures.push(`${rel}: pricing_model "${pm}" invalid`);
  const status = scalar(fm, 'status');
  if (status && !STATUSES.has(status)) failures.push(`${rel}: status "${status}" invalid`);

  // Scores: all four present.
  if (!/^scores:\s*$/m.test(fm)) failures.push(`${rel}: missing scores block`);
  else for (const s of ['utility', 'value', 'moat', 'longevity']) {
    if (!new RegExp(`^\\s{2}${s}:\\s*\\d`, 'm').test(fm)) failures.push(`${rel}: scores.${s} missing or non-numeric`);
  }

  // Facts: needs a facts block with at least one dated fact.
  if (!/^facts:\s*$/m.test(fm)) failures.push(`${rel}: missing facts block`);
  else {
    if (!/^\s{2}(best_for|pricing_anchor|flagship_model):\s*$/m.test(fm)) failures.push(`${rel}: facts needs best_for, pricing_anchor, or flagship_model`);
    if (!/^\s{4}verified_at:/m.test(fm)) failures.push(`${rel}: facts need a verified_at date`);
  }

  // Freshness.
  const now = new Date();
  const va = daysAgo(scalar(fm, 'last_verified'), now);
  if (va === null) failures.push(`${rel}: last_verified not a valid date`);
  else if (va < 0) failures.push(`${rel}: last_verified is in the future`);
  else if (va > VERIFY_MAX_AGE_DAYS) failures.push(`${rel}: last_verified ${va}d old (max ${VERIFY_MAX_AGE_DAYS} for a new page)`);

  // Logo asset present.
  if (logoSlugs.size && !logoSlugs.has(slug)) failures.push(`${rel}: no logo at public/logos/tools/${slug}.* (audit-tool-logos will fail)`);

  // Sections + substance.
  for (const sec of REQUIRED_SECTIONS) if (!new RegExp(`^##\\s+${sec}\\b`, 'm').test(body)) failures.push(`${rel}: missing "## ${sec}" section`);
  const words = body.replace(/[#>*|`\-]/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < MIN_WORDS) failures.push(`${rel}: body ${words} words (min ${MIN_WORDS})`);
  for (const re of PLACEHOLDER) if (re.test(body)) failures.push(`${rel}: placeholder ${re}`);

  return failures;
}

if (!FILE_ARG) { console.error('[audit-tool-quality] pass --file <path>'); process.exit(1); }
const failures = checkFile(resolve(PROJECT_DIR, FILE_ARG));
const report = { ok: failures.length === 0, failures };
if (JSON_MODE) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
else if (failures.length) { console.error(`[audit-tool-quality] FAILED (${failures.length}):`); for (const f of failures) console.error(`  x ${f}`); }
else console.log('[audit-tool-quality] passed: tool page meets the bar.');
process.exit(report.ok ? 0 : 1);
