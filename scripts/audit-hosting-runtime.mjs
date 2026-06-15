#!/usr/bin/env node
/**
 * Guard the Vercel/Neon deployment surface against stale Cloudflare-era
 * runtime config. Editorial content may still mention Cloudflare as a company,
 * source, or AI product vendor; this audit only checks hosting/runtime files.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const helpMode = args.includes('--help') || args.includes('-h');
const knownFlags = new Set(['--json', '--project-dir', '--root', '--help', '-h']);
const valueFlags = new Set(['--project-dir', '--root']);
const argumentIssues = validateArgs(args);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);

const requiredEnvKeys = ['DATABASE_URL', 'IP_HASH_SECRET', 'ADMIN_PASSWORD'];
const requiredDatabaseEnvFallbacks = ['DATABASE_URL', 'POSTGRES_URL', 'POSTGRES_PRISMA_URL', 'POSTGRES_URL_NON_POOLING'];
const requiredGitignorePatterns = ['.env', '.env.local', '.env.*.local', '.vercel/'];
const requiredNpmScripts = ['db:migrate', 'db:migrate:check', 'db:migrate:verify'];
const requiredPackageNames = ['@astrojs/vercel', '@neondatabase/serverless'];
const forbiddenPackageNames = ['@astrojs/cloudflare', 'wrangler', 'miniflare'];
const forbiddenHostingFiles = [
  '.dev.vars',
  'cloudflare-env.d.ts',
  'wrangler.json',
  'wrangler.jsonc',
  'wrangler.toml',
  'worker-configuration.d.ts',
  'public/_headers',
  'public/_redirects',
  'public/_routes.json',
  'public/_worker.js',
  'functions',
];
const forbiddenRuntimePatterns = [
  { pattern: /\bTURNSTILE\b/i, detail: 'Turnstile runtime key' },
  { pattern: /\bCF_[A-Z0-9_]+\b/, detail: 'Cloudflare-prefixed env var' },
  { pattern: /\bD1Database\b|\bcontext\.env\b|\benv\.DB\b/i, detail: 'Cloudflare Pages/D1 runtime binding' },
  { pattern: /challenges\.cloudflare\.com/i, detail: 'Cloudflare challenge origin' },
  { pattern: /\bwrangler\b/i, detail: 'Wrangler runtime reference' },
];
const runtimeSourceDirs = ['src/lib/server', 'src/pages/api'];
const migrationDirs = ['migrations'];
const dynamicApiRoutes = [
  'src/pages/api/subscribe.ts',
  'src/pages/api/reviews/submit.ts',
  'src/pages/api/reviews/admin/list.ts',
  'src/pages/api/reviews/admin/moderate.ts',
  'src/pages/api/reviews/for/[slug].ts',
];
const issues = [];

function validateArgs(rawArgs) {
  const foundValueFlags = new Set();
  const foundIssues = [];

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    const eqIndex = arg.startsWith('--') ? arg.indexOf('=') : -1;
    const flag = eqIndex >= 0 ? arg.slice(0, eqIndex) : arg;

    if (!arg.startsWith('-')) {
      foundIssues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    if (!knownFlags.has(flag)) {
      foundIssues.push({ code: 'argument-invalid', detail: `unknown flag ${flag}` });
      continue;
    }

    if (valueFlags.has(flag)) {
      foundValueFlags.add(flag);

      if (eqIndex >= 0) {
        if (!arg.slice(eqIndex + 1)) {
          foundIssues.push({ code: 'argument-invalid', detail: `${flag} requires a value` });
        }
        continue;
      }

      const next = rawArgs[index + 1];
      if (!next || next.startsWith('-')) {
        foundIssues.push({ code: 'argument-invalid', detail: `${flag} requires a value` });
      } else {
        index += 1;
      }
      continue;
    }

    if (eqIndex >= 0) {
      foundIssues.push({ code: 'argument-invalid', detail: `${flag} does not accept a value` });
    }
  }

  if (foundValueFlags.has('--project-dir') && foundValueFlags.has('--root')) {
    foundIssues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  return foundIssues;
}

function printHelp() {
  console.log([
    'Usage: node scripts/audit-hosting-runtime.mjs [options]',
    '',
    'Options:',
    '  --json                Print a structured JSON report.',
    '  --project-dir <dir>   Audit a fixture or alternate project root.',
    '  --root <dir>          Alias for --project-dir.',
    '  --help, -h            Print this help message.',
  ].join('\n'));
}

function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index >= 0) {
    const next = args[index + 1] ?? '';
    return next && !next.startsWith('-') ? next : '';
  }
  const inlineArg = args.find((arg) => arg.startsWith(`${flag}=`));
  return inlineArg ? inlineArg.slice(flag.length + 1) : '';
}

function projectPath(path) {
  return join(PROJECT_DIR, path);
}

function rel(path) {
  return relative(PROJECT_DIR, path).replace(/\\/g, '/');
}

function readText(path) {
  return readFileSync(projectPath(path), 'utf8');
}

function addIssue(code, path, detail) {
  issues.push({ code, path, detail });
}

function lockPackagePath(name) {
  return `node_modules/${name}`;
}

function rootLockDeps(rootPackage) {
  return {
    ...rootPackage.dependencies,
    ...rootPackage.devDependencies,
    ...rootPackage.optionalDependencies,
  };
}

function packageLockPackageCount() {
  const path = 'package-lock.json';
  if (!existsSync(projectPath(path))) return 0;
  try {
    return Object.keys(JSON.parse(readText(path)).packages ?? {}).length;
  } catch {
    return 0;
  }
}

function checkedCountsFor(mode) {
  if (mode === 'argument-error') {
    return {
      runtime_source_files: 0,
      migration_files: 0,
      gitignore_patterns: 0,
      package_lock_packages: 0,
    };
  }

  return {
    runtime_source_files: runtimeSourceDirs.flatMap((dir) => walkFiles(dir, ['.ts', '.js', '.mjs'])).length,
    migration_files: migrationDirs.flatMap((dir) => walkFiles(dir, ['.sql'])).length,
    gitignore_patterns: requiredGitignorePatterns.length,
    package_lock_packages: packageLockPackageCount(),
  };
}

function resultFor(mode = 'audit') {
  return {
    mode,
    project_dir: PROJECT_DIR,
    ok: mode !== 'argument-error' && issues.length === 0,
    issues,
    checked: checkedCountsFor(mode),
    argument_issues: mode === 'argument-error' ? argumentIssues : [],
  };
}

function emitReport(report) {
  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  if (report.mode === 'argument-error') {
    console.error('[audit-hosting-runtime] Invalid command arguments:');
    for (const issue of report.argument_issues) console.error(`- ${issue.detail}`);
    return;
  }

  if (report.ok) {
    console.log(`[audit-hosting-runtime] OK: Vercel/Neon runtime surfaces checked (${report.checked.runtime_source_files} runtime files, ${report.checked.migration_files} migrations).`);
  } else {
    console.error('[audit-hosting-runtime] Hosting/runtime drift detected:');
    for (const issue of issues) console.error(`${issue.code}\t${issue.path}\t${issue.detail}`);
  }
}

function walkFiles(path, extensions = null) {
  const full = projectPath(path);
  if (!existsSync(full)) return [];
  const stat = statSync(full);
  if (!stat.isDirectory()) return [full];

  const files = [];
  for (const name of readdirSync(full)) {
    const child = join(full, name);
    const childStat = statSync(child);
    if (childStat.isDirectory()) files.push(...walkFiles(rel(child), extensions));
    else if (!extensions || extensions.some((ext) => child.endsWith(ext))) files.push(child);
  }
  return files;
}

function firstHeaderValue(config, key) {
  for (const rule of config.headers ?? []) {
    const value = headerValue(rule, key);
    if (value) return value;
  }
  return '';
}

function headerValue(rule, key) {
  for (const header of rule.headers ?? []) {
    if (String(header.key).toLowerCase() === key.toLowerCase()) return String(header.value ?? '');
  }
  return '';
}

function checkVercelConfig() {
  const path = 'vercel.json';
  if (!existsSync(projectPath(path))) {
    addIssue('vercel-config-missing', path, 'expected vercel.json for deployed headers and redirects');
    return;
  }

  let config;
  try {
    config = JSON.parse(readText(path));
  } catch (error) {
    addIssue('vercel-config-invalid-json', path, error.message);
    return;
  }

  if (config.framework !== 'astro') {
    addIssue('vercel-framework-drift', path, `expected framework "astro", found "${config.framework ?? ''}"`);
  }

  if (config.installCommand !== 'npm install') {
    addIssue('vercel-install-command-drift', path, 'Vercel installCommand should use npm install');
  }

  if (config.buildCommand !== 'AIPEDIA_LEDGER_IGNORE_DIRTY=1 npm run build') {
    addIssue('vercel-build-command-drift', path, 'Vercel buildCommand should run the full production build with ledger dirty checks disabled only for Vercel');
  }

  const csp = firstHeaderValue(config, 'Content-Security-Policy');
  if (!csp) {
    addIssue('vercel-csp-missing', path, 'expected a Content-Security-Policy header');
  }
  if (/challenges\.cloudflare\.com|turnstile|cloudflareinsights\.com/i.test(csp)) {
    addIssue('vercel-csp-cloudflare-origin', path, 'CSP still allows Cloudflare challenge/Turnstile origins');
  }
  if (!/vitals\.vercel-insights\.com/.test(csp)) {
    addIssue('vercel-csp-missing-vitals', path, 'expected Vercel Speed Insights endpoint in connect-src');
  }

  const apiHeaders = (config.headers ?? []).find((rule) => rule.source === '/api/(.*)');
  if (!apiHeaders) {
    addIssue('vercel-api-headers-missing', path, 'expected noindex/no-store headers for /api/(.*)');
  } else {
    if (!/noindex/i.test(headerValue(apiHeaders, 'X-Robots-Tag'))) {
      addIssue('vercel-api-noindex-missing', path, 'API routes must remain noindexed');
    }
    if (!/no-store/i.test(headerValue(apiHeaders, 'Cache-Control'))) {
      addIssue('vercel-api-no-store-missing', path, 'API routes must remain uncached');
    }
  }

  const adminHeaders = (config.headers ?? []).find((rule) => rule.source === '/admin/(.*)');
  if (!adminHeaders) {
    addIssue('vercel-admin-headers-missing', path, 'expected noindex/no-store headers for /admin/(.*)');
  } else {
    if (!/noindex/i.test(headerValue(adminHeaders, 'X-Robots-Tag')) || !/nofollow/i.test(headerValue(adminHeaders, 'X-Robots-Tag'))) {
      addIssue('vercel-admin-robots-drift', path, 'admin routes must remain noindex/nofollow');
    }
    if (!/private/i.test(headerValue(adminHeaders, 'Cache-Control')) || !/no-store/i.test(headerValue(adminHeaders, 'Cache-Control'))) {
      addIssue('vercel-admin-cache-drift', path, 'admin routes must remain private and uncached');
    }
  }
}

function checkPackage() {
  const path = 'package.json';
  if (!existsSync(projectPath(path))) {
    addIssue('package-json-missing', path, 'expected package.json for Vercel/Neon operator scripts and dependencies');
    return;
  }

  let pkg;
  try {
    pkg = JSON.parse(readText(path));
  } catch (error) {
    addIssue('package-json-invalid-json', path, error.message);
    return;
  }

  const allDeps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.optionalDependencies,
  };

  for (const name of forbiddenPackageNames) {
    if (Object.prototype.hasOwnProperty.call(allDeps, name)) {
      addIssue('cloudflare-package-present', path, `remove ${name}`);
    }
  }

  for (const name of requiredPackageNames) {
    if (!Object.prototype.hasOwnProperty.call(allDeps, name)) {
      addIssue('vercel-runtime-package-missing', path, `expected ${name}`);
    }
  }

  for (const [name, command] of Object.entries(pkg.scripts ?? {})) {
    if (/\bwrangler\b|cloudflare\s+pages|pages:deploy/i.test(String(command))) {
      addIssue('cloudflare-script-present', path, `${name}: ${command}`);
    }
  }

  for (const name of requiredNpmScripts) {
    if (!pkg.scripts?.[name]) {
      addIssue('db-migration-script-missing', path, name);
    }
  }

  if (!/^npx vercel build --prod && npx vercel deploy --prebuilt --prod$/.test(String(pkg.scripts?.deploy ?? ''))) {
    addIssue('vercel-deploy-script-drift', path, 'deploy script should build with Vercel before prebuilt production deploy');
  }

  if (!/^npx vercel env pull \.env\.local --yes$/.test(String(pkg.scripts?.['vercel:env:pull'] ?? ''))) {
    addIssue('vercel-env-pull-script-drift', path, 'vercel:env:pull should pull .env.local non-interactively');
  }
}

function checkPackageLock() {
  const path = 'package-lock.json';
  if (!existsSync(projectPath(path))) {
    addIssue('package-lock-missing', path, 'expected package-lock.json to pin the Vercel/Neon runtime graph');
    return;
  }

  let lock;
  try {
    lock = JSON.parse(readText(path));
  } catch (error) {
    addIssue('package-lock-invalid-json', path, error.message);
    return;
  }

  const packages = lock.packages ?? {};
  const rootDeps = rootLockDeps(packages[''] ?? {});

  for (const name of requiredPackageNames) {
    if (!Object.prototype.hasOwnProperty.call(rootDeps, name)) {
      addIssue('package-lock-required-root-missing', path, `root lockfile dependency missing ${name}`);
    }
    if (!packages[lockPackagePath(name)]) {
      addIssue('package-lock-required-package-missing', path, `lockfile package entry missing ${name}`);
    }
  }

  for (const name of forbiddenPackageNames) {
    if (Object.prototype.hasOwnProperty.call(rootDeps, name) || packages[lockPackagePath(name)]) {
      addIssue('cloudflare-package-lock-present', path, `remove locked ${name}`);
    }
  }
}

function checkAstroConfig() {
  const path = 'astro.config.mjs';
  if (!existsSync(projectPath(path))) {
    addIssue('astro-config-missing', path, 'expected Astro config with the Vercel adapter');
    return;
  }

  const text = readText(path);
  if (!/@astrojs\/vercel/.test(text)) {
    addIssue('astro-vercel-adapter-missing', path, 'expected @astrojs/vercel adapter import/config');
  }
  if (/@astrojs\/cloudflare/.test(text)) {
    addIssue('astro-cloudflare-adapter-present', path, 'remove @astrojs/cloudflare adapter');
  }
  if (!/output:\s*['"]static['"]/.test(text)) {
    addIssue('astro-static-output-missing', path, 'Astro 6 static output should be used with per-route prerender=false opt-outs for Vercel functions');
  }
  if (!/\.\.\.\(isDev\s*\?\s*\{\}\s*:\s*\{\s*adapter:\s*vercel\(\)\s*\}\)/.test(text)) {
    addIssue('astro-vercel-adapter-fast-build-missing', path, 'non-dev builds, including fast CI builds, must keep the Vercel adapter so prerender=false routes become functions');
  }
}

function checkEnvExample() {
  const path = '.env.example';
  if (!existsSync(projectPath(path))) {
    addIssue('env-template-missing', path, 'expected .env.example to document Vercel/Neon setup');
    return;
  }

  const text = readText(path);

  for (const key of requiredEnvKeys) {
    if (!new RegExp(`^${key}=`, 'm').test(text)) {
      addIssue('env-required-key-missing', path, key);
    }
  }

  for (const key of requiredDatabaseEnvFallbacks) {
    if (!new RegExp(`^#?\\s*${key}=`, 'm').test(text)) {
      addIssue('env-database-fallback-doc-missing', path, `document ${key} for Vercel/Neon database setup`);
    }
  }

  if (/TURNSTILE|CF_|CLOUDFLARE|D1_/i.test(text)) {
    addIssue('env-cloudflare-key-present', path, 'remove Cloudflare/Turnstile/D1 env keys from Vercel template');
  }
}

function checkGitignore() {
  const path = '.gitignore';
  if (!existsSync(projectPath(path))) {
    addIssue('gitignore-missing', path, 'expected .gitignore to protect local Vercel/env artifacts');
    return;
  }

  const lines = readText(path)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));

  for (const pattern of requiredGitignorePatterns) {
    if (!lines.includes(pattern)) {
      addIssue('gitignore-env-pattern-missing', path, `missing ${pattern}`);
    }
  }

  if (!lines.includes('!.env.example')) {
    addIssue('gitignore-env-example-not-unignored', path, 'keep .env.example trackable as the public env template');
  }
}

function checkForbiddenHostingFiles() {
  for (const path of forbiddenHostingFiles) {
    if (existsSync(projectPath(path))) {
      addIssue('cloudflare-hosting-file-present', path, 'stale Cloudflare Pages/Wrangler surface');
    }
  }
}

function checkRuntimeSource() {
  const files = runtimeSourceDirs.flatMap((dir) => walkFiles(dir, ['.ts', '.js', '.mjs']));
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    for (const { pattern, detail } of forbiddenRuntimePatterns) {
      if (pattern.test(text)) addIssue('cloudflare-runtime-reference', rel(file), detail);
    }
  }

  for (const path of dynamicApiRoutes) {
    if (!existsSync(projectPath(path))) {
      addIssue('api-dynamic-route-missing', path, 'expected Vercel runtime API route');
      continue;
    }

    const text = readText(path);
    if (!/export const prerender = false/.test(text)) {
      addIssue('api-dynamic-prerender-optout-missing', path, 'dynamic API routes must use literal export const prerender = false so Astro emits Vercel functions');
    }
  }

  const runtimePath = 'src/lib/server/runtime.ts';
  if (!existsSync(projectPath(runtimePath))) {
    addIssue('server-runtime-missing', runtimePath, 'expected shared Vercel/Neon runtime helper');
  } else {
    const text = readText(runtimePath);
    const jsonHelper = text.match(/export function json[\s\S]*?export async function sha256/)?.[0] ?? '';
    if (!/@neondatabase\/serverless/.test(text)) {
      addIssue('neon-runtime-missing', runtimePath, 'expected @neondatabase/serverless runtime import');
    }
    if (!/DATABASE_URL/.test(text)) {
      addIssue('database-url-runtime-missing', runtimePath, 'expected DATABASE_URL support');
    }
    for (const key of requiredDatabaseEnvFallbacks) {
      if (!new RegExp(`['"]${key}['"]`).test(text)) {
        addIssue('database-env-fallback-missing', runtimePath, `expected ${key} in DATABASE_ENV_KEYS`);
      }
    }
    if (!/for\s*\(\s*const\s+key\s+of\s+DATABASE_ENV_KEYS\s*\)/.test(text) || !/readEnv\(key\)\.trim\(\)/.test(text)) {
      addIssue('database-env-fallback-loop-missing', runtimePath, 'getDatabaseUrl should scan trimmed Vercel/Neon env fallbacks');
    }
    if (!/cachedDatabaseUrl/.test(text) || !/cachedSql/.test(text) || !/cachedDatabaseUrl\s*===\s*databaseUrl/.test(text) || !/neon\(databaseUrl\)/.test(text)) {
      addIssue('database-client-cache-drift', runtimePath, 'getSql should cache Neon clients per database URL');
    }
    if (!/getIpHashSecret/.test(text) || !/IP_HASH_SECRET/.test(text)) {
      addIssue('ip-hash-secret-runtime-missing', runtimePath, 'expected centralized IP hash secret helper');
    }
    if (!/requireAdmin/.test(text) || !/ADMIN_PASSWORD/.test(text) || !/if \(!expected\) return false/.test(text)) {
      addIssue('admin-auth-runtime-missing', runtimePath, 'expected ADMIN_PASSWORD auth helper that fails closed when unset');
    }
    if (!/unauthorizedAdminResponse/.test(text) || !/www-authenticate/.test(text) || !/cache-control['"]?: ['"]no-store/.test(text)) {
      addIssue('admin-unauthorized-response-missing', runtimePath, 'expected no-store Basic auth challenge helper');
    }
    if (
      !/new Headers\(headers\)/.test(jsonHelper) ||
      !/content-type/.test(jsonHelper) ||
      !/application\/json/.test(jsonHelper) ||
      !/cache-control/.test(jsonHelper) ||
      !/no-store/.test(jsonHelper)
    ) {
      addIssue('server-json-helper-cache-drift', runtimePath, 'shared JSON helper must default to application/json and no-store');
    }
  }

  const writeRoutes = ['src/pages/api/subscribe.ts', 'src/pages/api/reviews/submit.ts'];
  for (const path of writeRoutes) {
    if (!existsSync(projectPath(path))) {
      addIssue('api-write-route-missing', path, 'expected API write route');
      continue;
    }

    const text = readText(path);
    if (!/getIpHashSecret/.test(text)) {
      addIssue('ip-hash-secret-check-missing', path, 'write route must fail closed when IP_HASH_SECRET is absent');
    }
    if (/readEnv\(['"]IP_HASH_SECRET['"]\)/.test(text)) {
      addIssue('ip-hash-secret-direct-read', path, 'use getIpHashSecret so missing secret checks stay centralized');
    }
    if (/sha256\(`\$\{ip\}\|\$\{readEnv/.test(text)) {
      addIssue('ip-hash-unsafely-derived', path, 'IP hash must use a validated non-empty secret');
    }
  }

  const reviewSubmitRoute = 'src/pages/api/reviews/submit.ts';
  if (existsSync(projectPath(reviewSubmitRoute))) {
    const text = readText(reviewSubmitRoute);
    if (!/approved\)\s*VALUES[\s\S]*\$\{spamScore\},\s*0\)/.test(text)) {
      addIssue('api-review-submit-auto-approval-risk', reviewSubmitRoute, 'new reader reviews must be inserted as pending');
    }
    if (!/pending_review/.test(text) || !/202/.test(text)) {
      addIssue('api-review-submit-pending-response-missing', reviewSubmitRoute, 'review submission should return pending_review with accepted status');
    }
    if (!/rate_limited/.test(text) || !/>=\s*3/.test(text) || !/INTERVAL '24 hours'/.test(text)) {
      addIssue('api-review-submit-rate-limit-missing', reviewSubmitRoute, 'review submission must keep a 3-per-day IP hash limit');
    }
    if (!/already_reviewed/.test(text) || !/tool_slug\s*=\s*\$\{toolSlug\}/.test(text)) {
      addIssue('api-review-submit-duplicate-check-missing', reviewSubmitRoute, 'review submission must reject duplicate tool reviews by hashed IP');
    }
  }

  const subscribeRoute = 'src/pages/api/subscribe.ts';
  if (existsSync(projectPath(subscribeRoute))) {
    const text = readText(subscribeRoute);
    if (!/EMAIL_RE/.test(text) || !/email\.length > 254/.test(text) || !/EMAIL_RE\.test\(email\)/.test(text)) {
      addIssue('api-subscribe-email-validation-missing', subscribeRoute, 'newsletter signup must validate normalized email input');
    }
    if (!/\.trim\(\)\.toLowerCase\(\)/.test(text)) {
      addIssue('api-subscribe-email-normalization-missing', subscribeRoute, 'newsletter signup must trim and lowercase email input');
    }
    if (!/website/.test(text) || !/ok:\s*true,\s*already:\s*false/.test(text)) {
      addIssue('api-subscribe-honeypot-missing', subscribeRoute, 'newsletter signup should preserve the silent honeypot success path');
    }
    if (!/checkRateLimit/.test(text) || !/<\s*5/.test(text) || !/INTERVAL '24 hours'/.test(text) || !/rate_limited/.test(text)) {
      addIssue('api-subscribe-rate-limit-missing', subscribeRoute, 'newsletter signup must keep the 5-per-day IP hash rate limit');
    }
    if (!/ON CONFLICT \(email\) DO NOTHING/.test(text)) {
      addIssue('api-subscribe-idempotency-missing', subscribeRoute, 'newsletter signup must stay idempotent by email');
    }
    if (!/slice\(0,\s*80\)/.test(text) || !/\|\|\s*'unknown'/.test(text)) {
      addIssue('api-subscribe-source-bound-missing', subscribeRoute, 'newsletter signup source must stay bounded with an unknown fallback');
    }
    if (!/https:\/\/aipedia\.wiki\/#subscribe/.test(text) || !/public, max-age=3600/.test(text)) {
      addIssue('api-subscribe-get-redirect-drift', subscribeRoute, 'newsletter GET route should redirect to the homepage signup section with a short cache');
    }
  }

  const adminRoutes = ['src/pages/api/reviews/admin/list.ts', 'src/pages/api/reviews/admin/moderate.ts'];
  for (const path of adminRoutes) {
    if (!existsSync(projectPath(path))) {
      addIssue('api-admin-route-missing', path, 'expected admin review API route');
      continue;
    }

    const text = readText(path);
    if (!/requireAdmin\(request\)/.test(text)) {
      addIssue('api-admin-auth-check-missing', path, 'admin review API route must call requireAdmin(request)');
    }
    if (!/unauthorizedAdminResponse\(\)/.test(text)) {
      addIssue('api-admin-unauthorized-response-missing', path, 'admin review API route must use the shared unauthorized response');
    }
    if (!/getSql\(\)/.test(text)) {
      addIssue('api-admin-database-helper-missing', path, 'admin review API route must use the shared Neon SQL helper');
    }
  }

  const publicReviewRoute = 'src/pages/api/reviews/for/[slug].ts';
  if (!existsSync(projectPath(publicReviewRoute))) {
    addIssue('api-public-review-route-missing', publicReviewRoute, 'expected public approved-review API route');
  } else {
    const text = readText(publicReviewRoute);
    if (!/bad_slug/.test(text) || !/\^\[a-z0-9\]\[a-z0-9-\]\{0,63\}\$/.test(text)) {
      addIssue('api-public-review-slug-validation-missing', publicReviewRoute, 'public review API route must validate tool slugs tightly');
    }
    if ((text.match(/approved\s*=\s*1/g) ?? []).length < 2) {
      addIssue('api-public-review-approval-filter-missing', publicReviewRoute, 'public review API route must query only approved reviews');
    }
    if (!/public, max-age=60, s-maxage=300/.test(text)) {
      addIssue('api-public-review-cache-drift', publicReviewRoute, 'public review API route should use short public cache headers');
    }
    if (/spam_score|approved_at|author_email_hash|ip_hash|user_agent/.test(text)) {
      addIssue('api-public-review-private-field-leak', publicReviewRoute, 'public review API route must not expose moderation/private fields');
    }
  }
}

function checkClientApiUrls() {
  const reviewBlockPath = 'src/components/ReviewsBlock.astro';
  if (existsSync(projectPath(reviewBlockPath))) {
    const text = readText(reviewBlockPath);
    if (!/fetch\(['"]\/api\/reviews\/for\/['"]\s*\+\s*encodeURIComponent\(slug\)\s*\+\s*['"]\/['"]\)/.test(text)) {
      addIssue('client-review-read-url-not-canonical', reviewBlockPath, 'public review fetch must hit the canonical trailing-slash API route');
    }
    if (!/fetch\(['"]\/api\/reviews\/submit\/['"]/.test(text)) {
      addIssue('client-review-submit-url-not-canonical', reviewBlockPath, 'review submission fetch must hit the canonical trailing-slash API route');
    }
    if (/fetch\(['"]\/api\/reviews\/submit['"],/.test(text)) {
      addIssue('client-review-submit-url-missing-slash', reviewBlockPath, 'review submission POST will 404/redirect if it omits the trailing slash');
    }
  }

  const adminReviewsPath = 'src/pages/admin/reviews.astro';
  if (existsSync(projectPath(adminReviewsPath))) {
    const text = readText(adminReviewsPath);
    if (!/fetch\(['"]\/api\/reviews\/admin\/list\/\?status=/.test(text)) {
      addIssue('client-review-admin-list-url-not-canonical', adminReviewsPath, 'admin review list fetch must hit the canonical trailing-slash API route');
    }
    if (!/fetch\(['"]\/api\/reviews\/admin\/moderate\/['"]/.test(text)) {
      addIssue('client-review-admin-moderate-url-not-canonical', adminReviewsPath, 'admin moderation POST must hit the canonical trailing-slash API route');
    }
    if (/fetch\(['"]\/api\/reviews\/admin\/moderate['"],/.test(text)) {
      addIssue('client-review-admin-moderate-url-missing-slash', adminReviewsPath, 'admin moderation POST will 404/redirect if it omits the trailing slash');
    }
  }
}

function checkMigrationRunner() {
  const path = 'scripts/neon-migrate.mjs';
  if (!existsSync(projectPath(path))) {
    addIssue('neon-migration-runner-missing', path, 'expected project-native Vercel/Neon migration runner');
    return;
  }

  const text = readText(path);
  for (const key of requiredDatabaseEnvFallbacks) {
    if (!new RegExp(`['"]${key}['"]`).test(text)) {
      addIssue('neon-migration-env-fallback-missing', path, `expected ${key} in DATABASE_ENV_KEYS`);
    }
  }
  if (!/for\s*\(\s*const\s+key\s+of\s+DATABASE_ENV_KEYS\s*\)/.test(text) || !/process\.env\[key\]\?\.trim\(\)/.test(text)) {
    addIssue('neon-migration-env-loop-missing', path, 'migration runner should scan trimmed Vercel/Neon env fallbacks');
  }
  if (!/\(process\.env\[key\]\s*\?\?\s*['"]{2}\)\.trim\(\)/.test(text)) {
    addIssue('neon-migration-env-loader-whitespace-drift', path, 'migration runner should not let whitespace env vars block env-file values');
  }
  if (!/env-file-missing/.test(text) || !/!loadEnvFile\(explicitEnvFile\)/.test(text)) {
    addIssue('neon-migration-explicit-env-missing-drift', path, 'migration runner should fail closed when an explicit env file is missing');
  }
  if (!/database_env_key/.test(text)) {
    addIssue('neon-migration-env-report-missing', path, 'migration runner JSON should report the selected env key without exposing its value');
  }
  if (!/redactSensitiveText/.test(text) || !/\[redacted \$\{key\}\]/.test(text) || !/postgres:\/\/\[redacted\]/.test(text)) {
    addIssue('neon-migration-secret-redaction-missing', path, 'migration runner must redact database URL values from error details');
  }
}

function checkMigrations() {
  const files = migrationDirs.flatMap((dir) => walkFiles(dir, ['.sql']));
  if (files.length === 0) addIssue('postgres-migrations-missing', 'migrations', 'expected SQL migrations for Neon/Postgres');

  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    if (/AUTOINCREMENT|\bD1\b|\bwrangler\b|sqlite/i.test(text)) {
      addIssue('cloudflare-sqlite-migration-reference', rel(file), 'migration still references SQLite/D1/Wrangler');
    }
    if (!/DATABASE_URL|Postgres|Neon/i.test(text)) {
      addIssue('migration-apply-instructions-missing', rel(file), 'expected Vercel/Neon DATABASE_URL apply guidance');
    }
  }
}

if (helpMode) {
  printHelp();
  process.exit(0);
}

if (argumentIssues.length > 0) {
  const report = resultFor('argument-error');
  emitReport(report);
  process.exit(1);
}

checkVercelConfig();
checkPackage();
checkPackageLock();
checkAstroConfig();
checkEnvExample();
checkGitignore();
checkForbiddenHostingFiles();
checkRuntimeSource();
checkClientApiUrls();
checkMigrationRunner();
checkMigrations();

const report = resultFor();
emitReport(report);

process.exit(report.ok ? 0 : 1);
