
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import Slider from '../../components/Slider';

const Row = ({ title, value, magnitude, onCorrect, correct, min, max, step }) => (
  <tr>
    <td className="paper">
      <Typography use="body">{title}</Typography>
    </td>
    <td className="paper">
      <Typography use="body">{value && (value + correct).toFixed(2)}{magnitude}</Typography>
    </td>
    <td width="50%" className="paper">
      <Slider
        label={`${value && value.toFixed(2)}${magnitude}. cor`}
        value={correct}
        min={min}
        max={max}
        step={step}
        onInput={(event) => {
          onCorrect(Math.round(event.detail.value * 10) / 10);
        }} />
    </td>
  </tr>
);

export default class extends Component {
  render() {
    const { temperature, temperature_correct = 0, change } = this.props;
    const { temperature_raw = temperature } = this.props;
    return (
      <table style={{ textAlign: 'left' }}>
        <tbody>
          <Row title="Temperature" value={temperature_raw} magnitude="°C" min={-10} max={10} step={0.1} correct={temperature_correct} onCorrect={temperature_correct => change({ temperature_correct })} />
        </tbody>
      </table>
    );
  }
}
