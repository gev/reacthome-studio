
import { contains } from 'fast-deep-equal';

export const applyAction = (action) => (dispatch, getState) => {
  const { type, id, payload } = action;
  const prev = getState()[type][id];
  if (prev && contains(prev, payload)) return;
  dispatch(action);
};

export default (type) => (id, payload) => applyAction({ type, id, payload });
