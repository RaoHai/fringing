import * as v2d from 'vector2d';
const { Float32Vector } = v2d;

export interface PointConfig {
  activeControllerId: number;
  x: number,
  y: number,
  width: number,
  height: number,
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
  /* tl */ Float32Vector(-1, 1),
  /* t  */ Float32Vector(0, 1),
  /* tr */ Float32Vector(1, 1),
  /* l  */ Float32Vector(-1, 0),
  /* r  */ Float32Vector(1, 0),
  /* bl */ Float32Vector(-1, -1),
  /* b  */ Float32Vector(0, -1),
  /* br */ Float32Vector(1, -1)
]
type Float32Vector = Float32Vector;

export default class Point {
  public x:number;
  public y:number;
  public width: number;
  public height: number;
  public activeControllerId: number;
  public vector: Float32Vector;
  public vectorRevert: Float32Vector;
  constructor(config:PointConfig) {
    this.width = config.width;
    this.height = config.height;
    this.activeControllerId = config.activeControllerId;

    if (!config.activeControllerId) {
      this.x = config.x + config.width / 2;
      this.y = config.y + config.height / 2;
    } else {
      const positionFunction = controllerPointsMap[config.activeControllerId];
      const {x, y} = positionFunction(config);
      this.x = x;
      this.y = y;
      this.vector = vectorMap[config.activeControllerId];
      this.vectorRevert = this.vector.clone().reverse();
    }

  }
}
