#!/usr/bin/env node
// Shared AiPedia loop registry and read-only loop runner.

import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';

const args = process.argv.slice(2);
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const defaultProjectDir = dirname(SCRIPT_DIR);
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const REGISTRY_PATH = resolve(PROJECT_DIR, valueFor('--registry') || 'src/data/aipedia-loops.json');
const JSON_MODE = hasFlag('--json');
const RUN_MODE = hasFlag('--run');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const LOOP_IDS = valuesFor('--loop');
const RUN_ALL = hasFlag('--all');
const SITE_DIR_ARG = valueFor('--site-dir') || valueFor('--dist-dir') || '';
const WRITE_LEDGER = hasFlag('--write-ledger');
const REQUIRE_SYSTEM_PROGRESS = hasFlag('--require-system-progress');
const GOAL_ID = valueFor('--goal-id') || process.env.AIPEDIA_GOAL_ID || 'unscoped-goal';
const RUN_ID = valueFor('--run-id') || process.env.AIPEDIA_RUN_ID || '';
const TRACE_ID = valueFor('--trace-id') || process.env.AIPEDIA_TRACE_ID || '';
const PARENT_SPAN_ID = valueFor('--parent-span-id') || process.env.AIPEDIA_PARENT_SPAN_ID || '';
const RESIDUAL_RISKS = valuesFor('--risk').concat(envList('AIPEDIA_RESIDUAL_RISKS'));
const EXTRA_NEXT_ACTIONS = valuesFor('--next-action').concat(envList('AIPEDIA_NEXT_ACTIONS'));
const DAG_GRAPH_REFS = valuesFor('--dag-graph').concat(envList('AIPEDIA_DAG_GRAPHS'));
const DAG_VALIDATION_REPORT_REFS = valuesFor('--dag-validation-report').concat(envList('AIPEDIA_DAG_VALIDATION_REPORTS'));
const OBSERVED_DIRTY_BEFORE_AGENT = valuesFor('--observed-dirty-before-agent')
  .concat(valuesFor('--observed-dirty-before-agent-path'))
  .concat(pathsFromFiles(valuesFor('--observed-dirty-before-agent-file')));
const LEDGER_DIR = resolve(PROJECT_DIR, valueFor('--ledger-dir') || '.agent/loop-runs/system');
const KNOWN_FLAGS = new Set([
  '--all',
  '--dag-graph',
  '--dag-validation-report',
  '--dist-dir',
  '--goal-id',
  '--ledger-dir',
  '--json',
  '--loop',
  '--next-action',
  '--observed-dirty-before-agent',
  '--observed-dirty-before-agent-path',
  '--observed-dirty-before-agent-file',
  '--parent-span-id',
  '--project-dir',
  '--registry',
  '--root',
  '--run',
  '--require-system-progress',
  '--risk',
  '--run-id',
  '--site-dir',
  '--trace-id',
  '--write-ledger',
  '--help',
  '-h',
]);
const VALUE_FLAGS = new Set([
  '--dist-dir',
  '--dag-graph',
  '--dag-validation-report',
  '--goal-id',
  '--ledger-dir',
  '--loop',
  '--next-action',
  '--observed-dirty-before-agent',
  '--observed-dirty-before-agent-path',
  '--observed-dirty-before-agent-file',
  '--parent-span-id',
  '--project-dir',
  '--registry',
  '--risk',
  '--root',
  '--run-id',
  '--site-dir',
  '--trace-id',
]);
const STALE_BUILD_GRACE_MS = 1000;

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
    registry_path: projectPath(REGISTRY_PATH),
    argument_issues: argumentIssues,
    loops: [],
  });
  process.exit(2);
}

if (!existsSync(REGISTRY_PATH)) {
  emitReport({
    ok: false,
    mode: 'missing-registry',
    project_dir: PROJECT_DIR,
    registry_path: projectPath(REGISTRY_PATH),
    argument_issues: [],
    loops: [],
    next_action: 'Restore src/data/aipedia-loops.json or pass --registry <path>.',
  });
  process.exit(1);
}

const registry = JSON.parse(readFileSync(REGISTRY_PATH, 'utf8'));
const defaultSiteDir = SITE_DIR_ARG || registry.default_site_dir || 'dist-fast/client';
const buildFreshnessPaths = registry.build_freshness_paths || [];
const buildFreshnessIgnorePaths = new Set((registry.build_freshness_ignore_paths || []).map(normalizeProjectPath));
const knownLoopIds = new Set((registry.loops || []).map((loop) => loop.id));
const unknownLoopIds = LOOP_IDS.filter((id) => !knownLoopIds.has(id));
if (unknownLoopIds.length) {
  emitReport({
    ok: false,
    mode: 'argument-error',
    project_dir: PROJECT_DIR,
    registry_path: projectPath(REGISTRY_PATH),
    argument_issues: unknownLoopIds.map((id) => ({ code: 'argument-invalid', detail: `unknown loop ${id}` })),
    loops: [],
  });
  process.exit(2);
}
const selectedLoops = selectLoops(registry.loops || []);

const report = RUN_MODE
  ? runLoopReport(registry, selectedLoops)
  : briefReport(registry, selectedLoops);

if (RUN_MODE && (WRITE_LEDGER || REQUIRE_SYSTEM_PROGRESS)) attachSystemProgress(report);
if (RUN_MODE) attachEfficiencyMetrics(report);
if (WRITE_LEDGER) writeLedger(report);
emitReport(report);
process.exit(report.ok ? 0 : 1);

function usage() {
  return [
    'Usage:',
    '  node scripts/aipedia-loops.mjs',
    '  node scripts/aipedia-loops.mjs --json',
    '  node scripts/aipedia-loops.mjs --run --json',
    '  node scripts/aipedia-loops.mjs --loop freshness --run',
    '',
    'Options:',
    '  --json                  Emit a structured report.',
    '  --run                   Execute the selected loops read-only.',
    '  --loop <id>             Select one loop. Repeatable.',
    '  --all                   Explicitly select every loop.',
    '  --registry <path>       Loop registry path. Defaults to src/data/aipedia-loops.json.',
    '  --site-dir <dir>        Built output used by built-site loops. Defaults to registry default_site_dir.',
    '  --project-dir <dir>     Project root. Alias: --root.',
    '  --write-ledger          Persist this run under .agent/loop-runs/system/.',
    '  --require-system-progress  Fail this run if no system artifact changed.',
    '  --observed-dirty-before-agent <path>  Existing dirty path to exclude from current-agent progress. Repeatable.',
    '  --observed-dirty-before-agent-file <path>  File containing newline-delimited existing dirty paths.',
    '  --goal-id <id>          Attach a goal id to the closeout receipt.',
    '  --run-id <id>           Attach a run id. Defaults to loop-run:<generated_at>.',
    '  --trace-id <id>         Attach a trace id. Defaults to goal_id:run_id.',
    '  --parent-span-id <id>   Attach a parent span id when resuming or nesting work.',
    '  --risk <text>           Residual risk. Repeatable.',
    '  --next-action <text>    Next action. Repeatable.',
    '  --dag-graph <path>      Attach a generated agent task DAG artifact. Repeatable.',
    '  --dag-validation-report <path>  Attach an agent:dag:check validation report. Repeatable.',
    '  --ledger-dir <dir>      Override the loop-run ledger directory.',
  ].join('\n');
}

function briefReport(registryData, loops) {
  return {
    ok: true,
    mode: 'loop-registry',
    project_dir: PROJECT_DIR,
    registry_path: projectPath(REGISTRY_PATH),
    schema_version: registryData.schema_version || 1,
    default_site_dir: defaultSiteDir,
    loop_count: loops.length,
    loops: loops.map((loop) => ({
      id: loop.id,
      title: loop.title,
      purpose: loop.purpose,
      cadence: loop.cadence,
      when_to_run: loop.when_to_run || [],
      commands: (loop.run_commands || []).map(commandSummary),
      review_questions: loop.review_questions || [],
    })),
  };
}

function runLoopReport(registryData, loops) {
  const startedAt = performance.now();
  const generatedAt = new Date().toISOString();
  const runId = RUN_ID || `loop-run:${generatedAt}`;
  const loopReports = loops.map(runLoop);
  const durationMs = Math.round(performance.now() - startedAt);
  const endedAt = new Date().toISOString();
  const totals = {
    loops: loopReports.length,
    ok: loopReports.filter((loop) => loop.status === 'ok').length,
    attention: loopReports.filter((loop) => loop.status === 'attention').length,
    skipped: loopReports.filter((loop) => loop.status === 'skipped').length,
    commands: loopReports.reduce((sum, loop) => sum + loop.commands.length, 0),
  };

  return {
    ok: true,
    mode: 'loop-run',
    project_dir: PROJECT_DIR,
    registry_path: projectPath(REGISTRY_PATH),
    schema_version: registryData.schema_version || 1,
    default_site_dir: defaultSiteDir,
    generated_at: generatedAt,
    goal_id: GOAL_ID,
    run_id: runId,
    residual_risks: RESIDUAL_RISKS,
    next_actions: EXTRA_NEXT_ACTIONS,
    trace: traceBlock('loop-run', runId, generatedAt, endedAt, durationMs),
    artifact_refs: loopArtifactRefs(loopReports, dagArtifactRefs()),
    duration_ms: durationMs,
    totals,
    loops: loopReports,
    review: reviewSummary(loopReports),
  };
}

function reviewSummary(loopReports) {
  const attention = loopReports.filter((loop) => loop.status === 'attention');
  const skipped = loopReports.filter((loop) => loop.status === 'skipped');
  const clean = loopReports.filter((loop) => loop.status === 'ok');
  const recommendations = rankedRecommendations(loopReports);

  return {
    summary: `${clean.length} loop(s) ok; ${attention.length} attention; ${skipped.length} skipped.`,
    attention_loops: attention.map((loop) => loop.id),
    skipped_loops: skipped.map((loop) => loop.id),
    recommendations,
    next_actions: recommendations.slice(0, 5).map((item) => `${item.loop_id}: ${item.action}`),
  };
}

function attachSystemProgress(reportData) {
  const systemProgress = systemProgressReport(REQUIRE_SYSTEM_PROGRESS);
  reportData.system_progress = systemProgress;
  if (REQUIRE_SYSTEM_PROGRESS && systemProgress.ok === false) {
    reportData.ok = false;
    reportData.mode = 'loop-run-system-progress-blocked';
    reportData.next_action = systemProgress.next_action || 'Add or validate a system artifact before recording operating-system progress.';
    reportData.review = {
      ...(reportData.review || {}),
      next_actions: [
        `system-progress: ${reportData.next_action}`,
        ...((reportData.review && reportData.review.next_actions) || []),
      ],
    };
  }
}

function attachEfficiencyMetrics(reportData, persistedReceiptBytes = {}) {
  reportData.efficiency_metrics = loopEfficiencyMetrics(reportData, persistedReceiptBytes);
}

function loopEfficiencyMetrics(reportData, persistedReceiptBytes = {}) {
  const loops = Array.isArray(reportData.loops) ? reportData.loops : [];
  const commands = loops.flatMap((loop) => (loop.commands || []).map((command) => ({ ...command, loop_id: loop.id })));
  const durationMs = nonNegative(reportData.duration_ms);
  const commandDurationMs = commands.reduce((sum, command) => sum + nonNegative(command.duration_ms), 0);
  const commandCount = commands.length;
  const loopCount = loops.length;
  const totals = reportData.totals || {};
  const artifactRefs = Array.isArray(reportData.artifact_refs) ? reportData.artifact_refs : [];
  const progress = reportData.system_progress || {};
  const systemArtifactCount = Array.isArray(progress.system_artifacts) ? progress.system_artifacts.length : 0;
  const contentArtifactCount = Array.isArray(progress.content_artifacts) ? progress.content_artifacts.length : 0;
  const otherArtifactCount = Array.isArray(progress.other_artifacts) ? progress.other_artifacts.length : 0;
  const agentSystemArtifactCount = Array.isArray(progress.agent_system_artifacts) ? progress.agent_system_artifacts.length : systemArtifactCount;
  const agentContentArtifactCount = Array.isArray(progress.agent_content_artifacts) ? progress.agent_content_artifacts.length : contentArtifactCount;
  const agentOtherArtifactCount = Array.isArray(progress.agent_other_artifacts) ? progress.agent_other_artifacts.length : otherArtifactCount;
  const preexistingDirtyCount = Array.isArray(progress.preexisting_dirty_paths) ? progress.preexisting_dirty_paths.length : 0;

  return {
    schema_version: 'aipedia.loop-efficiency-metrics.v1',
    wall_duration_ms: durationMs,
    total_command_duration_ms: commandDurationMs,
    command_count: commandCount,
    loop_count: loopCount,
    ok_loop_count: nonNegative(totals.ok),
    attention_loop_count: nonNegative(totals.attention),
    skipped_loop_count: nonNegative(totals.skipped),
    average_command_duration_ms: commandCount ? roundMetric(commandDurationMs / commandCount) : 0,
    commands_per_second: rate(commandCount, durationMs),
    loops_per_second: rate(loopCount, durationMs),
    attention_rate: ratio(nonNegative(totals.attention), loopCount),
    skipped_rate: ratio(nonNegative(totals.skipped), loopCount),
    artifact_ref_count: artifactRefs.length,
    embedded_command_artifact_count: artifactRefs.filter((artifact) => artifact.kind === 'loop-command').length,
    system_artifact_count: systemArtifactCount,
    content_artifact_count: contentArtifactCount,
    other_artifact_count: otherArtifactCount,
    agent_system_artifact_count: agentSystemArtifactCount,
    agent_content_artifact_count: agentContentArtifactCount,
    agent_other_artifact_count: agentOtherArtifactCount,
    preexisting_dirty_count: preexistingDirtyCount,
    system_artifacts_per_second: rate(systemArtifactCount, durationMs),
    agent_system_artifacts_per_second: rate(agentSystemArtifactCount, durationMs),
    persisted_full_receipt_bytes: nonNegative(persistedReceiptBytes.full),
    persisted_latest_receipt_bytes: nonNegative(persistedReceiptBytes.latest),
    slowest_commands: commands
      .slice()
      .sort((left, right) => nonNegative(right.duration_ms) - nonNegative(left.duration_ms) || String(left.label || '').localeCompare(String(right.label || '')))
      .slice(0, 5)
      .map((command) => ({
        loop_id: command.loop_id || '',
        label: command.label || '',
        status: command.status || '',
        duration_ms: nonNegative(command.duration_ms),
      })),
  };
}

function rate(count, durationMs) {
  if (!durationMs) return 0;
  return roundMetric((count * 1000) / durationMs);
}

function ratio(count, total) {
  if (!total) return 0;
  return roundMetric(count / total);
}

function roundMetric(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.round(value * 1000) / 1000;
}

function nonNegative(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function systemProgressReport(requireSystemArtifact) {
  const displayProjectDir = projectPath(PROJECT_DIR) || '.';
  const displayArgs = [
    'scripts/agent-system-progress-check.mjs',
    '--json',
    `--project-dir=${displayProjectDir}`,
  ];
  const commandArgs = [
    join(SCRIPT_DIR, 'agent-system-progress-check.mjs'),
    '--json',
    `--project-dir=${PROJECT_DIR}`,
  ];
  if (requireSystemArtifact) {
    commandArgs.push('--require-system-artifact');
    displayArgs.push('--require-system-artifact');
  }
  for (const path of OBSERVED_DIRTY_BEFORE_AGENT.map(normalizeProjectPath).filter(Boolean)) {
    commandArgs.push('--observed-dirty-before-agent', path);
    displayArgs.push('--observed-dirty-before-agent', path);
  }
  const child = spawnSync(process.execPath, commandArgs, {
    cwd: PROJECT_DIR,
    encoding: 'utf8',
    timeout: 30000,
  });
  const parsed = parseJson(child.stdout);
  if (!parsed || typeof parsed !== 'object') {
    return {
      ok: false,
      mode: 'system-progress-unreadable',
      command: commandLineText('node', displayArgs),
      exit_code: child.status,
      signal: child.signal || '',
      stdout_tail: tail(child.stdout),
      stderr_tail: tail(child.stderr),
      next_action: 'Run npm run agent:system-progress -- --json and fix the reported issue.',
    };
  }
  return {
    ok: parsed.ok === true,
    mode: parsed.mode || 'system-progress-check',
    command: commandLineText('node', displayArgs),
    exit_code: child.status,
    require_system_artifact: parsed.require_system_artifact === true,
    observed_dirty_before_agent: parsed.observed_dirty_before_agent || [],
    has_observed_dirty_baseline: parsed.has_observed_dirty_baseline === true,
    missing_observed_dirty_paths: parsed.missing_observed_dirty_paths || [],
    changed_paths: parsed.changed_paths || [],
    system_artifacts: parsed.system_artifacts || [],
    content_artifacts: parsed.content_artifacts || [],
    other_artifacts: parsed.other_artifacts || [],
    has_system_artifact: parsed.has_system_artifact === true,
    content_only: parsed.content_only === true,
    agent_changed_paths: parsed.agent_changed_paths || parsed.changed_paths || [],
    agent_system_artifacts: parsed.agent_system_artifacts || parsed.system_artifacts || [],
    agent_content_artifacts: parsed.agent_content_artifacts || parsed.content_artifacts || [],
    agent_other_artifacts: parsed.agent_other_artifacts || parsed.other_artifacts || [],
    has_agent_system_artifact: parsed.has_agent_system_artifact ?? parsed.has_system_artifact === true,
    agent_content_only: parsed.agent_content_only ?? parsed.content_only === true,
    preexisting_dirty_paths: parsed.preexisting_dirty_paths || [],
    preexisting_system_artifacts: parsed.preexisting_system_artifacts || [],
    preexisting_content_artifacts: parsed.preexisting_content_artifacts || [],
    preexisting_other_artifacts: parsed.preexisting_other_artifacts || [],
    next_action: parsed.next_action || '',
  };
}

function runLoop(loop) {
  const startedAt = performance.now();
  const commands = (loop.run_commands || []).map((command) => runLoopCommand(loop, command));
  const attentionCommands = commands.filter((command) => command.status === 'attention');
  const skippedCommands = commands.filter((command) => command.status === 'skipped');
  const status = attentionCommands.length
    ? 'attention'
    : skippedCommands.length === commands.length
      ? 'skipped'
      : 'ok';

  return {
    id: loop.id,
    title: loop.title,
    status,
    purpose: loop.purpose,
    duration_ms: Math.round(performance.now() - startedAt),
    commands,
    attention_reasons: attentionCommands.flatMap((command) => command.attention_reasons),
    skip_reason: status === 'skipped' ? skippedCommands[0]?.skip_reason || '' : '',
    review_questions: loop.review_questions || [],
    record_targets: loop.record_targets || [],
  };
}

function runLoopCommand(loop, command) {
  const startedAt = performance.now();
  const missingPaths = (command.requires_paths || [])
    .map(substitutePath)
    .filter((path) => !existsSync(resolve(PROJECT_DIR, path)));

  if (missingPaths.length) {
    return {
      label: command.label,
      status: 'skipped',
      command: commandLine(command),
      duration_ms: 0,
      exit_code: null,
      skip_reason: `missing required path(s): ${missingPaths.join(', ')}. Run npm run build:fast before trusting this loop.`,
      attention_reasons: [],
    };
  }

  const child = spawnSync(command.command === 'node' ? process.execPath : command.command, substitutedArgs(command.args || []), {
    cwd: PROJECT_DIR,
    encoding: 'utf8',
    timeout: command.timeout_ms || 180000,
  });
  const parsed = parseJson(child.stdout);
  const buildFreshness = buildFreshnessFor(command);
  const attentionReasons = attentionReasonsFor(command, child, parsed, buildFreshness);
  const status = attentionReasons.length ? 'attention' : 'ok';

  return {
    label: command.label,
    status,
    command: commandLine(command),
    duration_ms: Math.round(performance.now() - startedAt),
    exit_code: child.status,
    signal: child.signal || '',
    attention_reasons: attentionReasons,
    build_freshness: buildFreshness,
    parsed_summary: parsedSummary(parsed),
    stdout_tail: tail(child.stdout),
    stderr_tail: tail(child.stderr),
  };
}

function attentionReasonsFor(command, child, parsed, buildFreshness) {
  const reasons = [];
  if (child.error) reasons.push(`command error: ${child.error.message}`);
  if (child.status !== 0) reasons.push(`exit code ${child.status}`);
  if (parsed && parsed.ok === false) reasons.push('reported ok=false');
  if (buildFreshness?.status === 'stale') {
    reasons.push(`built output stale: run npm run build:fast before trusting ${buildFreshness.site_dir}`);
  }
  if (buildFreshness?.status === 'unknown') {
    reasons.push(`built output freshness unknown: ${buildFreshness.reason || 'rerun npm run build:fast before trusting rendered-output loops'}`);
  }

  const totals = parsed?.totals && typeof parsed.totals === 'object' ? parsed.totals : {};
  for (const key of command.attention_totals || []) {
    const value = Number(totals[key] ?? 0);
    if (value > 0) reasons.push(`${key}=${value}`);
  }

  return reasons;
}

function rankedRecommendations(loopReports) {
  return loopReports
    .flatMap(loopRecommendations)
    .sort((left, right) => right.score - left.score || left.loop_id.localeCompare(right.loop_id))
    .slice(0, 10);
}

function loopRecommendations(loop) {
  const items = [];
  const staleCommand = loop.commands.find((command) => command.build_freshness?.status === 'stale');
  if (staleCommand) {
    items.push({
      loop_id: loop.id,
      title: loop.title,
      score: 95,
      severity: 'blocker',
      confidence: 'high',
      effort: 'medium',
      action: `Run npm run build:fast, then rerun ${loop.id} because ${staleCommand.build_freshness.site_dir} is older than rendered inputs.`,
      reason: staleCommand.attention_reasons.find((reason) => reason.includes('built output stale')) || 'built output stale',
    });
  }

  if (loop.status === 'attention') {
    items.push({
      loop_id: loop.id,
      title: loop.title,
      score: staleCommand ? 90 : 92,
      severity: 'attention',
      confidence: 'high',
      effort: 'varies',
      action: `Review ${loop.attention_reasons[0] || 'attention signals'} and classify as fix, queue, or loop noise.`,
      reason: loop.attention_reasons[0] || 'attention signal',
    });
  }

  if (loop.status === 'skipped') {
    items.push({
      loop_id: loop.id,
      title: loop.title,
      score: 82,
      severity: 'backlog',
      confidence: 'high',
      effort: 'medium',
      action: loop.skip_reason || 'Satisfy prerequisites and rerun this loop.',
      reason: 'skipped loop',
    });
  }

  const summaries = loop.commands.map((command) => command.parsed_summary || {});
  const firstCluster = summaries.find((summary) => summary.first_cluster)?.first_cluster;
  if (loop.id === 'decision-content' && firstCluster) {
    items.push({
      loop_id: loop.id,
      title: loop.title,
      score: 74,
      severity: 'next',
      confidence: 'medium',
      effort: 'large',
      action: `Begin the next buyer-decision cycle: ${firstCluster}.`,
      reason: 'top decision-content candidate',
    });
  }

  const topReviewItem = summaries.flatMap((summary) => summary.top_review_queue || [])[0];
  if (loop.id === 'freshness' && topReviewItem?.slug) {
    items.push({
      loop_id: loop.id,
      title: loop.title,
      score: 66,
      severity: 'queue',
      confidence: 'medium',
      effort: 'medium',
      action: `Refresh due fact ${topReviewItem.key || 'metadata'} on ${topReviewItem.slug}.`,
      reason: `freshness queue due in ${topReviewItem.due_in_days ?? 'unknown'} day(s)`,
    });
  }

  const sampleIssue = summaries.flatMap((summary) => summary.sample_issues || summary.sample_failures || summary.sample_gaps || [])[0];
  if (!items.length && sampleIssue) {
    items.push({
      loop_id: loop.id,
      title: loop.title,
      score: 58,
      severity: 'watch',
      confidence: 'medium',
      effort: 'varies',
      action: `Inspect sample signal from ${loop.id}; keep it queued if it is not user-facing.`,
      reason: JSON.stringify(sampleIssue).slice(0, 200),
    });
  }

  return items;
}

function parsedSummary(parsed) {
  if (!parsed || typeof parsed !== 'object') return {};
  const summary = {};
  if (typeof parsed.ok === 'boolean') summary.ok = parsed.ok;
  if (parsed.mode) summary.mode = parsed.mode;
  if (parsed.count != null) summary.count = parsed.count;
  if (parsed.totals && typeof parsed.totals === 'object') summary.totals = parsed.totals;
  if (Array.isArray(parsed.clusters) && parsed.clusters[0]?.slug) summary.first_cluster = parsed.clusters[0].slug;
  if (Array.isArray(parsed.loops)) summary.loop_count = parsed.loops.length;
  if (Array.isArray(parsed.failures)) {
    summary.failures_count = parsed.failures.length;
    summary.sample_failures = parsed.failures.slice(0, 5);
  }
  if (Array.isArray(parsed.issues)) {
    summary.issues_count = parsed.issues.length;
    summary.sample_issues = parsed.issues.slice(0, 5);
  }
  if (Array.isArray(parsed.gaps)) {
    summary.gaps_count = parsed.gaps.length;
    summary.sample_gaps = parsed.gaps.slice(0, 5);
  }
  if (Array.isArray(parsed.queues?.top_review_queue)) {
    summary.top_review_queue = parsed.queues.top_review_queue.slice(0, 5).map(queueItemSummary);
  }
  if (Array.isArray(parsed.tools)) {
    summary.top_tools = parsed.tools.slice(0, 5).map(queueItemSummary);
  }
  return summary;
}

function queueItemSummary(item) {
  if (!item || typeof item !== 'object') return item;
  return {
    slug: item.slug || '',
    title: item.title || '',
    key: item.key || '',
    due_in_days: item.due_in_days ?? item.soonest_due_in_days ?? null,
    path: item.path || '',
  };
}

function commandSummary(command) {
  return {
    label: command.label,
    command: commandLine(command),
    required: command.required === true,
    requires_paths: (command.requires_paths || []).map(substitutePath),
    freshness_paths: (command.requires_paths || []).length ? freshnessPathsFor(command).map(projectPath) : [],
  };
}

function buildFreshnessFor(command) {
  if (!(command.requires_paths || []).length) return null;

  const requiredPath = (command.requires_paths || []).map(substitutePath)[0] || defaultSiteDir;
  const siteDir = resolve(PROJECT_DIR, requiredPath);
  const inputPaths = freshnessPathsFor(command);
  if (!inputPaths.length) {
    return {
      status: 'unknown',
      site_dir: projectPath(siteDir),
      reason: 'no freshness paths configured',
    };
  }

  const newestOutput = newestMtime(siteDir);
  const newestInput = newestMtime(inputPaths);
  if (!newestOutput || !newestInput) {
    return {
      status: 'unknown',
      site_dir: projectPath(siteDir),
      newest_output: newestOutput ? mtimeSummary(newestOutput) : null,
      newest_input: newestInput ? mtimeSummary(newestInput) : null,
      reason: 'could not compare build output and inputs',
    };
  }

  const stale = newestInput.mtimeMs > newestOutput.mtimeMs + STALE_BUILD_GRACE_MS;
  return {
    status: stale ? 'stale' : 'fresh',
    site_dir: projectPath(siteDir),
    newest_output: mtimeSummary(newestOutput),
    newest_input: mtimeSummary(newestInput),
    stale_by_ms: stale ? Math.round(newestInput.mtimeMs - newestOutput.mtimeMs) : 0,
  };
}

function freshnessPathsFor(command) {
  const rawPaths = command.build_freshness_paths || command.freshness_paths || buildFreshnessPaths;
  return rawPaths.map(substitutePath).map((path) => resolve(PROJECT_DIR, path));
}

function newestMtime(paths) {
  const list = Array.isArray(paths) ? paths : [paths];
  let newest = null;
  for (const path of list) {
    const candidate = newestMtimeUnder(path);
    if (candidate && (!newest || candidate.mtimeMs > newest.mtimeMs)) newest = candidate;
  }
  return newest;
}

function newestMtimeUnder(path) {
  if (!existsSync(path)) return null;
  const normalized = normalizeProjectPath(path);
  if (buildFreshnessIgnorePaths.has(normalized)) return null;

  const stats = statSync(path);
  if (!stats.isDirectory()) {
    return {
      path,
      mtimeMs: stats.mtimeMs,
    };
  }

  let newest = null;
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === 'dist-fast') {
      continue;
    }
    const candidate = newestMtimeUnder(join(path, entry.name));
    if (candidate && (!newest || candidate.mtimeMs > newest.mtimeMs)) newest = candidate;
  }
  return newest;
}

function mtimeSummary(item) {
  return {
    path: projectPath(item.path),
    mtime: new Date(item.mtimeMs).toISOString(),
  };
}

function writeLedger(reportData) {
  mkdirSync(LEDGER_DIR, { recursive: true });
  const latestPath = resolve(LEDGER_DIR, 'latest.json');
  const previous = readPreviousLedger(latestPath);
  const timestamp = (reportData.generated_at || new Date().toISOString()).replace(/[:.]/g, '-');
  const runPath = resolve(LEDGER_DIR, `${timestamp}-loop-run.json`);
  const trend = ledgerTrend(previous, reportData);
  const previousFile = existingPreviousLedgerFile(previous);

  reportData.ledger = {
    written: true,
    file: projectPath(runPath),
    latest_file: projectPath(latestPath),
    previous_file: previousFile,
    trend,
  };
  reportData.artifact_refs = loopArtifactRefs(reportData.loops || [], [
    ...dagArtifactRefs(),
    artifactRef('output', 'loop-run-receipt', projectPath(runPath), '', 'Timestamped loop receipt JSON.'),
    artifactRef('output', 'loop-run-latest', projectPath(latestPath), '', 'Latest loop receipt summary JSON.'),
  ]);

  const { payload, latestPayload } = ledgerPayloads(reportData);
  writeFileSync(runPath, payload);
  writeFileSync(latestPath, latestPayload);
}

function ledgerPayloads(reportData) {
  let receiptBytes = {
    full: 0,
    latest: 0,
  };
  let payload = '';
  let latestPayload = '';

  for (let index = 0; index < 6; index += 1) {
    attachEfficiencyMetrics(reportData, receiptBytes);
    payload = `${JSON.stringify(persistableReport(reportData), null, 2)}\n`;
    latestPayload = `${JSON.stringify(latestLedgerSummary(reportData), null, 2)}\n`;
    const nextReceiptBytes = {
      full: Buffer.byteLength(payload, 'utf8'),
      latest: Buffer.byteLength(latestPayload, 'utf8'),
    };
    if (nextReceiptBytes.full === receiptBytes.full && nextReceiptBytes.latest === receiptBytes.latest) break;
    receiptBytes = nextReceiptBytes;
  }

  attachEfficiencyMetrics(reportData, receiptBytes);
  payload = `${JSON.stringify(persistableReport(reportData), null, 2)}\n`;
  latestPayload = `${JSON.stringify(latestLedgerSummary(reportData), null, 2)}\n`;
  return { payload, latestPayload };
}

function persistableReport(reportData) {
  const copy = JSON.parse(JSON.stringify(reportData));
  copy.project_dir = '.';
  return copy;
}

function latestLedgerSummary(reportData) {
  const copy = persistableReport(reportData);
  return {
    ok: copy.ok,
    mode: copy.mode,
    project_dir: copy.project_dir,
    registry_path: copy.registry_path,
    schema_version: copy.schema_version,
    default_site_dir: copy.default_site_dir,
    generated_at: copy.generated_at,
    goal_id: copy.goal_id || 'unscoped-goal',
    run_id: copy.run_id || '',
    residual_risks: copy.residual_risks || [],
    next_actions: copy.next_actions || [],
    trace: copy.trace || null,
    artifact_refs: copy.artifact_refs || [],
    duration_ms: copy.duration_ms,
    efficiency_metrics: copy.efficiency_metrics || null,
    totals: copy.totals,
    review: copy.review,
    system_progress: copy.system_progress || null,
    loops: (copy.loops || []).map((loop) => ({
      id: loop.id,
      title: loop.title,
      status: loop.status,
      duration_ms: loop.duration_ms,
      attention_reasons: loop.attention_reasons || [],
      skip_reason: loop.skip_reason || '',
      commands: (loop.commands || []).map((command) => ({
        label: command.label,
        status: command.status,
        duration_ms: command.duration_ms,
        attention_reasons: command.attention_reasons || [],
        build_freshness: command.build_freshness || null,
      })),
    })),
    ledger: copy.ledger,
  };
}

function traceBlock(name, runId, startedAt, endedAt, durationMs) {
  const traceId = TRACE_ID || stableTraceId(GOAL_ID, runId);
  return {
    trace_id: traceId,
    span_id: stableTraceId('span', name, runId, startedAt),
    parent_span_id: PARENT_SPAN_ID,
    name,
    started_at: startedAt,
    ended_at: endedAt,
    duration_ms: durationMs,
  };
}

function stableTraceId(...parts) {
  return parts
    .filter(Boolean)
    .join(':')
    .replace(/[^A-Za-z0-9_.:-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 180) || 'unscoped-trace';
}

function loopArtifactRefs(loopReports, extraRefs = []) {
  const refs = [
    artifactRef('input', 'loop-registry', projectPath(REGISTRY_PATH), '', 'Loop registry used for this run.'),
    ...extraRefs,
  ];
  for (const loop of loopReports || []) {
    for (const target of loop.record_targets || []) {
      refs.push(artifactRef('declared-output', 'record-target', target, `${loop.id}:record-target:${target}`, `Declared record target for ${loop.id}.`));
    }
    for (const command of loop.commands || []) {
      refs.push({
        role: 'embedded',
        kind: 'loop-command',
        id: stableTraceId(loop.id, command.label),
        description: command.command || command.label || 'Loop command.',
        status: command.status || '',
      });
      if (command.build_freshness?.site_dir) {
        refs.push(artifactRef('input', 'built-output', command.build_freshness.site_dir, `${loop.id}:built-output`, `Built output checked by ${loop.id}.`));
      }
    }
  }
  return dedupeArtifactRefs(refs);
}

function dagArtifactRefs() {
  return [
    ...DAG_GRAPH_REFS.map((path) => artifactRef('output', 'agent-task-dag', path, '', 'Generated agent task DAG graph.')),
    ...DAG_VALIDATION_REPORT_REFS.map((path) => artifactRef('output', 'agent-task-dag-validation-report', path, '', 'agent:dag:check validation report for an agent task DAG.')),
  ];
}

function artifactRef(role, kind, path, id = '', description = '') {
  const ref = { role, kind };
  if (path) ref.path = normalizeProjectPath(path);
  if (id) ref.id = id;
  if (description) ref.description = description;
  return ref;
}

function dedupeArtifactRefs(refs) {
  const seen = new Set();
  const deduped = [];
  for (const ref of refs) {
    const key = [ref.role, ref.kind, ref.path || '', ref.id || ''].join('|');
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(ref);
  }
  return deduped;
}

function readPreviousLedger(latestPath) {
  if (!existsSync(latestPath)) return null;
  try {
    return JSON.parse(readFileSync(latestPath, 'utf8'));
  } catch {
    return null;
  }
}

function existingPreviousLedgerFile(previous) {
  const previousFile = previous?.ledger?.file || '';
  if (!previousFile) return '';
  return existsSync(resolve(PROJECT_DIR, previousFile)) ? previousFile : '';
}

function ledgerTrend(previous, current) {
  if (!previous?.totals) {
    return {
      previous_run: '',
      status_changes: [],
      duration_delta_ms: null,
      totals_delta: null,
    };
  }

  const previousLoops = new Map((previous.loops || []).map((loop) => [loop.id, loop.status]));
  const statusChanges = (current.loops || [])
    .filter((loop) => previousLoops.has(loop.id) && previousLoops.get(loop.id) !== loop.status)
    .map((loop) => ({
      loop_id: loop.id,
      previous: previousLoops.get(loop.id),
      current: loop.status,
    }));

  return {
    previous_run: previous.generated_at || previous.ledger?.file || '',
    status_changes: statusChanges,
    duration_delta_ms: typeof previous.duration_ms === 'number' ? current.duration_ms - previous.duration_ms : null,
    totals_delta: {
      ok: current.totals.ok - Number(previous.totals.ok || 0),
      attention: current.totals.attention - Number(previous.totals.attention || 0),
      skipped: current.totals.skipped - Number(previous.totals.skipped || 0),
    },
  };
}

function selectLoops(loops) {
  if (!LOOP_IDS.length || RUN_ALL) return loops;
  const byId = new Map(loops.map((loop) => [loop.id, loop]));
  return LOOP_IDS.map((id) => byId.get(id)).filter(Boolean);
}

function substitutedArgs(commandArgs) {
  return commandArgs.map((arg) => (arg === 'dist-fast/client' ? defaultSiteDir : arg));
}

function substitutePath(path) {
  return path === 'dist-fast/client' ? defaultSiteDir : path;
}

function commandLine(command) {
  return [command.command, ...substitutedArgs(command.args || [])].join(' ');
}

function parseJson(output) {
  const text = String(output || '').trim();
  if (!text.startsWith('{') && !text.startsWith('[')) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function tail(output) {
  const text = String(output || '').trim();
  if (!text) return '';
  return text.split(/\r?\n/).slice(-8).join('\n').slice(-4000);
}

function emitReport(reportData) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(reportData, null, 2)}\n`);
    return;
  }

  if (!reportData.ok) {
    console.error(`[aipedia-loops] ${reportData.mode}`);
    for (const issue of reportData.argument_issues || []) console.error(`- ${issue.detail}`);
    if (reportData.next_action) console.error(reportData.next_action);
    return;
  }

  if (reportData.mode === 'loop-registry') {
    console.log(`AiPedia loop registry: ${reportData.loop_count} loop(s)`);
    for (const loop of reportData.loops) {
      console.log(`\n${loop.id}: ${loop.title}`);
      console.log(`  ${loop.purpose}`);
      console.log(`  commands: ${loop.commands.map((command) => command.label).join(', ') || 'none'}`);
    }
    console.log('\nRun with --run to execute read-only loop checks.');
    return;
  }

  console.log(`AiPedia loop run: ${reportData.review.summary}`);
  for (const loop of reportData.loops) {
    console.log(`\n${loop.status.toUpperCase()} ${loop.id}: ${loop.title}`);
    for (const command of loop.commands) {
      const detail = command.status === 'skipped'
        ? command.skip_reason
        : command.attention_reasons.join('; ') || `exit ${command.exit_code}`;
      console.log(`  - ${command.status}: ${command.label} (${detail})`);
    }
  }
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
      if (value && !value.startsWith('-')) values.push(value);
    } else if (arg.startsWith(`${flag}=`)) {
      values.push(arg.slice(flag.length + 1));
    }
  }
  return values;
}

function envList(name) {
  const value = process.env[name] || '';
  return value
    .split(/\r?\n|;;/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function pathsFromFiles(files) {
  const paths = [];
  for (const file of files.map((path) => normalizeProjectPath(path)).filter(Boolean)) {
    const fullPath = resolve(PROJECT_DIR, file);
    if (!existsSync(fullPath)) continue;
    paths.push(...readFileSync(fullPath, 'utf8').split(/\r?\n/));
  }
  return paths.map((path) => path.trim()).filter(Boolean);
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
      if (!VALUE_FLAGS.has(previous)) issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) {
      issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
      continue;
    }

    if (VALUE_FLAGS.has(name)) {
      if (arg.includes('=')) {
        if (!arg.slice(name.length + 1)) issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
        continue;
      }
      const value = args[index + 1];
      if (!value || value.startsWith('-')) issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
      continue;
    }

    if (arg.includes('=')) issues.push({ code: 'argument-invalid', detail: `${name} does not accept a value` });
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }
  if (hasFlag('--site-dir') && hasFlag('--dist-dir')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --site-dir or --dist-dir' });
  }
  if (RUN_ALL && LOOP_IDS.length) {
    issues.push({ code: 'argument-invalid', detail: 'choose either --all or one or more --loop values' });
  }
  if (WRITE_LEDGER && !RUN_MODE) {
    issues.push({ code: 'argument-invalid', detail: '--write-ledger requires --run' });
  }
  if (REQUIRE_SYSTEM_PROGRESS && !RUN_MODE) {
    issues.push({ code: 'argument-invalid', detail: '--require-system-progress requires --run' });
  }

  return issues;
}

function projectPath(path) {
  return relative(PROJECT_DIR, path).replace(/\\/g, '/');
}

function normalizeProjectPath(path) {
  return projectPath(resolve(PROJECT_DIR, path));
}

function commandLineText(command, commandArgs) {
  return [command, ...commandArgs].join(' ');
}
