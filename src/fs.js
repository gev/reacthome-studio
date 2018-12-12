
import fs from 'fs';
import { promisify } from 'util';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';

export const createWriteStream = promisify(fs.createWriteStream);
export const copyFile = promisify(fs.copyFile);
export const writeFile = promisify(fs.writeFile);
export const rmdir = promisify(rimraf);
export const mkdir = promisify(mkdirp);
