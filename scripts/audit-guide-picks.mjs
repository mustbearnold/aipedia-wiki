#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  markdownFiles,
  parseSlug,
  readMarkdown,
  scalar,
  stripYamlQuotes,
} from './lib/fact-normalize.mjs';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const jsonMode = process.argv.includes('--json');

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

function argValue(name) {
  const equalsArg = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function resolveArgPath(name, fallback) {
  const value = argValue(name);
  if (!value) return fallback;
  return isAbsolute(value) ? value : join(PROJECT_DIR, value);
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

const useCasesDir = resolveArgPath('--use-cases', join(PROJECT_DIR, 'src/content/use-cases'));
const toolsDir = resolveArgPath('--tools', join(PROJECT_DIR, 'src/content/tools'));
const requiredGuides = parseCsv(argValue('--required')).length
  ? parseCsv(argValue('--required'))
  : DEFAULT_REQUIRED_GUIDES;

const issues = [];
const reports = [];
const guideBySlug = new Map();

for (const path of markdownFiles(useCasesDir)) {
  const md = readMarkdown(path);
  const slug = parseSlug(md.frontmatter, path);
  guideBySlug.set(slug, { ...md, slug });
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

  reports.push({
    guide: guide.slug,
    file: rel(guide.path),
    required: isRequired,
    slots: REQUIRED_SLOTS.filter((slot) => Boolean(picks[slot])),
  });
}

const report = {
  ok: issues.length === 0,
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
