
import { Tab, TabBar } from '@rmwc/tabs';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../actions';
import { DEVICE_TYPES, DEVICE_TYPE_SMART_TOP_A6P, DEVICE_TYPE_SMART_TOP_G4D } from '../../constants';
import RGB from '../RGB';
import DeviceDi from './DeviceDi';
import DeviceSmartNextFaceG4D from './DeviceSmartNextFaceG4D';

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

class Container extends Component {
  state = { tabIndex: 0 };
  change = (event) => {
    const { value } = event.target;
    this.props.change({ code: value });
  }
  select = ({ detail: { index } }) => {
    this.setState({ tabIndex: index });
  }
  render() {
    const { tabIndex } = this.state;
    const {
      id, code, ip, address, timestamp, version, temperature, humidity, daemon, type
    } = this.props;
    const { title } = DEVICE_TYPES[type] || {};
    const date = new Date(timestamp);

    let button = 0, led = 0;
    const tabs = [
      <Tab key="buttons">Buttons</Tab>,
      <Tab key="leds">LEDs</Tab>,
      <Tab key="climate">Climate</Tab>,
    ];
    switch (type) {
      case DEVICE_TYPE_SMART_TOP_A6P:
        button = 6;
        led = 6;
        break;
      case DEVICE_TYPE_SMART_TOP_G4D:
        button = 4;
        led = 8;
        tabs.push(<Tab key="face">Face</Tab>);
        break;
    }
    const rgb = [];
    for (let i = 1; i <= led; i++) {
      rgb.push(<RGB id={id} index={i} daemon={daemon} key={`${id}/rgb/${i}`} />);
    }
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
            rgb
          )
        }
        {
          tabIndex === 2 && (
            <table style={{ textAlign: 'left' }}>
              <tbody>
                <Row title="Temperature" value={temperature} magnitude="°C" />
                <Row title="Humidity" value={humidity} magnitude="%" />
              </tbody>
            </table>
          )
        }
        {
          tabIndex === 3 && (
            <DeviceSmartNextFaceG4D id={id} daemon={daemon} />
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
  }, dispatch)
)(Container);
