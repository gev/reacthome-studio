
const build = (id, pool, state, assets) => {
  if (state[id]) return;
  const subject = pool[id];
  if (!subject) return;
  const s = state;
  s[id] = subject;
  if (subject.image && !assets.includes(subject.image)) {
    assets.push(subject.image);
  }
  Object.values(subject).forEach((v) => {
    if (!v) return;
    if (typeof v === 'string') {
      build(v, pool, state, assets);
    } else if (Array.isArray(v)) {
      v.forEach(i => {
        build(i, pool, state, assets);
      });
    }
  });
};

export default (getState) => (id) => {
  const { pool } = getState();
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
