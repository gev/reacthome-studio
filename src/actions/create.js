
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { contains } from 'fast-deep-equal';
import { FILE, POOL, ACTION_SET } from '../constants';

const store = (state) => {
  fs.writeFile(FILE, JSON.stringify(state[POOL], null, 2), err => {
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

export const create = (id, field) => (dispatch, getState) => {
  const subject = uuid();
  const prev = getState()[POOL][id];
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