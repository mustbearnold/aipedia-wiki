function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function normalizeValue(value) {
  if (Array.isArray(value)) return value.map(normalizeValue);
  if (!isPlainObject(value)) return value;

  const normalized = {};
  for (const key of Object.keys(value).sort()) {
    if (key === 'fetched_at') continue;
    normalized[key] = normalizeValue(value[key]);
  }
  return normalized;
}

export function comparableGithubStats(stats) {
  if (!isPlainObject(stats)) return {};

  const comparable = {};
  for (const slug of Object.keys(stats).sort()) {
    comparable[slug] = normalizeValue(stats[slug]);
  }
  return comparable;
}

export function githubStatsMatchRenderedFields(previousStats, nextStats) {
  return JSON.stringify(comparableGithubStats(previousStats)) === JSON.stringify(comparableGithubStats(nextStats));
}
