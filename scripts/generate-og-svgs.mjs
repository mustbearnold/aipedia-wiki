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
import { dirname, join, relative, resolve } from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
const JSON_MODE = args.includes('--json');
const DRY_RUN = args.includes('--dry-run');
const CHECK_MODE = args.includes('--check');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const KNOWN_FLAGS = new Set(['--dry-run', '--check', '--json', '--project-dir', '--root', '--limit', '--help', '-h']);
const VALUE_FLAGS = new Set(['--project-dir', '--root', '--limit']);
const argumentIssues = collectArgumentIssues();

// Lazy-load resvg so build machines that can't install native modules
// still produce SVG output, they just skip the PNG rasterization step.
// Committed PNGs in public/og/tools/ stay authoritative in that case.
let Resvg = null;
let resvgLoadIssue = null;
try {
  ({ Resvg } = await import('@resvg/resvg-js'));
} catch (err) {
  resvgLoadIssue = { code: 'resvg-unavailable', detail: err.message };
  if (!JSON_MODE) console.warn('resvg unavailable, will emit SVG-only:', err.message);
}

const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const ROOT = resolve(projectDirArg || defaultProjectDir);
const limitArg = valueFor('--limit');
const LIMIT = limitArg ? Number.parseInt(limitArg, 10) : Infinity;
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
const MAX_PNG_OPTIMIZATION_PASSES = 12;

function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index >= 0) {
    const next = args[index + 1] ?? '';
    return next && !next.startsWith('-') ? next : '';
  }
  const inlineArg = args.find((arg) => arg.startsWith(`${flag}=`));
  return inlineArg ? inlineArg.slice(flag.length + 1) : '';
}

function collectArgumentIssues() {
  const issues = [];
  const foundValueFlags = new Set();

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const equalsIndex = arg.startsWith('--') ? arg.indexOf('=') : -1;
    const flag = equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;

    if (!arg.startsWith('-')) {
      issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
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
    'Usage: node scripts/generate-og-svgs.mjs [options]',
    '',
    'Options:',
    '  --dry-run             Generate OG card buffers and report changes without writing files.',
    '  --check               Verify generated OG card outputs match current files without writing.',
    '  --json                Emit a structured OG generation report.',
    '  --project-dir <dir>   Generate or inspect another project root.',
    '  --root <dir>          Alias for --project-dir.',
    '  --limit <count>       Stop after checking this many tool records.',
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
    overall >= 9 ? '#34d399' : overall >= 8 ? '#fb923c' : overall >= 6 ? '#fbbf24' : '#f87171';
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
      <stop offset="0%" stop-color="#0c0a09"/>
      <stop offset="100%" stop-color="#1c1917"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f97316"/>
      <stop offset="52%" stop-color="#fb923c"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="6" fill="url(#accent)"/>
  ${
    brandLogoSmall
      ? `<image href="${brandLogoSmall}" x="60" y="60" width="56" height="56" preserveAspectRatio="xMidYMid meet"/>`
      : ''
  }
  <text x="${brandLogoSmall ? 132 : 80}" y="100" font-family="Metropolis, sans-serif" font-size="26" font-weight="700" fill="#fb923c" letter-spacing="1">aipedia.wiki</text>
  <text x="${brandLogoSmall ? 132 : 80}" y="124" font-family="Metropolis, sans-serif" font-size="16" font-weight="500" fill="#9ca3af">${category}</text>
  ${logoBlock}
  <text x="${titleX}" y="270" font-family="Metropolis, sans-serif" font-size="76" font-weight="800" fill="#fafafa">${title}</text>
  <text x="${titleX}" y="310" font-family="Metropolis, sans-serif" font-size="20" font-weight="500" fill="#9ca3af">${company}</text>
  <text x="80" y="400" font-family="Metropolis, sans-serif" font-size="26" font-weight="500" fill="#d1d5db">${taglineTspans}</text>
  <g transform="translate(960, 80)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="rgba(249,115,22,0.10)" stroke="rgba(249,115,22,0.35)" stroke-width="2"/>
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
// (dev Windows + Linux CI/build environments). resvg does not reliably rasterize
// text from WOFF/WOFF2 files when system fonts are disabled, so these are
// checked-in Metropolis TTF copies derived from the site's webfont source files.
const FONT_DIR = join(ROOT, 'public/fonts/metropolis');
const FONT_PATHS = [
  'metropolis-latin-400-normal.ttf',
  'metropolis-latin-500-normal.ttf',
  'metropolis-latin-700-normal.ttf',
  'metropolis-latin-800-normal.ttf',
].map((f) => join(FONT_DIR, f)).filter((p) => existsSync(p));

function rasterize(svgString) {
  if (!Resvg) return null;
  const resvg = new Resvg(svgString, {
    background: '#0c0a09',
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
    <rect width="400" height="200" fill="#05060d"/>
    <text x="32" y="122" font-family="Metropolis, sans-serif" font-size="72" font-weight="800" fill="#f8fafc">TEST</text>
  </svg>`;
  const png = rasterize(svg);
  if (!png) return;
  const { data, info } = await sharp(png).raw().toBuffer({ resolveWithObject: true });
  let brightPixels = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    if (data[i] > 180 && data[i + 1] > 180 && data[i + 2] > 180) brightPixels++;
  }
  if (brightPixels < 1000) {
    throw new Error(`[tool-og] Metropolis text failed to rasterize. Check FONT_PATHS: ${FONT_PATHS.join(', ')}`);
  }
}

function reportFor({ mode = modeName(), tools = 0, outputs = [], issues = [], missing_registry = false } = {}) {
  const changed = outputs.filter((output) => output.changed).length;
  const written = outputs.filter((output) => output.written).length;
  const warningCodes = new Set(['resvg-unavailable', 'raster-failed', 'default-raster-failed']);
  const errorIssues = issues.filter((issue) => !warningCodes.has(issue.code));
  return {
    ok: mode !== 'argument-error' && errorIssues.length === 0 && !(mode === 'check' && changed > 0),
    mode,
    project_dir: ROOT,
    registry: REGISTRY,
    output_dir: OUT_DIR,
    default_svg: DEFAULT_SVG,
    default_png: DEFAULT_PNG,
    write_debug_svg: WRITE_DEBUG_SVG,
    resvg_available: Boolean(Resvg),
    limit: Number.isFinite(LIMIT) ? LIMIT : null,
    tools,
    generated: outputs.length,
    changed,
    written,
    missing_registry,
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
    console.error('[generate-og-svgs] invalid arguments:');
    for (const issue of report.argument_issues) console.error(`- ${issue.detail}`);
    return;
  }

  for (const issue of report.issues) {
    const level = issue.code === 'resvg-unavailable' || issue.code === 'raster-failed' ? 'warn' : 'error';
    console[level](`[generate-og-svgs] ${issue.detail}`);
  }

  if (report.missing_registry) {
    console.error('tools-registry.json not found, skipping OG generation');
    return;
  }

  if (report.mode === 'check') {
    if (report.ok) {
      console.log(`[generate-og-svgs] check passed. ${report.generated} output(s) match for ${report.tools} tool(s).`);
    } else {
      console.error(`[generate-og-svgs] check failed. ${report.changed} output(s) are missing or stale.`);
    }
    return;
  }

  if (report.mode === 'dry-run') {
    console.log(`[generate-og-svgs] dry run. ${report.generated} output(s) checked for ${report.tools} tool(s); ${report.changed} would change.`);
    return;
  }

  const pngs = report.outputs.filter((output) => output.kind === 'tool-png').length;
  const svgs = report.outputs.filter((output) => output.kind === 'tool-svg').length;
  const svgSummary = svgs > 0 ? ` + ${svgs} debug SVGs` : '';
  console.log(`Generated ${pngs} OG PNGs${svgSummary} in public/og/tools/ (${report.written} written).`);
  if (report.outputs.some((output) => output.kind === 'default-png' && output.written)) {
    console.log('Rasterized public/og-default.svg -> og-default.png');
  }
}

function readTools() {
  const data = JSON.parse(readFileSync(REGISTRY, 'utf8'));
  return Object.values(data.tools ?? {})
    .filter((t) => t.slug && t.status !== 'dead' && t.status !== 'acquired')
    .slice(0, LIMIT);
}

async function desiredOutputsFor(tools, issues) {
  const outputs = [];
  for (const tool of tools) {
    const svg = svgFor(tool);
    if (WRITE_DEBUG_SVG || !Resvg) {
      outputs.push({
        kind: 'tool-svg',
        slug: tool.slug,
        path: join(OUT_DIR, `${tool.slug}.svg`),
        buffer: Buffer.from(svg, 'utf8'),
      });
    }
    try {
      const png = rasterize(svg);
      if (png) {
        outputs.push({
          kind: 'tool-png',
          slug: tool.slug,
          path: join(OUT_DIR, `${tool.slug}.png`),
          buffer: await optimizePipelinePng(png),
        });
      }
    } catch (err) {
      issues.push({ code: 'raster-failed', slug: tool.slug, detail: `PNG raster failed for ${tool.slug}: ${err.message}` });
    }
  }

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
        outputs.push({
          kind: 'default-png',
          slug: null,
          path: DEFAULT_PNG,
          buffer: png,
        });
      }
    } catch (err) {
      issues.push({ code: 'default-raster-failed', detail: `Default OG PNG raster failed: ${err.message}` });
    }
  }

  return outputs;
}

function inspectOutput(output, mode, issues) {
  let existingBytes = null;
  let changed = true;
  let written = false;

  if (existsSync(output.path)) {
    try {
      const existing = readFileSync(output.path);
      existingBytes = existing.length;
      changed = Buffer.compare(existing, output.buffer) !== 0;
    } catch (err) {
      issues.push({ code: 'read-failed', path: output.path, detail: `could not read ${output.path}: ${err.message}` });
    }
  }

  if (mode === 'generate' && changed) {
    try {
      writeFileSync(output.path, output.buffer);
      written = true;
    } catch (err) {
      issues.push({ code: 'write-failed', path: output.path, detail: `could not write ${output.path}: ${err.message}` });
    }
  }

  return {
    kind: output.kind,
    slug: output.slug,
    path: output.path,
    file: relativeFile(output.path),
    bytes: output.buffer.length,
    existing_bytes: existingBytes,
    changed,
    written,
  };
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

  if (!existsSync(REGISTRY)) {
    const report = reportFor({ mode, issues, missing_registry: true });
    emitReport(report);
    return mode === 'check' ? 1 : 0;
  }

  if (mode === 'generate' && !existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  try {
    await assertTextRendering();
  } catch (err) {
    issues.push({ code: 'text-rendering-failed', detail: err.message });
    const report = reportFor({ mode, issues });
    emitReport(report);
    return 1;
  }

  let tools = [];
  try {
    tools = readTools();
  } catch (err) {
    issues.push({ code: 'registry-read-failed', detail: `could not read tools registry: ${err.message}` });
    const report = reportFor({ mode, issues });
    emitReport(report);
    return 1;
  }

  const desired = await desiredOutputsFor(tools, issues);
  const outputs = desired.map((output) => inspectOutput(output, mode, issues));

  if (mode === 'check' && outputs.some((output) => output.changed)) {
    issues.push({ code: 'og-stale', detail: 'one or more generated OG outputs are missing or stale' });
  }

  const report = reportFor({ mode, tools: tools.length, outputs, issues });
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
