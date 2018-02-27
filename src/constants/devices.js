
export const DEVICES_PORT = 2017;
export const DEVICES_GROUP = '224.0.0.1';

export const BOOTLOAD = 0xfb;
export const BOOTLOAD_WRITE = 0x00;
export const BOOTLOAD_FINISH = 0x0f;

export const MAC_ADDRESS = 0xfc;
export const DEFAULT_MAC_ADDRESS = '02:02:02:02:02:02';

export const ERROR = 0xff;

export const BOOTLOADER = 0xff;

export const ADD_DEVICE = 'ADD_DEVICE';
export const UPDATE_DEVICE = 'UPDATE_DEVICE';
export const REMOVE_DEVICE = 'REMOVE_DEVICE';
export const SET_NEW_FIRMWARE = 'SET_NEW_FIRMWARE';
export const SET_DEVICE_STATUS = 'SET_DEVICE_STATUS';
export const UPDATE_FIRMWARE = 'UPDATE_FIRMWARE';
export const UPDATING_FIRMWARE = 'UPDATING_FIRMWARE';
export const DEVICE_READY = 'DEVICE_READY';

export const DEVICE_TYPES = {
  0x00: {
    name: 'Unknown'
  },
  0x01: {
    name: 'Sensor-4',
    firmware: 'sensor4'
  },
  0x02: {
    name: 'Sensor-6',
    firmware: 'sensor6'
  },
  0x03: {
    name: 'THI',
    firmware: 'thi'
  },
  0x04: {
    name: 'Doppler',
    firmware: 'doppler'
  },
  0x05: {
    name: 'DMX',
    firmware: 'dmx'
  },
  0x06: {
    name: 'RS-485',
    firmware: 'rs485'
  },
  0x07: {
    name: 'IR-6',
    firmware: 'ir6'
  },
  0x08: {
    name: 'DI-16',
    firmware: 'di16'
  },
  0x09: {
    name: 'DI-32',
    firmware: 'di32'
  },
  0x0a: {
    name: 'DO-8',
    firmware: 'do8'
  },
  0x0b: {
    name: 'DO-16',
    firmware: 'do16'
  },
  0x0c: {
    name: 'DI-16 / DO-8',
    firmware: 'di16_do8'
  },
  0x0d: {
    name: 'DO-8 / DI-16',
    firmware: 'do8_di16'
  },
  0x0e: {
    name: 'Dimmer-4',
    firmware: 'dim4'
  },
  [BOOTLOADER]: {
    name: 'Bootloader',
    firmware: 'bootloader'
  },
  undefined: {
    name: 'Outdated'
  }
};
