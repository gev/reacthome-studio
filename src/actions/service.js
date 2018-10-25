
import { exists, createWriteStream } from 'fs';
import fetch from 'node-fetch';
import { createSocket } from 'dgram';
import { online } from './status';
import {
  VERSION,
  STUDIO,
  POOL,
  ACTION_INIT,
  ACTION_SET,
  ACTION_DISCOVERY,
  ACTION_DOWNLOAD,
  SERVICE_PORT,
  STATE,
  ASSETS,
  asset
} from '../constants';
import { set } from './create';

const socket = createSocket('udp4');

const send = (action, ip) => {
  socket.send(JSON.stringify(action), SERVICE_PORT, ip);
};

export const download = (id, name) => (dispatch, getState) => {
  const { ip } = getState()[POOL][id];
  const file = asset(name);
  exists(file, (ex) => {
    if (ex) return;
    fetch(`http://${ip}:${SERVICE_PORT}/${ASSETS}/${name}`)
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

export const init = (id) => (dispatch, getState) => {
  const service = getState()[POOL][id];
  if (!service || !service.ip) return;
  fetch(`http://${service.ip}:${SERVICE_PORT}/${STATE}`)
    .then(response => response.json())
    .then(({ assets = [], state = {} }) => {
      assets.forEach((name) => {
        dispatch(download(id, name));
      });
      Object.entries(state).forEach(([k, v]) => {
        dispatch(set(k, v));
      });
    })
    .catch(console.error);
};

export const discovery = (id) => (dispatch, getState) => {
  const { ip, multicast } = getState()[POOL][id] || {};
  if (ip) {
    send({
      id,
      type: ACTION_DISCOVERY,
      payload: { type: STUDIO, VERSION, multicast }
    }, ip);
  }
};

export const dispatchAction = (action, ip) => (dispatch, getState) => {
  const { id, payload } = action;
  switch (action.type) {
    case ACTION_DISCOVERY: {
      const { type, version, multicast } = payload;
      const service = getState()[POOL][id];
      if (!service || !service.online) {
        dispatch(init(id));
      }
      dispatch(online(id, type, version, ip, multicast || (service && service.multicast)));
      break;
    }
    case ACTION_SET: {
      dispatch(set(id, payload));
      break;
    }
    case ACTION_DOWNLOAD: {
      const { name } = action;
      dispatch(download(id, name));
      break;
    }
    default:
      console.log(action);
  }
};

export const request = (id, action) => (dispatch, getState) => {
  const { ip } = getState()[POOL][id];
  send(action, ip);
};

export const sendProject = (id) => (dispatch, getState) => {
  const project = getState()[POOL][id];
  if (!project || !project.daemon) return;
  dispatch(request(project.daemon, { type: ACTION_INIT }));
};
