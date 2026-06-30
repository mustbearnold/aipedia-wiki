import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, utimesSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

function runLoops(...args) {
  return spawnSync(process.execPath, ['scripts/aipedia-loops.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function runGit(dir, ...args) {
  const result = spawnSync('git', args, {
    cwd: dir,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  return result;
}

function commitFixtureBaseline(dir) {
  runGit(dir, 'init');
  runGit(dir, 'config', 'user.email', 'test@example.com');
  runGit(dir, 'config', 'user.name', 'AiPedia Test');
  runGit(dir, 'add', '.');
  runGit(dir, 'commit', '-m', 'fixture baseline');
}

function writeRegistry(dir, options = {}) {
  mkdirSync(join(dir, 'src', 'data'), { recursive: true });
  const registryPath = join(dir, 'src', 'data', 'aipedia-loops.json');
  const freshnessPaths = options.includeFreshnessPaths === false ? {} : { build_freshness_paths: ['src/content'] };
  writeFileSync(
    registryPath,
    `${JSON.stringify(
      {
        schema_version: 1,
        default_site_dir: 'dist-fast/client',
        ...freshnessPaths,
        loops: [
          {
            id: 'clean-loop',
            title: 'Clean Loop',
            purpose: 'Clean fixture loop.',
            cadence: 'fixture',
            run_commands: [
              {
                label: 'clean command',
                command: 'node',
                args: ['-e', 'console.log(JSON.stringify({ ok: true, mode: "fixture", totals: { due_now: 0 } }))'],
                required: true,
                attention_totals: ['due_now'],
              },
            ],
            review_questions: ['Is it clean?'],
            record_targets: ['.agent/WORK_LOG.md'],
          },
          {
            id: 'attention-loop',
            title: 'Attention Loop',
            purpose: 'Attention fixture loop.',
            cadence: 'fixture',
            run_commands: [
              {
                label: 'attention command',
                command: 'node',
                args: ['-e', 'console.log(JSON.stringify({ ok: true, mode: "fixture", totals: { due_now: 2 } }))'],
                required: true,
                attention_totals: ['due_now'],
              },
            ],
            review_questions: ['Is it noisy?'],
            record_targets: ['.agent/WORK_LOG.md'],
          },
          {
            id: 'built-loop',
            title: 'Built Loop',
            purpose: 'Built-output fixture loop.',
            cadence: 'fixture',
            run_commands: [
              {
                label: 'built command',
                command: 'node',
                args: ['-e', 'console.log(JSON.stringify({ ok: true }))'],
                required: false,
                requires_paths: ['dist-fast/client'],
              },
            ],
            review_questions: ['Is built output present?'],
            record_targets: ['dist-fast/client'],
          },
        ],
      },
      null,
      2,
    )}\n`,
  );
  return registryPath;
}

test('aipedia loops emits the committed registry as JSON', () => {
  const result = runLoops('--json');
  assert.equal(result.status, 0, result.stderr);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.mode, 'loop-registry');
  assert.equal(report.loop_count, 7);
  assert.ok(report.loops.some((loop) => loop.id === 'decision-content'));
  assert.ok(report.loops.some((loop) => loop.id === 'performance-ux'));
});

test('news loop preserves daily AI news and tools-news catch-up rules', () => {
  const result = runLoops('--json');
  assert.equal(result.status, 0, result.stderr);

  const report = JSON.parse(result.stdout);
  const newsLoop = report.loops.find((loop) => loop.id === 'news-market');
  assert.ok(newsLoop);
  const loopText = [
    newsLoop.purpose,
    ...newsLoop.when_to_run,
    ...newsLoop.review_questions,
  ].join('\n');

  assert.match(loopText, /AI news and AI tools news catch-up/);
  assert.match(loopText, /broad AI news and AI tools or tool-control news/);
  assert.match(loopText, /homepage latest-news/);
  assert.match(loopText, /mobile, tablet, desktop, and layout precision QA/);
});

test('aipedia loops runs fixture loops and reports attention without failing', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-loops-'));
  const registry = writeRegistry(dir);

  try {
    const result = runLoops('--json', '--run', `--project-dir=${dir}`, `--registry=${registry}`);
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'loop-run');
    assert.equal(report.totals.loops, 3);
    assert.equal(report.totals.ok, 1);
    assert.equal(report.totals.attention, 1);
    assert.equal(report.totals.skipped, 1);
    assert.equal(report.review.summary, '1 loop(s) ok; 1 attention; 1 skipped.');
    assert.deepEqual(report.review.attention_loops, ['attention-loop']);
    assert.deepEqual(report.review.skipped_loops, ['built-loop']);
    assert.equal(report.review.recommendations[0].loop_id, 'attention-loop');
    assert.match(report.loops.find((loop) => loop.id === 'attention-loop').attention_reasons.join('\n'), /due_now=2/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('aipedia loops can select one loop', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-loops-select-'));
  const registry = writeRegistry(dir);

  try {
    const result = runLoops('--json', '--run', '--loop', 'clean-loop', `--project-dir=${dir}`, `--registry=${registry}`);
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    assert.equal(report.totals.loops, 1);
    assert.equal(report.loops[0].id, 'clean-loop');
    assert.equal(report.loops[0].status, 'ok');
    assert.equal(report.review.summary, '1 loop(s) ok; 0 attention; 0 skipped.');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('aipedia loops marks built-output commands as attention when output is stale', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-loops-stale-build-'));
  const registry = writeRegistry(dir);
  const distFile = join(dir, 'dist-fast', 'client', 'index.html');
  const sourceFile = join(dir, 'src', 'content', 'page.md');

  try {
    mkdirSync(join(dir, 'dist-fast', 'client'), { recursive: true });
    mkdirSync(join(dir, 'src', 'content'), { recursive: true });
    writeFileSync(distFile, '<html></html>\n');
    writeFileSync(sourceFile, '# Page\n');
    const oldDate = new Date(Date.now() - 60_000);
    const newDate = new Date();
    utimesSync(distFile, oldDate, oldDate);
    utimesSync(sourceFile, newDate, newDate);

    const result = runLoops('--json', '--run', '--loop', 'built-loop', `--project-dir=${dir}`, `--registry=${registry}`);
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    const command = report.loops[0].commands[0];
    assert.equal(report.totals.attention, 1);
    assert.equal(report.loops[0].status, 'attention');
    assert.equal(command.build_freshness.status, 'stale');
    assert.match(command.attention_reasons.join('\n'), /built output stale/);
    assert.match(report.review.recommendations[0].action, /build:fast/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('aipedia loops marks built-output commands as attention when freshness is unknown', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-loops-unknown-build-'));
  const registry = writeRegistry(dir, { includeFreshnessPaths: false });
  const distFile = join(dir, 'dist-fast', 'client', 'index.html');

  try {
    mkdirSync(join(dir, 'dist-fast', 'client'), { recursive: true });
    writeFileSync(distFile, '<html></html>\n');

    const result = runLoops('--json', '--run', '--loop', 'built-loop', `--project-dir=${dir}`, `--registry=${registry}`);
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    const command = report.loops[0].commands[0];
    assert.equal(report.loops[0].status, 'attention');
    assert.equal(command.build_freshness.status, 'unknown');
    assert.match(command.attention_reasons.join('\n'), /freshness unknown/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('aipedia loops can write a machine-readable run ledger', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-loops-ledger-'));
  const registry = writeRegistry(dir);
  const ledgerDir = join(dir, '.agent', 'loop-runs', 'system');

  try {
    const result = runLoops(
      '--json',
      '--run',
      '--loop',
      'clean-loop',
      '--write-ledger',
      `--ledger-dir=${ledgerDir}`,
      `--project-dir=${dir}`,
      `--registry=${registry}`,
    );
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ledger.written, true);
    assert.ok(existsSync(join(ledgerDir, 'latest.json')));
    const timestampedRuns = readdirSync(ledgerDir).filter((name) => name.endsWith('-loop-run.json'));
    assert.equal(timestampedRuns.length, 1);

    const latest = JSON.parse(readFileSync(join(ledgerDir, 'latest.json'), 'utf8'));
    const fullRun = JSON.parse(readFileSync(join(ledgerDir, timestampedRuns[0]), 'utf8'));
    assert.equal(latest.totals.ok, 1);
    assert.deepEqual(latest.ledger.trend.status_changes, []);
    assert.equal(latest.project_dir, '.');
    assert.equal(JSON.stringify(latest).includes('stdout_tail'), false);
    assert.equal(JSON.stringify(fullRun).includes('stdout_tail'), true);

    rmSync(join(ledgerDir, timestampedRuns[0]), { force: true });
    const secondResult = runLoops(
      '--json',
      '--run',
      '--loop',
      'clean-loop',
      '--write-ledger',
      `--ledger-dir=${ledgerDir}`,
      `--project-dir=${dir}`,
      `--registry=${registry}`,
    );
    assert.equal(secondResult.status, 0, secondResult.stderr);
    const secondLatest = JSON.parse(readFileSync(join(ledgerDir, 'latest.json'), 'utf8'));
    assert.equal(secondLatest.ledger.previous_file, '');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('aipedia loops records system progress in run ledgers', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-loops-system-ledger-'));
  const registry = writeRegistry(dir);
  const ledgerDir = join(dir, '.agent', 'loop-runs', 'system');

  try {
    runGit(dir, 'init');
    mkdirSync(join(dir, '.agent'), { recursive: true });
    writeFileSync(join(dir, '.agent', 'WORK_LOG.md'), '# Work Log\n');

    const result = runLoops(
      '--json',
      '--run',
      '--loop',
      'clean-loop',
      '--write-ledger',
      '--require-system-progress',
      `--ledger-dir=${ledgerDir}`,
      `--project-dir=${dir}`,
      `--registry=${registry}`,
    );
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.system_progress.ok, true);
    assert.equal(report.system_progress.has_system_artifact, true);
    assert.ok(report.system_progress.system_artifacts.includes('.agent/WORK_LOG.md'));

    const latest = JSON.parse(readFileSync(join(ledgerDir, 'latest.json'), 'utf8'));
    assert.equal(latest.system_progress.has_system_artifact, true);
    assert.ok(latest.system_progress.system_artifacts.includes('.agent/WORK_LOG.md'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('aipedia loops blocks system-progress closeout for content-only diffs', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-loops-content-only-'));
  const registry = writeRegistry(dir);
  const ledgerDir = join(dir, '.agent', 'loop-runs', 'system');

  try {
    commitFixtureBaseline(dir);
    mkdirSync(join(dir, 'src', 'content', 'tools'), { recursive: true });
    writeFileSync(join(dir, 'src', 'content', 'tools', 'example.md'), '# Example\n');

    const result = runLoops(
      '--json',
      '--run',
      '--loop',
      'clean-loop',
      '--write-ledger',
      '--require-system-progress',
      `--ledger-dir=${ledgerDir}`,
      `--project-dir=${dir}`,
      `--registry=${registry}`,
    );
    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'loop-run-system-progress-blocked');
    assert.equal(report.system_progress.mode, 'content-only-progress');
    assert.equal(report.system_progress.content_only, true);
    assert.deepEqual(report.system_progress.system_artifacts, []);
    assert.ok(report.system_progress.content_artifacts.includes('src/content/tools/example.md'));

    const latest = JSON.parse(readFileSync(join(ledgerDir, 'latest.json'), 'utf8'));
    assert.equal(latest.ok, false);
    assert.equal(latest.system_progress.content_only, true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('aipedia loops rejects unknown loop ids', () => {
  const result = runLoops('--json', '--loop', 'missing-loop');
  assert.equal(result.status, 2);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.mode, 'argument-error');
  assert.match(report.argument_issues.map((issue) => issue.detail).join('\n'), /unknown loop missing-loop/);
});

test('aipedia loops prints CLI help', () => {
  const result = runLoops('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--loop <id>/);
});
