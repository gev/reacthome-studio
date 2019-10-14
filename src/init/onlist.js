
import diffAssets from '../assets/diff';
import { sendAction } from '../webrtc/peer';
import { GET } from './constants';

const filter = (o, timestamp) => !o || o.timestamp < timestamp;

const reducer = ({ pool }) =>
  (a, [id, timestamp]) =>
    (filter(pool[id], timestamp) ? [...a, id] : a);

export default (id, { state, assets }) => async (dispatch, getState) => {
  if (state) {
    const list = state.reduce(reducer(getState()), []);
    if (list.length > 0) {
      sendAction(id, { type: GET, state: list });
    }
  }
  if (assets) {
    const list = await diffAssets(assets);
    if (list.length > 0) {
      sendAction(id, { type: GET, assets: list });
    }
  }
};
