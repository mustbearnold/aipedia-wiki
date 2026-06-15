#!/usr/bin/env node
/**
 * Recompress generated OG PNGs (public/og/tools/*.png and
 * public/og/news/*.png) with sharp for 40-60% size reduction with no
 * visible quality loss. Astro's default resvg-js rasterization is
 * correct but leaves a lot of compression on the table.
 *
 * Run: node scripts/optimize-og-images.mjs
 *
 * Idempotent: re-runs on already-compressed PNGs are cheap (savings
 * asymptote to zero). Run after scripts/generate-og-svgs.mjs and
 * scripts/generate-og-news.mjs on each build.
 */
import sharp from 'sharp';
import { existsSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildManifest,
  hashExistingFiles,
  hashExistingSourceFiles,
  manifestMatches,
  manifestOutputsForReport,
  readManifest,
  relativePath,
  sha256File,
  stableHash,
  writeManifest,
} from './lib/generated-asset-manifest.mjs';

const args = process.argv.slice(2);
const JSON_MODE = args.includes('--json');
const DRY_RUN = args.includes('--dry-run');
const CHECK_MODE = args.includes('--check');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const KNOWN_FLAGS = new Set(['--dry-run', '--check', '--json', '--project-dir', '--root', '--limit', '--help', '-h']);
const VALUE_FLAGS = new Set(['--project-dir', '--root', '--limit']);
const argumentIssues = collectArgumentIssues();
const SCRIPT_PATH = fileURLToPath(import.meta.url);
const defaultProjectDir = dirname(dirname(SCRIPT_PATH));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const limitArg = valueFor('--limit');
const LIMIT = limitArg ? Number.parseInt(limitArg, 10) : Infinity;
const TARGETS = [
  'public/og/tools',
  'public/og/news',
  'public/og/news/light',
];
const MANIFEST_FILE = join(PROJECT_DIR, 'src/data/generated-assets/og-optimizer-manifest.json');
const MANIFEST_KIND = 'og-png-optimizer';
const MAX_PNG_OPTIMIZATION_PASSES = 12;
const MATERIAL_CHECK_SAVINGS_BYTES = 2048;
const MATERIAL_CHECK_SAVINGS_RATIO = 0.005;

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
  if (foundValueFlags.has('--limit') && !/^[1-9][0-9]*$/.test(valueFor('--limit'))) {
    issues.push({ code: 'argument-invalid', detail: '--limit must be a positive integer' });
  }
  if (DRY_RUN && CHECK_MODE) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --dry-run or --check' });
  }

  return issues;
}

function usage() {
  return [
    'Usage: node scripts/optimize-og-images.mjs [options]',
    '',
    'Options:',
    '  --dry-run             Estimate PNG savings without writing files.',
    '  --check               Verify OG PNG files are already optimized without writing.',
    '  --json                Emit a structured optimization report.',
    '  --project-dir <dir>   Optimize or inspect another project root.',
    '  --root <dir>          Alias for --project-dir.',
    '  --limit <count>       Stop after checking this many PNG files.',
    '  --help, -h            Print this help message.',
  ].join('\n');
}

function targetPath(target) {
  return join(PROJECT_DIR, target);
}

async function optimizePipelinePng(buffer) {
  let best = buffer;
  for (let pass = 0; pass < MAX_PNG_OPTIMIZATION_PASSES; pass += 1) {
    const optimized = await sharp(best)
      .png({
        compressionLevel: 9,   // max zlib compression
        adaptiveFiltering: true,
        palette: true,         // try palette-based PNG8 where quality allows
        quality: 92,           // palette quantisation threshold
        effort: 10,            // max effort
      })
      .toBuffer();

    if (optimized.length >= best.length) return best;
    best = optimized;
  }
  return best;
}

async function compressFile(path) {
  const before = statSync(path).size;
  const input = readFileSync(path);
  const output = await optimizePipelinePng(input);
  if (output.length >= before) return { before, after: before, saved: 0, written: false };
  if (!DRY_RUN && !CHECK_MODE) writeFileSync(path, output);
  return { before, after: output.length, saved: before - output.length, written: !DRY_RUN && !CHECK_MODE };
}

function modeName() {
  if (CHECK_MODE) return 'check';
  if (DRY_RUN) return 'dry-run';
  return 'optimize';
}

function reportFor({ mode = modeName(), files = [], issues = [], skipped_dirs = [] } = {}) {
  const totalBefore = files.reduce((sum, file) => sum + file.before_bytes, 0);
  const totalAfter = files.reduce((sum, file) => sum + file.after_bytes, 0);
  const saved = totalBefore - totalAfter;
  const materialSavings =
    saved >= MATERIAL_CHECK_SAVINGS_BYTES &&
    totalBefore > 0 &&
    saved / totalBefore >= MATERIAL_CHECK_SAVINGS_RATIO;
  return {
    ok: mode !== 'argument-error' && issues.length === 0 && !(mode === 'check' && materialSavings),
    mode,
    project_dir: PROJECT_DIR,
    targets: TARGETS,
    manifest: {
      file: relativePath(PROJECT_DIR, MANIFEST_FILE),
      hit: files.some((file) => file.comparison?.kind === 'manifest-hash'),
    },
    dry_run: DRY_RUN || CHECK_MODE,
    check_mode: CHECK_MODE,
    limit: Number.isFinite(LIMIT) ? LIMIT : null,
    totals: {
      files: files.length,
      before_bytes: totalBefore,
      after_bytes: totalAfter,
      saved_bytes: saved,
      saved_kb: Math.round(saved / 1024),
      saved_pct: totalBefore > 0 ? Math.round((saved / totalBefore) * 100) : 0,
      material_savings: materialSavings,
      material_savings_bytes: MATERIAL_CHECK_SAVINGS_BYTES,
      material_savings_ratio: MATERIAL_CHECK_SAVINGS_RATIO,
      written_files: files.filter((file) => file.written).length,
      skipped_dirs: skipped_dirs.length,
      issues: issues.length,
    },
    files,
    skipped_dirs,
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
    console.error('[optimize-og-images] invalid arguments:');
    for (const issue of report.argument_issues) console.error(`- ${issue.detail}`);
    return;
  }

  for (const skipped of report.skipped_dirs) {
    console.warn(`[optimize-og-images] skip ${skipped.target}: not readable`);
  }
  for (const issue of report.issues) {
    console.warn(`[optimize-og-images] failed on ${issue.path}: ${issue.detail}`);
  }

  if (report.manifest.hit) {
    console.log(`[optimize-og-images] manifest current; skipped recompressing ${report.totals.files} PNG file(s).`);
  }

  if (report.mode === 'check') {
    if (report.ok) {
      console.log(`[optimize-og-images] check passed. ${report.totals.files} PNG file(s) are already optimized.`);
    } else {
      console.error(`[optimize-og-images] check failed. ${report.totals.saved_kb} KB can still be saved across ${report.totals.files} PNG file(s).`);
    }
    return;
  }

  const verb = DRY_RUN ? 'would process' : 'processed';
  console.log(`[optimize-og-images] ${verb} ${report.totals.files} files. ${Math.round(report.totals.before_bytes / 1024)} KB -> ${Math.round(report.totals.after_bytes / 1024)} KB. Saved ${report.totals.saved_kb} KB (${report.totals.saved_pct}%).`);
}

function collectTargetPngFiles() {
  const files = [];
  for (const target of TARGETS) {
    const dir = targetPath(target);
    if (!existsSync(dir)) continue;
    let entries = [];
    try {
      entries = readdirSync(dir).filter((file) => file.endsWith('.png')).sort((a, b) => a.localeCompare(b));
    } catch {
      continue;
    }
    for (const file of entries) {
      if (files.length >= LIMIT) return files;
      files.push(relativePath(PROJECT_DIR, join(dir, file)));
    }
  }
  return files.sort((left, right) => left.localeCompare(right));
}

function sourceHashFor(targetFiles) {
  return stableHash({
    manifest_kind: MANIFEST_KIND,
    limit: Number.isFinite(LIMIT) ? LIMIT : null,
    optimizer_sources: hashExistingSourceFiles(PROJECT_DIR, [
      relativePath(PROJECT_DIR, SCRIPT_PATH),
      'package.json',
      'package-lock.json',
    ]),
    png_files: hashExistingFiles(PROJECT_DIR, targetFiles),
  });
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

  const files = [];
  const issues = [];
  const skipped_dirs = [];
  const expectedFiles = collectTargetPngFiles();
  const sourceHash = sourceHashFor(expectedFiles);
  const manifest = readManifest(MANIFEST_FILE);

  if ((modeName() === 'optimize' || modeName() === 'check') && manifestMatches({
    manifest,
    kind: MANIFEST_KIND,
    sourceHash,
    expectedFiles,
    root: PROJECT_DIR,
  })) {
    const manifestFiles = manifestOutputsForReport(manifest, PROJECT_DIR).map((file) => ({
      target: file.target,
      file: file.file.split('/').pop(),
      path: file.path,
      before_bytes: file.bytes,
      after_bytes: file.bytes,
      saved_bytes: 0,
      written: false,
      comparison: file.comparison,
    }));
    const report = reportFor({ files: manifestFiles, issues, skipped_dirs });
    emitReport(report);
    return report.ok ? 0 : 1;
  }

  targetLoop:
  for (const target of TARGETS) {
    const dir = targetPath(target);
    if (!existsSync(dir)) {
      skipped_dirs.push({ target, path: dir, detail: 'directory missing' });
      continue;
    }

    let entries = [];
    try {
      entries = readdirSync(dir).filter((file) => file.endsWith('.png')).sort((a, b) => a.localeCompare(b));
    } catch (err) {
      skipped_dirs.push({ target, path: dir, detail: err.message });
      continue;
    }

    for (const file of entries) {
      if (files.length >= LIMIT) break targetLoop;
      const path = join(dir, file);
      try {
        const result = await compressFile(path);
        files.push({
          target,
          file,
          path,
          before_bytes: result.before,
          after_bytes: result.after,
          saved_bytes: result.saved,
          written: result.written,
        });
      } catch (err) {
        issues.push({ code: 'png-optimize-failed', target, file, path, detail: err.message });
      }
    }
  }

  const report = reportFor({ files, issues, skipped_dirs });
  if (modeName() === 'optimize' && report.ok) {
    writeManifest(MANIFEST_FILE, buildManifest({
      kind: MANIFEST_KIND,
      sourceHash: sourceHashFor(collectTargetPngFiles()),
      outputs: collectTargetPngFiles().map((file) => ({
        file,
        target: TARGETS.find((target) => file.startsWith(`${target}/`)) ?? null,
        bytes: statSync(join(PROJECT_DIR, file)).size,
        sha256: sha256File(join(PROJECT_DIR, file)),
      })),
      meta: {
        files: collectTargetPngFiles().length,
      },
    }));
  }
  emitReport(report);
  return report.ok ? 0 : 1;
}

process.exit(await main());
