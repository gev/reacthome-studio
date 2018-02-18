
import { ADD_APPS, REMOVE_APPS } from '../constants';
import manager from './manager';

export const addApps = (host, apps) => ({ type: ADD_APPS, apps: { host, ...apps } });
export const removeApps = (host) => ({ type: REMOVE_APPS, host });

export const downloadApp = (name, uri) => () => {
  manager.downloadApp(name, uri);
};

export const runApp = (name) => () => {
  manager.runApp(name);
};

export const runDefaultApp = () => () => {
  manager.runDefaultApp();
};
