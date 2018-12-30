
import path from 'path';
import { writeFile, createReadStream, createWriteStream, rename } from 'fs';
import { v4 as uuid } from 'uuid';
import { contains } from 'fast-deep-equal';
import debounce from 'debounce';
import Vibrant from 'node-vibrant';
import { asset, tmp, FILE, ACTION_SET, BIND } from '../constants';

const store = debounce((state) => {
  const file = tmp(uuid());
  writeFile(file, Buffer.from(JSON.stringify(state.pool, null, 2)), e1 => {
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
  if (!field) return;
  if (!subject) return;
  const prev = getState().pool[id];
  if (prev && prev[field] && prev[field].includes(subject)) return;
  dispatch(modify(id, { [field]: prev && prev[field] ? [...prev[field], subject] : [subject] }));
};

export const set = (id, payload) => (dispatch, getState) => {
  if (!id) return;
  const prev = getState().pool[id];
  if (prev && contains(prev, payload)) return;
  dispatch(apply({
    type: ACTION_SET, id, payload
  }));
};

export const compare = (id, payload) => (dispatch, getState) => {
  if (!id) return;
  const prev = getState().pool[id];
  if (payload && payload.modified) {
    if (prev && prev.modified) {
      if (payload.modified < prev.modified) {
        return;
      }
    }
  }
  if (prev && contains(prev, payload)) return;
  dispatch(apply({
    type: ACTION_SET, id, payload
  }));
};

export const modify = (id, payload) => (dispatch) => {
  dispatch(set(id, { ...payload, modified: Date.now() }));
};

export const create = (id, field, type, bind) => (dispatch, getState) => {
  if (!id || !field) return;
  const subject = uuid();
  const prev = getState().pool[id];
  dispatch(modify(subject, bind ? { type, [bind]: id } : { type }));
  dispatch(modify(id, { [field]: prev && prev[field] ? [...prev[field], subject] : [subject] }));
};

export const remove = (id, field, subject) => (dispatch, getState) => {
  if (!id || !field || !subject) return;
  const prev = getState().pool[id];
  if (!prev || !prev[field] || !prev[field].includes(subject)) return;
  dispatch(modify(id, { [field]: prev[field].filter(i => i !== subject) }));
};

export const attach = (id, field, file) => (dispatch) => {
  console.log(file);
  const name = uuid() + path.parse(file).ext;
  const rs = createReadStream(file);
  const ws = createWriteStream(asset(name));
  rs.on('error', console.error);
  ws.on('error', console.error);
  ws.on('close', () => {
    Vibrant
      .from(file)
      .getPalette((err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const palette = Object.entries(data).reduce((a, [i, swatch]) =>
          (swatch ? ({ ...a, [i[0].toLowerCase() + i.slice(1)]: swatch.getHex() }) : a), {});
        dispatch(modify(id, { [field]: name, palette }));
      });
  });
  rs.pipe(ws);
};

export const makeBind = (id, payload, bind = BIND) => (dispatch, getState) => {
  const { pool } = getState();
  if (pool[id]) dispatch(modify(pool[id][bind], { [bind]: null }));
  if (pool[payload]) dispatch(modify(pool[payload][bind], { [bind]: null }));
  dispatch(modify(id, { [bind]: payload }));
  dispatch(modify(payload, { [bind]: id }));
};

export const addBind = (id, field, subject, bind = BIND) => (dispatch, getState) => {
  const { pool } = getState();
  if (pool[subject]) dispatch(remove(pool[subject][bind], field, bind));
  dispatch(add(id, field, subject));
  dispatch(modify(subject, { [bind]: id }));
};
