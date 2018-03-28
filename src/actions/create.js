
import { contains } from 'fast-deep-equal';
import { POOL, ACTION_ADD, ACTION_SET } from '../constants';

export const add = (id, type) => (dispatch, getState) => {
  const prev = getState()[type];
  if (prev && prev.includes(id)) return;
  dispatch({
    type: ACTION_ADD, payload: { id, type }
  });
};

export const put = (id, type, subject) => (dispatch, getState) => {
  const prev = getState()[POOL][id];
  if (prev[type] && prev[type].includes(subject)) return;
  dispatch({
    id,
    type: ACTION_SET,
    payload: {
      [type]: prev[type] ? [...prev[type], subject] : [subject]
    }
  });
};

export const set = (id, payload) => (dispatch, getState) => {
  const prev = getState()[POOL][id];
  if (prev && contains(prev, payload)) return;
  dispatch({
    type: ACTION_SET, id, payload
  });
};
