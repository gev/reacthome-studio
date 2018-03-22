
export const DEVICE_PORT = 2017;
export const DEVICE_GROUP = '224.0.0.1';

export const SERVICE_PORT = 2018;
export const SERVICE_GROUP = '224.0.0.2';

export const DISCOVERY_INTERVAL = 1000;

export const STATE = 'state';
export const DEVICE = 'device';
export const SERVICE = 'service';

export const ACTION_DISCOVERY = 0xf0;
export const ACTION_READY = 0xf1;
export const ACTION_GET_STATE = 0xf2;
export const ACTION_ERROR = 0xff;

export const DEVICE_TYPE_UNKNOWN = 0x00;
export const DEVICE_TYPE_SENSOR4 = 0x01;
export const DEVICE_TYPE_SENSOR6 = 0x02;
export const DEVICE_TYPE_THI = 0x03;
export const DEVICE_TYPE_DOPPLER = 0x04;
export const DEVICE_TYPE_DMX = 0x05;
export const DEVICE_TYPE_RS485 = 0x06;
export const DEVICE_TYPE_IR6 = 0x07;
export const DEVICE_TYPE_DI16 = 0x08;
export const DEVICE_TYPE_DI32 = 0x09;
export const DEVICE_TYPE_DO8 = 0x0a;
export const DEVICE_TYPE_DO16 = 0x0b;
export const DEVICE_TYPE_DI16_DO8 = 0x0c;
export const DEVICE_TYPE_DO8_DI16 = 0x0d;
export const DEVICE_TYPE_DIM4 = 0x0e;
export const DEVICE_TYPE_BOOTLOADER = 0xff;

export const APP_TYPE_DAEMON = 0x00;

export const DIM_TYPE_UNPLUGGED = 0x0;
export const DIM_TYPE_RISING_EDGE = 0x1;
export const DIM_TYPE_FALLING_EDGE = 0x2;
export const DIM_TYPE_PWM = 0x3;
export const DIM_TYPE_RELAY = 0x4;

export const DIM_TYPES = ['Unplugged', 'Rising edge', 'Falling edge', 'PWM', 'Relay'];

export const DEVICE_TYPES = {
  [DEVICE_TYPE_UNKNOWN]: {
    name: 'Unknown'
  },
  [DEVICE_TYPE_SENSOR4]: {
    name: 'Sensor-4',
    firmware: 'sensor4',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_SENSOR6]: {
    name: 'Sensor-6',
    firmware: 'sensor6',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_THI]: {
    name: 'THI',
    firmware: 'thi'
  },
  [DEVICE_TYPE_DOPPLER]: {
    name: 'Doppler',
    firmware: 'doppler'
  },
  [DEVICE_TYPE_DMX]: {
    name: 'DMX',
    firmware: 'dmx',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_RS485]: {
    name: 'RS-485',
    firmware: 'rs485',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_IR6]: {
    name: 'IR-6',
    firmware: 'ir6',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_DI16]: {
    name: 'DI-16',
    firmware: 'di16',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_DI32]: {
    name: 'DI-32',
    firmware: 'di32',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_DO8]: {
    name: 'DO-8',
    firmware: 'do8',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_DO16]: {
    name: 'DO-16',
    firmware: 'do16',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_DI16_DO8]: {
    name: 'DI-16 / DO-8',
    firmware: 'di16_do8',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_DO8_DI16]: {
    name: 'DO-8 / DI-16',
    firmware: 'do8_di16',
    hasFindMeAction: true,
  },
  [DEVICE_TYPE_DIM4]: {
    name: 'Dimmer-4',
    firmware: 'dim4',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_BOOTLOADER]: {
    name: 'Bootloader',
    firmware: 'bootloader',
    hasFindMeAction: true
  },
  undefined: {
    name: 'Outdated'
  }
};
