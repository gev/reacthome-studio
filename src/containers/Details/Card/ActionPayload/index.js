
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../../actions';
import {
  ACTION_ALED_CLIP,
  ACTION_ALED_COLOR_ANIMATION_PLAY,
  ACTION_ALED_COLOR_ANIMATION_STOP,
  ACTION_ALED_MASK_ANIMATION_PLAY,
  ACTION_ALED_MASK_ANIMATION_STOP,
  ACTION_CLOCK_START,
  ACTION_CLOCK_STOP,
  ACTION_CLOCK_TEST,
  ACTION_CLOSE,
  ACTION_CO2_STAT_HANDLE,
  ACTION_DAY_TEST,
  ACTION_DEC_SETPOINT,
  ACTION_DIM,
  ACTION_DIM_RELATIVE,
  ACTION_DISABLE,
  ACTION_DOPPLER_HANDLE,
  ACTION_ENABLE,
  ACTION_HYGROSTAT_HANDLE,
  ACTION_INC_SETPOINT,
  ACTION_INTENSITY,
  ACTION_LIMIT_HEATING_HANDLE,
  ACTION_NIGHT_TEST,
  ACTION_OFF,
  ACTION_ON,
  ACTION_OPEN,
  ACTION_RGB_BUTTON_SET,
  ACTION_RGB_DIM,
  ACTION_SCHEDULE_START,
  ACTION_SCHEDULE_STOP,
  ACTION_SCREEN,
  ACTION_SCRIPT_RUN,
  ACTION_SET,
  ACTION_SETPOINT,
  ACTION_SETPOINT_MIN_MAX,
  ACTION_SET_FAN_SPEED,
  ACTION_SITE_LIGHT_DIM_RELATIVE,
  ACTION_SITE_LIGHT_OFF,
  ACTION_SITE_LIGHT_ON,
  ACTION_START_COOL,
  ACTION_START_FAN,
  ACTION_START_HEAT,
  ACTION_START_VENTILATION,
  ACTION_START_WET,
  ACTION_STOP,
  ACTION_STOP_COOL,
  ACTION_STOP_FAN,
  ACTION_STOP_HEAT,
  ACTION_STOP_VENTILATION,
  ACTION_STOP_WET,
  ACTION_THERMOSTAT_HANDLE,
  ACTION_TIMER_START,
  ACTION_TIMER_STOP,
  ACTION_TOGGLE,
  ACTION_TV,
  NOTIFY,
  RING
} from '../../../../constants';
import ActionPayloadAledAnimationPlay, { colorAnimations, maskAnimations } from './ActionPayloadAledAnimationPlay';
import ActionPayloadAledAnimationStop from './ActionPayloadAledAnimationStop';
import ActionPayloadAledClip from './ActionPayloadAledClip';
import ActionPayloadCO2stat from './ActionPayloadCO2stat';
import ActionPayloadClock from './ActionPayloadClock';
import ActionPayloadClockTest from './ActionPayloadClockTest';
import ActionPayloadDayNightTest from './ActionPayloadDayNightTest';
import ActionPayloadDim from './ActionPayloadDim';
import ActionPayloadDimRelative from './ActionPayloadDimRelative';
import ActionPayloadDoppler from './ActionPayloadDoppler';
import ActionPayloadFanSpeed from './ActionPayloadFanSpeed';
import ActionPayloadHeatLimit from './ActionPayloadHeatLimit';
import ActionPayloadHygrostat from './ActionPayloadHygrostat';
import ActionPayloadIncDecSetpoint from './ActionPayloadIncDecSetpoint';
import ActionPayloadIntensity from './ActionPayloadIntensity';
import ActionPayloadNotification from './ActionPayloadNotification';
import ActionPayloadOnOff from './ActionPayloadOnOff';
import ActionPayloadRGBButtonSet from './ActionPayloadRGBButtonSet';
import ActionPayloadRGBDim from './ActionPayloadRGBDim';
import ActionPayloadRing from './ActionPayloadRing';
import ActionPayloadScheduleStart from './ActionPayloadScheduleStart';
import ActionPayloadScheduleStop from './ActionPayloadScheduleStop';
import ActionPayloadScreen from './ActionPayloadScreen';
import ActionPayloadScriptRun from './ActionPayloadScriptRun';
import ActionPayloadSet from './ActionPayloadSet';
import ActionPayloadSetpoint from './ActionPayloadSetpoint';
import ActionPayloadSetpointMinMax from './ActionPayloadSetpointMinMax';
import ActionPayloadSiteLightDimRelative from './ActionPayloadSiteLightDimRelative';
import ActionPayloadSiteLightOnOff from './ActionPayloadSiteLightOnOff';
import ActionPayloadTV from './ActionPayloadTV';
import ActionPayloadThermostat from './ActionPayloadThermostat';
import ActionPayloadTimerStart from './ActionPayloadTimerStart';
import ActionPayloadTimerStop from './ActionPayloadTimerStop';
import ActionPayloadToggle from './ActionPayloadToggle';

const Container = (props) => {
  switch (props.type) {
    case ACTION_DISABLE:
    case ACTION_ENABLE:
    case ACTION_OFF:
    case ACTION_ON:
    case ACTION_OPEN:
    case ACTION_CLOSE:
    case ACTION_STOP:
    case ACTION_START_COOL:
    case ACTION_STOP_COOL:
    case ACTION_START_HEAT:
    case ACTION_STOP_HEAT:
    case ACTION_START_FAN:
    case ACTION_STOP_FAN:
    case ACTION_START_VENTILATION:
    case ACTION_STOP_VENTILATION:
    case ACTION_START_WET:
    case ACTION_STOP_WET:
      return <ActionPayloadOnOff {...props} />;
    case ACTION_DIM:
      return <ActionPayloadDim {...props} />;
    case ACTION_SET_FAN_SPEED:
      return <ActionPayloadFanSpeed {...props} />;
    case ACTION_DIM_RELATIVE:
      return <ActionPayloadDimRelative {...props} />;
    case ACTION_SITE_LIGHT_DIM_RELATIVE:
      return <ActionPayloadSiteLightDimRelative {...props} />;
    case ACTION_SITE_LIGHT_ON:
    case ACTION_SITE_LIGHT_OFF:
      return <ActionPayloadSiteLightOnOff {...props} />;
    case ACTION_RGB_DIM:
      return <ActionPayloadRGBDim {...props} />;
    case ACTION_RGB_BUTTON_SET:
      return <ActionPayloadRGBButtonSet {...props} />;
    case ACTION_ALED_COLOR_ANIMATION_PLAY:
      return <ActionPayloadAledAnimationPlay {...props} animations={colorAnimations} />;
    case ACTION_ALED_MASK_ANIMATION_PLAY:
      return <ActionPayloadAledAnimationPlay {...props} animations={maskAnimations} />;
    case ACTION_ALED_COLOR_ANIMATION_STOP:
    case ACTION_ALED_MASK_ANIMATION_STOP:
      return <ActionPayloadAledAnimationStop {...props} />;
    case ACTION_ALED_CLIP:
      return <ActionPayloadAledClip {...props} />;
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
    case ACTION_HYGROSTAT_HANDLE:
      return <ActionPayloadHygrostat {...props} />;
    case ACTION_CO2_STAT_HANDLE:
      return <ActionPayloadCO2stat {...props} />;
    case ACTION_LIMIT_HEATING_HANDLE:
      return <ActionPayloadHeatLimit {...props} />;
    case ACTION_SETPOINT:
      return <ActionPayloadSetpoint {...props} />;
    case ACTION_INTENSITY:
      return <ActionPayloadIntensity {...props} />;
    case ACTION_SETPOINT_MIN_MAX:
      return <ActionPayloadSetpointMinMax {...props} />;
    case ACTION_INC_SETPOINT:
    case ACTION_DEC_SETPOINT:
      return <ActionPayloadIncDecSetpoint {...props} />;
    case ACTION_TOGGLE:
      return <ActionPayloadToggle {...props} />;
    case ACTION_SCREEN:
      return <ActionPayloadScreen {...props} />;
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

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);
