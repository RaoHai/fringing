export const SET_CONFIG = 'SET_CONFIG';

export function updateConfig(config) {
  return { type: SET_CONFIG, config };
}
