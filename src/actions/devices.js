
import { ADD_DEVICE, REMOVE_DEVICE } from '../constants';

export const addDevice = (id, ip, type) => ({ type: ADD_DEVICE, device: { id, ip, type } });
export const removeDevice = (id) => ({ type: REMOVE_DEVICE, id });
