
import path from 'path';
import { remote } from 'electron';

export const FILE = path.join(remote.app.getAppPath(), 'tmp', 'state.json');
export const asset = (a = '') => path.join(remote.app.getAppPath(), 'tmp', 'assets', a);

export const SERVICE_PORT = 2018;
export const SERVICE_GROUP = '224.0.0.2';

export const DISCOVERY_INTERVAL = 1000;

export const ACTION_DO = 0x00;
export const ACTION_DIMMER = 0xd0;
export const ACTION_DISCOVERY = 0xf0;
export const ACTION_READY = 0xf1;
export const ACTION_FIND_ME = 0xfa;
export const ACTION_BOOTLOAD = 0xfb;
export const ACTION_ERROR = 0xff;

export const ACTION_GET = 'ACTION_GET';
export const ACTION_SET = 'ACTION_SET';

export const APP_TYPE_DAEMON = 0x00;

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

export const DIM_OFF = 0x0;
export const DIM_ON = 0x1;
export const DIM_SET = 0x2;
export const DIM_FADE = 0x3;
export const DIM_TYPE = 0x4;

export const DIM_TYPE_UNPLUGGED = 0x0;
export const DIM_TYPE_RISING_EDGE = 0x1;
export const DIM_TYPE_FALLING_EDGE = 0x2;
export const DIM_TYPE_PWM = 0x3;
export const DIM_TYPE_RELAY = 0x4;

export const DIM_TYPES = ['Unplugged', 'Rising edge', 'Falling edge', 'PWM', 'Relay'];

export const DEVICE_TYPES = {
  [DEVICE_TYPE_UNKNOWN]: {
    title: 'Unknown'
  },
  [DEVICE_TYPE_SENSOR4]: {
    title: 'Sensor-4',
    firmware: 'sensor4',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_SENSOR6]: {
    title: 'Sensor-6',
    firmware: 'sensor6',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_THI]: {
    title: 'THI',
    firmware: 'thi'
  },
  [DEVICE_TYPE_DOPPLER]: {
    title: 'Doppler',
    firmware: 'doppler'
  },
  [DEVICE_TYPE_DMX]: {
    title: 'DMX',
    firmware: 'dmx',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_RS485]: {
    title: 'RS-485',
    firmware: 'rs485',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_IR6]: {
    title: 'IR-6',
    firmware: 'ir6',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_DI16]: {
    title: 'DI-16',
    firmware: 'di16',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_DI32]: {
    title: 'DI-32',
    firmware: 'di32',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_DO8]: {
    title: 'DO-8',
    firmware: 'do8',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_DO16]: {
    title: 'DO-16',
    firmware: 'do16',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_DI16_DO8]: {
    title: 'DI-16 / DO-8',
    firmware: 'di16_do8',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_DO8_DI16]: {
    title: 'DO-8 / DI-16',
    firmware: 'do8_di16',
    hasFindMeAction: true,
  },
  [DEVICE_TYPE_DIM4]: {
    title: 'Dimmer-4',
    firmware: 'dim4',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_BOOTLOADER]: {
    title: 'Bootloader',
    firmware: 'bootloader',
    hasFindMeAction: true
  },
  undefined: {
    title: 'Outdated'
  }
};

export const POOL = 'pool';
export const ROOT = 'root';
export const STATE = 'state';
export const DAEMON = 'daemon';
export const DEVICE = 'device';
export const CHANNEL = 'channel';
export const SERVICE = 'service';
export const PROJECT = 'project';
export const SITE = 'site';
export const CODE = 'code';
export const TITLE = 'title';
export const IMAGE = 'image';

export const LIGHT_220 = 'light_220';
export const LIGHT_LED = 'light_LED';
export const BUTTON = 'button';
export const SENSOR = 'sensor';
export const MOTION_SENSOR = 'motion_sensor';
export const SMOCK_SENSOR = 'smock_sensor';
export const LEAKAGE_SENSOR = 'leakage_sensor';
export const VALVE_WATER = 'valve_water';
export const VALVE_HEATING = 'valve_heating';
export const TV_IR = 'TV_IR';
export const AC_IR = 'AC_IR';
export const FAN = 'fan';
export const SOCKET_220 = 'socket_220';
export const SOCKET_RJ45 = 'socket_RJ45';
export const BOILER = 'boiler';
export const PUMP = 'pump';
export const ACCESS_POINT = 'access_point';
export const CAMERA = 'camera';
export const INTERCOM = 'intercom';
export const TOUCH_SCREEN_PANEL = 'touch_screen_panel';

export const EQUIPMENT = 'equipment';

export const EQUIPMENT_TYPE = [
  LIGHT_220,
  LIGHT_LED,
  BUTTON,
  SENSOR,
  MOTION_SENSOR,
  SMOCK_SENSOR,
  LEAKAGE_SENSOR,
  VALVE_WATER,
  VALVE_HEATING,
  TV_IR,
  AC_IR,
  FAN,
  SOCKET_220,
  SOCKET_RJ45,
  BOILER,
  PUMP,
  ACCESS_POINT,
  CAMERA,
  INTERCOM,
  TOUCH_SCREEN_PANEL
];

export const INTERFACE = 'interface';
