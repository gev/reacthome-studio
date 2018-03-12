
export const DEVICES_PORT = 2017;
export const DEVICES_GROUP = '224.0.0.1';

export const DEVICE_DOPPLER = 0x04;
export const DEVICE_BOOTLOADER = 0xff;
export const DEVICE_DIM4 = 0x0e;
export const DEVICE_DO8 = 0x0a;

export const DO = 0x00;
export const DOPPLER = 0xb0;
export const DIMMER = 0xd0;
export const FIND_ME = 0xfa;
export const BOOTLOAD = 0xfb;
export const MAC_ADDRESS = 0xfc;
export const ERROR = 0xff;

export const DEFAULT_MAC_ADDRESS = '02:02:02:02:02:02';

export const BOOTLOAD_WRITE = 0x00;
export const BOOTLOAD_SUCCESS = 0x01;
export const BOOTLOAD_FINISH = 0x0f;

export const DO_OFF = 0x00;
export const DO_ON = 0x01;

export const DIM_OFF = 0x00;
export const DIM_ON = 0x01;
export const DIM_SET = 0x02;
export const DIM_FADE = 0x03;
export const DIM_TYPE = 0x04;

export const ADD_DEVICE = 'ADD_DEVICE';
export const UPDATE_DEVICE = 'UPDATE_DEVICE';
export const REMOVE_DEVICE = 'REMOVE_DEVICE';
export const SET_NEW_FIRMWARE = 'SET_NEW_FIRMWARE';
export const SET_DEVICE_STATUS = 'SET_DEVICE_STATUS';
export const SET_DEVICE_STATE = 'SET_DEVICE_STATE';
export const UPDATE_FIRMWARE = 'UPDATE_FIRMWARE';

export const DIM_TYPE_UNPLUGGED = 0x0;
export const DIM_TYPE_RISING_EDGE = 0x1;
export const DIM_TYPE_FALLING_EDGE = 0x2;
export const DIM_TYPE_PWM = 0x3;
export const DIM_TYPE_RELAY = 0x4;

export const DIM_TYPES = ['Unplugged', 'Rising edge', 'Falling edge', 'PWM', 'Relay'];

export const DEVICE_TYPES = {
  0x00: {
    name: 'Unknown'
  },
  0x01: {
    name: 'Sensor-4',
    firmware: 'sensor4',
    hasFindMeAction: true
  },
  0x02: {
    name: 'Sensor-6',
    firmware: 'sensor6',
    hasFindMeAction: true
  },
  0x03: {
    name: 'THI',
    firmware: 'thi'
  },
  [DEVICE_DOPPLER]: {
    name: 'Doppler',
    firmware: 'doppler'
  },
  0x05: {
    name: 'DMX',
    firmware: 'dmx',
    hasFindMeAction: true
  },
  0x06: {
    name: 'RS-485',
    firmware: 'rs485',
    hasFindMeAction: true
  },
  0x07: {
    name: 'IR-6',
    firmware: 'ir6',
    hasFindMeAction: true
  },
  0x08: {
    name: 'DI-16',
    firmware: 'di16',
    hasFindMeAction: true
  },
  0x09: {
    name: 'DI-32',
    firmware: 'di32',
    hasFindMeAction: true
  },
  [DEVICE_DO8]: {
    name: 'DO-8',
    firmware: 'do8',
    hasFindMeAction: true
  },
  0x0b: {
    name: 'DO-16',
    firmware: 'do16',
    hasFindMeAction: true
  },
  0x0c: {
    name: 'DI-16 / DO-8',
    firmware: 'di16_do8',
    hasFindMeAction: true
  },
  0x0d: {
    name: 'DO-8 / DI-16',
    firmware: 'do8_di16',
    hasFindMeAction: true,
  },
  [DEVICE_DIM4]: {
    name: 'Dimmer-4',
    firmware: 'dim4',
    hasFindMeAction: true
  },
  [DEVICE_BOOTLOADER]: {
    name: 'Bootloader',
    firmware: 'bootloader',
    hasFindMeAction: true
  },
  undefined: {
    name: 'Outdated'
  }
};
