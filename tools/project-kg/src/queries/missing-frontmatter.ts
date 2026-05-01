import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { DatabaseSync } from 'node:sqlite';
import { safeJsonParse } from '../utils/json.js';

export interface MissingFrontmatterRow {
  path: string;
  missing: string[];
}

export function missingFrontmatter(db: DatabaseSync, repoRoot: string): MissingFrontmatterRow[] {
  const required = inferRequiredFrontmatter(repoRoot);
  const rows = db.prepare(`
    SELECT path, metadata_json FROM nodes
    WHERE type = 'markdown_page' AND path LIKE 'src/content/%'
    ORDER BY path
  `).all() as Array<{ path: string; metadata_json: string | null }>;

  const missing: MissingFrontmatterRow[] = [];
  for (const row of rows) {
    const collection = row.path.split('/')[2] ?? '';
    const requiredFields = required[collection] ?? ['title'];
    const metadata = safeJsonParse<Record<string, unknown>>(row.metadata_json, {});
    const frontmatter = (metadata.frontmatter ?? {}) as Record<string, unknown>;
    const absent = requiredFields.filter((field) => frontmatter[field] === undefined || frontmatter[field] === '');
    if (absent.length) missing.push({ path: row.path, missing: absent });
  }
  return missing;
}

export function inferRequiredFrontmatter(repoRoot: string): Record<string, string[]> {
  const configPath = path.join(repoRoot, 'src/content.config.ts');
  let raw = '';
  try {
    raw = readFileSync(configPath, 'utf8');
  } catch {
    return {};
  }

  const collections: Record<string, string[]> = {};
  const collectionBlocks = raw.matchAll(/const\s+([A-Za-z0-9_]+)\s*=\s*defineCollection\(\{([\s\S]*?)\n\}\);/g);
  for (const match of collectionBlocks) {
    const constName = match[1];
    const block = match[2] ?? '';
    const base = block.match(/base:\s*['"]src\/content\/([^'"]+)['"]/)?.[1];
    if (!base) continue;
    const schema = block.match(/schema:\s*z\.object\(\{([\s\S]*?)\n\s*\}\)\.passthrough/)?.[1] ?? block;
    const candidateLines = schema
      .split(/\r?\n/)
      .map((line) => ({ line, match: line.match(/^(\s+)([A-Za-z0-9_-]+):\s*z\./) }))
      .filter((entry): entry is { line: string; match: RegExpMatchArray } => Boolean(entry.match));
    const topLevelIndent = Math.min(...candidateLines.map((entry) => entry.match[1].length));
    const fields: string[] = [];
    for (const { line, match: fieldMatch } of candidateLines) {
      const trimmed = line.trim();
      if (fieldMatch[1].length !== topLevelIndent) continue;
      const field = fieldMatch[2];
      if (trimmed.includes('.optional()')) continue;
      if (trimmed.includes('z.object(') || trimmed.includes('z.array(')) continue;
      fields.push(field);
    }
    collections[base] = fields.length ? [...new Set(fields)] : ['title'];
    if (constName === 'news' && !collections[base].includes('date')) collections[base].push('date');
  }
  return collections;
}
