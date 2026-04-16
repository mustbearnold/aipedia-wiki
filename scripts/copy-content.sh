#!/bin/bash
# Copies wiki markdown into Astro content collections.
# If the wiki directory doesn't exist (e.g., on Cloudflare Pages),
# skip copying — content is already committed in src/content/.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
WIKI_DIR="$(dirname "$PROJECT_DIR")/wikis/ai-tools/pages"
CONTENT_DIR="$PROJECT_DIR/src/content"

# Regenerate per-tool OG SVGs from the live tools-registry.json so social
# share previews stay in sync with current titles, scores, and taglines.
node "$SCRIPT_DIR/generate-og-svgs.mjs" || echo "OG SVG generation failed (non-fatal)"

# Check if wiki source exists
if [ ! -d "$WIKI_DIR" ]; then
  echo "Wiki directory not found at $WIKI_DIR — using committed content."
  TOTAL=$(find "$CONTENT_DIR" -name "*.md" | wc -l)
  echo "Found $TOTAL existing markdown files in src/content/."
  exit 0
fi

echo "Copying wiki content from $WIKI_DIR..."

# Clear old content (except config.ts)
find "$CONTENT_DIR" -name "*.md" -delete 2>/dev/null

# Copy each content type
cp "$WIKI_DIR"/tools/*.md "$CONTENT_DIR/tools/" 2>/dev/null
cp "$WIKI_DIR"/categories/*.md "$CONTENT_DIR/categories/" 2>/dev/null
cp "$WIKI_DIR"/comparisons/*.md "$CONTENT_DIR/comparisons/" 2>/dev/null
cp "$WIKI_DIR"/trends/*.md "$CONTENT_DIR/trends/" 2>/dev/null
cp "$WIKI_DIR"/companies/*.md "$CONTENT_DIR/companies/" 2>/dev/null
cp "$WIKI_DIR"/use-cases/*.md "$CONTENT_DIR/use-cases/" 2>/dev/null
cp "$WIKI_DIR"/stacks/*.md "$CONTENT_DIR/use-cases/" 2>/dev/null
cp "$WIKI_DIR"/dead/*.md "$CONTENT_DIR/dead/" 2>/dev/null
cp "$WIKI_DIR"/glossary/*.md "$CONTENT_DIR/glossary/" 2>/dev/null
mkdir -p "$CONTENT_DIR/reports"
cp "$WIKI_DIR"/reports/*.md "$CONTENT_DIR/reports/" 2>/dev/null

TOTAL=$(find "$CONTENT_DIR" -name "*.md" | wc -l)
echo "Copied $TOTAL markdown files."

# Copy truth-maintenance data so admin dashboards can render them at build time.
META_SRC="$(dirname "$PROJECT_DIR")/wikis/_meta"
META_DEST="$PROJECT_DIR/src/data/_meta"
if [ -d "$META_SRC" ]; then
  mkdir -p "$META_DEST"
  for f in tools-registry.json claim-graph.json stale-queue.json signals.jsonl; do
    if [ -f "$META_SRC/$f" ]; then
      cp "$META_SRC/$f" "$META_DEST/$f"
    fi
  done
  echo "Copied truth-maintenance data to src/data/_meta/."
fi
