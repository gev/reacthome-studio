
export const DEVICES_PORT = 2017;
export const DEVICES_GROUP = '224.0.0.1';
export const ADD_DEVICE = 'ADD_DEVICE';
export const REMOVE_DEVICE = 'REMOVE_DEVICE';

export const DEVICE_TYPES = {
  0x00: 'Unknown',
  0x01: 'Sensor-4',
  0x02: 'Sensor-6',
  0x03: 'THI',
  0x04: 'Doppler',
  0x05: 'DMX',
  0x06: 'RS-485',
  0x07: 'IR-6',
  0x08: 'DI-16',
  0x09: 'DI-32',
  0x0a: 'DO-8',
  0x0b: 'DO-16',
  0x0c: 'DI-16 / DO-8',
  0x0d: 'DO-8 / DI-16',
  0x0e: 'Dimmer-4',
  0xff: 'Bootloader'
};
