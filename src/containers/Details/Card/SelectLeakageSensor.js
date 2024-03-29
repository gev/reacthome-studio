
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@rmwc/button';
import { LEAKAGE_SENSOR } from '../../../constants';
import SelectMenu from '../SelectMenu';

class Container extends Component {
  render() {
    const {
      title, code, root, onSelect
    } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || LEAKAGE_SENSOR}</Button>}
        onSelect={onSelect}
        select={[LEAKAGE_SENSOR]}
        root={root}
      />
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {}
)(Container);
