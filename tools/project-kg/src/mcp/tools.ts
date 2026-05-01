export const PROJECT_KG_TOOLS = [
  {
    name: 'project_kg_scan',
    description: 'Build .kg/project.db from the local AiPedia.wiki repository.',
    command: 'npm run kg:scan',
  },
  {
    name: 'project_kg_report',
    description: 'Write reports/project-kg-report.md with graph findings.',
    command: 'npm run kg:report',
  },
  {
    name: 'project_kg_related',
    description: 'Show graph-neighbor files for a path.',
    command: 'npm run kg:related -- <path>',
  },
];
