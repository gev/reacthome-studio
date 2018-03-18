
import { createSocket } from 'dgram';
import { contains } from 'fast-deep-equal';
import { APPLICATION_PORT, ACTION_DISCOVERY, DEVICE, SERVICE, DISCOVERY_INTERVAL } from '../constants';
import createAction from './actions';

const timeout = {};
const socket = createSocket('udp4');

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


const send = (ip, action) => {
  socket.send(JSON.stringify(action), APPLICATION_PORT);
};

const apply = (action) => (dispatch, getState) => {
  const { type, id, payload } = action;
  if (contains(getState()[type][id], payload)) return;
  dispatch(action);
  send(action);
};

export default (type) => (id, payload) => apply({ type, id, payload });

export const dispatchAction = (action) => (dispatch) => {
  switch (action.type) {
    case ACTION_DISCOVERY: {
      break;
    }
    case DEVICE:
      dispatch(apply(action));
      break;
    default:
      console.log(action);
  }
};
