
import React from 'react';
import { connect } from 'react-redux';
import {
  SITE,
  TIMER,
  CAMERA,
  BUTTON,
  SMOCK_SENSOR,
  MOTION_SENSOR,
  LEAKAGE_SENSOR,
  DEVICE_TYPE_SENSOR4,
  DEVICE_TYPE_DOPPLER,
  VALVE_HEATING,
  VALVE_WATER,
  SOCKET_220,
  LIGHT_220,
  LIGHT_LED,
  BOILER,
  PUMP,
  FAN,
  TV,
  INTERCOM,
  TOUCH,
} from '../../../constants';
import CardDefault from './CardDefault';
import CardCamera from './CardCamera';
import CardTimer from './CardTimer';
import CardSite from './CardSite';
import CardSensor from './CardSensor';
import CardDoppler from './CardDoppler';
import CardDi from './CardDi';
import CardDo from './CardDo';
import CardTV from './CardTV';
import CardTouch from './CardTouch';
import CardIntercom from './CardIntercom';

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
    case DEVICE_TYPE_DOPPLER:
      return <CardDoppler {...props} />;
    case BUTTON:
    case SMOCK_SENSOR:
    case MOTION_SENSOR:
    case LEAKAGE_SENSOR:
      return <CardDi {...props} />;
    case VALVE_HEATING:
    case VALVE_WATER:
    case SOCKET_220:
    case LIGHT_220:
    case LIGHT_LED:
    case BOILER:
    case PUMP:
    case FAN:
      return <CardDo {...props} />;
    case TIMER:
      return <CardTimer {...props} />;
    case TV:
      return <CardTV {...props} />;
    case INTERCOM:
      return <CardIntercom {...props} />;
    case TOUCH:
      return <CardTouch {...props} />;
    default:
      return <CardDefault {...props} />;
  }
};

export default connect(({ pool }, { id }) => pool[id] || {})(Container);

export { default as CardAction } from './CardAction';
