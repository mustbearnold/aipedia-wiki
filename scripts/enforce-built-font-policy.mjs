#!/usr/bin/env node
/**
 * Post-process generated build CSS so third-party defaults cannot reintroduce
 * non-Metropolis font stacks after Astro/Tailwind/Pagefind compilation.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const TARGET_DIRS = [
  join(ROOT, 'dist/client'),
  join(ROOT, 'public/pagefind'),
];
const SCANNED_EXTENSIONS = new Set(['.css', '.html', '.svg']);

function extname(path) {
  const idx = path.lastIndexOf('.');
  return idx === -1 ? '' : path.slice(idx).toLowerCase();
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...walk(full));
    else if (stat.isFile() && SCANNED_EXTENSIONS.has(extname(full))) out.push(full);
  }
  return out;
}

function enforce(text) {
  return text
    // Tailwind preflight includes named system fallbacks inside var() fallbacks.
    // AIpedia defines --default-font-family/--default-mono-font-family itself,
    // so keep the variable reference and drop the non-brand fallback list.
    .replace(/font-family:var\(--default-font-family,[^)]+\)/g, 'font-family:var(--default-font-family)')
    .replace(/font-family:var\(--default-mono-font-family,[^)]+\)/g, 'font-family:var(--default-mono-font-family)')
    .replace(/--font-sans:[^;}]+/g, '--font-sans:"Metropolis", sans-serif')
    .replace(/--font-mono:[^;}]+/g, '--font-mono:"Metropolis", sans-serif')
    // Pagefind ships generated CSS with a system fallback. Keep its public CSS
    // variables but make their fallback Metropolis-only.
    .replace(/var\(--pf-font,[^)]+\)/g, "var(--pf-font, 'Metropolis', sans-serif)")
    .replace(/var\(--pagefind-ui-font,[^)]+\)/g, "var(--pagefind-ui-font, 'Metropolis', sans-serif)")
    .replace(/--pagefind-ui-font:[^;]+;/g, "--pagefind-ui-font:'Metropolis',sans-serif;")
    // Ignored debug/public SVGs can be copied into dist locally. Normalize any
    // legacy social-card or placeholder-logo font stacks they contain.
    .replace(/font-family=(['\"])(?:(?!\1).)*(?:Inter|Geist|JetBrains|system-ui|Arial|Roboto|Segoe UI|ui-monospace|monospace)(?:(?!\1).)*\1/gi, 'font-family=$1Metropolis, sans-serif$1')
    .replace(/font-family:\s*[^;}\"]*(?:Inter|Geist|JetBrains|system-ui|Arial|Roboto|Segoe UI|ui-monospace|monospace)[^;}\"]*/gi, 'font-family: Metropolis, sans-serif');
}

let touched = 0;
for (const dir of TARGET_DIRS) {
  for (const file of walk(dir)) {
    const before = readFileSync(file, 'utf8');
    const after = enforce(before);
    if (after !== before) {
      writeFileSync(file, after);
      touched += 1;
    }
  }
}

console.log(`[font-policy] normalized ${touched} generated text asset(s).`);
