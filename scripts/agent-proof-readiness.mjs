#!/usr/bin/env node
// Report whether bounded meta-goal proof pilots are ready to run.

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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
const OUT_PATH = valueFor('--out') || valueFor('--receipt-out');
const PROOF_TARGETS_PATH = valueFor('--proof-targets') || '.agent/meta/proof-readiness-targets.json';
const PROOF_TARGETS_EXPLICIT = hasFlag('--proof-targets');
const OBSERVED_DIRTY_BEFORE_AGENT = [...new Set(valuesFor('--observed-dirty-before-agent'))];
const OBSERVED_DIRTY_BEFORE_AGENT_SET = new Set(OBSERVED_DIRTY_BEFORE_AGENT);
const ALLOW_OBSERVED_DIRTY_BOUNDARY = hasFlag('--allow-observed-dirty-boundary');
const DEFAULT_TARGETS = {
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
    proof_receipts: [],
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
    proof_receipts: [],
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
    proof_receipts: [],
    proved_next_actions: [
      'Use the durable affiliate handoff proof as the positive policy baseline and move to the next unproved proof target.',
    ],
  },
};
let TARGETS = DEFAULT_TARGETS;
const KNOWN_TARGETS = Object.keys(DEFAULT_TARGETS);
const KNOWN_FLAGS = new Set([
  '--allow-observed-dirty-boundary',
  '--git-status-file',
  '--help',
  '-h',
  '--input-freshness',
  '--json',
  '--observed-dirty-before-agent',
  '--out',
  '--project-dir',
  '--proof-targets',
  '--receipt-out',
  '--root',
  '--target',
]);
const VALUE_FLAGS = new Set(['--git-status-file', '--input-freshness', '--observed-dirty-before-agent', '--out', '--project-dir', '--proof-targets', '--receipt-out', '--root', '--target']);

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

const proofTargetRegistry = readProofTargetRegistry();
if (proofTargetRegistry.issues.length) {
  emit({
    ok: false,
    mode: 'meta-proof-readiness',
    schema_version: 'aipedia.meta-proof-readiness.v1',
    project_dir: PROJECT_DIR,
    argument_issues: [],
    registry_issues: proofTargetRegistry.issues,
    selected_targets: [],
    inputs: {
      proof_target_registry_source: proofTargetRegistry.source,
      proof_target_registry_status: proofTargetRegistry.status,
      proof_target_registry_issue_count: proofTargetRegistry.issues.length,
    },
    targets: [],
    next_actions: ['Fix the proof-readiness target registry, then rerun proof readiness.'],
  });
  process.exit(2);
}
TARGETS = applyProofTargetRegistry(DEFAULT_TARGETS, proofTargetRegistry.report);

const selectedTargets = valuesFor('--target').length ? [...new Set(valuesFor('--target'))] : KNOWN_TARGETS;
const selectedWorkflows = [...new Set(selectedTargets.map((target) => TARGETS[target]?.workflow).filter(Boolean))];
const gitStatus = readGitStatus();
const inputFreshness = readInputFreshness(selectedWorkflows);
const inputRefreshPlan = readInputRefreshPlan(selectedWorkflows, inputFreshness);
const targets = selectedTargets.map((target) => evaluateTarget(target, { gitStatus, inputFreshness, inputRefreshPlan }));
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
    proved_count: targets.filter((target) => target.status === 'proved').length,
    blocked_count: targets.filter((target) => target.status === 'blocked').length,
    unknown_count: targets.filter((target) => target.status === 'unknown').length,
  },
  inputs: {
    input_freshness_source: inputFreshness.source,
    input_freshness_exit_code: inputFreshness.exit_code,
    input_refresh_plan_source: inputRefreshPlan.source,
    input_refresh_plan_exit_code: inputRefreshPlan.exit_code,
    input_refresh_plan_status: inputRefreshPlan.status,
    input_refresh_plan_count: inputRefreshPlan.count,
    git_status_source: gitStatus.source,
    git_status_exit_code: gitStatus.exit_code,
    proof_target_registry_source: proofTargetRegistry.source,
    proof_target_registry_status: proofTargetRegistry.status,
    proof_target_registry_issue_count: proofTargetRegistry.issues.length,
    observed_dirty_before_agent: OBSERVED_DIRTY_BEFORE_AGENT,
    allow_observed_dirty_boundary: ALLOW_OBSERVED_DIRTY_BOUNDARY,
  },
  targets,
  next_actions: [...new Set(targets.flatMap((target) => target.next_actions))],
};
const writeIssue = writeReadinessReceipt(report);
if (writeIssue) {
  report.ok = false;
  report.write_issue = writeIssue;
  emit(report);
  process.exit(2);
}

emit(report);
process.exit(report.ok ? 0 : 1);

function usage() {
  return [
    'Usage:',
    '  node scripts/agent-proof-readiness.mjs --json',
    '  node scripts/agent-proof-readiness.mjs --target page-refresh-policy --json',
    '',
    'Read-only readiness checks for bounded June 30 meta-goal proof pilots.',
    'Configured durable proof receipts are validated and reported as proved instead of ready.',
    '',
    'Targets:',
    ...KNOWN_TARGETS.map((target) => `  ${target.padEnd(25)} ${TARGETS[target].description}`),
    '',
    'Options:',
    '  --target <id>              Target to check. Repeatable. Default: all known targets.',
    '  --input-freshness <path>   Read an existing input-freshness receipt instead of running one.',
    '  --git-status-file <path>   Read fixture git status text instead of running git status --short.',
    '  --observed-dirty-before-agent <path>',
    '                              Repeatable dirty path to record as pre-existing work.',
    '  --allow-observed-dirty-boundary',
    '                              Let declared pre-existing dirty paths pass dirty-boundary checks.',
    '  --out <path>               Write the JSON readiness receipt to a file. Alias: --receipt-out.',
    '  --proof-targets <path>     Read configured durable proof receipts. Default: .agent/meta/proof-readiness-targets.json.',
    '  --project-dir <dir>        Project root. Alias: --root.',
    '  --json                     Emit a structured report.',
    '  --help                     Show this help.',
  ].join('\n');
}

function readProofTargetRegistry() {
  const path = resolve(PROJECT_DIR, PROOF_TARGETS_PATH);
  const source = projectPath(path);
  if (!existsSync(path)) {
    return {
      source,
      status: PROOF_TARGETS_EXPLICIT ? 'missing' : 'absent',
      report: null,
      issues: PROOF_TARGETS_EXPLICIT
        ? [blocker('proof-target-registry-missing', `Proof target registry not found: ${source}.`)]
        : [],
    };
  }

  try {
    const report = JSON.parse(readFileSync(path, 'utf8'));
    const issues = validateProofTargetRegistry(report, source);
    return {
      source,
      status: issues.length ? 'invalid' : 'loaded',
      report: issues.length ? null : report,
      issues,
    };
  } catch (error) {
    return {
      source,
      status: 'invalid',
      report: null,
      issues: [blocker('proof-target-registry-invalid-json', `Could not parse proof target registry ${source}: ${error.message}.`)],
    };
  }
}

function validateProofTargetRegistry(value, source) {
  const issues = [];
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return [blocker('proof-target-registry-invalid', `Proof target registry ${source} must be an object.`)];
  }
  if (value.schema_version !== 'aipedia.meta-proof-readiness-targets.v1') {
    issues.push(blocker('proof-target-registry-schema-invalid', `Proof target registry ${source} has unsupported schema_version.`));
  }
  if (!Array.isArray(value.targets)) {
    issues.push(blocker('proof-target-registry-targets-invalid', `Proof target registry ${source} must include a targets array.`));
    return issues;
  }
  const seen = new Set();
  value.targets.forEach((target, index) => {
    const path = `targets[${index}]`;
    if (!target || typeof target !== 'object' || Array.isArray(target)) {
      issues.push(blocker('proof-target-registry-target-invalid', `${path} must be an object.`));
      return;
    }
    if (typeof target.id !== 'string' || !target.id.trim()) {
      issues.push(blocker('proof-target-registry-target-id-invalid', `${path}.id must be a non-empty string.`));
      return;
    }
    if (seen.has(target.id)) {
      issues.push(blocker('proof-target-registry-target-duplicate', `${path}.id duplicates ${target.id}.`));
    }
    seen.add(target.id);
    if (!KNOWN_TARGETS.includes(target.id)) {
      issues.push(blocker('proof-target-registry-target-unknown', `${path}.id is not a known proof target: ${target.id}.`));
    }
    if (target.proof_receipts != null && !isStringArray(target.proof_receipts)) {
      issues.push(blocker('proof-target-registry-receipts-invalid', `${path}.proof_receipts must be an array of strings when present.`));
    }
    if (target.proved_next_actions != null && !isStringArray(target.proved_next_actions)) {
      issues.push(blocker('proof-target-registry-actions-invalid', `${path}.proved_next_actions must be an array of strings when present.`));
    }
  });
  return issues;
}

function applyProofTargetRegistry(defaultTargets, registry) {
  const targets = Object.fromEntries(Object.entries(defaultTargets).map(([id, config]) => [
    id,
    {
      ...config,
      proof_receipts: [...(config.proof_receipts || [])],
      proved_next_actions: [...(config.proved_next_actions || [])],
    },
  ]));
  for (const target of registry?.targets || []) {
    if (!targets[target.id]) continue;
    targets[target.id] = {
      ...targets[target.id],
      proof_receipts: Array.isArray(target.proof_receipts) ? [...target.proof_receipts] : targets[target.id].proof_receipts,
      proved_next_actions: Array.isArray(target.proved_next_actions) ? [...target.proved_next_actions] : targets[target.id].proved_next_actions,
    };
  }
  return targets;
}

function writeReadinessReceipt(report) {
  if (!OUT_PATH) return null;
  const path = resolve(PROJECT_DIR, OUT_PATH);
  report.receipt_path = projectPath(path);
  try {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, `${JSON.stringify(report, null, 2)}\n`);
    return null;
  } catch (error) {
    return {
      code: 'receipt-write-failed',
      message: `Could not write readiness receipt: ${error.message}`,
      path: projectPath(path),
    };
  }
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

  const proofCompletion = evaluateProofCompletion(config);
  if (proofCompletion.status === 'proved') {
    return {
      ok: true,
      id: config.id,
      status: 'proved',
      workflow: config.workflow,
      proof_goal: config.proof_goal,
      blockers: [],
      proof_completion: proofCompletion,
      readiness_checks: [
        {
          id: 'proof-completion',
          ok: true,
          status: proofCompletion.status,
          receipt_paths: proofCompletion.receipts.filter((receipt) => receipt.ok).map((receipt) => receipt.path),
        },
      ],
      recommended_commands: proofCompletion.receipts
        .filter((receipt) => receipt.ok)
        .map((receipt) => receipt.validation_command),
      next_actions: config.proved_next_actions || [],
    };
  }

  const blockers = [];
  const freshnessWorkflow = findFreshnessWorkflow(context.inputFreshness.report, config.workflow);
  const freshnessOk = isFreshnessWorkflowOk(freshnessWorkflow, config.workflow);
  const refreshPlan = findInputRefreshPlan(context.inputRefreshPlan.report, config.workflow);
  const summarizedRefreshPlan = summarizeInputRefreshPlan(refreshPlan);
  if (!freshnessWorkflow) {
    blockers.push(blocker('input-freshness-missing', `Input freshness receipt does not include ${config.workflow}.`));
  } else if (!freshnessOk) {
    blockers.push(blocker('input-freshness-stale', freshnessWorkflow.next_action || `${config.workflow} input freshness is not fresh.`, {
      status: freshnessWorkflow.status || '',
      input: freshnessWorkflow.input || '',
      refresh_command: freshnessWorkflow.refresh_command || '',
      enforce_command: freshnessWorkflow.enforce_command || '',
      ...(summarizedRefreshPlan ? { input_refresh_plan: summarizedRefreshPlan } : {}),
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
  const observedDirtyPaths = dirtyPaths.filter((path) => OBSERVED_DIRTY_BEFORE_AGENT_SET.has(path));
  const unobservedDirtyPaths = dirtyPaths.filter((path) => !OBSERVED_DIRTY_BEFORE_AGENT_SET.has(path));
  const blockingDirtyPaths = ALLOW_OBSERVED_DIRTY_BOUNDARY ? unobservedDirtyPaths : dirtyPaths;
  if (blockingDirtyPaths.length) {
    blockers.push(blocker(config.dirty_blocker_code, config.dirty_blocker_message, {
      paths: blockingDirtyPaths,
      dirty_paths: dirtyPaths,
      observed_dirty_paths: observedDirtyPaths,
      unobserved_dirty_paths: unobservedDirtyPaths,
      observed_dirty_allowed: ALLOW_OBSERVED_DIRTY_BOUNDARY,
    }));
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
    proof_completion: proofCompletion,
    readiness_checks: [
      {
        id: 'proof-completion',
        ok: false,
        status: proofCompletion.status,
        receipt_paths: proofCompletion.receipts.map((receipt) => receipt.path),
      },
      {
        id: config.input_check_id,
        ok: freshnessOk,
        status: freshnessWorkflow?.status || 'missing',
        ...(summarizedRefreshPlan ? { input_refresh_plan: summarizedRefreshPlan } : {}),
      },
      ...(config.dirty_check_id ? [{
        id: config.dirty_check_id,
        ok: blockingDirtyPaths.length === 0,
        dirty_paths: dirtyPaths,
        observed_dirty_paths: observedDirtyPaths,
        unobserved_dirty_paths: unobservedDirtyPaths,
        observed_dirty_allowed: ALLOW_OBSERVED_DIRTY_BOUNDARY,
      }] : []),
    ],
    recommended_commands: ready
      ? config.recommended_ready_commands
      : [`npm --silent run agent:proof:readiness -- --target ${config.id} --json`],
    next_actions: ready ? readyNextActions(config, observedDirtyPaths) : config.blocked_next_actions(blockers),
  };
}

function readyNextActions(config, observedDirtyPaths) {
  const actions = [...config.ready_next_actions];
  if (ALLOW_OBSERVED_DIRTY_BOUNDARY && observedDirtyPaths.length) {
    actions.push(`Preserve the declared dirty boundary in downstream closeouts with AIPEDIA_OBSERVED_DIRTY_BEFORE_AGENT=${observedDirtyPaths.join(';;')}.`);
  }
  return actions;
}

function evaluateProofCompletion(config) {
  const receiptPaths = Array.isArray(config.proof_receipts) ? config.proof_receipts : [];
  if (!receiptPaths.length) {
    return {
      status: 'untracked',
      proved: false,
      receipt_count: 0,
      receipts: [],
    };
  }

  const receipts = receiptPaths.map((path) => checkProofReceipt(path));
  const proved = receipts.some((receipt) => receipt.ok);
  const status = proved
    ? 'proved'
    : receipts.some((receipt) => receipt.exists)
      ? 'invalid'
      : 'missing';
  return {
    status,
    proved,
    receipt_count: receipts.length,
    valid_count: receipts.filter((receipt) => receipt.ok).length,
    receipts,
  };
}

function checkProofReceipt(path) {
  const absolutePath = resolve(PROJECT_DIR, path);
  const displayPath = projectPath(absolutePath);
  const validationCommand = `node scripts/agent-closeout-receipt-check.mjs --receipt ${displayPath} --require-workflow-policy --json`;
  if (!existsSync(absolutePath)) {
    return {
      path: displayPath,
      exists: false,
      ok: false,
      status: 'missing',
      validation_command: validationCommand,
      issue_count: 0,
      issues: [],
    };
  }

  const result = spawnSync(process.execPath, [
    resolve(SCRIPT_DIR, 'agent-closeout-receipt-check.mjs'),
    '--project-dir',
    PROJECT_DIR,
    '--receipt',
    absolutePath,
    '--require-workflow-policy',
    '--json',
  ], {
    cwd: DEFAULT_PROJECT_DIR,
    encoding: 'utf8',
  });
  const report = parseJson(result.stdout);
  const receipt = Array.isArray(report?.receipts) ? report.receipts[0] : null;
  const issues = Array.isArray(receipt?.issues) ? receipt.issues : [];
  const ok = result.status === 0 && report?.ok === true && receipt?.ok === true;
  return {
    path: displayPath,
    exists: true,
    ok,
    status: ok ? 'valid' : 'invalid',
    type: receipt?.type || '',
    issue_count: issues.length,
    issues,
    exit_code: result.status ?? 1,
    stderr_tail: tail(result.stderr),
    validation_command: validationCommand,
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

function readInputRefreshPlan(workflows, inputFreshness) {
  const staleWorkflows = workflows
    .filter((workflow) => !isFreshnessWorkflowOk(findFreshnessWorkflow(inputFreshness.report, workflow), workflow));
  if (!staleWorkflows.length) {
    return {
      source: 'not-run:no-stale-inputs',
      exit_code: 0,
      status: 'skipped',
      count: 0,
      stderr_tail: '',
      report: { refresh_plan: [] },
    };
  }

  if (INPUT_FRESHNESS_PATH) {
    const plans = Array.isArray(inputFreshness.report?.refresh_plan) ? inputFreshness.report.refresh_plan : [];
    return {
      source: inputFreshness.source,
      exit_code: inputFreshness.exit_code,
      status: plans.length ? 'from-input-freshness' : 'missing-refresh-plan',
      count: plans.length,
      stderr_tail: inputFreshness.stderr_tail,
      report: inputFreshness.report,
    };
  }

  const result = spawnSync(process.execPath, [
    resolve(SCRIPT_DIR, 'agent-input-freshness-receipt.mjs'),
    ...staleWorkflows.flatMap((workflow) => ['--workflow', workflow]),
    '--refresh-stale',
    '--json',
    '--project-dir',
    PROJECT_DIR,
  ], {
    cwd: DEFAULT_PROJECT_DIR,
    encoding: 'utf8',
  });
  const report = parseJson(result.stdout);
  const workflowText = staleWorkflows.map((workflow) => `--workflow ${workflow}`).join(' ');
  const plans = Array.isArray(report?.refresh_plan) ? report.refresh_plan : [];
  return {
    source: `node scripts/agent-input-freshness-receipt.mjs ${workflowText} --refresh-stale --json`,
    exit_code: result.status ?? 1,
    status: result.status === 0 && report ? 'planned' : 'failed',
    count: plans.length,
    stderr_tail: tail(result.stderr),
    report,
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

function isFreshnessWorkflowOk(workflow, workflowId) {
  if (!workflow || workflow.ok !== true) return false;
  if (workflowId === 'page-refresh') return workflow.status === 'current' || workflow.status === 'fresh';
  return workflow.status === 'fresh';
}

function findInputRefreshPlan(receipt, workflow) {
  if (!receipt || !Array.isArray(receipt.refresh_plan)) return null;
  return receipt.refresh_plan.find((item) => item && item.id === workflow) || null;
}

function summarizeInputRefreshPlan(plan) {
  if (!plan || typeof plan !== 'object' || Array.isArray(plan)) return null;
  return {
    id: typeof plan.id === 'string' ? plan.id : '',
    status: typeof plan.status === 'string' ? plan.status : '',
    before_status: typeof plan.before_status === 'string' ? plan.before_status : '',
    mutation_policy: typeof plan.mutation_policy === 'string' ? plan.mutation_policy : '',
    requires_tracked_mutation_ack: plan.requires_tracked_mutation_ack === true,
    requires_explicit_workflow: plan.requires_explicit_workflow === true,
    writes: Array.isArray(plan.writes) ? plan.writes.filter((item) => typeof item === 'string') : [],
    commands: Array.isArray(plan.commands)
      ? plan.commands
        .filter((command) => command && typeof command === 'object' && !Array.isArray(command))
        .map((command) => ({
          label: typeof command.label === 'string' ? command.label : '',
          command: typeof command.command === 'string' ? command.command : '',
        }))
      : [],
    required_flags: Array.isArray(plan.required_flags) ? plan.required_flags.filter((item) => typeof item === 'string') : [],
    blocked_reasons: Array.isArray(plan.blocked_reasons) ? plan.blocked_reasons.filter((item) => typeof item === 'string') : [],
    next_action: typeof plan.next_action === 'string' ? plan.next_action : '',
  };
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

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === 'string' && item.trim());
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
