
import React from 'react';
import { connect } from 'react-redux';
import {
  SITE,
  CAMERA,
  BUTTON,
  SMOCK_SENSOR,
  MOTION_SENSOR,
  LEAKAGE_SENSOR,
  DEVICE_TYPE_SENSOR4,
  VALVE_HEATING,
  VALVE_WATER,
  SOCKET_220,
  BOILER,
  PUMP,
  FAN,
} from '../../../constants';
import CardDefault from './CardDefault';
import CardCamera from './CardCamera';
import CardSite from './CardSite';
import CardSensor from './CardSensor';
import CardDi from './CardDi';
import CardDo from './CardDo';

type Props = {
  type: ?string
};

const Container = (props: Props) => {
  switch (props.type) {
    case SITE:
      return <CardSite {...props} />;
    case CAMERA:
      return <CardCamera {...props} />;
    case DEVICE_TYPE_SENSOR4:
      return <CardSensor {...props} />;
    case BUTTON:
    case SMOCK_SENSOR:
    case MOTION_SENSOR:
    case LEAKAGE_SENSOR:
      return <CardDi {...props} />;
    case VALVE_HEATING:
    case VALVE_WATER:
    case SOCKET_220:
    case BOILER:
    case PUMP:
    case FAN:
      return <CardDo {...props} />;
    default:
      return <CardDefault {...props} />;
  }
};

export default connect(({ pool }, { id }) => pool[id] || {})(Container);

export { default as CardAction } from './CardAction';
