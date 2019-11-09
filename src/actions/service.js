
import get from '../state';
import sendAsset from '../assets/send';
import { ACTION_SET } from '../constants';
import { sendAction } from '../webrtc/peer';
import { compare } from './create';

const socket = createSocket('udp4');

const send = (action, ip) => {
  const buff = Buffer.from(JSON.stringify(action));
  socket.send(buff, 0, buff.length, CLIENT_SERVER_PORT, ip, (err) => {
    if (err) console.log(err);
  });
};

export const download = (ip, name) => (dispatch) => {
  const file = asset(name);
  exists(file, (ex) => {
    if (ex) return;
    fetch(`http://${ip}:${CLIENT_SERVER_PORT}/${ASSETS}/${name}`)
      .then(res => {
        if (res.status !== 200) return;
        const ws = createWriteStream(file);
        ws.on('end', () => {
          dispatch(set(ASSETS, { [name]: file }));
        });
        res.body.pipe(ws);
      })
      .catch(console.log);
  });
};

export const init = (ip) => (dispatch) => {
  fetch(`http://${ip}:${CLIENT_SERVER_PORT}/${STATE}`)
    .then(response => response.json())
    .then(({ assets = [], state = {} }) => {
      assets.forEach((name) => {
        dispatch(download(ip, name));
      });
      Object.entries(state).forEach(([k, v]) => {
        dispatch(compare(k, v));
      });
    })
    .catch(console.error);
};

export const discovery = (id) => (dispatch, getState) => {
  const { ip, multicast } = getState().pool[id] || {};
  if (ip) {
    send({
      type: ACTION_DISCOVERY,
      payload: { type: STUDIO, VERSION, multicast }
    }, ip);
  }
};

export const dispatchAction = (action, ip) => (dispatch, getState) => {
  ip = '192.168.0.2';
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
