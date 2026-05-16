import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const source = readFileSync(join(process.cwd(), 'src/layouts/ToolLayout.astro'), 'utf8');

test('tool layout wraps missed update-log sections into native details accordions', () => {
  assert.match(source, /wrapMissedUpdateSections/);
  assert.match(source, /'recent-changes'/);
  assert.match(source, /'what-changed-recently'/);
  assert.match(source, /details\.className = 'gt-section-collapse'/);
  assert.match(source, /heading\.closest\('details\.gt-section-collapse'\)/);
});
