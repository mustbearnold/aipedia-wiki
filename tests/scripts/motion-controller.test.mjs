import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
function readSource(path) {
  return readFileSync(join(ROOT, path), 'utf8');
}

function assertContainsAll(source, tokens) {
  for (const token of tokens) {
    assert.ok(source.includes(token), `missing ${token}`);
  }
}

test('motion controller exposes lifecycle registration contract', () => {
  const source = readSource('src/lib/motion-controller.ts');
  assertContainsAll(source, ['installMotionController', 'register', 'refresh', 'pause', 'resume', 'policychange', 'astro:after-swap']);
});

test('motion controller owns ambient policy inputs', () => {
  const source = readSource('src/lib/motion-controller.ts');
  assertContainsAll(source, [
    'prefers-reduced-motion: reduce',
    'max-width: 760px',
    'document.hidden',
    'overlayOpen',
    'canAnimateAmbient',
    'visibilitychange',
    'MutationObserver',
  ]);
});

test('BaseLayout installs the motion controller before inline runtime', () => {
  const layout = readSource('src/layouts/BaseLayout.astro');
  const installIndex = layout.indexOf('installMotionController();');
  const runtimeIndex = layout.indexOf("var KEY = '__aipediaBaseRuntime'");
  assert.notEqual(installIndex, -1, 'BaseLayout must install controller');
  assert.notEqual(runtimeIndex, -1, 'BaseLayout runtime guard must remain');
  assert.ok(installIndex < runtimeIndex, 'controller must install before guarded runtime block');
});

test('Moat registers with the motion controller without moving drawing math', () => {
  const moat = readSource('src/components/MoatLayer.astro');
  assert.match(moat, /__aipediaMotionController/);
  assert.match(moat, /register\(/);
  assert.match(moat, /function drawNetwork/);
  assert.match(moat, /function drawRadar/);
  assert.match(moat, /function drawBackground/);
  assert.match(moat, /function drawRivers/);
  assert.match(moat, /function drawTraces/);
});
