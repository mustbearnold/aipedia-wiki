#!/bin/bash
# Pre-build asset generation for aipedia-wiki.
#
# As of 2026-04-17 the site is a single-source-of-truth setup: content lives
# directly in `src/content/` (git-tracked on GitHub). The legacy dual-tree
# layer at `wikis/ai-tools/pages/` was retired — the nuke+copy dance was
# the root cause of the news/benchmarks content-wipe bug.
#
# This script now only:
#   1. Regenerates per-tool OG share images
#   2. Regenerates the logo manifest (Cloudflare-miniflare-safe lookup table)
#   3. Syncs truth-maintenance JSON from `wikis/_meta/` if present
#
# It does NOT touch `src/content/` anymore.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
CONTENT_DIR="$PROJECT_DIR/src/content"

# 1. Regenerate per-tool OG SVGs from src/content/tools so social share previews
#    stay in sync with current titles, scores, and taglines.
node "$SCRIPT_DIR/generate-og-svgs.mjs" || echo "OG SVG generation failed (non-fatal)"

# 2. Generate the logo manifest so components can resolve logo extensions
#    at build time without calling node:fs from Astro frontmatter (Cloudflare
#    prerender runs in miniflare which has no node:fs).
node "$SCRIPT_DIR/generate-logo-manifest.mjs" || echo "Logo manifest generation failed (non-fatal)"

TOTAL=$(find "$CONTENT_DIR" -name "*.md" | wc -l)
echo "Content: $TOTAL markdown files in src/content/ (source of truth)."

# 3. Sync truth-maintenance JSON from wikis/_meta/ if that toolchain is still
#    present. Optional — admin dashboards render these at build time, but the
#    files can also be committed directly if _meta is retired.
META_SRC="$(dirname "$PROJECT_DIR")/wikis/_meta"
META_DEST="$PROJECT_DIR/src/data/_meta"
if [ -d "$META_SRC" ]; then
  mkdir -p "$META_DEST"
  for f in tools-registry.json claim-graph.json stale-queue.json signals.jsonl; do
    if [ -f "$META_SRC/$f" ]; then
      cp "$META_SRC/$f" "$META_DEST/$f"
    fi
  done
  echo "Synced truth-maintenance data from $META_SRC → src/data/_meta/."
fi
