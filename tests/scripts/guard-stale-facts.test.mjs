import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

test('stale fact guard accepts canonical facts in the working checkout', () => {
  const result = spawnSync(process.execPath, ['scripts/guard-stale-facts.mjs'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(
    result.status,
    0,
    `guard failed unexpectedly\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
  );
  assert.match(
    `${result.stdout}\n${result.stderr}`,
    /canonical ChatGPT facts present/,
  );
});
