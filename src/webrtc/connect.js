/* eslint-disable default-case */

import { LOCAL_PORT, REMOTE_URI, OFFER, CANDIDATE, ACTION, ASSET } from './constants';
import { actions, assets, peers } from './peer';
import { onAction, onAsset } from './handle';
import { ICE, options } from './config';
import { offline } from './online';
import signal from './signal';

const TIMEOUT = 10000;

export default (id) => (dispatch, getState) => {
  if (peers.has(id)) return;
  dispatch(offline(id));
  const connect = () => {
    const peer = new RTCPeerConnection(ICE);
    peer.onerror = console.warn;
    peers.set(id, peer);

    const action = peer.createDataChannel(ACTION, { ordered: true });
    action.onmessage = ({ data }) => dispatch(onAction(data, id));
    action.onerror = connect;
    action.onopen = () => {
      console.log('Open action channel');
    };

    const asset = peer.createDataChannel(ASSET, { ordered: true });
    asset.onmessage = ({ data }) => dispatch(onAsset(data, id));
    asset.onerror = connect;
    asset.onopen = () => {
      console.log('Open asset channel');
    };

    actions.set(id, action);
    assets.set(id, asset);

    const { ip } = getState().pool[id];
    const localURI = `ws://${ip}:${LOCAL_PORT}`;
    const remoteURI = `wss://${REMOTE_URI}/${id}`;

    signal(id, localURI, remoteURI, peer)
      .then((ws) => {
        peer.onicecandidate = ({ candidate }) => {
          if (!candidate) return;
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

export { sendAction } from './peer';
