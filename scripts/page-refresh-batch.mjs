#!/usr/bin/env node
// Plan oldest-first non-tool page refresh batches from PAGE_REFRESH_LEDGER.md.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const LEDGER_PATH = resolve(PROJECT_DIR, valueFor('--ledger') || 'PAGE_REFRESH_LEDGER.md');
const JSON_MODE = args.includes('--json');
const AGENTS_MODE = args.includes('--agents') || args.includes('--agent-briefs');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const LIMIT = numberArg('--limit', 60);
const MAX_WORKERS = numberArg('--max-workers', 6);
const PAGES_PER_WORKER = numberArg('--pages-per-worker', 10);
const INCLUDE_TOOLS = args.includes('--include-tools');
const INCLUDE_STATIC = !args.includes('--exclude-static');
const TYPE_FILTER = valuesFor('--type');
const PROMPT_DIR = valueFor('--write-agent-prompts');
const REPORT_DIR = valueFor('--report-dir') || 'local/tmp/page-refresh-reports';
const WRITE_REPORT_SCAFFOLDS = args.includes('--write-report-scaffolds');
const TIMING_DIR = valueFor('--timing-dir') || 'local/tmp/page-refresh-timings';

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

function usage() {
  return [
    'Usage:',
    '  node scripts/page-refresh-batch.mjs --limit 60 --max-workers 6 --pages-per-worker 10',
    '  node scripts/page-refresh-batch.mjs --limit 60 --json',
    '  node scripts/page-refresh-batch.mjs --type Guide --type Comparison --json',
    '',
    'Options:',
    '  --limit <n>             Number of pages to include. Default: 60.',
    '  --max-workers <n>       Maximum worker subagents to launch at once. Default: 6.',
    '  --pages-per-worker <n>  Maximum pages assigned to each worker. Default: 10.',
    '  --type <name>           Include only ledger rows with this type. Repeatable.',
    '  --include-tools         Include Tool pages. Default: false.',
    '  --exclude-static        Exclude Static page rows.',
    '  --ledger <path>         Ledger markdown path. Default: PAGE_REFRESH_LEDGER.md.',
    '  --json                  Emit structured JSON.',
    '  --agents                Print shard worker prompts plus an integrator brief.',
    '  --write-agent-prompts <dir>',
    '                          Write exact worker and integrator prompts to files.',
    '  --report-dir <dir>      Worker JSON report directory. Default: local/tmp/page-refresh-reports.',
    '  --write-report-scaffolds',
    '                          Write starter worker JSON report files into --report-dir.',
    '  --timing-dir <dir>      Timing artifact directory. Default: local/tmp/page-refresh-timings.',
    '  --project-dir <dir>     Plan another project root.',
    '  --root <dir>            Alias for --project-dir.',
  ].join('\n');
}

function valueFor(name) {
  const inlineArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (inlineArg) return inlineArg.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function valuesFor(name) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === name && args[index + 1]) values.push(args[index + 1]);
    if (arg.startsWith(`${name}=`)) values.push(arg.slice(name.length + 1));
  }
  return values.map((value) => value.trim()).filter(Boolean);
}

function numberArg(name, fallback) {
  const rawValue = valueFor(name);
  if (rawValue === undefined) return fallback;
  const value = Number.parseInt(rawValue, 10);
  return Number.isFinite(value) && value >= 1 ? value : fallback;
}

function projectPath(path) {
  return relative(PROJECT_DIR, path).replace(/\\/g, '/');
}

function parseLedger(path) {
  if (!existsSync(path)) throw new Error(`ledger not found: ${path}`);
  const raw = readFileSync(path, 'utf8');
  const rows = [];
  for (const line of raw.split(/\r?\n/)) {
    if (!line.startsWith('| ')) continue;
    if (/^\| --- /.test(line) || /^\| Last updated /.test(line)) continue;
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
    if (cells.length < 6) continue;
    const [lastUpdated, pageCell, type, sitemap, dateSource, sourceFileCell] = cells;
    const page = pageCell.replace(/`/g, '');
    const sourceFile = sourceFileCell.replace(/`/g, '');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(lastUpdated)) continue;
    rows.push({
      last_updated: lastUpdated,
      page,
      type,
      sitemap,
      date_source: dateSource,
      source_file: sourceFile,
    });
  }
  return rows;
}

function includeRow(row) {
  if (!INCLUDE_TOOLS && row.type === 'Tool') return false;
  if (!INCLUDE_STATIC && row.type === 'Static page') return false;
  if (TYPE_FILTER.length && !TYPE_FILTER.includes(row.type)) return false;
  if (!row.source_file || row.source_file === '-') return false;
  return true;
}

function priority(row) {
  const typeRank = {
    'Static page': 0,
    Category: 1,
    Comparison: 2,
    Guide: 3,
    'Answer page': 4,
    Trend: 5,
    Workflow: 6,
    Company: 7,
    'Dead tool archive': 8,
  };
  return typeRank[row.type] ?? 20;
}

function buildBatch(rows) {
  return rows
    .filter(includeRow)
    .sort((a, b) => {
      if (a.last_updated !== b.last_updated) return a.last_updated.localeCompare(b.last_updated);
      const rankDiff = priority(a) - priority(b);
      if (rankDiff) return rankDiff;
      return a.page.localeCompare(b.page);
    })
    .slice(0, LIMIT)
    .map((row, index) => ({
      index: index + 1,
      route: row.page,
      type: row.type,
      path: row.source_file,
      last_updated: row.last_updated,
      sitemap: row.sitemap,
      date_source: row.date_source,
      route_qa_risk: routeRisk(row),
    }));
}

function routeRisk(row) {
  const policy = routeQaPolicy(row.page, row.sitemap);
  if (policy.kind === 'interactive-noindex') return 'interactive-noindex';
  if (policy.kind === 'archived-noindex') return 'archived-noindex';
  if (row.type === 'Static page') return 'top-layer';
  if (['Category', 'Comparison', 'Guide', 'Trend', 'Workflow'].includes(row.type)) return 'buyer-decision';
  if (row.type === 'Answer page') return 'answer-seo';
  return 'content';
}

function routeQaPolicy(route, sitemap = 'Yes') {
  if (route === '/compare/build/') {
    return {
      kind: 'interactive-noindex',
      flags: ['--allow-noindex', '--skip-comparison-content-checks'],
      reason: 'Builder UI is intentionally noindex and does not use indexable comparison content requirements.',
    };
  }
  if (sitemap === 'No') {
    return {
      kind: 'archived-noindex',
      flags: [],
      reason: 'Archived or consolidated content is intentionally noindex; verify content and frontmatter, but skip indexable route QA.',
    };
  }
  return { kind: 'content', flags: [], reason: 'Indexable or hub route uses the standard content QA policy.' };
}

function chunkPages(batch) {
  const chunks = [];
  for (let index = 0; index < batch.length; index += PAGES_PER_WORKER) {
    chunks.push(batch.slice(index, index + PAGES_PER_WORKER));
  }
  return chunks.slice(0, MAX_WORKERS);
}

function buildCommands(batch) {
  const defaultRoutes = ['/', '/tools/', '/categories/', '/compare/', '/guides/', '/answers/', '/trends/', '/workflows/'];
  const routeEntries = [
    ...batch.map((page) => [page.route, routeQaPolicy(page.route, page.sitemap)]),
    ...defaultRoutes.map((route) => [route, routeQaPolicy(route)]),
  ].filter(([route]) => Boolean(route));
  const routes = [...new Set(routeEntries.map(([route]) => route))];
  const routePolicies = Object.fromEntries(routeEntries);
  const contentRoutes = routes.filter((route) => routePolicies[route].kind === 'content');
  const interactiveRoutes = routes.filter((route) => routePolicies[route].kind === 'interactive-noindex');
  const paths = [...new Set(batch.map((page) => page.path).filter(Boolean))];
  const contentRouteArgs = routeArgs(contentRoutes);
  const interactiveRouteArgs = routeArgs(interactiveRoutes);
  const widths = '319,360,390,430,768,1024,1366';
  const contentRouteQa = `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 ${contentRouteArgs} --widths ${widths} --timing-file local/tmp/page-refresh-route-qa-content.json`;
  const interactiveRouteQa = interactiveRoutes.length
    ? `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 ${interactiveRouteArgs} --widths ${widths} ${interactivePolicyFlags(interactiveRoutes)} --timing-file local/tmp/page-refresh-route-qa-interactive.json`
    : undefined;
  const expensiveGates = [
    'npm run typecheck',
    'npm run build:fast',
    contentRouteQa,
    interactiveRouteQa,
  ].filter(Boolean);
  return {
    page_files: paths,
    routes,
    content_routes: contentRoutes,
    interactive_routes: interactiveRoutes,
    route_policies: routePolicies,
    route_qa_args: contentRouteArgs,
    interactive_route_qa_args: interactiveRouteArgs,
    timing_dir: TIMING_DIR,
    cheap_gates: [
      'npm run ledger:pages && npm run ledger:pages:check',
      'node scripts/check-frontmatter.mjs --changed',
      'npm run audit:provenance:changed -- --json',
      `env AIPEDIA_CURRENT_DATE=${currentDate()} npm run audit:coverage-quality:changed`,
      'node scripts/guard-em-dashes.mjs',
      'git diff --check',
    ],
    expensive_gates: expensiveGates,
    timed_closeout: timedCloseoutCommands(expensiveGates),
  };
}

function routeArgs(routes) {
  return routes.map((route) => `--route ${route}`).join(' ');
}

function interactivePolicyFlags(routes) {
  const flags = new Set();
  for (const route of routes) {
    for (const flag of routeQaPolicy(route).flags) flags.add(flag);
  }
  return [...flags].join(' ');
}

function timedCloseoutCommands(expensiveGates) {
  const cheapGates = [
    ['ledger', 'npm run ledger:pages && npm run ledger:pages:check'],
    ['frontmatter', 'node scripts/check-frontmatter.mjs --changed'],
    ['provenance', 'npm run audit:provenance:changed -- --json'],
    ['coverage', `env AIPEDIA_CURRENT_DATE=${currentDate()} npm run audit:coverage-quality:changed`],
    ['em-dash', 'node scripts/guard-em-dashes.mjs'],
    ['diff-check', 'git diff --check'],
  ];
  const expensive = expensiveGates.map((command, index) => [`expensive-${String(index + 1).padStart(2, '0')}`, command]);
  return [...cheapGates, ...expensive].map(([id, command]) => ({
    id,
    timing_file: `${TIMING_DIR}/${id}.time`,
    command: `/usr/bin/time -f '${id}_seconds=%e' -o ${TIMING_DIR}/${id}.time bash -lc ${JSON.stringify(command)}`,
  }));
}

function buildWorkerBriefs(batch, reportDir = REPORT_DIR) {
  const chunks = chunkPages(batch);
  return chunks.map((pages, index) => {
    const id = `page-refresh-shard-${String(index + 1).padStart(2, '0')}`;
    const ownedPaths = [...new Set(pages.map((page) => page.path))];
    const routes = pages.map((page) => page.route);
    const reportPath = `${reportDir.replace(/\/$/, '')}/${id}.json`;
    return {
      id,
      agent_type: 'worker',
      title: `Refresh page shard ${index + 1}: ${pages.map((page) => page.route).join(', ')}`,
      pages,
      owned_paths: ownedPaths,
      routes,
      report_path: reportPath,
      do_not_edit: [
        'PAGE_REFRESH_LEDGER.md',
        'src/data/source-registry.json',
        'src/content/tools/*.md',
        'src/content/categories/*.md unless assigned in this shard',
        '.agent/**',
        'workflows/**',
      ],
      prompt: workerPrompt(id, pages, ownedPaths, reportPath),
    };
  });
}

function workerPrompt(id, pages, ownedPaths, reportPath) {
  return [
    `You are ${id} in a parallel AiPedia non-tool page-refresh batch.`,
    '',
    'You are not alone in the codebase. Other workers may edit disjoint page files in parallel. Do not revert or touch changes outside your owned paths.',
    '',
    `Current date: ${currentDate()}. Every web search for volatile AI, company, product, pricing, model, ranking, recommendation, affiliate, or news facts must include "${currentMonthYear()}".`,
    '',
    'You may edit only these files:',
    ...ownedPaths.map((path) => `- ${path}`),
    '',
    'Assigned pages:',
    ...pages.map((page) => `- ${page.route} (${page.type}, last updated ${page.last_updated}, ${page.path})`),
    '',
    'Refresh the page for current accuracy, buyer usefulness, source backing, internal links, metadata, and mobile-first decision value. Preserve or add caveats for account-gated, checkout-gated, region-rendered, secondary-only, or primary-conflict facts.',
    '',
    'Do not edit PAGE_REFRESH_LEDGER.md, source registry, shared templates, generated assets, or .agent docs. The integrator owns shared files.',
    '',
    `Write your machine-readable worker report to ${reportPath}. If your worker cannot write that file, paste the same JSON in your final answer.`,
    '',
    'Report schema:',
    JSON.stringify(workerReportTemplate(id, pages), null, 2),
  ].join('\n');
}

function workerReportTemplate(id, pages) {
  return {
    shard_id: id,
    started_at: '',
    finished_at: '',
    elapsed_seconds: null,
    changed_paths: [],
    pages: pages.map((page) => ({
      route: page.route,
      path: page.path,
      status: 'pending',
      elapsed_seconds: null,
      source_urls: [],
      source_confidence: [],
      caveats: [],
      parent_surfaces: [],
      route_qa_risks: [page.route_qa_risk],
      notes: '',
    })),
    checks: [],
    optimization_notes: [],
  };
}

function integratorPrompt(batch, commands, workerBriefs) {
  return [
    'You are the integrator for an AiPedia non-tool page-refresh batch.',
    '',
    'Review all worker diffs and worker JSON reports, resolve conflicts, remove unsupported claims, update shared top-layer surfaces and source registry only where needed, regenerate PAGE_REFRESH_LEDGER.md, and run closeout once.',
    '',
    `Pages in scope: ${batch.length}`,
    ...batch.map((page) => `- ${page.route} (${page.type}) -> ${page.path}`),
    '',
    'Worker reports:',
    ...workerBriefs.map((brief) => `- ${brief.report_path}`),
    '',
    'Cheap gates:',
    ...commands.cheap_gates.map((command) => `- ${command}`),
    '',
    'Expensive gates:',
    ...commands.expensive_gates.map((command) => `- ${command}`),
    '',
    'Timed closeout commands:',
    ...commands.timed_closeout.map((item) => `- ${item.command}`),
  ].join('\n');
}

function currentDate() {
  return process.env.AIPEDIA_CURRENT_DATE || process.env.CURRENT_DATE || new Date().toISOString().slice(0, 10);
}

function currentMonthYear() {
  return new Date(`${currentDate()}T12:00:00Z`).toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

const rows = parseLedger(LEDGER_PATH);
const batch = buildBatch(rows);
const commands = buildCommands(batch);
const workerBriefs = buildWorkerBriefs(batch);
const agentBriefs = {
  max_parallel_workers: MAX_WORKERS,
  pages_per_worker: PAGES_PER_WORKER,
  worker_report_dir: REPORT_DIR,
  worker_briefs: workerBriefs,
  integrator_brief: {
    id: 'page-refresh-integrator',
    title: `Integrate ${batch.length} non-tool page refreshes`,
    prompt: integratorPrompt(batch, commands, workerBriefs),
  },
};

function writeAgentPrompts(dir, briefs) {
  const outputDir = resolve(PROJECT_DIR, dir);
  mkdirSync(outputDir, { recursive: true });

  for (const brief of briefs.worker_briefs) {
    writeFileSync(resolve(outputDir, `${brief.id}.md`), `${brief.prompt}\n`);
  }

  writeFileSync(resolve(outputDir, `${briefs.integrator_brief.id}.md`), `${briefs.integrator_brief.prompt}\n`);

  return outputDir;
}

function writeReportScaffolds(dir, briefs) {
  const outputDir = resolve(PROJECT_DIR, dir);
  mkdirSync(outputDir, { recursive: true });

  for (const brief of briefs.worker_briefs) {
    const template = workerReportTemplate(brief.id, brief.pages);
    writeFileSync(resolve(outputDir, `${brief.id}.json`), `${JSON.stringify(template, null, 2)}\n`);
  }

  return outputDir;
}

const promptDir = PROMPT_DIR ? writeAgentPrompts(PROMPT_DIR, agentBriefs) : undefined;
const reportDir = WRITE_REPORT_SCAFFOLDS ? writeReportScaffolds(REPORT_DIR, agentBriefs) : REPORT_DIR;

const report = {
  generated_at: new Date().toISOString(),
  current_date: currentDate(),
  ledger: projectPath(LEDGER_PATH),
  include_tools: INCLUDE_TOOLS,
  type_filter: TYPE_FILTER,
  limit: LIMIT,
  max_workers: MAX_WORKERS,
  pages_per_worker: PAGES_PER_WORKER,
  prompt_dir: promptDir,
  worker_report_dir: reportDir,
  batch,
  commands,
  agent_briefs: agentBriefs,
};

if (JSON_MODE) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else if (AGENTS_MODE) {
  for (const brief of agentBriefs.worker_briefs) {
    console.log(`\n## ${brief.title}\n`);
    console.log(brief.prompt);
  }
  console.log(`\n## ${agentBriefs.integrator_brief.title}\n`);
  console.log(agentBriefs.integrator_brief.prompt);
} else {
  console.log(`Planned ${batch.length} non-tool page(s) from ${projectPath(LEDGER_PATH)}`);
  for (const page of batch) {
    console.log(`- ${page.last_updated} ${page.type} ${page.route} -> ${page.path}`);
  }
  console.log('\nRoute QA args:');
  console.log(commands.route_qa_args);
}
