
import { Buffer } from 'buffer';
import { createSocket } from 'dgram';
import { ROOT, DAEMON } from './constants';
import { add, compare } from './actions';
import { peers } from './websocket/peer';
import connect from './websocket/connect';
import os from 'os';

const DISCOVERY = 'discovery';

const CLIENT_PORT = 2021;
const CLIENT_GROUP = '224.0.0.2';

const joins = new Set();

export default () => (dispatch) => {
  const socket = createSocket({ type: 'udp4', reuseAddr: true });
  socket.on('error', console.error);
  socket.on('message', (message, { address }) => {
    try {
      const { id, type, payload } = JSON.parse(Buffer.from(message));
      if (id && payload && type === DISCOVERY) {
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
    setInterval(() => {
      const ifaces = Object.values(os.networkInterfaces())
        .reduce((a, b) =>
          [...a,
          ...b.filter(i => !i.internal && i.family === 'IPv4')
            .map(i => i.address)
          ],
          []
        )

      ifaces.forEach(i => {
        if (!joins.has(i)) {
          socket.addMembership(CLIENT_GROUP, i)
          joins.add(i)
        }
      })
    }, 1000);
  })
  socket.bind(CLIENT_PORT);
};
