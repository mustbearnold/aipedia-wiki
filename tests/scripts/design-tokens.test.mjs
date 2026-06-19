import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const ROOT = process.cwd();
const tokens = () => readFileSync(join(ROOT, 'src/styles/tokens.css'), 'utf8');

function assertAlias(source, alias, target) {
  assert.match(
    source,
    new RegExp(`${alias.replaceAll('-', '\\-')}\\s*:\\s*var\\(${target.replaceAll('-', '\\-')}(?:\\s*,[^)]*)?\\)`),
    `${alias} should alias ${target}`,
  );
}

test('canonical token file defines required semantic tokens', () => {
  const source = tokens();
  for (const token of [
    '--color-bg-base',
    '--color-surface-card',
    '--color-surface-raised',
    '--color-surface-muted',
    '--color-text-primary',
    '--color-text-secondary',
    '--color-text-muted',
    '--color-accent',
    '--color-accent-strong',
    '--color-verified',
    '--color-warning',
    '--color-risk',
    '--color-evidence',
    '--font-sans',
    '--font-data',
    '--font-mono',
    '--radius-control',
    '--radius-card',
    '--radius-panel',
    '--space-page-gutter',
    '--space-section-gap',
    '--space-content-gap',
    '--space-card-padding',
    '--motion-fast',
    '--motion-base',
    '--motion-slow',
    '--motion-ease',
    '--motion-ease-soft',
    '--z-nav',
    '--z-overlay',
    '--z-modal',
    '--z-toast',
    '--z-moat',
  ]) {
    assert.ok(source.includes(token), `missing ${token}`);
  }
});

test('global CSS imports canonical tokens first and before Tailwind', () => {
  const imports = readFileSync(join(ROOT, 'src/styles/global.css'), 'utf8')
    .trimStart()
    .match(/^@import .*$/gm) ?? [];
  assert.equal(imports[0], "@import './tokens.css';");
  assert.equal(imports[1], "@import 'tailwindcss';");
});

test('legacy aliases remain compatible with canonical tokens', () => {
  const source = tokens();
  for (const [alias, target] of [
    ['--bg-base', '--color-bg-base'],
    ['--bg-primary', '--color-bg-base'],
    ['--bg-card', '--color-surface-card'],
    ['--bg-card-hover', '--color-surface-raised'],
    ['--border', '--color-surface-muted'],
    ['--text-primary', '--color-text-primary'],
    ['--text-secondary', '--color-text-secondary'],
    ['--text-muted', '--color-text-muted'],
    ['--accent-primary', '--color-accent'],
    ['--accent-primary-text', '--color-accent-strong'],
    ['--accent-secondary', '--color-accent-secondary'],
    ['--accent-success', '--color-verified'],
    ['--accent-warning', '--color-warning'],
    ['--accent-danger', '--color-risk'],
    ['--site-bg', '--color-bg-base'],
    ['--site-text', '--color-text-primary'],
    ['--site-muted', '--color-text-muted'],
    ['--site-accent', '--color-accent'],
    ['--gt-surface', '--color-surface-card'],
    ['--gt-surface-raised', '--color-surface-raised'],
    ['--gt-text', '--color-text-primary'],
    ['--gt-muted', '--color-text-muted'],
    ['--gt-orange', '--color-accent'],
    ['--home-surface', '--color-surface-card'],
    ['--home-text', '--color-text-primary'],
    ['--home-muted', '--color-text-muted'],
    ['--home-accent', '--color-accent'],
    ['--site-radius-control', '--radius-control'],
    ['--site-radius-card', '--radius-card'],
    ['--site-radius-button', '--radius-control'],
    ['--site-radius-emphasis', '--radius-panel'],
    ['--site-page-gutter', '--space-page-gutter'],
    ['--site-section-gap', '--space-section-gap'],
    ['--site-content-gap', '--space-content-gap'],
    ['--site-card-padding', '--space-card-padding'],
  ]) {
    assertAlias(source, alias, target);
  }
});

test('scoped token files consume canonical aliases where values are exact', () => {
  const godtier = readFileSync(join(ROOT, 'src/styles/godtier-tokens.css'), 'utf8');
  const home = readFileSync(join(ROOT, 'src/styles/home-page-tokens.css'), 'utf8');

  for (const [alias, target] of [
    ['--gt-fg', '--color-text-primary'],
    ['--gt-muted', '--color-text-secondary'],
    ['--gt-subtle', '--color-text-muted'],
    ['--gt-line', '--color-surface-muted'],
    ['--gt-radius-pill', '--radius-pill'],
    ['--gt-text-body', '--font-size-base'],
  ]) {
    assertAlias(godtier, alias, target);
  }

  for (const [alias, target] of [
    ['--home-line', '--color-surface-muted'],
    ['--home-line-strong', '--color-accent-divider'],
    ['--home-text', '--color-text-primary'],
    ['--home-muted', '--color-text-secondary'],
    ['--home-dim', '--color-text-muted'],
    ['--home-accent', '--color-accent-strong'],
    ['--home-accent-solid', '--color-accent'],
    ['--home-card-outline', '--color-accent-outline'],
    ['--home-card-outline-hover', '--color-accent-outline-hover'],
  ]) {
    assertAlias(home, alias, target);
  }
});
