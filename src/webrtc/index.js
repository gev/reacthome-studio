/* eslint-disable default-case */

import { LOCAL_PORT, REMOTE_URI, OFFER, CANDIDATE, CONNECTED, FAILED, ICE, options, ACTION, ASSET } from './constants';
import { onAction, onAsset } from './handle';
import { channels } from './send';
import signal from './signal';

const TIMEOUT = 10000;

export default (id) => (dispatch, getState) => {
  const connect = () => {
    const peer = new RTCPeerConnection(ICE);

    const action = peer.createDataChannel(ACTION, { ordered: true });
    action.onmessage = ({ data }) => dispatch(onAction(data));
    action.onerror = connect;

    const asset = peer.createDataChannel(ASSET, { ordered: true });
    asset.onmessage = ({ data }) => dispatch(onAsset(data));
    asset.onerror = connect;

    peer.onconnectionstatechange = () => {
      console.warn(peer.connectionState);
      switch (peer.connectionState) {
        case CONNECTED: {
          channels.set(id, { action, asset });
          break;
        }
        case FAILED: {
          channels.delete(id);
          connect();
          break;
        }
      }
    };

    const { ip } = getState().pool[id];
    const localURI = `ws://${ip}:${LOCAL_PORT}`;
    const remoteURI = `wss://${REMOTE_URI}/${id}`;

    signal(id, localURI, remoteURI, peer)
      .then((ws) => {
        peer.onicecandidate = ({ candidate }) => {
          if (!candidate) return;
          console.warn(candidate);
          ws.send(JSON.stringify({ type: CANDIDATE, candidate }));
        };
        peer.createOffer(options)
          .then(offer => peer.setLocalDescription(offer))
          .then(() => {
            ws.send(JSON.stringify({ type: OFFER, jsep: peer.localDescription }));
          })
          .catch(connect);
      })
      .catch(() => {
        setTimeout(connect, TIMEOUT);
      });
  };

  connect();
};

export { sendAction } from './send';
