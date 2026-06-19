import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const ROOT = process.cwd();
const TOOLS_DIR = join(ROOT, 'src/content/tools');

function frontmatterFor(path) {
  const text = readFileSync(path, 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match?.[1] ?? '';
}

function scalar(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return match?.[1]?.replace(/^['"]|['"]$/g, '').trim() ?? '';
}

function inlineArray(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, 'm'));
  if (!match) return [];
  return match[1]
    .split(',')
    .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
}

function score(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^\\s{2}${key}:\\s*(\\d+(?:\\.\\d+)?)`, 'm'));
  return match ? Number(match[1]) : 0;
}

function overall(tool) {
  return Math.round(((tool.utility + tool.value + tool.moat + tool.longevity) / 4) * 10) / 10;
}

function loadTools() {
  return readdirSync(TOOLS_DIR)
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const frontmatter = frontmatterFor(join(TOOLS_DIR, name));
      return {
        slug: scalar(frontmatter, 'slug') || name.replace(/\.md$/, ''),
        title: scalar(frontmatter, 'title'),
        status: scalar(frontmatter, 'status'),
        category: scalar(frontmatter, 'category'),
        secondaryCategories: inlineArray(frontmatter, 'secondary_categories'),
        utility: score(frontmatter, 'utility'),
        value: score(frontmatter, 'value'),
        moat: score(frontmatter, 'moat'),
        longevity: score(frontmatter, 'longevity'),
      };
    });
}

test('category pages preserve primary-category tools ahead of secondary matches', () => {
  const routeSource = readFileSync(join(ROOT, 'src/pages/categories/[slug].astro'), 'utf8');
  const layoutSource = readFileSync(join(ROOT, 'src/layouts/CategoryLayout.astro'), 'utf8');

  assert.match(routeSource, /category_match_type:\s*primaryMatch \? 'primary' : 'secondary'/);
  assert.match(layoutSource, /categoryMatchRank\(t: ToolData\)/);
  assert.match(layoutSource, /configuredPickCards/);
  assert.doesNotMatch(layoutSource, /reason: typeof raw === 'object' && raw\.reason/);
  assert.doesNotMatch(layoutSource, /gt-category-tier-reason/);
  assert.match(routeSource, /decisionPicks=\{entry\.data\.decision_picks\}/);
  assert.match(layoutSource, /normalizeDecisionPick/);
  assert.match(layoutSource, /resolvePageSource\(\{ source_id: sourceRef \}, 'decision'\)/);
  assert.match(layoutSource, /gt-category-buyer-path/);
  assert.match(layoutSource, /<EvidenceRail evidence=\{pick\.evidence\}/);
  assert.match(layoutSource, /href=\{`\/compare\/build\/\?tools=\$\{pick\.tool\}`\}/);

  const tools = loadTools();
  const aiDesignTools = tools
    .filter((tool) => tool.status === 'active')
    .flatMap((tool) => {
      const primary = tool.category === 'ai-design';
      const secondary = tool.secondaryCategories.includes('ai-design');
      if (!primary && !secondary) return [];
      return [{ ...tool, matchType: primary ? 'primary' : 'secondary' }];
    })
    .sort((a, b) => {
      const matchDelta = (b.matchType === 'primary' ? 1 : 0) - (a.matchType === 'primary' ? 1 : 0);
      if (matchDelta !== 0) return matchDelta;
      const scoreDelta = overall(b) - overall(a);
      if (scoreDelta !== 0) return scoreDelta;
      return a.title.localeCompare(b.title);
    });

  assert.ok(aiDesignTools.length > 0);
  assert.equal(aiDesignTools[0].matchType, 'primary');
  assert.notEqual(aiDesignTools[0].slug, 'claude');
  assert.ok(
    aiDesignTools.slice(0, 5).every((tool) => tool.matchType === 'primary'),
    `expected first five AI Design tools to be primary matches, got ${aiDesignTools
      .slice(0, 5)
      .map((tool) => `${tool.slug}:${tool.matchType}`)
      .join(', ')}`,
  );
});
