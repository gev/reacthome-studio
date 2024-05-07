
import { Tab, TabBar } from '@rmwc/tabs';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import Slider from '../../components/Slider';
import { DEVICE_TYPE_SMART_BOTTOM_2 } from '../../constants';
import DeviceDi from './DeviceDi';
import DeviceExt from './DeviceExt';

const Row = ({ title, value, magnitude, onCorrect, correct, min, max, step }) => (
  <tr>
    <td className="paper">
      <Typography use="body">{title}</Typography>
    </td>
    <td className="paper">
      <Typography use="body">{(value + correct).toFixed(2)}{magnitude}</Typography>
    </td>
    <td width="50%" className="paper">
      <Slider
        label="cor"
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
      co2, temperature, humidity,
      temperature_correct = 0, humidity_correct = 0, co2_correct = 0,
      type, change } = this.props;
    const hasCO2 = type === DEVICE_TYPE_SMART_BOTTOM_2;
    const tabs = [
      <Tab key="inputs">Inputs</Tab>,
      <Tab key="ext">Ext</Tab>,
    ];
    if (hasCO2) {
      tabs.push(<Tab key="climate">Climate</Tab>);
    }
    return [
      <div key="tab">
        <TabBar activeTabIndex={tabIndex} onActivate={this.select}>{tabs}</TabBar>
      </div>,
      <div key="body">
        {
          tabIndex === 0 && (
            <DeviceDi {...this.props} n={4} />
          )
        }
        {
          tabIndex === 1 && (
            <DeviceExt {...this.props} />
          )
        }
        {
          tabIndex === 2 && (
            <table style={{ textAlign: 'left' }}>
              <tbody>
                <Row title="Temperature" value={temperature} magnitude="°C" min={-10} max={10} step={0.1} correct={temperature_correct} onCorrect={temperature_correct => change({ temperature_correct })} />
                <Row title="Humidity" value={humidity} magnitude="%" min={-10} max={10} step={1} correct={humidity_correct} onCorrect={humidity_correct => change({ humidity_correct })} />
                <Row title="CO2" value={co2} magnitude="ppm" min={-100} max={100} step={1} correct={co2_correct} onCorrect={co2_correct => change({ co2_correct })} />
              </tbody>
            </table>
          )
        }
      </div>,
    ];
  }
}
