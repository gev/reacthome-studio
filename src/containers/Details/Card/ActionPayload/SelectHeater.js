
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@rmwc/button';
import { HEATER, VALVE_HEATING, WARM_FLOOR } from '../../../../constants';
import { modify } from '../../../../actions';
import SelectMenu from '../../SelectMenu';

class Container extends Component {
  select = (id) => {
    this.props.modify(id);
  }

  render() {
    const { title, code, root } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || HEATER}</Button>}
        onSelect={this.select}
        select={[VALVE_HEATING, WARM_FLOOR]}
        root={root}
      />
    );
  }
}

export default connect(
  ({ pool }, { payload: { id } = {} }) => pool[id] || {},
  (dispatch, { action, payload }) => bindActionCreators({
    modify: (id) => modify(action, { payload: { ...payload, id } }),
  }, dispatch)
)(Container);
