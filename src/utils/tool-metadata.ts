export const CATEGORY_LABELS: Record<string, string> = {
  'ai-chatbots': 'Chatbots',
  'ai-voice': 'Voice',
  'ai-video': 'Video',
  'ai-coding': 'Coding',
  'ai-image': 'Image',
  'ai-writing': 'Writing',
  'ai-automation': 'Automation',
  'ai-seo': 'SEO',
  'ai-design': 'Design',
  'ai-search': 'Search',
  'ai-notes': 'Notes',
  'ai-music': 'Music',
  'ai-presentation': 'Presentation',
  'ai-research': 'Research',
  'ai-infrastructure': 'Infrastructure',
};

export const INACTIVE_TOOL_STATUSES = new Set(['dead', 'retired', 'acquired']);

export function categoryLabel(slug?: string | null): string {
  if (!slug) return '';
  return CATEGORY_LABELS[slug] ?? slug;
}

export function isActiveToolStatus(status?: string | null): boolean {
  return !INACTIVE_TOOL_STATUSES.has(String(status ?? 'active'));
}

export function overallScore(scores?: {
  utility?: number | null;
  value?: number | null;
  moat?: number | null;
  longevity?: number | null;
} | null): number {
  const values = [scores?.utility, scores?.value, scores?.moat, scores?.longevity]
    .filter((value): value is number => typeof value === 'number');
  if (values.length === 0) return 0;
  return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 10) / 10;
}
