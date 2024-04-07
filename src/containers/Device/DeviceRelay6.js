
import React, { Component } from 'react';
import Do from './DeviceDoChannel';
import RS485Channel from './DeviceRS485Channel';

const Row = ({ id, daemon, index }) => (
  <tr>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 0} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 1} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 2} /></td>
  </tr>
);

export default class extends Component {
  render() {
    const { id, daemon } = this.props;
    return ([
      <table key="relay">
        <tbody>
          <Row id={id} daemon={daemon} index={1} />
          <Row id={id} daemon={daemon} index={4} />
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
