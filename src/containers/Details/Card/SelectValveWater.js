
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@rmwc/button';
import { VALVE_WATER } from '../../../constants';
import SelectMenu from '../SelectMenu';

class Container extends Component {
  render() {
    const {
      title, code, root, onSelect
    } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || VALVE_WATER}</Button>}
        onSelect={onSelect}
        select={[VALVE_WATER]}
        root={root}
      />
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {}
)(Container);
