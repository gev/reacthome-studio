
import React from 'react';
import { connect } from 'react-redux';
import {
  ACTION_LIGHT_OFF,
  ACTION_LIGHT_ON,
  ACTION_LIGHT_SET,
  ACTION_SITE_LIGHT_OFF
} from '../../../../constants';
import ActionPayloadLight from './ActionPayloadLight';
import ActionPayloadLightSet from './ActionPayloadLightSet';
import ActionPayloadSiteLightOff from './ActionPayloadSiteLightOff';

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
    case ACTION_SITE_LIGHT_OFF:
      return <ActionPayloadSiteLightOff {...props} />;
    default: return null;
  }
};

export default connect(({ pool }, { id }) => pool[id] || {})(Container);

