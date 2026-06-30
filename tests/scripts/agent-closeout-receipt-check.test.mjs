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

test('closeout receipt check validates latest enforced loop receipt by default', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-loop-'));
  const systemDir = join(dir, '.agent', 'loop-runs', 'system');

  try {
    mkdirSync(systemDir, { recursive: true });
    writeJson(join(systemDir, 'latest.json'), validLoopReceipt());
    const result = runCheck(['--project-dir', dir, '--require-system-progress', '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.totals.receipts, 1);
    assert.equal(report.receipts[0].type, 'loop-run');
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
    writeJson(path, validRunnerReceipt({ commands: [{ label: '', status: 'ok', elapsed_ms: -1 }] }));
    const result = runCheck(['--receipt', path, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    const details = report.receipts[0].issues.map((item) => item.detail).join('\n');
    assert.match(details, /commands\[0\]\.label/);
    assert.match(details, /commands\[0\]\.status/);
    assert.match(details, /commands\[0\]\.elapsed_ms/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
