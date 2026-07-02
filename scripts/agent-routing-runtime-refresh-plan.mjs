#!/usr/bin/env node
// Build an ordered refresh plan for runtime routing evidence after relevant changes.

import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildRoutingRuntimeRefreshCommandPlanArtifact,
  buildRoutingRuntimeRefreshPlan,
  routingRuntimeRefreshPlanIssue,
} from './lib/routing-runtime-refresh-plan.mjs';

const args = process.argv.slice(2);
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROJECT_DIR = dirname(SCRIPT_DIR);
const KNOWN_FLAGS = new Set([
  '--applied-at',
  '--baseline-monitor',
  '--baseline-monitor-trends',
  '--change-id',
  '--change-kind',
  '--change-summary',
  '--changed-artifact',
  '--changed-at',
  '--command-plan-out',
  '--commands-out',
  '--completion',
  '--correction-events-jsonl',
  '--default-rollout',
  '--events-jsonl',
  '--handoff',
  '--help',
  '-h',
  '--json',
  '--model-token-usage',
  '--monitor',
  '--monitor-trends',
  '--no-require-monitor-trend-rollup',
  '--out',
  '--out-prefix',
  '--output-prefix',
  '--project-dir',
  '--require-exact-model-tokens',
  '--require-model-token-usage',
  '--require-monitor-trend-rollup',
  '--rollback-command',
  '--rollback-verification-command',
  '--rollback-verify',
  '--root',
  '--runbook-out',
  '--routing-suite-input',
  '--runtime-completion',
  '--runtime-system',
  '--suite-input',
  '--system',
  '--trend',
  '--trend-rollup',
  '--verification-status',
]);
const VALUE_FLAGS = new Set([...KNOWN_FLAGS].filter((flag) => !['--help', '-h', '--json', '--require-exact-model-tokens', '--require-model-token-usage', '--require-monitor-trend-rollup', '--no-require-monitor-trend-rollup'].includes(flag)));
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || DEFAULT_PROJECT_DIR);
const OUT_PATH = valueFor('--out');
const COMMAND_PLAN_OUT_PATH = valueFor('--commands-out') || valueFor('--runbook-out') || valueFor('--command-plan-out');

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-runtime-refresh-plan',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
  });
  process.exit(2);
}

const evidence = {
  handoff: readOptionalJsonEvidence(valueFor('--handoff'), 'handoff'),
  monitor_trends: readOptionalJsonEvidence(valueFor('--monitor-trends') || valueFor('--trend'), 'monitor_trends'),
  monitor_trend_rollup: readOptionalJsonEvidence(valueFor('--trend-rollup'), 'monitor_trend_rollup'),
  runtime_completion: readOptionalJsonEvidence(valueFor('--runtime-completion') || valueFor('--completion'), 'runtime_completion'),
  model_token_usage: readOptionalJsonEvidence(valueFor('--model-token-usage'), 'model_token_usage'),
};

const result = buildRoutingRuntimeRefreshPlan({
  change: {
    change_id: valueFor('--change-id'),
    changed_at: valueFor('--changed-at'),
    change_kinds: valuesFor('--change-kind'),
    change_summary: valueFor('--change-summary'),
    changed_artifacts: valuesFor('--changed-artifact'),
  },
  requirements: {
    require_monitor_trend_rollup: !hasFlag('--no-require-monitor-trend-rollup'),
    require_model_token_usage: hasFlag('--require-model-token-usage') || hasFlag('--require-exact-model-tokens'),
  },
  evidence_chain: evidence,
  command_inputs: {
    run_id: valueFor('--change-id'),
    output_prefix: valueFor('--output-prefix') || valueFor('--out-prefix'),
    events_jsonl: valueFor('--events-jsonl') || valueFor('--correction-events-jsonl'),
    routing_suite_input: valueFor('--routing-suite-input') || valueFor('--suite-input'),
    default_rollout: valueFor('--default-rollout'),
    baseline_monitor: valueFor('--baseline-monitor') || valueFor('--monitor'),
    baseline_monitor_trends: valueFor('--baseline-monitor-trends') || valueFor('--monitor-trends') || valueFor('--trend'),
    model_token_usage: valueFor('--model-token-usage'),
    rollback_command: valueFor('--rollback-command'),
    rollback_verification_command: valueFor('--rollback-verification-command') || valueFor('--rollback-verify'),
    runtime_system: valueFor('--runtime-system') || valueFor('--system'),
    runtime_applied_at: valueFor('--applied-at'),
    runtime_verification_status: valueFor('--verification-status'),
  },
}, {
  projectDir: PROJECT_DIR,
  source: Object.values(evidence).map((item) => item?.receipt_path).filter(Boolean).join(' + '),
});
if (result.issues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-runtime-refresh-plan',
    project_dir: PROJECT_DIR,
    issues: result.issues,
  });
  process.exit(1);
}

const receipt = result.receipt;
if (OUT_PATH) {
  const outFile = resolve(PROJECT_DIR, OUT_PATH);
  receipt.receipt_path = projectPath(outFile);
}
if (COMMAND_PLAN_OUT_PATH) {
  const commandPlanFile = resolve(PROJECT_DIR, COMMAND_PLAN_OUT_PATH);
  mkdirSync(dirname(commandPlanFile), { recursive: true });
  receipt.command_plan_artifact = buildRoutingRuntimeRefreshCommandPlanArtifact(receipt.command_plan, projectPath(commandPlanFile), 'shell');
  writeFileSync(commandPlanFile, renderCommandPlanRunbook(receipt));
  chmodSync(commandPlanFile, 0o755);
}
if (OUT_PATH) {
  const outFile = resolve(PROJECT_DIR, OUT_PATH);
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, `${JSON.stringify(receipt, null, 2)}\n`);
}

emit(receipt);
process.exit(receipt.ok ? 0 : 1);

function usage() {
  return [
    'Usage:',
    '  node scripts/agent-routing-runtime-refresh-plan.mjs --change-id <id> --change-kind workflow --changed-at <iso> --handoff <path> --monitor-trends <path> --trend-rollup <path> --runtime-completion <path> --json',
    '',
    'Builds an aipedia.agent-routing-runtime-refresh-plan.v1 receipt that classifies routing runtime evidence as ready-current, refresh-required, or blocked.',
    'Use it after model, prompt, policy, tool, workflow, router, or runtime default-change updates so the monitor, trend, rollup, and completion sequence is explicit.',
    '',
    'Options:',
    '  --change-id <id>              Change identifier.',
    '  --change-kind <kind>          Relevant kind. Repeatable. Examples: model, prompt, policy, tool, workflow, runtime.',
    '  --changed-at <iso>            Timestamp used to detect stale evidence.',
    '  --changed-artifact <path>     Changed artifact path. Repeatable.',
    '  --handoff <path>              Runtime-mode routing handoff receipt.',
    '  --monitor-trends <path>       Routing monitor-trends receipt. Alias: --trend.',
    '  --trend-rollup <path>         Routing monitor trend rollup receipt.',
    '  --runtime-completion <path>   Routing runtime-completion receipt.',
    '  --model-token-usage <path>    Exact model-token usage receipt or report.',
    '  --require-monitor-trend-rollup Require ready longer-window rollup evidence. Enabled by default.',
    '  --no-require-monitor-trend-rollup Disable the default longer-window rollup requirement.',
    '  --require-model-token-usage   Require exact model-token usage evidence.',
    '  --events-jsonl <path>         Fresh correction telemetry events input for generated command plan.',
    '  --routing-suite-input <path>  Fresh routing suite input for generated command plan.',
    '  --default-rollout <path>      Default rollout receipt for generated monitor command.',
    '  --baseline-monitor <path>     Baseline monitor receipt for generated trend command.',
    '  --rollback-command <cmd>      Rollback command for generated monitor command.',
    '  --rollback-verify <cmd>       Rollback verification command for generated monitor command.',
    '  --runtime-system <id>         Runtime system for generated completion command.',
    '  --applied-at <iso>            Runtime completion timestamp for generated completion command.',
    '  --output-prefix <path>        Prefix for generated command outputs. Alias: --out-prefix.',
    '  --commands-out <path>         Optional shell runbook for ready-to-run refresh commands. Aliases: --runbook-out, --command-plan-out.',
    '  --out <path>                  Optional refresh-plan receipt output path.',
    '  --project-dir <dir>           Project root. Alias: --root.',
    '  --json                        Emit JSON.',
    '  --help                        Show this help.',
  ].join('\n');
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of args.entries()) {
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] || '';
      if (!VALUE_FLAGS.has(previous)) issues.push(routingRuntimeRefreshPlanIssue('argument-invalid', `unexpected argument ${arg}`));
      continue;
    }
    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push(routingRuntimeRefreshPlanIssue('argument-invalid', `unknown flag ${name}`));
  }
  for (const flag of VALUE_FLAGS) {
    if (!hasFlag(flag)) continue;
    const values = valuesFor(flag);
    if (!values.length) issues.push(routingRuntimeRefreshPlanIssue('argument-invalid', `${flag} requires a value.`));
    for (const value of values) {
      if (!value || value.startsWith('-')) issues.push(routingRuntimeRefreshPlanIssue('argument-invalid', `${flag} requires a value.`));
    }
  }
  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push(routingRuntimeRefreshPlanIssue('argument-invalid', 'choose only one of --project-dir or --root.'));
  }
  if (hasFlag('--require-monitor-trend-rollup') && hasFlag('--no-require-monitor-trend-rollup')) {
    issues.push(routingRuntimeRefreshPlanIssue('argument-invalid', 'choose only one of --require-monitor-trend-rollup or --no-require-monitor-trend-rollup.'));
  }
  return issues;
}

function renderCommandPlanRunbook(receipt) {
  const lines = [
    '#!/usr/bin/env bash',
    'set -euo pipefail',
    '',
    '# AiPedia routing runtime refresh command plan',
    `# Receipt: ${receipt.receipt_path || '<stdout>'}`,
    `# Run id: ${receipt.run_id}`,
    `# Status: ${receipt.refresh_evaluation?.status || 'unknown'}`,
    `# Generated at: ${receipt.generated_at}`,
    `# Change id: ${receipt.change?.change_id || ''}`,
    '',
  ];
  for (const step of receipt.command_plan || []) {
    lines.push(`# Step ${step.sequence}: ${step.title}`);
    if (step.status === 'ready-to-run') {
      lines.push(step.command);
    } else if (step.status === 'blocked-input') {
      lines.push(`# blocked-input: supply ${step.missing_inputs.join(', ')}`);
    } else {
      lines.push(`# not-required: ${step.id}`);
    }
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

function readOptionalJsonEvidence(rawPath, kind) {
  if (!rawPath) return null;
  const absolutePath = resolve(PROJECT_DIR, rawPath);
  if (!existsSync(absolutePath)) {
    return {
      kind,
      provided: false,
      valid: false,
      ready: false,
      status: 'missing',
      receipt_path: rawPath,
      issues: [routingRuntimeRefreshPlanIssue(`routing-runtime-refresh-plan-${kind.replaceAll('_', '-')}-missing`, `${rawPath} does not exist.`)],
      facts: {},
    };
  }
  try {
    const value = JSON.parse(readFileSync(absolutePath, 'utf8'));
    if (value && typeof value === 'object' && !Array.isArray(value) && !value.receipt_path) value.receipt_path = projectPath(absolutePath);
    return value;
  } catch (error) {
    return {
      kind,
      provided: true,
      valid: false,
      ready: false,
      status: 'invalid-json',
      receipt_path: rawPath,
      issues: [routingRuntimeRefreshPlanIssue(`routing-runtime-refresh-plan-${kind.replaceAll('_', '-')}-invalid`, `${rawPath} could not parse as JSON: ${error.message}`)],
      facts: {},
    };
  }
}

function emit(value) {
  const text = JSON.stringify(value, null, 2);
  if (JSON_MODE) {
    process.stdout.write(`${text}\n`);
  } else {
    process.stdout.write(`${text}\n`);
  }
}

function valuesFor(flag) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === flag) {
      const value = args[index + 1];
      if (value != null && !String(value).startsWith('--')) values.push(value);
      index += 1;
      continue;
    }
    if (arg.startsWith(`${flag}=`)) values.push(arg.slice(flag.length + 1));
  }
  return values;
}

function valueFor(flag) {
  return valuesFor(flag)[0] || '';
}

function hasFlag(flag) {
  return args.includes(flag) || args.some((arg) => arg.startsWith(`${flag}=`));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function projectPath(path) {
  return path.startsWith(PROJECT_DIR) ? path.slice(PROJECT_DIR.length + 1) : path;
}
