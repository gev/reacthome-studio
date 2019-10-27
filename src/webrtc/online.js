
import { set } from '../actions/create';
import { peers, actions, assets } from './peer';
import connect from './connect';

const TIMEOUT = 10000;

let t;
let i;

export const online = (id) => (dispatch) => {
  clearTimeout(t);
  clearInterval(i);
  dispatch(set(id, { online: true }));
  t = setTimeout(() => {
    if (peers.has(id)) {
      peers.get(id).close();
      actions.delete(id);
      assets.delete(id);
      peers.delete(id);
    }
    dispatch(offline(id));
    dispatch(connect(id));
  }, TIMEOUT);
};

export const offline = (id) => (dispatch) => {
  clearInterval(i);
  i = setInterval(() => {
    dispatch(connect(id));
  }, TIMEOUT);
  dispatch(set(id, { online: false }));
};
