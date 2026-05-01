import { promises as fs } from 'node:fs';
import type { ProjectKgConfig } from '../config/schema.js';
import type { GraphBuilder } from '../graph/merge-graph.js';
import { nodeId } from '../graph/node-id.js';
import type { JsonValue } from '../graph/graph-types.js';
import type { ScanFilesResult } from '../scanner/scan-files.js';
import { absoluteFromRepo, basenamePosix } from '../utils/paths.js';

export interface ParsedFrontmatter {
  frontmatter: Record<string, JsonValue>;
  bodyStartLine: number;
  raw: string;
}

export async function extractFrontmatter(config: ProjectKgConfig, scanned: ScanFilesResult, graph: GraphBuilder): Promise<void> {
  const markdownFiles = scanned.files.filter((file) => file.path.endsWith('.md') || file.path.endsWith('.mdx'));
  for (const file of markdownFiles) {
    const node = graph.getNodeByPath(file.path);
    if (!node) continue;
    const raw = await fs.readFile(absoluteFromRepo(config.repoRoot, file.path), 'utf8');
    const parsed = parseFrontmatter(raw);
    if (!parsed) {
      graph.addObservation({
        source: 'frontmatter',
        severity: 'warning',
        message: `Missing frontmatter: ${file.path}`,
        relatedNodeId: node.id,
        metadata: { path: file.path },
      });
      continue;
    }
    graph.upsertNode({
      ...node,
      metadata: {
        ...(node.metadata ?? {}),
        frontmatter: parsed.frontmatter,
        bodyStartLine: parsed.bodyStartLine,
      },
    });
    const fmNode = graph.upsertNode({
      id: nodeId('observation', `${file.path}#frontmatter`, 'frontmatter'),
      type: 'observation',
      name: `${basenamePosix(file.path)} frontmatter`,
      path: `${file.path}#frontmatter`,
      metadata: {
        keys: Object.keys(parsed.frontmatter),
      },
    });
    graph.addEdge(node.id, 'has_frontmatter', fmNode.id, {
      file: file.path,
      line: 1,
      reason: 'frontmatter block present',
    });
  }
}

export function parseFrontmatter(raw: string): ParsedFrontmatter | null {
  if (!raw.startsWith('---\n') && !raw.startsWith('---\r\n')) return null;
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return null;
  const yaml = match[1] ?? '';
  const bodyStartLine = match[0].split(/\r?\n/).length;
  return {
    raw: yaml,
    bodyStartLine,
    frontmatter: parseSimpleYaml(yaml),
  };
}

export function parseSimpleYaml(yaml: string): Record<string, JsonValue> {
  const result: Record<string, JsonValue> = {};
  const lines = yaml.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line || line.trim().startsWith('#') || /^\s/.test(line)) continue;
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const key = match[1];
    const rawValue = match[2] ?? '';
    if (rawValue === '>' || rawValue === '>-' || rawValue === '|' || rawValue === '|-') {
      const folded: string[] = [];
      for (let j = i + 1; j < lines.length; j += 1) {
        if (!/^\s+/.test(lines[j])) break;
        folded.push(lines[j].trim());
        i = j;
      }
      result[key] = folded.join(' ');
      continue;
    }
    result[key] = parseYamlScalar(rawValue);
  }
  return result;
}

function parseYamlScalar(raw: string): JsonValue {
  const value = raw.trim();
  if (!value) return '';
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => stripQuotes(item.trim()))
      .filter(Boolean);
  }
  return stripQuotes(value);
}

function stripQuotes(value: string): string {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}
