#!/usr/bin/env node
/**
 * render-all.mjs
 *
 * Rasterises every SVG in brand-mockups/concepts/ to a transparent-background
 * PNG in brand-mockups/png/. Uses @resvg/resvg-js (pure Rust, no native build
 * required on Windows).
 *
 * Icon SVGs (*-icon.svg)  -> 512x512 PNG
 * Wide SVGs  (*-wide.svg) -> 1600x400 PNG (as authored)
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "concepts");
const OUT = join(HERE, "png");

mkdirSync(OUT, { recursive: true });

const files = readdirSync(SRC).filter((f) => f.endsWith(".svg")).sort();

let rendered = 0;
for (const file of files) {
  const svg = readFileSync(join(SRC, file), "utf8");
  const isIcon = file.includes("-icon.");
  const opts = {
    // Transparent background: omit `background` entirely
    fitTo: isIcon
      ? { mode: "width", value: 512 }
      : { mode: "width", value: 1600 },
    font: {
      // Use system fonts; resvg will pick sensible fallbacks on Windows
      loadSystemFonts: true,
      defaultFontFamily: "Arial",
    },
    shapeRendering: 2, // geometric precision
    textRendering: 2,  // optimize legibility
    imageRendering: 0, // high quality
  };
  const resvg = new Resvg(svg, opts);
  const png = resvg.render().asPng();
  const outName = file.replace(/\.svg$/, ".png");
  writeFileSync(join(OUT, outName), png);
  const dims = isIcon ? "512x512" : "1600x400";
  console.log(`  ${file}  ->  ${outName}  [${dims}]`);
  rendered++;
}

console.log(`\nRendered ${rendered} PNGs to ${OUT}`);
