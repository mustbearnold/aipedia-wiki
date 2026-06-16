#!/usr/bin/env node
// Glossary gap-detector + quality-gate for AIpedia.
//
// The glossary is a single file (src/content/glossary/index.md) whose
// src/pages/glossary/index.astro route parses `## Term` sections split by
// lines of `---`. "Expanding the glossary" means appending more term sections.
//
// Modes:
//   --gaps   list seed terms not yet present (the backlog), ranked by seed order
//   --check  validate every term section meets the quality bar (the gate)
// Read-only. `--json` for structured output.

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const PROJECT_DIR = resolve(valueFor('--project-dir') || dirname(dirname(fileURLToPath(import.meta.url))));
const GLOSSARY_PATH = join(PROJECT_DIR, 'src', 'content', 'glossary', 'index.md');
const JSON_MODE = args.includes('--json');
const MODE = args.includes('--gaps') ? 'gaps' : args.includes('--check') ? 'check' : 'gaps';
const LIMIT = numberArg('--limit', 200);

// Curated seed list of high-value AI terms a buyer-facing AI wiki should define.
// Order is rough priority. Matching is case-insensitive and ignores parentheticals,
// so "MCP (Model Context Protocol)" matches an existing "MCP" heading.
const SEED_TERMS = [
  'Transformer', 'Attention Mechanism', 'Parameters', 'Pretraining', 'Diffusion Model',
  'Multimodal', 'Quantization', 'Knowledge Distillation', 'Chain-of-Thought', 'Temperature',
  'Zero-shot Learning', 'Few-shot Learning', 'In-context Learning', 'System Prompt', 'Prompt Injection',
  'Jailbreak', 'Guardrails', 'RLHF', 'Constitutional AI', 'AI Alignment',
  'AGI', 'Superintelligence', 'Frontier Model', 'Open Weights', 'Prompt Caching',
  'Function Calling', 'MCP (Model Context Protocol)', 'AI Agent', 'AI Orchestration', 'Semantic Search',
  'Grounding', 'Synthetic Data', 'Overfitting', 'Benchmark', 'Compute',
  'Inference Cost', 'Rate Limit', 'Throughput', 'Streaming', 'Batch Processing',
  'Red Teaming', 'AI Bias', 'Deepfake', 'Content Provenance (C2PA)', 'Zero Data Retention (ZDR)',
  'Edge AI', 'Local LLM', 'Text-to-Image', 'Text-to-Video', 'Image-to-Video',
  'Upscaling', 'Inpainting', 'Outpainting', 'Negative Prompt', 'Seed (Image Generation)',
  'Style Transfer', 'Speech-to-Text', 'Real-time Voice', 'Digital Human', 'Lip Sync',
  'Music Generation', 'Code Completion', 'Coding Agent', 'AI Copilot', 'App Builder',
  'Trigger and Action', 'Integration', 'Connector', 'MRR', 'Churn',
  'Usage-based Pricing', 'Seat-based Pricing', 'SSO', 'SOC 2', 'GDPR',
  'Knowledge Graph', 'Reranking', 'Chunking', 'Context Engineering', 'Tool Use',
  'Model Distillation', 'Mixture of Experts', 'Token Limit', 'Max Tokens', 'Sampling',
  'Top-p Sampling', 'Greedy Decoding', 'Beam Search', 'Logits', 'Attention Head',
  'Self-supervised Learning', 'Transfer Learning', 'Catastrophic Forgetting', 'Model Collapse', 'Data Drift',
  'Prompt Template', 'Output Parsing', 'Structured Output', 'JSON Mode', 'Guard Model',
  'Watermarking', 'Provenance', 'PII', 'Compliance', 'Audit Log',
];

function valueFor(name) {
  const inline = args.find((a) => a.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}
function numberArg(name, fallback) {
  const raw = valueFor(name);
  const n = raw === undefined ? NaN : Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : fallback;
}
// Normalize a term name for dedupe: lowercase, drop parentheticals and non-alphanumerics.
function norm(name) {
  return String(name)
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/[^a-z0-9]+/g, '')
    .trim();
}

if (!existsSync(GLOSSARY_PATH)) {
  console.error(`[audit-glossary] not found: ${GLOSSARY_PATH}`);
  process.exit(1);
}
const raw = readFileSync(GLOSSARY_PATH, 'utf8');
const body = raw.replace(/^---[\s\S]*?---\s*/, '');
const sections = body.split(/\r?\n---\r?\n/g).map((s) => s.trim()).filter((s) => s.startsWith('## '));
const existingNames = sections.map((s) => s.split('\n')[0].replace(/^##\s+/, '').trim());
const existingNorms = new Set(existingNames.map(norm));

/* ------------------------------------------------------------------ */
/*  Gaps mode                                                          */
/* ------------------------------------------------------------------ */
if (MODE === 'gaps') {
  const missing = SEED_TERMS.filter((t) => !existingNorms.has(norm(t)));
  const report = {
    ok: true,
    mode: 'gaps',
    existing_terms: existingNames.length,
    seed_terms: SEED_TERMS.length,
    missing_count: missing.length,
    target: 100,
    needed_for_target: Math.max(0, 100 - existingNames.length),
    missing: missing.slice(0, LIMIT),
  };
  if (JSON_MODE) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  else {
    console.log(`[audit-glossary] ${existingNames.length} terms present; ${missing.length} seed terms missing; need ${report.needed_for_target} more to reach 100.`);
    console.log(missing.slice(0, LIMIT).map((t, i) => `  ${i + 1}. ${t}`).join('\n'));
  }
  process.exit(0);
}

/* ------------------------------------------------------------------ */
/*  Check mode (quality gate)                                         */
/* ------------------------------------------------------------------ */
const PLACEHOLDER = [/\bTODO\b/, /\bTKTK\b/i, /lorem ipsum/i, /\bplaceholder\b/i, /\bXXX\b/];
const failures = [];
const seenNorms = new Set();

for (const section of sections) {
  const lines = section.split('\n');
  const name = lines.shift().replace(/^##\s+/, '').trim();
  // "See also:" sits on its own line (matching src/pages/glossary/index.astro),
  // often glued to the definition paragraph with no blank line, so detect it
  // line-by-line rather than by paragraph.
  const seeAlsoLine = lines.find((line) => line.trim().startsWith('See also:'));
  const definition = lines
    .filter((line) => !line.trim().startsWith('See also:'))
    .join(' ')
    .trim();

  if (!name) failures.push('a section is missing its term name');
  const n = norm(name);
  if (seenNorms.has(n)) failures.push(`${name}: duplicate term`);
  seenNorms.add(n);

  const wordCount = definition.split(/\s+/).filter(Boolean).length;
  if (wordCount < 20) failures.push(`${name}: definition too short (${wordCount} words, min 20)`);
  if (!seeAlsoLine) failures.push(`${name}: missing a "See also:" line`);
  else if (!/\[[^\]]+\]\([^)]+\)/.test(seeAlsoLine)) failures.push(`${name}: "See also:" has no links`);
  for (const re of PLACEHOLDER) if (re.test(section)) failures.push(`${name}: contains placeholder ${re}`);
}

const report = { ok: failures.length === 0, mode: 'check', terms_checked: sections.length, failures };
if (JSON_MODE) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
else if (failures.length) {
  console.error(`[audit-glossary] check FAILED: ${failures.length} issue(s) across ${sections.length} terms:`);
  for (const f of failures.slice(0, 60)) console.error(`  x ${f}`);
} else {
  console.log(`[audit-glossary] check passed: ${sections.length} terms meet the bar.`);
}
process.exit(report.ok ? 0 : 1);
