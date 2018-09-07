
import { add, set } from './create';
import { DISCOVERY_INTERVAL, DAEMON, ROOT } from '../constants';

const timeout = {};

export const offline = (id) => (dispatch) => {
  dispatch(set(id, { online: false }));
};

export const online = (id, type, version, ip, port) => (dispatch) => {
  clearTimeout(timeout[id]);
  dispatch(set(id, {
    type, version, ip, port, online: true
  }));
  timeout[id] = setTimeout(() => {
    dispatch(offline(id));
    delete timeout[id];
  }, 5 * DISCOVERY_INTERVAL);
  dispatch(add(ROOT, DAEMON, id));
};
