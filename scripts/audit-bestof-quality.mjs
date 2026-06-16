#!/usr/bin/env node
// Phase 0 quality gate for "best AI X" answer pages (src/pages/answers/*.astro).
// Validates one answer page (--file): required components, JSON-LD with a fresh
// dateModified, links only to existing tools, registered in answers.ts, no
// placeholders. Read-only; exit 1 on any issue. Build/CI is the final gate.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const PROJECT_DIR = resolve(valueFor('--project-dir') || dirname(dirname(fileURLToPath(import.meta.url))));
const FILE_ARG = valueFor('--file');
const JSON_MODE = args.includes('--json');
const TOOLS_DIR = join(PROJECT_DIR, 'src', 'content', 'tools');
const ANSWERS_TS = join(PROJECT_DIR, 'src', 'data', 'answers.ts');

const REQUIRED_IMPORTS = ['BaseLayout', 'Hero', 'AnswerDecisionPanel', 'AnswerContent'];
const VERIFY_MAX_AGE_DAYS = 14;
const MIN_TOOL_LINKS = 3;
const PLACEHOLDER = [/\bTODO\b/, /\bTKTK\b/i, /lorem ipsum/i, /\bplaceholder\b/i, /\bXXX\b/];

function valueFor(name) {
  const inline = args.find((a) => a.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}
function projectPath(p) { return relative(PROJECT_DIR, p).replace(/\\/g, '/'); }
function daysAgo(value, now) {
  const raw = String(value ?? '').trim().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
  const d = new Date(`${raw}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  return Math.round((new Date(`${now.toISOString().slice(0, 10)}T00:00:00Z`).getTime() - d.getTime()) / 86_400_000);
}

const toolSlugs = new Set(existsSync(TOOLS_DIR) ? readdirSync(TOOLS_DIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')) : []);
const answersTs = existsSync(ANSWERS_TS) ? readFileSync(ANSWERS_TS, 'utf8') : '';

if (!FILE_ARG) { console.error('[audit-bestof-quality] pass --file <path>'); process.exit(1); }
const path = resolve(PROJECT_DIR, FILE_ARG);
const rel = projectPath(path);
const failures = [];
if (!existsSync(path)) { console.error(`${rel}: not found`); process.exit(1); }
const raw = readFileSync(path, 'utf8');
const slug = path.split(/[\\/]/).pop().replace(/\.astro$/, '');

for (const imp of REQUIRED_IMPORTS) if (!new RegExp(`\\b${imp}\\b`).test(raw)) failures.push(`${rel}: missing component ${imp}`);

// JSON-LD freshness.
const dm = raw.match(/dateModified:\s*'([0-9]{4}-[0-9]{2}-[0-9]{2})'/);
if (!dm) failures.push(`${rel}: missing JSON-LD dateModified`);
else {
  const age = daysAgo(dm[1], new Date());
  if (age === null || age < 0) failures.push(`${rel}: dateModified invalid or future`);
  else if (age > VERIFY_MAX_AGE_DAYS) failures.push(`${rel}: dateModified ${age}d old (max ${VERIFY_MAX_AGE_DAYS})`);
}

// BaseLayout needs title + description.
if (!/title=/.test(raw)) failures.push(`${rel}: BaseLayout missing title`);
if (!/description=/.test(raw)) failures.push(`${rel}: BaseLayout missing description`);

// AnswerDecisionPanel needs a verdict.
if (!/verdict=/.test(raw)) failures.push(`${rel}: AnswerDecisionPanel missing verdict`);

// Tool links must exist and meet a minimum count.
const linked = [...raw.matchAll(/\/tools\/([a-z0-9-]+)\/?/g)].map((m) => m[1]);
const uniqueLinked = [...new Set(linked)];
for (const s of uniqueLinked) if (!toolSlugs.has(s)) failures.push(`${rel}: links to /tools/${s}/ which does not exist`);
if (uniqueLinked.length < MIN_TOOL_LINKS) failures.push(`${rel}: links to ${uniqueLinked.length} tools (min ${MIN_TOOL_LINKS})`);

// Registered in answers.ts (avoid an orphan page).
if (answersTs && !answersTs.includes(`'${slug}'`)) failures.push(`${rel}: slug "${slug}" not registered in src/data/answers.ts`);

for (const re of PLACEHOLDER) if (re.test(raw)) failures.push(`${rel}: placeholder ${re}`);

const report = { ok: failures.length === 0, failures };
if (JSON_MODE) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
else if (failures.length) { console.error(`[audit-bestof-quality] FAILED (${failures.length}):`); for (const f of failures) console.error(`  x ${f}`); }
else console.log('[audit-bestof-quality] passed: best-of answer page meets the bar.');
process.exit(report.ok ? 0 : 1);
