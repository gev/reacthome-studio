
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
  DEVICE_TYPE_DOPPLER_LEGACY,
  VALVE_HEATING,
  VALVE_WATER,
  SOCKET_220,
  LIGHT_220,
  LIGHT_LED,
  BOILER,
  PUMP,
  FAN,
  TV,
  AC,
  INTERCOM,
  TOUCH,
  THERMOSTAT,
  CLOCK,
  DAEMON,
  DRIVER_TYPE_RS21,
  DRIVER_TYPE_ARTNET,
  DRIVER_TYPE_BB_PLC1,
  DRIVER_TYPE_BB_PLC2,
  WARM_FLOOR,
  LEAKAGE,
  DRIVER_TYPE_M206,
  DRIVER_TYPE_M230,
  DEVICE_TYPE_SMART_4,
  LIGHT_RGB,
  DEVICE_TYPE_CLIMATE,
  DEVICE_TYPE_DOPPLER,
  DEVICE_TYPE_TEMPERATURE_EXT,
  SECURITY,
  SCHEDULE,
  REED,
  CURTAINS,
  RING,
  DRIVER_TYPE_MODBUS,
  DRIVER_TYPE_VARMANN,
  DRIVER_TYPE_INTESIS_BOX,
  ZIGBEE,
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
import CardAC from './CardAC';
import CardTouch from './CardTouch';
import CardIntercom from './CardIntercom';
import CardThermostat from './CardThermostat';
import CardClock from './CardClock';
import CardDaemon from './CardDaemon';
import CardRS21 from './CardRS21';
import CardArtnet from './CardArtnet';
import CardBBPLC1 from './CardBBPLC1';
import CardBBPLC2 from './CardBBPLC2';
import CardLeakage from './CardLeakage';
import CardElectricityMeter from './CardElectricityMeter';
import CardRGB from './CardRGB';
import CardClimate from './CardClimate';
import CardTempExt from './CardTempExt';
import CardOnOff from './CardOnOff';
import CardSchedule from './CardSchedule';
import CardClosure from './CardClosure';
import CardRing from './CardRing';
import CardModbus from './CardModbus';
import CardVarmann from './CardVarmann';
import CardIntesisBox from './CardIntesisBox';
import CardZigbee from './CardZigbee';
import CardHeater from './CardHeater';

type Props = {
  type: ?string
};

const Container = (props: Props) => {
  if (props.protocol === ZIGBEE) {
    return <CardZigbee {...props} />;
  }
  switch (props.type) {
    case DAEMON:
      return <CardDaemon {...props} />;
    case SITE:
      return <CardSite {...props} />;
    case CAMERA:
      return <CardCamera {...props} />;
    case DEVICE_TYPE_SENSOR4:
    case DEVICE_TYPE_SMART_4:
      return <CardSensor {...props} />;
    case DEVICE_TYPE_CLIMATE:
      return <CardClimate {...props} />;
    case DEVICE_TYPE_TEMPERATURE_EXT:
      return <CardTempExt {...props} />;
    case DEVICE_TYPE_DOPPLER:
    case DEVICE_TYPE_DOPPLER_LEGACY:
      return <CardDoppler {...props} />;
    case REED:
    case BUTTON:
    case SMOCK_SENSOR:
    case MOTION_SENSOR:
    case LEAKAGE_SENSOR:
      return <CardDi {...props} />;
    case VALVE_WATER:
    case SOCKET_220:
    case LIGHT_220:
    case LIGHT_LED:
    case BOILER:
    case PUMP:
    case FAN:
      return <CardDo {...props} />;
    case VALVE_HEATING:
    case WARM_FLOOR:
      return <CardHeater {...props} />;
    case CURTAINS:
      return <CardClosure {...props} />;
    case LIGHT_RGB:
      return <CardRGB {...props} />;
    case TIMER:
      return <CardTimer {...props} />;
    case SCHEDULE:
      return <CardSchedule {...props} />;
    case CLOCK:
      return <CardClock {...props} />;
    case TV:
      return <CardTV {...props} />;
    case AC:
      return <CardAC {...props} />;
    case INTERCOM:
      return <CardIntercom {...props} />;
    case RING:
      return <CardRing {...props} />;
    case TOUCH:
      return <CardTouch {...props} />;
    case THERMOSTAT:
      return <CardThermostat {...props} />;
    case LEAKAGE:
      return <CardLeakage {...props} />;
    case SECURITY:
      return <CardOnOff {...props} />;
    case DRIVER_TYPE_RS21:
      return <CardRS21 {...props} />;
    case DRIVER_TYPE_ARTNET:
      return <CardArtnet {...props} />;
    case DRIVER_TYPE_BB_PLC1:
      return <CardBBPLC1 {...props} />;
    case DRIVER_TYPE_BB_PLC2:
      return <CardBBPLC2 {...props} />;
    case DRIVER_TYPE_M206:
    case DRIVER_TYPE_M230:
      return <CardElectricityMeter {...props} />;
    case DRIVER_TYPE_MODBUS:
      return <CardModbus {...props} />;
    case DRIVER_TYPE_VARMANN:
      return <CardVarmann {...props} />;
    case DRIVER_TYPE_INTESIS_BOX:
      return <CardIntesisBox {...props} />;
    default:
      return <CardDefault {...props} />;
  }
};

export default connect(({ pool }, { id }) => pool[id] || {})(Container);

export { default as CardAction } from './CardAction';
