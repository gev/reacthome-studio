
import diffAssets from '../assets/diff';
import { request } from '../actions';
import { GET } from './constants';

const filter = (o, timestamp) => !o || o.timestamp < timestamp;

const reducer = ({ pool }) =>
  (a, [id, timestamp]) =>
    (filter(pool[id], timestamp) ? [...a, id] : a);

export default (id, action) => async (dispatch, getState) => {
  const state = action.state.reduce(reducer(getState()), []);
  const assets = await diffAssets(action.assets);
  if (state.length > 0 || assets.length > 0) {
    dispatch(request(id, { type: GET, state, assets }));
  }
};
