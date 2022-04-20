
import handle from './handle';
import { peers } from './peer';
import { LOCAL_PORT, REMOTE_URI } from './constants';
import { LIST } from '../init/constants';
import { offline, online } from './online';

const PROTOCOL = 'connect';

export default (id, ip) => (dispatch) => {

  if (peers.has(id)) {
    return;
  }

  const uri = ip
    ? `ws://${ip}:${LOCAL_PORT}`
    : `wss://${REMOTE_URI}/${id}`;

  const connect = () => {
    console.log(`connecting to ${uri}`);
    const ws = new WebSocket(uri, PROTOCOL);
    ws.onopen = () => {
      console.log(`connected to ${uri}`);
      if (peers.has(id)) {
        if (ip) {
          peers.get(id).close();
        } else {
          ws.close();
          return;
        }
      }
      ws.onmessage = dispatch(handle(id));
      ws.onclose = () => {
        if (peers.get(id) === ws) {
          peers.delete(id);
          dispatch(offline(id));
        }
      };
      peers.set(id, ws);
      ws.send(JSON.stringify({ type: LIST }));
      dispatch(online(id));
    };
    // ws.onerror = console.error;
  };

  if (!ip) {
    setInterval(() => {
      if (!peers.has(id)) {
        connect();
      }
    }, 5000);
  }

  connect();
};
