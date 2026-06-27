#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = process.cwd();
const DEFAULT_BASE_DIR = 'local/tmp/aipedia-runner/affiliate-conversion';
const CONFIDENCE_LABELS = [
  'primary-confirmed',
  'primary-conflict',
  'account-gated',
  'checkout-gated',
  'region-rendered',
  'blocked-live-check',
  'secondary-only',
];

function valuesFor(flag, { fallback = '' } = {}) {
  for (let index = 0; index < process.argv.length; index += 1) {
    const arg = process.argv[index];
    if (arg === flag) return process.argv[index + 1] ?? fallback;
    if (arg.startsWith(`${flag}=`)) return arg.slice(flag.length + 1);
  }
  return fallback;
}

function numberFor(flag, fallback) {
  const value = Number(valuesFor(flag, { fallback: String(fallback) }));
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : fallback;
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function localDateString(now = new Date()) {
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function currentDate() {
  const explicitDate = process.env.AIPEDIA_CURRENT_DATE?.trim();
  if (explicitDate) return explicitDate;
  return localDateString();
}

function usage() {
  return [
    'Usage:',
    '  node scripts/affiliate-conversion-plan.mjs --json',
    '  node scripts/affiliate-conversion-plan.mjs --limit 6 --max-workers 3 --clusters-per-worker 2 --write-agent-prompts --write-report-scaffolds --json',
    '',
    'Options:',
    '  --limit <n>                  Maximum candidate clusters to plan. Default: 6.',
    '  --max-workers <n>            Maximum worker briefs. Default: 3.',
    '  --clusters-per-worker <n>    Maximum clusters per worker. Default: 2.',
    '  --out <path>                 Planner JSON output path.',
    '  --worker-dir <path>          Worker prompt output directory.',
    '  --report-dir <path>          Worker report scaffold output directory.',
    '  --write-agent-prompts        Write worker and integrator prompt files.',
    '  --write-report-scaffolds     Write JSON report scaffolds.',
    '  --json                       Print planner JSON.',
  ].join('\n');
}

function runInventory() {
  const result = spawnSync(process.execPath, [path.join(SCRIPT_DIR, 'affiliate-conversion-inventory.mjs'), '--json'], {
    cwd: PROJECT_DIR,
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    throw new Error(`affiliate inventory failed with status ${result.status}`);
  }
  return JSON.parse(result.stdout);
}

function routeForGuideSlug(slug) {
  return `/guides/${slug}/`;
}

function categoryRoute(category) {
  return category ? `/categories/${category}/` : null;
}

function duplicateRisk(tool) {
  if (tool.existing_pick_guides.length >= tool.recommended_page_count) return 'high';
  if (tool.existing_pick_guides.length > 0 || tool.existing_mention_guides.length > 2) return 'medium';
  return 'low';
}

function archetype(tool) {
  if (tool.existing_pick_guides.length === 0) return 'specific-icp-winner';
  if (tool.existing_pick_guides.some((slug) => slug.includes('pricing'))) return 'same-job-switcher-or-workflow-stack';
  return 'plan-decision-or-adjacent-comparison';
}

function routeQaRisk(tool) {
  if (tool.monetization_state === 'live_affiliate') return 'commercial-high';
  return 'official-link-medium';
}

function parentSurfaces(tool) {
  return [
    '/guides/',
    '/tools/',
    '/categories/',
    categoryRoute(tool.category),
  ].filter(Boolean);
}

function affectedRoutes(tool) {
  return [
    `/tools/${tool.slug}/`,
    ...tool.existing_pick_guides.map(routeForGuideSlug),
    ...tool.existing_mention_guides.map(routeForGuideSlug),
    ...parentSurfaces(tool),
  ].filter(Boolean);
}

function requiredSources(tool) {
  const sources = [
    { kind: 'official', reason: 'Confirm product positioning and current availability.' },
    { kind: 'pricing', reason: 'Confirm plan names, plan fit, annual or monthly caveats, and upgrade risk.' },
    { kind: 'affiliate', reason: 'Confirm live approval state and commercial CTA eligibility before using affiliate links.' },
  ];
  if (tool.monetization_state !== 'live_affiliate') {
    sources.push({ kind: 'official-fallback', reason: 'Use official-link language until affiliate approval is confirmed.' });
  }
  return sources;
}

function selectTools(inventory, limit) {
  return [...inventory.tools]
    .filter((tool) => tool.recommended_page_count > 0)
    .sort((a, b) => {
      const stateRank = (tool) => (tool.monetization_state === 'live_affiliate' ? 0 : 1);
      const rankDelta = stateRank(a) - stateRank(b);
      if (rankDelta) return rankDelta;
      const coverageDelta = a.existing_pick_guides.length - b.existing_pick_guides.length;
      if (coverageDelta) return coverageDelta;
      const scoreDelta = Number(b.score ?? 0) - Number(a.score ?? 0);
      if (scoreDelta) return scoreDelta;
      return a.slug.localeCompare(b.slug);
    })
    .slice(0, limit);
}

function buildCluster(tool, index) {
  return {
    id: `affiliate-${tool.slug}`,
    priority: index + 1,
    primary_tool: tool.slug,
    title: tool.title,
    category: tool.category,
    source_file: tool.source_file,
    monetization_state: tool.monetization_state,
    affiliate_status: tool.affiliate_status,
    affiliate_network: tool.affiliate_network,
    score: tool.score,
    recommended_page_count: tool.recommended_page_count,
    archetype: archetype(tool),
    buyer_job: `Find the next distinct buyer-intent page for ${tool.title}.`,
    existing_coverage: {
      pick_guides: tool.existing_pick_guides,
      mention_guides: tool.existing_mention_guides,
    },
    duplicate_intent_risk: duplicateRisk(tool),
    required_sources: requiredSources(tool),
    affected_routes: [...new Set(affectedRoutes(tool))],
    parent_surfaces: [...new Set(parentSurfaces(tool))],
    route_qa_risk: routeQaRisk(tool),
    recommended_worker_id: '',
  };
}

function chunk(items, size, maxChunks) {
  const chunks = [];
  for (let index = 0; index < items.length && chunks.length < maxChunks; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function reportPathFor(reportDir, workerId) {
  return path.join(reportDir, `${workerId}.json`).replaceAll(path.sep, '/');
}

function promptForWorker(workerId, clusters, reportPath, currentDate) {
  const clusterLines = clusters.map((cluster) => [
    `- ${cluster.id}: ${cluster.title} (${cluster.primary_tool})`,
    `  - Monetization: ${cluster.monetization_state}, status ${cluster.affiliate_status ?? 'unknown'}, network ${cluster.affiliate_network ?? 'unknown'}`,
    `  - Recommended archetype: ${cluster.archetype}`,
    `  - Duplicate-intent risk: ${cluster.duplicate_intent_risk}`,
    `  - Existing pick guides: ${cluster.existing_coverage.pick_guides.join(', ') || 'none'}`,
  ].join('\n')).join('\n');

  return [
    'Use the AiPedia affiliate conversion planning workflow for one shard.',
    '',
    `Current date: ${currentDate}. Every web search for AI, pricing, product, company, or affiliate facts must include the current month and year.`,
    '',
    'This MVP is planning-only. Do not edit public content pages unless a later integrator explicitly assigns that work.',
    '',
    'You may inspect:',
    '- assigned tool markdown files',
    '- existing guide files named by the planner',
    '- relevant workflow docs',
    '',
    'Do not edit:',
    '- PAGE_REFRESH_LEDGER.md',
    '- src/data/source-registry.json',
    '- src/content/tools/**',
    '- src/content/categories/**',
    '- src/content/use-cases/**',
    '- src/content/news/**',
    '- src/pages/**',
    '- .agent/**',
    '- workflows/**',
    '- runner or audit scripts',
    '',
    'Plan these candidate clusters:',
    clusterLines,
    '',
    `Write your JSON report to ${reportPath}. If you cannot write files, paste the same JSON schema in your final answer.`,
    '',
    'Required report fields: claim_receipts, duplicate_intent_notes, parent_surface_notes, commercial_cta_notes, route_qa_risks, checks, and handoff_notes.',
    '',
    `Allowed confidence labels: ${CONFIDENCE_LABELS.join(', ')}.`,
  ].join('\n');
}

function promptForIntegrator(workerBriefs, currentDate) {
  return [
    'Use the AiPedia affiliate conversion planning workflow as the integrator.',
    '',
    `Current date: ${currentDate}.`,
    '',
    'This MVP is planning-only. Review worker reports, do not publish or edit public content from this prompt alone.',
    '',
    'Integrator responsibilities:',
    '- Confirm every worker stayed inside the no-edit boundary.',
    '- Merge duplicate-intent notes before selecting any content slice.',
    '- Confirm affiliate approval status before any commercial CTA is recommended.',
    '- Convert claim receipts into source-backed implementation tasks.',
    '- Identify parent surfaces and route QA scope for the eventual content slice.',
    '- Keep shared files, ledgers, source registry, parent hubs, and final verification integrator-owned.',
    '',
    'Expected worker reports:',
    ...workerBriefs.map((brief) => `- ${brief.id}: ${brief.report_path}`),
  ].join('\n');
}

function blankReport(workerId, clusters) {
  return {
    worker_id: workerId,
    elapsed_seconds: null,
    owned_paths: [...new Set(clusters.map((cluster) => cluster.source_file).filter(Boolean))],
    clusters: clusters.map((cluster) => ({
      id: cluster.id,
      primary_tool: cluster.primary_tool,
      buyer_job: cluster.buyer_job,
      status: 'pending',
      changed_files: [],
      source_urls: [],
      claim_receipts: [
        {
          claim: '',
          path: '',
          source_url: '',
          verified_at: '',
          confidence: '',
          query: '',
          caveat: '',
        },
      ],
      commercial_cta_notes: [],
      parent_surface_notes: [],
      duplicate_intent_notes: [],
      route_qa_risks: [],
      checks: [],
      handoff_notes: '',
    })),
    handoff_notes: '',
  };
}

function writeWorkerArtifacts(plan, workerDir, reportDir, { writePrompts, writeReports }) {
  if (writePrompts) {
    mkdirSync(workerDir, { recursive: true });
    for (const file of ['integrator.md']) {
      const target = path.join(workerDir, file);
      if (existsSync(target)) rmSync(target);
    }
    for (const worker of plan.agent_briefs.worker_briefs) {
      writeFileSync(path.join(workerDir, `${worker.id}.md`), `# ${worker.title}\n\n${worker.prompt}\n`);
    }
    if (plan.agent_briefs.integrator_brief) {
      writeFileSync(path.join(workerDir, 'integrator.md'), `# Integrator\n\n${plan.agent_briefs.integrator_brief.prompt}\n`);
    }
  }

  if (writeReports) {
    mkdirSync(reportDir, { recursive: true });
    for (const worker of plan.agent_briefs.worker_briefs) {
      const clusters = plan.clusters.filter((cluster) => cluster.recommended_worker_id === worker.id);
      writeFileSync(
        path.join(reportDir, `${worker.id}.json`),
        `${JSON.stringify(blankReport(worker.id, clusters), null, 2)}\n`,
      );
    }
  }
}

function buildPlan({ inventory, limit, maxWorkers, clustersPerWorker, workerDir, reportDir }) {
  const planCurrentDate = currentDate();
  const clusters = selectTools(inventory, limit).map(buildCluster);
  const workerClusters = chunk(clusters, clustersPerWorker, maxWorkers);
  const workerBriefs = workerClusters.map((ownedClusters, index) => {
    const workerId = `affiliate-worker-${index + 1}`;
    for (const cluster of ownedClusters) cluster.recommended_worker_id = workerId;
    const reportPath = reportPathFor(reportDir, workerId);
    return {
      id: workerId,
      title: `Affiliate conversion planning worker ${index + 1}`,
      cluster_ids: ownedClusters.map((cluster) => cluster.id),
      report_path: reportPath,
      prompt: promptForWorker(workerId, ownedClusters, reportPath, planCurrentDate),
    };
  });

  return {
    schema_version: 1,
    workflow: 'affiliate-conversion-planning',
    current_date: planCurrentDate,
    generated_at: new Date().toISOString(),
    inventory_summary: {
      generated_at: inventory.generated_at,
      total_tool_files: inventory.total_tool_files,
      affiliate_link_tools: inventory.affiliate_link_tools,
      live_affiliate_tools: inventory.live_affiliate_tools,
      configured_not_live_tools: inventory.configured_not_live_tools,
      recommended_total_pages: inventory.recommended_total_pages,
    },
    planning_parameters: {
      limit,
      max_workers: maxWorkers,
      clusters_per_worker: clustersPerWorker,
    },
    clusters,
    agent_briefs: {
      worker_briefs: workerBriefs,
      integrator_brief: {
        prompt: promptForIntegrator(workerBriefs, planCurrentDate),
      },
    },
    commands: {
      cheap_gates: [
        'npm run affiliate:conversion:inventory -- --json',
        'npm run audit:affiliate-conversion -- --strict --json',
        'npm run audit:provenance:changed -- --json',
        'git diff --check',
      ],
      future_rendered_closeout: [
        'npm run ledger:pages && npm run ledger:pages:check',
        'npm run typecheck',
        'npm run build:fast',
        'npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route <changed routes>',
      ],
    },
  };
}

function main() {
  if (hasFlag('--help') || hasFlag('-h')) {
    console.log(usage());
    return;
  }

  const limit = numberFor('--limit', 6);
  const maxWorkers = numberFor('--max-workers', 3);
  const clustersPerWorker = numberFor('--clusters-per-worker', 2);
  const outPath = valuesFor('--out', { fallback: path.join(DEFAULT_BASE_DIR, 'affiliate-conversion-plan.json') });
  const workerDir = valuesFor('--worker-dir', { fallback: path.join(DEFAULT_BASE_DIR, 'workers') });
  const reportDir = valuesFor('--report-dir', { fallback: path.join(DEFAULT_BASE_DIR, 'reports') });
  const writePrompts = hasFlag('--write-agent-prompts');
  const writeReports = hasFlag('--write-report-scaffolds');
  const jsonMode = hasFlag('--json');

  const inventory = runInventory();
  const plan = buildPlan({ inventory, limit, maxWorkers, clustersPerWorker, workerDir, reportDir });

  if (outPath) {
    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(outPath, `${JSON.stringify(plan, null, 2)}\n`);
  }
  writeWorkerArtifacts(plan, workerDir, reportDir, { writePrompts, writeReports });

  if (jsonMode) {
    console.log(JSON.stringify(plan, null, 2));
  } else {
    console.log(`Planned ${plan.clusters.length} affiliate conversion cluster(s) across ${plan.agent_briefs.worker_briefs.length} worker(s).`);
    console.log(`Plan: ${outPath}`);
    if (writePrompts) console.log(`Worker prompts: ${workerDir}`);
    if (writeReports) console.log(`Worker reports: ${reportDir}`);
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
