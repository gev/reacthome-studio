
import { Buffer } from 'buffer';
import { createSocket } from 'dgram';
import { ROOT, DAEMON } from './constants';
import { add, set } from './actions';

const DISCOVERY = 'discovery';

const CLIENT_PORT = 2021;
const CLIENT_GROUP = '224.0.0.2';

export default () => (dispatch, getState) => {
  const socket = createSocket('udp4');
  socket.on('error', console.error);
  socket.on('message', (message, { address }) => {
    try {
      const { id, type, payload } = JSON.parse(Buffer.from(message));
      if (type === DISCOVERY) {
        payload.ip = address;
        if (!getState().pool[id]) {
          dispatch(set(id, payload));
          dispatch(add(ROOT, DAEMON, id));
        }
      }
    } catch (e) {
      console.error(e);
    }
  });
  socket.once('listening', () => {
    socket.addMembership(CLIENT_GROUP);
  });
  socket.bind(CLIENT_PORT);
};
