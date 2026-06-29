import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

function today() {
  return new Date().toISOString().slice(0, 10);
}

function runCoverageQuality(projectDir, args) {
  return spawnSync(process.execPath, ['scripts/audit-coverage-quality.mjs', '--project-dir', projectDir, ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeTool(dir, slug) {
  writeFileSync(
    join(dir, 'src', 'content', 'tools', `${slug}.md`),
    `---
slug: ${slug}
status: active
---
`,
  );
}

function validComparisonBody() {
  const words = Array.from({ length: 620 }, (_, index) => `word${index}`).join(' ');
  return `
## Quick Answer

[Foo](/tools/foo/) and [Bar](/tools/bar/) both work for this fixture. ${words}

## Bottom Line

Choose the tool that fits the workflow.

## Sources

- [Foo tool](/tools/foo/)
- [Bar tool](/tools/bar/)
- [Source one](https://example.com/one)
- [Source two](https://example.com/two)
`;
}

function writeComparison(dir, name, body = validComparisonBody()) {
  writeFileSync(
    join(dir, 'src', 'content', 'comparisons', `${name}.md`),
    `---
slug: ${name}
title: "Foo vs Bar"
category: "AI testing"
seo_title: "Foo vs Bar"
meta_description: "A fixture comparison for audit coverage quality."
author: "AiPedia Editors"
last_updated: ${today()}
last_verified: ${today()}
update_frequency: "monthly"
tools: [foo, bar]
winner: depends
---
${body}
`,
  );
}

function writeFixtureProject() {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-coverage-quality-'));
  mkdirSync(join(dir, 'src', 'content', 'comparisons'), { recursive: true });
  mkdirSync(join(dir, 'src', 'content', 'tools'), { recursive: true });
  mkdirSync(join(dir, 'src', 'data'), { recursive: true });
  writeTool(dir, 'foo');
  writeTool(dir, 'bar');
  writeTool(dir, 'baz');
  writeFileSync(
    join(dir, 'src', 'data', 'comparison-policy.json'),
    JSON.stringify(
      {
        workflow_lanes: {
          'AI testing': {
            same_job: ['foo', 'bar'],
            different_job: ['baz'],
          },
        },
        blocked_pairs: [],
      },
      null,
      2,
    ),
  );
  return dir;
}

test('coverage quality changed-file mode passes when no changed comparisons are supplied', () => {
  const dir = writeFixtureProject();

  try {
    const result = runCoverageQuality(dir, ['--json', '--changed-file', 'README.md']);

    assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'changed');
    assert.equal(report.files_checked, 0);
    assert.deepEqual(report.failures, []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('coverage quality changed-file mode checks only supplied comparison files', () => {
  const dir = writeFixtureProject();
  writeComparison(dir, 'foo-vs-bar');
  writeComparison(dir, 'bad-vs-bar', '## Quick Answer\n\nTODO\n');

  try {
    const passing = runCoverageQuality(dir, ['--json', '--changed-file', 'src/content/comparisons/foo-vs-bar.md']);
    assert.equal(passing.status, 0, `stdout:\n${passing.stdout}\nstderr:\n${passing.stderr}`);
    const passingReport = JSON.parse(passing.stdout);
    assert.equal(passingReport.files_checked, 1);
    assert.deepEqual(passingReport.files, ['src/content/comparisons/foo-vs-bar.md']);

    const failing = runCoverageQuality(dir, ['--json', '--changed-file', 'src/content/comparisons/bad-vs-bar.md']);
    assert.equal(failing.status, 1);
    const failingReport = JSON.parse(failing.stdout);
    assert.equal(failingReport.mode, 'changed');
    assert.equal(failingReport.files_checked, 1);
    assert.ok(failingReport.failures.some((failure) => /missing required "## Bottom Line" section/.test(failure)));
    assert.ok(failingReport.failures.some((failure) => /contains placeholder text/.test(failure)));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('coverage quality changed package wrapper can be narrowed with changed-file', () => {
  const dir = writeFixtureProject();
  writeComparison(dir, 'foo-vs-bar');
  writeComparison(dir, 'bad-vs-bar', '## Quick Answer\n\nTODO\n');

  try {
    const result = runCoverageQuality(dir, [
      '--json',
      '--changed',
      '--changed-file',
      'src/content/comparisons/foo-vs-bar.md',
    ]);

    assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
    const report = JSON.parse(result.stdout);
    assert.equal(report.mode, 'changed');
    assert.equal(report.files_checked, 1);
    assert.deepEqual(report.files, ['src/content/comparisons/foo-vs-bar.md']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('coverage quality rejects raw Markdown tables on changed comparison pages', () => {
  const dir = writeFixtureProject();
  writeComparison(
    dir,
    'foo-vs-bar',
    `${validComparisonBody()}

| Buyer question | Better pick |
|---|---|
| Mobile page | Foo |
`,
  );

  try {
    const result = runCoverageQuality(dir, ['--json', '--changed-file', 'src/content/comparisons/foo-vs-bar.md']);

    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.mode, 'changed');
    assert.ok(report.failures.some((failure) => /raw Markdown table/.test(failure)));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('coverage quality allows comparison pages with a shared workflow lane', () => {
  const dir = writeFixtureProject();
  writeComparison(dir, 'foo-vs-bar');

  try {
    const result = runCoverageQuality(dir, ['--json', '--file', 'src/content/comparisons/foo-vs-bar.md']);

    assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('coverage quality rejects live comparison pages without a shared workflow lane', () => {
  const dir = writeFixtureProject();
  writeComparison(
    dir,
    'foo-vs-baz',
    validComparisonBody()
      .replaceAll('/tools/bar/', '/tools/baz/')
      .replaceAll('[Bar]', '[Baz]'),
  );
  const comparisonPath = join(dir, 'src', 'content', 'comparisons', 'foo-vs-baz.md');
  writeFileSync(
    comparisonPath,
    readFileSync(comparisonPath, 'utf8').replace('tools: [foo, bar]', 'tools: [foo, baz]'),
  );

  try {
    const result = runCoverageQuality(dir, ['--json', '--file', 'src/content/comparisons/foo-vs-baz.md']);

    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.ok(report.failures.some((failure) => /do not share an approved workflow lane/.test(failure)));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('coverage quality all mode still reports full comparison debt', () => {
  const dir = writeFixtureProject();
  writeComparison(dir, 'foo-vs-bar');
  writeComparison(dir, 'bad-vs-bar', '## Quick Answer\n\nTODO\n');

  try {
    const result = runCoverageQuality(dir, ['--json', '--all']);

    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.mode, 'all');
    assert.equal(report.files_checked, 2);
    assert.ok(report.failures.some((failure) => failure.includes('bad-vs-bar.md')));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('coverage quality rejects ambiguous target modes', () => {
  const dir = writeFixtureProject();

  try {
    const result = runCoverageQuality(dir, ['--json', '--all', '--changed']);

    assert.equal(result.status, 2);
    const report = JSON.parse(result.stdout);
    assert.equal(report.mode, 'argument-error');
    assert.ok(report.argument_issues.some((issue) => /choose exactly one/.test(issue.detail)));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('coverage quality changed mode fails closed when an explicit base cannot be diffed', () => {
  const dir = writeFixtureProject();

  try {
    const result = runCoverageQuality(dir, ['--json', '--changed', '--base', 'origin/master']);

    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.mode, 'changed');
    assert.ok(report.failures.some((failure) => /could not diff changed comparisons against origin\/master/.test(failure)));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
