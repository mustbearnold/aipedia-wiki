import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

export function projectPath(projectDir, path) {
  return relative(projectDir, path).replace(/\\/g, '/');
}

export function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function stripYamlQuotes(value) {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) return '';
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

export function scalar(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${escapeRegExp(key)}:\\s*(.*)$`, 'm'));
  if (!match) return '';
  const value = stripYamlQuotes(match[1]);
  if (value === '[]' || value === '{}') return '';
  return value;
}

export function markdownFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => join(dir, name));
}

export function readMarkdown(path) {
  const raw = readFileSync(path, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const frontmatter = match?.[1] ?? '';
  return { path, raw, frontmatter };
}

export function parseSlug(frontmatter, path) {
  return scalar(frontmatter, 'slug') || path.split(/[\\/]/).pop().replace(/\.md$/, '');
}

export function parseNestedMap(frontmatter, rootKey) {
  const records = {};
  const lines = frontmatter.split(/\r?\n/);
  let inRoot = false;
  let currentKey = '';

  for (const line of lines) {
    if (!inRoot) {
      if (new RegExp(`^${escapeRegExp(rootKey)}:\\s*$`).test(line)) inRoot = true;
      continue;
    }

    if (line.trim() === '') continue;
    if (!/^\s+/.test(line)) break;

    const scalarItem = line.match(/^\s{2}([A-Za-z0-9_]+):\s*(.+)$/);
    if (scalarItem && scalarItem[2].trim() !== '') {
      currentKey = scalarItem[1];
      records[currentKey] = { value: stripYamlQuotes(scalarItem[2]) };
      continue;
    }

    const nested = line.match(/^\s{2}([A-Za-z0-9_]+):\s*$/);
    if (nested) {
      currentKey = nested[1];
      records[currentKey] = records[currentKey] ?? {};
      continue;
    }

    const nestedValue = line.match(/^\s{4}([A-Za-z0-9_]+):\s*(.+)$/);
    if (currentKey && nestedValue) {
      records[currentKey][nestedValue[1]] = stripYamlQuotes(nestedValue[2]);
    }
  }

  return records;
}

export function meaningfulValue(record) {
  const value = String(record?.value ?? '').trim();
  return value && value !== '[]' && value !== '{}';
}

export function parseDate(value) {
  const raw = String(value ?? '').trim();
  if (!/^\d{4}-\d{2}-\d{2}/.test(raw)) return null;
  const date = new Date(`${raw.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

export function daysSince(value, now = new Date()) {
  const date = parseDate(value);
  if (!date) return null;
  return Math.max(0, Math.floor((now.getTime() - date.getTime()) / 86_400_000));
}

export function loadSourceRegistry(path) {
  if (!existsSync(path)) return { version: 0, sources: [] };
  const registry = JSON.parse(readFileSync(path, 'utf8'));
  return { ...registry, sources: Array.isArray(registry.sources) ? registry.sources : [] };
}

export function parsePriceHistory(frontmatter) {
  const items = [];
  const lines = frontmatter.split(/\r?\n/);
  let inPriceHistory = false;
  let current = null;

  for (const line of lines) {
    if (!inPriceHistory) {
      if (/^price_history:\s*$/.test(line)) inPriceHistory = true;
      continue;
    }

    if (line.trim() === '') continue;
    if (!/^\s+/.test(line)) break;

    const newItem = line.match(/^\s{2}-\s+([A-Za-z0-9_]+):\s*(.+)$/);
    if (newItem) {
      current = { [newItem[1]]: stripYamlQuotes(newItem[2]) };
      items.push(current);
      continue;
    }

    const field = line.match(/^\s{4}([A-Za-z0-9_]+):\s*(.+)$/);
    if (current && field) current[field[1]] = stripYamlQuotes(field[2]);
  }

  return items;
}
