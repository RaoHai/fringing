export const SET_CONFIG = 'SET_CONFIG';

export function updateConfig(config) {
  return { type: SET_CONFIG, config };
}

export const INSERT_NODE = 'INSERT_NODE';
export const UPDATE_NODE = 'UPDATE_NODE';

export const UPDATE_ACTIVE_NODE = 'UPDATE_ACTIVE_NODE';
