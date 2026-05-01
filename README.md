# aipedia.wiki

Astro site for aipedia.wiki, an AI tools encyclopedia and comparison system.

## Commands

```bash
npm ci
npm run guard:check
npm run kg -- help
npm run kg -- scan
npm run kg -- report
npm run build
npm run check
```

## Source of truth

Edit editorial content directly in `src/content/`. Do not edit the retired legacy backup tree.

## Project Knowledge Graph

The local project knowledge graph lives in `tools/project-kg/`.

```bash
npm run kg -- help
npm run kg -- scan
npm run kg -- stats
npm run kg -- report
npm run kg -- related src/content/tools/chatgpt.md
npm run kg -- depends-on src/components/ToolCard.astro
```

- Remember one entry point: `npm run kg -- <command>`.
- Runtime SQLite data is written to `.kg/project.db` and is ignored by Git.
- Human-readable reports are written to `reports/project-kg-report.md`.
- Agent task records can be stored in `agent-runs/`.
- The optional dashboard placeholder lives in `apps/kg-dashboard/`.
