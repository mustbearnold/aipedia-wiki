import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

function run(dir, today) {
  const r = spawnSync(process.execPath, ['scripts/audit-passed-dates.mjs', '--json', '--dir', dir, '--today', today], { encoding: 'utf8' });
  return JSON.parse(r.stdout);
}

test('passed-date detector flags future-framing on now-past dates and ignores timestamps/effective dates', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-passed-dates-'));
  try {
    writeFileSync(join(dir, 'a.md'), `---
title: t
---

GitHub will retire the model on May 15, 2026 across Copilot.
The plan is verified June 12, 2026 and stays current.
The feature ships from June 1, 2026 onward.
The beta is expected to launch in Q1 2026 broadly.
`);
    const report = run(dir, '2026-06-13');
    const dates = report.findings.map((f) => f.date).sort();
    // Flags: "will retire ... May 15" and "expected to launch ... Q1 2026" (end 2026-03-31).
    assert.deepEqual(dates, ['2026-03-31', '2026-05-15']);
    // Does NOT flag the "verified June 12" timestamp or the "from June 1" effective date.
    assert.ok(!report.findings.some((f) => f.date === '2026-06-12'), 'verification timestamp must not be flagged');
    assert.ok(!report.findings.some((f) => f.date === '2026-06-01'), 'effective "from <date>" must not be flagged');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('passed-date detector reports nothing when the dates are still in the future', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-passed-dates-future-'));
  try {
    writeFileSync(join(dir, 'a.md'), `---
title: t
---

The model will retire on May 15, 2026.
`);
    const report = run(dir, '2026-05-01');
    assert.equal(report.count, 0, 'May 15 is future relative to May 1');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
