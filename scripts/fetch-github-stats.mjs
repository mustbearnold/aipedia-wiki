#!/usr/bin/env node
/**
 * Fetch live GitHub repository stats for every tool with a github_url
 * in its frontmatter. Writes src/data/github-stats.json keyed by tool slug.
 *
 * Runs at prebuild (wired in package.json). Graceful on network errors:
 * reuses the previous JSON if the GitHub API call fails, so a rate-limit
 * or outage never breaks the build.
 *
 * Optional env:
 *   GITHUB_TOKEN - bumps rate limit from 60/hr to 5000/hr
 *
 * To run manually:
 *   node scripts/fetch-github-stats.mjs
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TOOLS_DIR = join(ROOT, 'src/content/tools');
const OUTPUT = join(ROOT, 'src/data/github-stats.json');

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

  if (!targets.length) {
    console.log('[github-stats] no tools with github_url found');
    await writeFile(OUTPUT, JSON.stringify({}, null, 2));
    return;
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
}

main().catch((err) => {
  console.error('[github-stats] fatal:', err);
  // Don't fail the build - ship with stale or empty stats instead.
  process.exit(0);
});
