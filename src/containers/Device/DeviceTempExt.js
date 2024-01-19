
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';

const Row = ({ title, value, magnitude }) => (
  <tr>
    <td className="paper">
      <Typography use="body">{title}</Typography>
    </td>
    <td className="paper">
      <Typography use="body">{`${value} ${magnitude}`}</Typography>
    </td>
  </tr>
);

export default class extends Component {
  render() {
    const {
      temperature
    } = this.props;
    return (
      <table style={{ textAlign: 'left' }}>
        <tbody>
          <Row title="Temperature" value={temperature} magnitude="°C" />
        </tbody>
      </table>
    );
  }
}
