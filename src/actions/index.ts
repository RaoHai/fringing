export const SET_CONFIG = 'SET_CONFIG';

export function updateConfig(config) {
  return { type: SET_CONFIG, config };
}

export const INSERT_NODE = 'INSERT_NODE';
export const UPDATE_NODE_POSITION = 'UPDATE_NODE_POSITION';
export const UPDATE_NODE = 'UPDATE_NODE';
export const ADD_NODE_REF = 'ADD_NODE_REF';

export const UPDATE_ACTIVE_NODE = 'UPDATE_ACTIVE_NODE';
export const CLEAR_ACTIVE_NODE = 'CLEAR_ACTIVE_NODE';

export const UPDATE_TARGET_NODE = 'UPDATE_TARGET_NODE';
export const CLEAR_TARGET_NODE = 'CLEAR_TARGET_NODE';

export const ADD_CONNECTION = 'ADD_CONNECTION';

export const REGISTER_CANVAS_CONTAINER = 'REGISTER_CANVAS_CONTAINER';

// group
export const ADD_NODE_TO_GROUP = 'ADD_NODE_TO_GROUP';

export const BEGIN_CONNECTION = 'BEGIN_CONNECTION';
export const END_CONNECTION = 'END_CONNECTION';

// active link

export const SET_ACTIVE_LINK = 'SET_ACTIVE_LINK';
export const CLEAR_ACTIVE_LINK = 'CLEAR_ACTIVE_LINK';