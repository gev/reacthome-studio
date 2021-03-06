
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MenuItem } from '@rmwc/menu';
import { BIND } from '../../../constants';

type Props = {
  code: ?string;
  title: ?string;
  index: number;
  onClick: () => void;
};

class Container extends Component<Props> {
  render() {
    const {
      onClick, index, title, code
    } = this.props;
    return (
      <MenuItem onClick={onClick}>
        {`${index} ${code || title || ''}`}
      </MenuItem>
    );
  }
}

export default connect(({ pool }, { id, bind = BIND }) => {
  const channel = pool[id] || {};
  return pool[channel[bind]] || {};
})(Container);
