#!/usr/bin/env node
// Provenance and pricing audit for the canonical fact migration.
// Default mode is report-only so historical debt stays visible. Changed mode is
// a CI gate for touched tool pages.

import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  loadSourceRegistry,
  markdownFiles,
  meaningfulValue,
  parseNestedMap,
  parsePriceHistory,
  parseSlug,
  projectPath,
  readMarkdown,
} from './lib/fact-normalize.mjs';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const TOOLS_DIR = join(PROJECT_DIR, 'src', 'content', 'tools');
const SOURCE_REGISTRY_PATH = join(PROJECT_DIR, 'src', 'data', 'source-registry.json');
const CHANGED_MODE = args.includes('--changed');
const CHANGED_FILE_ARGS = valuesFor('--changed-file').concat(valuesFor('--changed-files'));
const BASE_ARG = valueFor('--base');
const KNOWN_FLAGS = new Set(['--base', '--changed', '--changed-file', '--changed-files', '--json', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--base', '--changed-file', '--changed-files', '--project-dir', '--root']);
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const argumentIssues = collectArgumentIssues();
const HIGH_VOLATILITY_KEYS = new Set(['pricing_anchor', 'free_plan', 'best_paid_tier', 'flagship_model', 'context_window']);
const gitIssues = [];

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
    if (arg === name) {
      for (let valueIndex = index + 1; valueIndex < args.length && !args[valueIndex].startsWith('--'); valueIndex += 1) {
        values.push(args[valueIndex]);
      }
    } else if (arg.startsWith(`${name}=`)) {
      values.push(arg.slice(name.length + 1));
    }
  }
  return values.flatMap((value) => value.split(',').map((part) => part.trim()).filter(Boolean));
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
  let targetModeCount = 0;
  if (CHANGED_MODE) targetModeCount += 1;
  if (CHANGED_FILE_ARGS.length > 0) targetModeCount += 1;

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
      if (!value || value.startsWith('-')) issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
    }
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }
  if (targetModeCount > 1) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --changed or --changed-file' });
  }
  if (BASE_ARG && !CHANGED_MODE) {
    issues.push({ code: 'argument-invalid', detail: '--base is only valid with --changed' });
  }

  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/audit-provenance-pricing.mjs --json',
    '  node scripts/audit-provenance-pricing.mjs --changed [--base origin/master]',
    '  node scripts/audit-provenance-pricing.mjs --changed-file src/content/tools/example.md',
    '  node scripts/audit-provenance-pricing.mjs --project-dir <dir>',
    '',
    'Options:',
    '  --json                 Emit a structured provenance/pricing report.',
    '  --changed              Fail on provenance/pricing debt in changed tool pages.',
    '  --changed-file <path>  Check supplied changed tool paths, repeatable or comma-separated.',
    '  --base <ref>           Base ref for --changed. Defaults to origin/master when available.',
    '  --project-dir <dir>    Audit another project root.',
    '  --root <dir>           Alias for --project-dir.',
  ].join('\n');
}

function emptyReport(ok, mode) {
  return {
    ok,
    mode,
    generated_at: new Date().toISOString(),
    project_dir: PROJECT_DIR,
    argument_issues: ok ? [] : argumentIssues,
    registry: {
      path: projectPath(PROJECT_DIR, SOURCE_REGISTRY_PATH),
      total_sources: 0,
      duplicate_ids: [],
      sources_missing_last_checked: [],
      type_counts: {},
      trust_tier_counts: {},
      volatility_counts: {},
    },
    totals: {
      tools_scanned: 0,
      fact_records: 0,
      price_history_records: 0,
    },
    provenance: {
      facts_missing_source_id: [],
      facts_with_source_but_no_source_id: [],
      unknown_source_ids: [],
      facts_missing_confidence: [],
      high_volatility_missing_next_review: [],
    },
    pricing: {
      price_history_missing_source: [],
      price_history_missing_verified_at: [],
      price_history_unknown_source_ids: [],
    },
  };
}

function emitArgumentFailure() {
  const report = emptyReport(false, 'argument-error');
  if (JSON_MODE) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.error('[audit-provenance-pricing] invalid arguments');
    for (const issue of argumentIssues) console.error(`- ${issue.detail}`);
  }
}

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

if (argumentIssues.length > 0) {
  emitArgumentFailure();
  process.exit(1);
}

const registry = loadSourceRegistry(SOURCE_REGISTRY_PATH);
const sourceIds = new Set(registry.sources.map((source) => source.id));
const registryDuplicateIds = registry.sources
  .map((source) => source.id)
  .filter((id, index, ids) => ids.indexOf(id) !== index);
const sourcesMissingLastChecked = registry.sources
  .filter((source) => !String(source.last_checked ?? '').trim())
  .map((source) => ({ id: source.id, url: source.url }));

const tools = markdownFiles(TOOLS_DIR).map((path) => {
  const md = readMarkdown(path);
  return {
    path,
    relpath: projectPath(PROJECT_DIR, path),
    slug: parseSlug(md.frontmatter, path),
    facts: parseNestedMap(md.frontmatter, 'facts'),
    priceHistory: parsePriceHistory(md.frontmatter),
  };
});

function projectRelative(path) {
  return projectPath(PROJECT_DIR, path);
}

function toolFilesFromPaths(paths) {
  const files = [];
  for (const path of paths) {
    const resolved = resolve(PROJECT_DIR, path);
    if (!resolved.startsWith(TOOLS_DIR) || !resolved.endsWith('.md')) continue;
    files.push(projectRelative(resolved));
  }
  return [...new Set(files)].sort((a, b) => a.localeCompare(b));
}

function gitChangedPaths() {
  const paths = [];
  const addOutput = (result) => {
    if (result.status !== 0) return false;
    for (const line of result.stdout.split(/\r?\n/).map((part) => part.trim()).filter(Boolean)) paths.push(line);
    return true;
  };
  const runGit = (gitArgs) => spawnSync('git', gitArgs, { cwd: PROJECT_DIR, encoding: 'utf8' });

  if (BASE_ARG) {
    const result = runGit(['diff', '--name-only', '--diff-filter=ACMRT', `${BASE_ARG}...HEAD`, '--', 'src/content/tools']);
    if (!addOutput(result)) gitIssues.push({ code: 'git-diff-failed', detail: `could not diff changed tool pages against ${BASE_ARG}` });
  } else {
    const originMasterExists = runGit(['rev-parse', '--verify', '--quiet', 'origin/master']);
    if (originMasterExists.status === 0) {
      addOutput(runGit(['diff', '--name-only', '--diff-filter=ACMRT', 'origin/master...HEAD', '--', 'src/content/tools']));
    }
  }

  addOutput(runGit(['diff', '--name-only', '--diff-filter=ACMRT', '--', 'src/content/tools']));
  addOutput(runGit(['diff', '--cached', '--name-only', '--diff-filter=ACMRT', '--', 'src/content/tools']));
  addOutput(runGit(['ls-files', '--others', '--exclude-standard', '--', 'src/content/tools']));

  return [...new Set(paths)].sort((a, b) => a.localeCompare(b));
}

const changedToolPaths = CHANGED_MODE
  ? toolFilesFromPaths(gitChangedPaths())
  : CHANGED_FILE_ARGS.length > 0 ? toolFilesFromPaths(CHANGED_FILE_ARGS) : [];
const changedToolPathSet = new Set(changedToolPaths);

const factsMissingSourceId = [];
const factsWithSourceButNoSourceId = [];
const unknownSourceIds = [];
const highVolatilityMissingNextReview = [];
const factsMissingConfidence = [];
const priceHistoryMissingSource = [];
const priceHistoryMissingVerifiedAt = [];
const priceHistoryUnknownSourceIds = [];

for (const tool of tools) {
  for (const [key, fact] of Object.entries(tool.facts)) {
    if (!meaningfulValue(fact)) continue;
    const item = { slug: tool.slug, key, path: tool.relpath };
    const sourceId = String(fact.source_id ?? '').trim();
    const source = String(fact.source ?? '').trim();
    const volatility = String(fact.volatility ?? '').trim();

    if (!sourceId) factsMissingSourceId.push(item);
    if (source && !sourceId) factsWithSourceButNoSourceId.push({ ...item, source });
    if (sourceId && !sourceIds.has(sourceId)) unknownSourceIds.push({ ...item, source_id: sourceId });
    if (!String(fact.confidence ?? '').trim()) factsMissingConfidence.push(item);
    const needsScheduledReview = volatility === 'high' || (!volatility && HIGH_VOLATILITY_KEYS.has(key));
    if (needsScheduledReview && !String(fact.next_review_at ?? '').trim()) {
      highVolatilityMissingNextReview.push({ ...item, volatility: volatility || 'inferred-high' });
    }
  }

  tool.priceHistory.forEach((price, index) => {
    const item = { slug: tool.slug, index, path: tool.relpath, plan: String(price.plan ?? '').trim() };
    const sourceId = String(price.source_id ?? '').trim();
    const source = String(price.source ?? '').trim();
    const verifiedAt = String(price.verified_at ?? '').trim();
    if (!sourceId && !source) priceHistoryMissingSource.push(item);
    if (!verifiedAt) priceHistoryMissingVerifiedAt.push(item);
    if (sourceId && !sourceIds.has(sourceId)) priceHistoryUnknownSourceIds.push({ ...item, source_id: sourceId });
  });
}

const result = {
  ok: true,
  mode: 'report-only',
  generated_at: new Date().toISOString(),
  project_dir: PROJECT_DIR,
  argument_issues: [],
  registry: {
    path: projectPath(PROJECT_DIR, SOURCE_REGISTRY_PATH),
    total_sources: registry.sources.length,
    duplicate_ids: [...new Set(registryDuplicateIds)],
    sources_missing_last_checked: sourcesMissingLastChecked,
    type_counts: countBy(registry.sources, (source) => source.type ?? 'unknown'),
    trust_tier_counts: countBy(registry.sources, (source) => source.trust_tier ?? 'unknown'),
    volatility_counts: countBy(registry.sources, (source) => source.volatility ?? 'unknown'),
  },
  totals: {
    tools_scanned: tools.length,
    fact_records: tools.reduce((sum, tool) => sum + Object.values(tool.facts).filter((fact) => meaningfulValue(fact)).length, 0),
    price_history_records: tools.reduce((sum, tool) => sum + tool.priceHistory.length, 0),
  },
  provenance: {
    facts_missing_source_id: factsMissingSourceId,
    facts_with_source_but_no_source_id: factsWithSourceButNoSourceId,
    unknown_source_ids: unknownSourceIds,
    facts_missing_confidence: factsMissingConfidence,
    high_volatility_missing_next_review: highVolatilityMissingNextReview,
  },
  pricing: {
    price_history_missing_source: priceHistoryMissingSource,
    price_history_missing_verified_at: priceHistoryMissingVerifiedAt,
    price_history_unknown_source_ids: priceHistoryUnknownSourceIds,
  },
};

function issueInChangedTools(issue) {
  return changedToolPathSet.has(issue.path);
}

function sourceIdsUsedByChangedTools() {
  const ids = new Set();
  for (const tool of tools) {
    if (!changedToolPathSet.has(tool.relpath)) continue;
    for (const fact of Object.values(tool.facts)) {
      const sourceId = String(fact?.source_id ?? '').trim();
      if (sourceId) ids.add(sourceId);
    }
    for (const price of tool.priceHistory) {
      const sourceId = String(price?.source_id ?? '').trim();
      if (sourceId) ids.add(sourceId);
    }
  }
  return ids;
}

function changedReport() {
  const usedSourceIds = sourceIdsUsedByChangedTools();
  const changedSourceMissingLastChecked = registry.sources
    .filter((source) => usedSourceIds.has(source.id) && !String(source.last_checked ?? '').trim())
    .map((source) => ({ id: source.id, url: source.url }));
  const changedTools = tools.filter((tool) => changedToolPathSet.has(tool.relpath));

  const report = {
    ...result,
    mode: 'changed',
    files_checked: changedToolPaths.length,
    files: changedToolPaths,
    registry: {
      ...result.registry,
      sources_missing_last_checked: changedSourceMissingLastChecked,
    },
    totals: {
      ...result.totals,
      tools_scanned: changedTools.length,
      fact_records: changedTools.reduce((sum, tool) => sum + Object.values(tool.facts).filter((fact) => meaningfulValue(fact)).length, 0),
      price_history_records: changedTools.reduce((sum, tool) => sum + tool.priceHistory.length, 0),
    },
    provenance: {
      facts_missing_source_id: factsMissingSourceId.filter(issueInChangedTools),
      facts_with_source_but_no_source_id: factsWithSourceButNoSourceId.filter(issueInChangedTools),
      unknown_source_ids: unknownSourceIds.filter(issueInChangedTools),
      facts_missing_confidence: factsMissingConfidence.filter(issueInChangedTools),
      high_volatility_missing_next_review: highVolatilityMissingNextReview.filter(issueInChangedTools),
      git_issues: gitIssues,
    },
    pricing: {
      price_history_missing_source: priceHistoryMissingSource.filter(issueInChangedTools),
      price_history_missing_verified_at: priceHistoryMissingVerifiedAt.filter(issueInChangedTools),
      price_history_unknown_source_ids: priceHistoryUnknownSourceIds.filter(issueInChangedTools),
    },
  };
  report.ok = gitIssues.length === 0
    && report.registry.sources_missing_last_checked.length === 0
    && report.provenance.facts_missing_source_id.length === 0
    && report.provenance.unknown_source_ids.length === 0
    && report.pricing.price_history_missing_source.length === 0
    && report.pricing.price_history_missing_verified_at.length === 0
    && report.pricing.price_history_unknown_source_ids.length === 0;
  return report;
}

const output = CHANGED_MODE || CHANGED_FILE_ARGS.length > 0 ? changedReport() : result;

if (JSON_MODE) {
  console.log(JSON.stringify(output, null, 2));
} else {
  if (output.mode === 'changed' && output.ok && output.files_checked === 0) {
    console.log('[audit-provenance-pricing] changed gate skipped, no changed tool pages.');
  } else if (output.mode === 'changed' && output.ok) {
    console.log(`[audit-provenance-pricing] changed gate passed for ${output.files_checked} tool page(s).`);
  } else if (output.mode === 'changed') {
    console.error(`[audit-provenance-pricing] changed gate failed for ${output.files_checked} tool page(s).`);
  } else {
    console.log(`[audit-provenance-pricing] report-only: ${output.registry.total_sources} registered sources; ${output.totals.fact_records} fact records; ${output.provenance.facts_missing_source_id.length} facts missing source_id; ${output.pricing.price_history_missing_source.length} price history rows missing source; ${output.pricing.price_history_missing_verified_at.length} price history rows missing verified_at; ${output.registry.sources_missing_last_checked.length} registered sources missing last_checked.`);
  }
}

process.exit(output.ok ? 0 : 1);

function countBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}
