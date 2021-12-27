/* eslint-disable camelcase */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@rmwc/button';
import { WATER_COUNTER } from '../../../constants';
import SelectMenu from '../SelectMenu';
import { set } from '../../../actions';

class Container extends Component {
  render() {
    const {
      title, code, root, select
    } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || WATER_COUNTER}</Button>}
        onSelect={select}
        select={[WATER_COUNTER]}
        root={root}
      />
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[(pool[id] || {}).water_counter] || {},
  (dispatch, { id }) => bindActionCreators({
    select: (water_counter) => set(id, { water_counter })
  }, dispatch)
)(Container);
