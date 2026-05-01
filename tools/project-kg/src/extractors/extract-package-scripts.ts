import { promises as fs } from 'node:fs';
import type { ProjectKgConfig } from '../config/schema.js';
import type { GraphBuilder } from '../graph/merge-graph.js';
import type { ScanFilesResult } from '../scanner/scan-files.js';
import { absoluteFromRepo } from '../utils/paths.js';

export async function extractPackageScripts(config: ProjectKgConfig, scanned: ScanFilesResult, graph: GraphBuilder): Promise<void> {
  const packageFiles = scanned.files.filter((file) => file.path === 'package.json' || file.path.endsWith('/package.json'));
  for (const packageFile of packageFiles) {
    const packageNode = graph.getNodeByPath(packageFile.path);
    if (!packageNode) continue;
    const raw = await fs.readFile(absoluteFromRepo(config.repoRoot, packageFile.path), 'utf8');
    let parsed: { scripts?: Record<string, string>; name?: string } = {};
    try {
      parsed = JSON.parse(raw) as typeof parsed;
    } catch {
      graph.addObservation({
        source: 'package-scripts',
        severity: 'warning',
        message: `Could not parse ${packageFile.path}`,
        relatedNodeId: packageNode.id,
      });
      continue;
    }
    for (const [name, command] of Object.entries(parsed.scripts ?? {})) {
      const scriptNode = graph.upsertNode({
        type: 'script',
        name,
        path: `${packageFile.path}#scripts.${name}`,
        metadata: {
          command,
          packageName: parsed.name ?? '',
          packagePath: packageFile.path,
        },
      });
      graph.addEdge(packageNode.id, 'defines_script', scriptNode.id, {
        file: packageFile.path,
        reason: 'package.json script',
        script: name,
      });
    }
  }
}
