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

test('tool refresh planner includes source metadata and scoped source-health commands', () => {
  const result = runNode('scripts/tool-refresh-batch.mjs', [
    '--json',
    '--limit',
    '2',
    '--max-workers',
    '2',
    '--tools-per-worker',
    '1',
  ]);

  assert.equal(result.status, 0, `planner should emit JSON\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
  const report = JSON.parse(result.stdout);

  assert.ok(report.batch.length > 0);
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
  assert.match(report.agent_briefs.integrator_brief.prompt, /Optional source-health commands/);
});
