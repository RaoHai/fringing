import * as Redux from 'redux';
const { combineReducers } = Redux;
import {
  SET_CONFIG,

  INSERT_NODE, UPDATE_NODE,

  UPDATE_ACTIVE_NODE, CLEAR_ACTIVE_NODE,

  UPDATE_TARGET_NODE, CLEAR_TARGET_NODE,

  ADD_CONNECTION,
} from '../actions/index';

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


function activeNode(state = null, actions) {
  switch (actions.type) {
    case UPDATE_ACTIVE_NODE:
      return Object.assign({}, actions.data);
    case CLEAR_ACTIVE_NODE:
      return null;
    default:
      return state;
  }
}

function targetNode(state = null, actions) {
  switch (actions.type) {
    case UPDATE_TARGET_NODE:
      return Object.assign({}, actions.data);
    case CLEAR_TARGET_NODE:
      return null;
    default:
      return state;
  }
}

function eventListeners(state = {}, actions) {
  switch (actions.type) {
    case 'ADD_EVENT_LISTENER':
      console.log('actions', actions);
      const newState = Object.assign({}, state);
      const listeners = state[actions.eventName] || [];
      listeners.push({
        handler: actions.eventHandler,
        enable: true,
      });
      newState[actions.eventName] = listeners;
      return newState;
    case 'REMOVE_ADD_LISTENER':
      return newState;
    default:
      return state;
  }
}

function connections(state = [], actions) {
    switch (actions.type) {
      case ADD_CONNECTION:
        state.push({
          source: actions.source,
          target: actions.target
        });
        return state.slice();
      default:
        return state;
    }
}

export default combineReducers({
  connections,
  configs,
  activeNode,
  targetNode,
  eventListeners,
});
