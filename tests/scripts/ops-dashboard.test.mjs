import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildDashboard,
  parseArgs,
  parseAuditOutput,
  parseGitStatusPorcelain,
  parseGitWorktreeListPorcelain,
  renderDashboard,
} from '../../scripts/ops-dashboard.mjs';

function makeRunner(responses) {
  const calls = [];
  const responseMap = new Map(Object.entries(responses));

  function run(command, args = [], options = {}) {
    const key = [command, ...args].join(' ');
    calls.push({ command, args, cwd: options.cwd });
    const response = responseMap.get(key);
    if (!response) {
      return { status: 1, stdout: '', stderr: `missing fake response for ${key}` };
    }
    if (response instanceof Error) return { status: 127, stdout: '', stderr: response.message, error: response };
    return { status: response.status ?? 0, stdout: response.stdout ?? '', stderr: response.stderr ?? '' };
  }

  return { run, calls };
}

test('parseArgs keeps the dashboard cheap by default and validates known flags', () => {
  const parsed = parseArgs(['--json', '--skip-gh', '--project-dir', '/repo', '--audit-output', 'audit:freshness=tmp/freshness.out']);

  assert.equal(parsed.options.json, true);
  assert.equal(parsed.options.skipGh, true);
  assert.equal(parsed.options.includeAudits, false);
  assert.equal(parsed.options.projectDir, '/repo');
  assert.deepEqual(parsed.options.auditOutputs, [{ name: 'audit:freshness', path: 'tmp/freshness.out' }]);
  assert.deepEqual(parsed.issues, []);

  const invalid = parseArgs(['--include-audits', '--wat']);
  assert.equal(invalid.options.includeAudits, true);
  assert.deepEqual(invalid.issues, [{ code: 'argument-invalid', detail: 'unknown flag --wat' }]);
});

test('parseGitStatusPorcelain summarizes branch, ahead/behind, and dirty paths', () => {
  const status = parseGitStatusPorcelain([
    '## codex/ops-efficiency-dashboard...origin/master [ahead 2, behind 1]',
    ' M scripts/ops-dashboard.mjs',
    'A  tests/scripts/ops-dashboard.test.mjs',
    '?? scratch.md',
  ].join('\n'));

  assert.equal(status.clean, false);
  assert.equal(status.branch, 'codex/ops-efficiency-dashboard');
  assert.equal(status.upstream, 'origin/master');
  assert.equal(status.ahead, 2);
  assert.equal(status.behind, 1);
  assert.equal(status.changed_count, 3);
  assert.deepEqual(status.entries.map((entry) => entry.path), [
    'scripts/ops-dashboard.mjs',
    'tests/scripts/ops-dashboard.test.mjs',
    'scratch.md',
  ]);
  assert.deepEqual(status.entries.map((entry) => entry.code), [' M', 'A ', '??']);
});

test('parseGitWorktreeListPorcelain returns stable worktree records', () => {
  const worktrees = parseGitWorktreeListPorcelain([
    'worktree /repo',
    'HEAD abc111',
    'branch refs/heads/main',
    '',
    'worktree /repo/.worktrees/ops-efficiency',
    'HEAD def222',
    'branch refs/heads/codex/ops-efficiency-dashboard',
    '',
    'worktree /repo/.worktrees/detached',
    'HEAD fed999',
    'detached',
  ].join('\n'));

  assert.deepEqual(worktrees, [
    { path: '/repo', head: 'abc111', branch: 'main', detached: false, bare: false },
    {
      path: '/repo/.worktrees/ops-efficiency',
      head: 'def222',
      branch: 'codex/ops-efficiency-dashboard',
      detached: false,
      bare: false,
    },
    { path: '/repo/.worktrees/detached', head: 'fed999', branch: '(detached)', detached: true, bare: false },
  ]);
});

test('buildDashboard collects git facts and dirty worktrees without requiring gh', () => {
  const ghError = new Error('gh not found');
  ghError.code = 'ENOENT';
  const runner = makeRunner({
    'git rev-parse --show-toplevel': { stdout: '/repo\n' },
    'git rev-parse --abbrev-ref HEAD': { stdout: 'codex/ops-efficiency-dashboard\n' },
    'git rev-parse --short HEAD': { stdout: 'abc123\n' },
    'git status --porcelain=v1 -b': {
      stdout: '## codex/ops-efficiency-dashboard...origin/master\n M scripts/ops-dashboard.mjs\n',
    },
    'git worktree list --porcelain': {
      stdout: 'worktree /repo\nHEAD abc123\nbranch refs/heads/master\n\nworktree /repo/.worktrees/ops-efficiency\nHEAD abc123\nbranch refs/heads/codex/ops-efficiency-dashboard\n',
    },
    'git -C /repo status --porcelain=v1': { stdout: '' },
    'git -C /repo/.worktrees/ops-efficiency status --porcelain=v1': { stdout: ' M scripts/ops-dashboard.mjs\n' },
    'gh --version': ghError,
  });

  const report = buildDashboard({ projectDir: '/repo', runCommand: runner.run });

  assert.equal(report.ok, true);
  assert.equal(report.git.branch, 'codex/ops-efficiency-dashboard');
  assert.equal(report.git.commit, 'abc123');
  assert.equal(report.git.status.changed_count, 1);
  assert.deepEqual(report.git.dirty_worktrees.map((worktree) => worktree.path), ['/repo/.worktrees/ops-efficiency']);
  assert.equal(report.github.available, false);
  assert.equal(report.github.skipped, false);
  assert.match(report.github.reason, /gh unavailable/);
  assert.equal(report.github.open_prs.length, 0);
  assert.equal(report.github.open_issues.length, 0);
  assert.deepEqual(
    runner.calls.map((call) => [call.command, ...call.args].join(' ')),
    [
      'git rev-parse --show-toplevel',
      'git rev-parse --abbrev-ref HEAD',
      'git rev-parse --short HEAD',
      'git status --porcelain=v1 -b',
      'git worktree list --porcelain',
      'git -C /repo status --porcelain=v1',
      'git -C /repo/.worktrees/ops-efficiency status --porcelain=v1',
      'gh --version',
    ],
  );
});

test('buildDashboard collects open PRs and issues through gh when available', () => {
  const runner = makeRunner({
    'git rev-parse --show-toplevel': { stdout: '/repo\n' },
    'git rev-parse --abbrev-ref HEAD': { stdout: 'feature\n' },
    'git rev-parse --short HEAD': { stdout: 'abc123\n' },
    'git status --porcelain=v1 -b': { stdout: '## feature...origin/feature [ahead 1]\n' },
    'git worktree list --porcelain': { stdout: 'worktree /repo\nHEAD abc123\nbranch refs/heads/feature\n' },
    'git -C /repo status --porcelain=v1': { stdout: '' },
    'gh --version': { stdout: 'gh version 2.0.0\n' },
    'gh pr list --state open --json number,title,headRefName,isDraft,reviewDecision,updatedAt,url': {
      stdout: JSON.stringify([
        { number: 42, title: 'Ship ops dashboard', headRefName: 'feature', isDraft: false, reviewDecision: 'REVIEW_REQUIRED', updatedAt: '2026-06-20T00:00:00Z', url: 'https://github.test/pr/42' },
      ]),
    },
    'gh issue list --state open --json number,title,labels,updatedAt,url': {
      stdout: JSON.stringify([
        { number: 7, title: 'Triage audit debt', labels: [{ name: 'ready-for-agent' }], updatedAt: '2026-06-19T00:00:00Z', url: 'https://github.test/issues/7' },
      ]),
    },
  });

  const report = buildDashboard({ projectDir: '/repo', runCommand: runner.run });

  assert.equal(report.github.available, true);
  assert.equal(report.github.open_prs.length, 1);
  assert.equal(report.github.open_prs[0].number, 42);
  assert.equal(report.github.open_prs[0].headRefName, 'feature');
  assert.equal(report.github.open_issues.length, 1);
  assert.deepEqual(report.github.open_issues[0].labels, ['ready-for-agent']);
});

test('buildDashboard honors --skip-gh and does not probe gh', () => {
  const runner = makeRunner({
    'git rev-parse --show-toplevel': { stdout: '/repo\n' },
    'git rev-parse --abbrev-ref HEAD': { stdout: 'feature\n' },
    'git rev-parse --short HEAD': { stdout: 'abc123\n' },
    'git status --porcelain=v1 -b': { stdout: '## feature\n' },
    'git worktree list --porcelain': { stdout: 'worktree /repo\nHEAD abc123\nbranch refs/heads/feature\n' },
    'git -C /repo status --porcelain=v1': { stdout: '' },
  });

  const report = buildDashboard({ projectDir: '/repo', options: { skipGh: true }, runCommand: runner.run });

  assert.equal(report.github.available, false);
  assert.equal(report.github.skipped, true);
  assert.equal(runner.calls.some((call) => call.command === 'gh'), false);
});

test('parseAuditOutput handles known JSON audit reports and human pass/fail output', () => {
  const freshness = parseAuditOutput('audit:freshness', JSON.stringify({
    ok: false,
    totals: { due_now: 2, due_soon: 5, high_volatility_missing_next_review: 1 },
    queues: { due_now: [{ path: 'src/content/tools/a.md' }, { path: 'src/content/tools/b.md' }] },
  }), { status: 1 });

  assert.equal(freshness.name, 'audit:freshness');
  assert.equal(freshness.ok, false);
  assert.equal(freshness.format, 'json');
  assert.equal(freshness.issue_count, 3);
  assert.deepEqual(freshness.totals, { due_now: 2, due_soon: 5, high_volatility_missing_next_review: 1 });

  const commandSurface = parseAuditOutput('audit:commands', '[audit-command-surface] ✓ 12 documented npm scripts and 42 script paths resolve.\n', { status: 0 });
  assert.equal(commandSurface.ok, true);
  assert.equal(commandSurface.format, 'human');

  const failed = parseAuditOutput('audit:commands', '[audit-command-surface] command surface drift detected\nMissing script paths: scripts/missing.mjs\n', { status: 1 });
  assert.equal(failed.ok, false);
  assert.match(failed.summary, /command surface drift detected/);
});

test('parseAuditOutput marks problem totals as attention even when report JSON is ok', () => {
  const freshness = parseAuditOutput('audit:freshness', JSON.stringify({
    ok: true,
    totals: { due_now: 2, due_soon: 5, source_registry_duplicate_ids: 1 },
  }), { status: 0 });

  assert.equal(freshness.issue_count, 3);
  assert.equal(freshness.ok, false);
  assert.equal(freshness.summary, 'audit:freshness needs attention');
});

test('buildDashboard can run optional read-only audits and parse their output', () => {
  const runner = makeRunner({
    'git rev-parse --show-toplevel': { stdout: '/repo\n' },
    'git rev-parse --abbrev-ref HEAD': { stdout: 'feature\n' },
    'git rev-parse --short HEAD': { stdout: 'abc123\n' },
    'git status --porcelain=v1 -b': { stdout: '## feature\n' },
    'git worktree list --porcelain': { stdout: 'worktree /repo\nHEAD abc123\nbranch refs/heads/feature\n' },
    'git -C /repo status --porcelain=v1': { stdout: '' },
    'node scripts/audit-command-surface.mjs --json': { stdout: JSON.stringify({ ok: true, missing_script_paths: [] }) },
    'node scripts/audit-site-kpis.mjs --json': { stdout: JSON.stringify({ ok: true, collections: { tools: { files: 10 } } }) },
    'node scripts/audit-freshness-queue.mjs --json': { stdout: JSON.stringify({ ok: false, totals: { due_now: 1 }, queues: { due_now: ['chatgpt'] } }), status: 1 },
  });

  const report = buildDashboard({ projectDir: '/repo', options: { skipGh: true, includeAudits: true }, runCommand: runner.run });

  assert.deepEqual(report.audits.map((audit) => audit.name), ['audit:commands', 'audit:kpis', 'audit:freshness']);
  assert.deepEqual(report.audits.map((audit) => audit.ok), [true, true, false]);
  assert.equal(report.ok, false);
});

test('renderDashboard emits human and JSON summaries', () => {
  const report = {
    ok: true,
    generated_at: '2026-06-20T00:00:00.000Z',
    project_dir: '/repo',
    git: {
      ok: true,
      branch: 'feature',
      commit: 'abc123',
      status: { clean: false, changed_count: 2, ahead: 1, behind: 0, entries: [] },
      worktrees: [{ path: '/repo', branch: 'feature', dirty: false, changed_count: 0 }],
      dirty_worktrees: [],
    },
    github: { available: false, skipped: false, reason: 'gh unavailable: not found', open_prs: [], open_issues: [], errors: [] },
    audits: [],
    errors: [],
  };

  const human = renderDashboard(report, { json: false });
  assert.match(human, /Ops dashboard/);
  assert.match(human, /Git: feature @ abc123/);
  assert.match(human, /Working tree: 2 changed file\(s\), ahead 1, behind 0/);
  assert.match(human, /GitHub: gh unavailable: not found/);

  const json = JSON.parse(renderDashboard(report, { json: true }));
  assert.equal(json.git.branch, 'feature');
  assert.equal(json.github.available, false);
});
