
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@rmwc/button';
import { THERMOSTAT } from '../../../constants';
import SelectMenu from '../SelectMenu';
import { set } from '../../../actions';

class Container extends Component {
  render() {
    const {
      title, code, root, select
    } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || THERMOSTAT}</Button>}
        onSelect={select}
        select={[THERMOSTAT]}
        root={root}
      />
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[(pool[id] || {}).thermostat] || {},
  (dispatch, { id }) => bindActionCreators({
    select: (thermostat) => set(id, { thermostat })
  }, dispatch)
)(Container);
