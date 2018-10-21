
import React from 'react';
import { connect } from 'react-redux';
import {
  ACTION_LIGHT_OFF,
  ACTION_LIGHT_ON,
  ACTION_LIGHT_SET,
  ACTION_LIGHT_SET_RELATIVE,
  ACTION_SITE_LIGHT_SET_RELATIVE,
  ACTION_SITE_LIGHT_OFF,
  ACTION_TIMER_START,
  ACTION_TIMER_STOP,
  ACTION_DOPPLER_HANDLE,
  ACTION_TOGGLE,
  ACTION_SCRIPT_RUN
} from '../../../../constants';
import ActionPayloadLight from './ActionPayloadLight';
import ActionPayloadLightSet from './ActionPayloadLightSet';
import ActionPayloadLightSetRelative from './ActionPayloadLightSetRelative';
import ActionPayloadSiteLightSetRelative from './ActionPayloadSiteLightSetRelative';
import ActionPayloadSiteLightOff from './ActionPayloadSiteLightOff';
import ActionPayloadTimerStart from './ActionPayloadTimerStart';
import ActionPayloadTimerStop from './ActionPayloadTimerStop';
import ActionPayloadDoppler from './ActionPayloadDoppler';
import ActionPayloadToggle from './ActionPayloadToggle';
import ActionPayloadScriptRun from './ActionPayloadScriptRun';

type Props = {
  type: ?string
};

const Container = (props: Props) => {
  switch (props.type) {
    case ACTION_LIGHT_OFF:
    case ACTION_LIGHT_ON:
      return <ActionPayloadLight {...props} />;
    case ACTION_LIGHT_SET:
      return <ActionPayloadLightSet {...props} />;
    case ACTION_LIGHT_SET_RELATIVE:
      return <ActionPayloadLightSetRelative {...props} />;
    case ACTION_SITE_LIGHT_SET_RELATIVE:
      return <ActionPayloadSiteLightSetRelative {...props} />;
    case ACTION_SITE_LIGHT_OFF:
      return <ActionPayloadSiteLightOff {...props} />;
    case ACTION_TIMER_START:
      return <ActionPayloadTimerStart {...props} />;
    case ACTION_TIMER_STOP:
      return <ActionPayloadTimerStop {...props} />;
    case ACTION_DOPPLER_HANDLE:
      return <ActionPayloadDoppler {...props} />;
    case ACTION_TOGGLE:
      return <ActionPayloadToggle {...props} />;
    case ACTION_SCRIPT_RUN:
      return <ActionPayloadScriptRun {...props} />;
    default: return null;
  }
};

export default connect(({ pool }, { id }) => pool[id] || {})(Container);

