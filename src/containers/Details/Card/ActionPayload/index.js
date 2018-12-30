
import React from 'react';
import { connect } from 'react-redux';
import {
  ACTION_OFF,
  ACTION_ON,
  ACTION_DIM,
  ACTION_DIM_RELATIVE,
  ACTION_SITE_LIGHT_DIM_RELATIVE,
  ACTION_SITE_LIGHT_OFF,
  ACTION_TIMER_START,
  ACTION_TIMER_STOP,
  ACTION_DOPPLER_HANDLE,
  ACTION_TOGGLE,
  ACTION_SCRIPT_RUN,
  ACTION_RGB_DIM,
  ACTION_THERMOSTAT_HANDLE,
  ACTION_CLOCK_START,
  ACTION_CLOCK_STOP,
  ACTION_CLOCK_TEST
} from '../../../../constants';
import ActionPayloadOnOff from './ActionPayloadOnOff';
import ActionPayloadDim from './ActionPayloadDim';
import ActionPayloadDimRelative from './ActionPayloadDimRelative';
import ActionPayloadSiteLightDimRelative from './ActionPayloadSiteLightDimRelative';
import ActionPayloadSiteLightOff from './ActionPayloadSiteLightOff';
import ActionPayloadTimerStart from './ActionPayloadTimerStart';
import ActionPayloadTimerStop from './ActionPayloadTimerStop';
import ActionPayloadDoppler from './ActionPayloadDoppler';
import ActionPayloadThermostat from './ActionPayloadThermostat';
import ActionPayloadToggle from './ActionPayloadToggle';
import ActionPayloadScriptRun from './ActionPayloadScriptRun';
import ActionPayloadRGBDim from './ActionPayloadRGBDim';
import ActionPayloadClockStartStop from './ActionPayloadClockStartStop';
import ActionPayloadClockTest from './ActionPayloadClockTest';

type Props = {
  type: ?string
};

const Container = (props: Props) => {
  switch (props.type) {
    case ACTION_OFF:
    case ACTION_ON:
      return <ActionPayloadOnOff {...props} />;
    case ACTION_DIM:
      return <ActionPayloadDim {...props} />;
    case ACTION_DIM_RELATIVE:
      return <ActionPayloadDimRelative {...props} />;
    case ACTION_SITE_LIGHT_DIM_RELATIVE:
      return <ActionPayloadSiteLightDimRelative {...props} />;
    case ACTION_SITE_LIGHT_OFF:
      return <ActionPayloadSiteLightOff {...props} />;
    case ACTION_RGB_DIM:
      return <ActionPayloadRGBDim {...props} />;
    case ACTION_TIMER_START:
      return <ActionPayloadTimerStart {...props} />;
    case ACTION_TIMER_STOP:
      return <ActionPayloadTimerStop {...props} />;
    case ACTION_CLOCK_START:
    case ACTION_CLOCK_STOP:
      return <ActionPayloadClockStartStop {...props} />;
    case ACTION_CLOCK_TEST:
      return <ActionPayloadClockTest {...props} />;
    case ACTION_DOPPLER_HANDLE:
      return <ActionPayloadDoppler {...props} />;
    case ACTION_THERMOSTAT_HANDLE:
      return <ActionPayloadThermostat {...props} />;
    case ACTION_TOGGLE:
      return <ActionPayloadToggle {...props} />;
    case ACTION_SCRIPT_RUN:
      return <ActionPayloadScriptRun {...props} />;
    default: return null;
  }
};

export default connect(({ pool }, { id }) => pool[id] || {})(Container);

