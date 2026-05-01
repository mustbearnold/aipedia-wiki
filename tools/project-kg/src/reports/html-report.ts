import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

export function writeHtmlReport(markdown: string, reportPath: string): string {
  const escaped = markdown.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Project KG Report</title>
  <style>body{font-family:Inter,system-ui,sans-serif;max-width:960px;margin:40px auto;padding:0 20px;line-height:1.5}pre{white-space:pre-wrap}</style>
</head>
<body><pre>${escaped}</pre></body>
</html>`;
  mkdirSync(path.dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, html);
  return reportPath;
}
