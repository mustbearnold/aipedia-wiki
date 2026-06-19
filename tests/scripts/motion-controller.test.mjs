import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Script, createContext } from 'node:vm';

const ROOT = process.cwd();
function readSource(path) {
  return readFileSync(join(ROOT, path), 'utf8');
}

function assertContainsAll(source, tokens) {
  for (const token of tokens) {
    assert.ok(source.includes(token), `missing ${token}`);
  }
}

function runnableMotionControllerSource() {
  const source = readSource('src/lib/motion-controller.ts');
  const start = source.indexOf('const overlayAttributeFilter');
  return source
    .slice(start === -1 ? source.indexOf('function overlayOpen') : start)
    .replace(/export function installMotionController\(\): MotionController/, 'function installMotionController()')
    .replace(/new Set<MotionModule>\(\)/g, 'new Set()')
    .replace(/const policy: MotionPolicy =/g, 'const policy =')
    .replace(/: keyof MotionModule/g, '')
    .replace(/: MediaQueryList/g, '')
    .replace(/: MotionController/g, '')
    .replace(/: Element \| null/g, '')
    .replace(/: boolean/g, '')
    .replace(/: void/g, '')
    .concat('\nglobalThis.installMotionController = installMotionController;\n');
}

function createClassList(initial = '') {
  const names = new Set(initial.split(/\s+/).filter(Boolean));
  return {
    add(name) {
      names.add(name);
    },
    remove(name) {
      names.delete(name);
    },
    contains(name) {
      return names.has(name);
    },
    toString() {
      return Array.from(names).join(' ');
    },
  };
}

function createElement(id = '') {
  const attributes = new Map();
  return {
    id,
    parentNode: null,
    children: [],
    hidden: false,
    style: { display: '', overflow: '' },
    classList: createClassList(),
    getAttribute(name) {
      return attributes.get(name) || null;
    },
    setAttribute(name, value) {
      attributes.set(name, String(value));
    },
    appendChild(child) {
      child.parentNode = this;
      this.children.push(child);
    },
  };
}

function createMotionHarness() {
  const observers = [];
  const listeners = new Map();
  const frameQueue = [];
  const documentElement = createElement('html');
  const body = createElement('body');
  const elements = new Map();
  const mediaQueries = [];

  function addElement(id, parent = body) {
    const element = createElement(id);
    parent.appendChild(element);
    elements.set(id, element);
    return element;
  }

  function addEventListener(type, listener) {
    const bucket = listeners.get(type) || [];
    bucket.push(listener);
    listeners.set(type, bucket);
  }

  function matchesOverlay(selector) {
    for (const element of elements.values()) {
      if (selector.includes('[role="dialog"]')) {
        const isDialog = element.getAttribute('role') === 'dialog' && element.getAttribute('aria-modal') === 'true';
        if (isDialog && (element.classList.contains('is-visible') || element.classList.contains('is-open'))) return element;
      }
      if (selector.includes('.tool-preview-layer') && element.classList.contains('tool-preview-layer') && element.classList.contains('is-visible')) return element;
      if (selector.includes('.source-preview-layer') && element.classList.contains('source-preview-layer') && element.classList.contains('is-visible')) return element;
    }
    return null;
  }

  const document = {
    documentElement,
    body,
    hidden: false,
    getElementById(id) {
      return elements.get(id) || null;
    },
    querySelector: matchesOverlay,
    querySelectorAll() {
      return [];
    },
    addEventListener,
  };

  const window = {
    document,
    __aipediaMotionController: undefined,
    matchMedia(query) {
      const media = {
        media: query,
        matches: false,
        listeners: [],
        addEventListener(type, listener) {
          if (type === 'change') this.listeners.push(listener);
        },
        addListener(listener) {
          this.listeners.push(listener);
        },
      };
      mediaQueries.push(media);
      return media;
    },
    getComputedStyle(element) {
      return { display: element.style.display || '' };
    },
    addEventListener,
    dispatchEvent(event) {
      for (const listener of listeners.get(event.type) || []) listener(event);
    },
    requestAnimationFrame(callback) {
      frameQueue.push(callback);
      return frameQueue.length;
    },
  };

  class CustomEvent {
    constructor(type, init = {}) {
      this.type = type;
      this.detail = init.detail;
    }
  }

  class MutationObserver {
    constructor(callback) {
      this.callback = callback;
      this.targets = [];
      observers.push(this);
    }
    observe(target, options) {
      this.targets.push({ target, options });
    }
    disconnect() {
      this.targets = [];
    }
  }

  function isDescendant(target, ancestor) {
    for (let node = target; node; node = node.parentNode) {
      if (node === ancestor) return true;
    }
    return false;
  }

  function mutate(target, attributeName) {
    for (const observer of observers) {
      const matches = observer.targets.some((entry) => {
        const watchesTarget = entry.target === target || (entry.options.subtree && isDescendant(target, entry.target));
        const watchesAttribute = !entry.options.attributeFilter || entry.options.attributeFilter.includes(attributeName);
        return watchesTarget && watchesAttribute;
      });
      if (matches) observer.callback([{ type: 'attributes', target, attributeName }]);
    }
  }

  function flushAnimationFrames() {
    while (frameQueue.length > 0) {
      frameQueue.shift()(0);
    }
  }

  const context = createContext({
    window,
    document,
    MutationObserver,
    CustomEvent,
    requestAnimationFrame: window.requestAnimationFrame,
  });
  new Script(runnableMotionControllerSource()).runInContext(context);
  const controller = context.installMotionController();

  return { addElement, body, controller, flushAnimationFrames, mediaQueries, mutate, observers };
}

function countModule(controller) {
  const counts = { refresh: 0, policychange: 0, pause: 0, resume: 0 };
  controller.register({
    refresh() {
      counts.refresh += 1;
    },
    policychange() {
      counts.policychange += 1;
    },
    pause() {
      counts.pause += 1;
    },
    resume() {
      counts.resume += 1;
    },
  });
  counts.refresh = 0;
  counts.policychange = 0;
  counts.pause = 0;
  counts.resume = 0;
  return counts;
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

test('BaseLayout does not route policy changes through module refresh', () => {
  const layout = readSource('src/layouts/BaseLayout.astro');

  assert.doesNotMatch(layout, /register\(\{\s*refresh:\s*refresh,\s*policychange:\s*refresh\s*}/);
  assert.match(layout, /register\(\{\s*policychange:\s*refresh\s*}/);
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

test('motion controller ignores scroll progress style mutations', () => {
  const harness = createMotionHarness();
  const counts = countModule(harness.controller);
  const progress = harness.addElement('read-progress');

  progress.style.transform = 'scaleX(0.5)';
  harness.mutate(progress, 'style');
  harness.flushAnimationFrames();

  assert.equal(counts.refresh, 0);
  assert.equal(counts.policychange, 0);
});

test('motion controller debounces policy refresh mutations without module refresh', () => {
  const harness = createMotionHarness();
  const counts = countModule(harness.controller);

  harness.body.style.overflow = 'hidden';
  harness.mutate(harness.body, 'style');
  harness.mutate(harness.body, 'style');
  harness.mutate(harness.body, 'style');

  assert.equal(counts.refresh, 0, 'policy refresh should not emit module refresh for mutation bursts');
  assert.equal(counts.policychange, 0, 'policychange should wait for a single animation frame');

  harness.flushAnimationFrames();

  assert.equal(counts.refresh, 0);
  assert.equal(counts.policychange, 1);
});

test('motion overlay observers do not watch whole body subtrees', () => {
  const controller = readSource('src/lib/motion-controller.ts');
  const moat = readSource('src/components/MoatLayer.astro');

  assert.doesNotMatch(controller, /observe\(document\.body,[\s\S]*?subtree:\s*true/);
  assert.doesNotMatch(controller, /observe\(body,[\s\S]*?subtree:\s*true/);
  assert.doesNotMatch(moat, /observe\(body,[\s\S]*?subtree:\s*true/);
});
