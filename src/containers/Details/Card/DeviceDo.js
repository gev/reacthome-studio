
import React from 'react';
import DoChannel from '../../Device/DeviceDoChannel';
import DoGroup from '../../Device/DeviceDoGroup_2';
import DoEndpoint from '../../Device/DeviceDoEndpoint';
import Dimmer from '../../Device/DeviceDimmerChannel';
import Artnet from './ArtnetChannel';
import { DO, DIM, ARTNET, ENDPOINT, GROUP, AO, DALI_LIGHT, DALI_GROUP } from '../../../constants';
import DeviceAOChannel from '../../Device/DeviceAOChannel';
import daliChannel, { DaliGroup, DaliLight } from './DaliChannel';
import DaliChannel from './DaliChannel';

export default ({ id, daemon }) => {
  const [dev, type, index] = id.split('/');
  return (
    <div className="paper">
      {
        (type === DO) && (
          <DoChannel id={dev} index={index} daemon={daemon} />
        )
      }
      {
        (type === ENDPOINT) && (
          <DoEndpoint id={dev} index={index} daemon={daemon} />
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
        (type === AO) && (
          <table>
            <tbody>
              <DeviceAOChannel id={dev} index={index} daemon={daemon} />
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
        (type === DALI_LIGHT) && (
          <table>
            <tbody>
              {
                <DaliLight id={dev} index={index} daemon={daemon} />
              }
            </tbody>
          </table>
        )
      }
      {
        (type === DALI_GROUP) && (
          <table>
            <tbody>
              {
                <DaliGroup id={dev} index={index} daemon={daemon} />
              }
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
