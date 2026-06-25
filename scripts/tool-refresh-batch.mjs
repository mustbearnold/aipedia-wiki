#!/usr/bin/env node
// Plan batched oldest-first tool refreshes from the freshness queue.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const JSON_MODE = args.includes('--json');
const LIMIT = numberArg('--limit', 60);
const WINDOW_DAYS = numberArg('--window-days', 365);
const MAX_CONCURRENT_WORKERS = numberArg('--max-workers', 6);
const TOOLS_PER_WORKER = numberArg('--tools-per-worker', 10);
const INCLUDE_SAME_DAY = args.includes('--include-same-day');
const EXCLUDE_RECENT_DAYS = numberArg('--exclude-recent-days', 1, { allowZero: true });
const explicitExcludeVerifiedDate = valueFor('--exclude-verified-date');
const EXCLUDE_VERIFIED_DATE = explicitExcludeVerifiedDate || isoDateDaysAgo(EXCLUDE_RECENT_DAYS);
const HELP_MODE = args.includes('--help') || args.includes('-h');
const AGENT_BRIEFS_MODE = args.includes('--agents') || args.includes('--agent-briefs');

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

function usage() {
  return [
    'Usage:',
    '  node scripts/tool-refresh-batch.mjs --limit 60 --max-workers 6 --tools-per-worker 10',
    '  node scripts/tool-refresh-batch.mjs --limit 60 --max-workers 6 --tools-per-worker 10 --json',
    '  node scripts/tool-refresh-batch.mjs --limit 60 --max-workers 6 --tools-per-worker 10 --agents',
    '',
    'Options:',
    '  --limit <n>          Number of tool pages to include. Default: 60.',
    '  --max-workers <n>    Maximum worker subagents to launch at once. Default: 6.',
    '  --tools-per-worker <n>  Maximum tool files assigned to each worker. Default: 10.',
    '  --window-days <n>    Freshness queue window. Default: 365.',
    '  --exclude-recent-days <n>  Skip tools verified in the last n days plus today. Default: 1.',
    '  --exclude-verified-date <YYYY-MM-DD>  Skip tools already verified on or after this date. Overrides --exclude-recent-days.',
    '  --include-same-day    Include tools already verified today.',
    '  --json               Emit structured JSON.',
    '  --agents             Print shard worker briefs plus an integrator brief.',
    '  --agent-briefs       Alias for --agents.',
    '  --project-dir <dir>  Audit another project root.',
    '  --root <dir>         Alias for --project-dir.',
  ].join('\n');
}

function valueFor(name) {
  const inlineArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (inlineArg) return inlineArg.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function numberArg(name, fallback, options = {}) {
  const rawValue = valueFor(name);
  if (rawValue === undefined) return fallback;
  const value = Number.parseInt(rawValue, 10);
  const minValue = options.allowZero ? 0 : 1;
  return Number.isFinite(value) && value >= minValue ? value : fallback;
}

function projectPath(path) {
  return relative(PROJECT_DIR, path).replace(/\\/g, '/');
}

function stripYamlQuotes(value) {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) return '';
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function scalar(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  if (!match) return '';
  const value = stripYamlQuotes(match[1]);
  if (value === '[]' || value === '{}') return '';
  return value;
}

function readToolMeta(relativePath) {
  const path = join(PROJECT_DIR, relativePath);
  if (!existsSync(path)) return {};
  const raw = readFileSync(path, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const frontmatter = match?.[1] ?? '';
  return {
    category: scalar(frontmatter, 'category'),
    last_verified: scalar(frontmatter, 'last_verified'),
    last_updated: scalar(frontmatter, 'last_updated'),
  };
}

function loadSourceRegistry() {
  const registryPath = join(PROJECT_DIR, 'src', 'data', 'source-registry.json');
  if (!existsSync(registryPath)) return new Map();
  const parsed = JSON.parse(readFileSync(registryPath, 'utf8'));
  const sources = Array.isArray(parsed.sources) ? parsed.sources : [];
  return new Map(sources.map((source) => [source.id, source]));
}

function freshnessReport() {
  const scriptPath = join(PROJECT_DIR, 'scripts', 'audit-freshness-queue.mjs');
  const output = execFileSync(
    process.execPath,
    [scriptPath, '--json', '--window-days', String(WINDOW_DAYS), '--project-dir', PROJECT_DIR],
    { cwd: PROJECT_DIR, encoding: 'utf8' },
  );
  return JSON.parse(output);
}

function addUnique(list, value) {
  if (value && !list.includes(value)) list.push(value);
}

function buildBatch(report) {
  const sourceRegistry = loadSourceRegistry();
  const bySlug = new Map();
  const queue = [
    ...(report.queues?.top_review_queue ?? []),
    ...(report.queues?.due_now ?? []),
    ...(report.queues?.due_soon ?? []),
    ...(report.queues?.top_baseline_upgrades ?? []),
  ];

  for (const item of queue) {
    if (!item.slug || !item.path) continue;
    if (!bySlug.has(item.slug)) {
      const meta = readToolMeta(item.path);
      if (!INCLUDE_SAME_DAY && meta.last_verified && meta.last_verified >= EXCLUDE_VERIFIED_DATE) {
        continue;
      }
      bySlug.set(item.slug, {
        slug: item.slug,
        title: item.title || item.slug,
        path: item.path,
        route: `/tools/${item.slug}/`,
        category: meta.category || '',
        category_route: meta.category ? `/categories/${meta.category}/` : '',
        last_verified: meta.last_verified || '',
        last_updated: meta.last_updated || '',
        due_in_days: item.due_in_days,
        comparison_mentions: item.comparison_mentions ?? 0,
        facts: [],
        source_ids: [],
        sources: [],
      });
    }

    const entry = bySlug.get(item.slug);
    addUnique(entry.facts, item.key);
    addUnique(entry.source_ids, item.source_id);
    const source = sourceRegistry.get(item.source_id);
    if (source && !entry.sources.some((registeredSource) => registeredSource.id === source.id)) {
      entry.sources.push({
        id: source.id,
        label: source.label || '',
        url: source.url || '',
        type: source.type || '',
        trust_tier: source.trust_tier || '',
        volatility: source.volatility || '',
        last_checked: source.last_checked || '',
      });
    }
    entry.due_in_days = Math.min(entry.due_in_days ?? item.due_in_days, item.due_in_days ?? entry.due_in_days);
    entry.comparison_mentions = Math.max(entry.comparison_mentions, item.comparison_mentions ?? 0);
  }

  return [...bySlug.values()].slice(0, LIMIT);
}

function buildCommands(batch) {
  const toolFiles = batch.map((tool) => tool.path);
  const sourceIds = [...new Set(batch.flatMap((tool) => tool.source_ids).filter(Boolean))].sort();
  const routes = [];
  for (const tool of batch) {
    addUnique(routes, tool.route);
    addUnique(routes, tool.category_route);
  }
  addUnique(routes, '/tools/');
  addUnique(routes, '/categories/');

  return {
    per_tool_quality: batch.map(
      (tool) => `npm run audit:tool-quality -- --file ${tool.path.replace(/\//g, '\\')}`,
    ),
    batch_fast_check: [
      'npm run ledger:pages',
      'npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json',
    ],
    source_health: sourceIds.length ? [
      `npm run audit:sources -- --json --limit 0 ${sourceIds.map((sourceId) => `--source-id ${sourceId}`).join(' ')}`,
      `npm run audit:sources -- --live --limit 0 ${sourceIds.map((sourceId) => `--source-id ${sourceId}`).join(' ')}`,
      `npm run audit:sources -- --live --update-snapshots --limit 0 ${sourceIds.map((sourceId) => `--source-id ${sourceId}`).join(' ')}`,
    ] : [],
    batch_close: [
      'npm run ledger:pages',
      'npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json',
      'npm run typecheck',
      'npm run build:fast',
      `npm run qa:route -- ${routes.map((route) => `--route ${route}`).join(' ')} --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client --concurrency 4`,
    ],
    routes,
    tool_files: toolFiles,
    source_ids: sourceIds,
  };
}

function dateContext() {
  const now = new Date();
  const currentDate = now.toISOString().slice(0, 10);
  const currentMonthYear = now.toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  return { currentDate, currentMonthYear };
}

function isoDateDaysAgo(daysAgo) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - daysAgo);
  return date.toISOString().slice(0, 10);
}

function chunk(list, size) {
  const chunks = [];
  for (let index = 0; index < list.length; index += size) {
    chunks.push(list.slice(index, index + size));
  }
  return chunks;
}

function toolLabel(tool) {
  return `${tool.title} (${tool.slug})`;
}

function workerId(index) {
  return `tool-refresh-shard-${String(index + 1).padStart(2, '0')}`;
}

function buildAgentBriefs(batch, commands) {
  const { currentDate, currentMonthYear } = dateContext();
  const sharedFiles = [
    'PAGE_REFRESH_LEDGER.md',
    'src/data/source-registry.json',
    'src/content/categories/*.md',
    'src/pages/index.astro',
    'src/pages/tools/index.astro',
    'src/pages/categories/index.astro',
    'src/pages/llms*.txt.ts',
    'src/pages/news/rss.xml.ts',
  ];
  const toolShards = chunk(batch, TOOLS_PER_WORKER);

  const workerBriefs = toolShards.map((tools, index) => {
    const shardSourceIds = [...new Set(tools.flatMap((tool) => tool.source_ids).filter(Boolean))];
    const sourceHealthChecks = shardSourceIds.length ? [
      `- npm run audit:sources -- --json --limit 0 ${shardSourceIds.map((sourceId) => `--source-id ${sourceId}`).join(' ')}`,
    ] : [];

    return {
      id: workerId(index),
      agent_type: 'worker',
      title: `Refresh shard ${index + 1}: ${tools.map((tool) => tool.slug).join(', ')}`,
      tool_slugs: tools.map((tool) => tool.slug),
      owned_paths: tools.map((tool) => tool.path),
      source_ids: shardSourceIds,
      read_context: [
        'AGENTS.md',
        '.agent/CURRENT_STATUS.md',
        '.agent/OPERATING_RULES.md',
        '.agent/LOOPS.md',
        ...tools.map((tool) => tool.path),
      ],
      do_not_edit: sharedFiles,
      routes: tools.map((tool) => tool.route),
      parent_routes: [...new Set(tools.map((tool) => tool.category_route).filter(Boolean))],
      prompt: [
        `You are shard worker ${index + 1} in a parallel AiPedia tool-refresh batch. Refresh only this ${tools.length}-tool shard:`,
        ...tools.map((tool, toolIndex) => `${toolIndex + 1}. ${toolLabel(tool)}: ${tool.path}`),
        '',
        `Current date: ${currentDate}. Every web search for AI, company, product, pricing, model, or news facts must include "${currentMonthYear}". Verify volatile facts against current primary sources or named reporting before editing.`,
        '',
        'Ownership:',
        `- You may edit only these files: ${tools.map((tool) => tool.path).join(', ')}.`,
        `- Do not edit shared files: ${sharedFiles.join(', ')}.`,
        '- Do not run typecheck, build, or route QA. The integrator will run shared gates once for the whole batch.',
        '',
        'Required work:',
        '- Refresh current pricing, plan, API/model/access, affiliate, recent-change, best-plan, watch-out, and alternative guidance for each tool when supported by sources.',
        '- Keep the tool page in the shared decision-spine format: fast verdict, best plan, fit, watch-out, alternatives, recent changes, pricing, sources.',
        '- Update last_verified and fact verified_at fields to the current date only for facts you actually checked.',
        '- If you need a new source-registry row, do not edit the registry. Include the proposed source id, title, URL, type, trust tier, volatility, and last_checked in your final report.',
        '',
        'Worker verification:',
        ...tools.map((tool) => `- npm run audit:tool-quality -- --file ${tool.path.replace(/\//g, '\\')}`),
        ...tools.map((tool) => `- node scripts\\audit-provenance-pricing.mjs --changed-file ${tool.path.replace(/\//g, '\\')} --json`),
        ...sourceHealthChecks,
        '- node scripts\\guard-em-dashes.mjs',
        '',
        'Final report:',
        '- Changed file paths, grouped by tool.',
        '- Source URLs checked and any source-registry rows the integrator must add or update, grouped by tool.',
        '- Parent/category/top-layer surfaces the integrator must inspect, grouped by tool.',
        '- Verification commands run and results.',
        '- Anything blocked or not verified.',
      ].join('\n'),
    };
  });
  const maxParallelWorkers = Math.min(MAX_CONCURRENT_WORKERS, Math.max(workerBriefs.length, 1));

  const integratorBrief = {
    id: 'tool-refresh-integrator',
    agent_type: 'main',
    title: `Integrate ${batch.length} refreshed tool page(s)`,
    owned_paths: [
      ...commands.tool_files,
      'PAGE_REFRESH_LEDGER.md',
      'src/data/source-registry.json',
      ...batch.map((tool) => tool.category ? `src/content/categories/${tool.category}.md` : '').filter(Boolean),
      '.agent/CURRENT_STATUS.md',
      '.agent/PLANS.md',
      '.agent/WORK_LOG.md',
      '.agent/loop-runs/',
    ],
    prompt: [
      `Integrate the ${batch.length} parallel tool-refresh worker result(s).`,
      '',
      `Worker fanout: launch at most ${maxParallelWorkers} worker subagent(s) at once. Each worker owns up to ${TOOLS_PER_WORKER} tool files. Wait for workers, close completed agents so they stop counting against the app limit, then launch any remaining shard or finish remaining tool files in-thread with the same write boundary.`,
      '',
      'Merge policy:',
      '- Review each worker diff and source list before accepting it.',
      '- Add or update shared source-registry rows once, after deduplicating IDs and URLs.',
      '- Use the source-health commands to check registered source reachability and snapshot changes before deciding which facts need deeper refresh.',
      '- Update affected parent category hubs, /tools/, /categories/, top-layer summaries, internal links, and PAGE_REFRESH_LEDGER.md only after all worker tool edits are integrated.',
      '- Keep one final verification closeout. Do not run one build per tool.',
      '',
      'Optional source-health commands:',
      ...commands.source_health.map((command) => `- ${command}`),
      '',
      'Closeout commands:',
      ...commands.batch_close.map((command) => `- ${command}`),
    ].join('\n'),
  };

  return {
    strategy: `${maxParallelWorkers} parallel shard worker(s), up to ${TOOLS_PER_WORKER} tool(s) per worker, one integrator for shared files and final gates`,
    batch_size: batch.length,
    tools_per_worker: TOOLS_PER_WORKER,
    max_parallel_workers: maxParallelWorkers,
    worker_waves: chunk(workerBriefs.map((brief) => brief.id), maxParallelWorkers),
    worker_write_rule: 'Each worker owns only the tool markdown files listed in its shard. Shared ledgers, registries, hubs, and builds stay with the integrator.',
    worker_briefs: workerBriefs,
    integrator_brief: integratorBrief,
  };
}

const report = freshnessReport();
const batch = buildBatch(report);
const commands = buildCommands(batch);
const agentBriefs = buildAgentBriefs(batch, commands);
const result = {
  ok: report.ok,
  generated_at: new Date().toISOString(),
  project_dir: PROJECT_DIR,
  limit: LIMIT,
  window_days: WINDOW_DAYS,
  tools_per_worker: TOOLS_PER_WORKER,
  exclude_recent_days: INCLUDE_SAME_DAY || explicitExcludeVerifiedDate ? null : EXCLUDE_RECENT_DAYS,
  exclude_verified_date: INCLUDE_SAME_DAY ? null : EXCLUDE_VERIFIED_DATE,
  totals: report.totals,
  batch,
    commands,
    agent_briefs: agentBriefs,
    protocol: [
      'Verify current sources for every tool in the batch before editing.',
      'Use the scoped source-health commands when registered source hashes or reachability can reduce unnecessary manual review.',
      'Update tool pages, affected parent hubs, source registry rows, and PAGE_REFRESH_LEDGER.md together.',
    `If using subagents, launch at most ${agentBriefs.max_parallel_workers} shard worker(s) at once, with up to ${agentBriefs.tools_per_worker} tool(s) per worker.`,
    'Run per-tool quality checks while editing.',
    'Run npm run tool:refresh:batch:check after ledger generation, then one expensive typecheck/build/route-QA closeout for the batch.',
    'If one tool blocks on source access, remove it from the batch and continue with the rest.',
  ],
};

if (JSON_MODE) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} else {
  console.log(`Tool refresh batch (${batch.length} tool${batch.length === 1 ? '' : 's'}):`);
  for (const [index, tool] of batch.entries()) {
    const facts = tool.facts.length ? tool.facts.join(', ') : 'no due facts listed';
    const sources = tool.source_ids.length ? tool.source_ids.join(', ') : 'no source ids listed';
    console.log(`${index + 1}. ${tool.title} (${tool.slug})`);
    console.log(`   path: ${projectPath(join(PROJECT_DIR, tool.path))}`);
    console.log(`   route: ${tool.route}`);
    if (tool.category_route) console.log(`   parent: ${tool.category_route}`);
    console.log(`   facts: ${facts}`);
    console.log(`   sources: ${sources}`);
  }

  console.log('\nBatch closeout commands:');
  for (const command of commands.batch_close) console.log(`- ${command}`);

  if (AGENT_BRIEFS_MODE) {
    console.log('\nParallel subagent briefs:');
    console.log(`Strategy: ${agentBriefs.strategy}`);
    console.log(`Max parallel workers: ${agentBriefs.max_parallel_workers}`);
    console.log(`Tools per worker: ${agentBriefs.tools_per_worker}`);
    console.log(`Write rule: ${agentBriefs.worker_write_rule}`);
    for (const brief of agentBriefs.worker_briefs) {
      console.log(`\n## ${brief.title}`);
      console.log(brief.prompt);
    }
    console.log(`\n## ${agentBriefs.integrator_brief.title}`);
    console.log(agentBriefs.integrator_brief.prompt);
  }
}
