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
  if (isObject(value.summary)) validateLoopEfficiencyTrendSummary(value.summary, issues);
  if (isObject(value.stability_summary)) validateLoopEfficiencyTrendStability(value.stability_summary, issues);
  if (isObject(value.correction_summary)) validateLoopEfficiencyTrendCorrection(value.correction_summary, issues);
  if (Array.isArray(value.slowest_commands)) {
    value.slowest_commands.forEach((command, index) => validateLoopEfficiencyTrendSlowCommand(command, issues, `slowest_commands[${index}]`));
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
  }
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

  if (enforce && progress.require_system_artifact !== true) {
    issues.push(issue('system-progress-not-enforced', 'system_progress.require_system_artifact must be true when --require-system-progress is used.'));
  }
  if (receipt.ok === true && enforce && progress.has_system_artifact !== true) {
    issues.push(issue('system-progress-no-system-artifact', 'Passing enforced loop receipt must include at least one system artifact.'));
  }
  if (receipt.ok === true && enforce && progress.content_only === true) {
    issues.push(issue('system-progress-content-only', 'Passing enforced loop receipt cannot be content_only.'));
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
  requireArray(target, 'readiness_checks', issues, `${path}.readiness_checks`);
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
  if (receipt.status === 'passed' && (workflowFreshness.ok !== true || workflowFreshness.status !== 'fresh')) {
    issues.push(issue('runner-workflow-policy-input-freshness-stale', `${receipt.workflow} passed receipts require fresh input_freshness.`));
  }
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
