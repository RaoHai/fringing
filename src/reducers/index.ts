import { combineReducers } from 'redux'
import { SET_CONFIG } from '../actions';

function configs(state = [0, 0], actions) {
  switch(actions.type) {
    case SET_CONFIG:
      return actions.config;
    default:
      return state;
  }
}

const flowApp = combineReducers({
  configs,
});

export default flowApp;