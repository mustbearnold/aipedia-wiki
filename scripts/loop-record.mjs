#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rawArgs = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const KNOWN_FLAGS = new Set([
  '--date',
  '--slug',
  '--status',
  '--route',
  '--commit',
  '--branch',
  '--check',
  '--checks',
  '--changed',
  '--changed-file',
  '--changed-files',
  '--failure',
  '--risk',
  '--next',
  '--note',
  '--project-dir',
  '--root',
  '--json',
  '--help',
  '-h',
]);
const VALUE_FLAGS = new Set([
  '--date',
  '--slug',
  '--status',
  '--route',
  '--commit',
  '--branch',
  '--check',
  '--checks',
  '--changed',
  '--changed-file',
  '--changed-files',
  '--failure',
  '--risk',
  '--next',
  '--note',
  '--project-dir',
  '--root',
]);

function hasFlag(flag) {
  return rawArgs.includes(flag) || rawArgs.some((arg) => arg.startsWith(`${flag}=`));
}

function valueFor(flag) {
  const inlineArg = rawArgs.find((arg) => arg.startsWith(`${flag}=`));
  if (inlineArg) return inlineArg.slice(flag.length + 1);
  const index = rawArgs.indexOf(flag);
  return index >= 0 ? rawArgs[index + 1] : '';
}

function valuesFor(...flags) {
  const values = [];
  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    for (const flag of flags) {
      if (arg === flag) {
        for (let valueIndex = index + 1; valueIndex < rawArgs.length && !rawArgs[valueIndex].startsWith('--'); valueIndex += 1) {
          values.push(rawArgs[valueIndex]);
        }
      } else if (arg.startsWith(`${flag}=`)) {
        values.push(arg.slice(flag.length + 1));
      }
    }
  }
  return values.flatMap((value) => value.split(',').map((part) => part.trim()).filter(Boolean));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/loop-record.mjs --date 2026-06-20 --slug example --status complete --route /compare/example/',
    '',
    'Options:',
    '  --date <YYYY-MM-DD>    Loop date.',
    '  --slug <slug>          Loop cluster slug.',
    '  --status <status>      complete, partial, blocked, or failed.',
    '  --route <path>         Primary rendered route.',
    '  --commit <sha>         Commit containing the work, or this commit before committing.',
    '  --branch <name>        Git branch.',
    '  --changed <path>       Changed path. Alias: --changed-file, --changed-files.',
    '  --check <text>         Verification command or result. Repeatable or comma-separated via --checks.',
    '  --failure <text>       Failure found and fixed or still open.',
    '  --risk <text>          Residual risk.',
    '  --next <text>          Next recommended action.',
    '  --note <text>          Freeform note.',
    '  --json                 Emit a structured report.',
  ].join('\n');
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of rawArgs.entries()) {
    if (!arg.startsWith('-')) {
      const previous = rawArgs[index - 1] ?? '';
      if (!VALUE_FLAGS.has(previous)) issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
    if (VALUE_FLAGS.has(name)) {
      const value = arg.includes('=') ? arg.slice(name.length + 1) : rawArgs[index + 1] ?? '';
      if (!value || value.startsWith('-')) issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
    }
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  const date = valueFor('--date');
  if (!date) issues.push({ code: 'argument-invalid', detail: '--date is required' });
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) issues.push({ code: 'argument-invalid', detail: '--date must be YYYY-MM-DD' });

  if (!valueFor('--slug')) issues.push({ code: 'argument-invalid', detail: '--slug is required' });
  const status = valueFor('--status') || 'complete';
  if (!['complete', 'partial', 'blocked', 'failed'].includes(status)) {
    issues.push({ code: 'argument-invalid', detail: '--status must be complete, partial, blocked, or failed' });
  }
  return issues;
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function bulletList(values, fallback) {
  if (!values.length) return `- ${fallback}\n`;
  return values.map((value) => `- ${value}`).join('\n') + '\n';
}

function recordMarkdown(record) {
  return `# ${record.date}: ${record.slug}

## Summary

- Status: ${record.status}
- Route: ${record.route || 'Not recorded'}
- Branch: ${record.branch || 'Not recorded'}
- Commit: ${record.commit || 'Not recorded'}

## Changed Files

${bulletList(record.changed_files, 'Not recorded')}
## Verification

${bulletList(record.checks, 'Not recorded')}
## Failures Or Fixes

${bulletList(record.failures, 'None recorded')}
## Residual Risks

${bulletList(record.risks, 'None recorded')}
## Notes

${bulletList(record.notes, 'None recorded')}
## Next

${record.next ? `- ${record.next}\n` : '- Not recorded\n'}`;
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  if (!report.ok) {
    console.error('[loop-record] invalid arguments:');
    for (const issue of report.argument_issues) console.error(`  x ${issue.detail}`);
    return;
  }

  console.log(`[loop-record] wrote ${report.path}`);
}

function main() {
  if (HELP_MODE) {
    console.log(usage());
    return 0;
  }

  const argumentIssues = collectArgumentIssues();
  if (argumentIssues.length) {
    emitReport({ ok: false, mode: 'argument-error', argument_issues: argumentIssues });
    return 2;
  }

  const date = valueFor('--date');
  const slug = slugify(valueFor('--slug'));
  const record = {
    date,
    slug,
    status: valueFor('--status') || 'complete',
    route: valueFor('--route'),
    commit: valueFor('--commit'),
    branch: valueFor('--branch'),
    changed_files: valuesFor('--changed', '--changed-file', '--changed-files'),
    checks: valuesFor('--check', '--checks'),
    failures: valuesFor('--failure'),
    risks: valuesFor('--risk'),
    notes: valuesFor('--note'),
    next: valueFor('--next'),
  };

  const dir = join(PROJECT_DIR, '.agent', 'loop-runs');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const path = join(dir, `${date}-${slug}.md`);
  writeFileSync(path, recordMarkdown(record), 'utf8');
  emitReport({ ok: true, mode: 'loop-record', path, record });
  return 0;
}

process.exit(main());
