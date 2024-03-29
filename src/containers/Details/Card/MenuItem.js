
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MenuItem } from '@rmwc/menu';
import { BIND } from '../../../constants';

class Container extends Component {
  render() {
    const {
      onClick, index, title, code, label,
    } = this.props;
    return (
      <MenuItem onClick={onClick}>
        <div style={{ whiteSpace: 'nowrap' }}>{[[label, index].join(' '), code || title].join(': ')}</div>
      </MenuItem>
    );
  }
}

export default connect(
  ({ pool }, { id, bind = BIND }) => {
  const channel = pool[id] || {};
  return pool[channel[bind]] || {};
})(Container);
