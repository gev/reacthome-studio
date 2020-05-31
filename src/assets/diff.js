
import { exists, asset } from '../fs';

const filter = async (file) => !(await exists(file));

const reducer = async ([name]) =>
  (await filter(asset(name))) && name;

export default async (assets) =>
  (await Promise.all(assets.map(reducer))).filter(i => i);
