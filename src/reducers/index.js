
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import devices from './devices';
import apps from './apps';

export default combineReducers({
  apps, devices, routing
});
