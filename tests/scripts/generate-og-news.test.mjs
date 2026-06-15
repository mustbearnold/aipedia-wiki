import assert from 'node:assert/strict';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import sharp from 'sharp';

const REQUIRED_FONTS = [
  'metropolis-latin-400-normal.ttf',
  'metropolis-latin-500-normal.ttf',
  'metropolis-latin-700-normal.ttf',
  'metropolis-latin-800-normal.ttf',
];

const EXPECTED_OUTPUTS = [
  'public/og/news/alpha-news.png',
  'public/og/news/light/alpha-news.png',
  'public/og/news/thumbs/alpha-news.webp',
  'public/og/news/thumbs/light/alpha-news.webp',
];

function runNewsOg(...args) {
  return spawnSync(process.execPath, ['scripts/generate-og-news.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

async function writeFixtureProject() {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-news-og-'));
  mkdirSync(join(fixture, 'src/content/news'), { recursive: true });
  mkdirSync(join(fixture, 'public/logos/tools'), { recursive: true });
  mkdirSync(join(fixture, 'public/brand'), { recursive: true });
  mkdirSync(join(fixture, 'public/fonts/metropolis'), { recursive: true });

  writeFileSync(
    join(fixture, 'src/content/news/alpha-news.md'),
    `---
title: "Alpha launches useful AI workflow controls"
slug: alpha-news
date: 2026-06-14
severity: major
summary: "Alpha adds controls that help teams decide whether to adopt the workflow."
affects: [alpha]
categories: [ai-automation, ai-coding]
---
# Alpha news
`,
  );

  writeFileSync(
    join(fixture, 'src/content/news/beta-news.md'),
    `---
title: "Beta keeps the news queue bounded"
slug: beta-news
date: 2026-06-13
severity: minor
affects: [alpha]
categories: [ai-research]
---
# Beta news
`,
  );

  const logo = await sharp({
    create: {
      width: 128,
      height: 128,
      channels: 4,
      background: { r: 12, g: 210, b: 236, alpha: 1 },
    },
  }).png().toBuffer();
  writeFileSync(join(fixture, 'public/logos/tools/alpha.png'), logo);
  writeFileSync(join(fixture, 'public/brand/aipedia-logo-crystal-cyan-128.png'), logo);

  for (const font of REQUIRED_FONTS) {
    const source = join(process.cwd(), 'public/fonts/metropolis', font);
    assert.equal(existsSync(source), true, `${font} should exist in the repo fixture source`);
    copyFileSync(source, join(fixture, 'public/fonts/metropolis', font));
  }

  return fixture;
}

function assertExpectedOutputsExist(projectDir) {
  for (const file of EXPECTED_OUTPUTS) {
    const path = join(projectDir, file);
    assert.equal(existsSync(path), true, `${file} should exist`);
    assert.ok(readFileSync(path).length > 0, `${file} should not be empty`);
  }
}

test('news OG generator writes fixture PNGs and thumbnails', async () => {
  const fixture = await writeFixtureProject();

  try {
    const result = runNewsOg('--json', `--project-dir=${fixture}`, 'alpha-news');
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'generate');
    assert.equal(report.project_dir, resolve(fixture));
    assert.deepEqual(report.requested_slugs, ['alpha-news']);
    assert.equal(report.records, 1);
    assert.equal(report.generated, 4);
    assert.equal(report.changed, 4);
    assert.equal(report.written, 4);
    assert.equal(report.resvg_available, true);
    assert.deepEqual(report.argument_issues, []);
    assertExpectedOutputsExist(fixture);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('news OG generator dry-run reports fixture outputs without writing', async () => {
  const fixture = await writeFixtureProject();

  try {
    const result = runNewsOg('--dry-run', '--json', `--project-dir=${fixture}`, 'alpha-news');
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'dry-run');
    assert.equal(report.records, 1);
    assert.equal(report.generated, 4);
    assert.equal(report.changed, 4);
    assert.equal(report.written, 0);
    for (const file of EXPECTED_OUTPUTS) {
      assert.equal(existsSync(join(fixture, file)), false, `${file} should not be written`);
    }
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('news OG generator check passes after fixture generation', async () => {
  const fixture = await writeFixtureProject();

  try {
    const generate = runNewsOg('--json', `--project-dir=${fixture}`, 'alpha-news');
    assert.equal(generate.status, 0, generate.stderr || generate.stdout);

    const result = runNewsOg('--check', '--json', `--project-dir=${fixture}`, 'alpha-news');
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'check');
    assert.equal(report.records, 1);
    assert.equal(report.generated, 4);
    assert.equal(report.changed, 0);
    assert.equal(report.written, 0);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('news OG generator check accepts raster encoding-only differences', async () => {
  const fixture = await writeFixtureProject();
  const pngPath = join(fixture, 'public/og/news/alpha-news.png');

  try {
    const generate = runNewsOg('--json', `--project-dir=${fixture}`, 'alpha-news');
    assert.equal(generate.status, 0, generate.stderr || generate.stdout);

    const original = readFileSync(pngPath);
    const reencoded = await sharp(original)
      .png({ compressionLevel: 0, adaptiveFiltering: false, palette: false })
      .toBuffer();
    assert.notEqual(Buffer.compare(original, reencoded), 0);
    writeFileSync(pngPath, reencoded);

    const result = runNewsOg('--check', '--json', `--project-dir=${fixture}`, 'alpha-news');
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'check');
    assert.equal(report.changed, 0);
    assert.equal(report.written, 0);
    assert.equal(report.outputs.find((output) => output.file === 'public/og/news/alpha-news.png').comparison.kind, 'raster-visual');
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('news OG generator check fails valid but visually stale raster outputs', async () => {
  const fixture = await writeFixtureProject();
  const stalePath = join(fixture, 'public/og/news/alpha-news.png');

  try {
    const generate = runNewsOg('--json', `--project-dir=${fixture}`, 'alpha-news');
    assert.equal(generate.status, 0, generate.stderr || generate.stdout);

    const blank = await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    }).png().toBuffer();
    writeFileSync(stalePath, blank);

    const result = runNewsOg('--check', '--json', `--project-dir=${fixture}`, 'alpha-news');
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'check');
    assert.equal(report.changed, 1);
    assert.equal(report.written, 0);
    const staleOutput = report.outputs.find((output) => output.file === 'public/og/news/alpha-news.png');
    assert.equal(staleOutput.changed, true);
    assert.equal(staleOutput.comparison.kind, 'raster-visual');
    assert.equal(staleOutput.comparison.matches, false);
    assert.ok(report.issues.some((issue) => issue.code === 'news-og-stale'));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('news OG generator check fails stale fixture outputs without writing', async () => {
  const fixture = await writeFixtureProject();
  const stalePath = join(fixture, 'public/og/news/alpha-news.png');

  try {
    const generate = runNewsOg('--json', `--project-dir=${fixture}`, 'alpha-news');
    assert.equal(generate.status, 0, generate.stderr || generate.stdout);
    writeFileSync(stalePath, 'stale news og\n');

    const result = runNewsOg('--check', '--json', `--project-dir=${fixture}`, 'alpha-news');
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');
    assert.equal(readFileSync(stalePath, 'utf8'), 'stale news og\n');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'check');
    assert.equal(report.changed, 1);
    assert.equal(report.written, 0);
    assert.ok(report.issues.some((issue) => issue.code === 'news-og-stale'));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('news OG generator supports bounded fixture dry-run work', async () => {
  const fixture = await writeFixtureProject();

  try {
    const result = runNewsOg('--dry-run', '--json', `--project-dir=${fixture}`, '--limit=1');
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'dry-run');
    assert.equal(report.limit, 1);
    assert.equal(report.records, 1);
    assert.equal(report.generated, 4);
    assert.equal(report.written, 0);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('news OG generator rejects invalid arguments before writing', async () => {
  const fixture = await writeFixtureProject();

  try {
    const unknown = runNewsOg('--json', `--project-dir=${fixture}`, '--wat');
    assert.equal(unknown.status, 1);
    assert.equal(unknown.stderr, '');

    const unknownReport = JSON.parse(unknown.stdout);
    assert.equal(unknownReport.ok, false);
    assert.equal(unknownReport.mode, 'argument-error');
    assert.equal(unknownReport.generated, 0);
    assert.equal(unknownReport.written, 0);
    assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

    const missing = runNewsOg('--json', '--project-dir');
    assert.equal(missing.status, 1);
    const missingReport = JSON.parse(missing.stdout);
    assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a value/.test(issue.detail)));

    const invalidSlug = runNewsOg('--json', `--project-dir=${fixture}`, '../bad');
    assert.equal(invalidSlug.status, 1);
    const invalidSlugReport = JSON.parse(invalidSlug.stdout);
    assert.ok(invalidSlugReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /invalid news slug/.test(issue.detail)));

    const conflictingRoot = runNewsOg('--json', '--project-dir', fixture, '--root', fixture);
    assert.equal(conflictingRoot.status, 1);
    const conflictingRootReport = JSON.parse(conflictingRoot.stdout);
    assert.ok(conflictingRootReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one of --project-dir or --root/.test(issue.detail)));

    const conflictingModes = runNewsOg('--json', '--dry-run', '--check', `--project-dir=${fixture}`);
    assert.equal(conflictingModes.status, 1);
    const conflictingModesReport = JSON.parse(conflictingModes.stdout);
    assert.ok(conflictingModesReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one of --dry-run or --check/.test(issue.detail)));

    const invalidLimit = runNewsOg('--json', '--dry-run', '--limit=0', `--project-dir=${fixture}`);
    assert.equal(invalidLimit.status, 1);
    const invalidLimitReport = JSON.parse(invalidLimit.stdout);
    assert.ok(invalidLimitReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--limit must be a positive integer/.test(issue.detail)));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('news OG generator fails closed on requested missing slugs', async () => {
  const fixture = await writeFixtureProject();

  try {
    const result = runNewsOg('--dry-run', '--json', `--project-dir=${fixture}`, 'missing-news');
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.generated, 0);
    assert.ok(report.issues.some((issue) => issue.code === 'requested-news-missing'));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('news OG generator prints CLI help', () => {
  const result = runNewsOg('--help');

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage: node scripts\/generate-og-news\.mjs/);
  assert.match(result.stdout, /--dry-run/);
  assert.match(result.stdout, /--check/);
  assert.match(result.stdout, /--limit <count>/);
  assert.equal(result.stderr, '');
});
