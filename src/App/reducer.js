
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { ADD_APPS, REMOVE_APPS } from './constants';
import reducers from '../reducers';

function apps(state = [], action) {
  switch (action.type) {
    case ADD_APPS:
      return [
        { ...action.apps }, ...state.filter(i => i.host !== action.apps.host)
      ].sort((a, b) => a.id > b.id);
    case REMOVE_APPS:
      return state.filter(i => i.host !== action.host);
    default:
      return state;
  }
}

export default combineReducers({ ...reducers, apps, routing });

