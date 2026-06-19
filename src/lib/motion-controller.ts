export interface MotionModule {
  refresh?: () => void;
  pause?: () => void;
  resume?: () => void;
  policychange?: (policy: MotionPolicy) => void;
}

export interface MotionPolicy {
  reduced: boolean;
  smallViewport: boolean;
  hidden: boolean;
  overlayOpen: boolean;
  canAnimateAmbient: boolean;
}

export interface MotionController {
  policy: MotionPolicy;
  register(module: MotionModule): () => void;
  refresh(): void;
  pause(): void;
  resume(): void;
  setOverlayOpen(open: boolean): void;
}

declare global {
  interface Window {
    __aipediaMotionController?: MotionController;
  }
}

function overlayOpen(): boolean {
  const search = document.getElementById('search-modal');
  if (search && (search.classList.contains('is-visible') || search.classList.contains('is-open'))) return true;
  if (document.querySelector('[role="dialog"][aria-modal="true"].is-visible, [role="dialog"][aria-modal="true"].is-open')) return true;
  if (document.querySelector('.tool-preview-layer.is-visible, .source-preview-layer.is-visible')) return true;
  const menu = document.getElementById('mobile-menu');
  if (menu && !menu.hidden) {
    const display = typeof window.getComputedStyle === 'function'
      ? window.getComputedStyle(menu).display
      : menu.style.display;
    if (display && display !== 'none') return true;
  }
  return document.body.style.overflow === 'hidden';
}

export function installMotionController(): MotionController {
  if (window.__aipediaMotionController) return window.__aipediaMotionController;

  const modules = new Set<MotionModule>();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const small = window.matchMedia('(max-width: 760px), (pointer: coarse)');
  let overlayForcedOpen = false;
  const policy: MotionPolicy = {
    reduced: reduce.matches,
    smallViewport: small.matches,
    hidden: document.hidden,
    overlayOpen: false,
    canAnimateAmbient: false,
  };

  function computePolicy(): void {
    policy.reduced = reduce.matches;
    policy.smallViewport = small.matches;
    policy.hidden = document.hidden;
    policy.overlayOpen = overlayForcedOpen || overlayOpen();
    policy.canAnimateAmbient = !policy.reduced && !policy.smallViewport && !policy.hidden && !policy.overlayOpen;
  }

  function emit(name: keyof MotionModule): void {
    for (const module of modules) {
      if (name === 'policychange') {
        module.policychange?.(policy);
      } else {
        module[name]?.();
      }
    }
  }

  function refresh(): void {
    const before = policy.canAnimateAmbient;
    computePolicy();
    emit('refresh');
    emit('policychange');
    if (before && !policy.canAnimateAmbient) emit('pause');
    if (!before && policy.canAnimateAmbient) emit('resume');
  }

  function pause(): void {
    if (overlayForcedOpen) return;
    overlayForcedOpen = true;
    refresh();
  }

  function resume(): void {
    if (!overlayForcedOpen) return;
    overlayForcedOpen = false;
    refresh();
  }

  function listenMedia(media: MediaQueryList): void {
    if (typeof media.addEventListener === 'function') media.addEventListener('change', refresh);
    else if (typeof media.addListener === 'function') media.addListener(refresh);
  }

  const observer = new MutationObserver(refresh);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  if (document.body) {
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'style', 'hidden', 'aria-hidden'],
      subtree: true,
    });
  }
  window.addEventListener('resize', refresh, { passive: true });
  document.addEventListener('visibilitychange', refresh);
  document.addEventListener('astro:after-swap', refresh);
  listenMedia(reduce);
  listenMedia(small);
  computePolicy();

  const controller: MotionController = {
    policy,
    register(module) {
      modules.add(module);
      module.policychange?.(policy);
      if (policy.canAnimateAmbient) module.resume?.();
      else module.pause?.();
      return () => {
        modules.delete(module);
      };
    },
    refresh,
    pause,
    resume,
    setOverlayOpen(open) {
      overlayForcedOpen = open;
      refresh();
    },
  };

  window.__aipediaMotionController = controller;
  window.dispatchEvent(new CustomEvent('aipedia:motion-controller-ready', { detail: controller }));
  return controller;
}
