
import React from 'react';
import { DEVICE_TYPE_DOPPLER, DEVICE_TYPE_DIM4, DEVICE_TYPE_DI16, DEVICE_TYPE_DO8 } from '../../constants';
import Doppler from './Doppler';
import Dimmer from './Dimmer';
import Do from './Do';
import Di from './Di';

type Props = {
  type: ?string
};

export default (props: Props) => {
  switch (props.type) {
    case DEVICE_TYPE_DOPPLER: return <Doppler {...props} />;
    case DEVICE_TYPE_DIM4: return <Dimmer {...props} />;
    case DEVICE_TYPE_DI16: return <Di {...props} />;
    case DEVICE_TYPE_DO8: return <Do {...props} />;
    default: return null;
  }
};
