
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MenuItem } from '@rmwc/menu';

type Props = {
  id: string,
  title: ?string,
  code: ?string,
  onSelect: (id: string) => void
};

class Container extends Component<Props> {
  select = () => {
    const { id, onSelect } = this.props;
    onSelect(id);
  }

  render() {
    const { id, title, code } = this.props;
    return (
      <MenuItem onClick={this.select}>{code || title || id}</MenuItem>
    );
  }
}

export default connect(({ pool }, { id }) => pool[id] || {})(Container);
