
import path from 'path';
import { remote } from 'electron';

export const VERSION = '1.0';

export const STATE = 'state';
export const ASSETS = 'assets';
export const ASSETS_DIR = path.join('tmp', 'assets');

export const asset = (a = '') => path.join(remote.app.getAppPath(), 'tmp', 'assets', a);
export const tmp = (a) => path.join(remote.app.getAppPath(), 'tmp', a);
export const FILE = tmp('state.json');

export const CLIENT_PORT = 2021;
export const CLIENT_SERVER_PORT = 2020;
export const CLIENT_GROUP = '224.0.0.2';

export const DISCOVERY_INTERVAL = 1000;

export const ACTION = 'action';
export const OPERATOR = 'operator';

export const ACTION_SET = 'ACTION_SET';
export const ACTION_INIT = 'ACTION_INIT';
export const ACTION_DOWNLOAD = 'ACTION_DOWNLOAD';

export const ACTION_RGB_DIM = 'ACTION_RGB_DIM';
export const ACTION_ON = 'ACTION_ON';
export const ACTION_OFF = 'ACTION_OFF';
export const ACTION_DIM = 'ACTION_DIM';
export const ACTION_DIM_RELATIVE = 'ACTION_DIM_RELATIVE';
export const ACTION_SITE_LIGHT_DIM_RELATIVE = 'ACTION_SITE_LIGHT_DIM_RELATIVE';
export const ACTION_SITE_LIGHT_OFF = 'ACTION_SITE_LIGHT_OFF';
export const ACTION_SETPOINT = 'ACTION_SETPOINT';
export const ACTION_TIMER_START = 'ACTION_TIMER_START';
export const ACTION_TIMER_STOP = 'ACTION_TIMER_STOP';
export const ACTION_CLOCK_START = 'ACTION_CLOCK_START';
export const ACTION_CLOCK_STOP = 'ACTION_CLOCK_STOP';
export const ACTION_CLOCK_TEST = 'ACTION_CLOCK_TEST';
export const ACTION_DOPPLER_HANDLE = 'ACTION_DOPPLER_HANDLE';
export const ACTION_THERMOSTAT_HANDLE = 'ACTION_THERMOSTAT_HANDLE';
export const ACTION_TOGGLE = 'ACTION_TOGGLE';
export const ACTION_SCRIPT_RUN = 'ACTION_SCRIPT_RUN';

export const ACTION_DO = 0x00;
export const ACTION_DOPPLER = 0xb0;
export const ACTION_DIMMER = 0xd0;
export const ACTION_DISCOVERY = 0xf0;
export const ACTION_READY = 0xf1;
export const ACTION_FIND_ME = 0xfa;
export const ACTION_BOOTLOAD = 0xfb;
export const ACTION_ERROR = 0xff;

export const APP_TYPE_DAEMON = 0x00;

export const DEVICE_TYPE_UNKNOWN = 0x00;
export const DEVICE_TYPE_SENSOR4 = 0x01;
export const DEVICE_TYPE_SENSOR6 = 0x02;
export const DEVICE_TYPE_THI = 0x03;
export const DEVICE_TYPE_DOPPLER = 0x04;
export const DEVICE_TYPE_DMX = 0x05;
export const DEVICE_TYPE_RS485 = 0x06;
export const DEVICE_TYPE_IR6 = 0x07;
export const DEVICE_TYPE_IR_RECEIVER = 0x10;
export const DEVICE_TYPE_DI16 = 0x08;
export const DEVICE_TYPE_DI24 = 0x12;
export const DEVICE_TYPE_DI32 = 0x09;
export const DEVICE_TYPE_DO12 = 0x11;
export const DEVICE_TYPE_DO8 = 0x0a;
export const DEVICE_TYPE_DO16 = 0x0b;
export const DEVICE_TYPE_DI16_DO8 = 0x0c;
export const DEVICE_TYPE_DO8_DI16 = 0x0d;
export const DEVICE_TYPE_DIM4 = 0x0e;
export const DEVICE_TYPE_DIM8 = 0x0f;
export const DEVICE_TYPE_PNP = 0xe0;
export const DEVICE_TYPE_PLC = 0xfe;
export const DEVICE_TYPE_BOOTLOADER = 0xff;

export const DI_OFF = 0x0;
export const DI_ON = 0x1;
export const DI_HOLD = 0x2;
export const DI_CLICK = 0x3;

export const DO_OFF = 0x0;
export const DO_ON = 0x1;

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

export const ID = 'id';
export const ROOT = 'root';
export const BIND = 'bind';
export const DAEMON = 'daemon';
export const TOUCH = 'touch';
export const MOBILE = 'mobile';
export const STUDIO = 'studio';
export const DEVICE = 'device';
export const CHANNEL = 'channel';
export const PROJECT = 'project';
export const SITE = 'site';
export const SCENE = 'scene';
export const SCRIPT = 'script';
export const TIMER = 'timer';
export const CLOCK = 'clock';
export const CODE = 'code';
export const TITLE = 'title';
export const IMAGE = 'image';
export const CAMERA_URL = 'camera_URL';
export const PREVIEW_URL = 'preview_URL';
export const MAIN_URL = 'main_URL';
export const THERMOSTAT = 'thermostat';
export const SETPOINT = 'setpoint';

export const QUIET = 'QUIET';
export const LOW_THRESHOLD = 'LOW_THRESHOLD';
export const HIGH_THRESHOLD = 'HIGH_THRESHOLD';

export const STOP = 'STOP';
export const COOL = 'COOL';
export const HEAT = 'HEAT';
export const COOL_THRESHOLD = 'cool_threshold';
export const COOL_HYSTERESIS = 'cool_hysteresis';
export const HEAT_THRESHOLD = 'heat_threshold';
export const HEAT_HYSTERESIS = 'heat_hysteresis';

export const LIGHT = 'light';
export const LIGHT_220 = 'light_220';
export const LIGHT_LED = 'light_LED';
export const BUTTON = 'button';
export const SENSOR = 'sensor';
export const DOPPLER = 'doppler';
export const SMOCK_SENSOR = 'smock_sensor';
export const MOTION_SENSOR = 'motion_sensor';
export const LEAKAGE_SENSOR = 'leakage_sensor';
export const VALVE_HEATING = 'valve_heating';
export const VALVE_WATER = 'valve_water';
export const SOCKET_220 = 'socket_220';
export const BOILER = 'boiler';
export const PUMP = 'pump';
export const FAN = 'fan';
export const TV = 'TV';
export const AC = 'AC';
export const SOCKET_RJ45 = 'socket_RJ45';
export const ACCESS_POINT = 'access_point';
export const CAMERA = 'camera';
export const INTERCOM = 'intercom';
export const SIP_USER = 'SIP_user';

export const MODEL = 'model';

export const IR = 'ir';
export const DO = 'do';
export const DI = 'di';
export const DIM = 'dim';

export const MODEL_TYPE = [
  SCENE,
  LIGHT_220,
  LIGHT_LED,
  BUTTON,
  SENSOR,
  DOPPLER,
  MOTION_SENSOR,
  SMOCK_SENSOR,
  LEAKAGE_SENSOR,
  VALVE_WATER,
  VALVE_HEATING,
  TV,
  AC,
  FAN,
  SOCKET_220,
  SOCKET_RJ45,
  BOILER,
  PUMP,
  ACCESS_POINT,
  CAMERA,
  INTERCOM,
  TOUCH,
  THERMOSTAT
];

export const ACTION_TYPE = [
  ACTION_OFF,
  ACTION_ON,
  ACTION_DIM,
  ACTION_DIM_RELATIVE,
  ACTION_SITE_LIGHT_DIM_RELATIVE,
  ACTION_SITE_LIGHT_OFF,
  ACTION_RGB_DIM,
  ACTION_SETPOINT,
  ACTION_TIMER_START,
  ACTION_TIMER_STOP,
  ACTION_CLOCK_START,
  ACTION_CLOCK_TEST,
  ACTION_CLOCK_STOP,
  ACTION_DOPPLER_HANDLE,
  ACTION_THERMOSTAT_HANDLE,
  ACTION_TOGGLE,
  ACTION_SCRIPT_RUN
];

export const INTERFACE = 'interface';

export const onIR = 'onIR';
export const onOff = 'onOff';
export const onOn = 'onOn';
export const onHold = 'onHold';
export const onClick = 'onClick';
export const onDoppler = 'onDoppler';
export const onHighThreshold = 'onHighThreshold';
export const onLowThreshold = 'onLowThreshold';
export const onQuiet = 'onQuiet';
export const onTemperature = 'onTemperature';
export const onTemperatureExt = 'onTemperatureExt';
export const onHumidity = 'onHumidity';
export const onIllumination = 'onIllumination';
export const onCool = 'onCool';
export const onHeat = 'onHeat';
export const onStop = 'onStop';
export const onTrue = 'onTrue';
export const onFalse = 'onFalse';

export const OPERATOR_PLUS = 'OPERATOR_PLUS';
export const OPERATOR_MINUS = 'OPERATOR_MINUS';
export const OPERATOR_MUL = 'OPERATOR_MUL';
export const OPERATOR_DIV = 'OPERATOR_DIV';

export const OPERATOR_LT = 'OPERATOR_LT';
export const OPERATOR_LE = 'OPERATOR_LE';
export const OPERATOR_EQ = 'OPERATOR_EQ';
export const OPERATOR_NE = 'OPERATOR_NE';
export const OPERATOR_GE = 'OPERATOR_GE';
export const OPERATOR_GT = 'OPERATOR_GT';

export const OPERATORS = [
  OPERATOR_PLUS,
  OPERATOR_MINUS,
  OPERATOR_MUL,
  OPERATOR_DIV
];

export const COMPARATORS = [
  OPERATOR_LT,
  OPERATOR_LE,
  OPERATOR_EQ,
  OPERATOR_NE,
  OPERATOR_GE,
  OPERATOR_GT
];

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
  [DEVICE_TYPE_IR_RECEIVER]: {
    title: 'IR Receiver',
    firmware: 'ir_receiver'
  },
  [DEVICE_TYPE_DI16]: {
    title: 'DI-16',
    firmware: 'di16',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_DI24]: {
    title: 'DI-24',
    firmware: 'di24',
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
  [DEVICE_TYPE_DO12]: {
    title: 'DO-12',
    firmware: 'do12',
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
  [DEVICE_TYPE_DIM8]: {
    title: 'Dimmer-8',
    firmware: 'dim8',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_PNP]: {
    title: 'PNP',
    firmware: 'pnp',
    hasFindMeAction: false,
  },
  [DEVICE_TYPE_PLC]: {
    title: 'PLC',
    firmware: 'plc',
    hasFindMeAction: false,
  },
  [TOUCH]: {
    title: 'Touch',
    hasFindMeAction: false,
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
