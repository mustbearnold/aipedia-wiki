import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import type { ProjectKgConfig } from '../config/schema.js';
import type { GraphBuilder } from '../graph/merge-graph.js';

const execFileAsync = promisify(execFile);

export async function extractGitHistory(config: ProjectKgConfig, graph: GraphBuilder): Promise<void> {
  try {
    const { stdout } = await execFileAsync('git', ['log', '--name-only', '--pretty=format:commit %H %cs', '-n', '25'], {
      cwd: config.repoRoot,
      maxBuffer: 1024 * 1024,
    });
    const touched = new Set(stdout.split(/\r?\n/).filter((line) => line && !line.startsWith('commit ')));
    graph.addObservation({
      source: 'git-history',
      severity: 'info',
      message: `Recent git history mentions ${touched.size} file(s) across last 25 commits`,
      metadata: { touchedFileCount: touched.size },
    });
  } catch (error) {
    graph.addObservation({
      source: 'git-history',
      severity: 'warning',
      message: 'Could not read recent git history',
      metadata: { error: error instanceof Error ? error.message : String(error) },
    });
  }
}
