import { mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { migrate } from './migrations.js';

export interface ProjectDb {
  db: DatabaseSync;
  dbPath: string;
  close(): void;
}

export function openProjectDb(repoRoot: string, options: { reset?: boolean } = {}): ProjectDb {
  const kgDir = path.join(repoRoot, '.kg');
  mkdirSync(kgDir, { recursive: true });
  const dbPath = path.join(kgDir, 'project.db');
  if (options.reset) {
    rmSync(dbPath, { force: true });
    rmSync(`${dbPath}-shm`, { force: true });
    rmSync(`${dbPath}-wal`, { force: true });
  }
  const db = new DatabaseSync(dbPath);
  db.exec('PRAGMA journal_mode = WAL;');
  migrate(db);
  return {
    db,
    dbPath,
    close() {
      db.close();
    },
  };
}

export function clearGraph(db: DatabaseSync): void {
  db.exec('DELETE FROM edges; DELETE FROM observations; DELETE FROM nodes;');
}
