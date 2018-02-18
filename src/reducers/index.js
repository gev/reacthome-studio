
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import apps from './apps';

export default combineReducers({ apps, routing });

