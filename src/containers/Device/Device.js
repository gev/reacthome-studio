
import React from 'react';
import {
  DEVICE_TYPE_DOPPLER,
  DEVICE_TYPE_DOPPLER_LEGACY,
  DEVICE_TYPE_DIM4 as DEVICE_TYPE_DIM4_LEGACY,
  DEVICE_TYPE_DIM_4,
  DEVICE_TYPE_DIM_8,
  DEVICE_TYPE_DIM8_LEGACY,
  DEVICE_TYPE_DI_4,
  DEVICE_TYPE_DI16,
  DEVICE_TYPE_DI24,
  DEVICE_TYPE_DO8,
  DEVICE_TYPE_DO12,
  DEVICE_TYPE_RELAY_2,
  DEVICE_TYPE_RELAY_6,
  DEVICE_TYPE_RELAY_12,
  DEVICE_TYPE_RELAY_24,
  DEVICE_TYPE_SENSOR4,
  DEVICE_TYPE_SMART_4G,
  DEVICE_TYPE_PLC,
  DEVICE_TYPE_IR_RECEIVER,
  DEVICE_TYPE_CLIMATE,
  DEVICE_TYPE_RSHUB,
  DEVICE_TYPE_TEMPERATURE_EXT,
  ZIGBEE,
  DEVICE_TYPE_RELAY_2_DIN, DEVICE_TYPE_DI_8_DIN, DEVICE_TYPE_MIX_2, DEVICE_TYPE_LAN_AMP, DEVICE_TYPE_MIX_1, DEVICE_TYPE_AO_4_DIN, DEVICE_TYPE_SMART_4A, DEVICE_TYPE_SMART_4GD, DEVICE_TYPE_MIX_1_RS, DEVICE_TYPE_DIM_12_LED_RS, DEVICE_TYPE_RELAY_12_RS
} from '../../constants';
import Doppler from './DeviceDoppler';
import Dimmer from './DeviceDimmer';
import Plc from './DevicePlc';
import Do8 from './DeviceDo8';
import Do12 from './DeviceDo12';
import Relay2 from './DeviceRelay2';
import Relay2DIN from './DeviceRelay2DIN';
import Relay6 from './DeviceRelay6';
import Relay6v2 from './DeviceRelay6_2';
import Relay12 from './DeviceRelay12';
import Relay12v2 from './DeviceRelay12_2';
import Relay12v3 from './DeviceRelay12_3';
import Relay12RSv3 from './DeviceRelay12rs_3';
import Relay24 from './DeviceRelay24';
import Di4 from './DeviceDi4';
import Di8 from './DeviceDi8';
import Di16 from './DeviceDi16';
import Di24 from './DeviceDi24';
import Sensor from './DeviceSensor';
import Climate from './DeviceClimate';
import TempExt from './DeviceTempExt';
import IrReceiver from './DeviceIRReceiver';
import RSHub from './DeviceRSHub';
import Zigbee from './DeviceZigbee';
import Mix2 from './DeviceMix2';
import Lanamp from './DeviceLanamp';
import Mix1 from './DeviceMix1';
import DeviceAO from './DeviceAO';
import DeviceMix1rs from './DeviceMix1rs';
import DeviceMix3rs_3 from './DeviceMix1rs_3';

export default (props) => {
  switch (props.type) {
    case DEVICE_TYPE_DOPPLER: return <Doppler {...props} />;
    case DEVICE_TYPE_DOPPLER_LEGACY: return <Doppler {...props} />;
    case DEVICE_TYPE_DIM4_LEGACY: return <Dimmer {...props} n={4} />;
    case DEVICE_TYPE_AO_4_DIN: return <DeviceAO {...props} n={4} />;
    case DEVICE_TYPE_DIM_4: return <Dimmer {...props} n={4} />;
    case DEVICE_TYPE_DIM_8: return <Dimmer {...props} n={8} />;
    case DEVICE_TYPE_DIM_12_LED_RS: return <Dimmer {...props} n={12} />;
    case DEVICE_TYPE_DIM8_LEGACY: return <Dimmer {...props} n={8} />;
    case DEVICE_TYPE_DI_4: return <Di4 {...props} />;
    case DEVICE_TYPE_DI_8_DIN: return <Di8 {...props} />;
    case DEVICE_TYPE_DI16: return <Di16 {...props} />;
    case DEVICE_TYPE_DI24: return <Di24 {...props} />;
    case DEVICE_TYPE_DO8: return <Do8 {...props} />;
    case DEVICE_TYPE_DO12: return <Do12 {...props} />;
    case DEVICE_TYPE_RELAY_2: return <Relay2 {...props} />;
    case DEVICE_TYPE_RELAY_2_DIN: return <Relay2DIN {...props} />;
    case DEVICE_TYPE_MIX_1: return <Mix1 {...props} />;
    case DEVICE_TYPE_MIX_1_RS: {
      const [major] = (props.version || '').split('.');
      switch (major) {
        case '3':
          return <DeviceMix3rs_3 {...props} />;
        default:
          return <DeviceMix1rs {...props} />;
      }
    }
    case DEVICE_TYPE_MIX_2: return <Mix2 {...props} />;
    case DEVICE_TYPE_RELAY_6: {
      const [major] = (props.version || '').split('.');
      switch (major) {
        case '2':
        case '3':
          return <Relay6v2 {...props} />;
        default:
          return <Relay6 {...props} />;
      }
    }
    case DEVICE_TYPE_RELAY_12_RS: {
      return <Relay12RSv3 {...props} />;
    }
    case DEVICE_TYPE_RELAY_12: {
      const [major] = (props.version || '').split('.');
      switch (major) {
        case '2':
          return <Relay12v2 {...props} />;
        case '3':
          return <Relay12v3 {...props} />;
        default:
          return <Relay12 {...props} />;
      }
    }
    case DEVICE_TYPE_RELAY_24: return <Relay24 {...props} />;
    case DEVICE_TYPE_PLC: return <Plc {...props} />;
    case DEVICE_TYPE_SENSOR4:
    case DEVICE_TYPE_SMART_4G:
      return <Sensor {...props} led={4} hasDoppler />;
    case DEVICE_TYPE_SMART_4GD:
      return <Sensor {...props} led={4} hasDoppler hasDisplay />;
    case DEVICE_TYPE_SMART_4A:
      return <Sensor {...props} led={5} />;
    case DEVICE_TYPE_CLIMATE: return <Climate {...props} />;
    case DEVICE_TYPE_TEMPERATURE_EXT: return <TempExt {...props} />;
    case DEVICE_TYPE_IR_RECEIVER: return <IrReceiver {...props} />;
    case DEVICE_TYPE_RSHUB: return <RSHub {...props} />;
    case DEVICE_TYPE_LAN_AMP: return <Lanamp {...props} />;
    default: {
      switch (props.protocol) {
        case ZIGBEE: return <Zigbee {...props} />;
        default: return null;
      }
    }
  }
};
