
import os from 'os';
import ip from 'ip';

export const DISCOVERY_INTERVAL = 1000;
export const DISCOVERY = 0xf0;
export const READY = 0xf1;
export const PLATFORM = os.platform();

export * from './apps';
export * from './devices';

export const IP = ip();