
import React, { Component } from 'react';
import Do from './DeviceDoChannel';

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
    return (
      <table>
        <tbody>
          <Row id={id} daemon={daemon} index={1} />
          <Row id={id} daemon={daemon} index={5} />
        </tbody>
      </table>
    );
  }
}
