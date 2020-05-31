
import handle from './handle';
import { peers } from './peer';
import { LOCAL_PORT, REMOTE_URI } from './constants';
import { LIST } from '../init/constants';

const PROTOCOL = 'connect';

export default (id) => (dispatch, getState) => {
  if (peers.has(id)) {
    return;
  }

  const connect = () => {
    const { ip } = getState().pool[id] || {};
    connectTo(`ws://${ip}:${LOCAL_PORT}`);
    connectTo(`wss://${REMOTE_URI}/${id}`);
  };

  const connectTo = (uri) => {
    const ws = new WebSocket(uri, PROTOCOL);
    ws.onopen = () => {
      if (peers.has(id)) {
        ws.close();
        return;
      }
      ws.onmessage = dispatch(handle(id));
      ws.onclose = () => {
        console.log('close', id);
        if (peers.get(id) === ws) {
          peers.delete(id);
        }
      };
      peers.set(id, ws);
      ws.send(JSON.stringify({ type: LIST }));
    };
    ws.onerror = () => {
      if (peers.get(id) === ws) {
        peers.delete(id);
      }
    };
  };

  setInterval(() => {
    if (!peers.has(id)) {
      connect();
    }
  }, 5000);

  connect();
};
