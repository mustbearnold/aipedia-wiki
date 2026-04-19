#!/usr/bin/env node
/**
 * Build public/favicon.ico from the hex-gem PNG favicons.
 *
 * Why: Chrome and Firefox request /favicon.ico from the root on first load
 * (before HTML is parsed), so a stale .ico wins over the PNG <link rel="icon">
 * tags in BaseLayout. We generate a proper multi-resolution ICO that embeds
 * the 16x16 and 32x32 hex-gem PNGs already in public/.
 *
 * Run after regenerating favicons from logo.svg:
 *   node scripts/generate-favicon-ico.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// ICO spec: 6-byte ICONDIR + N x 16-byte ICONDIRENTRY + concatenated image data.
// Each entry uses bit-depth 32 (RGBA) and embeds the PNG verbatim, which every
// browser released after ~2010 understands.
async function buildIco(sizes) {
  const entries = await Promise.all(
    sizes.map(async (size) => {
      const data = await readFile(join(publicDir, `favicon-${size}.png`));
      return { size, data };
    })
  );

  const headerSize = 6 + 16 * entries.length;
  const totalDataSize = entries.reduce((sum, e) => sum + e.data.length, 0);
  const buf = Buffer.alloc(headerSize + totalDataSize);

  // ICONDIR
  buf.writeUInt16LE(0, 0);                  // reserved
  buf.writeUInt16LE(1, 2);                  // type = icon
  buf.writeUInt16LE(entries.length, 4);     // image count

  let dataOffset = headerSize;
  entries.forEach((entry, i) => {
    const entryOffset = 6 + i * 16;
    // Width/height byte: 0 means 256.
    buf.writeUInt8(entry.size >= 256 ? 0 : entry.size, entryOffset + 0);
    buf.writeUInt8(entry.size >= 256 ? 0 : entry.size, entryOffset + 1);
    buf.writeUInt8(0, entryOffset + 2);                 // palette entries
    buf.writeUInt8(0, entryOffset + 3);                 // reserved
    buf.writeUInt16LE(1, entryOffset + 4);              // color planes
    buf.writeUInt16LE(32, entryOffset + 6);             // bits per pixel
    buf.writeUInt32LE(entry.data.length, entryOffset + 8);
    buf.writeUInt32LE(dataOffset, entryOffset + 12);
    entry.data.copy(buf, dataOffset);
    dataOffset += entry.data.length;
  });

  return buf;
}

const ico = await buildIco([16, 32]);
const outPath = join(publicDir, 'favicon.ico');
await writeFile(outPath, ico);
console.log(`Wrote ${outPath} (${ico.length} bytes, 16x16 + 32x32)`);
