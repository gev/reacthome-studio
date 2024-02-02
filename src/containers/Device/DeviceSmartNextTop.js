
import { Tab, TabBar } from '@rmwc/tabs';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DEVICE_TYPE_SMART_TOP_A6P } from '../../constants';
import RGB from '../RGB';
import DeviceDi from './DeviceDi';

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
  select = ({ detail: { index } }) => {
    this.setState({ tabIndex: index });
  }
  render() {
    const { tabIndex } = this.state;
    const {
      id, temperature, humidity, daemon, type,
    } = this.props;
    const button = type === DEVICE_TYPE_SMART_TOP_A6P ? 6 : 4;
    const led = button;
    const rgb = [];
    for (let i = 1; i <= led; i++) {
      rgb.push(<RGB id={id} index={i} daemon={daemon} key={`${id}/rgb/${i}`} />);
    }
    const tabs = [
      <Tab key="buttons">Buttons</Tab>,
      <Tab key="leds">LEDs</Tab>,
      <Tab key="climate">Climate</Tab>,
    ];
    return type ? [
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
      </div>,
    ] : null;
  }
}

export default connect(
  ({ pool }, { id, daemon }) => ({ ...pool[id], daemon })
)(Container);
