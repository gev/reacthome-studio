
import { set } from '../actions/create';

export const offline = (id) => (dispatch) => {
  dispatch(set(id, { online: false }));
};

export const online = (id) => (dispatch) => {
  dispatch(set(id, { online: true }));
};

