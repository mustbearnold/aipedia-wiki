#!/usr/bin/env node
// Guard volatile tool facts that should come from canonical tool frontmatter.
//
// Why: comparison pages are numerous, and facts like ChatGPT's flagship model,
// context window, and image-generation engine change often. This guard keeps
// those values from being hardcoded into ChatGPT comparison prose/tables.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const TOOLS_DIR = join(PROJECT_DIR, 'src', 'content', 'tools');
const COMPARISONS_DIR = join(PROJECT_DIR, 'src', 'content', 'comparisons');

const REQUIRED_FACTS = {
  chatgpt: [
    'flagship_model',
    'context_window',
    'image_generation',
    'real_time_voice',
    'web_browsing',
    'best_paid_tier',
  ],
  claude: ['flagship_model', 'context_window', 'best_paid_tier', 'coding_agent'],
  gemini: [
    'flagship_model',
    'context_window',
    'image_generation',
    'video_generation',
    'best_paid_tier',
  ],
  grok: ['flagship_model', 'context_window', 'real_time_voice', 'best_paid_tier'],
  deepseek: ['flagship_model', 'context_window', 'best_for'],
  midjourney: ['flagship_model', 'image_generation', 'best_paid_tier'],
  runway: ['video_generation', 'best_paid_tier', 'best_for'],
  elevenlabs: ['real_time_voice', 'best_paid_tier', 'best_for'],
  cursor: ['coding_agent', 'best_paid_tier', 'best_for'],
  'github-copilot': ['coding_agent', 'best_paid_tier', 'best_for'],
};

const CANONICAL_FACT_TOOL_SLUGS = new Set(Object.keys(REQUIRED_FACTS));

const STALE_FACT_PATTERNS = [
  { re: /\bGPT-5\.4\b/g, label: 'GPT-5.4' },
  { re: /\bDALL[-·]E\s*3\b/gi, label: 'DALL-E 3 / DALL·E 3' },
  {
    re: /\bChatGPT\b[^.;\n]*(?:128\s*[Kk]|2\s*M|2\s+million)[^.;\n]*(?:context|input tokens?|token contexts?|tokens?)\b/gi,
    label: 'stale ChatGPT context window claim',
  },
  {
    re: /\bContext\s+(?:in|for)\s+ChatGPT\b[^.;\n]*(?:128\s*[Kk]|2\s*M|2\s+million)[^.;\n]*(?:context|input tokens?|tokens?)\b/gi,
    label: 'stale ChatGPT context window claim',
  },
  {
    re: /\b1M-token API context \(ChatGPT tier windows not fully published\)\s+(?:contexts?|context window)\b/gi,
    label: 'duplicated ChatGPT context wording',
  },
];

function readMarkdownFiles(dir) {
  return readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const path = join(dir, name);
      const raw = readFileSync(path, 'utf8');
      const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const body = frontmatter ? raw.slice(frontmatter[0].length) : raw;
      return { name, path, raw, frontmatter: frontmatter?.[1] ?? '', body };
    });
}

function stripYamlQuotes(value) {
  const trimmed = String(value ?? '').trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseSlug(frontmatter, fallbackName) {
  const match = frontmatter.match(/^slug:\s*(.+)$/m);
  return match ? stripYamlQuotes(match[1]) : fallbackName.replace(/\.md$/, '');
}

function parseToolList(frontmatter) {
  const inline = frontmatter.match(/^tools:\s*\[([^\]]*)\]/m);
  if (inline) {
    return inline[1]
      .split(',')
      .map((part) => stripYamlQuotes(part.trim()))
      .filter(Boolean);
  }

  const block = frontmatter.match(/^tools:\s*\n((?:\s+-\s+.+\n?)+)/m);
  if (!block) return [];
  return block[1]
    .split('\n')
    .map((line) => line.match(/^\s+-\s+(.+)$/)?.[1])
    .filter(Boolean)
    .map(stripYamlQuotes);
}

function parseFacts(frontmatter) {
  const facts = {};
  const lines = frontmatter.split(/\r?\n/);
  let inFacts = false;
  let currentKey = '';

  for (const line of lines) {
    if (!inFacts) {
      if (/^facts:\s*$/.test(line)) inFacts = true;
      continue;
    }

    if (line.trim() === '') continue;
    if (!/^\s+/.test(line)) break;

    const scalar = line.match(/^\s{2}([A-Za-z0-9_]+):\s*(.+)$/);
    if (scalar && scalar[2].trim() !== '') {
      currentKey = scalar[1];
      facts[currentKey] = { value: stripYamlQuotes(scalar[2]) };
      continue;
    }

    const nested = line.match(/^\s{2}([A-Za-z0-9_]+):\s*$/);
    if (nested) {
      currentKey = nested[1];
      facts[currentKey] = facts[currentKey] ?? {};
      continue;
    }

    const nestedValue = line.match(/^\s{4}([A-Za-z0-9_]+):\s*(.+)$/);
    if (currentKey && nestedValue) {
      facts[currentKey][nestedValue[1]] = stripYamlQuotes(nestedValue[2]);
    }
  }

  return facts;
}

function findLine(text, index) {
  return text.slice(0, index).split('\n').length;
}

function projectPath(path) {
  return relative(PROJECT_DIR, path).replace(/\\/g, '/');
}

const failures = [];
const warnings = [];

if (!existsSync(TOOLS_DIR) || !existsSync(COMPARISONS_DIR)) {
  console.error('[guard-stale-facts] missing src/content tools or comparisons directory');
  process.exit(2);
}

const toolFactsBySlug = new Map();
for (const file of readMarkdownFiles(TOOLS_DIR)) {
  const slug = parseSlug(file.frontmatter, file.name);
  toolFactsBySlug.set(slug, parseFacts(file.frontmatter));
}

for (const [slug, keys] of Object.entries(REQUIRED_FACTS)) {
  const facts = toolFactsBySlug.get(slug) ?? {};
  for (const key of keys) {
    const value = facts[key]?.value;
    if (!value) {
      failures.push(`src/content/tools/${slug}.md is missing canonical facts.${key}.value`);
    }
  }
}

const comparisons = readMarkdownFiles(COMPARISONS_DIR);
for (const file of comparisons) {
  const toolSlugs = parseToolList(file.frontmatter);
  const needsCanonicalFacts = toolSlugs.some((slug) => CANONICAL_FACT_TOOL_SLUGS.has(slug));

  if (needsCanonicalFacts) {
    if (!/^canonical_fact_table:\s*true\s*$/m.test(file.frontmatter)) {
      failures.push(
        `${projectPath(file.path)}: comparisons involving ${toolSlugs
          .filter((slug) => CANONICAL_FACT_TOOL_SLUGS.has(slug))
          .join(', ')} must set canonical_fact_table: true so the layout renders canonical facts`
      );
    }

    if (/^##\s+At a Glance\s*$/m.test(file.body)) {
      failures.push(
        `${projectPath(file.path)}: contains manual "## At a Glance"; comparisons with canonical facts must use the generated fact table`
      );
    }
  }

  if (toolSlugs.includes('chatgpt')) {
    for (const pattern of STALE_FACT_PATTERNS) {
      pattern.re.lastIndex = 0;
      let match;
      while ((match = pattern.re.exec(file.raw)) !== null) {
        failures.push(
          `${projectPath(file.path)}:${findLine(file.raw, match.index)} hardcodes stale ChatGPT fact "${pattern.label}"`
        );
      }
    }
  }

  const tokenRe = /\{\{fact:([a-z0-9-]+)\.([A-Za-z0-9_]+)\}\}/g;
  let token;
  while ((token = tokenRe.exec(file.raw)) !== null) {
    const [, slug, key] = token;
    const value = toolFactsBySlug.get(slug)?.[key]?.value;
    if (!value) {
      failures.push(
        `${projectPath(file.path)}:${findLine(file.raw, token.index)} references missing fact token {{fact:${slug}.${key}}}`
      );
    }
  }
}

if (failures.length > 0) {
  console.error('\n\x1b[41;97m STALE FACT GUARD FAILED \x1b[0m\n');
  console.error('Volatile tool facts are hardcoded or missing canonical sources.');
  console.error('Move current facts into src/content/tools/<slug>.md frontmatter under `facts:` and let comparison pages render/generated-tokenize them.\n');
  for (const failure of failures.slice(0, 120)) console.error(`  ✗ ${failure}`);
  if (failures.length > 120) console.error(`  … ${failures.length - 120} more failure(s) omitted`);
  console.error('');
  process.exit(2);
}

for (const warning of warnings) console.warn(`  ! ${warning}`);
console.log(
  `[guard-stale-facts] ✓ canonical facts present for ${Object.keys(REQUIRED_FACTS).length} volatile tools; covered comparisons use generated fact tables.`
);
