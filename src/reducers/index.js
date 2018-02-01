// @flow

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import context from './context';
import pool from './pool';

export default combineReducers({
  routing, context, pool
});
