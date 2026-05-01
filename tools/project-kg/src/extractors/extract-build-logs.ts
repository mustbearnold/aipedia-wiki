import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { ProjectKgConfig } from '../config/schema.js';
import type { GraphBuilder } from '../graph/merge-graph.js';

export async function extractBuildLogs(config: ProjectKgConfig, graph: GraphBuilder): Promise<void> {
  const logsDir = path.join(config.repoRoot, '.kg', 'logs');
  if (!existsSync(logsDir)) return;
  for (const file of readdirSync(logsDir).filter((entry) => entry.endsWith('.log'))) {
    const fullPath = path.join(logsDir, file);
    const text = readFileSync(fullPath, 'utf8');
    const errors = (text.match(/\berror\b/gi) ?? []).length;
    const warnings = (text.match(/\bwarn(?:ing)?\b/gi) ?? []).length;
    graph.addObservation({
      source: 'build-logs',
      severity: errors > 0 ? 'error' : warnings > 0 ? 'warning' : 'info',
      message: `Build log ${file}: ${errors} error marker(s), ${warnings} warning marker(s)`,
      metadata: { file: `.kg/logs/${file}`, errors, warnings },
    });
  }
}
