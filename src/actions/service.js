
import path from 'path';
import { existsSync, exists, createWriteStream } from 'fs';
import fetch from 'node-fetch';
import {
  ACTION_SET,
  CLIENT_SERVER_PORT,
  STATE,
  ASSETS,
  asset,
} from '../constants';
import { copyFile, writeFile, rmdir, mkdir } from '../fs';
import { set, compare } from './create';
import get from '../state';
import { sendAction } from '../webrtc';


export const download = (ip, name) => (dispatch) => {
  const file = asset(name);
  exists(file, (ex) => {
    if (ex) return;
    fetch(`http://${ip}:${CLIENT_SERVER_PORT}/${ASSETS}/${name}`)
      .then(res => {
        if (res.status !== 200) return;
        const ws = createWriteStream(file);
        ws.on('end', () => {
          dispatch(set(ASSETS, { [name]: file }));
        });
        res.body.pipe(ws);
      })
      .catch(console.log);
  });
};

export const init = (ip) => (dispatch) => {
  fetch(`http://${ip}:${CLIENT_SERVER_PORT}/${STATE}`)
    .then(response => response.json())
    .then(({ assets = [], state = {} }) => {
      assets.forEach((name) => {
        dispatch(download(ip, name));
      });
      Object.entries(state).forEach(([k, v]) => {
        dispatch(compare(k, v));
      });
    })
    .catch(console.error);
};

export const dispatchAction = (action) => (dispatch) => {
  const { id, payload } = action;
  switch (action.type) {
    case ACTION_SET: {
      dispatch(compare(id, payload));
      break;
    }
    default:
      console.log(action);
  }
};

export const request = (id, action) => () => {
  sendAction(id, action);
};

export const sendProject = (pid) => (dispatch, getState) => {
  const project = getState().pool[pid];
  if (!project || !project.daemon) return;
  const { state } = get(getState)(pid);
  Object.entries(state).forEach(([id, payload]) => {
    dispatch(request(project.daemon, { type: ACTION_SET, id, payload }));
  });
};

export const exportProject = (id, folder) => async (dispatch, getState) => {
  const { state, assets } = get(getState)(id);
  if (!state[id]) return;
  const { title, code } = state[id];
  const p = path.join(folder, code || title || id);
  const s = path.join(p, 'state.json');
  const a = path.join(p, 'assets');
  try {
    if (existsSync(p)) await rmdir(p);
    await mkdir(a);
    writeFile(s, JSON.stringify(state, null, 2));
    assets.forEach(i => {
      copyFile(asset(i), path.join(a, i));
    });
  } catch (e) {
    console.error(e);
  }
};
