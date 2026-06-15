#!/usr/bin/env node
// Editorial helper: weekly Top-N tool fact review queue.
// Wraps audit-freshness-queue and prints a compact grouped checklist for humans.

import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const KNOWN_FLAGS = new Set(['--json', '--window-days', '--limit', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--window-days', '--limit', '--project-dir', '--root']);
const argumentIssues = collectArgumentIssues();

function valueFor(name) {
  const inlineArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (inlineArg) return inlineArg.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function hasFlag(name) {
  return args.includes(name) || args.some((arg) => arg.startsWith(`${name}=`));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of args.entries()) {
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] ?? '';
      if (!VALUE_FLAGS.has(previous)) issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
    if (VALUE_FLAGS.has(name)) {
      const value = arg.includes('=') ? arg.slice(name.length + 1) : args[index + 1] ?? '';
      if (!value || value.startsWith('-')) {
        issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
      } else if (['--window-days', '--limit'].includes(name) && !/^\d+$/.test(value)) {
        issues.push({ code: 'argument-invalid', detail: `${name} must be a non-negative integer` });
      }
    }
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/editorial-weekly-queue.mjs --window-days 30 --limit 50',
    '  node scripts/editorial-weekly-queue.mjs --json --window-days 14',
    '',
    'Options:',
    '  --json                 Emit a structured grouped queue.',
    '  --window-days <days>   Include fact reviews due within this many days.',
    '  --limit <count>        Maximum fact rows to group into tool checklists.',
    '  --project-dir <dir>    Audit another project root.',
    '  --root <dir>           Alias for --project-dir.',
  ].join('\n');
}

function emitArgumentFailure(windowDays, limitFacts) {
  const report = {
    ok: false,
    mode: 'argument-error',
    generated_at: new Date().toISOString(),
    window_days: windowDays,
    limit_facts: limitFacts,
    argument_issues: argumentIssues,
    totals: {},
    tools: [],
  };

  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    console.error('[editorial-weekly-queue] invalid arguments');
    for (const issue of argumentIssues) console.error(`- ${issue.detail}`);
  }
}

function argValue(name, fallback) {
  return valueFor(name) ?? fallback;
}

function intArg(name, fallback) {
  const raw = argValue(name, null);
  if (raw === null) return fallback;
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) ? value : fallback;
}

function runFreshness(windowDays, projectDir) {
  const freshnessArgs = ['scripts/audit-freshness-queue.mjs', '--json', '--window-days', String(windowDays)];
  if (projectDir) freshnessArgs.push('--project-dir', projectDir);

  const result = spawnSync(
    process.execPath,
    freshnessArgs,
    { encoding: 'utf8' },
  );
  if (result.status !== 0) {
    process.stderr.write(result.stdout || '');
    process.stderr.write(result.stderr || '');
    process.exit(result.status ?? 1);
  }
  return JSON.parse(result.stdout);
}

function groupTopQueue(items, limitFacts) {
  const grouped = new Map();
  for (const item of items.slice(0, limitFacts)) {
    const existing =
      grouped.get(item.slug) ??
      ({
        slug: item.slug,
        title: item.title,
        path: item.path,
        comparison_mentions: item.comparison_mentions ?? 0,
        soonest_due_in_days: item.due_in_days ?? null,
        facts: [],
      });
    if (typeof item.due_in_days === 'number') {
      existing.soonest_due_in_days =
        existing.soonest_due_in_days === null
          ? item.due_in_days
          : Math.min(existing.soonest_due_in_days, item.due_in_days);
    }
    existing.facts.push({
      key: item.key,
      volatility: item.volatility ?? 'unspecified',
      next_review_at: item.next_review_at ?? '',
      due_in_days: item.due_in_days ?? null,
      source_id: item.source_id ?? '',
    });
    grouped.set(item.slug, existing);
  }
  return [...grouped.values()].sort((a, b) => {
    const due = (a.soonest_due_in_days ?? 9999) - (b.soonest_due_in_days ?? 9999);
    if (due !== 0) return due;
    return (b.comparison_mentions ?? 0) - (a.comparison_mentions ?? 0) || a.slug.localeCompare(b.slug);
  });
}

function printQueue(report, tools) {
  console.log(`# Weekly tool update queue`);
  console.log(`Generated: ${report.generated_at}`);
  console.log(`Window: ${report.review_window_days} days`);
  console.log(
    `Totals: due_now=${report.totals.due_now}, due_soon=${report.totals.due_soon}, tools_dead=${report.totals.tools_dead ?? 0}`,
  );
  console.log('');

  for (const tool of tools) {
    const due = tool.soonest_due_in_days ?? '?';
    console.log(`- ${tool.title} (\`${tool.slug}\`) — due in ${due}d — mentions: ${tool.comparison_mentions}`);
    console.log(`  - page: ${tool.path}`);
    for (const fact of tool.facts) {
      const dueIn = fact.due_in_days ?? '?';
      const next = fact.next_review_at || '?';
      const src = fact.source_id ? ` (${fact.source_id})` : '';
      console.log(`  - [ ] ${fact.key} — ${fact.volatility} — due ${next} (${dueIn}d)${src}`);
    }
  }
}

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const windowDays = intArg('--window-days', 30);
const limitFacts = intArg('--limit', 50);
const projectDir = valueFor('--project-dir') || valueFor('--root') || '';

if (argumentIssues.length > 0) {
  emitArgumentFailure(windowDays, limitFacts);
  process.exit(1);
}

const report = runFreshness(windowDays, projectDir);
const topQueue = Array.isArray(report.queues?.top_review_queue) ? report.queues.top_review_queue : [];
const tools = groupTopQueue(topQueue, limitFacts);

if (JSON_MODE) {
  process.stdout.write(
    `${JSON.stringify(
      {
        ok: true,
        mode: 'weekly-queue',
        generated_at: report.generated_at,
        project_dir: report.project_dir ?? '',
        window_days: report.review_window_days,
        limit_facts: limitFacts,
        argument_issues: [],
        totals: report.totals,
        tools,
      },
      null,
      2,
    )}\n`,
  );
} else {
  printQueue(report, tools);
}

