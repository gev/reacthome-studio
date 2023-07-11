
import React, { Component } from 'react';
import { TabBar, Tab } from '@rmwc/tabs';
import DeviceRSHub4 from './DeviceRSHub4';
import DeviceDi4 from './DeviceDi4';
import DeviceDimmer from './DeviceDimmer';


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
            <DeviceDi4 {...this.props} />
          )
        }
        {
          tabIndex === 2 && (
            <DeviceDimmer {...this.props} n={3} />
          )
        }
      </div>
    ]);
  }
}
