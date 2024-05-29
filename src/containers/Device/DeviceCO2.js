
import { Tab, TabBar } from '@rmwc/tabs';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import Slider from '../../components/Slider';
import DeviceDoppler from './DeviceDopplerLegacy';
import DeviceExt from './DeviceExt';


const Row = ({ title, value, magnitude, onCorrect, correct, min, max, step }) => (
  <tr>
    <td className="paper">
      <Typography use="body">{title}</Typography>
    </td>
    <td className="paper">
      {
        typeof value === 'number' && typeof correct === 'number' &&
        <Typography use="body">{(value + correct).toFixed(2)}{magnitude}</Typography>
      }
    </td>
    <td width="50%" className="paper">
      <Slider
        label={typeof value === 'number' && `${value.toFixed(2)}${magnitude}. cor`}
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
      id, temperature, humidity, co2,
      temperature_correct = 0, humidity_correct = 0, co2_correct = 0,
      daemon
    } = this.props;
    const { temperature_raw = temperature, humidity_raw = humidity, co2_raw = co2 } = this.props;
    return [
      <div key="tab">
        <TabBar
          activeTabIndex={tabIndex}
          onActivate={this.select}
        >
          <Tab>Climate</Tab>
          <Tab>Doppler</Tab>
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
                <Row title="CO2" value={co2_raw} magnitude="ppm" min={-200} max={200} step={1} correct={co2_correct} onCorrect={co2_correct => change({ co2_correct })} />
              </tbody>
            </table>
          )
        }
        {
          tabIndex === 1 && (
            <DeviceDoppler daemon={daemon} key="doppler" id={id} />
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
