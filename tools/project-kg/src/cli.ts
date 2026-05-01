import { existsSync } from 'node:fs';
import { loadProjectConfig } from './config/project-config.js';
import { openProjectDb } from './db/connection.js';
import { scanProject } from './scanner/scan-project.js';
import { repoSizeReport } from './queries/repo-size-report.js';
import { relatedFiles } from './queries/related-files.js';
import { whatDependsOn } from './queries/what-depends-on.js';
import { unusedAssets } from './queries/unused-assets.js';
import { missingFrontmatter } from './queries/missing-frontmatter.js';
import { brokenLinks } from './queries/broken-links.js';
import { writeMarkdownReport } from './reports/markdown-report.js';
import { logger } from './utils/logger.js';

async function main(): Promise<void> {
  const [command, ...args] = process.argv.slice(2);
  const config = loadProjectConfig();

  switch (command) {
    case 'scan': {
      const result = await scanProject(config.repoRoot);
      logger.info(`Scanned ${result.fileCount} files and ${result.directoryCount} directories.`);
      logger.info(`Wrote ${result.nodeCount} nodes, ${result.edgeCount} edges, ${result.observationCount} observations.`);
      logger.info(`Database: ${result.dbPath}`);
      return;
    }
    case 'stats': {
      withDb(config.repoRoot, (db) => {
        printCounts(db, 'nodes', 'Node counts');
        printCounts(db, 'edges', 'Edge counts');
        const size = repoSizeReport(db);
        logger.info(`\nRepo size: ${size.totalFiles} indexed files, ${formatBytes(size.totalBytes)}`);
        logger.info('\nLargest folders:');
        for (const row of size.largestFolders.slice(0, 10)) logger.info(`- ${row.path}: ${formatBytes(row.size)}`);
        logger.info('\nLargest files:');
        for (const row of size.largestFiles.slice(0, 10)) logger.info(`- ${row.path}: ${formatBytes(row.size)}`);
      });
      return;
    }
    case 'report': {
      withDb(config.repoRoot, (db) => {
        const reportPath = writeMarkdownReport(db, config.repoRoot, config.reportPath);
        logger.info(`Report written: ${reportPath}`);
      });
      return;
    }
    case 'related': {
      const target = requireArg(args[0], 'project-kg related <path>');
      withDb(config.repoRoot, (db) => {
        const rows = relatedFiles(db, config.repoRoot, target);
        printRows(rows.map((row) => [`${row.direction}:${row.edge_type}`, row.node_type, row.path ?? row.name]));
      });
      return;
    }
    case 'depends-on': {
      const target = requireArg(args[0], 'project-kg depends-on <path>');
      withDb(config.repoRoot, (db) => {
        const rows = whatDependsOn(db, config.repoRoot, target);
        printRows(rows.map((row) => [row.edge_type, row.node_type, row.path ?? row.name]));
      });
      return;
    }
    case 'unused-assets': {
      withDb(config.repoRoot, (db) => {
        const rows = unusedAssets(db, 500);
        printRows(rows.map((row) => [row.path, formatBytes(row.size)]));
      });
      return;
    }
    case 'missing-frontmatter': {
      withDb(config.repoRoot, (db) => {
        const rows = missingFrontmatter(db, config.repoRoot);
        printRows(rows.map((row) => [row.path, row.missing.join(', ')]));
      });
      return;
    }
    case 'broken-links': {
      withDb(config.repoRoot, (db) => {
        const rows = brokenLinks(db);
        printRows(rows.map((row) => [row.path ?? '', String(row.line ?? ''), row.href ?? row.message]));
      });
      return;
    }
    case 'help':
    case undefined:
      printHelp();
      return;
    default:
      throw new Error(`Unknown command "${command}". Run project-kg help.`);
  }
}

function withDb(repoRoot: string, fn: (db: ReturnType<typeof openProjectDb>['db']) => void): void {
  const config = loadProjectConfig(repoRoot);
  if (!existsSync(config.dbPath)) {
    throw new Error(`No graph database found at ${config.dbPath}. Run npm run kg:scan first.`);
  }
  const projectDb = openProjectDb(repoRoot);
  try {
    fn(projectDb.db);
  } finally {
    projectDb.close();
  }
}

function printCounts(db: ReturnType<typeof openProjectDb>['db'], tableName: 'nodes' | 'edges', label: string): void {
  logger.info(`\n${label}:`);
  const rows = db.prepare(`SELECT type, COUNT(*) AS count FROM ${tableName} GROUP BY type ORDER BY type`).all() as Array<{ type: string; count: number }>;
  for (const row of rows) logger.info(`- ${row.type}: ${row.count}`);
}

function printRows(rows: string[][]): void {
  if (!rows.length) {
    logger.info('No results.');
    return;
  }
  for (const row of rows) logger.info(row.join('\t'));
}

function requireArg(value: string | undefined, usage: string): string {
  if (!value) throw new Error(`Missing path. Usage: ${usage}`);
  return value;
}

function printHelp(): void {
  logger.info(`project-kg commands:
  scan
  stats
  report
  related <path>
  depends-on <path>
  unused-assets
  missing-frontmatter
  broken-links`);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
}

main().catch((error) => {
  logger.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
