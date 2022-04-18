
import handle from './handle';
import { peers } from './peer';
import { LOCAL_PORT, REMOTE_URI } from './constants';
import { LIST } from '../init/constants';
import { offline, online } from './online';

const PROTOCOL = 'connect';

let queue = [];

setInterval(() => { 
  const q = queue;
  q.forEach(({ dispatch, id, data }) => {
    dispatch(handle(id))(data);
  })
  queue = [];
}, 200);


export default (id) => (dispatch, getState) => {

  if (peers.has(id)) {
    return;
  }

  const connect = () => {

		const { ip } = getState().pool[id] || {};
		if (ip) {
     connectTo(`ws://${ip}:${LOCAL_PORT}`, true);
		}
    connectTo(`wss://${REMOTE_URI}/${id}`, false);
  };

  const connectTo = (uri, local) => {
    const ws = new WebSocket(uri, PROTOCOL);
    ws.onopen = () => {
      if (peers.has(id)) {
        if (local) {
          peers.get(id).close();
        } else {
          ws.close();
          return;
        }
      }
      ws.onmessage = (data) => {
        queue.push({ dispatch, id, data });
      }
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

  setInterval(() => {
    if (!peers.has(id)) {
      connect();
    }
  }, 5000);

  connect();
};
