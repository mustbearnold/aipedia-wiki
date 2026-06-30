import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function runRouter(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-meta-closeout.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function writeDagProof(root) {
  writeJson(join(root, 'dag.json'), {
    schema_version: 'aipedia.agent-task-dag.v1',
    nodes: [],
  });
  writeJson(join(root, 'dag-check.json'), {
    schema_version: 'aipedia.agent-task-dag-check.v1',
    ok: true,
    totals: {
      issues: 0,
    },
    receipts: [
      {
        path: 'dag.json',
      },
    ],
  });
}

function validSystemProgress() {
  return {
    ok: true,
    mode: 'system-progress-check',
    command: 'node scripts/agent-system-progress-check.mjs --json --project-dir=. --require-system-artifact',
    exit_code: 0,
    require_system_artifact: true,
    changed_paths: ['scripts/example.mjs'],
    system_artifacts: ['scripts/example.mjs'],
    content_artifacts: [],
    other_artifacts: [],
    has_system_artifact: true,
    content_only: false,
    next_action: 'System artifact present or enforcement disabled.',
  };
}

function validTrace(name = 'loop-run') {
  return {
    trace_id: `trace:${name}`,
    span_id: `span:${name}`,
    parent_span_id: '',
    name,
    started_at: '2026-06-30T09:46:56.468Z',
    ended_at: '2026-06-30T09:46:56.591Z',
    duration_ms: 123,
  };
}

function dagArtifactRefs() {
  return [
    {
      role: 'output',
      kind: 'agent-task-dag',
      path: 'dag.json',
    },
    {
      role: 'output',
      kind: 'agent-task-dag-validation-report',
      path: 'dag-check.json',
    },
  ];
}

function validLoopReceipt() {
  return {
    ok: true,
    mode: 'loop-run',
    project_dir: '.',
    registry_path: 'src/data/aipedia-loops.json',
    schema_version: 1,
    default_site_dir: 'dist-fast/client',
    generated_at: '2026-06-30T09:46:56.468Z',
    goal_id: 'june-30-agentic-tooling-meta-os',
    run_id: 'fixture-loop',
    residual_risks: [],
    next_actions: ['Continue the fixture.'],
    trace: validTrace('loop-run'),
    artifact_refs: [
      {
        role: 'input',
        kind: 'loop-registry',
        path: 'src/data/aipedia-loops.json',
      },
      ...dagArtifactRefs(),
    ],
    duration_ms: 123,
    efficiency_metrics: {
      schema_version: 'aipedia.loop-efficiency-metrics.v1',
      wall_duration_ms: 123,
      total_command_duration_ms: 10,
      command_count: 1,
      loop_count: 1,
      ok_loop_count: 1,
      attention_loop_count: 0,
      skipped_loop_count: 0,
      average_command_duration_ms: 10,
      commands_per_second: 8.13,
      loops_per_second: 8.13,
      attention_rate: 0,
      skipped_rate: 0,
      artifact_ref_count: 3,
      embedded_command_artifact_count: 0,
      system_artifact_count: 1,
      content_artifact_count: 0,
      other_artifact_count: 0,
      system_artifacts_per_second: 8.13,
      persisted_full_receipt_bytes: 2048,
      persisted_latest_receipt_bytes: 1024,
      slowest_commands: [
        {
          loop_id: 'decision-content',
          label: 'fixture command',
          status: 'ok',
          duration_ms: 10,
        },
      ],
    },
    totals: {
      loops: 1,
      ok: 1,
      attention: 0,
      skipped: 0,
      commands: 1,
    },
    loops: [
      {
        id: 'decision-content',
        title: 'Decision Content',
        status: 'ok',
        purpose: 'Fixture loop.',
        duration_ms: 10,
        commands: [
          {
            label: 'fixture command',
            status: 'ok',
            command: 'node fixture.mjs',
            duration_ms: 10,
            exit_code: 0,
            signal: '',
            attention_reasons: [],
          },
        ],
        attention_reasons: [],
        skip_reason: '',
        review_questions: [],
        record_targets: [],
      },
    ],
    review: {
      summary: '1 loop(s) ok; 0 attention; 0 skipped.',
      attention_loops: [],
      skipped_loops: [],
      recommendations: [],
      next_actions: [],
    },
    system_progress: validSystemProgress(),
    ledger: {
      written: true,
      file: '.agent/loop-runs/system/fixture-loop-run.json',
      latest_file: '.agent/loop-runs/system/latest.json',
      previous_file: '',
      trend: {
        previous_run: '',
        status_changes: [],
        duration_delta_ms: null,
        totals_delta: null,
      },
    },
  };
}

function validRunnerReceipt() {
  return {
    schema_version: 'aipedia.closeout-receipt.v1',
    workflow: 'tool-refresh',
    status: 'passed',
    generated_at: '2026-06-30T09:46:56Z',
    goal_id: 'june-30-agentic-tooling-meta-os',
    run_id: 'fixture-runner',
    residual_risks: [],
    next_actions: ['Continue the runner fixture.'],
    trace: validTrace('tool-refresh'),
    artifact_refs: [
      { role: 'input', kind: 'plan', path: 'local/tmp/plan.json' },
      { role: 'input', kind: 'route-args', path: 'local/tmp/routes.txt' },
      { role: 'output', kind: 'markdown-receipt', path: 'local/tmp/receipt.md' },
      { role: 'output', kind: 'json-receipt', path: 'local/tmp/receipt.json' },
      { role: 'route', kind: 'changed-route', id: '/tools/example/' },
      { role: 'source', kind: 'source-id', id: 'example-pricing' },
      { role: 'embedded', kind: 'closeout-command', id: 'tool-refresh:ledger-generate' },
      ...dagArtifactRefs(),
    ],
    elapsed_ms: 250,
    plan: 'local/tmp/plan.json',
    route_args: 'local/tmp/routes.txt',
    markdown_receipt: 'local/tmp/receipt.md',
    changed_routes: ['/tools/example/'],
    source_ids: ['example-pricing'],
    widths: [319, 360, 390, 430, 768, 1024, 1366],
    commands: [
      { label: 'ledger generate', status: 0, elapsed_ms: 50, details_path: null },
      { label: 'ledger check', status: 0, elapsed_ms: 50, details_path: null },
      { label: 'tool refresh grouped check', status: 0, elapsed_ms: 50, details_path: null },
      { label: 'date consistency changed', status: 0, elapsed_ms: 50, details_path: null },
      { label: 'typecheck', status: 0, elapsed_ms: 50, details_path: null },
    ],
    superseded_failures: [],
    system_progress: validSystemProgress(),
    input_freshness: {
      ok: true,
      mode: 'input-freshness-receipt',
      schema_version: 'aipedia.input-freshness-receipt.v1',
      project_dir: '.',
      command: 'node scripts/agent-input-freshness-receipt.mjs --workflow tool-refresh --json --project-dir=.',
      exit_code: 0,
      require_fresh: false,
      workflows: [
        {
          id: 'tool-refresh',
          kind: 'tool-refresh-freshness-report',
          ok: true,
          status: 'fresh',
          next_action: '',
        },
      ],
      summary: {
        workflow_count: 1,
        ok_count: 1,
        attention_count: 0,
        stale_count: 0,
      },
      next_actions: [],
    },
  };
}

test('meta closeout router validates latest loop receipt by default', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-meta-closeout-loop-'));
  try {
    mkdirSync(join(root, '.agent/loop-runs/system'), { recursive: true });
    writeDagProof(root);
    writeJson(join(root, '.agent/loop-runs/system/latest.json'), validLoopReceipt());

    const result = runRouter(['--project-dir', root, '--json']);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.closeout_profile, 'latest-loop');
    assert.equal(report.requires_workflow_policy, false);
    assert.equal(report.checker_report.require_workflow_policy, false);
    assert.equal(report.checker_report.require_dag_proof, true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('meta closeout router adds workflow policy for runner receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-meta-closeout-runner-'));
  try {
    writeDagProof(root);
    writeJson(join(root, 'runner.json'), validRunnerReceipt());

    const result = runRouter(['--project-dir', root, '--receipt', 'runner.json', '--json']);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.closeout_profile, 'runner-closeout');
    assert.equal(report.requires_workflow_policy, true);
    assert.ok(report.strict_flags.includes('--require-workflow-policy'));
    assert.equal(report.checker_report.require_workflow_policy, true);
    assert.equal(report.checker_report.receipts[0].type, 'runner-closeout');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('meta closeout router fails closed on unsupported receipt types', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-meta-closeout-unsupported-'));
  try {
    writeJson(join(root, 'affiliate.json'), {
      schema_version: 'aipedia.affiliate-handoff-receipt.v1',
    });

    const result = runRouter(['--project-dir', root, '--receipt', 'affiliate.json', '--json']);
    assert.equal(result.status, 2);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.closeout_profile, 'unsupported');
    assert.equal(report.route_issues[0].code, 'unsupported-receipt-type');
    assert.equal(report.checker_report, undefined);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
