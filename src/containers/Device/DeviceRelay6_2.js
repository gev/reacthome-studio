
import React, { Component } from 'react';
import Group from './DeviceDoGroup_2';
import RS485Channel from './DeviceRS485Channel';

const Row = ({ id, daemon, index }) => (
  <tr>
    <td>
      <Group id={id} daemon={daemon} index={index} />
    </td>
  </tr>
);

export default class extends Component {
  render() {
    const { id, daemon } = this.props;
    return ([
      <table key="relay">
        <tbody>
          <Row id={id} daemon={daemon} index={1} />
          <Row id={id} daemon={daemon} index={2} />
          <Row id={id} daemon={daemon} index={3} />
        </tbody>
      </table>,
      <table key="rs485">
        <tbody>
          <RS485Channel {...this.props} index={1} />
        </tbody>
      </table>
    ]);
  }
}
