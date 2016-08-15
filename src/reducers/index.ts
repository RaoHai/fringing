import { combineReducers } from 'redux';
import { SET_CONFIG, INSERT_NODE, UPDATE_NODE, UPDATE_ACTIVE_NODE } from '../actions';
import { Map } from 'immutable';

class Node {
  public x: number;
  public y: number;
  public id: number;
  constructor(data) {
    Object.assign(this, data);
    this.x = data.x || 0;
    this.y = data.y || 0;
  }
  update(data) {
    Object.assign(this, data);
  }
}

function configs(state = {}, actions) {
  switch (actions.type) {
    case SET_CONFIG:
      return actions.config;
    default:
      return state;
  }
}

function nodes(state = {}, actions) {
  switch (actions.type) {
    case INSERT_NODE:
      state[actions.data.id] = new Node(actions.data);
      return state;
    case UPDATE_NODE:
      const node = state[actions.data.id];
      node.update(actions.data);
      return node;
    default:
      return state;
  }
}

function activeNode(state = 0, actions) {
  switch (actions.type) {
    case UPDATE_ACTIVE_NODE:
      return actions.id;
    default:
      return state;
  }
}

const flowApp = combineReducers({
  configs,
  nodes,
  activeNode,
});

export default flowApp;
