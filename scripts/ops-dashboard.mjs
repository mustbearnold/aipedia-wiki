#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const DEFAULT_PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const PR_JSON_FIELDS = 'number,title,headRefName,isDraft,reviewDecision,updatedAt,url';
const ISSUE_JSON_FIELDS = 'number,title,labels,updatedAt,url';

export const DEFAULT_AUDIT_COMMANDS = [
  { name: 'audit:commands', command: 'node', args: ['scripts/audit-command-surface.mjs', '--json'] },
  { name: 'audit:kpis', command: 'node', args: ['scripts/audit-site-kpis.mjs', '--json'] },
  { name: 'audit:freshness', command: 'node', args: ['scripts/audit-freshness-queue.mjs', '--json'] },
];

const KNOWN_FLAGS = new Set([
  '--json',
  '--skip-gh',
  '--include-audits',
  '--audit-output',
  '--project-dir',
  '--root',
  '--help',
  '-h',
]);
const VALUE_FLAGS = new Set(['--audit-output', '--project-dir', '--root']);

function trimFirstLine(value) {
  return String(value ?? '').split(/\r?\n/).find((line) => line.trim())?.trim() ?? '';
}

function normalizePath(value) {
  return String(value ?? '').replace(/\\/g, '/');
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function inlineValue(arg, flag) {
  return arg.startsWith(`${flag}=`) ? arg.slice(flag.length + 1) : undefined;
}

function valueFor(argv, index, flag) {
  const inline = inlineValue(argv[index], flag);
  if (inline !== undefined) return inline;
  return argv[index + 1];
}

function parseAuditOutputSpec(value) {
  const equalsIndex = String(value ?? '').indexOf('=');
  if (equalsIndex <= 0) return null;
  const name = value.slice(0, equalsIndex).trim();
  const path = value.slice(equalsIndex + 1).trim();
  if (!name || !path) return null;
  return { name, path };
}

export function parseArgs(argv = []) {
  const options = {
    json: false,
    skipGh: false,
    includeAudits: false,
    help: false,
    projectDir: '',
    auditOutputs: [],
  };
  const issues = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith('-')) {
      const previous = argv[index - 1] ?? '';
      if (!VALUE_FLAGS.has(flagName(previous))) {
        issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      }
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) {
      issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
      continue;
    }

    if (name === '--json') options.json = true;
    else if (name === '--skip-gh') options.skipGh = true;
    else if (name === '--include-audits') options.includeAudits = true;
    else if (name === '--help' || name === '-h') options.help = true;
    else if (name === '--project-dir' || name === '--root') {
      const value = valueFor(argv, index, name);
      if (!value || value.startsWith('-')) {
        issues.push({ code: 'argument-invalid', detail: `${name} requires a path` });
      } else {
        options.projectDir = value;
      }
    } else if (name === '--audit-output') {
      const value = valueFor(argv, index, name);
      const spec = parseAuditOutputSpec(value);
      if (!spec) {
        issues.push({ code: 'argument-invalid', detail: '--audit-output requires name=path' });
      } else {
        options.auditOutputs.push(spec);
      }
    }
  }

  const hasProjectDir = argv.some((arg) => arg === '--project-dir' || arg.startsWith('--project-dir='));
  const hasRoot = argv.some((arg) => arg === '--root' || arg.startsWith('--root='));
  if (hasProjectDir && hasRoot) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  return { options, issues };
}

export function parseGitStatusPorcelain(output = '') {
  const status = {
    clean: true,
    branch: '',
    upstream: '',
    ahead: 0,
    behind: 0,
    entries: [],
    changed_count: 0,
  };

  for (const rawLine of String(output ?? '').split(/\r?\n/)) {
    if (!rawLine) continue;
    if (rawLine.startsWith('## ')) {
      const header = rawLine.slice(3).trim();
      const counts = header.match(/\[(.*?)\]$/)?.[1] ?? '';
      status.ahead = Number.parseInt(counts.match(/ahead\s+(\d+)/)?.[1] ?? '0', 10);
      status.behind = Number.parseInt(counts.match(/behind\s+(\d+)/)?.[1] ?? '0', 10);

      const branchPart = header.replace(/\s+\[.*?\]$/, '');
      const [branch, upstream] = branchPart.split('...', 2);
      status.branch = branch?.replace(/^No commits yet on\s+/, '').trim() ?? '';
      status.upstream = upstream?.trim() ?? '';
      continue;
    }

    const code = rawLine.slice(0, 2);
    const path = normalizePath(rawLine.slice(3).trim());
    status.entries.push({ code, path, raw: rawLine });
  }

  status.changed_count = status.entries.length;
  status.clean = status.changed_count === 0;
  return status;
}

export function parseGitWorktreeListPorcelain(output = '') {
  const worktrees = [];
  let current = null;

  function pushCurrent() {
    if (!current) return;
    if (!current.branch) current.branch = current.detached ? '(detached)' : '(unknown)';
    worktrees.push(current);
    current = null;
  }

  for (const rawLine of String(output ?? '').split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    if (!line) {
      pushCurrent();
      continue;
    }
    if (line.startsWith('worktree ')) {
      pushCurrent();
      current = {
        path: normalizePath(line.slice('worktree '.length).trim()),
        head: '',
        branch: '',
        detached: false,
        bare: false,
      };
      continue;
    }
    if (!current) continue;

    if (line.startsWith('HEAD ')) current.head = line.slice('HEAD '.length).trim();
    else if (line.startsWith('branch ')) {
      current.branch = line.slice('branch '.length).trim().replace(/^refs\/heads\//, '');
    } else if (line === 'detached') {
      current.detached = true;
      if (!current.branch) current.branch = '(detached)';
    } else if (line === 'bare') {
      current.bare = true;
    }
  }

  pushCurrent();
  return worktrees;
}

function parseJson(text) {
  const trimmed = String(text ?? '').trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed);
  } catch {
    const objectStart = trimmed.indexOf('{');
    const objectEnd = trimmed.lastIndexOf('}');
    if (objectStart >= 0 && objectEnd > objectStart) {
      try {
        return JSON.parse(trimmed.slice(objectStart, objectEnd + 1));
      } catch {
        return null;
      }
    }
    const arrayStart = trimmed.indexOf('[');
    const arrayEnd = trimmed.lastIndexOf(']');
    if (arrayStart >= 0 && arrayEnd > arrayStart) {
      try {
        return JSON.parse(trimmed.slice(arrayStart, arrayEnd + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

function isProblemMetric(key) {
  if (/due_soon/i.test(key)) return false;
  return /due_now|missing|invalid|duplicate|unknown|stale|violation|failure|failed|error|dead|thin|broken|orphan|drift|mismatch/i.test(key);
}

function countProblemTotals(totals = {}) {
  let count = 0;
  for (const [key, value] of Object.entries(totals || {})) {
    if (!isProblemMetric(key)) continue;
    if (typeof value === 'number' && Number.isFinite(value) && value > 0) count += value;
    else if (Array.isArray(value)) count += value.length;
  }
  return count;
}

function countProblemArrays(report = {}) {
  let count = 0;
  for (const [key, value] of Object.entries(report || {})) {
    if (!Array.isArray(value) || !isProblemMetric(key)) continue;
    if (/required|documented|referenced|optional|forbidden/i.test(key)) continue;
    count += value.length;
  }
  return count;
}

function metricHighlights(totals = {}) {
  return Object.entries(totals || {})
    .filter(([, value]) => typeof value === 'number' || Array.isArray(value))
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.length : value}`);
}

export function parseAuditOutput(name, output = '', result = {}) {
  const text = String(output ?? '').trim();
  const parsed = parseJson(text);
  const statusKnown = typeof result.status === 'number';

  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    const totals = parsed.totals && typeof parsed.totals === 'object' ? parsed.totals : {};
    const issueCount = Object.keys(totals).length > 0 ? countProblemTotals(totals) : countProblemArrays(parsed);
    const reportOk = typeof parsed.ok === 'boolean' ? parsed.ok : statusKnown ? result.status === 0 : true;
    const ok = reportOk && issueCount === 0;
    return {
      name,
      ok,
      status: statusKnown ? result.status : null,
      format: 'json',
      issue_count: issueCount,
      totals,
      highlights: metricHighlights(totals),
      summary: ok ? `${name} passed` : `${name} needs attention`,
      report: parsed,
    };
  }

  const firstLine = trimFirstLine(text);
  const failedByText = /\b(fail(?:ed|ure)?|error|drift detected|missing|invalid|violations?|✖|x )\b/i.test(text);
  const passedByText = /✓|\b(pass(?:ed)?|ok|resolve(?:d|s)?|clean)\b/i.test(text);
  const ok = statusKnown ? result.status === 0 && !failedByText : passedByText && !failedByText;

  return {
    name,
    ok,
    status: statusKnown ? result.status : null,
    format: 'human',
    issue_count: ok ? 0 : failedByText || (statusKnown && result.status !== 0) ? 1 : 0,
    totals: {},
    highlights: [],
    summary: firstLine || (ok ? `${name} passed` : `${name} produced no output`),
    raw_excerpt: text.slice(0, 2000),
  };
}

function spawnCommand(command, args = [], options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });

  return {
    status: typeof result.status === 'number' ? result.status : result.error ? 127 : 0,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    error: result.error,
  };
}

function commandError(result, fallback) {
  const message = result?.error?.message || result?.stderr || fallback;
  return message.trim ? message.trim() : String(message);
}

function runRequired(runCommand, command, args, projectDir, errors, label) {
  const result = runCommand(command, args, { cwd: projectDir });
  if (result.status !== 0 || result.error) {
    errors.push({ scope: 'git', command: [command, ...args].join(' '), detail: commandError(result, `${label} failed`) });
  }
  return result;
}

function collectGit(projectDir, runCommand) {
  const errors = [];
  const rootResult = runRequired(runCommand, 'git', ['rev-parse', '--show-toplevel'], projectDir, errors, 'git root');
  const branchResult = runRequired(runCommand, 'git', ['rev-parse', '--abbrev-ref', 'HEAD'], projectDir, errors, 'git branch');
  const commitResult = runRequired(runCommand, 'git', ['rev-parse', '--short', 'HEAD'], projectDir, errors, 'git commit');
  const statusResult = runRequired(runCommand, 'git', ['status', '--porcelain=v1', '-b'], projectDir, errors, 'git status');
  const worktreeResult = runRequired(runCommand, 'git', ['worktree', 'list', '--porcelain'], projectDir, errors, 'git worktree list');

  const status = parseGitStatusPorcelain(statusResult.stdout);
  const worktrees = parseGitWorktreeListPorcelain(worktreeResult.stdout).map((worktree) => {
    const dirtyResult = runCommand('git', ['-C', worktree.path, 'status', '--porcelain=v1'], { cwd: projectDir });
    const dirtyStatus = parseGitStatusPorcelain(dirtyResult.stdout);
    const dirtyError = dirtyResult.status !== 0 || dirtyResult.error;
    if (dirtyError) {
      errors.push({
        scope: 'git',
        command: ['git', '-C', worktree.path, 'status', '--porcelain=v1'].join(' '),
        detail: commandError(dirtyResult, `git status failed for ${worktree.path}`),
      });
    }
    return {
      ...worktree,
      dirty: dirtyError ? null : !dirtyStatus.clean,
      changed_count: dirtyError ? null : dirtyStatus.changed_count,
    };
  });

  return {
    ok: errors.length === 0,
    root: normalizePath(trimFirstLine(rootResult.stdout) || projectDir),
    branch: trimFirstLine(branchResult.stdout) || status.branch,
    commit: trimFirstLine(commitResult.stdout),
    status,
    worktrees,
    dirty_worktrees: worktrees.filter((worktree) => worktree.dirty === true),
    errors,
  };
}

function ghUnavailable(result) {
  const detail = commandError(result, 'not found');
  return {
    available: false,
    skipped: false,
    reason: `gh unavailable: ${detail}`,
    open_prs: [],
    open_issues: [],
    errors: [],
  };
}

function normalizePullRequest(pr) {
  return {
    number: Number(pr.number),
    title: String(pr.title ?? ''),
    headRefName: String(pr.headRefName ?? pr.head_ref_name ?? ''),
    isDraft: Boolean(pr.isDraft),
    reviewDecision: pr.reviewDecision ?? '',
    updatedAt: pr.updatedAt ?? '',
    url: pr.url ?? '',
  };
}

function normalizeIssue(issue) {
  return {
    number: Number(issue.number),
    title: String(issue.title ?? ''),
    labels: Array.isArray(issue.labels)
      ? issue.labels.map((label) => (typeof label === 'string' ? label : label?.name)).filter(Boolean)
      : [],
    updatedAt: issue.updatedAt ?? '',
    url: issue.url ?? '',
  };
}

function collectGithub(projectDir, runCommand, options = {}) {
  if (options.skipGh) {
    return {
      available: false,
      skipped: true,
      reason: 'skipped by --skip-gh',
      open_prs: [],
      open_issues: [],
      errors: [],
    };
  }

  const versionResult = runCommand('gh', ['--version'], { cwd: projectDir });
  if (versionResult.status !== 0 || versionResult.error) return ghUnavailable(versionResult);

  const errors = [];
  const prResult = runCommand('gh', ['pr', 'list', '--state', 'open', '--json', PR_JSON_FIELDS], { cwd: projectDir });
  const issueResult = runCommand('gh', ['issue', 'list', '--state', 'open', '--json', ISSUE_JSON_FIELDS], { cwd: projectDir });

  let openPrs = [];
  if (prResult.status === 0 && !prResult.error) {
    const parsed = parseJson(prResult.stdout);
    openPrs = Array.isArray(parsed) ? parsed.map(normalizePullRequest) : [];
    if (!Array.isArray(parsed)) errors.push({ scope: 'github', command: 'gh pr list', detail: 'could not parse JSON output' });
  } else {
    errors.push({ scope: 'github', command: 'gh pr list', detail: commandError(prResult, 'gh pr list failed') });
  }

  let openIssues = [];
  if (issueResult.status === 0 && !issueResult.error) {
    const parsed = parseJson(issueResult.stdout);
    openIssues = Array.isArray(parsed) ? parsed.map(normalizeIssue) : [];
    if (!Array.isArray(parsed)) errors.push({ scope: 'github', command: 'gh issue list', detail: 'could not parse JSON output' });
  } else {
    errors.push({ scope: 'github', command: 'gh issue list', detail: commandError(issueResult, 'gh issue list failed') });
  }

  return {
    available: true,
    skipped: false,
    reason: '',
    version: trimFirstLine(versionResult.stdout),
    open_prs: openPrs,
    open_issues: openIssues,
    errors,
  };
}

function auditOutputText(result) {
  if (result.stdout?.trim()) return result.stdout;
  return [result.stdout, result.stderr].filter(Boolean).join('\n');
}

function readAuditOutput(path, projectDir, readText) {
  const resolvedPath = isAbsolute(path) ? path : resolve(projectDir, path);
  return readText(resolvedPath);
}

function collectAudits(projectDir, options, runCommand, readText, errors) {
  const audits = [];

  if (options.includeAudits) {
    for (const audit of DEFAULT_AUDIT_COMMANDS) {
      const result = runCommand(audit.command, audit.args, { cwd: projectDir });
      audits.push(parseAuditOutput(audit.name, auditOutputText(result), result));
    }
  }

  for (const spec of options.auditOutputs || []) {
    try {
      const output = readAuditOutput(spec.path, projectDir, readText);
      audits.push(parseAuditOutput(spec.name, output, { status: 0 }));
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      errors.push({ scope: 'audit-output', command: spec.name, detail });
      audits.push({
        name: spec.name,
        ok: false,
        status: null,
        format: 'missing',
        issue_count: 1,
        totals: {},
        highlights: [],
        summary: `could not read ${spec.path}: ${detail}`,
      });
    }
  }

  return audits;
}

export function buildDashboard({
  projectDir = DEFAULT_PROJECT_DIR,
  options = {},
  runCommand = spawnCommand,
  readText = (path) => readFileSync(path, 'utf8'),
  now = new Date(),
} = {}) {
  const resolvedProjectDir = resolve(projectDir || DEFAULT_PROJECT_DIR);
  const normalizedOptions = { skipGh: false, includeAudits: false, auditOutputs: [], ...options };
  const errors = [];

  const git = collectGit(resolvedProjectDir, runCommand);
  const github = collectGithub(resolvedProjectDir, runCommand, normalizedOptions);
  const audits = collectAudits(resolvedProjectDir, normalizedOptions, runCommand, readText, errors);
  errors.push(...git.errors, ...(github.errors || []));

  return {
    ok: errors.length === 0 && audits.every((audit) => audit.ok !== false),
    generated_at: now.toISOString(),
    project_dir: resolvedProjectDir,
    git,
    github,
    audits,
    errors,
  };
}

function plural(count, singular, pluralForm = `${singular}s`) {
  return `${count} ${count === 1 ? singular : pluralForm}`;
}

export function renderDashboard(report, options = {}) {
  if (options.json) return `${JSON.stringify(report, null, 2)}\n`;

  const lines = [];
  lines.push('Ops dashboard');
  lines.push(`Generated: ${report.generated_at}`);
  lines.push(`Project: ${report.project_dir}`);
  lines.push(`Status: ${report.ok ? 'OK' : 'attention needed'}`);
  lines.push('');

  const git = report.git || {};
  const status = git.status || { changed_count: 0, ahead: 0, behind: 0, clean: true };
  lines.push(`Git: ${git.branch || status.branch || '(unknown)'} @ ${git.commit || '(unknown)'}`);
  lines.push(`Working tree: ${status.changed_count ?? 0} changed file(s), ahead ${status.ahead ?? 0}, behind ${status.behind ?? 0}`);
  lines.push(`Worktrees: ${git.worktrees?.length ?? 0} total, ${git.dirty_worktrees?.length ?? 0} dirty`);
  for (const worktree of git.dirty_worktrees || []) {
    lines.push(`  - ${worktree.branch}: ${worktree.path} (${plural(worktree.changed_count ?? 0, 'change')})`);
  }
  lines.push('');

  const github = report.github || {};
  if (github.available) {
    lines.push(`GitHub: ${plural(github.open_prs?.length ?? 0, 'open PR')} / ${plural(github.open_issues?.length ?? 0, 'open issue')}`);
    for (const pr of (github.open_prs || []).slice(0, 5)) {
      const draft = pr.isDraft ? ' draft' : '';
      lines.push(`  PR #${pr.number}${draft}: ${pr.title}`);
    }
    for (const issue of (github.open_issues || []).slice(0, 5)) {
      const labels = issue.labels?.length ? ` [${issue.labels.join(', ')}]` : '';
      lines.push(`  Issue #${issue.number}: ${issue.title}${labels}`);
    }
  } else {
    lines.push(`GitHub: ${github.reason || (github.skipped ? 'skipped' : 'unavailable')}`);
  }
  lines.push('');

  if (report.audits?.length) {
    const passed = report.audits.filter((audit) => audit.ok).length;
    const failed = report.audits.filter((audit) => audit.ok === false).length;
    lines.push(`Audits: ${passed} passed, ${failed} need attention`);
    for (const audit of report.audits) {
      const marker = audit.ok ? '✓' : '!';
      const highlights = audit.highlights?.length ? ` (${audit.highlights.slice(0, 4).join(', ')})` : '';
      lines.push(`  ${marker} ${audit.name}: ${audit.summary}${highlights}`);
    }
  } else {
    lines.push('Audits: not run (use --include-audits or --audit-output name=path).');
  }

  if (report.errors?.length) {
    lines.push('');
    lines.push('Collection errors:');
    for (const error of report.errors) lines.push(`  - ${error.scope}: ${error.detail}`);
  }

  return `${lines.join('\n')}\n`;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/ops-dashboard.mjs [--json] [--skip-gh] [--include-audits]',
    '  node scripts/ops-dashboard.mjs --audit-output audit:freshness=tmp/freshness.out',
    '',
    'Options:',
    '  --json                 Emit a structured JSON dashboard.',
    '  --skip-gh              Do not probe GitHub CLI for PRs/issues.',
    '  --include-audits       Run known read-only audit reports and parse their output.',
    '  --audit-output n=path  Parse a saved audit command output.',
    '  --project-dir <dir>    Collect dashboard data for another checkout.',
    '  --root <dir>           Alias for --project-dir.',
  ].join('\n');
}

function main() {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed.options.help) {
    console.log(usage());
    process.exit(0);
  }

  if (parsed.issues.length) {
    const report = { ok: false, argument_issues: parsed.issues };
    if (parsed.options.json) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    else {
      console.error('ops-dashboard argument issues:');
      for (const issue of parsed.issues) console.error(`- ${issue.detail}`);
    }
    process.exit(1);
  }

  const projectDir = parsed.options.projectDir || DEFAULT_PROJECT_DIR;
  const report = buildDashboard({ projectDir, options: parsed.options });
  process.stdout.write(renderDashboard(report, { json: parsed.options.json }));
  process.exit(report.ok ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
