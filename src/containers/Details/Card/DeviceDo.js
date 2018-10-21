
import React from 'react';
import Do from '../../Device/DeviceDoChannel';
import Dimmer from '../../Device/DeviceDimmerChannel';
import { DO, DIM } from '../../../constants';

type Props = {
  id: string;
  daemon: string;
};

export default ({ id, daemon }: Props) => {
  const [dev, type, index] = id.split('/');
  return (
    <div className="paper">
      {
        (type === DO) && (
          <Do id={dev} index={index} daemon={daemon} />
        )
      }
      {
        (type === DIM) && (
          <table>
            <tbody>
              <Dimmer id={dev} index={index} daemon={daemon} />
            </tbody>
          </table>
        )
      }
    </div>
  );
};
