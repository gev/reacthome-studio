
import path from 'path';
import { app } from '@electron/remote';

const p = (...s) => path.join(app.getPath('home'), ...s);

export const HOME = p('.reacthome-studio');
export const VAR = p('.reacthome-studio', 'var');
export const TMP = p('.reacthome-studio', 'var', 'tmp');
export const STATE = p('.reacthome-studio', 'var', 'state');
export const STATE_JSON = p('.reacthome-studio', 'var', 'state', 'state.json');
export const ASSETS = p('.reacthome-studio', 'var', 'assets');
