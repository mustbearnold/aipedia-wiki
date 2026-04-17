# Content Safety Invariants

This document exists because on 2026-04-17 a pre-start script silently
deleted ~600 content files across multiple dev-server restarts. No
permanent data loss (git had everything) but it was preventable.

## Invariants

1. **`src/content/` is sacred.** No script in this repo is allowed to
   delete files under `src/content/`. Full stop. Any script that wants
   to mutate content must write IN PLACE, never delete-then-rebuild.

2. **`src/content/` is the single source of truth.** Not a generated
   directory. Git-tracked, committed to GitHub, auto-deployed via
   Cloudflare Pages on push.

3. **No parallel content tree.** There is no upstream `wikis/*/pages/`
   that content is copied from. The old dual-tree layer was retired
   2026-04-17 after it caused data loss. The archive at
   `../wikis/ai-tools.legacy-backup-2026-04-17/` is reference-only.

## Mechanical enforcement

### Pre-start guard
`scripts/guard-content.mjs` runs as `predev` and `prebuild`. It checks
every content subdir against a known-good floor. If any count craters
(deletion, sync corruption, bad git state) the dev/build command
aborts with a loud error and the recovery step (`git restore src/content/`).

Bypass is possible with `CONTENT_GUARD_SKIP=1 npm run dev` — do not
use this unless you have a specific, understood reason.

### Floors (as of 2026-04-17)
```
tools:       100  (actual 132)
comparisons: 200  (actual 280)
use-cases:    50  (actual 92)
categories:   10  (actual 14)
trends:        3  (actual 5)
companies:     3  (actual 5)
dead:          3  (actual 8)
glossary:      1  (actual 1)
news:          3  (actual 8)
benchmarks:    2  (actual 3)
workflows:     3  (actual 7)
reports:       1  (actual 1)
```

Update floors after a legitimate content prune by running
`npm run guard:baseline`.

### Scripts that touch content
Audited 2026-04-17 — none. `copy-content.sh` was retired from
content-touching; it now only generates OG svgs + logo manifest and
syncs `_meta` JSON into `src/data/_meta/`.

If you add a script that mutates content, it must:
- Only write/update files, never delete without explicit user request
- Be run manually, not wired into any pre-start hook
- Be added to the audit list in this doc

## Recovery

If the guard fires, or if you notice content missing:

```bash
cd aipedia-wiki
git restore src/content/
```

Every content file is tracked in this repo and backed up on GitHub.
You can always fall back to HEAD.

If the issue is with a specific file, use `git log -- path/to/file.md`
and `git show HEAD:path/to/file.md` to inspect prior versions.

## Backup layer

GitHub is the primary backup. Every push to `master` is mirrored
globally by GitHub's infrastructure and triggers a Cloudflare Pages
deploy.

A secondary cold backup to Google Drive is planned but not yet built
(see `C:\Users\mustb\.claude\projects\C--Users-mustb-Projects-moaw\memory\project_backup_strategy.md`).
