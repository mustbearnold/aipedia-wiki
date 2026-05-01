# project-kg

Local knowledge graph tooling for the AiPedia.wiki Astro repo.

The package scans the working tree, writes a SQLite database to `.kg/project.db`, and produces human-readable reports in `reports/`.

## Commands

Run from the repository root:

```sh
npm run kg:scan
npm run kg:stats
npm run kg:report
npm run kg:related -- src/content/tools/chatgpt.md
npm run kg:unused-assets
npm run kg:missing-frontmatter
npm run kg:broken-links
```

Runtime data in `.kg/` is local and should not be committed.
