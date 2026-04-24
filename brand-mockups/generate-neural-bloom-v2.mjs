#!/usr/bin/env node
/**
 * generate-neural-bloom-v2.mjs
 *
 * V2: Pushes hard on MINIMALIST VECTOR style for neural-bloom marks.
 * Thin monoline strokes, geometric precision, no painterly glow.
 * Output: transparent PNG via alpha ramp (black -> alpha).
 */

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "neural-bloom-v2");
await mkdir(OUT, { recursive: true });

// STYLE LOCK — every prompt includes these clauses. Forces FLUX toward
// Illustrator-style line art, away from its default painterly fallback.
const STYLE =
  "flat minimalist vector illustration, monoline style, clean bezier curves, " +
  "thin uniform stroke weight, geometric precision, Swiss design minimalism, " +
  "negative space emphasis, purple to cyan gradient strokes only, " +
  "isolated on pure matte black background, crisp sharp edges, no glow no bloom no halo no texture, " +
  "2026 modern tech logo, flat design, vector art, line drawing, symmetric centered composition";

const variants = [
  {
    name: "01-radial-constellation",
    prompt: "minimal neural constellation mark, single center dot with 8 thin straight radial lines each ending in small dot, geometric star burst, " + STYLE,
    seed: 5001,
  },
  {
    name: "02-clean-neuron",
    prompt: "simple geometric neuron icon, small circle cell body with 5 thin curved dendrite lines branching outward in organic but clean arcs, " + STYLE,
    seed: 5002,
  },
  {
    name: "03-hub-network",
    prompt: "sparse network logo, 6 small circle nodes in asymmetric constellation connected by thin straight lines to single larger central circle, " + STYLE,
    seed: 5003,
  },
  {
    name: "04-dandelion-mandala",
    prompt: "perfect radial dandelion mark, 16 thin lines symmetrically radiating from center point, each terminating in tiny dot, mandala symmetry, " + STYLE,
    seed: 5004,
  },
  {
    name: "05-triangle-synapse",
    prompt: "geometric triangular synapse mark, 3 nodes forming equilateral triangle connected by thin gradient lines with single connecting line to fourth center node, " + STYLE,
    seed: 5005,
  },
  {
    name: "06-curved-bloom",
    prompt: "elegant synapse bloom line drawing, 6 thin curved bezier lines emanating from central dot, each with small endpoint dot, Japanese minimalism, " + STYLE,
    seed: 5006,
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

    // Raw on-black PNG (for reference / black-bg use)
    const onBlackPng = await sharp(jpgBuf).png({ quality: 100, compressionLevel: 9 }).toBuffer();
    await writeFile(join(OUT, `${name}-black.png`), onBlackPng);

    // TRANSPARENT variant via luma-based alpha ramp.
    // Thin vector lines are bright; black bg is dark. Ramp tuned for
    // crisp edge preservation without halo retention.
    const { data, info } = await sharp(jpgBuf).raw().toBuffer({ resolveWithObject: true });
    const out = Buffer.alloc(info.width * info.height * 4);
    const THRESH = 18;   // anything below -> fully transparent
    const GAIN = 2.0;    // steeper ramp for sharp edges
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
    await writeFile(join(OUT, `${name}.png`), transparentPng);

    const ms = Date.now() - t0;
    console.log(`  ok   ${name}  ${(transparentPng.length / 1024).toFixed(1)}KB  ${ms}ms`);
    return { name, ok: true };
  } catch (err) {
    console.error(`  fail ${name}  ${err.message}`);
    return { name, ok: false, error: err.message };
  }
}

console.log(`Generating ${variants.length} minimalist vector variants...`);
const t0 = Date.now();
for (let i = 0; i < variants.length; i++) {
  await fetchOne(variants[i]);
  if (i < variants.length - 1) await sleep(1500);
}
console.log(`\nDone in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
console.log(`Output: ${OUT}`);
