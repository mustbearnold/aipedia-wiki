import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

test('news rendering audit catches missing source and media surfaces', () => {
  const result = spawnSync(process.execPath, ['scripts/audit-news-rendering.mjs'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /news page\(s\) have sources, active-month coverage, and required OG\/thumb assets/);
});

test('source enhancer ignores explicit not-prose source callouts', () => {
  const source = readFileSync(join(process.cwd(), 'src/components/godtier/BodyEnhancements.astro'), 'utf8');

  assert.match(source, /document\.querySelectorAll\('article\.gt-body #sources'\)/);
  assert.match(source, /!candidate\.closest\('\.not-prose'\)/);
});
