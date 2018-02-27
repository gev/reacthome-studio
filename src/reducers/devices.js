
import {
  ADD_DEVICE,
  UPDATE_DEVICE,
  REMOVE_DEVICE,
  SET_NEW_FIRMWARE,
  DEVICE_TYPES,
  SET_DEVICE_STATUS,
  BOOTLOADER,
  DEVICE_READY
} from '../constants';

export default function devices(state = [], action) {
  switch (action.type) {
    case ADD_DEVICE: {
      const device = { ...action.device, ...DEVICE_TYPES[action.device.type], status: DEVICE_READY };
      if (device.type !== BOOTLOADER) device.newFirmware = device.firmware;
      return [...state, device].sort((a, b) => (a.type < b.type));
    }
    case UPDATE_DEVICE: {
      const { device } = action;
      return state.map(i => (i.id === device.id ? { ...device, ...DEVICE_TYPES[device.type] } : i));
    }
    case REMOVE_DEVICE:
      return state.filter(i => i.id !== action.id);
    case SET_NEW_FIRMWARE: {
      const { id, newFirmware } = action;
      return state.map(i => (i.id === id ? { ...i, newFirmware } : i));
    }
    case SET_DEVICE_STATUS: {
      const { id, status } = action;
      return state.map(i => (i.id === id ? { ...i, status } : i));
    }
    default:
      return state;
  }
}

