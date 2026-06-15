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

function runOgGenerator(...args) {
  return spawnSync(process.execPath, ['scripts/generate-og-svgs.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

async function writeFixtureProject() {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-tool-og-'));
  mkdirSync(join(fixture, 'src/data/_meta'), { recursive: true });
  mkdirSync(join(fixture, 'src/content/tools'), { recursive: true });
  mkdirSync(join(fixture, 'public/logos/tools'), { recursive: true });
  mkdirSync(join(fixture, 'public/brand'), { recursive: true });
  mkdirSync(join(fixture, 'public/fonts/metropolis'), { recursive: true });

  writeFileSync(join(fixture, 'src/data/_meta/tools-registry.json'), JSON.stringify({
    tools: {
      alpha: {
        slug: 'alpha',
        title: 'Alpha Tool',
        company: 'Alpha Co',
        category: 'ai-coding',
        status: 'active',
        scores: { utility: 9, value: 8, moat: 7, longevity: 8 },
      },
      buried: {
        slug: 'buried',
        title: 'Buried Tool',
        status: 'dead',
      },
    },
  }, null, 2));

  writeFileSync(
    join(fixture, 'src/content/tools/alpha.md'),
    '---\ntagline: "Fixture tagline for source-backed OG rendering."\nmeta_description: "Fixture fallback."\n---\n# Alpha Tool\n',
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
  writeFileSync(join(fixture, 'public/brand/aipedia-logo-128.png'), logo);
  writeFileSync(join(fixture, 'public/brand/aipedia-logo-512.png'), logo);

  for (const font of REQUIRED_FONTS) {
    const source = join(process.cwd(), 'public/fonts/metropolis', font);
    assert.equal(existsSync(source), true, `${font} should exist in the repo fixture source`);
    copyFileSync(source, join(fixture, 'public/fonts/metropolis', font));
  }

  writeFileSync(
    join(fixture, 'public/og-default.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0c0a09"/>
  <image href="BRAND_LOGO_DATA_URL" x="80" y="80" width="120" height="120"/>
  <text x="80" y="360" font-family="Metropolis, sans-serif" font-size="72" font-weight="800" fill="#fafafa">AiPedia</text>
</svg>`,
  );

  return fixture;
}

test('OG generator writes fixture tool and default PNGs', async () => {
  const fixture = await writeFixtureProject();

  try {
    const result = runOgGenerator('--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'generate');
    assert.equal(report.project_dir, resolve(fixture));
    assert.equal(report.tools, 1);
    assert.equal(report.resvg_available, true);
    assert.equal(report.generated, 2);
    assert.equal(report.changed, 2);
    assert.equal(report.written, 2);
    assert.deepEqual(report.argument_issues, []);
    assert.equal(existsSync(join(fixture, 'public/og/tools/alpha.png')), true);
    assert.equal(existsSync(join(fixture, 'public/og-default.png')), true);
    assert.ok(readFileSync(join(fixture, 'public/og/tools/alpha.png')).length > 0);
    assert.ok(report.outputs.some((output) => output.kind === 'tool-png' && output.slug === 'alpha'));
    assert.ok(report.outputs.some((output) => output.kind === 'default-png'));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('OG generator dry-run reports fixture outputs without writing', async () => {
  const fixture = await writeFixtureProject();

  try {
    const result = runOgGenerator('--dry-run', '--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'dry-run');
    assert.equal(report.tools, 1);
    assert.equal(report.generated, 2);
    assert.equal(report.changed, 2);
    assert.equal(report.written, 0);
    assert.equal(existsSync(join(fixture, 'public/og/tools/alpha.png')), false);
    assert.equal(existsSync(join(fixture, 'public/og-default.png')), false);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('OG generator check passes after fixture generation', async () => {
  const fixture = await writeFixtureProject();

  try {
    const generate = runOgGenerator('--json', `--project-dir=${fixture}`);
    assert.equal(generate.status, 0, generate.stderr || generate.stdout);

    const result = runOgGenerator('--check', '--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'check');
    assert.equal(report.generated, 2);
    assert.equal(report.changed, 0);
    assert.equal(report.written, 0);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('OG generator check fails stale fixture outputs without writing', async () => {
  const fixture = await writeFixtureProject();
  const stalePath = join(fixture, 'public/og/tools/alpha.png');

  try {
    const generate = runOgGenerator('--json', `--project-dir=${fixture}`);
    assert.equal(generate.status, 0, generate.stderr || generate.stdout);
    writeFileSync(stalePath, 'stale og\n');

    const result = runOgGenerator('--check', '--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');
    assert.equal(readFileSync(stalePath, 'utf8'), 'stale og\n');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'check');
    assert.equal(report.changed, 1);
    assert.equal(report.written, 0);
    assert.ok(report.issues.some((issue) => issue.code === 'og-stale'));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('OG generator supports bounded dry-run work', async () => {
  const fixture = await writeFixtureProject();

  try {
    const result = runOgGenerator('--dry-run', '--json', `--project-dir=${fixture}`, '--limit=1');
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'dry-run');
    assert.equal(report.limit, 1);
    assert.equal(report.tools, 1);
    assert.equal(report.written, 0);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('OG generator rejects invalid arguments before writing', () => {
  const unknown = runOgGenerator('--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.equal(unknownReport.generated, 0);
  assert.equal(unknownReport.written, 0);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runOgGenerator('--json', '--project-dir');
  assert.equal(missing.status, 1);
  const missingReport = JSON.parse(missing.stdout);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a value/.test(issue.detail)));

  const stray = runOgGenerator('--json', 'public/og');
  assert.equal(stray.status, 1);
  const strayReport = JSON.parse(stray.stdout);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument public\/og/.test(issue.detail)));

  const conflictingRoot = runOgGenerator('--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflictingRoot.status, 1);
  const conflictingRootReport = JSON.parse(conflictingRoot.stdout);
  assert.ok(conflictingRootReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one of --project-dir or --root/.test(issue.detail)));

  const conflictingModes = runOgGenerator('--json', '--dry-run', '--check');
  assert.equal(conflictingModes.status, 1);
  const conflictingModesReport = JSON.parse(conflictingModes.stdout);
  assert.ok(conflictingModesReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one of --dry-run or --check/.test(issue.detail)));

  const invalidLimit = runOgGenerator('--json', '--dry-run', '--limit=0');
  assert.equal(invalidLimit.status, 1);
  const invalidLimitReport = JSON.parse(invalidLimit.stdout);
  assert.ok(invalidLimitReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--limit must be a positive integer/.test(issue.detail)));
});

test('OG generator prints CLI help', () => {
  const result = runOgGenerator('--help');

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage: node scripts\/generate-og-svgs\.mjs/);
  assert.match(result.stdout, /--dry-run/);
  assert.match(result.stdout, /--check/);
  assert.match(result.stdout, /--limit <count>/);
  assert.equal(result.stderr, '');
});
