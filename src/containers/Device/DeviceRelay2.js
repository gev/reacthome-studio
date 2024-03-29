
import React, { Component } from 'react';
import Di from './DeviceDiChannel';
import DeviceDiRelaySync from './DeviceDiRelaySync';
import Do from './DeviceDoChannel';



const RowDi = ({ id, index }) => (
  <tr>
    <td className="paper"><Di id={id} index={index + 0} /></td>
    <td className="paper"><Di id={id} index={index + 1} /></td>
  </tr>
);

const RowDo = ({ id, daemon, index }) => (
  <tr>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 0} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 1} /></td>
  </tr>
);

export default class extends Component {
  render() {
    const { id, daemon } = this.props;
    return [
      <table key="di">
        <tbody>
          <RowDi id={id} index={1} />
        </tbody>
      </table>,
      <table key="do">
        <tbody>
          <RowDo id={id} daemon={daemon} index={1} />
        </tbody>
      </table>,
      <DeviceDiRelaySync key="sync" id={id} daemon={daemon} di={2} relay={2} />
    ];
  }
}
