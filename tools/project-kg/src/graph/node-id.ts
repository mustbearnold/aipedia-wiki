import { createHash } from 'node:crypto';
import type { NodeType } from './graph-types.js';
import { toPosixPath } from '../utils/paths.js';

export function nodeId(type: NodeType, path: string | undefined, name: string): string {
  const key = `${type}:${toPosixPath(path ?? '')}:${name}`;
  return `${type}:${createHash('sha1').update(key).digest('hex').slice(0, 16)}`;
}
