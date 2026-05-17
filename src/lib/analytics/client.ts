import type {
  AipediaAnalyticsClient,
  AnalyticsEventContext,
  AnalyticsPayload,
  DeviceContext,
} from './events';

const CONSENT_STORAGE_KEY = 'aipedia-cookie-consent';
const DEBUG_STORAGE_KEY = 'aipedia-debug-analytics';
const QUEUE_LIMIT = 80;

type QueuedEvent = {
  name: string;
  payload: AnalyticsPayload;
};

function deviceContext(): DeviceContext {
  const width = window.innerWidth || document.documentElement.clientWidth || 0;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

function pageSlugFromPath(): string {
  const path = window.location.pathname || '';
  return path.replace(/^\/+|\/+$/g, '') || 'home';
}

function pageTypeFromPath(): string {
  const first = pageSlugFromPath().split('/')[0] || 'home';
  if (first === 'tools') return 'tool';
  if (first === 'categories') return 'category';
  if (first === 'compare') return 'comparison';
  if (first === 'guides') return 'guide';
  if (first === 'news') return 'news';
  if (first === 'workflows') return 'workflow';
  if (first === 'answers') return 'answer';
  if (first === 'companies') return 'company';
  if (first === 'stack-builder') return 'stack_builder';
  if (first === 'search') return 'search';
  return first;
}

function urlDomain(url: string | undefined): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url, window.location.href).hostname.replace(/^www\./, '');
  } catch {
    return undefined;
  }
}

function experimentVariant(): string | undefined {
  return (
    document.documentElement.dataset.analyticsVariant ||
    document.body?.dataset.analyticsVariant ||
    document.querySelector<HTMLElement>('[data-analytics-variant]')?.dataset.analyticsVariant ||
    undefined
  );
}

function consentState(): 'accepted' | 'rejected' | 'unknown' {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === 'accepted' || value === 'rejected' ? value : 'unknown';
  } catch {
    return 'unknown';
  }
}

function canSend(): boolean {
  return consentState() === 'accepted' && typeof window.gtag === 'function';
}

function normalizeValue(value: unknown): string | number | boolean | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.filter((item) => item != null).join(',');
  return String(value);
}

function cleanPayload(input: AnalyticsEventContext): AnalyticsPayload {
  const payload: AnalyticsPayload = {};
  for (const [key, value] of Object.entries(input)) {
    const normalized = normalizeValue(value);
    if (normalized !== undefined) payload[key] = normalized;
  }
  return payload;
}

function datasetValue(el: HTMLElement, key: string): string | undefined {
  const value = el.dataset[key];
  return value && value.length > 0 ? value : undefined;
}

function contextFromTrackedElement(el: HTMLElement): AnalyticsEventContext {
  const href = el instanceof HTMLAnchorElement ? el.href : undefined;
  return {
    page_type: datasetValue(el, 'analyticsPageType'),
    page_slug: datasetValue(el, 'analyticsPageSlug'),
    source_module: datasetValue(el, 'analyticsSourceModule'),
    destination_type: datasetValue(el, 'analyticsDestinationType'),
    destination_slug: datasetValue(el, 'analyticsDestinationSlug'),
    destination_url: datasetValue(el, 'analyticsDestinationUrl') || href,
    tool_slug: datasetValue(el, 'analyticsToolSlug'),
    category_slug: datasetValue(el, 'analyticsCategorySlug'),
    comparison_slug: datasetValue(el, 'analyticsComparisonSlug'),
    guide_slug: datasetValue(el, 'analyticsGuideSlug'),
    position: datasetValue(el, 'analyticsPosition'),
    cta_label: datasetValue(el, 'analyticsLabel') || el.textContent?.trim() || undefined,
    variant: datasetValue(el, 'analyticsVariant'),
  };
}

function closestTrackedElement(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>('[data-analytics-event]');
}

function baseContext(eventName: string): AnalyticsEventContext {
  const device = deviceContext();
  const variant = experimentVariant();
  return {
    event_name: eventName,
    page_type: pageTypeFromPath(),
    page_slug: pageSlugFromPath(),
    page_title: document.title || '',
    device_context: device,
    device_type: device,
    viewport_width: window.innerWidth || document.documentElement.clientWidth || 0,
    timestamp: new Date().toISOString(),
    ...(variant ? { variant } : {}),
  };
}

function debugEnabled(): boolean {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('aipedia_debug_analytics') === '1') {
      localStorage.setItem(DEBUG_STORAGE_KEY, '1');
      return true;
    }
    if (params.get('aipedia_debug_analytics') === '0') {
      localStorage.removeItem(DEBUG_STORAGE_KEY);
      return false;
    }
    return localStorage.getItem(DEBUG_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function emitDebug(name: string, payload: AnalyticsPayload, status: string): void {
  if (!debugEnabled()) return;
  console.info('[aipedia analytics]', status, name, payload);
}

export function initAipediaAnalytics(): AipediaAnalyticsClient {
  if (window.aipediaAnalytics) return window.aipediaAnalytics;

  const queue: QueuedEvent[] = [];

  function flush(): void {
    if (!canSend()) return;
    while (queue.length > 0) {
      const item = queue.shift();
      if (!item) continue;
      window.gtag?.('event', item.name, item.payload);
      emitDebug(item.name, item.payload, 'sent');
    }
  }

  function track(eventName: string, context: AnalyticsEventContext = {}): void {
    if (!eventName) return;

    const destinationUrl = context.destination_url || context.link_url;
    const contextWithoutUndefined = Object.fromEntries(
      Object.entries(context).filter(([, value]) => value !== undefined),
    ) as AnalyticsEventContext;
    const payload = cleanPayload({
      ...baseContext(eventName),
      ...contextWithoutUndefined,
      event_name: eventName,
      destination_url_domain: context.destination_url_domain ?? urlDomain(String(destinationUrl || '')),
    });

    window.dispatchEvent(new CustomEvent('aipedia:analytics', {
      detail: { event: eventName, payload },
    }));

    if (consentState() === 'rejected') {
      emitDebug(eventName, payload, 'dropped-consent-rejected');
      return;
    }

    if (canSend()) {
      window.gtag?.('event', eventName, payload);
      emitDebug(eventName, payload, 'sent');
      return;
    }

    queue.push({ name: eventName, payload });
    if (queue.length > QUEUE_LIMIT) queue.shift();
    emitDebug(eventName, payload, 'queued');
  }

  const client: AipediaAnalyticsClient = {
    track,
    flush,
    consentState,
    debugEnabled,
  };

  window.aipediaAnalytics = client;
  window.__aipediaTrack = track;
  document.addEventListener('click', (event) => {
    const el = closestTrackedElement(event.target);
    const eventName = el?.dataset.analyticsEvent;
    if (!el || !eventName) return;
    track(eventName, contextFromTrackedElement(el));
  }, { passive: true });
  window.addEventListener('aipedia:analytics-ready', flush);
  document.addEventListener('astro:page-load', flush);
  document.addEventListener('astro:after-swap', flush);
  flush();
  return client;
}
