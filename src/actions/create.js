
import path from 'path';
import { writeFile, createReadStream, createWriteStream } from 'fs';
import { v4 as uuid } from 'uuid';
import { contains } from 'fast-deep-equal';
import { asset, FILE, POOL, ACTION_SET } from '../constants';

const store = (state) => {
  writeFile(FILE, JSON.stringify(state[POOL], null, 2), err => {
    if (err) console.error(err);
  });
};

const apply = (action) => (dispatch, getState) => {
  dispatch(action);
  store(getState());
};

export const add = (id, field, subject) => (dispatch, getState) => {
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
  const prev = getState()[POOL][id];
  if (prev && contains(prev, payload)) return;
  dispatch(apply({
    type: ACTION_SET, id, payload
  }));
};

export const create = (id, field, type) => (dispatch, getState) => {
  const subject = uuid();
  const prev = getState()[POOL][id];
  dispatch(apply({
    id: subject,
    type: ACTION_SET,
    payload: { type }
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
