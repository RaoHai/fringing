import { Node } from '../definitions/index';

export default function hierarchyVisitAfter(node: Node, callback) {
  const nodes = [node];
  const nodes2 = [];

  while (nodes.length) {
    const currentNode = nodes.pop();
    currentNode.__level__ = currentNode.parent ? currentNode.parent.__level__ + 1 : 0;
    nodes2.push(currentNode);
    if (currentNode.children && currentNode.children.length) {
      for (let i = 0; i < currentNode.children.length; i++) {
        currentNode.children[i].parent = currentNode;
        nodes.push(currentNode.children[i]);
      }
    }
  }
  while (nodes2.length) {
    callback(nodes2.pop());
  }
}
