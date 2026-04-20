#!/usr/bin/env node
/**
 * One-shot utility: adds `github_url: ...` to the frontmatter of every
 * open-source tool in our catalog.
 *
 * Skips any tool that already has github_url set (idempotent).
 * Inserts the line immediately after the `url:` field in each file's
 * frontmatter.
 *
 * After running this, execute scripts/fetch-github-stats.mjs to populate
 * src/data/github-stats.json with live API data.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOOLS_DIR = join(__dirname, '..', 'src', 'content', 'tools');

// Slug -> canonical GitHub URL for each open-source tool.
// Curated list based on each tool's primary / canonical open repo.
// Tools that are primarily closed-source SaaS (fireworks-ai) are omitted.
const GITHUB_URLS = {
  activepieces: 'https://github.com/activepieces/activepieces',
  ag2: 'https://github.com/ag2ai/ag2',
  aider: 'https://github.com/Aider-AI/aider',
  anythingllm: 'https://github.com/Mintplex-Labs/anything-llm',
  cline: 'https://github.com/cline/cline',
  continue: 'https://github.com/continuedev/continue',
  crewai: 'https://github.com/crewAIInc/crewAI',
  'fish-audio': 'https://github.com/fishaudio/fish-speech',
  flux: 'https://github.com/black-forest-labs/flux',
  glm: 'https://github.com/zai-org/GLM-4.5',
  goose: 'https://github.com/block/goose',
  helicone: 'https://github.com/Helicone/helicone',
  'hermes-agent': 'https://github.com/NousResearch/atropos',
  'jan-ai': 'https://github.com/menloresearch/jan',
  kimi: 'https://github.com/MoonshotAI/Kimi-K2',
  kokoro: 'https://github.com/hexgrad/kokoro',
  langflow: 'https://github.com/langflow-ai/langflow',
  langfuse: 'https://github.com/langfuse/langfuse',
  letta: 'https://github.com/letta-ai/letta',
  llama: 'https://github.com/meta-llama/llama-models',
  'lm-studio': 'https://github.com/lmstudio-ai/lms',
  mastra: 'https://github.com/mastra-ai/mastra',
  'microsoft-agent-framework': 'https://github.com/microsoft/agent-framework',
  'mistral-ai': 'https://github.com/mistralai/mistral-inference',
  morphic: 'https://github.com/miurla/morphic',
  n8n: 'https://github.com/n8n-io/n8n',
  nanochat: 'https://github.com/karpathy/nanochat',
  ollama: 'https://github.com/ollama/ollama',
  'open-webui': 'https://github.com/open-webui/open-webui',
  openclaw: 'https://github.com/openclawai/openclaw',
  openhands: 'https://github.com/All-Hands-AI/OpenHands',
  'stable-diffusion': 'https://github.com/Stability-AI/stablediffusion',
  yi: 'https://github.com/01-ai/Yi',
  zed: 'https://github.com/zed-industries/zed',
};

let added = 0;
let skipped = 0;
let errors = 0;

for (const [slug, url] of Object.entries(GITHUB_URLS)) {
  const filePath = join(TOOLS_DIR, `${slug}.md`);
  try {
    const content = await readFile(filePath, 'utf8');

    if (/^github_url:/m.test(content)) {
      skipped += 1;
      console.log(`[skip] ${slug} already has github_url`);
      continue;
    }

    // Insert `github_url: URL` immediately after the `url:` line in the
    // frontmatter. Preserves indentation by reusing the pattern.
    const updated = content.replace(
      /^(url:\s*['"]?[^\n]*['"]?\s*)$/m,
      `$1\ngithub_url: ${url}`
    );

    if (updated === content) {
      errors += 1;
      console.warn(`[fail] ${slug}: no url: line found; skipping`);
      continue;
    }

    await writeFile(filePath, updated);
    added += 1;
    console.log(`[add]  ${slug} -> ${url}`);
  } catch (err) {
    errors += 1;
    console.error(`[err]  ${slug}: ${err.message}`);
  }
}

console.log('');
console.log(`Summary: ${added} added, ${skipped} skipped, ${errors} errors.`);
