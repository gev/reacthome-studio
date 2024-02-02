

import { Tab, TabBar } from '@rmwc/tabs';
import React, { Component } from 'react';
import DeviceDi from './DeviceDi';
import DeviceExt from './DeviceExt';


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
            <DeviceExt {...this.props} />
          )
        }
      </div>
    ]);
  }
}
