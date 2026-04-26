#!/usr/bin/env node

import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), 'benchmarks', 'results');
if (!existsSync(root)) {
  console.log('[benchmark-manifest] no benchmark results directory');
  process.exit(0);
}

const files = readdirSync(root).filter((name) => name.endsWith('.json'));
console.log(`[benchmark-manifest] ${files.length} result file(s)`);
for (const file of files) console.log(`- ${file}`);
