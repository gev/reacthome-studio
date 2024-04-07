
import React, { Component } from 'react';
import Di from './DeviceDiChannel';

export default class extends Component {
  render() {
    const { id } = this.props;
    return [
      <table key="di">
        <tbody>
          <tr>
            <td className="paper"><Di id={id} index={1} /></td>
            <td className="paper"><Di id={id} index={2} /></td>
            <td className="paper"><Di id={id} index={3} /></td>
            <td className="paper"><Di id={id} index={4} /></td>
          </tr>
          <tr>
            <td className="paper"><Di id={id} index={5} /></td>
            <td className="paper"><Di id={id} index={6} /></td>
            <td className="paper"><Di id={id} index={7} /></td>
            <td className="paper"><Di id={id} index={8} /></td>
          </tr>
        </tbody>
      </table>
    ];
  }
}
