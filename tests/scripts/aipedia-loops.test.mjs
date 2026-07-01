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
  const dagPath = join(dir, '.agent', 'evals', 'agent-dag-contracts', 'fixture-dag.json');
  const dagValidationPath = join(dir, '.agent', 'evals', 'agent-dag-contracts', 'fixture-dag.validation.json');

  try {
    mkdirSync(join(dir, '.agent', 'evals', 'agent-dag-contracts'), { recursive: true });
    writeFileSync(
      dagPath,
      `${JSON.stringify({ schema_version: 'aipedia.agent-task-dag.v1', nodes: [] }, null, 2)}\n`,
    );
    writeFileSync(
      dagValidationPath,
      `${JSON.stringify({ ok: true, schema_version: 'aipedia.agent-task-dag-check.v1', totals: { issues: 0 } }, null, 2)}\n`,
    );
    const result = runLoops(
      '--json',
      '--run',
      '--loop',
      'clean-loop',
      '--write-ledger',
      '--goal-id',
      'meta-goal',
      '--run-id',
      'run-001',
      '--risk',
      'Fixture risk',
      '--next-action',
      'Fixture next action',
      '--dag-graph',
      dagPath,
      '--dag-validation-report',
      dagValidationPath,
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

    const latestText = readFileSync(join(ledgerDir, 'latest.json'), 'utf8');
    const fullRunText = readFileSync(join(ledgerDir, timestampedRuns[0]), 'utf8');
    const latest = JSON.parse(latestText);
    const fullRun = JSON.parse(fullRunText);
    assert.equal(latest.totals.ok, 1);
    assert.equal(latest.goal_id, 'meta-goal');
    assert.equal(latest.run_id, 'run-001');
    assert.deepEqual(latest.residual_risks, ['Fixture risk']);
    assert.deepEqual(latest.next_actions, ['Fixture next action']);
    assert.equal(latest.trace.name, 'loop-run');
    assert.ok(latest.trace.trace_id.includes('meta-goal'));
    assert.ok(latest.trace.span_id.includes('run-001'));
    assert.ok(latest.artifact_refs.some((ref) => ref.kind === 'loop-registry' && ref.role === 'input'));
    assert.ok(latest.artifact_refs.some((ref) => ref.kind === 'loop-run-latest' && ref.role === 'output'));
    assert.ok(latest.artifact_refs.some((ref) => ref.kind === 'agent-task-dag' && ref.path.endsWith('fixture-dag.json')));
    assert.ok(latest.artifact_refs.some((ref) => ref.kind === 'agent-task-dag-validation-report' && ref.path.endsWith('fixture-dag.validation.json')));
    assert.deepEqual(latest.ledger.trend.status_changes, []);
    assert.equal(latest.project_dir, '.');
    assert.equal(JSON.stringify(latest).includes('stdout_tail'), false);
    assert.equal(JSON.stringify(fullRun).includes('stdout_tail'), true);
    assert.equal(fullRun.goal_id, 'meta-goal');
    assert.equal(fullRun.run_id, 'run-001');
    assert.ok(fullRun.artifact_refs.some((ref) => ref.kind === 'loop-command' && ref.role === 'embedded'));
    assert.equal(latest.efficiency_metrics.schema_version, 'aipedia.loop-efficiency-metrics.v1');
    assert.equal(latest.efficiency_metrics.command_count, latest.totals.commands);
    assert.equal(latest.efficiency_metrics.loop_count, latest.totals.loops);
    assert.equal(latest.efficiency_metrics.persisted_latest_receipt_bytes, Buffer.byteLength(latestText, 'utf8'));
    assert.equal(fullRun.efficiency_metrics.persisted_full_receipt_bytes, Buffer.byteLength(fullRunText, 'utf8'));
    assert.equal(fullRun.efficiency_metrics.slowest_commands[0].label, 'clean command');

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

test('aipedia loops records exact model token usage in run ledgers', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-loops-token-ledger-'));
  const registry = writeRegistry(dir);
  const ledgerDir = join(dir, '.agent', 'loop-runs', 'system');
  const tokenUsagePath = join(dir, 'local-token-usage.json');

  try {
    writeFileSync(
      tokenUsagePath,
      `${JSON.stringify({
        entries: [
          {
            model: 'gpt-5.5',
            usage: {
              input_tokens: 1000,
              output_tokens: 250,
              total_tokens: 1250,
              input_token_details: { cached_tokens: 200 },
              output_token_details: { reasoning_tokens: 75 },
            },
          },
        ],
      }, null, 2)}\n`,
    );

    const result = runLoops(
      '--json',
      '--run',
      '--loop',
      'clean-loop',
      '--write-ledger',
      '--model-token-usage',
      tokenUsagePath,
      `--ledger-dir=${ledgerDir}`,
      `--project-dir=${dir}`,
      `--registry=${registry}`,
    );
    assert.equal(result.status, 0, result.stderr);

    const latest = JSON.parse(readFileSync(join(ledgerDir, 'latest.json'), 'utf8'));
    assert.equal(latest.model_token_usage.schema_version, 'aipedia.model-token-usage.v1');
    assert.deepEqual(latest.model_token_usage.models, ['gpt-5.5']);
    assert.equal(latest.model_token_usage.input_tokens, 1000);
    assert.equal(latest.model_token_usage.output_tokens, 250);
    assert.equal(latest.model_token_usage.cached_input_tokens, 200);
    assert.equal(latest.model_token_usage.reasoning_tokens, 75);
    assert.equal(latest.model_token_usage.total_tokens, 1250);
    assert.equal(latest.efficiency_metrics.model_token_usage_status, 'provided');
    assert.equal(latest.efficiency_metrics.exact_model_input_tokens, 1000);
    assert.equal(latest.efficiency_metrics.exact_model_output_tokens, 250);
    assert.equal(latest.efficiency_metrics.exact_model_cached_input_tokens, 200);
    assert.equal(latest.efficiency_metrics.exact_model_reasoning_tokens, 75);
    assert.equal(latest.efficiency_metrics.exact_model_total_tokens, 1250);
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
    assert.equal(latest.efficiency_metrics.system_artifact_count, latest.system_progress.system_artifacts.length);
    assert.ok(latest.efficiency_metrics.system_artifact_count >= 1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('aipedia loops records current-agent progress separately from preexisting dirty work', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-loops-preexisting-dirty-'));
  const registry = writeRegistry(dir);
  const ledgerDir = join(dir, '.agent', 'loop-runs', 'system');

  try {
    commitFixtureBaseline(dir);
    mkdirSync(join(dir, 'src', 'content', 'tools'), { recursive: true });
    mkdirSync(join(dir, '.agent'), { recursive: true });
    writeFileSync(join(dir, 'src', 'content', 'tools', 'preexisting.md'), '# Preexisting\n');
    writeFileSync(join(dir, '.agent', 'WORK_LOG.md'), '# Work Log\n');

    const result = runLoops(
      '--json',
      '--run',
      '--loop',
      'clean-loop',
      '--write-ledger',
      '--require-system-progress',
      '--observed-dirty-before-agent',
      'src/content/tools/preexisting.md',
      `--ledger-dir=${ledgerDir}`,
      `--project-dir=${dir}`,
      `--registry=${registry}`,
    );
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.system_progress.has_system_artifact, true);
    assert.equal(report.system_progress.has_agent_system_artifact, true);
    assert.ok(report.system_progress.system_artifacts.includes('.agent/WORK_LOG.md'));
    assert.ok(report.system_progress.content_artifacts.includes('src/content/tools/preexisting.md'));
    assert.deepEqual(report.system_progress.preexisting_content_artifacts, ['src/content/tools/preexisting.md']);
    assert.deepEqual(report.system_progress.agent_content_artifacts, []);
    assert.ok(report.system_progress.agent_system_artifacts.includes('.agent/WORK_LOG.md'));

    const latest = JSON.parse(readFileSync(join(ledgerDir, 'latest.json'), 'utf8'));
    assert.equal(latest.system_progress.has_agent_system_artifact, true);
    assert.deepEqual(latest.system_progress.preexisting_content_artifacts, ['src/content/tools/preexisting.md']);
    assert.equal(latest.efficiency_metrics.agent_system_artifact_count, latest.system_progress.agent_system_artifacts.length);
    assert.equal(latest.efficiency_metrics.preexisting_dirty_count, 1);
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
