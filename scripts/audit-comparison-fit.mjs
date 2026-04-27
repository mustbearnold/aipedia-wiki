import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const PROJECT_DIR = process.cwd();
const TOOLS_DIR = join(PROJECT_DIR, 'src', 'content', 'tools');
const COMPARISONS_DIR = join(PROJECT_DIR, 'src', 'content', 'comparisons');

const args = new Set(process.argv.slice(2));
const failOnHigh = args.has('--fail-on-high');
const asJson = args.has('--json');

const CATEGORY_LANES = {
  'ai-chatbots': 'assistant',
  'ai-writing': 'writing',
  'ai-search': 'search',
  'ai-research': 'research',
  'ai-coding': 'coding',
  'ai-design': 'design',
  'ai-image': 'image',
  'ai-video': 'video',
  'ai-voice': 'voice',
  'ai-music': 'music',
  'ai-notes': 'notes',
  'ai-seo': 'seo',
  'ai-automation': 'automation',
  'ai-presentation': 'presentation',
  'ai-infrastructure': 'infrastructure',
  'ai-app-builders': 'app-builder',
};

const ADJACENT_LANES = [
  ['assistant', 'writing'],
  ['assistant', 'search'],
  ['assistant', 'research'],
  ['assistant', 'coding'],
  ['writing', 'seo'],
  ['writing', 'notes'],
  ['writing', 'presentation'],
  ['search', 'research'],
  ['search', 'seo'],
  ['research', 'notes'],
  ['coding', 'automation'],
  ['coding', 'app-builder'],
  ['coding', 'infrastructure'],
  ['app-builder', 'design'],
  ['automation', 'app-builder'],
  ['design', 'image'],
  ['design', 'video'],
  ['design', 'presentation'],
  ['image', 'video'],
  ['voice', 'video'],
  ['voice', 'music'],
  ['voice', 'notes'],
  ['notes', 'presentation'],
];

const HARD_MISMATCH_LANES = [
  ['assistant', 'image'],
  ['assistant', 'video'],
  ['assistant', 'voice'],
  ['assistant', 'music'],
];

const BODY_RED_FLAGS = [
  'serve different primary functions',
  'serve fundamentally different purposes',
  'not direct competitors',
  'not substitutes',
  'used together rather than',
  'often used together',
  'complementary rather than competitive',
  'complement each other',
  'different purposes and are often used together',
];

function pairKey(a, b) {
  return [a, b].sort().join('|');
}

const adjacentLanePairs = new Set(ADJACENT_LANES.map(([a, b]) => pairKey(a, b)));
const hardMismatchPairs = new Set(HARD_MISMATCH_LANES.map(([a, b]) => pairKey(a, b)));

function readMarkdown(file) {
  const text = readFileSync(file, 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  return {
    frontmatter: match?.[1] ?? '',
    body: match ? text.slice(match[0].length) : text,
  };
}

function parseFrontmatter(frontmatter) {
  const data = {};
  for (const rawLine of frontmatter.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || !line.includes(':')) continue;

    const delimiter = line.indexOf(':');
    const key = line.slice(0, delimiter).trim();
    let value = line.slice(delimiter + 1).trim();
    if (!value) continue;

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((part) => part.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    } else {
      data[key] = value;
    }
  }
  return data;
}

function canonicalLane(category) {
  return CATEGORY_LANES[category] ?? category ?? 'unknown';
}

function loadTools() {
  const tools = new Map();
  for (const filename of readdirSync(TOOLS_DIR).filter((name) => name.endsWith('.md'))) {
    const file = join(TOOLS_DIR, filename);
    const { frontmatter } = readMarkdown(file);
    const data = parseFrontmatter(frontmatter);
    const slug = data.slug ?? filename.replace(/\.md$/, '');
    const categories = [
      data.category,
      ...(Array.isArray(data.secondary_categories) ? data.secondary_categories : []),
    ].filter(Boolean);

    tools.set(slug, {
      slug,
      title: data.title ?? slug,
      lanes: categories.map(canonicalLane),
    });
  }
  return tools;
}

function fitPair(toolA, toolB) {
  if (!toolA || !toolB) {
    return {
      direct: false,
      adjacent: false,
      hardMismatch: false,
      shared: [],
      reason: 'missing tool metadata',
    };
  }

  const shared = toolA.lanes.filter((lane) => toolB.lanes.includes(lane));
  const adjacent = toolA.lanes.some((a) => toolB.lanes.some((b) => adjacentLanePairs.has(pairKey(a, b))));
  const hardMismatch = toolA.lanes.some((a) => toolB.lanes.some((b) => hardMismatchPairs.has(pairKey(a, b))));

  return {
    direct: shared.length > 0,
    adjacent,
    hardMismatch,
    shared,
    reason: shared.length > 0 ? 'shared lane' : adjacent ? 'adjacent buyer lane' : 'no direct lane fit',
  };
}

function auditComparison(file, toolsBySlug) {
  const { frontmatter, body } = readMarkdown(file);
  const data = parseFrontmatter(frontmatter);
  const toolSlugs = Array.isArray(data.tools) ? data.tools : [];
  const bodyLower = body.toLowerCase();
  const redFlags = BODY_RED_FLAGS.filter((phrase) => bodyLower.includes(phrase));
  const pairs = [];

  for (let i = 0; i < toolSlugs.length; i += 1) {
    for (let j = i + 1; j < toolSlugs.length; j += 1) {
      const slugA = toolSlugs[i];
      const slugB = toolSlugs[j];
      const toolA = toolsBySlug.get(slugA);
      const toolB = toolsBySlug.get(slugB);
      pairs.push({
        slugs: [slugA, slugB],
        lanes: [toolA?.lanes ?? ['unknown'], toolB?.lanes ?? ['unknown']],
        fit: fitPair(toolA, toolB),
      });
    }
  }

  const hasMissingTool = pairs.some((pair) => pair.fit.reason === 'missing tool metadata');
  const hasNoDirectFit = pairs.some((pair) => !pair.fit.direct && !pair.fit.adjacent);
  const hasHardMismatch = pairs.some((pair) => pair.fit.hardMismatch);
  const hasRedFlag = redFlags.length > 0;

  let severity = 'ok';
  if (hasMissingTool || (hasNoDirectFit && (hasHardMismatch || hasRedFlag))) {
    severity = 'high';
  } else if (hasNoDirectFit || hasRedFlag) {
    severity = 'review';
  }

  return {
    file: relative(PROJECT_DIR, file).replace(/\\/g, '/'),
    title: data.title ?? file,
    tools: toolSlugs,
    category: data.category,
    severity,
    redFlags,
    pairs,
  };
}

const toolsBySlug = loadTools();
const results = readdirSync(COMPARISONS_DIR)
  .filter((name) => name.endsWith('.md'))
  .map((name) => auditComparison(join(COMPARISONS_DIR, name), toolsBySlug))
  .filter((result) => result.severity !== 'ok')
  .sort((a, b) => {
    const severityRank = { high: 0, review: 1, ok: 2 };
    return severityRank[a.severity] - severityRank[b.severity] || a.file.localeCompare(b.file);
  });

if (asJson) {
  console.log(JSON.stringify(results, null, 2));
} else if (results.length === 0) {
  console.log('[audit-comparison-fit] no suspicious comparison pairs found.');
} else {
  console.log(`[audit-comparison-fit] ${results.length} suspicious comparison page(s):`);
  for (const result of results) {
    const pairSummary = result.pairs
      .map((pair) => `${pair.slugs.join(' vs ')} (${pair.fit.reason})`)
      .join('; ');
    const redFlagSummary = result.redFlags.length > 0 ? `; copy: ${result.redFlags.join(', ')}` : '';
    console.log(`- [${result.severity}] ${result.file}: ${pairSummary}${redFlagSummary}`);
  }
  console.log('\nReview high-severity pages first. This script reports candidates only; it never deletes content.');
}

if (failOnHigh && results.some((result) => result.severity === 'high')) {
  process.exitCode = 1;
}
