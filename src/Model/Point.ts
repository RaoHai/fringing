import V from 'victor';

export interface PointConfig {
  activeControllerId: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const pointConfig = {

};

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

const vectorMap = [
  /* tl */ new V(-1, 1),
  /* t  */ new V(0, 1),
  /* tr */ new V(1, 1),
  /* l  */ new V(-1, 0),
  /* r  */ new V(1, 0),
  /* bl */ new V(-1, -1),
  /* b  */ new V(0, -1),
  /* br */ new V(1, -1)
]

export default class Point {
  public x:number;
  public y:number;
  public width: number;
  public height: number;
  public activeControllerId: number;
  public vector: V;
  public radius: number;
  public vectorInvert: V;
  constructor(config:PointConfig) {
    this.width = config.width;
    this.height = config.height;
    this.activeControllerId = config.activeControllerId;
    this.radius = Math.sqrt(
      Math.pow(config.width / 2, 2) + Math.pow(config.height / 2, 2)
    );
    console.log('>> radius', this.radius);
    if (!config.activeControllerId) {
      this.x = config.x + config.width / 2;
      this.y = config.y + config.height / 2;
    } else {
      const positionFunction = controllerPointsMap[config.activeControllerId];
      const { x, y } = positionFunction(config);
      this.x = x;
      this.y = y;
      this.vector = vectorMap[config.activeControllerId];
      this.vectorInvert = this.vector.clone().invert();
    }
  }

  public setPosition(x:number, y:number) {
    this.x = x;
    this.y = y;
    return this;
  }
}
