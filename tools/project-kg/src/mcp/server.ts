import { PROJECT_KG_PROMPTS } from './prompts.js';
import { PROJECT_KG_TOOLS } from './tools.js';

export function describeMcpServer(): string {
  return JSON.stringify(
    {
      name: 'project-kg',
      description: 'Local AiPedia.wiki project knowledge graph helper. MCP transport can be added later.',
      tools: PROJECT_KG_TOOLS,
      prompts: PROJECT_KG_PROMPTS,
    },
    null,
    2,
  );
}
