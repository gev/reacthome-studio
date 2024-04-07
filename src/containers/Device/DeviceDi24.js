
import React, { Component } from 'react';
import Di from './DeviceDiChannel';

const Row = ({ id, index }) => (
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

export default class extends Component {
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
