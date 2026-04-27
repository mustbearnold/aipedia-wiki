#!/usr/bin/env node
// Pre-build asset generation for aipedia-wiki. Cross-platform Node port of
// the retired `copy-content.sh` (the old shell script invoked WSL bash on
// Windows, which is not configured on every dev machine).
//
// As of 2026-04-17 the site is a single-source-of-truth setup: content lives
// directly in `src/content/` (git-tracked on GitHub). The legacy dual-tree
// layer at `wikis/ai-tools/pages/` was retired.
//
// This script only:
//   1. Regenerates per-tool OG share images
//   2. Regenerates the logo manifest (Cloudflare-miniflare-safe lookup table)
//   3. Syncs truth-maintenance JSON from `wikis/_meta/` if present
//
// It does NOT touch `src/content/`.

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = path.dirname(SCRIPT_DIR);
const CONTENT_DIR = path.join(PROJECT_DIR, "src", "content");

function runNode(script, label) {
  const result = spawnSync(process.execPath, [path.join(SCRIPT_DIR, script)], {
    stdio: "inherit",
  });
  if (result.status !== 0) {
    console.warn(`${label} failed (non-fatal)`);
  }
}

// 1. Regenerate per-tool OG share images so social previews stay in sync with
//    current titles, scores, and taglines. Then recompress all generated OG
//    PNGs, including news cards from prebuild.
runNode("generate-og-svgs.mjs", "OG SVG generation");
runNode("optimize-og-images.mjs", "OG PNG optimization");

// 2. Generate the logo manifest so components can resolve logo extensions at
//    build time without calling node:fs from Astro frontmatter (Cloudflare
//    prerender runs in miniflare which has no node:fs).
runNode("generate-logo-manifest.mjs", "Logo manifest generation");

// Count markdown files under src/content for a quick sanity log.
function countMarkdown(dir) {
  let total = 0;
  if (!fs.existsSync(dir)) return 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      total += countMarkdown(full);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      total += 1;
    }
  }
  return total;
}

const total = countMarkdown(CONTENT_DIR);
console.log(`Content: ${total} markdown files in src/content/ (source of truth).`);

// 3. Optionally sync truth-maintenance JSON from wikis/_meta/ if that
//    toolchain is still present. Admin dashboards render these at build time;
//    the files can also be committed directly if _meta is retired.
const META_SRC = path.join(path.dirname(PROJECT_DIR), "wikis", "_meta");
const META_DEST = path.join(PROJECT_DIR, "src", "data", "_meta");

if (fs.existsSync(META_SRC) && fs.statSync(META_SRC).isDirectory()) {
  fs.mkdirSync(META_DEST, { recursive: true });
  const metaFiles = [
    "tools-registry.json",
    "claim-graph.json",
    "stale-queue.json",
    "signals.jsonl",
  ];
  let copied = 0;
  for (const name of metaFiles) {
    const src = path.join(META_SRC, name);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(META_DEST, name));
      copied += 1;
    }
  }
  if (copied > 0) {
    console.log(`Synced truth-maintenance data from ${META_SRC} -> src/data/_meta/.`);
  }
}
