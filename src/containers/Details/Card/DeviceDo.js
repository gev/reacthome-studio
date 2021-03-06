
import React from 'react';
import DoChannel from '../../Device/DeviceDoChannel';
import DoGroup from '../../Device/DeviceDoGroup_2';
import Dimmer from '../../Device/DeviceDimmerChannel';
import Artnet from './ArtnetChannel';
import { DO, DIM, ARTNET, ENDPOINT, GROUP } from '../../../constants';

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
          <DoChannel id={dev} index={index} daemon={daemon} />
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
      {
        (type === ARTNET) && (
          <table>
            <tbody>
              <Artnet id={dev} index={index} daemon={daemon} />
            </tbody>
          </table>
        )
      }
      {
        (type === GROUP) && (
          <table>
            <tbody>
              <DoGroup id={dev} index={index} daemon={daemon} />
            </tbody>
          </table>
        )
      }
    </div>
  );
};
