
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { ASSETS, TMP } from './assets/constants';

const p = (type) => (a = '') => path.join(type, a);

export const tmp = p(TMP);
export const asset = p(ASSETS);
export const stat = promisify(fs.stat);
export const mkdir = promisify(fs.mkdir);
export const rename = promisify(fs.rename);
export const unlink = promisify(fs.unlink);
export const readdir = promisify(fs.readdir);
export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
export const appendFile = promisify(fs.appendFile);
export const exists = file => new Promise(resolve => fs.exists(file, resolve));
