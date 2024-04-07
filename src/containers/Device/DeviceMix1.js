
import React, { Component } from 'react';
import Di from './DeviceDiChannel';
import DiRelaySync from './DeviceDiRelaySync';
import Group from './DeviceDoGroup_2';
import DeviceRS485Channel from './DeviceRS485Channel';

const RowDi = ({ id, index }) => (
  <tr>
    <td className="paper"><Di id={id} index={index + 0} /></td>
    <td className="paper"><Di id={id} index={index + 1} /></td>
    <td className="paper"><Di id={id} index={index + 2} /></td>
    <td className="paper"><Di id={id} index={index + 3} /></td>
  </tr>
);

const RowDo = ({ id, daemon, index }) => (
  <tr>
    <td className="paper"><Group id={id} daemon={daemon} index={index} /></td>
  </tr>
);

export default class extends Component {
  render() {
    const { id, daemon } = this.props;
    return [
      <table key="di">
        <tbody>
          <RowDi id={id} index={1} />
          <RowDi id={id} index={5} />
          <RowDi id={id} index={9} />
          <RowDi id={id} index={13} />
        </tbody>
      </table>,
      <table key="do">
        <tbody>
          <RowDo id={id} daemon={daemon} index={1} />
          <RowDo id={id} daemon={daemon} index={2} />
          <RowDo id={id} daemon={daemon} index={3} />
        </tbody>
      </table>,
      <DiRelaySync key="sync" id={id} daemon={daemon} di={16} relay={6} />,
      <table key="rs485">
        <tbody>
          <DeviceRS485Channel {...this.props} index={1} />
        </tbody>
      </table>
    ];
  }
}
