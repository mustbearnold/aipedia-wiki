#!/usr/bin/env node
/**
 * Generate per-news-item OG social-share cards.
 *
 * Writes:
 *   - public/og/news/<slug>.svg  (debug)
 *   - public/og/news/<slug>.png  (the actual social share)
 *
 * Style: "site-native" — dark near-black background matching the site,
 * hex cell pattern echoing the brand logo, Geist-family typography, tool
 * logos embedded when news.affects[] lists them. Zero AI-generated
 * illustrations. Pure text + brand + real primary-source tool logos.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

let Resvg = null;
try {
  ({ Resvg } = await import('@resvg/resvg-js'));
} catch (err) {
  console.warn('resvg unavailable, will emit SVG-only:', err.message);
}

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const NEWS_DIR = join(ROOT, 'src/content/news');
const OUT_DIR = join(ROOT, 'public/og/news');
const LOGO_DIR = join(ROOT, 'public/logos/tools');
const BRAND_LOGO_SMALL = join(ROOT, 'public/brand/aipedia-logo-128.png');

function toDataUrl(path) {
  if (!existsSync(path)) return null;
  return `data:image/png;base64,${readFileSync(path).toString('base64')}`;
}
const brandLogo =
  toDataUrl(BRAND_LOGO_SMALL) ?? toDataUrl(join(ROOT, 'public/brand/aipedia-logo.png'));

function findToolLogo(slug) {
  for (const ext of ['.png', '.svg', '.jpg', '.webp', '.ico']) {
    const p = join(LOGO_DIR, `${slug}${ext}`);
    if (existsSync(p)) {
      const mime =
        ext === '.svg' ? 'image/svg+xml' :
        ext === '.jpg' ? 'image/jpeg' :
        ext === '.webp' ? 'image/webp' :
        ext === '.ico' ? 'image/x-icon' : 'image/png';
      return `data:${mime};base64,${readFileSync(p).toString('base64')}`;
    }
  }
  return null;
}

function escapeXml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Parse a news .md file's frontmatter into a simple object. */
function parseFrontmatter(src) {
  const m = src.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return {};
  const yaml = m[1];

  function readScalar(key) {
    const re = new RegExp(`^${key}:\\s*(.+)$`, 'm');
    const mm = yaml.match(re);
    if (!mm) return null;
    let v = mm[1].trim();
    if (v === '>-' || v === '>' || v === '|' || v === '|-') {
      const folded = yaml.match(new RegExp(`^${key}:\\s*[>|][-]?\\s*\\n((?:\\s+[^\\n]*\\n)+)`, 'm'));
      if (folded) {
        return folded[1].split('\n').map(l => l.trim()).filter(Boolean).join(' ');
      }
      return '';
    }
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    return v;
  }

  function readArray(key) {
    const re = new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, 'm');
    const mm = yaml.match(re);
    if (!mm) return [];
    return mm[1]
      .split(',')
      .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }

  return {
    title: readScalar('title') ?? '',
    slug: readScalar('slug') ?? '',
    date: readScalar('date') ?? '',
    severity: readScalar('severity') ?? 'minor',
    summary: readScalar('summary') ?? '',
    affects: readArray('affects'),
    categories: readArray('categories'),
  };
}

/** Format "2026-04-20" -> "APR·20·2026" for the card's date stamp. */
function fmtDate(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const [y, m, d] = iso.split('-');
  return `${months[Number(m) - 1]}\u00B7${d}\u00B7${y}`;
}

/** Severity pill color + label matching the site's existing chip style. */
function severityStyle(sev) {
  switch ((sev || 'minor').toLowerCase()) {
    case 'breaking':
      return { label: 'BREAKING', bg: 'rgba(244, 114, 114, 0.14)', fg: '#fb7185', border: 'rgba(251, 113, 133, 0.4)' };
    case 'major':
      return { label: 'MAJOR', bg: 'rgba(167, 139, 250, 0.14)', fg: '#a78bfa', border: 'rgba(167, 139, 250, 0.4)' };
    case 'minor':
    default:
      return { label: 'MINOR', bg: 'rgba(156, 163, 175, 0.12)', fg: '#9ca3af', border: 'rgba(156, 163, 175, 0.3)' };
  }
}

/** Greedy word-wrap; returns an array of lines that fit maxChars each. */
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
  if (words.length && lines.length === maxLines) {
    const last = lines[lines.length - 1];
    if (!last.endsWith('\u2026')) {
      lines[lines.length - 1] = last.replace(/[.,;:\s]+$/, '') + '\u2026';
    }
  }
  return lines;
}

/** Build a hex-cell background pattern SVG fragment. 40px hex cells. */
function hexPattern() {
  // Pointy-top hex, 40px height. Stored as <pattern> so we can fill a rect.
  return `
    <pattern id="hexgrid" x="0" y="0" width="70" height="80" patternUnits="userSpaceOnUse">
      <polygon points="35,2 68,21 68,59 35,78 2,59 2,21"
               fill="none" stroke="rgba(167,139,250,0.05)" stroke-width="1"/>
    </pattern>`;
}

function svgForNews(news) {
  const sev = severityStyle(news.severity);
  const date = fmtDate(news.date);
  const titleLines = wrapLines(news.title, 28, 4).map(escapeXml);
  const categories = (news.categories || []).slice(0, 3).map(escapeXml).join(' \u00B7 ');
  const affects = (news.affects || []).slice(0, 4);

  const titleFontSize = titleLines.length <= 2 ? 68 : titleLines.length === 3 ? 60 : 52;
  const titleLineHeight = titleLines.length <= 2 ? 78 : titleLines.length === 3 ? 70 : 60;

  // Title block y-start: visually centered between header row (y=170) and
  // footer row (y=540). Adjust baseline so it doesn't feel top-heavy.
  const titleStartY = 280 - ((titleLines.length - 1) * titleLineHeight) / 2;
  const titleTspans = titleLines
    .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : titleLineHeight}">${line}</tspan>`)
    .join('');

  // Affected-tool logo strip: 4 tiles, 64x64 each with 16px gap
  const toolTiles = affects
    .map((slug, i) => {
      const data = findToolLogo(slug);
      if (!data) return '';
      const x = 80 + i * 80;
      return `
        <g transform="translate(${x}, 430)">
          <rect x="0" y="0" width="64" height="64" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(167,139,250,0.18)" stroke-width="1"/>
          <image href="${data}" x="10" y="10" width="44" height="44" preserveAspectRatio="xMidYMid meet"/>
        </g>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    ${hexPattern()}
    <radialGradient id="bloom" cx="82%" cy="82%" r="45%">
      <stop offset="0%" stop-color="rgba(167,139,250,0.22)"/>
      <stop offset="60%" stop-color="rgba(96,165,250,0.06)"/>
      <stop offset="100%" stop-color="rgba(11,10,20,0)"/>
    </radialGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#60a5fa"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#0b0a14"/>
  <rect width="1200" height="630" fill="url(#hexgrid)"/>
  <rect width="1200" height="630" fill="url(#bloom)"/>

  <!-- Top accent bar -->
  <rect x="0" y="0" width="1200" height="4" fill="url(#accent)"/>

  <!-- Top row: date (left) + severity pill (right) -->
  <text x="80" y="100" font-family="JetBrains Mono, Geist Mono, monospace"
        font-size="22" font-weight="500" letter-spacing="2" fill="#a0a0c0">${escapeXml(date)}</text>

  <g transform="translate(1035, 72)">
    <rect x="0" y="0" width="90" height="36" rx="10"
          fill="${sev.bg}" stroke="${sev.border}" stroke-width="1"/>
    <text x="45" y="24" font-family="Inter, Geist, system-ui, sans-serif"
          font-size="13" font-weight="700" letter-spacing="2"
          text-anchor="middle" fill="${sev.fg}">${sev.label}</text>
  </g>

  <!-- Rule under the header row -->
  <line x1="80" y1="140" x2="1120" y2="140" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>

  <!-- Headline -->
  <text x="80" y="${titleStartY}" font-family="Geist, Inter, system-ui, sans-serif"
        font-size="${titleFontSize}" font-weight="700" fill="#ffffff"
        style="letter-spacing:-0.01em;">
    ${titleTspans}
  </text>

  <!-- Affected tool logos (if any) -->
  ${toolTiles}

  <!-- Rule above the footer row -->
  <line x1="80" y1="540" x2="1120" y2="540" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>

  <!-- Bottom row: categories (left) + gem + wordmark (right) -->
  <text x="80" y="572" font-family="JetBrains Mono, Geist Mono, monospace"
        font-size="17" font-weight="500" letter-spacing="1.5" fill="#a0a0c0">${escapeXml(categories)}</text>

  ${
    brandLogo
      ? `<image href="${brandLogo}" x="995" y="546" width="36" height="36" preserveAspectRatio="xMidYMid meet"/>`
      : ''
  }
  <text x="1040" y="572" font-family="Geist, Inter, system-ui, sans-serif"
        font-size="20" font-weight="700" letter-spacing="0.3" fill="#e5e7eb">aipedia.wiki</text>
</svg>`;
}

// Bundle our own TTF files so the rasterization is reproducible across
// environments (dev Windows, Cloudflare Pages Linux build). Without this,
// resvg falls back to whatever the host system has installed, which on
// Cloudflare Pages was producing Greek-glyph substitution for Latin
// codepoints (likely a Cyrillic/Greek-only font fallback).
const FONT_DIR = join(ROOT, 'fonts');
const FONT_PATHS = [
  'Inter-400.ttf',
  'Inter-500.ttf',
  'Inter-700.ttf',
  'JetBrainsMono-400.ttf',
  'JetBrainsMono-500.ttf',
].map((f) => join(FONT_DIR, f)).filter((p) => existsSync(p));

function rasterize(svg) {
  if (!Resvg) return null;
  const resvg = new Resvg(svg, {
    background: '#0b0a14',
    fitTo: { mode: 'width', value: 1200 },
    font: {
      fontFiles: FONT_PATHS,
      loadSystemFonts: false,
      defaultFontFamily: 'Inter',
    },
  });
  return resvg.render().asPng();
}

function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const files = readdirSync(NEWS_DIR).filter((f) => f.endsWith('.md'));
  let svgs = 0;
  let pngs = 0;

  for (const file of files) {
    const src = readFileSync(join(NEWS_DIR, file), 'utf8');
    const news = parseFrontmatter(src);
    if (!news.slug && !news.title) continue;
    const slug = news.slug || file.replace(/\.md$/, '');

    const svg = svgForNews(news);
    writeFileSync(join(OUT_DIR, `${slug}.svg`), svg, 'utf8');
    svgs++;
    try {
      const png = rasterize(svg);
      if (png) {
        writeFileSync(join(OUT_DIR, `${slug}.png`), png);
        pngs++;
      }
    } catch (err) {
      console.warn(`[news-og] PNG raster failed for ${slug}:`, err.message);
    }
  }

  console.log(`[news-og] generated ${svgs} SVGs and ${pngs} PNGs in public/og/news/`);
}

main();
