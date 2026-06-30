import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function runCheck(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-closeout-receipt-check.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function validLoopReceipt(overrides = {}) {
  return {
    ok: true,
    mode: 'loop-run',
    project_dir: '.',
    registry_path: 'src/data/aipedia-loops.json',
    schema_version: 1,
    default_site_dir: 'dist-fast/client',
    generated_at: '2026-06-30T03:01:47.100Z',
    goal_id: 'meta-goal',
    run_id: 'loop-run:fixture',
    residual_risks: [],
    next_actions: ['Continue the fixture.'],
    trace: {
      trace_id: 'trace:meta-goal:loop-run-fixture',
      span_id: 'span:loop-run:fixture',
      parent_span_id: '',
      name: 'loop-run',
      started_at: '2026-06-30T03:01:47.100Z',
      ended_at: '2026-06-30T03:01:47.223Z',
      duration_ms: 123,
    },
    artifact_refs: [
      {
        role: 'input',
        kind: 'loop-registry',
        path: 'src/data/aipedia-loops.json',
        description: 'Loop registry used for this run.',
      },
      {
        role: 'output',
        kind: 'loop-run-receipt',
        path: '.agent/loop-runs/system/fixture-loop-run.json',
      },
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
      artifact_ref_count: 2,
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
        duration_ms: 12,
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
    system_progress: {
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
    },
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
    ...overrides,
  };
}

function validRunnerReceipt(overrides = {}) {
  const workflow = overrides.workflow || 'tool-refresh';
  return {
    schema_version: 'aipedia.closeout-receipt.v1',
    workflow,
    status: 'passed',
    generated_at: '2026-06-30T03:01:47Z',
    goal_id: 'meta-goal',
    run_id: 'runner-run:fixture',
    residual_risks: [],
    next_actions: ['Continue the runner fixture.'],
    trace: {
      trace_id: 'trace:meta-goal:runner-fixture',
      span_id: `span:${workflow}:fixture`,
      parent_span_id: '',
      name: workflow,
      started_at: '2026-06-30T03:01:47Z',
      ended_at: '2026-06-30T03:01:47Z',
      duration_ms: 250,
    },
    artifact_refs: [
      {
        role: 'input',
        kind: 'plan',
        path: 'local/tmp/plan.json',
      },
      {
        role: 'input',
        kind: 'route-args',
        path: 'local/tmp/routes.txt',
      },
      {
        role: 'output',
        kind: 'markdown-receipt',
        path: 'local/tmp/receipt.md',
      },
      {
        role: 'output',
        kind: 'json-receipt',
        path: 'local/tmp/receipt.json',
      },
      {
        role: 'route',
        kind: 'changed-route',
        id: '/tools/example/',
      },
      {
        role: 'source',
        kind: 'source-id',
        id: 'example-pricing',
      },
      {
        role: 'embedded',
        kind: 'closeout-command',
        id: 'tool-refresh:ledger-generate',
      },
    ],
    current_date: null,
    elapsed_ms: 250,
    plan: 'local/tmp/plan.json',
    route_args: 'local/tmp/routes.txt',
    report_dir: null,
    report_summary: null,
    markdown_receipt: 'local/tmp/receipt.md',
    changed_routes: ['/tools/example/'],
    source_ids: ['example-pricing'],
    widths: [319, 360, 390, 430, 768, 1024, 1366],
    commands: [
      {
        label: 'ledger generate',
        status: 0,
        elapsed_ms: 50,
        details_path: null,
      },
      {
        label: 'ledger check',
        status: 0,
        elapsed_ms: 50,
        details_path: null,
      },
      {
        label: 'tool refresh grouped check',
        status: 0,
        elapsed_ms: 50,
        details_path: null,
      },
      {
        label: 'date consistency changed',
        status: 0,
        elapsed_ms: 50,
        details_path: null,
      },
      {
        label: 'typecheck',
        status: 0,
        elapsed_ms: 50,
        details_path: null,
      },
    ],
    superseded_failures: [],
    system_progress: validLoopReceipt().system_progress,
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
          id: workflow,
          kind: `${workflow}-freshness-report`,
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
    ...overrides,
  };
}

function validPageRunnerReceipt(overrides = {}) {
  const pageReceipt = validRunnerReceipt({
    workflow: 'page-refresh',
    current_date: '2026-06-30',
    route_args: null,
    report_dir: 'local/tmp/reports',
    report_summary: 'local/tmp/report-summary.md',
    changed_routes: ['/compare/example-vs-other/'],
    source_ids: ['example-comparison-source'],
    commands: [
      { label: 'ledger generate', status: 0, elapsed_ms: 50, details_path: null },
      { label: 'ledger check', status: 0, elapsed_ms: 50, details_path: null },
      { label: 'frontmatter changed', status: 0, elapsed_ms: 50, details_path: null },
      { label: 'date consistency changed', status: 0, elapsed_ms: 50, details_path: null },
      { label: 'provenance changed', status: 0, elapsed_ms: 50, details_path: null },
      { label: 'coverage quality changed', status: 0, elapsed_ms: 50, details_path: null },
      { label: 'em dash guard', status: 0, elapsed_ms: 50, details_path: null },
      { label: 'diff check', status: 0, elapsed_ms: 50, details_path: null },
      { label: 'typecheck', status: 0, elapsed_ms: 50, details_path: null },
    ],
    artifact_refs: [
      { role: 'input', kind: 'plan', path: 'local/tmp/page-plan.json' },
      { role: 'input', kind: 'worker-report-dir', path: 'local/tmp/reports' },
      { role: 'input', kind: 'worker-report-summary', path: 'local/tmp/report-summary.md' },
      { role: 'output', kind: 'markdown-receipt', path: 'local/tmp/page-receipt.md' },
      { role: 'output', kind: 'json-receipt', path: 'local/tmp/page-receipt.json' },
      { role: 'route', kind: 'changed-route', id: '/compare/example-vs-other/' },
      { role: 'source', kind: 'source-id', id: 'example-comparison-source' },
      { role: 'embedded', kind: 'closeout-command', id: 'page-refresh:ledger-generate' },
    ],
  });
  return { ...pageReceipt, ...overrides };
}

function validAffiliateHandoffReceipt(overrides = {}) {
  return {
    schema_version: 'aipedia.affiliate-handoff-receipt.v1',
    workflow: 'affiliate-conversion-handoff',
    status: 'ready',
    generated_at: '2026-06-30T03:01:47Z',
    current_date: '2026-06-30',
    plan: 'local/tmp/affiliate-plan.json',
    report_summary: 'local/tmp/affiliate-report-summary.md',
    markdown_handoff: 'local/tmp/affiliate-handoff.md',
    selected_cluster_count: 1,
    selected_clusters: [
      {
        id: 'affiliate-alpha-tool',
        primary_tool: 'alpha-tool',
        worker_id: 'affiliate-worker-1',
        buyer_job: 'Find the next Alpha Tool buyer-intent page.',
        source_file: 'src/content/tools/alpha-tool.md',
        claim_receipt_count: 1,
        source_url_count: 2,
        commercial_cta_note_count: 1,
        parent_surface_note_count: 1,
        duplicate_intent_note_count: 1,
        route_qa_risk_count: 1,
        check_count: 2,
      },
    ],
    expected_worker_reports: 1,
    parsed_worker_reports: 1,
    missing_worker_reports: [],
    invalid_worker_reports: [],
    strict_validation_issue_count: 0,
    claim_receipt_count: 1,
    source_url_count: 2,
    commercial_cta_note_count: 1,
    duplicate_intent_note_count: 1,
    parent_surface_note_count: 1,
    route_qa_routes: ['/tools/alpha-tool/', '/guides/alpha-tool-pricing/'],
    parent_surfaces: ['/tools/', '/guides/'],
    verification_gates: [
      'npm run runner:affiliate-conversion:reports -- --strict',
      'npm run affiliate:conversion:inventory -- --json',
      'npm run ledger:pages && npm run ledger:pages:check',
      'npm run typecheck',
      'npm run build:fast',
      'Inspect CommercialCTA usage and affiliate disclosure on every changed commercial page.',
      'Run live source checks for every volatile source touched by the content slice.',
    ],
    no_edit_boundaries: [
      'Workers may touch only explicitly assigned files.',
      'Workers must not edit `PAGE_REFRESH_LEDGER.md`, `src/data/source-registry.json`, parent hubs, top-layer pages, `.agent/**`, `workflows/**`, runner code, audit scripts, or generated output.',
      'The integrator owns shared files, route QA scope, final verification, and final receipts.',
    ],
    blocked_or_deferred_count: 0,
    pending_count: 0,
    non_passed_check_count: 0,
    residual_risks: [
      'This is a no-content implementation handoff and does not itself publish or verify rendered pages.',
    ],
    ...overrides,
  };
}

function validPauseReceipt(overrides = {}) {
  return {
    schema_version: 'aipedia.pause-receipt.v1',
    goal_id: '2026-06-30-agentic-tooling-meta-os',
    run_id: 'pause-run:fixture',
    paused_at: '2026-06-30T03:01:47.100Z',
    pause_reason: 'handoff',
    latest_safe_resume_step: 'Read the pause receipt and check git status.',
    in_progress_step: 'Implementing pause receipt schema validation.',
    dirty_tree_summary: [' M scripts/agent-pause-receipt.mjs'],
    files_touched_by_agent: ['scripts/agent-pause-receipt.mjs'],
    files_observed_dirty_before_agent: ['src/content/tools/synthesia.md'],
    child_workers: [],
    open_questions: [],
    blocked_on: [],
    must_not_repeat: ['Do not stage unrelated Synthesia content WIP.'],
    next_commands: ['node --test tests/scripts/agent-pause-receipt.test.mjs'],
    validation_done: ['node --check scripts/agent-pause-receipt.mjs'],
    validation_pending: ['agent:closeout:check pause receipt'],
    source_cutoff: '2026-06-30',
    trace: {
      trace_id: 'trace:meta-goal:pause-fixture',
      span_id: 'span:pause-receipt:pause-fixture',
      parent_span_id: '',
      name: 'pause-receipt',
      started_at: '2026-06-30T03:01:47.000Z',
      ended_at: '2026-06-30T03:01:47.100Z',
      duration_ms: 100,
    },
    artifact_refs: [
      {
        role: 'output',
        kind: 'pause-receipt',
        path: '.agent/loop-runs/pauses/pause.json',
        description: 'Written pause receipt JSON.',
      },
      {
        role: 'dirty',
        kind: 'agent-touched-file',
        path: 'scripts/agent-pause-receipt.mjs',
        description: 'Dirty file attributed to this agent run.',
      },
    ],
    ...overrides,
  };
}

function validRunnerInterruptProof(overrides = {}) {
  const proofPath = '.agent/evals/runner-interrupt-proofs/fixture-proof-report.json';
  const copiedPause = '.agent/evals/runner-interrupt-proofs/fixture-interrupted-pause.json';
  const copiedCloseout = '.agent/evals/runner-interrupt-proofs/fixture-interrupted-closeout.json';
  return {
    ok: true,
    mode: 'runner-interrupt-proof',
    schema_version: 'aipedia.runner-interrupt-proof.v1',
    project_dir: '.',
    work_dir: 'local/tmp/aipedia-runner-interrupt-proof',
    proof_dir: '.agent/evals/runner-interrupt-proofs',
    proof_prefix: 'fixture-proof',
    goal_id: '2026-06-30-agentic-tooling-meta-os',
    run_id: 'fixture-proof-run',
    current_date: '2026-06-30',
    fixture: {
      package_json: 'local/tmp/aipedia-runner-interrupt-proof/package.json',
      plan: 'local/tmp/aipedia-runner-interrupt-proof/plan.json',
      route_args: 'local/tmp/aipedia-runner-interrupt-proof/route-args.txt',
      receipt_dir: 'local/tmp/aipedia-runner-interrupt-proof/receipts',
      ledger_script: 'node -e "setTimeout(() => process.kill(process.pid, \'SIGINT\'), 25); setTimeout(() => {}, 5000)"',
    },
    runner: {
      status: 1,
      signal: '',
      expected_nonzero: true,
      stdout_tail: '',
      stderr_tail: 'closeout stopped after interrupted command',
    },
    artifacts: {
      pause_receipt: 'local/tmp/aipedia-runner/pauses/fixture-pause.json',
      closeout_receipt: 'local/tmp/aipedia-runner-interrupt-proof/receipts/fixture-closeout.json',
      copied_pause_receipt: copiedPause,
      copied_closeout_receipt: copiedCloseout,
      proof_report: proofPath,
    },
    assertions: {
      closeout_failed: true,
      interrupted_command_recorded: true,
      interrupted_pause_receipt_linked: true,
      interrupted_pause_artifact_linked: true,
    },
    validations: [
      {
        label: copiedPause,
        status: 0,
        ok: true,
        stdout_tail: '{"ok":true}',
        stderr_tail: '',
      },
      {
        label: copiedCloseout,
        status: 0,
        ok: true,
        stdout_tail: '{"ok":true}',
        stderr_tail: '',
      },
    ],
    issues: [],
    residual_risks: [
      'Interrupted runner proof validates pause capture and closeout linkage only, not rendered page quality.',
    ],
    next_actions: [
      'Use the copied proof receipts in compliance docs and future regression checks.',
    ],
    report_path: proofPath,
    trace: {
      trace_id: 'trace:meta-goal:runner-interrupt-proof-fixture',
      span_id: 'span:runner-interrupt-proof:fixture',
      parent_span_id: '',
      name: 'runner-interrupt-proof',
      started_at: '2026-06-30T03:01:47.000Z',
      ended_at: '2026-06-30T03:01:48.000Z',
      duration_ms: 1000,
    },
    artifact_refs: [
      {
        role: 'input',
        kind: 'proof-fixture-plan',
        path: 'local/tmp/aipedia-runner-interrupt-proof/plan.json',
      },
      {
        role: 'output',
        kind: 'interrupted-pause-receipt',
        path: copiedPause,
      },
      {
        role: 'output',
        kind: 'interrupted-closeout-receipt',
        path: copiedCloseout,
      },
      {
        role: 'output',
        kind: 'runner-interrupt-proof-report',
        path: proofPath,
      },
      {
        role: 'embedded',
        kind: 'proof-validation',
        id: 'validation:1',
      },
    ],
    ...overrides,
  };
}

test('closeout receipt check validates latest enforced loop receipt by default', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-loop-'));
  const systemDir = join(dir, '.agent', 'loop-runs', 'system');

  try {
    mkdirSync(systemDir, { recursive: true });
    writeJson(join(systemDir, 'latest.json'), validLoopReceipt());
    const result = runCheck(['--project-dir', dir, '--require-system-progress', '--require-efficiency-metrics', '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.totals.receipts, 1);
    assert.equal(report.receipts[0].type, 'loop-run');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates DAG artifact refs on loop receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-dag-artifacts-'));
  const receiptPath = join(dir, 'receipt.json');
  const dagPath = join(dir, 'agent-task-graph.json');
  const validationPath = join(dir, 'agent-task-graph.validation.json');

  try {
    writeJson(dagPath, {
      schema_version: 'aipedia.agent-task-dag.v1',
      nodes: [],
    });
    writeJson(validationPath, {
      ok: true,
      schema_version: 'aipedia.agent-task-dag-check.v1',
      totals: {
        issues: 0,
      },
      receipts: [
        {
          ok: true,
          path: dagPath,
          schema_version: 'aipedia.agent-task-dag.v1',
          node_count: 0,
          issues: [],
        },
      ],
    });
    writeJson(receiptPath, validLoopReceipt({
      artifact_refs: [
        ...validLoopReceipt().artifact_refs,
        {
          role: 'output',
          kind: 'agent-task-dag',
          path: dagPath,
        },
        {
          role: 'output',
          kind: 'agent-task-dag-validation-report',
          path: validationPath,
        },
      ],
    }));

    const result = runCheck([
      '--receipt',
      receiptPath,
      '--require-closeout-identity',
      '--require-trace-artifacts',
      '--require-efficiency-metrics',
      '--require-dag-proof',
      '--json',
    ]);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    writeJson(validationPath, {
      ok: false,
      schema_version: 'aipedia.agent-task-dag-check.v1',
      totals: {
        issues: 1,
      },
      receipts: [
        {
          ok: false,
          path: dagPath,
          schema_version: 'aipedia.agent-task-dag.v1',
          node_count: 0,
          issues: [{ code: 'fixture', message: 'fixture' }],
        },
      ],
    });
    const failed = runCheck([
      '--receipt',
      receiptPath,
      '--require-closeout-identity',
      '--require-trace-artifacts',
      '--require-efficiency-metrics',
      '--json',
    ]);
    assert.equal(failed.status, 1);
    const report = JSON.parse(failed.stdout);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('dag-validation-artifact-failed'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates pause receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-pause-'));
  const path = join(dir, 'pause.json');

  try {
    writeJson(path, validPauseReceipt());
    const result = runCheck(['--receipt', path, '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.receipts[0].type, 'pause-receipt');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check requires trace artifacts on pause receipts when requested', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-pause-trace-'));
  const validPath = join(dir, 'pause-valid.json');
  const invalidPath = join(dir, 'pause-invalid.json');
  const invalidReceipt = validPauseReceipt();
  delete invalidReceipt.trace;
  delete invalidReceipt.artifact_refs;

  try {
    writeJson(validPath, validPauseReceipt());
    writeJson(invalidPath, invalidReceipt);

    const validResult = runCheck(['--receipt', validPath, '--require-trace-artifacts', '--json']);
    assert.equal(validResult.status, 0, `${validResult.stdout}\n${validResult.stderr}`);

    const invalidResult = runCheck(['--receipt', invalidPath, '--require-trace-artifacts', '--json']);
    assert.equal(invalidResult.status, 1);
    const report = JSON.parse(invalidResult.stdout);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('closeout-trace-invalid'));
    assert.ok(codes.includes('closeout-artifact-refs-invalid'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails malformed pause receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-bad-pause-'));
  const path = join(dir, 'pause.json');
  const receipt = validPauseReceipt({
    pause_reason: 'mystery',
    latest_safe_resume_step: '',
    files_touched_by_agent: ['scripts/agent-pause-receipt.mjs', 123],
    source_cutoff: '2026/06/30',
  });

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    const issueText = report.receipts[0].issues.map((item) => item.detail).join('\n');
    assert.match(issueText, /pause_reason/);
    assert.match(issueText, /latest_safe_resume_step/);
    assert.match(issueText, /files_touched_by_agent/);
    assert.match(issueText, /source_cutoff/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails enforced loop receipts without efficiency metrics', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-missing-efficiency-'));
  const path = join(dir, 'loop.json');
  const receipt = validLoopReceipt();
  delete receipt.efficiency_metrics;

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-efficiency-metrics', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.receipts[0].issues[0].code, 'efficiency-metrics-missing');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails mismatched efficiency metrics', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-bad-efficiency-'));
  const path = join(dir, 'loop.json');
  const receipt = validLoopReceipt();
  receipt.efficiency_metrics.command_count = 99;
  receipt.efficiency_metrics.total_command_duration_ms = 999;

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-efficiency-metrics', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('efficiency-metrics-mismatch'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails enforced loop receipts without system progress', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-missing-progress-'));
  const path = join(dir, 'loop.json');
  const receipt = validLoopReceipt();
  delete receipt.system_progress;

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-system-progress', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.receipts[0].issues[0].code, 'system-progress-missing');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails receipts without required closeout identity', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-missing-identity-'));
  const path = join(dir, 'loop.json');
  const receipt = validLoopReceipt();
  delete receipt.goal_id;
  delete receipt.run_id;
  delete receipt.residual_risks;
  delete receipt.next_actions;

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-closeout-identity', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('closeout-goal-id-missing'));
    assert.ok(codes.includes('closeout-run-id-missing'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails receipts without required trace artifacts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-missing-trace-'));
  const path = join(dir, 'loop.json');
  const receipt = validLoopReceipt();
  delete receipt.trace;
  delete receipt.artifact_refs;

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-trace-artifacts', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('closeout-trace-invalid'));
    assert.ok(codes.includes('closeout-artifact-refs-invalid'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates runner closeout receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-runner-'));
  const path = join(dir, 'runner.json');

  try {
    writeJson(path, validRunnerReceipt());
    const result = runCheck(['--receipt', path, '--require-trace-artifacts', '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.receipts[0].type, 'runner-closeout');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates DAG artifact refs on runner receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-runner-dag-artifacts-'));
  const receiptPath = join(dir, 'runner.json');
  const dagPath = join(dir, 'agent-task-graph.json');
  const validationPath = join(dir, 'agent-task-graph.validation.json');

  try {
    writeJson(dagPath, {
      schema_version: 'aipedia.agent-task-dag.v1',
      nodes: [],
    });
    writeJson(validationPath, {
      ok: true,
      schema_version: 'aipedia.agent-task-dag-check.v1',
      totals: {
        issues: 0,
      },
      receipts: [
        {
          ok: true,
          path: dagPath,
          schema_version: 'aipedia.agent-task-dag.v1',
          node_count: 0,
          issues: [],
        },
      ],
    });
    writeJson(receiptPath, validRunnerReceipt({
      artifact_refs: [
        ...validRunnerReceipt().artifact_refs,
        {
          role: 'output',
          kind: 'agent-task-dag',
          path: dagPath,
        },
        {
          role: 'output',
          kind: 'agent-task-dag-validation-report',
          path: validationPath,
        },
      ],
    }));

    const result = runCheck([
      '--receipt',
      receiptPath,
      '--require-closeout-identity',
      '--require-trace-artifacts',
      '--require-dag-proof',
      '--json',
    ]);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    writeJson(dagPath, {
      schema_version: 'wrong.schema',
      nodes: [],
    });
    const failed = runCheck([
      '--receipt',
      receiptPath,
      '--require-closeout-identity',
      '--require-trace-artifacts',
      '--json',
    ]);
    assert.equal(failed.status, 1);
    const report = JSON.parse(failed.stdout);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('dag-artifact-invalid'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check requires checked DAG proof when requested', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-required-dag-proof-'));
  const receiptPath = join(dir, 'runner.json');
  const dagPath = join(dir, 'agent-task-graph.json');
  const validationPath = join(dir, 'agent-task-graph.validation.json');

  try {
    writeJson(receiptPath, validRunnerReceipt());
    const missing = runCheck([
      '--receipt',
      receiptPath,
      '--require-closeout-identity',
      '--require-trace-artifacts',
      '--require-dag-proof',
      '--json',
    ]);
    assert.equal(missing.status, 1);
    const missingReport = JSON.parse(missing.stdout);
    const missingCodes = missingReport.receipts[0].issues.map((item) => item.code);
    assert.ok(missingCodes.includes('dag-proof-missing'));
    assert.ok(missingCodes.includes('dag-proof-validation-missing'));

    writeJson(dagPath, {
      schema_version: 'aipedia.agent-task-dag.v1',
      nodes: [],
    });
    writeJson(validationPath, {
      ok: true,
      schema_version: 'aipedia.agent-task-dag-check.v1',
      totals: {
        issues: 0,
      },
      receipts: [
        {
          ok: true,
          path: join(dir, 'other-agent-task-graph.json'),
          schema_version: 'aipedia.agent-task-dag.v1',
          node_count: 0,
          issues: [],
        },
      ],
    });
    writeJson(receiptPath, validRunnerReceipt({
      artifact_refs: [
        ...validRunnerReceipt().artifact_refs,
        {
          role: 'output',
          kind: 'agent-task-dag',
          path: dagPath,
        },
        {
          role: 'output',
          kind: 'agent-task-dag-validation-report',
          path: validationPath,
        },
      ],
    }));

    const mismatched = runCheck([
      '--receipt',
      receiptPath,
      '--require-closeout-identity',
      '--require-trace-artifacts',
      '--require-dag-proof',
      '--json',
    ]);
    assert.equal(mismatched.status, 1);
    const mismatchReport = JSON.parse(mismatched.stdout);
    const mismatchCodes = mismatchReport.receipts[0].issues.map((item) => item.code);
    assert.ok(mismatchCodes.includes('dag-proof-validation-mismatch'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates interrupted runner pause links', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-interrupted-runner-'));
  const path = join(dir, 'runner.json');
  const pausePath = 'local/tmp/aipedia-runner/pauses/interrupted-pause.json';
  const receipt = validRunnerReceipt({
    status: 'failed',
    interrupted_pause_receipt: pausePath,
    commands: [
      { label: 'ledger generate', status: 130, interrupted: true, elapsed_ms: 130, details_path: null },
    ],
    artifact_refs: [
      ...validRunnerReceipt().artifact_refs,
      { role: 'output', kind: 'interrupted-pause-receipt', path: pausePath },
    ],
  });

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-trace-artifacts', '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates runner interrupt proof reports', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-runner-proof-'));
  const path = join(dir, 'runner-proof.json');

  try {
    writeJson(path, validRunnerInterruptProof());
    const result = runCheck(['--receipt', path, '--require-closeout-identity', '--require-trace-artifacts', '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.receipts[0].type, 'runner-interrupt-proof');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails tampered runner interrupt proof reports', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-bad-runner-proof-'));
  const path = join(dir, 'runner-proof.json');
  const receipt = validRunnerInterruptProof();
  receipt.assertions.interrupted_pause_artifact_linked = false;
  receipt.runner.status = 0;
  receipt.validations[1].ok = false;
  receipt.validations[1].status = 1;
  receipt.artifact_refs = receipt.artifact_refs.filter((artifact) => artifact.kind !== 'runner-interrupt-proof-report');

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-trace-artifacts', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('runner-proof-assertion-failed'));
    assert.ok(codes.includes('runner-proof-closeout-success'));
    assert.ok(codes.includes('runner-proof-validation-failed'));
    assert.ok(codes.includes('runner-proof-artifact-ref-missing'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates workflow-specific runner policies', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-workflow-policy-'));
  const toolPath = join(dir, 'tool-runner.json');
  const pagePath = join(dir, 'page-runner.json');

  try {
    writeJson(toolPath, validRunnerReceipt());
    writeJson(pagePath, validPageRunnerReceipt());
    const result = runCheck([
      '--receipt',
      toolPath,
      '--receipt',
      pagePath,
      '--require-workflow-policy',
      '--require-trace-artifacts',
      '--json',
    ]);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.require_workflow_policy, true);
    assert.equal(report.totals.receipts, 2);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates affiliate handoff workflow policy receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-affiliate-handoff-'));
  const path = join(dir, 'affiliate-handoff.json');

  try {
    writeJson(path, validAffiliateHandoffReceipt());
    const result = runCheck(['--receipt', path, '--require-workflow-policy', '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.receipts[0].type, 'affiliate-handoff');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails affiliate handoff receipts that miss workflow policy evidence', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-bad-affiliate-handoff-'));
  const path = join(dir, 'affiliate-handoff.json');
  const receipt = validAffiliateHandoffReceipt({
    selected_cluster_count: 0,
    selected_clusters: [],
    claim_receipt_count: 0,
    verification_gates: ['npm run runner:affiliate-conversion:reports -- --strict'],
    no_edit_boundaries: [],
  });

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-workflow-policy', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('affiliate-handoff-policy-empty'));
    assert.ok(codes.includes('affiliate-handoff-policy-evidence-missing'));
    assert.ok(codes.includes('affiliate-handoff-policy-gate-missing'));
    assert.ok(codes.includes('affiliate-handoff-policy-boundary-missing'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails runner receipts that miss workflow policy artifacts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-policy-artifacts-'));
  const path = join(dir, 'runner.json');
  const receipt = validRunnerReceipt();
  receipt.artifact_refs = receipt.artifact_refs.filter((artifact) => artifact.kind !== 'route-args');
  receipt.commands = receipt.commands.filter((command) => command.label !== 'tool refresh grouped check');
  receipt.input_freshness.workflows[0].status = 'stale';

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-workflow-policy', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('runner-workflow-policy-artifact-missing'));
    assert.ok(codes.includes('runner-workflow-policy-command-missing'));
    assert.ok(codes.includes('runner-workflow-policy-input-freshness-stale'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails passed page-refresh receipts with stale input freshness', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-page-policy-stale-input-'));
  const path = join(dir, 'page-runner.json');
  const receipt = validPageRunnerReceipt();
  receipt.input_freshness = {
    ...receipt.input_freshness,
    ok: false,
    command: 'node scripts/agent-input-freshness-receipt.mjs --workflow page-refresh --json --project-dir=.',
    workflows: [
      {
        id: 'page-refresh',
        kind: 'page-refresh-ledger',
        ok: false,
        status: 'stale',
        next_action: 'Regenerate PAGE_REFRESH_LEDGER.md before planning page refresh work.',
      },
    ],
    summary: {
      workflow_count: 1,
      ok_count: 0,
      attention_count: 1,
      stale_count: 1,
    },
    next_actions: ['Regenerate PAGE_REFRESH_LEDGER.md before planning page refresh work.'],
  };

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-workflow-policy', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.deepEqual(codes, ['runner-workflow-policy-input-freshness-stale']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails runner receipts with mismatched input freshness workflow', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-bad-input-freshness-'));
  const path = join(dir, 'runner.json');
  const receipt = validRunnerReceipt();
  receipt.input_freshness.workflows[0].id = 'page-refresh';

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('input-freshness-workflow-missing'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails malformed runner command receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-bad-runner-'));
  const path = join(dir, 'runner.json');

  try {
    writeJson(path, validRunnerReceipt({ commands: [{ label: '', status: 'ok', interrupted: 'yes', elapsed_ms: -1 }] }));
    const result = runCheck(['--receipt', path, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    const details = report.receipts[0].issues.map((item) => item.detail).join('\n');
    assert.match(details, /commands\[0\]\.label/);
    assert.match(details, /commands\[0\]\.status/);
    assert.match(details, /commands\[0\]\.interrupted/);
    assert.match(details, /commands\[0\]\.elapsed_ms/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails interrupted runner receipts without pause links', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-bad-interrupted-runner-'));
  const missingFieldPath = join(dir, 'missing-field.json');
  const missingArtifactPath = join(dir, 'missing-artifact.json');
  const pausePath = 'local/tmp/aipedia-runner/pauses/interrupted-pause.json';
  const interruptedCommand = { label: 'ledger generate', status: 130, interrupted: true, elapsed_ms: 130, details_path: null };

  try {
    writeJson(missingFieldPath, validRunnerReceipt({
      status: 'failed',
      commands: [interruptedCommand],
    }));
    writeJson(missingArtifactPath, validRunnerReceipt({
      status: 'failed',
      interrupted_pause_receipt: pausePath,
      commands: [interruptedCommand],
    }));
    const result = runCheck(['--receipt', missingFieldPath, '--receipt', missingArtifactPath, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const codes = report.receipts.flatMap((receipt) => receipt.issues.map((item) => item.code));
    assert.ok(codes.includes('runner-interrupted-pause-receipt-missing'));
    assert.ok(codes.includes('runner-interrupted-pause-artifact-missing'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
