
import React, { Component } from 'react';
import RS485Channel from './DeviceRS485Channel';


export default class extends Component {
  render() {
    const { id, daemon } = this.props;
    return ([
      <table key="rs485">
        <tbody>
          <RS485Channel {...this.props} index={1} />
        </tbody>
      </table>
    ]);
  }
}
