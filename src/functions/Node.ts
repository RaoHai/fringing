export default class Node {
  public x: number;
  public y: number;
  public id: number;
  public activeControllerId: number;
  public width: number;
  public height: number;
  static pointMap = {
    't': 1,
    'l': 3,
    'r': 4,
    'b': 6,
  }
  static valueMap = {
    '1': 't',
    '3': 'l',
    '4': 'r',
    '6': 'b',
  }
  constructor(data) {
    Object.assign(this, data);
    this.x = data.x || 0;
    this.y = data.y || 0;
    this.activeControllerId = null;
  }
}