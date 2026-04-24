#!/usr/bin/env node
/**
 * generate-ai-logos.mjs
 *
 * Hits the keyless Pollinations.ai FLUX endpoint to produce 12 distinct
 * professional-grade logo concepts for aipedia.wiki. All outputs are
 * 1024x1024 JPEG on pure black background.
 *
 * Runs in parallel — 12 prompts fired concurrently, each taking ~8-15s.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "ai-generated");
await mkdir(OUT, { recursive: true });

// Shared style suffix forces: minimalist, vectorish, correct colors, no text
const STYLE =
  "minimalist vector logo mark, electric purple to cyan blue gradient, " +
  "isolated on pure matte black background, 2026 modern tech brand identity, " +
  "professional clean geometric design, centered symmetric composition, " +
  "no text no letters no typography, flat design with subtle depth, " +
  "award-winning brand logo, crisp edges, high contrast";

const prompts = [
  {
    name: "01-orbital-orb",
    prompt: "glowing gradient orb with orbital ring, saturn-like sphere with single thin ring, intelligence core, " + STYLE,
  },
  {
    name: "02-node-constellation",
    prompt: "connected luminous nodes forming a knowledge graph, 6 small glowing dots linked by thin gradient lines to a central larger node, network visualization, " + STYLE,
  },
  {
    name: "03-hexagonal-core",
    prompt: "hexagonal geometric emblem with AI circuit pattern inside, concentric hexagons, tech chip aesthetic, " + STYLE,
  },
  {
    name: "04-abstract-a-mark",
    prompt: "abstract stylized letter A monogram, bold geometric triangular shape with a horizontal cut, modern wordmark glyph, " + STYLE,
  },
  {
    name: "05-diamond-facet",
    prompt: "faceted diamond crystal logo with sharp triangular panels, multi-plane gradient faces, premium brand emblem, " + STYLE,
  },
  {
    name: "06-spiral-vortex",
    prompt: "elegant spiral vortex mark, continuous flowing ribbon forming a three-quarter rotation, fibonacci curve, " + STYLE,
  },
  {
    name: "07-infinity-loop",
    prompt: "interlocking infinity loop emblem, two overlapping mobius rings forming figure eight, continuous knowledge, " + STYLE,
  },
  {
    name: "08-wireframe-globe",
    prompt: "wireframe sphere globe with glowing latitude and longitude gridlines, translucent orb, data intelligence, " + STYLE,
  },
  {
    name: "09-layered-pages",
    prompt: "three overlapping flat cards or pages at slight angles, stacked documents with gradient edges, encyclopedia metaphor, " + STYLE,
  },
  {
    name: "10-compass-needle",
    prompt: "minimal compass rose with single bright gradient needle pointing up, subtle outer ring with four cardinal ticks, navigation metaphor, " + STYLE,
  },
  {
    name: "11-neural-bloom",
    prompt: "abstract neural network bloom, branching organic lines radiating from a central point, synapse pattern, brain-inspired, " + STYLE,
  },
  {
    name: "12-score-ring",
    prompt: "circular gauge ring with 85 percent fill arc, clean progress dial, evaluation score visualization, glowing gradient stroke, " + STYLE,
  },
];

const BASE = "https://image.pollinations.ai/prompt/";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generate({ name, prompt }, i, attempt = 1) {
  const qs = new URLSearchParams({
    width: "1024",
    height: "1024",
    nologo: "true",
    enhance: "true",
    model: "flux",
    seed: String(2026 + i * 7),
  });
  const url = `${BASE}${encodeURIComponent(prompt)}?${qs}`;
  const t0 = Date.now();
  try {
    const res = await fetch(url);
    if (res.status === 429) {
      if (attempt > 5) throw new Error("429 after 5 retries");
      const wait = 3000 * attempt;
      console.log(`  wait ${name}  429 retry ${attempt}, backoff ${wait}ms`);
      await sleep(wait);
      return generate({ name, prompt }, i, attempt + 1);
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const outPath = join(OUT, `${name}.jpg`);
    await writeFile(outPath, buf);
    const ms = Date.now() - t0;
    const kb = (buf.length / 1024).toFixed(1);
    console.log(`  ok   ${name}  ${kb}KB in ${ms}ms`);
    return { name, ok: true, bytes: buf.length, ms };
  } catch (err) {
    console.error(`  fail ${name}  ${err.message}`);
    return { name, ok: false, error: err.message };
  }
}

console.log(`Generating ${prompts.length} logo concepts sequentially (stays under rate limit)...`);
const t0 = Date.now();
const results = [];
for (let i = 0; i < prompts.length; i++) {
  const r = await generate(prompts[i], i);
  results.push(r);
  if (i < prompts.length - 1) await sleep(1500); // gap between requests
}
const ok = results.filter((r) => r.ok).length;
console.log(`\nDone: ${ok}/${prompts.length} in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
console.log(`Output: ${OUT}`);
