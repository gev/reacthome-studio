
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
  DEVICE_TYPE_SMART_4,
  DEVICE_TYPE_PLC,
  DEVICE_TYPE_IR_RECEIVER,
  DEVICE_TYPE_CLIMATE,
  DEVICE_TYPE_RSHUB
} from '../../constants';
import Doppler from './DeviceDoppler';
import Dimmer from './DeviceDimmer';
import Plc from './DevicePlc';
import Do8 from './DeviceDo8';
import Do12 from './DeviceDo12';
import Relay2 from './DeviceRelay2';
import Relay6 from './DeviceRelay6';
import Relay12 from './DeviceRelay12';
import Relay24 from './DeviceRelay24';
import Di4 from './DeviceDi4';
import Di16 from './DeviceDi16';
import Di24 from './DeviceDi24';
import Sensor from './DeviceSensor';
import Climate from './DeviceClimate';
import IrReceiver from './DeviceIRReceiver';
import RSHub from './DeviceRSHub';

type Props = {
  type: ?string
};

export default (props: Props) => {
  switch (props.type) {
    case DEVICE_TYPE_DOPPLER: return <Doppler {...props} />;
    case DEVICE_TYPE_DOPPLER_LEGACY: return <Doppler {...props} />;
    case DEVICE_TYPE_DIM4_LEGACY: return <Dimmer {...props} n={4} />;
    case DEVICE_TYPE_DIM_4: return <Dimmer {...props} n={4} />;
    case DEVICE_TYPE_DIM_8: return <Dimmer {...props} n={8} />;
    case DEVICE_TYPE_DIM8_LEGACY: return <Dimmer {...props} n={8} />;
    case DEVICE_TYPE_DI_4: return <Di4 {...props} />;
    case DEVICE_TYPE_DI16: return <Di16 {...props} />;
    case DEVICE_TYPE_DI24: return <Di24 {...props} />;
    case DEVICE_TYPE_DO8: return <Do8 {...props} />;
    case DEVICE_TYPE_DO12: return <Do12 {...props} />;
    case DEVICE_TYPE_RELAY_2: return <Relay2 {...props} />;
    case DEVICE_TYPE_RELAY_6: return <Relay6 {...props} />;
    case DEVICE_TYPE_RELAY_12: return <Relay12 {...props} />;
    case DEVICE_TYPE_RELAY_24: return <Relay24 {...props} />;
    case DEVICE_TYPE_PLC: return <Plc {...props} />;
    case DEVICE_TYPE_SENSOR4: return <Sensor {...props} />;
    case DEVICE_TYPE_CLIMATE: return <Climate {...props} />;
    case DEVICE_TYPE_SMART_4: return <Sensor {...props} />;
    case DEVICE_TYPE_IR_RECEIVER: return <IrReceiver {...props} />;
    case DEVICE_TYPE_RSHUB: return <RSHub {...props} />;
    default: return null;
  }
};
