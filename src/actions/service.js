
import fs from 'fs';
import fetch from 'node-fetch';
import { createSocket } from 'dgram';
import { online } from './status';
import {
  POOL,
  ACTION_GET,
  ACTION_SET,
  ACTION_DOWNLOAD,
  ACTION_DISCOVERY,
  SERVICE_PORT,
  asset
} from '../constants';
import { set } from './create';

const socket = createSocket('udp4');

const send = (action, port, ip) => {
  socket.send(JSON.stringify(action), port, ip);
};

export const dispatchAction = (action, port, ip) => (dispatch, getState) => {
  const { id, payload } = action;
  switch (action.type) {
    case ACTION_DISCOVERY: {
      const { type, version } = payload;
      const service = getState()[POOL][id];
      if (!service || !service.online) {
        send({ type: ACTION_GET }, port, ip);
      }
      dispatch(online(id, type, version, ip, port));
      break;
    }
    case ACTION_SET: {
      dispatch(set(id, payload));
      break;
    }
    case ACTION_DOWNLOAD: {
      const { name } = action;
      const file = asset(name);
      fs.exists(file, (exists) => {
        if (exists) return;
        fetch(`http://${ip}:${SERVICE_PORT}/${name}`)
          .then(res => {
            if (res.status !== 200) return;
            res.body.pipe(fs.createWriteStream(file));
          })
          .catch(console.err);
      });
      break;
    }
    default:
      console.log(action);
  }
};

export const request = (id, action) => (dispatch, getState) => {
  const service = getState()[POOL][id];
  send(action, service.port, service.ip);
};

const sendSubject = (id, payload, port, ip) => {
  send({ type: ACTION_SET, id, payload }, port, ip);
};

const sendSubjectTree = (id, subject, pool, port, ip, a) => {
  if (a.includes(id)) return;
  a.push(id);
  Object.keys(pool).forEach(k => {
    const t = k.split('/');
    if (t.length > 1 && t[0] === id) {
      sendSubjectTree(k, pool[k], pool, port, ip, a);
    }
  });
  if (!subject) return;
  Object.values(subject).forEach(v => {
    if (Array.isArray(v)) {
      v.forEach(i => {
        sendSubjectTree(i, pool[i], pool, port, ip, a);
      });
    } else if (v) {
      sendSubjectTree(v, pool[v], pool, port, ip, a);
      if (typeof v !== 'string') return;
      fs.exists(asset(v), (exists) => {
        if (!exists) return;
        send({ type: ACTION_DOWNLOAD, name: v }, port, ip);
      });
    }
  });
  sendSubject(id, subject, port, ip);
};

export const sendProject = (id) => (dispatch, getState) => {
  const pool = getState()[POOL];
  const project = getState()[POOL][id];
  if (!project) return;
  const service = getState()[POOL][project.daemon];
  if (!service) return;
  sendSubjectTree(id, project, pool, service.port, service.ip, []);
};
