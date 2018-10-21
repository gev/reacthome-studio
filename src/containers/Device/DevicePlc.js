
import React, { Component } from 'react';
import Di from './DeviceDiChannel';
import Do from './DeviceDoChannel';

type Props = {
  id: string;
  daemon: string;
};

type RowDiProps = {
  id: string;
  index: number;
};

type RowDoProps = {
  id: string;
  index: number;
  daemon: string;
};

const RowDi = ({ id, index } : RowDiProps) => (
  <tr>
    <td className="paper"><Di id={id} index={index + 0} /></td>
    <td className="paper"><Di id={id} index={index + 1} /></td>
    <td className="paper"><Di id={id} index={index + 2} /></td>
    <td className="paper"><Di id={id} index={index + 3} /></td>
    <td className="paper"><Di id={id} index={index + 4} /></td>
    <td className="paper"><Di id={id} index={index + 5} /></td>
  </tr>
);

const RowDo = ({ id, daemon, index } : RowDoProps) => (
  <tr>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 0} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 1} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 2} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 3} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 4} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 5} /></td>
  </tr>
);

export default class extends Component<Props> {
  render() {
    const { id, daemon } = this.props;
    return [
      <table key="di">
        <tbody>
          <RowDi id={id} index={1} />
          <RowDi id={id} index={7} />
          <RowDi id={id} index={13} />
          <RowDi id={id} index={19} />
          <RowDi id={id} index={25} />
          <RowDi id={id} index={31} />
        </tbody>
      </table>,
      <table key="do">
        <tbody>
          <RowDo id={id} daemon={daemon} index={1} />
          <RowDo id={id} daemon={daemon} index={7} />
          <RowDo id={id} daemon={daemon} index={13} />
          <RowDo id={id} daemon={daemon} index={19} />
        </tbody>
      </table>
    ];
  }
}

