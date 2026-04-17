#!/usr/bin/env node
// Pre-commit block: refuse commits introducing em-dashes (—) or en-dashes (–)
// in src/content/*.md. They read as AI tells and the Helpful Content system
// trains against them.
//
// Checks only the DIFF — pre-existing dashes elsewhere are left alone; only
// newly added lines in this commit are blocked.
//
// Bypass: AI_TELLS_SKIP=1 git commit ...

import { execSync } from 'node:child_process';

if (process.env.AI_TELLS_SKIP === '1') {
  console.log('[block-ai-tells] SKIPPED via AI_TELLS_SKIP=1');
  process.exit(0);
}

// Get the staged diff restricted to content markdown files.
let diff;
try {
  diff = execSync('git diff --cached --unified=0 -- "src/content/**/*.md"', { encoding: 'utf8' });
} catch { process.exit(0); }
if (!diff) process.exit(0);

const offending = [];
let currentFile = null;
let currentLine = 0;
for (const line of diff.split('\n')) {
  const fileMatch = line.match(/^\+\+\+ b\/(.+)$/);
  if (fileMatch) { currentFile = fileMatch[1]; continue; }
  const hunkMatch = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
  if (hunkMatch) { currentLine = Number(hunkMatch[1]) - 1; continue; }
  if (line.startsWith('+') && !line.startsWith('+++')) {
    currentLine++;
    const added = line.slice(1);
    if (/[—–]/.test(added)) {
      offending.push({ file: currentFile, line: currentLine, text: added.trim().slice(0, 100) });
    }
  } else if (!line.startsWith('-')) {
    currentLine++;
  }
}

if (offending.length === 0) process.exit(0);

console.error('\n\x1b[41;97m AI-TELL BLOCK \x1b[0m\n');
console.error('Em-dashes (—) and en-dashes (–) are banned in site content.');
console.error('They read as AI-generated markers and the Helpful Content system demotes them.\n');
for (const o of offending.slice(0, 20)) {
  console.error(`  \x1b[33m${o.file}:${o.line}\x1b[0m  ${o.text}`);
}
if (offending.length > 20) console.error(`  ... and ${offending.length - 20} more`);
console.error('\n\x1b[33mFIX:\x1b[0m replace — with ". " or ":", and – with "-".');
console.error('\x1b[2mBypass (do not): AI_TELLS_SKIP=1 git commit ...\x1b[0m\n');
process.exit(3);
