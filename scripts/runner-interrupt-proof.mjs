#!/usr/bin/env node
// Repeatable proof for Rust runner interrupted closeout pause capture.

import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const WORK_DIR = resolve(PROJECT_DIR, valueFor('--work-dir') || 'local/tmp/aipedia-runner-interrupt-proof');
const PROOF_DIR = resolve(PROJECT_DIR, valueFor('--proof-dir') || '.agent/evals/runner-interrupt-proofs');
const CURRENT_DATE = valueFor('--current-date') || process.env.AIPEDIA_CURRENT_DATE || new Date().toISOString().slice(0, 10);
const PROOF_PREFIX = valueFor('--proof-prefix') || `${CURRENT_DATE}-runner-interrupt-proof`;
const RUN_ID = valueFor('--run-id') || `${PROOF_PREFIX}-run`;
const GOAL_ID = valueFor('--goal-id') || process.env.AIPEDIA_GOAL_ID || '2026-06-30-agentic-tooling-meta-os';
const JSON_MODE = hasFlag('--json');
const DRY_RUN = hasFlag('--dry-run');
const REPORT_OUT = valueFor('--report-out') || (DRY_RUN ? '' : join(PROOF_DIR, `${PROOF_PREFIX}-proof-report.json`));
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const ALLOW_OUTSIDE_LOCAL_TMP = hasFlag('--allow-outside-local-tmp');
const KNOWN_FLAGS = new Set([
  '--allow-outside-local-tmp',
  '--current-date',
  '--dry-run',
  '--goal-id',
  '--help',
  '-h',
  '--json',
  '--proof-dir',
  '--proof-prefix',
  '--project-dir',
  '--report-out',
  '--root',
  '--run-id',
  '--work-dir',
]);
const VALUE_FLAGS = new Set([
  '--current-date',
  '--goal-id',
  '--proof-dir',
  '--proof-prefix',
  '--project-dir',
  '--report-out',
  '--root',
  '--run-id',
  '--work-dir',
]);

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emitReport({
    ok: false,
    mode: 'argument-error',
    schema_version: 'aipedia.runner-interrupt-proof.v1',
    project_dir: PROJECT_DIR,
    work_dir: projectPath(WORK_DIR),
    proof_dir: projectPath(PROOF_DIR),
    argument_issues: argumentIssues,
    issues: argumentIssues,
  });
  process.exit(2);
}

const report = persistReport(runProof());
emitReport(report);
process.exit(report.ok ? 0 : 1);

function usage() {
  return [
    'Usage:',
    '  node scripts/runner-interrupt-proof.mjs --json',
    '  node scripts/runner-interrupt-proof.mjs --proof-prefix 2026-06-30-slice-31-repeatable-interrupt-proof --json',
    '  node scripts/runner-interrupt-proof.mjs --dry-run --json',
    '',
    'Options:',
    '  --json                         Emit a structured report.',
    '  --dry-run                      Write the disposable fixture but do not run Cargo.',
    '  --work-dir <path>              Fixture directory. Defaults to local/tmp/aipedia-runner-interrupt-proof.',
    '  --proof-dir <path>             Durable proof copy directory. Defaults to .agent/evals/runner-interrupt-proofs.',
    '  --proof-prefix <name>          Prefix for copied proof receipts.',
    '  --report-out <path>            Proof report output. Defaults to proof-dir/proof-prefix-proof-report.json for live runs.',
    '  --goal-id <id>                 Goal identity for runner closeout receipts.',
    '  --run-id <id>                  Run identity for runner closeout receipts.',
    '  --current-date <YYYY-MM-DD>    Date passed to the runner environment.',
    '  --project-dir <dir>            Project root. Alias: --root.',
    '  --allow-outside-local-tmp      Allow --work-dir outside project local/tmp for isolated tests only.',
  ].join('\n');
}

function runProof() {
  resetFixture();
  const fixture = writeFixture();
  if (DRY_RUN) {
    return {
      ok: true,
      mode: 'runner-interrupt-proof-dry-run',
      schema_version: 'aipedia.runner-interrupt-proof.v1',
      project_dir: PROJECT_DIR,
      work_dir: projectPath(WORK_DIR),
      proof_dir: projectPath(PROOF_DIR),
      proof_prefix: PROOF_PREFIX,
      fixture,
      assertions: {
        fixture_written: true,
      },
      next_actions: ['Run without --dry-run to execute the real interrupted runner proof.'],
    };
  }

  const runner = runInterruptedCloseout();
  const latestCloseout = latestReceipt(WORK_DIR, 'receipts', '-tool-refresh-closeout.json');
  const issues = [];
  if (runner.status === 0) {
    issues.push(issue('runner-proof-unexpected-success', 'Interrupted runner proof expected the closeout command to exit non-zero.'));
  }
  if (!latestCloseout) {
    issues.push(issue('runner-closeout-receipt-missing', 'Runner did not write a tool-refresh closeout JSON receipt.'));
  }

  const closeout = latestCloseout ? readJson(latestCloseout, issues, 'runner-closeout-invalid-json') : null;
  const pauseReceipt = closeout?.interrupted_pause_receipt
    ? resolveDisplayPath(closeout.interrupted_pause_receipt)
    : null;
  if (!pauseReceipt) {
    issues.push(issue('runner-interrupted-pause-receipt-missing', 'Closeout receipt did not include interrupted_pause_receipt.'));
  } else if (!existsSync(pauseReceipt)) {
    issues.push(issue('runner-interrupted-pause-file-missing', `Interrupted pause receipt file is missing: ${projectPath(pauseReceipt)}`));
  }

  if (closeout && !closeout.commands?.some((command) => command?.interrupted === true)) {
    issues.push(issue('runner-interrupted-command-missing', 'Closeout receipt did not record any interrupted command.'));
  }
  if (closeout && closeout.interrupted_pause_receipt && !closeout.artifact_refs?.some((artifact) => (
    artifact?.role === 'output'
    && artifact?.kind === 'interrupted-pause-receipt'
    && artifact?.path === closeout.interrupted_pause_receipt
  ))) {
    issues.push(issue('runner-interrupted-pause-artifact-missing', 'Closeout receipt did not include a matching interrupted-pause-receipt artifact_ref.'));
  }

  let copiedPause = null;
  let copiedCloseout = null;
  if (!issues.length && pauseReceipt && latestCloseout) {
    mkdirSync(PROOF_DIR, { recursive: true });
    copiedPause = join(PROOF_DIR, `${PROOF_PREFIX}-interrupted-pause.json`);
    copiedCloseout = join(PROOF_DIR, `${PROOF_PREFIX}-interrupted-closeout.json`);
    copyFileSync(pauseReceipt, copiedPause);
    copyFileSync(latestCloseout, copiedCloseout);
  }

  const validations = [];
  if (copiedPause && copiedCloseout) {
    validations.push(validateReceipt(copiedPause, ['--require-trace-artifacts']));
    validations.push(validateReceipt(copiedCloseout, ['--require-closeout-identity', '--require-trace-artifacts']));
    for (const validation of validations) {
      if (validation.status !== 0) {
        issues.push(issue('runner-proof-validation-failed', `${validation.label} failed with status ${validation.status}.`));
      }
    }
  }

  return {
    ok: issues.length === 0,
    mode: issues.length === 0 ? 'runner-interrupt-proof' : 'runner-interrupt-proof-failed',
    schema_version: 'aipedia.runner-interrupt-proof.v1',
    project_dir: PROJECT_DIR,
    work_dir: projectPath(WORK_DIR),
    proof_dir: projectPath(PROOF_DIR),
    proof_prefix: PROOF_PREFIX,
    goal_id: GOAL_ID,
    run_id: RUN_ID,
    current_date: CURRENT_DATE,
    fixture,
    runner: {
      status: runner.status,
      signal: runner.signal || '',
      expected_nonzero: true,
      stdout_tail: tail(runner.stdout),
      stderr_tail: tail(runner.stderr),
    },
    artifacts: {
      pause_receipt: pauseReceipt ? projectPath(pauseReceipt) : '',
      closeout_receipt: latestCloseout ? projectPath(latestCloseout) : '',
      copied_pause_receipt: copiedPause ? projectPath(copiedPause) : '',
      copied_closeout_receipt: copiedCloseout ? projectPath(copiedCloseout) : '',
      proof_report: REPORT_OUT ? projectPath(resolve(PROJECT_DIR, REPORT_OUT)) : '',
    },
    assertions: {
      closeout_failed: runner.status !== 0,
      interrupted_command_recorded: closeout?.commands?.some((command) => command?.interrupted === true) === true,
      interrupted_pause_receipt_linked: typeof closeout?.interrupted_pause_receipt === 'string' && closeout.interrupted_pause_receipt.length > 0,
      interrupted_pause_artifact_linked: closeout?.artifact_refs?.some((artifact) => (
        artifact?.role === 'output'
        && artifact?.kind === 'interrupted-pause-receipt'
        && artifact?.path === closeout.interrupted_pause_receipt
      )) === true,
    },
    validations,
    issues,
    next_actions: issues.length
      ? ['Inspect the fixture receipts and runner stderr before relying on interrupted pause capture.']
      : ['Use the copied proof receipts in compliance docs and future regression checks.'],
  };
}

function resetFixture() {
  rmSync(WORK_DIR, { recursive: true, force: true });
  mkdirSync(WORK_DIR, { recursive: true });
}

function persistReport(report) {
  if (!REPORT_OUT) return report;
  const outPath = resolve(PROJECT_DIR, REPORT_OUT);
  const withPath = {
    ...report,
    report_path: projectPath(outPath),
    artifacts: {
      ...(report.artifacts || {}),
      proof_report: projectPath(outPath),
    },
  };
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(withPath, null, 2)}\n`);
  return withPath;
}

function writeFixture() {
  const pauseScript = relativeScriptPath(join(PROJECT_DIR, 'scripts', 'agent-pause-receipt.mjs'));
  const packagePath = join(WORK_DIR, 'package.json');
  const planPath = join(WORK_DIR, 'plan.json');
  const routeArgsPath = join(WORK_DIR, 'route-args.txt');
  const receiptDir = join(WORK_DIR, 'receipts');
  const ledgerScript = "node -e \"setTimeout(() => process.kill(process.pid, 'SIGINT'), 25); setTimeout(() => {}, 5000)\"";
  mkdirSync(receiptDir, { recursive: true });
  writeFileSync(packagePath, `${JSON.stringify({
    private: true,
    scripts: {
      'ledger:pages': ledgerScript,
      'agent:pause-receipt': `node ${pauseScript}`,
    },
  }, null, 2)}\n`);
  writeFileSync(planPath, `${JSON.stringify({ batch: [], agent_briefs: null }, null, 2)}\n`);
  writeFileSync(routeArgsPath, '--route /categories/ --route /tools/\n');
  return {
    package_json: projectPath(packagePath),
    plan: projectPath(planPath),
    route_args: projectPath(routeArgsPath),
    receipt_dir: projectPath(receiptDir),
    ledger_script: ledgerScript,
  };
}

function runInterruptedCloseout() {
  const manifest = join(PROJECT_DIR, 'tools', 'aipedia-runner', 'Cargo.toml');
  const env = {
    ...process.env,
    AIPEDIA_GOAL_ID: GOAL_ID,
    AIPEDIA_RUN_ID: RUN_ID,
    AIPEDIA_CURRENT_DATE: CURRENT_DATE,
    AIPEDIA_OBSERVED_DIRTY_BEFORE_AGENT: observedDirtyBeforeAgent().join('\n'),
    AIPEDIA_RESIDUAL_RISKS: 'Repeatable interrupted runner proof validates pause capture, not rendered page quality.',
    AIPEDIA_NEXT_ACTIONS: 'Use copied proof receipts to confirm interrupted closeout pause linkage remains enforced.',
  };
  return spawnSync('cargo', [
    'run',
    '--manifest-path',
    manifest,
    '--',
    '--project-dir',
    projectPath(WORK_DIR),
    'closeout',
    '--plan',
    'plan.json',
    '--route-args',
    'route-args.txt',
    '--receipt-dir',
    'receipts',
    '--skip-build',
    '--skip-route-qa',
  ], {
    cwd: PROJECT_DIR,
    env,
    encoding: 'utf8',
  });
}

function validateReceipt(path, flags) {
  const label = projectPath(path);
  const result = spawnSync(process.execPath, [
    join(PROJECT_DIR, 'scripts', 'agent-closeout-receipt-check.mjs'),
    '--receipt',
    path,
    ...flags,
    '--json',
  ], {
    cwd: PROJECT_DIR,
    encoding: 'utf8',
  });
  return {
    label,
    status: result.status,
    ok: result.status === 0,
    stdout_tail: tail(result.stdout),
    stderr_tail: tail(result.stderr),
  };
}

function latestReceipt(root, subdir, suffix) {
  const dir = join(root, subdir);
  if (!existsSync(dir)) return null;
  const names = readdirSync(dir)
    .filter((name) => name.endsWith(suffix))
    .sort();
  return names.length ? join(dir, names[names.length - 1]) : null;
}

function readJson(path, issues, code) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    issues.push(issue(code, `${projectPath(path)} could not parse: ${error.message}`));
    return null;
  }
}

function resolveDisplayPath(path) {
  const candidates = [
    resolve(WORK_DIR, path),
    resolve(PROJECT_DIR, path),
  ];
  return candidates.find((candidate) => existsSync(candidate)) || candidates[0];
}

function observedDirtyBeforeAgent() {
  const result = spawnSync('git', ['status', '--short'], {
    cwd: PROJECT_DIR,
    encoding: 'utf8',
  });
  if (result.status !== 0) return [];
  return result.stdout
    .split('\n')
    .map((line) => line.trimEnd())
    .filter(Boolean)
    .map((line) => line.slice(3).trim())
    .filter(Boolean)
    .filter(Boolean);
}

function collectArgumentIssues() {
  const issues = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith('-')) continue;
    const flag = arg.includes('=') ? arg.slice(0, arg.indexOf('=')) : arg;
    if (!KNOWN_FLAGS.has(flag)) {
      issues.push(issue('argument-unknown', `Unknown argument: ${flag}`));
      continue;
    }
    if (VALUE_FLAGS.has(flag) && !arg.includes('=')) {
      const next = args[index + 1];
      if (!next || next.startsWith('-')) {
        issues.push(issue('argument-missing-value', `${flag} requires a value.`));
      } else {
        index += 1;
      }
    }
  }

  const rel = relative(PROJECT_DIR, WORK_DIR);
  const insideProject = rel && !rel.startsWith('..') && !rel.startsWith('/') && rel !== '..';
  const safeLocalTmp = insideProject && (rel === 'local/tmp' || rel.startsWith('local/tmp/'));
  if (!safeLocalTmp && !ALLOW_OUTSIDE_LOCAL_TMP) {
    issues.push(issue('unsafe-work-dir', '--work-dir must be inside project local/tmp unless --allow-outside-local-tmp is set.'));
  }
  if (resolve(WORK_DIR) === resolve(PROJECT_DIR)) {
    issues.push(issue('unsafe-work-dir', '--work-dir cannot be the project root.'));
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(CURRENT_DATE)) {
    issues.push(issue('current-date-invalid', '--current-date must use YYYY-MM-DD.'));
  }
  if (!PROOF_PREFIX.trim()) {
    issues.push(issue('proof-prefix-invalid', '--proof-prefix must be non-empty.'));
  }
  return issues;
}

function relativeScriptPath(target) {
  let value = relative(WORK_DIR, target);
  if (!value.startsWith('.')) value = `./${value}`;
  return value;
}

function valueFor(flag) {
  const prefix = `${flag}=`;
  const inline = args.find((arg) => arg.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const index = args.indexOf(flag);
  if (index !== -1 && args[index + 1] && !args[index + 1].startsWith('-')) return args[index + 1];
  return '';
}

function hasFlag(flag) {
  return args.includes(flag);
}

function issue(code, detail) {
  return { code, detail };
}

function projectPath(path) {
  const rel = relative(PROJECT_DIR, path);
  return rel && !rel.startsWith('..') && !rel.startsWith('/') ? rel : path;
}

function tail(value, max = 4000) {
  const text = String(value || '');
  return text.length > max ? text.slice(-max) : text;
}

function emitReport(report) {
  if (JSON_MODE) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }
  if (report.ok) {
    console.log(`[runner-interrupt-proof] ${report.mode}`);
    if (report.artifacts?.copied_closeout_receipt) console.log(`Closeout proof: ${report.artifacts.copied_closeout_receipt}`);
    if (report.artifacts?.copied_pause_receipt) console.log(`Pause proof: ${report.artifacts.copied_pause_receipt}`);
  } else {
    console.error(`[runner-interrupt-proof] ${report.mode}`);
    for (const item of report.issues || report.argument_issues || []) {
      console.error(`- ${item.code}: ${item.detail}`);
    }
  }
}
