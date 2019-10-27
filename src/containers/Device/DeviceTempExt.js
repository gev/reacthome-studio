
import React, { Component } from 'react';
import { Typography } from '@rmwc/typography';

type Props = {
  temperature: ?number;
};

type RowProps = {
  title: string;
  value: any;
  magnitude: ?string;
};

const Row = ({ title, value, magnitude }: RowProps) => (
  <tr>
    <td className="paper">
      <Typography use="body">{title}</Typography>
    </td>
    <td className="paper">
      <Typography use="body">{`${value} ${magnitude}`}</Typography>
    </td>
  </tr>
);

export default class extends Component<Props> {
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
