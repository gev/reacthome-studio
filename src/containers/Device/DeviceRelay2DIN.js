
import React, { Component } from 'react';
import Di from './DeviceDiChannel';
import DiRelaySync from './DeviceDiRelaySync';
import Group from './DeviceDoGroup_2';



const RowDi = ({ id, index }) => (
  <tr>
    <td className="paper"><Di id={id} index={index + 0} /></td>
    <td className="paper"><Di id={id} index={index + 1} /></td>
    <td className="paper"><Di id={id} index={index + 2} /></td>
    <td className="paper"><Di id={id} index={index + 3} /></td>
  </tr>
);

const RowDo = ({ id, daemon, index }) => (
  <tr>
    <td className="paper"><Group id={id} daemon={daemon} index={index} /></td>
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
      <DiRelaySync key="sync" id={id} daemon={daemon} di={4} relay={2} />
    ];
  }
}
