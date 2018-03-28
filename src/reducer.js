
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { ACTION_ADD, ACTION_SET, SERVICE } from './constants';

const put = (type) => (state = [], action) => {
  switch (action.type) {
    case ACTION_ADD:
      if (type !== action.payload.type) return state;
      return [...state, action.payload.id];
    default:
      return state;
  }
};

const pool = (state = {}, { type, id, payload }) => {
  switch (type) {
    case ACTION_SET:
      return { ...state, [id]: { ...state[id], ...payload } };
    default:
      return state;
  }
};

export default combineReducers({
  [SERVICE]: put(SERVICE),
  routing,
  pool
});
