
import React from 'react';
import {
  DEVICE_TYPE_AO_4_DIN,
  DEVICE_TYPE_CLIMATE,
  DEVICE_TYPE_CO2,
  DEVICE_TYPE_DI16,
  DEVICE_TYPE_DI24,
  DEVICE_TYPE_DIM4 as DEVICE_TYPE_DIM4_LEGACY,
  DEVICE_TYPE_DIM8_LEGACY,
  DEVICE_TYPE_DIM_12_AC_RS,
  DEVICE_TYPE_DIM_12_DC_RS,
  DEVICE_TYPE_DIM_12_LED_RS,
  DEVICE_TYPE_DIM_4,
  DEVICE_TYPE_DIM_8,
  DEVICE_TYPE_DIM_8_RS,
  DEVICE_TYPE_DI_4,
  DEVICE_TYPE_DI_8_DIN,
  DEVICE_TYPE_DO12,
  DEVICE_TYPE_DO8,
  DEVICE_TYPE_DOPPLER,
  DEVICE_TYPE_DOPPLER_LEGACY,
  DEVICE_TYPE_IR_RECEIVER,
  DEVICE_TYPE_LAN_AMP,
  DEVICE_TYPE_MIX_1,
  DEVICE_TYPE_MIX_1_RS,
  DEVICE_TYPE_MIX_2,
  DEVICE_TYPE_MIX_6x12_RS,
  DEVICE_TYPE_PLC,
  DEVICE_TYPE_RELAY_12,
  DEVICE_TYPE_RELAY_12_RS,
  DEVICE_TYPE_RELAY_2,
  DEVICE_TYPE_RELAY_24,
  DEVICE_TYPE_RELAY_2_DIN,
  DEVICE_TYPE_RELAY_6,
  DEVICE_TYPE_RSHUB,
  DEVICE_TYPE_RS_HUB_1,
  DEVICE_TYPE_RS_HUB_1_LEGACY,
  DEVICE_TYPE_RS_HUB_1_RS,
  DEVICE_TYPE_RS_HUB_4,
  DEVICE_TYPE_RS_HUB_4_LEGACY,
  DEVICE_TYPE_SENSOR4,
  DEVICE_TYPE_SERVER,
  DEVICE_TYPE_SMART_4A,
  DEVICE_TYPE_SMART_4AM,
  DEVICE_TYPE_SMART_4G,
  DEVICE_TYPE_SMART_4GD,
  DEVICE_TYPE_SMART_6_PUSH,
  DEVICE_TYPE_TEMPERATURE_EXT,
  ZIGBEE
} from '../../constants';
import DeviceAO from './DeviceAO';
import DeviceCO2 from './DeviceCO2';
import Climate from './DeviceClimate';
import Di16 from './DeviceDi16';
import Di24 from './DeviceDi24';
import Di4 from './DeviceDi4';
import Di8 from './DeviceDi8';
import Dimmer from './DeviceDimmer';
import Do12 from './DeviceDo12';
import Do8 from './DeviceDo8';
import Doppler from './DeviceDoppler';
import IrReceiver from './DeviceIRReceiver';
import Lanamp from './DeviceLanamp';
import Mix1 from './DeviceMix1';
import DeviceMix1rs from './DeviceMix1rs';
import DeviceMix3rs_3 from './DeviceMix1rs_3';
import Mix2 from './DeviceMix2';
import DeviceMix6x12 from './DeviceMix6x12';
import Plc from './DevicePlc';
import RSHub from './DeviceRSHub';
import DeviceRSHub1RS from './DeviceRSHub1RS';
import DeviceRSHub4l from './DeviceRSHub4l';
import DeviceRSHub4 from './DeviceRSHub4';
import Relay12 from './DeviceRelay12';
import Relay12v2 from './DeviceRelay12_2';
import Relay12v3 from './DeviceRelay12_3';
import Relay12RSv3 from './DeviceRelay12rs_3';
import Relay2 from './DeviceRelay2';
import Relay24 from './DeviceRelay24';
import Relay2DIN from './DeviceRelay2DIN';
import Relay6 from './DeviceRelay6';
import Relay6v2 from './DeviceRelay6_2';
import Sensor from './DeviceSensor';
import DeviceServer from './DeviceServer';
import TempExt from './DeviceTempExt';
import Zigbee from './DeviceZigbee';

export default (props) => {
  switch (props.type) {
    case DEVICE_TYPE_DOPPLER: return <Doppler {...props} />;
    case DEVICE_TYPE_DOPPLER_LEGACY: return <Doppler {...props} />;
    case DEVICE_TYPE_DIM4_LEGACY: return <Dimmer {...props} n={4} />;
    case DEVICE_TYPE_AO_4_DIN: return <DeviceAO {...props} n={4} />;
    case DEVICE_TYPE_DIM_4: return <Dimmer {...props} n={4} />;
    case DEVICE_TYPE_DIM_8: return <Dimmer {...props} n={8} />;
    case DEVICE_TYPE_DIM_8_RS: return <Dimmer {...props} n={8} />;
    case DEVICE_TYPE_DIM_12_LED_RS: return <Dimmer {...props} n={12} />;
    case DEVICE_TYPE_DIM_12_AC_RS: return <Dimmer {...props} n={12} />;
    case DEVICE_TYPE_DIM_12_DC_RS: return <Dimmer {...props} n={12} />;
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
    case DEVICE_TYPE_MIX_6x12_RS: return <DeviceMix6x12 {...props} />
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
      return <Sensor {...props} button={4} led={4} hasDoppler />;
    case DEVICE_TYPE_SMART_4GD:
      return <Sensor {...props} button={4} led={4} hasDoppler hasDisplay />;
    case DEVICE_TYPE_SMART_4A:
      return <Sensor {...props} button={4} led={5} />;
    case DEVICE_TYPE_SMART_4AM:
      return <Sensor {...props} button={4} led={5} hasDoppler />;
    case DEVICE_TYPE_SMART_6_PUSH:
      return <Sensor {...props} button={6} led={6} hasDoppler />;
    case DEVICE_TYPE_CO2:
      return <DeviceCO2 {...props} />;
    case DEVICE_TYPE_CLIMATE: return <Climate {...props} />;
    case DEVICE_TYPE_TEMPERATURE_EXT: return <TempExt {...props} />;
    case DEVICE_TYPE_IR_RECEIVER: return <IrReceiver {...props} />;
    case DEVICE_TYPE_RSHUB: return <RSHub {...props} />;
    case DEVICE_TYPE_LAN_AMP: return <Lanamp {...props} />;
    case DEVICE_TYPE_RS_HUB_1_LEGACY: return <DeviceRSHub1RS {...props} />;
    case DEVICE_TYPE_RS_HUB_4_LEGACY: return <DeviceRSHub4l {...props} />;
    case DEVICE_TYPE_RS_HUB_1_RS: return <DeviceRSHub1RS {...props} is_rbus={false} />;
    case DEVICE_TYPE_SERVER: return <DeviceServer {...props} />;
    case DEVICE_TYPE_RS_HUB_4: return <DeviceRSHub4 {...props} />;
    default: {
      switch (props.protocol) {
        case ZIGBEE: return <Zigbee {...props} />;
        default: return null;
      }
    }
  }
};
