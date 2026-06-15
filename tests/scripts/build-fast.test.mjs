import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('fast build audits the nested Vercel static client output when present', () => {
  const script = readFileSync('scripts/build-fast.mjs', 'utf8');

  assert.match(script, /existsSync\(join\(PROJECT_DIR,\s*'dist-fast',\s*'client'\)\)/);
  assert.match(script, /const fastStaticDir =/);
  assert.match(script, /\['scripts\/audit-indexability\.mjs', '--dist', fastStaticDir\]/);
  assert.match(script, /\['scripts\/audit-commercial-cta\.mjs', '--dist', fastStaticDir\]/);
  assert.doesNotMatch(script, /\['scripts\/audit-indexability\.mjs', '--dist', 'dist-fast'\]/);
  assert.doesNotMatch(script, /\['scripts\/audit-commercial-cta\.mjs', '--dist', 'dist-fast'\]/);
});
