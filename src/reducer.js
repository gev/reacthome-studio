
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { DEVICE, STATE, SERVICE } from './constants';

const reduce = (action) => (state = {}, { type, id, payload }) => (
  action === type ? { ...state, [id]: { ...state[id], ...payload } } : state
);

export default combineReducers({
  [SERVICE]: reduce(SERVICE),
  [DEVICE]: reduce(DEVICE),
  [STATE]: reduce(STATE),
  routing
});
