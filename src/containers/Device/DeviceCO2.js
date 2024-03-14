
import { Tab, TabBar } from '@rmwc/tabs';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import DeviceDoppler from './DeviceDopplerLegacy';
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
      id, temperature, humidity, co2, daemon
    } = this.props;
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
                <Row title="Temperature" value={temperature} magnitude="°C" />
                <Row title="Humidity" value={humidity} magnitude="%" />
                <Row title="CO2" value={co2} magnitude="ppm" />
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
