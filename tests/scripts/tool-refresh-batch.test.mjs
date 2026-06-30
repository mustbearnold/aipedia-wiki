import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

function runNode(script, args = []) {
  return spawnSync(process.execPath, [script, ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

test('tool refresh batch check accepts planner JSON and reports missing files before running checks', () => {
  const dir = mkdtempSync(join(tmpdir(), 'tool-refresh-plan-'));
  const planPath = join(dir, 'plan.json');

  try {
    writeFileSync(
      planPath,
      `${JSON.stringify({
        commands: {
          tool_files: ['src/content/tools/not-a-real-tool.md'],
        },
      })}\n`,
    );

    const result = runNode('scripts/tool-refresh-batch-check.mjs', ['--json', '--plan', planPath]);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.deepEqual(report.tool_files, ['src/content/tools/not-a-real-tool.md']);
    assert.ok(report.failures.some((failure) => /file not found/.test(failure)));
    assert.deepEqual(report.commands, []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('tool refresh batch check help documents plan files', () => {
  const result = runNode('scripts/tool-refresh-batch-check.mjs', ['--help']);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /--plan/);
  assert.match(result.stdout, /--files-from/);
});

test('frontmatter check reports malformed YAML before Astro typecheck', () => {
  const dir = mkdtempSync(join(tmpdir(), 'frontmatter-check-'));
  const filePath = join(dir, 'broken.md');

  try {
    writeFileSync(filePath, [
      '---',
      'title: Broken',
      'pricing_anchor:',
      '  value: metering conflict: unquoted colon',
      '---',
      '',
      'Body.',
      '',
    ].join('\n'));

    const result = runNode('scripts/check-frontmatter.mjs', ['--json', '--file', filePath]);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.failures.length, 1);
    assert.match(report.failures[0].error, /bad indentation|can not read|mapping/i);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('tool refresh planner includes source metadata and scoped source-health commands', () => {
  const result = runNode('scripts/tool-refresh-batch.mjs', [
    '--json',
    '--limit',
    '2',
    '--max-workers',
    '2',
    '--tools-per-worker',
    '1',
    '--include-same-day',
    '--fail-on-stale-inputs',
  ]);

  assert.equal(result.status, 0, `planner should emit JSON\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
  const report = JSON.parse(result.stdout);

  assert.ok(report.batch.length > 0);
  assert.equal(report.fail_on_stale_inputs, true);
  assert.equal(report.input_freshness.ok, true);
  assert.equal(report.input_freshness.kind, 'tool-refresh-freshness-report');
  assert.ok(report.commands.source_ids.length > 0);
  assert.ok(report.commands.source_health.length >= 3);
  assert.match(report.commands.source_health[0], /npm run audit:sources -- --json --limit 0 --source-id/);
  assert.match(report.commands.source_health[1], /--live/);
  assert.match(report.commands.source_health[2], /--update-snapshots/);

  const toolWithSource = report.batch.find((tool) => tool.sources.length > 0);
  assert.ok(toolWithSource, 'at least one planned tool should include registered source metadata');
  assert.equal(typeof toolWithSource.sources[0].url, 'string');
  assert.equal(typeof toolWithSource.sources[0].last_checked, 'string');

  const workerWithSources = report.agent_briefs.worker_briefs.find((brief) => brief.source_ids.length > 0);
  assert.ok(workerWithSources, 'worker briefs should carry shard source IDs');
  assert.match(workerWithSources.prompt, /npm run audit:sources -- --json --limit 0 --source-id/);
  assert.match(workerWithSources.prompt, /primary-confirmed/);
  assert.match(workerWithSources.prompt, /blocked-live-check/);
  assert.match(report.agent_briefs.integrator_brief.prompt, /Optional source-health commands/);
  assert.match(report.agent_briefs.integrator_brief.prompt, /ledger:pages && npm run ledger:pages:check/);
  assert.ok(report.commands.batch_fast_check.some((command) => /ledger:pages && npm run ledger:pages:check/.test(command)));
});

test('tool refresh planner skips the previous day by default but keeps override knobs', () => {
  const defaultResult = runNode('scripts/tool-refresh-batch.mjs', [
    '--json',
    '--limit',
    '2',
  ]);

  assert.equal(defaultResult.status, 0, `planner should emit JSON\nstdout:\n${defaultResult.stdout}\nstderr:\n${defaultResult.stderr}`);
  const defaultReport = JSON.parse(defaultResult.stdout);
  assert.equal(defaultReport.exclude_recent_days, 1);
  assert.equal(typeof defaultReport.exclude_verified_date, 'string');

  const sameDayResult = runNode('scripts/tool-refresh-batch.mjs', [
    '--json',
    '--limit',
    '2',
    '--include-same-day',
  ]);
  assert.equal(sameDayResult.status, 0);
  const sameDayReport = JSON.parse(sameDayResult.stdout);
  assert.equal(sameDayReport.exclude_recent_days, null);
  assert.equal(sameDayReport.exclude_verified_date, null);

  const explicitResult = runNode('scripts/tool-refresh-batch.mjs', [
    '--json',
    '--limit',
    '2',
    '--exclude-verified-date',
    '2026-06-20',
  ]);
  assert.equal(explicitResult.status, 0);
  const explicitReport = JSON.parse(explicitResult.stdout);
  assert.equal(explicitReport.exclude_recent_days, null);
  assert.equal(explicitReport.exclude_verified_date, '2026-06-20');
});
