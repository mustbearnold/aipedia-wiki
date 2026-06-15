#!/usr/bin/env node
/**
 * Apply and verify AiPedia's Neon/Postgres migrations without requiring psql.
 *
 * Default mode is a dry-run check. Use `--apply` to execute migrations against
 * the first configured Vercel/Neon Postgres URL, or `--verify` to check the
 * expected tables/indexes already exist. Standalone Node scripts do not
 * auto-load .env.local, so this script can load it explicitly with
 * `--env .env.local`.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { neon } from '@neondatabase/serverless';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const migrationsDirArg = valueFor('--migrations-dir') || valueFor('--migrations');
const MIGRATIONS_DIR = migrationsDirArg ? resolve(PROJECT_DIR, migrationsDirArg) : join(PROJECT_DIR, 'migrations');
const DEFAULT_ENV_FILES = ['.env.local', '.env'];
const DATABASE_ENV_KEYS = ['DATABASE_URL', 'POSTGRES_URL', 'POSTGRES_PRISMA_URL', 'POSTGRES_URL_NON_POOLING'];
const KNOWN_FLAGS = new Set([
  '--check',
  '--apply',
  '--verify',
  '--json',
  '--env',
  '--env-path',
  '--project-dir',
  '--root',
  '--migrations-dir',
  '--migrations',
  '--help',
  '-h',
]);
const REQUIRED_TABLES = ['reviews', 'subscribers'];
const REQUIRED_INDEXES = [
  'idx_reviews_tool_approved',
  'idx_reviews_pending',
  'idx_reviews_ip_recent',
  'idx_subscribers_email',
  'idx_subscribers_confirmed',
  'idx_subscribers_ip_recent',
];

const jsonMode = args.includes('--json');
const applyMode = args.includes('--apply');
const verifyMode = args.includes('--verify') || applyMode;
const helpMode = args.includes('--help') || args.includes('-h');
const explicitEnvFile = valueFor('--env') || valueFor('--env-path');
const argumentIssues = collectArgumentIssues();

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
  for (const arg of args) {
    if (!arg.startsWith('-')) continue;
    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) {
      issues.push({ code: 'argument-invalid', path: 'command', detail: `unknown flag ${name}` });
    }
  }

  for (const flag of ['--env', '--env-path']) {
    if (!hasFlag(flag)) continue;
    const inlineArg = args.find((arg) => arg.startsWith(`${flag}=`));
    const value = inlineArg ? inlineArg.slice(flag.length + 1) : args[args.indexOf(flag) + 1] ?? '';
    if (!value || value.startsWith('-')) {
      issues.push({ code: 'argument-invalid', path: 'command', detail: `${flag} requires a file path` });
    }
  }

  const modeFlags = ['--check', '--apply', '--verify'].filter((flag) => hasFlag(flag));
  if (modeFlags.length > 1) {
    issues.push({
      code: 'argument-invalid',
      path: 'command',
      detail: `choose exactly one mode flag, got ${modeFlags.join(', ')}`,
    });
  }

  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/neon-migrate.mjs --check',
    '  node scripts/neon-migrate.mjs --apply --env .env.local',
    '  node scripts/neon-migrate.mjs --verify --env .env.local',
    '',
    'Modes:',
    '  --check   Validate migration files without touching the database (default).',
    '  --apply   Execute migrations in filename order, then verify schema.',
    '  --verify  Verify expected tables and indexes exist.',
    '',
    'Environment:',
    '  DATABASE_URL is read first; POSTGRES_URL, POSTGRES_PRISMA_URL, and',
    '  POSTGRES_URL_NON_POOLING are accepted fallbacks for Vercel/Neon pulls.',
    '  If --env is omitted, .env.local and then .env are loaded when present.',
    '  Explicit --env paths must exist; missing files fail closed.',
    '',
    'Fixtures:',
    '  --project-dir <dir>       Resolve .env and migrations from another project root.',
    '  --migrations-dir <dir>    Validate migrations from a specific directory.',
  ].join('\n');
}

function loadEnvFile(pathArg) {
  const envPath = resolve(PROJECT_DIR, pathArg);
  if (!existsSync(envPath)) return false;

  const text = readFileSync(envPath, 'utf8');
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if ((process.env[key] ?? '').trim()) continue;
    process.env[key] = rawValue.trim().replace(/^['"]|['"]$/g, '');
  }

  return true;
}

function databaseEnv() {
  for (const key of DATABASE_ENV_KEYS) {
    const value = process.env[key]?.trim() ?? '';
    if (value) return { key, value };
  }

  return { key: '', value: '' };
}

function redactSensitiveText(text, redactions = []) {
  let detail = String(text ?? '');

  for (const { key, value } of redactions) {
    if (!value) continue;
    detail = detail.split(value).join(`[redacted ${key}]`);
  }

  return detail
    .replace(/\bpostgres(?:ql)?:\/\/[^\s'")]+/gi, 'postgres://[redacted]')
    .replace(/\b(password=)[^&\s'")]+/gi, '$1[redacted]');
}

function migrationFiles() {
  if (!existsSync(MIGRATIONS_DIR)) return [];
  return readdirSync(MIGRATIONS_DIR)
    .filter((file) => /^\d{4}_.+\.sql$/.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => join(MIGRATIONS_DIR, file));
}

function stripSqlComments(sql) {
  return sql
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith('--'))
    .join('\n')
    .trim();
}

function splitStatements(sql) {
  const statements = [];
  let current = '';
  let quote = null;
  let dollarTag = null;

  for (let i = 0; i < sql.length; i += 1) {
    const char = sql[i];
    const next = sql[i + 1];

    if (dollarTag) {
      current += char;
      if (sql.startsWith(dollarTag, i)) {
        current += sql.slice(i + 1, i + dollarTag.length);
        i += dollarTag.length - 1;
        dollarTag = null;
      }
      continue;
    }

    if (quote) {
      current += char;
      if (char === quote && next === quote) {
        current += next;
        i += 1;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      current += char;
      continue;
    }

    if (char === '$') {
      const tag = sql.slice(i).match(/^\$[A-Za-z_][A-Za-z0-9_]*\$|^\$\$/)?.[0];
      if (tag) {
        dollarTag = tag;
        current += tag;
        i += tag.length - 1;
        continue;
      }
    }

    if (char === ';') {
      const statement = current.trim();
      if (statement) statements.push(statement);
      current = '';
      continue;
    }

    current += char;
  }

  const tail = current.trim();
  if (tail) statements.push(tail);
  return statements;
}

function validateMigration(file) {
  const raw = readFileSync(file, 'utf8');
  const sql = stripSqlComments(raw);
  const statements = splitStatements(sql);
  const relPath = relative(PROJECT_DIR, file).replace(/\\/g, '/');
  const issues = [];

  if (statements.length === 0) issues.push('contains no SQL statements');
  if (!/CREATE TABLE IF NOT EXISTS/i.test(sql)) issues.push('missing CREATE TABLE IF NOT EXISTS');
  if (/AUTOINCREMENT|\bD1\b|\bwrangler\b|sqlite/i.test(sql)) issues.push('contains Cloudflare/D1/SQLite-era syntax');
  if (!/CREATE INDEX IF NOT EXISTS/i.test(sql)) issues.push('missing CREATE INDEX IF NOT EXISTS');

  return {
    path: relPath,
    file,
    statements,
    issues,
  };
}

async function applyMigrations(sql, migrations) {
  for (const migration of migrations) {
    for (const statement of migration.statements) {
      await sql.query(statement);
    }
  }
}

async function verifySchema(sql) {
  const tableRows = await sql.query(
    `SELECT table_name
     FROM information_schema.tables
     WHERE table_schema = 'public'
       AND table_name = ANY($1::text[])`,
    [REQUIRED_TABLES],
  );
  const indexRows = await sql.query(
    `SELECT indexname
     FROM pg_indexes
     WHERE schemaname = 'public'
       AND indexname = ANY($1::text[])`,
    [REQUIRED_INDEXES],
  );

  const tables = new Set(tableRows.map((row) => row.table_name));
  const indexes = new Set(indexRows.map((row) => row.indexname));

  return {
    missing_tables: REQUIRED_TABLES.filter((table) => !tables.has(table)),
    missing_indexes: REQUIRED_INDEXES.filter((index) => !indexes.has(index)),
  };
}

function printReport(report) {
  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  if (!report.ok) {
    console.error('[neon-migrate] failed');
    for (const issue of report.issues) console.error(`${issue.code}\t${issue.path ?? ''}\t${issue.detail}`);
    return;
  }

  const migrationLabel = `${report.migrations.length} migration${report.migrations.length === 1 ? '' : 's'}`;
  if (report.mode === 'apply') {
    console.log(`[neon-migrate] applied ${migrationLabel}; schema verified.`);
  } else if (report.mode === 'verify') {
    console.log('[neon-migrate] schema verified.');
  } else {
    console.log(`[neon-migrate] dry-run OK: ${migrationLabel}, ${report.statement_count} SQL statement(s).`);
    console.log('[neon-migrate] apply with: npm run db:migrate -- --apply --env .env.local');
  }
}

if (helpMode) {
  console.log(usage());
  process.exit(0);
}

if (argumentIssues.length === 0) {
  if (explicitEnvFile) {
    if (!loadEnvFile(explicitEnvFile)) {
      argumentIssues.push({
        code: 'env-file-missing',
        path: explicitEnvFile,
        detail: 'explicit env file does not exist',
      });
    }
  } else {
    for (const envFile of DEFAULT_ENV_FILES) loadEnvFile(envFile);
  }
}

const migrations = migrationFiles().map(validateMigration);
const issues = [...argumentIssues];
for (const migration of migrations) {
  for (const detail of migration.issues) issues.push({ code: 'migration-invalid', path: migration.path, detail });
}

if (migrations.length === 0) {
  issues.push({
    code: 'migrations-missing',
    path: relative(PROJECT_DIR, MIGRATIONS_DIR).replace(/\\/g, '/') || 'migrations',
    detail: 'expected numbered .sql migration files',
  });
}

let mode = 'check';
if (applyMode) mode = 'apply';
else if (verifyMode) mode = 'verify';

let schema = null;
let databaseEnvKey = null;
let sensitiveRedactions = [];
try {
  if ((applyMode || verifyMode) && issues.length === 0) {
    const selectedDatabaseEnv = databaseEnv();
    databaseEnvKey = selectedDatabaseEnv.key || null;
    sensitiveRedactions = selectedDatabaseEnv.key
      ? [{ key: selectedDatabaseEnv.key, value: selectedDatabaseEnv.value }]
      : [];
    if (!selectedDatabaseEnv.value) {
      issues.push({
        code: 'database-url-missing',
        path: explicitEnvFile || '.env.local',
        detail:
          'set DATABASE_URL or a Vercel/Neon POSTGRES_* URL, or run `vercel env pull .env.local --yes` before applying/verifying migrations',
      });
    } else {
      const sql = neon(selectedDatabaseEnv.value);
      if (applyMode) await applyMigrations(sql, migrations);
      schema = await verifySchema(sql);
      for (const table of schema.missing_tables) {
        issues.push({ code: 'schema-table-missing', path: 'database', detail: table });
      }
      for (const index of schema.missing_indexes) {
        issues.push({ code: 'schema-index-missing', path: 'database', detail: index });
      }
    }
  }
} catch (error) {
  issues.push({
    code: applyMode ? 'migration-apply-failed' : 'schema-verify-failed',
    path: 'database',
    detail: redactSensitiveText(error?.message ?? error, sensitiveRedactions).slice(0, 500),
  });
}

const report = {
  ok: issues.length === 0,
  mode,
  project_dir: PROJECT_DIR,
  migrations_dir: MIGRATIONS_DIR,
  migrations: migrations.map((migration) => ({
    file: basename(migration.path),
    path: migration.path,
    statements: migration.statements.length,
  })),
  database_env_key: databaseEnvKey,
  statement_count: migrations.reduce((sum, migration) => sum + migration.statements.length, 0),
  schema,
  issues,
};

printReport(report);
process.exit(report.ok ? 0 : 1);
