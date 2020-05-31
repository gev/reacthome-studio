/* eslint-disable default-case */

import { compare } from '../actions';
import { ACTION_SET, ACTION_ASSET } from '../constants';
import { LIST } from '../init/constants';
import onList from '../init/onlist';
import { writeFile, asset } from '../fs';

export default (id) => (dispatch) => ({ data }) => {
  try {
    const action = JSON.parse(data);
    switch (action.type) {
      case LIST: {
        dispatch(onList(id, action));
        break;
      }
      case ACTION_SET: {
        dispatch(compare(action.id, action.payload));
        break;
      }
      case ACTION_ASSET: {
        writeFile(asset(action.name), Buffer.from(action.payload, 'base64'))
          .catch(console.error);
        break;
      }
    }
  } catch (e) {
    console.error(e);
  }
};
