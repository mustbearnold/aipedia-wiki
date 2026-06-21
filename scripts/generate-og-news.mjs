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
import { dirname, join, relative, resolve } from 'node:path';
import sharp from 'sharp';
import {
  buildManifest,
  hashExistingSourceFiles,
  listRelativeFiles,
  manifestMatches,
  manifestOutputsForReport,
  readManifest,
  sha256File,
  stableHash,
  writeManifest,
} from './lib/generated-asset-manifest.mjs';

const args = process.argv.slice(2);
const JSON_MODE = args.includes('--json');
const DRY_RUN = args.includes('--dry-run');
const CHECK_MODE = args.includes('--check');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const KNOWN_FLAGS = new Set(['--dry-run', '--check', '--json', '--project-dir', '--root', '--limit', '--help', '-h']);
const VALUE_FLAGS = new Set(['--project-dir', '--root', '--limit']);
const argumentIssues = collectArgumentIssues();
const requestedSlugs = collectRequestedSlugs();

let Resvg = null;
let resvgLoadIssue = null;
try {
  ({ Resvg } = await import('@resvg/resvg-js'));
} catch (err) {
  resvgLoadIssue = { code: 'resvg-unavailable', detail: err.message };
  if (!JSON_MODE) console.warn('resvg unavailable, will emit SVG-only:', err.message);
}

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const defaultProjectDir = dirname(dirname(SCRIPT_PATH));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const ROOT = resolve(projectDirArg || defaultProjectDir);
const limitArg = valueFor('--limit');
const LIMIT = limitArg ? Number.parseInt(limitArg, 10) : Infinity;
const NEWS_DIR = join(ROOT, 'src/content/news');
const OUT_DIR = join(ROOT, 'public/og/news');
const OUT_LIGHT_DIR = join(OUT_DIR, 'light');
const THUMB_DIR = join(OUT_DIR, 'thumbs');
const THUMB_LIGHT_DIR = join(THUMB_DIR, 'light');
const MANIFEST_FILE = join(ROOT, 'src/data/generated-assets/og-news-manifest.json');
const MANIFEST_KIND = 'news-og';
const WRITE_DEBUG_SVG = process.env.AIPEDIA_WRITE_OG_SVG === '1';
const MAX_PNG_OPTIMIZATION_PASSES = 12;
const RASTER_VISUAL_AVERAGE_DELTA_LIMIT = 4;
const RASTER_VISUAL_CHANGED_PIXEL_RATIO_LIMIT = 0.15;
const RASTER_VISUAL_CHANNEL_DELTA_NOISE_FLOOR = 8;

function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index >= 0) {
    const next = args[index + 1] ?? '';
    return next && !next.startsWith('-') ? next : '';
  }
  const inlineArg = args.find((arg) => arg.startsWith(`${flag}=`));
  return inlineArg ? inlineArg.slice(flag.length + 1) : '';
}

function collectRequestedSlugs() {
  const slugs = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const flag = arg.startsWith('--') ? arg.split('=')[0] : arg;
    if (VALUE_FLAGS.has(flag) && !arg.includes('=')) {
      index += 1;
      continue;
    }
    if (!arg.startsWith('-')) slugs.push(arg.replace(/\.md$/, ''));
  }
  return slugs;
}

function collectArgumentIssues() {
  const issues = [];
  const foundValueFlags = new Set();

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const equalsIndex = arg.startsWith('--') ? arg.indexOf('=') : -1;
    const flag = equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;

    if (!arg.startsWith('-')) {
      const slug = arg.replace(/\.md$/, '');
      if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
        issues.push({ code: 'argument-invalid', detail: `invalid news slug ${arg}` });
      }
      continue;
    }

    if (!KNOWN_FLAGS.has(flag)) {
      issues.push({ code: 'argument-invalid', detail: `unknown flag ${flag}` });
      continue;
    }

    if (VALUE_FLAGS.has(flag)) {
      foundValueFlags.add(flag);

      if (equalsIndex >= 0) {
        if (!arg.slice(equalsIndex + 1)) issues.push({ code: 'argument-invalid', detail: `${flag} requires a value` });
        continue;
      }

      const next = args[index + 1];
      if (!next || next.startsWith('-')) {
        issues.push({ code: 'argument-invalid', detail: `${flag} requires a value` });
      } else {
        index += 1;
      }
      continue;
    }

    if (equalsIndex >= 0) issues.push({ code: 'argument-invalid', detail: `${flag} does not accept a value` });
  }

  if (foundValueFlags.has('--project-dir') && foundValueFlags.has('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }
  if (DRY_RUN && CHECK_MODE) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --dry-run or --check' });
  }
  if (foundValueFlags.has('--limit') && !/^[1-9][0-9]*$/.test(valueFor('--limit'))) {
    issues.push({ code: 'argument-invalid', detail: '--limit must be a positive integer' });
  }

  return issues;
}

function usage() {
  return [
    'Usage: node scripts/generate-og-news.mjs [options] [news-slug ...]',
    '',
    'Options:',
    '  --dry-run             Generate news OG buffers and report changes without writing files.',
    '  --check               Verify generated news OG outputs match current files without writing.',
    '  --json                Emit a structured news OG generation report.',
    '  --project-dir <dir>   Generate or inspect another project root.',
    '  --root <dir>          Alias for --project-dir.',
    '  --limit <count>       Stop after checking this many news records.',
    '  --help, -h            Print this help message.',
  ].join('\n');
}

function modeName() {
  if (CHECK_MODE) return 'check';
  if (DRY_RUN) return 'dry-run';
  return 'generate';
}

function relativeFile(path) {
  return relative(ROOT, path).replace(/\\/g, '/');
}

const BRAND_LOGO_CANDIDATES = [
  join(ROOT, 'public/brand/aipedia-logo-lantern-128.png'),
  join(ROOT, 'public/brand/aipedia-logo-lantern-512.png'),
  join(ROOT, 'public/brand/aipedia-logo-lantern-64.png'),
  join(ROOT, 'public/brand/aipedia-logo-crystal-128.png'),
  join(ROOT, 'public/brand/aipedia-logo-128.png'),
  join(ROOT, 'public/brand/aipedia-logo.png'),
];

function pickBrandLogoPath() {
  for (const p of BRAND_LOGO_CANDIDATES) {
    if (existsSync(p)) return p;
  }
  return null;
}

/**
 * Raster match for the header lockup.
 * Returns a PNG data URL for embedding in OG SVG before resvg renders.
 */
async function prepareBrandLogoForOg() {
  const path = pickBrandLogoPath();
  if (!path) return null;
  const buf = await sharp(path).ensureAlpha()
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

async function optimizePipelinePng(buffer) {
  let best = buffer;
  for (let pass = 0; pass < MAX_PNG_OPTIMIZATION_PASSES; pass += 1) {
    const optimized = await sharp(best)
      .png({
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: true,
        quality: 92,
        effort: 10,
      })
      .toBuffer();

    if (optimized.length >= best.length) return best;
    best = optimized;
  }
  return best;
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

async function desiredNewsAssets(news, slug, brandLogo, issues) {
  const themes = [
    { key: 'dark', pngDir: OUT_DIR, thumbDir: THUMB_DIR, rasterBg: '#0c0a09' },
    { key: 'light', pngDir: OUT_LIGHT_DIR, thumbDir: THUMB_LIGHT_DIR, rasterBg: '#fafaf9' },
  ];
  const outputs = [];

  for (const t of themes) {
    const svg = svgForNews(news, t.key, brandLogo).replace(/[ \t]+$/gm, '');
    if (WRITE_DEBUG_SVG || !Resvg) {
      outputs.push({
        kind: 'news-svg',
        theme: t.key,
        slug,
        path: join(t.pngDir, `${slug}.svg`),
        buffer: Buffer.from(svg, 'utf8'),
      });
    }
    try {
      const png = rasterize(svg, t.rasterBg);
      if (png) {
        const finalPng = await optimizePipelinePng(png);
        outputs.push({
          kind: 'news-png',
          theme: t.key,
          slug,
          path: join(t.pngDir, `${slug}.png`),
          buffer: finalPng,
        });
        const thumb = await sharp(png)
          .resize({ width: 960, withoutEnlargement: true })
          .webp({ quality: 82, effort: 6 })
          .toBuffer();
        outputs.push({
          kind: 'news-thumb',
          theme: t.key,
          slug,
          path: join(t.thumbDir, `${slug}.webp`),
          buffer: thumb,
        });
      }
    } catch (err) {
      issues.push({ code: 'raster-failed', slug, theme: t.key, detail: `PNG raster failed for ${slug} (${t.key}): ${err.message}` });
    }
  }

  return outputs;
}

function isRasterOutput(output) {
  return output.kind === 'news-png' || output.kind === 'news-thumb';
}

async function rasterPixels(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return {
    data,
    width: info.width,
    height: info.height,
    channels: info.channels,
  };
}

async function compareRenderedRaster(existing, desired) {
  const [left, right] = await Promise.all([rasterPixels(existing), rasterPixels(desired)]);
  if (left.width !== right.width || left.height !== right.height || left.channels !== right.channels) {
    return {
      matches: false,
      average_delta: null,
      changed_pixel_ratio: null,
      max_delta: null,
    };
  }

  let totalDelta = 0;
  let maxDelta = 0;
  let changedPixels = 0;
  const pixelCount = left.width * left.height;

  for (let index = 0; index < left.data.length; index += left.channels) {
    let pixelMaxDelta = 0;
    for (let channel = 0; channel < 3; channel += 1) {
      const delta = Math.abs(left.data[index + channel] - right.data[index + channel]);
      totalDelta += delta;
      if (delta > maxDelta) maxDelta = delta;
      if (delta > pixelMaxDelta) pixelMaxDelta = delta;
    }
    if (pixelMaxDelta > RASTER_VISUAL_CHANNEL_DELTA_NOISE_FLOOR) changedPixels += 1;
  }

  const averageDelta = totalDelta / (pixelCount * 3);
  const changedPixelRatio = changedPixels / pixelCount;

  return {
    matches:
      averageDelta <= RASTER_VISUAL_AVERAGE_DELTA_LIMIT &&
      changedPixelRatio <= RASTER_VISUAL_CHANGED_PIXEL_RATIO_LIMIT,
    average_delta: Number(averageDelta.toFixed(4)),
    changed_pixel_ratio: Number(changedPixelRatio.toFixed(4)),
    max_delta: maxDelta,
  };
}

async function outputComparison(output, existing) {
  if (!isRasterOutput(output)) {
    return { changed: Buffer.compare(existing, output.buffer) !== 0, comparison: { kind: 'bytes' } };
  }

  try {
    const comparison = await compareRenderedRaster(existing, output.buffer);
    return { changed: !comparison.matches, comparison: { kind: 'raster-visual', ...comparison } };
  } catch {
    return { changed: true, comparison: { kind: 'raster-visual', matches: false } };
  }
}

async function inspectOutput(output, mode, issues) {
  let existingBytes = null;
  let changed = true;
  let written = false;
  let comparison = null;

  if (existsSync(output.path)) {
    try {
      const existing = readFileSync(output.path);
      existingBytes = existing.length;
      const result = await outputComparison(output, existing);
      changed = result.changed;
      comparison = result.comparison;
    } catch (err) {
      issues.push({ code: 'read-failed', path: output.path, detail: `could not read ${output.path}: ${err.message}` });
    }
  }

  if (mode === 'generate' && changed) {
    try {
      mkdirSync(dirname(output.path), { recursive: true });
      writeFileSync(output.path, output.buffer);
      written = true;
    } catch (err) {
      issues.push({ code: 'write-failed', path: output.path, detail: `could not write ${output.path}: ${err.message}` });
    }
  }

  return {
    kind: output.kind,
    theme: output.theme,
    slug: output.slug,
    path: output.path,
    file: relativeFile(output.path),
    bytes: output.buffer.length,
    existing_bytes: existingBytes,
    changed,
    written,
    comparison,
  };
}

function reportFor({ mode = modeName(), records = 0, outputs = [], issues = [], missing_news_dir = false } = {}) {
  const changed = outputs.filter((output) => output.changed).length;
  const written = outputs.filter((output) => output.written).length;
  const warningCodes = new Set(['resvg-unavailable', 'brand-missing', 'raster-failed']);
  const errorIssues = issues.filter((issue) => !warningCodes.has(issue.code));
  return {
    ok: mode !== 'argument-error' && errorIssues.length === 0 && !(mode === 'check' && changed > 0),
    mode,
    project_dir: ROOT,
    news_dir: NEWS_DIR,
    output_dir: OUT_DIR,
    manifest: {
      file: relativeFile(MANIFEST_FILE),
      hit: outputs.some((output) => output.comparison?.kind === 'manifest-hash'),
    },
    write_debug_svg: WRITE_DEBUG_SVG,
    resvg_available: Boolean(Resvg),
    limit: Number.isFinite(LIMIT) ? LIMIT : null,
    requested_slugs: requestedSlugs,
    records,
    generated: outputs.length,
    changed,
    written,
    missing_news_dir,
    outputs,
    issues,
    argument_issues: mode === 'argument-error' ? argumentIssues : [],
  };
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  if (report.mode === 'argument-error') {
    console.error('[news-og] invalid arguments:');
    for (const issue of report.argument_issues) console.error(`- ${issue.detail}`);
    return;
  }

  for (const issue of report.issues) {
    const level = ['resvg-unavailable', 'brand-missing', 'raster-failed'].includes(issue.code) ? 'warn' : 'error';
    console[level](`[news-og] ${issue.detail}`);
  }

  if (report.manifest.hit) {
    console.log(`[news-og] manifest current; skipped rasterizing ${report.records} news item(s).`);
  }

  if (report.mode === 'check') {
    if (report.ok) {
      console.log(`[news-og] check passed. ${report.generated} output(s) match for ${report.records} news item(s).`);
    } else {
      console.error(`[news-og] check failed. ${report.changed} output(s) are missing or stale.`);
    }
    return;
  }

  if (report.mode === 'dry-run') {
    console.log(`[news-og] dry run. ${report.generated} output(s) checked for ${report.records} news item(s); ${report.changed} would change.`);
    return;
  }

  const totalPngs = report.outputs.filter((output) => output.kind === 'news-png').length;
  const totalThumbs = report.outputs.filter((output) => output.kind === 'news-thumb').length;
  const totalSvgs = report.outputs.filter((output) => output.kind === 'news-svg').length;
  const svgSummary = totalSvgs > 0 ? ` and ${totalSvgs} debug SVGs` : '';
  console.log(`[news-og] generated ${totalPngs} PNG files, ${totalThumbs} WebP thumbnail files${svgSummary} under public/og/news/ (+ light/) (${report.written} written)`);
}

function readNewsFiles(issues) {
  if (!existsSync(NEWS_DIR)) {
    issues.push({ code: 'news-dir-missing', detail: `news directory missing at ${NEWS_DIR}` });
    return null;
  }

  const requested = new Set(requestedSlugs);
  const allFiles = readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith('.md'))
    .filter((f) => requested.size === 0 || requested.has(f.replace(/\.md$/, '')))
    .sort((a, b) => a.localeCompare(b));

  if (requested.size > 0) {
    const found = new Set(allFiles.map((file) => file.replace(/\.md$/, '')));
    for (const slug of requested) {
      if (!found.has(slug)) {
        issues.push({ code: 'requested-news-missing', slug, detail: `requested news slug not found: ${slug}` });
      }
    }
  }

  return allFiles.slice(0, LIMIT);
}

function readNewsRecords(files) {
  return files
    .map((file) => {
      const src = readFileSync(join(NEWS_DIR, file), 'utf8');
      const news = parseFrontmatter(src);
      return {
        file,
        news,
        slug: news.slug || file.replace(/\.md$/, ''),
      };
    })
    .filter((record) => record.news.slug || record.news.title);
}

function expectedOutputFiles(records) {
  const outputs = [];
  for (const record of records) {
    for (const theme of [
      { key: 'dark', pngDir: OUT_DIR, thumbDir: THUMB_DIR },
      { key: 'light', pngDir: OUT_LIGHT_DIR, thumbDir: THUMB_LIGHT_DIR },
    ]) {
      if (WRITE_DEBUG_SVG || !Resvg) outputs.push(relativeFile(join(theme.pngDir, `${record.slug}.svg`)));
      if (Resvg) {
        outputs.push(relativeFile(join(theme.pngDir, `${record.slug}.png`)));
        outputs.push(relativeFile(join(theme.thumbDir, `${record.slug}.webp`)));
      }
    }
  }
  return outputs.sort((left, right) => left.localeCompare(right));
}

function sourceHashFor(records) {
  const sourceFiles = [
    relativeFile(SCRIPT_PATH),
    'package.json',
    'package-lock.json',
    ...records.map((record) => relativeFile(join(NEWS_DIR, record.file))),
    ...BRAND_LOGO_CANDIDATES.map((candidate) => relativeFile(candidate)),
    ...FONT_PATHS.map((font) => relativeFile(font)),
    ...listRelativeFiles(ROOT, 'public/logos/tools', (_full, name) => /\.(ico|jpe?g|png|svg|webp)$/i.test(name)),
  ];

  return stableHash({
    manifest_kind: MANIFEST_KIND,
    requested_slugs: requestedSlugs,
    limit: Number.isFinite(LIMIT) ? LIMIT : null,
    resvg_available: Boolean(Resvg),
    write_debug_svg: WRITE_DEBUG_SVG,
    source_files: hashExistingSourceFiles(ROOT, [...new Set(sourceFiles)]),
  });
}

function manifestInputsFor(records) {
  const expectedFiles = expectedOutputFiles(records);
  return {
    expectedFiles,
    sourceHash: sourceHashFor(records),
  };
}

function manifestOutputsFrom(outputs) {
  return outputs
    .filter((output) => existsSync(output.path))
    .map((output) => ({
      file: output.file,
      kind: output.kind,
      slug: output.slug,
      theme: output.theme,
      bytes: readFileSync(output.path).length,
      sha256: sha256File(output.path),
    }));
}

async function main() {
  if (HELP_MODE) {
    console.log(usage());
    return 0;
  }

  if (argumentIssues.length > 0) {
    emitReport(reportFor({ mode: 'argument-error' }));
    return 1;
  }

  const mode = modeName();
  const issues = [];
  if (resvgLoadIssue) issues.push(resvgLoadIssue);

  try {
    await assertTextRendering();
  } catch (err) {
    issues.push({ code: 'text-rendering-failed', detail: err.message });
    const report = reportFor({ mode, issues });
    emitReport(report);
    return 1;
  }

  const brandLogo = await prepareBrandLogoForOg();
  if (!brandLogo && !WRITE_DEBUG_SVG) {
    issues.push({ code: 'brand-missing', detail: 'No brand PNG found under public/brand/ — OG cards omit the lockup glyph.' });
  }

  const files = readNewsFiles(issues);
  if (!files) {
    const report = reportFor({ mode, issues, missing_news_dir: true });
    emitReport(report);
    return 1;
  }
  if (issues.some((issue) => issue.code === 'requested-news-missing')) {
    const report = reportFor({ mode, issues });
    emitReport(report);
    return 1;
  }

  const records = readNewsRecords(files);
  const { expectedFiles, sourceHash } = manifestInputsFor(records);
  const manifest = readManifest(MANIFEST_FILE);
  if ((mode === 'generate' || mode === 'check') && manifestMatches({
    manifest,
    kind: MANIFEST_KIND,
    sourceHash,
    expectedFiles,
    root: ROOT,
  })) {
    const outputs = manifestOutputsForReport(manifest, ROOT);
    const report = reportFor({ mode, records: records.length, outputs, issues });
    emitReport(report);
    return report.ok ? 0 : 1;
  }

  const desired = [];
  for (const record of records) {
    desired.push(...await desiredNewsAssets(record.news, record.slug, brandLogo, issues));
  }

  const outputs = [];
  for (const output of desired) {
    outputs.push(await inspectOutput(output, mode, issues));
  }

  if (mode === 'check' && outputs.some((output) => output.changed)) {
    issues.push({ code: 'news-og-stale', detail: 'one or more generated news OG outputs are missing or stale' });
  }

  const report = reportFor({ mode, records: records.length, outputs, issues });
  if (mode === 'generate' && report.ok) {
    writeManifest(MANIFEST_FILE, buildManifest({
      kind: MANIFEST_KIND,
      sourceHash,
      outputs: manifestOutputsFrom(outputs),
      meta: {
        records: records.length,
        requested_slugs: requestedSlugs,
        limit: Number.isFinite(LIMIT) ? LIMIT : null,
      },
    }));
  }
  emitReport(report);
  return report.ok ? 0 : 1;
}

main().then((code) => {
  process.exitCode = code;
}).catch((err) => {
  const mode = argumentIssues.length > 0 ? 'argument-error' : modeName();
  emitReport(reportFor({
    mode,
    issues: [{ code: 'unexpected-error', detail: err.message }],
  }));
  process.exitCode = 1;
});
