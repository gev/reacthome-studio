

import { Tab, TabBar } from '@rmwc/tabs';
import React, { Component } from 'react';
import DeviceALED from './DeviceALED';
import DeviceDi from './DeviceDi';
import DeviceExt from './DeviceExt';


export default class extends Component {
  state = { tabIndex: 0 };
  select = ({ detail: { index } }) => {
    this.setState({ tabIndex: index });
  }
  render() {
    const { tabIndex } = this.state;
    const { id, version } = this.props;
    const major = parseInt(version.split('.')[0], 10);
    const tabs = [
      <Tab>Inputs</Tab>,
      <Tab>Ext</Tab>
    ];
    if (major >= 5) {
      tabs.push(<Tab>ALED</Tab>);
    }
    return ([
      <div key="tab">
        <TabBar
          activeTabIndex={tabIndex}
          onActivate={this.select}
        >{tabs}
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
        {
          tabIndex === 2 && (
            <DeviceALED {...this.props} />
          )
        }
      </div>
    ]);
  }
}
