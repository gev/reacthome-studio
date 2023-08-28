
import { Buffer } from 'buffer';
import { createSocket } from 'dgram';
import { ROOT, DAEMON } from './constants';
import { add, compare } from './actions';
import { peers } from './websocket/peer';
import connect from './websocket/connect';

const DISCOVERY = 'discovery';

const CLIENT_PORT = 2021;
const CLIENT_GROUP = '224.0.0.2';
const TIMEOUT = 10000;

export default () => (dispatch) => {
  const socket = createSocket({ type: 'udp4', reuseAddr: true });
  socket.on('error', console.error);
  socket.on('message', (message, { address }) => {
    try {
      const { id, type, payload } = JSON.parse(Buffer.from(message));
      if (type === DISCOVERY) {
        delete payload.online;
        dispatch(compare(id, payload));
        dispatch(add(ROOT, DAEMON, id));
        if (!peers.has(id)) {
          dispatch(connect(id, address));
        }
      }
    } catch (e) {
      console.error(e);
    }
  });
  socket.on('listening', () => {
    socket.addMembership(CLIENT_GROUP);
  })
  socket.bind(CLIENT_PORT);
  setInterval(() => {
    socket.send(JSON.stringify({
      type: DISCOVERY,
    }), CLIENT_PORT, CLIENT_GROUP);
  }, TIMEOUT);
};
