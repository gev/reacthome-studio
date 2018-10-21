

const fs = require('fs');

const file = './tmp/state.json';

const data = JSON.parse(fs.readFileSync(file));


const process = (o, f, y, n) => {
  Object
    .entries(o)
    .forEach(([key, value]) => {
      if (f(key, value)) {
        if (y) y(key, value);
      } else {
        if (n) n(key, value);
      }
    });
};

process(
  data,
  (k, v) => v.type === 'project',
  (k, v) => {
    v.script = [];
    const p = (o) => {
      process(
        o,
        (k1, v1) => v1.scene,
        (k1, v1) => {
          console.log(k1, v1);
          v.script = [...v.script, ...v1.scene];
          p(v1);
        }
      );
    };
  }
);

fs.writeFileSync(file, JSON.stringify(data, null, 2));
