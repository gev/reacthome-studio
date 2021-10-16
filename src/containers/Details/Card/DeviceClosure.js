
import React from 'react';
import ClosureEndpoint from '../../Device/DeviceCLosureEndpoint';
import { ENDPOINT, GROUP } from '../../../constants';

type Props = {
  id: string;
  daemon: string;
};

export default ({ id, daemon }: Props) => {
  const [dev, type, index] = id.split('/');
  return (
    <div className="paper">
      {
        (type === ENDPOINT || type === GROUP) && (
          <ClosureEndpoint id={dev} index={index} daemon={daemon} />
        )
      }
    </div>
  );
};
