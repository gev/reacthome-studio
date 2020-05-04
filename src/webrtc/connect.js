/* eslint-disable default-case */

import {
  LOCAL_PORT, REMOTE_URI, OFFER, CANDIDATE, ACTION, ASSET, CONNECTED, DISCONNECTED,
} from './constants';
import { onAction, onAsset } from './handle';
import { actions, assets, peers } from './peer';
import { ICE, options } from './config';
import { online, offline } from './online';
import signal from './signal';

const TIMEOUT = 5000;

export default (id) => (dispatch, getState) => {
  const connect = async () => {
    try {
      const { ip } = getState().pool[id] || {};
      const localURI = `ws://${ip}:${LOCAL_PORT}`;
      const remoteURI = `wss://${REMOTE_URI}/${id}`;

      dispatch(offline(id));

      const ws = await signal(id, localURI, remoteURI);
      const peer = new RTCPeerConnection(ICE);
      peers.set(id, peer);

      peer.onconnectionstatechange = () => {
        console.warn(peer.connectionState);
        switch (peer.connectionState) {
          case CONNECTED:
            dispatch(online(id));
            break;
          case DISCONNECTED:
            connect();
            break;
        }
      };

      const action = peer.createDataChannel(ACTION, { id: 1, ordered: true });
      action.onmessage = dispatch(onAction(id));

      actions.set(id, action);

      const asset = peer.createDataChannel(ASSET, { id: 3, ordered: true });
      asset.onmessage = dispatch(onAsset(id));

      assets.set(id, asset);

      peer.onicecandidate = ({ candidate }) => {
        if (!candidate) return;
        ws.send(JSON.stringify({ type: CANDIDATE, candidate }));
      };

      const offer = await peer.createOffer(options);
      await peer.setLocalDescription(offer);
      ws.send(JSON.stringify({ type: OFFER, jsep: peer.localDescription }));
    } catch (e) {
      setTimeout(connect, TIMEOUT);
    }
  };

  connect();
};

export { sendAction } from './peer';
