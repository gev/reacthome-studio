
import { Tab, TabBar } from '@rmwc/tabs';
import React, { Component } from 'react';
import DeviceALED from './DeviceALED';
import DeviceDi from './DeviceDi';
import DeviceDimmer from './DeviceDimmer';
import DeviceExt from './DeviceExt';
import DeviceRSHub4 from './DeviceRSHub4l';


export default class extends Component {
  state = { tabIndex: 0 };
  select = ({ detail: { index } }) => {
    this.setState({ tabIndex: index });
  }
  render() {
    const { tabIndex } = this.state;
    return ([
      <div key="tab">
        <TabBar
          activeTabIndex={tabIndex}
          onActivate={this.select}
        >
          <Tab>RBUS</Tab>
          <Tab>Inputs</Tab>
          <Tab>Dimmer</Tab>
          <Tab>Ext</Tab>
          <Tab>ALED</Tab>
        </TabBar>
      </div>,
      <div key="body">
        {
          tabIndex === 0 && (
            <DeviceRSHub4 {...this.props} />
          )
        }
        {
          tabIndex === 1 && (
            <DeviceDi {...this.props} n={4} />
          )
        }
        {
          tabIndex === 2 && (
            <DeviceDimmer {...this.props} n={3} />
          )
        }
        {
          tabIndex === 3 && (
            <DeviceExt {...this.props} />
          )
        }
        {
          tabIndex === 4 && (
            <DeviceALED {...this.props} n={1} />
          )
        }
      </div>
    ]);
  }
}
