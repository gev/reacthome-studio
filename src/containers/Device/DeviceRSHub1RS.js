
import React, { Component } from 'react';
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
  render() {
    const { id, daemon } = this.props;
    return ([
      <table key="rs485">
        <tbody>
          <RS485Channel {...this.props} index={1} is_rbus={false} />
        </tbody>
      </table>
    ]);
  }
}
