
import { Tab, TabBar } from '@rmwc/tabs';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import DeviceDi from './DeviceDi';
import DeviceExt from './DeviceExt';


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
  state = { tabIndex: 0 };
  select = ({ detail: { index } }) => {
    this.setState({ tabIndex: index });
  }
  render() {
    const { tabIndex } = this.state;
    const {
      id, temperature, humidity, illumination, daemon,
      temperature_correct = 0, humidity_correct = 0, illumination_correct = 0,
    } = this.props;
    const { temperature_raw = temperature, humidity_raw = humidity, illumination_raw = illumination } = this.props;
    return [
      <div key="tab">
        <TabBar
          activeTabIndex={tabIndex}
          onActivate={this.select}
        >
          <Tab>Climate</Tab>
          <Tab>Inputs</Tab>
          <Tab>Ext</Tab>
        </TabBar>
      </div>,
      <div key="body">
        {
          tabIndex === 0 && (
            <table style={{ textAlign: 'left' }}>
              <tbody>
                <Row title="Temperature" value={temperature_raw} magnitude="°C" min={-10} max={10} step={0.1} correct={temperature_correct} onCorrect={temperature_correct => change({ temperature_correct })} />
                <Row title="Humidity" value={humidity_raw} magnitude="%" min={-10} max={10} step={1} correct={humidity_correct} onCorrect={humidity_correct => change({ humidity_correct })} />
                <Row title="Illumination" value={illumination_raw} magnitude="lux" min={-1000} max={1000} step={1} correct={illumination_correct} onCorrect={illumination_correct => change({ illumination_correct })} />
              </tbody>
            </table>
          )
        }
        {
          tabIndex === 1 && (
            <DeviceDi {...this.props} n={4} />
          )
        }
        {
          tabIndex === 2 && (
            <DeviceExt {...this.props} />
          )
        }
      </div>,

    ];
  }
}
