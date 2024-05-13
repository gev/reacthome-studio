import { existsSync, readdirSync, unlinkSync } from "fs";
import { ASSETS } from "./assets/constants";
import { DAEMON, DEVICE, IMAGE, MODES, POOL, PROJECT, ROOT, SCRIPT, SITE } from "./constants";
import { asset } from "./fs";

function isNumber(str) {
  return /^[0-9]+$/.test(str);
}

const build = (id, pool, state, assets) => {
  if (id === ROOT) return;
  if (id === POOL) return;
  if (state[id]) return;
  const subject = pool[id];
  if (!subject) return;
  state[id] = subject;
  Object.entries(subject).forEach(([k, v]) => {
    if (isNumber(k)) {
      delete subject[k];
      localStorage.setItem(id, JSON.stringify(subject));
    } else if (v) {
      if (typeof v === 'string') {
        switch (k) {
          case DAEMON:
          case 'top': {
            build(v, pool, state, assets);
            break;
          }
          case IMAGE: {
            if (!assets.includes(v)) {
              assets.push(v);
            }
          }
        }
      } else if (Array.isArray(v)) {
        switch (k) {
          case SITE:
          case MODES:
          case SCRIPT: {
            v.forEach(i => {
              build(i, pool, state, assets);
            });
            break;
          }

          case DEVICE: {
            v.forEach(d => {
              // if (typeof d === 'string') {
              Object
                .keys(pool)
                .filter(i => i.startsWith(`${d}/`))
                .forEach(i => {
                  state[i] = pool[i];
                });
              state[d] = pool[d];
              if (Array.isArray(state[d].temperature_ext)) {
                state[d].temperature_ext.forEach(i => {
                  state[i] = pool[i];
                })
              }
              if (state[d].top) {
                state[state[d].top] = pool[state[d].top];
              }

              // }
            });
            break;
          }
          default: {
            switch (subject.type) {
              case DAEMON:
              case PROJECT:
              case SITE:
              case SCRIPT: {
                v.forEach(i => {
                  // if (typeof i === 'string') {
                  build(i, pool, state, assets);
                  // state[i] = pool[i];
                  // }
                });
                break;
              }
            }
            break;
          }
        }
      }
    }
  });
};

export const get = (pool, id) => {
  const state = {};
  const assets = [];
  build(id, pool, state, assets);
  Object.keys(pool).forEach(k => {
    const t = k.split('/');
    if (t.length > 1 && state[t[0]]) state[k] = pool[k];
  });
  // Object.keys(state).forEach(i => {state[i].modified = Date.now()});
  return { assets, state };
};

export const cleanup = (pool) => {
  const { project } = pool.root || {};
  const state = {};
  const assets = [];
  if (Array.isArray(project)) {
    project.forEach(id => build(id, pool, state, assets));
  }
  Object.keys(pool).forEach(k => {
    if (k === ROOT) return;
    if (state[k] === undefined) {
      delete pool[k];
      localStorage.removeItem(k);
    }
  });
  readdirSync(ASSETS).forEach(i => {
    if (!assets.includes(i)) {
      const a = asset(i);
      if (existsSync(a)) {
        unlinkSync(a);
      }
    }
  });
};
