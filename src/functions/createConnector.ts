import { SET_CONFIG, INSERT_NODE, UPDATE_NODE } from '../actions';
export default function createSourceConnector({ container , collect, props }) {
  const collectResult = collect();
  const { getNodeData } = collectResult;
  const nodeData = getNodeData(props);
  container.addNode(nodeData);
  // container.addNode()
  console.log('>> createSourceConnector', container);
  const hooks = {
    getNode() {
      const { id } = getNodeData(props);
      return container.getNode(id);
    },
    getPosition() {

    },
    updatePosition() {

    },

    activeNode(id) {
      console.log('>> activeNode', container);
      container.activeNode(id);
    },

    isActive(id) {
      return container.isActive(id);
    },
  };
  return {
    hooks: Object.assign(collectResult, hooks),
  };

}
