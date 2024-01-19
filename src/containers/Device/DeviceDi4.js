
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import Di from './DeviceDiChannel';

const Row = ({ title, value, magnitude }) => (
  <tr>
    <td className="paper">
      <Typography use="body">{title}</Typography>
    </td>
    <td className="paper">
      <Typography use="body">{value}{magnitude}</Typography>
    </td>
  </tr>
);

export default class extends Component {
  render() {
    const { id } = this.props;
    return [
      <table key="di">
        <tbody>
          <tr>
            <td className="paper"><Di id={id} index={1} /></td>
            <td className="paper"><Di id={id} index={2} /></td>
            <td className="paper"><Di id={id} index={3} /></td>
            <td className="paper"><Di id={id} index={4} /></td>
          </tr>
        </tbody>
      </table>
    ];
  }
}
