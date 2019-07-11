
import path from 'path';
import { existsSync, exists, createWriteStream } from 'fs';
import fetch from 'node-fetch';
import { createSocket } from 'dgram';
import { online } from './status';
import {
  VERSION,
  STUDIO,
  ACTION_INIT,
  ACTION_SET,
  ACTION_DISCOVERY,
  ACTION_DOWNLOAD,
  CLIENT_SERVER_PORT,
  STATE,
  ASSETS,
  asset,
  DAEMON
} from '../constants';
import { copyFile, writeFile, rmdir, mkdir } from '../fs';
import { set, compare } from './create';
import get from '../state';


const socket = createSocket('udp4');

const send = (action, ip) => {
  const buff = Buffer.from(JSON.stringify(action));
  socket.send(buff, 0, buff.length, CLIENT_SERVER_PORT, ip, (err) => {
    if (err) console.log(err);
  });
};

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

export const discovery = (id) => (dispatch, getState) => {
  const { ip, multicast } = getState().pool[id] || {};
  if (ip) {
    send({
      type: ACTION_DISCOVERY,
      payload: { type: STUDIO, VERSION, multicast }
    }, ip);
  }
};

export const dispatchAction = (action, ip) => (dispatch, getState) => {
  // ip = '192.168.0.2';
  const { id, payload } = action;
  switch (action.type) {
    case ACTION_DISCOVERY: {
      const { type, version, multicast } = payload;
      if (type !== DAEMON) return;
      const service = getState().pool[id];
      if (!service || !service.online) {
        dispatch(init(ip));
      }
      dispatch(online(id, type, version, ip, multicast || (service && service.multicast)));
      break;
    }
    case ACTION_SET: {
      dispatch(compare(id, payload));
      break;
    }
    case ACTION_DOWNLOAD: {
      const { name } = action;
      dispatch(download(ip, name));
      break;
    }
    default:
      console.log(action);
  }
};

export const request = (id, action) => (dispatch, getState) => {
  const { ip } = getState().pool[id];
  send(action, ip);
};

export const sendProject = (id) => (dispatch, getState) => {
  const project = getState().pool[id];
  if (!project || !project.daemon) return;
  dispatch(request(project.daemon, { type: ACTION_INIT }));
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
