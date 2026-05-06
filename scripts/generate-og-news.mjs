#!/usr/bin/env node
/**
 * Generate per-news-item OG social-share cards (orange / stone theme).
 *
 * Writes:
 *   - public/og/news/<slug>.png              dark theme (canonical og:image)
 *   - public/og/news/light/<slug>.png        light theme
 *   - public/og/news/thumbs/<slug>.webp      dark thumb (on-site default hero when no hero image)
 *   - public/og/news/thumbs/light/<slug>.webp
 *
 * Set AIPEDIA_WRITE_OG_SVG=1 to also keep matching debug SVGs alongside PNGs.
 *
 * Dark palette aligns with global.css stone background (#0c0a09) + orange accent.
 * Light palette aligns with html.light paper (#fafaf9) + deeper orange text.
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
const OUT_LIGHT_DIR = join(OUT_DIR, 'light');
const THUMB_DIR = join(OUT_DIR, 'thumbs');
const THUMB_LIGHT_DIR = join(THUMB_DIR, 'light');
const WRITE_DEBUG_SVG = process.env.AIPEDIA_WRITE_OG_SVG === '1';

/** Same nudge as `src/styles/global.css` `.nav-logo-frame img` (cyan PNG -> orange accent). */
const HEADER_BRAND_FILTER = Object.freeze({
  hue: -152,
  saturation: 1.08,
  brightness: 1.02,
});

function pickBrandLogoPath() {
  const candidates = [
    join(ROOT, 'public/brand/aipedia-logo-crystal-cyan-128.png'),
    join(ROOT, 'public/brand/aipedia-logo-crystal-cyan-512.png'),
    join(ROOT, 'public/brand/aipedia-logo-crystal-cyan-64.png'),
    join(ROOT, 'public/brand/aipedia-logo-crystal-128.png'),
    join(ROOT, 'public/brand/aipedia-logo-128.png'),
    join(ROOT, 'public/brand/aipedia-logo.png'),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

/**
 * Raster match for the header lockup (crystal-cyan asset + hue modulate).
 * Returns a PNG data URL for embedding in OG SVG before resvg renders.
 */
async function prepareBrandLogoForOg() {
  const path = pickBrandLogoPath();
  if (!path) return null;
  let pipe = sharp(path).ensureAlpha();
  /* Only the cyan-forward crystal matches Nav + footer; hue nudge aligns with orange UI. */
  if (path.includes('crystal-cyan')) pipe = pipe.modulate({ ...HEADER_BRAND_FILTER });
  const buf = await pipe
    .resize(128, 128, { fit: 'inside', kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toBuffer();
  return `data:image/png;base64,${buf.toString('base64')}`;
}

const LOGO_DIR = join(ROOT, 'public/logos/tools');

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

/** Footer micro-label from article date, e.g. "MAY 2026 DESK". */
function fmtDeskMonth(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return 'NEWS DESK';
  const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  const [y, m] = iso.split('-');
  return `${months[Number(m) - 1]} ${y} DESK`;
}

/** Severity pill: orange-forward on dark; deeper orange text on light. */
function severityStyle(sev, theme) {
  const light = theme === 'light';
  switch ((sev || 'minor').toLowerCase()) {
    case 'breaking':
      return light
        ? { label: 'BREAKING', bg: 'rgba(249, 115, 22, 0.14)', fg: '#c2410c', border: 'rgba(249, 115, 22, 0.42)' }
        : { label: 'BREAKING', bg: 'rgba(249, 115, 22, 0.15)', fg: '#fb923c', border: 'rgba(249, 115, 22, 0.38)' };
    case 'major':
      return light
        ? { label: 'MAJOR', bg: 'rgba(249, 115, 22, 0.11)', fg: '#c2410c', border: 'rgba(249, 115, 22, 0.34)' }
        : { label: 'MAJOR', bg: 'rgba(249, 115, 22, 0.11)', fg: '#fdba74', border: 'rgba(249, 115, 22, 0.32)' };
    case 'minor':
    default:
      return light
        ? { label: 'MINOR', bg: 'rgba(120, 113, 108, 0.10)', fg: '#57534e', border: 'rgba(120, 113, 108, 0.22)' }
        : { label: 'MINOR', bg: 'rgba(168, 162, 158, 0.10)', fg: '#a8a29e', border: 'rgba(168, 162, 158, 0.24)' };
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

/** SVG fragment ids must be unique per document (each PNG render is separate). */
function hexPattern(theme) {
  const stroke = theme === 'light' ? 'rgba(234, 88, 12, 0.085)' : 'rgba(249, 115, 22, 0.055)';
  return `
    <pattern id="hexgrid-${theme}" x="0" y="0" width="84" height="96" patternUnits="userSpaceOnUse">
      <polygon points="42,3 80,25 80,71 42,93 4,71 4,25"
               fill="none" stroke="${stroke}" stroke-width="1"/>
    </pattern>`;
}

function svgForNews(news, theme, brandLogo) {
  const light = theme === 'light';
  const sev = severityStyle(news.severity, theme);
  const date = fmtDate(news.date);
  const deskLine = fmtDeskMonth(news.date);
  const titleLines = wrapLines(news.title, 24, 4).map(escapeXml);
  const categories = (news.categories || []).slice(0, 3).map((c) => c.replace(/^ai-/, '').replace(/-/g, ' ').toUpperCase());
  const affects = (news.affects || []).slice(0, 4);

  const bgBase = light ? '#fafaf9' : '#0c0a09';
  const bloomA0 = light ? 'rgba(249, 115, 22, 0.13)' : 'rgba(249, 115, 22, 0.15)';
  const bloomA1 = light ? 'rgba(249, 115, 22, 0.035)' : 'rgba(249, 115, 22, 0.045)';
  const bloomA2 = light ? 'rgba(250, 250, 249, 0)' : 'rgba(12, 10, 9, 0)';
  const bloomB0 = light ? 'rgba(251, 146, 60, 0.09)' : 'rgba(251, 146, 60, 0.11)';
  const bloomB1 = light ? 'rgba(251, 146, 60, 0.025)' : 'rgba(251, 146, 60, 0.035)';
  const bloomB2 = light ? 'rgba(250, 250, 249, 0)' : 'rgba(12, 10, 9, 0)';
  const panel0 = light ? 'rgba(255, 255, 255, 0.96)' : 'rgba(28, 25, 23, 0.94)';
  const panel1 = light ? 'rgba(250, 250, 249, 0.99)' : 'rgba(12, 10, 9, 0.90)';
  const panelStroke = light ? 'rgba(231, 229, 228, 0.95)' : 'rgba(255, 255, 255, 0.10)';
  const railStroke = light ? '#e7e5e4' : 'rgba(255, 255, 255, 0.08)';
  const eyebrow = light ? '#57534e' : 'rgba(231, 229, 228, 0.82)';
  const titleFill = light ? '#1c1917' : '#fafaf9';
  const railAccent = light ? '#c2410c' : '#fb923c';
  const pillBg = light ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.04)';
  const pillStroke = light ? 'rgba(234, 88, 12, 0.28)' : 'rgba(251, 146, 60, 0.22)';
  const pillText = light ? '#57534e' : '#a8a29e';
  const tileFill = light ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.055)';
  const tileStroke = light ? 'rgba(234, 88, 12, 0.30)' : 'rgba(249, 115, 22, 0.22)';
  const tileStroke2 = light ? 'rgba(251, 146, 60, 0.14)' : 'rgba(251, 146, 60, 0.10)';
  const placeholderStroke = railAccent;
  const wordmark = light ? '#292524' : '#fafaf9';
  const meta = light ? '#78716c' : '#78716c';
  const liveDot = light ? '#ea580c' : '#fb923c';
  const accent0 = light ? '#ea580c' : '#f97316';
  const accent1 = light ? '#f97316' : '#fb923c';
  const accent2 = light ? '#fbbf24' : '#fbbf24';

  const titleFontSize = titleLines.length <= 2 ? 62 : titleLines.length === 3 ? 54 : 47;
  const titleLineHeight = titleLines.length <= 2 ? 70 : titleLines.length === 3 ? 62 : 54;

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
                fill="${pillBg}" stroke="${pillStroke}" stroke-width="1"/>
          <text x="15" y="22" font-family="Metropolis, sans-serif"
                font-size="11" font-weight="500" letter-spacing="1.2" fill="${pillText}">${escapeXml(c)}</text>
        </g>`;
    })
    .join('');

  const toolTiles = affects
    .map((slug, i) => {
      const data = findToolLogo(slug);
      if (!data) return '';
      const y = 188 + i * 80;
      return `
        <g transform="translate(1016, ${y})">
          <rect x="0" y="0" width="70" height="70" rx="18" fill="${tileFill}" stroke="${tileStroke}" stroke-width="1"/>
          <rect x="1" y="1" width="68" height="68" rx="17" fill="none" stroke="${tileStroke2}" stroke-width="1"/>
          <image href="${data}" x="13" y="13" width="44" height="44" preserveAspectRatio="xMidYMid meet"/>
        </g>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    ${hexPattern(theme)}
    <radialGradient id="bloomA-${theme}" cx="84%" cy="16%" r="58%">
      <stop offset="0%" stop-color="${bloomA0}"/>
      <stop offset="58%" stop-color="${bloomA1}"/>
      <stop offset="100%" stop-color="${bloomA2}"/>
    </radialGradient>
    <radialGradient id="bloomB-${theme}" cx="16%" cy="86%" r="55%">
      <stop offset="0%" stop-color="${bloomB0}"/>
      <stop offset="64%" stop-color="${bloomB1}"/>
      <stop offset="100%" stop-color="${bloomB2}"/>
    </radialGradient>
    <linearGradient id="accent-${theme}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accent0}"/>
      <stop offset="52%" stop-color="${accent1}"/>
      <stop offset="100%" stop-color="${accent2}"/>
    </linearGradient>
    <linearGradient id="panel-${theme}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${panel0}"/>
      <stop offset="100%" stop-color="${panel1}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="${bgBase}"/>
  <rect width="1200" height="630" fill="url(#hexgrid-${theme})"/>
  <rect width="1200" height="630" fill="url(#bloomA-${theme})"/>
  <rect width="1200" height="630" fill="url(#bloomB-${theme})"/>

  <rect x="42" y="42" width="1116" height="546" rx="20" fill="url(#panel-${theme})" stroke="${panelStroke}" stroke-width="1"/>
  <rect x="42" y="42" width="1116" height="4" fill="url(#accent-${theme})"/>
  <line x1="934" y1="88" x2="934" y2="542" stroke="${railStroke}" stroke-width="1"/>

  <g transform="translate(76, 78)">
    <circle cx="8" cy="9" r="5" fill="${liveDot}"/>
    <text x="24" y="15" font-family="Metropolis, sans-serif"
          font-size="15" font-weight="500" letter-spacing="1.8" fill="${eyebrow}">AI TOOLS NEWS · ${escapeXml(date)}</text>
  </g>

  <g transform="translate(776, 66)">
    <rect x="0" y="0" width="112" height="40" rx="20"
          fill="${sev.bg}" stroke="${sev.border}" stroke-width="1"/>
    <text x="56" y="26" font-family="Metropolis, sans-serif"
          font-size="13" font-weight="800" letter-spacing="1.8"
          text-anchor="middle" fill="${sev.fg}">${sev.label}</text>
  </g>

  <line x1="76" y1="128" x2="888" y2="128" stroke="${railStroke}" stroke-width="1"/>

  <text x="76" y="${titleStartY}" font-family="Metropolis, sans-serif"
        font-size="${titleFontSize}" font-weight="800" fill="${titleFill}"
        style="letter-spacing:-0.01em;">
    ${titleTspans}
  </text>

  <line x1="76" y1="488" x2="888" y2="488" stroke="${railStroke}" stroke-width="1"/>
  ${categoryPills}

  <text x="976" y="126" font-family="Metropolis, sans-serif"
        font-size="11" font-weight="600" letter-spacing="2.2" fill="${railAccent}">AFFECTED TOOLS</text>
  ${toolTiles || `
    <g transform="translate(1016, 208)">
      <rect x="0" y="0" width="70" height="70" rx="18" fill="${light ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.04)'}" stroke="${tileStroke}" stroke-width="1"/>
      <path d="M22 36h26M35 23v26" stroke="${placeholderStroke}" stroke-width="3" stroke-linecap="round" opacity="0.75"/>
    </g>`}

  <line x1="976" y1="488" x2="1114" y2="488" stroke="${railStroke}" stroke-width="1"/>

  ${
    brandLogo
      ? `<image href="${brandLogo}" x="976" y="512" width="40" height="40" preserveAspectRatio="xMidYMid meet"/>`
      : ''
  }
  <text x="1026" y="538" font-family="Metropolis, sans-serif"
        font-size="19" font-weight="800" letter-spacing="0" fill="${wordmark}">aipedia.wiki</text>
  <text x="1027" y="558" font-family="Metropolis, sans-serif"
        font-size="9" font-weight="500" letter-spacing="1.5" fill="${meta}">${escapeXml(deskLine)}</text>
</svg>`;
}

const FONT_DIR = join(ROOT, 'public/fonts/metropolis');
const FONT_PATHS = [
  'metropolis-latin-400-normal.ttf',
  'metropolis-latin-500-normal.ttf',
  'metropolis-latin-700-normal.ttf',
  'metropolis-latin-800-normal.ttf',
].map((f) => join(FONT_DIR, f)).filter((p) => existsSync(p));

function rasterize(svg, background) {
  if (!Resvg) return null;
  const resvg = new Resvg(svg, {
    background,
    fitTo: { mode: 'width', value: 1200 },
    font: {
      fontFiles: FONT_PATHS,
      loadSystemFonts: false,
      defaultFontFamily: 'Metropolis',
    },
  });
  return resvg.render().asPng();
}

async function assertTextRendering() {
  if (!Resvg) return;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
    <rect width="400" height="200" fill="#0c0a09"/>
    <text x="32" y="122" font-family="Metropolis, sans-serif" font-size="72" font-weight="800" fill="#fafaf9">TEST</text>
  </svg>`;
  const png = rasterize(svg, '#0c0a09');
  if (!png) return;
  const { data, info } = await sharp(png).raw().toBuffer({ resolveWithObject: true });
  let brightPixels = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    if (data[i] > 180 && data[i + 1] > 180 && data[i + 2] > 180) brightPixels++;
  }
  if (brightPixels < 1000) {
    throw new Error(`[news-og] Metropolis text failed to rasterize. Check FONT_PATHS: ${FONT_PATHS.join(', ')}`);
  }
}

async function writeNewsAssets(news, slug, brandLogo) {
  const themes = [
    { key: 'dark', pngDir: OUT_DIR, thumbDir: THUMB_DIR, rasterBg: '#0c0a09' },
    { key: 'light', pngDir: OUT_LIGHT_DIR, thumbDir: THUMB_LIGHT_DIR, rasterBg: '#fafaf9' },
  ];
  let svgs = 0;
  let pngs = 0;
  let thumbs = 0;

  for (const t of themes) {
    mkdirSync(t.pngDir, { recursive: true });
    mkdirSync(t.thumbDir, { recursive: true });

    const svg = svgForNews(news, t.key, brandLogo).replace(/[ \t]+$/gm, '');
    if (WRITE_DEBUG_SVG || !Resvg) {
      writeFileSync(join(t.pngDir, `${slug}.svg`), svg, 'utf8');
      svgs++;
    }
    try {
      const png = rasterize(svg, t.rasterBg);
      if (png) {
        writeFileSync(join(t.pngDir, `${slug}.png`), png);
        pngs++;
        const thumb = await sharp(png)
          .resize({ width: 960, withoutEnlargement: true })
          .webp({ quality: 82, effort: 6 })
          .toBuffer();
        writeFileSync(join(t.thumbDir, `${slug}.webp`), thumb);
        thumbs++;
      }
    } catch (err) {
      console.warn(`[news-og] PNG raster failed for ${slug} (${t.key}):`, err.message);
    }
  }

  return { svgs, pngs, thumbs };
}

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  if (!existsSync(THUMB_DIR)) mkdirSync(THUMB_DIR, { recursive: true });
  await assertTextRendering();

  const brandLogo = await prepareBrandLogoForOg();
  if (!brandLogo && !WRITE_DEBUG_SVG) {
    console.warn('[news-og] No brand PNG found under public/brand/ — OG cards omit the lockup glyph.');
  }

  const requested = new Set(process.argv.slice(2).map((arg) => arg.replace(/\.md$/, '')));
  const files = readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith('.md'))
    .filter((f) => requested.size === 0 || requested.has(f.replace(/\.md$/, '')));

  let totalSvgs = 0;
  let totalPngs = 0;
  let totalThumbs = 0;

  for (const file of files) {
    const src = readFileSync(join(NEWS_DIR, file), 'utf8');
    const news = parseFrontmatter(src);
    if (!news.slug && !news.title) continue;
    const slug = news.slug || file.replace(/\.md$/, '');

    const { svgs, pngs, thumbs } = await writeNewsAssets(news, slug, brandLogo);
    totalSvgs += svgs;
    totalPngs += pngs;
    totalThumbs += thumbs;
  }

  const svgSummary = totalSvgs > 0 ? ` and ${totalSvgs} debug SVGs` : '';
  console.log(`[news-og] generated ${totalPngs} PNG pairs, ${totalThumbs} WebP thumbnail pairs${svgSummary} under public/og/news/ (+ light/)`);
}

await main();
