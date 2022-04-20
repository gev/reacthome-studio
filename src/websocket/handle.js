/* eslint-disable default-case */

import { compare } from '../actions';
import { ACTION_SET, ACTION_ASSET } from '../constants';
import { LIST } from '../init/constants';
import onList from '../init/onlist';
import { writeFile, asset } from '../fs';
import { PTY } from '../terminal/constants';
import onPTY from '../terminal';

let i = 0;

export default (id) => (dispatch) => {
  return ({ data }) => {
    try {
      const action = JSON.parse(data);
      // console.log(i++, action);
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
        case PTY: {
          onPTY(id, action.chunk);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
};
