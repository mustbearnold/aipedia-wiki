import { getCollection } from 'astro:content';
import { isActiveToolStatus, overallScore } from '../utils/tool-metadata';

export interface ToolPeerSummary {
  slug: string;
  title: string;
  tagline: string;
  price: string;
  score: number;
}

export interface RelatedComparisonSummary {
  slug: string;
  title: string;
  meta_description: string;
}

interface MoatLayerCategory {
  slug: string;
  label: string;
  count: number;
  avg: number;
  colorA: string;
  colorB: string;
}

interface MoatLayerData {
  tools: number;
  comparisons: number;
  categories: MoatLayerCategory[];
  news: {
    total: number;
    recent: number;
    breaking: number;
    major: number;
    affectedTools: number;
  };
}

const collectionCache = new Map<string, Promise<any[]>>();
let activeToolCountPromise: Promise<number> | undefined;
let toolCategoryPeerMapPromise: Promise<Map<string, ToolPeerSummary[]>> | undefined;
let toolDataBySlugMapPromise: Promise<Map<string, Record<string, any>>> | undefined;
let relatedComparisonMapPromise: Promise<Map<string, RelatedComparisonSummary[]>> | undefined;
let moatLayerDataPromise: Promise<MoatLayerData> | undefined;

function cacheEnabled(): boolean {
  return import.meta.env.PROD;
}

export async function getCachedCollection(collection: string): Promise<any[]> {
  if (!cacheEnabled()) return getCollection(collection as any) as Promise<any[]>;

  const key = String(collection);
  let cached = collectionCache.get(key);
  if (!cached) {
    cached = getCollection(collection as any) as Promise<any[]>;
    collectionCache.set(key, cached);
  }
  return cached;
}

export async function getActiveToolCount(): Promise<number> {
  if (!cacheEnabled()) return buildActiveToolCount();
  activeToolCountPromise ??= buildActiveToolCount();
  return activeToolCountPromise;
}

async function buildActiveToolCount(): Promise<number> {
  const tools = await getCachedCollection('tools');
  return tools.filter((tool) => isActiveToolStatus(tool.data.status)).length;
}

export async function getToolCategoryPeers(category: string): Promise<ToolPeerSummary[]> {
  if (!category) return [];
  if (!cacheEnabled()) {
    const fresh = await buildToolCategoryPeerMap();
    return fresh.get(category) ?? [];
  }

  toolCategoryPeerMapPromise ??= buildToolCategoryPeerMap();
  const map = await toolCategoryPeerMapPromise;
  return map.get(category) ?? [];
}

async function buildToolCategoryPeerMap(): Promise<Map<string, ToolPeerSummary[]>> {
  const tools = await getCachedCollection('tools');
  const byCategory = new Map<string, ToolPeerSummary[]>();

  for (const tool of tools) {
    const category = tool.data.category;
    if (!category || !isActiveToolStatus(tool.data.status)) continue;

    const slug = tool.data.slug ?? String(tool.id ?? '').replace(/\.md$/, '');
    const peers = byCategory.get(category) ?? [];
    peers.push({
      slug,
      title: tool.data.title ?? slug,
      tagline: String(tool.data.tagline ?? '').replace(/\s+/g, ' ').trim().slice(0, 128),
      price: tool.data.price_range ?? '',
      score: overallScore(tool.data.scores ?? {}),
    });
    byCategory.set(category, peers);
  }

  for (const peers of byCategory.values()) {
    peers.sort((a, b) => b.score - a.score);
  }

  return byCategory;
}

export async function getToolDataBySlugMap(): Promise<Map<string, Record<string, any>>> {
  if (!cacheEnabled()) return buildToolDataBySlugMap();
  toolDataBySlugMapPromise ??= buildToolDataBySlugMap();
  return toolDataBySlugMapPromise;
}

async function buildToolDataBySlugMap(): Promise<Map<string, Record<string, any>>> {
  const tools = await getCachedCollection('tools');
  const bySlug = new Map<string, Record<string, any>>();

  for (const tool of tools) {
    const slug = tool.data.slug ?? String(tool.id ?? '').replace(/\.md$/, '').replace(/\\/g, '/');
    bySlug.set(slug, { ...tool.data, slug });
  }

  return bySlug;
}

export async function getRelatedComparisonsForTool(toolSlug: string): Promise<RelatedComparisonSummary[]> {
  if (!toolSlug) return [];
  if (!cacheEnabled()) {
    const fresh = await buildRelatedComparisonMap();
    return fresh.get(toolSlug) ?? [];
  }

  relatedComparisonMapPromise ??= buildRelatedComparisonMap();
  const map = await relatedComparisonMapPromise;
  return map.get(toolSlug) ?? [];
}

const staleComparisonCardCopy = /(Opus 4\.7|GPT-5\.3|premium requests?|premium-request|7\.5x)/i;

function dateKey(value: unknown): string {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString().slice(0, 10);
}

async function buildRelatedComparisonMap(): Promise<Map<string, RelatedComparisonSummary[]>> {
  const comparisons = await getCachedCollection('comparisons');
  const byTool = new Map<string, RelatedComparisonSummary[]>();

  const usable = comparisons
    .filter((comparison) => Array.isArray(comparison.data.tools))
    .filter((comparison) => !staleComparisonCardCopy.test(comparison.data.meta_description ?? ''))
    .sort((a, b) => {
      const dateCompare = dateKey(b.data.last_verified ?? b.data.last_updated).localeCompare(
        dateKey(a.data.last_verified ?? a.data.last_updated),
      );
      if (dateCompare !== 0) return dateCompare;
      return String(a.data.title ?? '').localeCompare(String(b.data.title ?? ''));
    });

  for (const comparison of usable) {
    const summary: RelatedComparisonSummary = {
      slug: comparison.data.slug ?? String(comparison.id ?? '').replace(/\.md$/, ''),
      title: comparison.data.title ?? '',
      meta_description: comparison.data.meta_description ?? '',
    };
    for (const slug of comparison.data.tools) {
      const list = byTool.get(slug) ?? [];
      if (list.length < 6) list.push(summary);
      byTool.set(slug, list);
    }
  }

  return byTool;
}

export async function getMoatLayerData(): Promise<MoatLayerData> {
  if (!cacheEnabled()) return buildMoatLayerData();
  moatLayerDataPromise ??= buildMoatLayerData();
  return moatLayerDataPromise;
}

const moatPalette: Record<string, { a: string; b: string }> = {
  'ai-automation': { a: '#fb923c', b: '#f97316' },
  'ai-chatbots': { a: '#fb923c', b: '#fbbf24' },
  'ai-coding': { a: '#fb923c', b: '#fbbf24' },
  'ai-design': { a: '#fb923c', b: '#f97316' },
  'ai-image': { a: '#fbbf24', b: '#fb923c' },
  'ai-music': { a: '#f97316', b: '#fb923c' },
  'ai-notes': { a: '#fb923c', b: '#f97316' },
  'ai-presentation': { a: '#fb923c', b: '#fbbf24' },
  'ai-research': { a: '#fb923c', b: '#fbbf24' },
  'ai-search': { a: '#fb923c', b: '#f97316' },
  'ai-seo': { a: '#fbbf24', b: '#f97316' },
  'ai-video': { a: '#fb923c', b: '#fb923c' },
  'ai-voice': { a: '#fb923c', b: '#fbbf24' },
  'ai-writing': { a: '#fb923c', b: '#f97316' },
};

async function buildMoatLayerData(): Promise<MoatLayerData> {
  const [allTools, allCategories, allNews, allComparisons] = await Promise.all([
    getCachedCollection('tools'),
    getCachedCollection('categories'),
    getCachedCollection('news'),
    getCachedCollection('comparisons'),
  ]);

  const activeTools = allTools.filter((tool) => isActiveToolStatus(tool.data.status));
  const categoryCounts: Record<string, number> = {};
  const categoryScoreSums: Record<string, number> = {};

  for (const tool of activeTools) {
    const category = tool.data.category;
    if (!category) continue;
    categoryCounts[category] = (categoryCounts[category] ?? 0) + 1;
    categoryScoreSums[category] = (categoryScoreSums[category] ?? 0) + overallScore(tool.data.scores);
  }

  const categories = allCategories
    .map((category) => {
      const slug = category.data.slug ?? String(category.id ?? '').replace(/\.md$/, '');
      const count = categoryCounts[slug] ?? 0;
      return {
        slug,
        label: category.data.title,
        count,
        avg: count > 0 ? Math.round(((categoryScoreSums[slug] ?? 0) / count) * 10) / 10 : 0,
        colorA: moatPalette[slug]?.a ?? '#f97316',
        colorB: moatPalette[slug]?.b ?? '#fbbf24',
      };
    })
    .sort((a, b) => b.count - a.count);

  const now = Date.now();
  const recentNews = allNews
    .map((item) => ({
      date: new Date(String(item.data.date)),
      severity: String(item.data.severity ?? 'minor'),
      affects: Array.isArray(item.data.affects) ? item.data.affects.length : 0,
    }))
    .filter((item) => !Number.isNaN(item.date.getTime()))
    .filter((item) => {
      const age = (now - item.date.getTime()) / 86400000;
      return age >= 0 && age <= 14;
    });

  return {
    tools: activeTools.length,
    comparisons: allComparisons.length,
    categories,
    news: {
      total: allNews.length,
      recent: recentNews.length,
      breaking: recentNews.filter((item) => item.severity === 'breaking').length,
      major: recentNews.filter((item) => item.severity === 'major').length,
      affectedTools: recentNews.reduce((sum, item) => sum + item.affects, 0),
    },
  };
}
