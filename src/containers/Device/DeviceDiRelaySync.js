
import { Tab, TabBar } from '@rmwc/tabs';
import React, { Component } from 'react';
import DeviceDiChannelRelaySync from './DeviceDiChannelRelaySync';

export default class extends Component {
  state = { index: 0 };

  select = ({ detail: { index } }) => {
    this.setState({ index });
  };

  render() {
    const { id, daemon, di, relay } = this.props;
    const { index } = this.state;
    return (
      <div className="paper">
        <TabBar
          activeTabIndex={index}
          onActivate={this.select}
        >
          {
            Array(di).fill(0).map((_, i) => <Tab key={`${id}/tab/di/${i}`}>{i + 1}</Tab>)
          }
        </TabBar>
        <DeviceDiChannelRelaySync id={id} daemon={daemon} index={index + 1} relay={relay} />
      </div>
    );
  }
}
