/* eslint-disable no-plusplus */


const fs = require('fs');

const file = './var/state/state.json';

const data = JSON.parse(fs.readFileSync(file));


Object.values(data).forEach(v => {
  for (let i = 0; i < 4096; i++) {
    delete v[i];
  }
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
