
import React from 'react';
import {
  DEVICE_TYPE_DOPPLER,
  DEVICE_TYPE_DIM4,
  DEVICE_TYPE_DI16,
  DEVICE_TYPE_DO8,
  DEVICE_TYPE_SENSOR4,
  DEVICE_TYPE_PLC
} from '../../constants';
import Doppler from './DeviceDoppler';
import Dimmer from './DeviceDimmer';
import Plc from './DevicePlc';
import Do8 from './DeviceDo8';
import Di16 from './DeviceDi16';
import Sensor from './DeviceSensor';

type Props = {
  type: ?string
};

export default (props: Props) => {
  switch (props.type) {
    case DEVICE_TYPE_DOPPLER: return <Doppler {...props} />;
    case DEVICE_TYPE_DIM4: return <Dimmer {...props} />;
    case DEVICE_TYPE_DI16: return <Di16 {...props} />;
    case DEVICE_TYPE_DO8: return <Do8 {...props} />;
    case DEVICE_TYPE_PLC: return <Plc {...props} />;
    case DEVICE_TYPE_SENSOR4: return <Sensor {...props} />;
    default: return null;
  }
};
