
import path from 'path';
import { remote } from 'electron';

const p = (...s) => path.join(remote.app.getAppPath(), ...s);

export const VAR = p('var');
export const TMP = p('var', 'tmp');
export const STATE = p('var', 'state');
export const STATE_JSON = p('var', 'state', 'state.json');
export const ASSETS = p('var', 'assets');
