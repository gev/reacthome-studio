
import React, { Component } from 'react';
import { TabBar, Tab } from '@rmwc/tabs';
import Do from './DeviceDoChannel';
import RS485Channel from './DeviceRS485Channel';

const Row = ({ id, daemon, index }) => (
  <tr>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 0} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 1} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 2} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 3} /></td>
  </tr>
);

export default class extends Component {
  state = { tabIndex: 0 };
  select = ({ detail: { index } }) => {
    this.setState({ tabIndex: index });
  }
  render() {
    const { id, daemon } = this.props;
    return ([
      <div key="tab">
        <TabBar
          activeTabIndex={this.state.tabIndex}
          onActivate={this.select}
        >
          <Tab>1</Tab>
          <Tab>2</Tab>
          <Tab>3</Tab>
          <Tab>4</Tab>
        </TabBar>
      </div>,
      <table key="rs485">
        <tbody>
          <RS485Channel {...this.props} index={this.state.tabIndex + 1} />
        </tbody>
      </table>
    ]);
  }
}
