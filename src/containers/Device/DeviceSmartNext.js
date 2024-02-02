
import { Tab, TabBar } from '@rmwc/tabs';
import React, { Component } from 'react';
import DeviceSmartNextBottom from './DeviceSmartNextBottom';
import DeviceSmartNextTop from './DeviceSmartNextTop';

export default class extends Component {
  state = { tabIndex: 0 };
  select = ({ detail: { index } }) => {
    this.setState({ tabIndex: index });
  }
  render() {
    const { tabIndex } = this.state;
    const { type, daemon, top, topDetected } = this.props;
    const tabs = [(<Tab key="top">Bottom</Tab>)];
    if (top && topDetected) {
      tabs.push(<Tab key="bottom">Top</Tab>);
    }
    return [
      <div key="tab">
        <TabBar activeTabIndex={tabIndex} onActivate={this.select}>
          {tabs}
        </TabBar>
      </div>,
      <div key="body">
        {
          tabIndex === 0 && (
            <DeviceSmartNextBottom {...this.props} />
          )
        }
        {
          tabIndex === 1 && (
            <DeviceSmartNextTop id={top} daemon={daemon} />
          )
        }
      </div>,
    ];
  }
}
