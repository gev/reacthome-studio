
import { mkdir, readdir, stat, exists, asset } from '../fs';
import { ASSETS, STATE, TMP, VAR } from './constants';

const create = (...path) => path.map(async (p) => (await exists(p)) || mkdir(p));

export const init = async () => {
  await create(VAR);
  return Promise.all(create(ASSETS, STATE, TMP));
};

export const list = async () =>
  Promise.all((await readdir(ASSETS))
    .map(async (name) => [name, (await stat(asset(name))).mtimeMs]));
