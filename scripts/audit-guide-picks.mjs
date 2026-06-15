#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  markdownFiles,
  parseSlug,
  readMarkdown,
  scalar,
  stripYamlQuotes,
} from './lib/fact-normalize.mjs';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const jsonMode = args.includes('--json');
const helpMode = args.includes('--help') || args.includes('-h');
const KNOWN_FLAGS = new Set(['--json', '--use-cases', '--tools', '--required', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--use-cases', '--tools', '--required', '--project-dir', '--root']);
const argumentIssues = collectArgumentIssues();

const DEFAULT_REQUIRED_GUIDES = [
  'best-ai-coding-assistant',
  'best-ai-video-generator',
  'best-ai-seo-tool',
  'best-ai-for-presentations',
  'best-ai-for-meeting-notes',
  'best-ai-for-blog-writing',
  'best-ai-for-cold-email',
  'ai-lead-generation',
  'best-ai-tools-for-marketers',
  'best-ai-tools-for-small-business',
  'best-ai-tools-for-freelancers',
  'best-ai-tools-for-agencies',
  'best-ai-tools-for-ecommerce',
  'best-ai-tools-for-sales-teams',
  'best-ai-tools-for-customer-support',
];

const REQUIRED_SLOTS = ['best_overall', 'budget', 'pro_team'];
const REQUIRED_PICK_FIELDS = ['tool', 'reason'];

function valueFor(name) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.slice(name.length + 1);
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
      if (!value || value.startsWith('-')) issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
    }
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/audit-guide-picks.mjs --json',
    '  node scripts/audit-guide-picks.mjs --project-dir <dir> --required <slugs>',
    '',
    'Options:',
    '  --json                 Emit a structured guide-picks audit report.',
    '  --use-cases <dir>      Read guide markdown files from a custom directory.',
    '  --tools <dir>          Read tool markdown files from a custom directory.',
    '  --required <slugs>     Comma-separated required guide slugs.',
    '  --project-dir <dir>    Audit another project root.',
    '  --root <dir>           Alias for --project-dir.',
    '  --help, -h             Print this help message.',
  ].join('\n');
}

function argumentFailureReport() {
  return {
    ok: false,
    mode: 'argument-error',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
    required_guides: [],
    guides_with_picks: 0,
    guides: [],
    issues: [],
  };
}

function emitArgumentFailure() {
  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(argumentFailureReport(), null, 2)}\n`);
  } else {
    console.error('[audit-guide-picks] Invalid arguments:');
    for (const issue of argumentIssues) console.error(`- ${issue.detail}`);
    console.error('');
    console.error(usage());
  }
  process.exit(1);
}

function resolveArgPath(name, fallback) {
  const value = valueFor(name);
  if (!value) return fallback;
  return isAbsolute(value) ? value : resolve(PROJECT_DIR, value);
}

function parseCsv(value) {
  return String(value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseToolsMentioned(frontmatter) {
  const raw = scalar(frontmatter, 'tools_mentioned');
  if (!raw) return [];
  const inline = raw.match(/^\[(.*)\]$/);
  if (!inline) return [];
  return inline[1]
    .split(',')
    .map((item) => stripYamlQuotes(item).trim())
    .filter(Boolean);
}

function parseGuidePicks(frontmatter) {
  const picks = {};
  const lines = frontmatter.split(/\r?\n/);
  let inRoot = false;
  let currentSlot = '';
  let inSources = false;
  let currentSource = null;

  for (const line of lines) {
    if (!inRoot) {
      if (/^guide_picks:\s*$/.test(line)) inRoot = true;
      continue;
    }

    if (line.trim() === '') continue;
    if (!/^\s+/.test(line)) break;

    const slot = line.match(/^\s{2}([A-Za-z0-9_]+):\s*$/);
    if (slot) {
      currentSlot = slot[1];
      picks[currentSlot] = picks[currentSlot] ?? { sources: [] };
      inSources = false;
      currentSource = null;
      continue;
    }

    if (!currentSlot) continue;

    if (/^\s{4}sources:\s*$/.test(line)) {
      inSources = true;
      currentSource = null;
      continue;
    }

    if (inSources) {
      const sourceStart = line.match(/^\s{6}-\s+([A-Za-z0-9_]+):\s*(.+)$/);
      if (sourceStart) {
        currentSource = { [sourceStart[1]]: stripYamlQuotes(sourceStart[2]) };
        picks[currentSlot].sources.push(currentSource);
        continue;
      }

      const sourceField = line.match(/^\s{8}([A-Za-z0-9_]+):\s*(.+)$/);
      if (currentSource && sourceField) {
        currentSource[sourceField[1]] = stripYamlQuotes(sourceField[2]);
      }
      continue;
    }

    const field = line.match(/^\s{4}([A-Za-z0-9_]+):\s*(.+)$/);
    if (field) {
      picks[currentSlot][field[1]] = stripYamlQuotes(field[2]);
    }
  }

  return picks;
}

function rel(path) {
  return relative(PROJECT_DIR, path).replaceAll(sep, '/');
}

if (helpMode) {
  console.log(usage());
  process.exit(0);
}

if (argumentIssues.length > 0) {
  emitArgumentFailure();
}

const useCasesDir = resolveArgPath('--use-cases', join(PROJECT_DIR, 'src/content/use-cases'));
const toolsDir = resolveArgPath('--tools', join(PROJECT_DIR, 'src/content/tools'));
const requiredGuides = parseCsv(valueFor('--required')).length
  ? parseCsv(valueFor('--required'))
  : DEFAULT_REQUIRED_GUIDES;

const DEAD_STATUSES = new Set(['dead', 'retired', 'acquired']);

const issues = [];
const reports = [];
const guideBySlug = new Map();

for (const path of markdownFiles(useCasesDir)) {
  const md = readMarkdown(path);
  const slug = parseSlug(md.frontmatter, path);
  guideBySlug.set(slug, { ...md, slug });
}

// Tool status by slug, so a guide can never recommend a dead/retired/acquired tool.
const toolStatusBySlug = new Map();
for (const path of markdownFiles(toolsDir)) {
  const md = readMarkdown(path);
  const slug = parseSlug(md.frontmatter, path);
  toolStatusBySlug.set(slug, String(scalar(md.frontmatter, 'status') ?? 'active').toLowerCase());
}

for (const slug of requiredGuides) {
  const guide = guideBySlug.get(slug);
  if (!guide) {
    issues.push({ code: 'required-guide-missing', guide: slug });
    continue;
  }
}

for (const guide of guideBySlug.values()) {
  const picks = parseGuidePicks(guide.frontmatter);
  const hasGuidePicks = Object.keys(picks).length > 0;
  const isRequired = requiredGuides.includes(guide.slug);
  const mentionedTools = new Set(parseToolsMentioned(guide.frontmatter));

  if (isRequired && !hasGuidePicks) {
    issues.push({ code: 'guide-picks-missing', guide: guide.slug, file: rel(guide.path) });
    continue;
  }

  if (!hasGuidePicks) continue;

  for (const slot of REQUIRED_SLOTS) {
    const pick = picks[slot];
    if (!pick) {
      issues.push({ code: 'guide-pick-slot-missing', guide: guide.slug, file: rel(guide.path), detail: slot });
      continue;
    }

    for (const field of REQUIRED_PICK_FIELDS) {
      if (!String(pick[field] ?? '').trim()) {
        issues.push({ code: 'guide-pick-field-missing', guide: guide.slug, file: rel(guide.path), detail: `${slot}.${field}` });
      }
    }

    if (pick.tool && mentionedTools.size > 0 && !mentionedTools.has(pick.tool)) {
      issues.push({ code: 'guide-pick-tool-not-mentioned', guide: guide.slug, file: rel(guide.path), detail: `${slot}: ${pick.tool}` });
    }

    if (pick.tool && !existsSync(join(toolsDir, `${pick.tool}.md`))) {
      issues.push({ code: 'guide-pick-tool-missing', guide: guide.slug, file: rel(guide.path), detail: `${slot}: ${pick.tool}` });
    }

    const sources = Array.isArray(pick.sources) ? pick.sources : [];
    if (sources.length === 0) {
      issues.push({ code: 'guide-pick-sources-missing', guide: guide.slug, file: rel(guide.path), detail: slot });
    }

    sources.forEach((source, index) => {
      if (!String(source.label ?? '').trim()) {
        issues.push({ code: 'guide-pick-source-label-missing', guide: guide.slug, file: rel(guide.path), detail: `${slot}.sources[${index}]` });
      }
      const url = String(source.url ?? '').trim();
      if (!/^https:\/\/[^/]+\S*/i.test(url)) {
        issues.push({ code: 'guide-pick-source-url-invalid', guide: guide.slug, file: rel(guide.path), detail: `${slot}.sources[${index}]: ${url || '(empty)'}` });
      }
    });
  }

  // A guide must never recommend a discontinued tool in any pick slot.
  for (const [slot, pick] of Object.entries(picks)) {
    const toolSlug = pick && pick.tool;
    if (!toolSlug) continue;
    const status = toolStatusBySlug.get(toolSlug);
    if (status && DEAD_STATUSES.has(status)) {
      issues.push({ code: 'guide-pick-tool-not-active', guide: guide.slug, file: rel(guide.path), detail: `${slot}: ${toolSlug} is ${status}` });
    }
  }

  reports.push({
    guide: guide.slug,
    file: rel(guide.path),
    required: isRequired,
    slots: REQUIRED_SLOTS.filter((slot) => Boolean(picks[slot])),
  });
}

const report = {
  ok: issues.length === 0,
  mode: 'audit',
  project_dir: PROJECT_DIR,
  argument_issues: [],
  required_guides: requiredGuides,
  guides_with_picks: reports.length,
  guides: reports.sort((a, b) => a.guide.localeCompare(b.guide)),
  issues,
};

if (jsonMode) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else if (report.ok) {
  console.log(`[audit-guide-picks] OK: ${reports.length} guide-pick page(s) checked; ${requiredGuides.length} required money guide(s) protected.`);
} else {
  console.error('[audit-guide-picks] Guide pick issues found:');
  for (const issue of issues) {
    console.error(`- ${issue.code}${issue.guide ? ` ${issue.guide}` : ''}${issue.detail ? ` (${issue.detail})` : ''}`);
  }
}

process.exit(report.ok ? 0 : 1);
