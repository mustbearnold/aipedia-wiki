#!/usr/bin/env node
// Validate AiPedia loop and runner closeout receipt JSON contracts.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const ALL_SYSTEM = hasFlag('--all-system');
const REQUIRE_SYSTEM_PROGRESS = hasFlag('--require-system-progress');
const REQUIRE_CLOSEOUT_IDENTITY = hasFlag('--require-closeout-identity');
const REQUIRE_TRACE_ARTIFACTS = hasFlag('--require-trace-artifacts');
const REQUIRE_WORKFLOW_POLICY = hasFlag('--require-workflow-policy');
const REQUIRE_EFFICIENCY_METRICS = hasFlag('--require-efficiency-metrics');
const REQUIRE_DAG_PROOF = hasFlag('--require-dag-proof');
const EXPLICIT_RECEIPTS = valuesFor('--receipt').concat(valuesFor('--path'));
const KNOWN_FLAGS = new Set([
  '--all-system',
  '--json',
  '--help',
  '-h',
  '--path',
  '--project-dir',
  '--receipt',
  '--require-closeout-identity',
  '--require-dag-proof',
  '--require-efficiency-metrics',
  '--require-system-progress',
  '--require-trace-artifacts',
  '--require-workflow-policy',
  '--root',
]);
const VALUE_FLAGS = new Set(['--path', '--project-dir', '--receipt', '--root']);
const RUNNER_WORKFLOW_POLICIES = {
  'tool-refresh': {
    required_commands: [
      'ledger generate',
      'ledger check',
      'tool refresh grouped check',
      'date consistency changed',
      'typecheck',
    ],
    required_artifacts: [
      ['input', 'plan'],
      ['input', 'route-args'],
      ['output', 'markdown-receipt'],
      ['output', 'json-receipt'],
      ['embedded', 'closeout-command'],
    ],
    required_fields: ['plan', 'route_args', 'markdown_receipt'],
  },
  'page-refresh': {
    required_commands: [
      'ledger generate',
      'ledger check',
      'frontmatter changed',
      'date consistency changed',
      'provenance changed',
      'coverage quality changed',
      'em dash guard',
      'diff check',
      'typecheck',
    ],
    required_artifacts: [
      ['input', 'plan'],
      ['input', 'worker-report-dir'],
      ['input', 'worker-report-summary'],
      ['output', 'markdown-receipt'],
      ['output', 'json-receipt'],
      ['embedded', 'closeout-command'],
    ],
    required_fields: ['plan', 'report_dir', 'report_summary', 'markdown_receipt', 'current_date'],
  },
};
const SCOPED_SYSTEM_PROGRESS_ARRAY_FIELDS = [
  'observed_dirty_before_agent',
  'missing_observed_dirty_paths',
  'agent_changed_paths',
  'agent_system_artifacts',
  'agent_content_artifacts',
  'agent_other_artifacts',
  'preexisting_dirty_paths',
  'preexisting_system_artifacts',
  'preexisting_content_artifacts',
  'preexisting_other_artifacts',
];
const SCOPED_SYSTEM_PROGRESS_BOOLEAN_FIELDS = [
  'has_observed_dirty_baseline',
  'has_agent_system_artifact',
  'agent_content_only',
];
const SCOPED_SYSTEM_PROGRESS_FIELDS = [
  ...SCOPED_SYSTEM_PROGRESS_ARRAY_FIELDS,
  ...SCOPED_SYSTEM_PROGRESS_BOOLEAN_FIELDS,
];
const SCOPED_EFFICIENCY_METRIC_FIELDS = [
  'agent_system_artifact_count',
  'agent_content_artifact_count',
  'agent_other_artifact_count',
  'preexisting_dirty_count',
  'agent_system_artifacts_per_second',
];

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emitReport({
    ok: false,
    mode: 'argument-error',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
    receipts: [],
  });
  process.exit(2);
}

const receiptPaths = selectedReceipts();
const receipts = receiptPaths.map(validateReceiptFile);
const issueCount = receipts.reduce((sum, receipt) => sum + receipt.issues.length, 0);
const report = {
  ok: issueCount === 0,
  mode: 'closeout-receipt-check',
  project_dir: PROJECT_DIR,
  require_system_progress: REQUIRE_SYSTEM_PROGRESS,
  require_closeout_identity: REQUIRE_CLOSEOUT_IDENTITY,
  require_trace_artifacts: REQUIRE_TRACE_ARTIFACTS,
  require_workflow_policy: REQUIRE_WORKFLOW_POLICY,
  require_efficiency_metrics: REQUIRE_EFFICIENCY_METRICS,
  require_dag_proof: REQUIRE_DAG_PROOF,
  totals: {
    receipts: receipts.length,
    ok: receipts.filter((receipt) => receipt.ok).length,
    failed: receipts.filter((receipt) => !receipt.ok).length,
    issues: issueCount,
  },
  receipts,
};

emitReport(report);
process.exit(report.ok ? 0 : 1);

function usage() {
  return [
    'Usage:',
    '  node scripts/agent-closeout-receipt-check.mjs --json',
    '  node scripts/agent-closeout-receipt-check.mjs --receipt .agent/loop-runs/system/latest.json --require-system-progress --json',
    '  node scripts/agent-closeout-receipt-check.mjs --all-system --json',
    '',
    'Options:',
    '  --receipt <path>              Validate a loop, runner, proof, readiness, affiliate handoff, or pause receipt JSON file. Repeatable.',
    '  --path <path>                 Alias for --receipt.',
    '  --all-system                  Validate every .agent/loop-runs/system/*.json receipt.',
    '  --require-system-progress     Require loop receipts to include enforced system_progress.',
    '  --require-closeout-identity   Require goal_id, run_id, residual_risks, and next_actions.',
    '  --require-efficiency-metrics  Require loop receipts to include validated speed and efficiency metrics.',
    '  --require-dag-proof           Require checked agent DAG graph and validation-report artifact refs.',
    '  --require-trace-artifacts     Require trace and artifact_refs blocks.',
    '  --require-workflow-policy     Require workflow-specific runner closeout policy checks.',
    '  --project-dir <dir>           Project root. Alias: --root.',
    '  --json                        Emit a structured report.',
  ].join('\n');
}

function selectedReceipts() {
  if (EXPLICIT_RECEIPTS.length) {
    return [...new Set(EXPLICIT_RECEIPTS.map((path) => resolve(PROJECT_DIR, path)))].sort();
  }
  const systemDir = resolve(PROJECT_DIR, '.agent/loop-runs/system');
  if (ALL_SYSTEM && existsSync(systemDir)) {
    return readdirSync(systemDir)
      .filter((name) => name.endsWith('.json'))
      .map((name) => join(systemDir, name))
      .sort();
  }
  return [resolve(systemDir, 'latest.json')];
}

function validateReceiptFile(path) {
  const issues = [];
  let value = null;
  if (!existsSync(path)) {
    issues.push(issue('receipt-missing', 'Receipt file does not exist.'));
    return receiptResult(path, 'missing', issues);
  }
  try {
    value = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    issues.push(issue('receipt-invalid-json', `Receipt JSON could not parse: ${error.message}`));
    return receiptResult(path, 'invalid-json', issues);
  }

  const type = receiptType(value);
  if (type === 'loop-run') validateLoopReceipt(value, issues);
  else if (type === 'runner-closeout') validateRunnerReceipt(value, issues);
  else if (type === 'runner-interrupt-proof') validateRunnerInterruptProof(value, issues);
  else if (type === 'affiliate-handoff') validateAffiliateHandoffReceipt(value, issues);
  else if (type === 'meta-proof-readiness') validateMetaProofReadinessReceipt(value, issues);
  else if (type === 'loop-efficiency-trends') validateLoopEfficiencyTrendReceipt(value, issues);
  else if (type === 'pause-receipt') validatePauseReceipt(value, issues);
  else issues.push(issue('receipt-unknown-type', 'Receipt is neither a loop-run receipt, aipedia.closeout-receipt.v1, aipedia.runner-interrupt-proof.v1, aipedia.affiliate-handoff-receipt.v1, aipedia.meta-proof-readiness.v1, aipedia.loop-efficiency-trends.v1, nor aipedia.pause-receipt.v1.'));

  return receiptResult(path, type, issues);
}

function receiptResult(path, type, issues) {
  return {
    ok: issues.length === 0,
    path: projectPath(path),
    type,
    issues,
  };
}

function receiptType(value) {
  if (!isObject(value)) return 'unknown';
  if (value.schema_version === 'aipedia.closeout-receipt.v1') return 'runner-closeout';
  if (value.schema_version === 'aipedia.runner-interrupt-proof.v1') return 'runner-interrupt-proof';
  if (value.schema_version === 'aipedia.affiliate-handoff-receipt.v1') return 'affiliate-handoff';
  if (value.schema_version === 'aipedia.meta-proof-readiness.v1') return 'meta-proof-readiness';
  if (value.schema_version === 'aipedia.loop-efficiency-trends.v1') return 'loop-efficiency-trends';
  if (value.schema_version === 'aipedia.pause-receipt.v1') return 'pause-receipt';
  if (typeof value.mode === 'string' && value.mode.startsWith('loop-run')) return 'loop-run';
  return 'unknown';
}

function validateLoopEfficiencyTrendReceipt(value, issues) {
  requireBoolean(value, 'ok', issues);
  requireString(value, 'mode', issues, {
    values: ['loop-efficiency-trends', 'loop-efficiency-trends-attention'],
  });
  requireString(value, 'schema_version', issues, {
    values: ['aipedia.loop-efficiency-trends.v1'],
  });
  requireIsoString(value, 'generated_at', issues);
  requireString(value, 'project_dir', issues);
  requireString(value, 'ledger_dir', issues);
  if (value.receipt_path != null && value.receipt_path !== '') requireString(value, 'receipt_path', issues);
  requireNonNegativeNumber(value, 'max_runs', issues);
  requireBoolean(value, 'fail_on_missing_metrics', issues);
  requireObject(value, 'totals', issues);
  requireArray(value, 'issues', issues);
  requireArray(value, 'runs', issues);
  requireObject(value, 'summary', issues);
  requireObject(value, 'stability_summary', issues);
  requireObject(value, 'correction_summary', issues);
  requireArray(value, 'slowest_commands', issues);
  requireStringArray(value, 'next_actions', issues);

  if (isObject(value.totals)) {
    for (const field of ['analyzed_runs', 'metrics_runs', 'missing_metrics_runs']) {
      requireNonNegativeNumber(value.totals, field, issues, `totals.${field}`);
    }
  }
  if (Array.isArray(value.runs)) {
    value.runs.forEach((run, index) => validateLoopEfficiencyTrendRun(run, issues, `runs[${index}]`));
    if (isObject(value.totals)) {
      const metricsRuns = value.runs.filter((run) => isObject(run) && run.has_efficiency_metrics === true).length;
      const missingRuns = value.runs.filter((run) => isObject(run) && run.has_efficiency_metrics !== true).length;
      if (typeof value.totals.analyzed_runs === 'number' && value.totals.analyzed_runs !== value.runs.length) {
        issues.push(issue('loop-efficiency-trends-total-mismatch', `totals.analyzed_runs is ${value.totals.analyzed_runs} but runs has ${value.runs.length} item(s).`));
      }
      if (typeof value.totals.metrics_runs === 'number' && value.totals.metrics_runs !== metricsRuns) {
        issues.push(issue('loop-efficiency-trends-total-mismatch', `totals.metrics_runs is ${value.totals.metrics_runs} but runs imply ${metricsRuns}.`));
      }
      if (typeof value.totals.missing_metrics_runs === 'number' && value.totals.missing_metrics_runs !== missingRuns) {
        issues.push(issue('loop-efficiency-trends-total-mismatch', `totals.missing_metrics_runs is ${value.totals.missing_metrics_runs} but runs imply ${missingRuns}.`));
      }
    }
  }
  const sourceContext = loadLoopEfficiencyTrendSourceReceipts(value, issues);
  if (Array.isArray(value.runs)) validateLoopEfficiencyTrendRunFacts(sourceContext, issues);
  if (isObject(value.summary)) {
    validateLoopEfficiencyTrendSummary(value.summary, issues);
    validateLoopEfficiencyTrendSummaryFacts(value, issues);
  }
  if (isObject(value.stability_summary)) {
    validateLoopEfficiencyTrendStability(value.stability_summary, issues);
    validateLoopEfficiencyTrendStabilityFacts(value.stability_summary, sourceContext, issues);
  }
  if (isObject(value.correction_summary)) {
    validateLoopEfficiencyTrendCorrection(value.correction_summary, issues);
    validateLoopEfficiencyTrendCorrectionFacts(value.correction_summary, sourceContext, issues);
  }
  if (Array.isArray(value.slowest_commands)) {
    value.slowest_commands.forEach((command, index) => validateLoopEfficiencyTrendSlowCommand(command, issues, `slowest_commands[${index}]`));
    validateLoopEfficiencyTrendSlowestCommands(value, sourceContext, issues);
  }
}

function validateLoopEfficiencyTrendRun(run, issues, path) {
  if (!isObject(run)) {
    issues.push(issue('loop-efficiency-trends-run-invalid', `${path} must be an object.`));
    return;
  }
  requireString(run, 'path', issues, { path: `${path}.path` });
  requireIsoString(run, 'generated_at', issues, `${path}.generated_at`);
  requireString(run, 'run_id', issues, { path: `${path}.run_id` });
  requireBoolean(run, 'ok', issues, `${path}.ok`);
  requireBoolean(run, 'has_efficiency_metrics', issues, `${path}.has_efficiency_metrics`);
  for (const field of [
    'wall_duration_ms',
    'total_command_duration_ms',
    'command_count',
    'loop_count',
    'attention_rate',
    'persisted_full_receipt_bytes',
    'persisted_latest_receipt_bytes',
    'estimated_full_receipt_tokens',
    'system_artifact_count',
  ]) {
    requireNonNegativeNumber(run, field, issues, `${path}.${field}`);
  }
}

function validateLoopEfficiencyTrendSummary(summary, issues) {
  requireIsoString(summary, 'first_run', issues, 'summary.first_run');
  requireIsoString(summary, 'latest_run', issues, 'summary.latest_run');
  for (const field of [
    'metrics_coverage_rate',
    'median_wall_duration_ms',
    'median_total_command_duration_ms',
    'median_attention_rate',
    'median_full_receipt_bytes',
    'median_latest_receipt_bytes',
    'median_estimated_full_receipt_tokens',
  ]) {
    requireNonNegativeNumber(summary, field, issues, `summary.${field}`);
  }
  if (summary.latest != null && !isObject(summary.latest)) {
    issues.push(issue('loop-efficiency-trends-summary-invalid', 'summary.latest must be an object when present.'));
  }
  if (summary.delta_from_previous != null && !isObject(summary.delta_from_previous)) {
    issues.push(issue('loop-efficiency-trends-summary-invalid', 'summary.delta_from_previous must be an object when present.'));
  }
}

function validateLoopEfficiencyTrendSummaryFacts(receipt, issues) {
  if (!Array.isArray(receipt.runs) || !isObject(receipt.summary)) return;
  const runs = receipt.runs.filter(isObject);
  const metricRuns = runs.filter((run) => run.has_efficiency_metrics === true);
  const latest = metricRuns.at(-1) || null;
  const previous = metricRuns.length > 1 ? metricRuns.at(-2) : null;
  const expected = {
    first_run: typeof runs[0]?.generated_at === 'string' ? runs[0].generated_at : '',
    latest_run: typeof runs.at(-1)?.generated_at === 'string' ? runs.at(-1).generated_at : '',
    metrics_coverage_rate: metricRatio(metricRuns.length, runs.length),
    median_wall_duration_ms: medianMetric(metricRuns.map((run) => run.wall_duration_ms)),
    median_total_command_duration_ms: medianMetric(metricRuns.map((run) => run.total_command_duration_ms)),
    median_attention_rate: medianMetric(metricRuns.map((run) => run.attention_rate)),
    median_full_receipt_bytes: medianMetric(metricRuns.map((run) => run.persisted_full_receipt_bytes)),
    median_latest_receipt_bytes: medianMetric(metricRuns.map((run) => run.persisted_latest_receipt_bytes)),
    median_estimated_full_receipt_tokens: medianMetric(metricRuns.map((run) => run.estimated_full_receipt_tokens)),
  };
  for (const [field, value] of Object.entries(expected)) {
    validateTrendSummaryValue(receipt.summary[field], value, `summary.${field}`, issues);
  }

  validateTrendSummaryObject(receipt.summary.latest, latest, 'summary.latest', issues);
  const expectedDelta = latest && previous
    ? {
        wall_duration_ms: latest.wall_duration_ms - previous.wall_duration_ms,
        total_command_duration_ms: latest.total_command_duration_ms - previous.total_command_duration_ms,
        attention_rate: roundMetric(latest.attention_rate - previous.attention_rate),
        persisted_full_receipt_bytes: latest.persisted_full_receipt_bytes - previous.persisted_full_receipt_bytes,
        persisted_latest_receipt_bytes: latest.persisted_latest_receipt_bytes - previous.persisted_latest_receipt_bytes,
        estimated_full_receipt_tokens: latest.estimated_full_receipt_tokens - previous.estimated_full_receipt_tokens,
        system_artifact_count: latest.system_artifact_count - previous.system_artifact_count,
      }
    : null;
  validateTrendSummaryObject(receipt.summary.delta_from_previous, expectedDelta, 'summary.delta_from_previous', issues);
}

function validateTrendSummaryObject(actual, expected, path, issues) {
  if (expected == null) {
    if (actual != null) {
      issues.push(issue('loop-efficiency-trends-summary-mismatch', `${path} must be null when the runs do not imply a value.`));
    }
    return;
  }
  if (!isObject(actual)) {
    issues.push(issue('loop-efficiency-trends-summary-mismatch', `${path} must match the run-derived object.`));
    return;
  }
  for (const [field, value] of Object.entries(expected)) {
    validateTrendSummaryValue(actual[field], value, `${path}.${field}`, issues);
  }
}

function validateTrendSummaryValue(actual, expected, path, issues) {
  if (actual !== expected) {
    issues.push(issue('loop-efficiency-trends-summary-mismatch', `${path} must match the value derived from runs.`));
  }
}

function validateLoopEfficiencyTrendStability(stability, issues) {
  for (const field of [
    'loop_status_comparisons',
    'loop_status_changes',
    'loop_status_change_rate',
    'command_status_comparisons',
    'command_status_changes',
    'command_status_change_rate',
  ]) {
    requireNonNegativeNumber(stability, field, issues, `stability_summary.${field}`);
  }
  requireStringArray(stability, 'persistent_attention_loops', issues, 'stability_summary.persistent_attention_loops');
  requireStringArray(stability, 'latest_attention_loops', issues, 'stability_summary.latest_attention_loops');
  requireStringArray(stability, 'new_attention_loops', issues, 'stability_summary.new_attention_loops');
  requireStringArray(stability, 'resolved_attention_loops', issues, 'stability_summary.resolved_attention_loops');
  requireArray(stability, 'recent_loop_status_changes', issues, 'stability_summary.recent_loop_status_changes');
}

function validateLoopEfficiencyTrendCorrection(correction, issues) {
  requireBoolean(correction, 'has_comparison', issues, 'correction_summary.has_comparison');
  if (correction.previous_run) requireIsoString(correction, 'previous_run', issues, 'correction_summary.previous_run');
  if (correction.latest_run) requireIsoString(correction, 'latest_run', issues, 'correction_summary.latest_run');
  for (const field of [
    'loop_previous_attention_count',
    'loop_resolved_attention_count',
    'loop_persistent_attention_count',
    'loop_regressed_attention_count',
    'loop_correction_rate',
    'command_previous_attention_count',
    'command_resolved_attention_count',
    'command_persistent_attention_count',
    'command_regressed_attention_count',
    'command_correction_rate',
  ]) {
    requireNonNegativeNumber(correction, field, issues, `correction_summary.${field}`);
  }
  requireArray(correction, 'resolved_loops', issues, 'correction_summary.resolved_loops');
  requireStringArray(correction, 'persistent_attention_loops', issues, 'correction_summary.persistent_attention_loops');
  requireArray(correction, 'regressed_loops', issues, 'correction_summary.regressed_loops');
  requireArray(correction, 'resolved_commands', issues, 'correction_summary.resolved_commands');
  requireArray(correction, 'persistent_attention_commands', issues, 'correction_summary.persistent_attention_commands');
  requireArray(correction, 'regressed_commands', issues, 'correction_summary.regressed_commands');
}

function loadLoopEfficiencyTrendSourceReceipts(receipt, issues) {
  const context = { records: [], had_issue: false };
  if (!Array.isArray(receipt.runs)) return context;
  receipt.runs.forEach((run, runIndex) => {
    if (!isObject(run) || typeof run.path !== 'string' || run.path === '') return;
    const sourcePath = resolve(PROJECT_DIR, run.path);
    if (!existsSync(sourcePath)) {
      context.had_issue = true;
      issues.push(issue('loop-efficiency-trends-source-missing', `runs[${runIndex}].path source loop receipt does not exist: ${run.path}`));
      return;
    }
    try {
      const source = JSON.parse(readFileSync(sourcePath, 'utf8'));
      context.records.push({ run, run_index: runIndex, source });
    } catch (error) {
      context.had_issue = true;
      issues.push(issue('loop-efficiency-trends-source-invalid', `runs[${runIndex}].path source loop receipt could not parse: ${error.message}`));
    }
  });
  return context;
}

function validateLoopEfficiencyTrendStabilityFacts(stability, sourceContext, issues) {
  if (!sourceContext || sourceContext.had_issue) return;
  const records = sourceContext.records.map((item) => item.source);
  const expected = computeTrendStabilitySummary(records);
  validateTrendFactsObject(stability, expected, 'stability_summary', 'loop-efficiency-trends-stability-mismatch', issues);
}

function validateLoopEfficiencyTrendCorrectionFacts(correction, sourceContext, issues) {
  if (!sourceContext || sourceContext.had_issue) return;
  const records = sourceContext.records.map((item) => item.source);
  const expected = computeTrendCorrectionSummary(records);
  validateTrendFactsObject(correction, expected, 'correction_summary', 'loop-efficiency-trends-correction-mismatch', issues);
}

function validateLoopEfficiencyTrendRunFacts(sourceContext, issues) {
  if (!sourceContext || sourceContext.had_issue) return;
  for (const { run, run_index: runIndex, source } of sourceContext.records) {
    const expected = computeTrendRunSummary(run.path, source);
    for (const [field, value] of Object.entries(expected)) {
      if (!deepTrendEqual(run[field], value)) {
        issues.push(issue('loop-efficiency-trends-run-mismatch', `runs[${runIndex}].${field} must match source loop receipt facts.`));
      }
    }
  }
}

function computeTrendRunSummary(path, source) {
  const metrics = isObject(source.efficiency_metrics) ? source.efficiency_metrics : {};
  const totals = isObject(source.totals) ? source.totals : {};
  return {
    path,
    generated_at: typeof source.generated_at === 'string' ? source.generated_at : '',
    run_id: typeof source.run_id === 'string' ? source.run_id : '',
    ok: source.ok === true,
    has_efficiency_metrics: isObject(source.efficiency_metrics),
    wall_duration_ms: nonNegativeMetric(metrics.wall_duration_ms || source.duration_ms),
    total_command_duration_ms: nonNegativeMetric(metrics.total_command_duration_ms),
    command_count: nonNegativeMetric(metrics.command_count || totals.commands),
    loop_count: nonNegativeMetric(metrics.loop_count || totals.loops),
    attention_rate: metricNumber(metrics.attention_rate),
    persisted_full_receipt_bytes: nonNegativeMetric(metrics.persisted_full_receipt_bytes),
    persisted_latest_receipt_bytes: nonNegativeMetric(metrics.persisted_latest_receipt_bytes),
    estimated_full_receipt_tokens: estimateMetricTokens(metrics.persisted_full_receipt_bytes),
    system_artifact_count: nonNegativeMetric(metrics.system_artifact_count),
  };
}

function computeTrendStabilitySummary(records) {
  const loopStatuses = new Map();
  const commandStatuses = new Map();
  let loopStatusComparisons = 0;
  let loopStatusChanges = 0;
  let commandStatusComparisons = 0;
  let commandStatusChanges = 0;

  for (const record of records) {
    for (const loop of Array.isArray(record.loops) ? record.loops : []) {
      if (!isObject(loop) || !loop.id) continue;
      if (!loopStatuses.has(loop.id)) loopStatuses.set(loop.id, []);
      loopStatuses.get(loop.id).push({ generated_at: record.generated_at, status: loop.status || '' });
      for (const command of Array.isArray(loop.commands) ? loop.commands : []) {
        if (!isObject(command) || !command.label) continue;
        const key = `${loop.id}::${command.label}`;
        if (!commandStatuses.has(key)) {
          commandStatuses.set(key, {
            loop_id: loop.id,
            label: command.label,
            statuses: [],
          });
        }
        commandStatuses.get(key).statuses.push({ generated_at: record.generated_at, status: command.status || '' });
      }
    }
  }

  for (const statuses of loopStatuses.values()) {
    for (let index = 1; index < statuses.length; index += 1) {
      loopStatusComparisons += 1;
      if (statuses[index].status !== statuses[index - 1].status) loopStatusChanges += 1;
    }
  }
  for (const command of commandStatuses.values()) {
    for (let index = 1; index < command.statuses.length; index += 1) {
      commandStatusComparisons += 1;
      if (command.statuses[index].status !== command.statuses[index - 1].status) commandStatusChanges += 1;
    }
  }

  const previous = records.length > 1 ? records.at(-2) : null;
  const latest = records.at(-1) || null;
  const previousLoopStatuses = new Map((previous?.loops || []).filter(isObject).map((loop) => [loop.id, loop.status]));
  const latestLoopStatuses = new Map((latest?.loops || []).filter(isObject).map((loop) => [loop.id, loop.status]));
  const latestAttention = [...latestLoopStatuses].filter(([, status]) => status === 'attention').map(([id]) => id).sort();
  const previousAttention = [...previousLoopStatuses].filter(([, status]) => status === 'attention').map(([id]) => id).sort();

  return {
    loop_status_comparisons: loopStatusComparisons,
    loop_status_changes: loopStatusChanges,
    loop_status_change_rate: metricRatio(loopStatusChanges, loopStatusComparisons),
    command_status_comparisons: commandStatusComparisons,
    command_status_changes: commandStatusChanges,
    command_status_change_rate: metricRatio(commandStatusChanges, commandStatusComparisons),
    persistent_attention_loops: [...loopStatuses.entries()]
      .filter(([, statuses]) => statuses.length === records.length && statuses.every((item) => item.status === 'attention'))
      .map(([id]) => id)
      .sort(),
    latest_attention_loops: latestAttention,
    new_attention_loops: latestAttention.filter((id) => !previousAttention.includes(id)),
    resolved_attention_loops: previousAttention.filter((id) => latestLoopStatuses.get(id) !== 'attention'),
    recent_loop_status_changes: [...latestLoopStatuses.entries()]
      .filter(([id, status]) => previousLoopStatuses.has(id) && previousLoopStatuses.get(id) !== status)
      .map(([id, status]) => ({
        loop_id: id,
        previous: previousLoopStatuses.get(id),
        current: status,
      }))
      .sort((left, right) => left.loop_id.localeCompare(right.loop_id)),
  };
}

function computeTrendCorrectionSummary(records) {
  const previous = records.length > 1 ? records.at(-2) : null;
  const latest = records.at(-1) || null;
  if (!previous || !latest) {
    return {
      has_comparison: false,
      previous_run: previous?.generated_at || '',
      latest_run: latest?.generated_at || '',
      loop_previous_attention_count: 0,
      loop_resolved_attention_count: 0,
      loop_persistent_attention_count: 0,
      loop_regressed_attention_count: 0,
      loop_correction_rate: 0,
      command_previous_attention_count: 0,
      command_resolved_attention_count: 0,
      command_persistent_attention_count: 0,
      command_regressed_attention_count: 0,
      command_correction_rate: 0,
      resolved_loops: [],
      persistent_attention_loops: [],
      regressed_loops: [],
      resolved_commands: [],
      persistent_attention_commands: [],
      regressed_commands: [],
    };
  }

  const previousLoopStatuses = new Map((previous.loops || []).filter(isObject).map((loop) => [loop.id, loop.status || '']));
  const latestLoopStatuses = new Map((latest.loops || []).filter(isObject).map((loop) => [loop.id, loop.status || '']));
  const previousCommandStatuses = trendCommandStatusMap(previous);
  const latestCommandStatuses = trendCommandStatusMap(latest);

  const loopPreviousAttention = [...previousLoopStatuses].filter(([, status]) => status === 'attention');
  const resolvedLoops = loopPreviousAttention
    .filter(([id]) => latestLoopStatuses.has(id) && latestLoopStatuses.get(id) !== 'attention')
    .map(([id, previousStatus]) => ({
      loop_id: id,
      previous: previousStatus,
      current: latestLoopStatuses.get(id),
    }))
    .sort((left, right) => left.loop_id.localeCompare(right.loop_id));
  const persistentLoops = loopPreviousAttention
    .filter(([id]) => latestLoopStatuses.get(id) === 'attention')
    .map(([id]) => id)
    .sort();
  const regressedLoops = [...latestLoopStatuses]
    .filter(([id, status]) => status === 'attention' && previousLoopStatuses.has(id) && previousLoopStatuses.get(id) !== 'attention')
    .map(([id, currentStatus]) => ({
      loop_id: id,
      previous: previousLoopStatuses.get(id),
      current: currentStatus,
    }))
    .sort((left, right) => left.loop_id.localeCompare(right.loop_id));

  const commandPreviousAttention = [...previousCommandStatuses.values()].filter((command) => command.status === 'attention');
  const resolvedCommands = commandPreviousAttention
    .filter((command) => latestCommandStatuses.has(command.key) && latestCommandStatuses.get(command.key).status !== 'attention')
    .map((command) => ({
      loop_id: command.loop_id,
      label: command.label,
      previous: command.status,
      current: latestCommandStatuses.get(command.key).status,
    }))
    .sort(sortTrendCommandChange);
  const persistentCommands = commandPreviousAttention
    .filter((command) => latestCommandStatuses.get(command.key)?.status === 'attention')
    .map((command) => ({
      loop_id: command.loop_id,
      label: command.label,
    }))
    .sort(sortTrendCommandChange);
  const regressedCommands = [...latestCommandStatuses.values()]
    .filter((command) => command.status === 'attention'
      && previousCommandStatuses.has(command.key)
      && previousCommandStatuses.get(command.key).status !== 'attention')
    .map((command) => ({
      loop_id: command.loop_id,
      label: command.label,
      previous: previousCommandStatuses.get(command.key).status,
      current: command.status,
    }))
    .sort(sortTrendCommandChange);

  return {
    has_comparison: true,
    previous_run: previous.generated_at,
    latest_run: latest.generated_at,
    loop_previous_attention_count: loopPreviousAttention.length,
    loop_resolved_attention_count: resolvedLoops.length,
    loop_persistent_attention_count: persistentLoops.length,
    loop_regressed_attention_count: regressedLoops.length,
    loop_correction_rate: metricRatio(resolvedLoops.length, loopPreviousAttention.length),
    command_previous_attention_count: commandPreviousAttention.length,
    command_resolved_attention_count: resolvedCommands.length,
    command_persistent_attention_count: persistentCommands.length,
    command_regressed_attention_count: regressedCommands.length,
    command_correction_rate: metricRatio(resolvedCommands.length, commandPreviousAttention.length),
    resolved_loops: resolvedLoops,
    persistent_attention_loops: persistentLoops,
    regressed_loops: regressedLoops,
    resolved_commands: resolvedCommands,
    persistent_attention_commands: persistentCommands,
    regressed_commands: regressedCommands,
  };
}

function trendCommandStatusMap(record) {
  const statuses = new Map();
  for (const loop of Array.isArray(record.loops) ? record.loops : []) {
    if (!isObject(loop)) continue;
    for (const command of Array.isArray(loop.commands) ? loop.commands : []) {
      if (!isObject(command)) continue;
      const key = `${loop.id || ''}::${command.label || ''}`;
      if (!loop.id || !command.label) continue;
      statuses.set(key, {
        key,
        loop_id: loop.id,
        label: command.label,
        status: command.status || '',
      });
    }
  }
  return statuses;
}

function sortTrendCommandChange(left, right) {
  return left.loop_id.localeCompare(right.loop_id) || left.label.localeCompare(right.label);
}

function validateTrendFactsObject(actual, expected, path, code, issues) {
  if (!isObject(actual)) {
    issues.push(issue(code, `${path} must match source loop receipts.`));
    return;
  }
  for (const [field, value] of Object.entries(expected)) {
    if (!deepTrendEqual(actual[field], value)) {
      issues.push(issue(code, `${path}.${field} must match source loop receipts.`));
    }
  }
}

function deepTrendEqual(actual, expected) {
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual) || actual.length !== expected.length) return false;
    return expected.every((item, index) => deepTrendEqual(actual[index], item));
  }
  if (isObject(expected)) {
    if (!isObject(actual)) return false;
    const expectedKeys = Object.keys(expected).sort();
    const actualKeys = Object.keys(actual).sort();
    if (expectedKeys.length !== actualKeys.length) return false;
    return expectedKeys.every((key, index) => key === actualKeys[index] && deepTrendEqual(actual[key], expected[key]));
  }
  return Object.is(actual, expected);
}

function validateLoopEfficiencyTrendSlowCommand(command, issues, path) {
  if (!isObject(command)) {
    issues.push(issue('loop-efficiency-trends-command-invalid', `${path} must be an object.`));
    return;
  }
  requireString(command, 'loop_id', issues, { path: `${path}.loop_id` });
  requireString(command, 'label', issues, { path: `${path}.label` });
  requireNonNegativeNumber(command, 'occurrences', issues, `${path}.occurrences`);
  requireNonNegativeNumber(command, 'max_duration_ms', issues, `${path}.max_duration_ms`);
  requireNonNegativeNumber(command, 'median_duration_ms', issues, `${path}.median_duration_ms`);
  requireString(command, 'latest_status', issues, {
    path: `${path}.latest_status`,
    values: ['ok', 'attention', 'skipped'],
  });
}

function validateLoopEfficiencyTrendSlowestCommands(receipt, sourceContext, issues) {
  if (!Array.isArray(receipt.runs) || !Array.isArray(receipt.slowest_commands) || !sourceContext || sourceContext.had_issue) return;
  const groups = new Map();
  sourceContext.records.forEach(({ run, run_index: runIndex, source }) => {
    if (!isObject(run) || run.has_efficiency_metrics !== true) return;
    const sourceCommands = source?.efficiency_metrics?.slowest_commands;
    if (!Array.isArray(sourceCommands)) {
      issues.push(issue('loop-efficiency-trends-source-invalid', `runs[${runIndex}].path source loop receipt must include efficiency_metrics.slowest_commands.`));
      return;
    }
    for (const command of sourceCommands) {
      if (!isObject(command)) continue;
      const loopId = typeof command.loop_id === 'string' ? command.loop_id : '';
      const label = typeof command.label === 'string' ? command.label : '';
      const key = `${loopId}::${label}`;
      if (!groups.has(key)) {
        groups.set(key, {
          loop_id: loopId,
          label,
          occurrences: 0,
          max_duration_ms: 0,
          durations: [],
          latest_status: '',
        });
      }
      const group = groups.get(key);
      const durationMs = nonNegativeMetric(command.duration_ms);
      group.occurrences += 1;
      group.latest_status = typeof command.status === 'string' && command.status ? command.status : group.latest_status;
      group.max_duration_ms = Math.max(group.max_duration_ms, durationMs);
      group.durations.push(durationMs);
    }
  });

  const expected = [...groups.values()]
    .map((group) => ({
      loop_id: group.loop_id,
      label: group.label,
      occurrences: group.occurrences,
      max_duration_ms: group.max_duration_ms,
      median_duration_ms: medianMetric(group.durations),
      latest_status: group.latest_status,
    }))
    .sort((left, right) => right.max_duration_ms - left.max_duration_ms || left.label.localeCompare(right.label))
    .slice(0, 10);

  if (receipt.slowest_commands.length !== expected.length) {
    issues.push(issue('loop-efficiency-trends-slowest-mismatch', 'slowest_commands must match the top source loop receipt slow-command trends.'));
    return;
  }
  expected.forEach((expectedCommand, index) => {
    const actual = isObject(receipt.slowest_commands[index]) ? receipt.slowest_commands[index] : {};
    for (const field of ['loop_id', 'label', 'occurrences', 'max_duration_ms', 'median_duration_ms', 'latest_status']) {
      if (actual[field] !== expectedCommand[field]) {
        issues.push(issue('loop-efficiency-trends-slowest-mismatch', `slowest_commands[${index}].${field} must match source loop receipt slow-command trends.`));
      }
    }
  });
}

function validateLoopReceipt(value, issues) {
  requireBoolean(value, 'ok', issues);
  requireString(value, 'mode', issues, { values: ['loop-run', 'loop-run-system-progress-blocked'] });
  requireIsoString(value, 'generated_at', issues);
  requireNonNegativeNumber(value, 'duration_ms', issues);
  requireObject(value, 'totals', issues);
  requireArray(value, 'loops', issues);
  requireObject(value, 'review', issues);
  requireObject(value, 'ledger', issues);
  validateCloseoutIdentity(value, issues);
  validateTraceArtifacts(value, issues);
  validateDagArtifactRefs(value, issues);

  if (isObject(value.totals)) {
    for (const field of ['loops', 'ok', 'attention', 'skipped', 'commands']) {
      requireNonNegativeNumber(value.totals, field, issues, `totals.${field}`);
    }
    if (Array.isArray(value.loops) && value.totals.loops !== value.loops.length) {
      issues.push(issue('loop-total-mismatch', `totals.loops is ${value.totals.loops} but loops has ${value.loops.length} item(s).`));
    }
  }

  if (isObject(value.review)) {
    requireString(value.review, 'summary', issues, { path: 'review.summary' });
    requireArray(value.review, 'next_actions', issues, 'review.next_actions');
  }

  if (isObject(value.ledger)) {
    requireBoolean(value.ledger, 'written', issues, 'ledger.written');
    requireString(value.ledger, 'file', issues, { path: 'ledger.file' });
    requireString(value.ledger, 'latest_file', issues, { path: 'ledger.latest_file' });
  }

  if (Array.isArray(value.loops)) {
    value.loops.forEach((loop, index) => validateLoopItem(loop, issues, `loops[${index}]`));
  }

  if (value.efficiency_metrics != null) validateLoopEfficiencyMetrics(value.efficiency_metrics, value, issues);
  else if (REQUIRE_EFFICIENCY_METRICS) {
    issues.push(issue('efficiency-metrics-missing', 'Loop receipt must include efficiency_metrics when --require-efficiency-metrics is used.'));
  }

  if (value.system_progress != null) validateSystemProgress(value.system_progress, value, issues, { enforce: REQUIRE_SYSTEM_PROGRESS });
  else if (REQUIRE_SYSTEM_PROGRESS) {
    issues.push(issue('system-progress-missing', 'Loop receipt must include system_progress when --require-system-progress is used.'));
  }
}

function validateLoopItem(loop, issues, path) {
  if (!isObject(loop)) {
    issues.push(issue('loop-invalid', `${path} must be an object.`));
    return;
  }
  requireString(loop, 'id', issues, { path: `${path}.id` });
  requireString(loop, 'title', issues, { path: `${path}.title` });
  requireString(loop, 'status', issues, { path: `${path}.status`, values: ['ok', 'attention', 'skipped'] });
  requireNonNegativeNumber(loop, 'duration_ms', issues, `${path}.duration_ms`);
  requireArray(loop, 'commands', issues, `${path}.commands`);
  requireArray(loop, 'attention_reasons', issues, `${path}.attention_reasons`);
  if (Array.isArray(loop.commands)) {
    loop.commands.forEach((command, index) => validateLoopCommand(command, issues, `${path}.commands[${index}]`));
  }
}

function validateLoopCommand(command, issues, path) {
  if (!isObject(command)) {
    issues.push(issue('loop-command-invalid', `${path} must be an object.`));
    return;
  }
  requireString(command, 'label', issues, { path: `${path}.label` });
  requireString(command, 'status', issues, { path: `${path}.status`, values: ['ok', 'attention', 'skipped'] });
  requireNonNegativeNumber(command, 'duration_ms', issues, `${path}.duration_ms`);
  requireArray(command, 'attention_reasons', issues, `${path}.attention_reasons`);
}

function validateLoopEfficiencyMetrics(metrics, receipt, issues) {
  if (!isObject(metrics)) {
    issues.push(issue('efficiency-metrics-invalid', 'efficiency_metrics must be an object.'));
    return;
  }
  requireString(metrics, 'schema_version', issues, {
    path: 'efficiency_metrics.schema_version',
    values: ['aipedia.loop-efficiency-metrics.v1'],
  });
  for (const field of [
    'wall_duration_ms',
    'total_command_duration_ms',
    'command_count',
    'loop_count',
    'ok_loop_count',
    'attention_loop_count',
    'skipped_loop_count',
    'average_command_duration_ms',
    'commands_per_second',
    'loops_per_second',
    'attention_rate',
    'skipped_rate',
    'artifact_ref_count',
    'embedded_command_artifact_count',
    'system_artifact_count',
    'content_artifact_count',
    'other_artifact_count',
    'system_artifacts_per_second',
    'persisted_full_receipt_bytes',
    'persisted_latest_receipt_bytes',
  ]) {
    requireNonNegativeNumber(metrics, field, issues, `efficiency_metrics.${field}`);
  }
  const hasScopedEfficiencyMetrics = SCOPED_EFFICIENCY_METRIC_FIELDS.some((field) => hasOwn(metrics, field));
  if (hasScopedEfficiencyMetrics) {
    for (const field of SCOPED_EFFICIENCY_METRIC_FIELDS) {
      requireNonNegativeNumber(metrics, field, issues, `efficiency_metrics.${field}`);
    }
  }
  requireArray(metrics, 'slowest_commands', issues, 'efficiency_metrics.slowest_commands');

  const totals = isObject(receipt.totals) ? receipt.totals : {};
  if (typeof receipt.duration_ms === 'number' && metrics.wall_duration_ms !== receipt.duration_ms) {
    issues.push(issue('efficiency-metrics-mismatch', 'efficiency_metrics.wall_duration_ms must match receipt.duration_ms.'));
  }
  if (typeof totals.commands === 'number' && metrics.command_count !== totals.commands) {
    issues.push(issue('efficiency-metrics-mismatch', 'efficiency_metrics.command_count must match totals.commands.'));
  }
  if (typeof totals.loops === 'number' && metrics.loop_count !== totals.loops) {
    issues.push(issue('efficiency-metrics-mismatch', 'efficiency_metrics.loop_count must match totals.loops.'));
  }
  if (typeof totals.ok === 'number' && metrics.ok_loop_count !== totals.ok) {
    issues.push(issue('efficiency-metrics-mismatch', 'efficiency_metrics.ok_loop_count must match totals.ok.'));
  }
  if (typeof totals.attention === 'number' && metrics.attention_loop_count !== totals.attention) {
    issues.push(issue('efficiency-metrics-mismatch', 'efficiency_metrics.attention_loop_count must match totals.attention.'));
  }
  if (typeof totals.skipped === 'number' && metrics.skipped_loop_count !== totals.skipped) {
    issues.push(issue('efficiency-metrics-mismatch', 'efficiency_metrics.skipped_loop_count must match totals.skipped.'));
  }
  if (Array.isArray(receipt.loops)) {
    const commandDurationMs = receipt.loops
      .flatMap((loop) => (Array.isArray(loop.commands) ? loop.commands : []))
      .reduce((sum, command) => sum + (typeof command.duration_ms === 'number' && command.duration_ms > 0 ? command.duration_ms : 0), 0);
    if (metrics.total_command_duration_ms !== commandDurationMs) {
      issues.push(issue('efficiency-metrics-mismatch', 'efficiency_metrics.total_command_duration_ms must equal the sum of loop command durations.'));
    }
  }
  if (Array.isArray(metrics.slowest_commands)) {
    metrics.slowest_commands.forEach((command, index) => validateSlowestCommand(command, issues, `efficiency_metrics.slowest_commands[${index}]`));
    if (metrics.slowest_commands.length > 5) {
      issues.push(issue('efficiency-metrics-invalid', 'efficiency_metrics.slowest_commands must contain at most five commands.'));
    }
    validateEfficiencySlowestCommands(metrics, receipt, issues);
  }
  validateEfficiencyArtifactCounts(metrics, receipt, issues, hasScopedEfficiencyMetrics);
  validateEfficiencyDerivedMetrics(metrics, receipt, issues, hasScopedEfficiencyMetrics);
}

function validateEfficiencyArtifactCounts(metrics, receipt, issues, hasScopedEfficiencyMetrics) {
  const progress = isObject(receipt.system_progress) ? receipt.system_progress : null;
  if (!progress) return;
  validateMetricCount(metrics, 'system_artifact_count', arrayLength(progress.system_artifacts), issues, 'efficiency_metrics.system_artifact_count must match system_progress.system_artifacts length.');
  validateMetricCount(metrics, 'content_artifact_count', arrayLength(progress.content_artifacts), issues, 'efficiency_metrics.content_artifact_count must match system_progress.content_artifacts length.');
  validateMetricCount(metrics, 'other_artifact_count', arrayLength(progress.other_artifacts), issues, 'efficiency_metrics.other_artifact_count must match system_progress.other_artifacts length.');
  if (!hasScopedEfficiencyMetrics) return;
  if (!hasScopedSystemProgress(progress)) {
    issues.push(issue('efficiency-metrics-mismatch', 'Scoped efficiency metrics require scoped system_progress fields.'));
    return;
  }
  validateMetricCount(metrics, 'agent_system_artifact_count', arrayLength(progress.agent_system_artifacts), issues, 'efficiency_metrics.agent_system_artifact_count must match system_progress.agent_system_artifacts length.');
  validateMetricCount(metrics, 'agent_content_artifact_count', arrayLength(progress.agent_content_artifacts), issues, 'efficiency_metrics.agent_content_artifact_count must match system_progress.agent_content_artifacts length.');
  validateMetricCount(metrics, 'agent_other_artifact_count', arrayLength(progress.agent_other_artifacts), issues, 'efficiency_metrics.agent_other_artifact_count must match system_progress.agent_other_artifacts length.');
  validateMetricCount(metrics, 'preexisting_dirty_count', arrayLength(progress.preexisting_dirty_paths), issues, 'efficiency_metrics.preexisting_dirty_count must match system_progress.preexisting_dirty_paths length.');
}

function validateMetricCount(metrics, field, expected, issues, detail) {
  if (expected == null) return;
  if (typeof metrics[field] === 'number' && metrics[field] !== expected) {
    issues.push(issue('efficiency-metrics-mismatch', detail));
  }
}

function validateEfficiencyDerivedMetrics(metrics, receipt, issues, hasScopedEfficiencyMetrics) {
  validateMetricCount(
    metrics,
    'average_command_duration_ms',
    metrics.command_count ? roundMetric(metrics.total_command_duration_ms / metrics.command_count) : 0,
    issues,
    'efficiency_metrics.average_command_duration_ms must equal rounded total_command_duration_ms divided by command_count.',
  );
  validateMetricCount(
    metrics,
    'commands_per_second',
    metricRate(metrics.command_count, metrics.wall_duration_ms),
    issues,
    'efficiency_metrics.commands_per_second must equal rounded command_count per wall_duration_ms.',
  );
  validateMetricCount(
    metrics,
    'loops_per_second',
    metricRate(metrics.loop_count, metrics.wall_duration_ms),
    issues,
    'efficiency_metrics.loops_per_second must equal rounded loop_count per wall_duration_ms.',
  );
  validateMetricCount(
    metrics,
    'attention_rate',
    metricRatio(metrics.attention_loop_count, metrics.loop_count),
    issues,
    'efficiency_metrics.attention_rate must equal rounded attention_loop_count divided by loop_count.',
  );
  validateMetricCount(
    metrics,
    'skipped_rate',
    metricRatio(metrics.skipped_loop_count, metrics.loop_count),
    issues,
    'efficiency_metrics.skipped_rate must equal rounded skipped_loop_count divided by loop_count.',
  );
  validateMetricCount(
    metrics,
    'system_artifacts_per_second',
    metricRate(metrics.system_artifact_count, metrics.wall_duration_ms),
    issues,
    'efficiency_metrics.system_artifacts_per_second must equal rounded system_artifact_count per wall_duration_ms.',
  );
  if (hasScopedEfficiencyMetrics) {
    validateMetricCount(
      metrics,
      'agent_system_artifacts_per_second',
      metricRate(metrics.agent_system_artifact_count, metrics.wall_duration_ms),
      issues,
      'efficiency_metrics.agent_system_artifacts_per_second must equal rounded agent_system_artifact_count per wall_duration_ms.',
    );
  }
  if (Array.isArray(receipt.artifact_refs)) {
    validateMetricCount(metrics, 'artifact_ref_count', receipt.artifact_refs.length, issues, 'efficiency_metrics.artifact_ref_count must match artifact_refs length.');
    validateMetricCount(
      metrics,
      'embedded_command_artifact_count',
      receipt.artifact_refs.filter((artifact) => isObject(artifact) && artifact.kind === 'loop-command').length,
      issues,
      'efficiency_metrics.embedded_command_artifact_count must match loop-command artifact refs.',
    );
  }
}

function metricRate(count, durationMs) {
  if (!Number.isFinite(count) || !Number.isFinite(durationMs) || durationMs <= 0) return 0;
  return roundMetric((count * 1000) / durationMs);
}

function metricRatio(count, total) {
  if (!Number.isFinite(count) || !Number.isFinite(total) || total <= 0) return 0;
  return roundMetric(count / total);
}

function roundMetric(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.round(value * 1000) / 1000;
}

function medianMetric(values) {
  const numbers = values.filter((value) => Number.isFinite(value)).sort((left, right) => left - right);
  if (!numbers.length) return 0;
  const midpoint = Math.floor(numbers.length / 2);
  return numbers.length % 2 ? numbers[midpoint] : roundMetric((numbers[midpoint - 1] + numbers[midpoint]) / 2);
}

function nonNegativeMetric(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function metricNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? roundMetric(number) : 0;
}

function estimateMetricTokens(bytes) {
  const number = nonNegativeMetric(bytes);
  return number ? Math.ceil(number / 4) : 0;
}

function validateEfficiencySlowestCommands(metrics, receipt, issues) {
  if (!Array.isArray(receipt.loops)) return;
  const expected = receipt.loops
    .flatMap((loop) =>
      Array.isArray(loop.commands)
        ? loop.commands.map((command) => ({
            loop_id: typeof loop.id === 'string' ? loop.id : '',
            label: isObject(command) && typeof command.label === 'string' ? command.label : '',
            status: isObject(command) && typeof command.status === 'string' ? command.status : '',
            duration_ms: isObject(command) && typeof command.duration_ms === 'number' && command.duration_ms > 0 ? command.duration_ms : 0,
          }))
        : [],
    )
    .sort((left, right) => right.duration_ms - left.duration_ms || String(left.label || '').localeCompare(String(right.label || '')))
    .slice(0, 5);
  if (metrics.slowest_commands.length !== expected.length) {
    issues.push(issue('efficiency-metrics-mismatch', 'efficiency_metrics.slowest_commands must contain the top receipt commands by duration.'));
    return;
  }
  expected.forEach((expectedCommand, index) => {
    const actual = isObject(metrics.slowest_commands[index]) ? metrics.slowest_commands[index] : {};
    for (const field of ['loop_id', 'label', 'status', 'duration_ms']) {
      if (actual[field] !== expectedCommand[field]) {
        issues.push(issue('efficiency-metrics-mismatch', `efficiency_metrics.slowest_commands[${index}].${field} must match the receipt command ranked by duration.`));
      }
    }
  });
}

function validateSlowestCommand(command, issues, path) {
  if (!isObject(command)) {
    issues.push(issue('efficiency-metrics-invalid', `${path} must be an object.`));
    return;
  }
  requireString(command, 'loop_id', issues, { path: `${path}.loop_id` });
  requireString(command, 'label', issues, { path: `${path}.label` });
  requireString(command, 'status', issues, { path: `${path}.status`, values: ['ok', 'attention', 'skipped'] });
  requireNonNegativeNumber(command, 'duration_ms', issues, `${path}.duration_ms`);
}

function validateSystemProgress(progress, receipt, issues, options = {}) {
  const enforce = options.enforce === true;
  if (!isObject(progress)) {
    issues.push(issue('system-progress-invalid', 'system_progress must be an object.'));
    return;
  }
  requireBoolean(progress, 'ok', issues, 'system_progress.ok');
  requireString(progress, 'mode', issues, { path: 'system_progress.mode' });
  requireString(progress, 'command', issues, { path: 'system_progress.command' });
  requireNonNegativeNumber(progress, 'exit_code', issues, 'system_progress.exit_code');
  requireBoolean(progress, 'require_system_artifact', issues, 'system_progress.require_system_artifact');
  requireArray(progress, 'changed_paths', issues, 'system_progress.changed_paths');
  requireArray(progress, 'system_artifacts', issues, 'system_progress.system_artifacts');
  requireArray(progress, 'content_artifacts', issues, 'system_progress.content_artifacts');
  requireArray(progress, 'other_artifacts', issues, 'system_progress.other_artifacts');
  requireBoolean(progress, 'has_system_artifact', issues, 'system_progress.has_system_artifact');
  requireBoolean(progress, 'content_only', issues, 'system_progress.content_only');

  const hasScopedFields = hasScopedSystemProgress(progress);
  if (hasScopedFields) validateScopedSystemProgress(progress, issues);

  if (enforce && progress.require_system_artifact !== true) {
    issues.push(issue('system-progress-not-enforced', 'system_progress.require_system_artifact must be true when --require-system-progress is used.'));
  }
  if (receipt.ok === true && enforce && progress.has_system_artifact !== true) {
    issues.push(issue('system-progress-no-system-artifact', 'Passing enforced loop receipt must include at least one system artifact.'));
  }
  if (receipt.ok === true && enforce && progress.content_only === true) {
    issues.push(issue('system-progress-content-only', 'Passing enforced loop receipt cannot be content_only.'));
  }
  if (receipt.ok === true && enforce && hasScopedFields && progress.has_agent_system_artifact !== true) {
    issues.push(issue('system-progress-no-agent-system-artifact', 'Passing enforced loop receipt with scoped system_progress must include at least one current-agent system artifact.'));
  }
  if (receipt.ok === true && enforce && hasScopedFields && progress.agent_content_only === true) {
    issues.push(issue('system-progress-agent-content-only', 'Passing enforced loop receipt with scoped system_progress cannot be agent_content_only.'));
  }
}

function hasScopedSystemProgress(progress) {
  return SCOPED_SYSTEM_PROGRESS_FIELDS.some((field) => hasOwn(progress, field));
}

function validateScopedSystemProgress(progress, issues) {
  for (const field of SCOPED_SYSTEM_PROGRESS_ARRAY_FIELDS) {
    requireStringArray(progress, field, issues, `system_progress.${field}`);
  }
  for (const field of SCOPED_SYSTEM_PROGRESS_BOOLEAN_FIELDS) {
    requireBoolean(progress, field, issues, `system_progress.${field}`);
  }

  const arrays = Object.fromEntries(SCOPED_SYSTEM_PROGRESS_ARRAY_FIELDS.map((field) => [field, stringArray(progress, field)]));
  if (Object.values(arrays).some((value) => value == null)) return;
  if (SCOPED_SYSTEM_PROGRESS_BOOLEAN_FIELDS.some((field) => typeof progress[field] !== 'boolean')) return;
  const legacyChangedPaths = stringArray(progress, 'changed_paths');
  if (!legacyChangedPaths) return;

  for (const field of SCOPED_SYSTEM_PROGRESS_ARRAY_FIELDS) {
    if (hasDuplicates(arrays[field])) {
      issues.push(issue('system-progress-scoped-invalid', `system_progress.${field} must not contain duplicate paths.`));
    }
  }

  const observed = arrays.observed_dirty_before_agent;
  const missing = arrays.missing_observed_dirty_paths;
  const agentChanged = arrays.agent_changed_paths;
  const agentSystem = arrays.agent_system_artifacts;
  const agentContent = arrays.agent_content_artifacts;
  const agentOther = arrays.agent_other_artifacts;
  const preexistingDirty = arrays.preexisting_dirty_paths;
  const preexistingSystem = arrays.preexisting_system_artifacts;
  const preexistingContent = arrays.preexisting_content_artifacts;
  const preexistingOther = arrays.preexisting_other_artifacts;

  if (progress.has_observed_dirty_baseline !== (observed.length > 0)) {
    issues.push(issue('system-progress-scoped-mismatch', 'system_progress.has_observed_dirty_baseline must match observed_dirty_before_agent length.'));
  }
  if (progress.has_agent_system_artifact !== (agentSystem.length > 0)) {
    issues.push(issue('system-progress-scoped-mismatch', 'system_progress.has_agent_system_artifact must match agent_system_artifacts length.'));
  }
  const expectedAgentContentOnly = agentChanged.length > 0 && agentSystem.length === 0 && agentContent.length > 0;
  if (progress.agent_content_only !== expectedAgentContentOnly) {
    issues.push(issue('system-progress-scoped-mismatch', 'system_progress.agent_content_only must match current-agent changed path classification.'));
  }
  if (intersection(agentChanged, preexistingDirty).length > 0) {
    issues.push(issue('system-progress-scoped-mismatch', 'system_progress.agent_changed_paths and preexisting_dirty_paths must not overlap.'));
  }
  if (!sameMembers(legacyChangedPaths, agentChanged.concat(preexistingDirty))) {
    issues.push(issue('system-progress-scoped-mismatch', 'system_progress.changed_paths must equal agent_changed_paths plus preexisting_dirty_paths.'));
  }
  if (!sameMembers(agentChanged, agentSystem.concat(agentContent, agentOther))) {
    issues.push(issue('system-progress-scoped-mismatch', 'system_progress.agent_changed_paths must equal agent_system_artifacts plus agent_content_artifacts plus agent_other_artifacts.'));
  }
  if (!sameMembers(preexistingDirty, preexistingSystem.concat(preexistingContent, preexistingOther))) {
    issues.push(issue('system-progress-scoped-mismatch', 'system_progress.preexisting_dirty_paths must equal preexisting_system_artifacts plus preexisting_content_artifacts plus preexisting_other_artifacts.'));
  }
  if (!isSubset(preexistingDirty, observed)) {
    issues.push(issue('system-progress-scoped-mismatch', 'system_progress.preexisting_dirty_paths must be a subset of observed_dirty_before_agent.'));
  }
  if (!isSubset(missing, observed)) {
    issues.push(issue('system-progress-scoped-mismatch', 'system_progress.missing_observed_dirty_paths must be a subset of observed_dirty_before_agent.'));
  }
  if (intersection(missing, legacyChangedPaths).length > 0) {
    issues.push(issue('system-progress-scoped-mismatch', 'system_progress.missing_observed_dirty_paths must not include changed paths.'));
  }
  if (!sameMembers(observed, preexistingDirty.concat(missing))) {
    issues.push(issue('system-progress-scoped-mismatch', 'system_progress.observed_dirty_before_agent must equal preexisting_dirty_paths plus missing_observed_dirty_paths.'));
  }
}

function validateRunnerReceipt(value, issues) {
  requireString(value, 'workflow', issues, { values: ['tool-refresh', 'page-refresh'] });
  requireString(value, 'status', issues, { values: ['passed', 'failed'] });
  requireIsoString(value, 'generated_at', issues);
  requireNonNegativeNumber(value, 'elapsed_ms', issues);
  requireString(value, 'plan', issues);
  requireString(value, 'markdown_receipt', issues);
  requireArray(value, 'changed_routes', issues);
  requireArray(value, 'source_ids', issues);
  requireArray(value, 'widths', issues);
  requireArray(value, 'commands', issues);
  requireArray(value, 'superseded_failures', issues);
  validateCloseoutIdentity(value, issues);
  validateTraceArtifacts(value, issues);
  validateDagArtifactRefs(value, issues);

  if (value.workflow === 'tool-refresh') {
    requireString(value, 'route_args', issues);
  }
  if (value.workflow === 'page-refresh') {
    requireIsoDateString(value, 'current_date', issues);
    requireString(value, 'report_dir', issues);
    requireString(value, 'report_summary', issues);
  }
  if (Array.isArray(value.commands) && value.commands.length === 0) {
    issues.push(issue('runner-commands-empty', 'Runner closeout receipt must include at least one command.'));
  }
  if (Array.isArray(value.commands)) {
    value.commands.forEach((command, index) => validateRunnerCommand(command, issues, `commands[${index}]`));
  }
  validateRunnerInterruptedPauseLink(value, issues);
  if (value.system_progress != null) {
    validateSystemProgress(value.system_progress, { ok: value.status === 'passed' }, issues);
  }
  if (value.input_freshness != null) {
    validateInputFreshness(value.input_freshness, value, issues);
  }
  if (REQUIRE_WORKFLOW_POLICY) validateRunnerWorkflowPolicy(value, issues);
}

function validateRunnerCommand(command, issues, path) {
  if (!isObject(command)) {
    issues.push(issue('runner-command-invalid', `${path} must be an object.`));
    return;
  }
  requireString(command, 'label', issues, { path: `${path}.label` });
  if (!(typeof command.status === 'number' || command.status === null)) {
    issues.push(issue('runner-command-status-invalid', `${path}.status must be a number or null.`));
  }
  if (command.interrupted != null && typeof command.interrupted !== 'boolean') {
    issues.push(issue('runner-command-interrupted-invalid', `${path}.interrupted must be a boolean when present.`));
  }
  requireNonNegativeNumber(command, 'elapsed_ms', issues, `${path}.elapsed_ms`);
}

function validateRunnerInterruptedPauseLink(receipt, issues) {
  const commands = Array.isArray(receipt.commands) ? receipt.commands : [];
  const hasInterruptedCommand = commands.some((command) => isObject(command) && command.interrupted === true);
  if (!hasInterruptedCommand) return;

  if (typeof receipt.interrupted_pause_receipt !== 'string' || !receipt.interrupted_pause_receipt.trim()) {
    issues.push(issue('runner-interrupted-pause-receipt-missing', 'Runner closeout receipts with interrupted commands must include interrupted_pause_receipt.'));
    return;
  }

  const artifactRefs = Array.isArray(receipt.artifact_refs) ? receipt.artifact_refs : [];
  const hasPauseArtifact = artifactRefs.some((artifact) => (
    isObject(artifact)
    && artifact.role === 'output'
    && artifact.kind === 'interrupted-pause-receipt'
    && artifact.path === receipt.interrupted_pause_receipt
  ));
  if (!hasPauseArtifact) {
    issues.push(issue('runner-interrupted-pause-artifact-missing', 'Runner closeout receipts with interrupted commands must include an output interrupted-pause-receipt artifact_ref matching interrupted_pause_receipt.'));
  }
}

function validateRunnerInterruptProof(value, issues) {
  requireBoolean(value, 'ok', issues);
  requireString(value, 'mode', issues, { values: ['runner-interrupt-proof'] });
  requireString(value, 'schema_version', issues, {
    path: 'schema_version',
    values: ['aipedia.runner-interrupt-proof.v1'],
  });
  requireString(value, 'project_dir', issues);
  requireString(value, 'work_dir', issues);
  requireString(value, 'proof_dir', issues);
  requireString(value, 'proof_prefix', issues);
  requireIsoDateString(value, 'current_date', issues);
  requireObject(value, 'fixture', issues);
  requireObject(value, 'runner', issues);
  requireObject(value, 'artifacts', issues);
  requireObject(value, 'assertions', issues);
  requireArray(value, 'validations', issues);
  requireArray(value, 'issues', issues);
  requireString(value, 'goal_id', issues);
  requireString(value, 'run_id', issues);
  requireStringArray(value, 'next_actions', issues);
  if (value.residual_risks != null || REQUIRE_CLOSEOUT_IDENTITY) {
    requireStringArray(value, 'residual_risks', issues);
  }
  validateTraceArtifacts(value, issues);

  if (value.ok !== true) {
    issues.push(issue('runner-proof-not-ok', 'Runner interrupt proof report must be ok.'));
  }
  if (Array.isArray(value.issues) && value.issues.length !== 0) {
    issues.push(issue('runner-proof-issues-not-empty', 'Passing runner interrupt proof reports must have no embedded issues.'));
  }

  if (isObject(value.fixture)) {
    for (const field of ['package_json', 'plan', 'route_args', 'receipt_dir', 'ledger_script']) {
      requireString(value.fixture, field, issues, `fixture.${field}`);
    }
  }
  if (isObject(value.runner)) validateRunnerProofRunner(value.runner, issues);
  if (isObject(value.artifacts)) validateRunnerProofArtifacts(value, issues);
  if (isObject(value.assertions)) validateRunnerProofAssertions(value.assertions, issues);
  if (Array.isArray(value.validations)) validateRunnerProofValidations(value, issues);
}

function validateRunnerProofRunner(runner, issues) {
  requireNonNegativeNumber(runner, 'status', issues, 'runner.status');
  requireBoolean(runner, 'expected_nonzero', issues, 'runner.expected_nonzero');
  if (runner.signal != null && typeof runner.signal !== 'string') {
    issues.push(issue('field-invalid', 'runner.signal must be a string when present.'));
  }
  if (runner.stdout_tail != null && typeof runner.stdout_tail !== 'string') {
    issues.push(issue('field-invalid', 'runner.stdout_tail must be a string when present.'));
  }
  if (runner.stderr_tail != null && typeof runner.stderr_tail !== 'string') {
    issues.push(issue('field-invalid', 'runner.stderr_tail must be a string when present.'));
  }
  if (runner.expected_nonzero !== true) {
    issues.push(issue('runner-proof-expected-nonzero-invalid', 'Runner interrupt proof must expect the interrupted closeout to exit non-zero.'));
  }
  if (typeof runner.status === 'number' && runner.status === 0) {
    issues.push(issue('runner-proof-closeout-success', 'Runner interrupt proof must record a non-zero interrupted closeout status.'));
  }
}

function validateRunnerProofArtifacts(value, issues) {
  for (const field of [
    'pause_receipt',
    'closeout_receipt',
    'copied_pause_receipt',
    'copied_closeout_receipt',
    'proof_report',
  ]) {
    requireString(value.artifacts, field, issues, `artifacts.${field}`);
  }
  if (value.report_path != null) {
    requireString(value, 'report_path', issues);
    if (typeof value.report_path === 'string' && value.report_path !== value.artifacts.proof_report) {
      issues.push(issue('runner-proof-report-path-mismatch', 'report_path must match artifacts.proof_report.'));
    }
  }
  if (!REQUIRE_TRACE_ARTIFACTS && value.artifact_refs == null) return;
  const artifactRefs = Array.isArray(value.artifact_refs) ? value.artifact_refs : [];
  for (const [kind, path] of [
    ['interrupted-pause-receipt', value.artifacts.copied_pause_receipt],
    ['interrupted-closeout-receipt', value.artifacts.copied_closeout_receipt],
    ['runner-interrupt-proof-report', value.artifacts.proof_report],
  ]) {
    if (typeof path === 'string' && path.trim() && !artifactRefs.some((artifact) => (
      isObject(artifact)
      && artifact.role === 'output'
      && artifact.kind === kind
      && artifact.path === path
    ))) {
      issues.push(issue('runner-proof-artifact-ref-missing', `Runner interrupt proof must include an output/${kind} artifact_ref for ${path}.`));
    }
  }
}

function validateRunnerProofAssertions(assertions, issues) {
  for (const field of [
    'closeout_failed',
    'interrupted_command_recorded',
    'interrupted_pause_receipt_linked',
    'interrupted_pause_artifact_linked',
  ]) {
    requireBoolean(assertions, field, issues, `assertions.${field}`);
    if (assertions[field] !== true) {
      issues.push(issue('runner-proof-assertion-failed', `Runner interrupt proof assertion ${field} must be true.`));
    }
  }
}

function validateRunnerProofValidations(value, issues) {
  if (value.validations.length < 2) {
    issues.push(issue('runner-proof-validations-missing', 'Runner interrupt proof must include receipt validations for copied pause and closeout receipts.'));
  }
  const labels = value.validations
    .map((validation) => (isObject(validation) && typeof validation.label === 'string' ? validation.label : ''))
    .filter(Boolean);
  for (const [label, path] of [
    ['copied pause receipt', value.artifacts?.copied_pause_receipt],
    ['copied closeout receipt', value.artifacts?.copied_closeout_receipt],
  ]) {
    if (typeof path === 'string' && path.trim() && !labels.includes(path)) {
      issues.push(issue('runner-proof-validation-missing', `Runner interrupt proof must include validation for ${label}: ${path}.`));
    }
  }
  value.validations.forEach((validation, index) => {
    const path = `validations[${index}]`;
    if (!isObject(validation)) {
      issues.push(issue('runner-proof-validation-invalid', `${path} must be an object.`));
      return;
    }
    requireString(validation, 'label', issues, { path: `${path}.label` });
    requireNonNegativeNumber(validation, 'status', issues, `${path}.status`);
    requireBoolean(validation, 'ok', issues, `${path}.ok`);
    if (validation.stdout_tail != null && typeof validation.stdout_tail !== 'string') {
      issues.push(issue('runner-proof-validation-invalid', `${path}.stdout_tail must be a string when present.`));
    }
    if (validation.stderr_tail != null && typeof validation.stderr_tail !== 'string') {
      issues.push(issue('runner-proof-validation-invalid', `${path}.stderr_tail must be a string when present.`));
    }
    if (validation.status !== 0 || validation.ok !== true) {
      issues.push(issue('runner-proof-validation-failed', `${path} must be an ok receipt validation with status 0.`));
    }
  });
}

function validateInputFreshness(freshness, receipt, issues) {
  if (!isObject(freshness)) {
    issues.push(issue('input-freshness-invalid', 'input_freshness must be an object.'));
    return;
  }
  requireBoolean(freshness, 'ok', issues, 'input_freshness.ok');
  requireString(freshness, 'mode', issues, { path: 'input_freshness.mode', values: ['input-freshness-receipt'] });
  requireString(freshness, 'schema_version', issues, {
    path: 'input_freshness.schema_version',
    values: ['aipedia.input-freshness-receipt.v1'],
  });
  requireString(freshness, 'project_dir', issues, { path: 'input_freshness.project_dir' });
  requireString(freshness, 'command', issues, { path: 'input_freshness.command' });
  requireNonNegativeNumber(freshness, 'exit_code', issues, 'input_freshness.exit_code');
  requireArray(freshness, 'workflows', issues, 'input_freshness.workflows');
  requireObject(freshness, 'summary', issues, 'input_freshness.summary');
  requireArray(freshness, 'next_actions', issues, 'input_freshness.next_actions');

  if (Array.isArray(freshness.workflows)) {
    if (!freshness.workflows.some((workflow) => isObject(workflow) && workflow.id === receipt.workflow)) {
      issues.push(issue('input-freshness-workflow-missing', `input_freshness.workflows must include ${receipt.workflow}.`));
    }
    freshness.workflows.forEach((workflow, index) => validateInputFreshnessWorkflow(workflow, issues, `input_freshness.workflows[${index}]`));
  }

  if (isObject(freshness.summary)) {
    for (const field of ['workflow_count', 'ok_count', 'attention_count', 'stale_count']) {
      requireNonNegativeNumber(freshness.summary, field, issues, `input_freshness.summary.${field}`);
    }
    if (Array.isArray(freshness.workflows) && freshness.summary.workflow_count !== freshness.workflows.length) {
      issues.push(issue('input-freshness-total-mismatch', `input_freshness.summary.workflow_count is ${freshness.summary.workflow_count} but workflows has ${freshness.workflows.length} item(s).`));
    }
  }
}

function validateInputFreshnessWorkflow(workflow, issues, path) {
  if (!isObject(workflow)) {
    issues.push(issue('input-freshness-workflow-invalid', `${path} must be an object.`));
    return;
  }
  requireString(workflow, 'id', issues, { path: `${path}.id` });
  requireString(workflow, 'kind', issues, { path: `${path}.kind` });
  requireBoolean(workflow, 'ok', issues, `${path}.ok`);
  requireString(workflow, 'status', issues, { path: `${path}.status` });
  if (workflow.next_action != null && typeof workflow.next_action !== 'string') {
    issues.push(issue('input-freshness-workflow-invalid', `${path}.next_action must be a string when present.`));
  }
}

function validateRunnerWorkflowPolicy(receipt, issues) {
  const policy = RUNNER_WORKFLOW_POLICIES[receipt.workflow];
  if (!policy) {
    issues.push(issue('runner-workflow-policy-unknown', `No workflow policy is defined for ${receipt.workflow}.`));
    return;
  }

  for (const field of policy.required_fields) {
    if (typeof receipt[field] !== 'string' || !receipt[field].trim()) {
      issues.push(issue('runner-workflow-policy-field-missing', `${receipt.workflow} policy requires ${field}.`));
    }
  }

  if (!isObject(receipt.system_progress)) {
    issues.push(issue('runner-workflow-policy-system-progress-missing', `${receipt.workflow} policy requires embedded system_progress.`));
  }
  if (isObject(receipt.trace) && receipt.trace.name !== receipt.workflow) {
    issues.push(issue('runner-workflow-policy-trace-mismatch', `${receipt.workflow} policy requires trace.name to match workflow.`));
  }
  validatePolicyInputFreshness(receipt, issues);
  validatePolicyCommands(receipt, policy, issues);
  validatePolicyArtifacts(receipt, policy, issues);

  if (receipt.status === 'passed') {
    if (!Array.isArray(receipt.changed_routes) || receipt.changed_routes.length === 0) {
      issues.push(issue('runner-workflow-policy-routes-empty', `${receipt.workflow} passed receipts require changed_routes.`));
    }
    if (!Array.isArray(receipt.widths) || !requiredRouteWidths().every((width) => receipt.widths.includes(width))) {
      issues.push(issue('runner-workflow-policy-widths-missing', `${receipt.workflow} policy requires the standard route QA widths.`));
    }
  }
}

function validateAffiliateHandoffReceipt(value, issues) {
  requireString(value, 'workflow', issues, { values: ['affiliate-conversion-handoff'] });
  requireString(value, 'status', issues, { values: ['ready'] });
  requireIsoString(value, 'generated_at', issues);
  requireIsoDateString(value, 'current_date', issues);
  requireString(value, 'plan', issues);
  requireString(value, 'report_summary', issues);
  requireString(value, 'markdown_handoff', issues);
  for (const field of [
    'selected_cluster_count',
    'expected_worker_reports',
    'parsed_worker_reports',
    'strict_validation_issue_count',
    'claim_receipt_count',
    'source_url_count',
    'commercial_cta_note_count',
    'duplicate_intent_note_count',
    'parent_surface_note_count',
    'blocked_or_deferred_count',
    'pending_count',
    'non_passed_check_count',
  ]) {
    requireNonNegativeNumber(value, field, issues);
  }
  for (const field of [
    'selected_clusters',
    'missing_worker_reports',
    'invalid_worker_reports',
    'route_qa_routes',
    'parent_surfaces',
    'verification_gates',
    'no_edit_boundaries',
    'residual_risks',
  ]) {
    requireArray(value, field, issues);
  }

  if (Array.isArray(value.selected_clusters)) {
    value.selected_clusters.forEach((cluster, index) => validateAffiliateSelectedCluster(cluster, issues, `selected_clusters[${index}]`));
    if (typeof value.selected_cluster_count === 'number' && value.selected_cluster_count !== value.selected_clusters.length) {
      issues.push(issue('affiliate-handoff-total-mismatch', `selected_cluster_count is ${value.selected_cluster_count} but selected_clusters has ${value.selected_clusters.length} item(s).`));
    }
  }

  if (REQUIRE_WORKFLOW_POLICY) validateAffiliateHandoffPolicy(value, issues);
}

function validatePauseReceipt(value, issues) {
  requireString(value, 'schema_version', issues, {
    path: 'schema_version',
    values: ['aipedia.pause-receipt.v1'],
  });
  requireString(value, 'goal_id', issues);
  requireString(value, 'run_id', issues);
  requireIsoString(value, 'paused_at', issues);
  requireString(value, 'pause_reason', issues, { values: ['user', 'time', 'blocked', 'handoff'] });
  requireString(value, 'latest_safe_resume_step', issues);
  requireString(value, 'in_progress_step', issues);
  requireIsoDateString(value, 'source_cutoff', issues);
  for (const field of [
    'dirty_tree_summary',
    'files_touched_by_agent',
    'files_observed_dirty_before_agent',
    'open_questions',
    'blocked_on',
    'must_not_repeat',
    'next_commands',
    'validation_done',
    'validation_pending',
  ]) {
    requireStringArray(value, field, issues);
  }
  requireArray(value, 'child_workers', issues);
  validateTraceArtifacts(value, issues);
}

function validateAffiliateSelectedCluster(cluster, issues, path) {
  if (!isObject(cluster)) {
    issues.push(issue('affiliate-handoff-cluster-invalid', `${path} must be an object.`));
    return;
  }
  for (const field of ['id', 'primary_tool', 'worker_id', 'buyer_job', 'source_file']) {
    requireString(cluster, field, issues, { path: `${path}.${field}` });
  }
  for (const field of [
    'claim_receipt_count',
    'source_url_count',
    'commercial_cta_note_count',
    'parent_surface_note_count',
    'duplicate_intent_note_count',
    'route_qa_risk_count',
    'check_count',
  ]) {
    requireNonNegativeNumber(cluster, field, issues, `${path}.${field}`);
  }
}

function validateAffiliateHandoffPolicy(value, issues) {
  if (value.selected_cluster_count === 0) {
    issues.push(issue('affiliate-handoff-policy-empty', 'Affiliate handoff policy requires at least one selected implementation cluster.'));
  }
  for (const [field, label] of [
    ['claim_receipt_count', 'claim receipts'],
    ['source_url_count', 'source URLs'],
    ['commercial_cta_note_count', 'commercial CTA notes'],
    ['duplicate_intent_note_count', 'duplicate intent notes'],
    ['parent_surface_note_count', 'parent surface notes'],
  ]) {
    if (value[field] === 0) {
      issues.push(issue('affiliate-handoff-policy-evidence-missing', `Affiliate handoff policy requires ${label}.`));
    }
  }
  if (value.strict_validation_issue_count !== 0) {
    issues.push(issue('affiliate-handoff-policy-validation-issues', 'Affiliate handoff policy requires strict_validation_issue_count to be 0.'));
  }
  if (!Array.isArray(value.missing_worker_reports) || value.missing_worker_reports.length !== 0) {
    issues.push(issue('affiliate-handoff-policy-missing-reports', 'Affiliate handoff policy requires no missing worker reports.'));
  }
  if (!Array.isArray(value.invalid_worker_reports) || value.invalid_worker_reports.length !== 0) {
    issues.push(issue('affiliate-handoff-policy-invalid-reports', 'Affiliate handoff policy requires no invalid worker reports.'));
  }
  if (value.non_passed_check_count !== 0) {
    issues.push(issue('affiliate-handoff-policy-non-passed-checks', 'Affiliate handoff policy requires every selected worker check to pass.'));
  }
  if (!Array.isArray(value.route_qa_routes) || value.route_qa_routes.length === 0) {
    issues.push(issue('affiliate-handoff-policy-route-qa-empty', 'Affiliate handoff policy requires route_qa_routes.'));
  }
  if (!Array.isArray(value.parent_surfaces) || value.parent_surfaces.length === 0) {
    issues.push(issue('affiliate-handoff-policy-parent-surfaces-empty', 'Affiliate handoff policy requires parent_surfaces.'));
  }

  const gateStrings = arrayStrings(value.verification_gates);
  for (const required of [
    'runner:affiliate-conversion:reports -- --strict',
    'affiliate:conversion:inventory',
    'ledger:pages',
    'typecheck',
    'build:fast',
    'CommercialCTA',
    'live source',
  ]) {
    if (!gateStrings.some((gate) => gate.includes(required))) {
      issues.push(issue('affiliate-handoff-policy-gate-missing', `Affiliate handoff policy requires verification gate containing ${required}.`));
    }
  }

  const boundaryText = arrayStrings(value.no_edit_boundaries).join('\n');
  for (const required of ['PAGE_REFRESH_LEDGER.md', 'src/data/source-registry.json', 'integrator owns']) {
    if (!boundaryText.includes(required)) {
      issues.push(issue('affiliate-handoff-policy-boundary-missing', `Affiliate handoff policy requires no-edit boundary containing ${required}.`));
    }
  }
}

function validateMetaProofReadinessReceipt(value, issues) {
  requireBoolean(value, 'ok', issues);
  requireString(value, 'mode', issues, { values: ['meta-proof-readiness'] });
  requireString(value, 'schema_version', issues, {
    values: ['aipedia.meta-proof-readiness.v1'],
  });
  requireIsoString(value, 'generated_at', issues);
  requireString(value, 'project_dir', issues);
  requireArray(value, 'argument_issues', issues);
  requireStringArray(value, 'selected_targets', issues);
  requireObject(value, 'summary', issues);
  requireObject(value, 'inputs', issues);
  requireArray(value, 'targets', issues);
  requireStringArray(value, 'next_actions', issues);
  if (value.receipt_path != null) requireString(value, 'receipt_path', issues);

  if (isObject(value.summary)) {
    for (const field of ['target_count', 'ready_count', 'proved_count', 'blocked_count', 'unknown_count']) {
      requireNonNegativeNumber(value.summary, field, issues, `summary.${field}`);
    }
  }
  if (isObject(value.inputs)) {
    requireString(value.inputs, 'input_freshness_source', issues, { path: 'inputs.input_freshness_source' });
    requireNonNegativeNumber(value.inputs, 'input_freshness_exit_code', issues, 'inputs.input_freshness_exit_code');
    requireString(value.inputs, 'git_status_source', issues, { path: 'inputs.git_status_source' });
    requireNonNegativeNumber(value.inputs, 'git_status_exit_code', issues, 'inputs.git_status_exit_code');
    if (value.inputs.proof_target_registry_source != null) {
      requireString(value.inputs, 'proof_target_registry_source', issues, { path: 'inputs.proof_target_registry_source' });
    }
    if (value.inputs.proof_target_registry_status != null) {
      requireString(value.inputs, 'proof_target_registry_status', issues, {
        path: 'inputs.proof_target_registry_status',
        values: ['absent', 'loaded', 'missing', 'invalid'],
      });
    }
    if (value.inputs.proof_target_registry_issue_count != null) {
      requireNonNegativeNumber(value.inputs, 'proof_target_registry_issue_count', issues, 'inputs.proof_target_registry_issue_count');
    }
    if (value.inputs.observed_dirty_before_agent != null) {
      requireStringArray(value.inputs, 'observed_dirty_before_agent', issues, 'inputs.observed_dirty_before_agent');
    }
    if (value.inputs.allow_observed_dirty_boundary != null) {
      requireBoolean(value.inputs, 'allow_observed_dirty_boundary', issues, 'inputs.allow_observed_dirty_boundary');
    }
    validateMetaProofReadinessRefreshPlanInputs(value.inputs, issues);
  }

  if (Array.isArray(value.targets)) {
    value.targets.forEach((target, index) => validateMetaProofReadinessTarget(target, issues, `targets[${index}]`));
    if (isObject(value.summary)) {
      const counts = {
        target_count: value.targets.length,
        ready_count: value.targets.filter((target) => isObject(target) && target.status === 'ready').length,
        proved_count: value.targets.filter((target) => isObject(target) && target.status === 'proved').length,
        blocked_count: value.targets.filter((target) => isObject(target) && target.status === 'blocked').length,
        unknown_count: value.targets.filter((target) => isObject(target) && target.status === 'unknown').length,
      };
      for (const [field, expected] of Object.entries(counts)) {
        if (typeof value.summary[field] === 'number' && value.summary[field] !== expected) {
          issues.push(issue('meta-proof-readiness-summary-mismatch', `summary.${field} is ${value.summary[field]} but targets imply ${expected}.`));
        }
      }
    }
    validateMetaProofReadinessRefreshPlanSummary(value, issues);
  }
}

function validateMetaProofReadinessRefreshPlanInputs(inputs, issues) {
  const fields = ['input_refresh_plan_source', 'input_refresh_plan_exit_code', 'input_refresh_plan_status', 'input_refresh_plan_count'];
  const present = fields.filter((field) => inputs[field] != null);
  if (!present.length) return;
  if (present.length !== fields.length) {
    issues.push(issue('meta-proof-readiness-refresh-plan-inputs-partial', `inputs refresh-plan fields must be all present or all omitted; found ${present.join(', ')}.`));
  }
  requireString(inputs, 'input_refresh_plan_source', issues, { path: 'inputs.input_refresh_plan_source' });
  requireNonNegativeNumber(inputs, 'input_refresh_plan_exit_code', issues, 'inputs.input_refresh_plan_exit_code');
  requireString(inputs, 'input_refresh_plan_status', issues, {
    path: 'inputs.input_refresh_plan_status',
    values: ['skipped', 'from-input-freshness', 'missing-refresh-plan', 'planned', 'failed'],
  });
  requireNonNegativeNumber(inputs, 'input_refresh_plan_count', issues, 'inputs.input_refresh_plan_count');
  const status = inputs.input_refresh_plan_status;
  const count = inputs.input_refresh_plan_count;
  if (['skipped', 'missing-refresh-plan'].includes(status) && count !== 0) {
    issues.push(issue('meta-proof-readiness-refresh-plan-status-count-mismatch', `inputs.input_refresh_plan_status is ${status} but input_refresh_plan_count is not 0.`));
  }
  if (['from-input-freshness', 'planned'].includes(status) && count === 0) {
    issues.push(issue('meta-proof-readiness-refresh-plan-status-count-mismatch', `inputs.input_refresh_plan_status is ${status} but input_refresh_plan_count is 0.`));
  }
}

function validateMetaProofReadinessRefreshPlanSummary(value, issues) {
  const expectedCount = value.inputs?.input_refresh_plan_count;
  if (typeof expectedCount !== 'number') return;
  const planIds = new Set();
  for (const target of value.targets || []) {
    if (!isObject(target)) continue;
    for (const blockerValue of target.blockers || []) {
      if (isObject(blockerValue?.input_refresh_plan) && typeof blockerValue.input_refresh_plan.id === 'string') {
        planIds.add(blockerValue.input_refresh_plan.id);
      }
    }
    for (const check of target.readiness_checks || []) {
      if (isObject(check?.input_refresh_plan) && typeof check.input_refresh_plan.id === 'string') {
        planIds.add(check.input_refresh_plan.id);
      }
    }
  }
  if (planIds.size !== expectedCount) {
    issues.push(issue('meta-proof-readiness-refresh-plan-count-mismatch', `inputs.input_refresh_plan_count is ${expectedCount} but receipt embeds ${planIds.size} unique input_refresh_plan id(s).`));
  }
}

function validateMetaProofReadinessTarget(target, issues, path) {
  if (!isObject(target)) {
    issues.push(issue('meta-proof-readiness-target-invalid', `${path} must be an object.`));
    return;
  }
  requireBoolean(target, 'ok', issues, `${path}.ok`);
  requireString(target, 'id', issues, { path: `${path}.id` });
  requireString(target, 'status', issues, {
    path: `${path}.status`,
    values: ['ready', 'proved', 'blocked', 'unknown'],
  });
  if (target.workflow != null && typeof target.workflow !== 'string') {
    issues.push(issue('field-invalid', `${path}.workflow must be a string when present.`));
  }
  if (target.proof_goal != null && typeof target.proof_goal !== 'string') {
    issues.push(issue('field-invalid', `${path}.proof_goal must be a string when present.`));
  }
  requireArray(target, 'blockers', issues, `${path}.blockers`);
  if (Array.isArray(target.blockers)) {
    target.blockers.forEach((blockerValue, index) => validateMetaProofReadinessBlocker(blockerValue, issues, `${path}.blockers[${index}]`));
  }
  requireArray(target, 'readiness_checks', issues, `${path}.readiness_checks`);
  if (Array.isArray(target.readiness_checks)) {
    target.readiness_checks.forEach((check, index) => validateMetaProofReadinessCheck(check, issues, `${path}.readiness_checks[${index}]`));
  }
  requireStringArray(target, 'recommended_commands', issues, `${path}.recommended_commands`);
  requireStringArray(target, 'next_actions', issues, `${path}.next_actions`);
  if (isObject(target.proof_completion)) {
    validateMetaProofCompletion(target.proof_completion, issues, `${path}.proof_completion`);
  } else if (target.proof_completion != null) {
    issues.push(issue('field-invalid', `${path}.proof_completion must be an object when present.`));
  }
  if (target.status === 'blocked' && Array.isArray(target.blockers) && target.blockers.length === 0) {
    issues.push(issue('meta-proof-readiness-blockers-missing', `${path} is blocked but has no blockers.`));
  }
  if ((target.status === 'ready' || target.status === 'proved') && target.ok !== true) {
    issues.push(issue('meta-proof-readiness-ok-mismatch', `${path} is ${target.status} but ok is not true.`));
  }
  if ((target.status === 'blocked' || target.status === 'unknown') && target.ok !== false) {
    issues.push(issue('meta-proof-readiness-ok-mismatch', `${path} is ${target.status} but ok is not false.`));
  }
}

function validateMetaProofReadinessCheck(check, issues, path) {
  if (!isObject(check)) {
    issues.push(issue('meta-proof-readiness-check-invalid', `${path} must be an object.`));
    return;
  }
  requireString(check, 'id', issues, { path: `${path}.id` });
  requireBoolean(check, 'ok', issues, `${path}.ok`);
  if (check.status != null) requireString(check, 'status', issues, { path: `${path}.status` });
  for (const field of ['receipt_paths', 'dirty_paths', 'observed_dirty_paths', 'unobserved_dirty_paths']) {
    if (check[field] != null) requireStringArray(check, field, issues, `${path}.${field}`);
  }
  if (check.observed_dirty_allowed != null) requireBoolean(check, 'observed_dirty_allowed', issues, `${path}.observed_dirty_allowed`);
  if (check.input_refresh_plan != null) validateMetaInputRefreshPlan(check.input_refresh_plan, issues, `${path}.input_refresh_plan`);
}

function validateMetaProofReadinessBlocker(blockerValue, issues, path) {
  if (!isObject(blockerValue)) {
    issues.push(issue('meta-proof-readiness-blocker-invalid', `${path} must be an object.`));
    return;
  }
  requireString(blockerValue, 'code', issues, { path: `${path}.code` });
  requireString(blockerValue, 'message', issues, { path: `${path}.message` });
  if (blockerValue.input_refresh_plan != null) validateMetaInputRefreshPlan(blockerValue.input_refresh_plan, issues, `${path}.input_refresh_plan`);
}

function validateMetaInputRefreshPlan(value, issues, path) {
  if (!isObject(value)) {
    issues.push(issue('meta-proof-readiness-refresh-plan-invalid', `${path} must be an object.`));
    return;
  }
  for (const field of ['id', 'status', 'mutation_policy', 'next_action']) {
    requireString(value, field, issues, { path: `${path}.${field}` });
  }
  if (value.before_status != null) requireString(value, 'before_status', issues, { path: `${path}.before_status` });
  requireBoolean(value, 'requires_tracked_mutation_ack', issues, `${path}.requires_tracked_mutation_ack`);
  requireBoolean(value, 'requires_explicit_workflow', issues, `${path}.requires_explicit_workflow`);
  for (const field of ['writes', 'required_flags', 'blocked_reasons']) {
    requireStringArray(value, field, issues, `${path}.${field}`);
  }
  requireArray(value, 'commands', issues, `${path}.commands`);
  if (Array.isArray(value.commands)) {
    value.commands.forEach((command, index) => {
      const commandPath = `${path}.commands[${index}]`;
      if (!isObject(command)) {
        issues.push(issue('meta-proof-readiness-refresh-plan-invalid', `${commandPath} must be an object.`));
        return;
      }
      requireString(command, 'label', issues, { path: `${commandPath}.label` });
      requireString(command, 'command', issues, { path: `${commandPath}.command` });
    });
  }
}

function validateMetaProofCompletion(value, issues, path) {
  requireString(value, 'status', issues, {
    path: `${path}.status`,
    values: ['untracked', 'missing', 'invalid', 'proved'],
  });
  requireBoolean(value, 'proved', issues, `${path}.proved`);
  requireNonNegativeNumber(value, 'receipt_count', issues, `${path}.receipt_count`);
  if (value.valid_count != null) requireNonNegativeNumber(value, 'valid_count', issues, `${path}.valid_count`);
  requireArray(value, 'receipts', issues, `${path}.receipts`);
  if (value.status === 'proved' && value.proved !== true) {
    issues.push(issue('meta-proof-readiness-proof-mismatch', `${path} has status proved but proved is not true.`));
  }
  if (Array.isArray(value.receipts)) {
    value.receipts.forEach((receipt, index) => {
      const receiptPath = `${path}.receipts[${index}]`;
      if (!isObject(receipt)) {
        issues.push(issue('meta-proof-readiness-proof-receipt-invalid', `${receiptPath} must be an object.`));
        return;
      }
      requireString(receipt, 'path', issues, { path: `${receiptPath}.path` });
      requireBoolean(receipt, 'ok', issues, `${receiptPath}.ok`);
      requireString(receipt, 'status', issues, {
        path: `${receiptPath}.status`,
        values: ['missing', 'valid', 'invalid'],
      });
    });
  }
}

function validatePolicyInputFreshness(receipt, issues) {
  if (!isObject(receipt.input_freshness)) {
    issues.push(issue('runner-workflow-policy-input-freshness-missing', `${receipt.workflow} policy requires embedded input_freshness.`));
    return;
  }
  const workflowFreshness = Array.isArray(receipt.input_freshness.workflows)
    ? receipt.input_freshness.workflows.find((workflow) => isObject(workflow) && workflow.id === receipt.workflow)
    : null;
  if (!workflowFreshness) {
    issues.push(issue('runner-workflow-policy-input-freshness-missing', `${receipt.workflow} policy requires matching input_freshness workflow.`));
    return;
  }
  if (receipt.status === 'passed' && !isWorkflowFreshnessOk(workflowFreshness, receipt.workflow)) {
    issues.push(issue('runner-workflow-policy-input-freshness-stale', `${receipt.workflow} passed receipts require fresh input_freshness.`));
  }
}

function isWorkflowFreshnessOk(workflowFreshness, workflowId) {
  if (!isObject(workflowFreshness) || workflowFreshness.ok !== true) return false;
  if (workflowId === 'page-refresh') return workflowFreshness.status === 'current' || workflowFreshness.status === 'fresh';
  return workflowFreshness.status === 'fresh';
}

function validatePolicyCommands(receipt, policy, issues) {
  const commands = Array.isArray(receipt.commands) ? receipt.commands : [];
  const commandLabels = commands
    .map((command) => (isObject(command) ? command.label : ''))
    .filter(Boolean);
  for (const label of policy.required_commands) {
    if (!commandLabels.includes(label)) {
      issues.push(issue('runner-workflow-policy-command-missing', `${receipt.workflow} policy requires command ${label}.`));
    }
  }
  if (receipt.status === 'passed') {
    for (const command of commands) {
      if (isObject(command) && command.status !== 0) {
        issues.push(issue('runner-workflow-policy-command-failed', `${receipt.workflow} passed receipt has non-zero command ${command.label || '<unknown>'}.`));
      }
    }
  }
}

function validatePolicyArtifacts(receipt, policy, issues) {
  const artifactRefs = Array.isArray(receipt.artifact_refs) ? receipt.artifact_refs : [];
  for (const [role, kind] of policy.required_artifacts) {
    if (!artifactRefs.some((artifact) => isObject(artifact) && artifact.role === role && artifact.kind === kind)) {
      issues.push(issue('runner-workflow-policy-artifact-missing', `${receipt.workflow} policy requires ${role}/${kind} artifact_ref.`));
    }
  }
  if (Array.isArray(receipt.changed_routes)) {
    for (const route of receipt.changed_routes) {
      if (!artifactRefs.some((artifact) => isObject(artifact) && artifact.kind === 'changed-route' && artifact.id === route)) {
        issues.push(issue('runner-workflow-policy-route-artifact-missing', `${receipt.workflow} policy requires changed-route artifact_ref for ${route}.`));
      }
    }
  }
  if (Array.isArray(receipt.source_ids)) {
    for (const sourceId of receipt.source_ids) {
      if (!artifactRefs.some((artifact) => isObject(artifact) && artifact.kind === 'source-id' && artifact.id === sourceId)) {
        issues.push(issue('runner-workflow-policy-source-artifact-missing', `${receipt.workflow} policy requires source-id artifact_ref for ${sourceId}.`));
      }
    }
  }
  if (Array.isArray(receipt.commands)) {
    for (const command of receipt.commands) {
      if (!isObject(command) || !command.details_path) continue;
      if (!artifactRefs.some((artifact) => isObject(artifact) && artifact.kind === 'command-detail' && artifact.path === command.details_path)) {
        issues.push(issue('runner-workflow-policy-command-detail-artifact-missing', `${receipt.workflow} policy requires command-detail artifact_ref for ${command.label}.`));
      }
    }
  }
}

function requiredRouteWidths() {
  return [319, 360, 390, 430, 768, 1024, 1366];
}

function arrayStrings(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === 'string') : [];
}

function validateCloseoutIdentity(value, issues) {
  const hasAny = value.goal_id != null || value.run_id != null || value.residual_risks != null || value.next_actions != null;
  if (!hasAny && !REQUIRE_CLOSEOUT_IDENTITY) return;
  if (typeof value.goal_id !== 'string' || !value.goal_id.trim()) {
    issues.push(issue('closeout-goal-id-missing', 'goal_id must be a non-empty string when closeout identity is required or partially present.'));
  }
  if (typeof value.run_id !== 'string' || !value.run_id.trim()) {
    issues.push(issue('closeout-run-id-missing', 'run_id must be a non-empty string when closeout identity is required or partially present.'));
  }
  if (!Array.isArray(value.residual_risks)) {
    issues.push(issue('closeout-risks-invalid', 'residual_risks must be an array.'));
  }
  if (!Array.isArray(value.next_actions)) {
    issues.push(issue('closeout-next-actions-invalid', 'next_actions must be an array.'));
  }
}

function validateTraceArtifacts(value, issues) {
  const hasAny = value.trace != null || value.artifact_refs != null;
  if (!hasAny && !REQUIRE_TRACE_ARTIFACTS) return;

  if (!isObject(value.trace)) {
    issues.push(issue('closeout-trace-invalid', 'trace must be an object when trace artifacts are required or partially present.'));
  } else {
    requireString(value.trace, 'trace_id', issues, { path: 'trace.trace_id' });
    requireString(value.trace, 'span_id', issues, { path: 'trace.span_id' });
    if (value.trace.parent_span_id != null && typeof value.trace.parent_span_id !== 'string') {
      issues.push(issue('closeout-trace-invalid', 'trace.parent_span_id must be a string when present.'));
    }
    requireString(value.trace, 'name', issues, { path: 'trace.name' });
    requireIsoString(value.trace, 'started_at', issues, 'trace.started_at');
    requireIsoString(value.trace, 'ended_at', issues, 'trace.ended_at');
    requireNonNegativeNumber(value.trace, 'duration_ms', issues, 'trace.duration_ms');
  }

  if (!Array.isArray(value.artifact_refs)) {
    issues.push(issue('closeout-artifact-refs-invalid', 'artifact_refs must be an array when trace artifacts are required or partially present.'));
    return;
  }
  if (REQUIRE_TRACE_ARTIFACTS && value.artifact_refs.length === 0) {
    issues.push(issue('closeout-artifact-refs-empty', 'artifact_refs must include at least one artifact when required.'));
  }
  value.artifact_refs.forEach((artifact, index) => validateArtifactRef(artifact, issues, `artifact_refs[${index}]`));
}

function validateDagArtifactRefs(value, issues) {
  if (!Array.isArray(value.artifact_refs)) {
    if (REQUIRE_DAG_PROOF) {
      issues.push(issue('dag-proof-artifact-refs-missing', 'Checked DAG proof requires artifact_refs.'));
    }
    return;
  }
  const dagPaths = [];
  const validationReports = [];
  for (const artifact of value.artifact_refs) {
    if (!isObject(artifact)) continue;
    if (artifact.kind === 'agent-task-dag') {
      if (typeof artifact.path === 'string' && artifact.path.trim()) {
        dagPaths.push(compareArtifactPath(artifact.path));
      }
      validateAgentTaskDagArtifact(artifact, issues);
    }
    if (artifact.kind === 'agent-task-dag-validation-report') {
      const report = validateAgentTaskDagValidationArtifact(artifact, issues);
      if (report) validationReports.push(report);
    }
  }
  if (!REQUIRE_DAG_PROOF) return;
  if (dagPaths.length === 0) {
    issues.push(issue('dag-proof-missing', 'Checked DAG proof requires an output agent-task-dag artifact ref.'));
  }
  if (validationReports.length === 0) {
    issues.push(issue('dag-proof-validation-missing', 'Checked DAG proof requires an output agent-task-dag-validation-report artifact ref.'));
  }
  if (dagPaths.length > 0 && validationReports.length > 0) {
    const validatedPaths = new Set();
    for (const report of validationReports) {
      for (const receipt of Array.isArray(report.receipts) ? report.receipts : []) {
        if (isObject(receipt) && typeof receipt.path === 'string' && receipt.path.trim()) {
          validatedPaths.add(compareArtifactPath(receipt.path));
        }
      }
    }
    if (!dagPaths.some((path) => validatedPaths.has(path))) {
      issues.push(issue('dag-proof-validation-mismatch', 'Checked DAG validation report must reference at least one attached agent-task-dag path.'));
    }
  }
}

function validateAgentTaskDagArtifact(artifact, issues) {
  if (artifact.role !== 'output') {
    issues.push(issue('dag-artifact-ref-invalid', 'agent-task-dag artifact refs must use role output.'));
  }
  const value = readArtifactJson(artifact, issues, 'dag-artifact');
  if (!value) return;
  if (value.schema_version !== 'aipedia.agent-task-dag.v1') {
    issues.push(issue('dag-artifact-invalid', 'agent-task-dag artifact must use schema_version aipedia.agent-task-dag.v1.'));
  }
}

function validateAgentTaskDagValidationArtifact(artifact, issues) {
  if (artifact.role !== 'output') {
    issues.push(issue('dag-validation-artifact-ref-invalid', 'agent-task-dag-validation-report artifact refs must use role output.'));
  }
  const value = readArtifactJson(artifact, issues, 'dag-validation-artifact');
  if (!value) return;
  if (value.schema_version !== 'aipedia.agent-task-dag-check.v1') {
    issues.push(issue('dag-validation-artifact-invalid', 'DAG validation artifact must use schema_version aipedia.agent-task-dag-check.v1.'));
  }
  if (value.ok !== true) {
    issues.push(issue('dag-validation-artifact-failed', 'DAG validation artifact must have ok true.'));
  }
  const issuesCount = value?.totals?.issues;
  if (typeof issuesCount === 'number' && issuesCount !== 0) {
    issues.push(issue('dag-validation-artifact-failed', 'DAG validation artifact must have zero issues.'));
  }
  return value;
}

function compareArtifactPath(path) {
  return resolve(PROJECT_DIR, path);
}

function readArtifactJson(artifact, issues, code) {
  if (typeof artifact.path !== 'string' || !artifact.path.trim()) {
    issues.push(issue(`${code}-missing-path`, 'DAG artifact refs must include a path.'));
    return null;
  }
  const path = resolve(PROJECT_DIR, artifact.path);
  if (!existsSync(path)) {
    issues.push(issue(`${code}-missing`, `DAG artifact does not exist: ${artifact.path}.`));
    return null;
  }
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    issues.push(issue(`${code}-invalid-json`, `DAG artifact JSON could not parse: ${error.message}`));
    return null;
  }
}

function validateArtifactRef(artifact, issues, path) {
  if (!isObject(artifact)) {
    issues.push(issue('closeout-artifact-ref-invalid', `${path} must be an object.`));
    return;
  }
  requireString(artifact, 'role', issues, { path: `${path}.role` });
  requireString(artifact, 'kind', issues, { path: `${path}.kind` });
  if (artifact.path != null && typeof artifact.path !== 'string') {
    issues.push(issue('closeout-artifact-ref-invalid', `${path}.path must be a string when present.`));
  }
  if (artifact.id != null && typeof artifact.id !== 'string') {
    issues.push(issue('closeout-artifact-ref-invalid', `${path}.id must be a string when present.`));
  }
  if (artifact.description != null && typeof artifact.description !== 'string') {
    issues.push(issue('closeout-artifact-ref-invalid', `${path}.description must be a string when present.`));
  }
  if (!artifact.path && !artifact.id) {
    issues.push(issue('closeout-artifact-ref-invalid', `${path} must include either path or id.`));
  }
}

function requireObject(value, field, issues, path = field) {
  if (!isObject(value[field])) issues.push(issue('field-invalid', `${path} must be an object.`));
}

function requireArray(value, field, issues, path = field) {
  if (!Array.isArray(value[field])) issues.push(issue('field-invalid', `${path} must be an array.`));
}

function requireStringArray(value, field, issues, path = field) {
  if (!Array.isArray(value[field])) {
    issues.push(issue('field-invalid', `${path} must be an array.`));
    return;
  }
  if (value[field].some((item) => typeof item !== 'string')) {
    issues.push(issue('field-invalid', `${path} must contain only strings.`));
  }
}

function requireBoolean(value, field, issues, path = field) {
  if (typeof value[field] !== 'boolean') issues.push(issue('field-invalid', `${path} must be a boolean.`));
}

function requireString(value, field, issues, options = {}) {
  const path = options.path || field;
  if (typeof value[field] !== 'string' || !value[field].trim()) {
    issues.push(issue('field-invalid', `${path} must be a non-empty string.`));
    return;
  }
  if (options.values && !options.values.includes(value[field])) {
    issues.push(issue('field-invalid', `${path} must be one of: ${options.values.join(', ')}.`));
  }
}

function requireIsoString(value, field, issues, path = field) {
  requireString(value, field, issues, { path });
  if (typeof value[field] === 'string' && Number.isNaN(Date.parse(value[field]))) {
    issues.push(issue('field-invalid', `${path} must be an ISO-like date/time string.`));
  }
}

function requireIsoDateString(value, field, issues, path = field) {
  requireString(value, field, issues, { path });
  if (typeof value[field] === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(value[field])) {
    issues.push(issue('field-invalid', `${path} must be YYYY-MM-DD.`));
  }
}

function requireNonNegativeNumber(value, field, issues, path = field) {
  if (typeof value[field] !== 'number' || !Number.isFinite(value[field]) || value[field] < 0) {
    issues.push(issue('field-invalid', `${path} must be a non-negative number.`));
  }
}

function issue(code, detail) {
  return { code, detail };
}

function isObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function stringArray(value, field) {
  return Array.isArray(value[field]) && value[field].every((item) => typeof item === 'string') ? value[field] : null;
}

function arrayLength(value) {
  return Array.isArray(value) ? value.length : null;
}

function hasDuplicates(values) {
  return new Set(values).size !== values.length;
}

function sameMembers(left, right) {
  if (left.length !== right.length) return false;
  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();
  return sortedLeft.every((value, index) => value === sortedRight[index]);
}

function isSubset(needles, haystack) {
  const haystackSet = new Set(haystack);
  return needles.every((item) => haystackSet.has(item));
}

function intersection(left, right) {
  const rightSet = new Set(right);
  return left.filter((item) => rightSet.has(item));
}

function hasOwn(value, field) {
  return Object.prototype.hasOwnProperty.call(value, field);
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }
  if (!report.ok) {
    console.error('[agent-closeout-receipt-check] failed');
    for (const receipt of report.receipts || []) {
      for (const receiptIssue of receipt.issues || []) {
        console.error(`- ${receipt.path}: ${receiptIssue.detail}`);
      }
    }
    return;
  }
  console.log(`[agent-closeout-receipt-check] ${report.totals.receipts} receipt(s) ok`);
}

function valueFor(flag) {
  const inline = args.find((arg) => arg.startsWith(`${flag}=`));
  if (inline) return inline.slice(flag.length + 1);
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

function valuesFor(flag) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === flag) {
      const value = args[index + 1];
      if (value && !value.startsWith('--')) values.push(value);
    } else if (arg.startsWith(`${flag}=`)) {
      values.push(arg.slice(flag.length + 1));
    }
  }
  return values.flatMap((value) => value.split(',')).map((value) => value.trim()).filter(Boolean);
}

function hasFlag(flag) {
  return args.includes(flag) || args.some((arg) => arg.startsWith(`${flag}=`));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function collectArgumentIssues() {
  const issues = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] || '';
      if (!VALUE_FLAGS.has(previous)) issues.push(issue('argument-invalid', `unexpected argument ${arg}`));
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) {
      issues.push(issue('argument-invalid', `unknown flag ${name}`));
      continue;
    }
    if (VALUE_FLAGS.has(name)) {
      if (arg.includes('=')) {
        if (!arg.slice(name.length + 1)) issues.push(issue('argument-invalid', `${name} requires a value`));
        continue;
      }
      const value = args[index + 1];
      if (!value || value.startsWith('-')) issues.push(issue('argument-invalid', `${name} requires a value`));
      continue;
    }
    if (arg.includes('=')) issues.push(issue('argument-invalid', `${name} does not accept a value`));
  }
  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push(issue('argument-invalid', 'choose only one of --project-dir or --root'));
  }
  if (ALL_SYSTEM && EXPLICIT_RECEIPTS.length) {
    issues.push(issue('argument-invalid', 'choose either --all-system or explicit --receipt paths'));
  }
  return issues;
}

function projectPath(path) {
  return path.startsWith(PROJECT_DIR) ? path.slice(PROJECT_DIR.length + 1).replace(/\\/g, '/') : path.replace(/\\/g, '/');
}
