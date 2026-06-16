export interface AnswerItem {
  slug: string;
  q: string;
  a?: string;
}

export interface AnswerGroup {
  title: string;
  items: AnswerItem[];
}

export const ANSWER_GROUPS: AnswerGroup[] = [
  {
    title: 'Best tools',
    items: [
      { slug: 'best-ai-chatbot-2026', q: 'What is the best AI chatbot in 2026?', a: 'ChatGPT is the broadest default; Claude, Gemini, and Perplexity win narrower writing, Google, and research jobs.' },
      { slug: 'best-ai-search-engine-2026', q: 'What is the best AI search engine in 2026?', a: 'Perplexity is the best all-round pick; Kagi for private ad-free search, Phind for developers, and Glean for enterprise.' },
      { slug: 'best-ai-coding-tool-2026', q: 'What is the best AI coding tool in 2026?', a: 'Cursor for daily IDE work, Claude Code with Opus 4.8 for deep repo tasks, Copilot for GitHub-first teams.' },
      { slug: 'best-ai-for-writing-2026', q: 'What is the best AI for writing in 2026?', a: 'Claude is the first writing pick; ChatGPT is broader, and Grammarly fits inline review.' },
      { slug: 'best-ai-image-generator-2026', q: 'What is the best AI image generator in 2026?', a: 'ChatGPT with GPT Image 2 is easiest for most people; Midjourney, Ideogram, Firefly, Flux, and Stable Diffusion win specialist jobs.' },
      { slug: 'best-ai-video-generator-2026', q: 'What is the best AI video generator in 2026?', a: 'Runway is safest for production and Edit Studio; Seedance, Veo, and Kling must be tested for frontier quality.' },
      { slug: 'best-ai-voice-generator-2026', q: 'What is the best AI voice generator in 2026?', a: 'ElevenLabs is the safest default; Cartesia, Fish Audio, and Speechify fit narrower workflows.' },
    ],
  },
  {
    title: 'Tool comparisons',
    items: [
      { slug: 'chatgpt-vs-claude-which-is-better', q: 'ChatGPT vs Claude: which is better?' },
      { slug: 'chatgpt-alternatives-2026', q: 'What are the best ChatGPT alternatives in 2026?', a: 'Claude is the first direct alternative; Gemini and Perplexity win Google-native and citation-first workflows.' },
    ],
  },
  {
    title: 'Buying decisions',
    items: [
      { slug: 'is-midjourney-worth-it', q: 'Is Midjourney worth it in 2026?', a: 'Midjourney is worth it for frequent stylized image work; skip it for occasional free images, exact text/product control, Adobe governance, or local/API workflows.' },
      { slug: 'is-cursor-worth-it', q: 'Is Cursor worth the money?', a: 'Cursor is worth it for daily VS Code-style IDE work; wait if you code sporadically, need terminal-first agents, or cannot govern agent spend and privacy.' },
    ],
  },
  {
    title: 'Free and budget',
    items: [
      { slug: 'best-free-ai-tools-2026', q: 'What are the best free AI tools in 2026?', a: 'ChatGPT Free is the broad default; add Claude, Gemini, Perplexity, or NotebookLM only when their specialist workflow matters.' },
      { slug: 'best-ai-for-students', q: 'What is the best AI for students in 2026?' },
    ],
  },
];

export const ANSWER_ITEMS = ANSWER_GROUPS.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    group: group.title,
  }))
);
