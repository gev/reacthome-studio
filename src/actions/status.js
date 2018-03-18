
import createAction from './create';
import { SERVICE, DISCOVERY_INTERVAL } from '../constants';

const timeout = {};
const set = createAction(SERVICE);

const offline = (id) => (dispatch) => {
  dispatch(set(id, { online: false }));
};

const online = (id, type, ip) => (dispatch) => {
  clearTimeout(timeout[id]);
  dispatch(set(id, { type, ip, online: true }));
  timeout[id] = setTimeout(() => {
    dispatch(offline(id));
    delete timeout[id];
  }, 3 * DISCOVERY_INTERVAL);
};

module.exports = { offline, online };
