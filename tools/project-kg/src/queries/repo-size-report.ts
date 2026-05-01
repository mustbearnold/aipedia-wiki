import type { DatabaseSync } from 'node:sqlite';

export interface SizeRow {
  path: string;
  size: number;
}

export interface RepoSizeReport {
  totalFiles: number;
  totalBytes: number;
  largestFiles: SizeRow[];
  largestFolders: SizeRow[];
  riskyGeneratedFolders: string[];
}

export function repoSizeReport(db: DatabaseSync): RepoSizeReport {
  const summary = db.prepare(`
    SELECT COUNT(*) AS totalFiles, COALESCE(SUM(json_extract(metadata_json, '$.size')), 0) AS totalBytes
    FROM nodes WHERE path IS NOT NULL AND type != 'directory'
  `).get() as { totalFiles: number; totalBytes: number };

  const files = db.prepare(`
    SELECT path, COALESCE(json_extract(metadata_json, '$.size'), 0) AS size
    FROM nodes
    WHERE path IS NOT NULL AND type != 'directory'
    ORDER BY size DESC
    LIMIT 20
  `).all() as unknown as SizeRow[];

  const allFiles = db.prepare(`
    SELECT path, COALESCE(json_extract(metadata_json, '$.size'), 0) AS size
    FROM nodes
    WHERE path IS NOT NULL AND type != 'directory'
  `).all() as unknown as SizeRow[];
  const folderTotals = new Map<string, number>();
  for (const file of allFiles) {
    const parts = file.path.split('/');
    for (let i = 1; i <= Math.min(parts.length - 1, 3); i += 1) {
      const folder = parts.slice(0, i).join('/');
      folderTotals.set(folder, (folderTotals.get(folder) ?? 0) + Number(file.size));
    }
  }
  const largestFolders = [...folderTotals.entries()]
    .map(([path, size]) => ({ path, size }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 20);

  const riskyGeneratedFolders = ['.astro', 'dist', 'dist-fast', 'public/pagefind', 'public/og', 'src/data/_meta', '.kg'].filter((folder) =>
    largestFolders.some((row) => row.path === folder || row.path.startsWith(`${folder}/`)),
  );

  return {
    totalFiles: summary.totalFiles,
    totalBytes: Number(summary.totalBytes),
    largestFiles: files,
    largestFolders,
    riskyGeneratedFolders,
  };
}
