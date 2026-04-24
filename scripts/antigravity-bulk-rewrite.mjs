import fs from 'fs';
import path from 'path';

// =========================================================================
// ANTIGRAVITY BULK REWRITE SCRIPT
// Requires Node 18+ (uses native fetch)
// Run with: GEMINI_API_KEY=your_key node scripts/antigravity-bulk-rewrite.mjs
// =========================================================================

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌ ERROR: GEMINI_API_KEY environment variable is missing.");
  console.log("Run as: GEMINI_API_KEY=your_key node scripts/antigravity-bulk-rewrite.mjs");
  process.exit(1);
}

const SOURCE_DIR = path.join(process.cwd(), 'src/content');
const TARGET_DIR = path.join(process.cwd(), 'src/content-antigravity');

// Rate limiting settings to ensure API stability
const BATCH_SIZE = 5; 
const BATCH_DELAY_MS = 2000;

const SYSTEM_PROMPT = `
You are the Antigravity Intelligence Engine (using Gemini 3.1 Pro). 
Your task is to completely rewrite providing AI tool/service reviews.

Rules:
1. Retain the exact YAML frontmatter block (variables like title, category, pricing, etc), but you may adjust the 'tagline' to be more critical/punchy.
2. Completely rewrite the body content. Replace generic "marketing" language with deep, technical, unvarnished architectural critique.
3. Be painfully honest. Call out bad DX, rate limits, feature bloat, or UI failures.
4. Use standard markdown. Whenever concluding a major finding or summary, use a blockquote formatted exactly like this:
> **System Verdict:** [Your blunt, highly perceptive conclusion here.]
5. Format comparative data into Markdown tables where applicable.
6. Return ONLY the raw markdown file string (frontmatter + content) without wrapping it in markdown code blocks (\`\`\`markdown). Do not include conversational filler in your output.
`;

async function callGeminiAPI(fileContent) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
  
  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: `${SYSTEM_PROMPT}\n\nHere is the source markdown to rewrite:\n\n${fileContent}` }]
      }
    ],
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 3000,
    }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API Error: ${res.status} ${err}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  // Clean up any potential markdown wrap the model might do despite instructions
  return text ? text.replace(/^\\\`\\\`\\\`markdown\n/i, '').replace(/\n\\\`\\\`\\\`$/, '') : null;
}

function processDirectory(sourcePath, targetPath) {
  let filesToProcess = [];

  const items = fs.readdirSync(sourcePath);
  for (const item of items) {
    const sPath = path.join(sourcePath, item);
    const tPath = path.join(targetPath, item);

    const stat = fs.statSync(sPath);
    if (stat.isDirectory()) {
      if (!fs.existsSync(tPath)) {
        fs.mkdirSync(tPath, { recursive: true });
      }
      filesToProcess = filesToProcess.concat(processDirectory(sPath, tPath));
    } else if (item.endsWith('.md')) {
      // Only process if it doesn't already exist in the target (allowing easy restarts on failure)
      if (!fs.existsSync(tPath)) {
        filesToProcess.push({ sPath, tPath });
      }
    }
  }
  return filesToProcess;
}

async function run() {
  console.log("🚀 Initializing Antigravity Bulk Rewrite System...");
  
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  const allFiles = processDirectory(SOURCE_DIR, TARGET_DIR);
  console.log(`📦 Found ${allFiles.length} files remaining to process.`);

  for (let i = 0; i < allFiles.length; i += BATCH_SIZE) {
    const batch = allFiles.slice(i, i + BATCH_SIZE);
    console.log(`\n⏳ Processing batch ${Math.floor(i/BATCH_SIZE) + 1} / ${Math.ceil(allFiles.length/BATCH_SIZE)}...`);

    await Promise.all(batch.map(async ({ sPath, tPath }) => {
      try {
        const content = fs.readFileSync(sPath, 'utf-8');
        console.log(`  ↳ Rewriting ${path.basename(sPath)}...`);
        
        const newContent = await callGeminiAPI(content);
        if (newContent) {
          fs.writeFileSync(tPath, newContent);
          console.log(`  ✓ Saved ${path.basename(tPath)}`);
        } else {
          console.error(`  ❌ Failed: Empty response for ${path.basename(sPath)}`);
        }
      } catch (err) {
        console.error(`  ❌ Error on ${path.basename(sPath)}: ${err.message}`);
      }
    }));

    if (i + BATCH_SIZE < allFiles.length) {
      console.log(`⏱️  Pausing for rate limits (${BATCH_DELAY_MS}ms)...`);
      await new Promise(resolve => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  console.log("\n✅ Antigravity Bulk Rewrite Complete!");
}

run().catch(console.error);
