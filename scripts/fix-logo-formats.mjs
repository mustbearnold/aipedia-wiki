#!/usr/bin/env node
/**
 * fix-logo-formats.mjs
 *
 * Walks public/logos/tools/*.png and:
 *   - converts actual JPEG/ICO to real PNG (browsers mostly tolerate
 *     mislabeled formats but strict MIME-type checks + some CDNs
 *     choke on them)
 *   - detects and re-downloads broken "HTML page saved as image"
 *     cases (hex.png did this)
 *
 * Uses sharp for conversion. Idempotent: already-PNG files are skipped.
 */

import { readdir, readFile, writeFile, unlink } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const HERE = dirname(fileURLToPath(import.meta.url));
const LOGOS = join(HERE, "..", "public", "logos", "tools");

// Secondary fetch URLs for tools where the primary fetch gave garbage
const RESCUE_URLS = {
  hex: [
    "https://hex.tech/assets/favicon-32x32.png",
    "https://hex.tech/images/favicon-32x32.png",
    "https://icons.duckduckgo.com/ip3/hex.tech.ico",
    "https://avatars.githubusercontent.com/u/63752169?s=256", // Hex Technologies GitHub
  ],
};

async function rescueHex(outPath) {
  for (const url of RESCUE_URLS.hex) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 500) continue;
      // Check it's actually an image, not HTML
      const head = buf.slice(0, 8);
      const isPng = head[0] === 0x89 && head[1] === 0x50;
      const isJpeg = head[0] === 0xff && head[1] === 0xd8;
      const isIco = head[0] === 0x00 && head[1] === 0x00 && head[2] === 0x01 && head[3] === 0x00;
      if (!isPng && !isJpeg && !isIco) continue;
      // Convert to PNG
      const png = await sharp(buf).resize(256, 256, { fit: "contain" }).png().toBuffer();
      await writeFile(outPath, png);
      console.log(`  rescued hex via ${url} (${png.length} bytes PNG)`);
      return true;
    } catch (err) {
      // try next url
    }
  }
  return false;
}

const files = (await readdir(LOGOS)).filter((f) => f.endsWith(".png"));
let fixed = 0, rescued = 0, ok = 0, failed = 0;

for (const f of files) {
  const p = join(LOGOS, f);
  const buf = await readFile(p);
  const head = buf.slice(0, 8);
  const isPng = head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47;
  const isJpeg = head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
  const isIco = head[0] === 0x00 && head[1] === 0x00 && head[2] === 0x01 && head[3] === 0x00;

  if (isPng) {
    ok++;
    continue;
  }

  if (isJpeg || isIco) {
    try {
      const png = await sharp(buf).resize(256, 256, { fit: "contain" }).png().toBuffer();
      await writeFile(p, png);
      fixed++;
      console.log(`  fixed ${f}  (${isJpeg ? "JPEG" : "ICO"} -> PNG, ${png.length} bytes)`);
    } catch (err) {
      failed++;
      console.error(`  fail ${f}  ${err.message}`);
    }
    continue;
  }

  // Not a recognized image format. Is this a hex rescue case?
  const slug = f.replace(/\.png$/, "");
  if (slug === "hex") {
    const ok = await rescueHex(p);
    if (ok) rescued++;
    else failed++;
    continue;
  }

  // Unknown non-image format
  failed++;
  console.error(`  fail ${f}  (not a known image format: header ${Array.from(head).map(b => b.toString(16).padStart(2, "0")).join(" ")})`);
}

console.log(`\n${ok} already PNG, ${fixed} converted, ${rescued} rescued, ${failed} failed`);
