
import React, { Component } from 'react';
import RS485Channel from './DeviceRS485Channel';


export default class extends Component {
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
