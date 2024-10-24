
import { Tab, TabBar } from '@rmwc/tabs';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch } from 'rmwc';
import { modify, request } from '../../actions';
import Slider from '../../components/Slider';
import { ACTION_DIMMER, ACTION_DO, ACTION_VIBRO, DEVICE_TYPES, DEVICE_TYPE_SMART_TOP_A4P, DEVICE_TYPE_SMART_TOP_A4T, DEVICE_TYPE_SMART_TOP_A6P, DEVICE_TYPE_SMART_TOP_A6T, DEVICE_TYPE_SMART_TOP_G2, DEVICE_TYPE_SMART_TOP_G4, DEVICE_TYPE_SMART_TOP_G4D, DEVICE_TYPE_SMART_TOP_G6 } from '../../constants';
import RGB from '../RGB';
import DeviceDi from './DeviceDi';
import DeviceSmartNextFaceG4D from './DeviceSmartNextFaceG4D';

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

class Container extends Component {
  state = { tabIndex: 0 };

  change = (event) => {
    const { value } = event.target;
    this.props.change({ code: value });
  }

  select = ({ detail: { index } }) => {
    this.setState({ tabIndex: index });
  }

  setVibro = ({ detail: { value } }) => {
    const { id, daemon, request } = this.props;
    request(daemon, {
      type: ACTION_VIBRO, value: value * 25, id,
    })
  }

  setBrightness = ({ detail: { value } }) => {
    const { id, daemon, request } = this.props;
    request(daemon, {
      type: ACTION_DIMMER, value, id,
    })
  }

  onSwitch = () => {
    const { id, daemon, state = true, request } = this.props;
    console.log(daemon, id, state ? 0 : 1)
    request(daemon, {
      type: ACTION_DO, id, value: state ? 0 : 1
    })
  }
  render() {
    const { tabIndex } = this.state;
    const {
      id, code, ip, address, timestamp, version,
      temperature, humidity,
      temperature_correct, humidity_correct, change,
      daemon, type, brightness, vibro, state,
    } = this.props;
    const { temperature_raw = temperature, humidity_raw = humidity } = this.props;
    const { title } = DEVICE_TYPES[type] || {};
    const date = new Date(timestamp);

    let button = 0, led = 0;
    const tabs = [
      <Tab key="buttons">Buttons</Tab>,
      <Tab key="climate">Climate</Tab>,
      <Tab key="face">Face</Tab>,
    ];
    switch (type) {
      case DEVICE_TYPE_SMART_TOP_A6T:
        button = 6;
        led = 7;
        break;
      case DEVICE_TYPE_SMART_TOP_G6:
        button = 6;
        led = 12;
        break;
      case DEVICE_TYPE_SMART_TOP_A6P:
        button = 6;
        led = 6;
        break;
      case DEVICE_TYPE_SMART_TOP_A4T:
        button = 4;
        led = 5;
        break;
      case DEVICE_TYPE_SMART_TOP_G4D:
        button = 4;
        led = 8;
        break;
      case DEVICE_TYPE_SMART_TOP_G4:
        button = 4;
        led = 8;
        break;
      case DEVICE_TYPE_SMART_TOP_G2:
        button = 2;
        led = 4;
        break;
      case DEVICE_TYPE_SMART_TOP_A4P:
        button = 4;
        led = 4;
        break;
    }
    const rgb = (n) => {
      const a = [];
      for (let i = 1; i <= n; i++) {
        a.push(<RGB id={id} index={i} daemon={daemon} key={`${id}/rgb/${i}`} />);
      }
      return a;
    };

    return type ? [
      <div key="header">
        <table>
          <tbody>
            <tr>
              <td>
                <div className="paper">
                  <div>
                    <Typography use="title">{title || type || 'Unknown'}</Typography>
                  </div>
                  <div>
                    <Typography use="caption">{`${id} / ${ip || address} / v${version || '?'}`}</Typography>
                  </div>
                  <div>
                    <Typography use="caption">{timestamp && `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</Typography>
                  </div>
                </div>
              </td>
              <td>
                <div className="paper" style={{ textAlign: 'right' }}>
                  <TextField value={code || ''} onChange={this.change} placeholder="Code" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>,
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
            <table style={{ textAlign: 'left' }}>
              <tbody>
                <Row title="Temperature" value={temperature_raw} magnitude="°C" min={-10} max={10} step={0.1} correct={temperature_correct} onCorrect={temperature_correct => change({ temperature_correct })} />
                <Row title="Humidity" value={humidity_raw} magnitude="%" min={-10} max={10} step={1} correct={humidity_correct} onCorrect={humidity_correct => change({ humidity_correct })} />
              </tbody>
            </table>
          )
        }
        {
          tabIndex === 2 && (
            type === DEVICE_TYPE_SMART_TOP_G4D ? (
              <DeviceSmartNextFaceG4D id={id} daemon={daemon} />
            ) : (
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td width="30%"><div className="paper"><Slider label="vibro" value={vibro / 25} min={0} max={10} step={1} discrete onInput={this.setVibro} /></div></td>
                      <td width="50%"><div className="paper"><Slider label="brightness" value={brightness} min={0} max={255} step={1} discrete onInput={this.setBrightness} /></div></td>
                      <td width="10%"><div className="paper"><Switch checked={!!state} onChange={this.onSwitch} /></div></td>
                    </tr>
                  </tbody>
                </table>
                {
                  rgb(led)
                }
              </div>

            )
          )
        }
      </div>,
    ] : null;
  }
}

export default connect(
  ({ pool }, { id, daemon }) => ({ ...pool[id], daemon }),
  (dispatch, { id }) => bindActionCreators({
    change: (payload) => modify(id, payload),
    request: (daemon, payload) => request(daemon, payload),
  }, dispatch)
)(Container);
