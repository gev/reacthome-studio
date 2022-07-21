

import React, { Component } from 'react';
import { TabBar, Tab } from '@rmwc/tabs';
import Di from './DeviceDiChannel';
import DiRelaySync from './DeviceDiRelaySync';
import Do from './DeviceDoChannel_3';
import Group from './DeviceGroup_3';

const RowDi = ({ id, index } ) => (
  <tr>
    <td className="paper"><Di id={id} index={index + 0} /></td>
    <td className="paper"><Di id={id} index={index + 1} /></td>
    <td className="paper"><Di id={id} index={index + 2} /></td>
    <td className="paper"><Di id={id} index={index + 3} /></td>
  </tr>
);

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
          <Tab>Inputs</Tab>
          <Tab>Relay</Tab>
          <Tab>Group</Tab>
          <Tab>Sync</Tab>
        </TabBar>
        <div>
          {
            tabIndex === 0 && (
              <table>
                  <tbody>
                    <RowDi id={id} index={1} />
                    <RowDi id={id} index={5} />
                    <RowDi id={id} index={9} />
                    <RowDi id={id} index={13} />
                  </tbody>
              </table>
            )
          }
          {
            tabIndex === 1 && (
              <table>
                  <tbody>
                    <RowDo id={id} daemon={daemon} index={1} />
                    <RowDo id={id} daemon={daemon} index={4} />
                  </tbody>
              </table>
            )
          }
          {
            tabIndex === 2 && (
              <table>
                <tbody>
                  <RowGroup id={id} daemon={daemon} index={1} />
                  <RowGroup id={id} daemon={daemon} index={4} />
                </tbody>
              </table>
            )
          }
          {
            tabIndex === 3 && (
              <DiRelaySync id={id} daemon={daemon} di={16} relay={6} />
            )
          }
        </div>
      </div>
    );
  }
}
 