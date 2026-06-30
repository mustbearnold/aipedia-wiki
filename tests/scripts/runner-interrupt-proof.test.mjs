import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

const SCRIPT_PATH = join(process.cwd(), 'scripts', 'runner-interrupt-proof.mjs');

function runProof(args = []) {
  return spawnSync(process.execPath, [SCRIPT_PATH, ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

test('runner interrupt proof dry-run writes reusable fixture', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-runner-proof-'));
  try {
    const result = runProof([
      '--project-dir',
      dir,
      '--work-dir',
      'local/tmp/interrupted-proof',
      '--proof-prefix',
      'unit-proof',
      '--current-date',
      '2026-06-30',
      '--dry-run',
      '--json',
    ]);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'runner-interrupt-proof-dry-run');
    assert.equal(report.fixture.package_json, 'local/tmp/interrupted-proof/package.json');
    assert.equal(report.fixture.plan, 'local/tmp/interrupted-proof/plan.json');
    assert.equal(report.fixture.route_args, 'local/tmp/interrupted-proof/route-args.txt');

    const packageJson = JSON.parse(readFileSync(join(dir, report.fixture.package_json), 'utf8'));
    assert.match(packageJson.scripts['ledger:pages'], /SIGINT/);
    assert.match(packageJson.scripts['agent:pause-receipt'], /agent-pause-receipt\.mjs/);
    assert.deepEqual(JSON.parse(readFileSync(join(dir, report.fixture.plan), 'utf8')), { batch: [], agent_briefs: null });
    assert.equal(readFileSync(join(dir, report.fixture.route_args), 'utf8'), '--route /categories/ --route /tools/\n');
    assert.equal(existsSync(join(dir, 'local/tmp/interrupted-proof/receipts')), true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('runner interrupt proof blocks unsafe work dirs by default', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-runner-proof-safe-'));
  const outside = mkdtempSync(join(tmpdir(), 'aipedia-runner-proof-outside-'));
  try {
    const result = runProof([
      '--project-dir',
      dir,
      '--work-dir',
      outside,
      '--dry-run',
      '--json',
    ]);
    assert.equal(result.status, 2, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.argument_issues[0].code, 'unsafe-work-dir');
  } finally {
    rmSync(dir, { recursive: true, force: true });
    rmSync(outside, { recursive: true, force: true });
  }
});
