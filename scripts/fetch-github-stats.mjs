#!/usr/bin/env node
/**
 * Fetch live GitHub repository stats for every tool with a github_url
 * in its frontmatter. Writes src/data/github-stats.json keyed by tool slug.
 *
 * Runs at prebuild (wired in package.json). Graceful on per-repo network/API
 * errors: reuses the previous JSON if a GitHub API call fails, so a rate-limit
 * or outage never breaks the build. Local filesystem/config errors fail closed.
 *
 * Optional env:
 *   GITHUB_TOKEN - bumps rate limit from 60/hr to 5000/hr
 *
 * To run manually:
 *   node scripts/fetch-github-stats.mjs
 *   node scripts/fetch-github-stats.mjs --dry-run --json
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const JSON_MODE = args.includes('--json');
const DRY_RUN = args.includes('--dry-run');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const KNOWN_FLAGS = new Set(['--dry-run', '--json', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--project-dir', '--root']);
const DEFAULT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const ROOT = resolve(projectDirArg || DEFAULT_ROOT);
const TOOLS_DIR = join(ROOT, 'src/content/tools');
const OUTPUT = join(ROOT, 'src/data/github-stats.json');
const argumentIssues = collectArgumentIssues();

function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index >= 0) {
    const next = args[index + 1] ?? '';
    return next && !next.startsWith('-') ? next : '';
  }
  const inlineArg = args.find((arg) => arg.startsWith(`${flag}=`));
  return inlineArg ? inlineArg.slice(flag.length + 1) : '';
}

function collectArgumentIssues() {
  const issues = [];
  const foundValueFlags = new Set();

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const equalsIndex = arg.startsWith('--') ? arg.indexOf('=') : -1;
    const flag = equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;

    if (!arg.startsWith('-')) {
      issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    if (!KNOWN_FLAGS.has(flag)) {
      issues.push({ code: 'argument-invalid', detail: `unknown flag ${flag}` });
      continue;
    }

    if (VALUE_FLAGS.has(flag)) {
      foundValueFlags.add(flag);

      if (equalsIndex >= 0) {
        if (!arg.slice(equalsIndex + 1)) issues.push({ code: 'argument-invalid', detail: `${flag} requires a value` });
        continue;
      }

      const next = args[index + 1];
      if (!next || next.startsWith('-')) {
        issues.push({ code: 'argument-invalid', detail: `${flag} requires a value` });
      } else {
        index += 1;
      }
      continue;
    }

    if (equalsIndex >= 0) issues.push({ code: 'argument-invalid', detail: `${flag} does not accept a value` });
  }

  if (foundValueFlags.has('--project-dir') && foundValueFlags.has('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  return issues;
}

function usage() {
  return [
    'Usage: node scripts/fetch-github-stats.mjs [options]',
    '',
    'Options:',
    '  --dry-run             Discover GitHub stat targets without fetching or writing.',
    '  --json                Emit a structured report.',
    '  --project-dir <dir>   Resolve content and output paths from another project root.',
    '  --root <dir>          Alias for --project-dir.',
    '  --help, -h            Print this help message.',
  ].join('\n');
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  if (report.mode === 'argument-error') {
    console.error('[github-stats] Invalid command arguments:');
    for (const issue of report.argument_issues) console.error(`- ${issue.detail}`);
  } else if (report.mode === 'dry-run') {
    console.log(`[github-stats] dry-run: ${report.targets.length} GitHub repo target(s), no fetches or writes.`);
  }
}

function reportFor({ ok = true, mode = DRY_RUN ? 'dry-run' : 'fetch', targets = [], written = false, fresh = 0, failed = 0, error = null } = {}) {
  return {
    ok,
    mode,
    project_dir: ROOT,
    tools_dir: TOOLS_DIR,
    output_path: OUTPUT,
    targets,
    target_count: targets.length,
    written,
    fresh,
    failed,
    error,
    argument_issues: mode === 'argument-error' ? argumentIssues : [],
  };
}

/** Extract github_url from a tool markdown file's frontmatter. */
async function readToolGithubUrl(file) {
  const content = await readFile(file, 'utf8');
  const match = content.match(/^github_url:\s*['"]?(https:\/\/github\.com\/[^\s'"]+)['"]?\s*$/m);
  if (!match) return null;
  return match[1].replace(/\/$/, '');
}

/** Parse "https://github.com/OWNER/REPO" into [owner, repo]. */
function parseRepo(url) {
  const m = url.match(/github\.com\/([^/]+)\/([^/?#]+)/);
  if (!m) return null;
  return [m[1], m[2].replace(/\.git$/, '')];
}

async function fetchRepo(owner, repo) {
  const headers = {
    accept: 'application/vnd.github+json',
    'user-agent': 'aipedia-wiki-github-stats',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} ${res.statusText} for ${owner}/${repo}`);
  }
  return await res.json();
}

async function main() {
  if (HELP_MODE) {
    console.log(usage());
    return 0;
  }

  if (argumentIssues.length > 0) {
    emitReport(reportFor({ ok: false, mode: 'argument-error' }));
    return 1;
  }

  const files = (await readdir(TOOLS_DIR)).filter((f) => f.endsWith('.md'));
  const stats = {};
  // Preserve previous results so a single-repo API failure doesn't erase
  // everything. We merge fresh results over the old ones.
  let prev = {};
  if (existsSync(OUTPUT)) {
    try { prev = JSON.parse(await readFile(OUTPUT, 'utf8')); } catch { prev = {}; }
  }

  const targets = [];
  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const url = await readToolGithubUrl(join(TOOLS_DIR, file));
    if (!url) continue;
    const parsed = parseRepo(url);
    if (!parsed) continue;
    targets.push({ slug, url, owner: parsed[0], repo: parsed[1] });
  }

  if (DRY_RUN) {
    emitReport(reportFor({ targets }));
    return 0;
  }

  if (!targets.length) {
    console.log('[github-stats] no tools with github_url found');
    await writeFile(OUTPUT, JSON.stringify({}, null, 2));
    return 0;
  }

  console.log(`[github-stats] fetching ${targets.length} repo(s)...`);
  let ok = 0;
  let failed = 0;

  // Sequential fetches to avoid hammering the API and keep rate-limit usage
  // predictable. With 34 targets and 60/hr unauth limit, sequential is fine.
  for (const t of targets) {
    try {
      const repo = await fetchRepo(t.owner, t.repo);
      stats[t.slug] = {
        url: t.url,
        full_name: repo.full_name,
        description: repo.description ?? null,
        stars: repo.stargazers_count ?? 0,
        forks: repo.forks_count ?? 0,
        open_issues: repo.open_issues_count ?? 0,
        watchers: repo.subscribers_count ?? null,
        language: repo.language ?? null,
        license: repo.license?.spdx_id ?? repo.license?.name ?? null,
        pushed_at: repo.pushed_at ?? null,
        updated_at: repo.updated_at ?? null,
        created_at: repo.created_at ?? null,
        default_branch: repo.default_branch ?? 'main',
        archived: repo.archived ?? false,
        topics: repo.topics ?? [],
        fetched_at: new Date().toISOString(),
      };
      ok += 1;
    } catch (err) {
      failed += 1;
      if (prev[t.slug]) {
        stats[t.slug] = { ...prev[t.slug], stale: true };
        console.warn(`[github-stats] ${t.slug}: using stale (${err.message})`);
      } else {
        console.warn(`[github-stats] ${t.slug}: skipped (${err.message})`);
      }
    }
  }

  await writeFile(OUTPUT, JSON.stringify(stats, null, 2));
  console.log(`[github-stats] wrote ${Object.keys(stats).length} entries to ${OUTPUT} (${ok} fresh, ${failed} failed)`);
  return 0;
}

main().catch((err) => {
  const error = { message: err.message, code: err.code ?? null };
  if (JSON_MODE) {
    emitReport(reportFor({ ok: false, mode: 'fatal', error }));
  } else {
    console.error('[github-stats] fatal:', err);
  }
  process.exit(1);
}).then((status) => {
  process.exit(status);
});
