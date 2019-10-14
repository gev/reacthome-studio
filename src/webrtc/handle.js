/* eslint-disable default-case */

import { compare } from '../actions';
import { ANSWER, CANDIDATE } from './constants';
import { tmp, appendFile, asset, exists, unlink, rename } from '../fs';
import { online } from './online';
import { peers } from './peer';
import { ACTION_SET } from '../constants';
import { LIST } from '../init/constants';
import onList from '../init/onlist';

export const onAction = (id) => (dispatch) => ({ data }) => {
  try {
    const action = JSON.parse(data);
    dispatch(online(id));
    switch (action.type) {
      case LIST: {
        dispatch(onList(id, action));
        break;
      }
      case ACTION_SET: {
        dispatch(compare(action.id, action.payload));
        break;
      }
    }
  } catch (e) {
    console.error(e);
  }
};

export const onAsset = (id) => () => async ({ data }) => {
  const buff = Buffer.from(data);
  const transaction = buff.readUInt16LE(0);
  const total = buff.readUInt16LE(2);
  const current = buff.readUInt16LE(4);
  const length = buff.readUInt16LE(6);
  const name = buff.slice(8, 8 + length).toString();
  const chunk = buff.slice(8 + length);
  const temp = tmp(`${id}-${transaction}-${name}`);
  try {
    await appendFile(temp, chunk);
    if (current === total) {
      const file = asset(name);
      if (await exists(file)) {
        await unlink(file);
      }
      rename(temp, file);
      console.log(file);
    }
  } catch (e) {
    console.error(e);
  }
};

export const onSignal = (id) => ({ data }) => {
  if (peers.has(id)) {
    try {
      const action = JSON.parse(data);
      switch (action.type) {
        case ANSWER: {
          const peer = peers.get(id);
          peer.setRemoteDescription(action.jsep);
          break;
        }
        case CANDIDATE: {
          const peer = peers.get(id);
          const candidate = new RTCIceCandidate(action.candidate);
          peer.addIceCandidate(candidate);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
};
