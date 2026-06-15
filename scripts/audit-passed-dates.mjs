#!/usr/bin/env node
// Report-only staleness detector: future-framed claims about dates that have passed.
//
// Catches the pass-1 bug class ("X will launch on May 15" after May 15) so it can
// be reviewed periodically. Conservative by design - it only flags a future modal
// verb within the same clause as a clearly-parseable date that is strictly before
// "today", and it skips effective-date framing ("from/since/as of <date>") and
// dated changelog bullets ("- **May 8:** ...") which are historical by construction.
//
// Findings are report-only: they never fail a build. Invalid operator arguments fail closed.
// Run: node scripts/audit-passed-dates.mjs [--today YYYY-MM-DD]

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const KNOWN_FLAGS = new Set(['--json', '--dir', '--today', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--dir', '--today', '--project-dir', '--root']);
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const argumentIssues = collectArgumentIssues();

// Scan evergreen buyer-facing content; news is intentionally excluded (changelog-style, dated).
// --dir overrides the scan roots (used by tests).
const dirOverride = valueFor('--dir');
const SCAN_DIRS = (dirOverride
  ? [resolve(PROJECT_DIR, dirOverride)]
  : ['tools', 'comparisons', 'compare', 'use-cases', 'trends', 'companies', 'categories'].map((d) => join(PROJECT_DIR, 'src', 'content', d))
).filter((d) => {
  try {
    return statSync(d).isDirectory();
  } catch {
    return false;
  }
});

function valueFor(name) {
  const inlineArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (inlineArg) return inlineArg.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function hasFlag(name) {
  return args.includes(name) || args.some((arg) => arg.startsWith(`${name}=`));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function validIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ''))) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of args.entries()) {
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] ?? '';
      if (!VALUE_FLAGS.has(previous)) issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
    if (VALUE_FLAGS.has(name)) {
      const value = arg.includes('=') ? arg.slice(name.length + 1) : args[index + 1] ?? '';
      if (!value || value.startsWith('-')) {
        issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
      } else if (name === '--today' && !validIsoDate(value)) {
        issues.push({ code: 'argument-invalid', detail: '--today must be YYYY-MM-DD' });
      }
    }
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  if (hasFlag('--dir')) {
    const explicitDir = valueFor('--dir');
    if (explicitDir && !explicitDir.startsWith('-')) {
      const resolvedDir = resolve(PROJECT_DIR, explicitDir);
      try {
        if (!statSync(resolvedDir).isDirectory()) {
          issues.push({ code: 'argument-invalid', detail: `--dir must point to a directory: ${explicitDir}` });
        }
      } catch {
        issues.push({ code: 'argument-invalid', detail: `--dir must point to a directory: ${explicitDir}` });
      }
    }
  }

  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/audit-passed-dates.mjs --json',
    '  node scripts/audit-passed-dates.mjs --today 2026-06-14',
    '  node scripts/audit-passed-dates.mjs --dir <content-dir>',
    '',
    'Options:',
    '  --json                 Emit a structured report.',
    '  --today <YYYY-MM-DD>   Use a deterministic current date.',
    '  --dir <dir>            Scan one directory instead of evergreen content roots.',
    '  --project-dir <dir>    Audit another project root.',
    '  --root <dir>           Alias for --project-dir.',
  ].join('\n');
}

function emitArgumentFailure() {
  const report = {
    ok: false,
    mode: 'argument-error',
    project_dir: PROJECT_DIR,
    today: valueFor('--today') || new Date().toISOString().slice(0, 10),
    scanned: 0,
    count: 0,
    argument_issues: argumentIssues,
    findings: [],
  };

  if (JSON_MODE) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.error('[audit-passed-dates] invalid arguments');
    for (const issue of argumentIssues) console.error(`- ${issue.detail}`);
  }
}

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

if (argumentIssues.length > 0) {
  emitArgumentFailure();
  process.exit(1);
}

function argDate() {
  const today = valueFor('--today');
  if (today) return today;
  // Env clock; tests pass --today explicitly for determinism.
  return new Date().toISOString().slice(0, 10);
}
const TODAY = argDate();

const MONTHS = { january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8, september: 9, october: 10, november: 11, december: 12 };
const FUTURE = /\b(will|scheduled to|scheduled for|set to|expected to|due to|is coming|are coming|coming (?:in|on)|launching|arriving|slated to|going to)\b/i;
// Words just before a date that mean it is an effective date or a verification
// timestamp, not a future claim - excluded to avoid false positives.
const EFFECTIVE = /\b(from|since|as of|effective|starting|beginning|available since|verified|re-verified|updated|reviewed|checked|last verified|last updated|last reviewed)\s*$/i;

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    out.push(...(statSync(p).isDirectory() ? walk(p) : (e.endsWith('.md') ? [p] : [])));
  }
  return out;
}

// Parse a date token to YYYY-MM-DD (day defaults to last of month when absent, so
// "May 2026" only counts as passed once the whole month is over - conservative).
function toIso(token) {
  let m = token.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = token.match(/\b([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})\b/);
  if (m && MONTHS[m[1].toLowerCase()]) return `${m[3]}-${String(MONTHS[m[1].toLowerCase()]).padStart(2, '0')}-${String(+m[2]).padStart(2, '0')}`;
  m = token.match(/\b([A-Za-z]+)\s+(\d{4})\b/);
  if (m && MONTHS[m[1].toLowerCase()]) {
    const mo = MONTHS[m[1].toLowerCase()];
    const last = new Date(Date.UTC(+m[2], mo, 0)).getUTCDate();
    return `${m[2]}-${String(mo).padStart(2, '0')}-${String(last).padStart(2, '0')}`;
  }
  m = token.match(/\bQ([1-4])\s+(\d{4})\b/);
  if (m) { const endMo = +m[1] * 3; const last = new Date(Date.UTC(+m[2], endMo, 0)).getUTCDate(); return `${m[2]}-${String(endMo).padStart(2, '0')}-${last}`; }
  return null;
}

const DATE_RE = /(\d{4}-\d{2}-\d{2}|(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}|(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}|Q[1-4]\s+\d{4})/g;

const findings = [];
let scanned = 0;
for (const dir of SCAN_DIRS) {
  for (const file of walk(dir)) {
    scanned++;
    // Blank out frontmatter (preserve newlines) so reported line numbers match the file.
    const raw = readFileSync(file, 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---/, (s) => s.replace(/[^\n]/g, ''));
    const rel = relative(PROJECT_DIR, file).replace(/\\/g, '/');
    const lines = raw.split(/\n/);
    lines.forEach((rawLine, i) => {
      if (/^\s*[-*]\s+\*\*[A-Za-z]+ \d/.test(rawLine)) return; // dated changelog bullet, historical by design
      // Strip markdown link targets and bare URLs so slugs (e.g. ".../Will-credits-...")
      // and querystrings do not trip the future-verb / date matchers.
      const line = rawLine.replace(/\]\([^)]*\)/g, ']').replace(/https?:\/\/\S+/g, '');
      let dm;
      DATE_RE.lastIndex = 0;
      while ((dm = DATE_RE.exec(line)) !== null) {
        const iso = toIso(dm[0]);
        if (!iso || iso >= TODAY) continue; // future or undated -> not stale
        const before = line.slice(Math.max(0, dm.index - 70), dm.index);
        const clause = line.slice(Math.max(0, dm.index - 70), dm.index + dm[0].length + 10);
        if (EFFECTIVE.test(before)) continue; // "from/since/as of <past date>" = effective date, fine
        if (FUTURE.test(clause)) {
          findings.push({ file: rel, line: i + 1, date: iso, text: clause.trim().slice(0, 120) });
        }
      }
    });
  }
}

if (JSON_MODE) {
  console.log(JSON.stringify({ ok: true, mode: 'report', project_dir: PROJECT_DIR, today: TODAY, scanned, count: findings.length, argument_issues: [], findings }, null, 2));
} else {
  console.log(`[audit-passed-dates] report-only; today=${TODAY}; scanned ${scanned} files.`);
  console.log(`Likely passed-date future-framing: ${findings.length}`);
  for (const f of findings.slice(0, 60)) console.log(`  ${f.file}:${f.line} [${f.date}] ${f.text}`);
  if (findings.length > 60) console.log(`  … ${findings.length - 60} more`);
}
