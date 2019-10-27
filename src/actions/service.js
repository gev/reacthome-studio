
import get from '../state';
import sendAsset from '../assets/send';
import { ACTION_SET } from '../constants';
import { sendAction } from '../webrtc/peer';
import { compare } from './create';

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
  sendAction(id, action);
};

export const sendProject = (pid) => (dispatch, getState) => {
  const project = getState().pool[pid];
  if (!project || !project.daemon) return;
  const { state, assets } = get(getState)(pid);
  setTimeout(() => {
    Object.entries(state).forEach(([id, payload]) => {
      sendAction(project.daemon, { type: ACTION_SET, id, payload });
    });
  }, 1000);
  // setTimeout(() => {
  //   assets.forEach(asset => {
  //     sendAsset(project.daemon, asset);
  //   });
  // }, 1000);
};

// export const exportProject = (id, folder) => async (dispatch, getState) => {
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
