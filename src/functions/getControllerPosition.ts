const controllerPointsMap =  [
  /* tl */ (node) => ({ x: node.x, y: node.y}),
  /* t  */ (node) => ({ x: node.x + node.width / 2, y: node.y}),
  /* tr */ (node) => ({ x: node.x + node.width , y : node.y}),
  /* l  */ (node) => ({ x: node.x, y : node.y + node.height / 2}),
  /* r  */ (node) => ({ x: node.x + node.width, y : node.y + node.height / 2}),
  /* bl */ (node) => ({ x: node.x, y : node.y + node.height}),
  /* b  */ (node) => ({ x: node.x + node.width / 2, y: node.y + node.height}),
  /* br */ (node) => ({ x: node.x + node.width, y : node.y + node.height}),
];


export default function getControllerPosition(node) {
  if (!node.activeControllerId) {
    return {
      x: node.x + node.width / 2,
      y: node.y + node.height / 2,
    };
  }
  const positionFunction = controllerPointsMap[node.activeControllerId];
  return positionFunction(node);
}
