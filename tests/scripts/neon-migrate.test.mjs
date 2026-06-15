import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

const DATABASE_ENV_KEYS = ['DATABASE_URL', 'POSTGRES_URL', 'POSTGRES_PRISMA_URL', 'POSTGRES_URL_NON_POOLING'];
const emptyDatabaseEnv = Object.fromEntries(DATABASE_ENV_KEYS.map((key) => [key, '']));

function runNeonMigrate(args, env = {}) {
  return spawnSync(process.execPath, ['scripts/neon-migrate.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: {
      ...process.env,
      ...emptyDatabaseEnv,
      ...env,
    },
  });
}

test('Neon migration runner validates migrations without touching a database', () => {
  const result = runNeonMigrate(['--check', '--json'], { DATABASE_URL: '' });

  assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.mode, 'check');
  assert.equal(report.project_dir, resolve(process.cwd()));
  assert.equal(report.migrations_dir, resolve(process.cwd(), 'migrations'));
  assert.equal(report.database_env_key, null);
  assert.equal(report.issues.length, 0);
  assert.deepEqual(
    report.migrations.map((migration) => migration.file),
    ['0001_reviews.sql', '0002_subscribers.sql'],
  );
  assert.equal(report.statement_count, 8);
});

test('Neon migration runner validates migration fixtures from a supplied project root', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-neon-migrations-'));
  const migrationsDir = join(dir, 'migrations');
  mkdirSync(migrationsDir, { recursive: true });
  writeFileSync(
    join(migrationsDir, '0001_bad_d1.sql'),
    [
      'CREATE TABLE IF NOT EXISTS bad_reviews (',
      '  id INTEGER PRIMARY KEY AUTOINCREMENT,',
      '  title TEXT NOT NULL',
      ');',
      'CREATE INDEX IF NOT EXISTS idx_bad_reviews_title ON bad_reviews (title);',
      '',
    ].join('\n'),
  );

  try {
    const result = runNeonMigrate(['--check', '--json', '--project-dir', dir], { DATABASE_URL: '' });

    assert.equal(result.status, 1, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'check');
    assert.equal(report.project_dir, resolve(dir));
    assert.equal(report.migrations_dir, resolve(dir, 'migrations'));
    assert.deepEqual(report.migrations.map((migration) => migration.file), ['0001_bad_d1.sql']);
    assert.ok(
      report.issues.some(
        (issue) =>
          issue.code === 'migration-invalid' &&
          issue.path === 'migrations/0001_bad_d1.sql' &&
          /Cloudflare\/D1\/SQLite-era syntax/.test(issue.detail),
      ),
      `expected D1/SQLite syntax issue\nstdout:\n${result.stdout}`,
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('Neon migration verify mode fails closed without DATABASE_URL', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-neon-empty-env-'));
  const envPath = join(dir, '.env.test');
  writeFileSync(envPath, '# intentionally empty\n');

  try {
    const result = runNeonMigrate(['--verify', '--json', '--env', envPath], {
      DATABASE_URL: '',
    });

    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'verify');
    assert.equal(report.database_env_key, null);
    assert.equal(report.issues[0]?.code, 'database-url-missing');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('Neon migration runner accepts POSTGRES_URL fallback from Vercel env pulls without leaking the value', () => {
  const secretUrl = 'not-a-url-secret-from-vercel';
  const result = runNeonMigrate(['--verify', '--json'], {
    POSTGRES_URL: secretUrl,
  });

  assert.equal(result.status, 1);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.mode, 'verify');
  assert.equal(report.database_env_key, 'POSTGRES_URL');
  assert.equal(report.issues[0]?.code, 'schema-verify-failed');
  assert.match(report.issues[0]?.detail ?? '', /not a valid URL/);
  assert.match(report.issues[0]?.detail ?? '', /\[redacted POSTGRES_URL\]/);
  assert.doesNotMatch(result.stdout, new RegExp(secretUrl));
  assert.doesNotMatch(result.stderr, new RegExp(secretUrl));
});

test('Neon migration runner fails closed when an explicit env file is missing', () => {
  const secretUrl = 'not-a-url-secret-from-shell';
  const result = runNeonMigrate(['--verify', '--json', '--env', '.codex-missing-env'], {
    POSTGRES_URL: secretUrl,
  });

  assert.equal(result.status, 1);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.mode, 'verify');
  assert.equal(report.database_env_key, null);
  assert.equal(report.issues[0]?.code, 'env-file-missing');
  assert.equal(report.issues[0]?.path, '.codex-missing-env');
  assert.doesNotMatch(result.stdout, new RegExp(secretUrl));
  assert.doesNotMatch(result.stderr, new RegExp(secretUrl));
});

test('Neon migration env loader ignores whitespace process values before env file fallbacks', () => {
  const secretUrl = 'not-a-url-secret-from-file';
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-neon-env-'));
  const envPath = join(dir, '.env.test');
  writeFileSync(envPath, `POSTGRES_URL=${secretUrl}\n`);

  try {
    const result = runNeonMigrate(['--verify', '--json', '--env', envPath], {
      POSTGRES_URL: '   ',
    });

    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'verify');
    assert.equal(report.database_env_key, 'POSTGRES_URL');
    assert.equal(report.issues[0]?.code, 'schema-verify-failed');
    assert.match(report.issues[0]?.detail ?? '', /\[redacted POSTGRES_URL\]/);
    assert.doesNotMatch(result.stdout, new RegExp(secretUrl));
    assert.doesNotMatch(result.stderr, new RegExp(secretUrl));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('Neon migration runner fails closed on invalid arguments', () => {
  const result = runNeonMigrate(['--check', '--json', '--bad-flag'], { DATABASE_URL: '' });

  assert.equal(result.status, 1);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.mode, 'check');
  assert.equal(report.issues[0]?.code, 'argument-invalid');
});

test('Neon migration runner rejects conflicting mode flags', () => {
  const result = runNeonMigrate(['--check', '--verify', '--json', '--env', '.codex-missing-env'], {
    DATABASE_URL: '',
  });

  assert.equal(result.status, 1);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.issues[0]?.code, 'argument-invalid');
  assert.match(report.issues[0]?.detail ?? '', /choose exactly one mode flag/);
});

test('Neon migration runner requires an env file path when --env is used', () => {
  const result = runNeonMigrate(['--verify', '--json', '--env'], { DATABASE_URL: '' });

  assert.equal(result.status, 1);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.mode, 'verify');
  assert.equal(report.issues[0]?.code, 'argument-invalid');
  assert.match(report.issues[0]?.detail ?? '', /--env requires a file path/);
});
