import { openProjectDb, clearGraph } from '../db/connection.js';
import { upsertNode } from '../db/nodes.js';
import { upsertEdge } from '../db/edges.js';
import { insertObservation } from '../db/observations.js';
import { loadProjectConfig } from '../config/project-config.js';
import { GraphBuilder } from '../graph/merge-graph.js';
import { scanFiles } from './scan-files.js';
import { extractFiles } from '../extractors/extract-files.js';
import { extractPackageScripts } from '../extractors/extract-package-scripts.js';
import { extractImports } from '../extractors/extract-imports.js';
import { extractAstroRoutes } from '../extractors/extract-astro-routes.js';
import { extractFrontmatter } from '../extractors/extract-frontmatter.js';
import { extractMarkdownLinks } from '../extractors/extract-markdown-links.js';
import { extractAssets } from '../extractors/extract-assets.js';
import { extractGitHistory } from '../extractors/extract-git-history.js';
import { extractBuildLogs } from '../extractors/extract-build-logs.js';
import { extractAgentSessions } from '../extractors/extract-agent-sessions.js';

export interface ScanProjectResult {
  dbPath: string;
  nodeCount: number;
  edgeCount: number;
  observationCount: number;
  fileCount: number;
  directoryCount: number;
}

export async function scanProject(startDir = process.cwd()): Promise<ScanProjectResult> {
  const config = loadProjectConfig(startDir);
  const scanned = await scanFiles(config);
  const graph = new GraphBuilder();

  extractFiles(config, scanned, graph);
  await extractPackageScripts(config, scanned, graph);
  await extractFrontmatter(config, scanned, graph);
  await extractAstroRoutes(config, scanned, graph);
  await extractImports(config, scanned, graph);
  await extractMarkdownLinks(config, scanned, graph);
  await extractAssets(config, scanned, graph);
  await extractGitHistory(config, graph);
  await extractBuildLogs(config, graph);
  await extractAgentSessions(config, scanned, graph);

  const projectDb = openProjectDb(config.repoRoot, { reset: true });
  try {
    clearGraph(projectDb.db);
    projectDb.db.exec('BEGIN');
    for (const node of graph.nodes.values()) upsertNode(projectDb.db, node);
    for (const edge of graph.edges.values()) upsertEdge(projectDb.db, edge);
    for (const observation of graph.observations.values()) insertObservation(projectDb.db, observation);
    projectDb.db.exec('COMMIT');
  } catch (error) {
    projectDb.db.exec('ROLLBACK');
    throw error;
  } finally {
    projectDb.close();
  }

  return {
    dbPath: config.dbPath,
    nodeCount: graph.nodes.size,
    edgeCount: graph.edges.size,
    observationCount: graph.observations.size,
    fileCount: scanned.files.length,
    directoryCount: scanned.directories.length,
  };
}
