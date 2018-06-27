
import React, { Component } from 'react';
import { Typography } from 'rmwc/Typography';
import Di from './DeviceDi';

type Props = {
  temperature: ?number;
  humidity: ?number;
  id: string;
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
      <Typography use="body">{value}{magnitude}</Typography>
    </td>
  </tr>
);

export default class extends Component<Props> {
  render() {
    const { id, temperature, humidity } = this.props;
    return [
      <table key="climate" style={{ textAlign: 'left' }}>
        <tbody>
          <Row title="Temperature" value={temperature} magnitude="°C" />
          <Row title="Humidity" value={humidity} magnitude="%" />
        </tbody>
      </table>,
      <table key="buttons">
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

