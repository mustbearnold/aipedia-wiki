#!/usr/bin/env node
// Shared AiPedia loop registry and read-only loop runner.

import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const REGISTRY_PATH = resolve(PROJECT_DIR, valueFor('--registry') || 'src/data/aipedia-loops.json');
const JSON_MODE = hasFlag('--json');
const RUN_MODE = hasFlag('--run');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const LOOP_IDS = valuesFor('--loop');
const RUN_ALL = hasFlag('--all');
const SITE_DIR_ARG = valueFor('--site-dir') || valueFor('--dist-dir') || '';
const WRITE_LEDGER = hasFlag('--write-ledger');
const LEDGER_DIR = resolve(PROJECT_DIR, valueFor('--ledger-dir') || '.agent/loop-runs/system');
const KNOWN_FLAGS = new Set([
  '--all',
  '--dist-dir',
  '--ledger-dir',
  '--json',
  '--loop',
  '--project-dir',
  '--registry',
  '--root',
  '--run',
  '--site-dir',
  '--write-ledger',
  '--help',
  '-h',
]);
const VALUE_FLAGS = new Set(['--dist-dir', '--ledger-dir', '--loop', '--project-dir', '--registry', '--root', '--site-dir']);
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
  const loopReports = loops.map(runLoop);
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
    generated_at: new Date().toISOString(),
    duration_ms: Math.round(performance.now() - startedAt),
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
    summary: attention.length
      ? `${attention.length} loop(s) need attention; ${clean.length} ok; ${skipped.length} skipped.`
      : `${clean.length} loop(s) ok; ${skipped.length} skipped.`,
    attention_loops: attention.map((loop) => loop.id),
    skipped_loops: skipped.map((loop) => loop.id),
    recommendations,
    next_actions: recommendations.slice(0, 5).map((item) => `${item.loop_id}: ${item.action}`),
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

  reportData.ledger = {
    written: true,
    file: projectPath(runPath),
    latest_file: projectPath(latestPath),
    previous_file: previous?.ledger?.file || '',
    trend,
  };

  const payload = `${JSON.stringify(persistableReport(reportData), null, 2)}\n`;
  const latestPayload = `${JSON.stringify(latestLedgerSummary(reportData), null, 2)}\n`;
  writeFileSync(runPath, payload);
  writeFileSync(latestPath, latestPayload);
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
    duration_ms: copy.duration_ms,
    totals: copy.totals,
    review: copy.review,
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

function readPreviousLedger(latestPath) {
  if (!existsSync(latestPath)) return null;
  try {
    return JSON.parse(readFileSync(latestPath, 'utf8'));
  } catch {
    return null;
  }
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

  return issues;
}

function projectPath(path) {
  return relative(PROJECT_DIR, path).replace(/\\/g, '/');
}

function normalizeProjectPath(path) {
  return projectPath(resolve(PROJECT_DIR, path));
}
