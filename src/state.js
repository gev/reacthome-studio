
import { existsSync } from 'fs';
import { asset } from './constants';

const build = (id, pool, state, assets, l = 0) => {
  if (state[id]) return;
  const subject = pool[id];
  if (!subject) return;
  const s = state;
  s[id] = subject;
  Object.values(subject).forEach(v => {
    if (!v) return;
    if (typeof v === 'string') {
      build(v, pool, state, assets, l + 1);
      if (existsSync(asset(v)) && !assets.includes(v)) assets.push(v);
    } else if (Array.isArray(v)) {
      v.forEach(i => {
        build(i, pool, state, assets, l + 1);
      });
    }
  });
};

module.exports = ({ getState }) => (id) => {
  const { pool } = getState();
  const state = {};
  const assets = [];
  build(id, pool, state, assets);
  Object.keys(pool).forEach(k => {
    const t = k.split('/');
    if (t.length > 1 && state[t[0]]) state[k] = pool[k];
  });
  return { assets, state };
};
