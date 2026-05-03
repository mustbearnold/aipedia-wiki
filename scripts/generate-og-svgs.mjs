#!/usr/bin/env node
/**
 * Generate per-tool OG social-share images at build time.
 *
 * Writes:
 *   - public/og/tools/<slug>.png  (the one social networks actually render)
 *
 * Set AIPEDIA_WRITE_OG_SVG=1 to also keep public/og/tools/<slug>.svg
 * debug files. Runtime pages only reference PNGs.
 *
 * Twitter/X, LinkedIn, Facebook, Slack, iMessage all refuse SVG for
 * link previews. PNG/JPG/WebP only. That is why we rasterize here.
 *
 * Also rasterizes public/og-default.svg -> public/og-default.png so the
 * site-wide fallback share card works the same way.
 *
 * Template uses pure SVG text (no <foreignObject>) because resvg does
 * not support foreignObject.
 *
 * Run via scripts/copy-content.mjs before astro dev/build.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// Lazy-load resvg so build machines that can't install native modules
// (e.g. some Cloudflare Workers build environments) still produce SVG
// output, they just skip the PNG rasterization step. Committed PNGs
// in public/og/tools/ stay authoritative in that case.
let Resvg = null;
try {
  ({ Resvg } = await import('@resvg/resvg-js'));
} catch (err) {
  console.warn('resvg unavailable, will emit SVG-only:', err.message);
}

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const REGISTRY = join(ROOT, 'src/data/_meta/tools-registry.json');
const TOOLS_MD_DIR = join(ROOT, 'src/content/tools');
const OUT_DIR = join(ROOT, 'public/og/tools');
const LOGO_DIR = join(ROOT, 'public/logos/tools');
const WRITE_DEBUG_SVG = process.env.AIPEDIA_WRITE_OG_SVG === '1';
// Two brand logo sizes: a small one for the top-left corner of each
// tool card (rendered at 56x56), and a large one for the default card
// centerpiece (rendered at 200x200). Embedding the full 1666x1666
// source in every SVG would bloat the repo by ~20MB total.
const BRAND_LOGO_SMALL = join(ROOT, 'public/brand/aipedia-logo-128.png');
const BRAND_LOGO_LARGE = join(ROOT, 'public/brand/aipedia-logo-512.png');
const DEFAULT_SVG = join(ROOT, 'public/og-default.svg');
const DEFAULT_PNG = join(ROOT, 'public/og-default.png');

// Cache brand logos as data URLs once per run. Fall back to the master
// source if the pre-sized variants haven't been generated yet (run
// scripts/prep-favicons.mjs to produce them).
function toDataUrl(path) {
  if (!existsSync(path)) return null;
  return `data:image/png;base64,${readFileSync(path).toString('base64')}`;
}
const brandLogoSmall =
  toDataUrl(BRAND_LOGO_SMALL) ?? toDataUrl(join(ROOT, 'public/brand/aipedia-logo.png'));
const brandLogoLarge =
  toDataUrl(BRAND_LOGO_LARGE) ?? toDataUrl(join(ROOT, 'public/brand/aipedia-logo.png'));

/**
 * Read a tool's tagline + description directly from its markdown
 * frontmatter. The registry JSON doesn't carry these fields yet, and
 * we need them for the OG card body text. Simple YAML parse — handles
 * quoted and unquoted single-line values plus the >- folded form.
 */
function readToolFrontmatter(slug) {
  const path = join(TOOLS_MD_DIR, `${slug}.md`);
  if (!existsSync(path)) return {};
  const src = readFileSync(path, 'utf8');
  const match = src.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  const yaml = match[1];

  function readScalar(key) {
    // Handles: `key: value`, `key: "value"`, `key: 'value'`
    const m = yaml.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    if (!m) return null;
    let v = m[1].trim();
    // Folded / block scalars use `>-` and continue on subsequent indented
    // lines. Stitch them back together into one string.
    if (v === '>-' || v === '>' || v === '|' || v === '|-') {
      const re = new RegExp(`^${key}:\\s*[>|][-]?\\s*\\n((?:\\s+[^\\n]*\\n)+)`, 'm');
      const block = yaml.match(re);
      if (block) {
        return block[1]
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
          .join(' ');
      }
      return '';
    }
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    return v;
  }

  return {
    tagline: readScalar('tagline') ?? '',
    meta_description: readScalar('meta_description') ?? '',
  };
}

function findLogoFile(slug) {
  for (const ext of ['.png', '.svg', '.jpg', '.webp', '.gif', '.ico']) {
    const p = join(LOGO_DIR, `${slug}${ext}`);
    if (existsSync(p)) return { path: p, ext };
  }
  return null;
}

function embedLogo(slug) {
  const logo = findLogoFile(slug);
  if (!logo) return null;
  const buf = readFileSync(logo.path);
  const b64 = buf.toString('base64');
  let mime = 'image/png';
  if (logo.ext === '.svg') mime = 'image/svg+xml';
  else if (logo.ext === '.jpg') mime = 'image/jpeg';
  else if (logo.ext === '.webp') mime = 'image/webp';
  else if (logo.ext === '.gif') mime = 'image/gif';
  else if (logo.ext === '.ico') mime = 'image/x-icon';
  return `data:${mime};base64,${b64}`;
}

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

/**
 * Simple greedy char-count word wrap. resvg has no text-layout engine,
 * so we pre-wrap into multiple <tspan> lines. Metropolis at 26px on a 900px
 * box fits ~56 chars per line comfortably.
 */
function wrapLines(text, maxChars, maxLines) {
  const words = String(text ?? '').split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';
  for (const w of words) {
    const next = current ? `${current} ${w}` : w;
    if (next.length > maxChars) {
      if (current) lines.push(current);
      current = w;
      if (lines.length >= maxLines) break;
    } else {
      current = next;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  // If we truncated, add an ellipsis to the last line.
  if (words.length && lines.length === maxLines) {
    const last = lines[lines.length - 1];
    if (!last.endsWith('…')) lines[lines.length - 1] = last.replace(/[.,;:\s]+$/, '') + '…';
  }
  return lines;
}

function svgFor(tool) {
  const s = tool.scores ?? {};
  const overall =
    Math.round(
      (((s.utility ?? 0) + (s.value ?? 0) + (s.moat ?? 0) + (s.longevity ?? 0)) / 4) * 10
    ) / 10;
  const title = escapeXml(tool.title ?? tool.slug ?? '');
  // Pull tagline + meta_description from the tool's markdown frontmatter.
  // The registry doesn't store these, so the OG card body used to be empty.
  const fm = readToolFrontmatter(tool.slug);
  const taglineRaw = (
    tool.tagline ?? tool.meta_description ?? fm.tagline ?? fm.meta_description ?? ''
  ).toString();
  const category = escapeXml(CATEGORY_LABEL[tool.category] ?? tool.category ?? '');
  const company = escapeXml(tool.company ?? '');
  const scoreColor =
    overall >= 9 ? '#34d399' : overall >= 8 ? '#a78bfa' : overall >= 6 ? '#fbbf24' : '#f87171';
  const logoData = embedLogo(tool.slug);

  const logoBlock = logoData
    ? `<g transform="translate(80, 180)">
    <rect x="0" y="0" width="100" height="100" rx="18" fill="#ffffff" opacity="0.04"/>
    <image href="${logoData}" x="10" y="10" width="80" height="80" preserveAspectRatio="xMidYMid meet"/>
  </g>`
    : '';

  const titleX = logoData ? 210 : 80;

  // Pre-wrap the tagline into <tspan> lines because resvg has no
  // text-layout engine and doesn't support <foreignObject> HTML.
  const taglineLines = wrapLines(taglineRaw, 56, 3).map((line) => escapeXml(line));
  const taglineTspans = taglineLines
    .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : 36}">${line}</tspan>`)
    .join('');

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
  ${
    brandLogoSmall
      ? `<image href="${brandLogoSmall}" x="60" y="60" width="56" height="56" preserveAspectRatio="xMidYMid meet"/>`
      : ''
  }
  <text x="${brandLogoSmall ? 132 : 80}" y="100" font-family="Metropolis, sans-serif" font-size="26" font-weight="700" fill="#a78bfa" letter-spacing="1">aipedia.wiki</text>
  <text x="${brandLogoSmall ? 132 : 80}" y="124" font-family="Metropolis, sans-serif" font-size="16" font-weight="500" fill="#9ca3af">${category}</text>
  ${logoBlock}
  <text x="${titleX}" y="270" font-family="Metropolis, sans-serif" font-size="76" font-weight="800" fill="#fafafa">${title}</text>
  <text x="${titleX}" y="310" font-family="Metropolis, sans-serif" font-size="20" font-weight="500" fill="#9ca3af">${company}</text>
  <text x="80" y="400" font-family="Metropolis, sans-serif" font-size="26" font-weight="500" fill="#d1d5db">${taglineTspans}</text>
  <g transform="translate(960, 80)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="rgba(167,139,250,0.10)" stroke="rgba(167,139,250,0.35)" stroke-width="2"/>
    <text x="80" y="100" font-family="Metropolis, sans-serif" font-size="64" font-weight="800" text-anchor="middle" fill="${scoreColor}">${overall}</text>
    <text x="80" y="130" font-family="Metropolis, sans-serif" font-size="16" font-weight="500" text-anchor="middle" fill="#9ca3af">/10 SCORE</text>
  </g>
  <text x="80" y="570" font-family="Metropolis, sans-serif" font-size="18" font-weight="500" fill="#6b7280">Independent editorial review. Verified Apr 2026</text>
</svg>`;
}

/**
 * Rasterize an SVG string to a 1200x630 PNG buffer using resvg.
 * Uses bundled Metropolis webfont files so cards match site typography.
 * Returns null if resvg wasn't available at module load.
 */
// Bundle our own TTF files so rasterization is reproducible across envs
// (dev Windows + Cloudflare Pages Linux). Without this, resvg's system
// font fallback on Cloudflare produced Greek-glyph substitution for
// Latin codepoints.
const FONT_DIR = join(ROOT, 'public/fonts/metropolis');
const FONT_PATHS = [
  'metropolis-latin-400-normal.woff2',
  'metropolis-latin-500-normal.woff2',
  'metropolis-latin-700-normal.woff2',
  'metropolis-latin-800-normal.woff2',
].map((f) => join(FONT_DIR, f)).filter((p) => existsSync(p));

function rasterize(svgString) {
  if (!Resvg) return null;
  const resvg = new Resvg(svgString, {
    background: '#0b0a14',
    fitTo: { mode: 'width', value: 1200 },
    font: {
      fontFiles: FONT_PATHS,
      loadSystemFonts: false,
      defaultFontFamily: 'Metropolis',
    },
  });
  return resvg.render().asPng();
}

function main() {
  if (!existsSync(REGISTRY)) {
    console.error('tools-registry.json not found, skipping OG generation');
    process.exit(0);
  }
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const data = JSON.parse(readFileSync(REGISTRY, 'utf8'));
  const tools = Object.values(data.tools ?? {}).filter(
    (t) => t.slug && t.status !== 'dead' && t.status !== 'acquired'
  );

  let svgs = 0;
  let pngs = 0;
  for (const tool of tools) {
    const svg = svgFor(tool);
    if (WRITE_DEBUG_SVG || !Resvg) {
      writeFileSync(join(OUT_DIR, `${tool.slug}.svg`), svg, 'utf8');
      svgs++;
    }
    try {
      const png = rasterize(svg);
      if (png) {
        writeFileSync(join(OUT_DIR, `${tool.slug}.png`), png);
        pngs++;
      }
    } catch (err) {
      console.warn(`PNG raster failed for ${tool.slug}:`, err.message);
    }
  }
  const svgSummary = svgs > 0 ? ` + ${svgs} debug SVGs` : '';
  console.log(`Generated ${pngs} OG PNGs${svgSummary} in public/og/tools/`);

  // Also rasterize the site-wide default card so it works as a social
  // fallback. Without a PNG version, X/LinkedIn/etc show a blank card
  // on any link that doesn't override ogImage. Inline the brand logo
  // at the BRAND_LOGO_DATA_URL placeholder so the source SVG can stay
  // a clean template without a baked-in base64 blob.
  if (existsSync(DEFAULT_SVG)) {
    try {
      let svg = readFileSync(DEFAULT_SVG, 'utf8');
      if (brandLogoLarge) {
        svg = svg.replace('BRAND_LOGO_DATA_URL', brandLogoLarge);
      } else {
        // If no brand logo is available on disk, strip the <image> tag
        // so resvg doesn't fail on a missing href.
        svg = svg.replace(/<image[^>]*BRAND_LOGO_DATA_URL[^>]*\/>/g, '');
      }
      const png = rasterize(svg);
      if (png) {
        writeFileSync(DEFAULT_PNG, png);
        console.log('Rasterized public/og-default.svg -> og-default.png');
      }
    } catch (err) {
      console.warn('Default OG PNG raster failed:', err.message);
    }
  }
}

main();
