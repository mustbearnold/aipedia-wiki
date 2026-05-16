/**
 * rehype-collapse-sections
 *
 * For each H2 whose text matches a "low priority" reference section,
 * wrap the section (the H2 plus everything until the next H2) in a
 * <details> element with the H2 text as the <summary>.
 *
 * Reasoning: tool/category/comparison pages render long markdown
 * bodies in May 2026. Readers want a decision sheet with reference
 * appendices, not a 3000-word article. Default-open sections stay
 * inline; this plugin collapses the dense reference content (Recent
 * developments, Failure modes, Methodology, FAQ, Sources, Related,
 * Pricing history, Key facts table, etc.) into accordions.
 *
 * Matches on heading text (case-insensitive, normalized prefix) because
 * Astro's heading slug IDs are not yet attached when user rehype plugins
 * run. We also derive an id from the heading text so anchor navigation
 * and JSON-LD FAQ refs continue to resolve.
 */

const COLLAPSIBLE_TEXT_PREFIXES = [
  'recent developments',
  'recent changes',
  'what changed recently',
  'system verdict',          // redundant with the Quick Answer card above
  'failure modes',
  'methodology',
  'faq',
  'frequently asked questions',
  'sources',
  'related',
  'top alternatives',
  'price history',
  'key facts',
];

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function getTextContent(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value ?? '';
  if (!node.children) return '';
  return node.children.map(getTextContent).join('');
}

function shouldCollapseByText(text) {
  const normalized = String(text ?? '').toLowerCase().trim();
  return COLLAPSIBLE_TEXT_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

function isH2(node) {
  return node && node.type === 'element' && node.tagName === 'h2';
}

export default function rehypeCollapseSections() {
  return (tree) => {
    if (!tree || !Array.isArray(tree.children)) return;
    const out = [];
    let i = 0;
    while (i < tree.children.length) {
      const node = tree.children[i];
      if (isH2(node)) {
        const text = getTextContent(node);
        if (shouldCollapseByText(text)) {
          // Collect everything until the next H2 (or end of tree).
          const sectionBody = [];
          let j = i + 1;
          while (j < tree.children.length && !isH2(tree.children[j])) {
            sectionBody.push(tree.children[j]);
            j++;
          }

          const id = slugify(text);
          // Ensure the original H2 carries the id so deep-links work.
          if (!node.properties) node.properties = {};
          if (!node.properties.id) node.properties.id = id;
          node.properties.className = [
            ...(Array.isArray(node.properties.className) ? node.properties.className : []),
            'gt-section-collapse-heading',
          ];

          const detailsNode = {
            type: 'element',
            tagName: 'details',
            properties: {
              className: ['gt-section-collapse'],
              'data-section-id': id,
            },
            children: [
              {
                type: 'element',
                tagName: 'summary',
                properties: { className: ['gt-section-collapse-summary'] },
                children: [node],
              },
              ...sectionBody,
            ],
          };

          out.push(detailsNode);
          i = j;
          continue;
        }
      }
      out.push(node);
      i++;
    }
    tree.children = out;
  };
}
