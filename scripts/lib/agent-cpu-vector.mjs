const STOP_WORDS = new Set([
  'a',
  'about',
  'after',
  'all',
  'also',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'before',
  'but',
  'by',
  'can',
  'for',
  'from',
  'has',
  'have',
  'if',
  'in',
  'into',
  'is',
  'it',
  'its',
  'not',
  'of',
  'on',
  'or',
  'should',
  'that',
  'the',
  'this',
  'to',
  'use',
  'with',
  'when',
  'where',
  'who',
  'will',
  'you',
]);

export function tokenizeForVector(text) {
  return String(text)
    .toLowerCase()
    .match(/[a-z0-9][a-z0-9-]{1,}/g)
    ?.map((token) => token.replace(/^-+|-+$/g, ''))
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token)) ?? [];
}

export function stableHash(value) {
  let hash = 2166136261;
  for (const char of String(value)) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash >>> 0;
}

export function buildSparseVector(text, options = {}) {
  const dimensions = Number(options.dimensions ?? 128);
  const maxTerms = Number(options.maxTerms ?? 24);
  const counts = new Map();
  const terms = new Map();

  for (const token of tokenizeForVector(text)) {
    const index = stableHash(token) % dimensions;
    counts.set(index, (counts.get(index) ?? 0) + 1);
    terms.set(token, (terms.get(token) ?? 0) + 1);
  }

  const norm = Math.sqrt([...counts.values()].reduce((sum, count) => sum + (count * count), 0)) || 1;
  const values = [...counts.entries()]
    .map(([index, count]) => [index, Number((count / norm).toFixed(6))])
    .sort((a, b) => a[0] - b[0]);

  return {
    model: 'cpu-lexical-hash-v1',
    dimensions,
    values,
    top_terms: [...terms.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, maxTerms)
      .map(([term, count]) => ({ term, count })),
  };
}

export function cosineSparse(a, b) {
  const valuesA = new Map((a?.values ?? []).map(([index, value]) => [index, value]));
  let dot = 0;
  for (const [index, value] of b?.values ?? []) {
    dot += (valuesA.get(index) ?? 0) * value;
  }
  return Number(Math.max(0, Math.min(1, dot)).toFixed(6));
}
