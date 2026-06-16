#!/usr/bin/env node
// Phase 3 gap-detector + quality-gate for company profiles.
//   --gaps          rank companies referenced by tools that lack a profile
//   --check --file  validate one company profile meets the bar
// Read-only; --json for structured output.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const PROJECT_DIR = resolve(valueFor('--project-dir') || dirname(dirname(fileURLToPath(import.meta.url))));
const TOOLS_DIR = join(PROJECT_DIR, 'src', 'content', 'tools');
const COMPANIES_DIR = join(PROJECT_DIR, 'src', 'content', 'companies');
const MODE = args.includes('--check') ? 'check' : 'gaps';
const FILE_ARG = valueFor('--file');
const JSON_MODE = args.includes('--json');

const COMPANY_TYPES = new Set(['startup', 'bigtech', 'acquired', 'dead']);
const REQUIRED_SCALARS = ['title', 'seo_title', 'meta_description', 'author', 'company_type', 'founded', 'hq', 'last_updated', 'last_verified', 'update_frequency'];
const REQUIRED_SECTIONS = ['Key Facts', 'What They Do', 'Sources'];
const MIN_WORDS = 250;
const VERIFY_MAX_AGE_DAYS = 14;
const PLACEHOLDER = [/\bTODO\b/, /\bTKTK\b/i, /lorem ipsum/i, /\bplaceholder\b/i, /\bXXX\b/];

// Aliases mapping messy tool `company:` values to an existing profile slug.
const PROFILE_ALIASES = {
  google: 'google-deepmind', 'google deepmind': 'google-deepmind', 'google-deepmind': 'google-deepmind',
  'mistral ai': 'mistral', 'mistral ai (paris, france)': 'mistral', mistral: 'mistral',
  elevenlabs: 'elevenlabs-company', 'elevenlabs-company': 'elevenlabs-company',
  openai: 'openai', anthropic: 'anthropic',
};

function valueFor(name) {
  const inline = args.find((a) => a.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}
function projectPath(p) { return relative(PROJECT_DIR, p).replace(/\\/g, '/'); }
function stripQuotes(v) { const t = String(v ?? '').trim(); return (t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'")) ? t.slice(1, -1) : t; }
function fm(raw) { return raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''; }
function scalar(f, key) { const m = f.match(new RegExp(`^${key}:\\s*(.*)$`, 'm')); if (!m) return ''; const v = stripQuotes(m[1]); return v === '[]' || v === '{}' ? '' : v; }
function toSlug(v) { return String(v).toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function daysAgo(value, now) { const r = String(value ?? '').trim().slice(0, 10); if (!/^\d{4}-\d{2}-\d{2}$/.test(r)) return null; const d = new Date(`${r}T00:00:00Z`); return Number.isNaN(d.getTime()) ? null : Math.round((new Date(`${now.toISOString().slice(0, 10)}T00:00:00Z`).getTime() - d.getTime()) / 86_400_000); }

const profileSlugs = new Set(existsSync(COMPANIES_DIR) ? readdirSync(COMPANIES_DIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')) : []);

if (MODE === 'gaps') {
  const byCompany = {}; // normalized display -> {count, tools:[]}
  for (const f of readdirSync(TOOLS_DIR)) {
    if (!f.endsWith('.md')) continue;
    const raw = readFileSync(join(TOOLS_DIR, f), 'utf8');
    const company = scalar(fm(raw), 'company');
    const slug = f.replace(/\.md$/, '');
    if (!company) continue;
    const key = company.trim();
    (byCompany[key] ||= { count: 0, tools: [] });
    byCompany[key].count += 1; byCompany[key].tools.push(slug);
  }
  const missing = Object.entries(byCompany)
    .map(([name, v]) => ({ name, profile_slug: PROFILE_ALIASES[name.toLowerCase()] || toSlug(name), ...v }))
    .filter((c) => !profileSlugs.has(c.profile_slug))
    .sort((a, b) => b.count - a.count);
  const report = { ok: true, mode: 'gaps', existing_profiles: profileSlugs.size, missing_companies: missing.length, target: 30, top: missing.slice(0, 40) };
  if (JSON_MODE) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  else { console.log(`[audit-company] ${profileSlugs.size} profiles; ${missing.length} referenced companies without one (target 30+).`); for (const c of missing.slice(0, 30)) console.log(`  ${String(c.count).padStart(2)}  ${c.profile_slug}  (${c.name}) -> ${c.tools.slice(0, 4).join(', ')}`); }
  process.exit(0);
}

// check mode
if (!FILE_ARG) { console.error('[audit-company] pass --file <path> with --check'); process.exit(1); }
const path = resolve(PROJECT_DIR, FILE_ARG);
const failures = [];
const toolSlugs = new Set(readdirSync(TOOLS_DIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')));
const rel = projectPath(path);
if (!existsSync(path)) { console.error(`${rel}: not found`); process.exit(1); }
const raw = readFileSync(path, 'utf8');
const f = fm(raw);
if (!f) { console.error(`${rel}: missing frontmatter`); process.exit(1); }
const body = raw.slice(raw.indexOf('---', 3) + 3);
const slug = scalar(f, 'slug') || path.split(/[\\/]/).pop().replace(/\.md$/, '');
if (slug !== path.split(/[\\/]/).pop().replace(/\.md$/, '')) failures.push(`${rel}: slug != filename`);
for (const k of REQUIRED_SCALARS) if (!scalar(f, k)) failures.push(`${rel}: missing "${k}"`);
const ct = scalar(f, 'company_type');
if (ct && !COMPANY_TYPES.has(ct)) failures.push(`${rel}: company_type "${ct}" invalid`);
// key_products slugs must exist as tools.
const kp = (f.match(/^key_products:\s*\[(.*?)\]/m)?.[1] || '').split(',').map((s) => stripQuotes(s)).filter(Boolean);
if (!kp.length) failures.push(`${rel}: key_products is empty`);
for (const p of kp) if (!toolSlugs.has(p)) failures.push(`${rel}: key_products "${p}" is not an existing tool`);
const now = new Date();
const va = daysAgo(scalar(f, 'last_verified'), now);
if (va === null) failures.push(`${rel}: last_verified not a valid date`);
else if (va < 0) failures.push(`${rel}: last_verified in the future`);
else if (va > VERIFY_MAX_AGE_DAYS) failures.push(`${rel}: last_verified ${va}d old (max ${VERIFY_MAX_AGE_DAYS})`);
for (const s of REQUIRED_SECTIONS) if (!new RegExp(`^##\\s+${s}\\b`, 'm').test(body)) failures.push(`${rel}: missing "## ${s}"`);
const words = body.replace(/[#>*|`\-]/g, ' ').split(/\s+/).filter(Boolean).length;
if (words < MIN_WORDS) failures.push(`${rel}: body ${words} words (min ${MIN_WORDS})`);
for (const re of PLACEHOLDER) if (re.test(body)) failures.push(`${rel}: placeholder ${re}`);

const report = { ok: failures.length === 0, failures };
if (JSON_MODE) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
else if (failures.length) { console.error(`[audit-company] FAILED (${failures.length}):`); for (const x of failures) console.error(`  x ${x}`); }
else console.log('[audit-company] passed: company profile meets the bar.');
process.exit(report.ok ? 0 : 1);
