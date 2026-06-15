import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { test } from 'node:test';

const FIXTURE_PATHS = [
  'package.json',
  'package-lock.json',
  'astro.config.mjs',
  'vercel.json',
  '.env.example',
  '.gitignore',
  'scripts/neon-migrate.mjs',
  'src/lib/server',
  'src/pages/api',
  'migrations',
];

function writeHostingFixtureProject() {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-hosting-audit-'));

  for (const path of FIXTURE_PATHS) {
    const destination = join(dir, path);
    mkdirSync(dirname(destination), { recursive: true });
    cpSync(path, destination, { recursive: true });
  }

  return dir;
}

test('hosting runtime audit verifies Vercel/Neon deployment surfaces', () => {
  const result = spawnSync(process.execPath, ['scripts/audit-hosting-runtime.mjs', '--json'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(
    result.status,
    0,
    `hosting runtime audit failed unexpectedly\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
  );

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.mode, 'audit');
  assert.equal(report.project_dir, resolve(process.cwd()));
  assert.deepEqual(report.issues, []);
  assert.deepEqual(report.argument_issues, []);
  assert.ok(report.checked.runtime_source_files >= 4);
  assert.ok(report.checked.migration_files >= 2);
  assert.ok(report.checked.package_lock_packages >= 2);
});

test('hosting runtime audit supports fixture project directories', () => {
  const dir = writeHostingFixtureProject();
  mkdirSync(join(dir, 'public'), { recursive: true });
  writeFileSync(join(dir, '.dev.vars'), 'DATABASE_URL=postgres://example\n');
  writeFileSync(join(dir, 'worker-configuration.d.ts'), 'interface Env {}\n');
  writeFileSync(join(dir, 'public', '_headers'), '/*\n  X-Robots-Tag: noindex\n');
  writeFileSync(join(dir, 'public', '_routes.json'), '{"include":["/*"]}\n');
  writeFileSync(join(dir, 'public', '_worker.js'), 'export default { fetch() {} }\n');

  const result = spawnSync(process.execPath, ['scripts/audit-hosting-runtime.mjs', '--json', '--project-dir', dir], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.mode, 'audit');
  assert.equal(report.project_dir, resolve(dir));
  assert.deepEqual(report.argument_issues, []);
  assert.ok(
    report.issues.some((issue) => issue.code === 'cloudflare-hosting-file-present' && issue.path === 'public/_headers'),
    `expected stale _headers issue in fixture report\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
  );
  for (const path of ['.dev.vars', 'worker-configuration.d.ts', 'public/_routes.json', 'public/_worker.js']) {
    assert.ok(
      report.issues.some((issue) => issue.code === 'cloudflare-hosting-file-present' && issue.path === path),
      `expected stale ${path} issue in fixture report\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );
  }
});

test('hosting runtime audit reports structured issues for incomplete project roots', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-empty-hosting-audit-'));
  const result = spawnSync(process.execPath, ['scripts/audit-hosting-runtime.mjs', '--json', '--project-dir', dir], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.equal(result.stderr, '');

  const report = JSON.parse(result.stdout);
  const issueCodes = new Set(report.issues.map((issue) => issue.code));
  assert.equal(report.ok, false);
  assert.equal(report.mode, 'audit');
  assert.equal(report.project_dir, resolve(dir));
  assert.deepEqual(report.argument_issues, []);
  assert.ok(issueCodes.has('vercel-config-missing'));
  assert.ok(issueCodes.has('package-json-missing'));
  assert.ok(issueCodes.has('package-lock-missing'));
  assert.ok(issueCodes.has('astro-config-missing'));
  assert.ok(issueCodes.has('env-template-missing'));
  assert.ok(issueCodes.has('gitignore-missing'));
});

test('hosting runtime audit rejects invalid command arguments before scanning', () => {
  const runAudit = (...auditArgs) => spawnSync(process.execPath, ['scripts/audit-hosting-runtime.mjs', '--json', ...auditArgs], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  const unknown = runAudit('--wat');
  assert.equal(unknown.status, 1);
  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.deepEqual(unknownReport.issues, []);
  assert.equal(unknownReport.checked.runtime_source_files, 0);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runAudit('--project-dir');
  assert.equal(missing.status, 1);
  const missingReport = JSON.parse(missing.stdout);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a value/.test(issue.detail)));

  const stray = runAudit('hosting');
  assert.equal(stray.status, 1);
  const strayReport = JSON.parse(stray.stdout);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument hosting/.test(issue.detail)));

  const conflicting = runAudit('--project-dir', process.cwd(), '--root', process.cwd());
  assert.equal(conflicting.status, 1);
  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('hosting runtime audit prints help', () => {
  const result = spawnSync(process.execPath, ['scripts/audit-hosting-runtime.mjs', '--help'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage: node scripts\/audit-hosting-runtime\.mjs/);
  assert.match(result.stdout, /--project-dir <dir>/);
  assert.equal(result.stderr, '');
});

test('vercel CSP no longer allows Cloudflare challenge origins', () => {
  const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
  const allHeaderValues = (config.headers ?? [])
    .flatMap((rule) => rule.headers ?? [])
    .map((header) => String(header.value ?? ''))
    .join('\n');

  assert.doesNotMatch(allHeaderValues, /challenges\.cloudflare\.com/i);
  assert.doesNotMatch(allHeaderValues, /turnstile/i);
  assert.match(allHeaderValues, /vitals\.vercel-insights\.com/);
});

test('vercel project config keeps the full production build path', () => {
  const config = JSON.parse(readFileSync('vercel.json', 'utf8'));

  assert.equal(config.framework, 'astro');
  assert.equal(config.installCommand, 'npm install');
  assert.equal(config.buildCommand, 'AIPEDIA_LEDGER_IGNORE_DIRTY=1 npm run build');
});

test('astro keeps Vercel adapter active for prerender=false API routes', () => {
  const config = readFileSync('astro.config.mjs', 'utf8');

  assert.match(config, /output:\s*'static'/);
  assert.match(config, /isDev\s*\?\s*\{\}\s*:\s*\{\s*adapter:\s*vercel\(\)\s*\}/);
  assert.doesNotMatch(config, /output:\s*isFastBuild/);
  assert.doesNotMatch(config, /isDev\s*\|\|\s*isFastBuild/);
});

test('vercel API and admin routes stay noindexed and uncached', () => {
  const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
  const headerValue = (rule, key) =>
    String((rule.headers ?? []).find((header) => String(header.key).toLowerCase() === key.toLowerCase())?.value ?? '');
  const apiRule = (config.headers ?? []).find((rule) => rule.source === '/api/(.*)');
  const adminRule = (config.headers ?? []).find((rule) => rule.source === '/admin/(.*)');

  assert.ok(apiRule);
  assert.match(headerValue(apiRule, 'X-Robots-Tag'), /noindex/i);
  assert.match(headerValue(apiRule, 'Cache-Control'), /no-store/i);

  assert.ok(adminRule);
  assert.match(headerValue(adminRule, 'X-Robots-Tag'), /noindex/i);
  assert.match(headerValue(adminRule, 'X-Robots-Tag'), /nofollow/i);
  assert.match(headerValue(adminRule, 'Cache-Control'), /private/i);
  assert.match(headerValue(adminRule, 'Cache-Control'), /no-store/i);
});

test('review clients use canonical trailing-slash API routes', () => {
  const reviewBlock = readFileSync('src/components/ReviewsBlock.astro', 'utf8');
  const adminPage = readFileSync('src/pages/admin/reviews.astro', 'utf8');

  assert.match(reviewBlock, /fetch\('\/api\/reviews\/for\/'\s*\+\s*encodeURIComponent\(slug\)\s*\+\s*'\/'\)/);
  assert.match(reviewBlock, /fetch\('\/api\/reviews\/submit\/'/);
  assert.doesNotMatch(reviewBlock, /fetch\('\/api\/reviews\/submit',/);

  assert.match(adminPage, /fetch\('\/api\/reviews\/admin\/list\/\?status=/);
  assert.match(adminPage, /fetch\('\/api\/reviews\/admin\/moderate\/'/);
  assert.doesNotMatch(adminPage, /fetch\('\/api\/reviews\/admin\/moderate',/);
});

test('API write routes require a centralized IP hash secret', () => {
  const runtime = readFileSync('src/lib/server/runtime.ts', 'utf8');
  const subscribeRoute = readFileSync('src/pages/api/subscribe.ts', 'utf8');
  const reviewRoute = readFileSync('src/pages/api/reviews/submit.ts', 'utf8');

  assert.match(runtime, /function getIpHashSecret/);
  for (const source of [subscribeRoute, reviewRoute]) {
    assert.match(source, /getIpHashSecret/);
    assert.doesNotMatch(source, /readEnv\(['"]IP_HASH_SECRET['"]\)/);
    assert.doesNotMatch(source, /sha256\(`\$\{ip\}\|\$\{readEnv/);
  }
});

test('shared JSON helper defaults API responses to no-store JSON', () => {
  const runtime = readFileSync('src/lib/server/runtime.ts', 'utf8');
  const jsonHelper = runtime.match(/export function json[\s\S]*?export async function sha256/)?.[0] ?? '';

  assert.match(jsonHelper, /new Headers\(headers\)/);
  assert.match(jsonHelper, /content-type/);
  assert.match(jsonHelper, /application\/json/);
  assert.match(jsonHelper, /cache-control/);
  assert.match(jsonHelper, /no-store/);
});

test('runtime database helper accepts Vercel and Neon database env fallbacks', () => {
  const runtime = readFileSync('src/lib/server/runtime.ts', 'utf8');

  for (const key of ['DATABASE_URL', 'POSTGRES_URL', 'POSTGRES_PRISMA_URL', 'POSTGRES_URL_NON_POOLING']) {
    assert.match(runtime, new RegExp(`['"]${key}['"]`));
  }
  assert.match(runtime, /for\s*\(\s*const\s+key\s+of\s+DATABASE_ENV_KEYS\s*\)/);
  assert.match(runtime, /readEnv\(key\)\.trim\(\)/);
  assert.match(runtime, /cachedDatabaseUrl/);
  assert.match(runtime, /cachedSql/);
  assert.match(runtime, /cachedDatabaseUrl\s*===\s*databaseUrl/);
  assert.match(runtime, /neon\(databaseUrl\)/);
});

test('Neon migration runner accepts the same database env fallback contract', () => {
  const migrationRunner = readFileSync('scripts/neon-migrate.mjs', 'utf8');

  for (const key of ['DATABASE_URL', 'POSTGRES_URL', 'POSTGRES_PRISMA_URL', 'POSTGRES_URL_NON_POOLING']) {
    assert.match(migrationRunner, new RegExp(`['"]${key}['"]`));
  }
  assert.match(migrationRunner, /for\s*\(\s*const\s+key\s+of\s+DATABASE_ENV_KEYS\s*\)/);
  assert.match(migrationRunner, /process\.env\[key\]\?\.trim\(\)/);
  assert.match(migrationRunner, /\(process\.env\[key\]\s*\?\?\s*['"]{2}\)\.trim\(\)/);
  assert.match(migrationRunner, /env-file-missing/);
  assert.match(migrationRunner, /!loadEnvFile\(explicitEnvFile\)/);
  assert.match(migrationRunner, /database_env_key/);
  assert.match(migrationRunner, /redactSensitiveText/);
  assert.match(migrationRunner, /\[redacted \$\{key\}\]/);
  assert.match(migrationRunner, /postgres:\/\/\[redacted\]/);
});

test('dynamic API routes opt out of prerendering with Astro literal syntax', () => {
  const routePaths = [
    'src/pages/api/subscribe.ts',
    'src/pages/api/reviews/submit.ts',
    'src/pages/api/reviews/admin/list.ts',
    'src/pages/api/reviews/admin/moderate.ts',
    'src/pages/api/reviews/for/[slug].ts',
  ];

  for (const path of routePaths) {
    const source = readFileSync(path, 'utf8');
    assert.match(source, /export const prerender = false/);
    assert.doesNotMatch(source, /export const prerender = isFastBuild/);
  }
});

test('admin review routes require shared Basic auth protection', () => {
  const runtime = readFileSync('src/lib/server/runtime.ts', 'utf8');
  const listRoute = readFileSync('src/pages/api/reviews/admin/list.ts', 'utf8');
  const moderateRoute = readFileSync('src/pages/api/reviews/admin/moderate.ts', 'utf8');

  assert.match(runtime, /function requireAdmin/);
  assert.match(runtime, /ADMIN_PASSWORD/);
  assert.match(runtime, /if \(!expected\) return false/);
  assert.match(runtime, /function unauthorizedAdminResponse/);
  assert.match(runtime, /www-authenticate/);
  assert.match(runtime, /cache-control['"]?: ['"]no-store/);

  for (const source of [listRoute, moderateRoute]) {
    assert.match(source, /requireAdmin\(request\)/);
    assert.match(source, /unauthorizedAdminResponse\(\)/);
    assert.match(source, /getSql\(\)/);
  }
});

test('public review route exposes only approved reader-safe fields', () => {
  const publicRoute = readFileSync('src/pages/api/reviews/for/[slug].ts', 'utf8');

  assert.match(publicRoute, /bad_slug/);
  assert.match(publicRoute, /\^\[a-z0-9\]\[a-z0-9-\]\{0,63\}\$/);
  assert.equal((publicRoute.match(/approved\s*=\s*1/g) ?? []).length, 2);
  assert.match(publicRoute, /public, max-age=60, s-maxage=300/);
  assert.doesNotMatch(publicRoute, /spam_score|approved_at|author_email_hash|ip_hash|user_agent/);
});

test('review submission keeps reader reviews pending and rate limited', () => {
  const submitRoute = readFileSync('src/pages/api/reviews/submit.ts', 'utf8');

  assert.match(submitRoute, /approved\)\s*VALUES[\s\S]*\$\{spamScore\},\s*0\)/);
  assert.match(submitRoute, /pending_review/);
  assert.match(submitRoute, /202/);
  assert.match(submitRoute, /rate_limited/);
  assert.match(submitRoute, />=\s*3/);
  assert.match(submitRoute, /INTERVAL '24 hours'/);
  assert.match(submitRoute, /already_reviewed/);
  assert.match(submitRoute, /tool_slug\s*=\s*\$\{toolSlug\}/);
});

test('newsletter signup route normalizes and rate limits submissions', () => {
  const subscribeRoute = readFileSync('src/pages/api/subscribe.ts', 'utf8');

  assert.match(subscribeRoute, /EMAIL_RE/);
  assert.match(subscribeRoute, /\.trim\(\)\.toLowerCase\(\)/);
  assert.match(subscribeRoute, /email\.length > 254/);
  assert.match(subscribeRoute, /EMAIL_RE\.test\(email\)/);
  assert.match(subscribeRoute, /website/);
  assert.match(subscribeRoute, /ok:\s*true,\s*already:\s*false/);
  assert.match(subscribeRoute, /checkRateLimit/);
  assert.match(subscribeRoute, /<\s*5/);
  assert.match(subscribeRoute, /INTERVAL '24 hours'/);
  assert.match(subscribeRoute, /rate_limited/);
  assert.match(subscribeRoute, /ON CONFLICT \(email\) DO NOTHING/);
  assert.match(subscribeRoute, /slice\(0,\s*80\)/);
  assert.match(subscribeRoute, /\|\|\s*'unknown'/);
  assert.match(subscribeRoute, /https:\/\/aipedia\.wiki\/#subscribe/);
  assert.match(subscribeRoute, /public, max-age=3600/);
});

test('gitignore protects pulled Vercel env files but keeps the template trackable', () => {
  const gitignore = readFileSync('.gitignore', 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim());

  assert.ok(gitignore.includes('.env'));
  assert.ok(gitignore.includes('.env.local'));
  assert.ok(gitignore.includes('.env.*.local'));
  assert.ok(gitignore.includes('.vercel/'));
  assert.ok(gitignore.includes('!.env.example'));
});

test('env template documents Vercel and Neon database URL fallbacks', () => {
  const envExample = readFileSync('.env.example', 'utf8');

  assert.match(envExample, /^DATABASE_URL=/m);
  for (const key of ['POSTGRES_URL', 'POSTGRES_PRISMA_URL', 'POSTGRES_URL_NON_POOLING']) {
    assert.match(envExample, new RegExp(`^#\\s*${key}=`, 'm'));
  }
  assert.match(envExample, /accepted fallbacks/i);
});

test('vercel env pull script matches migration setup guidance', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

  assert.equal(pkg.scripts?.['vercel:env:pull'], 'npx vercel env pull .env.local --yes');
});

test('deployment command uses Vercel prebuilt production flow', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  const deps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.optionalDependencies,
  };

  assert.equal(pkg.scripts?.deploy, 'npx vercel build --prod && npx vercel deploy --prebuilt --prod');
  assert.ok(deps['@astrojs/vercel']);
  assert.ok(deps['@neondatabase/serverless']);
  assert.equal(deps['@astrojs/cloudflare'], undefined);
  assert.equal(deps.wrangler, undefined);
});

test('package lock preserves Vercel and Neon runtime packages', () => {
  const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
  const root = lock.packages?.[''] ?? {};
  const rootDeps = {
    ...root.dependencies,
    ...root.devDependencies,
    ...root.optionalDependencies,
  };

  assert.ok(rootDeps['@astrojs/vercel']);
  assert.ok(rootDeps['@neondatabase/serverless']);
  assert.ok(lock.packages?.['node_modules/@astrojs/vercel']);
  assert.ok(lock.packages?.['node_modules/@neondatabase/serverless']);
  assert.equal(rootDeps['@astrojs/cloudflare'], undefined);
  assert.equal(rootDeps.wrangler, undefined);
  assert.equal(lock.packages?.['node_modules/@astrojs/cloudflare'], undefined);
  assert.equal(lock.packages?.['node_modules/wrangler'], undefined);
});
