#!/bin/bash
# Copies wiki markdown into Astro content collections.
# If the wiki directory doesn't exist (e.g., on Cloudflare Pages),
# skip copying — content is already committed in src/content/.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
WIKI_DIR="$(dirname "$PROJECT_DIR")/wikis/ai-tools/pages"
CONTENT_DIR="$PROJECT_DIR/src/content"

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

TOTAL=$(find "$CONTENT_DIR" -name "*.md" | wc -l)
echo "Copied $TOTAL markdown files."
