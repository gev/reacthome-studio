
import path from 'path';
import { remote } from 'electron';

export const FILE = path.join(remote.app.getAppPath(), 'tmp', 'state.json');
export const asset = (a = '') => path.join(remote.app.getAppPath(), 'tmp', 'assets', a);

export const SERVICE_PORT = 2018;
export const SERVICE_GROUP = '224.0.0.2';

export const DISCOVERY_INTERVAL = 1000;

export const ACTION_GET = 'ACTION_GET';
export const ACTION_SET = 'ACTION_SET';

export const APP_TYPE_DAEMON = 0x00;
