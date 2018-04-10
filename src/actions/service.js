
import { createSocket } from 'dgram';
import { online } from './status';
import {
  ACTION_DISCOVERY,
  ACTION_GET, POOL,
  ACTION_SET,
} from '../constants';
import { set } from './create';

const socket = createSocket('udp4');

const send = (action, port, ip) => {
  socket.send(JSON.stringify(action), port, ip);
};

export const dispatchAction = (action, port, ip) => (dispatch, getState) => {
  const { id, payload } = action;
  switch (action.type) {
    case ACTION_DISCOVERY: {
      const { type, version } = payload;
      const service = getState()[POOL][id];
      if (!service || !service.online) {
        send({ type: ACTION_GET }, port, ip);
      }
      dispatch(online(id, type, version, ip, port));
      break;
    }
    case ACTION_SET: {
      dispatch(set(id, payload));
      break;
    }
    default:
      console.log(action);
  }
};

export const request = (id, action) => (dispatch, getState) => {
  const service = getState()[POOL][id];
  send(action, service.port, service.ip);
};
