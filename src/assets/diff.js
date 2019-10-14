
import { stat, exists, asset } from '../fs';

const filter = async (file, timestamp) =>
  !(await exists(file)) || ((await stat(file)).mtimeMs < timestamp);

const reducer = async ([name, timestamp]) =>
  (await filter(asset(name), timestamp)) && name;

export default async (assets) =>
  (await Promise.all(assets.map(reducer))).filter(i => i);
