
import { get } from '../state';
import { ACTION_SET, ACTION_ASSET } from '../constants';
import { send } from '../websocket/peer';
import { compare } from './create';
import { asset, readFile } from '../fs';

export const dispatchAction = (action) => (dispatch) => {
  const { id, payload } = action;
  switch (action.type) {
    case ACTION_SET: {
      dispatch(compare(id, payload));
      break;
    }
    default:
      console.log(action);
  }
};

export const request = (id, action) => () => {
  send(id, action);
};

export const sendProject = (pid) => (_, getState) => {
  const { pool } = getState();
  const project = pool[pid];
  if (!project || !project.daemon) return;
  const { state, assets } = get(pool, pid);
  Object.entries(state).forEach(([id, payload]) => {
    send(project.daemon, { type: ACTION_SET, id, payload });
  });
  assets.forEach(async (name) => {
    try {
      const data = await readFile(asset(name));
      const payload = data.toString('base64');
      send(project.daemon, { type: ACTION_ASSET, name, payload });
    } catch (e) {
      console.error(e);
    }
  });
};

// export const exportProject = (id, fold er) => async (dispatch, getState) => {
//   const { state, assets } = get(getState)(id);
//   if (!state[id]) return;
//   const { title, code } = state[id];
//   const p = path.join(folder, code || title || id);
//   const s = path.join(p, 'state.json');
//   const a = path.join(p, 'assets');
//   try {
//     if (existsSync(p)) await rmdir(p);
//     await mkdir(a);
//     writeFile(s, JSON.stringify(state, null, 2));
//     assets.forEach(i => {
//       copyFile(asset(i), path.join(a, i));
//     });
//   } catch (e) {
//     console.error(e);
//   }
// };
