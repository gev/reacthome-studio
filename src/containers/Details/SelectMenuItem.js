
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MenuItem } from '@rmwc/menu';
class Container extends Component {
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
