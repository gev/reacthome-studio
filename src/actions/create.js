
import { createSocket } from 'dgram';
import { contains } from 'fast-deep-equal';
import { APPLICATION_PORT, ACTION_DISCOVERY, DEVICE } from '../constants';

export default (type) => (id, payload) => apply({ type, id, payload });

const socket = createSocket('udp4');

const send = (ip, action) => {
  socket.send(JSON.stringify(action), APPLICATION_PORT);
};

const apply = (action) => (dispatch, getState) => {
  const { type, id, payload } = action;
  const prev = getState()[type][id];
  if (prev && contains(prev, payload)) return;
  dispatch(action);
};

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
