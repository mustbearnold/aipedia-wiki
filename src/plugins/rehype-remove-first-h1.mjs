import { visit, SKIP } from 'unist-util-visit';

export function rehypeRemoveFirstH1() {
  return (tree) => {
    let found = false;
    visit(tree, 'element', (node, index, parent) => {
      if (!found && node.tagName === 'h1' && parent && typeof index === 'number') {
        parent.children.splice(index, 1);
        found = true;
        return [SKIP, index];
      }
    });
  };
}
