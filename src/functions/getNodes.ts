import { Map } from 'immutable';

export default function getNodes(data) {
  const nodeMap = {};
  const linkMap = {};
  const currentData = data;

  function readNode(node, parent = null) {
    nodeMap[node.id] = node;

    if (parent) {
      if (!linkMap[parent.id]) {
        linkMap[parent.id] = [];
      }
      linkMap[parent.id].push({
        source: parent,
        target: node,
      });
      parent.__outDegree += 1;
      parent.children.push(node);
      node.__inDegree += 1;
    }

    if (node.children && node.children.length) {
      node.children.forEach(child => {
        readNode(child, node);
      });
    }
  }

  readNode(data);

  return {
    nodes: Map(nodeMap),
    links: Map(linkMap),
  };
}
