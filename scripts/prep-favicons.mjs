#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const args = process.argv.slice(2);
const JSON_MODE = args.includes('--json');
const DRY_RUN = args.includes('--dry-run');
const CHECK_MODE = args.includes('--check');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const KNOWN_FLAGS = new Set(['--dry-run', '--check', '--json', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--project-dir', '--root']);
const argumentIssues = collectArgumentIssues();
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const SOURCE = join(PROJECT_DIR, 'public/brand/aipedia-logo-crystal-orange-512.png');
const PUBLIC_DIR = join(PROJECT_DIR, 'public');
const SIZES = [16, 32, 192, 512];
const TOUCH_ICON_SIZE = 180;

function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index >= 0) {
    const next = args[index + 1] ?? '';
    return next && !next.startsWith('-') ? next : '';
  }
  const inlineArg = args.find((arg) => arg.startsWith(`${flag}=`));
  return inlineArg ? inlineArg.slice(flag.length + 1) : '';
}

function collectArgumentIssues() {
  const issues = [];
  const foundValueFlags = new Set();

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const equalsIndex = arg.startsWith('--') ? arg.indexOf('=') : -1;
    const flag = equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;

    if (!arg.startsWith('-')) {
      issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    if (!KNOWN_FLAGS.has(flag)) {
      issues.push({ code: 'argument-invalid', detail: `unknown flag ${flag}` });
      continue;
    }

    if (VALUE_FLAGS.has(flag)) {
      foundValueFlags.add(flag);

      if (equalsIndex >= 0) {
        if (!arg.slice(equalsIndex + 1)) issues.push({ code: 'argument-invalid', detail: `${flag} requires a value` });
        continue;
      }

      const next = args[index + 1];
      if (!next || next.startsWith('-')) {
        issues.push({ code: 'argument-invalid', detail: `${flag} requires a value` });
      } else {
        index += 1;
      }
      continue;
    }

    if (equalsIndex >= 0) issues.push({ code: 'argument-invalid', detail: `${flag} does not accept a value` });
  }

  if (foundValueFlags.has('--project-dir') && foundValueFlags.has('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }
  if (DRY_RUN && CHECK_MODE) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --dry-run or --check' });
  }

  return issues;
}

function usage() {
  return [
    'Usage: node scripts/prep-favicons.mjs [options]',
    '',
    'Options:',
    '  --dry-run             Generate favicon buffers and report what would change without writing files.',
    '  --check               Verify generated favicon assets match the source logo without writing files.',
    '  --json                Emit a structured favicon report.',
    '  --project-dir <dir>   Generate or inspect favicons under another project root.',
    '  --root <dir>          Alias for --project-dir.',
    '  --help, -h            Print this help message.',
  ].join('\n');
}

function modeName() {
  if (CHECK_MODE) return 'check';
  if (DRY_RUN) return 'dry-run';
  return 'generate';
}

function relativeFile(path) {
  return relative(PROJECT_DIR, path).replace(/\\/g, '/');
}

async function pngBuffer(size) {
  return sharp(SOURCE)
    .resize(size, size, { fit: 'contain' })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

function icoBuffer(icoPng) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);
  entry.writeUInt8(32, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(icoPng.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);

  return Buffer.concat([header, entry, icoPng]);
}

async function desiredOutputs() {
  const outputs = [];

  for (const size of SIZES) {
    outputs.push({
      file: `favicon-${size}.png`,
      size,
      buffer: await pngBuffer(size),
    });
  }

  const icoPng = await pngBuffer(32);
  outputs.push({
    file: 'favicon.ico',
    size: 32,
    buffer: icoBuffer(icoPng),
  });

  outputs.push({
    file: 'apple-touch-icon.png',
    size: TOUCH_ICON_SIZE,
    buffer: await pngBuffer(TOUCH_ICON_SIZE),
  });

  return outputs;
}

function reportFor({ mode = modeName(), outputs = [], issues = [], missing_source = false } = {}) {
  const changed = outputs.filter((output) => output.changed).length;
  const written = outputs.filter((output) => output.written).length;
  return {
    ok: mode !== 'argument-error' && issues.length === 0 && !(mode === 'check' && changed > 0),
    mode,
    project_dir: PROJECT_DIR,
    source: SOURCE,
    output_dir: PUBLIC_DIR,
    generated: outputs.length,
    changed,
    written,
    missing_source,
    outputs,
    issues,
    argument_issues: mode === 'argument-error' ? argumentIssues : [],
  };
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  if (report.mode === 'argument-error') {
    console.error('[prep-favicons] invalid arguments:');
    for (const issue of report.argument_issues) console.error(`- ${issue.detail}`);
    return;
  }

  for (const issue of report.issues) {
    console.error(`[prep-favicons] ${issue.detail}`);
  }

  if (report.mode === 'check') {
    if (report.ok) {
      console.log(`[prep-favicons] check passed. ${report.generated} favicon outputs match the source logo.`);
    } else {
      console.error(`[prep-favicons] check failed. ${report.changed} favicon output(s) are missing or stale.`);
    }
    return;
  }

  if (report.mode === 'dry-run') {
    console.log(`[prep-favicons] dry run. ${report.generated} favicon outputs checked; ${report.changed} would change.`);
    return;
  }

  console.log(`Favicons: generated ${SIZES.map((size) => `${size}px`).join(', ')} plus ${TOUCH_ICON_SIZE}px apple touch icon and favicon.ico (${report.written} written).`);
}

async function main() {
  if (HELP_MODE) {
    console.log(usage());
    return 0;
  }

  if (argumentIssues.length > 0) {
    emitReport(reportFor({ mode: 'argument-error' }));
    return 1;
  }

  const issues = [];
  const mode = modeName();

  if (!existsSync(SOURCE)) {
    issues.push({ code: 'source-missing', detail: `source logo missing at ${SOURCE}` });
    emitReport(reportFor({ mode, issues, missing_source: true }));
    return 1;
  }

  let generated = [];
  try {
    generated = await desiredOutputs();
  } catch (err) {
    issues.push({ code: 'generation-failed', detail: err.message });
    emitReport(reportFor({ mode, issues }));
    return 1;
  }

  if (mode === 'generate') mkdirSync(PUBLIC_DIR, { recursive: true });

  const outputs = [];
  for (const output of generated) {
    const path = join(PUBLIC_DIR, output.file);
    let existingBytes = null;
    let changed = true;
    let written = false;

    if (existsSync(path)) {
      try {
        const existing = readFileSync(path);
        existingBytes = existing.length;
        changed = Buffer.compare(existing, output.buffer) !== 0;
      } catch (err) {
        issues.push({ code: 'read-failed', detail: `could not read ${path}: ${err.message}` });
      }
    }

    if (mode === 'generate' && changed) {
      try {
        writeFileSync(path, output.buffer);
        written = true;
      } catch (err) {
        issues.push({ code: 'write-failed', detail: `could not write ${path}: ${err.message}` });
      }
    }

    outputs.push({
      path,
      file: relativeFile(path),
      size: output.size,
      bytes: output.buffer.length,
      existing_bytes: existingBytes,
      changed,
      written,
    });
  }

  if (mode === 'check' && outputs.some((output) => output.changed)) {
    issues.push({ code: 'favicon-stale', detail: 'one or more favicon outputs are missing or stale' });
  }

  const report = reportFor({ mode, outputs, issues });
  emitReport(report);
  return report.ok ? 0 : 1;
}

main().then((code) => {
  process.exitCode = code;
}).catch((err) => {
  const mode = argumentIssues.length > 0 ? 'argument-error' : modeName();
  emitReport(reportFor({
    mode,
    issues: [{ code: 'unexpected-error', detail: err.message }],
  }));
  process.exitCode = 1;
});
