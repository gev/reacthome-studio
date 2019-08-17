
import React, { Component } from 'react';
import Do from './DeviceDoChannel';
import RS485Channel from './DeviceRS485Channel';

type Props = {
  id: string;
  daemon: string;
};

type RowProps = {
  id: string;
  daemon: string;
  index: number;
};

const Row = ({ id, daemon, index } : RowProps) => (
  <tr>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 0} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 1} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 2} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 3} /></td>
  </tr>
);

export default class extends Component<Props> {
  render() {
    const { id, daemon } = this.props;
    return ([
      <table key="relay">
        <tbody>
          <Row id={id} daemon={daemon} index={1} />
          <Row id={id} daemon={daemon} index={5} />
          <Row id={id} daemon={daemon} index={9} />
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
