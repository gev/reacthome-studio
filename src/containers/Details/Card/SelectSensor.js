
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@rmwc/button';
import { DRIVER_TYPE_RS21, SENSOR } from '../../../constants';
import SelectMenu from '../SelectMenu';

class Container extends Component{
  render() {
    const {
      title, code, root, onSelect
    } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || SENSOR}</Button>}
        onSelect={onSelect}
        select={[SENSOR, DRIVER_TYPE_RS21]}
        root={root}
      />
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {}
)(Container);
