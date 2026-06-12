#!/usr/bin/env node
// Guard the no-em-dash hard rule in RENDERED content output.
//
// Why: em dashes read as AI-generated and are banned in any written output.
// They sneak in two ways that a naive `grep` for the literal character misses:
//   1. A literal em dash (U+2014) typed into content.
//   2. A source `--` (double hyphen) that the markdown pipeline (smartypants)
//      renders as an em dash. This also silently corrupts CLI commands like
//      `npm test -- path` unless they are wrapped in a code span.
//
// This guard scans src/content markdown, strips frontmatter + fenced code
// blocks + inline code spans (where `--` is legitimate and not converted),
// and fails on a literal em dash or a ` -- ` in the remaining prose.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const CONTENT_DIR = join(PROJECT_DIR, 'src', 'content');
const JSON_MODE = process.argv.includes('--json');

const EM_DASH = '—';

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (entry.endsWith('.md')) out.push(p);
  }
  return out;
}

function stripForProse(raw) {
  // Blank out frontmatter, fenced code blocks, and inline code spans so that
  // legitimate `--` inside code (e.g. `npm test -- path`) is not flagged.
  // Replacement preserves newlines so reported line numbers stay accurate.
  const blank = (s) => s.replace(/[^\n]/g, '');
  let body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---/, blank);
  body = body.replace(/```[\s\S]*?```/g, blank);
  body = body.replace(/`[^`\n]*`/g, blank);
  return body;
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

const failures = [];
const files = walk(CONTENT_DIR);

for (const file of files) {
  const raw = readFileSync(file, 'utf8');
  const prose = stripForProse(raw);
  const rel = relative(PROJECT_DIR, file).replace(/\\/g, '/');

  let idx = prose.indexOf(EM_DASH);
  while (idx !== -1) {
    failures.push(`${rel}:${lineOf(prose, idx)} contains a literal em dash (U+2014)`);
    idx = prose.indexOf(EM_DASH, idx + 1);
  }

  const dd = / -- /g;
  let m;
  while ((m = dd.exec(prose)) !== null) {
    failures.push(`${rel}:${lineOf(prose, m.index)} contains " -- " (renders as an em dash; use a colon/comma, or wrap a CLI command in a code span)`);
  }
}

if (JSON_MODE) {
  console.log(JSON.stringify({ ok: failures.length === 0, scanned: files.length, failures }, null, 2));
  process.exit(failures.length === 0 ? 0 : 2);
}

if (failures.length > 0) {
  console.error('\n\x1b[41;97m EM DASH GUARD FAILED \x1b[0m\n');
  console.error('Em dashes are banned in rendered output (they read as AI-generated).');
  console.error('Replace a literal em dash, or change a prose " -- " to a colon/comma; wrap CLI commands in a code span so `--` is preserved and not converted.\n');
  for (const f of failures.slice(0, 100)) console.error(`  ✗ ${f}`);
  if (failures.length > 100) console.error(`  … ${failures.length - 100} more`);
  console.error('');
  process.exit(2);
}

console.log(`[guard-em-dashes] ✓ no em dashes (literal or rendered from " -- ") across ${files.length} content files.`);
