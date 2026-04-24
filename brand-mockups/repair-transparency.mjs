#!/usr/bin/env node
/**
 * repair-transparency.mjs
 *
 * FLUX tends to add an ambient purple tint to "pure black" backgrounds.
 * My original alpha ramp (threshold 18) was too permissive. This script
 * re-processes every *-black.png in neural-bloom-v2/ with a much higher
 * threshold + contrast boost to produce clean transparent PNGs.
 *
 * Also writes -preview.png which shows the result on a checkerboard so
 * you can see the transparency immediately.
 */

import { readFile, writeFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const HERE = dirname(fileURLToPath(import.meta.url));
const DIR = join(HERE, "neural-bloom-v2");

const files = (await readdir(DIR)).filter((f) => f.endsWith("-black.png"));

for (const f of files) {
  const base = f.replace("-black.png", "");
  const inPath = join(DIR, f);
  const rawBuf = await readFile(inPath);

  // Step 1: Boost contrast/saturation first so bg becomes pure black
  // linear(a,b) scales: out = a*in + b. Here: multiply by 1.3, shift down 30.
  // That crushes the ambient tint (~30 brightness) to 9 and lifts the
  // marks so they survive a higher threshold.
  const boosted = await sharp(rawBuf)
    .linear(1.4, -40)
    .toBuffer();

  // Step 2: Extract raw RGB
  const { data, info } = await sharp(boosted).raw().toBuffer({ resolveWithObject: true });

  // Step 3: Alpha ramp with aggressive threshold
  const THRESH = 35;
  const GAIN = 2.4;
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const brightness = Math.max(r, g, b);
    out[j] = r;
    out[j + 1] = g;
    out[j + 2] = b;
    out[j + 3] = brightness < THRESH
      ? 0
      : Math.max(0, Math.min(255, Math.round((brightness - THRESH) * GAIN)));
  }

  const transparentPng = await sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png({ quality: 100, compressionLevel: 9 }).toBuffer();

  await writeFile(join(DIR, `${base}.png`), transparentPng);
  console.log(`  ${base}.png  (${info.width}x${info.height}, ${(transparentPng.length / 1024).toFixed(1)}KB)`);

  // Preview on checkerboard (so the transparency is visible in any viewer)
  const checker = Buffer.alloc(info.width * info.height * 3);
  const SIZE = 40;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 3;
      const c = (Math.floor(x / SIZE) + Math.floor(y / SIZE)) % 2 === 0 ? 30 : 50;
      checker[idx] = c; checker[idx + 1] = c; checker[idx + 2] = c;
    }
  }
  const checkerBg = await sharp(checker, {
    raw: { width: info.width, height: info.height, channels: 3 },
  }).png().toBuffer();
  const preview = await sharp(checkerBg)
    .composite([{ input: transparentPng }])
    .png()
    .toBuffer();
  await writeFile(join(DIR, `${base}-preview.png`), preview);
}

console.log(`\nRepaired ${files.length} files. Look for *.png (transparent) and *-preview.png (checkerboard preview).`);
