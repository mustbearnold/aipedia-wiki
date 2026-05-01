import { promises as fs } from 'node:fs';
import type { ProjectKgConfig } from '../config/schema.js';
import type { GraphBuilder } from '../graph/merge-graph.js';
import type { ScanFilesResult } from '../scanner/scan-files.js';
import { absoluteFromRepo, basenamePosix } from '../utils/paths.js';

export async function extractAgentSessions(config: ProjectKgConfig, scanned: ScanFilesResult, graph: GraphBuilder): Promise<void> {
  const runs = scanned.files.filter((file) => file.path.startsWith('agent-runs/') && file.path.endsWith('.md'));
  for (const run of runs) {
    const raw = await fs.readFile(absoluteFromRepo(config.repoRoot, run.path), 'utf8');
    const title = raw.match(/^#\s+(.+)$/m)?.[1] ?? basenamePosix(run.path);
    graph.upsertNode({
      type: 'file',
      name: title,
      path: run.path,
      metadata: { agentRun: true },
    });
  }
}
