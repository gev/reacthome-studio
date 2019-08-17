
import React, { Component } from 'react';
import RS485Channel from './DeviceRS485Channel';

type Props = {
  id: string;
  n: number;
  daemon: string;
};

export default class extends Component<Props> {
  render() {
    return (
      <table>
        <tbody>
          <RS485Channel {...this.props} index={1} />
        </tbody>
      </table>
    );
  }
}
