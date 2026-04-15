#!/usr/bin/env node
/**
 * Generate per-tool OG SVG images at build time.
 * Reads tools-registry.json and writes one SVG per active tool to
 * public/og/tools/<slug>.svg. Run via copy-content.sh before astro dev/build.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const REGISTRY = join(ROOT, 'src/data/_meta/tools-registry.json');
const OUT_DIR = join(ROOT, 'public/og/tools');

const CATEGORY_LABEL = {
  'ai-chatbots': 'AI Chatbots',
  'ai-coding': 'AI Coding',
  'ai-voice': 'AI Voice',
  'ai-video': 'AI Video',
  'ai-image': 'AI Image',
  'ai-writing': 'AI Writing',
  'ai-automation': 'AI Automation',
  'ai-seo': 'AI SEO',
  'ai-design': 'AI Design',
  'ai-search': 'AI Search',
  'ai-notes': 'AI Notes',
  'ai-music': 'AI Music',
  'ai-presentation': 'AI Presentation',
  'ai-research': 'AI Research',
};

function escapeXml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function svgFor(tool) {
  const s = tool.scores ?? {};
  const overall =
    Math.round(
      (((s.utility ?? 0) + (s.value ?? 0) + (s.moat ?? 0) + (s.longevity ?? 0)) / 4) * 10
    ) / 10;
  const title = escapeXml(tool.title ?? tool.slug ?? '');
  const tagline = escapeXml((tool.tagline ?? tool.meta_description ?? '').slice(0, 120));
  const category = escapeXml(CATEGORY_LABEL[tool.category] ?? tool.category ?? '');
  const company = escapeXml(tool.company ?? '');
  const scoreColor =
    overall >= 9 ? '#34d399' : overall >= 8 ? '#a78bfa' : overall >= 6 ? '#fbbf24' : '#f87171';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0a14"/>
      <stop offset="100%" stop-color="#1a1830"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#60a5fa"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="6" fill="url(#accent)"/>
  <text x="80" y="100" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="600" fill="#a78bfa" letter-spacing="2">aipedia.wiki</text>
  <text x="80" y="135" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="500" fill="#9ca3af">${category}</text>
  <text x="80" y="270" font-family="Inter, system-ui, sans-serif" font-size="92" font-weight="800" fill="#fafafa">${title}</text>
  <text x="80" y="320" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="500" fill="#9ca3af">${company}</text>
  <foreignObject x="80" y="360" width="900" height="160">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Inter, system-ui, sans-serif; font-size: 26px; line-height: 1.4; color: #d1d5db;">${tagline}</div>
  </foreignObject>
  <g transform="translate(960, 80)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="rgba(167,139,250,0.10)" stroke="rgba(167,139,250,0.35)" stroke-width="2"/>
    <text x="80" y="100" font-family="Inter, system-ui, sans-serif" font-size="64" font-weight="800" text-anchor="middle" fill="${scoreColor}">${overall}</text>
    <text x="80" y="130" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="500" text-anchor="middle" fill="#9ca3af">/10 SCORE</text>
  </g>
  <text x="80" y="570" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="500" fill="#6b7280">Independent editorial review · Verified Apr 2026</text>
</svg>`;
}

function main() {
  if (!existsSync(REGISTRY)) {
    console.error('tools-registry.json not found, skipping OG generation');
    process.exit(0);
  }
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const data = JSON.parse(readFileSync(REGISTRY, 'utf8'));
  const tools = Object.values(data.tools ?? {}).filter((t) => t.status === 'active' && t.slug);

  let written = 0;
  for (const tool of tools) {
    const path = join(OUT_DIR, `${tool.slug}.svg`);
    writeFileSync(path, svgFor(tool), 'utf8');
    written++;
  }
  console.log(`Generated ${written} OG SVGs in public/og/tools/`);
}

main();
