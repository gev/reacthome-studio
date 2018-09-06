
import React from 'react';
import {
  DEVICE_TYPE_DOPPLER,
  DEVICE_TYPE_DIM4,
  DEVICE_TYPE_DIM8,
  DEVICE_TYPE_DI16,
  DEVICE_TYPE_DI24,
  DEVICE_TYPE_DO8,
  DEVICE_TYPE_DO12,
  DEVICE_TYPE_SENSOR4,
  DEVICE_TYPE_PLC,
  DEVICE_TYPE_IR_RECEIVER
} from '../../constants';
import Doppler from './DeviceDoppler';
import Dimmer from './DeviceDimmer';
import Plc from './DevicePlc';
import Do8 from './DeviceDo8';
import Do12 from './DeviceDo12';
import Di16 from './DeviceDi16';
import Di24 from './DeviceDi24';
import Sensor from './DeviceSensor';
import IrReceiver from './DeviceIRReceiver';

type Props = {
  type: ?string
};

export default (props: Props) => {
  switch (props.type) {
    case DEVICE_TYPE_DOPPLER: return <Doppler {...props} />;
    case DEVICE_TYPE_DIM4: return <Dimmer {...props} n={4} />;
    case DEVICE_TYPE_DIM8: return <Dimmer {...props} n={8} />;
    case DEVICE_TYPE_DI16: return <Di16 {...props} />;
    case DEVICE_TYPE_DI24: return <Di24 {...props} />;
    case DEVICE_TYPE_DO8: return <Do8 {...props} />;
    case DEVICE_TYPE_DO12: return <Do12 {...props} />;
    case DEVICE_TYPE_PLC: return <Plc {...props} />;
    case DEVICE_TYPE_SENSOR4: return <Sensor {...props} />;
    case DEVICE_TYPE_IR_RECEIVER: return <IrReceiver {...props} />;
    default: return null;
  }
};
