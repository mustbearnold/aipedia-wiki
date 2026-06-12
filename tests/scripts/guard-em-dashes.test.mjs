import assert from 'node:assert/strict';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import { writeFileSync, rmSync } from 'node:fs';

function runGuard() {
  return spawnSync('node', ['scripts/guard-em-dashes.mjs', '--json'], { encoding: 'utf8' });
}

test('em-dash guard passes on current content (no em dashes in rendered output)', () => {
  const res = runGuard();
  const out = JSON.parse(res.stdout);
  assert.equal(res.status, 0, `guard should pass; failures: ${out.failures.join('; ')}`);
  assert.equal(out.ok, true);
  assert.ok(out.scanned > 500, 'should scan the full content tree');
});

test('em-dash guard catches a literal em dash and a prose " -- " but ignores code spans', () => {
  const tmp = 'src/content/tools/__em_dash_guard_test__.md';
  writeFileSync(
    tmp,
    '---\ntitle: Test\n---\n\nThis prose has an em dash — here.\nAnd a separator -- here.\nBut code `npm test -- path` is fine.\n',
  );
  try {
    const res = runGuard();
    const out = JSON.parse(res.stdout);
    assert.equal(res.status, 2, 'guard should fail on planted violations');
    const mine = out.failures.filter((f) => f.includes('__em_dash_guard_test__'));
    assert.ok(mine.some((f) => f.includes('literal em dash')), 'should flag the literal em dash');
    assert.ok(mine.some((f) => f.includes(' -- ')), 'should flag the prose " -- "');
    // The code-span `npm test -- path` must not produce a separate failure;
    // exactly two violations (em dash + prose separator) are expected.
    assert.equal(mine.length, 2, `expected 2 violations, got ${mine.length}: ${mine.join(' | ')}`);
  } finally {
    rmSync(tmp, { force: true });
  }
});
