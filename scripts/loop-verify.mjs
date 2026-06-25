#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { planForPaths } from './check-smart.mjs';

const rawArgs = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const JSON_MODE = hasFlag('--json');
const DRY_RUN = hasFlag('--dry-run');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const SKIP_BUILD = hasFlag('--skip-build');
const SKIP_ROUTE_QA = hasFlag('--skip-route-qa');
const FORCE_BUILD = hasFlag('--force-build');
const DEFAULT_ROUTE_WIDTHS = '360,390,430,768,1024,1366';
const DEFAULT_ROUTE_CONCURRENCY = 4;
const KNOWN_FLAGS = new Set([
  '--date',
  '--route',
  '--slug',
  '--path',
  '--paths',
  '--width',
  '--widths',
  '--site-dir',
  '--base-url',
  '--concurrency',
  '--project-dir',
  '--root',
  '--skip-build',
  '--force-build',
  '--skip-route-qa',
  '--dry-run',
  '--json',
  '--help',
  '-h',
]);
const VALUE_FLAGS = new Set([
  '--date',
  '--route',
  '--slug',
  '--path',
  '--paths',
  '--width',
  '--widths',
  '--site-dir',
  '--base-url',
  '--concurrency',
  '--project-dir',
  '--root',
]);

function hasFlag(flag) {
  return rawArgs.includes(flag) || rawArgs.some((arg) => arg.startsWith(`${flag}=`));
}

function valueFor(flag) {
  const inlineArg = rawArgs.find((arg) => arg.startsWith(`${flag}=`));
  if (inlineArg) return inlineArg.slice(flag.length + 1);
  const index = rawArgs.indexOf(flag);
  return index >= 0 ? rawArgs[index + 1] : '';
}

function valuesFor(...flags) {
  const values = [];
  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    for (const flag of flags) {
      if (arg === flag) {
        for (let valueIndex = index + 1; valueIndex < rawArgs.length && !rawArgs[valueIndex].startsWith('--'); valueIndex += 1) {
          values.push(rawArgs[valueIndex]);
        }
      } else if (arg.startsWith(`${flag}=`)) {
        values.push(arg.slice(flag.length + 1));
      }
    }
  }
  return values.flatMap((value) => value.split(',').map((part) => normalizePath(part)).filter(Boolean));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function normalizePath(path) {
  return path.replace(/\\/g, '/').replace(/^\.\//, '').trim();
}

function usage() {
  return [
    'Usage:',
    '  node scripts/loop-verify.mjs --date 2026-06-20 --route /compare/example/ --path src/content/comparisons/example.md',
    '  npm run loop:verify -- --date 2026-06-20 --slug example --paths src/content/comparisons/example.md,src/content/tools/foo.md',
    '',
    'Options:',
    '  --date <YYYY-MM-DD>  Required unless AIPEDIA_LEDGER_DATE is set.',
    '  --route <path>       Rendered route for route QA. Inferred from --slug or a comparison path when possible.',
    '  --slug <slug>        Comparison slug, used to infer /compare/<slug>/ route.',
    '  --path <path>        Changed path. Repeatable or comma-separated via --paths.',
    '  --widths <list>      Route QA widths. Default: 360,390,430,768,1024,1366.',
    '  --site-dir <dir>     Static build directory passed to qa:route.',
    '  --base-url <url>      Local server URL passed to qa:route, for example http://127.0.0.1:4325.',
    '  --concurrency <n>    Route QA concurrency. Default: 4.',
    '  --skip-build         Do not add a fallback build:fast step.',
    '  --force-build        Run build:fast even when no route QA is requested.',
    '  --skip-route-qa      Do not run qa:route.',
    '  --dry-run            Print the planned commands without executing.',
    '  --json               Emit a structured report.',
  ].join('\n');
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of rawArgs.entries()) {
    if (!arg.startsWith('-')) {
      const previous = rawArgs[index - 1] ?? '';
      if (!VALUE_FLAGS.has(previous)) issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
    if (VALUE_FLAGS.has(name)) {
      const value = arg.includes('=') ? arg.slice(name.length + 1) : rawArgs[index + 1] ?? '';
      if (!value || value.startsWith('-')) issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
    }
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }
  if (SKIP_BUILD && FORCE_BUILD) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --skip-build or --force-build' });
  }
  if (hasFlag('--site-dir') && hasFlag('--base-url')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --site-dir or --base-url' });
  }

  const date = verificationDate();
  if (!date) issues.push({ code: 'argument-invalid', detail: '--date or AIPEDIA_LEDGER_DATE is required' });
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) issues.push({ code: 'argument-invalid', detail: 'date must be YYYY-MM-DD' });

  const route = routeForQa();
  if (route && !route.startsWith('/')) issues.push({ code: 'argument-invalid', detail: `route must start with /, got ${route}` });
  for (const width of widthsForQa()) {
    if (!Number.isInteger(width) || width < 240 || width > 3840) {
      issues.push({ code: 'argument-invalid', detail: `width must be an integer from 240 to 3840, got ${width}` });
    }
  }

  const concurrency = concurrencyForQa();
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 8) {
    issues.push({ code: 'argument-invalid', detail: `concurrency must be an integer from 1 to 8, got ${valueFor('--concurrency') || concurrency}` });
  }
  return issues;
}

function verificationDate() {
  return valueFor('--date') || process.env.AIPEDIA_LEDGER_DATE || '';
}

function explicitPaths() {
  return valuesFor('--path', '--paths');
}

function gitLines(gitArgs) {
  const result = spawnSync('git', gitArgs, {
    cwd: PROJECT_DIR,
    encoding: 'utf8',
  });
  if (result.status !== 0) return [];
  return result.stdout.split(/\r?\n/).map(normalizePath).filter(Boolean);
}

function changedPaths() {
  const paths = explicitPaths();
  if (paths.length) return [...new Set(paths)].sort();
  return [...new Set([
    ...gitLines(['diff', '--name-only']),
    ...gitLines(['diff', '--name-only', '--cached']),
    ...gitLines(['ls-files', '--others', '--exclude-standard']),
  ])].sort();
}

function routeForQa() {
  const explicitRoute = valueFor('--route');
  if (explicitRoute) return normalizeRoute(explicitRoute);
  const slug = valueFor('--slug');
  if (slug) return `/compare/${slug.replace(/\.md$/i, '')}/`;
  const comparisonPath = changedPaths().find((path) => /^src\/content\/comparisons\/[^/]+\.md$/.test(path));
  if (!comparisonPath) return '';
  return `/compare/${comparisonPath.split('/').pop().replace(/\.md$/i, '')}/`;
}

function normalizeRoute(route) {
  const trimmed = route.trim();
  if (!trimmed || trimmed.includes('?') || trimmed.endsWith('/') || /\.[a-z0-9]+$/i.test(trimmed)) return trimmed;
  return `${trimmed}/`;
}

function widthsForQa() {
  const rawWidths = valuesFor('--width', '--widths');
  const values = rawWidths.length ? rawWidths : DEFAULT_ROUTE_WIDTHS.split(',');
  return [...new Set(values.map((width) => Number(width)))].sort((a, b) => a - b);
}

function concurrencyForQa() {
  const raw = valueFor('--concurrency');
  if (!raw) return DEFAULT_ROUTE_CONCURRENCY;
  return Number(raw);
}

function commandLabel(step) {
  return [step.command, ...step.args].join(' ');
}

function step(command, args, label) {
  return { command, args, label: label || commandLabel({ command, args }) };
}

function npmStep(script, args = []) {
  return step('npm', ['run', script, ...args], `npm run ${script}${args.length ? ` ${args.join(' ')}` : ''}`);
}

function nodeStep(script, args = []) {
  return step(process.execPath, [script, ...args], `node ${script}${args.length ? ` ${args.join(' ')}` : ''}`);
}

function smartCommandRunsRouteQa(command, route) {
  if (!route) return false;
  return /^npm run qa:route\b/.test(command) && command.includes(`--route ${route}`);
}

function changedToolPaths(paths) {
  return paths.filter((path) => /^src\/content\/tools\/[^/]+\.md$/.test(path));
}

function commandPlan({ paths, date, route, widths }) {
  const smartPlan = paths.length ? planForPaths(paths) : { commands: [] };
  const smartRunsBuild = smartPlan.commands.includes('npm run build:fast');
  const smartRunsRouteQa = smartPlan.commands.some((command) => smartCommandRunsRouteQa(command, route));
  const coverageArgs = paths.length
    ? paths.flatMap((path) => ['--changed-file', path])
    : ['--changed'];
  const provenanceArgs = changedToolPaths(paths).flatMap((path) => ['--changed-file', path]);
  const smartArgs = ['scripts/check-smart.mjs', '--run'];
  for (const path of paths) smartArgs.push('--path', path);

  const steps = [
    nodeStep('scripts/generate-page-refresh-ledger.mjs', ['--date', date], 'regenerate page refresh ledger'),
    nodeStep('scripts/generate-page-refresh-ledger.mjs', ['--check', '--date', date], 'check page refresh ledger with loop date'),
    nodeStep('scripts/audit-coverage-quality.mjs', coverageArgs, 'check changed comparison quality'),
  ];
  if (provenanceArgs.length) {
    steps.push(nodeStep('scripts/audit-provenance-pricing.mjs', provenanceArgs, 'check changed tool provenance'));
  }
  steps.push(step(process.execPath, smartArgs, 'run smart verification for changed paths'));

  if (!SKIP_BUILD && !smartRunsBuild && (FORCE_BUILD || route)) {
    steps.push(npmStep('build:fast'));
  }

  if (!SKIP_ROUTE_QA && route && !smartRunsRouteQa) {
    const routeArgs = ['scripts/qa-route.mjs', '--route', route, '--widths', widths.join(',')];
    const siteDir = valueFor('--site-dir');
    const baseUrl = valueFor('--base-url');
    if (siteDir) routeArgs.push('--site-dir', siteDir);
    if (baseUrl) routeArgs.push('--base-url', baseUrl);
    routeArgs.push('--concurrency', String(concurrencyForQa()));
    steps.push(step(process.execPath, routeArgs, `route QA for ${route} at ${widths.join(', ')} px`));
  }

  return { steps, smartPlan, smartRunsBuild, smartRunsRouteQa };
}

function runStep(item, env) {
  console.log(`\n> ${commandLabel(item)}`);
  const startedAt = performance.now();
  const result = spawnSync(item.command, item.args, {
    cwd: PROJECT_DIR,
    env: envForStep(item, env),
    shell: process.platform === 'win32' && item.command === 'npm',
    stdio: 'inherit',
  });
  const durationMs = Math.round(performance.now() - startedAt);
  console.log(`[loop-verify] ${commandLabel(item)} finished in ${Math.round(durationMs / 100) / 10}s`);
  return { status: result.status ?? 1, duration_ms: durationMs };
}

function stepNeedsFastBuildEnv(item) {
  const label = commandLabel(item);
  return /\bnpm run build:fast\b/.test(label) || /\bscripts[\\/]qa-route\.mjs\b/.test(label) || /\bnpm run qa:route\b/.test(label);
}

function envForStep(item, baseEnv) {
  const env = { ...baseEnv };
  if (stepNeedsFastBuildEnv(item)) {
    env.AIPEDIA_FAST_BUILD = '1';
  } else {
    delete env.AIPEDIA_FAST_BUILD;
  }
  return env;
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  if (report.mode === 'argument-error') {
    console.error('[loop-verify] invalid arguments:');
    for (const issue of report.argument_issues) console.error(`  x ${issue.detail}`);
    return;
  }

  if (report.dry_run) {
    console.log(`[loop-verify] dry run with AIPEDIA_LEDGER_DATE=${report.date}`);
    for (const command of report.commands) console.log(`- ${command}`);
    return;
  }

  if (report.ok) {
    console.log(`[loop-verify] ok: ${report.commands.length} verification command(s) passed.`);
  } else {
    console.error(`[loop-verify] failed at: ${report.failed_command}`);
  }
}

function main() {
  if (HELP_MODE) {
    console.log(usage());
    return 0;
  }

  const argumentIssues = collectArgumentIssues();
  if (argumentIssues.length) {
    emitReport({ ok: false, mode: 'argument-error', argument_issues: argumentIssues });
    return 2;
  }

  if (!existsSync(PROJECT_DIR)) {
    emitReport({ ok: false, mode: 'missing-project', failures: [`project dir does not exist: ${PROJECT_DIR}`] });
    return 1;
  }

  const date = verificationDate();
  const paths = changedPaths();
  const route = routeForQa();
  const widths = widthsForQa();
  const plan = commandPlan({ paths, date, route, widths });
  const routeQaConcurrency = concurrencyForQa();
  const commands = plan.steps.map(commandLabel);
  const reportBase = {
    ok: true,
    mode: 'loop-verify',
    project_dir: PROJECT_DIR,
    date,
    paths,
    route,
    widths,
    route_qa_concurrency: routeQaConcurrency,
    route_qa_base_url: valueFor('--base-url'),
    smart_runs_build: plan.smartRunsBuild,
    smart_runs_route_qa: plan.smartRunsRouteQa,
    commands,
    dry_run: DRY_RUN,
  };

  if (DRY_RUN) {
    emitReport(reportBase);
    return 0;
  }

  const env = {
    ...process.env,
    AIPEDIA_LEDGER_DATE: date,
  };

  const commandResults = [];
  for (const item of plan.steps) {
    const result = runStep(item, env);
    commandResults.push({ command: commandLabel(item), ...result });
    const status = result.status;
    if (status !== 0) {
      emitReport({ ...reportBase, ok: false, command_results: commandResults, failed_command: commandLabel(item), failed_status: status });
      return status;
    }
  }

  emitReport({ ...reportBase, command_results: commandResults });
  return 0;
}

process.exit(main());
