
import { createSocket } from 'dgram';
import { online } from './status';
import { applyAction } from './create';
import { ACTION_DISCOVERY, ACTION_GET_STATE, DEVICE, STATE, SERVICE } from '../constants';

const socket = createSocket('udp4');

const send = (action, port, ip) => {
  socket.send(JSON.stringify(action), port, ip);
};

export default ({ sid, action }, port, ip) => (dispatch, getState) => {
  const { id, payload } = action;
  switch (action.type) {
    case ACTION_DISCOVERY: {
      const { type, version } = payload;
      const prev = getState()[SERVICE][id];
      if (!prev || !prev.online) {
        send({ type: ACTION_GET_STATE }, port, ip);
      }
      dispatch(online(id, type, version, ip, port));
      break;
    }
    case STATE:
    case DEVICE:
      dispatch(applyAction(action));
      break;
    default:
      console.log(action);
  }
};
