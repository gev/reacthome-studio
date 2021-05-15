
import React, { Component } from 'react';
import { TabBar, Tab } from '@rmwc/tabs';
import DeviceLanAmpChannel from './DeviceLanAmpChannel';

export default class extends Component {
  state = { index: 0 };

  select = ({ detail: { index } }) => {
    this.setState({ index });
  };

  render() {
    const { id, daemon } = this.props;
    const { index } = this.state;
    return (
      <div className="paper">
        <TabBar
          activeTabIndex={index}
          onActivate={this.select}
        >
          <Tab>1</Tab>
          <Tab>2</Tab>
        </TabBar>
        <DeviceLanAmpChannel id={id} daemon={daemon} index={index + 1} />
      </div>
    );
  }
}
