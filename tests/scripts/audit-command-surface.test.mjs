import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

const REQUIRED_SCRIPTS = [
  'build',
  'build:fast',
  'check',
  'check:assets',
  'check:assets:quick',
  'check:ci',
  'check:hosting',
  'check:links',
  'check:news',
  'check:quick',
  'check:security',
  'audit:commands',
  'guard:check',
  'prebuild',
  'db:migrate',
  'db:migrate:check',
  'db:migrate:verify',
  'deploy',
  'editorial:weekly',
  'ship:check',
  'test:scripts',
  'ledger:pages',
  'vercel:env:pull',
];

function writeFixtureProject(workflows, scriptOverrides = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-command-audit-'));
  mkdirSync(join(dir, '.github', 'workflows'), { recursive: true });
  const scripts = Object.fromEntries(REQUIRED_SCRIPTS.map((script) => [script, 'echo ok']));
  scripts.prebuild =
    'node scripts/guard-content.mjs && node scripts/guard-stale-facts.mjs && node scripts/audit-guide-picks.mjs && node scripts/fetch-github-stats.mjs --output src/data/github-stats.build.json --skip-render-unchanged && node scripts/generate-og-news.mjs';
  scripts['check:assets:quick'] =
    'node scripts/prep-favicons.mjs --check && node scripts/generate-og-svgs.mjs --check --limit 5 && node scripts/generate-og-news.mjs --check --limit 2 && node scripts/optimize-og-images.mjs --check --limit 20 && node scripts/generate-logo-manifest.mjs --check';
  scripts['check:quick'] = 'npm run test:scripts && npm run audit:commands && npm run check:assets:quick';
  scripts['check:ci'] = 'npm run check:quick && npm run check && npm run build:fast';
  scripts['ship:check'] = 'npm run check:quick && npm run check && npm run build:fast';
  scripts['guard:check'] =
    'node scripts/guard-content.mjs && node scripts/guard-stale-facts.mjs && node scripts/guard-em-dashes.mjs && node scripts/audit-guide-picks.mjs && node scripts/audit-tool-logos.mjs && node scripts/audit-news-rendering.mjs && node scripts/audit-hosting-runtime.mjs && node scripts/generate-page-refresh-ledger.mjs --check && node scripts/audit-font-policy.mjs --source';
  scripts.check = 'npm run guard:check && npm run check:links && npm run check:news && npm run check:security';
  scripts['build:fast'] = 'npm run guard:check && npm exec --yes --package=node@24 -- node scripts/build-fast.mjs';
  scripts.deploy = 'npx vercel build --prod && npx vercel deploy --prebuilt --prod';
  scripts['vercel:env:pull'] = 'npx vercel env pull .env.local --yes';
  Object.assign(scripts, scriptOverrides);

  writeFileSync(
    join(dir, 'package.json'),
    `${JSON.stringify(
      {
        name: 'command-audit-fixture',
        engines: { node: '24.x' },
        scripts,
      },
      null,
      2,
    )}\n`,
  );
  writeFileSync(
    join(dir, 'README.md'),
    [
      '# Fixture',
      '',
      'Use the smallest verification command that matches the change.',
      '',
      '```bash',
      'npm run check:quick',
      'npm run check',
      'npm run build',
      'npm run deploy',
      'npm run editorial:weekly',
      'npm run ledger:pages',
      '```',
      '',
      '- `npm run check:quick`: no-build loop for script/tooling changes; runs script tests, command-surface audit, and bounded asset checks.',
      '- `npm run check`: broader source, content, link, news, asset, and security checks.',
      '- `npm run editorial:weekly`: editorial freshness queue for deciding what to refresh next.',
      '- `npm run ledger:pages`: regenerates `PAGE_REFRESH_LEDGER.md` after page or content edits.',
      '- `npm run build`: full production build for output, runtime, UI, route, or pre-ship validation. Do not use it as routine verification for content/script-only changes.',
      '- `npm run deploy`: Vercel production deploy after validation.',
      '',
    ].join('\n'),
  );

  const workflowEntries = typeof workflows === 'string' ? [['ci.yml', workflows]] : Object.entries(workflows);
  for (const [name, workflowText] of workflowEntries) {
    writeFileSync(join(dir, '.github', 'workflows', name), workflowText);
  }

  return dir;
}

const STRONG_CI_WORKFLOW = `name: CI
on:
  pull_request:
  push:
    branches:
      - master
  workflow_dispatch:
permissions:
  contents: read
concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v5
        with:
          fetch-depth: 0
          persist-credentials: false
      - uses: actions/setup-node@v5
        with:
          node-version: '24'
      - run: npm ci
      - run: npm run check:quick
      - run: npm run check
      - run: npm run build:fast
`;

test('command surface audit verifies documented npm scripts and script paths', () => {
  const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(
    result.status,
    0,
    `command surface audit failed unexpectedly\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
  );

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.deepEqual(report.argument_issues, []);
  assert.equal(report.missing_required_npm_scripts.length, 0);
  assert.equal(report.missing_required_documented_npm_scripts.length, 0);
  assert.equal(report.missing_readme_command_order_invariants.length, 0);
  assert.equal(report.missing_readme_text_invariants.length, 0);
  assert.equal(report.missing_required_workflow_npm_scripts.length, 0);
  assert.equal(report.missing_npm_scripts.length, 0);
  assert.equal(report.missing_workflow_referenced_npm_scripts.length, 0);
  assert.equal(report.missing_workflow_ci_invariants.length, 0);
  assert.equal(report.missing_workflow_trigger_invariants.length, 0);
  assert.equal(report.missing_workflow_security_invariants.length, 0);
  assert.equal(report.missing_workflow_command_order_invariants.length, 0);
  assert.equal(report.missing_package_script_chain_invariants.length, 0);
  assert.equal(report.missing_package_command_part_invariants.length, 0);
  assert.equal(report.missing_quick_check_command_invariants.length, 0);
  assert.equal(report.missing_quick_asset_command_invariants.length, 0);
  assert.equal(report.missing_package_referenced_npm_scripts.length, 0);
  assert.equal(report.failure_suppression_issues.length, 0);
  assert.equal(report.hosting_command_issues.length, 0);
  assert.equal(report.workflow_command_issues.length, 0);
  assert.equal(report.missing_exact_npm_script_command_invariants.length, 0);
  assert.equal(report.missing_script_paths.length, 0);
  assert.ok(report.required_operator_npm_scripts.includes('check:assets'));
  assert.ok(report.required_operator_npm_scripts.includes('check:assets:quick'));
  assert.ok(report.required_operator_npm_scripts.includes('build:fast'));
  assert.ok(report.required_operator_npm_scripts.includes('check:ci'));
  assert.ok(report.required_operator_npm_scripts.includes('check:hosting'));
  assert.ok(report.required_operator_npm_scripts.includes('check:links'));
  assert.ok(report.required_operator_npm_scripts.includes('check:news'));
  assert.ok(report.required_operator_npm_scripts.includes('check:quick'));
  assert.ok(report.required_operator_npm_scripts.includes('check:security'));
  assert.ok(report.required_operator_npm_scripts.includes('ship:check'));
  assert.ok(report.required_operator_npm_scripts.includes('db:migrate'));
  assert.ok(report.required_operator_npm_scripts.includes('vercel:env:pull'));
  assert.deepEqual(report.required_documented_npm_scripts, ['check:quick', 'check', 'build', 'deploy', 'editorial:weekly', 'ledger:pages']);
  assert.deepEqual(report.required_readme_npm_run_order, ['check:quick', 'check', 'editorial:weekly', 'ledger:pages', 'build', 'deploy']);
  assert.deepEqual(
    report.required_readme_text_invariants.map((invariant) => invariant.code),
    [
      'readme-smallest-verification',
      'readme-check-quick-no-build',
      'readme-check-quick-bounded-assets',
      'readme-editorial-weekly-queue',
      'readme-ledger-pages-ledger',
      'readme-build-full-production',
      'readme-build-not-routine',
      'readme-deploy-vercel-production',
    ],
  );
  assert.deepEqual(report.required_workflow_npm_scripts, ['check:quick', 'check', 'build:fast']);
  assert.deepEqual(report.required_workflow_command_order, ['npm ci', 'npm run check:quick', 'npm run check', 'npm run build:fast']);
  assert.deepEqual(report.required_package_script_chains, {
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
    'check:ci': ['check:quick', 'check', 'build:fast'],
    'ship:check': ['check:quick', 'check', 'build:fast'],
    'build:fast': ['guard:check', 'build-fast.mjs'],
  });
  assert.deepEqual(report.required_package_command_parts, {
    prebuild: ['node scripts/fetch-github-stats.mjs --output src/data/github-stats.build.json --skip-render-unchanged'],
  });
  assert.deepEqual(report.required_exact_npm_script_commands, {
    deploy: 'npx vercel build --prod && npx vercel deploy --prebuilt --prod',
    'vercel:env:pull': 'npx vercel env pull .env.local --yes',
  });
  assert.deepEqual(
    report.forbidden_quick_check_patterns.map((pattern) => pattern.code),
    [
      'quick-check-build',
      'quick-check-smoke',
      'quick-check-vercel',
      'quick-check-dev-server',
      'quick-check-broad-check',
      'quick-check-heavy-check-script',
      'quick-check-security-audit',
      'quick-check-broad-test',
      'quick-check-heavy-audit',
    ],
  );
  assert.deepEqual(report.required_quick_asset_command_parts, [
    'node scripts/prep-favicons.mjs --check',
    'node scripts/generate-og-svgs.mjs --check --limit 5',
    'node scripts/generate-og-news.mjs --check --limit 2',
    'node scripts/optimize-og-images.mjs --check --limit 20',
    'node scripts/generate-logo-manifest.mjs --check',
  ]);
  assert.deepEqual(
    report.forbidden_failure_suppression_patterns.map((pattern) => pattern.code),
    ['shell-or-true', 'shell-or-exit-zero', 'workflow-continue-on-error'],
  );
  assert.deepEqual(
    report.forbidden_hosting_command_patterns.map((pattern) => pattern.code),
    ['hosting-wrangler-command', 'hosting-cloudflare-command', 'hosting-cloudflare-pages-command'],
  );
  assert.deepEqual(
    report.forbidden_workflow_command_patterns.map((pattern) => pattern.code),
    ['workflow-full-build', 'workflow-production-deploy', 'workflow-vercel-prod-build'],
  );
  assert.deepEqual(report.required_workflow_triggers, ['pull_request', 'push', 'workflow_dispatch']);
  assert.deepEqual(report.required_workflow_push_branches, ['master']);
  assert.deepEqual(report.required_workflow_permissions, { contents: 'read' });
  assert.equal(report.required_workflow_job_timeout_minutes_max, 30);
  assert.ok(report.documented_npm_scripts.includes('build'));
  assert.ok(report.documented_npm_scripts.includes('check'));
  assert.ok(report.workflow_referenced_npm_scripts.includes('check:quick'));
  assert.ok(report.workflow_referenced_npm_scripts.includes('build:fast'));
  assert.ok(report.workflow_referenced_npm_scripts.includes('check'));
  assert.equal(report.workflow_node_version_expected, '24');
  assert.equal(report.workflow_node_version_matches_engines, true);
  assert.equal(report.workflow_uses_npm_ci, true);
  assert.equal(report.workflow_concurrency_cancels_in_progress, true);
  assert.equal(report.workflow_checkout_persist_credentials_disabled, true);
  assert.deepEqual(report.workflow_job_timeout_minutes, [30]);
  assert.ok(report.package_referenced_npm_scripts.includes('guard:check'));
  assert.ok(report.package_referenced_npm_scripts.includes('smoke:api'));
  assert.ok(report.package_referenced_npm_scripts.includes('build:fast'));
  assert.ok(report.package_referenced_npm_scripts.includes('audit:commands'));
  assert.ok(report.package_referenced_npm_scripts.includes('check:assets:quick'));
  assert.ok(report.package_referenced_npm_scripts.includes('test:scripts'));
  assert.ok(report.referenced_script_paths.includes('scripts/audit-command-surface.mjs'));
  assert.ok(report.optional_local_script_paths.includes('tools/project-kg/bin/project-kg'));
});

test('command surface audit reports structured invalid arguments', () => {
  const unknown = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--wat'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));
  assert.deepEqual(unknownReport.package_json_issues, []);
  assert.deepEqual(unknownReport.documented_npm_scripts, []);

  const missing = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(missing.status, 1);
  assert.equal(missing.stderr, '');

  const missingReport = JSON.parse(missing.stdout);
  assert.equal(missingReport.ok, false);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a path/.test(issue.detail)));

  const stray = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', 'fixture'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(stray.status, 1);
  assert.equal(stray.stderr, '');

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument fixture/.test(issue.detail)));

  const conflicting = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', '.', '--root', '.'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(conflicting.status, 1);
  assert.equal(conflicting.stderr, '');

  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.equal(conflictingReport.ok, false);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('command surface audit prints CLI help', () => {
  const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--help'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--project-dir <dir>/);
});

test('command surface audit reports structured issues for missing package.json fixtures', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-command-empty-'));

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.project_dir, resolve(dir));
    assert.deepEqual(report.package_json_issues.map((issue) => issue.code), ['package-json-missing']);
    assert.ok(report.missing_required_npm_scripts.includes('check:hosting'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit reports structured issues for invalid package.json fixtures', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-command-invalid-'));
  writeFileSync(join(dir, 'package.json'), '{ not json');

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.project_dir, resolve(dir));
    assert.deepEqual(report.package_json_issues.map((issue) => issue.code), ['package-json-invalid-json']);
    assert.match(report.package_json_issues[0].detail, /JSON|property|position/i);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed on weak CI workflow fixtures', () => {
  const dir = writeFixtureProject(`name: CI
on:
  workflow_dispatch:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: '20'
      - run: npm install
      - run: npm run check:quick
      - run: npm run check
      - run: npm run build:fast
`);

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.missing_required_npm_scripts.length, 0);
    assert.equal(report.missing_required_workflow_npm_scripts.length, 0);
    assert.match(report.missing_workflow_ci_invariants.join('\n'), /node-version must match/);
    assert.match(report.missing_workflow_ci_invariants.join('\n'), /npm ci/);
    assert.match(report.missing_workflow_ci_invariants.join('\n'), /fetch-depth: 0/);
    assert.match(report.missing_workflow_trigger_invariants.join('\n'), /pull_request/);
    assert.match(report.missing_workflow_trigger_invariants.join('\n'), /push/);
    assert.match(report.missing_workflow_security_invariants.join('\n'), /contents: read/);
    assert.match(report.missing_workflow_security_invariants.join('\n'), /cancel older runs/);
    assert.match(report.missing_workflow_security_invariants.join('\n'), /persist-credentials: false/);
    assert.match(report.missing_workflow_security_invariants.join('\n'), /timeout-minutes/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed when CI bypasses the named quick gate', () => {
  const dir = writeFixtureProject(`name: CI
on:
  pull_request:
  push:
    branches:
      - master
  workflow_dispatch:
permissions:
  contents: read
concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v5
        with:
          fetch-depth: 0
          persist-credentials: false
      - uses: actions/setup-node@v5
        with:
          node-version: '24'
      - run: npm ci
      - run: npm run test:scripts && npm run audit:commands && npm run check:assets:quick
      - run: npm run check
      - run: npm run build:fast
`);

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.deepEqual(report.missing_workflow_ci_invariants, []);
    assert.deepEqual(report.missing_workflow_trigger_invariants, []);
    assert.deepEqual(report.missing_workflow_security_invariants, []);
    assert.deepEqual(report.missing_required_workflow_npm_scripts, ['check:quick']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed when CI order drifts or runs production commands', () => {
  const dir = writeFixtureProject(`name: CI
on:
  pull_request:
  push:
    branches:
      - master
  workflow_dispatch:
permissions:
  contents: read
concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v5
        with:
          fetch-depth: 0
          persist-credentials: false
      - uses: actions/setup-node@v5
        with:
          node-version: '24'
      - run: npm ci
      - run: npm run build:fast
      - run: npm run check:quick
      - run: npm run check
      - run: npm run build
      - run: npx vercel build --prod
      - run: npx vercel deploy --prebuilt --prod
`);

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.match(report.missing_workflow_command_order_invariants.join('\n'), /npm ci -> npm run check:quick -> npm run check -> npm run build:fast/);
    assert.ok(report.workflow_command_issues.some((issue) => issue.code === 'workflow-full-build'));
    assert.ok(report.workflow_command_issues.some((issue) => issue.code === 'workflow-production-deploy'));
    assert.ok(report.workflow_command_issues.some((issue) => issue.code === 'workflow-vercel-prod-build'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit checks workflow safety per workflow file', () => {
  const dir = writeFixtureProject({
    'ci.yml': STRONG_CI_WORKFLOW,
    'weak-extra.yml': `name: Weak Extra
on:
  workflow_dispatch:
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: '20'
      - run: npm install
      - run: npm run check
`,
  });

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.missing_workflow_trigger_invariants.length, 0);
    assert.match(report.missing_workflow_ci_invariants.join('\n'), /weak-extra\.yml: .*node-version must match/);
    assert.match(report.missing_workflow_ci_invariants.join('\n'), /weak-extra\.yml: .*npm ci/);
    assert.match(report.missing_workflow_ci_invariants.join('\n'), /weak-extra\.yml: .*fetch-depth: 0/);
    assert.match(report.missing_workflow_security_invariants.join('\n'), /weak-extra\.yml: .*contents: read/);
    assert.match(report.missing_workflow_security_invariants.join('\n'), /weak-extra\.yml: .*cancel older runs/);
    assert.match(report.missing_workflow_security_invariants.join('\n'), /weak-extra\.yml: .*persist-credentials: false/);
    assert.match(report.missing_workflow_security_invariants.join('\n'), /weak-extra\.yml: .*timeout-minutes/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed when local release commands drop the quick check gate', () => {
  const dir = writeFixtureProject(STRONG_CI_WORKFLOW, {
    'check:ci': 'npm run check && npm run build:fast',
    'ship:check': 'npm run check && npm run build:fast',
  });

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.match(report.missing_package_script_chain_invariants.join('\n'), /check:ci: .*check:quick/);
    assert.match(report.missing_package_script_chain_invariants.join('\n'), /ship:check: .*check:quick/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed when broad check drops source gates', () => {
  const dir = writeFixtureProject(STRONG_CI_WORKFLOW, {
    check: 'npm run guard:check && npm run check:links && npm run check:news',
  });

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.match(report.missing_package_script_chain_invariants.join('\n'), /check: .*check:security/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed when guard:check drops content guards', () => {
  const dir = writeFixtureProject(STRONG_CI_WORKFLOW, {
    'guard:check':
      'node scripts/guard-content.mjs && node scripts/audit-guide-picks.mjs && node scripts/audit-tool-logos.mjs && node scripts/audit-news-rendering.mjs && node scripts/audit-hosting-runtime.mjs && node scripts/generate-page-refresh-ledger.mjs --check && node scripts/audit-font-policy.mjs --source',
  });

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.match(report.missing_package_script_chain_invariants.join('\n'), /guard:check: .*guard-stale-facts\.mjs/);
    assert.match(report.missing_package_script_chain_invariants.join('\n'), /guard:check: .*guard-em-dashes\.mjs/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed when required operator docs drop the quick check', () => {
  const dir = writeFixtureProject(STRONG_CI_WORKFLOW);
  writeFileSync(
    join(dir, 'README.md'),
    [
      '# Fixture',
      '',
      'Use the smallest verification command that matches the change.',
      '',
      '```bash',
      'npm run check',
      'npm run build',
      'npm run deploy',
      'npm run editorial:weekly',
      'npm run ledger:pages',
      '```',
      '',
      '- `npm run check`: broader source, content, link, news, asset, and security checks.',
      '- `npm run editorial:weekly`: editorial freshness queue for deciding what to refresh next.',
      '- `npm run ledger:pages`: regenerates `PAGE_REFRESH_LEDGER.md` after page or content edits.',
      '- `npm run build`: full production build for output, runtime, UI, route, or pre-ship validation. Do not use it as routine verification for content/script-only changes.',
      '- `npm run deploy`: Vercel production deploy after validation.',
      '',
    ].join('\n'),
  );

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.deepEqual(report.missing_required_documented_npm_scripts, ['check:quick']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed when README loses quick-check intent', () => {
  const dir = writeFixtureProject(STRONG_CI_WORKFLOW);
  writeFileSync(
    join(dir, 'README.md'),
    [
      '# Fixture',
      '',
      '```bash',
      'npm run check:quick',
      'npm run check',
      'npm run build',
      'npm run deploy',
      'npm run editorial:weekly',
      'npm run ledger:pages',
      '```',
      '',
      '- `npm run check:quick`: runs several validation commands.',
      '- `npm run check`: broader source, content, link, news, asset, and security checks.',
      '- `npm run editorial:weekly`: editorial freshness queue for deciding what to refresh next.',
      '- `npm run ledger:pages`: regenerates `PAGE_REFRESH_LEDGER.md` after page or content edits.',
      '- `npm run build`: full production build for output, runtime, UI, route, or pre-ship validation. Do not use it as routine verification for content/script-only changes.',
      '- `npm run deploy`: Vercel production deploy after validation.',
      '',
    ].join('\n'),
  );

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.deepEqual(report.missing_required_documented_npm_scripts, []);
    assert.match(report.missing_readme_text_invariants.join('\n'), /readme-smallest-verification/);
    assert.match(report.missing_readme_text_invariants.join('\n'), /readme-check-quick-no-build/);
    assert.match(report.missing_readme_text_invariants.join('\n'), /readme-check-quick-bounded-assets/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed when README presents build before quick checks', () => {
  const dir = writeFixtureProject(STRONG_CI_WORKFLOW);
  writeFileSync(
    join(dir, 'README.md'),
    [
      '# Fixture',
      '',
      'Use the smallest verification command that matches the change.',
      '',
      '```bash',
      'npm run build',
      'npm run deploy',
      'npm run check:quick',
      'npm run check',
      'npm run editorial:weekly',
      'npm run ledger:pages',
      '```',
      '',
      '- `npm run check:quick`: no-build loop for script/tooling changes; runs script tests, command-surface audit, and bounded asset checks.',
      '- `npm run check`: broader source, content, link, news, asset, and security checks.',
      '- `npm run editorial:weekly`: editorial freshness queue for deciding what to refresh next.',
      '- `npm run ledger:pages`: regenerates `PAGE_REFRESH_LEDGER.md` after page or content edits.',
      '- `npm run build`: full production build for output, runtime, UI, route, or pre-ship validation. Do not use it as routine verification for content/script-only changes.',
      '- `npm run deploy`: Vercel production deploy after validation.',
      '',
    ].join('\n'),
  );

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.deepEqual(report.missing_required_documented_npm_scripts, []);
    assert.deepEqual(report.missing_readme_text_invariants, []);
    assert.match(report.missing_readme_command_order_invariants.join('\n'), /check:quick -> check -> editorial:weekly -> ledger:pages -> build -> deploy/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed when check:quick grows into a build or deploy gate', () => {
  const dir = writeFixtureProject(STRONG_CI_WORKFLOW, {
    'check:quick': 'npm run test:scripts && npm run audit:commands && npm run check:assets:quick && npm run build:fast && npx vercel deploy',
  });

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.match(report.missing_quick_check_command_invariants.join('\n'), /must not run build commands/);
    assert.match(report.missing_quick_check_command_invariants.join('\n'), /must not run Vercel deploy\/build commands/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed when check:quick grows into broad checks or security audits', () => {
  const dir = writeFixtureProject(STRONG_CI_WORKFLOW, {
    'check:quick': 'npm run test:scripts && npm run audit:commands && npm run check:assets:quick && npm run check && npm audit --audit-level=moderate',
  });

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.match(report.missing_quick_check_command_invariants.join('\n'), /must not run the broad check gate/);
    assert.match(report.missing_quick_check_command_invariants.join('\n'), /must not run security audit commands/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed when check:quick grows into heavier sibling gates', () => {
  const dir = writeFixtureProject(STRONG_CI_WORKFLOW, {
    'check:quick':
      'npm run test:scripts && npm run audit:commands && npm run check:assets:quick && npm run check:content && npm run check:dist && npm run check:assets && npm run test && npm run audit:all',
  });

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.match(report.missing_quick_check_command_invariants.join('\n'), /must not run heavier check:\* commands/);
    assert.match(report.missing_quick_check_command_invariants.join('\n'), /must not run broad or smoke test commands/);
    assert.match(report.missing_quick_check_command_invariants.join('\n'), /must not run heavier audit:\* commands/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed when prebuild drops required guards or generators', () => {
  const dir = writeFixtureProject(STRONG_CI_WORKFLOW, {
    prebuild: 'node scripts/guard-content.mjs && node scripts/fetch-github-stats.mjs && node scripts/generate-og-news.mjs',
  });

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.match(report.missing_package_script_chain_invariants.join('\n'), /prebuild: .*guard-stale-facts\.mjs/);
    assert.match(report.missing_package_script_chain_invariants.join('\n'), /prebuild: .*audit-guide-picks\.mjs/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed when prebuild writes GitHub stats to tracked data', () => {
  const dir = writeFixtureProject(STRONG_CI_WORKFLOW, {
    prebuild:
      'node scripts/guard-content.mjs && node scripts/guard-stale-facts.mjs && node scripts/audit-guide-picks.mjs && node scripts/fetch-github-stats.mjs && node scripts/generate-og-news.mjs',
  });

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.match(report.missing_package_command_part_invariants.join('\n'), /github-stats\.build\.json/);
    assert.match(report.missing_package_command_part_invariants.join('\n'), /--skip-render-unchanged/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed on package or workflow failure suppression', () => {
  const dir = writeFixtureProject(
    `name: CI
on:
  pull_request:
  push:
    branches:
      - master
  workflow_dispatch:
permissions:
  contents: read
concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v5
        with:
          fetch-depth: 0
          persist-credentials: false
      - uses: actions/setup-node@v5
        with:
          node-version: '24'
      - run: npm ci
      - run: npm run check:quick
        continue-on-error: true
      - run: npm run check
      - run: npm run build:fast
`,
    {
      'ship:check': 'npm run check:quick && npm run check || true && npm run build:fast',
    },
  );

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.match(report.failure_suppression_issues.map((issue) => `${issue.path}: ${issue.detail}`).join('\n'), /package\.json#scripts\.ship:check/);
    assert.match(report.failure_suppression_issues.map((issue) => `${issue.path}: ${issue.detail}`).join('\n'), /ci\.yml/);
    assert.ok(report.failure_suppression_issues.some((issue) => issue.code === 'shell-or-true'));
    assert.ok(report.failure_suppression_issues.some((issue) => issue.code === 'workflow-continue-on-error'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed on Cloudflare-era hosting commands', () => {
  const dir = writeFixtureProject(
    `name: CI
on:
  pull_request:
  push:
    branches:
      - master
  workflow_dispatch:
permissions:
  contents: read
concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v5
        with:
          fetch-depth: 0
          persist-credentials: false
      - uses: actions/setup-node@v5
        with:
          node-version: '24'
      - run: npm ci
      - run: npm run check:quick
      - run: npm run check
      - run: npm run build:fast
      - run: npx wrangler pages deploy dist
`,
    {
      deploy: 'npx cloudflare pages deploy dist',
    },
  );

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.match(report.hosting_command_issues.map((issue) => `${issue.path}: ${issue.detail}`).join('\n'), /package\.json#scripts\.deploy/);
    assert.match(report.hosting_command_issues.map((issue) => `${issue.path}: ${issue.detail}`).join('\n'), /ci\.yml/);
    assert.ok(report.hosting_command_issues.some((issue) => issue.code === 'hosting-wrangler-command'));
    assert.ok(report.hosting_command_issues.some((issue) => issue.code === 'hosting-cloudflare-command'));
    assert.ok(report.hosting_command_issues.some((issue) => issue.code === 'hosting-cloudflare-pages-command'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed when Vercel operator commands drift', () => {
  const dir = writeFixtureProject(STRONG_CI_WORKFLOW, {
    deploy: 'npx vercel deploy --prod',
    'vercel:env:pull': 'npx vercel env pull',
  });

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.match(
      report.missing_exact_npm_script_command_invariants.join('\n'),
      /deploy: expected exact command npx vercel build --prod && npx vercel deploy --prebuilt --prod/,
    );
    assert.match(
      report.missing_exact_npm_script_command_invariants.join('\n'),
      /vercel:env:pull: expected exact command npx vercel env pull \.env\.local --yes/,
    );
    assert.deepEqual(report.hosting_command_issues, []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('command surface audit fails closed when quick asset gate becomes unbounded', () => {
  const dir = writeFixtureProject(STRONG_CI_WORKFLOW, {
    'check:assets:quick':
      'node scripts/prep-favicons.mjs --check && node scripts/generate-og-svgs.mjs --check && node scripts/generate-og-news.mjs --check && node scripts/optimize-og-images.mjs --check && node scripts/generate-logo-manifest.mjs --check',
  });

  try {
    const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json', '--project-dir', dir], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.match(report.missing_quick_asset_command_invariants.join('\n'), /check:assets:quick: expected bounded command parts/);
    assert.match(report.missing_quick_asset_command_invariants.join('\n'), /--limit 5/);
    assert.match(report.missing_quick_asset_command_invariants.join('\n'), /--limit 2/);
    assert.match(report.missing_quick_asset_command_invariants.join('\n'), /--limit 20/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
