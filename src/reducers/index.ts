import * as Redux from 'redux';
import { Map, Set } from 'immutable';
const { combineReducers } = Redux;
import {
  SET_CONFIG,

  INSERT_NODE, UPDATE_NODE, UPDATE_NODE_POSITION, ADD_NODE_REF,

  UPDATE_ACTIVE_NODE, CLEAR_ACTIVE_NODE,

  UPDATE_TARGET_NODE, CLEAR_TARGET_NODE,

  ADD_CONNECTION,

  REGISTER_CANVAS_CONTAINER,

  ADD_NODE_TO_GROUP,

  BEGIN_CONNECTION, END_CONNECTION,

  SET_ACTIVE_LINK, CLEAR_ACTIVE_LINK,
} from '../actions/index';


function groups(state = Map([]), { type, payload = {}}) {
  const { groupId, node } = payload;
  switch(type) {
    case ADD_NODE_TO_GROUP:
      const group = state.get(groupId) || new Set([]);
      group.add(node.id);
      return state.set(groupId, group);
    default:
      return state;
  }
}

function nodes(state = Map([]), {type, payload = {}}) {
  const { id, x, y, element, data, height, width } = payload;
  const node = state.get(id);
  switch (type) {
    case INSERT_NODE:
      return state.set(id, data);
    case UPDATE_NODE_POSITION:
      return state.set(id, Object.assign({}, node, { x, y}));
    case ADD_NODE_REF:
      return state.set(id, Object.assign({}, node, { element, height, width }));
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

function eventProxy(state = {domContainer : null, canvasContainer: null}, actions) {
  switch (actions.type) {
    case REGISTER_CANVAS_CONTAINER:
      return Object.assign({}, state, {canvasContainer: actions.container });
    default:
      return state;
  }
}

function activeLink( state = null, actions) {
  switch (actions.type) {
    case SET_ACTIVE_LINK:
      return actions.id;
    case CLEAR_ACTIVE_LINK:
      return null;
    default:
      return state;
  }
}

export default combineReducers({
  nodes,
  groups,
  configs,
  activeNode,
  targetNode,
  activeLink,
  eventListeners,
  eventProxy,
});
