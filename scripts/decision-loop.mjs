#!/usr/bin/env node
// Read-only operator brief for the AiPedia decision content flywheel.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const COUNT = numberValue('--count', 1);
const SLUG = valueFor('--slug') || '';
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const BACKLOG_PATH = resolve(PROJECT_DIR, valueFor('--backlog') || 'src/data/coverage-backlog.json');
const COMPARISONS_DIR = join(PROJECT_DIR, 'src', 'content', 'comparisons');
const TOOLS_DIR = join(PROJECT_DIR, 'src', 'content', 'tools');
const CATEGORIES_DIR = join(PROJECT_DIR, 'src', 'content', 'categories');
const COMPARISON_POLICY_PATH = join(PROJECT_DIR, 'src', 'data', 'comparison-policy.json');
const ROUTE_QA_WIDTHS = [360, 390, 430, 768, 1024, 1366];
const BACKLOG_STALE_DAYS = 2;
const KNOWN_FLAGS = new Set(['--backlog', '--count', '--json', '--project-dir', '--root', '--slug', '--help', '-h']);
const VALUE_FLAGS = new Set(['--backlog', '--count', '--project-dir', '--root', '--slug']);
const CANONICAL_FACT_TOOLS = new Set([
  'chatgpt',
  'claude',
  'gemini',
  'grok',
  'deepseek',
  'midjourney',
  'runway',
  'elevenlabs',
  'cursor',
  'github-copilot',
]);

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length > 0) {
  emitReport({
    ok: false,
    mode: 'argument-error',
    project_dir: PROJECT_DIR,
    backlog_path: BACKLOG_PATH,
    argument_issues: argumentIssues,
    clusters: [],
  });
  process.exit(2);
}

if (!existsSync(BACKLOG_PATH)) {
  emitReport({
    ok: false,
    mode: 'missing-backlog',
    project_dir: PROJECT_DIR,
    backlog_path: BACKLOG_PATH,
    argument_issues: [],
    clusters: [],
    next_action: 'Run npm run coverage:backlog, then rerun npm run loop:next.',
  });
  process.exit(1);
}

const backlog = JSON.parse(readFileSync(BACKLOG_PATH, 'utf8'));
const comparisonPolicy = existsSync(COMPARISON_POLICY_PATH)
  ? JSON.parse(readFileSync(COMPARISON_POLICY_PATH, 'utf8'))
  : { blocked_pairs: [] };
const blockedPairs = new Set(
  (comparisonPolicy.blocked_pairs || []).map((entry) => pairKey(entry.tools[0], entry.tools[1])),
);
const workflowLanes = comparisonPolicy.workflow_lanes || {};
const existingPairs = existingComparisonPairs();
const comparisonBacklog = backlog.backlog?.comparisons ?? [];
const warnings = backlogWarnings(backlog.generated_at);
const candidates = comparisonBacklog
  .filter((item) => item?.tools?.length >= 2)
  .filter((item) => !SLUG || item.slug === SLUG)
  .filter((item) => selectableComparison(item))
  .filter((item) => !existingPairs.has(pairKey(item.tools[0], item.tools[1])))
  .slice(0, COUNT)
  .map((item, index) => clusterBrief(item, index + 1));

emitReport({
  ok: true,
  mode: 'decision-content-flywheel',
  project_dir: PROJECT_DIR,
  backlog_path: projectPath(BACKLOG_PATH),
  backlog_generated_at: backlog.generated_at ?? '',
  warnings,
  count: candidates.length,
  clusters: candidates,
  next_action: candidates.length
    ? `Begin with ${candidates[0].slug}: verify current facts, write the decision page, update parent surfaces, check, record.`
    : 'No missing comparison cluster matched the current backlog. Run npm run coverage:backlog if this looks stale.',
});

function usage() {
  return [
    'Usage:',
    '  node scripts/decision-loop.mjs',
    '  node scripts/decision-loop.mjs --json',
    '  node scripts/decision-loop.mjs --count 3',
    '  node scripts/decision-loop.mjs --slug activepieces-vs-zapier',
    '',
    'Options:',
    '  --json                 Emit a structured report.',
    '  --count <count>        Number of clusters to brief. Defaults to 1.',
    '  --slug <slug>          Brief a specific comparison slug from the backlog.',
    '  --backlog <path>       Coverage backlog path. Defaults to src/data/coverage-backlog.json.',
    '  --project-dir <dir>    Project root. Alias: --root.',
  ].join('\n');
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  if (!report.ok) {
    console.error(`[decision-loop] ${report.mode}`);
    for (const issue of report.argument_issues ?? []) console.error(`- ${issue.detail}`);
    if (report.next_action) console.error(report.next_action);
    return;
  }

  if (!report.clusters.length) {
    console.log('[decision-loop] No cluster selected.');
    console.log(report.next_action);
    return;
  }

  for (const cluster of report.clusters) {
    console.log(`Decision cluster ${cluster.rank}: ${cluster.title}`);
    console.log(`  slug: ${cluster.slug}`);
    console.log(`  target: ${cluster.working_set.comparison}`);
    console.log(`  score: ${cluster.score}`);
    console.log(`  tools: ${cluster.tools.map((tool) => tool.slug).join(', ')}`);
    console.log(`  categories: ${cluster.categories.join(', ') || 'cross-category'}`);
    if (cluster.requires_canonical_fact_table) {
      console.log(`  required: canonical_fact_table: true for ${cluster.canonical_fact_tools.join(', ')}`);
    }
    console.log(`  comparison mode: ${cluster.comparison_mode}`);
    if (report.warnings?.length) {
      console.log('');
      console.log('Warnings:');
      for (const warning of report.warnings) console.log(`  - ${warning.message}`);
    }
    console.log('');
    console.log('Loop:');
    for (const step of cluster.loop_steps) console.log(`  ${step.order}. ${step.name}: ${step.exit_criteria}`);
    console.log('');
    console.log('Working set:');
    for (const path of flatWorkingSet(cluster.working_set)) console.log(`  - ${path}`);
    console.log('');
    console.log('Discovery:');
    for (const command of cluster.discovery_commands) console.log(`  - ${command}`);
    console.log('');
    console.log('Verification:');
    for (const command of cluster.verification_commands) console.log(`  - ${command}`);
    console.log('');
    console.log('Route QA:');
    console.log(`  - ${cluster.route_qa.route} at ${cluster.route_qa.widths.join(', ')} px`);
    for (const check of cluster.route_qa.checks) console.log(`  - ${check}`);
    console.log('');
  }
}

function flatWorkingSet(workingSet) {
  return [
    workingSet.comparison,
    ...workingSet.tool_pages,
    ...workingSet.category_pages,
    ...workingSet.top_layer_pages,
    workingSet.source_registry,
    workingSet.ledger,
  ].filter(Boolean);
}

function clusterBrief(item, rank) {
  const [first, second] = item.tools;
  const tools = item.tools.map((slug) => ({
    slug,
    title: toolTitle(slug),
    path: projectPath(join(TOOLS_DIR, `${slug}.md`)),
  }));
  const categories = item.shared_categories ?? [];
  const categoryPages = categories
    .map((category) => join(CATEGORIES_DIR, `${category}.md`))
    .filter((path) => existsSync(path))
    .map(projectPath);
  const canonicalFactTools = item.tools.filter((slug) => CANONICAL_FACT_TOOLS.has(slug));
  const comparisonPath = `src/content/comparisons/${item.slug}.md`;
  const comparisonRoute = `/compare/${item.slug}/`;
  const relatedSurfacePattern = [...item.tools, item.slug].join('|');

  return {
    rank,
    kind: 'decision-content-cluster',
    slug: item.slug,
    title: `${toolTitle(first)} vs ${toolTitle(second)}`,
    score: item.score ?? 0,
    same_category: Boolean(item.same_category),
    comparison_mode: item.comparison_mode || (item.same_category ? 'direct' : 'direct'),
    requires_asymmetric_framing: Boolean(item.requires_asymmetric_framing),
    workflow_family: item.workflow_family || '',
    categories,
    tools,
    requires_canonical_fact_table: canonicalFactTools.length > 0,
    canonical_fact_tools: canonicalFactTools,
    working_set: {
      comparison: comparisonPath,
      tool_pages: tools.map((tool) => tool.path),
      category_pages: categoryPages,
      top_layer_pages: [
        'src/pages/compare/index.astro',
        'src/pages/tools/index.astro',
        'src/pages/categories/index.astro',
        'src/pages/llms.txt.ts',
        'src/pages/llms-full.txt.ts',
      ],
      source_registry: 'src/data/source-registry.json',
      ledger: 'PAGE_REFRESH_LEDGER.md',
    },
    discovery_commands: [
      `rg -n "${relatedSurfacePattern}" src/content src/pages`,
      'Inspect src/data/source-registry.json for source ids, last_checked dates, and pricing/source rows touched by the verified facts.',
      'Inspect affected parent hubs, archives, LLM surfaces, internal-link blocks, and any related news or use-case pages before closing the cycle.',
    ],
    route_qa: {
      route: comparisonRoute,
      widths: ROUTE_QA_WIDTHS,
      checks: [
        'mobile and tablet first screen includes the decision, winners, CTA path, and no hidden critical buyer content',
        'desktop 1024 and 1366 layouts have no horizontal overflow, overlap, stretched cards, broken CTAs, or missing primary content',
        'canonical, title, description, indexability, affiliate disclosure, and source evidence remain visible where relevant',
      ],
    },
    loop_steps: [
      {
        order: 1,
        name: 'Pick cluster',
        exit_criteria: 'One buyer-intent cluster is selected from coverage, freshness, and commercial value.',
      },
      {
        order: 2,
        name: 'Verify facts',
        exit_criteria: 'Current product, pricing, plan, model, source, affiliate, and availability facts are checked against current-month sources.',
      },
      {
        order: 3,
        name: 'Improve decision page',
        exit_criteria: 'The comparison gives a verdict, best fit, avoid guidance, plan guidance, alternatives, watch-outs, sources, and recent-change context.',
      },
      {
        order: 4,
        name: 'Update parent surfaces',
        exit_criteria: 'Affected tool pages, category hubs, compare/tools hubs, LLM surfaces, links, and ledger rows are current.',
      },
      {
        order: 5,
        name: 'Check',
        exit_criteria: 'Focused audits pass, with build:fast only when rendered output or pre-ship confidence requires it.',
      },
      {
        order: 6,
        name: 'Record',
        exit_criteria: '.agent status, active plans, work log, and a loop-run receipt say what landed, what passed, and what remains.',
      },
    ],
    source_requirements: [
      'Use current-month web searches that include the actual month and year for volatile AI, company, product, pricing, model, affiliate, and commercial claims.',
      'Prefer primary sources for pricing, plan names, model access, API access, and company claims.',
      'Update last_verified, source fields, and visible verification language where relevant.',
      'Defer or qualify any volatile claim that cannot be verified.',
    ],
    verification_commands: [
      `npm run loop:verify -- --date <YYYY-MM-DD> --route ${comparisonRoute} --path <changed paths>`,
      `npm run qa:route -- --route ${comparisonRoute} --widths ${ROUTE_QA_WIDTHS.join(',')}`,
      'npm run ledger:pages -- --date <YYYY-MM-DD>',
      'npm run ledger:pages:check -- --date <YYYY-MM-DD>',
      'npm run audit:coverage-quality:changed',
      'npm run audit:provenance:changed',
      'npm run audit:facts',
      'npm run check:links',
      'npm run check:smart',
      'npm run check:smart:run -- --path <changed paths>',
      'npm run build:fast when rendered output, runtime surfaces, metadata, schema, or pre-ship confidence require it',
      `npm run loop:record -- --date <YYYY-MM-DD> --slug ${item.slug} --route ${comparisonRoute} --status complete`,
    ],
    done_definition: [
      'No placeholder copy, fake source, stale pricing, unsupported claim, or untracked commercial CTA ships.',
      'Mobile first screen answers the comparison decision quickly.',
      'Desktop 1024 and 1366 layouts are checked and recorded alongside mobile/tablet QA.',
      'Parent hubs and top-layer surfaces do not contradict the refreshed child pages.',
      'The page refresh ledger reflects the real editorial scope.',
      'The next cycle can resume from .agent/CURRENT_STATUS.md and .agent/PLANS.md.',
    ],
  };
}

function selectableComparison(item) {
  if (item.requires_human_review || item.selectable === false) return false;
  if (['review_only', 'blocked'].includes(item.comparison_mode)) return false;

  const key = pairKey(item.tools[0], item.tools[1]);
  if (blockedPairs.has(key)) return false;

  const [first, second] = item.tools.map(toolMeta);
  if (!first.primary_category || !second.primary_category) return false;
  if (first.primary_category !== second.primary_category) return false;
  return hasApprovedSharedWorkflowLane(first.primary_category, item.tools[0], item.tools[1]);
}

function hasApprovedSharedWorkflowLane(category, a, b) {
  const lanes = workflowLanes?.[category];
  if (!lanes) return true;
  return Object.values(lanes).some((slugs) => Array.isArray(slugs) && slugs.includes(a) && slugs.includes(b));
}

function backlogWarnings(generatedAt) {
  if (!generatedAt) return [{ code: 'backlog-generated-at-missing', message: 'coverage backlog has no generated_at timestamp; run npm run coverage:backlog if the ranking looks stale.' }];

  const generatedDate = new Date(generatedAt);
  if (Number.isNaN(generatedDate.getTime())) {
    return [{ code: 'backlog-generated-at-invalid', message: `coverage backlog has an invalid generated_at timestamp (${generatedAt}); run npm run coverage:backlog.` }];
  }

  const ageMs = Date.now() - generatedDate.getTime();
  const ageDays = Math.floor(ageMs / 86_400_000);
  if (ageDays <= BACKLOG_STALE_DAYS) return [];

  return [
    {
      code: 'backlog-stale',
      message: `coverage backlog is ${ageDays} days old; run npm run coverage:backlog before committing if the selected cluster looks stale.`,
    },
  ];
}

function existingComparisonPairs() {
  const pairs = new Set();
  if (!existsSync(COMPARISONS_DIR)) return pairs;

  for (const name of readdirSync(COMPARISONS_DIR)) {
    if (!name.endsWith('.md')) continue;
    const tools = inlineArray(frontmatter(join(COMPARISONS_DIR, name)), 'tools');
    for (let i = 0; i < tools.length; i += 1) {
      for (let j = i + 1; j < tools.length; j += 1) pairs.add(pairKey(tools[i], tools[j]));
    }
  }

  return pairs;
}

function toolTitle(slug) {
  const path = join(TOOLS_DIR, `${slug}.md`);
  if (!existsSync(path)) return slug;
  return scalar(frontmatter(path), 'title') || slug;
}

function toolMeta(slug) {
  const path = join(TOOLS_DIR, `${slug}.md`);
  if (!existsSync(path)) return { slug, primary_category: '', secondary_categories: [] };
  const fm = frontmatter(path);
  return {
    slug,
    primary_category: scalar(fm, 'category'),
    secondary_categories: inlineArray(fm, 'secondary_categories'),
  };
}

function frontmatter(path) {
  return readFileSync(path, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
}

function scalar(fm, key) {
  const match = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return match ? stripYamlQuotes(match[1]) : '';
}

function inlineArray(fm, key) {
  const match = fm.match(new RegExp(`^${key}:\\s*\\[(.*?)\\]\\s*$`, 'm'));
  return match ? match[1].split(',').map(stripYamlQuotes).filter(Boolean) : [];
}

function stripYamlQuotes(value) {
  const text = String(value ?? '').trim();
  if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
    return text.slice(1, -1);
  }
  return text;
}

function pairKey(first, second) {
  return [first, second].sort((a, b) => a.localeCompare(b)).join('|');
}

function projectPath(path) {
  return relative(PROJECT_DIR, path).replace(/\\/g, '/');
}

function valueFor(flag) {
  const inline = args.find((arg) => arg.startsWith(`${flag}=`));
  if (inline) return inline.slice(flag.length + 1);
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

function numberValue(flag, fallback) {
  const raw = valueFor(flag);
  if (raw === undefined) return fallback;
  const value = Number.parseInt(raw, 10);
  return Number.isInteger(value) ? value : NaN;
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function collectArgumentIssues() {
  const issues = [];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] ?? '';
      if (!VALUE_FLAGS.has(previous)) issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) {
      issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
      continue;
    }

    if (VALUE_FLAGS.has(name)) {
      if (arg.includes('=')) {
        if (!arg.slice(name.length + 1)) issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
        continue;
      }

      const value = args[index + 1];
      if (!value || value.startsWith('-')) issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
      continue;
    }

    if (arg.includes('=')) issues.push({ code: 'argument-invalid', detail: `${name} does not accept a value` });
  }

  if (args.includes('--project-dir') && args.includes('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  if (!Number.isInteger(COUNT) || COUNT < 1) {
    issues.push({ code: 'argument-invalid', detail: '--count must be a positive integer' });
  }

  return issues;
}
