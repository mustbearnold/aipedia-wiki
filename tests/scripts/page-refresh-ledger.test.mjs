import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

test('page refresh ledger tracks the news hub but excludes individual news articles', () => {
  const ledger = fs.readFileSync('PAGE_REFRESH_LEDGER.md', 'utf8');

  assert.match(ledger, /\| \d{4}-\d{2}-\d{2} \| \/news\/ \| Static page \|/);
  assert.doesNotMatch(ledger, /\| \d{4}-\d{2}-\d{2} \| \/news\/\d{4}-\d{2}-\d{2}-[^|]+\/ \| News \|/);
});
