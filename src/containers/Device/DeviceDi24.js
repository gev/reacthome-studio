
import React, { Component } from 'react';
import Di from './DeviceDi';

type Props = {
  id: string;
};

type RowProps = {
  id: string;
  index: number;
};

const Row = ({ id, index } : RowProps) => (
  <tr>
    <td className="paper"><Di id={id} index={index + 0} /></td>
    <td className="paper"><Di id={id} index={index + 1} /></td>
    <td className="paper"><Di id={id} index={index + 2} /></td>
    <td className="paper"><Di id={id} index={index + 3} /></td>
    <td className="paper"><Di id={id} index={index + 4} /></td>
    <td className="paper"><Di id={id} index={index + 5} /></td>
    <td className="paper"><Di id={id} index={index + 6} /></td>
    <td className="paper"><Di id={id} index={index + 7} /></td>
  </tr>
);

export default class extends Component<Props> {
  render() {
    const { id } = this.props;
    return (
      <table>
        <tbody>
          <Row id={id} index={1} />
          <Row id={id} index={9} />
          <Row id={id} index={17} />
        </tbody>
      </table>
    );
  }
}

