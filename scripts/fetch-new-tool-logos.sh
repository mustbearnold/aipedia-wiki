#!/usr/bin/env bash
# fetch-new-tool-logos.sh
#
# One-shot script to fetch brand logos for the 24 new tools added in
# April 18 batches. Uses Google S2 faviconV2 @ 128px as primary source
# with DuckDuckGo ip3 as fallback.
#
# Safe to re-run; skips if logo already exists and is >1KB.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOGOS_DIR="$ROOT/public/logos/tools"
MIN_BYTES=1000

mkdir -p "$LOGOS_DIR"

# slug|domain pairs for each new tool
declare -a TOOLS=(
  "ollama|ollama.com"
  "character-ai|character.ai"
  "poe|poe.com"
  "chatpdf|chatpdf.com"
  "lm-studio|lmstudio.ai"
  "granola|granola.ai"
  "anythingllm|anythingllm.com"
  "clipdrop|clipdrop.co"
  "typingmind|typingmind.com"
  "hex|hex.tech"
  "mastra|mastra.ai"
  "microsoft-agent-framework|microsoft.com"
  "ag2|ag2.ai"
  "humata|humata.ai"
  "jan-ai|jan.ai"
  "langgraph|langchain.com"
  "open-webui|openwebui.com"
  "helicone|helicone.ai"
  "langfuse|langfuse.com"
  "leonardo|leonardo.ai"
  "fal-ai|fal.ai"
  "groq|groq.com"
  "fireworks-ai|fireworks.ai"
  "boomy|boomy.com"
)

fetch_logo() {
  local slug="$1"
  local domain="$2"
  local out="$LOGOS_DIR/$slug.png"

  if [[ -f "$out" ]]; then
    local sz=$(wc -c < "$out" 2>/dev/null || echo 0)
    if (( sz > MIN_BYTES )); then
      echo "  skip  $slug  (exists, $sz bytes)"
      return 0
    fi
  fi

  # Try Google S2 first (128px, reliable)
  local s2="https://www.google.com/s2/favicons?domain=$domain&sz=128"
  if curl -s -f -o "$out.tmp" -L -A "Mozilla/5.0" "$s2" 2>/dev/null; then
    local sz=$(wc -c < "$out.tmp" 2>/dev/null || echo 0)
    if (( sz > MIN_BYTES )); then
      mv "$out.tmp" "$out"
      echo "  ok    $slug  Google S2  ($sz bytes)"
      return 0
    fi
  fi

  # Fallback: DuckDuckGo ip3 (smaller but reliable)
  local ddg="https://icons.duckduckgo.com/ip3/$domain.ico"
  if curl -s -f -o "$out.tmp" -L -A "Mozilla/5.0" "$ddg" 2>/dev/null; then
    local sz=$(wc -c < "$out.tmp" 2>/dev/null || echo 0)
    if (( sz > MIN_BYTES )); then
      mv "$out.tmp" "$out"
      echo "  ok    $slug  DuckDuckGo ($sz bytes)"
      return 0
    fi
  fi

  # Fallback 2: direct apple-touch-icon
  local apple="https://$domain/apple-touch-icon.png"
  if curl -s -f -o "$out.tmp" -L -A "Mozilla/5.0" "$apple" 2>/dev/null; then
    local sz=$(wc -c < "$out.tmp" 2>/dev/null || echo 0)
    if (( sz > MIN_BYTES )); then
      mv "$out.tmp" "$out"
      echo "  ok    $slug  apple-touch ($sz bytes)"
      return 0
    fi
  fi

  rm -f "$out.tmp"
  echo "  fail  $slug  (all sources returned too-small/404)"
  return 1
}

echo "Fetching logos for ${#TOOLS[@]} new tools..."
ok=0; fail=0
for entry in "${TOOLS[@]}"; do
  IFS='|' read -r slug domain <<< "$entry"
  if fetch_logo "$slug" "$domain"; then
    ok=$((ok + 1))
  else
    fail=$((fail + 1))
  fi
done

echo
echo "Done: $ok ok, $fail failed"
echo "Output: $LOGOS_DIR"
