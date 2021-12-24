
// import diffAssets from '../assets/diff';
import { send } from '../websocket/peer';
import { GET } from './constants';
import { exists, asset } from '../fs';

const filter = (o, timestamp) => !o || o.timestamp < timestamp;

const reducer = ({ pool }) =>
  (a, [id, timestamp]) =>
    (filter(pool[id], timestamp) ? [...a, id] : a);

export default (id, { state, assets }) => (dispatch, getState) => {
  if (state) {
    const list = state.reduce(reducer(getState()), []);
    if (list.length > 0) {
      send(id, { type: GET, state: list });
    }
  }
  if (assets) {
    assets.forEach(async name => {
      if (typeof name !== 'string') return;
      if (await exists(asset(name))) return;
      send(id, { type: GET, assets: [name] });
    });
    // const list = await diffAssets(assets);
    // if (list.length > 0) {
    //   send(id, { type: GET, assets: list });
    // }
  }
};
