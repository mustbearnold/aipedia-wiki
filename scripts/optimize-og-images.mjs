#!/usr/bin/env node
/**
 * Recompress generated OG PNGs (public/og/tools/*.png and
 * public/og/news/*.png) with sharp for 40-60% size reduction with no
 * visible quality loss. Astro's default resvg-js rasterization is
 * correct but leaves a lot of compression on the table.
 *
 * Run: node scripts/optimize-og-images.mjs
 *
 * Idempotent: re-runs on already-compressed PNGs are cheap (savings
 * asymptote to zero). Run after scripts/generate-og-svgs.mjs and
 * scripts/generate-og-news.mjs on each build.
 */
import sharp from 'sharp';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const TARGETS = [
  'public/og/tools',
  'public/og/news',
  'public/og/news/light',
];

async function compressFile(path) {
  const before = statSync(path).size;
  const input = readFileSync(path);
  const output = await sharp(input)
    .png({
      compressionLevel: 9,   // max zlib compression
      adaptiveFiltering: true,
      palette: true,         // try palette-based PNG8 where quality allows
      quality: 92,           // palette quantisation threshold
      effort: 10,            // max effort
    })
    .toBuffer();
  if (output.length >= before) return { before, after: before, saved: 0 };
  writeFileSync(path, output);
  return { before, after: output.length, saved: before - output.length };
}

let totalBefore = 0;
let totalAfter = 0;
let files = 0;

for (const dir of TARGETS) {
  let entries = [];
  try {
    entries = readdirSync(dir).filter((f) => f.endsWith('.png'));
  } catch {
    console.warn(`[optimize-og-images] skip ${dir}: not readable`);
    continue;
  }
  for (const f of entries) {
    const path = join(dir, f);
    try {
      const { before, after } = await compressFile(path);
      totalBefore += before;
      totalAfter += after;
      files++;
    } catch (err) {
      console.warn(`[optimize-og-images] failed on ${path}: ${err.message}`);
    }
  }
}

const savedKB = Math.round((totalBefore - totalAfter) / 1024);
const pct = totalBefore > 0 ? Math.round(((totalBefore - totalAfter) / totalBefore) * 100) : 0;
console.log(`[optimize-og-images] processed ${files} files. ${Math.round(totalBefore / 1024)} KB -> ${Math.round(totalAfter / 1024)} KB. Saved ${savedKB} KB (${pct}%).`);
