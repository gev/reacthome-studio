
import {
  ADD_DEVICE,
  UPDATE_DEVICE,
  REMOVE_DEVICE,
  SET_NEW_FIRMWARE,
  SET_DEVICE_STATUS,
  SET_DEVICE_STATE
} from '../constants';

export const addDevice = (device) => ({ type: ADD_DEVICE, device });
export const updateDevice = (device) => ({ type: UPDATE_DEVICE, device });
export const removeDevice = (id) => ({ type: REMOVE_DEVICE, id });
export const setDeviceStatus = (id, status) => ({ type: SET_DEVICE_STATUS, id, status });
export const setDeviceState = (id, state) => ({ type: SET_DEVICE_STATE, id, state });
export const setNewFirmware = (id, newFirmware) => ({ type: SET_NEW_FIRMWARE, id, newFirmware });

