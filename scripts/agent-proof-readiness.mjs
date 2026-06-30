#!/usr/bin/env node
// Report whether bounded meta-goal proof pilots are ready to run.

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROJECT_DIR = dirname(SCRIPT_DIR);
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || DEFAULT_PROJECT_DIR);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const INPUT_FRESHNESS_PATH = valueFor('--input-freshness');
const GIT_STATUS_PATH = valueFor('--git-status-file');
const TARGETS = {
  'page-refresh-policy': {
    id: 'page-refresh-policy',
    workflow: 'page-refresh',
    proof_goal: 'Positive bounded page-refresh runner policy proof.',
    description: 'Positive bounded page-refresh runner policy proof.',
    input_check_id: 'page-refresh-input-freshness',
    dirty_check_id: 'dirty-content-boundary',
    dirty_blocker_code: 'dirty-content-wip',
    dirty_blocker_message: 'Dirty content or generated content-support files make a positive page-refresh proof unsafe until ownership is resolved.',
    dirty_path_predicate: isPageRefreshBlockingDirtyPath,
    recommended_ready_commands: [
      'npm run runner:page-refresh:plan -- --fail-on-stale-ledger',
      'npm run runner:page-refresh:closeout',
      'npm run agent:meta:closeout:auto -- --receipt <page-refresh-closeout.json> --json',
    ],
    ready_next_actions: [
      'Run the bounded page-refresh runner proof and validate the generated closeout with agent:meta:closeout:auto.',
    ],
    blocked_next_actions: pageRefreshBlockedActions,
  },
  'tool-refresh-policy': {
    id: 'tool-refresh-policy',
    workflow: 'tool-refresh',
    proof_goal: 'Positive bounded tool-refresh runner policy proof.',
    description: 'Positive bounded tool-refresh runner policy proof.',
    input_check_id: 'tool-refresh-input-freshness',
    dirty_check_id: 'dirty-tool-refresh-boundary',
    dirty_blocker_code: 'dirty-tool-refresh-wip',
    dirty_blocker_message: 'Dirty tool content or generated content-support files make a positive tool-refresh proof unsafe until ownership is resolved.',
    dirty_path_predicate: isToolRefreshBlockingDirtyPath,
    recommended_ready_commands: [
      'npm run runner:tool-refresh:plan -- --fail-on-stale-inputs',
      'npm run runner:tool-refresh:closeout',
      'npm run agent:meta:closeout:auto -- --receipt <tool-refresh-closeout.json> --json',
    ],
    ready_next_actions: [
      'Run the bounded tool-refresh runner proof and validate the generated closeout with agent:meta:closeout:auto.',
    ],
    blocked_next_actions: toolRefreshBlockedActions,
  },
  'affiliate-handoff-policy': {
    id: 'affiliate-handoff-policy',
    workflow: 'affiliate-conversion',
    proof_goal: 'Positive bounded affiliate handoff policy proof.',
    description: 'Positive bounded affiliate handoff policy proof.',
    input_check_id: 'affiliate-conversion-input-freshness',
    recommended_ready_commands: [
      'npm run runner:affiliate-conversion:plan -- --fail-on-stale-inputs',
      'npm run runner:affiliate-conversion:reports -- --strict',
      'npm run runner:affiliate-conversion:handoff',
      'npm run agent:closeout:check -- --receipt <affiliate-handoff.json> --require-workflow-policy --json',
    ],
    ready_next_actions: [
      'Run the bounded affiliate handoff proof and validate the handoff receipt with agent:closeout:check --require-workflow-policy.',
    ],
    blocked_next_actions: affiliateBlockedActions,
  },
};
const KNOWN_TARGETS = Object.keys(TARGETS);
const KNOWN_FLAGS = new Set([
  '--git-status-file',
  '--help',
  '-h',
  '--input-freshness',
  '--json',
  '--project-dir',
  '--root',
  '--target',
]);
const VALUE_FLAGS = new Set(['--git-status-file', '--input-freshness', '--project-dir', '--root', '--target']);

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emit({
    ok: false,
    mode: 'meta-proof-readiness',
    schema_version: 'aipedia.meta-proof-readiness.v1',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
    targets: [],
  });
  process.exit(2);
}

const selectedTargets = valuesFor('--target').length ? [...new Set(valuesFor('--target'))] : KNOWN_TARGETS;
const selectedWorkflows = [...new Set(selectedTargets.map((target) => TARGETS[target]?.workflow).filter(Boolean))];
const gitStatus = readGitStatus();
const inputFreshness = readInputFreshness(selectedWorkflows);
const targets = selectedTargets.map((target) => evaluateTarget(target, { gitStatus, inputFreshness }));
const report = {
  ok: targets.every((target) => target.ok),
  mode: 'meta-proof-readiness',
  schema_version: 'aipedia.meta-proof-readiness.v1',
  generated_at: new Date().toISOString(),
  project_dir: PROJECT_DIR,
  argument_issues: [],
  selected_targets: selectedTargets,
  summary: {
    target_count: targets.length,
    ready_count: targets.filter((target) => target.status === 'ready').length,
    blocked_count: targets.filter((target) => target.status === 'blocked').length,
    unknown_count: targets.filter((target) => target.status === 'unknown').length,
  },
  inputs: {
    input_freshness_source: inputFreshness.source,
    input_freshness_exit_code: inputFreshness.exit_code,
    git_status_source: gitStatus.source,
    git_status_exit_code: gitStatus.exit_code,
  },
  targets,
  next_actions: [...new Set(targets.flatMap((target) => target.next_actions))],
};

emit(report);
process.exit(report.ok ? 0 : 1);

function usage() {
  return [
    'Usage:',
    '  node scripts/agent-proof-readiness.mjs --json',
    '  node scripts/agent-proof-readiness.mjs --target page-refresh-policy --json',
    '',
    'Read-only readiness checks for bounded June 30 meta-goal proof pilots.',
    '',
    'Targets:',
    ...KNOWN_TARGETS.map((target) => `  ${target.padEnd(25)} ${TARGETS[target].description}`),
    '',
    'Options:',
    '  --target <id>              Target to check. Repeatable. Default: all known targets.',
    '  --input-freshness <path>   Read an existing input-freshness receipt instead of running one.',
    '  --git-status-file <path>   Read fixture git status text instead of running git status --short.',
    '  --project-dir <dir>        Project root. Alias: --root.',
    '  --json                     Emit a structured report.',
    '  --help                     Show this help.',
  ].join('\n');
}

function evaluateTarget(target, context) {
  const config = TARGETS[target];
  if (!config) {
    return {
      ok: false,
      id: target,
      status: 'unknown',
      workflow: '',
      blockers: [blocker('unknown-target', `Unknown proof target ${target}.`)],
      next_actions: [`Use one of: ${KNOWN_TARGETS.join(', ')}.`],
    };
  }

  const blockers = [];
  const freshnessWorkflow = findFreshnessWorkflow(context.inputFreshness.report, config.workflow);
  if (!freshnessWorkflow) {
    blockers.push(blocker('input-freshness-missing', `Input freshness receipt does not include ${config.workflow}.`));
  } else if (freshnessWorkflow.ok !== true || freshnessWorkflow.status !== 'fresh') {
    blockers.push(blocker('input-freshness-stale', freshnessWorkflow.next_action || `${config.workflow} input freshness is not fresh.`, {
      status: freshnessWorkflow.status || '',
      input: freshnessWorkflow.input || '',
      refresh_command: freshnessWorkflow.refresh_command || '',
      enforce_command: freshnessWorkflow.enforce_command || '',
    }));
  }
  if (context.inputFreshness.exit_code !== 0 && !INPUT_FRESHNESS_PATH) {
    blockers.push(blocker('input-freshness-command-failed', 'Live input freshness command exited non-zero.', {
      exit_code: context.inputFreshness.exit_code,
      stderr_tail: context.inputFreshness.stderr_tail,
    }));
  }

  const dirtyPaths = config.dirty_path_predicate
    ? context.gitStatus.paths.filter(config.dirty_path_predicate)
    : [];
  if (dirtyPaths.length) {
    blockers.push(blocker(config.dirty_blocker_code, config.dirty_blocker_message, { paths: dirtyPaths }));
  }
  if (context.gitStatus.exit_code !== 0 && !GIT_STATUS_PATH) {
    blockers.push(blocker('git-status-failed', 'git status --short exited non-zero.', {
      exit_code: context.gitStatus.exit_code,
      stderr_tail: context.gitStatus.stderr_tail,
    }));
  }

  const ready = blockers.length === 0;
  return {
    ok: ready,
    id: config.id,
    status: ready ? 'ready' : 'blocked',
    workflow: config.workflow,
    proof_goal: config.proof_goal,
    blockers,
    readiness_checks: [
      {
        id: config.input_check_id,
        ok: freshnessWorkflow?.ok === true && freshnessWorkflow?.status === 'fresh',
        status: freshnessWorkflow?.status || 'missing',
      },
      ...(config.dirty_check_id ? [{
        id: config.dirty_check_id,
        ok: dirtyPaths.length === 0,
        dirty_paths: dirtyPaths,
      }] : []),
    ],
    recommended_commands: ready
      ? config.recommended_ready_commands
      : [`npm --silent run agent:proof:readiness -- --target ${config.id} --json`],
    next_actions: ready ? config.ready_next_actions : config.blocked_next_actions(blockers),
  };
}

function readInputFreshness(workflows) {
  if (INPUT_FRESHNESS_PATH) {
    const path = resolve(PROJECT_DIR, INPUT_FRESHNESS_PATH);
    if (!existsSync(path)) {
      return {
        source: projectPath(path),
        exit_code: 2,
        stderr_tail: `Missing input freshness fixture: ${projectPath(path)}`,
        report: null,
      };
    }
    try {
      return {
        source: projectPath(path),
        exit_code: 0,
        stderr_tail: '',
        report: JSON.parse(readFileSync(path, 'utf8')),
      };
    } catch (error) {
      return {
        source: projectPath(path),
        exit_code: 2,
        stderr_tail: error.message,
        report: null,
      };
    }
  }
  const result = spawnSync(process.execPath, [
    resolve(SCRIPT_DIR, 'agent-input-freshness-receipt.mjs'),
    ...workflows.flatMap((workflow) => ['--workflow', workflow]),
    '--json',
    '--project-dir',
    PROJECT_DIR,
  ], {
    cwd: DEFAULT_PROJECT_DIR,
    encoding: 'utf8',
  });
  const workflowText = workflows.map((workflow) => `--workflow ${workflow}`).join(' ');
  return {
    source: `node scripts/agent-input-freshness-receipt.mjs ${workflowText} --json`,
    exit_code: result.status ?? 1,
    stderr_tail: tail(result.stderr),
    report: parseJson(result.stdout),
  };
}

function readGitStatus() {
  if (GIT_STATUS_PATH) {
    const path = resolve(PROJECT_DIR, GIT_STATUS_PATH);
    if (!existsSync(path)) {
      return {
        source: projectPath(path),
        exit_code: 2,
        stderr_tail: `Missing git status fixture: ${projectPath(path)}`,
        paths: [],
      };
    }
    return {
      source: projectPath(path),
      exit_code: 0,
      stderr_tail: '',
      paths: parseGitStatus(readFileSync(path, 'utf8')),
    };
  }
  const result = spawnSync('git', ['status', '--short'], {
    cwd: PROJECT_DIR,
    encoding: 'utf8',
  });
  return {
    source: 'git status --short',
    exit_code: result.status ?? 1,
    stderr_tail: tail(result.stderr),
    paths: parseGitStatus(result.stdout),
  };
}

function parseGitStatus(text) {
  return String(text || '')
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map((line) => {
      const rawPath = line.slice(3).trim();
      const renamed = rawPath.includes(' -> ') ? rawPath.split(' -> ').at(-1).trim() : rawPath;
      return renamed;
    })
    .filter(Boolean);
}

function isPageRefreshBlockingDirtyPath(path) {
  return path === 'PAGE_REFRESH_LEDGER.md'
    || path === 'src/data/source-registry.json'
    || path === 'src/data/coverage-backlog.json'
    || path.startsWith('src/content/');
}

function isToolRefreshBlockingDirtyPath(path) {
  return path === 'PAGE_REFRESH_LEDGER.md'
    || path === 'src/data/source-registry.json'
    || path === 'src/data/coverage-backlog.json'
    || path.startsWith('src/content/tools/');
}

function findFreshnessWorkflow(receipt, workflow) {
  if (!receipt || !Array.isArray(receipt.workflows)) return null;
  return receipt.workflows.find((item) => item && item.id === workflow) || null;
}

function pageRefreshBlockedActions(blockers) {
  const actions = [];
  if (blockers.some((item) => item.code === 'dirty-content-wip')) {
    actions.push('Resolve, commit, or explicitly set aside dirty content and content-support files before running the positive page-refresh policy proof.');
  }
  if (blockers.some((item) => item.code === 'input-freshness-stale')) {
    actions.push('Regenerate and check PAGE_REFRESH_LEDGER.md only after dirty content ownership is resolved, then rerun proof readiness.');
  }
  if (!actions.length) actions.push('Clear the listed blockers, then rerun proof readiness.');
  return actions;
}

function toolRefreshBlockedActions(blockers) {
  const actions = [];
  if (blockers.some((item) => item.code === 'dirty-tool-refresh-wip')) {
    actions.push('Resolve, commit, or explicitly set aside dirty tool content and content-support files before running the positive tool-refresh policy proof.');
  }
  if (blockers.some((item) => item.code === 'input-freshness-stale')) {
    actions.push('Refresh the tool-refresh freshness report, rerun proof readiness, then run the bounded tool-refresh policy proof.');
  }
  if (!actions.length) actions.push('Clear the listed blockers, then rerun proof readiness.');
  return actions;
}

function affiliateBlockedActions(blockers) {
  const actions = [];
  if (blockers.some((item) => item.code === 'input-freshness-stale')) {
    actions.push('Refresh the affiliate conversion inventory, rerun proof readiness, then run the bounded affiliate handoff policy proof.');
  }
  if (!actions.length) actions.push('Clear the listed blockers, then rerun proof readiness.');
  return actions;
}

function collectArgumentIssues() {
  const issues = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const name = flagName(arg);
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] || '';
      if (!VALUE_FLAGS.has(flagName(previous))) issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }
    if (!KNOWN_FLAGS.has(name)) issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
    if (VALUE_FLAGS.has(name)) {
      const value = arg.includes('=') ? arg.slice(name.length + 1) : args[index + 1] || '';
      if (!value || value.startsWith('-')) issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
      if (!arg.includes('=')) index += 1;
    }
  }
  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }
  for (const target of valuesFor('--target')) {
    if (!KNOWN_TARGETS.includes(target)) issues.push({ code: 'argument-invalid', detail: `unknown target ${target}` });
  }
  return issues;
}

function valuesFor(flag) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === flag && args[index + 1]) {
      values.push(args[index + 1]);
      index += 1;
    } else if (arg.startsWith(`${flag}=`)) {
      values.push(arg.slice(flag.length + 1));
    }
  }
  return values.flatMap((value) => String(value).split(',').map((part) => part.trim()).filter(Boolean));
}

function valueFor(flag) {
  return valuesFor(flag).at(-1) || '';
}

function hasFlag(flag) {
  return args.includes(flag) || args.some((arg) => arg.startsWith(`${flag}=`));
}

function flagName(arg) {
  const equalsIndex = String(arg).indexOf('=');
  return equalsIndex >= 0 ? String(arg).slice(0, equalsIndex) : String(arg);
}

function parseJson(text) {
  const value = String(text || '').trim();
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function tail(text) {
  const value = String(text || '').trim();
  if (value.length <= 4000) return value;
  return value.slice(-4000);
}

function blocker(code, message, details = {}) {
  return { code, message, ...details };
}

function emit(report) {
  if (JSON_MODE) {
    console.log(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }
  if (report.ok) {
    console.log(`[agent-proof-readiness] ok: ${report.summary.ready_count}/${report.summary.target_count} target(s) ready`);
    return;
  }
  const blockers = report.targets.flatMap((target) => target.blockers || []);
  const blockerText = blockers.map((item) => `${item.code}: ${item.message}`).join('; ') || 'readiness blocked';
  console.error(`[agent-proof-readiness] blocked: ${blockerText}`);
}

function projectPath(path) {
  const absolutePath = resolve(path);
  const rel = relative(PROJECT_DIR, absolutePath);
  if (!rel.startsWith('..')) return rel || '.';
  return absolutePath;
}
