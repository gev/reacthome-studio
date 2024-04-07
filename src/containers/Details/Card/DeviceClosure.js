
import React from 'react';
import ClosureEndpoint from '../../Device/DeviceCLosureEndpoint';
import ClosureGroup from '../../Device/DeviceCLosureGroup';
import { ENDPOINT, GROUP } from '../../../constants';

export default ({ id, daemon }) => {
  const [dev, type, index] = id.split('/');
  return (
    <div className="paper">
      {
        (type === ENDPOINT) && (
          <ClosureEndpoint id={dev} index={index} daemon={daemon} />
        )
      }
      {
        (type === GROUP) && (
          <ClosureGroup id={dev} index={index} daemon={daemon} />
        )
      }
    </div>
  );
};
