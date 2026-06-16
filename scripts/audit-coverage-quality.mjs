#!/usr/bin/env node
// Quality gate for agent-generated comparison pages. This is the auto-merge
// condition: a new comparison only ships unattended if it passes here AND the
// existing guard/audit suite is green.
//
// Checks one file (--file) or every comparison (--all). Fails (exit 1) on any
// blocking issue. Read-only.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const COMPARISONS_DIR = join(PROJECT_DIR, 'src', 'content', 'comparisons');
const TOOLS_DIR = join(PROJECT_DIR, 'src', 'content', 'tools');
const JSON_MODE = args.includes('--json');
const ALL_MODE = args.includes('--all');
const FILE_ARG = valueFor('--file');

// Tunables.
const MIN_WORDS = 600;
const MIN_SOURCES = 4;
const VERIFY_MAX_AGE_DAYS = 14;
const REQUIRED_SECTIONS = ['Quick Answer', 'Bottom Line', 'Sources'];
const ALLOWED_WINNERS = new Set(['depends', 'tie', '']);
const CANONICAL_FACT_TOOLS = new Set([
  'chatgpt', 'claude', 'gemini', 'grok', 'deepseek',
  'midjourney', 'runway', 'elevenlabs', 'cursor', 'github-copilot',
]);
const PLACEHOLDER_PATTERNS = [/\bTODO\b/, /\bTKTK\b/i, /\blorem ipsum\b/i, /\bplaceholder\b/i, /\[\s*\]/, /\bXXX\b/];

function valueFor(name) {
  const inline = args.find((a) => a.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}
function projectPath(path) {
  return relative(PROJECT_DIR, path).replace(/\\/g, '/');
}
function stripYamlQuotes(value) {
  const t = String(value ?? '').trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) return t.slice(1, -1);
  return t;
}
function scalar(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  if (!m) return '';
  const v = stripYamlQuotes(m[1]);
  return v === '[]' || v === '{}' ? '' : v;
}
function inlineArray(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*\\[(.*?)\\]\\s*$`, 'm'));
  return m ? m[1].split(',').map(stripYamlQuotes).filter(Boolean) : [];
}
function slugFromPath(path) {
  return path.split(/[\\/]/).pop().replace(/\.md$/, '');
}
function daysAgo(value, now) {
  const raw = String(value ?? '').trim().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
  const d = new Date(`${raw}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  const today = new Date(`${now.toISOString().slice(0, 10)}T00:00:00Z`);
  return Math.round((today.getTime() - d.getTime()) / 86_400_000);
}

const activeToolSlugs = new Set();
if (existsSync(TOOLS_DIR)) {
  for (const name of readdirSync(TOOLS_DIR)) {
    if (!name.endsWith('.md')) continue;
    const fm = readFileSync(join(TOOLS_DIR, name), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    const status = scalar(fm, 'status').toLowerCase();
    if (!['dead', 'acquired', 'discontinued'].includes(status)) {
      activeToolSlugs.add(scalar(fm, 'slug') || name.replace(/\.md$/, ''));
    }
  }
}

function targetFiles() {
  if (FILE_ARG) return [resolve(PROJECT_DIR, FILE_ARG)];
  if (ALL_MODE) {
    return existsSync(COMPARISONS_DIR)
      ? readdirSync(COMPARISONS_DIR).filter((n) => n.endsWith('.md')).map((n) => join(COMPARISONS_DIR, n))
      : [];
  }
  return [];
}

const now = new Date();

function checkFile(path) {
  const failures = [];
  const rel = projectPath(path);
  if (!existsSync(path)) return [`${rel}: file not found`];

  const raw = readFileSync(path, 'utf8');
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return [`${rel}: missing frontmatter`];
  const fm = fmMatch[1];
  const body = raw.slice(fmMatch[0].length);

  // Frontmatter completeness.
  for (const key of ['title', 'category', 'seo_title', 'meta_description', 'author', 'last_updated', 'last_verified', 'update_frequency']) {
    if (!scalar(fm, key)) failures.push(`${rel}: missing or empty frontmatter "${key}"`);
  }

  const slug = scalar(fm, 'slug') || slugFromPath(path);
  if (slug !== slugFromPath(path)) failures.push(`${rel}: slug "${slug}" does not match filename`);

  // Tools: exactly two, both active and existing.
  const tools = inlineArray(fm, 'tools');
  if (tools.length !== 2) {
    failures.push(`${rel}: "tools" must list exactly 2 slugs (found ${tools.length})`);
  } else {
    for (const t of tools) {
      if (!activeToolSlugs.has(t)) failures.push(`${rel}: tool "${t}" is not an active tool page (orphan link risk)`);
    }
    for (const t of tools) {
      if (!new RegExp(`\\]\\(/tools/${t}/?\\)`).test(body)) {
        failures.push(`${rel}: body does not link to /tools/${t}/`);
      }
    }
  }

  // Winner must be a known value.
  const winner = scalar(fm, 'winner');
  if (winner && !ALLOWED_WINNERS.has(winner) && !tools.includes(winner)) {
    failures.push(`${rel}: winner "${winner}" must be one of depends/tie or one of the compared tool slugs`);
  }

  // Freshness.
  const verifiedAge = daysAgo(scalar(fm, 'last_verified'), now);
  if (verifiedAge === null) failures.push(`${rel}: last_verified is not a valid YYYY-MM-DD date`);
  else if (verifiedAge < 0) failures.push(`${rel}: last_verified is in the future`);
  else if (verifiedAge > VERIFY_MAX_AGE_DAYS) failures.push(`${rel}: last_verified is ${verifiedAge}d old (max ${VERIFY_MAX_AGE_DAYS}d for a new page)`);

  // Canonical-fact discipline (mirrors guard-stale-facts).
  const canonicalTools = tools.filter((t) => CANONICAL_FACT_TOOLS.has(t));
  if (canonicalTools.length) {
    if (!/^canonical_fact_table:\s*true\s*$/m.test(fm)) {
      failures.push(`${rel}: must set "canonical_fact_table: true" (involves ${canonicalTools.join(', ')})`);
    }
    if (/^##\s+At a Glance\s*$/m.test(body)) {
      failures.push(`${rel}: must not include a manual "## At a Glance" section`);
    }
  }

  // Required sections.
  for (const section of REQUIRED_SECTIONS) {
    if (!new RegExp(`^##\\s+${section}\\b`, 'm').test(body)) {
      failures.push(`${rel}: missing required "## ${section}" section`);
    }
  }

  // Sources count.
  const sourcesBlock = body.split(/^##\s+Sources\b.*$/m)[1] ?? '';
  const sourceLinks = (sourcesBlock.match(/\]\(https?:\/\//g) || []).length + (sourcesBlock.match(/\]\(\/tools\//g) || []).length;
  if (sourceLinks < MIN_SOURCES) failures.push(`${rel}: Sources section has ${sourceLinks} links (min ${MIN_SOURCES})`);

  // Substance.
  const wordCount = body.replace(/[#>*|`\-]/g, ' ').split(/\s+/).filter(Boolean).length;
  if (wordCount < MIN_WORDS) failures.push(`${rel}: body is ${wordCount} words (min ${MIN_WORDS})`);

  // Placeholders.
  for (const re of PLACEHOLDER_PATTERNS) {
    if (re.test(body)) failures.push(`${rel}: contains placeholder text matching ${re}`);
  }

  return failures;
}

const files = targetFiles();
if (!files.length) {
  console.error('[audit-coverage-quality] no target. Pass --file <path> or --all.');
  process.exit(1);
}

const allFailures = files.flatMap(checkFile);
const report = {
  ok: allFailures.length === 0,
  files_checked: files.length,
  failures: allFailures,
};

if (JSON_MODE) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else if (allFailures.length) {
  console.error(`[audit-coverage-quality] ✗ ${allFailures.length} blocking issue(s) across ${files.length} file(s):`);
  for (const f of allFailures.slice(0, 100)) console.error(`  ✗ ${f}`);
} else {
  console.log(`[audit-coverage-quality] ✓ ${files.length} comparison file(s) meet the auto-merge bar.`);
}

process.exit(report.ok ? 0 : 1);
