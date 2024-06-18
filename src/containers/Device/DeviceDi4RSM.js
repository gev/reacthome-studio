

import { Tab, TabBar } from '@rmwc/tabs';
import React, { Component } from 'react';
import DeviceAO from './DeviceAO';
import DeviceDi from './DeviceDi';
import DeviceExt from './DeviceExt';
import DeviceRS485Channel from './DeviceRS485Channel';


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
          <Tab>Inputs</Tab>
          <Tab>Analogs</Tab>
          <Tab>RSM</Tab>
          <Tab>Ext</Tab>
        </TabBar>
      </div>,
      <div key="body">
        {
          tabIndex === 0 && (
            <DeviceDi {...this.props} n={4} />
          )
        }
        {
          tabIndex === 1 && (
            <DeviceAO {...this.props} n={1} />
          )
        }
        {
          tabIndex === 2 && (
            <DeviceRS485Channel {...this.props} index={1} />
          )
        }
        {
          tabIndex === 3 && (
            <DeviceExt {...this.props} />
          )
        }
      </div>
    ]);
  }
}
