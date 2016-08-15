const controllerPointsMap =  [
  /* tl */ (node) => ({ x: node.x - node.width / 2, y: node.y - node.height / 2}),
  /* t  */ (node) => ({ x: node.x, y: node.y - node.height / 2}),
  /* tr */ (node) => ({ x: node.x + node.width / 2, y : node.y - node.height / 2}),
  /* l  */ (node) => ({ x: node.x - node.width / 2, y : node.y }),
  /* r  */ (node) => ({ x: node.x + node.width / 2, y : node.y }),
  /* bl */ (node) => ({ x: node.x - node.width / 2, y : node.y + node.height / 2}),
  /* b  */ (node) => ({ x: node.x, y: node.y + node.height / 2}),
  /* br */ (node) => ({ x: node.x + node.width / 2, y : node.y + node.height / 2}),
];


export default function getControllerPosition(node) {
  if (!node.activeControllerId) {
    return {
      x: node.x,
      y: node.y
    };
  }
  const positionFunction = controllerPointsMap[node.activeControllerId];
  return positionFunction(node);
}
