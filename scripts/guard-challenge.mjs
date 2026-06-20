#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const DEFAULT_PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const args = process.argv.slice(2);

export const VALID_STATUSES = new Set(['proposed', 'accepted', 'rejected', 'escalated']);
export const VALID_DECISIONS = new Set(['pending', 'fix-code', 'narrow-guard', 'update-fixture', 'retire-guard', 'human-escalate']);
const FINAL_STATUSES = new Set(['accepted', 'rejected', 'escalated']);
const ROLE_FIELDS = ['Implementer', 'Guard defender', 'Arbitrator'];
const REQUIRED_FIELDS = ['Date', 'Status', 'Failing command', 'Guard files', 'Product files', 'Decision', ...ROLE_FIELDS];
const REQUIRED_SECTIONS = [
  'Implementer brief',
  'Guard defender brief',
  'Arbitrator decision',
  'Fixture or test change',
  'Verification',
  'Follow-up risk',
];
const IMPLEMENTER_BRIEF_TEMPLATE = 'The current guard failure blocks productive work. The implementer must replace this paragraph with the exact failure output, intended change, and reason the guard appears stale, over-broad, or misaligned.';
const SECTION_TEMPLATE_TEXT = new Map([
  ['Implementer brief', IMPLEMENTER_BRIEF_TEMPLATE],
]);
const RUNNABLE_COMMAND_PREFIX = '(?:npm\\s+run|node|npx|playwright)\\b';
const RUNNABLE_COMMAND_LABEL_PATTERN = new RegExp('(?:^|\\n)\\s*(?:Run|Command):[^\\S\\r\\n]*`?' + RUNNABLE_COMMAND_PREFIX);
const RUNNABLE_COMMAND_BACKTICK_PATTERN = new RegExp('`\\s*' + RUNNABLE_COMMAND_PREFIX);
const RUNNABLE_COMMAND_LINE_PATTERN = new RegExp('(?:^|\\n)\\s*`?' + RUNNABLE_COMMAND_PREFIX);
const TEST_OR_FIXTURE_EVIDENCE_PATTERN = /\b(?:tests?\/[^\s`]+|fixtures?\/[^\s`]+|[^\s`]*fixtures?\/[^\s`]+|[^\s`]+fixture[^\s`]+\.[A-Za-z0-9]+|[^\s`]+\.test\.(?:mjs|cjs|js|ts|tsx|jsx))\b/i;

function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index >= 0) return args[index + 1] ?? '';
  const inlineArg = args.find((arg) => arg.startsWith(`${flag}=`));
  return inlineArg ? inlineArg.slice(flag.length + 1) : '';
}

function valuesFor(flag) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === flag) {
      for (let valueIndex = index + 1; valueIndex < args.length && !args[valueIndex].startsWith('--'); valueIndex += 1) {
        values.push(args[valueIndex]);
      }
    } else if (args[index].startsWith(`${flag}=`)) {
      values.push(args[index].slice(flag.length + 1));
    }
  }
  return values.flatMap((value) => value.split(',').map((part) => part.trim()).filter(Boolean));
}

function hasFlag(flag) {
  return args.includes(flag) || args.some((arg) => arg.startsWith(`${flag}=`));
}

function todayLabel() {
  if (valueFor('--date')) return valueFor('--date');
  return new Date().toISOString().slice(0, 10);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function sectionText(text, section) {
  const pattern = new RegExp(`^## ${escapeRegExp(section)}\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'm');
  return pattern.exec(text)?.[1]?.trim() ?? '';
}

function hasSection(text, section) {
  return new RegExp(`^## ${escapeRegExp(section)}\\s*$`, 'm').test(text);
}

function fieldText(text, field) {
  const pattern = new RegExp(`^\\*\\*${escapeRegExp(field)}:\\*\\*\\s*(.*)$`, 'm');
  return pattern.exec(text)?.[1]?.trim() ?? '';
}

function isPendingText(value) {
  const normalized = value.trim().toLowerCase();
  return normalized === '' || normalized === 'pending' || normalized === 'pending.';
}

function isTemplateText(section, value) {
  return SECTION_TEMPLATE_TEXT.get(section) === value.trim();
}

function textNamesRunnableCommand(value) {
  return RUNNABLE_COMMAND_LABEL_PATTERN.test(value)
    || RUNNABLE_COMMAND_BACKTICK_PATTERN.test(value)
    || RUNNABLE_COMMAND_LINE_PATTERN.test(value);
}

function isFixturePlaceholder(value) {
  const normalized = value.trim().toLowerCase().replace(/[.。]+$/g, '').replace(/\s+/g, ' ');
  return ['none', 'n/a', 'na', 'not applicable', 'no fixture needed'].includes(normalized);
}

function fixtureOrTestEvidence(value) {
  return !isFixturePlaceholder(value)
    && (TEST_OR_FIXTURE_EVIDENCE_PATTERN.test(value) || textNamesRunnableCommand(value));
}

export function parseChallenge(text, filePath = '') {
  return {
    filePath,
    text,
    title: /^# Guard Challenge:\s*(.+)$/m.exec(text)?.[1]?.trim() ?? '',
    fields: Object.fromEntries(REQUIRED_FIELDS.map((field) => [field, fieldText(text, field)])),
    sections: Object.fromEntries(REQUIRED_SECTIONS.map((section) => [section, sectionText(text, section)])),
  };
}

export function validateChallenge(record) {
  const issues = [];
  const add = (code, detail) => issues.push({ code, detail, file: record.filePath });

  if (!record.title) add('title-missing', 'challenge title must use # Guard Challenge: <name>');

  for (const field of REQUIRED_FIELDS) {
    if (!record.fields[field]) add(`field-missing:${field}`, `${field} is required`);
  }

  const status = record.fields.Status;
  const decision = record.fields.Decision;
  if (status && !VALID_STATUSES.has(status)) add('status-invalid', `Status must be one of ${[...VALID_STATUSES].join(', ')}`);
  if (decision && !VALID_DECISIONS.has(decision)) add('decision-invalid', 'Decision must be pending or one of the accepted decisions');
  if (FINAL_STATUSES.has(status) && decision === 'pending') add('decision-pending-final', 'final challenge records cannot keep Decision pending');

  for (const section of REQUIRED_SECTIONS) {
    if (!hasSection(record.text, section)) add(`section-missing:${section}`, `${section} section is required`);
  }

  if (status === 'accepted') {
    const roleIdentities = [];
    for (const role of ROLE_FIELDS) {
      const identity = record.fields[role] || '';
      if (isPendingText(identity)) add(`role-pending:${role}`, `${role} must name a non-pending person or agent`);
      else roleIdentities.push(identity.trim().toLowerCase());
    }
    if (new Set(roleIdentities).size !== roleIdentities.length) {
      add('role-not-distinct', 'accepted challenge roles must name three distinct people or agents');
    }
    for (const section of REQUIRED_SECTIONS) {
      if (isPendingText(record.sections[section])) add(`section-pending:${section}`, `${section} must contain final evidence`);
      if (isTemplateText(section, record.sections[section])) add(`section-template:${section}`, `${section} must replace generated template text`);
    }
    if (!fixtureOrTestEvidence(record.sections['Fixture or test change'] || '')) {
      add('fixture-test-evidence-missing', 'Fixture or test change must name a test path, fixture path, .test.mjs file, or runnable command');
    }
    if (!textNamesRunnableCommand(record.sections.Verification || '')) {
      add('verification-command-missing', 'Verification must name at least one runnable command');
    }
  }

  return issues;
}

function challengeFiles(projectDir) {
  const challengeDir = join(projectDir, '.agent', 'guard-challenges');
  if (!existsSync(challengeDir)) return [];
  return readdirSync(challengeDir)
    .filter((name) => /-challenge\.md$/.test(name))
    .map((name) => join(challengeDir, name));
}

export function validateProject(projectDir = DEFAULT_PROJECT_DIR) {
  const files = challengeFiles(projectDir);
  const issues = [];
  for (const file of files) {
    const record = parseChallenge(readFileSync(file, 'utf8'), file);
    issues.push(...validateChallenge(record));
  }
  return { ok: issues.length === 0, checked: files.length, issues };
}

function challengeTemplate({ date, title, command, guardFiles, productFiles }) {
  return `# Guard Challenge: ${title}\n\n**Date:** ${date}\n**Status:** proposed\n**Failing command:** ${command}\n**Guard files:** ${guardFiles.join(', ')}\n**Product files:** ${productFiles.join(', ')}\n**Decision:** pending\n**Implementer:** pending\n**Guard defender:** pending\n**Arbitrator:** pending\n\n## Implementer brief\n\n${IMPLEMENTER_BRIEF_TEMPLATE}\n\n## Guard defender brief\n\nPending.\n\n## Arbitrator decision\n\nPending.\n\n## Fixture or test change\n\nPending.\n\n## Verification\n\nPending.\n\n## Follow-up risk\n\nPending.\n`;
}

function createChallenge(projectDir) {
  const command = valueFor('--command');
  const guardFiles = valuesFor('--guard').concat(valuesFor('--guards'));
  const productFiles = valuesFor('--file').concat(valuesFor('--files'));
  if (!command || guardFiles.length === 0 || productFiles.length === 0) {
    throw new Error('create mode requires --command, --guard, and --files');
  }

  const title = valueFor('--title') || basename(guardFiles[0]).replace(/\.mjs$/, '');
  const date = todayLabel();
  const challengeDir = join(projectDir, '.agent', 'guard-challenges');
  mkdirSync(challengeDir, { recursive: true });
  const path = join(challengeDir, `${date}-${slugify(title)}-challenge.md`);
  if (existsSync(path)) throw new Error(`challenge already exists: ${path}`);

  writeFileSync(path, challengeTemplate({ date, title, command, guardFiles, productFiles }), 'utf8');
  return path;
}

function printHelp() {
  console.log(`Usage:\n  node scripts/guard-challenge.mjs --command <cmd> --guard <path> --files <paths...> [--title <name>]\n  node scripts/guard-challenge.mjs --check [--json]\n\nCreates or validates AiPedia guard challenge artifacts.`);
}

function main() {
  if (hasFlag('--help') || hasFlag('-h')) {
    printHelp();
    return;
  }

  const projectDir = resolve(valueFor('--project-dir') || valueFor('--root') || DEFAULT_PROJECT_DIR);
  const jsonMode = hasFlag('--json');

  if (hasFlag('--check')) {
    const report = validateProject(projectDir);
    if (jsonMode) console.log(`${JSON.stringify(report, null, 2)}\n`);
    else if (report.ok) console.log(`[guard-challenge] OK: ${report.checked} challenge record(s) checked.`);
    else {
      console.error(`[guard-challenge] FAILED: ${report.issues.length} issue(s) across ${report.checked} challenge record(s).`);
      for (const issue of report.issues) console.error(`${issue.code}\t${issue.file}\t${issue.detail}`);
    }
    process.exit(report.ok ? 0 : 1);
  }

  const path = createChallenge(projectDir);
  console.log(`[guard-challenge] Created ${path}`);
  console.log('[guard-challenge] Next: fill Implementer brief, then ask a guard defender to write the invariant review.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    main();
  } catch (error) {
    console.error(`[guard-challenge] ${error.message}`);
    process.exit(1);
  }
}
