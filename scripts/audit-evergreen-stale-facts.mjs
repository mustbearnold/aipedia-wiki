#!/usr/bin/env node
// Audit stale volatile facts in evergreen content.
//
// This is intentionally report-only by default. Use --fail-on-any once the
// existing backlog is cleaned up and the audit is ready to become a build gate.
// Use --fail-on-high for transitional gates that only block high-severity hits.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const PROJECT_DIR = process.cwd();
const CONTENT_DIR = join(PROJECT_DIR, 'src', 'content');

const args = new Set(process.argv.slice(2));
const asJson = args.has('--json');
const failOnHigh = args.has('--fail-on-high');
const failOnAny = args.has('--fail-on-any');

// News is allowed to mention historical model names. Dead-tool pages are also
// historical by nature. Everything else should describe the current buyer-facing
// state or avoid volatile names entirely.
const EXCLUDED_COLLECTIONS = new Set(['news', 'dead', 'reports']);

const PATTERNS = [
  {
    id: 'gpt-54',
    label: 'GPT-5.4 in evergreen content',
    severity: 'high',
    re: /\bGPT-5\.4(?:-[A-Za-z0-9]+)?\b/g,
    guidance:
      'Replace with canonical ChatGPT/OpenAI model wording, usually GPT-5.5 or a plan-specific value from src/content/tools/chatgpt.md facts.',
  },
  {
    id: 'dall-e-3',
    label: 'DALL-E 3 in evergreen content',
    severity: 'high',
    re: /\bDALL[-·]E\s*3\b/gi,
    guidance:
      'DALL-E 3 is retired in current ChatGPT coverage. Use GPT Image 2 / gpt-image-2 where current image-generation capability is meant, or preserve only clearly historical references.',
  },
  {
    id: 'dall-e-4',
    label: 'DALL-E 4 in evergreen content',
    severity: 'high',
    re: /\bDALL[-·]E\s*4\b/gi,
    guidance:
      'DALL-E 4 is not a current canonical AIpedia ChatGPT fact. Verify and replace with GPT Image 2 / gpt-image-2 if the page means current ChatGPT image generation.',
  },
  {
    id: 'chatgpt-128k-context',
    label: 'ChatGPT 128K context claim',
    severity: 'high',
    re: /\b(?:ChatGPT\b[^.\n]{0,180}\b128\s*K\b[^.\n]{0,180}\bcontext|128\s*K\b[^.\n]{0,180}\bcontext[^.\n]{0,180}\bChatGPT)\b/gi,
    guidance:
      'Use canonical facts.context_window from src/content/tools/chatgpt.md; ChatGPT plan context differs from API context.',
  },
  {
    id: 'sora-2-current',
    label: 'Sora 2 as current ChatGPT video capability',
    severity: 'high',
    re: /\bSora[-\s]?2\b|\bSora\s+Turbo\b/gi,
    guidance:
      'Current ChatGPT facts say native video generation is not available after Sora retirement. Keep only historical/news references.',
  },
  {
    id: 'gpt-4o',
    label: 'GPT-4o in evergreen content',
    severity: 'review',
    re: /\bGPT-4o(?:\s+mini)?\b/gi,
    guidance:
      'May be historical or stale. Review against current canonical tool facts before changing.',
  },
];

function walkMarkdown(dir) {
  const entries = readdirSync(dir).sort();
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      if (!EXCLUDED_COLLECTIONS.has(relative(CONTENT_DIR, path).split(/[\\/]/)[0])) {
        files.push(...walkMarkdown(path));
      }
      continue;
    }
    if (entry.endsWith('.md')) files.push(path);
  }
  return files;
}

function lineNumber(text, index) {
  return text.slice(0, index).split('\n').length;
}

function lineText(text, line) {
  return text.split(/\r?\n/)[line - 1]?.trim() ?? '';
}

function readFrontmatter(text) {
  return text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)?.[1] ?? '';
}

function frontmatterScalar(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*([^\\r\\n]+)`, 'm'));
  return match?.[1]?.trim().replace(/^['\"]|['\"]$/g, '') ?? '';
}

function isHistoricallyAllowed(patternId, line) {
  const lower = line.toLowerCase();
  const provenanceField = /^\s*source(?:_label)?:\s*/i.test(line);
  const historical = /\b(retired|retire|discontinued|discontinue|dead|shutdown|shut down|replaced by|no longer|deprecation|historical|formerly)\b/i.test(line);

  // A source URL or source label can legitimately name an old model in a
  // retirement article slug. The rendered claim should be audited, not the
  // provenance pointer itself.
  if (provenanceField) {
    return true;
  }

  if (['dall-e-3', 'dall-e-4', 'sora-2-current', 'gpt-4o'].includes(patternId) && historical) {
    return true;
  }

  // GPT-4o Transcribe is a separate audio transcription product/model name,
  // not a stale ChatGPT model-current claim. Keep it visible on Whisper/audio
  // pages while still reviewing generic GPT-4o and GPT-4o mini mentions.
  if (patternId === 'gpt-4o' && /\bgpt-4o(?:\s+mini)?\s+transcribe\b|\bgpt-4o(?:-mini)?-transcribe\b/i.test(line)) {
    return true;
  }

  // Changelog and migration prose can legitimately mention the old model name.
  if (patternId === 'gpt-54' && /\b(from|replaced|migrated|updated)\b[^\n]{0,80}\bgpt-5\.4\b[^\n]{0,80}\bgpt-5\.5\b/i.test(lower)) {
    return true;
  }

  return false;
}

function auditFile(path) {
  const text = readFileSync(path, 'utf8');
  const frontmatter = readFrontmatter(text);
  const status = frontmatterScalar(frontmatter, 'status').toLowerCase();
  const type = frontmatterScalar(frontmatter, 'type').toLowerCase();
  if (status === 'dead' || type === 'dead') return [];

  const hits = [];
  for (const pattern of PATTERNS) {
    pattern.re.lastIndex = 0;
    let match;
    while ((match = pattern.re.exec(text)) !== null) {
      const line = lineNumber(text, match.index);
      const textLine = lineText(text, line);
      if (isHistoricallyAllowed(pattern.id, textLine)) {
        continue;
      }
      hits.push({
        id: pattern.id,
        label: pattern.label,
        severity: pattern.severity,
        line,
        match: match[0],
        text: textLine,
        guidance: pattern.guidance,
      });
      if (match.index === pattern.re.lastIndex) pattern.re.lastIndex += 1;
    }
  }
  return hits;
}

if (!existsSync(CONTENT_DIR)) {
  console.error('[audit-evergreen-stale-facts] missing src/content directory');
  process.exit(2);
}

const results = [];
for (const file of walkMarkdown(CONTENT_DIR)) {
  const hits = auditFile(file);
  if (hits.length === 0) continue;
  results.push({
    file: relative(PROJECT_DIR, file).replace(/\\/g, '/'),
    hits,
  });
}

const totals = {
  files: results.length,
  hits: results.reduce((sum, result) => sum + result.hits.length, 0),
  high: results.reduce((sum, result) => sum + result.hits.filter((hit) => hit.severity === 'high').length, 0),
  review: results.reduce((sum, result) => sum + result.hits.filter((hit) => hit.severity === 'review').length, 0),
};

const byPattern = PATTERNS.map((pattern) => ({
  id: pattern.id,
  label: pattern.label,
  severity: pattern.severity,
  hits: results.reduce((sum, result) => sum + result.hits.filter((hit) => hit.id === pattern.id).length, 0),
})).filter((row) => row.hits > 0);

const output = {
  totals,
  by_pattern: byPattern,
  results,
};

if (asJson) {
  console.log(JSON.stringify(output, null, 2));
} else if (totals.hits === 0) {
  console.log('[audit-evergreen-stale-facts] clean: no stale evergreen volatile facts found.');
} else {
  console.log(
    `[audit-evergreen-stale-facts] ${totals.hits} hit(s) in ${totals.files} evergreen file(s): ${totals.high} high, ${totals.review} review.`
  );
  for (const row of byPattern) {
    console.log(`- ${row.hits} ${row.severity}: ${row.label}`);
  }
  console.log('');
  for (const result of results.slice(0, 80)) {
    const sample = result.hits.slice(0, 4);
    console.log(`- ${result.file}`);
    for (const hit of sample) {
      console.log(`  L${hit.line} [${hit.severity}] ${hit.match}: ${hit.text}`);
    }
    if (result.hits.length > sample.length) {
      console.log(`  … ${result.hits.length - sample.length} more hit(s)`);
    }
  }
  if (results.length > 80) console.log(`\n… ${results.length - 80} more file(s) omitted`);
  console.log('\nReport-only by default. Add --fail-on-any when this backlog is cleaned up, or --fail-on-high for transitional high-severity-only gates.');
}

if ((failOnAny && totals.hits > 0) || (failOnHigh && totals.high > 0)) {
  process.exitCode = 1;
}
