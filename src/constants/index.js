
import os from 'os';

export const DISCOVERY_INTERVAL = 1000;
export const DISCOVERY = Buffer.from([0xf0]);
export const PLATFORM = os.platform();

export * from './apps';
