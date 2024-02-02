
import { Tab, TabBar } from '@rmwc/tabs';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { DEVICE_TYPE_SMART_BOTTOM_2 } from '../../constants';
import DeviceDi from './DeviceDi';
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
    const { co2, temperature, humidity, type } = this.props;
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
                <Row title="Temperature" value={temperature} magnitude="°C" />
                <Row title="Humidity" value={humidity} magnitude="%" />
                <Row title="CO2" value={co2} magnitude="ppm" />
              </tbody>
            </table>
          )
        }
      </div>,
    ];
  }
}
