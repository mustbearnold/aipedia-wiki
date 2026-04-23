#!/usr/bin/env bash
# ============================================================
# backup-to-drive.sh
#
# Nightly cold backup of the aipedia-wiki repo to Google Drive via
# rclone. Creates a dated tarball of the full repo (source + public/
# assets + git history) and pushes it to the configured rclone remote.
#
# Per the project's backup strategy memo (2026-04-17), this is a
# belt-and-suspenders backup on top of GitHub. Lets the site survive a
# GitHub outage, account lockout, or accidental force-push.
#
# Setup (one time per machine):
#   1. Install rclone: https://rclone.org/downloads/
#   2. rclone config
#      - Create a new remote named "gdrive" (name is configurable below)
#      - Use the Google Drive option; authorise via browser
#   3. Create the target folder on Drive (default: aipedia-wiki-backups)
#   4. Optionally create a cron entry. Example crontab line:
#        0 3 * * *  /c/Users/mustb/Projects/moaw/aipedia-wiki/scripts/backup-to-drive.sh >> /var/log/aipedia-backup.log 2>&1
#
# Usage:
#   ./scripts/backup-to-drive.sh          # default: dry-run off, retain 14 days
#   DRY_RUN=1 ./scripts/backup-to-drive.sh
#   RETENTION_DAYS=30 ./scripts/backup-to-drive.sh
# ============================================================

set -euo pipefail

RCLONE_REMOTE="${RCLONE_REMOTE:-gdrive}"
REMOTE_DIR="${REMOTE_DIR:-aipedia-wiki-backups}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
DRY_RUN="${DRY_RUN:-0}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
STAMP="$(date -u +"%Y-%m-%dT%H%M%SZ")"
ARCHIVE="/tmp/aipedia-wiki-${STAMP}.tar.gz"

say() { printf "[backup-to-drive] %s\n" "$*"; }

trap 'rm -f "$ARCHIVE"' EXIT

require() {
  if ! command -v "$1" >/dev/null 2>&1; then
    say "FATAL: required command '$1' not found on PATH. Install it and retry."
    exit 1
  fi
}

require tar
require rclone

# Sanity check the rclone remote exists.
if ! rclone listremotes | grep -q "^${RCLONE_REMOTE}:$"; then
  say "FATAL: rclone remote '${RCLONE_REMOTE}' not configured. Run 'rclone config' first."
  exit 2
fi

say "Creating archive of ${REPO_ROOT} -> ${ARCHIVE}"
# Exclude .astro build cache, node_modules, generated pagefind index, and
# generated OG PNGs (regenerable from SVGs). Keep source + public content.
tar -czf "$ARCHIVE" \
  -C "$(dirname "$REPO_ROOT")" \
  --exclude='aipedia-wiki/node_modules' \
  --exclude='aipedia-wiki/.astro' \
  --exclude='aipedia-wiki/dist' \
  --exclude='aipedia-wiki/public/pagefind' \
  --exclude='aipedia-wiki/.cache' \
  "$(basename "$REPO_ROOT")"

SIZE="$(du -h "$ARCHIVE" | awk '{print $1}')"
say "Archive size: ${SIZE}"

DEST="${RCLONE_REMOTE}:${REMOTE_DIR}/$(basename "$ARCHIVE")"

if [ "$DRY_RUN" = "1" ]; then
  say "DRY_RUN=1 — skipping rclone copy. Would copy: ${ARCHIVE} -> ${DEST}"
else
  say "Uploading to ${DEST}"
  rclone copyto "$ARCHIVE" "$DEST" --progress --low-level-retries 3
  say "Upload complete."
fi

# Retention: delete backups older than RETENTION_DAYS days from the
# remote. Use rclone's --min-age filter (note: argument is time-before,
# so "14d" means older than 14 days).
if [ "$DRY_RUN" = "1" ]; then
  say "DRY_RUN=1 — skipping retention sweep."
else
  say "Purging backups older than ${RETENTION_DAYS} days in ${RCLONE_REMOTE}:${REMOTE_DIR}/"
  rclone delete "${RCLONE_REMOTE}:${REMOTE_DIR}/" \
    --min-age "${RETENTION_DAYS}d" \
    --include 'aipedia-wiki-*.tar.gz' \
    || say "Retention sweep exited non-zero (often means nothing to delete)."
fi

say "Done. Next run target: $(date -u -d "+1 day" +"%Y-%m-%dT%H%M%SZ" 2>/dev/null || date -u -v+1d +"%Y-%m-%dT%H%M%SZ" 2>/dev/null || echo "+24h")"
