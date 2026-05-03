#!/usr/bin/env node
/**
 * Generate per-news-item OG social-share cards.
 *
 * Writes:
 *   - public/og/news/<slug>.png          (the actual social share)
 *   - public/og/news/thumbs/<slug>.webp  (lightweight on-site card image)
 *
 * Set AIPEDIA_WRITE_OG_SVG=1 to also keep public/og/news/<slug>.svg
 * debug files. Runtime pages only reference PNGs.
 *
 * Style: "site-native" — dark near-black background matching the site,
 * hex cell pattern echoing the brand logo, Metropolis typography, tool
 * logos embedded when news.affects[] lists them. Zero AI-generated
 * illustrations. Pure text + brand + real primary-source tool logos.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import sharp from 'sharp';

let Resvg = null;
try {
  ({ Resvg } = await import('@resvg/resvg-js'));
} catch (err) {
  console.warn('resvg unavailable, will emit SVG-only:', err.message);
}

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const NEWS_DIR = join(ROOT, 'src/content/news');
const OUT_DIR = join(ROOT, 'public/og/news');
const THUMB_DIR = join(OUT_DIR, 'thumbs');
const LOGO_DIR = join(ROOT, 'public/logos/tools');
const WRITE_DEBUG_SVG = process.env.AIPEDIA_WRITE_OG_SVG === '1';
const BRAND_LOGO_SMALL = existsSync(join(ROOT, 'public/brand/aipedia-logo-crystal-cyan-128.png'))
  ? join(ROOT, 'public/brand/aipedia-logo-crystal-cyan-128.png')
  : existsSync(join(ROOT, 'public/brand/aipedia-logo-crystal-128.png'))
  ? join(ROOT, 'public/brand/aipedia-logo-crystal-128.png')
  : join(ROOT, 'public/brand/aipedia-logo-128.png');

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
      return { label: 'BREAKING', bg: 'rgba(103, 232, 249, 0.10)', fg: '#67e8f9', border: 'rgba(103, 232, 249, 0.28)' };
    case 'major':
      return { label: 'MAJOR', bg: 'rgba(103, 232, 249, 0.10)', fg: '#67e8f9', border: 'rgba(103, 232, 249, 0.28)' };
    case 'minor':
    default:
      return { label: 'MINOR', bg: 'rgba(148, 163, 184, 0.08)', fg: '#94a3b8', border: 'rgba(148, 163, 184, 0.22)' };
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
    <pattern id="hexgrid" x="0" y="0" width="84" height="96" patternUnits="userSpaceOnUse">
      <polygon points="42,3 80,25 80,71 42,93 4,71 4,25"
               fill="none" stroke="rgba(34,211,238,0.045)" stroke-width="1"/>
    </pattern>`;
}

function svgForNews(news) {
  const sev = severityStyle(news.severity);
  const date = fmtDate(news.date);
  const titleLines = wrapLines(news.title, 24, 4).map(escapeXml);
  const categories = (news.categories || []).slice(0, 3).map((c) => c.replace(/^ai-/, '').replace(/-/g, ' ').toUpperCase());
  const affects = (news.affects || []).slice(0, 4);

  const titleFontSize = titleLines.length <= 2 ? 62 : titleLines.length === 3 ? 54 : 47;
  const titleLineHeight = titleLines.length <= 2 ? 70 : titleLines.length === 3 ? 62 : 54;

  // Title block y-start: editorial card center, leaving space for source
  // signal at bottom and logo rail at right.
  const titleStartY = 292 - ((titleLines.length - 1) * titleLineHeight) / 2;
  const titleTspans = titleLines
    .map((line, i) => `<tspan x="76" dy="${i === 0 ? 0 : titleLineHeight}">${line}</tspan>`)
    .join('');

  const categoryPills = categories
    .map((c, i) => {
      const x = 76 + i * 150;
      return `
        <g transform="translate(${x}, 520)">
          <rect x="0" y="0" width="${Math.min(132, Math.max(84, c.length * 8 + 30))}" height="34" rx="17"
                fill="rgba(255,255,255,0.035)" stroke="rgba(148,163,184,0.15)" stroke-width="1"/>
          <text x="15" y="22" font-family="Metropolis, sans-serif"
                font-size="11" font-weight="500" letter-spacing="1.2" fill="#94a3b8">${escapeXml(c)}</text>
        </g>`;
    })
    .join('');

  // Affected-tool logo strip: 4 stacked tiles on the right rail.
  const toolTiles = affects
    .map((slug, i) => {
      const data = findToolLogo(slug);
      if (!data) return '';
      const y = 188 + i * 80;
      return `
        <g transform="translate(1016, ${y})">
          <rect x="0" y="0" width="70" height="70" rx="18" fill="rgba(255,255,255,0.055)" stroke="rgba(34,211,238,0.18)" stroke-width="1"/>
          <rect x="1" y="1" width="68" height="68" rx="17" fill="none" stroke="rgba(94,234,212,0.12)" stroke-width="1"/>
          <image href="${data}" x="13" y="13" width="44" height="44" preserveAspectRatio="xMidYMid meet"/>
        </g>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    ${hexPattern()}
    <radialGradient id="bloomA" cx="84%" cy="16%" r="58%">
      <stop offset="0%" stop-color="rgba(34,211,238,0.20)"/>
      <stop offset="58%" stop-color="rgba(34,211,238,0.045)"/>
      <stop offset="100%" stop-color="rgba(11,10,20,0)"/>
    </radialGradient>
    <radialGradient id="bloomB" cx="16%" cy="86%" r="55%">
      <stop offset="0%" stop-color="rgba(94,234,212,0.16)"/>
      <stop offset="64%" stop-color="rgba(94,234,212,0.035)"/>
      <stop offset="100%" stop-color="rgba(5,6,13,0)"/>
    </radialGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="50%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#5eead4"/>
    </linearGradient>
    <linearGradient id="panel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(15,23,42,0.92)"/>
      <stop offset="100%" stop-color="rgba(7,10,22,0.84)"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#05060d"/>
  <rect width="1200" height="630" fill="url(#hexgrid)"/>
  <rect width="1200" height="630" fill="url(#bloomA)"/>
  <rect width="1200" height="630" fill="url(#bloomB)"/>

  <!-- Main editorial panel -->
  <rect x="42" y="42" width="1116" height="546" rx="20" fill="url(#panel)" stroke="rgba(148,163,184,0.16)" stroke-width="1"/>
  <rect x="42" y="42" width="1116" height="4" fill="url(#accent)"/>
  <line x1="934" y1="88" x2="934" y2="542" stroke="rgba(148,163,184,0.13)" stroke-width="1"/>

  <!-- Top row -->
  <g transform="translate(76, 78)">
    <circle cx="8" cy="9" r="5" fill="#5eead4"/>
    <text x="24" y="15" font-family="Metropolis, sans-serif"
          font-size="15" font-weight="500" letter-spacing="1.8" fill="#94a3b8">AI TOOLS NEWS · ${escapeXml(date)}</text>
  </g>

  <g transform="translate(776, 66)">
    <rect x="0" y="0" width="112" height="40" rx="20"
          fill="${sev.bg}" stroke="${sev.border}" stroke-width="1"/>
    <text x="56" y="26" font-family="Metropolis, sans-serif"
          font-size="13" font-weight="800" letter-spacing="1.8"
          text-anchor="middle" fill="${sev.fg}">${sev.label}</text>
  </g>

  <line x1="76" y1="128" x2="888" y2="128" stroke="rgba(148,163,184,0.13)" stroke-width="1"/>

  <!-- Headline -->
  <text x="76" y="${titleStartY}" font-family="Metropolis, sans-serif"
        font-size="${titleFontSize}" font-weight="800" fill="#f8fafc"
        style="letter-spacing:-0.01em;">
    ${titleTspans}
  </text>

  <!-- Footer signal -->
  <line x1="76" y1="488" x2="888" y2="488" stroke="rgba(148,163,184,0.13)" stroke-width="1"/>
  ${categoryPills}

  <!-- Right rail -->
  <text x="976" y="126" font-family="Metropolis, sans-serif"
        font-size="11" font-weight="600" letter-spacing="2.2" fill="#67e8f9">AFFECTED TOOLS</text>
  ${toolTiles || `
    <g transform="translate(1016, 208)">
      <rect x="0" y="0" width="70" height="70" rx="18" fill="rgba(255,255,255,0.035)" stroke="rgba(34,211,238,0.16)" stroke-width="1"/>
      <path d="M22 36h26M35 23v26" stroke="#67e8f9" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
    </g>`}

  <line x1="976" y1="488" x2="1114" y2="488" stroke="rgba(148,163,184,0.13)" stroke-width="1"/>

  ${
    brandLogo
      ? `<image href="${brandLogo}" x="976" y="512" width="40" height="40" preserveAspectRatio="xMidYMid meet"/>`
      : ''
  }
  <text x="1026" y="538" font-family="Metropolis, sans-serif"
        font-size="19" font-weight="800" letter-spacing="0" fill="#e5e7eb">aipedia.wiki</text>
  <text x="1027" y="558" font-family="Metropolis, sans-serif"
        font-size="9" font-weight="500" letter-spacing="1.5" fill="#64748b">APRIL 2026 DESK</text>
</svg>`;
}

// Bundle our own TTF files so the rasterization is reproducible across
// environments (dev Windows, Cloudflare Pages Linux build). Without this,
// resvg falls back to whatever the host system has installed, which on
// Cloudflare Pages was producing Greek-glyph substitution for Latin
// codepoints (likely a Cyrillic/Greek-only font fallback).
const FONT_DIR = join(ROOT, 'public/fonts/metropolis');
const FONT_PATHS = [
  'metropolis-latin-400-normal.woff2',
  'metropolis-latin-500-normal.woff2',
  'metropolis-latin-700-normal.woff2',
  'metropolis-latin-800-normal.woff2',
].map((f) => join(FONT_DIR, f)).filter((p) => existsSync(p));

function rasterize(svg) {
  if (!Resvg) return null;
  const resvg = new Resvg(svg, {
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

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  if (!existsSync(THUMB_DIR)) mkdirSync(THUMB_DIR, { recursive: true });

  const requested = new Set(process.argv.slice(2).map((arg) => arg.replace(/\.md$/, '')));
  const files = readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith('.md'))
    .filter((f) => requested.size === 0 || requested.has(f.replace(/\.md$/, '')));
  let svgs = 0;
  let pngs = 0;
  let thumbs = 0;

  for (const file of files) {
    const src = readFileSync(join(NEWS_DIR, file), 'utf8');
    const news = parseFrontmatter(src);
    if (!news.slug && !news.title) continue;
    const slug = news.slug || file.replace(/\.md$/, '');

    const svg = svgForNews(news).replace(/[ \t]+$/gm, '');
    if (WRITE_DEBUG_SVG || !Resvg) {
      writeFileSync(join(OUT_DIR, `${slug}.svg`), svg, 'utf8');
      svgs++;
    }
    try {
      const png = rasterize(svg);
      if (png) {
        writeFileSync(join(OUT_DIR, `${slug}.png`), png);
        pngs++;
        const thumb = await sharp(png)
          .resize({ width: 960, withoutEnlargement: true })
          .webp({ quality: 82, effort: 6 })
          .toBuffer();
        writeFileSync(join(THUMB_DIR, `${slug}.webp`), thumb);
        thumbs++;
      }
    } catch (err) {
      console.warn(`[news-og] PNG raster failed for ${slug}:`, err.message);
    }
  }

  const svgSummary = svgs > 0 ? ` and ${svgs} debug SVGs` : '';
  console.log(`[news-og] generated ${pngs} PNGs, ${thumbs} WebP thumbnails${svgSummary} in public/og/news/`);
}

await main();
