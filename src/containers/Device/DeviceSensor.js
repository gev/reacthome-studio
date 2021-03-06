
import React, { Component } from 'react';
import { Typography } from '@rmwc/typography';
import DeviceDoppler from './DeviceDoppler';
import Di from './DeviceDiChannel';
import RGB from '../RGB';

type Props = {
  temperature: ?number;
  humidity: ?number;
  daemon: string;
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
    const {
      id, temperature, humidity, daemon
    } = this.props;
    return [
      <RGB key="rgb" daemon={daemon} id={id} />,
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
      </table>,
      <DeviceDoppler daemon={daemon} key="doppler" id={id} />
    ];
  }
}

