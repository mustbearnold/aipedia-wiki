#!/usr/bin/env node
/**
 * One-off brand-asset prep. Regenerates favicon + apple-touch-icon
 * + schema-org logo variants from public/brand/aipedia-logo.png.
 *
 * Run after updating the brand logo source:
 *   node scripts/prep-favicons.mjs
 *
 * Output files get checked in; this script doesn't need to run on
 * every build. generate-og-svgs.mjs handles per-build OG rasters
 * separately and uses the same source PNG.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const SRC = join(ROOT, 'public/brand/aipedia-logo.png');

const targets = [
  { size: 16, out: 'public/favicon-16.png' },
  { size: 32, out: 'public/favicon-32.png' },
  { size: 180, out: 'public/apple-touch-icon.png' },
  { size: 192, out: 'public/favicon-192.png' },
  { size: 512, out: 'public/favicon-512.png' },
  { size: 24, out: 'public/brand/aipedia-logo-24.png' },
  { size: 48, out: 'public/brand/aipedia-logo-48.png' },
  { size: 128, out: 'public/brand/aipedia-logo-128.png' },
  { size: 512, out: 'public/brand/aipedia-logo-512.png' },
];

// Trim transparent padding first so small sizes use the gem's full
// pixel budget instead of wasting pixels on a transparent border.
const trimmed = await sharp(SRC).trim().toBuffer();

for (const { size, out } of targets) {
  await sharp(trimmed)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(join(ROOT, out));
  console.log(`wrote ${out} (${size}x${size})`);
}
