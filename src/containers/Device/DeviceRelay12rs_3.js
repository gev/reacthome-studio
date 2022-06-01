
import React, { Component } from 'react';
import { TabBar, Tab } from '@rmwc/tabs';
import Do from './DeviceDoChannel_3';
import Group from './DeviceGroup_3';

const RowGroup = ({ id, daemon, index }) => (
  <tr>
    <td>
      <Group id={id} daemon={daemon} index={index + 0} />
    </td>
    <td>
      <Group id={id} daemon={daemon} index={index + 1} />
    </td>
    <td>
      <Group id={id} daemon={daemon} index={index + 2} />
    </td>
  </tr>
);

const RowDo = ({ id, daemon, index }) => (
  <tr>
    <td>
      <Do id={id} daemon={daemon} index={index + 0} groupNumber={12} />
    </td>
    <td>
      <Do id={id} daemon={daemon} index={index + 1} groupNumber={12} />
    </td>
    <td>
      <Do id={id} daemon={daemon} index={index + 2} groupNumber={12} />
    </td>
  </tr>
);

export default class extends Component {
  state = { tabIndex: 0 };
  select = ({ detail: { index } }) => {
    this.setState({ tabIndex: index });
  }
  render() {
    const { id, daemon } = this.props;
    const { tabIndex } = this.state;
    return (
      <div>
        <TabBar
          activeTabIndex={tabIndex}
          onActivate={this.select}
        >
          <Tab>Relay</Tab>
          <Tab>Group</Tab>
        </TabBar>
        <div>
          <table>
            {
              tabIndex === 0 && (
                <tbody>
                  <RowDo id={id} daemon={daemon} index={1} />
                  <RowDo id={id} daemon={daemon} index={4} />
                  <RowDo id={id} daemon={daemon} index={7} />
                  <RowDo id={id} daemon={daemon} index={10} />
                </tbody>
              )
            }
            {
              tabIndex === 1 && (
                <tbody>
                  <RowGroup id={id} daemon={daemon} index={1} />
                  <RowGroup id={id} daemon={daemon} index={4} />
                  <RowGroup id={id} daemon={daemon} index={7} />
                  <RowGroup id={id} daemon={daemon} index={10} />
                </tbody>
              )
            }
          </table>
        </div>
      </div>
    );
  }
}
