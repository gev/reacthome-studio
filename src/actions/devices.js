
import {
  ADD_DEVICE,
  UPDATE_DEVICE,
  REMOVE_DEVICE,
  SET_NEW_FIRMWARE,
  SET_DEVICE_STATUS,
  UPDATE_FIRMWARE,
  UPDATING_FIRMWARE,
  DEVICE_READY
} from '../constants';

export const addDevice = (device) => ({ type: ADD_DEVICE, device });
export const updateDevice = (device) => ({ type: UPDATE_DEVICE, device });
export const removeDevice = (id) => ({ type: REMOVE_DEVICE, id });
export const setNewFirmware = (id, newFirmware) => ({ type: SET_NEW_FIRMWARE, id, newFirmware });
export const setDeviceStatus = (id, status) => ({ type: SET_DEVICE_STATUS, id, status });
export const updateFirmware = (id) => setDeviceStatus(id, UPDATE_FIRMWARE);
export const updatingFirmware = (id) => setDeviceStatus(id, UPDATING_FIRMWARE);
export const deviceReady = (id) => setDeviceStatus(id, DEVICE_READY);
