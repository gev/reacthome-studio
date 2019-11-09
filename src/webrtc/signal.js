/* eslint-disable default-case */

import { onSignal } from './handle';

const PROTOCOL = 'connect';

export const socket = new Map();

export default (id, localURI, remoteURI) => new Promise((resolve, reject) => {
  if (socket.has(id)) {
    resolve(socket.get(id));
    return;
  }
  const handle = onSignal(id);
  const connect = (uri) => {
    const ws = new WebSocket(uri, PROTOCOL);
    ws.onopen = () => {
      if (socket.has(id)) {
        ws.close();
        resolve(socket.get(id));
        return;
      }
      ws.onmessage = handle;
      ws.onclose = () => {
        socket.delete(id);
      };
      socket.set(id, ws);
      resolve(ws);
    };
    ws.onerror = reject;
  };
  connect(localURI);
  connect(remoteURI);
});
