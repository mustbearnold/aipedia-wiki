#!/usr/bin/env bash
# fetch-real-logos.sh
#
# For every tool in tools-registry.json whose logo is a generated
# letter-on-gradient SVG placeholder, download a real favicon/brand
# mark from public icon APIs.
#
# Strategy (ordered by quality):
#   1. Google S2 faviconV2 at size=128 — high resolution, reliable
#   2. DuckDuckGo icons API — fallback, small favicon-sized
#
# If either returns a PNG >1KB, replace the placeholder SVG with the
# downloaded PNG. Otherwise leave the placeholder in place.
#
# Safe to re-run.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REGISTRY="$ROOT/src/data/_meta/tools-registry.json"
LOGOS_DIR="$ROOT/public/logos/tools"
MIN_BYTES=600   # smaller than this is likely a 1x1 fallback, skip

test -f "$REGISTRY" || { echo "Registry missing at $REGISTRY"; exit 1; }

# --- helpers ---

is_placeholder_svg() {
  local f="$1"
  test -f "$f" || return 1
  case "$f" in
    *.svg) ;;
    *) return 1 ;;
  esac
  # Check first 400 bytes for our placeholder template markers
  if head -c 400 "$f" | grep -q 'encoding="UTF-8"' \
     && head -c 400 "$f" | grep -q '<svg' \
     && head -c 400 "$f" | grep -q 'linearGradient'; then
    return 0
  fi
  return 1
}

existing_logo() {
  local slug="$1"
  for ext in png svg jpg jpeg webp gif ico; do
    if [[ -f "$LOGOS_DIR/$slug.$ext" ]]; then
      echo "$LOGOS_DIR/$slug.$ext"
      return 0
    fi
  done
  return 1
}

try_fetch() {
  # Writes the response body to $2 and returns 0 if the file is a
  # PNG/JPG/WEBP/ICO bigger than MIN_BYTES. Otherwise deletes it and returns 1.
  local url="$1" out="$2"
  curl -sS -L --max-time 15 -o "$out" "$url" 2>/dev/null || return 1
  local size
  size=$(stat -c%s "$out" 2>/dev/null || echo 0)
  if [[ "$size" -lt "$MIN_BYTES" ]]; then rm -f "$out"; return 1; fi
  # Magic-byte check: PNG / JPG / WEBP / ICO
  local head4
  head4=$(head -c 4 "$out" | od -A n -t x1 | tr -d ' \n')
  case "$head4" in
    89504e47|ffd8ff*|52494646|00000100|00000200)
      return 0 ;;
    *)
      rm -f "$out"; return 1 ;;
  esac
}

extract_domain() {
  # stdin: a url; stdout: bare hostname (without www.)
  sed -E 's|https?://([^/]+).*|\1|; s|^www\.||'
}

# --- main ---

placeholders=()
while IFS=$'\t' read -r slug url status; do
  [[ "$status" == "dead" ]] && continue
  [[ -z "$url" ]] && continue
  logo="$(existing_logo "$slug" || true)"
  [[ -z "$logo" ]] && continue
  is_placeholder_svg "$logo" || continue
  domain="$(echo "$url" | extract_domain)"
  [[ -z "$domain" ]] && continue
  placeholders+=("$slug|$domain|$logo")
done < <(jq -r '.tools | to_entries[] | [.key, (.value.url // ""), (.value.status // "")] | @tsv' "$REGISTRY")

echo "Found ${#placeholders[@]} placeholder logos to attempt real-logo fetch."
echo ""

ok=0; fail=0
failed_list=()

for entry in "${placeholders[@]}"; do
  IFS='|' read -r slug domain placeholder <<< "$entry"
  tmp="$LOGOS_DIR/.tmp-$slug.img"
  printf "  %-18s %-32s " "$slug" "$domain"

  # Strategy 1: Google S2 faviconV2 at 128px
  g_url="https://www.google.com/s2/favicons?domain=$domain&sz=128"
  if try_fetch "$g_url" "$tmp"; then
    mv "$tmp" "$LOGOS_DIR/$slug.png"
    rm -f "$placeholder"
    size=$(stat -c%s "$LOGOS_DIR/$slug.png")
    echo "google ($size b)"
    ok=$((ok+1))
    sleep 0.2
    continue
  fi

  # Strategy 2: DuckDuckGo ip3
  d_url="https://icons.duckduckgo.com/ip3/$domain.ico"
  if try_fetch "$d_url" "$tmp"; then
    mv "$tmp" "$LOGOS_DIR/$slug.png"
    rm -f "$placeholder"
    size=$(stat -c%s "$LOGOS_DIR/$slug.png")
    echo "ddg ($size b)"
    ok=$((ok+1))
    sleep 0.2
    continue
  fi

  echo "(no favicon found, keeping placeholder)"
  failed_list+=("$slug ($domain)")
  fail=$((fail+1))
  sleep 0.2
done

echo ""
echo "Replaced $ok placeholders with real favicons."
echo "Kept $fail placeholders (no real favicon available)."
if [[ $fail -gt 0 ]]; then
  echo "Remaining placeholders:"
  for item in "${failed_list[@]}"; do
    echo "  $item"
  done
fi
