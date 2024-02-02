
import Slider from '@rmwc/slider';
import { Tab, TabBar } from '@rmwc/tabs';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { ACTION_TEMPERATURE_CORRECT, ACTION_VIBRO } from '../../constants';
import { send } from '../../websocket/peer';
import Display from '../Display';
import RGB from '../RGB';
import DeviceDi from './DeviceDi';
import DeviceDoppler from './DeviceDoppler';
import DeviceExt from './DeviceExt';

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
  state = { tabIndex: 0 };
  select = ({ detail: { index } }) => {
    this.setState({ tabIndex: index });
  }
  render() {
    const { tabIndex } = this.state;
    const {
      id, temperature, correct = 0, vibro = 100, humidity, illumination, daemon, button, led, hasDoppler, hasDisplay
    } = this.props;
    const rgb = (n) => {
      const a = [];
      for (let i = 1; i <= n; i++) {
        a.push(<RGB id={id} index={i} daemon={daemon} key={`${id}/rgb/${i}`} />);
      }
      return a;
    };
    const tabs = [
      <Tab key="buttons">Buttons</Tab>,
      <Tab key="leds">LEDs</Tab>,
      <Tab key="vibro">Vibro</Tab>,
      <Tab key="climate">Climate</Tab>,
      <Tab key="ext">Ext</Tab>,
    ];
    if (hasDoppler) {
      tabs.push(<Tab key="doppler">Doppler</Tab>);
      if (hasDisplay) {
        tabs.push(<Tab key="display">Display</Tab>);
      }
    }
    return [
      <div key="tab">
        <TabBar activeTabIndex={tabIndex} onActivate={this.select}>{tabs}</TabBar>
      </div>,
      <div key="body">
        {
          tabIndex === 0 && (
            <DeviceDi {...this.props} n={button} />
          )
        }
        {
          tabIndex === 1 && (
            rgb(led)
          )
        }
        {
          tabIndex === 2 && (
            <table style={{ textAlign: 'left' }}>
              <tbody>
                <tr>
                  <td className="paper">Vibro</td>
                  <td className="paper">
                    <Slider
                      value={vibro / 25}
                      min={0}
                      max={10}
                      step={1}
                      discrete
                      onInput={(event) => {
                        send(daemon, { id, type: ACTION_VIBRO, value: event.detail.value * 25 })
                      }} />
                  </td>
                </tr>
              </tbody>
            </table>
          )
        }
        {
          tabIndex === 3 && (
            <table style={{ textAlign: 'left' }}>
              <tbody>
                <tr>
                  <td className="paper">{`Correct ${correct}°C`}</td>
                  <td className="paper">
                    <Slider
                      value={correct}
                      min={-12.8}
                      max={12.7}
                      step={0.1}
                      onInput={(event) => {
                        send(daemon, { id, type: ACTION_TEMPERATURE_CORRECT, value: event.detail.value })
                      }} />
                  </td>
                </tr>
                <Row title="Temperature" value={temperature} magnitude="°C" />
                <Row title="Humidity" value={humidity} magnitude="%" />
                <Row title="Illumination" value={illumination} magnitude="lux" />
              </tbody>
            </table>
          )
        }
        {
          tabIndex === 4 && (
            <DeviceExt {...this.props} />
          )
        }
        {
          tabIndex === 5 && (
            <DeviceDoppler daemon={daemon} key="doppler" id={id} />
          )
        }
        {
          tabIndex === 6 && (
            <Display id={id} daemon={daemon} />
          )
        }
      </div>,
    ];
  }
}
