
import React, { Component } from 'react';
import { Typography } from '@rmwc/typography';
import DeviceDoppler from './DeviceDoppler';
import Di from './DeviceDiChannel';
import RGB from '../RGB';
import Display from '../Display';
import Slider from '@rmwc/slider';
import { send } from '../../websocket/peer';
import { ACTION_TEMPERATURE_CORRECT, ACTION_VIBRO } from '../../constants';

const Row = ({ title, value, magnitude }) => (
  <tr>
    <td className="paper">
      <Typography use="body">{title}</Typography>
    </td>
    <td className="paper">
      <Typography use="body">{value}{magnitude}</Typography>
    </td>
  </tr>
);

export default class extends Component {
  render() {
    const {
      id, temperature, humidity, co2, daemon
    } = this.props;
    return [
      <table key="climate" style={{ textAlign: 'left' }}>
        <tbody>
          <Row title="Temperature" value={temperature} magnitude="°C" />
          <Row title="Humidity" value={humidity} magnitude="%" />
          <Row title="CO2" value={co2} magnitude="ppm" />
        </tbody>
      </table>,
      <DeviceDoppler daemon={daemon} key="doppler" id={id} />
    ];
  }
}

