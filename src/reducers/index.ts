import * as Redux from 'redux';
import { Map } from 'immutable';
const { combineReducers } = Redux;
import {
  SET_CONFIG,

  INSERT_NODE, UPDATE_NODE, UPDATE_NODE_POSITION,

  UPDATE_ACTIVE_NODE, CLEAR_ACTIVE_NODE,

  UPDATE_TARGET_NODE, CLEAR_TARGET_NODE,

  ADD_CONNECTION,
} from '../actions/index';


function nodes(state = Map([]), actions) {
  switch (actions.type) {
    case INSERT_NODE:
      return state.set(actions.data.id, actions.data);
    case UPDATE_NODE_POSITION:
      const { id, x, y } = actions;
      const node = state.get(id);
      return state.set(id, Object.assign({}, node, { x, y}));
    default:
      return state;
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
      console.log('>> updateActiveNode', actions.data);
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
        // 如果 A 和 B 之间已存在连线, 则不做任何处理
        if (state.find( item => item.source.id === actions.source.id) && state.find( item => item.target.id === actions.target.id) ) {
          return state;
        }
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
  nodes,
  connections,
  configs,
  activeNode,
  targetNode,
  eventListeners,
});
