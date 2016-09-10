import { INSERT_NODE } from '../actions/index';

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

export default function createSourceConnector({ store , collect, props }) {
  const collectResult = collect();
  const { getNodeData } = collectResult;
  const nodeData = getNodeData(props);

  store.dispatch({
    type: INSERT_NODE,
    payload: {
      id: nodeData.id,
      data: new Node(nodeData),
    }
  });

  const hooks = {
    getNode() {
      const { id } = getNodeData(props);
      return store.getState().nodes.get(id);
    },
  };
  return {
    hooks: Object.assign(collectResult, hooks),
  };

}
