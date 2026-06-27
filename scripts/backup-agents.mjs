#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { copyFile, mkdir, readdir, readFile, rm, stat, symlink, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const dryRun = process.argv.includes('--dry-run');
const includeLowercase = !process.argv.includes('--no-lowercase');
const defaultDestination = process.env.AIPEDIA_AGENTS_BACKUP_DIR
  ? resolve(process.env.AIPEDIA_AGENTS_BACKUP_DIR)
  : resolve(projectRoot, '..', 'aipedia-agent-backups');
const destinationRoot = resolve(argValue('--dest') ?? defaultDestination);
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupDir = join(destinationRoot, `agents-${timestamp}`);
const sourceDirs = [
  resolve(projectRoot, '.Agents'),
  ...(includeLowercase ? [resolve(projectRoot, '.agents')] : []),
];

const ignoredNames = new Set(['node_modules', '.git', 'target', 'dist', 'dist-fast']);

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir, root = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (ignoredNames.has(entry.name)) continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath, root));
    } else if (entry.isFile()) {
      files.push({
        absolute: fullPath,
        relative: relative(root, fullPath).split('\\').join('/'),
      });
    }
  }
  return files;
}

async function hashFile(path) {
  const bytes = await readFile(path);
  return createHash('sha256').update(bytes).digest('hex');
}

async function copyDirectory(source, destination) {
  const files = await walk(source);
  let totalBytes = 0;
  const hashedFiles = [];
  for (const file of files) {
    const info = await stat(file.absolute);
    totalBytes += info.size;
    const sha256 = await hashFile(file.absolute);
    hashedFiles.push({
      path: file.relative,
      bytes: info.size,
      sha256,
    });
    if (!dryRun) {
      const target = join(destination, file.relative);
      await mkdir(dirname(target), { recursive: true });
      await copyFile(file.absolute, target);
    }
  }
  return { files: hashedFiles, totalBytes };
}

async function main() {
  const startedAt = new Date().toISOString();
  const manifest = {
    started_at: startedAt,
    project_root: projectRoot,
    destination: backupDir,
    dry_run: dryRun,
    sources: [],
  };

  if (!dryRun) await mkdir(backupDir, { recursive: true });

  for (const source of sourceDirs) {
    if (!await exists(source)) continue;
    const sourceName = relative(projectRoot, source) || source;
    const destination = join(backupDir, sourceName);
    const result = await copyDirectory(source, destination);
    manifest.sources.push({
      source: sourceName,
      file_count: result.files.length,
      total_bytes: result.totalBytes,
      files: result.files,
    });
  }

  const aggregate = createHash('sha256');
  for (const source of manifest.sources) {
    aggregate.update(source.source);
    for (const file of source.files) aggregate.update(file.path + file.sha256);
  }
  manifest.finished_at = new Date().toISOString();
  manifest.aggregate_sha256 = aggregate.digest('hex');

  if (!dryRun) {
    await writeFile(join(backupDir, 'backup-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
    const latestLink = join(destinationRoot, 'latest');
    await rm(latestLink, { force: true, recursive: true });
    try {
      await symlink(backupDir, latestLink, 'dir');
    } catch {
      await writeFile(join(destinationRoot, 'LATEST.txt'), `${backupDir}\n`);
    }
  }

  console.log(JSON.stringify({
    ok: true,
    dry_run: dryRun,
    destination: backupDir,
    source_count: manifest.sources.length,
    file_count: manifest.sources.reduce((sum, source) => sum + source.file_count, 0),
    total_bytes: manifest.sources.reduce((sum, source) => sum + source.total_bytes, 0),
    aggregate_sha256: manifest.aggregate_sha256,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
