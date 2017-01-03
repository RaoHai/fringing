import { Node } from '../definitions/index';
import hierarchyVisitAfter from './hierarchyVisitAfter';

function separation(left: Node, right: Node) {
  return left.parent === right.parent ? 1 : 2;
}

function clusterX(children: Array<Node>) {
  return children.reduce((x, child) => x + child.x, 0) / children.length;
}


function clusterLeft(node: Node) {
    const children = node.children;
    return children && children.length ? clusterLeft(children[0]) : node;
}

function clusterRight(node: Node) {
  const children = node.children;
  return children && children.length ? clusterRight(children[children.length - 1]) : node;
}

export default function parseData(root: Node) {
  let maxDeep = 0;
  let previousNode = null;
  let x = 0;

  hierarchyVisitAfter(root, (node) => {
    const children = node.children;
    if (children && children.length) {
      node.x = clusterX(children);
      node.y = node.__level__ * 1;
      maxDeep = Math.max(maxDeep, node.__level__ + 1);
      // console.log('>> maxDeep', node);
    } else {
      node.x = previousNode ? x += separation(node, previousNode) : 0;
      node.y = node.__level__ * 1;
      previousNode = node;
    }
  });

  const left = clusterLeft(root);
  const right = clusterRight(root);
  const x0 = left.x - separation(left, right) / 2;
  const x1 = right.x + separation(right, left) / 2;

  const size = [(x1 - x0)  * 42, 600];

  hierarchyVisitAfter(root, (node) => {
    node.x = (node.x - x0) / (x1 - x0) * size[0];
    node.y = (node.y ? node.y / maxDeep : 0) * size[1] + 50;
  });

  return {
    data: root,
    size,
  };
}
