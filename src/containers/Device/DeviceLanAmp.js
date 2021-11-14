
import React, { Component } from 'react';
import { TabBar, Tab } from '@rmwc/tabs';
import DeviceLanAmpChannel from './DeviceLanAmpChannel';
import DeviceLanAmpRTPChannel from './DeviceLanAmpRTPChannel';

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
          <Tab>RTP</Tab>
        </TabBar>
        {
          index === 2 ? (
            <table>
              <tbody>
                <DeviceLanAmpRTPChannel id={id} daemon={daemon} index={1} />
                <DeviceLanAmpRTPChannel id={id} daemon={daemon} index={2} />
                <DeviceLanAmpRTPChannel id={id} daemon={daemon} index={3} />
                <DeviceLanAmpRTPChannel id={id} daemon={daemon} index={4} />
                <DeviceLanAmpRTPChannel id={id} daemon={daemon} index={5} />
                <DeviceLanAmpRTPChannel id={id} daemon={daemon} index={6} />
                <DeviceLanAmpRTPChannel id={id} daemon={daemon} index={7} />
                <DeviceLanAmpRTPChannel id={id} daemon={daemon} index={8} />
              </tbody>
            </table>
          ) : (
            <DeviceLanAmpChannel id={id} daemon={daemon} index={index + 1} />
          )
        }
      </div>
    );
  }
}
