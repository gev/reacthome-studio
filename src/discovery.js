
import { Buffer } from 'buffer';
import { createSocket } from 'dgram';
import { ROOT, DAEMON } from './constants';
import { add, set } from './actions';
import { peers } from './websocket/peer';
import connect from './websocket/connect';

const DISCOVERY = 'discovery';

const CLIENT_PORT = 2021;
const CLIENT_GROUP = '224.0.0.2';
const TIMEOUT = 1000;

export default () => (dispatch) => {
  const socket = createSocket('udp4');
  socket.on('error', console.error);
  socket.on('message', (message, { address }) => {
    try {
      const { id, type, payload } = JSON.parse(Buffer.from(message));
      if (type === DISCOVERY) {
        if (!peers.has(id)) {
          dispatch(connect(id));
        }
        payload.ip = address;
        delete payload.online;
        //dispatch(set(id, payload));
        //dispatch(add(ROOT, DAEMON, id));
      }
    } catch (e) {
      console.error(e);
    }
  });
  setInterval(() => {
    socket.send(JSON.stringify({
      type: DISCOVERY,
    }), CLIENT_PORT, CLIENT_GROUP);
  }, TIMEOUT);
};
