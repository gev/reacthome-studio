
import { Button } from '@rmwc/button';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../../actions';
import { CO2_STAT } from '../../../../constants';
import SelectMenu from '../../SelectMenu';

class Container extends Component {
  select = (id) => {
    this.props.modify(id);
  }

  render() {
    const { title, code, root } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || CO2_STAT}</Button>}
        onSelect={this.select}
        select={[CO2_STAT]}
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
