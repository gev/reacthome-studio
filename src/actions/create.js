
import path from 'path';
import { writeFile, createReadStream, createWriteStream, rename } from 'fs';
import { v4 as uuid } from 'uuid';
import { contains } from 'fast-deep-equal';
import debounce from 'debounce';
import { asset, tmp, FILE, POOL, ACTION_SET, BIND } from '../constants';

const store = debounce((state) => {
  const file = tmp(uuid());
  writeFile(file, Buffer.from(JSON.stringify(state[POOL], null, 2)), e1 => {
    if (e1) console.error(e1);
    rename(file, FILE, e2 => {
      if (e2) console.error('error', e2);
    });
  });
}, 1000, true);

const apply = (action) => (dispatch, getState) => {
  dispatch(action);
  store(getState());
};

export const add = (id, field, subject) => (dispatch, getState) => {
  if (!id) return;
  const prev = getState()[POOL][id];
  if (prev && prev[field] && prev[field].includes(subject)) return;
  dispatch(apply({
    id,
    type: ACTION_SET,
    payload: {
      [field]: prev && prev[field] ? [...prev[field], subject] : [subject]
    }
  }));
};

export const set = (id, payload) => (dispatch, getState) => {
  if (!id) return;
  const prev = getState()[POOL][id];
  if (prev && contains(prev, payload)) return;
  dispatch(apply({
    type: ACTION_SET, id, payload
  }));
};

export const create = (id, field, type, bind) => (dispatch, getState) => {
  if (!id || !field) return;
  const subject = uuid();
  const prev = getState()[POOL][id];
  dispatch(apply({
    id: subject,
    type: ACTION_SET,
    payload: bind ? { type, [bind]: id } : { type }
  }));
  dispatch(apply({
    id,
    type: ACTION_SET,
    payload: {
      [field]: prev && prev[field] ? [...prev[field], subject] : [subject]
    }
  }));
};

export const remove = (id, field, subject) => (dispatch, getState) => {
  if (!id || !field || !subject) return;
  const prev = getState()[POOL][id];
  if (!prev || !prev[field] || !prev[field].includes(subject)) return;
  dispatch(apply({
    id,
    type: ACTION_SET,
    payload: {
      [field]: prev[field].filter(i => i !== subject)
    }
  }));
};

export const attach = (id, field, file) => (dispatch) => {
  const name = uuid() + path.parse(file).ext;
  const rs = createReadStream(file);
  const ws = createWriteStream(asset(name));
  rs.on('error', console.error);
  ws.on('error', console.error);
  ws.on('close', () => {
    dispatch(set(id, { [field]: name }));
  });
  rs.pipe(ws);
};

export const makeBind = (id, payload, bind = BIND) => (dispatch, getState) => {
  const { pool } = getState();
  dispatch(set(pool[id][bind], { [bind]: null }));
  dispatch(set(pool[payload][bind], { [bind]: null }));
  dispatch(set(id, { [bind]: payload }));
  dispatch(set(payload, { [bind]: id }));
};

export const addBind = (id, field, subject, bind = BIND) => (dispatch, getState) => {
  const { pool } = getState();
  dispatch(remove(pool[subject][bind], field, bind));
  dispatch(add(id, field, subject));
  dispatch(set(subject, { [bind]: id }));
};
