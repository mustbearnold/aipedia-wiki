#!/usr/bin/env node
// Quality gate for agent-generated comparison pages. This is the auto-merge
// condition: a new comparison only ships unattended if it passes here AND the
// existing guard/audit suite is green.
//
// Checks one file (--file), changed comparison files (--changed), or every
// comparison (--all). Fails (exit 1) on any blocking issue. Read-only.

import { spawnSync } from 'node:child_process';
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
const CHANGED_MODE = args.includes('--changed');
const FILE_ARG = valueFor('--file');
const BASE_ARG = valueFor('--base');
const CHANGED_FILE_ARGS = valuesFor('--changed-file').concat(valuesFor('--changed-files'));
const HELP_MODE = args.includes('--help') || args.includes('-h');
const KNOWN_FLAGS = new Set([
  '--all',
  '--base',
  '--changed',
  '--changed-file',
  '--changed-files',
  '--file',
  '--json',
  '--project-dir',
  '--root',
  '--help',
  '-h',
]);
const VALUE_FLAGS = new Set(['--base', '--changed-file', '--changed-files', '--file', '--project-dir', '--root']);

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length > 0) {
  emitReport({
    ok: false,
    mode: 'argument-error',
    files_checked: 0,
    failures: argumentIssues.map((issue) => `[args]: ${issue.detail}`),
    argument_issues: argumentIssues,
  });
  process.exit(2);
}

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
const gitIssues = [];

function valueFor(name) {
  const inline = args.find((a) => a.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}
function valuesFor(name) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === name) {
      for (let valueIndex = index + 1; valueIndex < args.length && !args[valueIndex].startsWith('--'); valueIndex += 1) {
        values.push(args[valueIndex]);
      }
    } else if (arg.startsWith(`${name}=`)) {
      values.push(arg.slice(name.length + 1));
    }
  }
  return values.flatMap((value) => value.split(',').map((part) => part.trim()).filter(Boolean));
}
function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}
function collectArgumentIssues() {
  const issues = [];
  let targetModeCount = 0;

  if (ALL_MODE) targetModeCount += 1;
  if (FILE_ARG) targetModeCount += 1;
  if (CHANGED_MODE) targetModeCount += 1;
  if (CHANGED_FILE_ARGS.length > 0) targetModeCount += 1;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] ?? '';
      if (!VALUE_FLAGS.has(previous)) issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) {
      issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
      continue;
    }

    if (VALUE_FLAGS.has(name)) {
      if (arg.includes('=')) {
        if (!arg.slice(name.length + 1)) issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
        continue;
      }
      const next = args[index + 1];
      if (!next || next.startsWith('-')) issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
      continue;
    }

    if (arg.includes('=')) issues.push({ code: 'argument-invalid', detail: `${name} does not accept a value` });
  }

  if (targetModeCount !== 1) {
    issues.push({ code: 'argument-invalid', detail: 'choose exactly one of --file, --changed, --changed-file, or --all' });
  }
  if (BASE_ARG && !CHANGED_MODE) {
    issues.push({ code: 'argument-invalid', detail: '--base is only valid with --changed' });
  }
  if (args.includes('--project-dir') && args.includes('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  return issues;
}
function usage() {
  return [
    'Usage:',
    '  node scripts/audit-coverage-quality.mjs --all',
    '  node scripts/audit-coverage-quality.mjs --file src/content/comparisons/example.md',
    '  node scripts/audit-coverage-quality.mjs --changed [--base origin/master]',
    '  node scripts/audit-coverage-quality.mjs --changed-file src/content/comparisons/example.md',
    '',
    'Options:',
    '  --all                    Check every comparison and report all debt.',
    '  --file <path>            Check exactly one comparison file.',
    '  --changed                Check comparison files changed in git.',
    '  --changed-file <path>    Check supplied changed paths, repeatable or comma-separated.',
    '  --base <ref>             Base ref for --changed. Defaults to origin/master when available.',
    '  --json                   Emit a structured report.',
  ].join('\n');
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
function markdownTableLines(body) {
  const lines = body.split(/\r?\n/);
  const tableLines = [];
  for (let index = 0; index < lines.length - 1; index += 1) {
    const header = lines[index].trim();
    const separator = lines[index + 1].trim();
    if (!/^\|.+\|$/.test(header)) continue;
    if (!/^\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?$/.test(separator)) continue;
    tableLines.push(index + 1);
  }
  return tableLines;
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
  if (CHANGED_FILE_ARGS.length > 0) return comparisonFilesFromPaths(CHANGED_FILE_ARGS);
  if (CHANGED_MODE) return changedComparisonFiles();
  if (ALL_MODE) {
    return existsSync(COMPARISONS_DIR)
      ? readdirSync(COMPARISONS_DIR).filter((n) => n.endsWith('.md')).map((n) => join(COMPARISONS_DIR, n))
      : [];
  }
  return [];
}

function comparisonFilesFromPaths(paths) {
  const files = [];
  for (const path of paths) {
    const resolved = resolve(PROJECT_DIR, path);
    if (!resolved.startsWith(COMPARISONS_DIR) || !resolved.endsWith('.md')) continue;
    if (!existsSync(resolved)) continue;
    files.push(resolved);
  }
  return [...new Set(files)].sort((a, b) => a.localeCompare(b));
}

function gitChangedPaths() {
  const paths = [];
  const addOutput = (result) => {
    if (result.status !== 0) return false;
    for (const line of result.stdout.split(/\r?\n/).map((part) => part.trim()).filter(Boolean)) paths.push(line);
    return true;
  };
  const runGit = (gitArgs) =>
    spawnSync('git', gitArgs, {
      cwd: PROJECT_DIR,
      encoding: 'utf8',
    });

  if (BASE_ARG) {
    const result = runGit(['diff', '--name-only', '--diff-filter=ACMRT', `${BASE_ARG}...HEAD`, '--', 'src/content/comparisons']);
    if (!addOutput(result)) {
      gitIssues.push(`[git]: could not diff changed comparisons against ${BASE_ARG}`);
    }
  } else {
    const originMasterExists = runGit(['rev-parse', '--verify', '--quiet', 'origin/master']);
    if (originMasterExists.status === 0) {
      addOutput(runGit(['diff', '--name-only', '--diff-filter=ACMRT', 'origin/master...HEAD', '--', 'src/content/comparisons']));
    }
  }

  addOutput(runGit(['diff', '--name-only', '--diff-filter=ACMRT', '--', 'src/content/comparisons']));
  addOutput(runGit(['diff', '--cached', '--name-only', '--diff-filter=ACMRT', '--', 'src/content/comparisons']));
  addOutput(runGit(['ls-files', '--others', '--exclude-standard', '--', 'src/content/comparisons']));

  return [...new Set(paths)].sort((a, b) => a.localeCompare(b));
}

function changedComparisonFiles() {
  return comparisonFilesFromPaths(gitChangedPaths());
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

  const tableLines = markdownTableLines(body);
  for (const line of tableLines) {
    failures.push(`${rel}: line ${line} uses a raw Markdown table; use stacked decision bullets or a responsive comparison component for mobile-first layout`);
  }

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
const mode = FILE_ARG ? 'file' : CHANGED_MODE || CHANGED_FILE_ARGS.length > 0 ? 'changed' : 'all';
if (!files.length && mode !== 'changed') {
  console.error('[audit-coverage-quality] no target. Pass --file <path> or --all.');
  process.exit(1);
}

const allFailures = gitIssues.concat(files.flatMap(checkFile));
const report = {
  ok: allFailures.length === 0,
  mode,
  files_checked: files.length,
  files: files.map(projectPath),
  failures: allFailures,
  argument_issues: [],
};

emitReport(report);
process.exit(report.ok ? 0 : 1);

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (report.mode === 'argument-error') {
    console.error('[audit-coverage-quality] invalid arguments:');
    for (const issue of report.argument_issues) console.error(`  x ${issue.detail}`);
  } else if (report.failures.length) {
    console.error(`[audit-coverage-quality] x ${report.failures.length} blocking issue(s) across ${report.files_checked} file(s):`);
    for (const f of report.failures.slice(0, 100)) console.error(`  x ${f}`);
  } else if (report.mode === 'changed' && report.files_checked === 0) {
    console.log('[audit-coverage-quality] changed comparison gate skipped, no changed comparison files.');
  } else {
    console.log(`[audit-coverage-quality] ok: ${report.files_checked} comparison file(s) meet the auto-merge bar.`);
  }
}
