
import React, { Component } from 'react';

import { Button, MenuItem, SimpleMenu, TextField, Typography } from 'rmwc';


export default class extends Component {
  setSegmentDirection = direction => () => {
    const { size, onChange } = this.props;
    onChange({ direction, size });
  }

  setSize = ({ target: { value } }) => {
    let size = parseInt(value, 10) || 0;
    if (size < 0) size = 0;
    if (size > 1000) size = 1000;
    const { direction, onChange } = this.props;
    onChange({ direction, size });
  }

  render() {
    const { index, direction = 0, size = 0 } = this.props;
    return (
      <tr>
        <td className="paper" width={20}>
          <Typography use="body">{index}</Typography>
        </td>
        <td className="paper" width={50}>
          <SimpleMenu handle={<Button>{direction ? '<-' : '->'}</Button>} >
            <MenuItem onClick={this.setSegmentDirection(0)}>{'->'}</MenuItem>
            <MenuItem onClick={this.setSegmentDirection(1)}>{'<-'}</MenuItem>
          </SimpleMenu>
        </td>
        <td className="paper" width={100}>
          <TextField value={size} label="Size" type="number" onChange={this.setSize} />
        </td>
      </tr>
    );
  }
}
