#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const KNOWN_FLAGS = new Set(['--json', '--project-dir', '--root', '--help', '-h']);
const PACKAGE_PATH = join(PROJECT_DIR, 'package.json');
const README_PATH = join(PROJECT_DIR, 'README.md');
const DOC_PATHS = ['AGENTS.md', 'README.md'].map((path) => join(PROJECT_DIR, path));
const WORKFLOW_DIR = join(PROJECT_DIR, '.github', 'workflows');
const REQUIRED_OPERATOR_NPM_SCRIPTS = [
  'audit:coverage-quality:changed',
  'audit:provenance:changed',
  'build',
  'build:fast',
  'check',
  'check:assets',
  'check:assets:quick',
  'check:ci',
  'check:dist',
  'check:hosting',
  'check:links',
  'check:news',
  'check:quick',
  'check:security',
  'db:migrate',
  'db:migrate:check',
  'db:migrate:verify',
  'deploy',
  'guard:challenge',
  'guard:challenge:check',
  'lint',
  'ship:check',
  'typecheck',
  'vercel:env:pull',
];
const REQUIRED_DOCUMENTED_NPM_SCRIPTS = ['check:quick', 'check', 'build', 'deploy', 'editorial:weekly', 'ledger:pages'];
const REQUIRED_README_NPM_RUN_ORDER = ['check:quick', 'check', 'editorial:weekly', 'ledger:pages', 'build', 'deploy'];
const REQUIRED_README_TEXT_INVARIANTS = [
  { code: 'readme-smallest-verification', pattern: /Use the smallest verification command that matches the change\./, detail: 'README must tell operators to use the smallest matching verification command' },
  { code: 'readme-check-quick-no-build', pattern: /`npm run check:quick`:\s*no-build loop/i, detail: 'README must describe check:quick as the no-build loop' },
  { code: 'readme-check-quick-bounded-assets', pattern: /`npm run check:quick`:[^\n]*bounded asset checks/i, detail: 'README must mention bounded asset checks for check:quick' },
  { code: 'readme-editorial-weekly-queue', pattern: /`npm run editorial:weekly`:[^\n]*editorial freshness queue/i, detail: 'README must describe the editorial freshness queue command' },
  { code: 'readme-ledger-pages-ledger', pattern: /`npm run ledger:pages`:[^\n]*`PAGE_REFRESH_LEDGER\.md`/i, detail: 'README must tie ledger:pages to PAGE_REFRESH_LEDGER.md' },
  { code: 'readme-build-full-production', pattern: /`npm run build`:[^\n]*full production build/i, detail: 'README must reserve build language for the full production build' },
  { code: 'readme-build-not-routine', pattern: /`npm run build`:[^\n]*Do not use it as routine verification/i, detail: 'README must say build is not routine verification for content/script-only changes' },
  { code: 'readme-deploy-vercel-production', pattern: /`npm run deploy`:[^\n]*Vercel production deploy/i, detail: 'README must describe deploy as the Vercel production deploy' },
];
const REQUIRED_WORKFLOW_NPM_SCRIPTS = ['lint', 'typecheck', 'check:quick', 'check', 'audit:provenance:changed', 'audit:coverage-quality:changed', 'build', 'check:dist'];
const REQUIRED_WORKFLOW_COMMAND_ORDER = [
  'npm ci',
  'npm run lint',
  'npm run typecheck',
  'npm run check:quick',
  'npm run check',
  'npm run audit:provenance:changed',
  'npm run audit:coverage-quality:changed',
  'npm run build',
  'npm run check:dist',
];
const REQUIRED_PACKAGE_SCRIPT_CHAINS = {
  prebuild: ['guard-content.mjs', 'guard-stale-facts.mjs', 'audit-guide-picks.mjs', 'fetch-github-stats.mjs', 'generate-og-news.mjs'],
  'guard:check': [
    'guard-content.mjs',
    'guard-stale-facts.mjs',
    'guard-em-dashes.mjs',
    'audit-guide-picks.mjs',
    'audit-tool-logos.mjs',
    'audit-news-rendering.mjs',
    'audit-hosting-runtime.mjs',
    'generate-page-refresh-ledger.mjs',
    'audit-font-policy.mjs',
  ],
  check: ['guard:check', 'check:links', 'check:news', 'check:security'],
  'check:quick': ['test:scripts', 'audit:commands', 'check:assets:quick'],
  'check:ci': ['lint', 'typecheck', 'check:quick', 'check', 'audit:provenance:changed', 'audit:coverage-quality:changed', 'build', 'check:dist'],
  'ship:check': ['lint', 'typecheck', 'check:quick', 'check', 'audit:provenance:changed', 'audit:coverage-quality:changed', 'build', 'check:dist'],
  'build:fast': ['guard:check', 'build-fast.mjs'],
};
const REQUIRED_PACKAGE_COMMAND_PARTS = {
  build: ['node scripts/build-pagefind.mjs', 'node scripts/check-dist-budget.mjs --mode full'],
  'build:full:node24': ['node scripts/build-pagefind.mjs', 'node scripts/check-dist-budget.mjs --mode full'],
  prebuild: ['node scripts/fetch-github-stats.mjs --output src/data/github-stats.build.json --skip-render-unchanged'],
};
const REQUIRED_EXACT_NPM_SCRIPT_COMMANDS = {
  deploy: 'npx vercel build --prod && npx vercel deploy --prebuilt --prod',
  'guard:challenge': 'node scripts/guard-challenge.mjs',
  'guard:challenge:check': 'node scripts/guard-challenge.mjs --check',
  'vercel:env:pull': 'npx vercel env pull .env.local --yes',
};
const FORBIDDEN_QUICK_CHECK_PATTERNS = [
  { code: 'quick-check-build', pattern: /\b(?:npm\s+run\s+)?build(?::[A-Za-z0-9_-]+)?\b/i, detail: 'must not run build commands' },
  { code: 'quick-check-smoke', pattern: /\b(?:npm\s+run\s+)?smoke(?::[A-Za-z0-9_-]+)?\b|\bplaywright\s+test\b/i, detail: 'must not run browser smoke tests' },
  { code: 'quick-check-vercel', pattern: /\b(?:npx\s+)?vercel\b|\bdeploy\b/i, detail: 'must not run Vercel deploy/build commands' },
  { code: 'quick-check-dev-server', pattern: /\bastro\s+dev\b|\bnpm\s+run\s+dev\b/i, detail: 'must not start dev servers' },
  { code: 'quick-check-broad-check', pattern: /\bnpm\s+run\s+check(?![A-Za-z0-9:_-])/i, detail: 'must not run the broad check gate' },
  { code: 'quick-check-heavy-check-script', pattern: /\bnpm\s+run\s+check:(?!assets:quick\b)[A-Za-z0-9:_-]+\b/i, detail: 'must not run heavier check:* commands' },
  { code: 'quick-check-security-audit', pattern: /\bnpm\s+run\s+check:security(?![A-Za-z0-9:_-])|\bnpm\s+audit\b/i, detail: 'must not run security audit commands' },
  { code: 'quick-check-broad-test', pattern: /\bnpm\s+run\s+test(?!:scripts\b)(?::[A-Za-z0-9_-]+)?\b/i, detail: 'must not run broad or smoke test commands' },
  { code: 'quick-check-heavy-audit', pattern: /\bnpm\s+run\s+audit:(?!commands\b)[A-Za-z0-9:_-]+\b/i, detail: 'must not run heavier audit:* commands' },
];
const REQUIRED_QUICK_ASSET_COMMAND_PARTS = [
  'node scripts/prep-favicons.mjs --check',
  'node scripts/generate-og-svgs.mjs --check --limit 5',
  'node scripts/generate-og-news.mjs --check --limit 2',
  'node scripts/optimize-og-images.mjs --check --limit 20',
  'node scripts/generate-logo-manifest.mjs --check',
];
const FAILURE_SUPPRESSION_PATTERNS = [
  { code: 'shell-or-true', pattern: /\|\|\s*true\b/i, detail: 'must not suppress command failures with || true' },
  { code: 'shell-or-exit-zero', pattern: /\|\|\s*exit\s+0\b/i, detail: 'must not suppress command failures with || exit 0' },
  { code: 'workflow-continue-on-error', pattern: /(^|\n)\s*continue-on-error:\s*true(?:\s|$)/im, detail: 'must not set continue-on-error: true' },
];
const FORBIDDEN_HOSTING_COMMAND_PATTERNS = [
  { code: 'hosting-wrangler-command', pattern: /\b(?:npx\s+)?wrangler\b/i, detail: 'must not use Wrangler commands' },
  { code: 'hosting-cloudflare-command', pattern: /\b(?:npx\s+)?cloudflare\b/i, detail: 'must not use Cloudflare CLI commands' },
  { code: 'hosting-cloudflare-pages-command', pattern: /\bcloudflare\s+pages\b|\bpages:(?:deploy|build)\b/i, detail: 'must not use Cloudflare Pages commands' },
];
const FORBIDDEN_WORKFLOW_COMMAND_PATTERNS = [
  { code: 'workflow-production-deploy', pattern: /\bnpm\s+run\s+deploy\b|\bnpx\s+vercel\s+deploy\b/i, detail: 'must not run production deploy commands in CI workflows' },
  { code: 'workflow-vercel-prod-build', pattern: /\bnpx\s+vercel\s+build\s+--prod\b/i, detail: 'must not run Vercel production builds in CI workflows' },
];
const REQUIRED_WORKFLOW_TRIGGERS = ['pull_request', 'push', 'workflow_dispatch'];
const REQUIRED_WORKFLOW_PUSH_BRANCHES = ['master'];
const REQUIRED_WORKFLOW_PERMISSIONS = { contents: 'read' };
const REQUIRED_WORKFLOW_JOB_TIMEOUT_MINUTES_MAX = 30;
const OPTIONAL_LOCAL_SCRIPT_PATHS = new Set([
  'scripts/indexnow-ping.mjs',
  'tools/project-kg/bin/project-kg',
]);

function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index >= 0) return args[index + 1] ?? '';
  const inlineArg = args.find((arg) => arg.startsWith(`${flag}=`));
  return inlineArg ? inlineArg.slice(flag.length + 1) : '';
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
  for (const [index, arg] of args.entries()) {
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] ?? '';
      if (!['--project-dir', '--root'].includes(previous)) {
        issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      }
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) {
      issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
    }
  }

  for (const flag of ['--project-dir', '--root']) {
    if (!hasFlag(flag)) continue;
    const inlineArg = args.find((arg) => arg.startsWith(`${flag}=`));
    const value = inlineArg ? inlineArg.slice(flag.length + 1) : args[args.indexOf(flag) + 1] ?? '';
    if (!value || value.startsWith('-')) {
      issues.push({ code: 'argument-invalid', detail: `${flag} requires a path` });
    }
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/audit-command-surface.mjs --json',
    '  node scripts/audit-command-surface.mjs --project-dir <dir>',
    '',
    'Options:',
    '  --json               Emit a structured report.',
    '  --project-dir <dir>  Audit another project root.',
    '  --root <dir>         Alias for --project-dir.',
  ].join('\n');
}

function emitReport(report) {
  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (report.ok) {
    console.log(`[audit-command-surface] ✓ ${report.documented_npm_scripts.length} documented npm scripts and ${report.referenced_script_paths.length} script paths resolve.`);
  } else {
    console.error('[audit-command-surface] command surface drift detected');
    if (report.argument_issues?.length) {
      console.error(`Argument issues: ${report.argument_issues.map((issue) => `${issue.code} ${issue.detail}`).join('; ')}`);
    }
    if (report.package_json_issues.length) {
      console.error(
        `Package JSON issues: ${report.package_json_issues.map((issue) => `${issue.code} ${issue.path} ${issue.detail}`).join('; ')}`,
      );
    }
    if (report.missing_required_npm_scripts.length) console.error(`Missing required operator npm scripts: ${report.missing_required_npm_scripts.join(', ')}`);
    if (report.missing_required_documented_npm_scripts?.length) {
      console.error(`Missing required documented npm scripts: ${report.missing_required_documented_npm_scripts.join(', ')}`);
    }
    if (report.missing_readme_text_invariants?.length) {
      console.error(`Missing README text invariants: ${report.missing_readme_text_invariants.join('; ')}`);
    }
    if (report.missing_readme_command_order_invariants?.length) {
      console.error(`Missing README command order invariants: ${report.missing_readme_command_order_invariants.join('; ')}`);
    }
    if (report.missing_required_workflow_npm_scripts.length) {
      console.error(`Missing required workflow npm scripts: ${report.missing_required_workflow_npm_scripts.join(', ')}`);
    }
    if (report.missing_workflow_command_order_invariants?.length) {
      console.error(`Missing workflow command order invariants: ${report.missing_workflow_command_order_invariants.join('; ')}`);
    }
    if (report.missing_npm_scripts.length) console.error(`Missing npm scripts: ${report.missing_npm_scripts.join(', ')}`);
    if (report.missing_workflow_referenced_npm_scripts.length) {
      console.error(`Missing workflow-referenced npm scripts: ${report.missing_workflow_referenced_npm_scripts.join(', ')}`);
    }
    if (report.missing_workflow_ci_invariants.length) {
      console.error(`Missing workflow CI invariants: ${report.missing_workflow_ci_invariants.join('; ')}`);
    }
    if (report.missing_workflow_trigger_invariants.length) {
      console.error(`Missing workflow trigger invariants: ${report.missing_workflow_trigger_invariants.join('; ')}`);
    }
    if (report.missing_workflow_security_invariants.length) {
      console.error(`Missing workflow security invariants: ${report.missing_workflow_security_invariants.join('; ')}`);
    }
    if (report.missing_package_referenced_npm_scripts.length) {
      console.error(`Missing package-referenced npm scripts: ${report.missing_package_referenced_npm_scripts.join(', ')}`);
    }
    if (report.missing_package_script_chain_invariants?.length) {
      console.error(`Missing package script chain invariants: ${report.missing_package_script_chain_invariants.join('; ')}`);
    }
    if (report.missing_package_command_part_invariants?.length) {
      console.error(`Missing package command part invariants: ${report.missing_package_command_part_invariants.join('; ')}`);
    }
    if (report.missing_exact_npm_script_command_invariants?.length) {
      console.error(`Missing exact npm script command invariants: ${report.missing_exact_npm_script_command_invariants.join('; ')}`);
    }
    if (report.missing_quick_check_command_invariants?.length) {
      console.error(`Missing quick check command invariants: ${report.missing_quick_check_command_invariants.join('; ')}`);
    }
    if (report.missing_quick_asset_command_invariants?.length) {
      console.error(`Missing quick asset command invariants: ${report.missing_quick_asset_command_invariants.join('; ')}`);
    }
    if (report.failure_suppression_issues?.length) {
      console.error(`Failure suppression issues: ${report.failure_suppression_issues.map((issue) => `${issue.path} ${issue.detail}`).join('; ')}`);
    }
    if (report.hosting_command_issues?.length) {
      console.error(`Hosting command issues: ${report.hosting_command_issues.map((issue) => `${issue.path} ${issue.detail}`).join('; ')}`);
    }
    if (report.workflow_command_issues?.length) {
      console.error(`Workflow command issues: ${report.workflow_command_issues.map((issue) => `${issue.path} ${issue.detail}`).join('; ')}`);
    }
    if (report.missing_script_paths.length) console.error(`Missing script paths: ${report.missing_script_paths.join(', ')}`);
  }
}

if (args.includes('--help') || args.includes('-h')) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length > 0) {
  emitReport({
    ok: false,
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
    package_json_issues: [],
    required_operator_npm_scripts: REQUIRED_OPERATOR_NPM_SCRIPTS,
    required_documented_npm_scripts: REQUIRED_DOCUMENTED_NPM_SCRIPTS,
    required_readme_npm_run_order: REQUIRED_README_NPM_RUN_ORDER,
    required_readme_text_invariants: REQUIRED_README_TEXT_INVARIANTS.map(({ code, detail }) => ({ code, detail })),
    required_workflow_npm_scripts: REQUIRED_WORKFLOW_NPM_SCRIPTS,
    required_workflow_command_order: REQUIRED_WORKFLOW_COMMAND_ORDER,
    required_package_script_chains: REQUIRED_PACKAGE_SCRIPT_CHAINS,
    required_package_command_parts: REQUIRED_PACKAGE_COMMAND_PARTS,
    required_exact_npm_script_commands: REQUIRED_EXACT_NPM_SCRIPT_COMMANDS,
    forbidden_quick_check_patterns: FORBIDDEN_QUICK_CHECK_PATTERNS.map(({ code, detail }) => ({ code, detail })),
    required_quick_asset_command_parts: REQUIRED_QUICK_ASSET_COMMAND_PARTS,
    forbidden_failure_suppression_patterns: FAILURE_SUPPRESSION_PATTERNS.map(({ code, detail }) => ({ code, detail })),
    forbidden_hosting_command_patterns: FORBIDDEN_HOSTING_COMMAND_PATTERNS.map(({ code, detail }) => ({ code, detail })),
    forbidden_workflow_command_patterns: FORBIDDEN_WORKFLOW_COMMAND_PATTERNS.map(({ code, detail }) => ({ code, detail })),
    required_workflow_triggers: REQUIRED_WORKFLOW_TRIGGERS,
    required_workflow_push_branches: REQUIRED_WORKFLOW_PUSH_BRANCHES,
    required_workflow_permissions: REQUIRED_WORKFLOW_PERMISSIONS,
    required_workflow_job_timeout_minutes_max: REQUIRED_WORKFLOW_JOB_TIMEOUT_MINUTES_MAX,
    documented_npm_scripts: [],
    workflow_referenced_npm_scripts: [],
    workflow_node_version_expected: '',
    workflow_node_version_matches_engines: false,
    workflow_uses_npm_ci: false,
    workflow_concurrency_cancels_in_progress: false,
    workflow_checkout_persist_credentials_disabled: false,
    workflow_job_timeout_minutes: [],
    missing_workflow_ci_invariants: [],
    missing_workflow_trigger_invariants: [],
    missing_workflow_security_invariants: [],
    package_referenced_npm_scripts: [],
    missing_required_npm_scripts: [],
    missing_required_documented_npm_scripts: [],
    missing_readme_command_order_invariants: [],
    missing_readme_text_invariants: [],
    missing_required_workflow_npm_scripts: [],
    missing_workflow_command_order_invariants: [],
    missing_npm_scripts: [],
    missing_workflow_referenced_npm_scripts: [],
    missing_package_referenced_npm_scripts: [],
    missing_package_script_chain_invariants: [],
    missing_package_command_part_invariants: [],
    missing_exact_npm_script_command_invariants: [],
    missing_quick_check_command_invariants: [],
    missing_quick_asset_command_invariants: [],
    failure_suppression_issues: [],
    hosting_command_issues: [],
    workflow_command_issues: [],
    referenced_script_paths: [],
    optional_local_script_paths: unique([...OPTIONAL_LOCAL_SCRIPT_PATHS]),
    missing_script_paths: [],
  });
  process.exit(1);
}

function readIfExists(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function workflowPaths() {
  if (!existsSync(WORKFLOW_DIR)) return [];
  return readdirSync(WORKFLOW_DIR)
    .filter((name) => /\.ya?ml$/i.test(name))
    .map((name) => join(WORKFLOW_DIR, name));
}

function unique(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function workflowLabel(workflow) {
  return relative(PROJECT_DIR, workflow.path).replace(/\\/g, '/');
}

function loadPackageJson() {
  if (!existsSync(PACKAGE_PATH)) {
    return {
      pkg: {},
      issues: [
        {
          code: 'package-json-missing',
          path: 'package.json',
          detail: 'expected package.json for npm script and CI workflow command auditing',
        },
      ],
    };
  }

  try {
    return {
      pkg: JSON.parse(readFileSync(PACKAGE_PATH, 'utf8')),
      issues: [],
    };
  } catch (error) {
    return {
      pkg: {},
      issues: [
        {
          code: 'package-json-invalid-json',
          path: 'package.json',
          detail: error.message,
        },
      ],
    };
  }
}

const { pkg, issues: packageJsonIssues } = loadPackageJson();
const scripts = pkg.scripts ?? {};
const workflowFiles = workflowPaths().map((path) => ({ path, text: readIfExists(path) }));
const workflowText = workflowFiles.map((workflow) => workflow.text).join('\n');
const expectedNodeMajor = String(pkg.engines?.node ?? '').match(/\d+/)?.[0] ?? '';

function workflowHasTrigger(trigger) {
  return new RegExp(`(^|\\n)\\s*${trigger}:`, 'm').test(workflowText);
}

function workflowHasPushBranch(branch) {
  return new RegExp(`(^|\\n)\\s*push:\\s*(?:\\r?\\n[\\s\\S]*?branches:\\s*(?:\\r?\\n[\\s\\S]*?-\\s*['"]?${branch}['"]?(?:\\s|$)))`, 'm').test(
    workflowText,
  );
}

function workflowHasPermission(text, scope, level) {
  return new RegExp(`(^|\\n)\\s*permissions:\\s*(?:\\r?\\n[\\s\\S]*?\\s+${scope}:\\s*['"]?${level}['"]?(?:\\s|$))`, 'm').test(text);
}

function workflowHasConcurrencyCancellation(text) {
  return (
    /(^|\n)\s*concurrency:/m.test(text) &&
    /github\.workflow/.test(text) &&
    /github\.ref/.test(text) &&
    /(^|\n)\s*cancel-in-progress:\s*true(?:\s|$)/m.test(text)
  );
}

function workflowCheckoutDisablesPersistedCredentials(text) {
  return !/uses:\s*actions\/checkout@/i.test(text) || /(^|\n)\s*persist-credentials:\s*false(?:\s|$)/m.test(text);
}

function workflowCheckoutFetchesFullHistory(text) {
  return !/uses:\s*actions\/checkout@/i.test(text) || /(^|\n)\s*fetch-depth:\s*0(?:\s|$)/m.test(text);
}

function workflowJobTimeoutMinutes(text) {
  return [...text.matchAll(/(^|\n)\s*timeout-minutes:\s*(\d+)(?:\s|$)/gm)].map((match) => Number(match[2]));
}

function workflowRunsNpm(text) {
  return /\bnpm\s+(?:run|ci|install)\b/.test(text);
}

const documentedNpmScripts = [];
for (const docPath of DOC_PATHS) {
  const text = readIfExists(docPath);
  const matches = text.matchAll(/\bnpm\s+run\s+([A-Za-z0-9:_-]+)/g);
  for (const match of matches) documentedNpmScripts.push(match[1]);
}

const readmeText = readIfExists(README_PATH);
const workflowReferencedNpmScripts = [];
for (const workflow of workflowFiles) {
  const matches = workflow.text.matchAll(/\bnpm\s+run\s+([A-Za-z0-9:_-]+)/g);
  for (const match of matches) workflowReferencedNpmScripts.push(match[1]);
}

const packageReferencedNpmScripts = [];
for (const command of Object.values(scripts)) {
  if (typeof command !== 'string') continue;
  packageReferencedNpmScripts.push(...npmRunReferences(command));
}

function npmRunReferences(command) {
  return [...command.matchAll(/\bnpm\s+run\s+([A-Za-z0-9:_-]+)/g)].map((match) => match[1]);
}

function hasOrderedScriptChain(command, requiredScripts) {
  const references = [...npmRunReferences(command), ...nodeScriptReferences(command)];
  let startIndex = 0;
  for (const requiredScript of requiredScripts) {
    const foundIndex = references.findIndex((reference, index) => index >= startIndex && reference.endsWith(requiredScript));
    if (foundIndex < 0) return false;
    startIndex = foundIndex + 1;
  }
  return true;
}

function nodeScriptReferences(command) {
  return [...command.matchAll(/\bnode\s+((?!(?:-e|-p|--))[A-Za-z0-9_./-]+(?:\.mjs|\.js|\/project-kg)?)/g)].map(
    (match) => match[1],
  );
}

function normalizedCommand(command) {
  return command.replace(/\s+/g, ' ').trim();
}

function hasOrderedCommandParts(command, requiredParts) {
  const normalized = normalizedCommand(command);
  let startIndex = 0;
  for (const requiredPart of requiredParts) {
    const foundIndex = normalized.indexOf(requiredPart, startIndex);
    if (foundIndex < 0) return false;
    startIndex = foundIndex + requiredPart.length;
  }
  return true;
}

function hasOrderedReadmeNpmRunMentions(text, requiredScripts) {
  let previousIndex = -1;
  for (const script of requiredScripts) {
    const match = new RegExp(`\\bnpm\\s+run\\s+${escapeRegExp(script)}(?![A-Za-z0-9:_-])`).exec(text);
    const index = match?.index ?? -1;
    if (index < 0 || index <= previousIndex) return false;
    previousIndex = index;
  }
  return true;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const missingNpmScripts = unique(documentedNpmScripts).filter((script) => !scripts[script]);
const missingWorkflowReferencedNpmScripts = unique(workflowReferencedNpmScripts).filter((script) => !scripts[script]);
const missingPackageReferencedNpmScripts = unique(packageReferencedNpmScripts).filter((script) => !scripts[script]);
const missingRequiredNpmScripts = REQUIRED_OPERATOR_NPM_SCRIPTS.filter((script) => !scripts[script]);
const missingRequiredDocumentedNpmScripts = REQUIRED_DOCUMENTED_NPM_SCRIPTS.filter((script) => !documentedNpmScripts.includes(script));
const missingReadmeCommandOrderInvariants = hasOrderedReadmeNpmRunMentions(readmeText, REQUIRED_README_NPM_RUN_ORDER)
  ? []
  : [`README command list must present npm run commands in order: ${REQUIRED_README_NPM_RUN_ORDER.join(' -> ')}`];
const missingReadmeTextInvariants = REQUIRED_README_TEXT_INVARIANTS.filter((invariant) => !invariant.pattern.test(readmeText)).map(
  (invariant) => `${invariant.code}: ${invariant.detail}`,
);
const missingRequiredWorkflowNpmScripts = REQUIRED_WORKFLOW_NPM_SCRIPTS.filter(
  (script) => !workflowReferencedNpmScripts.includes(script),
);
const missingWorkflowCommandOrderInvariants = hasOrderedCommandParts(workflowText, REQUIRED_WORKFLOW_COMMAND_ORDER)
  ? []
  : [`GitHub workflow must run commands in order: ${REQUIRED_WORKFLOW_COMMAND_ORDER.join(' -> ')}`];
const missingPackageScriptChainInvariants = Object.entries(REQUIRED_PACKAGE_SCRIPT_CHAINS).flatMap(([script, requiredScripts]) => {
  const command = scripts[script];
  if (typeof command !== 'string') return [`${script}: npm script is missing`];
  if (hasOrderedScriptChain(command, requiredScripts)) return [];
  return [`${script}: expected ordered npm run chain ${requiredScripts.join(' -> ')}`];
});
const missingPackageCommandPartInvariants = Object.entries(REQUIRED_PACKAGE_COMMAND_PARTS).flatMap(([script, requiredParts]) => {
  const command = scripts[script];
  if (typeof command !== 'string') return [`${script}: npm script is missing`];
  if (hasOrderedCommandParts(command, requiredParts)) return [];
  return [`${script}: expected ordered command parts ${requiredParts.join(' -> ')}`];
});
const missingExactNpmScriptCommandInvariants = Object.entries(REQUIRED_EXACT_NPM_SCRIPT_COMMANDS).flatMap(
  ([script, requiredCommand]) => {
    const command = scripts[script];
    if (typeof command !== 'string') return [`${script}: npm script is missing`];
    if (normalizedCommand(command) === requiredCommand) return [];
    return [`${script}: expected exact command ${requiredCommand}`];
  },
);
const missingQuickAssetCommandInvariants =
  typeof scripts['check:assets:quick'] !== 'string'
    ? ['check:assets:quick: npm script is missing']
    : hasOrderedCommandParts(scripts['check:assets:quick'], REQUIRED_QUICK_ASSET_COMMAND_PARTS)
      ? []
      : [`check:assets:quick: expected bounded command parts ${REQUIRED_QUICK_ASSET_COMMAND_PARTS.join(' -> ')}`];
const missingQuickCheckCommandInvariants =
  typeof scripts['check:quick'] !== 'string'
    ? ['check:quick: npm script is missing']
    : FORBIDDEN_QUICK_CHECK_PATTERNS.filter((pattern) => pattern.pattern.test(scripts['check:quick'])).map(
        (pattern) => `check:quick: ${pattern.detail}`,
      );
const failureSuppressionIssues = [
  ...Object.entries(scripts).flatMap(([script, command]) => {
    if (typeof command !== 'string') return [];
    return FAILURE_SUPPRESSION_PATTERNS.filter((pattern) => pattern.pattern.test(command)).map((pattern) => ({
      code: pattern.code,
      path: `package.json#scripts.${script}`,
      detail: pattern.detail,
    }));
  }),
  ...workflowFiles.flatMap((workflow) =>
    FAILURE_SUPPRESSION_PATTERNS.filter((pattern) => pattern.pattern.test(workflow.text)).map((pattern) => ({
      code: pattern.code,
      path: workflowLabel(workflow),
      detail: pattern.detail,
    })),
  ),
];
const hostingCommandIssues = [
  ...Object.entries(scripts).flatMap(([script, command]) => {
    if (typeof command !== 'string') return [];
    return FORBIDDEN_HOSTING_COMMAND_PATTERNS.filter((pattern) => pattern.pattern.test(command)).map((pattern) => ({
      code: pattern.code,
      path: `package.json#scripts.${script}`,
      detail: pattern.detail,
    }));
  }),
  ...workflowFiles.flatMap((workflow) =>
    FORBIDDEN_HOSTING_COMMAND_PATTERNS.filter((pattern) => pattern.pattern.test(workflow.text)).map((pattern) => ({
      code: pattern.code,
      path: workflowLabel(workflow),
      detail: pattern.detail,
    })),
  ),
];
const workflowCommandIssues = workflowFiles.flatMap((workflow) =>
  FORBIDDEN_WORKFLOW_COMMAND_PATTERNS.filter((pattern) => pattern.pattern.test(workflow.text)).map((pattern) => ({
    code: pattern.code,
    path: workflowLabel(workflow),
    detail: pattern.detail,
  })),
);
const npmWorkflowFiles = workflowFiles.filter((workflow) => workflowRunsNpm(workflow.text));
const workflowNodeVersionMatchesEngines =
  npmWorkflowFiles.length === 0 ||
  !expectedNodeMajor ||
  npmWorkflowFiles.every((workflow) =>
    new RegExp(`node-version:\\s*['"]?${expectedNodeMajor}(?:\\.x)?['"]?`, 'i').test(workflow.text),
  );
const workflowUsesNpmCi = npmWorkflowFiles.length === 0 || npmWorkflowFiles.every((workflow) => /\bnpm\s+ci\b/.test(workflow.text));
const missingWorkflowCiInvariants = npmWorkflowFiles.flatMap((workflow) => [
  ...(!expectedNodeMajor || new RegExp(`node-version:\\s*['"]?${expectedNodeMajor}(?:\\.x)?['"]?`, 'i').test(workflow.text)
    ? []
    : [`${workflowLabel(workflow)}: GitHub workflow node-version must match package engines.node (${pkg.engines?.node})`]),
  ...(/\bnpm\s+ci\b/.test(workflow.text)
    ? []
    : [`${workflowLabel(workflow)}: GitHub workflow must use npm ci for lockfile-safe installs`]),
  ...(workflow.text.includes('generate-page-refresh-ledger.mjs') || /\bnpm\s+run\s+check\b/.test(workflow.text)
    ? workflowCheckoutFetchesFullHistory(workflow.text)
      ? []
      : [`${workflowLabel(workflow)}: GitHub workflow checkout must set fetch-depth: 0 so ledger git dates are stable`]
    : []),
]);
const missingWorkflowTriggerInvariants = [
  ...REQUIRED_WORKFLOW_TRIGGERS.filter((trigger) => !workflowHasTrigger(trigger)).map(
    (trigger) => `GitHub workflow must run on ${trigger}`,
  ),
  ...REQUIRED_WORKFLOW_PUSH_BRANCHES.filter((branch) => !workflowHasPushBranch(branch)).map(
    (branch) => `GitHub workflow push trigger must include ${branch}`,
  ),
];
const missingWorkflowSecurityInvariants = workflowFiles.flatMap((workflow) => {
  const label = workflowLabel(workflow);
  const timeoutMinutes = workflowJobTimeoutMinutes(workflow.text);

  return [
    ...Object.entries(REQUIRED_WORKFLOW_PERMISSIONS)
      .filter(([scope, level]) => !workflowHasPermission(workflow.text, scope, level))
      .map(([scope, level]) => `${label}: GitHub workflow permissions must set ${scope}: ${level}`),
    ...(workflowHasConcurrencyCancellation(workflow.text) ? [] : [`${label}: GitHub workflow must cancel older runs on the same ref`]),
    ...(workflowCheckoutDisablesPersistedCredentials(workflow.text)
      ? []
      : [`${label}: GitHub workflow checkout must set persist-credentials: false`]),
    ...(timeoutMinutes.length === 0
      ? [`${label}: GitHub workflow jobs must set timeout-minutes`]
      : timeoutMinutes
          .filter((minutes) => minutes <= 0 || minutes > REQUIRED_WORKFLOW_JOB_TIMEOUT_MINUTES_MAX)
          .map(
            (minutes) =>
              `${label}: GitHub workflow timeout-minutes must be between 1 and ${REQUIRED_WORKFLOW_JOB_TIMEOUT_MINUTES_MAX}, found ${minutes}`,
          )),
  ];
});

const referencedScriptPaths = [];
for (const command of Object.values(scripts)) {
  if (typeof command !== 'string') continue;
  const matches = command.matchAll(/\bnode\s+((?!(?:-e|-p|--))[A-Za-z0-9_./-]+(?:\.mjs|\.js|\/project-kg)?)/g);
  for (const match of matches) {
    const scriptPath = match[1];
    if (scriptPath.startsWith('node_modules/')) continue;
    if (scriptPath.startsWith('./node_modules/')) continue;
    if (scriptPath.includes('/node_modules/')) continue;
    if (scriptPath.startsWith('scripts/') || scriptPath.startsWith('tools/')) {
      referencedScriptPaths.push(scriptPath);
    }
  }
}

const missingScriptPaths = unique(referencedScriptPaths).filter(
  (scriptPath) => !OPTIONAL_LOCAL_SCRIPT_PATHS.has(scriptPath) && !existsSync(join(PROJECT_DIR, scriptPath)),
);

const report = {
  ok:
    missingNpmScripts.length === 0 &&
    missingWorkflowReferencedNpmScripts.length === 0 &&
    missingPackageReferencedNpmScripts.length === 0 &&
    missingRequiredNpmScripts.length === 0 &&
    missingRequiredDocumentedNpmScripts.length === 0 &&
    missingReadmeCommandOrderInvariants.length === 0 &&
    missingReadmeTextInvariants.length === 0 &&
    missingRequiredWorkflowNpmScripts.length === 0 &&
    missingWorkflowCommandOrderInvariants.length === 0 &&
    missingScriptPaths.length === 0 &&
    missingWorkflowCiInvariants.length === 0 &&
    missingWorkflowTriggerInvariants.length === 0 &&
    missingWorkflowSecurityInvariants.length === 0 &&
    missingPackageScriptChainInvariants.length === 0 &&
    missingPackageCommandPartInvariants.length === 0 &&
    missingExactNpmScriptCommandInvariants.length === 0 &&
    missingQuickCheckCommandInvariants.length === 0 &&
    missingQuickAssetCommandInvariants.length === 0 &&
    failureSuppressionIssues.length === 0 &&
    hostingCommandIssues.length === 0 &&
    workflowCommandIssues.length === 0 &&
    argumentIssues.length === 0 &&
    packageJsonIssues.length === 0,
  project_dir: PROJECT_DIR,
  argument_issues: argumentIssues,
  package_json_issues: packageJsonIssues,
  required_operator_npm_scripts: REQUIRED_OPERATOR_NPM_SCRIPTS,
  required_documented_npm_scripts: REQUIRED_DOCUMENTED_NPM_SCRIPTS,
  required_readme_npm_run_order: REQUIRED_README_NPM_RUN_ORDER,
  required_readme_text_invariants: REQUIRED_README_TEXT_INVARIANTS.map(({ code, detail }) => ({ code, detail })),
  required_workflow_npm_scripts: REQUIRED_WORKFLOW_NPM_SCRIPTS,
  required_workflow_command_order: REQUIRED_WORKFLOW_COMMAND_ORDER,
  required_package_script_chains: REQUIRED_PACKAGE_SCRIPT_CHAINS,
  required_package_command_parts: REQUIRED_PACKAGE_COMMAND_PARTS,
  required_exact_npm_script_commands: REQUIRED_EXACT_NPM_SCRIPT_COMMANDS,
  forbidden_quick_check_patterns: FORBIDDEN_QUICK_CHECK_PATTERNS.map(({ code, detail }) => ({ code, detail })),
  required_quick_asset_command_parts: REQUIRED_QUICK_ASSET_COMMAND_PARTS,
  forbidden_failure_suppression_patterns: FAILURE_SUPPRESSION_PATTERNS.map(({ code, detail }) => ({ code, detail })),
  forbidden_hosting_command_patterns: FORBIDDEN_HOSTING_COMMAND_PATTERNS.map(({ code, detail }) => ({ code, detail })),
  forbidden_workflow_command_patterns: FORBIDDEN_WORKFLOW_COMMAND_PATTERNS.map(({ code, detail }) => ({ code, detail })),
  required_workflow_triggers: REQUIRED_WORKFLOW_TRIGGERS,
  required_workflow_push_branches: REQUIRED_WORKFLOW_PUSH_BRANCHES,
  required_workflow_permissions: REQUIRED_WORKFLOW_PERMISSIONS,
  required_workflow_job_timeout_minutes_max: REQUIRED_WORKFLOW_JOB_TIMEOUT_MINUTES_MAX,
  documented_npm_scripts: unique(documentedNpmScripts),
  workflow_referenced_npm_scripts: unique(workflowReferencedNpmScripts),
  workflow_node_version_expected: expectedNodeMajor,
  workflow_node_version_matches_engines: workflowNodeVersionMatchesEngines,
  workflow_uses_npm_ci: workflowUsesNpmCi,
  workflow_concurrency_cancels_in_progress: workflowFiles.every((workflow) => workflowHasConcurrencyCancellation(workflow.text)),
  workflow_checkout_persist_credentials_disabled: workflowFiles.every((workflow) => workflowCheckoutDisablesPersistedCredentials(workflow.text)),
  workflow_job_timeout_minutes: workflowFiles.flatMap((workflow) => workflowJobTimeoutMinutes(workflow.text)),
  missing_workflow_ci_invariants: missingWorkflowCiInvariants,
  missing_workflow_trigger_invariants: missingWorkflowTriggerInvariants,
  missing_workflow_security_invariants: missingWorkflowSecurityInvariants,
  package_referenced_npm_scripts: unique(packageReferencedNpmScripts),
  missing_required_npm_scripts: missingRequiredNpmScripts,
  missing_required_documented_npm_scripts: missingRequiredDocumentedNpmScripts,
  missing_readme_command_order_invariants: missingReadmeCommandOrderInvariants,
  missing_readme_text_invariants: missingReadmeTextInvariants,
  missing_required_workflow_npm_scripts: missingRequiredWorkflowNpmScripts,
  missing_workflow_command_order_invariants: missingWorkflowCommandOrderInvariants,
  missing_npm_scripts: missingNpmScripts,
  missing_workflow_referenced_npm_scripts: missingWorkflowReferencedNpmScripts,
  missing_package_referenced_npm_scripts: missingPackageReferencedNpmScripts,
  missing_package_script_chain_invariants: missingPackageScriptChainInvariants,
  missing_package_command_part_invariants: missingPackageCommandPartInvariants,
  missing_exact_npm_script_command_invariants: missingExactNpmScriptCommandInvariants,
  missing_quick_check_command_invariants: missingQuickCheckCommandInvariants,
  missing_quick_asset_command_invariants: missingQuickAssetCommandInvariants,
  failure_suppression_issues: failureSuppressionIssues,
  hosting_command_issues: hostingCommandIssues,
  workflow_command_issues: workflowCommandIssues,
  referenced_script_paths: unique(referencedScriptPaths),
  optional_local_script_paths: unique([...OPTIONAL_LOCAL_SCRIPT_PATHS]),
  missing_script_paths: missingScriptPaths,
};

emitReport(report);
process.exit(report.ok ? 0 : 1);
