
import { Tab, TabBar } from '@rmwc/tabs';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import Slider from '../../components/Slider';
import { ACTION_VIBRO } from '../../constants';
import { send } from '../../websocket/peer';
import Display from '../Display';
import RGB from '../RGB';
import DeviceDi from './DeviceDi';
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
      id,
      temperature, humidity, illumination,
      temperature_correct = 0, humidity_correct = 0, illumination_correct = 0,
      vibro = 100, daemon, button, led, hasDoppler, hasDisplay, change
    } = this.props;
    const { temperature_raw = temperature, humidity_raw = humidity, illumination_raw = illumination } = this.props;
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
                      label="vol"
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
                <Row title="Temperature" value={temperature_raw} magnitude="°C" min={-10} max={10} step={0.1} correct={temperature_correct} onCorrect={temperature_correct => change({ temperature_correct })} />
                <Row title="Humidity" value={humidity_raw} magnitude="%" min={-10} max={10} step={1} correct={humidity_correct} onCorrect={humidity_correct => change({ humidity_correct })} />
                <Row title="Illumination" value={illumination_raw} magnitude="lux" min={-1000} max={1000} step={1} correct={illumination_correct} onCorrect={illumination_correct => change({ illumination_correct })} />
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
