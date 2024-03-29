
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { ACTION_SET } from './constants';

const pool = (state = {}, { type, id, payload }) => {
  switch (type) {
    case ACTION_SET:
      // const o = Object.assign({}, state);
      // o[id] = Object.assign({}, o[id], payload);
      // return o;
      return { ...state, [id]: { ...state[id], ...payload } };
    default:
      return state;
  }
};

export default combineReducers({ routing, pool });
