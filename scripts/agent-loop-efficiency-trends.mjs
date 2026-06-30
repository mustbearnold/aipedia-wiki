#!/usr/bin/env node
// Aggregate loop efficiency metrics from recorded system loop receipts.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const LEDGER_DIR = resolve(PROJECT_DIR, valueFor('--ledger-dir') || '.agent/loop-runs/system');
const MAX_RUNS = positiveInteger(valueFor('--max-runs'), 10);
const FAIL_ON_MISSING_METRICS = hasFlag('--fail-on-missing-metrics');
const KNOWN_FLAGS = new Set([
  '--fail-on-missing-metrics',
  '--help',
  '-h',
  '--json',
  '--ledger-dir',
  '--max-runs',
  '--project-dir',
  '--root',
]);
const VALUE_FLAGS = new Set(['--ledger-dir', '--max-runs', '--project-dir', '--root']);

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
    ledger_dir: projectPath(LEDGER_DIR),
    argument_issues: argumentIssues,
    issues: argumentIssues,
  });
  process.exit(2);
}

const report = buildTrendReport();
emitReport(report);
process.exit(report.ok ? 0 : 1);

function usage() {
  return [
    'Usage:',
    '  node scripts/agent-loop-efficiency-trends.mjs --json',
    '  node scripts/agent-loop-efficiency-trends.mjs --max-runs 20 --fail-on-missing-metrics --json',
    '',
    'Options:',
    '  --json                         Emit a structured report.',
    '  --ledger-dir <dir>             Loop receipt directory. Defaults to .agent/loop-runs/system.',
    '  --max-runs <n>                 Analyze the latest n timestamped loop receipts. Defaults to 10.',
    '  --fail-on-missing-metrics      Exit non-zero when analyzed loop receipts lack efficiency_metrics.',
    '  --project-dir <dir>            Project root. Alias: --root.',
  ].join('\n');
}

function buildTrendReport() {
  const issues = [];
  if (!existsSync(LEDGER_DIR)) {
    issues.push(issue('ledger-dir-missing', `Ledger directory does not exist: ${projectPath(LEDGER_DIR)}`));
    return baseReport(false, issues, []);
  }

  const records = readdirSync(LEDGER_DIR)
    .filter((name) => name.endsWith('-loop-run.json'))
    .map((name) => readReceipt(join(LEDGER_DIR, name)))
    .filter((record) => record.type === 'loop-run')
    .sort((left, right) => left.generated_at.localeCompare(right.generated_at))
    .slice(-MAX_RUNS);

  if (!records.length) {
    issues.push(issue('loop-receipts-missing', `No timestamped loop receipts found under ${projectPath(LEDGER_DIR)}.`));
    return baseReport(false, issues, []);
  }

  const missingMetrics = records.filter((record) => !record.efficiency_metrics);
  if (missingMetrics.length) {
    issues.push(issue(
      'missing-efficiency-metrics',
      `${missingMetrics.length} analyzed loop receipt(s) lack efficiency_metrics.`,
      missingMetrics.map((record) => record.path),
    ));
  }

  const metricsRecords = records.filter((record) => record.efficiency_metrics);
  const summary = trendSummary(records, metricsRecords);
  const stability = stabilitySummary(records);
  const ok = !issues.some((item) => item.code !== 'missing-efficiency-metrics')
    && (!FAIL_ON_MISSING_METRICS || missingMetrics.length === 0);

  return {
    ...baseReport(ok, issues, records),
    summary,
    stability_summary: stability,
    slowest_commands: slowestCommandTrends(metricsRecords),
    next_actions: nextActions(issues, summary, stability),
  };
}

function baseReport(ok, issues, records) {
  return {
    ok,
    mode: ok ? 'loop-efficiency-trends' : 'loop-efficiency-trends-attention',
    schema_version: 'aipedia.loop-efficiency-trends.v1',
    project_dir: PROJECT_DIR,
    ledger_dir: projectPath(LEDGER_DIR),
    max_runs: MAX_RUNS,
    fail_on_missing_metrics: FAIL_ON_MISSING_METRICS,
    totals: {
      analyzed_runs: records.length,
      metrics_runs: records.filter((record) => record.efficiency_metrics).length,
      missing_metrics_runs: records.filter((record) => !record.efficiency_metrics).length,
    },
    issues,
    runs: records.map(runSummary),
  };
}

function readReceipt(path) {
  try {
    const receipt = JSON.parse(readFileSync(path, 'utf8'));
    const type = typeof receipt.mode === 'string' && receipt.mode.startsWith('loop-run') ? 'loop-run' : 'unknown';
    return {
      type,
      path: projectPath(path),
      generated_at: receipt.generated_at || '',
      run_id: receipt.run_id || '',
      ok: receipt.ok === true,
      mode: receipt.mode || '',
      duration_ms: nonNegative(receipt.duration_ms),
      totals: receipt.totals && typeof receipt.totals === 'object' ? receipt.totals : {},
      loops: Array.isArray(receipt.loops) ? receipt.loops.map(loopStatusSummary) : [],
      efficiency_metrics: receipt.efficiency_metrics && typeof receipt.efficiency_metrics === 'object'
        ? receipt.efficiency_metrics
        : null,
    };
  } catch (error) {
    return {
      type: 'invalid',
      path: projectPath(path),
      generated_at: '',
      run_id: '',
      ok: false,
      mode: 'invalid-json',
      duration_ms: 0,
      totals: {},
      loops: [],
      efficiency_metrics: null,
      error: error.message,
    };
  }
}

function loopStatusSummary(loop) {
  return {
    id: loop?.id || '',
    status: loop?.status || '',
    commands: Array.isArray(loop?.commands)
      ? loop.commands.map((command) => ({
        label: command?.label || '',
        status: command?.status || '',
      }))
      : [],
  };
}

function runSummary(record) {
  const metrics = record.efficiency_metrics || {};
  return {
    path: record.path,
    generated_at: record.generated_at,
    run_id: record.run_id,
    ok: record.ok,
    has_efficiency_metrics: Boolean(record.efficiency_metrics),
    wall_duration_ms: nonNegative(metrics.wall_duration_ms || record.duration_ms),
    total_command_duration_ms: nonNegative(metrics.total_command_duration_ms),
    command_count: nonNegative(metrics.command_count || record.totals.commands),
    loop_count: nonNegative(metrics.loop_count || record.totals.loops),
    attention_rate: metricNumber(metrics.attention_rate),
    persisted_full_receipt_bytes: nonNegative(metrics.persisted_full_receipt_bytes),
    persisted_latest_receipt_bytes: nonNegative(metrics.persisted_latest_receipt_bytes),
    estimated_full_receipt_tokens: estimateTokens(metrics.persisted_full_receipt_bytes),
    system_artifact_count: nonNegative(metrics.system_artifact_count),
  };
}

function trendSummary(records, metricsRecords) {
  const runs = metricsRecords.map(runSummary);
  const latest = runs.at(-1) || null;
  const previous = runs.length > 1 ? runs.at(-2) : null;
  return {
    first_run: records[0]?.generated_at || '',
    latest_run: records.at(-1)?.generated_at || '',
    metrics_coverage_rate: ratio(metricsRecords.length, records.length),
    median_wall_duration_ms: median(runs.map((run) => run.wall_duration_ms)),
    median_total_command_duration_ms: median(runs.map((run) => run.total_command_duration_ms)),
    median_attention_rate: median(runs.map((run) => run.attention_rate)),
    median_full_receipt_bytes: median(runs.map((run) => run.persisted_full_receipt_bytes)),
    median_latest_receipt_bytes: median(runs.map((run) => run.persisted_latest_receipt_bytes)),
    median_estimated_full_receipt_tokens: median(runs.map((run) => run.estimated_full_receipt_tokens)),
    latest,
    delta_from_previous: latest && previous ? {
      wall_duration_ms: latest.wall_duration_ms - previous.wall_duration_ms,
      total_command_duration_ms: latest.total_command_duration_ms - previous.total_command_duration_ms,
      attention_rate: roundMetric(latest.attention_rate - previous.attention_rate),
      persisted_full_receipt_bytes: latest.persisted_full_receipt_bytes - previous.persisted_full_receipt_bytes,
      persisted_latest_receipt_bytes: latest.persisted_latest_receipt_bytes - previous.persisted_latest_receipt_bytes,
      estimated_full_receipt_tokens: latest.estimated_full_receipt_tokens - previous.estimated_full_receipt_tokens,
      system_artifact_count: latest.system_artifact_count - previous.system_artifact_count,
    } : null,
  };
}

function slowestCommandTrends(records) {
  const groups = new Map();
  for (const record of records) {
    for (const command of record.efficiency_metrics?.slowest_commands || []) {
      const key = `${command.loop_id || ''}::${command.label || ''}`;
      if (!groups.has(key)) {
        groups.set(key, {
          loop_id: command.loop_id || '',
          label: command.label || '',
          occurrences: 0,
          max_duration_ms: 0,
          durations: [],
          latest_status: '',
        });
      }
      const group = groups.get(key);
      group.occurrences += 1;
      group.latest_status = command.status || group.latest_status;
      group.max_duration_ms = Math.max(group.max_duration_ms, nonNegative(command.duration_ms));
      group.durations.push(nonNegative(command.duration_ms));
    }
  }
  return [...groups.values()]
    .map((group) => ({
      loop_id: group.loop_id,
      label: group.label,
      occurrences: group.occurrences,
      max_duration_ms: group.max_duration_ms,
      median_duration_ms: median(group.durations),
      latest_status: group.latest_status,
    }))
    .sort((left, right) => right.max_duration_ms - left.max_duration_ms || left.label.localeCompare(right.label))
    .slice(0, 10);
}

function stabilitySummary(records) {
  const loopStatuses = new Map();
  const commandStatuses = new Map();
  let loopStatusComparisons = 0;
  let loopStatusChanges = 0;
  let commandStatusComparisons = 0;
  let commandStatusChanges = 0;

  for (const record of records) {
    for (const loop of record.loops || []) {
      if (!loop.id) continue;
      if (!loopStatuses.has(loop.id)) loopStatuses.set(loop.id, []);
      loopStatuses.get(loop.id).push({ generated_at: record.generated_at, status: loop.status || '' });
      for (const command of loop.commands || []) {
        if (!command.label) continue;
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
  const previousLoopStatuses = new Map((previous?.loops || []).map((loop) => [loop.id, loop.status]));
  const latestLoopStatuses = new Map((latest?.loops || []).map((loop) => [loop.id, loop.status]));
  const latestAttention = [...latestLoopStatuses].filter(([, status]) => status === 'attention').map(([id]) => id).sort();
  const previousAttention = [...previousLoopStatuses].filter(([, status]) => status === 'attention').map(([id]) => id).sort();

  return {
    loop_status_comparisons: loopStatusComparisons,
    loop_status_changes: loopStatusChanges,
    loop_status_change_rate: ratio(loopStatusChanges, loopStatusComparisons),
    command_status_comparisons: commandStatusComparisons,
    command_status_changes: commandStatusChanges,
    command_status_change_rate: ratio(commandStatusChanges, commandStatusComparisons),
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

function nextActions(issues, summary, stability) {
  const actions = [];
  if (issues.some((item) => item.code === 'missing-efficiency-metrics')) {
    actions.push('Run loop:all:record again so newer receipts include efficiency_metrics, or use --max-runs to scope to metric-aware receipts.');
  }
  if (stability?.command_status_change_rate > 0.2) {
    actions.push('Inspect command status churn before treating the latest speed movement as stable.');
  }
  if (summary?.latest?.persisted_full_receipt_bytes > 50000) {
    actions.push('Review receipt size and decide whether summarized command tails can replace verbose embedded output.');
  }
  if (summary?.delta_from_previous?.wall_duration_ms > 1000) {
    actions.push('Inspect slowest_commands and recent command changes before claiming a speed improvement.');
  }
  if (!actions.length) {
    actions.push('Use this trend receipt in the next system closeout to compare speed and receipt-size movement.');
  }
  return actions;
}

function median(values) {
  const numbers = values.filter((value) => Number.isFinite(value)).sort((left, right) => left - right);
  if (!numbers.length) return 0;
  const midpoint = Math.floor(numbers.length / 2);
  return numbers.length % 2 ? numbers[midpoint] : roundMetric((numbers[midpoint - 1] + numbers[midpoint]) / 2);
}

function estimateTokens(bytes) {
  const number = nonNegative(bytes);
  return number ? Math.ceil(number / 4) : 0;
}

function ratio(count, total) {
  if (!total) return 0;
  return roundMetric(count / total);
}

function metricNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? roundMetric(number) : 0;
}

function roundMetric(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.round(value * 1000) / 1000;
}

function nonNegative(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function positiveInteger(value, fallback) {
  if (value == null || value === '') return fallback;
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

function issue(code, detail, paths = []) {
  const item = { code, detail };
  if (paths.length) item.paths = paths;
  return item;
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }
  if (!report.ok) {
    console.error(`[agent-loop-efficiency-trends] ${report.mode}`);
    for (const item of report.issues || []) console.error(`- ${item.detail}`);
    return;
  }
  const summary = report.summary || {};
  console.log(`[agent-loop-efficiency-trends] ${report.totals.metrics_runs}/${report.totals.analyzed_runs} receipt(s) include metrics.`);
  console.log(`median wall duration: ${summary.median_wall_duration_ms || 0} ms`);
  console.log(`median full receipt bytes: ${summary.median_full_receipt_bytes || 0}`);
}

function collectArgumentIssues() {
  const issues = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith('-')) continue;
    const [flag] = arg.split('=', 1);
    if (!KNOWN_FLAGS.has(flag)) {
      issues.push(issue('argument-unknown', `Unknown argument: ${flag}`));
      continue;
    }
    if (VALUE_FLAGS.has(flag) && !arg.includes('=')) {
      const value = args[index + 1];
      if (value == null || value.startsWith('-')) issues.push(issue('argument-missing-value', `${flag} requires a value.`));
      else index += 1;
    }
  }
  const maxRunsValue = valueFor('--max-runs');
  if (maxRunsValue != null && (!Number.isInteger(Number(maxRunsValue)) || Number(maxRunsValue) <= 0)) {
    issues.push(issue('argument-invalid', '--max-runs must be a positive integer.'));
  }
  return issues;
}

function hasFlag(flag) {
  return args.includes(flag);
}

function valueFor(flag) {
  const inline = args.find((arg) => arg.startsWith(`${flag}=`));
  if (inline) return inline.slice(flag.length + 1);
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

function projectPath(path) {
  const rel = resolve(path).startsWith(PROJECT_DIR)
    ? resolve(path).slice(PROJECT_DIR.length).replace(/^\/+/, '')
    : path;
  return rel || '.';
}
