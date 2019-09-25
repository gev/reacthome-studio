/* eslint-disable default-case */

import { dispatchAction } from '../actions';
import { ANSWER, CANDIDATE } from './constants';

export const onAction = (data) => (dispatch) => {
  try {
    const action = JSON.parse(data);
    dispatch(dispatchAction(action));
  } catch (e) {
    console.error(e);
  }
};

export const onAsset = (data) => (dispatch) => {

};

export const onSignal = (peer) => ({ data }) => {
  try {
    const action = JSON.parse(data);
    switch (action.type) {
      case ANSWER: {
        peer.setRemoteDescription(action.jsep);
        break;
      }
      case CANDIDATE: {
        const candidate = new RTCIceCandidate(action.candidate);
        console.log(action.candidate);
        peer.addIceCandidate(candidate);
      }
    }
  } catch (e) {
    console.error(e);
  }
};
