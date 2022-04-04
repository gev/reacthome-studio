
export const VERSION = '1.0';

export const CLIENT_PORT = 2021;
export const CLIENT_SERVER_PORT = 2020;
export const CLIENT_GROUP = '224.0.0.2';

export const DISCOVERY_INTERVAL = 10000;

export const ACTION = 'action';
export const OPERATOR = 'operator';

export const ACTION_SET = 'ACTION_SET';
export const ACTION_ASSET = 'ACTION_ASSET';
export const ACTION_INIT = 'ACTION_INIT';
export const ACTION_DOWNLOAD = 'ACTION_DOWNLOAD';

export const ACTION_RGB_DIM = 'ACTION_RGB_DIM';
export const ACTION_RGB_BUTTON_SET = 'ACTION_RGB_BUTTON_SET';
export const ACTION_ENABLE = 'ACTION_ENABLE';
export const ACTION_DISABLE = 'ACTION_DISABLE';
export const ACTION_ON = 'ACTION_ON';
export const ACTION_OFF = 'ACTION_OFF';
export const ACTION_DIM = 'ACTION_DIM';
export const ACTION_DIM_RELATIVE = 'ACTION_DIM_RELATIVE';
export const ACTION_SITE_LIGHT_DIM_RELATIVE = 'ACTION_SITE_LIGHT_DIM_RELATIVE';
export const ACTION_SITE_LIGHT_OFF = 'ACTION_SITE_LIGHT_OFF';
export const ACTION_SETPOINT = 'ACTION_SETPOINT';
export const ACTION_INC_SETPOINT = 'ACTION_INC_SETPOINT';
export const ACTION_DEC_SETPOINT = 'ACTION_DEC_SETPOINT';
export const ACTION_TIMER_START = 'ACTION_TIMER_START';
export const ACTION_TIMER_STOP = 'ACTION_TIMER_STOP';
export const ACTION_SCHEDULE_START = 'ACTION_SCHEDULE_START';
export const ACTION_SCHEDULE_STOP = 'ACTION_SCHEDULE_STOP';
export const ACTION_CLOCK_START = 'ACTION_CLOCK_START';
export const ACTION_CLOCK_STOP = 'ACTION_CLOCK_STOP';
export const ACTION_CLOCK_TEST = 'ACTION_CLOCK_TEST';
export const ACTION_NIGHT_TEST = 'ACTION_NIGHT_TEST';
export const ACTION_DAY_TEST = 'ACTION_DAY_TEST';
export const ACTION_DOPPLER_HANDLE = 'ACTION_DOPPLER_HANDLE';
export const ACTION_THERMOSTAT_HANDLE = 'ACTION_THERMOSTAT_HANDLE';
export const ACTION_LIMIT_HEATING_HANDLE = 'ACTION_LIMIT_HEATING_HANDLE';
export const ACTION_LEAKAGE_HANDLE = 'ACTION_LEAKAGE_HANDLE';
export const ACTION_TOGGLE = 'ACTION_TOGGLE';
export const ACTION_TV = 'ACTION_TV';
export const ACTION_SCRIPT_RUN = 'ACTION_SCRIPT_RUN';

export const ACTION_MOVE_TO_HUE = 'ACTION_MOVE_TO_HUE';
export const ACTION_MOVE_TO_SATURATION = 'ACTION_MOVE_TO_SATURATION';
export const ACTION_MOVE_TO_HUE_SATURATION = 'ACTION_MOVE_TO_HUE_SATURATION';
export const ACTION_MOVE_TO_LEVEL = 'ACTION_MOVE_TO_LEVEL';

export const ACTION_STOP = 'ACTION_STOP';
export const ACTION_OPEN = 'ACTION_OPEN';
export const ACTION_CLOSE = 'ACTION_CLOSE';

export const ACTION_SET_ADDRESS = 'ACTION_SET_ADDRESS';
export const ACTION_SET_FAN_SPEED = 'ACTION_SET_FAN_SPEED';
export const ACTION_SET_MODE = 'ACTION_SET_MODE';
export const ACTION_SET_DIRECTION = 'ACTION_SET_DIRECTION';

export const CLOSURE = 'closure';
export const STOP = 'stop';
export const OPEN = 'open';
export const CLOSE = 'close';


export const ACTION_DO = 0x00;
export const ACTION_GROUP = 0x02;
export const ACTION_DI_RELAY_SYNC = 0x03;
export const ACTION_VIBRO = 0x0a;
export const ACTION_IR = 0x10;
export const ACTION_IR_CONFIG = 0x11;
export const ACTION_LANAMP = 0x20;
export const ACTION_RTP = 0x21;
export const ACTION_RS485_MODE = 0xa0;
export const ACTION_DOPPLER = 0xb0;
export const ACTION_TEMPERATURE_CORRECT = 0xcf
export const ACTION_DIMMER = 0xd0;
export const ACTION_ARTNET = 0xd1;
export const ACTION_IMAGE = 0xe1;
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
export const DEVICE_TYPE_DOPPLER_LEGACY = 0x04;
export const DEVICE_TYPE_DMX = 0x05;
export const DEVICE_TYPE_RS485 = 0x06;
export const DEVICE_TYPE_IR1 = 0x14;
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
export const DEVICE_TYPE_DIM8_LEGACY = 0x0f;

export const DEVICE_TYPE_DI_4 = 0x20;
export const DEVICE_TYPE_CLIMATE = 0x21;
export const DEVICE_TYPE_DOPPLER = 0x22;
export const DEVICE_TYPE_RELAY_2 = 0x23;
export const DEVICE_TYPE_IR_4 = 0x24;
export const DEVICE_TYPE_SMART_4G = 0x25;
export const DEVICE_TYPE_SMART_4GD = 0x26;
export const DEVICE_TYPE_SMART_4A = 0x27;

export const DEVICE_TYPE_RELAY_6 = 0xa0;
export const DEVICE_TYPE_RELAY_12 = 0xa1;
export const DEVICE_TYPE_RELAY_24 = 0xa2;
export const DEVICE_TYPE_DIM_4 = 0xa3;
export const DEVICE_TYPE_DIM_8 = 0xa4;
export const DEVICE_TYPE_LAN_AMP = 0xa5;
export const DEVICE_TYPE_RSHUB = 0xa6;
export const DEVICE_TYPE_RELAY_2_DIN = 0xa7;
export const DEVICE_TYPE_DI_8_DIN = 0xa8;
export const DEVICE_TYPE_AO_4_DIN = 0xa9;
export const DEVICE_TYPE_MIX_2 = 0xaa;
export const DEVICE_TYPE_MIX_1 = 0xab;
export const DEVICE_TYPE_MIX_1_RS = 0xac;
export const DEVICE_TYPE_PNP = 0xe0;

export const DEVICE_TYPE_TEMPERATURE_EXT = 0xf0;

export const DEVICE_TYPE_PLC = 0xfe;
export const DEVICE_TYPE_BOOTLOADER = 0xff;

export const ACTION_MULTIROOM_ZONE = 'ACTION_MULTIROOM_ZONE';

export const DRIVER_TYPE_ARTNET = 'ARTNET';
export const DRIVER_TYPE_RS21 = 'RS21';
export const DRIVER_TYPE_BB_PLC1 = 'BB_PLC1';
export const DRIVER_TYPE_BB_PLC2 = 'BB_PLC2';
export const DRIVER_TYPE_M206 = 'M206';
export const DRIVER_TYPE_M230 = 'M230';
export const DRIVER_TYPE_MODBUS = 'MODBUS';
export const DRIVER_TYPE_NOVA = 'NOVA';
export const DRIVER_TYPE_VARMANN = 'VARMANN';
export const DRIVER_TYPE_INTESIS_BOX = 'INTESIS_BOX';

export const DI_OFF = 0x0;
export const DI_ON = 0x1;
export const DI_HOLD = 0x2;
export const DI_CLICK = 0x3;
export const DI_CLICK_2 = 0x4;
export const DI_CLICK_3 = 0x5;

export const DO_OFF = 0x0;
export const DO_ON = 0x1;

export const DIM_OFF = 0x0;
export const DIM_ON = 0x1;
export const DIM_SET = 0x2;
export const DIM_FADE = 0x3;
export const DIM_TYPE = 0x4;
export const DIM_GROUP = 0x5;

export const DIM_TYPES = ['Unplugged', 'Rising edge', 'Falling edge', 'PWM', 'Relay'];
export const RS485_LINE_CONTROLS = ['8n1', '8e1', '8o1', '9n1', '8n2', '8e2', '8o2', '9n2'];

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
export const PARENT = 'parent';
export const SCENE = 'scene';
export const SCRIPT = 'script';
export const TIMER = 'timer';
export const SCHEDULE = 'schedule';
export const CLOCK = 'clock';
export const ADDRESS = 'address';
export const MODBUS = 'modbus';
export const CODE = 'code';
export const DELAY = 'delay';
export const TITLE = 'title';
export const MESSAGE = 'message';
export const IMAGE = 'image';
export const CAMERA_URL = 'camera_URL';
export const PREVIEW_URL = 'preview_URL';
export const MAIN_URL = 'main_URL';
export const ACTIVE = 'active';
export const THERMOSTAT = 'thermostat';
export const DISPLAY = 'display';
export const HEATER = 'heater';
export const LEAKAGE = 'leakage';
export const WATER_COUNTER = 'water_counter';
export const ELECTRICITY_METER = 'electricity_meter';
export const SECURITY = 'security';
export const SETPOINT = 'setpoint';
export const LOCATION = 'location';
export const WEATHER = 'weather';
export const SUNRISE = 'sunrise';
export const SUNSET = 'sunset';
export const DRIVER = 'driver';
export const TERMINAL = 'terminal';
export const IP = 'ip';
export const MIN = 'min';
export const MAX = 'max';

export const QUIET = 'QUIET';
export const LOW_THRESHOLD = 'LOW_THRESHOLD';
export const HIGH_THRESHOLD = 'HIGH_THRESHOLD';

export const STOP_COOL = 'STOP_COOL';
export const STOP_HEAT = 'STOP_HEAT';
export const START_COOL = 'START_COOL';
export const START_HEAT = 'START_HEAT';
export const HYSTERESIS = 'hysteresis';
export const COOL_THRESHOLD = 'cool_threshold';
export const COOL_HYSTERESIS = 'cool_hysteresis';
export const HEAT_THRESHOLD = 'heat_threshold';
export const HEAT_HYSTERESIS = 'heat_hysteresis';

export const LIGHT = 'light';
export const LIGHT_220 = 'light_220';
export const LIGHT_LED = 'light_LED';
export const LIGHT_RGB = 'light_RGB';
export const BUTTON = 'button';
export const SENSOR = 'sensor';
export const DOPPLER = 'doppler';
export const SMOCK_SENSOR = 'smock_sensor';
export const MOTION_SENSOR = 'motion_sensor';
export const LEAKAGE_SENSOR = 'leakage_sensor';
export const REED = 'reed';
export const VALVE_HEATING = 'valve_heating';
export const WARM_FLOOR = 'warm_floor';
export const VALVE_WATER = 'valve_water';
export const SOCKET_220 = 'socket_220';
export const BOILER = 'boiler';
export const PUMP = 'pump';
export const FAN = 'fan';
export const TV = 'TV';
export const AC = 'AC';
export const SOCKET_RJ45 = 'socket_RJ45';
export const ACCESS_POINT = 'access_point';
export const MULTIROOM = 'multiroom';
export const CAMERA = 'camera';
export const INTERCOM = 'intercom';
export const SIP_USER = 'SIP_user';
export const ALARM = 'alarm';
export const ENDPOINT = 'endpoint';
export const LEVEL = 'level';
export const COLOR = 'color';
export const CURTAINS = 'curtains';
export const RING = 'ring';

export const MODEL = 'model';

export const NOTIFY = 'notify';

export const IR = 'ir';
export const DO = 'do';
export const DI = 'di';
export const AO = 'ao';
export const DIM = 'dim';
export const GROUP = 'group';
export const ARTNET = 'artnet';
export const RS485 = 'rs485';
export const ZIGBEE = 'zigbee';
export const LANAMP = 'lanamp';
export const RTP = 'rtp';
export const MONO = 'mono';
export const STEREO = 'stereo';

export const TEMPERATURE = 'temperature';
export const HUMIDITY = 'humidity';
export const ILLUMINATION = 'illumination';

export const ARTNET_OFF = 0x0;
export const ARTNET_ON = 0x1;
export const ARTNET_SET = 0x2;
export const ARTNET_FADE = 0x3;
export const ARTNET_TYPE = 0x4;
export const ARTNET_CONFIG = 0x5;

export const DIM_TYPE_UNPLUGGED = 0x0;
export const DIM_TYPE_RISING_EDGE = 0x1;
export const DIM_TYPE_FALLING_EDGE = 0x2;
export const DIM_TYPE_PWM = 0x3;
export const DIM_TYPE_RELAY = 0x4;

export const ARTNET_TYPE_UNPLUGGED = 0x0;
export const ARTNET_TYPE_DIMMER = 0x1;
export const ARTNET_TYPE_RELAY = 0x2;

export const ARTNET_TYPES = ['Unplugged', 'Dimmer', 'Relay'];

export const MODEL_TYPE = [
  SCENE,
  LIGHT_220,
  LIGHT_LED,
  LIGHT_RGB,
  CURTAINS,
  BUTTON,
  SENSOR,
  DRIVER_TYPE_RS21,
  DOPPLER,
  REED,
  MOTION_SENSOR,
  SMOCK_SENSOR,
  LEAKAGE_SENSOR,
  VALVE_WATER,
  VALVE_HEATING,
  WARM_FLOOR,
  TV,
  AC,
  FAN,
  SOCKET_220,
  SOCKET_RJ45,
  BOILER,
  PUMP,
  ACCESS_POINT,
  MULTIROOM,
  CAMERA,
  INTERCOM,
  RING,
  TOUCH,
  THERMOSTAT,
  LEAKAGE,
  WATER_COUNTER,
  ELECTRICITY_METER,
  SECURITY
];

export const ACTION_TYPE = [
  ACTION_ENABLE,
  ACTION_DISABLE,
  ACTION_OFF,
  ACTION_ON,
  ACTION_DIM,
  ACTION_DIM_RELATIVE,
  ACTION_SITE_LIGHT_DIM_RELATIVE,
  ACTION_SITE_LIGHT_OFF,
  ACTION_RGB_DIM,
  ACTION_RGB_BUTTON_SET,
  ACTION_OPEN,
  ACTION_CLOSE,
  ACTION_STOP,
  ACTION_SETPOINT,
  ACTION_INC_SETPOINT,
  ACTION_DEC_SETPOINT,
  ACTION_TIMER_START,
  ACTION_TIMER_STOP,
  ACTION_SCHEDULE_START,
  ACTION_SCHEDULE_STOP,
  ACTION_CLOCK_START,
  ACTION_CLOCK_STOP,
  ACTION_CLOCK_TEST,
  ACTION_NIGHT_TEST,
  ACTION_DAY_TEST,
  ACTION_DOPPLER_HANDLE,
  ACTION_THERMOSTAT_HANDLE,
  ACTION_LIMIT_HEATING_HANDLE,
  ACTION_LEAKAGE_HANDLE,
  ACTION_TOGGLE,
  ACTION_TV,
  ACTION_SET,
  ACTION_SCRIPT_RUN,
  NOTIFY,
  RING,
];

export const INTERFACE = 'interface';

export const onIR = 'onIR';
export const onOff = 'onOff';
export const onOn = 'onOn';
export const onHold = 'onHold';
export const onClick = 'onClick';
export const onClick2 = 'onClick2';
export const onClick3 = 'onClick3';
export const onOpen = 'onOpen';
export const onClose = 'onClose';
export const onStop = 'onStop';
export const onDoppler = 'onDoppler';
export const onHighThreshold = 'onHighThreshold';
export const onLowThreshold = 'onLowThreshold';
export const onQuiet = 'onQuiet';
export const onTemperature = 'onTemperature';
export const onTemperatureExt = 'onTemperatureExt';
export const onHumidity = 'onHumidity';
export const onIllumination = 'onIllumination';
export const onStartCool = 'onStartCool';
export const onStartHeat = 'onStartHeat';
export const onStopHeat = 'onStopHeat';
export const onStopCool = 'onStopCool';
export const onTrue = 'onTrue';
export const onFalse = 'onFalse';
export const onSunrise = 'onSunrise';
export const onSunset = 'onSunset';

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

export const OPEN_CLOSE = 'open_close';
export const CLOSE_OPEN = 'close_open';
export const LEFT_RIGTH = 'left_right';
export const RIGTH_LEFT = 'right_left';
export const UP_DOWN = 'up_down';

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
  [DEVICE_TYPE_DOPPLER_LEGACY]: {
    title: 'Doppler (legacy)',
    firmware: 'doppler'
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
  [DEVICE_TYPE_IR1]: {
    title: 'IR-1',
    firmware: 'ir1'
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
    title: 'DO-8 / DI-  16',
    firmware: 'do8_di16',
    hasFindMeAction: true,
  },
  [DEVICE_TYPE_DI_4]: {
    title: 'DI 4',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_DI_8_DIN]: {
    title: 'DI 8',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_DIM4]: {
    title: 'Dimmer 4',
    firmware: 'dim4',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_DIM8_LEGACY]: {
    title: 'Dimmer 8',
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
  [DEVICE_TYPE_CLIMATE]: {
    title: 'Climate Sensor',
    hasFindMeAction: true,
  },
  [DEVICE_TYPE_IR_4]: {
    title: 'IR 4',
    hasFindMeAction: true,
  },
  [DEVICE_TYPE_RELAY_2]: {
    title: 'Relay 2',
    hasFindMeAction: true,
  },
  [DEVICE_TYPE_RELAY_2_DIN]: {
    title: 'Relay 2 DIN',
    hasFindMeAction: true,
  },
  [DEVICE_TYPE_RELAY_6]: {
    title: 'Relay 6',
    hasFindMeAction: true,
  },
  [DEVICE_TYPE_RELAY_12]: {
    title: 'Relay 12',
    hasFindMeAction: true,
  },
  [DEVICE_TYPE_RELAY_24]: {
    title: 'Relay 24',
    hasFindMeAction: true,
  },
  [DEVICE_TYPE_DIM_8]: {
    title: 'Dimmer 8',
    hasFindMeAction: true,
  },
  [DEVICE_TYPE_DIM_4]: {
    title: 'Dimmer 4',
    hasFindMeAction: true,
  },
  [DEVICE_TYPE_LAN_AMP]: {
    title: 'Lan Amp',
    hasFindMeAction: true,
  },
  [DEVICE_TYPE_RSHUB]: {
    title: 'RS Hub',
    hasFindMeAction: true,
  },
  [DEVICE_TYPE_SMART_4G]: {
    title: 'Smart 4G',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_SMART_4GD]: {
    title: 'Smart 4GD',
    hasFindMeAction: true
  },
  [DEVICE_TYPE_SMART_4A]: {
    title: 'Smart 4A',
    hasFindMeAction: true
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
  [DEVICE_TYPE_TEMPERATURE_EXT]: {
    title: 'External temperature'
  },
  [DEVICE_TYPE_MIX_1]: {
    title: 'MIX1'
	},
	[DEVICE_TYPE_MIX_1_RS]: {
    title: 'MIX1 RS'
  },
  [DEVICE_TYPE_MIX_2]: {
    title: 'MIX2'
  },
  [DEVICE_TYPE_AO_4_DIN]: {
    title: 'AO4 DIN'
  },
};

export const DRIVER_TYPES = {
  [DRIVER_TYPE_ARTNET]: {
    title: 'Artnet'
  },
  [DRIVER_TYPE_RS21]: {
    title: 'Wi-Fi Temperature Sensor RS21'
  },
  [DRIVER_TYPE_BB_PLC1]: {
    title: 'BB_PLC1'
  },
  [DRIVER_TYPE_BB_PLC2]: {
    title: 'BB_PLC2'
  },
  [DRIVER_TYPE_M206]: {
    title: 'Mercury M206'
  },
  [DRIVER_TYPE_M230]: {
    title: 'Mercury M230'
  },
  [DRIVER_TYPE_MODBUS]: {
    title: 'Modbus'
  },
  [DRIVER_TYPE_VARMANN]: {
    title: 'Varmann'
  },
  [DRIVER_TYPE_INTESIS_BOX]: {
    title: 'Imtesis Box'
  },
  [DRIVER_TYPE_NOVA]: {
    title: 'Nova'
  },
};
