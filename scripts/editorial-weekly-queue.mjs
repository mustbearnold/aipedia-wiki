#!/usr/bin/env node
// Editorial helper: weekly Top-N tool fact review queue.
// Wraps audit-freshness-queue and prints a compact grouped checklist for humans.

import { spawnSync } from 'node:child_process';

const argv = new Set(process.argv.slice(2));
const JSON_MODE = argv.has('--json');

function argValue(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  const value = process.argv[index + 1];
  return value ?? fallback;
}

function intArg(name, fallback) {
  const raw = argValue(name, null);
  if (raw === null) return fallback;
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) ? value : fallback;
}

function runFreshness(windowDays) {
  const result = spawnSync(
    process.execPath,
    ['scripts/audit-freshness-queue.mjs', '--json', '--window-days', String(windowDays)],
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

const windowDays = intArg('--window-days', 30);
const limitFacts = intArg('--limit', 50);

const report = runFreshness(windowDays);
const topQueue = Array.isArray(report.queues?.top_review_queue) ? report.queues.top_review_queue : [];
const tools = groupTopQueue(topQueue, limitFacts);

if (JSON_MODE) {
  process.stdout.write(
    `${JSON.stringify(
      {
        generated_at: report.generated_at,
        window_days: report.review_window_days,
        limit_facts: limitFacts,
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

