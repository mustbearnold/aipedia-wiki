import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';

export const GENERATED_ASSET_MANIFEST_VERSION = 1;

export function sha256Buffer(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

export function sha256File(path) {
  return sha256Buffer(readFileSync(path));
}

export function sha256SourceFile(path) {
  const buffer = readFileSync(path);
  if (!isTextLikePath(path)) return sha256Buffer(buffer);
  return sha256Buffer(Buffer.from(buffer.toString('utf8').replace(/\r\n?/g, '\n'), 'utf8'));
}

function isTextLikePath(path) {
  return new Set([
    '.astro',
    '.css',
    '.html',
    '.js',
    '.json',
    '.md',
    '.mjs',
    '.svg',
    '.ts',
    '.tsx',
    '.txt',
    '.yml',
    '.yaml',
  ]).has(extname(path).toLowerCase());
}

export function relativePath(root, path) {
  return relative(root, path).replace(/\\/g, '/');
}

export function listRelativeFiles(root, dir, predicate = () => true) {
  const base = join(root, dir);
  if (!existsSync(base)) return [];

  const files = [];
  function walk(current) {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && predicate(full, entry.name)) {
        files.push(relativePath(root, full));
      }
    }
  }
  walk(base);
  return files.sort((a, b) => a.localeCompare(b));
}

export function hashExistingFiles(root, files) {
  return files
    .filter((file) => existsSync(join(root, file)))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      file,
      sha256: sha256File(join(root, file)),
    }));
}

export function hashExistingSourceFiles(root, files) {
  return files
    .filter((file) => existsSync(join(root, file)))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      file,
      sha256: sha256SourceFile(join(root, file)),
    }));
}

export function stableHash(value) {
  return sha256Buffer(Buffer.from(JSON.stringify(sortStable(value)), 'utf8'));
}

function sortStable(value) {
  if (Array.isArray(value)) return value.map(sortStable);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => [key, sortStable(item)]),
  );
}

export function readManifest(path) {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
}

export function buildManifest({ kind, sourceHash, outputs, meta = {} }) {
  return {
    version: GENERATED_ASSET_MANIFEST_VERSION,
    kind,
    source_hash: sourceHash,
    generated_at: 'deterministic',
    meta,
    outputs: outputs
      .map((output) => ({
        file: output.file,
        kind: output.kind ?? null,
        slug: output.slug ?? null,
        theme: output.theme ?? null,
        target: output.target ?? null,
        bytes: output.bytes ?? null,
        sha256: output.sha256,
      }))
      .sort((left, right) => left.file.localeCompare(right.file)),
  };
}

export function writeManifest(path, manifest) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`);
}

export function manifestMatches({ manifest, kind, sourceHash, expectedFiles, root }) {
  if (!manifest || manifest.version !== GENERATED_ASSET_MANIFEST_VERSION) return false;
  if (manifest.kind !== kind || manifest.source_hash !== sourceHash) return false;

  const expected = [...expectedFiles].sort((a, b) => a.localeCompare(b));
  const outputs = Array.isArray(manifest.outputs) ? manifest.outputs : [];
  if (outputs.length !== expected.length) return false;

  const expectedSet = new Set(expected);
  for (const output of outputs) {
    if (!expectedSet.has(output.file)) return false;
    const path = join(root, output.file);
    if (!existsSync(path)) return false;
    if (sha256File(path) !== output.sha256) return false;
  }

  return true;
}

export function manifestOutputsForReport(manifest, root) {
  return (manifest.outputs ?? []).map((output) => {
    const path = join(root, output.file);
    const bytes = existsSync(path) ? readFileSync(path).length : output.bytes;
    return {
      kind: output.kind,
      slug: output.slug,
      theme: output.theme,
      target: output.target,
      path,
      file: output.file,
      bytes,
      existing_bytes: bytes,
      changed: false,
      written: false,
      comparison: { kind: 'manifest-hash', matches: true },
      sha256: output.sha256,
    };
  });
}
