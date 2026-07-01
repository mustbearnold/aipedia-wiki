import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function runAdapter(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-correction-adapter.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function runCloseout(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-meta-closeout.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function writeJsonl(path, rows) {
  writeFileSync(path, `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`);
}

function baseCandidate(id, overrides = {}) {
  return {
    id,
    workflow: 'loop-system',
    run_id: `${id}-run`,
    orchestrator: id === 'single-agent' ? 'single-agent' : 'meta-orchestrator',
    ...overrides,
  };
}

test('agent correction adapter converts reviewer findings into telemetry receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-correction-adapter-reviewer-'));
  try {
    writeJson(join(root, 'reviewer-input.json'), {
      goal_id: 'june-30-agentic-tooling-meta-os',
      run_id: 'slice-75-reviewer-adapter',
      workflow: 'loop-system',
      telemetry_source: {
        type: 'reviewer',
        id: 'reviewer-packet',
        confidence: 'exact',
      },
      candidates: [
        baseCandidate('single-agent', {
          findings: [
            { id: 'single-finding-1', status: 'fixed', severity: 'medium', note: 'Missing source row.' },
            { id: 'single-finding-2', status: 'open', severity: 'low', note: 'Weak next action.' },
          ],
        }),
        baseCandidate('orchestrated-specialists', {
          findings: [
            { id: 'orch-finding-1', status: 'fixed', severity: 'medium', note: 'Needed tighter route proof.' },
          ],
          regressions: [
            { id: 'orch-regression-1', finding_id: 'orch-finding-1', severity: 'low', note: 'Extra receipt noise.' },
          ],
        }),
      ],
    });
    const result = runAdapter([
      '--project-dir',
      root,
      '--input',
      'reviewer-input.json',
      '--out',
      'reviewer-receipt.json',
      '--normalized-out',
      'reviewer-normalized.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.schema_version, 'aipedia.correction-telemetry.v1');
    assert.equal(receipt.telemetry_source.type, 'reviewer');
    assert.equal(receipt.totals.candidate_count, 2);
    assert.equal(receipt.totals.findings_count, 3);
    assert.equal(receipt.totals.corrections_applied, 2);
    assert.equal(receipt.totals.residual_issue_count, 1);
    assert.equal(receipt.totals.regression_count, 1);
    assert.equal(receipt.receipt_path, 'reviewer-receipt.json');
    const normalized = JSON.parse(readFileSync(join(root, 'reviewer-normalized.json'), 'utf8'));
    assert.equal(normalized.candidates[0].events[1].type, 'correction_applied');
    assert.equal(normalized.candidates[0].events[3].type, 'residual_issue');

    const closeout = runCloseout(['--project-dir', root, '--receipt', 'reviewer-receipt.json', '--json']);
    assert.equal(closeout.status, 0, closeout.stderr || closeout.stdout);
    const closeoutReport = JSON.parse(closeout.stdout);
    assert.equal(closeoutReport.closeout_profile, 'correction-telemetry');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent correction adapter converts runtime event rows into telemetry receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-correction-adapter-runtime-'));
  try {
    writeJson(join(root, 'runtime-input.json'), {
      goal_id: 'june-30-agentic-tooling-meta-os',
      run_id: 'slice-75-runtime-adapter',
      workflow: 'loop-system',
      telemetry_source: {
        type: 'runtime',
        id: 'runtime-event-log',
      },
      candidates: [
        baseCandidate('single-agent'),
        baseCandidate('orchestrated-specialists'),
      ],
      runtime_events: [
        { candidate_id: 'single-agent', id: 'single-finding-1', type: 'issue', severity: 'medium' },
        { candidate_id: 'single-agent', id: 'single-fix-1', type: 'fix', finding_id: 'single-finding-1' },
        { candidate_id: 'orchestrated-specialists', id: 'orch-finding-1', type: 'finding', severity: 'low' },
        { candidate_id: 'orchestrated-specialists', id: 'orch-residual-1', type: 'residual', finding_id: 'orch-finding-1' },
      ],
    });
    const result = runAdapter(['--project-dir', root, '--input', 'runtime-input.json', '--out', 'runtime-receipt.json', '--json']);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.telemetry_source.type, 'runtime');
    assert.equal(receipt.totals.findings_count, 2);
    assert.equal(receipt.totals.corrections_applied, 1);
    assert.equal(receipt.totals.residual_issue_count, 1);
    assert.equal(receipt.candidates[0].events[1].type, 'correction_applied');
    assert.equal(receipt.candidates[1].events[1].type, 'residual_issue');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent correction adapter converts runtime JSONL logs into telemetry receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-correction-adapter-jsonl-'));
  try {
    writeJsonl(join(root, 'events.jsonl'), [
      {
        record_type: 'meta',
        goal_id: 'june-30-agentic-tooling-meta-os',
        run_id: 'slice-76-jsonl-adapter',
        workflow: 'loop-system',
        telemetry_source: { type: 'runtime', id: 'jsonl-event-log', confidence: 'exact' },
      },
      baseCandidate('single-agent', { record_type: 'candidate' }),
      baseCandidate('orchestrated-specialists', { record_type: 'candidate' }),
      { record_type: 'event', candidate_id: 'single-agent', id: 'jsonl-single-finding', type: 'finding', severity: 'medium' },
      { record_type: 'event', candidate_id: 'single-agent', id: 'jsonl-single-fix', type: 'fix', finding_id: 'jsonl-single-finding' },
      { record_type: 'event', candidate_id: 'orchestrated-specialists', id: 'jsonl-orch-finding', type: 'issue', severity: 'low' },
      { record_type: 'event', candidate_id: 'orchestrated-specialists', id: 'jsonl-orch-regression', type: 'regression', finding_id: 'jsonl-orch-finding' },
    ]);
    const result = runAdapter([
      '--project-dir',
      root,
      '--events-jsonl',
      'events.jsonl',
      '--out',
      'jsonl-receipt.json',
      '--normalized-out',
      'jsonl-normalized.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.telemetry_source.id, 'jsonl-event-log');
    assert.equal(receipt.totals.findings_count, 2);
    assert.equal(receipt.totals.corrections_applied, 1);
    assert.equal(receipt.totals.regression_count, 1);
    const normalized = JSON.parse(readFileSync(join(root, 'jsonl-normalized.json'), 'utf8'));
    assert.equal(normalized.candidates[0].events.length, 2);
    assert.equal(normalized.candidates[1].events[1].type, 'regression');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent correction adapter rejects events for unknown candidates', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-correction-adapter-bad-'));
  try {
    writeJson(join(root, 'bad-input.json'), {
      goal_id: 'june-30-agentic-tooling-meta-os',
      run_id: 'slice-75-bad-adapter',
      workflow: 'loop-system',
      candidates: [baseCandidate('single-agent')],
      runtime_events: [
        { candidate_id: 'missing-candidate', id: 'finding-1', type: 'finding' },
      ],
    });
    const result = runAdapter(['--project-dir', root, '--input', 'bad-input.json', '--json']);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.ok(report.issues.some((issue) => issue.code === 'correction-adapter-event-invalid'));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
