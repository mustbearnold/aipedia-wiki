import type { Evidence } from './graph-types.js';

export function evidence(file: string, line?: number, snippet?: string, extra: Record<string, unknown> = {}): Evidence {
  return {
    file,
    ...(line ? { line } : {}),
    ...(snippet ? { snippet: snippet.trim().slice(0, 240) } : {}),
    ...extra,
  } as Evidence;
}
