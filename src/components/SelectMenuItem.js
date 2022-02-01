
import React, { Component } from 'react';
import { MenuItem } from '@rmwc/menu';

export default class extends Component {
  select = () => {
    const { value, onSelect } = this.props;
    onSelect(value);
  }

  render() {
    const { value } = this.props;
    return (
      <MenuItem onClick={this.select}>
        <div style={{whiteSpace: 'nowrap'}}>{value}</div>
      </MenuItem>
    );
  }
}
