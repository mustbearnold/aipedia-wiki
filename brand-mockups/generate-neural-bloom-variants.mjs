#!/usr/bin/env node
/**
 * generate-neural-bloom-variants.mjs
 *
 * Generates 6 variations of the Neural Bloom direction from concept 11.
 * Each fetched from Pollinations.ai as JPG, then converted to PNG via sharp.
 * Also produces one transparent-background experimental cut (black -> alpha).
 */

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "neural-bloom-variants");
await mkdir(OUT, { recursive: true });

// Core aesthetic DNA — every prompt locks this in:
const CORE =
  "luminous purple to electric cyan gradient, isolated on pure matte black background, " +
  "minimalist logo mark, 2026 modern tech brand identity, professional clean design, " +
  "centered symmetric composition, no text no letters, crisp high contrast, award winning";

const variants = [
  {
    name: "01-synapse-bloom",
    prompt: "neural network synapse bloom, bright central node with delicate branching tendrils radiating outward, dense nerve pattern, " + CORE,
    seed: 4111,
  },
  {
    name: "02-dense-explosion",
    prompt: "dense neural explosion mark, hundreds of glowing micro nodes connected by delicate light filaments, cosmic synaptic pattern, " + CORE,
    seed: 4222,
  },
  {
    name: "03-symmetric-radial",
    prompt: "perfectly symmetric radial neural bloom, 12 primary branches with secondary tendrils, mandala-like balance, glowing central core, " + CORE,
    seed: 4333,
  },
  {
    name: "04-dandelion-neural",
    prompt: "dandelion-shaped neural bloom, thin radiating lines with small light-dot tips at each endpoint, spherical distribution, floating suspended, " + CORE,
    seed: 4444,
  },
  {
    name: "05-neuron-single",
    prompt: "stylized single neuron illustration logo, cell body glowing at center with elegant dendrites reaching outward, anatomical precision meets minimalism, " + CORE,
    seed: 4555,
  },
  {
    name: "06-supernova-bloom",
    prompt: "neural supernova bloom, intense bright core with plasma-like filaments radiating in organic curves, cosmic to synapse metaphor, " + CORE,
    seed: 4666,
  },
];

const BASE = "https://image.pollinations.ai/prompt/";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchOne({ name, prompt, seed }, attempt = 1) {
  const qs = new URLSearchParams({
    width: "1024",
    height: "1024",
    nologo: "true",
    enhance: "true",
    model: "flux",
    seed: String(seed),
  });
  const url = `${BASE}${encodeURIComponent(prompt)}?${qs}`;
  const t0 = Date.now();
  try {
    const res = await fetch(url);
    if (res.status === 429) {
      if (attempt > 5) throw new Error("429 after 5 retries");
      const wait = 3000 * attempt;
      console.log(`  wait ${name}  429, backoff ${wait}ms`);
      await sleep(wait);
      return fetchOne({ name, prompt, seed }, attempt + 1);
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const jpgBuf = Buffer.from(await res.arrayBuffer());

    // Convert JPG -> PNG (lossless, same dimensions, preserves black bg)
    const pngBuf = await sharp(jpgBuf).png({ quality: 100, compressionLevel: 9 }).toBuffer();
    await writeFile(join(OUT, `${name}.png`), pngBuf);

    // Transparent-bg experimental: pull black to alpha via threshold
    // Black pixels (RGB < 30) -> alpha 0. Bright pixels -> full alpha.
    const { data, info } = await sharp(jpgBuf).raw().toBuffer({ resolveWithObject: true });
    const pixels = Buffer.alloc(info.width * info.height * 4);
    for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const brightness = Math.max(r, g, b); // luma-ish
      pixels[j] = r;
      pixels[j + 1] = g;
      pixels[j + 2] = b;
      // Alpha ramps: very dark = transparent, mid+ = opaque
      pixels[j + 3] = Math.max(0, Math.min(255, Math.round((brightness - 25) * 1.4)));
    }
    const transparentBuf = await sharp(pixels, {
      raw: { width: info.width, height: info.height, channels: 4 },
    }).png().toBuffer();
    await writeFile(join(OUT, `${name}-transparent.png`), transparentBuf);

    const ms = Date.now() - t0;
    console.log(`  ok   ${name}  PNG ${(pngBuf.length / 1024).toFixed(1)}KB + transparent variant  (${ms}ms)`);
    return { name, ok: true };
  } catch (err) {
    console.error(`  fail ${name}  ${err.message}`);
    return { name, ok: false, error: err.message };
  }
}

console.log(`Generating ${variants.length} Neural Bloom variants sequentially...`);
const t0 = Date.now();
for (let i = 0; i < variants.length; i++) {
  await fetchOne(variants[i]);
  if (i < variants.length - 1) await sleep(1500);
}
console.log(`\nDone in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
console.log(`Output: ${OUT}`);
