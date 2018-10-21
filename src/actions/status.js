
import { add, set } from './create';
import { DISCOVERY_INTERVAL, DAEMON, ROOT } from '../constants';

const timeout = {};

export const offline = (id) => (dispatch) => {
  dispatch(set(id, { online: false, multicast: false }));
};

export const online = (id, type, version, ip, port, multicast) => (dispatch) => {
  clearTimeout(timeout[id]);
  dispatch(set(id, {
    type, version, ip, port, multicast, online: true
  }));
  timeout[id] = setTimeout(() => {
    dispatch(offline(id));
    delete timeout[id];
  }, 3 * DISCOVERY_INTERVAL);
  dispatch(add(ROOT, DAEMON, id));
};
