
import React, { Component } from 'react';
import { MenuItem } from '@rmwc/menu';

type Props = {
  value: ?string,
  onSelect: (id: string) => void
};

export default class extends Component<Props> {
  select = () => {
    const { value, onSelect } = this.props;
    onSelect(value);
  }

  render() {
    const { value } = this.props;
    return (
      <MenuItem onClick={this.select}>{value}</MenuItem>
    );
  }
}
