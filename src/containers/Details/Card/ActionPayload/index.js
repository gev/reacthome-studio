
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
  ACTION_CLOCK_TEST,
  ACTION_DAY_TEST,
  ACTION_NIGHT_TEST,
  ACTION_TV,
  NOTIFY,
  ACTION_DISABLE,
  ACTION_ENABLE,
  ACTION_SCHEDULE_START,
  ACTION_SCHEDULE_STOP,
  RING,
  ACTION_SETPOINT,
  ACTION_LIMIT_HEATING_HANDLE,
  ACTION_OPEN,
  ACTION_CLOSE,
  ACTION_STOP,
  ACTION_SET,
  ACTION_INC_SETPOINT,
  ACTION_DEC_SETPOINT
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
import ActionPayloadHeatLimit from './ActionPayloadHeatLimt';
import ActionPayloadToggle from './ActionPayloadToggle';
import ActionPayloadScriptRun from './ActionPayloadScriptRun';
import ActionPayloadRGBDim from './ActionPayloadRGBDim';
import ActionPayloadClock from './ActionPayloadClock';
import ActionPayloadScheduleStart from './ActionPayloadScheduleStart';
import ActionPayloadScheduleStop from './ActionPayloadScheduleStop';
import ActionPayloadClockTest from './ActionPayloadClockTest';
import ActionPayloadDayNightTest from './ActionPayloadDayNightTest';
import ActionPayloadTV from './ActionPayloadTV';
import ActionPayloadNotification from './ActionPayloadNotification';
import ActionPayloadRing from './ActionPayloadRing';
import ActionPayloadSetpoint from './ActionPayloadSetpoint';
import ActionPayloadSet from './ActionPayloadSet';
import ActionPayloadIncDecSetpoint from './ActionPayloadIncDecSetpoint';

type Props = {
  type: ?string
};

const Container = (props: Props) => {
  switch (props.type) {
    case ACTION_DISABLE:
    case ACTION_ENABLE:
    case ACTION_OFF:
    case ACTION_ON:
    case ACTION_OPEN:
    case ACTION_CLOSE:
    case ACTION_STOP:
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
    case ACTION_SCHEDULE_START:
      return <ActionPayloadScheduleStart {...props} />;
    case ACTION_SCHEDULE_STOP:
      return <ActionPayloadScheduleStop {...props} />;
    case ACTION_CLOCK_START:
    case ACTION_CLOCK_STOP:
      return <ActionPayloadClock {...props} />;
    case ACTION_CLOCK_TEST:
      return <ActionPayloadClockTest {...props} />;
    case ACTION_DAY_TEST:
    case ACTION_NIGHT_TEST:
      return <ActionPayloadDayNightTest {...props} />;
    case ACTION_DOPPLER_HANDLE:
      return <ActionPayloadDoppler {...props} />;
    case ACTION_THERMOSTAT_HANDLE:
      return <ActionPayloadThermostat {...props} />;
    case ACTION_LIMIT_HEATING_HANDLE:
      return <ActionPayloadHeatLimit {...props} />;
    case ACTION_SETPOINT:
      return <ActionPayloadSetpoint {...props} />;
    case ACTION_INC_SETPOINT:
    case ACTION_DEC_SETPOINT:
      return <ActionPayloadIncDecSetpoint {...props} />;
    case ACTION_TOGGLE:
      return <ActionPayloadToggle {...props} />;
    case ACTION_TV:
      return <ActionPayloadTV {...props} />;
    case ACTION_SET:
      return <ActionPayloadSet {...props} />;
    case NOTIFY:
      return <ActionPayloadNotification {...props} />;
    case RING:
      return <ActionPayloadRing {...props} />;
    case ACTION_SCRIPT_RUN:
      return <ActionPayloadScriptRun {...props} />;
    default: return null;
  }
};

export default connect(({ pool }, { id }) => pool[id] || {})(Container);
