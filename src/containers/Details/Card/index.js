
import React from 'react';
import { connect } from 'react-redux';
import {
  AC,
  BOILER,
  BUTTON,
  CAMERA,
  CLOCK,
  CURTAINS,
  DAEMON,
  DEVICE_TYPE_CLIMATE,
  DEVICE_TYPE_CO2,
  DEVICE_TYPE_DOPPLER,
  DEVICE_TYPE_DOPPLER_1_DI_4,
  DEVICE_TYPE_DOPPLER_5_DI_4,
  DEVICE_TYPE_DOPPLER_LEGACY,
  DEVICE_TYPE_SENSOR4,
  DEVICE_TYPE_SMART_4A,
  DEVICE_TYPE_SMART_4AM,
  DEVICE_TYPE_SMART_4G,
  DEVICE_TYPE_SMART_4GD,
  DEVICE_TYPE_SMART_6_PUSH,
  DEVICE_TYPE_SMART_BOTTOM_1,
  DEVICE_TYPE_SMART_BOTTOM_2,
  DEVICE_TYPE_SMART_TOP_A6P,
  DEVICE_TYPE_SMART_TOP_G4D,
  DEVICE_TYPE_TEMPERATURE_EXT,
  DRIVER_TYPE_ALINK,
  DRIVER_TYPE_ARTNET,
  DRIVER_TYPE_BB_PLC1,
  DRIVER_TYPE_BB_PLC2,
  DRIVER_TYPE_COMFOVENT,
  DRIVER_TYPE_DALI_GW,
  DRIVER_TYPE_INTESIS_BOX,
  DRIVER_TYPE_M206,
  DRIVER_TYPE_M230,
  DRIVER_TYPE_MODBUS,
  DRIVER_TYPE_MODBUS_RBUS,
  DRIVER_TYPE_MODBUS_TCP,
  DRIVER_TYPE_NOVA,
  DRIVER_TYPE_RS21,
  DRIVER_TYPE_RTD_RA,
  DRIVER_TYPE_SWIFT,
  DRIVER_TYPE_VARMANN,
  FAN,
  INTERCOM,
  LEAKAGE,
  LEAKAGE_SENSOR,
  LIGHT_220,
  LIGHT_LED,
  LIGHT_RGB,
  MOTION_SENSOR,
  MULTIROOM,
  PUMP,
  REED,
  RING,
  SCHEDULE,
  SCREEN,
  SECURITY,
  SITE,
  SMOCK_SENSOR,
  SOCKET_220,
  THERMOSTAT,
  TIMER,
  TOUCH,
  TV,
  VALVE_HEATING,
  VALVE_WATER,
  WARM_FLOOR,
  ZIGBEE
} from '../../../constants';
import CardAC from './CardAC';
import CardAlink from './CardAlink';
import CardArtnet from './CardArtnet';
import CardBBPLC1 from './CardBBPLC1';
import CardBBPLC2 from './CardBBPLC2';
import CardCO2 from './CardCO2';
import CardCamera from './CardCamera';
import CardClimate from './CardClimate';
import CardClock from './CardClock';
import CardClosure from './CardClosure';
import CardComfovent from './CardComfovent';
import CardDaemon from './CardDaemon';
import CardDaliGW from './CardDaliGW';
import CardDefault from './CardDefault';
import CardDi from './CardDi';
import CardDo from './CardDo';
import CardDoppler from './CardDoppler';
import CardDopplerLegacy from './CardDopplerLegacy';
import CardElectricityMeter from './CardElectricityMeter';
import CardHeater from './CardHeater';
import CardIntercom from './CardIntercom';
import CardIntesisBox from './CardIntesisBox';
import CardLeakage from './CardLeakage';
import CardModbusRBUS from './CardModbusRBUS';
import CardModbusTCP from './CardModbusTCP';
import CardMultiroom from './CardMultiroom';
import CardNova from './CardNova';
import CardOnOff from './CardOnOff';
import CardRGB from './CardRGB';
import CardRS21 from './CardRS21';
import CardRTDRA from './CardRTD_RA';
import CardRing from './CardRing';
import CardSchedule from './CardSchedule';
import CardScreen from './CardScreen';
import CardSensor from './CardSensor';
import CardSite from './CardSite';
import CardSwift from './CardSwift';
import CardTV from './CardTV';
import CardTempExt from './CardTempExt';
import CardThermostat from './CardThermostat';
import CardTimer from './CardTimer';
import CardTouch from './CardTouch';
import CardVarmann from './CardVarmann';
import CardZigbee from './CardZigbee';

const Container = (props) => {
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
    case DEVICE_TYPE_SMART_4G:
      return <CardSensor {...props} button={4} hasTemperature hasHumidity hasDoppler />;
    case DEVICE_TYPE_SMART_4GD:
      return <CardSensor {...props} button={4} hasTemperature hasHumidity hasDoppler />;
    case DEVICE_TYPE_SMART_4A:
      return <CardSensor {...props} button={4} hasTemperature hasHumidity />;
    case DEVICE_TYPE_SMART_4AM:
      return <CardSensor {...props} button={4} hasTemperature hasHumidity />;
    case DEVICE_TYPE_SMART_6_PUSH:
      return <CardSensor {...props} button={6} hasTemperature hasHumidity />;
    case DEVICE_TYPE_SMART_TOP_A6P:
      return <CardSensor {...props} button={6} hasTemperature hasHumidity />;
    case DEVICE_TYPE_SMART_TOP_G4D:
      return <CardSensor {...props} button={4} hasTemperature hasHumidity />;
    case DEVICE_TYPE_SMART_BOTTOM_1:
      return <CardSensor {...props} button={4} />;
    case DEVICE_TYPE_SMART_BOTTOM_2:
      return <CardSensor {...props} button={4} hasTemperature hasHumidity hasCO2 />;
    case DEVICE_TYPE_CO2:
      return <CardCO2 {...props} hasDoppler />;
    case DEVICE_TYPE_CLIMATE:
      return <CardClimate {...props} />;
    case DEVICE_TYPE_TEMPERATURE_EXT:
      return <CardTempExt {...props} />;
    case DEVICE_TYPE_DOPPLER_1_DI_4:
      return <CardDoppler {...props} n={1} />;
    case DEVICE_TYPE_DOPPLER_5_DI_4:
      return <CardDoppler {...props} n={5} />;
    case DEVICE_TYPE_DOPPLER:
    case DEVICE_TYPE_DOPPLER_LEGACY:
      return <CardDopplerLegacy {...props} />;
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
      return <CardHeater {...props} />;
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
    case SCREEN:
      return <CardScreen {...props} />;
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
    case DRIVER_TYPE_DALI_GW:
      return <CardDaliGW {...props} />
    case DRIVER_TYPE_BB_PLC1:
      return <CardBBPLC1 {...props} />;
    case DRIVER_TYPE_BB_PLC2:
      return <CardBBPLC2 {...props} />;
    case DRIVER_TYPE_M206:
    case DRIVER_TYPE_M230:
      return <CardElectricityMeter {...props} />;
    case DRIVER_TYPE_MODBUS:
    case DRIVER_TYPE_MODBUS_RBUS:
      return <CardModbusRBUS {...props} />;
    case DRIVER_TYPE_MODBUS_TCP:
      return <CardModbusTCP {...props} />;
    case DRIVER_TYPE_VARMANN:
      return <CardVarmann {...props} />;
    case DRIVER_TYPE_INTESIS_BOX:
      return <CardIntesisBox {...props} />;
    case DRIVER_TYPE_RTD_RA:
      return <CardRTDRA {...props} />;
    case DRIVER_TYPE_ALINK:
      return <CardAlink {...props} />;
    case DRIVER_TYPE_NOVA:
      return <CardNova {...props} />;
    case DRIVER_TYPE_SWIFT:
      return <CardSwift {...props} />;
    case DRIVER_TYPE_COMFOVENT:
      return <CardComfovent {...props} />;
    case MULTIROOM:
      return <CardMultiroom {...props} />;
    default:
      return <CardDefault {...props} />;
  }
};

export default connect(({ pool }, { id }) => pool[id] || {})(Container);

export { default as CardAction } from './CardAction';
