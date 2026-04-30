// Normalize messy price_range strings into one of a few uniform shapes
// so compact listings (homepage grid, /tools/, search results, comparison
// tool-row cards, category listings) read as a consistent row rather than
// a mix of "$0-$200/mo" and "Free (open weights) / API from $0.23/M input"
// truncating mid-phrase.
//
// The full original price_range is still shown on the tool's detail page
// and in the native tooltip on hover, so exact terms stay accessible.

export function shortenPrice(raw: string | undefined | null): string {
  if (!raw) return '';
  const s = String(raw).trim();
  if (!s) return '';

  // Already simple subscription range — normalize the unit and return.
  const subscription = s.match(
    /^(\$[0-9.]+(?:\s*[-–]\s*\$?[0-9.]+)?)\s*\/\s*(?:month|mo)\b/i,
  );
  if (subscription) return `${subscription[1]}/mo`;

  // "$X/mo" fragment buried in a longer string that STARTS with a price
  const monthly = s.match(
    /\$[0-9.]+(?:\s*[-–]\s*\$?[0-9.]+)?\s*\/\s*(?:month|mo)\b/i,
  );
  if (monthly && s.toLowerCase().startsWith('$')) {
    return monthly[0].replace(/month/i, 'mo');
  }

  const hasFree = /\bfree\b/i.test(s);
  const hasApi = /\bAPI\b|token|usage-based|\/M\b|\/1M\b/i.test(s);
  const hasOpen = /open[\s-]?(weights|source)/i.test(s);

  if (hasOpen && hasApi)  return 'Open source + API';
  if (hasOpen)            return 'Open source';
  if (hasFree && hasApi)  return 'Free · API extra';
  if (hasFree)            return 'Free';
  if (hasApi)             return 'API usage-based';

  // Fallback: strip parentheticals and collapse whitespace
  return s.replace(/\s*\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
}
