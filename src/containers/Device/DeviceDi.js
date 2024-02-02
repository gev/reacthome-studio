
import React, { Component } from 'react';
import Di from './DeviceDiChannel';

export default class extends Component {
  render() {
    const { id, n = 4 } = this.props;
    const list = [];
    for (let i = 0; i < n; i++) {
      list.push(<td className='paper' key={i}><Di id={id} index={i + 1} /></td>);
    }
    return [
      <table>
        <tbody>
          <tr>{list}</tr>
        </tbody>
      </table>
    ];
  }
}
