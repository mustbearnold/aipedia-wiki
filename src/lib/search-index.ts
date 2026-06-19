const STOPWORDS: Record<string, true> = {
  a: true, an: true, and: true, are: true, as: true, at: true, be: true, but: true, by: true, for: true, from: true, have: true,
  in: true, is: true, it: true, of: true, on: true, or: true, that: true, the: true, this: true, to: true, was: true, were: true,
  will: true, with: true, "it's": true, its: true, you: true, your: true, our: true, their: true, they: true, them: true,
};

export interface SearchIndexItem {
  kind?: string | null;
  title?: string | null;
  search?: string | null;
  priority?: number | string | null;
}

export interface SearchCollectionEntry {
  id: string;
  data: {
    slug?: string | null;
  };
}

export interface SearchScoreOptions {
  includeKindMatch?: boolean;
}

export function normalizeSearchText(value: unknown): string {
  return String(value || '').toLowerCase().trim();
}

export function searchTerms(value: unknown): string[] {
  return normalizeSearchText(value).split(/\s+/).filter(Boolean);
}

export function searchEntrySlug(entry: SearchCollectionEntry): string {
  return String(entry.data.slug ?? entry.id.replace(/\.md$/, '').replace(/\\/g, '/'));
}

export function buildSearchHaystack(parts: Array<string | undefined | null>): string {
  const seen = new Set<string>();
  const tokens: string[] = [];

  for (const part of parts) {
    if (!part) continue;
    for (const token of String(part).toLowerCase().split(/[^a-z0-9.+-]+/)) {
      if (!token || token.length < 2 || STOPWORDS[token]) continue;
      if (seen.has(token)) continue;
      seen.add(token);
      tokens.push(token);
    }
  }

  return tokens.join(' ');
}

export function trimSearchDetail(value: string | null | undefined, max = 140): string {
  const s = String(value || '').trim();
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + '…';
}

export function searchPriority(item: SearchIndexItem): number {
  return Number(item.priority || 0);
}

export function scoreSearchItem(
  item: SearchIndexItem,
  qTerms: readonly string[],
  query: string,
  options: SearchScoreOptions = {},
): number {
  const title = normalizeSearchText(item.title);
  const kind = normalizeSearchText(item.kind);
  const haystack = normalizeSearchText(item.search);
  let score = searchPriority(item);

  if (!qTerms.length) return score;
  if (title === query) score += 1000;
  else if (title.startsWith(query)) score += 720;
  else if (qTerms.every((term) => title.split(/[^a-z0-9]+/).includes(term))) score += 640;
  else if (qTerms.every((term) => title.includes(term))) score += 520;

  if (options.includeKindMatch && qTerms.every((term) => kind.includes(term))) score += 80;

  for (const term of qTerms) {
    if (title.startsWith(term)) score += 90;
    else if (title.includes(term)) score += 65;
    else if (haystack.includes(term)) score += 20;
  }

  return score;
}

export function searchItemMatches(
  item: SearchIndexItem,
  qTerms: readonly string[],
  score: number,
  options: SearchScoreOptions = {},
): boolean {
  if (!qTerms.length) return false;
  const haystack = options.includeKindMatch
    ? `${normalizeSearchText(item.title)} ${normalizeSearchText(item.search)} ${normalizeSearchText(item.kind)}`
    : `${normalizeSearchText(item.title)} ${normalizeSearchText(item.search)}`;
  return score > searchPriority(item) && qTerms.every((term) => haystack.includes(term));
}
