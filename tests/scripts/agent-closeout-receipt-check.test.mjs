import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { buildCorrectionTelemetry } from '../../scripts/lib/correction-telemetry.mjs';
import { buildRoutingEvaluation } from '../../scripts/lib/routing-evaluation.mjs';
import { buildRoutingEvaluationSuite } from '../../scripts/lib/routing-evaluation-suite.mjs';

function runCheck(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-closeout-receipt-check.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function writeTrendSourceReceipts(projectDir, receipt, durations = [400, 500]) {
  receipt.runs.forEach((run, index) => {
    const sourcePath = join(projectDir, run.path);
    mkdirSync(dirname(sourcePath), { recursive: true });
    const source = validLoopReceipt();
    source.ok = run.ok;
    source.generated_at = run.generated_at;
    source.run_id = run.run_id;
    source.duration_ms = run.wall_duration_ms;
    source.totals = {
      loops: 7,
      ok: 6,
      attention: 1,
      skipped: 0,
      commands: 16,
    };
    source.loops = trendSourceLoops();
    Object.assign(source.efficiency_metrics, {
      wall_duration_ms: run.wall_duration_ms,
      total_command_duration_ms: run.total_command_duration_ms,
      command_count: run.command_count,
      loop_count: run.loop_count,
      attention_rate: run.attention_rate,
      persisted_full_receipt_bytes: run.persisted_full_receipt_bytes,
      persisted_latest_receipt_bytes: run.persisted_latest_receipt_bytes,
      system_artifact_count: run.system_artifact_count,
    });
    if (run.has_exact_model_tokens) {
      Object.assign(source.efficiency_metrics, {
        model_token_usage_status: 'provided',
        model_token_usage_source: 'local/token-usage.json',
        exact_model_request_count: run.exact_model_request_count,
        exact_model_input_tokens: run.exact_model_input_tokens,
        exact_model_output_tokens: run.exact_model_output_tokens,
        exact_model_cached_input_tokens: run.exact_model_cached_input_tokens,
        exact_model_reasoning_tokens: run.exact_model_reasoning_tokens,
        exact_model_total_tokens: run.exact_model_total_tokens,
      });
      for (const field of [
        'exact_model_workflow_context_count',
        'exact_model_run_context_count',
        'exact_model_orchestrator_context_count',
        'exact_model_subagent_context_count',
        'exact_model_workflow_breakdown',
        'exact_model_run_breakdown',
        'exact_model_orchestrator_breakdown',
        'exact_model_subagent_breakdown',
      ]) {
        if (run[field] != null) source.efficiency_metrics[field] = run[field];
      }
    }
    source.efficiency_metrics.slowest_commands = [
      {
        loop_id: 'freshness',
        label: 'freshness queue',
        status: 'attention',
        duration_ms: durations[index] || 0,
      },
    ];
    writeJson(sourcePath, source);
  });
}

function trendCommand(label, status = 'ok') {
  return {
    label,
    status,
    command: `node fixture-${label.replaceAll(' ', '-')}.mjs`,
    duration_ms: 10,
    exit_code: 0,
    signal: '',
    attention_reasons: status === 'attention' ? ['fixture attention'] : [],
  };
}

function trendLoop(id, status, commandSpecs) {
  return {
    id,
    title: id,
    status,
    purpose: 'Fixture trend source loop.',
    duration_ms: commandSpecs.length * 10,
    commands: commandSpecs.map(([label, commandStatus]) => trendCommand(label, commandStatus)),
    attention_reasons: status === 'attention' ? ['fixture attention'] : [],
    skip_reason: '',
    review_questions: [],
    record_targets: [],
  };
}

function trendSourceLoops() {
  return [
    trendLoop('decision-content', 'ok', [
      ['next decision cluster', 'ok'],
      ['top coverage candidates', 'ok'],
    ]),
    trendLoop('freshness', 'attention', [
      ['freshness queue', 'attention'],
      ['weekly editorial queue', 'ok'],
    ]),
    trendLoop('trust-provenance', 'ok', [
      ['provenance and pricing', 'ok'],
      ['source registry health', 'ok'],
      ['stale facts guard', 'ok'],
    ]),
    trendLoop('revenue-conversion', 'ok', [
      ['commercial CTA audit', 'ok'],
    ]),
    trendLoop('quality-pruning', 'ok', [
      ['site KPI audit', 'ok'],
      ['comparison quality audit', 'ok'],
      ['internal link audit', 'ok'],
    ]),
    trendLoop('performance-ux', 'ok', [
      ['dist budget', 'ok'],
      ['indexability audit', 'ok'],
    ]),
    trendLoop('news-market', 'ok', [
      ['news rendering guard', 'ok'],
      ['news cross-reference audit', 'ok'],
      ['weekly editorial queue', 'ok'],
    ]),
  ];
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
      agent_system_artifact_count: 1,
      agent_content_artifact_count: 0,
      agent_other_artifact_count: 0,
      preexisting_dirty_count: 0,
      system_artifacts_per_second: 8.13,
      agent_system_artifacts_per_second: 8.13,
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
      observed_dirty_before_agent: [],
      has_observed_dirty_baseline: false,
      missing_observed_dirty_paths: [],
      agent_changed_paths: ['scripts/example.mjs'],
      agent_system_artifacts: ['scripts/example.mjs'],
      agent_content_artifacts: [],
      agent_other_artifacts: [],
      has_agent_system_artifact: true,
      agent_content_only: false,
      preexisting_dirty_paths: [],
      preexisting_system_artifacts: [],
      preexisting_content_artifacts: [],
      preexisting_other_artifacts: [],
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
  pageReceipt.input_freshness = {
    ...pageReceipt.input_freshness,
    command: 'node scripts/agent-input-freshness-receipt.mjs --workflow page-refresh --json --project-dir=.',
    workflows: [
      {
        id: 'page-refresh',
        kind: 'page-refresh-ledger',
        ok: true,
        status: 'current',
        next_action: '',
      },
    ],
  };
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

function validMetaProofReadinessReceipt(overrides = {}) {
  return {
    ok: false,
    mode: 'meta-proof-readiness',
    schema_version: 'aipedia.meta-proof-readiness.v1',
    generated_at: '2026-06-30T03:01:47Z',
    project_dir: '.',
    argument_issues: [],
    selected_targets: ['page-refresh-policy', 'affiliate-handoff-policy'],
    summary: {
      target_count: 2,
      ready_count: 0,
      proved_count: 1,
      blocked_count: 1,
      unknown_count: 0,
    },
    inputs: {
      input_freshness_source: 'node scripts/agent-input-freshness-receipt.mjs --workflow page-refresh --workflow affiliate-conversion --json',
      input_freshness_exit_code: 0,
      git_status_source: 'git status --short',
      git_status_exit_code: 0,
      observed_dirty_before_agent: ['src/content/tools/synthesia.md'],
      allow_observed_dirty_boundary: true,
    },
    targets: [
      {
        ok: false,
        id: 'page-refresh-policy',
        status: 'blocked',
        workflow: 'page-refresh',
        proof_goal: 'Positive bounded page-refresh runner policy proof.',
        blockers: [
          {
            code: 'input-freshness-stale',
            message: 'Run npm run ledger:pages, then rerun proof readiness.',
          },
        ],
        proof_completion: {
          status: 'untracked',
          proved: false,
          receipt_count: 0,
          receipts: [],
        },
        readiness_checks: [
          { id: 'proof-completion', ok: false, status: 'untracked', receipt_paths: [] },
          { id: 'page-refresh-input-freshness', ok: false, status: 'stale' },
          {
            id: 'dirty-content-boundary',
            ok: true,
            dirty_paths: ['src/content/tools/synthesia.md'],
            observed_dirty_paths: ['src/content/tools/synthesia.md'],
            unobserved_dirty_paths: [],
            observed_dirty_allowed: true,
          },
        ],
        recommended_commands: ['npm --silent run agent:proof:readiness -- --target page-refresh-policy --json'],
        next_actions: ['Clear the listed blockers, then rerun proof readiness.'],
      },
      {
        ok: true,
        id: 'affiliate-handoff-policy',
        status: 'proved',
        workflow: 'affiliate-conversion',
        proof_goal: 'Positive bounded affiliate handoff policy proof.',
        blockers: [],
        proof_completion: {
          status: 'proved',
          proved: true,
          receipt_count: 1,
          valid_count: 1,
          receipts: [
            {
              path: '.agent/evals/closeout-policy-receipts/affiliate.json',
              exists: true,
              ok: true,
              status: 'valid',
              type: 'affiliate-handoff',
              issue_count: 0,
              issues: [],
              exit_code: 0,
              stderr_tail: '',
              validation_command: 'node scripts/agent-closeout-receipt-check.mjs --receipt .agent/evals/closeout-policy-receipts/affiliate.json --require-workflow-policy --json',
            },
          ],
        },
        readiness_checks: [
          {
            id: 'proof-completion',
            ok: true,
            status: 'proved',
            receipt_paths: ['.agent/evals/closeout-policy-receipts/affiliate.json'],
          },
        ],
        recommended_commands: ['node scripts/agent-closeout-receipt-check.mjs --receipt .agent/evals/closeout-policy-receipts/affiliate.json --require-workflow-policy --json'],
        next_actions: ['Use the durable affiliate handoff proof as the positive policy baseline.'],
      },
    ],
    next_actions: [
      'Clear the listed blockers, then rerun proof readiness.',
      'Use the durable affiliate handoff proof as the positive policy baseline.',
    ],
    receipt_path: '.agent/evals/proof-readiness/fixture.json',
    ...overrides,
  };
}

function validProofReadinessRefreshPlan() {
  return {
    id: 'page-refresh',
    status: 'planned',
    before_status: 'stale',
    mutation_policy: 'tracked-generated',
    requires_tracked_mutation_ack: true,
    requires_explicit_workflow: true,
    writes: ['PAGE_REFRESH_LEDGER.md'],
    commands: [
      {
        label: 'page refresh ledger',
        command: 'node scripts/generate-page-refresh-ledger.mjs --json --project-dir .',
      },
    ],
    required_flags: ['Tracked generated-file mutations require --allow-tracked-mutations.'],
    blocked_reasons: [],
    next_action: 'Run npm run agent:input-freshness -- --workflow page-refresh --refresh-stale --apply-refreshes --allow-tracked-mutations --require-fresh --json.',
  };
}

function validCorrectionTelemetryReceipt() {
  const result = buildCorrectionTelemetry({
    goal_id: 'june-30-agentic-tooling-meta-os',
    run_id: 'slice-73-correction-telemetry',
    workflow: 'loop-system',
    telemetry_source: {
      type: 'reviewer',
      id: 'slice-73-fixture-review',
      confidence: 'exact',
    },
    candidates: [
      {
        id: 'single-agent',
        workflow: 'loop-system',
        run_id: 'single-run',
        orchestrator: 'single-agent',
        events: [
          { id: 'single-finding-1', type: 'finding', severity: 'medium' },
          { id: 'single-fix-1', type: 'correction_applied', finding_id: 'single-finding-1' },
        ],
      },
    ],
  }, {
    generatedAt: '2026-07-01T03:20:00.000Z',
    projectDir: '.',
    source: '.agent/evals/corrections/fixture-input.json',
  });
  assert.deepEqual(result.issues, []);
  return result.receipt;
}

function routingSubagent(id, { requestCount = 1, input, output, cached, reasoning }) {
  return {
    id,
    request_count: requestCount,
    input_tokens: input,
    output_tokens: output,
    cached_input_tokens: cached,
    reasoning_tokens: reasoning,
    total_tokens: input + output,
  };
}

function routingTokens({ requestCount, input, output, cached, reasoning, subagents }) {
  return {
    request_count: requestCount,
    input_tokens: input,
    output_tokens: output,
    cached_input_tokens: cached,
    reasoning_tokens: reasoning,
    total_tokens: input + output,
    subagent_breakdown: subagents,
  };
}

function validRoutingEvaluationReceipt() {
  const input = {
    goal_id: 'june-30-agentic-tooling-meta-os',
    run_id: 'slice-72-routing-eval',
    workflow: 'loop-system',
    evaluation_task: 'Compare routing variants.',
    candidates: [
      {
        id: 'single-agent',
        label: 'Single agent',
        strategy: 'single-agent',
        model: 'gpt-5.5',
        workflow: 'loop-system',
        run_id: 'single-run',
        orchestrator: 'single-agent',
        exact_model_tokens: routingTokens({
          requestCount: 1,
          input: 4800,
          output: 1200,
          cached: 600,
          reasoning: 300,
          subagents: [
            routingSubagent('single-agent', {
              input: 4800,
              output: 1200,
              cached: 600,
              reasoning: 300,
            }),
          ],
        }),
        wall_duration_ms: 7000,
        quality_score: 0.9,
        accuracy_score: 0.88,
        correction_outcomes: {
          findings_count: 2,
          corrections_applied: 2,
          residual_issue_count: 0,
          regression_count: 0,
        },
        task_outcome: {
          task_count: 1,
          completed_count: 1,
        },
      },
      {
        id: 'orchestrated-specialists',
        label: 'Orchestrated specialists',
        strategy: 'orchestrator-plus-specialists',
        model: 'gpt-5.5',
        workflow: 'loop-system',
        run_id: 'orchestrated-run',
        orchestrator: 'meta-orchestrator',
        exact_model_tokens: routingTokens({
          requestCount: 2,
          input: 4200,
          output: 1000,
          cached: 500,
          reasoning: 250,
          subagents: [
            routingSubagent('evidence-agent', {
              input: 3400,
              output: 800,
              cached: 400,
              reasoning: 180,
            }),
            routingSubagent('validation-agent', {
              input: 800,
              output: 200,
              cached: 100,
              reasoning: 70,
            }),
          ],
        }),
        wall_duration_ms: 6400,
        quality_score: 0.94,
        accuracy_score: 0.93,
        correction_outcomes: {
          findings_count: 2,
          corrections_applied: 2,
          residual_issue_count: 0,
          regression_count: 0,
        },
        task_outcome: {
          task_count: 1,
          completed_count: 1,
        },
      },
    ],
  };
  const result = buildRoutingEvaluation(input, {
    generatedAt: '2026-07-01T03:00:00.000Z',
    projectDir: '.',
    source: '.agent/evals/routing/fixture-input.json',
  });
  assert.deepEqual(result.issues, []);
  return result.receipt;
}

function validRoutingEvaluationSuiteReceipt() {
  const routing = validRoutingEvaluationReceipt();
  const result = buildRoutingEvaluationSuite({
    goal_id: 'june-30-agentic-tooling-meta-os',
    run_id: 'slice-74-routing-suite',
    workflow: 'loop-system',
    suite_task: 'Compare routing variants across task classes.',
    scenarios: [
      {
        id: 'evidence-heavy-refresh',
        task_class: 'evidence-heavy-page-refresh',
        routing_evaluation: routing,
      },
      {
        id: 'validation-heavy-closeout',
        task_class: 'validation-heavy-closeout',
        routing_evaluation: {
          ...routing,
          run_id: 'slice-74-routing-suite-validation',
          evaluation_task: 'Compare routing variants for validation-heavy closeout.',
        },
      },
    ],
  }, {
    generatedAt: '2026-07-01T03:30:00.000Z',
    projectDir: '.',
    source: '.agent/evals/routing-suites/fixture-input.json',
  });
  assert.deepEqual(result.issues, []);
  return result.receipt;
}

function validLoopEfficiencyTrendReceipt(overrides = {}) {
  return {
    ok: true,
    mode: 'loop-efficiency-trends',
    schema_version: 'aipedia.loop-efficiency-trends.v1',
    generated_at: '2026-06-30T21:15:00.000Z',
    project_dir: '.',
    ledger_dir: '.agent/loop-runs/system',
    receipt_path: '.agent/evals/efficiency-trends/fixture.json',
    max_runs: 2,
    fail_on_missing_metrics: true,
    totals: {
      analyzed_runs: 2,
      metrics_runs: 2,
      missing_metrics_runs: 0,
    },
    issues: [],
    runs: [
      {
        path: '.agent/loop-runs/system/2026-06-30T20-00-00-000Z-loop-run.json',
        generated_at: '2026-06-30T20:00:00.000Z',
        run_id: 'previous-run',
        ok: true,
        has_efficiency_metrics: true,
        wall_duration_ms: 5000,
        total_command_duration_ms: 4900,
        command_count: 16,
        loop_count: 7,
        attention_rate: 0.429,
        persisted_full_receipt_bytes: 43000,
        persisted_latest_receipt_bytes: 24000,
        estimated_full_receipt_tokens: 10750,
        system_artifact_count: 7,
      },
      {
        path: '.agent/loop-runs/system/2026-06-30T21-00-00-000Z-loop-run.json',
        generated_at: '2026-06-30T21:00:00.000Z',
        run_id: 'latest-run',
        ok: true,
        has_efficiency_metrics: true,
        wall_duration_ms: 4800,
        total_command_duration_ms: 4700,
        command_count: 16,
        loop_count: 7,
        attention_rate: 0.429,
        persisted_full_receipt_bytes: 42000,
        persisted_latest_receipt_bytes: 23000,
        estimated_full_receipt_tokens: 10500,
        system_artifact_count: 8,
      },
    ],
    summary: {
      first_run: '2026-06-30T20:00:00.000Z',
      latest_run: '2026-06-30T21:00:00.000Z',
      metrics_coverage_rate: 1,
      median_wall_duration_ms: 4900,
      median_total_command_duration_ms: 4800,
      median_attention_rate: 0.429,
      median_full_receipt_bytes: 42500,
      median_latest_receipt_bytes: 23500,
      median_estimated_full_receipt_tokens: 10625,
      latest: {
        path: '.agent/loop-runs/system/2026-06-30T21-00-00-000Z-loop-run.json',
        generated_at: '2026-06-30T21:00:00.000Z',
        run_id: 'latest-run',
        ok: true,
        has_efficiency_metrics: true,
        wall_duration_ms: 4800,
        total_command_duration_ms: 4700,
        command_count: 16,
        loop_count: 7,
        attention_rate: 0.429,
        persisted_full_receipt_bytes: 42000,
        persisted_latest_receipt_bytes: 23000,
        estimated_full_receipt_tokens: 10500,
        system_artifact_count: 8,
      },
      delta_from_previous: {
        wall_duration_ms: -200,
        total_command_duration_ms: -200,
        attention_rate: 0,
        persisted_full_receipt_bytes: -1000,
        persisted_latest_receipt_bytes: -1000,
        estimated_full_receipt_tokens: -250,
        system_artifact_count: 1,
      },
    },
    stability_summary: {
      loop_status_comparisons: 7,
      loop_status_changes: 0,
      loop_status_change_rate: 0,
      command_status_comparisons: 16,
      command_status_changes: 0,
      command_status_change_rate: 0,
      persistent_attention_loops: ['freshness'],
      latest_attention_loops: ['freshness'],
      new_attention_loops: [],
      resolved_attention_loops: [],
      recent_loop_status_changes: [],
    },
    correction_summary: {
      has_comparison: true,
      previous_run: '2026-06-30T20:00:00.000Z',
      latest_run: '2026-06-30T21:00:00.000Z',
      loop_previous_attention_count: 1,
      loop_resolved_attention_count: 0,
      loop_persistent_attention_count: 1,
      loop_regressed_attention_count: 0,
      loop_correction_rate: 0,
      command_previous_attention_count: 1,
      command_resolved_attention_count: 0,
      command_persistent_attention_count: 1,
      command_regressed_attention_count: 0,
      command_correction_rate: 0,
      resolved_loops: [],
      persistent_attention_loops: ['freshness'],
      regressed_loops: [],
      resolved_commands: [],
      persistent_attention_commands: [
        {
          loop_id: 'freshness',
          label: 'freshness queue',
        },
      ],
      regressed_commands: [],
    },
    slowest_commands: [
      {
        loop_id: 'freshness',
        label: 'freshness queue',
        occurrences: 2,
        max_duration_ms: 500,
        median_duration_ms: 450,
        latest_status: 'attention',
      },
    ],
    next_actions: ['Use this trend receipt in the next system closeout.'],
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

test('closeout receipt check validates loop efficiency trend receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-efficiency-trends-'));
  const path = join(dir, 'efficiency-trends.json');

  try {
    const receipt = validLoopEfficiencyTrendReceipt();
    writeTrendSourceReceipts(dir, receipt);
    writeJson(path, receipt);
    const result = runCheck(['--project-dir', dir, '--receipt', path, '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.receipts[0].type, 'loop-efficiency-trends');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates agent routing evaluation receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-routing-eval-'));
  const path = join(dir, 'routing-evaluation.json');

  try {
    writeJson(path, validRoutingEvaluationReceipt());
    const result = runCheck(['--project-dir', dir, '--receipt', path, '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.receipts[0].type, 'agent-routing-evaluation');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates agent routing evaluation suite receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-routing-suite-'));
  const path = join(dir, 'routing-suite.json');

  try {
    writeJson(path, validRoutingEvaluationSuiteReceipt());
    const result = runCheck(['--project-dir', dir, '--receipt', path, '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.receipts[0].type, 'agent-routing-evaluation-suite');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check accepts historical v1 routing suite receipts without lineage refs', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-routing-suite-v1-'));
  const path = join(dir, 'routing-suite-v1.json');

  try {
    const receipt = validRoutingEvaluationSuiteReceipt();
    receipt.schema_version = 'aipedia.agent-routing-evaluation-suite.v1';
    delete receipt.correction_telemetry_refs;
    for (const scenario of receipt.scenarios) {
      delete scenario.correction_telemetry_refs;
    }
    writeJson(path, receipt);
    const result = runCheck(['--project-dir', dir, '--receipt', path, '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.receipts[0].type, 'agent-routing-evaluation-suite');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check rejects v2 routing suite receipts without lineage refs', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-routing-suite-missing-lineage-'));
  const path = join(dir, 'routing-suite-missing-lineage.json');

  try {
    const receipt = validRoutingEvaluationSuiteReceipt();
    delete receipt.correction_telemetry_refs;
    writeJson(path, receipt);
    const result = runCheck(['--project-dir', dir, '--receipt', path, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.ok(report.receipts[0].issues.some((issue) => issue.code === 'routing-suite-telemetry-lineage-invalid'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates correction telemetry receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-correction-telemetry-'));
  const path = join(dir, 'correction-telemetry.json');

  try {
    writeJson(path, validCorrectionTelemetryReceipt());
    const result = runCheck(['--project-dir', dir, '--receipt', path, '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.receipts[0].type, 'agent-correction-telemetry');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails tampered correction telemetry totals', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-bad-correction-telemetry-'));
  const path = join(dir, 'correction-telemetry.json');

  try {
    const receipt = validCorrectionTelemetryReceipt();
    receipt.totals.corrections_applied = 99;
    writeJson(path, receipt);
    const result = runCheck(['--project-dir', dir, '--receipt', path, '--json']);
    assert.notEqual(result.status, 0);
    const report = JSON.parse(result.stdout);
    const codes = report.receipts[0].issues.map((issue) => issue.code);
    assert.ok(codes.includes('correction-telemetry-total-mismatch'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails tampered agent routing evaluation suite aggregates', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-bad-routing-suite-'));
  const path = join(dir, 'routing-suite.json');

  try {
    const receipt = validRoutingEvaluationSuiteReceipt();
    receipt.aggregate.dominant_recommended_candidate_count = 99;
    writeJson(path, receipt);
    const result = runCheck(['--project-dir', dir, '--receipt', path, '--json']);
    assert.notEqual(result.status, 0);
    const report = JSON.parse(result.stdout);
    const codes = report.receipts[0].issues.map((issue) => issue.code);
    assert.ok(codes.includes('routing-suite-aggregate-mismatch'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails tampered agent routing evaluation scores', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-bad-routing-eval-'));
  const path = join(dir, 'routing-evaluation.json');

  try {
    const receipt = validRoutingEvaluationReceipt();
    receipt.candidates[1].overall_score = 0.001;
    writeJson(path, receipt);
    const result = runCheck(['--project-dir', dir, '--receipt', path, '--json']);
    assert.notEqual(result.status, 0);
    const report = JSON.parse(result.stdout);
    const codes = report.receipts[0].issues.map((issue) => issue.code);
    assert.ok(codes.includes('routing-evaluation-score-mismatch'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates exact model token usage on loop and trend receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-model-tokens-'));
  const loopPath = join(dir, 'loop.json');
  const trendPath = join(dir, 'trend.json');

  try {
    const loopReceipt = validLoopReceipt();
    loopReceipt.model_token_usage = {
      schema_version: 'aipedia.model-token-usage.v1',
      source: 'local/token-usage.json',
      status: 'provided',
      models: ['gpt-5.5'],
      model: 'gpt-5.5',
      entry_count: 1,
      token_bearing_entry_count: 1,
      request_count: 2,
      input_tokens: 1000,
      output_tokens: 250,
      cached_input_tokens: 200,
      reasoning_tokens: 75,
      total_tokens: 1250,
      workflow_context_count: 1,
      run_context_count: 1,
      orchestrator_context_count: 1,
      subagent_context_count: 2,
      workflow_breakdown: [
        { id: 'loop-system', request_count: 2, input_tokens: 1000, output_tokens: 250, cached_input_tokens: 200, reasoning_tokens: 75, total_tokens: 1250 },
      ],
      run_breakdown: [
        { id: 'token-run-1', request_count: 2, input_tokens: 1000, output_tokens: 250, cached_input_tokens: 200, reasoning_tokens: 75, total_tokens: 1250 },
      ],
      orchestrator_breakdown: [
        { id: 'meta-orchestrator', request_count: 2, input_tokens: 1000, output_tokens: 250, cached_input_tokens: 200, reasoning_tokens: 75, total_tokens: 1250 },
      ],
      subagent_breakdown: [
        { id: 'evidence-agent', request_count: 1, input_tokens: 700, output_tokens: 175, cached_input_tokens: 150, reasoning_tokens: 50, total_tokens: 875 },
        { id: 'validation-agent', request_count: 1, input_tokens: 300, output_tokens: 75, cached_input_tokens: 50, reasoning_tokens: 25, total_tokens: 375 },
      ],
    };
    Object.assign(loopReceipt.efficiency_metrics, {
      model_token_usage_status: 'provided',
      model_token_usage_source: 'local/token-usage.json',
      exact_model_request_count: 2,
      exact_model_input_tokens: 1000,
      exact_model_output_tokens: 250,
      exact_model_cached_input_tokens: 200,
      exact_model_reasoning_tokens: 75,
      exact_model_total_tokens: 1250,
      exact_model_workflow_context_count: 1,
      exact_model_run_context_count: 1,
      exact_model_orchestrator_context_count: 1,
      exact_model_subagent_context_count: 2,
      exact_model_workflow_breakdown: loopReceipt.model_token_usage.workflow_breakdown,
      exact_model_run_breakdown: loopReceipt.model_token_usage.run_breakdown,
      exact_model_orchestrator_breakdown: loopReceipt.model_token_usage.orchestrator_breakdown,
      exact_model_subagent_breakdown: loopReceipt.model_token_usage.subagent_breakdown,
    });
    writeJson(loopPath, loopReceipt);
    const loopResult = runCheck(['--receipt', loopPath, '--json']);
    assert.equal(loopResult.status, 0, `${loopResult.stdout}\n${loopResult.stderr}`);

    loopReceipt.model_token_usage.subagent_breakdown[0].total_tokens = 1;
    writeJson(loopPath, loopReceipt);
    const contextDrift = runCheck(['--receipt', loopPath, '--json']);
    assert.equal(contextDrift.status, 1);
    let report = JSON.parse(contextDrift.stdout);
    let codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('model-token-usage-breakdown-mismatch'));
    loopReceipt.model_token_usage.subagent_breakdown[0].total_tokens = 875;

    loopReceipt.efficiency_metrics.exact_model_total_tokens = 1200;
    writeJson(loopPath, loopReceipt);
    const drift = runCheck(['--receipt', loopPath, '--json']);
    assert.equal(drift.status, 1);
    report = JSON.parse(drift.stdout);
    codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('efficiency-model-token-mismatch'));

    const trendReceipt = validLoopEfficiencyTrendReceipt();
    Object.assign(trendReceipt.runs[1], {
      has_exact_model_tokens: true,
      exact_model_request_count: 1,
      exact_model_input_tokens: 900,
      exact_model_output_tokens: 300,
      exact_model_cached_input_tokens: 120,
      exact_model_reasoning_tokens: 80,
      exact_model_total_tokens: 1200,
      exact_model_workflow_context_count: 1,
      exact_model_run_context_count: 1,
      exact_model_orchestrator_context_count: 1,
      exact_model_subagent_context_count: 1,
      exact_model_workflow_breakdown: [
        { id: 'loop-system', request_count: 1, input_tokens: 900, output_tokens: 300, cached_input_tokens: 120, reasoning_tokens: 80, total_tokens: 1200 },
      ],
      exact_model_run_breakdown: [
        { id: 'token-run-2', request_count: 1, input_tokens: 900, output_tokens: 300, cached_input_tokens: 120, reasoning_tokens: 80, total_tokens: 1200 },
      ],
      exact_model_orchestrator_breakdown: [
        { id: 'meta-orchestrator', request_count: 1, input_tokens: 900, output_tokens: 300, cached_input_tokens: 120, reasoning_tokens: 80, total_tokens: 1200 },
      ],
      exact_model_subagent_breakdown: [
        { id: 'validation-agent', request_count: 1, input_tokens: 900, output_tokens: 300, cached_input_tokens: 120, reasoning_tokens: 80, total_tokens: 1200 },
      ],
    });
    Object.assign(trendReceipt.summary, {
      exact_model_token_coverage_rate: 0.5,
      median_exact_model_total_tokens: 1200,
      latest_exact_model_total_tokens: 1200,
      delta_exact_model_total_tokens_from_previous: 0,
    });
    Object.assign(trendReceipt.summary.latest, {
      has_exact_model_tokens: true,
      exact_model_request_count: 1,
      exact_model_input_tokens: 900,
      exact_model_output_tokens: 300,
      exact_model_cached_input_tokens: 120,
      exact_model_reasoning_tokens: 80,
      exact_model_total_tokens: 1200,
      exact_model_workflow_context_count: 1,
      exact_model_run_context_count: 1,
      exact_model_orchestrator_context_count: 1,
      exact_model_subagent_context_count: 1,
      exact_model_workflow_breakdown: trendReceipt.runs[1].exact_model_workflow_breakdown,
      exact_model_run_breakdown: trendReceipt.runs[1].exact_model_run_breakdown,
      exact_model_orchestrator_breakdown: trendReceipt.runs[1].exact_model_orchestrator_breakdown,
      exact_model_subagent_breakdown: trendReceipt.runs[1].exact_model_subagent_breakdown,
    });
    writeTrendSourceReceipts(dir, trendReceipt);
    writeJson(trendPath, trendReceipt);
    const trendResult = runCheck(['--project-dir', dir, '--receipt', trendPath, '--json']);
    assert.equal(trendResult.status, 0, `${trendResult.stdout}\n${trendResult.stderr}`);

    trendReceipt.runs[1].exact_model_total_tokens = 1;
    writeJson(trendPath, trendReceipt);
    const trendDrift = runCheck(['--project-dir', dir, '--receipt', trendPath, '--json']);
    assert.equal(trendDrift.status, 1);
    report = JSON.parse(trendDrift.stdout);
    codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('loop-efficiency-trends-run-mismatch'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails loop efficiency trend slowest command drift', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-efficiency-trends-slowest-drift-'));
  const path = join(dir, 'efficiency-trends.json');
  const receipt = validLoopEfficiencyTrendReceipt();
  receipt.slowest_commands[0].max_duration_ms = 1;
  receipt.slowest_commands[0].median_duration_ms = 1;

  try {
    writeTrendSourceReceipts(dir, receipt);
    writeJson(path, receipt);
    const result = runCheck(['--project-dir', dir, '--receipt', path, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const details = report.receipts[0].issues.map((item) => item.detail).join('\n');
    assert.match(details, /slowest_commands\[0\]\.max_duration_ms/);
    assert.match(details, /slowest_commands\[0\]\.median_duration_ms/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails loop efficiency trend summary drift', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-efficiency-trends-summary-drift-'));
  const path = join(dir, 'efficiency-trends.json');
  const receipt = validLoopEfficiencyTrendReceipt();
  receipt.summary.median_wall_duration_ms = 1;
  receipt.summary.latest.wall_duration_ms = 1;
  receipt.summary.delta_from_previous.wall_duration_ms = 999;

  try {
    writeTrendSourceReceipts(dir, receipt);
    writeJson(path, receipt);
    const result = runCheck(['--project-dir', dir, '--receipt', path, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const details = report.receipts[0].issues.map((item) => item.detail).join('\n');
    assert.match(details, /summary\.median_wall_duration_ms/);
    assert.match(details, /summary\.latest\.wall_duration_ms/);
    assert.match(details, /summary\.delta_from_previous\.wall_duration_ms/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails loop efficiency trend run row drift', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-efficiency-trends-run-drift-'));
  const path = join(dir, 'efficiency-trends.json');
  const receipt = validLoopEfficiencyTrendReceipt();

  try {
    writeTrendSourceReceipts(dir, receipt);
    receipt.runs[0].wall_duration_ms = 1;
    receipt.runs[1].estimated_full_receipt_tokens = 1;
    writeJson(path, receipt);
    const result = runCheck(['--project-dir', dir, '--receipt', path, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const details = report.receipts[0].issues.map((item) => item.detail).join('\n');
    assert.match(details, /runs\[0\]\.wall_duration_ms/);
    assert.match(details, /runs\[1\]\.estimated_full_receipt_tokens/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails loop efficiency trend stability and correction drift', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-efficiency-trends-quality-drift-'));
  const path = join(dir, 'efficiency-trends.json');
  const receipt = validLoopEfficiencyTrendReceipt();
  receipt.stability_summary.loop_status_changes = 99;
  receipt.stability_summary.latest_attention_loops = [];
  receipt.correction_summary.loop_persistent_attention_count = 0;
  receipt.correction_summary.persistent_attention_commands = [];

  try {
    writeTrendSourceReceipts(dir, receipt);
    writeJson(path, receipt);
    const result = runCheck(['--project-dir', dir, '--receipt', path, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const details = report.receipts[0].issues.map((item) => item.detail).join('\n');
    assert.match(details, /stability_summary\.loop_status_changes/);
    assert.match(details, /stability_summary\.latest_attention_loops/);
    assert.match(details, /correction_summary\.loop_persistent_attention_count/);
    assert.match(details, /correction_summary\.persistent_attention_commands/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails loop efficiency trend missing source receipt', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-efficiency-trends-missing-source-'));
  const path = join(dir, 'efficiency-trends.json');

  try {
    writeJson(path, validLoopEfficiencyTrendReceipt());
    const result = runCheck(['--project-dir', dir, '--receipt', path, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('loop-efficiency-trends-source-missing'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails malformed loop efficiency trend receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-bad-efficiency-trends-'));
  const path = join(dir, 'efficiency-trends.json');
  const receipt = validLoopEfficiencyTrendReceipt({
    totals: {
      analyzed_runs: 9,
      metrics_runs: 9,
      missing_metrics_runs: 0,
    },
  });
  receipt.correction_summary.persistent_attention_loops = [{ id: 'freshness' }];

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('loop-efficiency-trends-total-mismatch'));
    assert.ok(codes.includes('field-invalid'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates meta proof readiness receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-proof-readiness-'));
  const path = join(dir, 'proof-readiness.json');

  try {
    writeJson(path, validMetaProofReadinessReceipt());
    const result = runCheck(['--receipt', path, '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.receipts[0].type, 'meta-proof-readiness');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails malformed meta proof readiness receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-bad-proof-readiness-'));
  const path = join(dir, 'proof-readiness.json');
  const receipt = validMetaProofReadinessReceipt();
  receipt.summary.proved_count = 9;
  receipt.targets[0].blockers = [];
  receipt.targets[1].proof_completion.proved = false;

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('meta-proof-readiness-summary-mismatch'));
    assert.ok(codes.includes('meta-proof-readiness-blockers-missing'));
    assert.ok(codes.includes('meta-proof-readiness-proof-mismatch'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates meta proof readiness refresh plans', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-bad-proof-refresh-plan-'));
  const path = join(dir, 'proof-readiness.json');
  const receipt = validMetaProofReadinessReceipt();
  receipt.targets[0].blockers[0].input_refresh_plan = 'not-a-plan';
  receipt.targets[0].readiness_checks[1].input_refresh_plan = { id: 'page-refresh' };

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('meta-proof-readiness-refresh-plan-invalid'));
    assert.ok(codes.includes('field-invalid'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates meta proof readiness refresh plan counts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-proof-refresh-plan-count-'));
  const path = join(dir, 'proof-readiness.json');
  const receipt = validMetaProofReadinessReceipt();
  const plan = validProofReadinessRefreshPlan();
  receipt.inputs.input_refresh_plan_source = 'node scripts/agent-input-freshness-receipt.mjs --workflow page-refresh --refresh-stale --json';
  receipt.inputs.input_refresh_plan_exit_code = 0;
  receipt.inputs.input_refresh_plan_status = 'planned';
  receipt.inputs.input_refresh_plan_count = 1;
  receipt.targets[0].blockers[0].input_refresh_plan = plan;
  receipt.targets[0].readiness_checks[1].input_refresh_plan = plan;

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    receipt.inputs.input_refresh_plan_count = 2;
    writeJson(path, receipt);
    const drift = runCheck(['--receipt', path, '--json']);
    assert.equal(drift.status, 1);
    const report = JSON.parse(drift.stdout);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('meta-proof-readiness-refresh-plan-count-mismatch'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates meta proof readiness refresh plan status counts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-proof-refresh-plan-status-count-'));
  const path = join(dir, 'proof-readiness.json');
  const receipt = validMetaProofReadinessReceipt();

  try {
    receipt.inputs.input_refresh_plan_source = 'node scripts/agent-input-freshness-receipt.mjs --workflow page-refresh --refresh-stale --json';
    receipt.inputs.input_refresh_plan_exit_code = 0;
    receipt.inputs.input_refresh_plan_status = 'planned';
    receipt.inputs.input_refresh_plan_count = 0;
    writeJson(path, receipt);
    const missingPlan = runCheck(['--receipt', path, '--json']);
    assert.equal(missingPlan.status, 1);

    let report = JSON.parse(missingPlan.stdout);
    let codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('meta-proof-readiness-refresh-plan-status-count-mismatch'));

    receipt.inputs.input_refresh_plan_status = 'missing-refresh-plan';
    receipt.inputs.input_refresh_plan_count = 1;
    receipt.targets[0].blockers[0].input_refresh_plan = validProofReadinessRefreshPlan();
    writeJson(path, receipt);
    const unexpectedPlan = runCheck(['--receipt', path, '--json']);
    assert.equal(unexpectedPlan.status, 1);

    report = JSON.parse(unexpectedPlan.stdout);
    codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('meta-proof-readiness-refresh-plan-status-count-mismatch'));
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
    const receipt = validLoopReceipt();
    receipt.artifact_refs.push(
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
    );
    receipt.efficiency_metrics.artifact_ref_count = receipt.artifact_refs.length;
    writeJson(receiptPath, receipt);

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

test('closeout receipt check fails efficiency artifact count drift', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-artifact-count-drift-'));
  const path = join(dir, 'loop.json');
  const receipt = validLoopReceipt();
  receipt.efficiency_metrics.system_artifact_count = 99;

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-efficiency-metrics', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const details = report.receipts[0].issues.map((item) => item.detail).join('\n');
    assert.match(details, /system_artifact_count/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails scoped efficiency count drift', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-scoped-artifact-count-drift-'));
  const path = join(dir, 'loop.json');
  const receipt = validLoopReceipt();
  receipt.efficiency_metrics.agent_system_artifact_count = 99;
  receipt.efficiency_metrics.preexisting_dirty_count = 2;

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-efficiency-metrics', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const details = report.receipts[0].issues.map((item) => item.detail).join('\n');
    assert.match(details, /agent_system_artifact_count/);
    assert.match(details, /preexisting_dirty_count/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails partial scoped efficiency metrics', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-partial-scoped-efficiency-'));
  const path = join(dir, 'loop.json');
  const receipt = validLoopReceipt();
  delete receipt.efficiency_metrics.agent_content_artifact_count;

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-efficiency-metrics', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const details = report.receipts[0].issues.map((item) => item.detail).join('\n');
    assert.match(details, /agent_content_artifact_count/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails efficiency rate formula drift', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-rate-formula-drift-'));
  const path = join(dir, 'loop.json');
  const receipt = validLoopReceipt();
  receipt.efficiency_metrics.commands_per_second = 99;
  receipt.efficiency_metrics.attention_rate = 0.5;
  receipt.efficiency_metrics.agent_system_artifacts_per_second = 99;

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-efficiency-metrics', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const details = report.receipts[0].issues.map((item) => item.detail).join('\n');
    assert.match(details, /commands_per_second/);
    assert.match(details, /attention_rate/);
    assert.match(details, /agent_system_artifacts_per_second/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails efficiency artifact ref count drift', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-artifact-ref-count-drift-'));
  const path = join(dir, 'loop.json');
  const receipt = validLoopReceipt();
  receipt.efficiency_metrics.artifact_ref_count = 99;
  receipt.efficiency_metrics.embedded_command_artifact_count = 2;

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-efficiency-metrics', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const details = report.receipts[0].issues.map((item) => item.detail).join('\n');
    assert.match(details, /artifact_ref_count/);
    assert.match(details, /embedded_command_artifact_count/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails efficiency slowest command drift', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-slowest-command-drift-'));
  const path = join(dir, 'loop.json');
  const receipt = validLoopReceipt();
  receipt.efficiency_metrics.slowest_commands[0].label = 'different command';
  receipt.efficiency_metrics.slowest_commands[0].duration_ms = 1;

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-efficiency-metrics', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const details = report.receipts[0].issues.map((item) => item.detail).join('\n');
    assert.match(details, /slowest_commands\[0\]\.label/);
    assert.match(details, /slowest_commands\[0\]\.duration_ms/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails missing efficiency slowest command rows', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-missing-slowest-command-'));
  const path = join(dir, 'loop.json');
  const receipt = validLoopReceipt();
  receipt.efficiency_metrics.slowest_commands = [];

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-efficiency-metrics', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const details = report.receipts[0].issues.map((item) => item.detail).join('\n');
    assert.match(details, /top receipt commands/);
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

test('closeout receipt check fails partial scoped system progress fields', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-partial-scoped-progress-'));
  const path = join(dir, 'loop.json');
  const receipt = validLoopReceipt();
  delete receipt.system_progress.agent_changed_paths;

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-system-progress', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const details = report.receipts[0].issues.map((item) => item.detail).join('\n');
    assert.match(details, /system_progress\.agent_changed_paths/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check rejects preexisting system artifacts as current-agent progress', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-preexisting-system-progress-'));
  const path = join(dir, 'loop.json');
  const receipt = validLoopReceipt();
  receipt.system_progress = {
    ...receipt.system_progress,
    changed_paths: ['scripts/preexisting.mjs'],
    system_artifacts: ['scripts/preexisting.mjs'],
    content_artifacts: [],
    other_artifacts: [],
    has_system_artifact: true,
    content_only: false,
    observed_dirty_before_agent: ['scripts/preexisting.mjs'],
    has_observed_dirty_baseline: true,
    missing_observed_dirty_paths: [],
    agent_changed_paths: [],
    agent_system_artifacts: [],
    agent_content_artifacts: [],
    agent_other_artifacts: [],
    has_agent_system_artifact: false,
    agent_content_only: false,
    preexisting_dirty_paths: ['scripts/preexisting.mjs'],
    preexisting_system_artifacts: ['scripts/preexisting.mjs'],
    preexisting_content_artifacts: [],
    preexisting_other_artifacts: [],
  };

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-system-progress', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('system-progress-no-agent-system-artifact'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates scoped system progress on runner receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-runner-scoped-progress-'));
  const path = join(dir, 'runner.json');
  const progress = {
    ...validLoopReceipt().system_progress,
    observed_dirty_before_agent: [],
    has_observed_dirty_baseline: false,
    preexisting_dirty_paths: ['src/content/tools/synthesia.md'],
    preexisting_content_artifacts: ['src/content/tools/synthesia.md'],
  };

  try {
    writeJson(path, validRunnerReceipt({ system_progress: progress }));
    const result = runCheck(['--receipt', path, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('system-progress-scoped-mismatch'));
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
    const advisorySystemProgress = {
      ...validLoopReceipt().system_progress,
      command: 'node scripts/agent-system-progress-check.mjs --json --project-dir=.',
      require_system_artifact: false,
      changed_paths: [],
      system_artifacts: [],
      has_system_artifact: false,
      observed_dirty_before_agent: [],
      has_observed_dirty_baseline: false,
      missing_observed_dirty_paths: [],
      agent_changed_paths: [],
      agent_system_artifacts: [],
      agent_content_artifacts: [],
      agent_other_artifacts: [],
      has_agent_system_artifact: false,
      agent_content_only: false,
      preexisting_dirty_paths: [],
      preexisting_system_artifacts: [],
      preexisting_content_artifacts: [],
      preexisting_other_artifacts: [],
    };
    writeJson(receiptPath, validRunnerReceipt({
      system_progress: advisorySystemProgress,
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
      '--require-system-progress',
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
