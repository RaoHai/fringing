import { Map } from 'immutable';

class Node {
  public x: number;
  public y: number;
  public id: number;
  public activeControllerId: number;
  public width: number;
  public height: number;
  constructor(data) {
    Object.assign(this, data);
    this.x = data.x || 0;
    this.y = data.y || 0;
    this.activeControllerId = null;
  }
}
export default class DataStructureManager {

  private nodes: Map;
  private _activeNode: number;

  constructor() {
    console.log('>> DataStructureManager custructor');
    this.nodes = new Map([]);
  }

  addNode(_node) {
    const node = new Node(_node);
    this.nodes = this.nodes.set(node.id, node);
  }

  getNode(id) {
    return this.nodes.get(id);
  }

  updateNodePosition(id, { x, y}) {
    const node = this.nodes.get(id);
    this.nodes = this.nodes.set(id,
      Object.assign(node, { x, y})
    );
  }

  activeNode(id) {
    this._activeNode = id;
  }

  isActive(id) {
    return id === this._activeNode;
  }
}
