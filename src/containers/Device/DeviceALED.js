
import React, { Component } from 'react';
import { Typography } from 'rmwc';



export default class extends Component {
  render() {
    const { change } = this.props;
    return (
      <table style={{ textAlign: 'left' }}>
        <tbody>
          <tr>
            <td className='paper'>
              <Typography use="body">Groups</Typography>
            </td>
            <td className='paper'>
              <Typography use="body">Brightness</Typography>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
