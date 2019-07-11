
import React, { Component } from 'react';
import Do from './DeviceDoChannel';

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
    return (
      <table>
        <tbody>
          <Row id={id} daemon={daemon} index={1} />
          <Row id={id} daemon={daemon} index={5} />
          <Row id={id} daemon={daemon} index={9} />
          <Row id={id} daemon={daemon} index={13} />
          <Row id={id} daemon={daemon} index={17} />
          <Row id={id} daemon={daemon} index={21} />
        </tbody>
      </table>
    );
  }
}
